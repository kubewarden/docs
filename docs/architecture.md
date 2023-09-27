---
sidebar_label: "Architecture"
title: "Architecture"
description: The Kubewarden architecture
keywords: [kubewarden, kubernetes, architecture]
---

Kubewarden is a Kubernetes policy engine.
It uses policies written in a programming language of your choosing.
Your chosen language must generate a WebAssembly binary.

The Kubewarden stack comprises these components:

- Kubewarden Custom Resources:
These are [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) that simplify the process of managing policies.

- [`kubewarden-controller`](https://github.com/kubewarden/kubewarden-controller):
This is a Kubernetes controller that reconciles Kubewarden's Custom Resources.
This component creates parts of the Kubewarden stack.
It also translates Kubewarden configuration into Kubernetes directives.

- Kubewarden policies:
These are WebAssembly modules holding the validation or mutation logic.
WebAssembly modules have detailed documentation in
[the 'writing policies' sections](/writing-policies/index.md).

- [`policy-server`](https://github.com/kubewarden/policy-server):
This component receives requests for validation.
It validates the requests by executing Kubewarden's policies.

Kubewarden integrates with Kubernetes using
[Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).
In particular, Kubewarden operates as a Kubernetes Admission Webhook.
The `policy-server` is the Webhook endpoint and it's called by the Kubernetes API server to validate requests.

Kubernetes discovers Kubewarden's Webhook endpoints with `kubewarden-controller`.
This works by registering either a `MutatingWebhookConfiguration`
or a `ValidatingWebhookConfiguration` object.

The diagram shows an overview of a cluster running the Kubewarden stack:

![Full architecture](/img/architecture.png)

## Journey of a Kubewarden policy

The architecture diagram appears complex at first. This section covers it step by step.

### Default Policy Server

On a new cluster, the Kubewarden components defined are:

- the Custom Resource Definitions (CRD)
- the `kubewarden-controller` Deployment
- a `PolicyServer` Custom Resource named `default`.

![Defining the first ClusterAdmissionPolicy resource](/img/architecture_sequence_01.png)

When the `kubewarden-controller` notices the default `PolicyServer` resource
it creates a Deployment of the `policy-server` component.

Kubewarden works as a Kubernetes Admission Webhook.
Kubernetes specifies using TLS to secure all Webhook endpoints.
The `kubewarden-controller` sets up this secure communication
by:

1. Generate a self-signed Certificate Authority
1. Use this CA to generate a TLS certificate key for the
`policy-server` Service.

These objects are all stored as Secret resources in Kubernetes.

Finally, `kubewarden-controller` creates the `policy-server` Deployment
and a Kubernetes ClusterIP Service
to expose it inside the cluster network.

### Defining the first policy

This diagram shows what happens when defining the first policy
that's bound to the default `policy-server` in the cluster:

![Defining the first ClusterAdmissionPolicy resource](/img/architecture_sequence_02.png)

The `kubewarden-controller` notices the new `ClusterAdmissionPolicy` resource and
so finds the bound `PolicyServer` and reconciles it.

### Reconciliation of `policy-server`

When creating, modifying or deleting a `ClusterAdmissionPolicy`,
a reconciliation loop activates in `kubewarden-controller`,
for the `PolicyServer` owning the policy.
This reconciliation loop creates a ConfigMap with all the polices bound to
the `PolicyServer`.
Then the Deployment rollout of the `policy-server` starts.
It results in starting the new `policy-server` instance with the updated configuration.

At start time, the `policy-server` reads its configuration
and downloads all the Kubewarden policies.
You can download policies from remote endpoints like HTTP servers and container registries.

You use policy configuration parameters to tune a policies' behavior.
Once all the policies are downloaded,
the `policy-server` ensures the policy settings provided by the user are valid.

The `policy-server` validates policy settings by invoking
the `validate_setting` function exposed by each policy.
This topic is covered more in depth in the
[writing policies section](/writing-policies/spec/01-intro-spec.md)
of the documentation.

The `policy-server` exits with an error
if one or more policies received wrong configuration parameters from the end user.

If all policies are correctly configured, `policy-server`
spawns a pool of worker threads
to evaluate incoming requests
using the Kubewarden policies specified by the user.

Finally, the `policy-server` starts a HTTPS server
listening to incoming validation requests.
The web server is secured using the TLS key and certificate
created before by `kubewarden-controller`.

Each policy is exposed, by the web server, by a dedicated path
following this naming convention: `/validate/<policy ID>`.

This shows the cluster once the initialization of `policy-server` is completed:

![policy-server initialized](/img/architecture_sequence_03.png)

### Making Kubernetes aware of the policy

The `policy-server` Pods have a
[`Readiness Probe`](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/),
that `kubewarden-controller` uses to know when
the `policy-server` Deployment is
ready to evaluate admission reviews.

Once the `policy-server` Deployment is marked as `Ready`,
the `kubewarden-controller` makes the Kubernetes API server aware of the new policy
by creating either a `MutatingWebhookConfiguration`
or a `ValidatingWebhookConfiguration` object.

Each policy has its dedicated `MutatingWebhookConfiguration`/`ValidatingWebhookConfiguration`
which points to the Webhook endpoint served by `policy-server`.
The endpoint is reachable by the `/validate/<policy ID>` URL.

![Kubernetes Webhook endpoint configuration](/img/architecture_sequence_04.png)

### Policy in action

Now that all the plumbing is complete,
Kubernetes starts sending Admission Review requests to the right `policy-server` endpoint.

![Policy in action](/img/architecture_sequence_05.png)

The `policy-server` receives the Admission Request object and,
based on the endpoint that received the request,
uses the correct policy to evaluate it.

Each policy is evaluated inside its own dedicated WebAssembly sandbox.
The communication between `policy-server` (the "host")
and the WebAssembly policy (the "guest")
is done using the waPC communication protocol.
This is covered in the [writing policies](/writing-policies/index.md) documentation.

## How multiple policy servers and policies are handled

A cluster can have many policy servers and Kubewarden policies defined.

Benefits of having many policy servers:
- Noisy Namespaces/Tenants generating lots of policy evaluations
can be isolated from the rest of the cluster and don't affect other users.
- Mission critical policies can be run in a Policy Server "pool",
making your infrastructure more resilient.

Each `policy-server` is defined by its own `PolicyServer` resource
and each policy is defined by its own `ClusterAdmissionPolicy` resource.

This leads back to the initial diagram:

![Full architecture](/img/architecture.png)

A `ClusterAdmissionPolicy` is bound to a `PolicyServer`.
Any `ClusterAdmissionPolicies` not specifying a `PolicyServer`
are bound to the `default` `PolicyServer`.
If a `ClusterAdmissionPolicy` references a `PolicyServer`
that doesn't exist, its state is `unschedulable`.

Each `policy-server` defines many validation endpoints,
one per policy. defined inside its configuration file.
You can load the same policy many times,
with different configuration parameters.

The `ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration` resources make the Kubernetes API server aware of these policies.
The `kubewarden-controller` keeps the API server and configuration resources in synchronization.

Finally, the Kubernetes API server dispatches incoming admission requests
to the correct validation endpoint exposed by `policy-server`.
