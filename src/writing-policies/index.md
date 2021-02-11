# Writing Policies

Chimera policies can be written using any kind of language capable of building
[Wasm](https://webassembly.org/) binaries and that supports waPC guest SDK.

The list of languages that can produce Wasm modules is continuously evolving.
[This page](https://github.com/appcypher/awesome-wasm-langs) provides a
nice overview.

It's possible to check what languages support waPC guest by searching
on the [official github
group](https://github.com/wapc?q=guest&type=&language=).

## What a policy does

The Chimera admission server receives
[`AdmissionReview`](https://godoc.org/k8s.io/api/admission/v1#AdmissionReview)
objects from the Kubernetes API server. It then forwards the value of
the `request` (of type
[`AdmissionRequest`](https://godoc.org/k8s.io/api/admission/v1#AdmissionRequest)
key to the policy to be evaluated.

The policy has to evaluate the `request` and state whether it should be
accepted or not. When the request is rejected, the policy must provide the
explanation message that is going to be shown to the end user.

> **Note well:** currently Chimera supports only Validating Admission Webhooks,
> Mutating ones are not yet implemented.

By convention of the `policy-server` project, the guest has to expose
a function named `validate`, exposed through the waPC guest SDK, so
that the `policy-server` (waPC host) can invoke it.

Languages currently exposing a waPC guest SDK are:

- [AssemblyScript](https://github.com/wapc/as-guest)
- [Rust](https://github.com/wapc/wapc-guest-rust)
- [TinyGo](https://github.com/wapc/wapc-guest-tinygo)
- [Zig](https://github.com/wapc/wapc-guest-zig)
