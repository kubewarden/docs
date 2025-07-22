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
This feature is available starting from Kubewarden v1.5.0.
:::

Policy evaluation timeout protection is a security feature of the Policy Server.
Its purpose is to limit the amount of time a request evaluation can take.

Kubewarden enables this feature from version v1.5.0.

## Purpose

You can write Kubewarden policies using both traditional programming languages
(like [Go](../tutorials/writing-policies/go/01-intro-go.md),
[Rust](../tutorials/writing-policies/rust/01-intro-rust.md) and
[others](../tutorials/writing-policies/index.md)) or using the special query
language [Rego](../tutorials/writing-policies/rego/01-intro-rego.md). Both
approaches have merits so a goal of Kubewarden is to let the policy authors
choose the best tool for their needs.

When using a traditional, [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) programming language, it's possible to have issues like:

* [infinite loops](https://en.wikipedia.org/wiki/Infinite_loop)
* [deadlocks](https://en.wikipedia.org/wiki/Deadlock).
* slow running code lacking optimizations
* computationally intense operations

The policy evaluation timeout protection feature terminates the evaluation of a
request after a defined period of time. This ensures Policy Server always has
compute resources available to process incoming requests.

## Limitations

Currently, policy evaluation timeout protection is capable of interrupting most
long running evaluations. There are certain edge cases not yet handled.
This includes invoking a `sleep` instruction from within a policy, and
deadlocks.

A future release of Policy Server will address these scenarios.

Finally, the policy evaluation timeout affects all the policies hosted by a
Policy Server instance. Currently, there's no way to tune policy evaluation
timeout on a per-policy basis.

## Configuration

Policy evaluation timeout is a configuration option of Policy Server enabled by
default. Interruption of a request evaluation takes place after 2 seconds.

You can tune this behavior using these environment variables:

* `KUBEWARDEN_DISABLE_TIMEOUT_PROTECTION`: this disables policy evaluation
  entirely. Any assigned value turns off the feature.
* `KUBEWARDEN_POLICY_TIMEOUT`: this sets a different timeout value.
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

Internally, the Kubernetes API server makes an HTTP request to  Kubewarden's
Policy Server describing an event that's about to happen. After the HTTP
request, the Kubernetes API Server waits for an answer. However, the Kubernetes
API server doesn't wait forever. After a certain amount of time, it considers
the request to have timed out.

Quoting the [Kubernetes documentation](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#timeouts):

> Because webhooks add to API request latency, they should evaluate as quickly
> as > possible. `timeoutSeconds` allows configuring how long the API server
> should wait for a webhook to respond before treating the call as a
> failure.
>
> If the timeout expires before the webhook responds, the webhook call
> will be ignored or the API call will be rejected based on the [failure policy](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#failure-policy).
>
> The timeout value must be between 1 and 30 seconds.
>
> The timeout for an admission webhook defaults to 10 seconds.

That means that, regardless of the policy evaluation timeout feature, each
Kubernetes admission request is subject to a timeout.

Every Kubewarden Policy can set its own timeout value via the `timeoutSeconds`
attribute of the `ClusterAdmissionPolicy` and `AdmissionPolicy` custom resources.
By default, the timeout value is 10 seconds.

:::info

All the Kubernetes admission requests made to a Policy Server are subject
to two different timeouts:

* The Kubernetes API server timeout value. Set to 10 seconds by default,
  tunable on a per-policy basis via a dedicated attribute on the Kubewarden
  Custom Resources.
* The Policy Server policy evaluation timeout

:::

Now you can examine the following scenarios to better understand the
differences between Kubernetes' Webhook timeout and Kubewarden's policy
evaluation timeout.

### Kubewarden policy evaluation timeout is disabled

Assume you have a Policy Server that has the policy evaluation timeout feature
turned off. This Policy Server is hosting a policy affected by a bug which
causes it to enter an infinite loop during evaluation.

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
timeout feature enabled, and the policy evaluation timeout is 2 seconds. The
Kubernetes API server sends an admission request for evaluation by this buggy
policy. As a result, policy evaluation enters an infinite loop. Meanwhile, the
Kubernetes API server is waiting for a response.

After two seconds, Kubewarden's policy evaluation timeout feature interrupts
the policy evaluation and produces a rejection response. The response contains
a message explaining that rejection happened because the policy evaluation
didn't complete in time.

:::note

Setting Kubewarden's policy evaluation timeout to a value higher than the
Kubernetes' webhook timeout isn't a good choice.

While the policy evaluation is still interrupted, reducing the chances of a DOS
attack, the final rejection response isn't produced by the Policy Server. The
rejection comes from the Kubernetes API server with the webhook timeout.

As a result, it's harder for users, and Kubernetes operators, to detect these
slow/buggy policies. The only proof of the policy evaluation interruption is in
Policy Server logs and trace events.

:::
