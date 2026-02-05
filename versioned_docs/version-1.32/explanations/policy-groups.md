---
sidebar_label: Policy Groups
sidebar_position: 21
title: Policy Groups
description: A description of Kubewarden policy groups
keywords: [kubewarden, policy groups, clusteradmissionpolicygroup, admissionpolicygroup]
doc-persona: [kubewarden-operator]
doc-type: [explanation]
doc-topic: [explanations, policy-group]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/explanations/policy-groups"/>
</head>

The policy group feature permits users to create complex policies by combining
simpler ones. It introduces two new Custom Resource Definitions
(CRDs):

- `AdmissionPolicyGroup`: for admission policies that apply to specific
  namespaces.
- `ClusterAdmissionPolicyGroup`: for admission policies that apply across the
  entire cluster.

These policy groups enable users to use existing policies, reducing the
need for custom policy creation and enhancing reuse. By avoiding
duplication of policy logic, users can simplify management and create custom
policies with a DSL-like configuration.

Policy groups enable the combined evaluation of
multiple policies using logical operators. This permits the definition of
complex logic. However, while ordinary policies
can include mutation logic to modify resources during admission, policy groups
only do validation.

Configuration for policy groups is similar to that of ordinary
policies. The difference is the addition of the `expression`,
`message`, and `policies` fields, and the declaration of context-aware
rules in a different location.

This is an example of a `ClusterAdmissionPolicyGroup` that you can use in
the next sections to explain the different fields:

<details>

<summary>
A `ClusterAdmissionPolicyGroup` that rejects Pods that use images with the
`latest` tag, unless the images are signed by two trusted parties: Alice and
Bob.
</summary>

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicyGroup # or AdmissionPolicyGroup
metadata:
  name: demo
spec:
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations:
        - CREATE
        - UPDATE
  policies:
    signed_by_alice:
      module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.3.0
      settings:
        modifyImagesWithDigest: false
        signatures:
          - image: "*"
            pubKeys:
              - |
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEyg65hiNHt8FXTamzCn34IE3qMGcV
                yQz3gPlhoKq3yqa1GIofcgLjUZtcKlUSVAU2/S5gXqyDnsW6466Jx/ZVlg==
                -----END PUBLIC KEY-----
    signed_by_bob:
      module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.3.0
      settings:
        modifyImagesWithDigest: false
        signatures:
          - image: "*"
            pubKeys:
              - |
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEswA3Ec4w1ErOpeLPfCdkrh8jvk3X
                urm8ZrXi4S3an70k8bf1OlGnI/aHCcGleewHbBk1iByySMwr8BabchXGSg==
                -----END PUBLIC KEY-----
    reject_latest:
      module: registry://ghcr.io/kubewarden/policies/trusted-repos:v0.2.0
      settings:
        tags:
          reject:
            - latest
  expression: "reject_latest() || (signed_by_alice() && signed_by_bob())"
  message: "the image is using the latest tag or is not signed by Alice and Bob"
```

</details>

## Main configuration fields

This section covers the main configuration fields of a policy group.

### The `policies` attribute

The policies field is a map of ordinary policies. Kubewarden calls policies by
the policy group, to determine whether to accept or reject the resource under
evaluation. The definitions of these policies are a simplified version of
ordinary Kubewarden policies, containing only the `module`, `settings` and
`contextAwareResources` attributes. These elements are necessary for the
policies to function within a policy group.

A unique name identifies each policy of the group policy. For example, the
following snippet defines three policies: `signed_by_alice`, `signed_by_bob`
and `reject_latest_tag`.

```yaml
policies:
  signed_by_alice:
    module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.8
    settings: {} # settings for the policy
  signed_by_bob:
    module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.8
    settings: {} # settings for the policy
  reject_latest_tag:
    module: ghcr.io/kubewarden/policies/trusted-repos-policy:v0.2.0
    settings: {} # settings for the policy
