---
sidebar_label: Context aware policies
title: Context aware policies
description: Context aware policies.
keywords: [kubewarden, kubernetes, policy specification, context aware policies]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic: [writing-policies, specification, context-aware-policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/context-aware-policies"/>
</head>

The `policy-server` has the capability to expose cluster information to
policies,
so that they can take decisions based on other existing resources,
and not only based on the details provided by the admission request.

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

## Support matrix

| Policy type | Support | Notes |
|-|:-:|-|
| Traditional programming languages | ✅ | - |
| Rego | ✅ | Since Kubewarden 1.9 release |
| WASI | ✅ | Since Kubewarden 1.10.0 release, only for Go SDK |

## Constraints

Kubewarden's priority is to reduce the number of queries done against the Kubernetes API server. Because of that two constraints have to be
considered:

- Memory usage: data fetched from Kubernetes is cached in memory by the Policy Server process. The more data is fetched, the more memory is going
  to be consumed by the Policy Server Pods.
- Consistency: the cache kept by Policy Server could contain stale data. New resources might be missing, deleted resources might still be
  available and changed ones could have old data. This could affect policy evaluation.

### Listing multiple resources

Kubewarden policies can fetch multiple resources at the same time. For example, they can make a query like
"get all the Pods defined inside of the `default` namespace that have the label `color` set to `green`".

When such a query is done, the Policy Server fetches all the resources matching the user criteria. Resources are fetched in batches to reduce the
load on the Kubernetes API server.
Before storing the resources in memory, the `managedFields` attribute of each resource is dropped to reduce the amount of memory consumed.
This attribute is not useful for policies and takes a significant amount of memory.

The Policy Server then creates a [Kubernetes watch](https://kubernetes.io/docs/reference/using-api/api-concepts/#efficient-detection-of-changes) to keep
the cached list of objects updated.
The Policy Server doesn't control the speed at which the Kubernetes API Server sends notifications about resource changes. This depends on different external
factors, like the number of watches created against the Kubernetes API server and its load.

Finally, the current code suffers from the following limitation. Given these two queries:

- `kubectl get pods -n default`
- `kubectl get pods -n default -l color=green`

Policy Server will create two watches and will duplicate all the Pods of the second query.
We will work to remove this limitation in future releases of Kubewarden.

### Fetching a specific resource

Kubewarden policies can get a specific resource defined inside of the cluster. For example, they can make a query like
"get the Pod named `psql-0` defined inside of the `db` namespace".

By default this query fetches the object and stores it inside of an in-memory cache. The cache entry is wiped after 5 seconds.
During this time window, the cached data is served to policies.

The policy author can also decide to make a direct query, one that skips the cache entirely. In this way, fresh data is always
served. This however can cause more load on the Kubernetes API server (depending on how frequently the policy is triggered)
and introduces more latency when evaluating an admission request.

The direct/cached query behavior can be configured on a per-query level by the policy author using the Kubewarden SDKs.

## ClusterAdmissionPolicies

ClusterAdmissionPolicies have the field
[spec.contextAwareResources](https://doc.crds.dev/github.com/kubewarden/kubewarden-controller/policies.kubewarden.io/ClusterAdmissionPolicy/v1#spec-contextAwareResources).
This field provides a list a `GroupVersionKind` resources that the policy needs to access.
This allows policy writers to ship the "permissions" that the policy needs together with the policy.
Moreover, this allows policy operators to review the "permissions" needed by the policy at deployment time.

### Testing context aware policies locally

As well as running policies in a cluster for end-to-end tests,
you can use the `kwctl` CLI utility to run policies and mock requests against the cluster.

For this, `kwctl run` can first record all the interactions with the cluster into a file:

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

With the replay session,
you can now simulate the cluster interactions without the need of a cluster,
which is ideal for CI and end-to-end tests:

```console
kwctl run \
    --allow-context-aware \
    -r request.json \
    --replay-host-capabilities-interactions replay-session.yml \
    annotated-policy.wasm
```

## Language SDKs

Language SDK's that support cluster context at the moment expose functions that allow policies to retrieve the current state of the cluster.

:::tip
If you want more information about the waPC function used by the SDKs, check the [Kubernetes capabilities](host-capabilities/06-kubernetes.md) reference documentation.
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

The context aware information is exposed under the `data.kubernetes` key,
like
[`kube-mgmt`](https://github.com/open-policy-agent/kube-mgmt)
does by default.

The inventory is populated with the resources the policy has been granted access to via the `spec.contextAwareResources` field.
