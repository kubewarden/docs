---
sidebar_label: Configuring policies
sidebar_position: 30
title: Configuring policies
description: Dependency matrix of Kubewarden.
keywords:
  [
    policies,
    ClusterAdmissionPolicies,
    AdmissionPolicies,
    configuration,
    namespaces,
  ]
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

## Custom rejection message

When a policy rejects a resource, the error message shown to the user is
the error message returned by the policy. Sometimes cluster
operators may want to set custom reject messages, providing
instructions to users. You can do this using the `message` field in the
`ClusterAdmissionPolicy` and `AdmissionPolicy` types.

:::note
`ClusterAdmissionPolicyGroup` and `AdmissionPolicyGroup` also have the
`message` field. These policy types already use the `message` field as a rejection message.
:::

The `message` field lets cluster operators define a custom reject message
overriding the message returned by the policy. When using this configuration,
the original reject message returned by the policy is stored in the
`causes` field of the response.

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: pod-privileged-with-message
spec:
  module: registry://ghcr.io/kubewarden/policies/pod-privileged:latest
  policyServer: default
  mode: protect
  message: "Nops! You cannot do that"
  settings: {}
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - "*"
      operations:
        - CREATE
  mutating: false
```

When you deploy a privileged pod in the cluster, the user gets
tthis feedback:

```console
$ kubectl -v4 run pod-privileged2 --image=registry.k8s.io/pause --privileged
I0612 16:32:43.647601   48424 cert_rotation.go:137] Starting client certificate rotation controller
I0612 16:32:43.662550   48424 helpers.go:246] server response object: [{
  "metadata": {},
  "status": "Failure",
  "message": "admission webhook \"clusterwide-pod-privileged-with-message.kubewarden.admission\" denied the request: Nops! You cannot do that",
  "details": {
    "causes": [
      {
        "message": "Privileged container is not allowed"
      }
    ]
  },
  "code": 400
}]
```
