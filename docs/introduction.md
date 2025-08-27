---
slug: /
sidebar_label: Introduction
sidebar_position: 1
title: What is Kubewarden?
description: Introducing Kubewarden, a CNCF Sandbox project.
keywords: [kubewarden, cncf, cncf sandbox, kubernetes]
doc-persona: [kubewarden-all]
doc-type: [explanation]
doc-topic: [introduction]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io"/>
</head>

Kubewarden is a Kubernetes Policy Engine.
It aims to be the Universal Policy Engine for Kubernetes.

Kubewarden is a [vendor neutral](#vendor-neutrality), [CNCF](https://cncf.io) Sandbox project,
originally created by [SUSE Rancher](https://www.rancher.com/).

## How does Kubewarden help?

Kubewarden offers flexibility for policy admission and enforcement in a Kubernetes environment.

### Benefits and value

- Use any programming language that generates [WebAssembly](https://webassembly.org) binaries to write your policies.
- WebAssembly enables policy compatibility across processors and operating systems.
- Reuse of policies from other policy engines without the need for rewriting them.
- Distribute policies using standard and secure mechanisms such as [OCI](https://opencontainers.org) compliant registries.
- Policy enforcement at admission ensures only compliant workloads run.
- The Kubewarden audit scanner actively and continuously checks policy enforcement over time.
- Verify policies using [SLSA](https://slsa.dev) (Supply Chain Levels for Software Artifacts) tools and practices.
- Kubewarden provides a comprehensive approach to admission policy management.
- CNCF membership and a growing open source community and ecosystem help Kubewarden with transparency, collaboration and improvement.

### Use cases

- Security hardening. For example, enforce policies restricting container
  privileges, enforce network policies, or block insecure image registries.
- Compliance auditing. Ensure workloads follow organizational or regulatory
  standards and best practices.
- Resource optimization. Enforce resource limits and quotas.

There is further documentation of use cases on the [use cases](use-cases.md) page.

## New to Kubewarden?

If new to the Kubewarden project start with the
[Quick start guide](./quick-start.md)
and the [architecture](./explanations/architecture.md) page.
Then it depends where your interests take you.
For policy developers there are language specific sections in the tutorials.
For integrators and administrators there is a 'how-tos' section.
The explanations section contains useful background material.
There is also a [glossary](./glossary.md).

## What is WebAssembly?

As stated on [WebAssembly's official website](https://webassembly.org/):

> WebAssembly (abbreviated Wasm) is a binary instruction format for a
> stack-based virtual machine. Wasm is designed as a portable
> compilation target for programming languages, enabling deployment on
> the web for client and server applications.

Wasm was originally conceived as a browser "extension". However, the
WebAssembly community is engaged in efforts to allow the execution of Wasm code
outside browsers.

## Why use WebAssembly?

Users can write Kubernetes policies using their
favorite programming language, provided its toolchain can generate
Wasm binaries.

Wasm modules are portable, once built they can run on any kind of processor
architecture and operating system.
For example, a policy developed and built on Apple Silicon can run on
AMD64/Intel64 Linux without conversion.

Policy authors can reuse their skills, tools and best practices. Policies are
"traditional" programs that can have reusable blocks (regular libraries). You
can lint and test them and you can plug them into current CI and CD workflows.

## Policy distribution

You can serve Kubewarden policies using a standard web server or, better, you
can be publish them in an OCI compliant registry as
[OCI artifacts](https://github.com/opencontainers/artifacts).

## Vendor neutrality {#vendor-neutrality}

Kubewarden is a [vendor neutral](https://contribute.cncf.io/maintainers/community/vendor-neutrality/) project as defined by the CNCF.
