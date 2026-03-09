---
sidebar_label: Create a New Policy
title: Creating a new Gatekeeper Rego policy
description: Creating a new Gatekeeper rego policy.
keywords: [kubewarden, kubernetes, gatekeeper rego policy]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, gatekeeper, create-policy]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/gatekeeper/create-policy"/>
</head>

For this tutorial you'll implement the same policy that you wrote with
[Open Policy Agent](../open-policy-agent/create-policy).
Namely, a policy that rejects a resource if it's targeting the `default` namespace.

:::note
There is a
[repository template](https://github.com/kubewarden/gatekeeper-policy-template)
that you can use as a base to port an existing policy.
:::

## Requirements

You need the following tools:

- `opa`
- `kwctl`

## The policy

Gatekeeper policies must return none or more violation objects.
If no violations are reported, the request is accepted.
If one, or more violations are reported, the request is rejected.

Create a new folder, named `rego-policy`.
In it, create a `policy.rego` file with the contents:

```rego
package policy

violation[{"msg": msg}] {
        input.review.object.metadata.namespace == "default"
        msg := "it is forbidden to use the default namespace"
}
```

In this case, the entrypoint is `policy/violation`,
and due to how Rego works, the policy can have the following outcomes:

- Return 1 violation: the object reviewed is targeting the default namespace.

- Return 0 violations: the object reviewed is compliant with the policy.

Take a moment to compare this policy with the one written in the Open Policy Agent section.
That one had to build the whole `AdmissionReview` response,
and the inputs were slightly different.
In the Gatekeeper mode,
the `AdmissionRequest` object is provided with the `input.review` attribute.
All attributes of the `AdmissionRequest` are readable along with `object`.

Now, you can create the requests to evaluate in the next section.

You first create a `default-ns.json` file with the following contents inside the `data` directory:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
    "operation": "CREATE",
    "object": {
      "kind": "Pod",
      "apiVersion": "v1",
      "metadata": {
        "name": "nginx",
        "namespace": "default",
        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"
      }
    }
  }
}
```

Now, create another `AdmissionReview` object that, this time,
is targeting a namespace different to the `default` one.
Name this file `other-ns.json`.
It has the following contents:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
    "operation": "CREATE",
    "object": {
      "kind": "Pod",
      "apiVersion": "v1",
      "metadata": {
        "name": "nginx",
        "namespace": "other",
        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"
      }
    }
  }
}
```

You can see, this simulates another pod creation request,
this time under a namespace called `other`.
