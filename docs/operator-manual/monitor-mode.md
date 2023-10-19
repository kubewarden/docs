---
sidebar_label: "Monitor mode"
title: "Monitor mode"
description: The Kubewarden monitor mode and how to activate it.
keywords: [kubernetes, kubewarden, monitor mode]
---

After you deploy a policy on the cluster it starts accepting, rejecting or mutating requests.

There is a `monitor` mode so you can deploy a policy to a cluster without it immediately accepting, rejecting or mutating requests.

The `monitor` mode is a way to deploy policies to the cluster so that:

1. The policy accepts all requests, as if the policy wasn't installed.
1. The `policy-server` traces the policy normally.
Details are included in the trace on whether the request would have been rejected,
or if a mutation would have been proposed by the policy.
1. The `policy-server` metrics are updated normally, with the mode included in the metric baggage.
Therefore, it's easy to filter policies by mode, and focus on the ones deployed via `monitor` mode.

The `mode` is an attribute included in the `ClusterAdmissionPolicy` and `AdmissionPolicy` resources.
There are two values that the `mode` attribute can assume: `monitor` and `protect`.
The `mode` defaults to `protect` if omitted.

To create a policy in `monitor mode` you need include the `mode` as part of the specification of the resource.
For example, as highlighted, in this `ClusterAdmissionPolicy`:

```yaml
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-capabilities
spec:
// highlight-next-line
  mode: monitor
  policyServer: reserved-instance-for-tenant-a
  module: registry://ghcr.io/kubewarden/policies/psp-capabilities:v0.1.3
  rules:
  - apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["pods"]
    operations:
    - CREATE
    - UPDATE
  mutating: true
  settings:
    allowed_capabilities:
    - CHOWN
    required_drop_capabilities:
    - NET_ADMIN
```

## Changing policy mode

It's worth noting that you can update certain attributes on policies
that are already deployed.

For security purposes, a user with `UPDATE` permissions on policy resources can make the policy more restrictive.
This means that you can change the `mode` of an existing `ClusterAdmissionPolicy` or `AdmissionPolicy` from `monitor` to `protect`.

However, you can't change the `mode` of an existing `ClusterAdmissionPolicy` or `AdmissionPolicy` from `protect` to `monitor`.
Changing to `monitor` mode would 'switch off' the policy and so a security issue, until restored to `protect` mode.

So, to change the `mode` of a policy from `protect` to `monitor`,
you need to delete the policy and re-create it in `monitor` mode.
Switching a policy from `protect` to `monitor` is effectively the same as deleting the policy so this ensures that the user has policy delete permissions.

## A note on mutating policies

Mutating policies in `monitor` mode won't perform a mutation on the resource.
In `monitor` mode policies log what their action would have been.
They also log the mutation patch they would have produced in `protect` mode.

When a mutating policy is in `monitor` mode, later policies evaluate an unchanged, and so different resource, than when the mutating policy is in `protect` mode.
