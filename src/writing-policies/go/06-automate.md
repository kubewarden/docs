# Automations

This section describes how we can use GitHub Actions to automate as many tasks
as possible.

The scaffolded project already includes all the GitHub actions you need.
These files can be found inside of the `.github/workflows` directory.

The same principles can be adapted to use a different CI system.

## Testing

We can automate the execution of the unit tests and of the end-to-end tests.

This is working out of the box thanks to these files:

  * `.github/workflows/e2e-tests.yml`
  * `.github/workflows/unit-tests.yml`

## Release

The scaffolded project created a `.github/workflows/release.yml.template`.

This file defines a pipeline that performs the following steps:

  * Checkout code
  * Build the WebAssembly policy
  * Push the policy to an OCI registry
  * Eventually create a new GitHub Release

To enable the pipeline you need to rename it to `release.yml` and change the
value of the `OCI_TARGET` to match your preferences.

The pipeline will act differently based on the commit that triggered its execution.

Regular commits will lead to the creation of an OCI artifact called `<policy-name>:latest`.
No GitHub Release will be created for this commits.

On the other hand, creating a tag that matches the `v*` pattern, will lead
to:

1. Creation of an OCI artifact called `<policy-name>:<tag>`.
1. Creation of a GitHub Release named `Release <full tag name>`. The release
  will include the following assets: the source code of the policy and the WebAssembly
  binary.

### A concrete example

Let's assume we have a policy named named `safe-labels` and we want to publish
it as `ghcr.io/kubewarden/policies/safe-labels`.

The contents of the `jobs.env` section of `release.yml` should look like that:

```yaml
jobs:
  build:
    name: Create new release with Wasm artifact
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