```

:::tip
A policy group can include the same policy multiple times with different settings.
:::

### The `expression` attribute

The `expression` attribute contains a statement made of the policy identifiers
joined together by logical operators.

The evaluation of the `expression` statement must evaluate to a boolean value.

Each policy is represented as a function named after the identifier specified
in the `.spec.policies` map. The results produced by the evaluation of the
policies are then evaluated using the logical operators provided by the user.

These are the supported operators:

- `&&`: used to perform `AND` operations
- `||`: used to perform `OR` operations
- `!`: used to perform `NOT` operations

You can use round brackets `( )` to define evaluation priorities.

For example, given the following expression:

```yaml
reject_latest() || (signed_by_alice() && signed_by_bob())
```

The policy rejects workloads that have images using the `latest` tag, unless
these images both by Alice and Bob have signed the images.

### The `message` attribute and the response format

The `message` field specifies the message returned when the evaluation of the
`expression` results in a rejection. The response includes the message,
together with the results of the individual policies evaluation.

:::info
Evaluation of policies that belong to the group takes place only
if necessary.

For example, given the following expression:

```yaml
reject_latest() || (signed_by_alice() && signed_by_bob())
```

The `signed_by_bob` and `signed_by_alice` policies aren't evaluated when the
`reject_latest` policy returns `true`.

In the same way, the `signed_by_bob` policy isn't evaluated if the
`signed_by_alice` and the `reject_latest` policies return `false`.

This avoids unnecessary evaluations of policies in the group and grants
fast responses to the admission requests.
:::

The system sends all evaluation details of the group policies as part of the
AdmissionResponse `.status.details.causes` when a group policy performs a
rejection.

You can obtain the full details of a rejected admission request by increasing
the verbosity level of `kubectl`:

```shell
kubectl -v4 apply -f signed-pod.yml
I0919 18:29:40.251332    4330 helpers.go:246] server response object: [{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "error when creating \"signed-pod.yml\": admission webhook \"clusterwide-demo.kubewarden.admission\" denied the request: the image is using the latest tag or is not signed by Alice and Bob",
  "details": {
    "causes": [
      {
        "message": "Resource signed is not accepted: verification of image testing.registry.svc.lan/busybox:latest failed: Host error: Callback evaluation failure: Image verification failed: missing signatures\nThe following constraints were not satisfied:\nkind: pubKey\nowner: null\nkey: |\n  -----BEGIN PUBLIC KEY-----\n  MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEswA3Ec4w1ErOpeLPfCdkrh8jvk3X\n  urm8ZrXi4S3an70k8bf1OlGnI/aHCcGleewHbBk1iByySMwr8BabchXGSg==\n  -----END PUBLIC KEY-----\nannotations: null\n",
        "field": "spec.policies.signed_by_bob"
      },
      {
        "message": "not allowed, reported errors: tags not allowed: latest",
        "field": "spec.policies.reject_latest"
      }
    ]
  },
  "code": 400
}]
Error from server: error when creating "signed-pod.yml": admission webhook "clusterwide-demo.kubewarden.admission" denied the request: the image is using the latest tag or is not signed by Alice and Bob
```

The full admission response is available in the logs of the Policy Server when
running in debug mode. Moreover, the evaluation details are always part of the
OpenTelemetry traces emitted by Policy Server.

## Context-aware policies

Another distinction between policy groups and ordinary policies is the
definition location of context-aware resource rules. Each policy in a group
accepts an optional `contextAwareResources` field to specify the resources that
the policy can access during evaluation. Similarly to ordinary policies, you
can only use context-aware capabilities by defining a
`ClusterAdmissionPolicyGroup`. This is for security reasons, as only
unprivileged users can deploy `AdmissionPolicyGroup` resources. For more
details, refer to the [context-aware policies](./context-aware-policies.md)
documentation.

<details>

<summary>
An example of a policy group that makes use of a context-aware policy.
</summary>

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicyGroup
metadata:
  name: demo-ctx-aware
spec:
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - services
      operations:
        - CREATE
        - UPDATE
  policies:
    unique_service_selector:
      module: registry://ghcr.io/kubewarden/policies/unique-service-selector-policy:v0.1.0
      contextAwareResources:
        - apiVersion: v1
          kind: Service
      settings:
        app.kubernetes.io/name: MyApp
    owned_by_foo_team:
      module: registry://ghcr.io/kubewarden/policies/safe-annotations:v0.2.9
      settings:
        mandatory_annotations:
          - owner
        constrained_annotations:
          owner: "foo-team"
  expression: "unique_service_selector() || (!unique_service_selector() && owned_by_foo_team())"
  message: "the service selector is not unique or the service is not owned by the foo team"
```

</details>

In the previous example, the `unique_service_selector` policy can
access the `Service` resource. However, the `owned_by_foo_team`
has no access to Kubernetes resources.

## Settings validation

When the policy server starts, it validates the settings of both policy
groups and ordinary policies. However, policy groups undergo an additional
validation step to check that the expression is valid and evaluates to a
boolean value.

## Audit Scanner

Similar to the AdmissionPolicy and ClusterAdmissionPolicy CRDs, the
`backgroundAudit` field indicates whether to include the policy group
during [audit checks](../explanations/audit-scanner/audit-scanner.md).

## Policy Server

You can extend the `policies.yml` settings file to include policy groups
alongside ordinary policies. As with ordinary policies, module download takes
place once. You use the same policy module in both a policy group and an
ordinary policy.
