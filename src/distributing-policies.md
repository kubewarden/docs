# Distributing Policies

Chimera policies are simple Wasm binaries that are then evaluated by the Chimera
admission controller.

The Chimera admission controller can currently load the policies from these
sources:

  * Local filesystem
  * Remote web server
  * OCI compliant registry

We think distributing Chimera policies via a regular OCI compliant registry is the
best choice. Container registries are basically a mandatory requirement for
Kubernetes cluster. Having a single place to store, and secure, all the
artifacts required by a cluster can be really handy.

# Pushing policies to an OCI compliant registry

The [OCI Artifacts](https://github.com/opencontainers/artifacts)
specification allows to store any kind of binary blob inside of a
regular OCI compliant container registry.

The target OCI compliant registry **must support artifacts** in order
to successfully push a Chimera Policy to it.

The [`wasm-to-oci`](https://github.com/engineerd/wasm-to-oci) command line tool
can be used to push a Chimera Policy to an OCI compliant registry.

Pushing a policy can be done in this way:

```bash
$ wasm-to-oci push pod-runtime-class-policy.wasm \
              <oci-registry>/chimera-policies/pod-runtime-class-policy:v0.0.1
```

The policy can then be referenced from the Chimera admission controller as
`registry://<oci-registry>/chimera-policies/pod-runtime-class-policy:v0.0.1`.
