# Getting started

The `chimera-admission` project is the core component of the Chimera
project. It's an admission controller that is designed to
validate and, in the near future, to mutate incoming requests
made agaist the Kubernetes API server.

## Cloning

The first step is to clone the `chimera-admission` project:

```shell
$ git clone https://github.com/chimera-kube/chimera-admission.git
```

## Building

After you have cloned the `chimera-admission` project, you can build
either the `x86_64` or the `arm64` binaries, depending on your
architecture:

```shell
$ # Build x86_64 binary
$ make chimera-admission-amd64
$ # Build ARM64 binary
$ make chimera-admission-arm64
```

> **Note well:** cross compiling `chimera-admission` is tricky at this
> time due to its current dependency on CGO, therefore we suggest you
> to build the `chimera-admission` target that matches your current
> architecture and toolchain.
