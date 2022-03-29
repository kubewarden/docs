# Secure Supply Chain

Users can configure Kubewarden to run only policies signed by entities they trust.
This is done using the infrastructure provided by Sigstore. This means that the
policies developers can sign the policies and publish them in a registry. While
the cluster operators can run the signed policies and be sure that the policies
came from the right place.


## Signing the policies

To sign the policies users must need to generate a key pair. These keys
ensure that artifacts signed with them came from the expected user, the owner
of the keys. It's possible to generate such keys using `cosign generate-key-pair` command:

```bash
cosign generate-key-pair
Enter password for private key:
Enter password for private key again:
Private key written to cosign.key
Public key written to cosign.pub
```

Once the keys are generated, users can use it to sign policies.

> **WARNING**: The user must not share the private key file (e.g. `cosign.key`). This is a secret file that should be used only by the owner of the key

To sign a policy users can execute the `cosign sign` command passing the `--key`
command line argument with their private key file:

```bash
cosign sign --key cosign.key ghcr.io/jvanz/policies/user-group-psp:latest
an error occurred: no provider found for that key reference, will try to load key from disk...
Enter password for private key:
Pushing signature to: ghcr.io/jvanz/policies/user-group-psp
```

This command will sign the policy and publish the signature data in the registry
as well. Now the policy are ready to be used in a Kubewarden with signature
verification enabled.


### Keyless signing

