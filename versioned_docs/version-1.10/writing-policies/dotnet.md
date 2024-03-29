---
sidebar_label: C#
title: C#
description: Kubewarden policies using C# and .NET
keywords: [kubewarden, kubernetes, writing policies, c#, .net]
doc-type: [how-to, explanation, tutorial, reference]
doc-topic: [kubewarden, writing-policies, c#]
doc-persona: [kubewarden-policy-developer]
---

Currently, .NET Core has experimental support for the WebAssembly WASI platform.
This is from the [`dotnet-wasi-sdk`](https://github.com/SteveSandersonMS/dotnet-wasi-sdk) project.

:::note

You don't need a Windows installation to write or run .NET Core code.
Everything can be done also on a Linux or on an macOS machine.

:::

## Current state

Policy authors can use the following resources:

- [Kubewarden .NET Core SDK](https://github.com/kubewarden/policy-sdk-dotnet):
this provides a set of objects and functions that simplify the process of writing policies.
- [Kubewarden policy example](https://github.com/kubewarden/policy-sdk-dotnet/tree/main/example):
this is an example of a working policy.

No limitations are known.
The SDK enables writing both validating and mutating policies.

It's possible to use the
[`KubernetesClient.Models`](https://www.nuget.org/packages/KubernetesClient.Models)
library to deal with the Kubernetes objects.

## Project template

Currently, we don't have a project template that can scaffold a C# policy.

Please, [open an issue](https://github.com/kubewarden/policy-sdk-dotnet/issues)
if interested.
