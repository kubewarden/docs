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

This section describes how to enable metrics reporting on the Policy Server.

:::note
Before continuing, make sure you completed the previous
[OpenTelemetry](10-opentelemetry-qs.md#install-opentelemetry) section of this book. It
is required for this section to work correctly.
:::

We are going to use [Prometheus](https://prometheus.io/) to scrape metrics exposed by the Policy
Server.

## Install Prometheus

We will use the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator),
that allows us to define Prometheus' Targets intuitively.

There are many ways to install and set up Prometheus. For ease of deployment, we will use the
Prometheus community Helm chart.

Let's install the Prometheus stack Helm Chart:

:::note
At time of writing the latest chart version is `51.5.3`
:::

```console
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm install --wait --create-namespace \
  --namespace prometheus \
  --version 51.5.3 \
  --values kube-prometheus-stack-values.yaml \
  prometheus prometheus-community/kube-prometheus-stack
```

The `prometheus-operator` deployed as part of this Helm chart defines the concept of [Service
Monitors](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#servicemonitor),
to define which services should be monitored by Prometheus declaratively.

In our case, we are adding a ServiceMonitor targeting the `kubewarden` namespace for services that
match labels `app=kubewarden-policy-server-default` and `app.kubernetes.io/name: kubewarden-controller`.
This way, the Prometheus Operator can inspect which Kubernetes Endpoints are tied to services matching these conditions.

Let's create the two ServiceMonitors named `kubewarden-controller` and `kubewarden-policy-server` using the following manifests:

```yaml
kubectl apply -f - <<EOF
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
EOF
```

## Install Kubewarden

We can now install Kubewarden in the recommended way with Helm charts.

:::note
cert-manager is a requirement of OpenTelemetry, but we've already installed
them in a previous section of this book.
:::

As a first step, we have to add the Helm repository that contains Kubewarden:

```console
helm repo add kubewarden https://charts.kubewarden.io
```

Then we have to install the Custom Resource Definitions (CRDs) defined by
Kubewarden:

```console
helm install --wait \
  --namespace kubewarden --create-namespace \
  kubewarden-crds kubewarden/kubewarden-crds
```

Now we can deploy the rest of the Kubewarden stack. The official helm
chart will create a PolicyServer named `default`.

Let's configure the values of the Helm Chart so that we have metrics enabled
in Kubewarden. Write the `kubewarden-values.yaml` file with the following contents:

```yaml
telemetry:
  metrics:
    enabled: True
    port: 8080
```

Now, let's install the helm charts:

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

This leads to the creation of the `default` instance of `PolicyServer`:

```console
kubectl get policyservers.policies.kubewarden.io
NAME      AGE
default   3m7s
```

By default, this policy server will have metrics enabled.

## Accessing Prometheus

Prometheus exposes a very simple UI that we can use to inspect metrics exposed by different
components within our Kubernetes cluster.

We can forward the Prometheus port so we can easily access it.

```console
kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-operated 9090
```

Now, we can visit prometheus through port `9090` and perform a query, for example:
`kubewarden_policy_evaluations_total`. We will see that the number of evaluations will grow over
time as we produce more requests that go through the policy.

## Accessing Grafana

We can forward the Grafana service so we can easily access it.

```console
kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-grafana 8080:80
```

You can now login with the default username `admin` and password `prom-operator`.

### Using Kubewarden Grafana dashboard

The Kubewarden developers made available a Grafana dashboard with some basic metrics
that give an overview about how Kubewarden behaves inside of cluster. This dashboard
is available in the GitHub releases of the Kubewarden policy-server repository as a
[JSON file](https://github.com/kubewarden/policy-server/releases/latest/download/kubewarden-dashboard.json)
or in the [Grafana website](https://grafana.com/grafana/dashboards/15314).

To import the dashboard into your environment, you can download the JSON file
from the Grafana website or from the repository:

```console
curl https://github.com/kubewarden/policy-server/releases/latest/download/kubewarden-dashboard.json
```

Once you have the file in your machine you should access the Grafana dashboard and
[import it](https://grafana.com/docs/grafana/latest/dashboards/export-import/#import-dashboard).
Visit `/dashboard/import` in the Grafana dashboard and follow these steps:

1. Copy the JSON file contents and paste them into the `Import via panel json` box in the Grafana UI
2. Click the `Load` button
3. Choosing `Prometheus` as the source
4. Click the `Import` button

Another option is import it directly from the Grafana.com website. For this:

1. Copy the dashboard ID from the [dashboard page](https://grafana.com/grafana/dashboards/15314),
2. Paste it in the `Import via grafana.com` field
3. Click the `load` button.
4. After importing the dashboard, define the Prometheus data source to use and finish
   the import process.

The Grafana dashboard has panes showing the state of all
the policies managed by Kubewarden. Plus it has policy-specific panels.

Policy detailed metrics can be obtained by changing the value of the `policy_name`
variable to match the name of the desired policy.

You should be able to see the dashboard similar to this:

![Dashboard](/img/grafana_dashboard.png)
