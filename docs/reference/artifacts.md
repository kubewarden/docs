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

### Binaries

Our `kwctl` CLI tool is published via [GitHub releases](https://github.com/kubewarden/kwctl/releases).

### OCI artifacts

For OCI artifacts, we publish everything in ghcr.io under
https://github.com/orgs/kubewarden/packages. This includes:

- [`kubewarden/packages/policies/*`](https://github.com/orgs/kubewarden/packages/policies)
  are policy WASM OCI artifacts.
- [`kubewarden/packages/charts/*`](https://github.com/orgs/kubewarden/packages/charts)
  are the our Helm charts as OCI artifacts. They follow SLSA standards.
- Our container images are published as OCI images: `kubewarden-controller, policy-server, audit-scanner, kubectl`.
- There's also `packages/tests/*` containing artifacts used in e2e tests, purposedfully separated.

### Helm charts via HTTPS

For typical Helm charts, they are published under our Helm chart HTTPS
repository under https://charts.kubewarden.io (without SLSA nor signatures, yet
this type of Helm repository allows for searchs).
