---
sidebar_label: Using a private Sigstore instance
title: Configuring PolicyServers to use a private Sigstore instance
description: Configuring PolicyServers to use a private or self-hosted Sigstore instance for policy signature verification in Kubewarden.
keywords:
  [
    kubewarden,
    kubernetes,
    policyservers,
    sigstore,
    private sigstore,
    policy signing,
  ]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, policy-servers, private-sigstore]
sidebar_position: 5
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/policy-servers/private-sigstore"/>
</head>

You can configure a PolicyServer to use a private or self-hosted Sigstore
instance for policy signature verification, instead of the default public
Sigstore infrastructure. This is useful in air-gapped environments or when
you operate your own Sigstore deployment.

## Prerequisites

- A running private Sigstore instance, with accessible Fulcio, Rekor, TSA, and
  CT log services
- `kubectl` access to the `kubewarden` namespace
- The [`cosign`](https://docs.sigstore.dev/cosign/system_config/installation/)
  CLI installed locally.
- [`jq`](https://jqlang.org/) installed locally

## Step 1 – Generate the `ClientTrustConfig` JSON

The PolicyServer expects a `ClientTrustConfig` JSON that describes your private
Sigstore instance's trust anchors and signing configuration.

### Obtain certificates and public keys

Retrieve the following from your private Sigstore instance:

- `fulcio.pem` — Fulcio CA certificate chain (PEM)
- `rekor.pub` — Rekor transparency log public key
- `tsa.pem` — Timestamp Authority certificate chain (PEM)
- `ctfe.pub` — CT log public key

```shell
# Fulcio CA certificate chain
curl --fail -o fulcio.pem "${FULCIO_URL}/api/v1/rootCert"

# Rekor transparency log public key
curl --fail -o rekor.pub "${REKOR_URL}/api/v1/log/publicKey"

# Timestamp Authority certificate chain
curl --fail -o tsa.pem "${TSA_URL}/api/v1/timestamp/certchain"

# CT log public key (from the Kubernetes secret in tuf-system namespace)
kubectl get secret -o json -n tuf-system ctlog-public-key \
  | jq -r ".data.public" | base64 -d > ctfe.pub
```

:::warning Security consideration

Make sure you that you safely download the certificates and keys from you
Sigstore instance. Otherwise, you may ended configuring your Kubewarden
with compromised data.

The above commands are examples on how to do that in a testing environment. Please,
consult the appropriate team in our organization to learn how to get this information
properly.

:::

### Generate the trusted root and signing config

Set environment variables pointing to your private Sigstore service URLs:

```shell
export FULCIO_URL=https://fulcio.example.com
export REKOR_URL=https://rekor.example.com
export TSA_URL=https://tsa.example.com
export CTLOG_URL=https://ctlog.example.com
export ISSUER_URL=https://oidc.example.com
```

Run `cosign` to generate the trusted root:

```shell
cosign trusted-root create \
  --fulcio="url=$FULCIO_URL,certificate-chain=fulcio.pem" \
  --rekor="url=$REKOR_URL,public-key=rekor.pub,start-time=2024-01-01T00:00:00Z" \
  --tsa="url=$TSA_URL,certificate-chain=tsa.pem" \
  --ctfe="url=$CTLOG_URL,public-key=ctfe.pub,start-time=2024-01-01T00:00:00Z" \
  --out trusted_root.json
```

Run `cosign` to generate the signing config:

```shell
cosign signing-config create \
  --fulcio="url=$FULCIO_URL,api-version=1,start-time=2024-01-01T00:00:00Z,operator=sigstore.dev" \
  --rekor="url=$REKOR_URL,api-version=1,start-time=2024-01-01T00:00:00Z,operator=sigstore.dev" \
  --rekor-config="ANY" \
  --oidc-provider="url=$ISSUER_URL/auth,api-version=1,start-time=2024-01-01T00:00:00Z,operator=sigstore.dev" \
  --tsa="url=$TSA_URL/api/v1/timestamp,api-version=1,start-time=2024-01-01T00:00:00Z,operator=sigstore.dev" \
  --tsa-config="EXACT:1" \
  --out signing_config.json
```

:::note
`--oidc-provider` is optional. Include it only if your private Sigstore instance
has a dedicated OIDC provider. If your policies are signed using Kubernetes service
account tokens (via `kubectl create token`), omit this flag.

The `start-time` value should be set to a date before your certificates were issued
(or the deployment date of your Sigstore instance).
:::

For a full description of all available flags and JSON field definitions for
both commands, refer to the [cosign CLI
reference](https://docs.sigstore.dev/cosign/system_config/installation/) and
the [Sigstore client trust config
specification](https://github.com/sigstore/protobuf-specs).

### Combine into `trust_config.json`

```shell
cat << EOF > trust_config.json
{
  "mediaType": "application/vnd.dev.sigstore.clienttrustconfig.v0.1+json",
  "trustedRoot": $(cat trusted_root.json),
  "signingConfig": $(cat signing_config.json)
}
EOF
```

## Step 2 – Create a ConfigMap in the `kubewarden` namespace

Store the `ClientTrustConfig` JSON in a ConfigMap with the key
`sigstore-trust-config`. The ConfigMap **must** be in the admission
controller namespace. In this example is `kubewarden`:

```shell
kubectl --namespace kubewarden create configmap my-sigstore-trust-config \
  --from-file=sigstore-trust-config=trust_config.json
```

## Step 3 – Create a verification config ConfigMap

Create a `verification_config.yaml` file specifying the certificate identity
constraints for your signed policies. For example, when using a Kubernetes
service account token:

```yaml
allOf:
  - kind: genericIssuer
    issuer: https://kubernetes.default.svc.cluster.local
    subject:
      equal: https://kubernetes.io/namespaces/<namespace>/serviceaccounts/<serviceaccount>
anyOf: null
```

Replace `<namespace>` and `<serviceaccount>` with the namespace and service
account used when signing the policy.

Create the ConfigMap:

```shell
kubectl --namespace kubewarden create configmap my-verification-config \
  --from-file=verification-config=verification_config.yaml
```

:::note
The ConfigMap key **must** be `verification-config` (not the filename).
Kubewarden looks for this exact key.
:::

## Step 4 – Configure the PolicyServer

Set `spec.sigstoreTrustConfig` and `spec.verificationConfig` on your PolicyServer
to the names of the ConfigMaps you created:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: default
spec:
  image: ghcr.io/kubewarden/policy-server:latest
  replicas: 1
  sigstoreTrustConfig: my-sigstore-trust-config
  verificationConfig: my-verification-config
```

The controller mounts the ConfigMaps into the policy-server pod and configures
it to use your private Sigstore instance for signature verification, enforcing
the identity constraints specified in the verification config.

:::warning Security consideration

Any user with write access to the ConfigMap referenced by `sigstoreTrustConfig`
can influence policy signature verification. This could allow them to substitute
a different Sigstore trust root and bypass signature checks.

Restrict access to this ConfigMap using Kubernetes RBAC, following the
principle of least privilege.

:::