Many times the policies are automatically build in CI/CD pipelines which difficult
the key generation. For this situations, and other where the key generation is not
possible, `cosing` has experimental feature, keyless signing. This allows the users
sign policies with no previously created key. In this cases, `cosign` will use
[Fulcio](https://github.com/sigstore/fulcio) to generate ephemeral keys used to
sign the artifact only once.

To ensure the identity of the user for this keys, Fulcio uses a OIDC provider
to generate the ephemeral keys. This means that, during the signing process users
must sign-in using one of the OIDC provider, like show in the following image:

![Sigstore OIDC](./sigstore_oidc.png)


After signing in, `cosign` will finish the signing process.

However, during the time of this writing, this feature is not enable by default
in `cosign`. So, it's necessary to enable experimental features. The hole command
execution can be seen in the following example:

```bash
 COSIGN_EXPERIMENTAL=1 cosign sign ghcr.io/jvanz/policies/user-group-psp:latest
Generating ephemeral keys...
Retrieving signed certificate...
Your browser will now be opened to:
https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=<REDACTED>&code_challenge_method=S256&nonce=<REDACTED>&redirect_uri=http%3A%2F%2Flocalhost%3A34021%2Fauth%2Fcallback&response_type=code&scope=openid+email&state=<REDACTED>
client.go:196: root pinning is not supported in Spec 1.0.19
Successfully verified SCT...
tlog entry created with index: 1819248
Pushing signature to: ghcr.io/jvanz/policies/user-group-psp
```

### How sign artifact in Github actions workflows

When performing a keyless signing within a Github actions environment, `cosign`
does not require the user to login into the OIDC provider. In this environment,
the Github token available during the execution of the workflow will be used to
authenticate the user and generate the ephemeral keys.

## Verifying policies

Users can check if a policy is properly signed with  `cosign` or `kwctl`.
Both have similar command line flags which allow users to check the policy
signatures. To check if the binary is signed with a key, the users can use `kwctl`
like this:

```shell
kwctl verify -k cosign.pub ghcr.io/jvanz/policies/user-group-psp:latest
2022-03-29T14:49:16.623079Z ERROR policy_fetcher::registry::config: error parsing host configuration, host ignored host=https://index.docker.io/v1/ error=basic auth not in the form username:password
2022-03-29T14:49:31.878180Z  INFO kwctl::verify: Policy successfully verified
```

Or `cosign` :

```bash
cosign verify --key cosign.pub ghcr.io/jvanz/policies/user-group-psp:latest

Verification for ghcr.io/jvanz/policies/user-group-psp:latest --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - The signatures were verified against the specified public key
  - Any certificates were verified against the Fulcio roots.

[{"critical":{"identity":{"docker-reference":"ghcr.io/jvanz/policies/user-group-psp"},"image":{"docker-manifest-digest":"sha256:af520a8ccee03811d426c48634b7007f1220c121cc23e14962bb64510585ce97"},"type":"cosign container image signature"},"optional":null}]
```

### Signatures verification file

Users can also provide a file with all the signatures requirements they want to validate:

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

##### Filer structure
The configuration is composed by two sections:

- `anyOf`:  the policy will be consider trusted if it has as least `minimumMatches`
(default value is `1`) signatures requirements validated.
- `allOf`: all the signatures requirements defined in this section must be valid
in order to consider a trusted policy.

Each of these section can container one or more signature requirements.
Users can also define both section at the same time. In this situations, all
the signatures requirements from the `allOf` **AND** the `minimumMatches` matches
from the `anyOf` must be valid.

##### Signature requirements kinds

There are three signatures requirements kinds:

##### `pubKey` kind

Checks if the policy is assigned with the give public key.

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

##### `genericIssuer` kind

Signature kind used to validate signatures generated in keyless mode.  This kind
has two fields:

- `issuer`(mandatory): matches the `Issuer` attribute in the certificate
generated by Fulcio
- `subject`: field used to match the `Subject` attribute in the Fulcio's
certificate. The field can have two children fields: `equal` forces the `Subject`
from the certificate to be equal to the value defined in the signature requirement;
`urlPrefix` forces the value of the certificate's `Subject` field value to be
prefixed by the value defined in the signature requirement.

**Examples**

The following signature requirement asks the policy to be keyless signed by Alice
using the Github OIDC:

```yaml
- kind: genericIssuer
  issuer: https://github.com/login/oauth
  subject:
    equal: alice@example.com
```

This signature requirement enforces that the policy by signed in a Github actions
from a repository owner by Flavio:

```yaml
- kind: genericIssuer
  issuer: https://token.actions.githubusercontent.com
  subject:
    urlPrefix: https://github.com/flavio
```

##### `githubAction` kind

This signature requirement kind is used to validate policies signed in Github
Actions. This can also be achieve with the `genericIssuer` kind. But this kind
simplify the signature requirement creation by defining two fields:

- `owner` (mandatory): Github ID of the user or organization to be trusted
- `repo`: the name of the repository to be trusted

**Example**

```yaml
- kind: githubAction
  owner: kubewarden
```

#### How to use signatures verification file to check a policy OCI artifact

To test if a given policy passes in the signatures verification using the
verification file, use the `--verification-config-path`  flag of the `kwctl verify` command

```bash
cat signatures_requirements.yaml
apiVersion: v1
allOf:
  - kind: pubKey
    key: |
      -----BEGIN PUBLIC KEY-----
      MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5Q+cN1Jj2S7N05J4AXnqwP2DyzSg
      Mc+raYce2Wthrd30MSgFtoh5ADAkCd/nML2Nx8UD9KBuASRb0gG5jXqgMQ==
      -----END PUBLIC KEY-----

kwctl verify --verification-config-path signatures_requirements.yaml ghcr.io/jvanz/policies/user-group-psp:latest
2022-03-29T17:34:37.847169Z  INFO kwctl::verify: Policy successfully verified
```

While the previous example test if the policy is signed by the given key,
the next one checks if a given policy came from the Kubewarden organization:

```bash
cat kubewarden_signatures.yaml
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden

kwctl verify --verification-config-path kubewarden_signatures.yaml ghcr.io/kubewarden/policies/user-group-psp:latest
2022-03-29T18:07:39.062292Z  INFO kwctl::verify: Policy successfully verified
```

## How to configure policy server to check policies signatures

To configure Kubewarden to run only the trusted policies the users must create
`configmap` with the minimum signatures requirements to allow a policy to be
executed in the environment. The `configmap` follows the same structure of the
file used to verify policy in the `kwctl`. The different is that the `configmap`
should define all the configuration under the `verification-config` field.
As example, let's consider that the users want to run policies signed by the Kubewarden
organization they can create a `configmap` with the following commands:

```bash
cat kubewarden_signatures.yaml
apiVersion: v1
allOf:
  - kind: githubAction
    owner: kubewarden

# note that the data is stored under verification-config field
kubectl  create configmap my-signatures-configuration --from-file=verification-config=kubewarden_signatures.yaml

kubectl  get configmap -o yaml my-signatures-configuration
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


After creating the `configmap` to store the signature requirements, the users
can configure a Policy Server to start validate policy signatures setting the
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
helm chart, you configure this field setting the `configmap` name in the
`policyServer.verificationConfig` value.

Now, when a untrusted policy is installed the Policy Server will exit before
start receiving any admission review requests.
