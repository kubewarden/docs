---
sidebar_label: "Verifying Kubewarden"
title: ""
---

# Verifying Kubewarden

Kubewarden artifacts are signed using [Sigstore](https://docs.sigstore.dev),
with the keyless workflow. This means that the signing certificate contains the
following info, where `*` matches any following characters:
- issuer: `https://token.actions.githubusercontent.com`
- subject: `https://github.com/kubewarden/*`
- x509 certificate extension for GHA, "github_workflow_repository": `kubewarden/*`

## Helm charts

You can find our Helm charts in our `https://` traditional Helm repository under
https://charts.kubewarden.io.

The same Helm charts are signed via Sigstore's keyless signing, and pushed to an
OCI repository that can hold both the Helm chart and its signature as OCI
artifacts.

Since Helm 3.8.0, Helm has support for OCI registries, but because of
constraints in them, they can't be searched via `helm`. You can find the
[list of charts in GitHub Container Registry](https://github.com/orgs/kubewarden/packages?tab=packages&q=charts).

To verify a Helm chart, you need `cosign` installed. Then execute the following
command, for example:

```
cosign verify ghrc.io/kubewarden/charts/kubewarden-defaults:1.5.4 \
  --certificate-identity-regexp 'https://github.com/kubewarden/*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com

Verification for ghcr.io/kubewarden/charts/kubewarden-defaults:1.5.4 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The code-signing certificate was verified using trusted certificate authority certificates

<snipped json>
```

You can then verify that the cert in the returned json contains the correct
issuer, subject, and `github_workflow_repository` extensions.

### Container images & policies referenced in the charts

#### Obtaining the lists

Both the production images used in our Helm charts and our development images
(tagged `:latest`) are signed with Sigstore's keyless signing.

Kubewarden charts ship `imagelist.txt` and (`policylist.txt` when relevant) inside
of the chart. Hence, if you already verified the chart, you can use those lists
to verify the consumed container images and policies.

Kubewarden also follows the usual practices with regards to Helm charts. Hence, one
can also find all the images in the Helm charts with a plugin such as
[helm-image](https://github.com/cvila84/helm-image), or with the following script:

```bash
#!/usr/bin/env bash
helm pull --untar kubewarden/kubewarden-controller && \
helm pull --untar kubewarden/kubewarden-defaults && \
{ helm template ./kubewarden-controller; helm template ./kubewarden-defaults } \
    | yq '..|.image? | select(.)' \
    | sort -u | sed 's/"//g'
```

which gives us:
```
ghcr.io/kubewarden/kubewarden-controller:v0.5.5
ghcr.io/kubewarden/policy-server:v0.3.1
ghcr.io/kubewarden/kubectl:v1.21.4
```

### Verifying the lists

Now, for each image in that list you can verify their Sigstore signatures. E.g:
```
cosign verify ghcr.io/kubewarden/policy-server:v1.5.3 \
  --certificate-identity-regexp 'https://github.com/kubewarden/*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com

Verification for ghcr.io/kubewarden/policy-server:v1.5.3 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The code-signing certificate was verified using trusted certificate authority certificates

<snipped json>
```

You can then verify that the cert in the returned json contains the correct
issuer, subject, and `github_workflow_repository` extensions.


## kwctl

kwctl binaries are signed using [Sigstore's blog signing](https://docs.sigstore.dev/signing/signing_with_blobs/).

When you download a [kwctl
release](https://github.com/kubewarden/kwctl/releases/) each zip file contains
two files that can be used for verification: `kwctl.sig` and `kwctl.pem`.

In order to verify kwctl you need cosign installed, and then execute the
following command:

```
cosign verify-blob \
  --signature kwctl-linux-x86_64.sig \
  --cert kwctl-linux-x86_64.pem kwctl-linux-x86_64 
  --certificate-identity-regexp 'https://github.com/kubewarden/*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com

Verified OK
```

You can then verify that the cert in the returned json contains the correct
issuer, subject, and `github_workflow_repository` extensions.

## Policies

Policies maintained by the Kubewarden team are also signed using the Sigstore project. Similar to
usual container images, one can verify them using `cosign`:
```
cosign verify ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.5 \
  --certificate-identity-regexp 'https://github.com/kubewarden/*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com

Verification for ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.5 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The code-signing certificate was verified using trusted certificate authority certificates

  <snipped json>
```

You can then verify that the cert in the returned json contains the correct
issuer, subject, and `github_workflow_repository` extensions.
