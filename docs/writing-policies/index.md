---
sidebar_label: "Writing Policies"
title: ""
---

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
