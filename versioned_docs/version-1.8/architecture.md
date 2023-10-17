---
sidebar_label: "Architecture"
title: "Architecture"
description: The Kubewarden architecture
keywords: [kubewarden, kubernetes, architecture]
---


Kubewarden is a Kubernetes policy engine.
It uses policies written in a programming language of your choosing.
This language must generate a WebAssembly binary for Kubewarden to use.

The Kubewarden stack consists of these components:

- Kubewarden Custom Resources:
These are [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
that simplify the process of managing policies.

- [`kubewarden-controller`](https://github.com/kubewarden/kubewarden-controller):
This is a Kubernetes controller that reconciles Kubewarden's Custom Resources.
This controller creates parts of the Kubewarden stack.
It also translates Kubewarden configuration into Kubernetes directives.

- Kubewarden policies:
These are WebAssembly modules holding the validation or mutation logic.
WebAssembly modules have detailed documentation in the
[writing policies](/writing-policies/index.md) sections.

- [`policy-server`](https://github.com/kubewarden/policy-server):
The `policy-server` receives requests for validation.
It validates the requests by executing Kubewarden policies.

- [`audit-scanner`](https://github.com/kubewarden/audit-scanner):
The audit scanner inspects the resources already in the cluster. It identifies those violating Kubewarden policies.

Kubewarden integrates with Kubernetes using
[Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).
In particular, Kubewarden operates as a Kubernetes Admission Webhook.
The `policy-server` is the Webhook endpoint called by the Kubernetes API server to validate requests.

The `kubewarden-controller` registers the needed
`MutatingWebhookConfiguration` or
`ValidatingWebhookConfiguration`
objects with the Kubernetes API server.

[Audit scanner](/explanations/audit-scanner/audit-scanner.md)
constantly checks the resources declared in the cluster,
flagging the ones that no longer adhere with the deployed Kubewarden policies.

The diagram shows the architecture of a cluster running the Kubewarden stack:

![Full architecture](/img/architecture.png)

## The journey of a Kubewarden policy

The architecture diagram appears complex at first.
This section covers it step by step.

### Default policy server

On a new cluster, the Kubewarden components defined are:

- the Custom Resource Definitions (CRD)
- the `kubewarden-controller` Deployment
- a `PolicyServer` Custom Resource named `default`.

![Defining the first ClusterAdmissionPolicy resource](/img/architecture_sequence_01.png)

When the `kubewarden-controller` notices the default `PolicyServer` resource,
it creates a Deployment of the `policy-server` component.

Kubewarden works as a Kubernetes Admission Webhook.
Kubernetes specifies using TLS to secure all Webhook endpoints.
The `kubewarden-controller` sets up this secure communication
by:

1. Generating a self-signed Certificate Authority
1. Use this CA to generate a TLS certificate key for the `policy-server` Service.

These objects are all stored as `Secret` resources in Kubernetes.

Finally, `kubewarden-controller` creates the `policy-server` Deployment
and a Kubernetes ClusterIP Service
to expose it inside the cluster network.

### Defining the first policy

This diagram shows what happens when defining the first policy
bound to the default `policy-server` in the cluster:

![Defining the first ClusterAdmissionPolicy resource](/img/architecture_sequence_02.png)

:::note

A policy must define which Policy Server it must run on.
Or, we say it binds to a Policy Server.
You can have different policies with the same Wasm module and settings running in many Policy Servers.
However, you can't have a single policy definition that runs in many policy servers.

:::

The `kubewarden-controller` notices the new `ClusterAdmissionPolicy` resource and
so finds the bound `PolicyServer` and reconciles it.

### Reconciliation of `policy-server`

When creating, modifying or deleting a `ClusterAdmissionPolicy`,
a reconciliation loop activates in `kubewarden-controller`,
for the `PolicyServer` owning the policy.
This reconciliation loop creates a ConfigMap with all the polices bound to the `PolicyServer`.
Then the Deployment rollout of the `policy-server` starts.
It results in starting the new `policy-server` instance with the updated configuration.

At start time, the `policy-server` reads its configuration from the ConfigMap
and downloads all the Kubewarden policies specified.
You can download Kubewarden policies from remote HTTP servers and container registries.

You use policy settings parameters to tune a policies' behavior.
After startup and policy download the `policy-server`
checks the policy settings provided by the user are valid.

The `policy-server` validates policy settings by invoking
the `validate_setting` function exposed by each policy.
There is further documentation in the
[writing policies section](/writing-policies/spec/01-intro-spec.md)
of the documentation.

The `policy-server` exits with an error
if one or more policies received wrong configuration parameters
from the policy specification provided by the user.

If all policies are correctly configured,
`policy-server`
spawns a pool of worker threads
to evaluate incoming requests
using the Kubewarden policies
specified by the user.

Finally, the `policy-server` starts a HTTPS server,
the Kubewarden Policy Server,
listening to incoming validation requests.
Kubewarden uses the TLS key and certificate
created by `kubewarden-controller`
to secure the web server.

The web server exposes each policy by a dedicated path
following the naming convention: `/validate/<policy ID>`.

This diagram shows the cluster when initialization of `policy-server` is complete:

![policy-server initialized](/img/architecture_sequence_03.png)

### Making Kubernetes aware of the policy

The `policy-server` Pods have a
[`Readiness Probe`](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/),
that `kubewarden-controller` uses to check when
the `policy-server` Deployment is ready to evaluate [`AdmissionReview`](
https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#webhook-request-and-response)s.

Once the `policy-server` Deployment is marked as `Ready`,
the `kubewarden-controller` makes the Kubernetes API server
aware of the new policy by creating either a
`MutatingWebhookConfiguration` or a `ValidatingWebhookConfiguration` object.

Each policy has a dedicated
`MutatingWebhookConfiguration` or `ValidatingWebhookConfiguration`
which points to the Webhook endpoint served by `policy-server`.
The endpoint is reachable by the `/validate/<policy ID>` URL.

![Kubernetes Webhook endpoint configuration](/img/architecture_sequence_04.png)

### Policy in action

Now that all the necessary plumbing is complete,
Kubernetes starts sending Admission Review requests to the right `policy-server` endpoints.

![Policy in action](/img/architecture_sequence_05.png)

A `policy-server` receives the Admission Request object and,
based on the endpoint that received the request,
uses the correct policy to evaluate it.

Each policy is evaluated inside its own dedicated WebAssembly sandbox.
The communication between `policy-server` (the "host")
and the WebAssembly policy (the "guest")
uses the waPC communication protocol.
The protocol description is part of the [writing policies](/writing-policies/index.md) documentation.

## How Kubewarden handles many policy servers and policies

A cluster can have many policy servers and Kubewarden policies defined.
There are benefits of having many policy servers:

- You can isolate noisy namespaces or tenants,
those generating many policy evaluations,
from the rest of the cluster so as not to adversely affect other cluster operations.

- You can run mission-critical policies in a dedicated Policy Server pool,
making your infrastructure more resilient.

A `PolicyServer` resource defines each `policy-server`
and a `ClusterAdmissionPolicy` or `AdmissionPolicy` resource defines each policy.

This leads back to the initial diagram:

![Full architecture](/img/architecture.png)

A `ClusterAdmissionPolicy` is bound to a `PolicyServer`.
Any `ClusterAdmissionPolicies` not specifying a `PolicyServer`
are bound to the `default` `PolicyServer`.
If a `ClusterAdmissionPolicy` references a `PolicyServer`
that doesn't exist, its state is `unschedulable`.

Each `policy-server` defines many validation endpoints,
one for each policy defined in its configuration file.
You can load the same policy many times,
with different configuration parameters.

The `ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration` resources
make the Kubernetes API server aware of these policies.
Then `kubewarden-controller` keeps the API server
and configuration resources in synchronization.

The Kubernetes API server dispatches incoming admission requests
to the correct validation endpoint exposed by `policy-server`.
