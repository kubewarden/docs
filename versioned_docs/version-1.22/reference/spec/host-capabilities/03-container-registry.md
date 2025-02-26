---
sidebar_label: Container registry capabilities
title: Container registry capabilities
description: Container registry capabilities.
keywords: [kubewarden, kubernetes, policy specification, registry capabilities]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic:
  [writing-policies, specification, host-capabilities, container-registry]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/host-capabilities/container-registry"/>
</head>

Container registries can be used to distribute many types of OCI objects.
From well-known container images to generic OCI Artifacts.
OCI Artifacts are used to store objects such as Kubewarden policies,
Helm charts, and more.

These are the capabilities exposed by the Kubewarden host,
to interact with container registries.

## Get OCI manifest digest

This callback computes the digest of an OCI manifest. The digest can be used to
identify an object stored in an OCI registry. This is an immutable way, as
opposed to `tags` which are mutable.

### Caching

Computing the digest involves a series of network requests between the Kubewarden policy host and the remote registry.
These operations can be time expensive,
so the results are cached for 1 minute.

### Authentication

Interactions with private registries require the Kubewarden policy host to authenticate against the remote registry.

The policy host will use the same set of credentials used to fetch policies
from the remote registry.

### Communication protocol

This is the description of the waPC protocol used to expose this capability:

#### waPC function - `v1/manifest_digest` input

```hcl
# OCI URI - JSON encoded string
string
```

#### waPC function - `v1/manifest_digest` output

```hcl
{
  # digest of the OCI object
  "digest": string
}
```

For example, when requesting the manifest digest of the `busybox:latest` image,
the payload would be:

- Input payload: `"busybox:latest"`
- Output payload: `{ "digest": "sha256:69e70a79f2d41ab5d637de98c1e0b055206ba40a8145e7bddb55ccc04e13cf8f"}`

## OCI manifest

This callback fetches the OCI objects manifest. When available, this
information can be used to identify specific images manifests, for one or more
platforms. Or a single image manifest for the image.

### Caching

Fetching this information involves network requests between the Kubewarden
policy host and the remote registry. These operations can be time expensive so
the results are cached for 1 minute.

### Authentication

Interactions with private registries require the Kubewarden policy host to
authenticate against the remote registry.

The policy host uses the same set of credentials as that used to fetch policies
from the remote registry.

### Communication protocol

This is the description of the waPC protocol used to expose this capability:

#### waPC function - `v1/oci_manifest` input

```hcl
# OCI URI - JSON encoded string
string
```

#### waPC function - `v1/oci_manifest` output

```hcl
{
    "schemaVersion": 2,
        "mediaType": "application/vnd.oci.image.index.v1+json",
        "manifests": [
        {
            "mediaType": "application/vnd.oci.image.manifest.v1+json",
            "digest": "sha256:7d5e84b9314ba7058bfa209881919146ffc4a89c5ba14cfa8270a18c8d418c44",
            "size": 1048,
            "platform": {
                "architecture": "amd64",
                "os": "linux"
            }
        },
        {
            "mediaType": "application/vnd.oci.image.manifest.v1+json",
            "digest": "sha256:ae1e98105555f3983496c15c70dafc87639b77830953d6470694b47e0e063e25",
            "size": 1048,
            "platform": {
                "architecture": "arm64",
                "os": "linux"
            }
        },
        {
            "mediaType": "application/vnd.oci.image.manifest.v1+json",
            "digest": "sha256:e9fc0f86e26366abf29fd29e8c09d00df717f9038fd4298eaa39a0a2b4361fa4",
            "size": 566,
            "annotations": {
                "vnd.docker.reference.digest": "sha256:7d5e84b9314ba7058bfa209881919146ffc4a89c5ba14cfa8270a18c8d418c44",
                "vnd.docker.reference.type": "attestation-manifest"
            },
            "platform": {
                "architecture": "unknown",
                "os": "unknown"
            }
        },
        {
            "mediaType": "application/vnd.oci.image.manifest.v1+json",
            "digest": "sha256:e8904ebb2841dc19ae458436eb01ddea3e8d6ea653c7d9476537f4029b1f45a2",
            "size": 566,
            "annotations": {
                "vnd.docker.reference.digest": "sha256:ae1e98105555f3983496c15c70dafc87639b77830953d6470694b47e0e063e25",
                "vnd.docker.reference.type": "attestation-manifest"
            },
            "platform": {
                "architecture": "unknown",
                "os": "unknown"
            }
        }
    ]
}

OR

{
    "schemaVersion": 2,
        "mediaType": "application/vnd.oci.image.manifest.v1+json",
        "config": {
            "mediaType": "application/vnd.oci.image.config.v1+json",
            "digest": "sha256:61dc3269b9e8faeea32128560cdbd355e8c1dff31e32abc0223be039c5cc5e2d",
            "size": 1775
        },
        "layers": [
        {
            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",
            "digest": "sha256:67d998e418791ec2955ec99753eb55f03ca96538976e5ccebfec08eae20056b5",
            "size": 57033795
        },
        {
            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",
            "digest": "sha256:be6185edcab66334dd5c7c2273fd6254100ece960e087541f3dba0616c440038",
            "size": 188411978
        },
        {
            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",
            "digest": "sha256:58a13f6770904193ca67beb50d424e69a39579e1581dbf8e02e1751f3b75f932",
            "size": 70078992
        }
        ],
        "annotations": {
            "org.opencontainers.image.base.digest": "sha256:67a7c41ccd5dfcb08face86546f0d25c0740f0d0225e39fecb8bbae8b95b847a",
            "org.opencontainers.image.base.name": "docker.io/library/debian:latest"
        }
}

```

