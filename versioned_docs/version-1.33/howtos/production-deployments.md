---
sidebar_label: Production deployments
title: Configuring Kubewarden stack for production
description: Configuring Kubewarden stack for production
sidebar_position: 20
keywords:
  [
    kubewarden,
    kubernetes,
    policyservers,
    production,
    poddisruptionbudget,
    affinity,
    limits,
    tolerations,
    priorityclass,
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
    tolerations,
    priorityclass,
  ]
---

Kubewarden provides features for reliability and correct scheduling of its
components in a Kubernetes cluster. Some of the hints on this page come from Kubewarden
community members using Kubewarden at scale.

:::important
If you want to see a real example of running Kubewarden at scale check out the
[Kubewarden in a Large-Scale Environment](/docs/howtos/deploy-at-scale.md)
documentation page
:::

## Configuring Tolerations and Affinity/Anti-Affinity

By using the `tolerations` and `affinity` fields, operators can fine-tune the
scheduling and reliability of the Kubewarden stack to meet their specific
deployment needs and constraints. For more details on the exact fields and
their configurations, refer to the [Kubernetes documentation on Taints and
Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)
and [Affinity and
Anti-Affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity).

Starting from version 1.15 of the Kubewarden stack, the Kubewarden Helm charts
ship with two new values:

- `.global.tolerations`
- `.global.affinity`

These Helm chart values allow users to define Kubernetes tolerations and
affinity/anti-affinity settings for the Kubewarden stack, including the
controller deployment, audit scanner cronjob, and the default `PolicyServer` custom
resource.

### Tolerations

The `tolerations` value is an array where users can specify Kubernetes
tolerations for the Kubewarden components. Tolerations allow pods to be
scheduled on nodes with matching taints. This is useful for managing where pods
can be scheduled, especially in scenarios involving node maintenance, dedicated
workloads, or specific hardware requirements:

```yaml
global:
  tolerations:
    - key: "key1"
      operator: "Equal"
      value: "value1"
      effect: "NoSchedule"
    - key: "key2"
      operator: "Equal"
      value: "value2"
      effect: "NoExecute"
```

In this example, the tolerations defined are applied to the controller
deployment, audit scanner cronjob, and the default `PolicyServer` custom resource.

### Affinity/Anti-Affinity

The `affinity` value allows users to define Kubernetes affinity and
anti-affinity rules for the Kubewarden components. Affinity rules constrain
pods to specific nodes, while anti-affinity rules prevent pods from being
scheduled on certain nodes or in close proximity to other pods. These settings
are useful for ensuring high availability, fault tolerance, and optimized
resource usage in a cluster.

```yaml
global:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector:
            matchExpressions:
              - key: security
                operator: In
                values:
                  - S1
          topologyKey: topology.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: security
                  operator: In
                  values:
                    - S2
            topologyKey: topology.kubernetes.io/zone
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: kubernetes.io/os
                operator: In
                values:
                  - linux
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 1
          preference:
            matchExpressions:
              - key: label-1
                operator: In
                values:
                  - key-1
        - weight: 50
          preference:
            matchExpressions:
              - key: label-2
                operator: In
                values:
                  - key-2
```

In this example, the affinity rules will be applied to the controller
deployment, audit scanner cronjob, and the default `PolicyServer` custom resource.

The previous affinity configuration available in the `kubewarden-default` Helm
chart, which was used to define the affinity configuration for the `PolicyServer`
only, has been removed in favor of the global `affinity` value. This change
simplifies the configuration process by providing a single approach to
defining affinity and anti-affinity rules for all Kubewarden components.

:::warning The old `affinity` configuration in the `kubewarden-default` Helm
chart has been removed. Users should now use the
`.global.affinity` field to configure affinity and anti-affinity settings for
the entire Kubewarden stack.
:::

## Configuring priorityClasses

By using priorityClasses, operators can enforce a scheduling priority for the
workload pods of the Kubewarden stack. This ensures the Kubewarden workload is
available over other workloads, preventing eviction and ensuring service
reliability. For more information, refer to the [Kubernetes documentation on Priorityclasses](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/).

Starting from version 1.25 of the Kubewarden stack, the Kubewarden Helm charts
ship with a new value:

- `.global.priorityClassName`

The priorityClass defined by name in this value is applied to the controller
deployment pods, and the pods of the default `PolicyServer` custom resource.

