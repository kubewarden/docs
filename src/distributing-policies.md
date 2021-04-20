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

The [`wasm-to-oci`](https://github.com/engineerd/wasm-to-oci) command line tool
can be used to push a Kubewarden Policy to an OCI compliant registry.

Pushing a policy can be done in this way:

```bash
$ wasm-to-oci push pod-runtime-class-policy.wasm \
              <oci-registry>/kubewarden-policies/pod-runtime-class-policy:v0.0.2
```

The policy can then be referenced from the Kubewarden Policy Server as
`registry://<oci-registry>/kubewarden-policies/pod-runtime-class-policy:v0.0.2`.
