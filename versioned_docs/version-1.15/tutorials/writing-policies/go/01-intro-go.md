---
sidebar_label: Writing policies in Go
sidebar_position: 010
title: Writing policies in Go
description: A tutorial introduction to writing policies in Go.
keywords: [kubewarden, kubernetes, writing policies in Go]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, go, introduction]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/intro-go"/>
</head>

:::note
Go's support for WebAssembly is fast evolving.
This page was last revised in December 2023.
:::

The official Go compiler can produce WebAssembly binaries, for execution outside a browser, since v1.21.

There's another Go compiler that can build WebAssembly binaries usable by Kubewarden.
This compiler project is [TinyGo](https://tinygo.org/):

> TinyGo brings the Go programming language to embedded systems and to the modern web by creating a new compiler based on LLVM.
>
> You can compile and run TinyGo programs on over 94 different microcontroller boards such as the BBC micro:bit and the Arduino Uno.
>
> TinyGo can also produce WebAssembly (Wasm) code which is very compact in size.
> You can compile programs for web browsers,
> as well as for server and edge computing environments that support the WebAssembly System Interface (WASI) family of interfaces.

The Kubewarden project currently suggests using TinyGo for two reasons:

- binaries are smaller
- support for [waPC](https://wapc.io) by the ability to export functions to the runtime

## TinyGo limitations

TinyGo doesn't yet support all the Go features,
see the TinyGo language support [page](https://tinygo.org/lang-support/)
to see the current project status.
Currently, its largest limitation is the lack of a fully supported `reflect` package.
This means that official Kubernetes Go API types (e.g.: `k8s.io/api/core/v1`) don't compile.

Kubewarden policies need to process JSON data such as policy settings and the request received by Kubernetes.

Despite TinyGo's current limitations, it's still easy to write Kubewarden validation policies with it.

## Tooling

Writing Kubewarden policies requires a version of TinyGo greater than `v0.28.1`.
However, use the latest version, for the best results.

:::warning
Using older versions of TinyGo results in runtime errors due to the limited support for Go reflection.
:::

These Go libraries are useful when writing a Kubewarden policy:

- [Kubewarden Go SDK](https://github.com/kubewarden/policy-sdk-go):
Provides structures and functions reducing the amount of code necessary.
It also provides test helpers.
- [Kubernetes Go types](https://github.com/kubewarden/k8s-objects):
The [official Kubernetes Go Types](https://github.com/kubernetes/kubernetes/tree/master/staging/src/k8s.io)
can't be used with TinyGo.
This module provides all the Kubernetes Types in a TinyGo-friendly way.
- [gjson](https://github.com/tidwall/gjson):
This provides a query language for quick navigation of JSON documents and data retrieval.
This library doesn't use the `encoding/json` package provided by Go's `stdlib`, hence it's usable with TinyGo.
- [mapset](https://github.com/deckarep/golang-set):
Provides a Go implementation of the
[Set](<https://en.wikipedia.org/wiki/Set_(abstract_data_type)>)
data structure.
This library reduces the amount of code to write as operations such as
Set `union`, `intersection`, `difference` are common operation in Kubewarden policies.

Lastly, the Kubewarden project provides a
[template Go policy project](https://github.com/kubewarden/go-policy-template)
you can use to create Kubewarden Go policies.

## Getting TinyGo dependencies

The easiest way to get TinyGo is by using the upstream container images.
Official releases are
[here](https://hub.docker.com/r/tinygo/tinygo),
while builds from the development branch are automatically pushed
[here](https://hub.docker.com/r/tinygo/tinygo-dev).

If needed, try TinyGo's
[getting started](https://tinygo.org/getting-started/)
page for more information.

## Tutorial prerequisites

During this tutorial you need these tools on your development machine:

- docker or another container engine: used to build the WebAssembly policy.
You'll be using the compiler shipped in the official TinyGo container image.
- [bats](https://github.com/bats-core/bats-core):
used to write the tests and automate their execution.
- [`kwctl`](https://github.com/kubewarden/kwctl/releases):
CLI tool provided by Kubewarden to run its policies outside of Kubernetes, among other actions.
It's covered in [this section](../../testing-policies/index.md) of the documentation.
