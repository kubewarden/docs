---
sidebar_label: Rego
title: Rego
description: Writing Kubewarden policies using Rego.
keywords: [kubewarden, kubernetes, writing policies, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, introduction]
---

:::note
Rego support has been introduced starting from these releases:

- kwctl: v0.2.0
- policy-server: v0.2.0

Rego policies support context aware data starting from the Kubewarden 1.9 release.

:::

The Rego language is a domain specific language designed to embrace
policies as
code. [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/)
is a language inspired by Datalog.

There are two ways of writing Rego policies as of today in order to
implement policies as code in Kubernetes: Open Policy Agent and
Gatekeeper.

While the next couple of sections detail how the two frameworks are different
even though the same language is used, if you're more interested in the Kubewarden
implementation you may directly visit the framework-specific documentation we have linked below.

- [Open Policy Agent](../rego/open-policy-agent/01-intro.md)
- [Gatekeeper](../rego/gatekeeper/01-intro.md)

## One language. Two frameworks

### Open Policy Agent

Open Policy Agent is a project that allows you to implement policies
as code in any project. You can rely on Open Policy Agent for any
policy based check that you might require in your own application,
that will in turn execute the required Rego policies.

In this context, writing policies for Kubernetes is just another way
of exercising Open Policy Agent. By using Kubernetes admission
webhooks, it's possible to evaluate requests using Open Policy Agent,
that will in turn execute the policies written in Rego.

Open Policy Agent has some optional integration with Kubernetes
through its `kube-mgmt` sidecar. When deployed on top of Kubernetes
and next to the Open Policy Agent server evaluating the Rego policies,
it is able to replicate the configured Kubernetes resources into Rego
-- so those Kubernetes resources are visible to all policies. It also
lets you define policies inside Kubernetes' ConfigMap objects. You can
read more about it on [its project
page](https://github.com/open-policy-agent/kube-mgmt).

### Gatekeeper

Gatekeeper is very different from Open Policy Agent in this regard. It
is focused exclusively to be used in Kubernetes, and takes advantage
of that as much as it can, making some Kubernetes workflows easier
than Open Policy Agent in many cases.

## Looking at the differences

Both Open Policy Agent and Gatekeeper policies use Rego to describe
their policies as code. However, this is only one part of the
puzzle. Each solution has differences when it comes to writing real
policies in Rego, and we are going to look at those differences in the
next sections.

## Entry point

The entry point is the name of a rule within a package, and is the
rule to be invoked by the runtime when the policy is instantiated.

## Current limitations

### Context-aware policies

Context-aware policies are policies that don't evaluate the input
request in isolation. They take other factors into account in order to
take a decision. For example, a policy that evaluates namespaced
resources and uses an annotation on the parent namespace to configure
something on the policy. Another example would be a policy that
evaluates `Ingress` resources, but that in order to take a decision
has the list of the already existing `Ingress` resources.

The concept of context-aware policies can also extend to custom
resources, so your policy might want to evaluate a request based on
currently persisted custom resources as well.

Both Open Policy Agent and Gatekeeper support context-aware
policies starting from the Kubewarden 1.9 release.

More details about context aware policies can be found [here](../../../reference/spec/05-context-aware-policies.md).

### Mutating policies

Gatekeeper has support for mutating policies, but Kubewarden has not
yet implemented mutating policies with Gatekeeper compatibility. You
can use policies that use the Kubewarden SDK to write mutating
policies, but at the time of writing, you cannot run Gatekeeper
mutating policies in Kubewarden yet.
