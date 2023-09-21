---
sidebar_label: "Secure supply chain"
title: "Secure supply chain"
description: A secure supply chain infrastructure using Kubewarden.
keywords: [kubewarden, kubernetes, secure supply chain, infrastructure]
---

A secure supply chain infrastructure can verify the validity of its parts, or links.
It lets users and developers show the chain of custody of its software components, or artifacts.
It's an active approach to mitigate security issues.

The [Sigstore](https://sigstore.dev/) project provides tools and infrastructure for this.
It's for validating the integrity of the artifact supply chain.

Kubewarden uses [`cosign`](https://github.com/sigstore/cosign) together with the [fulcio](https://github.com/SigStore/fulcio) and [rekor](https://github.com/sigstore/rekor) infrastructure offered by the Sigstore project.

Cluster operators can configure Kubewarden to only run policies signed by trusted entities.
Policy developers can sign their policies and publish them in a registry.

## Prerequisites

In the following sections, you need a few tools to be installed.
These are so users can sign and verify OCI artifacts signatures.
The examples show the use of [`cosign`](https://docs.sigstore.dev/cosign/installation/) and [`kwctl`](https://github.com/kubewarden/kwctl) utilities for signing and inspecting policies.

Users may also want to use GitHub to sign their policies. In which case, they need to install [Github actions](https://docs.sigstore.dev/cosign/installation/#github-action)

Keyless signing uses the default [fulcio](https://github.com/SigStore/fulcio)
and [rekor](https://github.com/sigstore/rekor) instances provided by the
Sigstore project.
Check the Sigstore documentation for details on how to use your own infrastructure for this, if needed.

## Signing policies

Kubewarden recommends using Sigstore's [cosign](https://github.com/sigstore/cosign) utility to signing policies.
This section shows a key-based method of signing policies.
Users need to generate a private-public key-pair for this.
The generated keys help to verify if the signed artifacts came from the expected user.
To generate this key-pair use this `cosign generate-key-pair` command:

```bash
cosign generate-key-pair
```

Resulting in a prompt to type and verify a password:

```console
Enter password for private key: ●●●●●●●●
Enter password for private key again: ●●●●●●●●
Private key written to cosign.key
Public key written to cosign.pub
```

Now you can use this key to sign policies.

The private key file, `cosign.key`, shouldn't be shared.
This is a secret file only for use by the key owner for signing policies.

To sign a policy you can use `cosign sign` passing the `--key` command line argument with your private key file:

```bash
cosign sign --key cosign.key ghcr.io/kubewarden/policies/user-group-psp:latest
```

Resulting in a prompt for the password, for the specified private key:

```console
an error occurred: no provider found for that key reference, will try to load key from disk...
Enter password for private key: ●●●●●●●●
Pushing signature to: ghcr.io/kubewarden/policies/user-group-psp
```

This command signs the policy by creating a new signature object.
The signature object is then uploaded into the registry, with the policy.
Now the policy is ready to use in a Kubewarden installation using signature verification.

The same policy can be signed multiple times, by the same user or different ones.
These signatures are added to the signature object along with the original signature.

For more information about how the signing process works, check out the [Sigstore project documentation](https://docs.sigstore.dev/).

### Keyless signing

Often policies are automatically built in CI/CD pipelines.
This complicates the key generation process.
This Sigstore keyless workflow is for these situations.
Instead of using long-lived singing keys, the keyless workflow uses certificate authorities (CAs) and certificate chains.

A short-lived certificate key is generated, and linked into a chain of trust.
It's done by an identity challenge to confirm the signer's identity.
The life of the certificate key is long enough for the signing to occur.
The identity challenge is done by authenticating against an OpenID Connect (OIDC) provider.
Sigstore's Fulcio public infrastructure is used for the chain of trust.

Signing uses Sigstore's cosign utility.

```bash
$ cosign sign ghcr.io/kubewarden/policies/user-group-psp:latest
```

<details>

<summary><code>cosign</code> output</summary>

```console
Generating ephemeral keys...
Retrieving signed certificate...
Your browser will now be opened to:
https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=<REDACTED>&code_challenge_method=S256&nonce=<REDACTED>&redirect_uri=http%3A%2F%2Flocalhost%3A34021%2Fauth%2Fcallback&response_type=code&scope=openid+email&state=<REDACTED>
client.go:196: root pinning is not supported in Spec 1.0.19
Successfully verified SCT...
tlog entry created with index: 1819248
Pushing signature to: ghcr.io/kubewarden/policies/user-group-psp
```

</details>

This signs the policy and pushes it to the repository.
There are no keys generated as a byproduct.

### How to sign artifacts in GitHub workflows

When using keyless signing, in a GitHub action,
`cosign` doesn't need the user to log in to an OIDC provider.
A GitHub token is available during the execution of the GitHub workflow.
It's used to authenticate the user and generate the ephemeral keys.
The signing process is the same used in the keyless mode.
This is an example of how the Kubewarden project signs its policies:

<details>

<summary>YAML describing Kubewarden policy signing</summary>

```yaml
# ... beginning of the workflow file ...
jobs:
  build:
    name: Build container image
    runs-on: ubuntu-latest
    steps:
      # ... other steps building the container image ...
      -
      name: Login to GitHub Container Registry
      uses: docker/login-action@v1
      with:
        registry: ghcr.io
        username: ${{ github.repository_owner }}
        password: ${{ inputs.GITHUB_TOKEN }}
      -
      name: Publish Wasm policy artifact to OCI registry with the 'latest' tag
      shell: bash
      if: ${{ startsWith(github.ref, 'refs/heads/') }}
      env:
        COSIGN_EXPERIMENTAL: 1
      run: |
        set -ex
        echo Pushing policy to OCI container registry
        IMMUTABLE_REF=$(kwctl push -o json ${{ PATH_TO_BUILT_WASM_FILE }} ghcr.io/myorg/policies/my-great-policy:latest | jq -r .immutable_ref)
        echo Keyless signing of policy using cosign
        cosign sign ${IMMUTABLE_REF}
      # ... other build steps ...

# ... remainder of the workflow file ...
```

</details>

:::note

Policy developers can use the Kubewarden policy templates. They have GitHub actions to build, test, sign and publish policies.

:::

## Listing policy signatures

You can check signature in a published policy with `kwctl inspect`.
This shows the information about the policy and its signatures as shown below:

<details>

<summary><code>kwctl inspect registry://ghcr.io/kubewarden/policies/us....</code></summary>

```console
$ kwctl inspect registry://ghcr.io/kubewarden/policies/user-group-psp:v0.2.0
Details
title:              psp-user-group
description:        Short description
author:             José Guilherme Vanz <jguilhermevanz@suse.com>
url:                https://github.com/kubewarden/user-group-psp-policy
source:             https://github.com/kubewarden/user-group-psp-policy
license:            Apache-2.0
mutating:           true
context aware:      false
execution mode:     kubewarden-wapc
protocol version:   1

Annotations
io.kubewarden.kwctl 0.2.5-rc2

Rules
────────────────────
---
- apiGroups:
    - ""
  apiVersions:
    - v1
  resources:
    - pods
  operations:
    - CREATE
────────────────────

Usage
This policy enforce the user and group used in the container.

Sigstore signatures

Digest:                            sha256:026af67682a85d424e7d95db460171635f5c3957d67b53499bece912cc0413cc
Media type:                        application/vnd.dev.cosign.simplesigning.v1+json
Size:                              258
Annotations
dev.sigstore.cosign/certificate    -----BEGIN CERTIFICATE-----
                                   MIIDRzCCAsygAwIBAgITbPUZlUFkkAHtbzc3rzC/3zXj1DAKBggqhkjOPQQDAzAq
                                   MRUwEwYDVQQKEwxzaWdzdG9yZS5kZXYxETAPBgNVBAMTCHNpZ3N0b3JlMB4XDTIy
                                   MDIyNTE2MzAwMloXDTIyMDIyNTE2NDAwMVowEzERMA8GA1UEChMIc2lnc3RvcmUw
                                   WTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAR/O5c6ZI5BzBweoEIam4uWu5fqzHx0
                                   3PTCgfXyyvIjorz9wX08bsndkHdWfFObU+PztbxX78An43Yw9/fHtO93o4IB5jCC
                                   AeIwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMAwGA1UdEwEB
                                   /wQCMAAwHQYDVR0OBBYEFCP/v7NEJQglbDmyC5VMgnvhiuBUMB8GA1UdIwQYMBaA
                                   FFjAHl+RRaVmqXrMkKGTItAqxcX6MHgGA1UdEQRxMG+GbWh0dHBzOi8vZ2l0aHVi
                                   LmNvbS9rdWJld2FyZGVuL2dpdGh1Yi1hY3Rpb25zLy5naXRodWIvd29ya2Zsb3dz
                                   L3JldXNhYmxlLXJlbGVhc2UtcG9saWN5LXJ1c3QueW1sQHJlZnMvaGVhZHMvdjEw
                                   NgYKKwYBBAGDvzABAwQoMmJiMGQ4NjZjMzFmOGMyZTQ3NDMxMDI4M2ExNmFkMWFi
                                   NjBlZjA1YjAuBgorBgEEAYO/MAEFBCBrdWJld2FyZGVuL3VzZXItZ3JvdXAtcHNw
                                   LXBvbGljeTAcBgorBgEEAYO/MAEEBA5SZWxlYXNlIHBvbGljeTASBgorBgEEAYO/
                                   MAECBARwdXNoMDkGCisGAQQBg78wAQEEK2h0dHBzOi8vdG9rZW4uYWN0aW9ucy5n
                                   aXRodWJ1c2VyY29udGVudC5jb20wHgYKKwYBBAGDvzABBgQQcmVmcy90YWdzL3Yw
                                   LjIuMDAKBggqhkjOPQQDAwNpADBmAjEAyGQbNCkOifStO7yCCfF8yXyc144ANn2x
                                   Ty92WYC0pTaVhviOED47fgD6TncKf+92AjEAjBfjLmCG/Mwrh8t+gfHJEAWWEc9Q
                                   +j9NR4wF66uABS/TTh5CYlrnIuqSD+GBHGwV
                                   -----END CERTIFICATE-----
dev.sigstore.cosign/timestamp      {"signatures":[{"keyid":"b6710623a30c010738e64c5209d367df1c0a18cf90e6ab5292fb01680f83453d","sig":"3046022100f666a7f4b3d85d8003f2c166e27827dfa0c4ab9282e9dab19485f4e702c61700022100dfe826e0edab5f80a40f08cc87b87777a4db30775d85684fe4950e797f2f565c"}],"signed":{"_type":"timestamp","spec_version":"1.0","version":15,"expires":"2022-03-08T19:14:05Z","meta":{"snapshot.json":{"length":1655,"hashes":{"sha256":"36cf063d0717f6dc03e23027721adcd69b684d293956d3a1a7db7b0848f711d7","sha512":"f90946d0a2dc58dae4505cfb91517a40299adf9e8719f52af187e2025aad69fcdeaeded271ec25db24869841c16fbe24f3fc56f56af8fdbb8808dccec4636b64"},"version":15}}}}
dev.sigstore.cosign/bundle         {"SignedEntryTimestamp":"MEUCIEfu4qR+HsexSDk5h2QXMduvoRCX10J+4CLQWtYw5VD6AiEAyYCEjvJdv2Sr5tZ4LApnddH/4v+CoV1QkuvbCQ3iIUM=","Payload":{"body":"eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiIwMjZhZjY3NjgyYTg1ZDQyNGU3ZDk1ZGI0NjAxNzE2MzVmNWMzOTU3ZDY3YjUzNDk5YmVjZTkxMmNjMDQxM2NjIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FWUNJUUNXNWZRZ1BUUTdaTlNuRkhzbHJOTlFrS2dTSVFpOGNSMTU5UEExc0s4VGlRSWhBSndMOWJPcUJKbVduN1lLZG9Tem80c2xPZ2s4SkJCanFYZHNydDNyeVF0QiIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVUlNla05EUVhONVowRjNTVUpCWjBsVVlsQlZXbXhWUm10clFVaDBZbnBqTTNKNlF5OHplbGhxTVVSQlMwSm5aM0ZvYTJwUFVGRlJSRUY2UVhFS1RWSlZkMFYzV1VSV1VWRkxSWGQ0ZW1GWFpIcGtSemw1V2xNMWExcFlXWGhGVkVGUVFtZE9Wa0pCVFZSRFNFNXdXak5PTUdJelNteE5RalJZUkZSSmVRcE5SRWw1VGxSRk1rMTZRWGROYkc5WVJGUkplVTFFU1hsT1ZFVXlUa1JCZDAxV2IzZEZla1ZTVFVFNFIwRXhWVVZEYUUxSll6SnNibU16VW5aamJWVjNDbGRVUVZSQ1oyTnhhR3RxVDFCUlNVSkNaMmR4YUd0cVQxQlJUVUpDZDA1RFFVRlNMMDgxWXpaYVNUVkNla0ozWlc5RlNXRnROSFZYZFRWbWNYcEllREFLTTFCVVEyZG1XSGw1ZGtscWIzSjZPWGRZTURoaWMyNWthMGhrVjJaR1QySlZLMUI2ZEdKNFdEYzRRVzQwTTFsM09TOW1TSFJQT1ROdk5FbENOV3BEUXdwQlpVbDNSR2RaUkZaU01GQkJVVWd2UWtGUlJFRm5aVUZOUWsxSFFURlZaRXBSVVUxTlFXOUhRME56UjBGUlZVWkNkMDFFVFVGM1IwRXhWV1JGZDBWQ0NpOTNVVU5OUVVGM1NGRlpSRlpTTUU5Q1FsbEZSa05RTDNZM1RrVktVV2RzWWtSdGVVTTFWazFuYm5ab2FYVkNWVTFDT0VkQk1WVmtTWGRSV1UxQ1lVRUtSa1pxUVVoc0sxSlNZVlp0Y1ZoeVRXdExSMVJKZEVGeGVHTllOazFJWjBkQk1WVmtSVkZTZUUxSEswZGlWMmd3WkVoQ2VrOXBPSFphTW13d1lVaFdhUXBNYlU1MllsTTVjbVJYU214a01rWjVXa2RXZFV3eVpIQmtSMmd4V1dreGFGa3pVbkJpTWpWNlRIazFibUZZVW05a1YwbDJaREk1ZVdFeVduTmlNMlI2Q2t3elNteGtXRTVvV1cxNGJFeFlTbXhpUjFab1l6SlZkR05IT1hOaFYwNDFURmhLTVdNelVYVmxWekZ6VVVoS2JGcHVUWFpoUjFab1draE5kbVJxUlhjS1RtZFpTMHQzV1VKQ1FVZEVkbnBCUWtGM1VXOU5iVXBwVFVkUk5FNXFXbXBOZWtadFQwZE5lVnBVVVROT1JFMTRUVVJKTkUweVJYaE9iVVpyVFZkR2FRcE9ha0pzV21wQk1WbHFRWFZDWjI5eVFtZEZSVUZaVHk5TlFVVkdRa05DY21SWFNteGtNa1o1V2tkV2RVd3pWbnBhV0VsMFdqTktkbVJZUVhSalNFNTNDa3hZUW5aaVIyeHFaVlJCWTBKbmIzSkNaMFZGUVZsUEwwMUJSVVZDUVRWVFdsZDRiRmxZVG14SlNFSjJZa2RzYW1WVVFWTkNaMjl5UW1kRlJVRlpUeThLVFVGRlEwSkJVbmRrV0U1dlRVUnJSME5wYzBkQlVWRkNaemM0ZDBGUlJVVkxNbWd3WkVoQ2VrOXBPSFprUnpseVdsYzBkVmxYVGpCaFZ6bDFZM2sxYmdwaFdGSnZaRmRLTVdNeVZubFpNamwxWkVkV2RXUkROV3BpTWpCM1NHZFpTMHQzV1VKQ1FVZEVkbnBCUWtKblVWRmpiVlp0WTNrNU1GbFhaSHBNTTFsM0NreHFTWFZOUkVGTFFtZG5jV2hyYWs5UVVWRkVRWGRPY0VGRVFtMUJha1ZCZVVkUllrNURhMDlwWmxOMFR6ZDVRME5tUmpoNVdIbGpNVFEwUVU1dU1uZ0tWSGs1TWxkWlF6QndWR0ZXYUhacFQwVkVORGRtWjBRMlZHNWpTMllyT1RKQmFrVkJha0ptYWt4dFEwY3ZUWGR5YURoMEsyZG1TRXBGUVZkWFJXTTVVUW9yYWpsT1VqUjNSalkyZFVGQ1V5OVVWR2cxUTFsc2NtNUpkWEZUUkN0SFFraEhkMVlLTFMwdExTMUZUa1FnUTBWU1ZFbEdTVU5CVkVVdExTMHRMUW89In19fX0=","integratedTime":1645806604,"logIndex":1506651,"logID":"c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d"}}
dev.sigstore.cosign/chain          -----BEGIN CERTIFICATE-----
                                   MIIB9zCCAXygAwIBAgIUALZNAPFdxHPwjeDloDwyYChAO/4wCgYIKoZIzj0EAwMw
                                   KjEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MREwDwYDVQQDEwhzaWdzdG9yZTAeFw0y
                                   MTEwMDcxMzU2NTlaFw0zMTEwMDUxMzU2NThaMCoxFTATBgNVBAoTDHNpZ3N0b3Jl
                                   LmRldjERMA8GA1UEAxMIc2lnc3RvcmUwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAT7
                                   XeFT4rb3PQGwS4IajtLk3/OlnpgangaBclYpsYBr5i+4ynB07ceb3LP0OIOZdxex
                                   X69c5iVuyJRQ+Hz05yi+UF3uBWAlHpiS5sh0+H2GHE7SXrk1EC5m1Tr19L9gg92j
                                   YzBhMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRY
                                   wB5fkUWlZql6zJChkyLQKsXF+jAfBgNVHSMEGDAWgBRYwB5fkUWlZql6zJChkyLQ
                                   KsXF+jAKBggqhkjOPQQDAwNpADBmAjEAj1nHeXZp+13NWBNa+EDsDP8G1WWg1tCM
                                   WP/WHPqpaVo0jhsweNFZgSs0eE7wYI4qAjEA2WB9ot98sIkoF3vZYdd3/VtWB5b9
                                   TNMea7Ix/stJ5TfcLLeABLE4BNJOsQ4vnBHJ
                                   -----END CERTIFICATE-----
dev.cosignproject.cosign/signature MEYCIQCW5fQgPTQ7ZNSnFHslrNNQkKgSIQi8cR159PA1sK8TiQIhAJwL9bOqBJmWn7YKdoSzo4slOgk8JBBjqXdsrt3ryQtB
```

</details>

## Verifying policies

You can check if a policy is correctly signed with  `cosign` or `kwctl`.
They have similar command line options for checking policy signatures.
To check if the binary is signed with a key, use `kwctl` like this:

```console
$ kwctl verify -k cosign.pub ghcr.io/kubewarden/policies/user-group-psp:latest
2022-03-29T14:49:31.878180Z  INFO kwctl::verify: Policy successfully verified
```

Or `cosign` :

```console
$ cosign verify --key cosign.pub ghcr.io/kubewarden/policies/user-group-psp:latest

Verification for ghcr.io/kubewarden/policies/user-group-psp:latest --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - The signatures were verified against the specified public key
  - Any certificates were verified against the Fulcio roots.

[{"critical":{"identity":{"docker-reference":"ghcr.io/kubewarden/policies/user-group-psp"},"image":{"docker-manifest-digest":"sha256:af520a8ccee03811d426c48634b7007f1220c121cc23e14962bb64510585ce97"},"type":"cosign container image signature"},"optional":null}]
```

## Configuring the policy server to check policy signatures

You can configure Kubewarden with a `ConfigMap` to only run trusted policies.
The `ConfigMap` structure described in [Signature Config Reference](#signature-config-reference).
It's used to verify a policy using `kwctl`.
The `ConfigMap` should define allowable configurations under the `verification-config` field.

For example, you want to run policies signed by the Kubewarden GitHub organization. Then a sample `ConfigMap` for this scenario would be:

<details>

<summary><code>$ cat kubewarden_signatures.yaml</code></summary>

```console
$ cat kubewarden_signatures.yaml
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden

# note that the data is stored under verification-config field
$ kubectl  create configmap my-signatures-configuration --from-file=verification-config=kubewarden_signatures.yaml

$ kubectl get configmap -o yaml my-signatures-configuration
apiVersion: v1
data:
  verification-config: |
    apiVersion: v1
    allOf:
      - kind: githubAction
        owner: kubewarden
kind: ConfigMap
metadata:
  creationTimestamp: "2022-03-29T18:27:20Z"
  name: my-signatures-configuration
  namespace: default
  resourceVersion: "10279"
  uid: d53e1c56-1fee-45de-92f5-9bd73b8cead4
```

</details>


You can use `kwctl scaffold verification-config` to generate a default verification configuration file for the `ConfigMap`:

```console
$ kwctl scaffold verification-config > verification_config.yaml
```

<details>

<summary><code>$ cat verification_config.yaml</code></summary>

```console
$ kwctl scaffold verification-config > verification_config.yaml
$ cat verification_config.yaml
# Default Kubewarden verification config
#
# With this config, the only valid policies are those signed by Kubewarden
# infrastructure.
#
# This config can be saved to its default location (for this OS) with:
#   kwctl scaffold verification-config > /home/kubewarden/.config/kubewarden/verification-config.yml
#
# Providing a config in the default location enables Sigstore verification.
# See https://docs.kubewarden.io for more Sigstore verification options.
---
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden
    repo: ~
    annotations: ~
anyOf: ~
```
</details>


You can use this `verification_config.yml` to create the `ConfigMap`.

```console
$ kubectl create configmap my-signatures-configuration --from-file==verification_config.yaml
configmap/my-signatures-configuration created
```

Then we can inspect with `get configmap`.

<details>

<summary><code>kubectl get configmap</code></summary>

```console
$ kubectl get configmap -o yaml my-signatures-configuration
apiVersion: v1
data:
  verification-config: |+
    # Default Kubewarden verification config
    #
    # With this config, the only valid policies are those signed by Kubewarden
    # infrastructure.
    #
    # This config can be saved to its default location (for this OS) with:
    #   kwctl scaffold verification-config > /home/kubewarden/.config/kubewarden/verification-config.yml
    #
    # Providing a config in the default location enables Sigstore verification.
    # See https://docs.kubewarden.io for more Sigstore verification options.
    ---
    apiVersion: v1
    allOf:
      - kind: githubAction
        owner: kubewarden
        repo: ~
        annotations: ~
    anyOf: ~

kind: ConfigMap
metadata:
  creationTimestamp: "2022-04-07T11:54:27Z"
  name: my-signatures-configuration
  namespace: default
  resourceVersion: "1317"
  uid: 74dec846-7fcd-4b4b-8184-700c816f685a
```

</details>

After creating the `ConfigMap` to store the signature requirements, you can configure a Policy Server.
To start validating policy signatures by setting the `ConfigMap` name in the highlighted field `verificationConfig`.

```yaml
apiVersion: policies.kubewarden.io/v1alpha2
kind: PolicyServer
metadata:
  name: default
  finalizers:
    - kubewarden
spec:
  image: ghcr.io/kubewarden/policy-server:v0.2.7
  serviceAccountName: policy-server
  replicas: 1
//highlight-next-line
  verificationConfig: your_configmap   #name of the confimap with the signatures requirements
  env:
    - name: KUBEWARDEN_ENABLE_METRICS
      value: "1"
    - name: KUBEWARDEN_LOG_FMT
      value: otlp
    - name: "KUBEWARDEN_LOG_LEVEL"
      value: "info"
```

If you deploy the default Policy Server using the `kubewarden-defaults`
Helm chart then you configure this field by setting the `ConfigMap` name in the
`policyServer.verificationConfig` value.

Now, the PolicyServer rejects untrusted AdmissionPolicies and ClusterAdmissionPolicies by refusing to start.
You need to remove the untrusted policy, or change the signatures requirement, for a running PolicyServer.

## Signature configuration reference

You can validate signature requirements contained in a file. Here is an example:

<details>

<summary>
A file of signature requirements
</summary>

```yaml
apiVersion: v1

//highlight-next-line
allOf:
  - kind: githubAction
    owner: kubewarden   # mandatory
    annotations:
      env: prod

//highlight-next-line
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

The configuration above contains the two highlighted sections, `allOf` and `anyOf`:

- `allOf`: The policy is trusted only if all signature requirements here are valid.

- `anyOf`:  The policy is trusted if the `minimumMatches` criterion is met.
Above, the `minimumMatches` field is 2.
So, at least two of the signature requirements must be met.
The default value for `minimumMatches` field is `1`.

All the signatures requirements from `allOf` **and** the minimum number from `anyOf` must be met.

### Public key validation

To check a policy is signed with the correct public key, you specify the key data and the owner of the key.
In this example, `kind` is set to `pubKey` and the `key` has the public key.
The owner field is optional, but can be useful to clarify who owns the key.

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

A policy signed in keyless mode doesn't have a public key we can verify.
You can still verify the policy with the OIDC data used during the signing process.
For that, it's necessary to define the signature validation as `genericIssuer`.

It's possible to verify information from the signature:

- `issuer`(mandatory): this matches the `Issuer` attribute in the certificate generated by Fulcio.
This shows the OIDC used to sign the policy.
- `subject`: field used to match the `Subject` attribute in Fulcio's certificate.
The `Subject` (Fulcio) field contains the user used to authenticate against the OIDC provider.
The verification field, `subject`, can have one of two sub fields:
  - `equal`: the `Subject` (Fulcio) from the certificate must be equal to the value in the signature validation;
  - `urlPrefix`: the certificate's `Subject` (Fulcio) field value must be prefixed by the value defined in the signature validation.

:::note

Both the `cosign verify` and the `kwctl inspect` can show information about keyless signatures.

:::

For example, this configuration means the policy must have a keyless signature from Alice using the GitHub OIDC:

```yaml
- kind: genericIssuer
  issuer: https://github.com/login/oauth
  subject:
    equal: alice@example.com
```

This configuration needs the policy to be signed in GitHub actions,
from a repository owned by the GitHub user `flavio`:

```yaml
- kind: genericIssuer
  issuer: https://token.actions.githubusercontent.com
  subject:
    urlPrefix: https://github.com/flavio
```

### GitHub actions signature verification

The "kind", `githubAction` is to validate policies signed in GitHub Actions.
You can do this with the `genericIssuer` kind as well.
To simplify the signature requirement process, use two extra fields for `githubAction`:

- `owner` (mandatory): GitHub ID of the user or organization to trust
- `repo`: the name of the repository to trust

For example, the last snippet, using `genericIssuer`, could be rewritten as:

```yaml
- kind: githubAction
  owner: flavio
```

### Signature annotations validation

All signature types can have other optional validation fields, `annotations`.
These fields are key/value data added by during the signing process.

With Kubewarden, you can ensure policies are signed by trusted users
**and** have specific annotations.

The next validation checks 2 conditions for the policy:

- that it's signed with a specific key
- it has a production environment annotation.

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

You can test if a policy passes verification using the verification config file.
Use the `--verification-config-path`  flag of the `kwctl verify` command

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

This last example tests if a given policy came from the Kubewarden organization:

```console
$ cat kubewarden_signatures.yaml
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden

$ kwctl verify --verification-config-path kubewarden_signatures.yaml ghcr.io/kubewarden/policies/user-group-psp:latest
2022-03-29T18:07:39.062292Z  INFO kwctl::verify: Policy successfully verified
```
