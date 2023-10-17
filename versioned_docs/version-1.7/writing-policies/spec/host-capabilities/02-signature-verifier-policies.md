---
sidebar_label: "Signature Verifier Policies"
title: ""
---

# Signature verifier policies

Kubewarden implements support for the [Sigstore](https://www.sigstore.dev/)
project. This allows to implement a Secure Supply Chain for your cluster.

Part of that is to ensure that all container images running in the cluster are
signed and verified, proving that they come from their stated authors, and
haven't been tampered with. For further reading, do check out the docs on
[how we implement a Secure Supply Chain for the policies themselves](../../../distributing-policies/secure-supply-chain.md)).

Sigstore signatures are stored inside of container registries, next to the OCI
object being signed; be it a container image or a more generic OCI artifact,
like a Kubewarden policy. Given an object to be signed, all its signatures are
going to be stored as layers of a special OCI object created by sigstore.
Policies that want to check Sigstore signatures of containers need then to check
those layers, and would need to pull the signature layers to see the
signatures themselves.

Obtaining and operating with those OCI layers needs to happen outside of the
WebAssembly guest (the policy). Hence this is done by the WebAssembly runtime:
Kubewarden's `policy-server` or `kwctl`.

The different language SDKs for Kubewarden policies take care of all that, and
provide functions for verification of container image, Kubewarden policies, Helm
charts and generally speaking any kind of OCI artifact. This ensures a safe and
tested codepath for verification. In addition, pulling data from a registry and
cryptographically verifying signatures can be time and computationally
expensive, so the WebAssembly runtime (PolicyServer, `kwctl`) ensures both
signature pulls and verification computations are cached. The cached entries
are automatically expired after 60 seconds to prevent stale data from being
served.

The SDKs provide functions similar to the following:
- ```
  verify_pub_keys_image(
      image_url: string,
      vector_of_pub_keys: vector<string>,
      vector_of_sigstore_annotations: Vector<(key, value: string)>
      )
      returns (is_trusted: bool, digest_of_verified_image: string)
  ```
- ```
  verify_keyless_exact_match(
      image_url: string,
      vector_of_tuples_issuer_and_subject: vector<(issuer, subject: string)>,
      vector_of_sigstore_annotations: vector<(key, value: string)>
      )
      returns (is_trusted: bool, digest_of_verified_image: string)
  ```

Both functions verify that the image is signed and satisfy the passed
constraints.

Note well: on success, the functions return the digest of the verified image. It
is now on the policy to ensure that containers are instantiated from that
digest, and not from tag that may or may not match that checksum digest (and
therefore be compromised).


## A concrete example

The Kubewarden team [provides a verifier policy](https://github.com/kubewarden/verify-image-signatures)
that enforces Sigstore signatures for all containers, built on Rust and with the
Rust SDK. The policy ensures that the containers are signed, and optionally,
mutates the requests appending the exact verified checksum to the tag of the
image. Check its docs for specifics.

This policy may cover all your needs, but in case you would prefer a different
UX, of course you can build on top of it or any of the other SDKs.


# WaPC protocol contract

In case you are implementing your own language SDK, these are the functions a
policy that verifies signatures can use:

<table>
<tr>
<th> waPC function name </th> <th> Input payload </th> <th> Output payload </th>
</tr>
<tr>
<td>

`v2/verify`

</td>
<td>

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

</td>
<td> 

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

</td>
</tr>
<tr>
<td>

`v2/verify`

</td>
<td>

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

</td>
<td> 

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

</td>
</tr>
<tr>
<td>

`v2/verify`

</td>
<td>

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

</td>
<td> 

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

</td>
</tr>

<tr>
<td>

`v2/verify`

</td>
<td>

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

</td>
<td> 

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

</td>
</tr>

<tr>
<td>

`v2/verify`

</td>
<td>

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

</td>
<td> 

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

</td>
</tr>

</table>


Marked for deprecation:

<table>
<tr>
<td> WaPC function name </td> <td> Input payload </td> <td> Output payload </td>
</tr>
<tr>
<td>

`v1/verify`

</td>
<td>

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

</td>
<td> 

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

</td>
</tr>
<tr>
<td>

`v1/verify`

</td>
<td>

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

</td>
<td> 

```hcl
{
   # true if image verified
   "is_trusted": boolean,
   # digest of verified image
   "digest": string
}
```

</td>
</tr>

</table>
