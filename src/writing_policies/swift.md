> **Note well:** WebAssembly and WASI are fast evolving targets. The contents
> of this page have been written during Nov 2020, hence they could be outdated.
>
> Please open an issue if the contents of this page have become outdated.

# Swift

As stated on the [official website](https://swift.org/):

> Swift is a general-purpose programming language built using a modern approach
> to safety, performance, and software design patterns.

The swift compiler doesn't yet have WebAssembly support, however the
[Swiftwasm](https://swiftwasm.org/) provides a patched compiler with this
capability.

The Swiftwasm team is also working to upstream all these changes into the
Swift project. In the meantime the toolchain provided by the Swiftwasm project
can be used to build Chimera policies.

**Note well:** you don't need an Apple system to write or run Swift code. Everything
can be done also on a Linux machine or on Windows (by using Docker for Windows).

# Known limitations

No severe limitations have been found, only some minor glitches.

The automatic unmarshalling of JSON data into native `struct` or `class` objects
is not working. JSON parsing is still doable, but requires significantly more
code. Once [this issue](https://github.com/swiftwasm/swift/issues/2223)
is solved the Swift-based policies will be even easier to write.


We haven't done extensive testing, but from our initial research it seems the
performance of WASM modules produced by the Swiftwasm compiler *seem* to be
slower than the ones produced by the Rust.

It's also critical to perform some post-build optimizations before using the
policy *"in production"*.

These optimizations are:

  1. Strip the WASM module via `wasm-strip` to reduce its size
  1. Optimize the WASM module via `wasm-opt`

# Example

[This GitHub repository](https://github.com/chimera-kube/pod-runtime-class-policy)
contains a Chimera policy written in Swift.

The policy's `Makefile` has a `release` target that takes care of the
optimizations outlined above.

