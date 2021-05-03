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

**Note well:** you don't need an Apple system to write or run Swift code. Everything
can be done also on a Linux machine or on Windows (by using Docker for Windows).

## Current State

The creation of a Swift SDK is in progress, it can be found inside
of [this repository](https://github.com/kubewarden/policy-sdk-swift).
We plan to provide a template project to simplify the process of creating
Swift-based policies, like we do with other languages.

The documentation will be expanded to cover more detailed instructions for Swift
as soon as the work on the SDK is done.

In the meantime, no severe limitations have been found inside of Swift, only
some minor glitches:

* It's critical to perform some post-build optimizations before using the
  policy *"in production"*:
  1. Strip the Wasm module via `wasm-strip` to reduce its size
  1. Optimize the Wasm module via `wasm-opt`

## Example

[This GitHub repository](https://github.com/kubewarden/pod-runtime-class-policy)
contains a Kubewarden Policy written in Swift.

The policy's `Makefile` has a `release` target that takes care of the
optimizations outlined above.

**Worth of note:** this repository has a series of GitHub Actions that automate
the following tasks:

  * Run unit tests and code linting on pull requests and after code is merged
    into the main branch
  * Build the policy in `release` mode and push it to a OCI registry as an
    artifact
