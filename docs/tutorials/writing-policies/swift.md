---
sidebar_label: Swift
sidebar_position: 60
title: Swift
description: Kubewarden policies with Swift
keywords: [kubewarden, kubernetes, writing policies, swift]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, swift]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/swift"/>
</head>

As stated on the [official website](https://swift.org/):

> Swift is a general-purpose programming language that’s approachable for newcomers and powerful for experts.
> It is fast, modern, safe, and a joy to write.

The swift compiler doesn't yet have WebAssembly support, however the
[SwiftWasm](https://swiftwasm.org/) project provides a patched compiler with this
capability.

The SwiftWasm team is working to merge these changes into the Swift project.
In the meantime, you can use the tool chain provided by the SwiftWasm project to build Kubewarden policies.

:::note

You don't need an Apple system to write or run Swift code. Everything
can be done also on a Linux machine or on Windows (by using Docker for Windows).

:::

## Current State

Policy authors can use the following resources:

* [Kubewarden Swift SDK](https://github.com/kubewarden/policy-sdk-swift): this provides a set of `struct`s and functions that simplify the process of writing policies.
* [Kubewarden Swift template project](https://github.com/kubewarden/swift-policy-template): use this template to scaffold a Swift-based policy.
The template comes with a working policy and a set of GitHub Actions to automate its lifecycle.

There are no severe limitations with Swift, only some minor issues:

* It's critical to perform some post-build optimizations before using the
  policy *"in production"*:
  1. Strip the Wasm module via `wasm-strip` to reduce its size
  1. Optimize the Wasm module via `wasm-opt`

The GitHub Action provided by the template repository already takes care of that.

## More examples

[This GitHub repository branch](https://github.com/kubewarden/pod-runtime-class-policy/tree/swift-implementation)
has a Kubewarden Policy written in Swift.
