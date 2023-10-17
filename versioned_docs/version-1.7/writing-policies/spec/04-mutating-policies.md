---
sidebar_label: "Mutating Policies"
title: ""
---

# Mutating policies

Mutating policies are structured in the very same way as validating ones:
 * They have to register `validate` and `validate_settings` waPC functions
 * The communication API used between the host and the policy is the very same
  as the one used by validating policies.

Mutating policies can accept a request and propose a mutation of the incoming
object by returning a `ValidationResponse` object that looks like this:

```json
{
  "accepted": true,
  "mutated_object": <object to be created>
}
```

The `mutated_object` field contains the object the policy wants to be created
inside of the Kubernetes cluster serialized to JSON.

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
We left some irrelevant fields out of the `request` object.
:::

This request is generated because someone tried to create a Pod that would
look like this:

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

Let's assume our policy replies with the following `ValidationResponse`:

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

That would lead to the request being accepted, but the final Pod would look like
this:

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
section of the only container declared inside of the Pod.

The container is now dropping the `BPF` capability thanks to our policy.

## Recap

These are the functions a mutating policy must implement:

| **waPC function name** | **Input payload**                                                                                                                     | **Output payload**                                                                                                                                                                                                                                                                                                                                     |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `validate`               | <code>{<br/>  "request": {<br/>    // AdmissionReview.request data<br/>  },<br/>  "settings": {<br/>    // your policy configuration<br/>  }<br/>}</code> | <code>{<br/>  **// mandatory**<br/>  "accepted": boolean,<br/><br/>  // optional, ignored if accepted<br/>  // recommended for rejections<br/>  "message": string,<br/><br/>  // optional, ignored if accepted<br/>  "code": integer, <br/><br/>  // JSON Object to be created<br/>  // Can be used only when the<br/>  // request is accepted<br/>  "mutated_object": object<br/>}</code> |
| `validate_settings`      | <code>{<br/><br/>  // your policy configuration<br/><br/>}</code>                                                                                      | <code>{<br/>  **// mandatory**<br/>  "validate": boolean,<br/><br/>  // optional, ignored if accepted<br/>  // recommended for rejections<br/>  "message": string,<br/>}</code>                                                                                                                                                                                            |
