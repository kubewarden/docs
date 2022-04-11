# Secure Supply Chain

A Secure Supply Chain infrastructure allows software developers and users to ensure
the validity of the artefacts' chain of custody; thus mitigating
security issues in their environments. The goal of the [Sigstore project](https://sigstore.dev/)
is to provide the tools and infrastructure for validating the integrity of the supply chain.
Kubewarden leverages the `cosign` and `fulcio` utilities offered by the sigstore project to bring these security measures to its users.

Therefore, cluster operators can configure Kubewarden to only run policies signed
by entities that they trust while policy developers can sign their policies and
publish them in a registry.

## Signing policies

Kubewarden recommends using Sigstore's [cosign](https://github.com/sigstore/cosign) utility
for signing policies. This subsection details a key-based method of signing policies
in which, users need to generate a private-public key pair. The generated keys help
in verifying whether the signed artefacts came from the expected user i.e. the
owner of the keys. Using the `cosign generate-key-pair` command, as illustrated
below, it is possible to generate the aforementioned keypair.

```bash
cosign generate-key-pair
Enter password for private key:
Enter password for private key again:
Private key written to cosign.key
Public key written to cosign.pub
```

Once the keys are generated, users can use it to sign policies.

> **WARNING**: The private key file, `cosign.key`, should not be shared. This
> is a secret file that should be used only by the owner of the key for signing policies.

To sign a policy users can execute the `cosign sign` command passing the `--key`
command line argument with their private key file:

```bash
cosign sign --key cosign.key ghcr.io/jvanz/policies/user-group-psp:latest
an error occurred: no provider found for that key reference, will try to load key from disk...
Enter password for private key:
Pushing signature to: ghcr.io/jvanz/policies/user-group-psp
```

This command will sign the policy adding annotations in the image. The signed
image is then uploaded into the registry. Now the policy is ready to be used
in a Kubewarden installation with signature verification enabled.

> **NOTE**: For more information about how the signing process works under the hood, check
> out the [Sigstore project documentation](https://docs.sigstore.dev/)


### Keyless signing

Many times the policies are automatically built in CI/CD pipelines which complicates
the key generation process. The Sigstore keyless workflow described below is specifically designed for
these situations and others where key generation is not possible.
Instead of using long-lived singing keys, the keyless workflow uses certificate authorities (CAs) and
certificate chains. A short-lived certificate key is generated, and linked into
a chain of trust by completing an identity challenge to confirm the signer's
identity. The life of the certificate key is just about enough for the signing
to occur. The identity challenge is performed by authenticating against an
OpenID Connect (OIDC) provider. Sigstore's Fulcio service is used for the chain of trust.

For signing, we will again use Sigstore's cosign utility. However, as of this
writing, this feature is not enabled by default in cosign. So, it's necessary
to enable this experimental feature before proceeding with keyless signing as shown below:


```console
$ COSIGN_EXPERIMENTAL=1 cosign sign ghcr.io/jvanz/policies/user-group-psp:latest
Generating ephemeral keys...
Retrieving signed certificate...
Your browser will now be opened to:
https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=<REDACTED>&code_challenge_method=S256&nonce=<REDACTED>&redirect_uri=http%3A%2F%2Flocalhost%3A34021%2Fauth%2Fcallback&response_type=code&scope=openid+email&state=<REDACTED>
client.go:196: root pinning is not supported in Spec 1.0.19
Successfully verified SCT...
tlog entry created with index: 1819248
Pushing signature to: ghcr.io/jvanz/policies/user-group-psp
```
With that, the policy has been signed and pushed to the repository. Note that there are no byproduct keys.

### How to sign artefacts in Github workflows

`cosign` does not require the user to log on to an OIDC provider when using keyless signing
in the context of a GitHub action environment. In this scenario,
the Github token available during the execution of the workflow will be used to
authenticate the user and generate the ephemeral keys. The signing process is
the same used in the `Keyless` mode. This is an example of how Kubewarden project
signs its policies:

```yaml
# ... beginning of the workflow file
runs:
  using: "composite"
  steps:
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
        IMMUTABLE_REF=$(kwctl push -o json ${{ inputs.annotated-wasm }} ${{ inputs.oci-target }}:latest | jq -r .immutable_ref)
        echo Keyless signing of policy using cosign
        cosign sign ${IMMUTABLE_REF}
# ... remaining of the workflow file
```
> **NOTE**: This example came from the Github actions used at the time of this
> writing. It can change over time.

In the example above, we demonstrate using `kwctl` to publish the container image and find
the reference to it. This is not mandatory. You can call `cosign` with the image
reference generated elsewhere.


## Listing policy signatures

`kwctl` also allows the users to check the signatures in a published
policy. The `kwctl inspect` command shows all the relevant information about the
policy and its signatures as illustrated in an example below:

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


## Verifying policies

Users can check if a policy is properly signed with  `cosign` or `kwctl`.
Both have similar command line flags which allow users to check the policy
signatures. To check if the binary is signed with a key, the users can use `kwctl`
like this:

```console
$ kwctl verify -k cosign.pub ghcr.io/jvanz/policies/user-group-psp:latest
2022-03-29T14:49:16.623079Z ERROR policy_fetcher::registry::config: error parsing host configuration, host ignored host=https://index.docker.io/v1/ error=basic auth not in the form username:password
2022-03-29T14:49:31.878180Z  INFO kwctl::verify: Policy successfully verified
```

Or `cosign` :

```console
$ cosign verify --key cosign.pub ghcr.io/jvanz/policies/user-group-psp:latest

Verification for ghcr.io/jvanz/policies/user-group-psp:latest --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - The signatures were verified against the specified public key
  - Any certificates were verified against the Fulcio roots.

[{"critical":{"identity":{"docker-reference":"ghcr.io/jvanz/policies/user-group-psp"},"image":{"docker-manifest-digest":"sha256:af520a8ccee03811d426c48634b7007f1220c121cc23e14962bb64510585ce97"},"type":"cosign container image signature"},"optional":null}]
```

## Configuring the policy server to check policy signatures

To configure Kubewarden to run only trusted policies, the users must create
a `configmap` with the minimum signature requirements needed for policies to be
executed in the environment. The `configmap` follows the same structure of the
file described in the `Signature Config Reference` section used to verify policy
in the `kwctl` utility. The only difference in this case would be that the
`configmap` should define all the configurations under the `verification-config`
field.  For example, let's consider that the users want to run policies signed
by the Kubewarden organization. A sample `configmap` for this scenario would be:

```console
$ cat kubewarden_signatures.yaml
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden

# note that the data is stored under verification-config field
$ kubectl  create configmap my-signatures-configuration --from-file=verification-config=kubewarden_signatures.yaml

$ kubectl  get configmap -o yaml my-signatures-configuration
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

It is also possible to use the `kwctl scaffold verification-config` to generate
a default verification config file to be used in the `configmap`:

```console
$ kwctl scaffold verification-config > verification_config.yaml
$ cat verification_config.yaml
# Default Kubewarden verification config
#
# With this config, the only valid policies are those signed by Kubewarden
# infrastructure.
#
# This config can be saved to its default location (for this OS) with:
#   kwctl scaffold verification-config > /home/jvanz/.config/kubewarden/verification-config.yml
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

$ kubectl  create configmap my-signatures-configuration --from-file=verification-config=verification_config.yaml
configmap/my-signatures-configuration created
$ kubectl  get configmap -o yaml my-signatures-configuration
apiVersion: v1
data:
  verification-config: |+
    # Default Kubewarden verification config
    #
    # With this config, the only valid policies are those signed by Kubewarden
    # infrastructure.
    #
    # This config can be saved to its default location (for this OS) with:
    #   kwctl scaffold verification-config > /home/jvanz/.config/kubewarden/verification-config.yml
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

After creating the `configmap` to store the signature requirements, the users
can configure a Policy Server to start validating policy signatures by setting the
`configmap` name in the field `verificationConfig`.

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
Helm chart, you can configure this field by setting the `configmap` name in the
`policyServer.verificationConfig` value.

Now, the PolicyServer will reject untrusted AdmissionPolicies and ClusterAdmissionPolicies,
and those would never be in active status or able to process admission review requests.

## Signature Config Reference

Users can also provide a file with all the signature requirements they want to validate. A sample file is shown below:

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

The configuration is composed of two sections:

- `anyOf`:  The policy will be trusted if the `minimumMatches` criterion is fulfilled.
In the above example, the `minimumMatches` field has been assigned a value 2.
This means that at least two of the signature requirements listed **need to be fulfilled**
for the policy to be trusted. The default value that the `minimumMatches` field assumes is `1`.
- `allOf`: All the signature requirements defined in this section must be valid
so that the policy can be trusted.

Each of these sections can contain one or more signature requirements.
Users can also define both sections in one file as shown above. In this situations, all
the signatures requirements from the `allOf` **AND** a minimum number of matches
from the `anyOf` section as described in the `minimumMatches` field must be valid.

### Signature validation

The users can validate different signatures in the `anyOf` and `allOf` sections.
It's possible to validate the public key and the keyless data used to sign the policy.

### Public key validation

To check if the policy is assigned with the given public key, the users can
define the key data and the owner of the key used to sign the policy. As illustrated
bellow, it is necessary to define the kind as `pubKey` and insert the public
key data in the `key` field. The owner field is optional.

**Example**

```  yaml
  - kind: pubKey
    owner: bob # optional
    key: |
      -----BEGIN PUBLIC KEY-----
      MBFKHFDGHKIJH0CAQYIKoZIzj0DAQcDQgAEX0HFTtCfTtPmkx5p1RbDE6HJSGAVD
      BVDF6SKFSF87AASUspkQsN3FO4iyWodCy5j3o0CdIJD/KJHDJFHDFIu6sA==
      -----END PUBLIC KEY-----
```

### Keyless signatures validation

When signed in keyless mode, we do not have the public key to verify. In this
situation, the users can verify the field filled with the OIDC data used during
the signing process. For that, it's necessary to define the kind of the signature
validation as `genericIssuer`. Therefore, it's possible to verify three pieces
of information from the signature:

- `issuer`(mandatory): matches the `Issuer` attribute in the certificate
generated by Fulcio. This shows the OIDC used to sign the policy
- `subject`: field used to match the `Subject` attribute in Fulcio's
certificate. The `Subject` field contains the information of the user used to
authenticate again the OIDC provider. The verification field, `subject`, can have
two children fields: `equal` forces the `Subject` from the certificate to be
equal to the value defined in the signature validation; `urlPrefix` forces the
value of the certificate's `Subject` field value to be prefixed by the value
defined in the signature requirement.

**Examples**

The following signature requires the policy to be signed by Alice in a keyless manner
using the Github OIDC:

```yaml
- kind: genericIssuer
  issuer: https://github.com/login/oauth
  subject:
    equal: alice@example.com
```

This signature requirement enforces that the policy be signed in the context of a Github actions environment
from a repository owned by Flavio:

```yaml
- kind: genericIssuer
  issuer: https://token.actions.githubusercontent.com
  subject:
    urlPrefix: https://github.com/flavio
```

### GitHub actions signature verification

The signature validation kind, `githubAction` is used to validate policies signed in a Github
Actions environment. It can be achieved with the `genericIssuer` kind as well. But
`githubAction`simplifies the signature requirement creation process by defining two additional fields:

- `owner` (mandatory): GitHub ID of the user or organization to be trusted
- `repo`: the name of the repository to be trusted

**Example**

```yaml
- kind: githubAction
  owner: kubewarden
```

### Signature annotations validation

All the signature types can have one additional optional validation field, `annotations`.
These fields are key/value data added by the users during the signing process. The data makes it
possible to trust policies that have specific required annotations.

**Examples**

If the users want to trust only policies which have been signed with a specific key
and the annotation `environment` with the value `production`, they can define the
following validation:

```yaml
- kind: pubKey
  key: |
    -----BEGIN PUBLIC KEY-----
    MBFKHFDGHKIJH0CAQYIKoZIzj0DAQcDQgAEX0HFTtCfTtPmkx5p1RbDE6HJSGAVD
    BVDF6SKFSF87AASUspkQsN3FO4iyWodCy5j3o0CdIJD/KJHDJFHDFIu6sA==
    -----END PUBLIC KEY-----
  annotation:
    environment: production
```


### How to use signatures verification config file to check a policy OCI artefact

To test if a given policy passes signature verification using the
verification config file, use the `--verification-config-path`  flag of the `kwctl verify` command

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

$ kwctl verify --verification-config-path signatures_requirements.yaml ghcr.io/jvanz/policies/user-group-psp:latest
2022-03-29T17:34:37.847169Z  INFO kwctl::verify: Policy successfully verified
```

While the previous example tests if the policy is signed by the given key,
the next one checks if a given policy came from the Kubewarden organization:

```console
$ cat kubewarden_signatures.yaml
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden

$ kwctl verify --verification-config-path kubewarden_signatures.yaml ghcr.io/kubewarden/policies/user-group-psp:latest
2022-03-29T18:07:39.062292Z  INFO kwctl::verify: Policy successfully verified
```
