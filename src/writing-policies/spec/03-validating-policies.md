# Validating policies

The Kubewarden policy server receives
[`AdmissionReview`](https://godoc.org/k8s.io/api/admission/v1#AdmissionReview)
objects from the Kubernetes API server. It then forwards the value of
its `request` attribute (of type
[`AdmissionRequest`](https://godoc.org/k8s.io/api/admission/v1#AdmissionRequest)
key to the policy to be evaluated.

The policy has to evaluate the `request` and state whether it should be
accepted or not. When the request is rejected, the policy might provide the
explanation message and a specific error code that is going to be shown to the end user.

By convention of the `policy-server` project, the guest has to expose
a function named `validate`, exposed through the waPC guest SDK, so
that the `policy-server` (waPC host) can invoke it.

The `validate` function receives a `ValidationRequest` object serialized as JSON and
returns a `ValidationResponse` object serialized as JSON.

## The `ValidationRequest` object

The `ValidationRequest` is a simple JSON object that is received by the
`validate` function. It looks like this:

```json
{
  "request": <AdmissionReview.request data>,
  "settings": {
     // your policy configuration
  }
}
```

The `settings` key points to a free-form JSON document that can hold the policy
specific settings.

## The `ValidationResponse` object

The `validate` function returns the outcome of its validation using a `ValidationResponse`
object.

The `ValidationResponse` is structured in the following way:

```json
{
  "accepted": <boolean>,   // mandatory
  "message": <string>,     // optional, ignored if accepted - recommended for rejections
  "code": <integer>,        // optional, ignored if accepted
  "mutated_object": <dict> // optional, used by mutation policies
}
```

The `message` and `code` attributes can be specified when the request
is not accepted. `message` is a free form textual error. `code`
represents an HTTP error code.

If the request is accepted, `message` and `code`
values will be ignored by the Kubernetes API server if they are
present.

If `message` or `code` are provided, and the request is not
accepted, the Kubernetes API server will forward this information as
part of the body of the error returned to the Kubernetes API server
client that issued the rejected request.

The `mutated_object` is an optional field used only by mutating policies.
This field contains the object the policy wants to be created inside of the
Kubernetes cluster.
For example, given a policy that mutates Pod objects, the `mutated_object` would
contain the full spec of a Pod.
