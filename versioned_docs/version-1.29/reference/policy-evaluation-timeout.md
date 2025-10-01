---
sidebar_label: Policy evaluation timeout
sidebar_position: 90
title: Policy evaluation timeout protection
description: Policy evaluation timeout protection for Kubewarden
keywords: [kubewarden, kubernetes, policy timeout protection]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [reference]
doc-topic: [operator-manual, policy-evaluation-timeout]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/policy-evaluation-timeout"/>
</head>

:::info
This feature is available starting from Kubewarden v1.5.0 for per-Policy-Server
timeout, and from v1.29.0 for per-Policy timeout.
:::

Policy evaluation timeout protection is a security feature of the Policies and
Policy Server.
Its purpose is to limit the amount of time a request evaluation can take.

## Purpose

You can write Kubewarden policies using both traditional programming languages
(like [Go](../tutorials/writing-policies/go/01-intro-go.md),
[Rust](../tutorials/writing-policies/rust/01-intro-rust.md) and
[others](../tutorials/writing-policies/index.md)) or using the special query
language [Rego](../tutorials/writing-policies/rego/01-intro-rego.md). Both
approaches have merits so a goal of Kubewarden is to let the policy authors
choose the best tool for their needs.

When using a traditional,
[Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness)
programming language, it's possible to have issues like:

