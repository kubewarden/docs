---
sidebar_label: WASI
title: WASI
description: Using WASI to develop Kubewarden policies.
keywords: [kubewarden, kubernetes, wasi]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, wasi]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/wasi/intro-wasi"/>
</head>

The [WebAssembly System Interface (WASI)](https://wasi.dev/) is a WebAssembly standard providing a set of interfaces allowing execution of WebAssembly outside of browser.

:::caution

Authors writing regular policies should never use plain WASI system interfaces to write policies.

This page is for Kubewarden maintainers or low level policy authors who want to experiment with bleeding edge WASM platforms.

:::

Using WASI, you can have a WebAssembly module that interacts with system primitives like STDOUT, STDERR, STDIN, environment variables and more.

Many of the compilers used to compile Kubewarden policies produce WebAssembly modules that target WASI interfaces.
However, Kubewarden policies use the [waPC](https://github.com/wapc) project to implement bi-directional communication between the policy and the policy runtime (`kwctl` or `policy-server`).
Kubewarden use of the communication protocol is described [here](../../../reference/spec/01-intro-spec.md).

There are special cases when the waPC project can't be used yet.
In these circumstances you can write a policy using the interfaces provided by WASI.

:::info

Kubewarden supports WASI policies from the Kubewarden 1.7.0 release forward.

:::

## Limitations

You shouldn't use WASI policies under regular circumstances because they have inferior performance at
evaluation time compared to waPC/Rego ones.

:::note

Bidirectional communication between the policy and the host can be achieved, but requires
changes to be done inside of the language SDK.
This is required to use [host capabilities](../../../reference/spec/host-capabilities/01-intro-host-capabilities.md)
and to write [context-aware](../../../explanations/context-aware-policies.md) policies.

Currently, only the Kubewarden Go and JavaScript/TypeScript SDKs expose them to WASI policies.

If this is of interest to you, please get in touch.
We can then prioritize the effort.

:::

## Use cases

The only reason to write a "plain WASI" policy is when you can't use the waPC communication mechanism.

Currently, (as of June 2023), the only good reason to do this is when using the official Go compiler to produce a WebAssembly module.

Starting from the 1.21 release, the official Go compiler is able to produce WebAssembly modules targeting the WASI interface.
However, these modules can't yet export functions to the WebAssembly runtime.
This limitation, tracked by [this dedicated issue](https://github.com/golang/go/issues/42372), prevents the adoption of the waPC protocol.

The Kubewarden project team advise that you write Kubewarden Go policies using the TinyGo compiler, as described [here](../go/01-intro-go.md).

However, certain complex Go code bases can't be compiled using the TinyGo compiler.
This includes, for example, code bases like [CEL-go](https://github.com/google/cel-go) or [Kyverno](https://github.com/kyverno/kyverno/).
In these circumstances, usage of the official Go compiler can help.

## Communication protocol

This section describes how to write a plain WASI policy.

You need to write the code as a regular CLI program.
The program must take the following sub-commands:

- `validate`: this command is invoked by the policy engine to evaluate an admission request
- `validate-settings`: this command is invoked by the policy engine to validate the policy settings

In both cases, the data to be validated is provided via STDIN.
The policy must provide the answer via STDOUT.
You can use STDERR for debug or error messages.

### Validation

The validation of a request happens when invoking the policy CLI program using the `validate` sub-command.

STDIN must contain a JSON document describing a `ValidationRequest` object.
The policy must write to STDOUT a JSON document that containing a `ValidationResponse` object.

Both the `ValidationRequest` and `ValidationResponse` objects are described [here](../../../reference/spec/03-validating-policies.md).

### Mutation

Mutating policies work in the same way as validating ones.
The policy CLI program is invoked using the `validate` sub-command.

STDIN must contain a JSON document describing a `ValidationRequest` object.
The policy must write to STDOUT a JSON document containing a `ValidationResponse` object.

Both the `ValidationRequest` and `ValidationResponse` objects are described [here](../../../reference/spec/03-validating-policies.md).

When a mutation is needed, the `ValidationResponse` object must have a key, `mutated_object`, containing the object to be created.
This process is described [here](../../../reference/spec/04-mutating-policies.md).

## Context-aware

Only supported via the Go SDK for now. The Go SDK exposes the context-aware
capabilities as usual, for more information see [here](../../../explanations/context-aware-policies).

As an example of a WASI Go context-aware policy, see the
[go-wasi-context-aware-test-policy](https://github.com/kubewarden/go-wasi-context-aware-test-policy).

### Settings validation

The policy must provide a sub-command named `validate-settings`.
This command is used to validate the settings provided by the user.

The program must receive on STDIN, a JSON object that holds the settings provided by the user.
It then validates them and writes a `SettingsValidationResponse` object to STDOUT.

The format of the `SettingsValidationResponse` and the settings validation process is described [here](../../../reference/spec/02-settings.md).

## Policy metadata

Each Kubewarden policy must be annotated via the `kwctl annotate` command.
The policy metadata of a plain WASI policy must have this value:

```yaml
executionMode: wasi
```

## Template project

[This GitHub repository](https://github.com/kubewarden/go-wasi-policy-template) contains a template of a Go-based policy using the WASI protocol.
