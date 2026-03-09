---
sidebar_label: OCI registry support
sidebar_position: 70
title: OCI registry support for Kubewarden
description: OCI registry support for Kubewarden.
keywords: [kubewarden, kubernetes, oci registry support]
doc-persona: [kubewarden-all]
doc-type: [reference]
doc-topic: [distributing-policies, oci-registries-support]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/oci-registries-support"/>
</head>

You distribute your Kubewarden policies as
[OCI Artifacts](https://opencontainers.org/)
using regular Open Container Initiative (OCI) registries.

Kubewarden policy storage is alongside container images.
They don't require extra setup or maintenance
other than that needed for regular container images.

:::note

You can add a registry that works with Kubewarden or
correct any registry inaccuracies by using the
"Edit this page" button at the bottom of the page.

:::

## Projects implementing OCI registries

- [Harbor](https://goharbor.io/).
- [Distribution](https://github.com/distribution/distribution) ([>= 2.7.0](https://github.com/distribution/distribution/releases/tag/v2.7.0)).
- [Quay](https://access.redhat.com/products/red-hat-quay/): Supported, but [inactive by default in v3.6](https://access.redhat.com/documentation/en-us/red_hat_quay/3/html/use_red_hat_quay/oci-intro#other-oci-artifacts-with-quay).

## Hosted OCI registries

- [GitHub Container Registry](https://github.com/container-registry/). See [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).
- [Quay.io](https://quay.io). See the projects list
- [Amazon ECR](https://aws.amazon.com/ecr/): See [here](https://aws.amazon.com/blogs/containers/oci-artifact-support-in-amazon-ecr/).
- [Google Artifact Registry](https://cloud.google.com/artifact-registry). See [here](https://cloud.google.com/anthos-config-management/docs/how-to/sync-oci-artifacts-from-artifact-registry).
- [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry/). See [here](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-oci-artifacts).
- [Docker Hub](https://hub.docker.com/). See [here](https://docs.docker.com/docker-hub/oci-artifacts/).
- [IBM Cloud Container Registry](https://cloud.ibm.com/docs/Registry). See [here](https://cloud.ibm.com/docs/Registry?topic=Registry-registry_helm_charts).
- [JFrog Artifactory](https://jfrog.com/artifactory/). See [here](https://jfrog.com/help/r/jfrog-artifactory-documentation/docker-registry).

## Tools that work with OCI registries

The Kubewarden project recommends:

- [`kwctl`](https://github.com/kubewarden/kwctl) (our CLI tool).
- [Skopeo](https://github.com/containers/skopeo) ([>= 1.9.0](https://github.com/containers/skopeo/pull/1705)).
- [Crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/README.md).

## Known issues

### Docker Hub

Currently, Docker Hub doesn't support OCI artifacts so can't be used to store Kubewarden policies.
Docker Inc. has announced that Docker Hub will support OCI artifacts in the
[future](https://www.docker.com/blog/announcing-docker-hub-oci-artifacts-support/).

### JFrog

Although JFrog supports OCI artifacts,
it's only partially possible to push to it, when following their specification.
[Read more here](https://github.com/kubewarden/kwctl/issues/59).
