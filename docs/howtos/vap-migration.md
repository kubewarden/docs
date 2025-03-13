---
sidebar_label: ValidatingAdmissionPolicy migration
sidebar_position: 41
title: ValidatingAdmissionPolicy migration
description: Discusses how to migrate from Kubernetes VAP policies to Kubewarden.
keywords: [kubewarden, kubernetes, cel, vap, validatingadmissionpolicy]
doc-persona: [kubewarden-user, kubewarden-operator, kubewarden-distributor, kubewarden-integrator]
doc-type: [howto]
doc-topic: [vap-migration]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/vap-migration"/>
</head>

Starting from Kubernetes v1.26, the [ValidatingAdmissionPolicy](https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/)
provides a way to write custom admission policies in Kubernetes. The policies are
written with the [Common Expression Language (CEL)](https://cel.dev/), extended with
some [Kubernetes-specific extensions](https://kubernetes.io/docs/reference/using-api/cel/).
ValidatingAdmissionPolicy reached stability in Kubernetes v1.30.

Kubewarden provides a CEL policy that is capable of running Kubernetes VAP policies without any modifications.
You can read more about the CEL policy in [this section](../tutorials/writing-policies/CEL/01-intro-cel.md) of Kubewarden's documentation.
[This paragraph](../tutorials/writing-policies/CEL/intro-cel#benefits-of-kubewardens-cel-policy-in-comparison-with-validatingadmissionpolicies)
explains the benefits of running VAP policies using Kubewarden.

This howto explains how the `kwctl` tool can be used to migrate a VAP policy to Kubewarden.

## Migration steps

:::note
You must use `kwctl` version 1.14.0 or later to follow this guide.
:::

Given a file containing this YAML definition of a `ValidatingAdmissionPolicy`:

<details>

<summary>`ValidatingAdmissionPolicy` definition</summary>

```yaml title="vap.yml"
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "force-liveness-probe"
spec:
  failurePolicy: Fail
  variables:
    - name: containers_without_liveness_probe
      expression: |
        object.spec.template.spec.containers.filter(c, !has(c.livenessProbe)).map(c, c.name)
  matchConstraints:
    resourceRules:
      - apiGroups: ["apps"]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["deployments"]
  validations:
    - expression: |
        size(variables.containers_without_liveness_probe) == 0
      messageExpression: |
        'These containers are missing a liveness probe: ' + variables.containers_without_liveness_probe.join(' ')
      reason: Invalid
```

</details>

And a file containing the `ValidatingAdmissionPolicyBinding` resource:

<details>

<summary>`ValidatingAdmissionPolicyBinding` definition</summary>

```yaml title="vap-binding.yml"
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "kw-scaffold-demo"
spec:
  policyName: "force-liveness-probe"
  validationActions: [Deny]
  matchResources:
    namespaceSelector:
      matchLabels:
        docs.kubewarden.io/vap-migration: enabled
```

</details>

You can migrate the policy to Kubewarden by following these steps:

<details>

<summary>`kwctl` command for policy migration</summary>

```shell
$ kwctl scaffold vap \
    -p vap.yml \
    -b vap-binding.yml
```

</details>

The command produces output similar to this:

<details>

<summary>Output from the migration</summary>

```shell
2024-06-24T16:00:16.516062Z  WARN kwctl::scaffold: Using the 'latest' version of the CEL policy could lead to unexpected behavior. It is recommended to use a specific version to avoid breaking changes.
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: kw-scaffold-demo
spec:
  module: ghcr.io/kubewarden/policies/cel-policy:latest
  settings:
    variables:
    - expression: |
        object.spec.template.spec.containers.filter(c, !has(c.livenessProbe)).map(c, c.name)
      name: containers_without_liveness_probe
    validations:
    - expression: |
        size(variables.containers_without_liveness_probe) == 0
      messageExpression: |
        'These containers are missing a liveness probe: ' + variables.containers_without_liveness_probe.join(' ')
      reason: Invalid
  rules:
  - apiGroups:
    - apps
    apiVersions:
    - v1
    resources:
    - deployments
    operations:
    - CREATE
    - UPDATE
  mutating: false
  failurePolicy: Fail
  namespaceSelector:
    matchLabels:
      docs.kubewarden.io/vap-migration: enabled
```

:::note
The command warns the user about the usage of the `latest` version of the CEL policy.
It is recommended to use a specific version to avoid breaking changes.

This can be done using the `--cel-policy` flag, like this:

```shell
$ kwctl scaffold vap \
    --cel-policy ghcr.io/kubewarden/policies/cel-policy:v1.0.1 \
    -p vap.yml \
    -b vap-binding.yml
```

:::

</details>
