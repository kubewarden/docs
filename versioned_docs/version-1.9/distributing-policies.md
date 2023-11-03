---
sidebar_label: "Distributing policies"
title: Distributing policies
description: A description of how Kubewarden policies are distributed from OCI-compliant repositories.
keywords: [oci, kubewarden, policy, wasm, webassembly]
---

Kubewarden policies are WebAssembly (Wasm) binaries that are evaluated by the Kubewarden Policy Server.

The Kubewarden policy server can load policies from these sources:

- Local filesystem
- HTTP(s) server
- OCI-compliant registries:
  - [Distribution](https://github.com/distribution/distribution)
  - [GitHub container registry](https://ghcr.io)
  - [Azure container registry](https://azure.microsoft.com/en-us/products/container-registry/)
  - [Amazon ECR](https://aws.amazon.com/ecr/)
  - [Google container registry](https://cloud.google.com/artifact-registry/)

We think distributing Kubewarden policies via a regular OCI-compliant registry is the best choice.
Container registries are a mandatory requirement for any Kubernetes cluster.
Having a single place to store, and secure, all the artifacts required by a cluster is beneficial.

# Pushing policies to an OCI-compliant registry

The [OCI image format](https://github.com/opencontainers/image-spec)
specification allows you to store any binary blob inside a regular OCI-compliant container registry.

The target OCI-compliant registry **must support artifacts** to successfully push a Kubewarden Policy to it.

You can use the [`kwctl`](https://github.com/kubewarden/kwctl) CLI to push a Kubewarden Policy to an OCI-compliant registry.

## Annotating the policy

You also annotate a policy with `kwctl`.
The process of annotating a Kubewarden policy is done by adding Wasm custom sections to the policy binary.
This means that the policy metadata is packaged with the policy itself.

The `kwctl annotate` command requires two inputs:

- the Kubewarden policy to annotate, a local file in the filesystem.

- the annotations file, a file containing a YAML description of the policy metadata.
This file is usually located root project folder of your policy.

For example, we save this file as `metadata.yml` in the current
directory:

```yaml
rules:
- apiGroups: ["*"]
  apiVersions: ["*"]
  resources: ["*"]
  operations: ["*"]
mutating: false
annotations:
  io.kubewarden.policy.title: palindromify
  io.kubewarden.policy.description: Allows you to reject palindrome names in resources and namespace names, or to only accept palindrome names
  io.kubewarden.policy.author: Name Surname <name.surname@example.com>
  io.kubewarden.policy.url: https://github.com/<org>/palindromify
  io.kubewarden.policy.source: https://github.com/<org>/palindromify
  io.kubewarden.policy.license: Apache-2.0
  io.kubewarden.policy.usage: |
    This is markdown text and as such allows you to define a free form usage text.

    This policy allows you to reject requests if:
    - The name of the resource is a palindrome name.
    - The namespace name where this resource is created has a palindrome name.

    This policy accepts the following settings:

    - `invert_behavior`: bool that inverts the policy behavior. If enabled, only palindrome names will be accepted.
```

Now, let's annotate the policy:

```shell
$ kwctl annotate policy.wasm \
    --metadata-path metadata.yml \
    --output-path annotated-policy.wasm
```

The annotation process performs some optimizations on the policy, so often the annotated policy is smaller than the original.
This depends considerably on the toolchain that was used to produce the original Wasm object.

:::info

<details>

<summary>Use <code>kwctl inspect</code> to check your policy</summary>

```shell
$ kwctl inspect annotated-policy.wasm
2023-08-24T12:06:27.986401Z  INFO sigstore::cosign::client_builder: Rekor public key not provided. Rekor integration disabled
2023-08-24T12:06:27.986449Z  INFO sigstore::cosign::client_builder: No Fulcio cert has been provided. Fulcio integration disabled
Details
title:                    palindromify
description:              Allows you to reject palindrome names in resources and namespace names, or to only accept palindrome names
author:                   Name Surname <name.surname@example.com>
url:                      https://github.com/<org>/palindromify
source:                   https://github.com/<org>/palindromify
license:                  Apache-2.0
mutating:                 false
background audit support: true
context aware:            false
execution mode:           kubewarden-wapc
protocol version:         1

Annotations
io.kubewarden.kwctl       1.7.0-rc2

Rules
────────────────────
- apiGroups:
  - '*'
  apiVersions:
  - '*'
  resources:
  - '*'
  operations:
  - '*'
────────────────────

Usage
This is markdown text and as such allows you to define a free form usage text.

This policy allows you to reject requests if:

• The name of the resource is a palindrome name.
• The namespace name where this resource is created has a palindrome name.

This policy accepts the following settings:

• invert_behavior: bool that inverts the policy behavior. If enabled, only palindrome names will be accepted.

Cannot determine if the policy has been signed. There was an error while attempting to fetch its signatures from the remote registry: invalid uri
```

</details>

:::

## Pushing the policy

You can push an annotated policy like this:

```shell
$ kwctl push annotated-policy.wasm \
     <oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1
```

It is discouraged to push unannotated policies.
The policy server uses the metadata provided by annotations to correctly execute a policy.
By default, `kwctl push` will refuse to push such a policy to an OCI registry.
If you need an unannotated policy, use the `--force` flag of `kwctl push`.

The policy can then be referenced from the Kubewarden Policy Server or `kwctl` as
`registry://<oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1`.
