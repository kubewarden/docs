# Monitor mode

When a policy is deployed on the cluster, it will start accepting,
rejecting or mutating requests. It's a binary operation, either the
policy is taking decisions on operations it targets, or it's not
installed at all.

In order to let users deploy a policy to a cluster, without
letting it take final decisions, the `monitor` mode has been included.

The `monitor` mode is a way to deploy policies to the cluster in a way
that:

1. All requests that go through the policy will be accepted, as if the
   policy didn't exist.
1. The policy result is traced in the `policy-server`
   normally. Details are included on whether the request would have
   been rejected, or if a mutation would have been proposed by the
   policy.
1. The `policy-server` metrics are updated normally, with the mode
   included in the metric baggage. Therefore, it's easy to filter policies by
   mode, and focus on the ones deployed via `monitor` mode.

The `mode` is an attribute included in the `ClusterAdmissionPolicy`
resource. It supports two modes: `monitor` and `protect`. If the
`mode` is omitted, it will be defaulted to `protect`.

In order to create a policy in monitor mode, all you need to do is to
include the mode as part of spec for the `ClusterAdmissionPolicy` resource as shown below:

```yaml
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-capabilities
spec:
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

## Transitioning policy mode

It's worth noting that certain attributes can be updated on policies
once they have been deployed.

For security purposes, a user with UPDATE permissions on
`ClusterAdmissionPolicy` resources can make the policy more
restrictive, so that:

- Transitioning the `mode` of an existing `ClusterAdmissionPolicy`
  from `monitor` to `protect` is allowed.

However,

- Transitioning the `mode` of an existing `ClusterAdmissionPolicy`
  from `protect` to `monitor` is **disallowed**, because it would mean
  that the policy is effectively disabled during the time that it
  would have been in `monitor` mode, until it was restored back to
  `protect` mode.

In order to change the `mode` of a `ClusterAdmissionPolicy` from
`protect` to `monitor`, it is required to delete the
`ClusterAdmissionPolicy` and recreate it in `monitor` mode. This
ensures that the user has permissions to remove policies.

## A note on mutating policies

Mutating policies in `monitor` mode are **not** going to produce a
mutation on the resource, since on `monitor` mode they are exclusively
going to log what would have their answer been, including the patch
that they would have produced had they been in `protect` mode.

It's important to take this into account, given that when a mutating
policy is in `monitor` mode, subsequent policies will evaluate a
*slightly* different resource than they will once the mutating policy
is in `protect` mode, given that the mutation that it produces has not
happened due to the mode being in `monitor` mode.
