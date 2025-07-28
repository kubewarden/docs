---
sidebar_label: Distribute
title: Distributing a Gatekeeper policy with Kubewarden
description: Distributing a Gatekeeper policy with Kubewarden.
keywords: [kubewarden, kubernetes, gatekeeper, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, gatekeeper, distribute]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/gatekeeper/distribute"/>
</head>

Policies have to be annotated for them to be pushed,
and eventually executed by the Kubewarden `policy-server` in a Kubernetes cluster.

Annotating and distributing a Gatekeeper policy is similar to distributing an Open Policy Agent one.

## Annotating the policy

You're going to write a `metadata.yaml` file in your policy directory with contents:

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
  io.kubewarden.policy.version: 0.1.0 # should match the OCI tag
  io.kubewarden.policy.description: This policy will reject any resource created inside the default namespace
  io.kubewarden.policy.author: The Kubewarden Authors
  io.kubewarden.policy.url: https://github.com/kubewarden/some-policy
  io.kubewarden.policy.source: https://github.com/kubewarden/some-policy
  io.kubewarden.policy.license: Apache-2.0
  io.kubewarden.policy.usage: |
    This policy is just an example.

    You can write interesting descriptions about the policy here.
```

you can see everything is the same as the Open Policy Agent version metadata,
except for the `executionMode: gatekeeper` bit.

Go ahead and annotate the policy:

```console
$ kwctl annotate policy.wasm --metadata-path metadata.yaml --output-path annotated-policy.wasm
```

## Pushing the policy

Push your policy to an OCI registry:

```console
$ kwctl push annotated-policy.wasm registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1
Policy successfully pushed
```

## Deploying on Kubernetes

You have to pull your policy to your `kwctl` local store first:

```console
$ kwctl pull registry://registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1
pulling policy...
```

You can now create a scaffold `ClusterAdmissionPolicy` resource:

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

Now use this `ClusterAdmissionPolicy` resource to deploy your policy to a Kubernetes cluster.
