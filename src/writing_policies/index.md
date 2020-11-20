# Writing Policies

Chimera policies can be written using any kind of language capable of building
[WASM](https://webassembly.org/) binaries for the [WASI](https://wasi.dev/) target.

The list of languages that can produce WASM modules is continuously evolving.
[This page](https://github.com/appcypher/awesome-wasm-langs) provides a
nice overview.

> **Note well:** some languages have WASM support, but are not yet capable
> of building binaries for the WASI interface.
>
> WASM modules built for the browser target won't run inside of a WASI-compliant
> runtime.

# What a policy does

The Chimera admission controller receives [`AdmissionReview`](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#request)
objects from the Kubernetes API server. It then forwards the
value of the `request` key to the policy to be evaluated.

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

The `ValidationResponse` object is a simple JSON object like that:

```json
{
  "accepted": true,
  "message": ""
}
```

The `accepted` attribute can be either `true` or `false`. The `message` attribute
must be specified when the request is rejected.

## Policy configuration

The policy can read configuration values straight from its environment variables.

The Chimera admission controller takes care of exporting certain environment
variables from the host to the WASM runtime.

# Recap

This is the minimal list of features a programming language must be able to
support when building WASM modules for the WASI interface:

  * Read from the STDIN [**mandatory**]
  * Write to the STDOUT [**mandatory**]
  * Handle JSON data, both marshalling and unmarshalling [**strongly recommended**]
  * Read value of environment variables [**optional**]

This is a really limited set of requirements, however, due to the early nature
of WebAssembly, not all the programming languages are able to satisfy them. The
next sections will cover the maturity level of some programming languages.

# FAQ

## Why Policies aren't implemented as libraries?

It's possible to write WASM modules that expose functions, and
later invoked these functions from a WASM runtime.

However WebAssembly defines only 4 data types: integer and floating point numbers (32 and 64 bits).
Sharing other data types between the runtime and the WASM module is not yet standardized,
not all languages would be capable of doing that.
