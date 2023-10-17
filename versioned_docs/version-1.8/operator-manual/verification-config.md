---
sidebar_label: "Verification Config"
title: ""
---

# Verification Config

## Example

Here you can see an example of a configuration for verifying
signatures using the Sigstore workflow:

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

## Format

The config has 2 root keys:
- `allOf`: All verification info listed here must be satisfied for accepting a
  container image as signed.
- `anyOf`: At least `anyOf.minimumMatches` of all info listed here must be
  satisfied for accepting a container image as signed.
  
These two root keys accept an array of keys of type `kind`. 
A full list of accepted keys based on different use cases is given below.
- `pubKey`: for signatures performed with traditional public/private key
  cryptography.
- `githubAction`: for signatures performed with Sigstore's keyless workflow
  inside GitHub Actions. Kubewarden checks this information against the x509
  certificate extension `workflow_repository` created by the OpenID Connect of
  Github, and not only the `issuer` and `subject`. Hence, it is strongly
  recommended to use this `kind` if dealing with GitHub Actions.
- `genericIssuer`: for signatures performed with Sigstore's keyless worfklow,
  where the user needs to validate the certificate `issuer` and `subject` on
  their own.
  It accepts a `subject`, which can be:
  - `equal`: the value passed here must match exactly against the `subject` in
    the signing certificate.
  - `urlPrefix`: the value passed here is post-fixed with `/` to prevent
    typo-squatting, and must be a prefix of the `subject` in the signing
    certificate.

the `kind` key optionally accepts an `annotations` key, with a list of
key-values, that must be present in the signature.
