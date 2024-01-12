---
sidebar_label: "Context Aware Policies"
title: ""
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/writing-policies/spec/context-aware-policies"/>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Context aware policies

The `policy-server` has capabilities to expose cluster information to
policies, so that they can take decisions based on other existing
resources, and not only based on the details provided by the admission request.

The retrieval of Kubernetes resources is performed by the Policy Server hosting the policy.
Access to Kubernetes is regulated by RBAC rules applied to the Service Account used by the Policy Server.

The `default` Policy Server deployed by Kubewarden helm charts has access to the following Kubernetes resources:

- Namespaces
- Services
- Ingresses

:::caution
The policy server performs caching of the results obtained from the Kubernetes API server to reduce the amount of load on this core part of Kubernetes.
That means some information might be stale or missing.
:::

## Support Matrix

| Policy type                       | Support | Notes                                  |
| --------------------------------- | :-----: | -------------------------------------- |
| Traditional programming languages |   ✅    | -                                      |
| Rego                              |   ✅    | Available since Kubewarden 1.9 release |
| WASI                              |   ❌    | -                                      |

## ClusterAdmissionPolicies

ClusterAdmissionPolicies have the field [spec.contextAwareResources](https://doc.crds.dev/github.com/kubewarden/kubewarden-controller/policies.kubewarden.io/ClusterAdmissionPolicy/v1#spec-contextAwareResources). This field provides a list a `GroupVersionKind` resources that the policy needs to access. This allows policy writers to ship the "permissions" that the policy needs together with the policy. Moreover, this allows policy operators to review the "permissions" needed by the policy at deployment time.

### Testing context aware policies locally

Apart from running policies in cluster for end-to-end tests, one can use our `kwctl` CLI utility to run policies and mock requests against the cluster.

For that, `kwctl run` can first record all the interactions with the cluster into a file:

```console
kwctl run \
    --allow-context-aware \
    -r request.json \
    --record-host-capabilities-interactions replay-session.yml \
    annotated-policy.wasm
```

which creates the following `replay-session.yml` file:

```yaml
# replay-session.yml
---
- type: Exchange
  request: |
    !KubernetesGetResource
    api_version: /v1
    kind: Pod
    name: p-testing
    namespace: local
    disable_cache: true
  response:
    type: Success
    payload: '{"apiVersion":"","kind":"Pod", <snipped> }'
```

With the replay session, one can now mock the cluster interactions without the need
of a cluster, perfect for CI and end-to-end tests:

```console
kwctl run \
    --allow-context-aware \
    -r request.json \
    --replay-host-capabilities-interactions replay-session.yml \
    annotated-policy.wasm
```

## Language SDKs

Language SDK's that support cluster context at this time will expose
functions that allow policies to retrieve the current state of the
cluster.

:::tip
If you want more information about the waPC function used by the SDKs, check the [Kubernetes capabilities](/docs/writing-policies/spec/host-capabilities/06-kubernetes.md) reference documentation.
:::

### Rust

See the functions exposing this functionality at the [Rust SDK reference docs](https://docs.rs/kubewarden-policy-sdk/0.8.7/kubewarden_policy_sdk).

### Go

See the functions exposing this functionality at the [Go SDK reference docs](https://pkg.go.dev/github.com/kubewarden/policy-sdk-go).

## Rego policies

### Gatekeeper

The context aware information is exposed under the `data.inventory` key, like Gatekeeper does.

The inventory is populated with the resources the policy has been granted access to via the `spec.contextAwareResources` field.

### Open Policy Agent

The context aware information is exposed under the `data.kubernetes` key, like
[`kube-mgmt`](https://github.com/open-policy-agent/kube-mgmt) does by default.

The inventory is populated with the resources the policy has been granted access to via the `spec.contextAwareResources` field.
