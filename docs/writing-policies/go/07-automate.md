---
sidebar_label: GitHub Actions
title: Integrating with GitHub Actions
description: Integrating with GitHub actions when developing policies for Kubewarden in Go.
keywords: [kubewarden, kubernetes, github, integration]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, golang, github-action-integration]
doc-persona: [kubewarden-developer]
---

## Automation

This section describes how you can use GitHub Actions to automate tasks.

The project scaffolding already includes all the GitHub actions you need.
You can find the Actions in the `.github/workflows/ci.yml.template` file.
Rename it to `.github/workflows.ci/yml` to enable them.

You can adapt these principles to use a different CI system.

## Testing

Automation of the unit tests and of the end-to-end tests works out of the box.
It uses the `unit-tests` and `e2e-tests` jobs defined in `.github/workflows/ci.yml.template`.

## Release

The project scaffolding contains a `release` job in `.github/workflows/ci.yml.template`.

This job performs the following steps:

- Checkout code
- Build the WebAssembly policy
- Push the policy to an OCI registry
- Create a new GitHub Release

To enable the job, rename it to `ci.yml` and change the value of the `OCI_TARGET` to match your preferences.

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

A GitHub release named `Release v0.1.0` is created.
The release includes the following assets:

- Source code compressed as `zip` and `tar.gz`
- A file named `policy.wasm`; this is the actual WebAssembly policy
