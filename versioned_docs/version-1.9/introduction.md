---
slug: /
sidebar_label: "Introduction"
title: "Introduction"
description: Introducing Kubewarden, a CNCF Sandbox project.
keywords: [kubewarden, cncf, cncf sandbox, kubernetes]
---

# Introduction

Kubewarden is a Kubernetes Policy Engine.
It aims to be the Universal Policy Engine for Kubernetes.

You can reuse policies from other policy engines without having to rewrite them.
You can write your own policies in any programming language
that generates WebAssembly binaries,
reusing your language tooling and libraries.
You can run policies outside of the cluster and as part of your CI/CD processes.

Kubewarden also provides an audit scanner to
actively and continuously check policy enforcement over time.

Kubewarden is a [CNCF](https://cncf.io) Sandbox project, initially created by [Rancher](https://www.rancher.com/).

## What is WebAssembly?

As stated on [WebAssembly's official website](https://webassembly.org/):

> WebAssembly (abbreviated Wasm) is a binary instruction format for a
> stack-based virtual machine. Wasm is designed as a portable
> compilation target for programming languages, enabling deployment on
> the web for client and server applications.

Wasm was originally conceived as a browser "extension".
However, efforts are being made by the WebAssembly
community to allow the execution of Wasm code outside
browsers.

## Why use WebAssembly?

Users can write Kubernetes policies using their
favorite programming language, provided its toolchain can generate
Wasm binaries.

Wasm modules are portable, once built they can run on any kind of
processor architecture and operating system. For example, a policy developed and built on Apple
Silicon can run on AMD64/Intel64 Linux without conversion.

Policy authors can reuse their skills, tools and best
practices. Policies are "traditional" programs that can have reusable
blocks (regular libraries), can be linted and tested, and be
plugged into current CI and CD workflows.

## Policy distribution

Kubewarden policies can be served by a regular web server or,
better, be published from an OCI compliant registry.

Kubewarden policies can be stored inside an OCI compliant registry as
[OCI artifacts](https://github.com/opencontainers/artifacts).
