---
sidebar_label: Glossary
sidebar_position: 90
title: Glossary
description: Kubewarden glossary
keywords: [kubewarden, glossary]
doc-persona: [kubewarden-all]
doc-type: [explanation]
doc-topic: [glossary]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/glossary"/>
</head>

## A

### AdmissionPolicy

A namespace-wide resource. The policy processes only those requests targeting
the namespace in which the AdmissionPolicy is defined.

## C

### ClusterAdmissionPolicy

An [AdmissionPolicy](#admissionpolicy) which targets cluster-wide resources.

### ClusterPolicyReport

A [PolicyReport](#policyreport) and a ClusterPolicyReport store results of
policy scans. Which one is used, depends on the scope of the resource.

## K

### kwctl

A CLI tool to generate and test Kubernetes YAML files for policy deployment.

## M

### MutatingWebhookConfiguration

A
[Kubernetes resource](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#what-are-admission-webhooks)
created by the Kubewarden controller to let Kubernetes know where to send an `AdmissionReview`.
In other words,
this is how a Kubewarden controller informs Kubernetes where to find a resource mutating policy.

## P

### PolicyReport

A PolicyReport and a [ClusterPolicyReport](#clusterpolicyreport) store results of
policy scans. Which one is used depends on the scope of the resource.

### PolicyServer {#policy-server}

A PolicyServer validates incoming requests by executing Kubewarden policies against requests.

## V

### ValidatingWebhookConfiguration

A
[Kubernetes resource](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#what-are-admission-webhooks)
created by the Kubewarden controller to let Kubernetes know where to send a `AdmissionReview`.
In other words, this is how Kubewarden informs Kubernetes where to find a resource validating policy.

## W

### waPC

WebAssembly Procedure Calls. https://wapc.io.

### WASI

WebAssembly System Interface. https://wasi.dev.

### Wasm

A binary instruction format for a stack-based virtual machine. Designed for web
deployment. https://webassemly.org.

### Wasmtime

A runtime for WebAssembly. https://wasmtime.dev.