---
sidebar_label: "Distribute"
title: ""
---

# Distribute

Policies have to be annotated for them to be pushed, and eventually
executed by the Kubewarden `policy-server` in a Kubernetes cluster.

Annotating and distributing our Gatekeeper policy is very similar to
distributing an Open Policy Agent one. Let's go through it.

## Annotating the policy

We are going to write a `metadata.yaml` file in our policy directory
with contents:

```yaml
rules:
- apiGroups: [""]
  apiVersions: ["*"]
  resources: ["*"]
  operations: ["CREATE"]
mutating: false
contextAware: false
executionMode: gatekeeper
annotations:
  io.kubewarden.policy.title: no-default-namespace
  io.kubewarden.policy.description: This policy will reject any resource created inside the default namespace
  io.kubewarden.policy.author: The Kubewarden Authors
  io.kubewarden.policy.url: https://github.com/kubewarden/some-policy
  io.kubewarden.policy.source: https://github.com/kubewarden/some-policy
  io.kubewarden.policy.license: Apache-2.0
  io.kubewarden.policy.usage: |
      This policy is just an example.

      You can write interesting descriptions about the policy here.
```

As you can see, everything is the same as the Open Policy Agent
version metadata, except for the `executionMode: gatekeeper` bit.

Let's go ahead and annotate the policy:

```console
$ kwctl annotate policy.wasm --metadata-path metadata.yaml --output-path annotated-policy.wasm
```

## Pushing the policy

Let's push our policy to an OCI registry:

```console
$ kwctl push annotated-policy.wasm registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1
Policy successfully pushed
```

## Deploying on Kubernetes

We have to pull our policy to our `kwctl` local store first:

```console
$ kwctl pull registry://registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1
pulling policy...
```

We can now create a scaffold `ClusterAdmissionPolicy` resource:

```console
$ kwctl scaffold manifest registry://registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1 --type ClusterAdmissionPolicy
---
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: generated-policy
spec:
  module: "registry://registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1"
  settings: {}
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - "*"
      resources:
        - "*"
      operations:
        - CREATE
  mutating: false
```

We could now use this `ClusterAdmissionPolicy` resource to deploy our
policy to a Kubernetes cluster.
