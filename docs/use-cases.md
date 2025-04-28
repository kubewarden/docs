---
sidebar_label: Use cases
sidebar_position: 74
title: How to use this project?
description: how is the Kubewarden documentation organized?
keywords: [Kubewarden, documentation, use cases, case studies]
doc-persona: [kubewarden-all]
doc-type: [explanation]
doc-topic: [explanation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/use-cases"/>
</head>

Here stand some example use cases for our [personas](./personas.md).

#### Case A: as a Kubernetes operator, I want to ensure my cluster is safe and compliant.

I deploy Kubewarden and its default configuration with its
`kubewarden-defaults` Helm chart, in the `kubewarden` Namespace. This deploys a
default PolicyServer and recommended ClusterAdmissionPolicies in the
`kubewarden` namespace, solely under the control of the Kubernetes operator.

As an operator, I can add more PolicyServers under a managed Namespace
(such as `kubewarden`) to distribute load and fault tolerance.

The operator can deploy more ClusterAdmissionPolicies and ClusterAdmissionPolicyGroups
that check the totality of the Kubernetes resources, for any type of
operation (GET, CREATE, UPDATE, PATCH, DELETE, PROXY). This ensures operations into the
cluster are safe and compliant. This includes security, compliance (to
industry standards or company regulations), resource optimization (via
mutating policies), governance of Kubernetes environments (via labels and
naming conventions), best practices, image verification, etc.

There will be changes in security expectations in the future.
What was previously correct to be deployed in the cluster may no longer be correct.
Yet Kubewarden has already accepted those operations in the cluster. In these situations the operator can deploy the Audit
Scanner feature, a CronJob that runs periodically and evaluates the existing
resources in the cluster. This ensures the cluster is safe and compliant even
over time.

The operator can configure some or all the policies in `monitor` mode instead
of `protect` mode, to learn from the state of the cluster without blocking operations.

As usual, the operator can receive information from policies and the Kubewarden stack
by consuming logs and OpenTelemetry information for metrics and tracing.

#### Case B: As a Kubernetes operator, I want to provide a framework to my Kubernetes users so they can self-service in their Namespaces.

As an operator, I deploy Kubewarden as in Case A for a set of policies of my choosing.
This provides me with safe baseline in the cluster, that other users cannot evade.

In addition to Case A, I have different personas per Namespaces: perhaps
teams, team administrators, test deployments, etc.
I allow each Namespace administrator to self-service by letting them deploy
PolicyServers in their Namespace, along with namespaced AdmissionPolicies and
AdmissionPolicyGroups. This architecture means that they are in control of
their PolicyServer and policies, the policies only apply to their Namespace,
and the resource usage is contained also to their Namespace.

This also allows the operator to segregate noisy tenants, reserving
performant PolicyServers for those tenants and tasks that need high
throughput and low latency for example.

#### Case C: As a policy author, I want to use the tools and languages that I know to write new policies.

Kubewarden achieves this by supporting any language that compiles to
WebAssembly as possible target languages for policies. This means that policy authors
can reuse their workflows (`git`, CI, editors, peer reviews, etc), and tools:
languages, language libraries, testing harnesses and frameworks, etc.

This allows re-using Domain Specific Languages (like Rego, CEL, Kyverno's
YAML+macros) or general-purpose languages (like Go, Rust, C#, Javascript, any
that compiles to Wasm). Kubewarden provides [SDKs](./tutorials/writing-policies/index.md) for some languages as
first-class support.

Kubewarden policies can be as simple as desired, or complex
[context-aware](./explanations/context-aware-policies.md)
policies. Context-aware policies can also be used to interface with separate
workloads (for example, to obtain information from an image scanner
long-running service).

#### Case D: As a system integrator, I want to re-use Kubewarden as part of my security and compliante solution

As a system integration, I want to re-use Kubewarden, and/or re-use other solutions by including
them in Kubewarden.

As a system integrator, I can reuse parts of Kubewarden, such as the
`policy-server`, to police resources inside of the Kubernetes cluster, or
outside of the cluster via the ["raw
policies"](./howtos/raw-policies.md) feature.

The system integrator can chose to deploy the `kubewarden-controller` or
manage the CRDs on their own, and can chose to deploy or scale the Audit
Scanner as needed.

I can create new components, for example an image scanner, and interface with
it via a context-aware policy, without having a monolithic implementation in
a Kubernetes controller.
