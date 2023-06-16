---
sidebar_label: "Building & Distributing Policies"
title: ""
---

## Building the policy

So far we have built the policy using as a compilation target the same operating
system and architecture of our development machine.

It's now time to build the policy as a WebAssembly binary, also known as `.wasm`
file.

This can be done with a simple command:

```shell
make policy.wasm
```

This command will build the code in release mode, with WebAssembly as
compilation target.

The build will produce the following file:

```shell
$ file target/wasm32-wasi/release/demo.wasm
target/wasm32-wasi/release/demo.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)
```

## Distributing the policy

This topic is covered inside of the [distributing
policies](/distributing-policies.md) section of Kubewarden's
documentation.

## More examples

You can find more Kubewarden policies written in Rust inside of Kubewarden's
GitHub space. [This query](https://github.com/search?l=Rust&q=topic%3Apolicy-as-code+org%3Akubewarden&type=Repositories)
can help you find them.

**Worth of note:** these repositories have a series of GitHub Actions that automate
the following tasks:

  * Run unit tests and code linting on pull requests and after code is merged
    into the main branch
  * Build the policy in `release` mode and push it to a OCI registry as an
    artifact
