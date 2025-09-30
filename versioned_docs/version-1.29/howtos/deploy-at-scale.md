---
sidebar_label: Deployment at scale
title: "Kubewarden in a Large-Scale Environment"
description: "Kubewarden in a Large-Scale Environment"
sidebar_position: 21
keywords: [kubewarden, kubernetes, policyservers, production]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, policy-servers, production]
---

This section details a real-world deployment of Kubewarden in a demanding,
large-scale environment. It illustrates how to configure Kubewarden for
high availability and performance and what to expect under heavy load.

:::important
If you want to see more tips on how to run Kubewarden in production. Check out
[Production deployments](/docs/howtos/production-deployments.md)
documentation
:::

## Environment Overview

The infrastructure consists of approximately 20 Kubernetes clusters. The
largest of these clusters are characterized by significant size and resource
volume:

- Nodes: ~400
- Namespaces: ~4,000
- Managed Resources:
  - Pods: 10,000
  - RoleBindings: 13,000
  - Ingresses: 12,000
  - Deployments: 8,000
  - Services: 13,000

## Kubewarden Configuration

To meet the demands of this environment, Kubewarden is configured with a focus
on workload isolation and high availability.

- Policy Enforcement: 22 `ClusterAdmissionPolicies` are enforced across the
  clusters, with no namespace-specific `AdmissionPolicies`.
- PolicyServer Architecture: Two separate `PolicyServer` deployments are used to
  isolate workloads:
  1. One `PolicyServer` is dedicated exclusively to context-aware policies.
  2. A second `PolicyServer` handles all other, non-context-aware policies.
- Scalability and Resources:
  - Replicas: Each `PolicyServer` deployment runs 15 replicas to handle the high
    volume of requests.
  - Resource Allocation: Each replica is allocated 300 MB of memory and 4 CPU
    cores.

## Performance Metrics

This configuration successfully manages a high rate of admission requests while
maintaining predictable performance.

- Admission Request Throughput: The clusters handle up to 300 admission
  requests per second (including both webhook validations and audit scans).
- Policy Latency:
  - Typical Latency: Context-aware policies generally take around 500ms to
    execute.
  - Timeouts: In this high-throughput environment, webhook timeouts are
    configured at 2.5 seconds, while the `PolicyServer` timeout is set to 10
    seconds. While most requests are fast, the infrastructure is built to handle
    occasional slow operations without compromising the API server's stability.

## Audit Scanner Performance

The audit-scanner is utilized to ensure continuous compliance across the vast number of resources.

- Frequency: A cluster-wide audit is performed every 4 hours.
- Configuration: The audit job is tuned for maximum parallelism to reduce runtime:

```
    --parallel-namespaces: "10"
    --parallel-resources: "20"
    --parallel-policies: "20"
    --page-size: "1000"
```

- Audit Duration: Even on the largest cluster with tens of thousands of
  resources, a full audit job completes in approximately 70 minutes.