The `.global.priorityClassName` value expects a name of an existing PriorityClass.
As an example, we could use:

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: kubewarden-high-priority
value: 1000000
globalDefault: false
description: "This priority class should be used for XYZ service pods only."
```

Kubernetes already ships with two PriorityClasses that are good candidates:
`system-cluster-critical` and `system-node-critical`. These are common classes
and are used to [ensure that critical components are always scheduled
first](https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/).

:::warning
If you delete a PriorityClass, existing Pods that use the name of the deleted
PriorityClass remain unchanged, but following Pods that use the
name of the deleted PriorityClass will not be created by Kubernetes.
:::

## `PolicyServer` production configuration

`PolicyServers` are critical to the cluster. Reliability of them is important as
they process Admission Requests destined for the Kubernetes API via the Validating and
Mutating Webhooks.

As with other Dynamic Admission Controllers, this process happens before
requests reach the Kubernetes API server. Latency or service delays by
the Dynamic Admission Controller may introduce cluster inconsistency,
Denial of Service, or deadlock.

Kubewarden provides several ways to increase the reliability of `PolicyServers`.
Production deployments can vary a great deal, it is up to the operator to configure the deployment for their needs.

### PodDisruptionBudgets

The Kubewarden controller can create a
[PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
(PDB) for the `PolicyServer` Pods. This controls the range of `PolicyServer`
Pod replicas associated with the `PolicyServer`, ensuring high availability
and controlled eviction in case of node maintenance, scaling operations or
cluster upgrades.

This is achieved by setting `spec.minAvailable`, or `spec.maxUnavailable` of the
`PolicyServer` resource:

- `minAvailable`: specifies the minimum number of `PolicyServer` Pods
  that must be available at all times. Can be an integer or a percentage.

  Useful for maintaining the operational integrity of the `PolicyServer`,
  ensuring that policies are continuously enforced without interruption.

- `maxUnavailable`: specifies the maximum number of `PolicyServer` Pods that can
  be unavailable at any given time. Can be an integer or a percentage.

  Useful for performing rolling updates or partial maintenance without fully
  halting the policy enforcement mechanism.

:::note
You can specify only one of `maxUnavailable` and `minAvailable`.
:::

### Configuring minAvailable or maxUnavailable

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

### Affinity / Anti-affinity

The Kubewarden controller can set the affinity of `PolicyServer` Pods. This
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
Pods created from `PolicyServer` definitions have a label
`kubewarden/policy-server` set to the name of the `PolicyServer`. (e.g:
`kubewarden/policy-server: default`).

:::note
Inter-pod affinity/anti-affinity require substantial amounts of processing and
are not recommended in clusters larger than several hundred nodes.
:::

To configure affinity for a `PolicyServer`, set its `spec.affinity` field. This
field accepts a YAML object matching the contents of a Pod's `spec.affinity`.

### Configuring Affinity / Anti-affinity

Example: Spread the `PolicyServer` Pods across zones and hostnames

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

Example: Only schedule `PolicyServer` pods in control-plane nodes

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

### Limits and Requests

The Kubewarden controller can set the resource limits and requests of
`PolicyServer` Pods. This specifies how much of each resource each of the
containers associated with the `PolicyServer` Pods needs. For `PolicyServers`,
only `cpu` and `memory` resources are relevant. See the [Kubernetes
docs](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes)
on resource units for more information.

This is achieved by setting the following `PolicyServer` resource fields:

- `spec.limits`: Limits on resources, enforced by the container runtime.
  Different runtimes can have different ways to implement the restrictions.
- `spec.requests`: Amount of resources to reserve for each container. It is
  possible and allowed for a container to use more resource than it's `request`.

  If omitted, it defaults to `spec.limits` if that is set (unless
  `spec.requests` of containers is set to some defaults via an admission
  mechanism).

:::note
Undercommitting resources of `PolicyServers` may cause reliability issues in the
cluster.
:::

#### Configuring Limits and Requests

Example: Set hard limits for each `PolicyServer` container

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

### PriorityClasses

The Kubewarden controller can set the PriorityClass used for the pods of
`PolicyServers`. This means `PolicyServer` workloads are scheduled with priority,
preventing eviction and ensuring service reliability. [See the Kubernetes docs
for more
information](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/).

:::warning
If you delete a PriorityClass, existing Pods that use the name of the deleted
PriorityClass remain unchanged, but following Pods that use the
name of the deleted PriorityClass will not be created by Kubernetes.
:::

### Configuring PriorityClasses

Example: Using the default `system-cluster-critical` priorityClass:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  priorityClassName: system-cluster-critical
```

### Isolate Policy Workloads

To ensure stability and high performance at scale, users can run separate
**`PolicyServer`** deployments to isolate different workloads.

- **Dedicate one `PolicyServer` to Context-Aware Policies:** These policies are
  more resource-intensive because they query the Kubernetes API server or other external
  services like Sigstore, OCI registries, among others. Isolating
  them prevents a slow policy from creating a bottleneck for other, faster
  policies.
- **Use another `PolicyServer` for All Other Policies:** Run regular,
  self-contained policies on a separate server to ensure low latency for the most
  common admission requests.

You can also considering splitting even further the workload. For example, if
you have some policies that are slow and require a bigger execution timeout,
consider move them into a dedicated `PolicyServer`. This way you ensure that
policies will not block the workers to evaluation other requests.

### Resource Allocation and Scaling

To handle high traffic and ensure availability, provide sufficient resources
and scale your replicas.

- **Allocate Sufficient Resources:** In high-traffic environments, allocate
  generous resources to each replica. Do not starve the `PolicyServers`, as
  insufficient CPU or memory is a primary cause of request timeouts. Remeber that
  `PolicyServers` will receive requests from control plane and the Kubewarden
  audit scanner
- **Scale for High Availability:** For deployments handling hundreds of
  requests per second, run a high number of replicas. This distributes the load
  effectively and ensures that the failure of a few pods does not impact the
  cluster's operation.

Start with a baseline of 3-5 replicas and monitor CPU and memory usage. Scale
the replica count as needed.

### Effective Auditing at Scale

To run audits efficiently on large clusters, fine-tune the audit scanner for
performance and parallelism.

- **Schedule Audits Periodically:** Running a scan frequently can be a good
  balance between catching configuration drift and minimizing load on the API
  server.
- **Tune Parallelism Aggressively:** The key to fast audits is parallelization.
  With high-parallelism settings, you can reduce audit times on massive clusters
  to just over an hour.

:::warning
It's important to remember that audit scanner sends requests to
`PolicyServers`. Therefore, its parallelism can impact on `PolicyServer`
performance. If you want to have an aggressive parallelism to reduce
the scan times in big clusters, you may need to increase the policy server
resouces available to avoid impacting the admission controller performance
:::

Set `disableStore: true` to reduce load if you consume audit results from logs
and do not require policy `Reports` nor `ClusterReports` custom resources in the cluster.
