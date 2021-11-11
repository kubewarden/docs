# Metrics

This section describes how to enable metrics reporting on the Policy Server.

> **Note well**: before continuing, make sure you completed the previous
> [OpenTelemetry](../opentelemetry/01-quickstart.md#install-opentelemetry) section of this book. It
> is required for this section to work correctly.

We are going to use [Prometheus](https://prometheus.io/) to scrape metrics exposed by the Policy
Server.

## Install Prometheus

We will use the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator),
that allows us to intuitively define Prometheus' Targets.

There are many ways to install and set up Prometheus. For ease of deployment, we will use the
Prometheus community helm chart.

Let's add the helm repository from the Prometheus Community:

```console
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

Now, let's install the
[`kube-prometheus-stack`](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)
chart. This chart contains a collection of Kubernetes manifests, Grafana dashboards, and Prometheus
rules.

Let's create a `kube-prometheus-stack-values.yaml` file to configure the `kube-prometheus-stack`
Helm chart values with the following contents:

```yaml
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
```

The `prometheus-operator` deployed as part of this Helm chart defines the concept of [Service
Monitors](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#servicemonitor),
used to declaratively define which services should be monitored by Prometheus.

In our case, we are adding a Service monitor targeting the `kubewarden` namespace, for services that
match labels `app=kubewarden-policy-server-default`. This way, the Prometheus Operator is able to
inspect which Kubernetes Endpoints are tied to services matching this conditions. The operator will
then take care of generating a valid configuration file for Prometheus, and reloading it
automatically after updating its configuration file.

```console
helm install --wait --create-namespace --namespace prometheus --values kube-prometheus-stack-values.yaml prometheus prometheus-community/kube-prometheus-stack
```

## Install Kubewarden

We can now install Kubewarden in the recommended way with the Helm chart.

> **Note well:** cert-manager is a requirement of Kubewarden, and OpenTelemetry is required for this
> feature, but we've already installed them in a previous section of this book.

As a first step, we have to add the Helm repository that contains Kubewarden:

```console
helm repo add kubewarden https://charts.kubewarden.io
```

Then we have to install the Custom Resource Definitions (CRDs) defined by
Kubewarden:

```console
helm install --wait --namespace kubewarden --create-namespace kubewarden-crds kubewarden/kubewarden-crds
```

Now we can deploy the rest of the Kubewarden stack. The official helm
chart will create a PolicyServer named `default`.

Let's configure the values of the Helm Chart so that the default
PolicyServer has metrics enabled. Write the `kubewarden-values.yaml` file:

```yaml
policyServer:
  telemetry:
    enabled: True
    metrics:
      port: 8080
```

Now, let's install the helm chart:

```console
helm install --wait --namespace kubewarden --values kubewarden-values.yaml kubewarden-controller kubewarden/kubewarden-controller
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

### Import a Grafana dashboard

We can visit `/dashboard/import` in the Grafana dashboard. We can now download the Grafana dashboard
we provide with the Policy Server:

```console
curl https://raw.githubusercontent.com/kubewarden/policy-server/main/kubewarden-dashboard.json
```

We can copy this contents, paste them in the `Import via panel json` box in the Grafana UI, and
click on the `Load` button and then click on `Import` after choosing `Prometheus` as the source.

As evaluations of resources happen, we will see them in the board.
