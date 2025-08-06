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

## OpenTelemetry, metrics and tracing dependencies

At the time of writing, the [OpenTelemetry](https://opentelemetry.io) stack
keeps improving. However, it's not yet stable, and unannounced
backwards-incompatible changes still happen. The Kubewarden developers endeavor
to track OpenTelemetry stack changes and adjust to them. The project tests
against a known working range of OpenTelemetry, metrics and tracing stack.

## Optional dependencies

Needed for specific features.

| Chart dependency                                   | Helm chart `appVersion` |             Helm chart `version`             |      Feature      |
| -------------------------------------------------- | :---------------------: | :------------------------------------------: | :---------------: |
| `open-telemetry/opentelemetry-operator` chart      |       `>= 0.104`        |              Example: `0.92.3`               |       OTEL        |
| `prometheus-community/kube-prometheus-stack` chart |       `>= v0.69`        |              Example: `75.17.1`               |      Metrics      |
| `jaegertracing/jaeger-operator` chart              |      `>= 1.49 < 2`      |              Example: `2.57.0`               |      Tracing      |
| `kyverno/policy-reporter` chart                    |       `>= 2 < 4`        | In `kubewarden-controller` chart as subchart | Policy Reports UI |

| CRD dependency                      |  Version   |                 Helm chart `version`                 |    Feature    |
| ----------------------------------- | :--------: | :--------------------------------------------------: | :-----------: |
| `policyreports.wgpolicyk8s.io` CRDs | `v1alpha1` | In `kubewarden-defaults` chart or manually installed | Audit Scanner |

## Rancher

Kubewarden tests against the monitoring and tracing Helm charts provided in the
Rancher charts repository.
