---
sidebar_label: Signature verifier policies
title: Signature verifier policies
description: Signature verifier policies.
keywords: [kubewarden, kubernetes, policy specification, signature verifier]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic:
  [
    writing-policies,
    specification,
    host-capabilities,
    signature-verifier-policies,
  ]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/host-capabilities/signature-verifier-policies"/>
</head>

Kubewarden implements support for the [Sigstore](https://www.sigstore.dev/)
project. This facilitates implementing a "Secure Supply Chain" for your
cluster.

Part of the function of the secure supply chain is to check signing and
verification of all container images running in the cluster. This proves that
they come from their stated authors, without tampering. For further reading,
check the documentation on [how Kubewarden implements a Secure Supply Chain for
the policies](../../../howtos/security-hardening/secure-supply-chain.md).

Sigstore signature storage is within container registries, next to the signed
Open Container Initiative (OCI) object. They can be a container image or a more
generic OCI artifact, like a Kubewarden policy. Object signatures storage is as
layers of an OCI object created by Sigstore. Policies needing to check
signatures of containers need to check those layers, and need to pull the
signature layers to see the signatures themselves.

Obtaining and operating those OCI layers needs to happen outside the
WebAssembly guest (the policy). So, the WebAssembly runtime, Kubewarden's
`policy-server` or `kwctl` does this.

The different language SDKs for Kubewarden policies take care of this. They
provide functions for verification of container image, Kubewarden policies,
Helm charts and other kinds of OCI artifact. This ensures a safe and tested
code path for verification.

Pulling data from a registry and cryptographically verifying signatures can be
computationally expensive and time consuming. So, the WebAssembly runtime
(PolicyServer, `kwctl`) caches both signature pulls and verification
computations. To prevent serving of stale data the cached entries are
automatically expired after 60 seconds.

### Caching

Caching of signature verification results is for one minute.

The SDKs provide functions similar to the following:

- ```rust
  verify_pub_keys_image(
      image_url: string,
      vector_of_pub_keys: vector<string>,
      vector_of_sigstore_annotations: Vector<(key, value: string)>
      )
      returns (is_trusted: bool, digest_of_verified_image: string)
  ```

- ```rust
  verify_keyless_exact_match(
      image_url: string,
      vector_of_tuples_issuer_and_subject: vector<(issuer, subject: string)>,
      vector_of_sigstore_annotations: vector<(key, value: string)>
      )
      returns (is_trusted: bool, digest_of_verified_image: string)
  ```

Both functions verify the image signature satisfies the constraints.

:::note

On success, the functions return the digest of the verified image. It's now the
policy responsibility to check that container instantiation is from that
digest, and not from a tag that may not match that checksum digest (and is
therefore compromised).

:::

## An example

The Kubewarden team [provides a verifier
policy](https://github.com/kubewarden/verify-image-signatures) that enforces
Sigstore signatures for all containers. It's built using Rust and with the Rust
SDK. The policy checks signatures of containers, and optionally, mutates the
requests. The mutation appends the verified checksum to the tag of the image.
Check the documentation for specifics.

This policy may cover all your needs. In case you would prefer a different UX,
you can build on top of it or any of the other SDKs.

## WaPC protocol contract

In case you are implementing your own language SDK, these are the functions a
policy, that verifies signatures, can use:

### waPC function - `v2/verify`

#### `SigstorePubKeyVerify` input

```hcl
{
  type: "SigstorePubKeyVerify",

  # **mandatory**: image URI to verify
  "image": string,
  "pub_keys": [
    # PEM-encoded public keys
    string
    ],
  # optional:
  "annotations": [
      # signature annotations
      {
        "key": string,
        "value": string
      },
    ]
}
```

#### `SigstorePubKeyVerify` output

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

#### `SigstoreKeylessVerify` input

```hcl
{
  type: "SigstoreKeylessVerify",

  # mandatory: image URI to verify
  "image": string,
  "keyless": [
    # list of (issuer, subject) tuples
    {
      # OIDC issuer
      "issuer": string,
      # signature subject (mail, CI URL, ...)
      "subject": string
    }
  ],
  # optional:
  "annotations": [
    # signature annotations
    {
      "key": string,
      "value": string
    },
  ]
}
```

#### `SigstoreKeylessVerify` output

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

#### `SigstoreKeylessPrefixVerify` input

```hcl
{
  type: "SigstoreKeylessPrefixVerify",

  # mandatory: image URI to verify
  "image": string,
  "keyless_prefix": [
    # list of (issuer, url_prefix) tuples
    {
      # OIDC issuer
      "issuer": string,
      # URL Prefix of subject (CI URL, ...)
      "url_prefix": string
    }
  ],
  # optional:
  "annotations": [
    # signature annotations
    {
      "key": string,
      "value": string
    },
  ]
}
```

#### `SigstoreKeylessPrefixVerify` output

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

#### `SigstoreGithubActionsVerify` input

```hcl
{
  type: "SigstoreGithubActionsVerify",

  # mandatory: image URI to verify
  "image": string,
  # GitHub owner
  "owner": string,
  # optional:
  # GitHub repository
  "repo": string
  "annotations": [
    # signature annotations
    {
      "key": string,
      "value": string
    },
  ]
}
```

#### `SigstoreGithubActionsVerify` output

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

#### `SigstoreCertificateVerify` input

```hcl
{
  type: "SigstoreCertificateVerify",

  # mandatory: image URI to verify
  "image": string,
  # PEM-encoded certificated used to
  # verify the signature.
  # The certificate is UTF-8 encoded.
  # It's an array of bytes of the unicode code pointers of a PEM encoded
  # certificate string.
  "certificate": [byte(int), ..., byte(int)],
  # Optional - certificate chain used to
  # verify the provided certificate.
  # When not specified, the certificate
  # is assumed to be trusted.
  # The certificate is UTF-8 encoded.
  # It's an array of bytes of the unicode code pointers of a PEM encoded
  # certificate string.
  "certificate_chain": [
    [byte(int), ..., byte(int)],
    ...
    [byte(int), ..., byte(int)]
  ],
  # Require the signature layer to have
  # a Rekor bundle.
  # Having a Rekor bundle allows further
  # checks to be performed, e.g. ensuring
  # the signature has been produced during
  # the validity time frame of the cert.
  # Recommended to set to `true`
  require_rekor_bundle: bool,
  # Optional:
  "annotations": [
    # signature annotations
    {
      "key": string,
      "value": string
    },
  ]
}
```

#### `SigstoreCertificateVerify` output

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

### waPC function - `v1/verify`

#### `SigstorePubKeyVerify` input

```hcl
{
  "SigstorePubKeyVerify": {
    # **mandatory**: image URI to verify
    "image": string,
    "pub_keys": [
      # PEM-encoded public keys
      string
    ],
    # optional:
    "annotations": [
      # signature annotations
      {
        "key": string,
        "value": string
      },
    ]
  }
}
```

#### `SigstorePubKeyVerify` output

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

#### `SigstoreKeylessVerify` input

```hcl
{
  "SigstoreKeylessVerify": {
    # mandatory: image URI to verify
    "image": string,
    "keyless": [
      # list of (issuer, subject) tuples
      {
        # OIDC issuer
        "issuer": string,
        # signature subject (mail, CI URL, ...)
        "subject": string
      }
    ],
    # optional:
    "annotations": [
      # signature annotations
      {
        "key": string,
        "value": string
      },
    ]
  }
}
```

#### `SigstoreKeylessVerify` output

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```
