---
sidebar_label: "Introduction"
title: ""
---

# Open Policy Agent

:::note
Open Policy Agent support has been introduced starting from these releases:
  * kwctl: v0.2.0
  * policy-server: v0.2.0
:::

Open Policy Agent is a general purpose policy framework that uses the
Rego language to write policies.

## Introduction

Rego policies work by receiving an input to evaluate, and produce an
output as a response. In this sense, Open Policy Agent has no specific
tooling for targeting writing policies for Kubernetes.

Specifically, policies in Open Policy Agent receive a JSON input and
produce a JSON output. When the Open Policy Agent server is set up to
receive admission review requests from Kubernetes, policies will
receive a Kubernetes `AdmissionReview` object in JSON format with the
object to evaluate, and they have to produce a valid `AdmissionReview`
object in return with the evaluation results.

## Compatibility with existing policies

All policies can be compiled to the `wasm` target (WebAssembly) with
the official `opa` CLI tool.

In terms of policy execution, you can read more about the [Open Policy
Agent built-in support that is implemented in
Kubewarden](../02-builtin-support.md).
