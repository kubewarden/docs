---
sidebar_label: GitHub Actions
sidebar_position: 070
title: Integrating with GitHub Actions
description: Integrating with GitHub actions when developing policies for Kubewarden in Go.
keywords: [kubewarden, kubernetes, github, integration]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, golang, github-action-integration]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/automate"/>
</head>

## Automation

This section describes how you can use GitHub Actions to automate tasks.

The project scaffolding already includes all the GitHub actions you need.
You can find the Actions in the `.github/workflows/test.yml` and `.github/workflows/release.yml` files.

You can adapt these principles to use a different CI system.

## Testing

Automation of the unit tests and of the end-to-end tests works out of the box.
It uses the jobs defined in `.github/workflows/test.yml`.

## Release

The project scaffolding has a `release` job in `.github/workflows/release.yml`.

This job performs the following steps:

- Checkout code
- Build the WebAssembly policy
- Push the policy to an Open Container Initiative (OCI) registry
- Create a new GitHub Release

To enable the job, adjust the `oci-target` action input for the reusable workflow (`reusable-release-policy-go.yml`) called in the `release.yml` file.

The job acts differently based on the commit that triggered its execution.

Regular commits lead to the creation of an OCI artifact called `<policy-name>:latest`.
A GitHub release isn't created for these commits.

Creating a tag that matches the `v*` pattern leads to:

- Creation of an OCI artifact called `<policy-name>:<tag>`.
- Creation of a GitHub release named `Release <full tag name>`.
The release includes the assets, the source code of the policy, and the WebAssembly binary.

### An example

Assume a policy named `safe-labels` and that it needs
publishing as `ghcr.io/kubewarden/policies/safe-labels`.

The contents of the `jobs.push-to-oci-registry.env` section of `ci.yml` should
look like:

```yaml
jobs:
  push-to-oci-registry:
    runs-on: ubuntu-latest
    env:
      WASM_BINARY_NAME: policy.wasm
      OCI_TARGET: ghcr.io/kubewarden/policies/safe-labels
```

Pushing a tag named `v0.1.0` leads to the creation and publishing of the
OCI artifact called `ghcr.io/kubewarden/policies/safe-labels:v0.1.0`.

It creates a GitHub release named `Release v0.1.0`.
The release includes the following assets:

- Source code compressed as `zip` and `tar.gz`
- A file named `policy.wasm`; this is the actual WebAssembly policy
