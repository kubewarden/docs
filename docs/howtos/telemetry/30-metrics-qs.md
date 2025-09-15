---
sidebar_label: Metrics
title: Metrics quickstart
description: Metrics quickstart in Kubewarden.
keywords: [kubewarden, kubernetes, metrics quickstart]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, telemetry, metrics, quick-start]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/telemetry/metrics-qs"/>
</head>

This section documents how to enable metrics reporting on the Policy Server.

:::note

Before continuing, make sure you completed the previous
[OpenTelemetry](10-opentelemetry-qs.md#install-opentelemetry) section of this
book. You need it for this section to work correctly.

:::

You use [Prometheus](https://prometheus.io/) to collect metrics exposed by the
Policy Server.

## Install Prometheus

You use the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator),
that lets define Prometheus' targets.

There are many ways to install and set up Prometheus. For ease of deployment,
you should use the Prometheus community Helm chart.

The Prometheus Operator deployed with this Helm chart uses [Service
Monitors](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#servicemonitor)
to define which services Prometheus should monitor.

In your case, you are adding a ServiceMonitor targeting the `kubewarden`
namespace for services that match labels `app=kubewarden-policy-server-default`
and `app.kubernetes.io/name: kubewarden-controller`. This configures the
Prometheus Operator to inspect which Kubernetes endpoints belong to services
matching these conditions.

You can create two ServiceMonitors named `kubewarden-controller` and
`kubewarden-policy-server` for use by the default Prometheus instance installed
by the Helm chart. To do that, you should create the following values file:

```console
cat <<EOF > kube-prometheus-stack-values.yaml
prometheus:
  additionalServiceMonitors:
    - name: kubewarden
      selector:
        matchLabels:
          app: kubewarden-policy-server-default
      namespaceSelector:
        matchNames:
          - kubewarden
      endpoints:
        - port: metrics
          interval: 10s
    - name: kubewarden-controller
      selector:
        matchLabels:
          app.kubernetes.io/name: kubewarden-controller
      namespaceSelector:
        matchNames:
          - kubewarden
      endpoints:
        - port: metrics
          interval: 10s
EOF
```

You should install the Prometheus stack Helm chart:

:::note
At time of writing (2023-11-17) the latest chart version is `51.5.3`
:::

```console
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm install --wait --create-namespace \
  --namespace prometheus \
  --version 51.5.3 \
  --values kube-prometheus-stack-values.yaml \
  prometheus prometheus-community/kube-prometheus-stack
```

## Install Kubewarden

You can now install Kubewarden, in the recommended way, using Helm charts.

:::note
cert-manager is a requirement of OpenTelemetry, but you have already installed
it in a previous section of this book.
:::

First, you should add the Helm repository that contains Kubewarden:

```console
helm repo add kubewarden https://charts.kubewarden.io
```

Then you install the Custom Resource Definitions (CRDs) defined by
Kubewarden:

```console
helm install --wait \
  --namespace kubewarden --create-namespace \
  kubewarden-crds kubewarden/kubewarden-crds
```

Now you can deploy the rest of the Kubewarden stack. The official helm
chart creates a PolicyServer named `default`.

You should configure the Helm chart so that you have metrics enabled in
Kubewarden. The `kubewarden-values.yaml` file should have the following
contents:

```yaml
telemetry:
  mode: sidecar
  metrics: True
  sidecar:
    metrics:
      port: 8080
```

Now, install the helm charts:

```console
helm install --wait \
  --namespace kubewarden \
  --create-namespace \
  --values kubewarden-values.yaml \
  kubewarden-controller kubewarden/kubewarden-controller

helm install --wait \
  --namespace kubewarden \
  --create-namespace \
  kubewarden-defaults kubewarden/kubewarden-defaults \
  --set recommendedPolicies.enabled=True \
  --set recommendedPolicies.defaultPolicyMode=monitor
```

This creates the `default` instance of `PolicyServer`:

```console
kubectl get policyservers.policies.kubewarden.io
NAME      AGE
default   3m7s
```

By default, this policy server doesn't have metrics enabled.

## Accessing Prometheus

Prometheus exposes a UI that you can use to inspect metrics exposed by
different components within your Kubernetes cluster.

You can forward the Prometheus port so you can access it.

```console
kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-operated 9090
```

Now, you can visit Prometheus on port `9090` and perform a query, for example:
`kubewarden_policy_evaluations_total`. You see that the number of evaluations
grows over time as more requests go through the policy.

## Accessing Grafana

You can forward the Grafana service so you can access it.

```console
kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-grafana 8080:80
```

You can now login with the default username `admin` and password `prom-operator`.

### Using the Kubewarden Grafana dashboard

Kubewarden has a Grafana dashboard with basic metrics giving an overview about
how Kubewarden behaves in the cluster. This dashboard is available in the
GitHub releases of the Kubewarden `policy-server` repository as a [JSON
file](https://github.com/kubewarden/policy-server/releases/latest/download/kubewarden-dashboard.json)
or at the [Grafana website](https://grafana.com/grafana/dashboards/15314).

To import the dashboard into your environment, you can download the JSON file
from the Grafana website or the repository:

```console
curl https://github.com/kubewarden/policy-server/releases/latest/download/kubewarden-dashboard.json
```

Once you have the file you should access the Grafana dashboard and [import
it](https://grafana.com/docs/grafana/latest/dashboards/export-import/#import-dashboard).
Visit `/dashboard/import` in the Grafana dashboard and follow these steps:

1. Copy and paste the JSON file contents into the `Import via panel json` box in the Grafana UI.
1. Click the `Load` button.
1. Choose `Prometheus` as the source.
1. Click the `Import` button.

Another option is import it directly from the Grafana.com website. For this:

1. Copy the dashboard ID from the [dashboard
   page](https://grafana.com/grafana/dashboards/15314),
1. Paste it into the `Import via grafana.com` field.
1. Click the `load` button.
1. After importing the dashboard, define the Prometheus data source to use and
   finish the import process.

The Grafana dashboard has panes showing the state of all policies managed by
Kubewarden. It also has policy-specific panels.

You can obtain detailed metrics for a specific policy by changing the value of
the `policy_name` variable to match the required policy's name.

You should be able to see the dashboard similar to this:

![Dashboard](/img/grafana_dashboard.png)
