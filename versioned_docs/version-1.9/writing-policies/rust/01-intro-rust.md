---
sidebar_label: "Introduction to Rust"
title: ""
---

# Rust

[Rust](https://www.rust-lang.org/) is the most mature programming language that
can generate WebAssembly modules: WebAssembly is a first-class citizen
in the Rust world. That means many of the tools and crates of the Rust
ecosystem work out of the box.

Kubewarden provides a [Rust SDK](https://crates.io/crates/kubewarden-policy-sdk)
that simplifies the process of writing policies, plus a
[template project](https://github.com/kubewarden/rust-policy-template) to
quickly scaffold a policy project using the
[`cargo-generate`](https://github.com/cargo-generate/cargo-generate) utility.

This document illustrates how to take advantage of these projects to write
Kubewarden policies using the Rust programming language.

Note well, we won't cover the details of Kubewarden's Rust SDK inside of this
page. These can be found inside of the
[official crate documentation](https://docs.rs/kubewarden-policy-sdk/0.1.0).

## Getting Rust dependencies

This section guides you through the process of installing the Rust compiler and
its dependencies.

As a first step install the Rust compiler and its tools, this can be easily done
using [rustup](https://github.com/rust-lang/rustup). Please follow
[rustup's install documentation](https://rust-lang.github.io/rustup/installation/index.html).

Once `rustup` is installed add the WASI target:

```shell
rustup target add wasm32-wasi
```

## OSX specific dependencies

In order to use `cargo-generate` you will need to add the Xcode tool set. If it isn't installed through Xcode the following command will give you the dependencies needed:

```shell
xcode-select --install
```
