---
sidebar_label: Intro
title: Introduction to CEL
description: An introduction to writing Kubewarden policies with CEL.
keywords: [kubewarden, kubernetes, writing policies, introduction]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, cel, introduction]
doc-persona: [kubewarden-policy-developer, kubewarden-operator]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/cel/intro-cel"/>
</head>

The [Common Expression Language (CEL)](https://cel.dev) is a general-purpose
expression language designed to be fast, portable, and safe to execute. CEL as
a language is memory-safe, side-effect free, terminating (programs cannot loop
forever), and strong & dynamically typed. You can learn more about CEL at
[cel.dev](https://cel.dev), and practice it in the [CEL
playground](https://playcel.undistro.io).

## CEL in Kubernetes

CEL was chosen as the language for Kubernetes validation rules as CEL
expressions can be easily inlined into CRD schemas, and compiled and type-checked
"ahead-of-time" (when CRDs are created and updated). For these reasons
and its general characteristics, it's a perfect candidate for extending the
Kubernetes API.

Marked as stable with Kubernetes 1.30, one can use CEL on
[ValidatingAdmissionPolicies](https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy)
and other validation rules. For more info, see the Kubernetes docs
[here](https://kubernetes.io/docs/reference/using-api/cel).

### Kubernetes function libraries

Kubernetes CEL validation rules have access to several function libraries:

- [CEL standard functions](https://github.com/google/cel-spec/blob/v0.7.0/doc/langdef.md#list-of-standard-definitions)
- [CEL standard macros](https://github.com/google/cel-spec/blob/v0.7.0/doc/langdef.md#macros)
- [CEL extended string function library](https://pkg.go.dev/github.com/google/cel-go/ext#Strings)
- [Kubernetes CEL extension libraries](https://kubernetes.io/docs/reference/using-api/cel/#kubernetes-cel-libraries),
  with supplemental functions for lists, regex, URLs, authorizers, quantities,
  optional types, numerical comparisons, etc.

## CEL in Kubewarden: `cel-policy`

Kubewarden provides [cel-policy](https://github.com/kubewarden/cel-policy).
This is a policy that builds and bundles the upstream
[cel-go](https://pkg.go.dev/github.com/google/cel-go) interpreter, and also the
different libraries listed above and available for CEL in Kubernetes from
`apiextensions-apiserver`.

In addition, `cel-policy` bundles a **Kubewarden CEL extension library** that exposes
Kubewarden's [host capabilities as native
CEL](https://github.com/kubewarden/cel-policy?tab=readme-ov-file#host-capabilities):

- Sigstore verification
- OCI interaction
- Cryptographic functions
- Network operations
- Access to Kubernetes resources

This means that `cel-policy` is a superset of Kubernetes CEL,
and backwards-compatible. One can reuse CEL written for vanilla Kubernetes, and/or
make use of the features added by Kubewarden.

The `cel-policy` is shipped compiled and behaves as a CEL interpreter. Users of
the policy pass the desired CEL expressions in the `spec.settings` of the
(Cluster)AdmissionPolicy, and thanks to CEL features, the expression gets
compiled and typed-checked for correctness when creating or updating the
(Cluster)AdmissionPolicy. This means there's no need for custom builds of the
`cel-policy`.

### Benefits of Kubewarden's `cel-policy` in comparison with ValidatingAdmissionPolicies

The Kubewarden `cel-policy`:

- It's CEL code is backwards-compatible with ValidatingAdmissionPolicies.
- Contrary to ValidatingAdmissionPolicies, it doesn't need a binding such as
  ValidatingAdmissionPolicyBinding, as this is included in Kubewarden's
  (Cluster)Admissionpolicies definitions.
- Can be deployed to clusters that lack ValidatingAdmissionPolicies support.
- Is context-aware, and makes use of Kubewarden's fine-grained permissions
  for [context awareness](../../../reference/spec/05-context-aware-policies.md).
- Is deployed as (Cluster)AdmissionPolicy.
- Benefits from Kubewarden's tracing and telemetry on policies.
- It will be taken into account by the Audit Scanner.
- Can be developed and tested out-of-cluster thanks to kwctl.
