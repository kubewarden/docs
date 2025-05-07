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
components in a Kubernetes cluster.

:::note
For more information about production configuration for self-managed
PolicyServers (not the default PolicyServer managed by the
`kubewarden-defaults` Helm chart), refer to the [policy server
documentation](/docs/howtos/policy-servers/03-production-deployments.md) guide.
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
controller deployment, audit scanner cronjob, and the default PolicyServer custom
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
deployment, audit scanner cronjob, and the default PolicyServer custom resource.

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
deployment, audit scanner cronjob, and the default PolicyServer custom resource.

The previous affinity configuration available in the `kubewarden-default` Helm
chart, which was used to define the affinity configuration for the PolicyServer
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
deployment pods, and the pods of the default PolicyServer custom resource.

The `.global.priorityClassName` value expects a name of an existing PriorityClass.
As an example, we could use:

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: kubewarden--high-priority
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