For example, when requesting the manifest of the
`ghcr.io/kubewarden/policy-server:v1.10.0` image,
the payload would be:

- Input payload: `"ghcr.io/kubewarden/policy-server:v1.10.0"`
- Output payload: the body of the successful response obtained from the
  registry.
  It can be an [OCI index image](https://github.com/opencontainers/image-spec/blob/main/image-index.md)
  or an [OCI image manifest](https://github.com/opencontainers/image-spec/blob/main/manifest.md).
  The details may change depending on the registry and image.

## OCI manifest and config

This callback fetches the OCI images manifest and its configuration. This
information can be used to get the container image manifest and the
configuration information used by the container runtime to run it.

### Caching

Fetching this information involves network requests between the Kubewarden
policy host and the remote registry. These operations can be time expensive so
the results are cached for 1 minute.

### Authentication

Interactions with private registries require the Kubewarden policy host to
authenticate against the remote registry.

The policy host uses the same set of credentials as that used to fetch policies
from the remote registry.

### Communication protocol

This is the description of the waPC protocol used to expose this capability:

#### waPC function - `v1/oci_manifest_config` input

```hcl
# OCI URI - JSON encoded string
string
```

#### waPC function - `v1/oci_manifest_config` output

```hcl
{
  "manifest": {
    "schemaVersion": 2,
    "mediaType": "application/vnd.oci.image.manifest.v1+json",
    "config": {
      "mediaType": "application/vnd.oci.image.config.v1+json",
      "digest": "sha256:bc3511804cb29da6333f0187a333eba13a43a3a0a1737e9b50227a5cf057af74",
      "size": 1592
    },
    "layers": [
      {
        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",
        "digest": "sha256:294efa324e89a020b06df261f77903fb9f46fdee79c54e4f6589f786f6c31bec",
        "size": 428
      },
      {
        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",
        "digest": "sha256:f0936413f7d0757b41777a624e5be83da28789d0c4b8b3f46853ca9c3bb6300f",
        "size": 422
      },
      {
        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",
        "digest": "sha256:cd2adfe5e808335e0c30eff616a9852a94cfbf8ecd455d1b893e1c858ddc3aeb",
        "size": 22357278
      },
      {
        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",
        "digest": "sha256:6c7ec51ccec3d4438c94e697258085ddf825c1e711df4d923b1794794196cf06",
        "size": 37415
      }
    ]
  },
  "digest": "sha256:6ebc3e17a9804a8d385fee819554ad95a05072d022c5bd2dd27556a5752d47f5",
  "config": {
    "created": "2024-06-05T13:48:01.671482413Z",
    "architecture": "amd64",
    "os": "linux",
    "config": {
      "User": "65533:65533",
      "ExposedPorts": {
        "3000/tcp": {}
      },
      "Env": [
        "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
      ],
      "Entrypoint": [
        "/policy-server"
      ],
      "WorkingDir": "/"
    },
    "rootfs": {
      "type": "layers",
      "diff_ids": [
        "sha256:79f61adc25589b7b467a6becca5756f3b722ab7f9d0c18c205e89c08fdc8d45d",
        "sha256:2a5e7791442784b3614921dcb51afdbe94ae9bfd3752e22e5eb81ce731f5bfbf",
        "sha256:0d893e5416389fd105bc81d3694a5d5dbffc41237291df0aaa4efbc26632e91c",
        "sha256:018ce7bd6fd46306e129aca44c1c103675dbe29e3aa842a0b7fb01507e8d02d2"
      ]
    },
    "history": [
      {
        "created": "2024-06-05T13:48:00.432722149Z",
        "created_by": "COPY /etc/passwd /etc/passwd # buildkit",
        "comment": "buildkit.dockerfile.v0"
      },
      {
        "created": "2024-06-05T13:48:00.469118621Z",
        "created_by": "COPY /etc/group /etc/group # buildkit",
        "comment": "buildkit.dockerfile.v0"
      },
      {
        "created": "2024-06-05T13:48:01.653480931Z",
        "created_by": "COPY --chmod=0755 policy-server-x86_64 /policy-server # buildkit",
        "comment": "buildkit.dockerfile.v0"
      },
      {
        "created": "2024-06-05T13:48:01.671482413Z",
        "created_by": "ADD Cargo.lock /Cargo.lock # buildkit",
        "comment": "buildkit.dockerfile.v0"
      },
      {
        "created": "2024-06-05T13:48:01.671482413Z",
        "created_by": "USER 65533:65533",
        "comment": "buildkit.dockerfile.v0",
        "empty_layer": true
      },
      {
        "created": "2024-06-05T13:48:01.671482413Z",
        "created_by": "EXPOSE map[3000/tcp:{}]",
        "comment": "buildkit.dockerfile.v0",
        "empty_layer": true
      },
      {
        "created": "2024-06-05T13:48:01.671482413Z",
        "created_by": "ENTRYPOINT [\"/policy-server\"]",
        "comment": "buildkit.dockerfile.v0",
        "empty_layer": true
      }
    ]
  }
}
```

For example, when requesting the image manifest and configuration of the
`ghcr.io/kubewarden/policy-server:v1.13.0` image, the payload would be:

- Input payload: `"ghcr.io/kubewarden/policy-server:v1.13.0"`
- Output payload: the body of the successful response obtained from the
  registry. It will contain the [OCI image
  manifest](https://github.com/opencontainers/image-spec/blob/main/manifest.md)
  , image digest and the [OCI image
  configuration](https://github.com/opencontainers/image-spec/blob/main/config.md).
