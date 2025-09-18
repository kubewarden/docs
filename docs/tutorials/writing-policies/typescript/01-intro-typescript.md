---
sidebar_label: Writing policies in TypeScript/JavaScript
sidebar_position: 010
title: Writing policies in TypeScript/JavaScript
description: A tutorial introduction to writing policies in TypeScript/JavaScript.
keywords: [kubewarden, kubernetes, writing policies in TypeScript, writing policies in JavaScript]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, typescript, javascript, introduction]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/intro-typescript"/>
</head>

:::note
TypeScript/JavaScript support for WebAssembly is rapidly evolving.
This page was last revised in September 2025.
:::

As stated on the [official website](https://www.typescriptlang.org/):

> TypeScript extends JavaScript by adding types.
>
> By understanding JavaScript, TypeScript saves you time catching errors and
> providing fixes before you run code.

Kubewarden uses [Javy](https://github.com/bytecodealliance/javy) (a Bytecode Alliance project) to build WebAssembly binaries from JavaScript and TypeScript.

> Javy takes your JavaScript code and executes it in a WebAssembly context. 
>
> It features an embedded QuickJS engine compiled to WebAssembly that can execute JavaScript. 
>
> The project provides both a CLI and a set of APIs for embedding and customizing the behavior when running JavaScript in WebAssembly.

The Kubewarden project currently uses Javy for these reasons:

- Mature JavaScript engine (QuickJS) compiled to WebAssembly
- Support for [WASI interface](../wasi/01-intro-wasi.md) through custom host functions
- Smaller binary sizes compared to other JavaScript-to-WebAssembly solutions
- Active development and maintenance by the Bytecode Alliance

## Javy limitations

Javy runs JavaScript in a sandboxed WebAssembly environment with certain constraints:

- **WASI environment only**: Access limited to stdin/stdout/stderr and explicitly provided host capabilities
- **No Node.js APIs**: Standard Node.js modules like `fs`, `http`, or `crypto` aren't available
- **Limited standard library**: Only core JavaScript features and explicitly enabled APIs are accessible
- **Single-threaded execution**: No support for Web Workers or multi-threading
- **STDOUT restrictions**: Writing to STDOUT will break your policy - use STDERR for logging instead

Despite these limitations, Javy provides sufficient capabilities for writing effective Kubewarden validation policies through the host capabilities system.

## Tooling

Writing Kubewarden policies requires:

- **Node.js**: Version 18 or higher
- **npm**: For dependency management
- **TypeScript**: Recommended for type safety (optional)

:::warning
Ensure you're using Node.js 18 or higher. Older versions may not be compatible with the compilation toolchain.
:::

These TypeScript/JavaScript libraries are useful when writing a Kubewarden policy:

- [Kubewarden JavaScript SDK](https://github.com/kubewarden/policy-sdk-js): Provides structures and functions reducing the amount of code necessary. It also provides test helpers and access to all host capabilities.
- [Kubernetes TypeScript types](https://github.com/silverlyra/kubernetes-types): Provides TypeScript definitions for all Kubernetes resources, enabling type-safe policy development.

The Kubewarden project provides a [template JavaScript/TypeScript policy project](https://github.com/kubewarden/js-policy-template) you can use to create Kubewarden policies.

## Getting the toolchain

The easiest way to get the complete toolchain is by using the Kubewarden JavaScript SDK, which includes the Javy compilation plugin:

```bash
npm install kubewarden-policy-sdk
```

The Javy plugin binary is automatically included and you can find it at:

```
node_modules/kubewarden-policy-sdk/plugin/javy-plugin-kubewarden
```

## Tutorial prerequisites

During this tutorial you need these tools on your development machine:

- **Node.js**: Version 18 or higher with npm for dependency management
- [**`bats`**](https://github.com/bats-core/bats-core): Used to write the tests and automate their execution
- [**`kwctl`**](https://github.com/kubewarden/kwctl/releases): CLI tool provided by Kubewarden to run its policies outside of Kubernetes, among other actions. It's covered in [the testing policies section](../../testing-policies/index.md) of the documentation.
