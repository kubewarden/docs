---
sidebar_label: Monitoring
title: Monitoring
description: Monitoring and metrics for Kubewarden.
keywords: [kubewarden, kubernetes, user interface extension, metrics, monitoring]
doc-type: [howto]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-topic: [operator-manual, metrics-and-monitoring]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/ui-extension/metrics"/>
</head>

Rancher has a Cluster Tool for monitoring that leverages Grafana and Prometheus.
You can use this tool,
integrating it with Kubewarden,
to view overall metrics for a Policy Server or metrics for a given policy.

:::caution
You need a cluster with at least 4 cores to install the Monitoring tool.
:::

## Prerequisites

The Prometheus Operator is required.
Follow
[these instructions](../telemetry/30-metrics-qs.md#install-prometheus)
to install it.

## Install

### Create the ServiceMonitors

- Import the manifest to create the ServiceMonitors
- You need to specify the namespace where Kubewarden is installed

This is adapted from [here](../telemetry/30-metrics-qs.md):

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: kubewarden-controller
  namespace: cattle-kubewarden-system
spec:
  endpoints:
    - interval: 10s
      port: metrics
  namespaceSelector:
    matchNames:
      - cattle-kubewarden-system
  selector:
    matchLabels:
      app.kubernetes.io/name: kubewarden-controller
---
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: kubewarden-policy-server
  namespace: cattle-kubewarden-system
spec:
  endpoints:
    - interval: 10s
      port: metrics
  namespaceSelector:
    matchNames:
      - cattle-kubewarden-system
  selector:
    matchLabels:
      app: kubewarden-policy-server-default
```

### Enable telemetry for your `rancher-kubewarden-controller` resource

- Navigate to Apps & Marketplace → Installed Apps.
- Select the `Edit/Upgrade` action for your `rancher-kubewarden-controller` resource.
- Edit the YAML for `telemetry` to be `enabled: "true"` and ensure the metrics port is correct.

```yml
telemetry:
  metrics: true
  mode: sidecar
  sidecar:
    metrics:
      port: 8080
```

:::note
You may need to redeploy your Monitoring resources for the new ConfigMap to load.
You can do this from Workloads → Deployments.
Select all the resources in the `cattle-monitoring-system` namespace and select the `Redeploy` action.
:::

### Create the Grafana dashboard ConfigMap for Policies and Policy Server

:::note
This method is suitable for air gap installations
:::

The dashboards are unique between Policy Server and Policies,
so need separate creation.

Within the detail view for a Policy Server or a specific Policy:

- Navigate to the "Metrics" tab.
- Follow the prompt to create the ConfigMap.
- Reload the page to update the Grafana view
(Grafana may be slow to acknowledge the new dashboard).

You should be able to view the metrics for a Policy Server,
or any given Policy on the detail page for each respective resource.
You can also view the Kubewarden dashboards within the Grafana UI,
or the events from the Prometheus UI.
