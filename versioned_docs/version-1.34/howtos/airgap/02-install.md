---
sidebar_label: Installation
title: Air gap installation
description: Air gap installation for Kubewarden.
keywords: [kubewarden, kubernetes, air gap installation]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, air gap, installation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/airgap/install"/>
</head>

For an air-gapped installation of Kubewarden, you need a private Open Container
Initiative (OCI) registry accessible by your Kubernetes cluster. Kubewarden
Policies are WebAssembly modules; therefore, you can store them in an
OCI-compliant registry as OCI artifacts. You need to add Kubewarden's images
and policies to this OCI registry. You can see a list of Kubewarden artifacts
in the [Artifacts reference](../../reference/artifacts.md) page. The following
sections describe the process.

:::note

We recommend using [Hauler](https://docs.hauler.dev/docs/intro). See our [docs
page](./hauler) for that effect.

Alternatively, you can use the manual process listed below.

:::

## Save Helm charts locally

You need to download the following helm charts to your workstation:

```shell
helm pull kubewarden/kubewarden-crds
helm pull kubewarden/kubewarden-controller
helm pull kubewarden/kubewarden-defaults
helm pull kubewarden/sbomscanner
```

:::note

Optionally, you can verify the signatures of the [helm
charts](../../tutorials/verifying-kubewarden.md#helm-charts) and [container
images](../../tutorials/verifying-kubewarden.md#container-images)

:::

## Save container images locally

1. Each of our Helm charts contains an `imagelist.txt` with the container
   images consumed by it, and, when applicable, a `policylist.txt` with the OCI
   Wasm modules of the policies that it consumes too.

   To obtain them, you can do:

   ```shell
   helm pull --untar \
     kubewarden/kubewarden-crds \
     kubewarden/kubewarden-controller \
     kubewarden/kubewarden-defaults \
     kubewarden/sbomscanner
   ```

   And then concat them into 1 file:

   ```shell
   cat */imagelist.txt > kubewarden-images.txt
   ```

1. Download `kubewarden-save-images.sh` and `kubewarden-load-images.sh` from
   the [utilities repository](https://github.com/kubewarden/utils).
1. Save Kubewarden container images into a `.tar.gz` file:

   ```shell
   ./kubewarden-save-images.sh \
     --image-list ./kubewarden-images.txt \
     --images kubewarden-images.tar.gz
   ```

   Docker begins pulling the images used for an air gap install. This process
   can take a few minutes. When complete, your current directory, where you
   ran the command, has a tarball, `kubewarden-images.tar.gz`.

## Save policies locally

1. Add all the policies you want to use to a `policies.txt` file:

   ```shell
   cat */policylist.txt > policies.txt
   ```

1. Download `kubewarden-save-policies.sh` and `kubewarden-load-policies.sh`
   from the [`kubewarden-controller`
   repository](https://github.com/kubewarden/kubewarden-controller/blob/main/scripts)
1. Save policies into a `.tar.gz` file:

   ```shell
   ./kubewarden-save-policies.sh --policies-list policies.txt
   ```

   Use `kwctl` to download the policies. The `kubewarden-policies.tar.gz`
   archive contains the policies.

## Populate private registry

Move these files to the air gap environment:

- Helm charts in `tgz` format (e.g: `kubewarden-crds-1.23.0.tgz`)
- `kubewarden-policies.tar.gz`,
- `kubewarden-images.tar.gz`,
- `kubewarden-load-images.sh`,
- `kubewarden-load-policies.sh` and
- `policies.txt`

1. Load Kubewarden images into the private registry. You need to authenticate
   the Docker client against the local registry.

   ```shell
   ./kubewarden-load-images.sh \
      --image-list ./kubewarden-images.txt \
      --images kubewarden-images.tar.gz \
      --registry <REGISTRY.YOURDOMAIN.COM:PORT>
   ```

1. Load Kubewarden policies into the private registry. You should authenticate
   `kwctl` against the local registry (`kwctl` uses the same mechanism to
   authenticate as `docker`, a `~/.docker/config.json` file)

   ```shell
   ./kubewarden-load-policies.sh \
      --policies-list policies.txt \
      --policies kubewarden-policies.tar.gz \
      --registry <REGISTRY.YOURDOMAIN.COM:PORT> \
      --sources-path sources.yml
   ```

:::caution

The `kwctl` command needs the `sources.yaml` file to connect to registries in
these categories:

- Authentication is required.
- Self-signed certificate is being used.
- No TLS termination is done.

Refer to the [section on custom certificate
authorities](../custom-certificate-authorities.md) in the documentation to
learn how to configure the `sources.yaml` file.

:::

After loading the images and policies into your private registry, continue with
[installing and configuring Kubewarden from the private
registry](./install-configure).
