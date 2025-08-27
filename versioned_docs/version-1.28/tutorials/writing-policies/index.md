---
sidebar_label: Writing Policies
title: Writing Kubewarden policies
description: An introduction to writing Kubewarden policies.
keywords: [kubewarden, kubernetes, writing policies]
doc-type: [tutorial]
doc-topic: [writing-policies]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/index"/>
</head>

This section introduces Kubewarden policies using traditional computing analogies.

A Kubewarden policy is like a program that does one job.
It receives input data, performs computation with that data and returns a result.

The input data is Kubernetes admission requests.
The result of the computation is a validation response,
which tells Kubernetes whether to accept, reject, or mutate the input data, the admission request.

The [policy-server](https://github.com/kubewarden/policy-server)
component of Kubewarden performs these operations.

The policy server doesn't include any data processing capability.
You add processing capabilities at runtime with add-ons.
These add-ons are the Kubewarden policies.

So, a Kubewarden policy is like a
[traditional plug-in](https://en.wikipedia.org/wiki/Plug-in_%28computing%29)
of the "policy server" program.

To recap:

- Kubewarden policies are plug-ins that expose a set of well-defined
functionalities (validate a Kubernetes request object, validate policy settings provided by the user, and other functions) using a well-defined API
- Policy server is the "main" program that loads the plug-ins
(aka policies) and uses their exposed functionalities to accept, reject, or mutate Kubernetes requests

Writing Kubewarden policies consists of writing the validation business logic and then exposing it through a well-defined API.

## Programming language requirements

You supply Kubewarden policies as
[WebAssembly](https://webassembly.org/) binaries.

Policy authors can write policies using any programming language that supports WebAssembly as a compilation target.
The list of supported language is constantly evolving, [this page](https://github.com/appcypher/awesome-wasm-langs) provides a nice overview of the WebAssembly landscape.

Currently, WebAssembly doesn't have an official way to share complex data types between the host and a WebAssembly guest.
To overcome this limitation Kubewarden policies use the [waPC](https://github.com/wapc) project, which provides a bi-directional communication channel.

So, your programming language of choice must have an available waPC guest SDK.
If that's not the case, feel free to reach out.
The project team can help you overcome this limitation.
