---
sidebar_label: Writing policies in Go
title: Writing policies in Go
description: A tutorial introduction to writing policies in Go.
keywords: [kubewarden, kubernetes, writing policies in Go]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, go, introduction]
doc-persona: [kubewarden-developer]
---

:::note
Go's support for WebAssembly is fast evolving.
This page was last revised in December 2023.
:::

Currently,
the official Go compiler can't produce WebAssembly binaries that can run **outside** the browser.
This [upstream issue](https://github.com/golang/go/issues/31105)
is tracking the topic.
<!--TODO: this issue, just above, is closed, what's the current situation?-->
Due to this,
it's impossible to use the standard Go compiler to write Kubewarden policies.

There's another Go compiler that can build WebAssembly binaries usable by Kubewarden.
This compiler project is [TinyGo](https://tinygo.org/):

> TinyGo brings the Go programming language to embedded systems
> and to the modern web by creating a new compiler based on LLVM.
>
> You can compile and run TinyGo programs on many different microcontroller
> boards such as the BBC micro:bit and the Arduino Uno.
>
> TinyGo can also be used to produce WebAssembly (Wasm) code which is very
> compact in size.

## Limitations

TinyGo doesn't yet support all the Go features
(see [here](https://tinygo.org/lang-support/)
to see the current project status).
Currently, its largest limitation is the lack of a fully supported `reflect` package.
That leads to the inability to compile official Kubernetes Go API types (e.g.: `k8s.io/api/core/v1`).

Kubewarden policies need to process JSON data such as policy settings and the request received by Kubernetes.

Despite TinyGo's current limitations, it's still easy to write Kubewarden validation policies with it.

## Tooling

Writing Kubewarden policies requires a version of TinyGo greater than `v0.28.1`.
<!--TODO: Is 0.28.1 still correct? -->

:::warning
Using older versions of TinyGo results in runtime errors due to limited support for Go reflection.
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
This library doesn't use the `encoding/json` package provided by Go's stdlib, hence it's usable with TinyGo.
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
Official releases can be found
[here](https://hub.docker.com/r/tinygo/tinygo),
while builds from the development branch are automatically pushed
[here](https://hub.docker.com/r/tinygo/tinygo-dev).

If needed, checkout TinyGo's
[getting started](https://tinygo.org/getting-started/)
page for more information.
