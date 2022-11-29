---
sidebar_label: "OCI Registries Support"
title: ""
---

# OCI Registries support

:::note
This is not an exhaustive list. If a registry you know or use is working correctly
with Kubewarden, or if any information described here is not accurate at this time, please open a
[Pull Request against this documentation](https://github.com/kubewarden/docs/edit/main/docs/distributing-policies/oci-registries-support.md) to fix it.
:::

Kubewarden policies are distributed as [OCI Artifacts](https://github.com/opencontainers/artifacts)
using regular OCI Registries.

Policies are stored side by side with container images. They don't require any extra setup or
maintenance than regular container images do.

## Projects that implement OCI registries

- [Harbor](https://goharbor.io/).
- [Distribution](https://github.com/distribution/distribution) ([>= 2.7.0](https://github.com/distribution/distribution/releases/tag/v2.7.0)).
- [Quay](https://access.redhat.com/products/red-hat-quay/): Supported, but [disabled by default in v3.6](https://access.redhat.com/documentation/en-us/red_hat_quay/3/html/use_red_hat_quay/oci-intro#other-oci-artifacts-with-quay).

## Hosted OCI registries

- [GitHub Container Registry](https://github.com/container-registry/).See [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).
- [Quay.io](https://quay.io). See projects list above.
- [Amazon ECR](https://aws.amazon.com/ecr/): See [here](https://aws.amazon.com/blogs/containers/oci-artifact-support-in-amazon-ecr/).
- [Google Artifact Registry](https://cloud.google.com/artifact-registry). See [here](https://cloud.google.com/anthos-config-management/docs/how-to/sync-oci-artifacts-from-artifact-registry).
- [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry/). See [here](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-oci-artifacts).
- [Bundle Bar](https://bundle.bar). See [here](https://bundle.bar/docs/#open-container-initiative-oci).

## Tools that work with OCI registries

We recommend:
- [Kwctl](https://github.com/kubewarden/kwctl) (our cli tool).
- [Skopeo](https://github.com/containers/skopeo) ([>= 1.9.0](https://github.com/containers/skopeo/pull/1705)).
- [Crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/README.md).

## Known issues

### Docker Hub

Currently, Docker Hub does not support OCI artifacts at this time, and as such,
it cannot be used to store Kubewarden policies.
Docker Inc. has publicly announced that Docker Hub will [support OCI artifacts
in the near
future](https://www.docker.com/blog/announcing-docker-hub-oci-artifacts-support/).

### JFrog

Although JFrog supports OCI artifacts, it is only partially possible to push to it when following
the specification. [Read more here](https://github.com/kubewarden/kwctl/issues/59)
