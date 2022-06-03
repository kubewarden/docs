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
COSIGN_EXPERIMENTAL=1 cosign verify ghrc.io/kubewarden/charts/kubewarden-controller:0.4.6 | jq

Verification for ghcr.io/kubewarden/charts/kubewarden-controller:0.4.6 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - Any certificates were verified against the Fulcio roots.

  <snipped json>
```

You can then verify either manually or with Sigstore tools that the cert in the
returned json contains the correct issuer, subject, and
`github_workflow_repository` extensions.

## Container images

Both our production images used in our Helm charts and our development images
(tagged `:latest`) are signed with Sigstore's keyless signing.

Kubewarden follows the usual practices with regards to Helm charts. Hence, one
can find all the images in the Helm charts with a plugin such as
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

Now, for each image in that list you can verify their Sigstore signatures. E.g:
```
COSIGN_EXPERIMENTAL=1 cosign verify ghcr.io/kubewarden/policy-server:v0.3.1 | jq
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - Any certificates were verified against the Fulcio roots.

  <snipped json>
```

You can then verify either manually or with Sigstore tools that the cert in the
returned json contains the correct issuer, subject, and
`github_workflow_repository` extensions.


## kwctl

kwctl binaries are signed using [Sigstore's blog signing](https://docs.sigstore.dev/cosign/working_with_blobs/#signing-blobs-as-files). 

When you download a [kwctl
release](https://github.com/kubewarden/kwctl/releases/) each zip file contains
two files that can be used for verification: `kwctl.sig` and `kwctl.pem`.

In order to verify kwctl you need cosign installed, and then execute the
following command:

```
COSIGN_EXPERIMENTAL=1 cosign verify-blob  --signature kwctl-linux-x86_64.sig --cert kwctl-linux-x86_64.pem kwctl-linux-x86_64
```

The output should be:

```
tlog entry verified with uuid: 7e5a4fac8f45cdddeafd6901af566b9576be307a06caa3fbc45f91da102214e0 index: 2435066
Verified OK
```

You can inspect the cert signature yourself to see that indeed was authenticated
via GitHub OIDC, and performed in our GitHub Actions workflows.
