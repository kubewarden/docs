---
sidebar_label: "Create a New Policy"
title: ""
---

# Create a new policy

Let's implement the same policy that [we wrote with Open Policy
Agent](../open-policy-agent/02-create-policy.md): a policy that
rejects a resource if it's targeting the `default` namespace.

:::note
We also provide a GitHub repository template
that you can use to quickly port an existing policy.

Check it out: [kubewarden/gatekeeper-policy-template](https://github.com/kubewarden/gatekeeper-policy-template)
:::

## Requirements

As in the previous section, we will require the following tools:

- `opa`
- `kwctl`

## The policy

Gatekeeper policies must return none or more violation objects. If no
violations are reported, the request will be accepted. If one, or more
violations are reported, the request will be rejected.

We create a new folder, named `rego-policy`. Inside of it, we create a
`policy.rego` file with contents:

```rego
package policy

violation[{"msg": msg}] {
        input.review.object.metadata.namespace == "default"
        msg := "it is forbidden to use the default namespace"
}
```

In this case, our entrypoint is `policy/violation`, and because of how
Rego works, the policy can have the following outcomes:

- return 1 violation: the object being reviewed is targeting the
  default namespace.

- return 0 violations: the object being reviewed is compliant with the
  policy.

Take a moment to compare this policy with the one we wrote in the Open
Policy Agent section. That one had to build the whole
`AdmissionReview` response, and the inputs were slightly
different. In the Gatekeeper mode, the `AdmissionRequest` object is
provided at the `input.review` attribute. All attributes of the
`AdmissionRequest` are readable along with `object`.

Now, let's create the requests that we are going to evaluate in the
next section.

Let us first create a `default-ns.json` file with the following
contents inside the `data` directory:

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

Now, let's create another `AdmissionReview` object that this time is
targeting a namespace different than the `default` one. Let us name
this file `other-ns.json`. It has the following contents:

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

As you can see, this simulates another pod creation request, this time
under a namespace called `other`.
