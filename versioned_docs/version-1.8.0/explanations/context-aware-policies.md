---
sidebar_label: "Context aware policies"
title: "Context aware policies"
description: A description of Kubewarden context aware policies, what they are and how they are useful.
keywords: [kubewarden, context-aware policy, clusteradmissionpolicy, admissionpolicy, admissionrequest, cluster administrator]
---

Developers can create policies that fetch information from a Kubernetes cluster at run time.
These are context aware policies.
Context aware policies can determine whether an `AdmissionRequest` is acceptable using information from resources deployed in the cluster.

:::note
Context aware policies are only available in Kubewarden versions ≥ v1.6.0.
:::

Resources a policy can access in the cluster is controlled by the policy server's [Service Account](https://kubernetes.io/docs/concepts/security/service-accounts/).
A cluster administrator controls what a policy can access via Kubernetes RBAC rules.
Context aware policies have only **read** access to the requested resources.

For security reasons, only `ClusterAdmissionPolicy` policies can fetch information from the Kubernetes cluster.
This is because `AdmissionPolicy` resources can be deployed by unprivileged users.
If a context aware policy is deployed as an `AdmissionPolicy` all attempts to access Kubernetes resources are blocked and reported to the cluster administrator.

By default, all the cluster resources are blocked.
A Kubewarden administrator defines which Kubernetes resources each context aware policy is allowed to read.
This is done in the `ClusterAdmissionPolicy` definition using the field `contextAwareResources` .

The following example deploys a policy that requires access to the `Deployment` and `Pod` resources:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: context-aware-policy
  namespace: default
spec:
  policyServer: default
  module: "registry://ghcr.io/kubewarden/policies/context-aware-policy:v1.0.0"
  settings: {}
  contextAwareResources:
    - apiVersion: "apps/v1"
      kind: "deployment"
    - apiVersion: "v1"
      kind: "pod"
  rules:
    - apiGroups: ["apps"]
      apiVersions: ["v1"]
      resources: ["deployment"]
      operations:
        - CREATE
        - UPDATE
  mutating: false
```

Once deployed, this policy can read the data of the `deployment` and `pod` resources.

Policy authors provide lists of Kubernetes resources for their context aware policy.
This is done by annotating the policy.
Kubewarden administrators view policy metadata using the `kwctl inspect` command.
They can get a list of resources the policy needs access to.
An administrator uses this list to populate the `ClusterAdmissionPolicy` definition.

:::danger
To prevent system abuse, Kubewarden administrators must review the resources the policy will access.

For example, a policy evaluating ingress objects would have good reasons to read the `Ingress` resources defined in the cluster.
The same policy can't justify having access to `Secret` resources.

Policies should have the least access needed to function correctly.

:::

:::note

Kubernetes resources are identified by `apiVersion` and `kind`.

Usually, `apiVersion` is a string in the format `<api>/<version>`.
Resources from the `core` API group (Pod, Service, and others) should not define the group name, `<api>`.
They should only define the `<version>` (for example, `v1`).

For a core resource, the first will not work, the second will.

```console
- apiVersion: "core/v1"
  kind: "pod"
```


```console
- apiVersion: "v1"
  kind: "pod"
```

All other Kubernetes resources need the full definition: `<api>/<version>`.

:::
