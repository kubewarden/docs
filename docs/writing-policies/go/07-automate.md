---
sidebar_label: "GitHub Action Integration"
title: ""
---

# Automations

This section describes how we can use GitHub Actions to automate as many tasks
as possible.

The scaffolded project already includes all the GitHub actions you need.
These Actions can be found in the `.github/workflows/ci.yml.template` file;
rename it to `github/workflows.ci/yml` to enable them.

The same principles can be adapted to use a different CI system.

## Testing

Automation of the unit tests and of the end-to-end tests is working out of the
box thanks to the `unit-tests` and `e2e-tests` jobs defined in
`.github/workflows/ci.yml.template`.

## Release

The scaffolded project contains a `release` job in
`.github/workflows/ci.yml.template`.

This job performs the following steps:

  * Checkout code
  * Build the WebAssembly policy
  * Push the policy to an OCI registry
  * Eventually create a new GitHub Release

To enable the job you need to rename it to `ci.yml` and change the value of the
`OCI_TARGET` to match your preferences.

The job will act differently based on the commit that triggered its execution.

Regular commits will lead to the creation of an OCI artifact called `<policy-name>:latest`.
No GitHub Release will be created for these commits.

On the other hand, creating a tag that matches the `v*` pattern, will lead
to:

1. Creation of an OCI artifact called `<policy-name>:<tag>`.
1. Creation of a GitHub Release named `Release <full tag name>`. The release
  will include the following assets: the source code of the policy and the WebAssembly
  binary.

### A concrete example

Let's assume we have a policy named `safe-labels` and we want to publish
it as `ghcr.io/kubewarden/policies/safe-labels`.

The contents of the `jobs.push-to-oci-registry.env` section of `ci.yml` should
look like this:

```yaml
jobs:
  push-to-oci-registry:
    runs-on: ubuntu-latest
    env:
      WASM_BINARY_NAME: policy.wasm
      OCI_TARGET: ghcr.io/kubewarden/policies/safe-labels
```

Pushing a tag named `v0.1.0` will lead to the creation and publishing of the
OCI artifact called `ghcr.io/kubewarden/policies/safe-labels:v0.1.0`.

A GitHub Release named `Release v0.1.0` will be created. The release will
include the following assets:

* Source code compressed as `zip` and `tar.gz`
* A file named `policy.wasm` that is the actual WebAssembly policy
