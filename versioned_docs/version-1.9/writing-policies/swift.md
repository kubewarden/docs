---
sidebar_label: "Swift"
title: ""
---

# Swift

As stated on the [official website](https://swift.org/):

> Swift is a general-purpose programming language built using a modern approach
> to safety, performance, and software design patterns.

The swift compiler doesn't yet have WebAssembly support, however the
[Swiftwasm](https://swiftwasm.org/) provides a patched compiler with this
capability.

The Swiftwasm team is also working to upstream all these changes into the
Swift project. In the meantime the toolchain provided by the Swiftwasm project
can be used to build Kubewarden policies.

:::note
You don't need an Apple system to write or run Swift code. Everything
can be done also on a Linux machine or on Windows (by using Docker for Windows).
:::

## Current State

Policy authors can leverage the following resources:

  * [Kubewarden Swift SDK](https://github.com/kubewarden/policy-sdk-swift): this
    provides a set of `struct` and functions that simplify the process of
    writing policies.
  * [Kubewarden Swift template project](https://github.com/kubewarden/swift-policy-template):
    use this template to quickly scaffold a Swift-based policy. The template comes
    with a working policy and a set of GitHub Actions to automate its lifecycle.

No severe limitations have been found inside of Swift, only
some minor glitches:

* It's critical to perform some post-build optimizations before using the
  policy *"in production"*:
  1. Strip the Wasm module via `wasm-strip` to reduce its size
  1. Optimize the Wasm module via `wasm-opt`

The GitHub Action provided by the template repository already takes care of that.

## More examples

[This GitHub repository](https://github.com/kubewarden/pod-runtime-class-policy)
contains a Kubewarden Policy written in Swift.
