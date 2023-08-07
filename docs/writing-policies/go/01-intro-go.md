---
sidebar_label: "Introduction to Go"
title: ""
---

:::note
Go's support for WebAssembly is fast evolving. The contents
of this page were written during June 2023, hence they could be outdated.
:::

# Go

Currently the official Go compiler cannot produce WebAssembly binaries
that can be run **outside** of the browser.
[This upstream issue](https://github.com/golang/go/issues/31105) is tracking
the evolution of this topic.
Due to that, it's not possible to use the Go compiler to write Kubewarden policies.

Luckily there's another Go compiler that is capable of building WebAssembly
binaries that can be used by Kubewarden. This compiler is called [TinyGo](https://tinygo.org/):

> TinyGo is a project to bring the Go programming language to microcontrollers
> and modern web browsers by creating a new compiler based on LLVM.
>
> You can compile and run TinyGo programs on many different microcontroller
> boards such as the BBC micro:bit and the Arduino Uno.
>
> TinyGo can also be used to produce WebAssembly (Wasm) code which is very
> compact in size.

## Limitations

TinyGo doesn't yet support all the Go features (see [here](https://tinygo.org/lang-support/)
to see the current project status). Currently its biggest limitation
is the lack of a fully supported `reflect` package. That leads to the inability to compile
official Kubernetes Go API types (e.g.: `k8s.io/api/core/v1`).

Kubewarden policies need to process JSON data like the policy settings and
the actual request received by Kubernetes.

Despite TinyGo's current limitations, it's still easy and doable to write
Kubewarden validation policies with it.

## Tooling

Writing Kubewarden policies requires a version of TinyGo greater than `v0.28.1`.

:::warning
Using an older version of TinyGo will result in runtime errors due to the limited support for Go reflection.
:::

These Go libraries are extremely useful when writing a Kubewarden policy:

- [Kubewarden Go SDK](https://github.com/kubewarden/policy-sdk-go): provides a series of
  structures and functions that reduce the amount of code to write. It also provides test helpers.
- [Kubernetes Go types](https://github.com/kubewarden/k8s-objects): The
  [official Kubernetes Go Types](https://github.com/kubernetes/kubernetes/tree/master/staging/src/k8s.io)
  cannot be used with TinyGo. This module provides all the
  Kubernetes Types in a TinyGo-friendly way.
- [gjson](https://github.com/tidwall/gjson): It provides a powerful query language that allows
  quick navigation of JSON documents and data retrieval. This library doesn't use the
  `encoding/json` package provided by Go's stdlib, hence it's usable with TinyGo.
- [mapset](https://github.com/deckarep/golang-set): provides a Go implementation of the
  [Set](<https://en.wikipedia.org/wiki/Set_(abstract_data_type)>)
  data structure. This library significantly reduces the amount of code to be written,
  that's because operations like Set `union`, `intersection`, `difference` are pretty frequent inside
  of policies.

Last but not least, the Kubewarden project provides a
[template Go policy project](https://github.com/kubewarden/go-policy-template)
that can be used to quickly create Kubewarden policies written in Go.

## Getting TinyGo dependencies

The easiest way to get TinyGo is by using the upstream container images.
Official releases can be found [here](https://hub.docker.com/r/tinygo/tinygo), while
builds from the development branch are automatically pushed
[here](https://hub.docker.com/r/tinygo/tinygo-dev).

If needed, checkout TinyGo's [getting started](https://tinygo.org/getting-started/) page for
more information.
