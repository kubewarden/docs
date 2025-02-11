---
sidebar_label: Architecture
sidebar_position: 61
title: Kubewarden architecture
description: The Kubewarden architecture
keywords: [kubewarden, kubernetes, architecture]
doc-persona: [kubewarden-all]
doc-type: [explanation]
doc-topic: [architecture]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/explanations/architecture"/>
</head>

Kubewarden is a Kubernetes policy engine.
It uses policies written in a programming language of your choosing.
This language must generate a WebAssembly binary for Kubewarden to use.

## What _is_ a policy?

A policy is an [Open Container Initiative](https://opencontainers.org/) (OCI)
artifact. It contains a WebAssembly module,
the policy code, and the metadata required by PolicyServer
to perform admission request validations and mutations.

:::note

Like
[Kubernetes](https://kubernetes.io/docs/contribute/style/style-guide/),
Kubewarden uses the terms
'PolicyServer' when discussing the Kubewarden policy server
and
`policy-server` when discussing a Pod or Deployment of a Kubewarden PolicyServer.

:::

## Design principles

### Making use of core Kubernetes features

The team designed Kubewarden to use core features of Kubernetes,
without reinventing the wheel.
The project utilizes a combination of:

- Kubernetes Controllers
- Custom Resource Definitions (CRDs)
- Webhooks (Validation and Mutating)
- the Control Plane's event notification system

### Makes effective use of the Kubernetes architecture

Kubewarden operates seamlessly within the Kubernetes ecosystem. At its core,
the Kubewarden controller is a Kubernetes controller, monitoring Kubewarden
Custom Resource Definitions (CRDs) and configuring Kubernetes resources to
execute them. This integration ensures that Kubewarden uses the built-in
Kubernetes mechanisms, such as controllers and CRDs, to watch, manage, and
apply security policies efficiently.

### Extensible policy definition

Kubewarden employs CRDs to define and manage Kubewarden resources, which
specify the rules for admission request validations. This design enables users
to extend Kubernetes' capabilities with custom admission controls, so
that security and compliance policy enforcement is consistent across the
cluster.

### Direct admission control

When setup by the Kubewarden controller, the policy-server Service receives
admission requests directly from the Kubernetes control plane, using
`ValidationWebhooks` and `MutatingWebhooks`. This direct interaction
streamlines the admission control process, reducing latency and increasing
efficiency in policy enforcement.

WebAssembly offers a sand-boxed execution environment, ensuring policies run in
isolation, thus enhancing the security and stability of the policy enforcement
mechanism. This isolation prevents policies from interfering with each other or
with the host system, mitigating the risk of malicious code execution.
WebAssembly is portable and efficient, enabling policies to run across
different environments without modification.

This cross-platform compatibility ensures that Kubewarden policies are
versatile, so you can distribute and run them on diverse Kubernetes clusters

### OCI based policy artifacts

Policies in Kubewarden are OCI (Open Container Initiative) artifacts.
This standardization makes the distribution and versioning of policies easier.
Policies contain both the WebAssembly modules for enforcement logic,
and metadata necessary for the PolicyServer's operation.
Using OCI artifacts promotes interoperability and ease of management
within cloud ecosystems.

### Fine-grained policy application

Kubewarden associates policies with their own 'validation' or 'mutating' webhook,
allowing for fine-grained application of admission controls.
This flexibility enables administrators
to tailor the enforcement of policies according to specific needs,
enhancing the security and compliance posture of the Kubernetes cluster.

## The Kubewarden stack

The Kubewarden consists of these components:

- Kubewarden Custom Resources are
  [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
  that simplify the process of managing policies.

  Kubewarden integrates with Kubernetes using
  [Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).
  In particular, Kubewarden operates as a Kubernetes Admission Webhook.
  The `policy-server` is the Webhook endpoint called by the Kubernetes
  API server to validate requests.

- The [Kubewarden controller](https://github.com/kubewarden/kubewarden-controller)
  is a Kubernetes controller that reconciles Kubewarden's Custom Resources.
  This controller creates parts of the Kubewarden stack.
  It also translates Kubewarden configuration into Kubernetes directives.

  The `kubewarden-controller` registers the needed
  `MutatingWebhookConfiguration` or
  `ValidatingWebhookConfiguration`
  objects with the Kubernetes API server.

- [Kubewarden policies](../tutorials/writing-policies/index.md)
  are WebAssembly modules holding the validation or mutation logic.
  WebAssembly modules have detailed documentation in the
  [writing policies](../tutorials/writing-policies/index.md) sections.

- The [PolicyServer](https://github.com/kubewarden/policy-server)
  receives requests for validation.
  It validates the requests by executing Kubewarden policies.

- The [audit scanner](https://github.com/kubewarden/audit-scanner)
  inspects the resources already in the cluster.
  It identifies those violating Kubewarden policies.

  [Audit scanner](/explanations/audit-scanner/audit-scanner.md)
  constantly checks the resources declared in the cluster,
  flagging the ones that no longer adhere to the deployed Kubewarden policies.

  ```mermaid
  %%{
    init: {
      "flowchart": {
        "htmlLabels": false,
      }
    }
  }%%
  graph LR
      subgraph " "
        direction LR
        subgraph " "
          direction LR
            k8s(("Kubernetes"))
            registry[("OCI registry")]
          end
          subgraph kw["`**Kubewarden**`"]
            controller("`**KW controller**`")
            subgraph policy-server["`**policy-server**`"]
              direction LR
              kw-policy-1{{"Policy 1"}}
              kw-policy-2{{"Policy 2"}}
              kw-policy-3{{"Policy 3"}}
          end
          webhooks(["ValidationWebhooks and\nMutatingWebhooks"])
          audit-scanner["KW audit scanner"]
        end
      end
      policy-server -->|"downloads\npolicies from"| registry
      controller -->|"watches for\nevents"| k8s
      controller -->|"creates"| webhooks
      controller -->|"creates\npolicy-server\ninstances"| policy-server
      k8s -. "sends admission\nrequests using" .-> webhooks
      webhooks -. "sent admission\nrequests from K8s" .-> policy-server
      audit-scanner -->|"sends audit\nadmission requests"| policy-server
  ```

## The journey of a Kubewarden policy

### Default PolicyServer

On a new cluster, the Kubewarden components defined are:

- Custom Resource Definitions (CRD)
- The `kubewarden-controller` Deployment
- A PolicyServer Custom Resource named `default`.

When the `kubewarden-controller` notices the default PolicyServer resource,
it creates a `policy-server` deployment of the PolicyServer component.

Kubewarden works as a Kubernetes Admission Webhook.
Kubernetes specifies using
[Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security)
(TLS) to secure all Webhook endpoints.
The `kubewarden-controller` sets up this secure communication
by:

1. Generating a self-signed Certificate Authority
1. Use this CA to generate a TLS certificate key for the `policy-server` Service.

These objects are all stored as `Secret` resources in Kubernetes.

Finally, `kubewarden-controller` creates the `policy-server` Deployment
and a Kubernetes ClusterIP Service
to expose it inside the cluster network.

### Defining the first policy

:::note

A policy must define which `policy-server` it must run on.
It **binds** to a `policy-server` instance.
You can have different policies with the same Wasm module and settings
running in many PolicyServers.
However, you can't have a single policy definition that runs in many PolicyServers.

:::

The `kubewarden-controller` notices the new `ClusterAdmissionPolicy` resource and
so finds the bound `policy-server` and reconciles it.

### Reconciliation of a `policy-server`

When creating, modifying or deleting a `ClusterAdmissionPolicy` or `AdmissionPolicy`,
a reconciliation loop activates in `kubewarden-controller`,
for the `policy-server` owning the policy.
This reconciliation loop creates a `ConfigMap` with all the policies bound to the `policy-server`.
Then the Deployment rollout of the `policy-server` starts.
This results in starting the new `policy-server` instance with the updated configuration.

At start time, the `policy-server` reads its configuration from the ConfigMap
and downloads all the Kubewarden policies specified.
You can download Kubewarden policies from remote HTTP servers and container registries.

You use policy settings parameters to tune a policies' behavior.
After startup and policy download the `policy-server`
checks the policy settings provided by the user are valid.

The `policy-server` validates policy settings by invoking
the `validate_setting` function exposed by each policy.
There is further documentation in the
[specification reference](../reference/spec/01-intro-spec.md)
section of the documentation.

If any policies received wrong configuration parameters,
from the users policy specification,
then any admission requests evaluated by that policy return an error.

When Kubewarden has configured all policies,
the `policy-server`
spawns a pool of worker threads to evaluate incoming requests
using the Kubewarden policies specified by the user.

Finally, the `policy-server` starts a HTTPS server,
listening to incoming validation requests.
Kubewarden uses the TLS key and certificate
created by the Kubewarden controller
to secure the web server.

The web server exposes each policy by a dedicated path
following the naming convention: `/validate/<policy ID>`.

### Making Kubernetes aware of the policy

All `policy-server` instances have a
[`Readiness Probe`](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/),
that `kubewarden-controller` uses to check when
the `policy-server` Deployment is ready to evaluate an
[`AdmissionReview`](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#webhook-request-and-response).

Once Kubewarden marks the `policy-server` deployment as 'uniquely reachable' or `Ready`,
the `kubewarden-controller` makes the Kubernetes API server aware of the new policy.
This is by creating either a `MutatingWebhookConfiguration` or a `ValidatingWebhookConfiguration` object.
In this context, 'uniquely reachable',
means that all the PolicyServer instances in the cluster have the latest policy configuration installed.
The distinction, is a fine point, but is necessary,
due to how roll-out of PolicyServers works.
It's possible to have the same policy,
on different PolicyServers with different configurations.

Each policy has a dedicated
`MutatingWebhookConfiguration` or `ValidatingWebhookConfiguration`
pointing to the Webhook endpoint served by `policy-server`.
The endpoint is reachable at the `/validate/<policy ID>` URL.

### Policy in action

Now that all the necessary plumbing is complete,
Kubernetes starts sending Admission Review requests to the right `policy-server` endpoints.

A `policy-server` receives the Admission Request object and,
based on the endpoint that received the request,
uses the correct policy to evaluate it.

Kubewarden evaluates each policy inside its own dedicated WebAssembly sand-box.
The communication between a `policy-server` instance (the "host")
and the WebAssembly policy (the "guest")
uses the waPC communication protocol.
The protocol description is part of the
[writing policies](../tutorials/writing-policies/index.md) documentation.
Policies can also use the interfaces provided by the
[Web Assembly System Interface](../tutorials/writing-policies/wasi/01-intro-wasi.md)
(WASI).

## How Kubewarden handles many PolicyServer and policies

A cluster can have many PolicyServers and Kubewarden policies defined.
There are benefits of having many PolicyServers:

- You can isolate noisy namespaces or tenants,
  or those generating many policy evaluations,
  from the rest of the cluster so as not to adversely affect other cluster operations.

- You can run mission-critical policies in a dedicated PolicyServer pool,
  making your infrastructure more resilient.

A PolicyServer resource defines each `policy-server`
and a `ClusterAdmissionPolicy` or `AdmissionPolicy` resource defines each policy.

A `ClusterAdmissionPolicy` and an `AdmissionPolicy` bind to a `policy-server`.
Any `ClusterAdmissionPolicy` not specifying a `policy-server`
binds to the default PolicyServer.
If a `ClusterAdmissionPolicy` references a `policy-server`
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
