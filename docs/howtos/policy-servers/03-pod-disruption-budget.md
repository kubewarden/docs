---
sidebar_label: Defining PodDisruptionBudget
title: Configuring PodDisruptionBudget for PolicyServers
description: Configuring PodDisruptionBudget for Kubewarden PolicyServers.j
keywords: [kubewarden, kubernetes, policyservers, poddisruptionbudget]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, policy-servers, poddisruptionbudget]
---

To enhance the resilience of Kubewarden policy server deployments, two fields
can be used: `minAvailable` and `maxUnavailable`. These fields are used by the
Kubewarden controller to create a
[PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
(PDB) for the policy server pods, thus ensuring high availability and
controlled eviction in case of node maintenance or scaling operations.

## Understanding minAvailable and maxUnavailable 

The `minAvailable` field specifies the minimum number of policy server pods
that must be available at all times. This is crucial for maintaining the
operational integrity of the Kubewarden policy server, ensuring that policies
are continuously enforced without interruption. It can be defined as an integer or a
percentage.

When set, the Kubewarden controller creates a `PodDisruptionBudget` object that prevents
voluntary disruptions from causing the number of available replicas to fall
below this threshold. This is particularly important during operations such as
cluster upgrades or maintenance.

The `maxUnavailable` field dictates the maximum number of policy server pods
that can be unavailable at any given time. This setting allows for a controlled
degree of unavailability, which can be useful for performing rolling updates or
partial maintenance without fully halting the policy enforcement mechanism. It 
can also be defined as integer or percentage.

When configured, it informs the creation of a `PodDisruptionBudget` object that limits
the number of pods that can be voluntarily disrupted. This ensures that even
during disruptions, a certain level of service is maintained.

## Configuring minAvailable and maxUnavailable

When deploying or updating the Kubewarden policy server, you can specify these
fields in your configuration to ensure the desired level of availability. It's
important to note that you can specify only one of `maxUnavailable` and
`minAvailable`.

``` yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  minAvailable: 2
```

This configuration ensures that either at least two policy server pods are
available at all times.

In the same way, you can specify the `maxUnavailable` field to ensure that no
more than 30% of the policy server pods are unavailable at any given time.

``` yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: your-policy-server
spec:
  # Other configuration fields
  maxUnavailable: "30%"
```
