> **Note well:** WebAssembly and WASI are fast evolving targets. The contents
> of this page have been written during Nov 2020, hence they could be outdated.
>
> Please open an issue if the contents of this page have become outdated.

# Rust

[Rust](https://www.rust-lang.org/) is the most mature programming language that
can generate WebAssembly modules.

WebAssembly is a first-class citizen in the Rust world, that means
many of the tools and crates should work out of the box.

Of course, Rust programs are still bound to the limitations of the WASI
specification.

## Example

[This GitHub repository](https://github.com/chimera-kube/pod-toleration-policy)
contains a Chimera Policy written in Rust.

**Worth of note:** this repository has a series of GitHub Actions that automate
the following tasks:

  * Run unit tests and code linting on pull requests and after code is merged
    into the main branch
  * Build the policy in `release` mode and push it to a OCI registry as an
    artifact
