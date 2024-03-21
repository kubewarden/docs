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

This function computes the digest of an OCI manifest.
The digest can be used to identify an object stored in an OCI registry.
This is an immutable way, as opposed to `tags` which are mutable.

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

#### waPC function name `v1/manifest_digest` input

```hcl
# OCI URI - JSON encoded string
string
```

#### waPC finction name `v1/manifest_digest` output

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

This function fetches the OCI objects manifest.
When available, this information can be used to identify specific images manifests,
for one or more platforms.
Or a single image manifest for the image.

### Caching

Computing the digest involves a series of network requests between the
Kubewarden policy host and the remote registry.
These operations can be time expensive so the results are cached for 1 minute.

### Authentication

Interactions with private registries require the Kubewarden policy host to
authenticate against the remote registry.

The policy host uses the same set of credentials as that used to fetch policies
from the remote registry.

### Communication protocol

This is the description of the waPC protocol used to expose this capability:

#### waPC function name `v1/oci_manifest` input

```hcl
# OCI URI - JSON encoded string
string
```

#### waPC function name `v1/oci_manifest` output

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

For example, when requesting the manifest digest of the
`ghcr.io/kubewarden/policy-server:v1.10.0` image,
the payload would be:

- Input payload: `"ghcr.io/kubewarden/policy-server:v1.10.0"`
- Output payload: the body of the successful response obtained from the
  registry.
  It can be an [OCI index image](https://github.com/opencontainers/image-spec/blob/main/image-index.md)
  or an [OCI image manifest](https://github.com/opencontainers/image-spec/blob/main/manifest.md).
  The details may change depending on the registry and image.
