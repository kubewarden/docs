---
sidebar_label: Use cases
sidebar_position: 74
title: Kubewarden use cases
description: A description of certain use cases for Kubewarden.
keywords: [Kubewarden, documentation, use cases, case studies]
doc-persona: [kubewarden-all]
doc-type: [explanation]
doc-topic: [explanation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/use-cases"/>
</head>

These are a few example use cases for Kubewarden's [personas](./personas.md).

## Case A: As a Kubernetes operator, I want to ensure my cluster is safe and compliant.

I deploy Kubewarden and its default configuration with its
`kubewarden-defaults` Helm chart, in the `kubewarden` Namespace. This deploys a
default PolicyServer and recommended ClusterAdmissionPolicies in the
`kubewarden` namespace, solely under the control of the Kubernetes operator.

As an operator, I can add more PolicyServers under a managed Namespace (such as
`kubewarden`) to distribute load and fault tolerance.

Operators can deploy more ClusterAdmissionPolicies and
ClusterAdmissionPolicyGroups. These check the totality of the Kubernetes
resources for any type of operation (GET, CREATE, UPDATE, PATCH, DELETE,
PROXY). This ensures operations into the cluster are safe and compliant.

These include:

* security
* compliance (to industry standards or company regulations)
* resource optimization (via mutating policies)
* governance of Kubernetes environments (via labels and naming conventions)
* best practices
* image verification

Security expectations change over time. Previously correct deployments in the
cluster may no longer be so. Yet Kubewarden has already accepted those
operations in the cluster. In these situations, the operator can deploy the
Audit Scanner feature, a CronJob that runs periodically and evaluates the
existing resources in the cluster. This checks the cluster is safe and
compliant even over time.

The operator can configure policies in `monitor` mode instead of `protect`
mode, to learn from the state of the cluster without blocking operations.

Operators can receive information from policies and the Kubewarden stack by
consuming logs and OpenTelemetry information for metrics and tracing.

## Case B: As a Kubernetes operator, I want to provide a framework to my Kubernetes users so they can self-service in their Namespaces.

As an operator, I deploy Kubewarden as in Case A for a set of policies of my
choosing. This provides me with a safe baseline in the cluster that other users
can't evade.

As well as Case A, I have different personas per Namespaces: perhaps teams,
team administrators, test deployments, and others. I allow each Namespace
administrator to self-service by letting them deploy PolicyServers in their
Namespace, along with namespaced AdmissionPolicies and AdmissionPolicyGroups.
This architecture means that they're in control of their PolicyServer and
policies. The policies only apply to their Namespace, and they constrain
resource usage to their Namespace.

It also permits the operator to segregate noisy tenants, reserving
performant PolicyServers for those tenants and tasks that need high
throughput and low latency, for example.

## Case C: As a policy author, I want to use the tools and languages that I know to write new policies.

Kubewarden achieves this by supporting any language that compiles to
WebAssembly as possible target languages for policies. This means that policy
authors can reuse their workflows (`git`, CI, editors, peer reviews, etc.), and
tools: languages, language libraries, testing harnesses and frameworks, etc.

It permits re-using Domain Specific Languages (like Rego, CEL, Kyverno's
YAML+macros) or general-purpose languages (like Go, Rust, C#, Javascript, any
that compiles to Wasm). Kubewarden provides
[SDKs](./tutorials/writing-policies/index.md) for a few languages as
first-class support.

Kubewarden policies can be simple or complex
[context-aware](./explanations/context-aware-policies.md) policies.
Context-aware policies are also used to interface with separate workloads (for
example, to obtain information from an image scanner long-running service).

## Case D: As a system integrator, I want to re-use Kubewarden as part of my security and compliance solution.

As a system integrator, I want to re-use Kubewarden, and possibly re-use other
solutions by including them in Kubewarden.

As a system integrator, I can reuse parts of Kubewarden. For example, the
`policy-server`, to police resources, internal or external to the Kubernetes
cluster via the ["raw policies"](./howtos/raw-policies.md) feature.

System integrators can choose to deploy the `kubewarden-controller` or manage
the CRDs on their own. They can choose to deploy or scale the Audit Scanner as
needed.

I can create new components, for example an image scanner, and interface with
it via a context-aware policy, without having a monolithic implementation in
a Kubernetes controller.

System integrators can create new components. For example, an image scanner,
and interface with it via a context-aware policy, without having a monolithic
implementation in a Kubernetes controller.

## Non-goals

Kubewarden doesn't intend to:

- Replace Kubernetes built-in security features, but complement them:
  - Kubewarden provides migration from PSPs.
  - You can re-use ValidatingAdmissionPolicies and CEL policies with Kubewarden's
    `cel-policy`.
  - Kubewarden policies can be mutating, while Pod Security Admission cannot.
  - Kubewarden policies benefit from the Kubewarden stack features (audit
    scanner, telemetry, CRD management).
- Provide runtime security like intrusion detection or runtime container
  isolation.
- Provide host system protection of clusters.
- Provide infinite policy execution flexibility. To prevent DoS attacks,
  policies' processing times are limited.