- [Infinite loops](https://en.wikipedia.org/wiki/Infinite_loop)
- [Deadlocks](https://en.wikipedia.org/wiki/Deadlock)
- Slow running code lacking optimizations
- Computationally intense operations

The policy evaluation timeout protection feature terminates the evaluation of a
request after a defined period of time. This ensures the Policy Server always has
compute resources available to process incoming requests.

## Limitations

Currently, policy evaluation timeout protection is capable of interrupting most
long running evaluations. There are certain edge cases not yet handled.
This includes invoking a `sleep` instruction from within a policy, and
deadlocks.

A future release of Policy Server will address these scenarios.

## Configuration

All values of the per-Policy evaluation timeouts, the per-Policy-Server
evaluation timeout, and the webhook timeouts are validated so they all are
within acceptable values of each other. For example, it is not possible to
set a Policy evaluation timeout value that is higher than the Kubernetes'
webhook timeout.

### Per Policy

Starting with Kubewarden v1.29.0, every Kubewarden Policy can set its own
timeout value via its `spec.timeoutEvalSeconds` attribute. This is not to be confused with
`spec.timeoutSeconds`, used for the Webhook timeout (see section
[below](#comparison-with-kubernetes-dynamic-admission-controller-timeout)).

The `spec.timeoutEvalSeconds` is fine-grained, allowing per-Policy tuning of
their evaluation timeout.

This setting takes precedence over the global timeout evaluation configuration
per-Policy-Server.

For example, to set a longer evaluation timeout for a specific policy:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  annotations:
    io.kubewarden.policy.category: Secrets
    io.kubewarden.policy.severity: medium
  name: env-variable-secrets-scanner
spec:
  module: registry://ghcr.io/kubewarden/policies/env-variable-secrets-scanner:v1.0.6
  settings: {}
  timeoutEvalSeconds: 10 # Set evaluation timeout
  mutating: false
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations: ["CREATE"]
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["replicationcontrollers"]
      operations: ["CREATE", "UPDATE"]
    - apiGroups: ["apps"]
      apiVersions: ["v1"]
      resources: ["deployments", "replicasets", "statefulsets", "daemonsets"]
      operations: ["CREATE", "UPDATE"]
    - apiGroups: ["batch"]
      apiVersions: ["v1"]
      resources: ["jobs", "cronjobs"]
      operations: ["CREATE", "UPDATE"]
```

### Per Policy Server

Starting with Kubewarden v1.5.0, Policy Servers come with a configurable
evaluation timeout, enabled by default. Interruption of a request evaluation
takes place after 2 seconds. This configuration affects all policies scheduled
in that Policy Server. The per-Policy configurable `spec.timeoutEvalSeconds`
timeout has precedence over this per-Policy-Server setting.

You can tune this behavior using these environment variables:

- `KUBEWARDEN_DISABLE_TIMEOUT_PROTECTION`: this disables policy evaluation
  entirely. Any assigned value turns off the feature.
- `KUBEWARDEN_POLICY_TIMEOUT`: this sets a different timeout value.
  The value is in seconds with a default value of `2`.

When using the
[`PolicyServer`](https://doc.crds.dev/github.com/kubewarden/kubewarden-controller/policies.kubewarden.io/PolicyServer/v1@v1.4.2)
Kubernetes Custom Resource Definition, you can set these environment variables
as follows:

```yaml
# A Policy Server that has policy evaluation timeout disabled
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: no-policy-timeout
spec:
  env:
    - name: KUBEWARDEN_DISABLE_TIMEOUT_PROTECTION
      value: "true"
---
# A Policy Server that has policy evaluation timeout enabled,
# with a 3 seconds timeout value
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: custom-policy-timeout
spec:
  env:
    - name: KUBEWARDEN_POLICY_TIMEOUT
      value: "3"
```

## Comparison with Kubernetes Dynamic Admission Controller timeout

Kubewarden is a [webhook](https://en.wikipedia.org/wiki/Webhook) implementation
of the [Kubernetes Dynamic Admission
Controller](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).

Internally, the Kubernetes API server makes an HTTP request to Kubewarden's
Policy Server describing an event that's about to happen. After the HTTP
request, the Kubernetes API Server waits for an answer. However, the Kubernetes
API server doesn't wait forever. After a certain amount of time, it considers
the request to have timed out.

Quoting the [Kubernetes
documentation](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#timeouts):

> Because webhooks add to API request latency, they should evaluate as quickly
> as possible. Setting `timeoutSeconds` configures how long the API server
> should wait for a webhook to respond before treating the call as a
> failure.
>
> If the timeout expires before the webhook responds, the webhook call
> will be ignored or the API call will be rejected based on the
> [failure policy](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#failure-policy).
>
> The timeout value must be between 1 and 30 seconds.
>
> The timeout for an admission webhook defaults to 10 seconds.

That means that, regardless of the policy evaluation timeout feature, each
Kubernetes admission request is subject to a timeout.

This webhook configuration is exposed in every Kubewarden Policy via its
`spec.timeoutSeconds` attribute. By default, the timeout value is 10 seconds.

:::info

All the Kubernetes admission requests made to a Policy Server are subject
to two different timeouts:

- The Kubernetes API server timeout value. Set to 10 seconds by default,
  tunable on a per-Policy basis via the dedicated `spec.timeoutSeconds`
  attribute on the Policy Custom Resource.
- The policy evaluation timeout. Set in the Policy Server via environment
  variables or per-Policy via the `spec.timeoutEvalSeconds` attribute on Policy
  Custom Resource.

:::

Now you can examine the following scenarios to better understand the
differences between Kubernetes' Webhook timeout and Kubewarden's policy
evaluation timeout.

### Kubewarden policy evaluation timeout is disabled

Assume you have a Policy Server that has the policy evaluation timeout feature
turned off, and no policy scheduled on it has set their `spec.timeoutEvalSeconds` field.
This Policy Server is hosting a policy affected by a bug which causes it to
enter an infinite loop during evaluation.

The Kubernetes API server sends an admission request for evaluation by this
buggy policy. As a result, the policy evaluation enters an infinite loop.
Meanwhile, the Kubernetes API server is waiting for a response.

After 10 seconds, Kubernetes' webhook timeout takes place, and the request is
handled according to the webhook's failure policy.

Now the Policy Server has computational resources stuck in this infinite loop.
Over time, with more admission requests triggering the bugged policy, the
Policy Server runs out of computational resources. It's unable to respond
to the Kubernetes API server. This is equal to a Denial Of Service (DOS)
attack on the Policy Server.

### Kubewarden policy evaluation timeout is enabled

Assume a scenario where the same Policy Server now has the policy evaluation
timeout feature enabled, either globally in the Policy Server, or in the Policy
via the policy `spec.timeoutEvalSeconds`, and the policy evaluation timeout is
2 seconds.

The Kubernetes API server sends an admission request for evaluation by this
buggy policy. As a result, policy evaluation enters an infinite loop.
Meanwhile, the Kubernetes API server is waiting for a response.

After two seconds, Kubewarden's policy evaluation timeout feature interrupts
the policy evaluation and produces a rejection response. The response contains
a message explaining that rejection happened because the policy evaluation
didn't complete in time.

:::note

Setting Kubewarden's policy evaluation timeout to a value as high as the
Kubernetes' webhook timeout isn't a good choice.

While the policy evaluation is still interrupted, reducing the chances of a DOS
attack, the final rejection response isn't produced by the Policy Server. The
rejection comes from the Kubernetes API server with the webhook timeout.

As a result, it's harder for users, and Kubernetes operators, to detect these
slow/buggy policies. The only proof of the policy evaluation interruption is in
Policy Server logs and trace events.

:::
