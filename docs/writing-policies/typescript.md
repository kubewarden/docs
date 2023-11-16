---
sidebar_label: Typescript
title: Typescript
description: Writing Kubewarden policies with Typescript
keywords: [at least one]
doc-type: [one of how-to, explanation, tutorial, reference]
doc-topic: [root-branch]
doc-persona: [default]
---

As stated on the [official website](https://www.typescriptlang.org/):

> TypeScript extends JavaScript by adding types.
>
> By understanding JavaScript, TypeScript saves you time catching errors and
> providing fixes before you run code.

TypeScript can't target WebAssembly, however
[AssemblyScript](https://www.assemblyscript.org/)
is a **subset** of TypeScript designed for WebAssembly.

## Current state

Currently, there's no Kubewarden SDK for AssemblyScript.
Resources permitting, we hope to have on in the near future.

However, there are limitations affecting AssemblyScript:

* There's no built-in way to serialize and deserialize Classes to
  and from JSON.
  See [this issue](https://github.com/AssemblyScript/assemblyscript/issues/292)
* It *seems* there's no JSON path library for AssemblyScript

## Example

[This GitHub repository](https://github.com/kubewarden/pod-privileged-policy)
has a Kubewarden Policy written in AssemblyScript.

This repository has a series of GitHub Actions that automate the following tasks:

* Run unit tests and code linting on pull requests and after code is merged into the main branch
* Build the policy in `release` mode and push it to an OCI registry as an artifact
