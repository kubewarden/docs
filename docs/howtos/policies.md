---
sidebar_label: Configuring policies
sidebar_position: 30
title: Configuring policies
description: Dependency matrix of Kubewarden.
keywords: [policies, ClusterAdmissionPolicies, AdmissionPolicies, configuration, namespaces]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/policies"/>
</head>

## Skipping namespaces for a specific policy

By default, policies apply to all Namespaces that the `PolicyServer` is configured for.
If you want a policy to target only specific namespaces, you can deploy several `AdmissionPolicies` in each Namespace.

Another option is to configure `ClusterAdmissionPolicies` by setting their
`spec.namespaceSelector` (see [CRD docs](../reference/CRDs#clusteradmissionpolicy)). The
`spec.namespaceSelector` decides whether to run the policy on an object, based
on whether the namespace for that object matches the selector.

For example, here is a policy that only targets the `kube-system` and `my-namespace` Namespaces:

```yaml
---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psa-enforcer-privileged-namespaces
spec:
  module: registry://ghcr.io/kubewarden/policies/psa-label-enforcer:v0.1.1
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["namespaces"]
      operations:
        - CREATE
        - UPDATE
  mutating: true
  namespaceSelector:
    matchExpressions:
      - key: "kubernetes.io/metadata.name"
        operator: In
        values: [kube-system, my-namespace]
  settings:
    modes:
      enforce: "privileged"
```

Here is a policy that targets all the Namespaces besides the `kube-system` and `my-namespace`:

```yaml
---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psa-enforcer-default-mode
spec:
  module: registry://ghcr.io/kubewarden/policies/psa-label-enforcer:v0.1.1
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["namespaces"]
      operations:
        - CREATE
        - UPDATE
  mutating: true
  namespaceSelector:
    matchExpressions:
      - key: "kubernetes.io/metadata.name"
        operator: NotIn
        values: [kube-system, my-namespace]
  settings:
    modes:
      enforce: "restricted"
```
