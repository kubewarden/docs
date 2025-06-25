---
sidebar_label: Rego
title: Rego
description: Writing Kubewarden policies using Rego.
keywords: [kubewarden, kubernetes, writing policies, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, introduction]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/intro-rego"/>
</head>

:::note
Rego support is available from these releases:

- kwctl: v0.2.0
- policy-server: v0.2.0

Rego policies support context aware data from the Kubewarden 1.9 release.

:::

The Rego language is a domain specific language to enable policies as code.
[Rego](https://www.openpolicyagent.org/docs/latest/policy-language/)
is a language inspired by [Datalog](https://en.wikipedia.org/wiki/Datalog).

There are two ways of writing Rego policies to implement policies as code in Kubernetes,
Open Policy Agent and Gatekeeper.

The next couple of sections shows how the two frameworks are different,
even though using the same language.
If you're more interested in the Kubewarden implementation,
you can directly visit the framework-specific documentation linked below.

- [Open Policy Agent](../rego/open-policy-agent/01-intro.md)
- [Gatekeeper](../rego/gatekeeper/01-intro.md)

## One language, two frameworks

### Open Policy Agent (OPA)

Open Policy Agent is a project that allowing you to implement policies as code in any project.
You can use OPA for any policy based check your application needs.

In this context, writing policies for Kubernetes is simply exercising OPA.
By using Kubernetes admission webhooks,
it's possible to evaluate requests using OPA,
which executes the policies written in Rego.

OPA has optional integration with Kubernetes through its `kube-mgmt` sidecar.
When deployed on Kubernetes, and with the OPA server evaluating the Rego policies,
it's able to replicate the configured Kubernetes resources into Rego.
So, those Kubernetes resources are visible to all policies.
With OPA you can define policies inside Kubernetes' ConfigMap objects.
You can read more about it on
[its project page](https://github.com/open-policy-agent/kube-mgmt).

### Gatekeeper

Gatekeeper focuses, only, on use in Kubernetes,
and takes advantage of that as much as possible,
making Kubernetes workflows easier than OPA in certain cases.

## Looking at the differences

Both OPA and Gatekeeper policies use Rego to describe policies as code.
Each solution has differences when it comes to writing policies in Rego,
as shown in the next sections.

## Entry point

The entry point is the name of a rule within a package,
and is the rule invoked by the runtime when the policy runs.

## Current limitations

### Context-aware policies

Context-aware policies are policies that don't evaluate the input request in isolation.
They take other factors into account to take a decision.
For example, a policy that evaluates namespaced resources,
and uses an annotation,
on the parent namespace to configure something in the policy.
Another example would be a policy that evaluates `Ingress` resources,
but to make a decision also has the list of the existing `Ingress` resources.

The idea of context-aware policies can also extend to custom resources,
so your policy might want to evaluate a request based on currently used custom resources as well.

Both OPA and Gatekeeper support context-aware policies,
starting from the Kubewarden 1.9 release.

More details about context aware policies are
[here](../../../reference/spec/05-context-aware-policies.md).

### Mutating policies

Gatekeeper has support for mutating policies,
but Kubewarden hasn't yet implemented mutating policies with Gatekeeper compatibility.
You can use policies that use the Kubewarden SDK to write mutating policies,
but currently, you can't run Gatekeeper mutating policies in Kubewarden.
