---
sidebar_label: Dependency matrix
sidebar_position: 10
title: Dependency matrix
description: Dependency matrix of Kubewarden.
keywords: [dependency, dependencies, CRD, charts, matrix]
doc-persona: [kubewarden-all]
doc-type: [reference]
doc-topic: [operator-manual, dependencies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/dependency-matrix"/>
</head>

This page lists the dependencies of Kubewarden, with their relevant
version constraints. Versions outside of the provided ranges may work but are
not tested.

## Opentelemetry, metrics and tracing dependencies

At the time of writing, the [Opentelemetry](https://opentelemetry.io) stack
keeps improving. Still, is not yet stable, and unannounced
backwards-incompatible changes still happen. Kubewarden devs do their best to
track Opentelemetry stack changes and adjust to them. Kubewarden is tested against a known working
range of Opentelemetry, metrics and tracing stack.

## Optional dependencies

Needed for specific features.

| Chart dependency                                   | Helm chart `appVersion` |             Helm chart `version`             |      Feature      |
| -------------------------------------------------- | :---------------------: | :------------------------------------------: | :---------------: |
| `open-telemetry/opentelemetry-operator` chart      |       `>= 0.104`        |              Example: `0.65.0`               |       OTLM        |
| `prometheus-community/kube-prometheus-stack` chart |       `>= v0.69`        |              Example: `51.5.3`               |      Metrics      |
| `jaegertracing/jaeger-operator` chart              |      `>= 1.49 < 2`      |              Example: `2.49.0`               |      Tracing      |
| `kyverno/policy-reporter` chart                    |       `>= 2 < 3`        | In `kubewarden-controller` chart as subchart | Policy Reports UI |

| CRD dependency                      |  Version   |                 Helm chart `version`                 |    Feature    |
| ----------------------------------- | :--------: | :--------------------------------------------------: | :-----------: |
| `policyreports.wgpolicyk8s.io` CRDs | `v1alpha1` | In `kubewarden-defaults` chart or manually installed | Audit Scanner |

## Rancher

For downstream consumers such as Rancher, Kubewarden is tested against the
monitoring and tracing Helm charts provided in the Rancher charts repository.
