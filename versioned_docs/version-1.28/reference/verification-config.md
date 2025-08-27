---
sidebar_label: Verification configuration format
sidebar_position: 100
title: Verification configuration format
description: Verification configuration for Kubewarden.
keywords: [kubewarden, kubernetes, verification configuration]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [reference]
doc-topic: [operator-manual, verification-config]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/verification-config"/>
</head>

## Introduction

You can use the `verification-config` format with:

- `policy-server` to verify policy modules provenance
- `verify-image-signatures` policy to verify cluster images provenance

Refer to [secure supply
chain](../howtos/security-hardening/secure-supply-chain.md) for more
information.

## Format

The configuration has 2 root keys:

- `allOf`: You should satisfy all verification information listed here to
  verify container images as signed.
- `anyOf`: You must satisfy at least `anyOf.minimumMatches` of all listed
  verification information to accept a container image as signed.

These two root keys accept an array of keys of type `kind`. A full list of
accepted keys based on different use cases is below:

- `pubKey`: For signatures performed with traditional public/private key
  cryptography.
- `githubAction`: For signatures performed with Sigstore's keyless workflow
  inside GitHub Actions. Kubewarden checks this information against the x509
  certificate extension `workflow_repository` created by the OpenID Connect of
  GitHub, and not only the `issuer` and `subject`. You should use this `kind`
  if dealing with GitHub Actions.
- `genericIssuer`: For signatures performed with Sigstore's keyless workflow,
  where the user needs to validate the certificate `issuer` and `subject` on
  their own. It accepts a `subject`, which can be:

  - `equal`: The value passed here must match exactly the `subject` in
    the signing certificate.
  - `urlPrefix`: The value passed here is post-fixed with `/` to prevent
    typo-squatting, and must be a prefix of the `subject` in the signing
    certificate.

The `kind` key accepts an optional `annotations` key, with a list of
key-values, that must be present in the signature.

## Example

This is an example of a configuration for verifying signatures using the
Sigstore workflow:

```yaml
---
apiVersion: v1

allOf:
  - kind: githubAction
    owner: kubewarden   # mandatory
    repo: policy-server # optional
    annotations:  # optional
      env: prod

anyOf: # at least `anyOf.minimumMatches` are required to match
  minimumMatches: 2 # default is 1
  signatures:
  - kind: pubKey
    owner: alice # optional
    key: | # mandatory
         -----BEGIN PUBLIC KEY-----
         MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQiTy5S+2JFvVlhUwWPLziM7iTM2j
         byLgh2IjpNQN0Uio/9pZOTP/CsJmXoUNshfpTUHd3OxgHgz/6adtf2nBwQ==
         -----END PUBLIC KEY-----
    annotations:  # optional
      env: prod
  - kind: genericIssuer
    issuer: https://github.com/login/oauth
    subject:
      equal: alice@example.com
  - kind: genericIssuer
    issuer: https://token.actions.githubusercontent.com
    subject:
      equal: https://github.com/bob/app-example/.github/workflows/release.yml@refs/heads/main
    annotations:  # optional
      env: prod
  - kind: genericIssuer
    issuer: https://token.actions.githubusercontent.com
    subject:
      urlPrefix: https://github.com/bob # <- it will be post-fixed with `/` for security reasons
```

## Signature configuration reference

You can validate signature requirements contained in a file. Expand for an
example:

<details>

<summary>
A file of signature requirements
</summary>

```yaml
apiVersion: v1

allOf:
  - kind: githubAction
    owner: kubewarden   # mandatory
    annotations:
      env: prod

anyOf: # at least `anyOf.minimumMatches` are required to match
  minimumMatches: 2 # default is 1
  signatures:
  - kind: pubKey
    owner: flavio # optional
    key: .... # mandatory
    annotations:  # optional
      env: prod
      foo: bar
  - kind: pubKey
    owner: victor # optional
    key: .... # mandatory
  - kind: genericIssuer
    issuer: https://github.com/login/oauth
    subject:
      equal: alice@example.com
  - kind: genericIssuer
    issuer: https://token.actions.githubusercontent.com
    subject:
      equal: https://github.com/flavio/policy-secure-pod-images/.github/workflows/release.yml@refs/heads/main
  - kind: genericIssuer
    issuer: https://token.actions.githubusercontent.com
    subject:
      urlPrefix: https://github.com/flavio/
  - kind: genericIssuer
    issuer: https://token.actions.githubusercontent.com
    subject:
      urlPrefix: https://github.com/kubewarden # <- it will be post-fixed with `/` for security reasons
  - kind: githubAction
    owner: flavio   # mandatory
    repo: policy1 # optional
  - kind: pubKey
    owner: alice # optional
    key: .... # mandatory
```

</details>

### Signature validation

The previous configuration contains the two sections, `allOf` and `anyOf`:

- `allOf`: You trust the policy only if all signature requirements are valid.
- `anyOf`: You trust the policy if the `minimumMatches` criterion are valid.

