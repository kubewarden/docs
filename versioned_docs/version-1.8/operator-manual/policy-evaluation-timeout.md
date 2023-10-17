---
sidebar_label: "Policy evaluation timeout"
title: ""
---

# Policy evaluation timeout protection

:::info
This feature is available starting from Kubewarden v1.5.0.
:::

Policy evaluation timeout protection is a security feature of Policy Server.
It's purpose is to limit the amount of time a request evaluation can take.

This feature is enabled by default from Kubewarden v1.5.0.

## Purpose

Kubewarden policies can be written using both traditional programming languages
(like [Go](../writing-policies/go/01-intro-go.md),
[Rust](../writing-policies/rust/01-intro-rust.md) and
[others](../writing-policies/index.md)
) or using the special query language [Rego](../writing-policies/rego/01-intro-rego.md).
While both approaches have their pros and cons, the goal of Kubewarden is to allow the policy
authors to pick the best tool to do their job.

When using a traditional programming language (or, to be
more correct, a [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness)
language), it is possible to introduce mistakes like
[infinite loops](https://en.wikipedia.org/wiki/Infinite_loop),
[deadlocks](https://en.wikipedia.org/wiki/Deadlock) or code that runs slowly
because it lacks optimizations or simply because it performs computationally
intense operations.

The policy evaluation timeout protection feature terminates the evaluation of
a request after a certain time. This ensures Policy Server always has compute
resources available to process incoming requests.

## Limitations

Currently, policy evaluation timeout protection is capable of interrupting
the majority of long running evaluations.
There are however certain edge cases that are not yet handled. This includes
invoking a `sleep` instruction from within a policy and deadlocks.

These scenarios are going to be handled by a future release of Policy Server.

Finally, the policy evaluation timeout affects all the policies hosted by a
Policy Server instance. Currently, there's no way to tune policy evaluation timeout
on a per-policy basis.

## Configuration

Policy evaluation timeout is a configuration option of Policy Server which is
enabled by default.
By default, a request evaluation is interrupted after 2 seconds.

This behavior can be tuned by using these environment variables:

* `KUBEWARDEN_DISABLE_TIMEOUT_PROTECTION`: this disables policy evaluation entirely.
  The value of the environment variable is not relevant, any value will lead to the
  feature being turned off.
* `KUBEWARDEN_POLICY_TIMEOUT`: this allows to set a different timeout value. The
  value is expressed in seconds and has a default value of `2`.

When using the [`PolicyServer`](https://doc.crds.dev/github.com/kubewarden/kubewarden-controller/policies.kubewarden.io/PolicyServer/v1@v1.4.2)
Kubernetes Custom Resource Definition, these environment variables can be set in
this way:

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

Kubewarden is a [webook](https://en.wikipedia.org/wiki/Webhook) implementation of  the[ Kubernetes Dynamic Admission Controller](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).

Under the hood, the Kubernetes API server makes an HTTP request against  Kubewarden's Policy Server
describing an event that is about to happen. After the HTTP request is made,
Kubernetes API Server waits for an answer to be provided. However, Kubernetes
API server will not wait forever, after a certain amount of time it will
consider the request to be "timed-out".

Quoting the [official Kubernetes documentation](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#timeouts):

> Default timeout for a webhook call is 10 seconds, You can set the timeout and
> it is encouraged to use a short timeout for webhooks.
> If the webhook call times out, the request is handled according to the
> webhook's failure policy.
That means that, regardless of the policy evaluation timeout feature, each
Kubernetes admission request is subject to a timeout.

Every Kubewarden Policy can set its own timeout value via the `timeoutSeconds`
attribute of the `ClusterAdmissionPolicy` and `AdmissionPolicy` custom resources.
By default the timeout value is 10 seconds.

:::info

All the Kubernetes admission requests made against a Policy Server are subject
to two different timeouts:

* The Kubernetes API server timeout value. Set to 10 seconds by default, tunable
  on a per-policy basis via a dedicated attribute on the Kubewarden Custom Resources.
* The Policy Server policy evaluation timeout

:::

Let's go through the following scenarios to better understand the differences
between Kubernetes' Webhook timeout and Kubewarden's policy evaluation timeout.

### Kubewarden policy evaluation timeout is disabled

Let's assume we have a Policy Server that has the policy evaluation timeout
feature disabled. This server is hosting a policy that is affected by a bug
which causes it to enter an infinite loop during evaluation.

Kubernetes API server sends an admission request to be evaluated by this
bugged policy. As a result, the policy evaluation will enter an infinite loop.
In the meantime the Kubernetes API server will be waiting for a response.

After 10 seconds Kubernetes' webhoook timeout will take place, the request
will be handled according to the webhook's failure policy.

Unfortunately, the Policy Server will be left with some computation resources stuck
inside of this infinite loop. Over time, with more admission requests
triggering the bugged policy, the Policy Server will run out of computation resources
and will be unable to respond to the Kubernetes API server. This is actually a
Denial Of Service (DOS) attack against the Policy Server.

### Kubewarden policy evaluation timeout is enabled

Let's assume a scenario where the same Policy Server now has the policy evaluation timeout
feature enabled, and the policy evaluation timeout is set to be 2 seconds.
Kubernetes API server sends an admission request to be evaluated by this
bugged policy. As a result, the policy evaluation will enter an infinite loop.
In the meantime the Kubernetes API server will be waiting for a response.

After two seconds, Kubewarden's policy evaluation timeout feature will interrupt
the policy evaluation and will produce a rejection response.
The response will contain a message explaining that the rejection
happened because the policy evaluation didn't complete in a timely manner.

:::note

Setting Kubewarden's policy evaluation timeout to a value higher than the
Kubernetes' webhook timeout is not a good choice.

While the policy evaluation will still be interrupted, reducing the chances
of a DOS attack, the final rejection response will not be produced by the Policy
Server. As a matter of fact, the rejection will be produced by the Kubernetes
API server by the webhook timeout.

As a result, it will be harder for end users, and Kubernetes operators, to
detect these slow/bugged policies. The only proof of the policy evaluation
interruption will be inside of the Policy Server logs and trace events.

:::
