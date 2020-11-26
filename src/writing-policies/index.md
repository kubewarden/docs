# Writing Policies

Chimera policies can be written using any kind of language capable of building
[Wasm](https://webassembly.org/) binaries for the [WASI](https://wasi.dev/) target.

The list of languages that can produce Wasm modules is continuously evolving.
[This page](https://github.com/appcypher/awesome-wasm-langs) provides a
nice overview.

> **Note well:** some languages have Wasm support, but are not yet capable
> of building binaries for the WASI interface.
>
> Wasm modules built for the browser target won't run inside of a WASI-compliant
> runtime.

# What a policy does

The Chimera admission controller receives
[`AdmissionReview`](https://godoc.org/k8s.io/api/admission/v1#AdmissionReview)
objects from the Kubernetes API server. It then forwards the value of
the `request` (of type
[`AdmissionRequest`](https://godoc.org/k8s.io/api/admission/v1#AdmissionRequest)
key to the policy to be evaluated.

The policy has to evaluate the `request` and state whether it should be
accepted or not. When the request is rejected, the policy must provide the
explanation message that is going to be shown to the end user.

> **Note well:** currently Chimera supports only Validating Admission Controller,
> Mutating ones are not yet implemented.

# Policy interface

Chimera policies have to be implemented following some simple communication
rules:

  * The policy program has to be written as an executable.
  * The policy will read the `request` data from its standard input
  * The policy will evaluate the policy and serialize a `ValidationResponse`
    object as JSON on its standard output.

## The `ValidationResponse` object

The `ValidationResponse` object is a simple JSON object like the
following:

```json
{
  "accepted": <boolean>, // mandatory
  "message": <string>,   // optional, ignored if accepted
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

## Policy configuration

The policy can read configuration values straight from its environment variables.

The Chimera admission controller takes care of exporting certain environment
variables from the host to the Wasm runtime.

# Recap

This is the minimal list of features a programming language must be able to
support when building Wasm modules for the WASI interface:

  * Read from the STDIN [**mandatory**]
  * Write to the STDOUT [**mandatory**]
  * Handle JSON data, both marshalling and unmarshalling [**strongly recommended**]
  * Read value of environment variables [**optional**]

This is a really limited set of requirements, however, due to the early nature
of WebAssembly, not all the programming languages are able to satisfy them. The
next sections will cover the maturity level of some programming languages.

# FAQ

## Why Policies aren't implemented as libraries?

It's possible to write Wasm modules that expose functions, and
later invoked these functions from a Wasm runtime.

However WebAssembly defines only 4 data types: integer and floating point numbers (32 and 64 bits).
Sharing other data types between the runtime and the Wasm module is not yet standardized,
not all languages would be capable of doing that.
