---
sidebar_label: Introduction
title: Introduction to Open Policy Agent
description: Introduction to Open Policy Agent and Kubewarden.
keywords: [kubewarden, kubernetes, open policy agent, opa, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, open-policy-agent, introduction]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/open-policy-agent/intro"/>
</head>

:::note
Open Policy Agent support has been introduced starting from these releases:
  * kwctl: v0.2.0
  * policy-server: v0.2.0
:::

Open Policy Agent (OPA) is a general purpose policy framework that uses the
Rego language to write policies.

## Introduction

Rego policies work by receiving an input to evaluate,
and produce an output as a response.
In this sense, OPA has no specific tooling for targeting writing policies for Kubernetes.

Specifically, policies in OPA receive a JSON input and produce a JSON output.
The OPA server is configured to receive admission review requests from Kubernetes.
The policies receive a Kubernetes `AdmissionReview` object in JSON format.
They have to return a valid `AdmissionReview` object as the evaluation results.

## Compatibility with existing policies

All policies can be compiled to the `wasm` target (WebAssembly) with the official `opa` CLI tool.

In terms of policy execution,
you can read more about the [OPA built-in support](../builtin-support) implemented in Kubewarden.
