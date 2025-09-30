---
sidebar_label: Validating policies
title: Validating policies
description: Validating policies
keywords: [kubewarden, kubernetes, policy specification, policy validation]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic: [writing-policies, specification, validating-policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/validating-policies"/>
</head>

The Kubewarden policy server receives:

- Kubernetes
[`AdmissionReview`](https://godoc.org/k8s.io/api/admission/v1#AdmissionReview)
objects from the Kubernetes API server.
It then forwards the value of its `request` attribute, of type
[`AdmissionRequest`](https://godoc.org/k8s.io/api/admission/v1#AdmissionRequest),
to the policy for evaluation.

or:

- A JSON `request` attribute containing the free-form request document,
in case of a raw policy.
Check the
[Raw policies](../../howtos/raw-policies.md)
section for more details.

The policy evaluates the `request` and states whether it should accept it or
not. When request rejection happens, the policy might provide the explanation
message and an error code to display to the end user.

By convention, of the `policy-server` project, the guest has to expose a
function named `validate`, through the waPC guest SDK, so that the
`policy-server` (waPC host) can invoke it.

The `validate` function receives a `ValidationRequest` JSON object and returns
a `ValidationResponse` JSON object.

## The `ValidationRequest` object

The `ValidationRequest` is a JSON object received by the `validate` function.
It looks like:

```yaml
{
  "request": <AdmissionReview.request data> | <RawReviewRequest.request data>,
  "settings": {
    # your policy configuration
  }
}
```

The `settings` key points to a free-form JSON document holding the policy
specific settings. The previous chapter focused on policies and settings.

## An example

Given the following Kubernetes `AdmissionReview`:

<details>
<summary>Expand to see `AdmissionReview`</summary>

```yaml
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    # Random uid uniquely identifying this admission call
    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",

    # Fully-qualified group/version/kind of the incoming object
    "kind": {"group":"autoscaling","version":"v1","kind":"Scale"},
    # Fully-qualified group/version/kind of the resource being modified
    "resource": {"group":"apps","version":"v1","resource":"deployments"},
    # subresource, if the request is to a subresource
    "subResource": "scale",

    # Fully-qualified group/version/kind of the incoming object in the original request to the API server.
    # This only differs from `kind` if the webhook specified `matchPolicy: Equivalent` and the
    # original request to the API server was converted to a version the webhook registered for.
    "requestKind": {"group":"autoscaling","version":"v1","kind":"Scale"},
    # Fully-qualified group/version/kind of the resource being modified in the original request to the API server.
    # This only differs from `resource` if the webhook specified `matchPolicy: Equivalent` and the
    # original request to the API server was converted to a version the webhook registered for.
    "requestResource": {"group":"apps","version":"v1","resource":"deployments"},
    # subresource, if the request is to a subresource
    # This only differs from `subResource` if the webhook specified `matchPolicy: Equivalent` and the
    # original request to the API server was converted to a version the webhook registered for.
    "requestSubResource": "scale",

    # Name of the resource being modified
    "name": "my-deployment",
    # Namespace of the resource being modified, if the resource is namespaced (or is a Namespace object)
    "namespace": "my-namespace",

    # operation can be CREATE, UPDATE, DELETE, or CONNECT
    "operation": "UPDATE",

    "userInfo": {
      # Username of the authenticated user making the request to the API server
      "username": "admin",
      # UID of the authenticated user making the request to the API server
      "uid": "014fbff9a07c",
      # Group memberships of the authenticated user making the request to the API server
      "groups": ["system:authenticated","my-admin-group"],
      # Arbitrary extra info associated with the user making the request to the API server.
      # This is populated by the API server authentication layer and should be included
      # if any SubjectAccessReview checks are performed by the webhook.
      "extra": {
        "some-key":["some-value1", "some-value2"]
      }
    },

    # object is the new object being admitted.
    # It is null for DELETE operations.
    "object": {"apiVersion":"autoscaling/v1","kind":"Scale",...},
    # oldObject is the existing object.
    # It is null for CREATE and CONNECT operations.
    "oldObject": {"apiVersion":"autoscaling/v1","kind":"Scale",...},
    # options contains the options for the operation being admitted, like meta.k8s.io/v1 CreateOptions, UpdateOptions, or DeleteOptions.
    # It is null for CONNECT operations.
    "options": {"apiVersion":"meta.k8s.io/v1","kind":"UpdateOptions",...},

    # dryRun indicates the API request is running in dry run mode and will not be persisted.
    # Webhooks with side effects should avoid actuating those side effects when dryRun is true.
    # See http://k8s.io/docs/reference/using-api/api-concepts/#make-a-dry-run-request for more details.
    "dryRun": false
  }
}
```

</details>

The `ValidationRequest` object would look like:

<details>
<summary>Expand to see the `ValidationRequest`</summary>

```yaml
{
  "request": {
    # Random uid uniquely identifying this admission call
    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",

    # Fully-qualified group/version/kind of the incoming object
    "kind": {"group":"autoscaling","version":"v1","kind":"Scale"},
    # Fully-qualified group/version/kind of the resource being modified
    "resource": {"group":"apps","version":"v1","resource":"deployments"},
    # subresource, if the request is to a subresource
    "subResource": "scale",

    # Fully-qualified group/version/kind of the incoming object in the original request to the API server.
    # This only differs from `kind` if the webhook specified `matchPolicy: Equivalent` and the
    # original request to the API server was converted to a version the webhook registered for.
    "requestKind": {"group":"autoscaling","version":"v1","kind":"Scale"},
    # Fully-qualified group/version/kind of the resource being modified in the original request to the API server.
    # This only differs from `resource` if the webhook specified `matchPolicy: Equivalent` and the
    # original request to the API server was converted to a version the webhook registered for.
    "requestResource": {"group":"apps","version":"v1","resource":"deployments"},
    # subresource, if the request is to a subresource
    # This only differs from `subResource` if the webhook specified `matchPolicy: Equivalent` and the
    # original request to the API server was converted to a version the webhook registered for.
    "requestSubResource": "scale",

    # Name of the resource being modified
    "name": "my-deployment",
    # Namespace of the resource being modified, if the resource is namespaced (or is a Namespace object)
    "namespace": "my-namespace",

    # operation can be CREATE, UPDATE, DELETE, or CONNECT
    "operation": "UPDATE",

    "userInfo": {
      # Username of the authenticated user making the request to the API server
      "username": "admin",
      # UID of the authenticated user making the request to the API server
      "uid": "014fbff9a07c",
      # Group memberships of the authenticated user making the request to the API server
      "groups": ["system:authenticated","my-admin-group"],
      # Arbitrary extra info associated with the user making the request to the API server.
      # This is populated by the API server authentication layer and should be included
      # if any SubjectAccessReview checks are performed by the webhook.
      "extra": {
        "some-key":["some-value1", "some-value2"]
      }
    },

    # object is the new object being admitted.
    # It is null for DELETE operations.
    "object": {"apiVersion":"autoscaling/v1","kind":"Scale",...},
    # oldObject is the existing object.
    # It is null for CREATE and CONNECT operations.
    "oldObject": {"apiVersion":"autoscaling/v1","kind":"Scale",...},
    # options contains the options for the operation being admitted, like meta.k8s.io/v1 CreateOptions, UpdateOptions, or DeleteOptions.
    # It is null for CONNECT operations.
    "options": {"apiVersion":"meta.k8s.io/v1","kind":"UpdateOptions",...},

    # dryRun indicates the API request is running in dry run mode and will not be persisted.
    # Webhooks with side effects should avoid actuating those side effects when dryRun is true.
    # See http://k8s.io/docs/reference/using-api/api-concepts/#make-a-dry-run-request for more details.
    "dryRun": false
  },
  "settings": {
    # policy settings
  }
}
```

</details>

## The `ValidationResponse` object

The `validate` function returns the outcome of its validation using a
`ValidationResponse` object.

The `ValidationResponse` has this structure:

```yaml
{
  # mandatory
  "accepted": <boolean>,

  # optional, ignored if accepted - recommended for rejections
  "message": <string>,

  # optional, ignored if accepted
  "code": <integer>,

  # optional, used by mutation policies
  "mutated_object": <string>
}
```

You can specify these `message` and `code` attributes when he request isn't
accepted. The `message` is a free-form textual error and `code` represents an
HTTP error code.

On request acceptance, the `message` and `code` values are ignored by the
Kubernetes API server if present.

On request denial and if the `message` or `code` are present, then the
Kubernetes API server returns this information. The information is part of the
body of the error, and the server returns it to the Kubernetes API client that
issued the rejected request.

The `mutated_object` is an optional field used only by mutating policies. This
is the topic of the next chapter.
