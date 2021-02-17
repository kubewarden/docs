# Writing Policies

Chimera policies can be written using any kind of language capable of building
[Wasm](https://webassembly.org/) binaries and that supports [waPC](https://github.com/wapc) guest SDK.

> **Note well:** currently Chimera supports only Validating Admission Webhooks,
> Mutating ones are not yet implemented.

## Writing a validation policy

The Chimera admission server receives
[`AdmissionReview`](https://godoc.org/k8s.io/api/admission/v1#AdmissionReview)
objects from the Kubernetes API server. It then forwards the value of
the `request` (of type
[`AdmissionRequest`](https://godoc.org/k8s.io/api/admission/v1#AdmissionRequest)
key to the policy to be evaluated.

The policy has to evaluate the `request` and state whether it should be
accepted or not. When the request is rejected, the policy must provide the
explanation message that is going to be shown to the end user.

By convention of the `policy-server` project, the guest has to expose
a function named `validate`, exposed through the waPC guest SDK, so
that the `policy-server` (waPC host) can invoke it.

The `validate` function receives a `ValidationRequest` object serialized as JSON and
returns a `ValidationResponse` object serialized as JSON. 

### The `ValidationRequest` object

The `ValidationRequest` is a simple JSON object that looks like that:

```json
{
  "request": <AdmissionReview.request data>
  "settings": {
     // your policy configuration
  }
}
```

### The `ValidationResponse` object

The `ValidationResponse` object is a simple JSON object like the
following:

```json
{
  "accepted": <boolean>, // mandatory
  "message": <string>,   // optional, ignored if accepted - recommended for rejections
  "code": <integer>      // optional, ignored if accepted
}
```

The `message` and `code` attributes can be specified when the request
is not accepted. `message` is a free form textual error. `code`
represents an HTTP error code.

If the request is accepted, `message` and `code`
values will be ignored by the Kubernetes API server if they are
present.

If `message` and/or `code` are provided, and the request is not
accepted, the Kubernetes API server will forward this information as
part of the body of the error returned to the Kubernetes API server
client that issued the rejected request.


## Supported lanauges

Languages currently exposing a waPC guest SDK are:

- [AssemblyScript](https://github.com/wapc/as-guest)
- [Rust](https://github.com/wapc/wapc-guest-rust)
- [TinyGo](https://github.com/wapc/wapc-guest-tinygo)
- [Zig](https://github.com/wapc/wapc-guest-zig)
- [Swift](https://github.com/flavio/wapc-guest-swift)

The list of languages that can produce Wasm modules is continuously evolving.
[This page](https://github.com/appcypher/awesome-wasm-langs) provides a
nice overview.

It's possible to check what languages support waPC guest by searching
on the [official github
group](https://github.com/wapc?q=guest&type=&language=).
