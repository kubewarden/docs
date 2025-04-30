---
sidebar_label: Production deployments
title: Configuring PolicyServers for production
description: Configuring PolicyServers for production
keywords:
  [
    kubewarden,
    kubernetes,
    policyservers,
    production,
    poddisruptionbudget,
    affinity,
    limits,
  ]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic:
  [
    operator-manual,
    policy-servers,
    production,
    poddisruptionbudget,
    affinity,
    limits,
  ]
---

PolicyServers are critical to the cluster. Reliability of them is important as
they process Admission Requests destined for the Kubernetes API via the Validating and
Mutating Webhooks.

As with other Dynamic Admission Controllers, this process happens before
requests reach the Kubernetes API server. Latency or service delays by
the Dynamic Admission Controller may introduce cluster inconsistency,
Denial of Service, or deadlock.

Kubewarden provides several ways to increase the reliability of PolicyServers.
Production deployments can vary a great deal, it is up to the operator to configure the deployment for their needs.

# PodDistruptionBudgets

The Kubewarden controller can create a
[PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
(PDB) for the policy-server Pods. This controls the range of policy-server
Pod replicas associated with the PolicyServer, ensuring high availability
and controlled eviction in case of node maintenance, scaling operations or
cluster upgrades.

This is achieved by setting `spec.minAvailable`, or `spec.maxUnavailable` of the
PolicyServer resource:

- `minAvailable`: specifies the minimum number of policy-server Pods
  that must be available at all times. Can be an integer or a percentage.

  Useful for maintaining the operational integrity of the PolicyServer,
  ensuring that policies are continuously enforced without interruption.

- `maxUnavailable`: specifies the maximum number of policy-server Pods that can
  be unavailable at any given time. Can be an integer or a percentage.

  Useful for performing rolling updates or partial maintenance without fully
  halting the policy enforcement mechanism.

:::note
You can specify only one of `maxUnavailable` and `minAvailable`.
:::

## Configuring minAvailable or maxUnavailable

Examples:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  minAvailable: 2 # ensure at least two policy-server Pods are available at all times
```

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  maxUnavailable: "30%" # ensure no more than 30% of policy-server Pods are unavailable at all times
```

# Affinity / Anti-affinity

The Kubewarden controller can set the affinity of policy-server Pods. This
allows constraint of Pods to specific nodes, or Pods against other Pods. For
more information on Affinity, see the [Kubernetes
docs](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity).

Kubernetes affinity configuration allows constraining Pods to nodes (via
`spec.affinity.nodeAffinity`) or constraining Pods with regards to other Pods
(via `spec.affinity.podAffinity`). Affinity can be set as a soft constraint
(with `preferredDuringSchedulingIgnoredDuringExecution`) or a hard one (with
`requiredDuringSchedulingIgnoredDuringExecution`).

Affinity / anti-affinity matches against specific labels, be it nodes' labels
(e.g: `topology.kubernetes.io/zone` set to `antarctica-east1`) or Pods labels.
Pods created from PolicyServer definitions have a label
`kubewarden/policy-server` set to the name of the PolicyServer. (e.g:
`kubewarden/policy-server: default`).

:::note
Inter-pod affinity/anti-affinity require substantial amounts of processing and
are not recommended in clusters larger than several hundred nodes.
:::

To configure affinity for a PolicyServer, set its `spec.affinity` field. This
field accepts a YAML object matching the contents of a Pod's `spec.affinity`.

## Configuring Affinity / Anti-affinity

Example: Spread the PolicyServer Pods across zones and hostnames

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector:
            matchExpressions:
              - key: kubewarden/policy-server
                operator: In
                values:
                  - your-policy-server
          topologyKey: topology.kubernetes.io/zone
        - labelSelector:
            matchExpressions:
              - key: kubewarden/policy-server
                operator: In
                values:
                  - your-policy-server
          topologyKey: kubernetes.io/hostname
```

Example: Only schedule PolicyServer pods in control-plane nodes

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector:
            matchExpressions:
              - key: kubewarden/policy-server
                operator: In
                values:
                  - your-policy-server
          topologyKey: node-role.kubernetes.io/control-plane
```

# Limits and Requests

The Kubewarden controller can set the resource limits and requests of
policy-server Pods. This specifies how much of each resource each of the
containers associated with the policy-server Pods needs. For PolicyServers,
only `cpu` and `memory` resources are relevant. See the [Kubernetes
docs](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes)
on resource units for more information.

This is achieved by setting the following PolicyServer resource fields:

- `spec.limits`: Limits on resources, enforced by the container runtime.
  Different runtimes can have different ways to implement the restrictions.
- `spec.requests`: Amount of resources to reserve for each container. It is
  possible and allowed for a container to use more resource than it's `request`.

  If omitted, it defaults to `spec.limits` if that is set (unless
  `spec.requests` of containers is set to some defaults via an admission
  mechanism).

:::note
Undercommitting resources of PolicyServers may cause reliability issues in the
cluster.
:::

## Configuring Limits and Requests

Example: Set hard limits for each policy-server container

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  limits:
    cpu: 500m
    memory: 1Gi
```
