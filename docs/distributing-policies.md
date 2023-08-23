---
sidebar_label: "Distributing policies"
title: Distributing policies
description: A description of how Kubewarden policies are distributed from OCI compliant repositories.
keywords: [oci, kubewarden, policy]
---

Kubewarden policies are Wasm binaries that are evaluated by the
Kubewarden Policy Server.

The Kubewarden policy server can load policies from these
sources:

- Local filesystem
- HTTP(s) server
- OCI compliant registries:
  - [Distribution](https://github.com/distribution/distribution)
  - [GitHub container registry](https://ghcr.io)
  - [Azure container registry](https://azure.microsoft.com/en-us/products/container-registry/)
  - [Amazon ECR](https://aws.amazon.com/ecr/)
  - [Google container registry](https://cloud.google.com/artifact-registry/)

We think distributing Kubewarden policies via a regular OCI compliant
registry is the best choice.
Container registries are a
mandatory requirement for any Kubernetes cluster.
Having a single
place to store, and secure, all the artifacts required by a cluster is beneficial.

# Pushing policies to an OCI compliant registry

<!--TODO: This has been archived so I need to revisit this with someone.-->
The [OCI Artifacts](https://github.com/opencontainers/artifacts)
specification allows to store any kind of binary blob inside a
regular OCI compliant container registry.

The target OCI compliant registry **must support artifacts** to successfully push a Kubewarden Policy to it.

The [`kwctl`](https://github.com/kubewarden/kwctl) CLI tool
can be used to push a Kubewarden Policy to an OCI compliant registry.

## Annotating the policy

Annotating a policy is also done with the `kwctl`. The
process of annotating a Kubewarden policy is done by adding
WebAssembly custom sections to the policy binary. This means that the
policy metadata is packaged with the policy itself.

The `kwctl annotate` command needs two main inputs:

* the Kubewarden policy to annotate, a local file in the filesystem.

* the annotations file, a file containing a YAML description of the policy metadata.
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

This process performs some optimizations on the policy, so often
the annotated policy is smaller than the original.
It depends considerably on the toolchain that was used to produce the
original WebAssembly object.

You can check with `kwctl inspect` that everything is correct:

<!--TODO: An actual example here? What to look for when correct/incorrect?-->
```shell
$ kwctl inspect annotated-policy.wasm
# here you will see a colored output of the metadata you provided on the `metadata.yml` file. This information is now read from the WebAssembly custom sections
```

## Pushing the policy

Pushing an annotated policy can be done like this:

```shell
$ kwctl push annotated-policy.wasm \
              <oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1
```

<!--TODO: A why or a reference would be good for this next paragraph.-->
It is discouraged to push unannotated policies. This is why, by default,
`kwctl push` will reject to push such a policy to an OCI registry. If
you really want to push an unannotated policy you can use the
`--force` flag of `kwctl push`.

The policy can then be referenced from the Kubewarden Policy Server or
`kwctl` as
`registry://<oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1`.
