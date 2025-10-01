---
sidebar_label: Mutating policies
title: Mutating policies
description: Mutating policies.
keywords: [kubewarden, kubernetes, policy specification, mutating policies]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic: [writing-policies, specification, mutating-policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/mutating-policies"/>
</head>

The structure os mutating policies is the same as validating ones:

- They have to register `validate` and `validate_settings` waPC functions.
- The communication API used between the host and the policy is the same as
  that used by validating policies.

Mutating policies accept a request and can propose a mutation of the incoming
object by returning a `ValidationResponse` object that looks like this:

```json
{
  "accepted": true,
  "mutated_object": <object to be created>
}
```

The `mutated_object` field contains the object the policy wants creating
in the Kubernetes cluster, serialized to JSON.

## A concrete example

Let's assume the policy received this `ValidationRequest`:

```json
{
  "settings": {},
  "request": {
    "operation": "CREATE",
    "object": {
      "apiVersion": "v1",
      "kind": "Pod",
      "metadata": {
        "name": "security-context-demo-4"
      },
      "spec": {
        "containers": [
        {
          "name": "sec-ctx-4",
          "image": "gcr.io/google-samples/node-hello:1.0",
          "securityContext": {
            "capabilities": {
              "add": ["NET_ADMIN", "SYS_TIME"]
            }
          }
        }
        ]
      }
    }
  }
}
```

:::note

Only important field are in the `request` object for this example.

:::

This request generation happens because someone tried to create a Pod that
would look like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo-4
spec:
  containers:
  - name: sec-ctx-4
    image: gcr.io/google-samples/node-hello:1.0
    securityContext:
      capabilities:
        add:
        - NET_ADMIN
        - SYS_TIME
```

Assume the policy replies with the following `ValidationResponse`:

```json
{
  "accepted": true,
  "mutated_object": {
    "apiVersion": "v1",
    "kind": "Pod",
    "metadata": {
      "name": "security-context-demo-4"
    },
    "spec": {
      "containers": [
        {
          "name": "sec-ctx-4",
          "image": "gcr.io/google-samples/node-hello:1.0",
          "securityContext": {
            "capabilities": {
              "add": [
                "NET_ADMIN",
                "SYS_TIME"
              ],
              "drop": [
                "BPF"
              ]
            }
          }
        }
      ]
    }
  }
}
```

That would lead to request acceptance, but the final Pod would look like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo-4
spec:
  containers:
  - name: sec-ctx-4
    image: gcr.io/google-samples/node-hello:1.0
    securityContext:
      capabilities:
        add:
        - NET_ADMIN
        - SYS_TIME
        drop:
        - BPF
```

As you can see, the policy altered the `securityContext.capabilities.drop`
section of the only container declared in the Pod.

The container is now dropping the `BPF` capability due to the policy.

## Recap

These are the functions a mutating policy must implement:

| **waPC function name** | **Input payload** | **Output payload** |
|-|-|-|
| `validate` | <code>\{<br/>  "request": \{<br/>    // AdmissionReview.request data<br/>  \},<br/>  "settings": \{<br/>    // your policy configuration<br/>  \}<br/>\}</code> | <code>\{<br/>  **// mandatory**<br/>  "accepted": boolean,<br/><br/>  // optional, ignored if accepted<br/>  // recommended for rejections<br/>  "message": string,<br/><br/>  // optional, ignored if accepted<br/>  "code": integer, <br/><br/>  // JSON Object to be created<br/>  // Can be used only when the<br/>  // request is accepted<br/>  "mutated_object": object<br/>\}</code> |
| `validate_settings` | <code>\{<br/><br/>  // your policy configuration<br/><br/>\}</code> | <code>\{<br/>  **// mandatory**<br/>  "validate": boolean,<br/><br/>  // optional, ignored if accepted<br/>  // recommended for rejections<br/>  "message": string,<br/>\}</code> |
