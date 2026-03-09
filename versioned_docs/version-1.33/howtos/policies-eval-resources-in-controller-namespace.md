---
sidebar_label: Evaluations in the Admission Controller namespace
sidebar_position: 61
title: Allowing evaluations in the Admission Controller namespace
description: How to configure the Kubewarden Admission Controller to allow policy evaluation in its own namespace
keywords:
  [
    policies,
    ClusterAdmissionPolicies,
    ClusterAdmissionPoliciesGroup,
    configuration,
    namespaces,
  ]
doc-persona: [kubewarden-operator]
doc-type: [howto]
doc-topic: [operator-manual, policies]
---

# Allowing evaluations in the Admission Controller namespace

By default, the Kubewarden Admission Controller does not allow policies to
evaluate resources in its own namespace. This prevents misconfigurations that
could break the Kubewarden installation.

This safety measure is implemented in two layers. The first layer is controlled
by the `--always-accept-admission-reviews-on-deployments-namespace` CLI flag.
This flag, which is enabled by default in the Helm charts, makes the controller
configure the `KUBEWARDEN_ALWAYS_ACCEPT_ADMISSION_REVIEWS_ON_NAMESPACE`
environment variable in the PolicyServer deployments. This variable tells the
policy server to always accept admission reviews from the namespace defined in
the variable. The second layer is the admission controller itself, which by
default adds a namespace selector to cluster-wide policies to skip the
namespace where the controller runs.

However, in some scenarios cluster administrators might want policies to
evaluate resources in this namespace. This page explains how to do that by
disabling both layers of protection.

## Remove the PolicyServer protection environment variable

The first step is to configure the controller to not set the
`KUBEWARDEN_ALWAYS_ACCEPT_ADMISSION_REVIEWS_ON_NAMESPACE` environment variable
in the PolicyServer deployments.

To do this, upgrade your Kubewarden installation and set the
`alwaysAcceptAdmissionReviewsOnDeploymentsNamespace` value of the
`kubewarden-controller` Helm chart to `false`:

```console
helm upgrade -n kubewarden
  --set "alwaysAcceptAdmissionReviewsOnDeploymentsNamespace=false"
  kubewarden-controller kubewarden/kubewarden-controller
```

This change allows policy servers to evaluate resources from any namespace.
Once this is done, policies can be configured to evaluate admission reviews
from the Kubewarden namespace.

## Configure policies to evaluate resources in the Admission Controller namespace

To allow a policy to evaluate resources created in the Admission Controller
namespace, deploy cluster wide policies with the `allowInsideAdmissionControllerNamespace`
field in the spec set to `true`:

:::info[And the namespaced policies?]
This spec field is available only in cluster wide policies. As namespaced
policies evaluate resources in the same namespace where they are deploied, does
not make sense to add this field on their CRDs. Furthermore, the admission
controller namespace should be manage by a cluster operators which can decide
if they want to deploy a policy there or not.
:::

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  annotations:
    io.kubewarden.policy.category: PSP
    io.kubewarden.policy.severity: medium
  name: pod-privileged-policy
spec:
  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v1.0.10
  settings: {}
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
  mutating: false
  allowInsideAdmissionControllerNamespace: true
```

This configuration option, which is `false` by default, makes the controller
skip adding the namespace selector that excludes the Admission Controller
namespace, allowing the policy to evaluate resources from all namespaces,
including that namespace.

:::info[What about my custom namespace selectors?]
Policies CRDs also allow users to define their own namespace selectors. These
selectors are not changed. This means that if a user defines a selector that
skips the Kubewarden namespace, the policy will still ignore that namespace as
expected.
:::
