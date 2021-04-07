# What is a Kubewarden policy

In this section we will explain what Kubewarden policies are by using some traditional computing
analogies.

A Kubewarden policy can be seen as a regular program that does one job: it receives
input data, performs some computation against that and it finally returns a response.

The input data are Kubernetes admission requests and the result of the computation
is a validation response, something that tells to Kubernetes whether to accept, reject or
mutate the original input data.

All these operations are performed by a component of Kubewarden that is called
[policy-server](https://github.com/kubewarden/policy-server).

The policy server doesn't bundle any data processing capability. All these capabilities are
added at runtime via add-ons: the Kubewarden policies.

As a consequence, a Kubewarden policy can be seen as a [traditional plug-in](https://en.wikipedia.org/wiki/Plug-in_%28computing%29)
of the "policy server" program.

To recap:

  * Kubewarden policies are plug-ins that expose a set of well-defined
    functionalities (validate a Kubernetes request object, validate policy settings
    provided by the user,...) using a well-defined API
  * Policy server is the "main" program that loads the plug-ins
    (aka policies) and leverages their exposed functionalities to validate or mutate
    Kubernetes requests

Writing Kubewarden policies consists of writing the validation business logic
and then exposing it through a well-defined API.

# Programming language requirements

Kubewarden policies are delivered as [WebAssembly](https://webassembly.org/)
binaries.

Policy authors can write policies using any programming language that supports
WebAssembly as a compilation target. The list of supported language is constantly
evolving, [this page](https://github.com/appcypher/awesome-wasm-langs)
provides a nice overview of the WebAssembly landscape.

Currently WebAssembly doesn't have an official way to share complex data types
between the host and a WebAssembly guest. To overcome this limitation
Kubewarden policies leverage the [waPC](https://github.com/wapc) project, which
provides a bi-directional communication channel.

Because of that your programming language of choice must provide a waPC guest SDK.
If that's not the case, feel free to reach out. We can help you overcome this
limitation.

# Policy API

The policy evaluator interacts with Kubewarden policies using a well defined API.
The purpose of this page is to document the API each policy must expose.

> **Note well:** this section of the documentation is a bit low level, you can
> jump straight to one of the "language focused" chapters and come back to this
> page later.

## The `validate` entry point

The Kubewarden policy server receives
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

### The `ValidationResponse` object

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

If `message` and/or `code` are provided, and the request is not
accepted, the Kubernetes API server will forward this information as
part of the body of the error returned to the Kubernetes API server
client that issued the rejected request.

The `mutated_object` is an optional field used only by mutating policies.
This field contains the object the policy wants to be created inside of the
Kubernetes cluster.
For example, given a policy that mutates Pod objects, the `mutated_object` would
contain the full spec of a Pod.

## The `validate_settings` entry point

Policy behaviour can be tuned using runtime configurations. As described above, the configuration
parameters are sent inside of each `validate` invocation via the `settings` dictionary.

Some policies might want to validate the settings a user provides to ensure they are correct.
This is done with the `validate_settings` function.

The `validate_settings` function receives as input a JSON representation of the settings
provided by the user. The function validates them and returns as a response a `SettingsValidationResponse`
object.

The structure of the object is the following one:

```json
{
  "valid": <boolean>,  // mandatory
  "message": <string>, // optional, ignored if accepted - recommended for rejections
}
```

If the user provided settings are `valid`, the contents of `message` are ignored. Otherwise
the contents of `message` are shown to the user.

Kubewarden's policy server validates all the policy settings provided by users at start time.
It will exit immediately with an error if one or more of its policies received wrong configuration parameters.
