---
sidebar_label: "WASI"
title: ""
---

# WASI

:::caution
Regular policy authors should never use plain WASI system interfaces
to write policies.

This page is meant to be used by Kubewarden maintainers/low level
policy authors who want to experiment with bleeding edge WASM platforms.
:::

:::info
Kubewarden WASI policies are supported starting from Kubewarden 1.7.0 release
:::

[WASI](https://wasi.dev/) is a WebAssembly standard that provides a set of
interfaces that allow the execution of WebAssembly outside of the browser.

Thanks to WASI, it's possible to have a WebAssembly module that interacts
with system primitives like STDOUT, STDERR, STDIN, environment variables and
more.

Actually, many of the compilers used to compile Kubewarden policies
produce WebAssembly modules that targets the WASI interfaces.
However, Kubewarden policies leverage the [waPC](https://github.com/wapc)
project to implement a bi-directional communication between the
policy and the policy runtime (`kwctl` or `policy-server`); this communication
protocol is described [here](./spec/01-intro-spec.md).

There are however some special cases when the waPC project cannot be
used yet. In these limited circumstances it's possible to write a policy
just by using the interfaces provided by WASI.

## Limitations

WASI policies should not be used under regular circumstances because
they suffer from the following limitations:

- No bi-directional communication, hence
  [host capabilities](./spec/host-capabilities/01-intro-host-capabilities.md)
  are not available
- No [context-aware](../explanations/context-aware-policies.md) capabilities
- Inferior performance at evaluation time compared to waPC/Rego based policies

## Use cases

The only reason to write a "plain WASI" policy is when the waPC communication
mechanism cannot be leveraged.

Currently (as of June 2023), the only good reason to do that is when using the
official Go compiler to produce a WebAssembly module.

Starting from the 1.21 release, the official Go compiler is able to produce WebAssembly
modules targeting the WASI interface. However, these modules cannot yet
export functions to the WebAssembly runtime. This limitation, tracked by
[this dedicated issue](https://github.com/golang/go/issues/42372), prevents
the adoption of the waPC protocol.

Generally speaking, we advice to write Kubewarden Go policies using the TinyGo
compiler, as described [here](./go/01-intro-go.md).

However, some complex Go code bases cannot be compiled using the TinyGo compiler.
This includes, for example, code bases like [CEL-go](https://github.com/google/cel-go)
or [kyverno](https://github.com/kyverno/kyverno/). In these circumstances, the
usage of the official Go compiler can be beneficial.

## Communication protocol

This section describes how to write a plain WASI policy.

The code has to be written as a regular CLI program. The program must take
the following subcommands:

- `validate`: this command is invoked by the policy engine to evaluate
  an admission request
- `validate-settings`: this command is invoked by the policy engine to
  validate the policy settings

In both cases, the data to be validated is provided via the STDIN. The policy
must provide the answer via the STDOUT.
The STDERR can be used to provide debug or error messages.

### Validation

The validation of a request is done when the policy CLI program is invoked using
the `validate` subcommand.

The STDIN must contain a JSON document describing a `ValidationRequest` object.
The policy must to write to the STDOUT a JSON document that contains a
`ValidationResponse` object.

Both the `ValidationRequest` and `ValidationResponse` objects are described
[here](./spec/03-validating-policies.md).

### Mutation

Mutating policies work in the same way as validating ones. The policy CLI program
is invoked using the `validate` subcommand.

The STDIN must contain a JSON document describing a `ValidationRequest` object.
The policy must to write to the STDOUT a JSON document that contains a
`ValidationResponse` object.

Both the `ValidationRequest` and `ValidationResponse` objects are described
[here](./spec/03-validating-policies.md).

When a mutation has to be done, the `ValidationResponse` object must have a
key `mutated_object` that contains the object that has to be created.
This is described [here](./spec/04-mutating-policies.md).

### Settings validation

The policy must provide a subcommand named `validate-settings`. This command
is used to validate the settings that have been provided by the user.

The program must receive on the STDIN a JSON object that holds the settings
provided by the user.
It will then validate them and write a `SettingsValidationResponse` object
to the STDOUT.

The format of the `SettingsValidationResponse` and the settings validation
process is described [here](./spec/02-settings.md).

## Policy metadata

Each Kubewarden policy must be annotated via the `kwctl annotate` command.
The policy metadata of a plain WASI policy must provide this value:

```yaml
executionMode: wasi
```

## Template project

[This GitHub repository](https://github.com/kubewarden/go-wasi-policy-template)
contains a template of a Go-based policy that leverages the WASI protocol.
