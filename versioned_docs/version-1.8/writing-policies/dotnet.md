---
sidebar_label: "C#"
title: ""
---

# C#

Currently .NET Core has experimental support for the WebAssembly WASI
platform.
This is delivered via the
[`dotnet-wasi-sdk`](https://github.com/SteveSandersonMS/dotnet-wasi-sdk)
project.

:::note
You don't need a Windows machine to write or run .NET Core code. Everything
can be done also on a Linux or on an Apple machine.
:::

## Current State

Policy authors can leverage the following resources:

  * [Kubewarden .NET Core SDK](https://github.com/kubewarden/policy-sdk-dotnet):
    this provides a set of objects and functions that simplify the process of
    writing policies.
  * [Kubewarden policy example](https://github.com/kubewarden/policy-sdk-dotnet/tree/main/example):
    this is an example of a working policy.

No limitations has been found. The SDK allows both validating and mutating
policies to be written.

It's possible to use the
[`KubernetesClient.Models`](https://www.nuget.org/packages/KubernetesClient.Models)
library to deal with the Kubernetes objects.

## Project template

Currently we do not have a project template that can be used to quickly scaffold
a C# policy.

Please, [open an issue](https://github.com/kubewarden/policy-sdk-dotnet/issues)
if you are interested.
