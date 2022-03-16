# OCI Registries support

> **Note well**: this is not an exhaustive list. If a registry you know or use is working correctly
> with Kubewarden, or if any information described here is not accurate at this time, please open a
> [Pull Request against this documentation](https://github.com/kubewarden/docs) to fix it.

Kubewarden policies are distributed as [OCI Artifacts](https://github.com/opencontainers/artifacts)
using regular OCI Registries.

Policies are stored side by side with container images. They don't require any extra setup or
maintenance than regular container images do.

## Projects

- [Distribution](https://github.com/distribution/distribution)

## Hosted registries

- [GitHub container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

## Known issues

### Docker Hub

The Docker Hub does not support OCI artifacts at this time, and as such, it cannot be used to store
Kubewarden policies.

### JFrog

Although JFrog supports OCI artifacts, it is only partially possible to push to it when following
the specification. [Read more here](https://github.com/kubewarden/kwctl/issues/59)