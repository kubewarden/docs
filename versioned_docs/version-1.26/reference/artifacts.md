---
sidebar_label: Artifacts
sidebar_position: 20
title: Artifacts
description: List of Kubewarden artifacts
keywords: [artifacts, support, airgap, images]
doc-persona: [kubewarden-operator]
doc-type: [reference]
doc-topic: [operator-manual, artifacts, registry, images]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/artifacts"/>
</head>

## Kubewarden artifacts

### Verifying Kubewarden

There is a tutorial on [verifying Kubewarden](../tutorials/verifying-kubewarden),
demonstrating how to verify Kubewarden artifacts.

### Binaries

Kubewarden publishes the `kwctl` CLI tool at
[GitHub releases](https://github.com/kubewarden/kwctl/releases).

### OCI artifacts

For Open Container Initiative (OCI) artifacts, the project publishes everything in ghcr.io at
[github.com/orgs/kubewarden/packages](https://github.com/orgs/kubewarden/packages).
This includes:

- [`kubewarden/packages/policies/*`](https://github.com/orgs/kubewarden/packages/policies)
  are the policy Wasm OCI artifacts.
- [`kubewarden/packages/charts/*`](https://github.com/orgs/kubewarden/packages/charts)
  are the Helm charts as OCI artifacts.
  They follow [SLSA](https://slsa.dev) standards.
- Container images published as OCI images:
  `kubewarden-controller, policy-server, audit-scanner, kubectl`.
- There's also `packages/tests/*` containing artifacts used in e2e tests.

### Helm charts via HTTPS

Kubewarden publishes Helm charts in the Helm chart HTTPS repository at
[charts.kubewarden.io](https://charts.kubewarden.io)
They're without SLSA, or signatures, but this Helm repository provides searching.
