---
sidebar_label: Building and distributing policies
title: Building and distributing policies
description: Building and distributing Kubewarden policies developed with Rust.
keywords: [kubewarden, kubernetes, writing policies, rust, build and distribute]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, rust, build-and-distribute]
doc-persona: [kubewarden-policy-developer, kubewarden-operator]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rust/build-and-distribute"/>
</head>

## Building the policy

Thus far, you've built the policy with a compilation target of the same operating system and architecture of your development machine.

It's now time to build the policy as a WebAssembly binary, a `.wasm` file.

You use the command:

```console
make policy.wasm
```

This command builds the code in release mode, with a WebAssembly compilation target.

The build produces a `policy.wasm` file:

```console
$ file policy.wasm
policy.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)
```

## Distributing the policy

Kubewarden documents policy distribution in the
[distributing policies](../../../explanations/distributing-policies.md)
section.

## More examples

You can find more Rust Kubewarden policies in Kubewarden's GitHub space.
[This query](https://github.com/search?l=Rust&q=topic%3Apolicy-as-code+org%3Akubewarden&type=Repositories)
can help you find them.

The Kubewarden policy repositories, shown by that query, have GitHub Actions that automate the following tasks:

* Run unit tests and code linting on pull requests and after code merges into the main branch.
* Build the policy in `release` mode and push it to an OCI registry as an artifact.
