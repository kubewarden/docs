# Distributing Policies

Kubewarden policies are Wasm binaries that are evaluated by the
Kubewarden Policy Server.

The Kubewarden policy server can load policies from these
sources:

  * Local filesystem
  * HTTP(s) server
  * OCI compliant registry like [distribution](https://github.com/distribution/distribution)
    and other container registries (GitHub container registry, Azure Container
    Registry, Amazon ECR, Google Container Registry, ...)

We think distributing Kubewarden policies via a regular OCI compliant
registry is the best choice. Container registries are basically a
mandatory requirement for any Kubernetes cluster. Having a single
place to store, and secure, all the artifacts required by a cluster
can be really handy.

# Pushing policies to an OCI compliant registry

The [OCI Artifacts](https://github.com/opencontainers/artifacts)
specification allows to store any kind of binary blob inside of a
regular OCI compliant container registry.

The target OCI compliant registry **must support artifacts** in order
to successfully push a Kubewarden Policy to it.

The [`kwctl`](https://github.com/kubewarden/kwctl) command line tool
can be used to push a Kubewarden Policy to an OCI compliant registry.

## Annotating the policy

Annotating a policy is done by the `kwctl` CLI tool as well. The
process of annotating a Kubewarden policy is done by adding
WebAssembly custom sections to the policy binary. This means that the
policy metadata travels with the policy itself.

The `kwctl annotate` command needs two main inputs:

* The Kubewarden policy to be annotated, in the form of a local file
  in the filesystem.

* The annotations file, a file containing a YAML with the policy
  metadata. This file is located somewhere in your filesystem, usually
  in the root project of your policy.

An example follows; we save this file as `metadata.yml` in the current
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

This process performs some optimizations on the policy, so it's not
uncommon to end up with a smaller annotated policy than the original
one. This depends a lot on the toolchain that was used to produce the
unannotated WebAssembly object.

You can check with `kwctl inspect` that everything looks correct:

```shell
$ kwctl inspect annotated-policy.wasm
# here you will see a colored output of the metadata you provided on the `metadata.yml` file. This information is now read from the WebAssembly custom sections
```

## Pushing the policy

Pushing an annotated policy can be done in this way:

```shell
$ kwctl push annotated-policy.wasm \
              <oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1
```

It is discouraged to push unannotated policies. This is why by default
`kwctl push` will reject to push such a policy to an OCI registry. If
you really want to push an unannotated policy you can use the
`--force` flag of `kwctl push`.

The policy can then be referenced from the Kubewarden Policy Server or
`kwctl` as
`registry://<oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1`.
