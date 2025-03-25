---
sidebar_label: Distribute
title: Distributing an OPA policy with Kubewarden
description: Distributing an OPA policy with Kubewarden.
keywords: [kubewarden, kubernetes, distributing, open policy agent, opa, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, open-policy-agent, distribute]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/open-policy-agent/distribute"/>
</head>

You have written, built and run your Rego policy.
Now it's time to distribute the policy.

Policies have to be annotated, so they can run in the `policy-server`.
The `policy-server` is the part that executes the policies,
when running in a Kubernetes cluster.

## Annotating the policy

Annotating a policy is a process that enriches the policy metadata with relevant information.
Information like authorship, license, source code location, rules,
that describe what kind of resources this policy understands and evaluates.

To annotate your policy you need to write a `metadata.yaml` file:

```yaml
rules:
  - apiGroups: [""]
    apiVersions: ["*"]
    resources: ["*"]
    operations: ["CREATE"]
mutating: false
contextAware: false
executionMode: opa
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

You can see several details:

- Rules:
  What resources this policy is targeting.
- Mutating:
  Whether this policy is mutating.
  In this case, it is just validating.
- Context aware:
  Whether this policy requires context from the cluster to evaluate the request.
- Execution mode:
  Since this is a Rego policy it's mandatory to specify what execution mode it expects,
  `opa` or `gatekeeper`.
  This policy is written in the `opa` style, returning a whole `AdmissionReview` object.
- Annotations: Metadata stored in the policy itself.

Go ahead and annotate your policy:

```console
$ kwctl annotate policy.wasm --metadata-path metadata.yaml --output-path annotated-policy.wasm
```

Now you can inspect the policy by running `kwctl inspect annotated-policy.wasm`.

## Pushing the policy

Now that the policy is annotated you can push it to an OCI registry.

```console
$ kwctl push annotated-policy.wasm registry.my-company.com/kubewarden/no-default-namespace:v0.0.1
Policy successfully pushed
```

Your Rego policy, targeting the OPA framework,
has everything it needs, to be deployed in production,
by creating a `ClusterAdmissionPolicy`.
You can prepare that as well.
First you need to pull the policy into the `kwctl` local store:

```console
$ kwctl pull registry://registry.my-company.com/kubewarden/no-default-namespace:v0.0.1
pulling policy...
```

Create a `ClusterAdmissionPolicy` from it.
This operation takes into account the metadata it has about the policy:

```console
$ kwctl manifest registry://registry.my-company.com/kubewarden/no-default-namespace:v0.0.1 --type ClusterAdmissionPolicy
---
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: generated-policy
spec:
  module: "registry://registry.my-company.com/kubewarden/no-default-namespace:v0.0.1"
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

You can now use this `ClusterAdmissionPolicy` as a base to target the resources that you want,
or deploy to Kubernetes as is.
