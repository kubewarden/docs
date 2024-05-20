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

A ClusterAdmissionPolicy defines how policies evaluate requests.

### ClusterPolicyReport

A [PolicyReport](#policyreport) and a ClusterPolicyReport store results of
policy scans. Which one is used depends on the scope of the resource.

## K

### kwctl

A CLI tool allowing administrators to test policies before applying them to a
cluster.

## M

### MutatingWebhookConfiguration

## P

### PolicyReport

A PolicyReport and a [ClusterPolicyReport](#clusterpolicyreport) store results of
policy scans. Which one is used depends on the scope of the resource.

### PolicyServer {#policy-server}

A PolicyServer validates incoming requests by executing Kubewarden policies against requests.

## V

### ValidatingWebhookConfiguration

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