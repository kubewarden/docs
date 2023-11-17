# Monitoring

Rancher has a Cluster Tool for Monitoring that leverages Grafana and Prometheus. You can utilize this tool and integrate it with Kubewarden to view overall metrics for a Policy Server or metrics pertaining to a given policy.

:::warning
Issues with Rancher Manager `v2.7.1` can cause issues with the Metrics dashboard view. Version `v2.7.2` or greater is recommended.  
:::

:::caution
You will need a cluster with at least 4 cores to install the Monitoring tool.
:::

## Prerequisites

The Prometheus Operator is required.
Follow [these instructions](../telemetry/metrics/01-quickstart.md#install-prometheus) to install it.

## Install

### 1. Create the ServiceMonitors

- Import the manifest to create the ServiceMonitors
- You need to specify the correct namespace where Kubewarden is installed 

> Adapted from [here](../telemetry/metrics/01-quickstart.md)

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: kubewarden-controller
  namespace: kubewarden
spec:
  endpoints:
    - interval: 10s 
      port: metrics
  namespaceSelector:
    matchNames:
      - kubewarden
  selector:
    matchLabels:
      app.kubernetes.io/name: kubewarden-controller
---
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: kubewarden-policy-server
  namespace: kubewarden
spec:
  endpoints:
    - interval: 10s
      port: metrics
  namespaceSelector:
    matchNames:
      - kubewarden
  selector:
    matchLabels:
      app: kubewarden-policy-server-default
```

### 2. Enable telemetry for your `rancher-kubewarden-controller` resource

- Navigate to Apps & Marketplace -> Installed Apps
- Select the `Edit/Upgrade` action for your `rancher-kubewarden-controller` resource
- Edit the YAML for `telemetry` to be `enabled: "true"` and ensure the metrics port is correct

```yml
telemetry:
  metrics:
    enabled: True
    port: 8080
```

:::note
You may need to redeploy your Monitoring resources for the new ConfigMap to be loaded. You can easily do this from Workloads -> Deployments. Select all the resources in the `cattle-monitoring-system` namespace and click on the `Redeploy` action.
:::

### 3. Create the Grafana Dashboard ConfigMap for Policies and Policy Server

:::note
This method is suited for air gapped installations
:::

The dashboards are unique between Policy Server and Policies, thus will need to be created separately.

Within the detail view for a Policy Server or a specific Policy:

- Navigate to the "Metrics" tab
- Follow the prompt to create the ConfigMap
- Reload the page to update the Grafana view (Grafana may be slow to acknowledge the new dashboard)

---

You should be able to view the metrics for a Policy Server or any given Policy on the detail page for each respective resource. You can also view the Kubewarden dashboards within the Grafana UI or the events from the Prometheus UI.
