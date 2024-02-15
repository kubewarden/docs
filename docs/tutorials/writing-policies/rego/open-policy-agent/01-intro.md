---
sidebar_label: Introduction
title: Introduction to Open Policy Agent
description: Introduction to Open Policy Agent and Kubewarden.
keywords: [kubewarden, kubernetes, open policy agent, opa, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, open-policy-agent, introduction]
---

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
Kubewarden](../builtin-support).
