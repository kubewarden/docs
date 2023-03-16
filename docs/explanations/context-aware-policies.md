---
sidebar_label: "Context Aware Policies"
title: ""
---

# Context Aware Policies

Context aware policies allow policy authors to fetch information from the
Kubernetes cluster at evaluation time. This means that context aware policies can determine
whether a `AdmissionRequest` has to be accepted or rejected based on other resources already
deployed in the cluster.
For example, a policy could cross validate information among two different resources type.

:::caution
Context aware policies are available only in Kubewarden version v1.6.0 or greater.
:::


What a policy can access in the cluster is regulated by the [Service Account](https://kubernetes.io/docs/concepts/security/service-accounts/) of the Policy Server where the policy runs.
This allows the cluster administrator to control what a policy can access via traditional Kubernetes RBAC rules. Furthermore, context aware policies have only **read** access to the requested resources.

For security reasons, only `ClusterAdmissionPolicy` policies are able fetch information from the Kubernetes cluster. This has been done because `AdmissionPolicy` resources can be deployed by unprivileged users.
Therefore, if the policy is deployed in a Policy Server with broad access to the resources in the cluster, unprivileged users could get access to prohibited resources.
To avoid that, if a context aware policy is deployed as an `AdmissionPolicy` all the attempts to get access to Kubernetes resources will be blocked and reported to the cluster administrator.

By default, all the cluster resources are blocked. Thus, at deployment time, the Kubewarden administrator
must define which Kubernetes resources each context aware policy is allowed to read.
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

Policy authors can provide the list of Kubernetes resources accessed by their context aware policy by annotating the policy file. Kubewarden administrators can look into the policy metadata using the `kwctl inspect` command and obtain a list of Kubernetes resources the policy requires access to. This list can then be used to populate the `ClusterAdmissionPolicy` definition.

:::danger
Kubewarden administrators must review carefully the kind of resources the policy is going to access
to prevent system abuses.

For example, a policy evaluating Ingress objects would have very good reasons to read all the `Ingress`
resources already defined inside of the cluster. However it would be hard to justify why the same policy
would also require access to `Secret` resources.

When reviewing the list of resources a context aware policy wants to have access to, approach this process with the same mindset used when evaluating the privileges granted to a smart phone App you're about to install on your mobile device.
Would you install a torch App that requires access to your address book or your location?

While policies have read-only access to Kubernetes resources, a malicious attacker might abuse a Kubewarden policy to exfiltrate sensitive data from the cluster.
:::

:::note
Resources from the `core` API Group do not need to define the group name, only the version  (e.g. `v1`) is required.

All the remaining Kubernetes resources require the full definition: `groupName/groupVersion`.
:::

Once deployed, this policy will be able to read the data of the `deployment` and `pod` resources during its evaluations.

