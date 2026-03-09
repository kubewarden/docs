---
sidebar_label: Rust
title: Rust
description: An introduction to writing Kubewarden policies with Rust.
keywords: [kubewarden, kubernetes, writing policies, introduction]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, rust, introduction]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rust/intro-rust"/>
</head>

[Rust](https://www.rust-lang.org/) is the most mature programming language that can generate WebAssembly modules.
WebAssembly is a first-class citizen in the Rust world so many of the tools and crates from the Rust ecosystem work out of the box.

Kubewarden provides a [Rust SDK](https://crates.io/crates/kubewarden-policy-sdk) that simplifies the process of writing policies.
There is also a [template project](https://github.com/kubewarden/rust-policy-template) to provide scaffolding for a policy project using the [`cargo-generate`](https://github.com/cargo-generate/cargo-generate) utility.

This documentation shows how to use these projects to write Kubewarden policies using Rust.
It doesn't cover the details of Kubewarden's Rust SDK.
The details are in the [crate documentation](https://docs.rs/kubewarden-policy-sdk/0.1.0).

## Getting the Rust dependencies

Install the Rust compiler and its tools using
[rustup](https://github.com/rust-lang/rustup).
Refer to the rustup [install documentation](https://rust-lang.github.io/rustup/installation/index.html).

Once you have installed `rustup` add the WebAssembly System Interface (WASI) target:

```console
rustup target add wasm32-wasip1
```

## OSX dependencies

To use `cargo-generate` you need to add the Xcode tool set.
If it isn't installed through Xcode the following command gives you the dependencies needed:

```console
xcode-select --install
```