In the example, the `minimumMatches` field is 2. So, you need to meet at least
two of the signature requirements. The default value for `minimumMatches` field
is `1`.

For signature validation, you need to meet all the signature's requirements
from `allOf` **and** the minimum number from `anyOf`.

### Public key validation

To check a policy has the correct public key signature, you specify the key
data and the owner of the key. In this example, you set `kind` to `pubKey` and
the `key` has the public key. The owner field is optional, but can be useful to
clarify who owns the key.

```  yaml
  - kind: pubKey
    owner: bob # optional
    key: |
      -----BEGIN PUBLIC KEY-----
      MBFKHFDGHKIJH0CAQYIKoZIzj0DAQcDQgAEX0HFTtCfTtPmkx5p1RbDE6HJSGAVD
      BVDF6SKFSF87AASUspkQsN3FO4iyWodCy5j3o0CdIJD/KJHDJFHDFIu6sA==
      -----END PUBLIC KEY-----
```

### Keyless signature validation

A policy signed in keyless mode doesn't have a public key you can verify. You
can still verify the policy with the OpenID Connect (OIDC) data used during the
signing process. For that, it's necessary to define the signature validation as
`genericIssuer`.

It's possible to verify information from the signature:

- `issuer`(mandatory): This matches the `Issuer` attribute in the certificate
  generated by Fulcio. This shows the OIDC used to sign the policy.
- `subject`: The field used to match the `Subject` attribute in Fulcio's
  certificate. The `Subject` (Fulcio) field contains the user used to
  authenticate against the OIDC provider. The verification field, `subject`,
  can have one of two subfields:
  - `equal`: The `Subject` (Fulcio) from the certificate must be equal to the
    value in the signature validation;
  - `urlPrefix`: The certificate's `Subject` (Fulcio) field value must be
    prefixed by the value defined in the signature validation.

:::note

Both the `cosign verify` and the `kwctl inspect` commands can show information
about keyless signatures.

:::

For example, this configuration means the policy must have a keyless signature
from Alice using the GitHub OIDC:

```yaml
- kind: genericIssuer
  issuer: https://github.com/login/oauth
  subject:
    equal: alice@example.com
```

This configuration needs the policy signed in GitHub actions, from a repository
owned by the GitHub user `flavio`:

```yaml
- kind: genericIssuer
  issuer: https://token.actions.githubusercontent.com
  subject:
    urlPrefix: https://github.com/flavio
```

### GitHub actions signature verification

The "kind" `githubAction` is to validate policies signed in GitHub Actions.
You can do this with the `genericIssuer` kind as well. To simplify the
signature requirement process, use two extra fields for `githubAction`:

- `owner` (mandatory): GitHub ID of the user or organization to trust.
- `repo`: The name of the repository to trust.

For example, the last snippet, using `genericIssuer`, could be rewritten as:

```yaml
- kind: githubAction
  owner: flavio
```

### Signature annotations validation

All signature types can have other optional validation fields, `annotations`.
These fields are key/value data added during the signing process.

With Kubewarden, you can verify policy signatures from trusted users
**and** have specific annotations.

The next validation checks two conditions for the policy:

- that it's signed with a specific key
- it has a production environment annotation

```yaml
- kind: pubKey
  key: |
    -----BEGIN PUBLIC KEY-----
    MBFKHFDGHKIJH0CAQYIKoZIzj0DAQcDQgAEX0HFTtCfTtPmkx5p1RbDE6HJSGAVD
    BVDF6SKFSF87AASUspkQsN3FO4iyWodCy5j3o0CdIJD/KJHDJFHDFIu6sA==
    -----END PUBLIC KEY-----
  annotations:
    environment: production
```

### Using a signature verification configuration file to check a policy OCI artifact

You can test if a policy passes verification using the verification
configuration file. Use the `--verification-config-path` flag of the `kwctl
verify` command.

```console
$ cat signatures_requirements.yaml
apiVersion: v1
allOf:
  - kind: pubKey
    key: |
      -----BEGIN PUBLIC KEY-----
      MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5Q+cN1Jj2S7N05J4AXnqwP2DyzSg
      Mc+raYce2Wthrd30MSgFtoh5ADAkCd/nML2Nx8UD9KBuASRb0gG5jXqgMQ==
      -----END PUBLIC KEY-----

$ kwctl verify --verification-config-path signatures_requirements.yaml ghcr.io/kubewarden/policies/user-group-psp:latest
2022-03-29T17:34:37.847169Z  INFO kwctl::verify: Policy successfully verified
```

This last example tests if a given policy came from the Kubewarden
organization:

```console
$ cat kubewarden_signatures.yaml
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden

$ kwctl verify --verification-config-path kubewarden_signatures.yaml ghcr.io/kubewarden/policies/user-group-psp:latest
2022-03-29T18:07:39.062292Z  INFO kwctl::verify: Policy successfully verified
```
