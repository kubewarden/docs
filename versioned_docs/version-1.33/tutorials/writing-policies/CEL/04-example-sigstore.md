---
sidebar_label: Sigstore host capabilities
title: Sigstore host capabilities
description: "Example: Sigstore CEL policy"
keywords:
  [kubewarden, kubernetes, writing policies, sigstore, signature, verification]
doc-type: [tutorial]
doc-topic:
  [kubewarden, writing-policies, cel, sigstore, signature, verification]
doc-persona: [kubewarden-policy-developer, kubewarden-operator]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/cel/example-sigstore"/>
</head>

As an example of another usage of host capabilities on kubewarden's
`cel-policy`, let's create a policy that verifies all container images in a Pod
by checking their Sigstore keyless signatures.

## Example: Sigstore verification policy

This policy will check all container images in the Pod Sigstore, and verify
that the images are signed and trusted.

In this case, we will check for a Sigstore keyless signature performed in
GitHub Actions. These type of keyless signatures are tied to GitHub's OIDC
issuer when creating the cryptographic certificates, so we will only need to
know the GitHub organization under where the container image is published. You
can read more about the host capabilities for Sigstore
[here](../../../reference/spec/host-capabilities/signature-verifier-policies).

To achieve this in CEL, we use the [Kubewarden's CEL extension
libraries for host capabilities](https://github.com/kubewarden/cel-policy?tab=readme-ov-file#host-capabilities)
in the policy, particularly the [`githubAction`
function](https://pkg.go.dev/github.com/kubewarden/cel-policy/internal/cel/library#Sigstore).

As always, we can start with `kwctl`:

```console
$ kwctl scaffold manifest -t ClusterAdmissionPolicy \
  registry://ghcr.io/kubewarden/policies/cel-policy:v1.0.0`
```

Which then we can edit to be relevant to our container verification policy:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: "cel-sigstore-keyless-verification"
spec:
  module: ghcr.io/kubewarden/policies/cel-policy:v1.0.0
  namespaceSelector:
    matchLabels:
      kubernetes.io/metadata.name: default
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations: ["CREATE", "UPDATE"]
```

Now, let's to the CEL part. We will obtain a list of container images in the
current Pod object, and then check that they are verified by a signature
matching our organization of choosing (in this case, github.com/opencontainers):

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: "cel-sigstore-keyless-verification"
spec:
  module: ghcr.io/kubewarden/policies/cel-policy:v1.0.0
  namespaceSelector:
    matchLabels:
      kubernetes.io/metadata.name: default
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations: ["CREATE", "UPDATE"]
  settings:
    variables:
      - name: containerImages
        expression: |
          object.spec.containers.map(c, c.image)
      - name: containerImagesNotVerified
        expression: |
          variables.containerImages.filter(image, !kw.sigstore.image(image).githubAction("opencontainers").verify().isTrusted())
    validations:
      - expression: |
          size(variables.containerImagesNotVerified) == 0
        messageExpression: "'These container images are not signed by the kubewarden GitHub organization: ' + variables.containerImagesNotVerified.join(', ')"
```

But wait, we must not forget that InitContainers can be also part of Pods. So let's add another variable and validation:

```yaml title="./cel-policy-sigstore.yaml"
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: "cel-sigstore-keyless-verification"
spec:
  module: ghcr.io/kubewarden/policies/cel-policy:v1.0.0
  namespaceSelector:
    matchLabels:
      kubernetes.io/metadata.name: default
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations: ["CREATE", "UPDATE"]
  settings:
    variables:
      - name: containerImages
        expression: |
          object.spec.containers.map(c, c.image)
      - name: initContainerImages
        expression: |
          has(object.spec.initContainerImages) ? object.spec.initContainers.map(c, c.image) : []
      - name: containerImagesNotVerified
        expression: |
          variables.containerImages.filter(image, !kw.sigstore.image(image).githubAction("opencontainers").verify().isTrusted())
      - name: initContainerImagesNotVerified
        expression: |
          variables.initContainerImages.filter(image, !kw.sigstore.image(image).githubAction("opencontainers").verify().isTrusted())
    validations:
      - expression: |
          size(variables.containerImagesNotVerified) == 0
        messageExpression: "'These container images are not signed by the kubewarden GitHub organization: ' + variables.containerImagesNotVerified.join(', ')"
      - expression: |
          size(variables.initContainerImagesNotVerified) == 0
        messageExpression: "'These init container images are not signed by the kubewarden GitHub organization: ' + variables.initContainerImagesNotVerified.join(', ')"
```

As usual with CEL, we can add several `validations` under
`settings.validations`, and they are evaluated in parallel, joined with an AND
operation, which is short-circuited.

We can now deploy the policy, and try to deploy a Pod with unsigned images:

```console
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: golanci-lint-example
spec:
  containers:
  - name: nginx
    image: ghcr.io/opencontainers/golangci-lint:v1.52.1
    ports:
    - containerPort: 80
EOF
Error from server: error when creating "STDIN":
  admission webhook "clusterwide-cel-sigstore-keyless-verification.kubewarden.admission" denied the request:
  failed to verify image: Callback evaluation failure: no signatures found for image: ghcr.io/opencontainers/golangci-lint:v1.52.1
```
