---
sidebar_label: Open Telemetry
title: Open Telemetry quick start
description: An Open Telemetry quickstart for Kubewarden.
keywords: [kubewarden, kubernetes, opentelemetry, open telemetry, quickstart]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, telemetry, opentelemetry, quick-start]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/telemetry/opentelemetry-qs"/>
</head>

[OpenTelemetry](https://opentelemetry.io/) is a Cloud Native Computing
Foundation (CNCF) framework for observability. It enables your microservices to
provide metrics, logs, and traces.

Kubewarden's components using the OpenTelemetry SDK, report data to an
OpenTelemetry collector — called the agent.

This guide explains how to deploy the OpenTelemetry collector in `sidecar` mode
by using the official Kubernetes Helm chart.

This is a simple deployment pattern using OpenTelemetry. Its final setup looks
like this:

- Each Pod of the Kubewarden stack (Policy Server, Controller) has an
  OpenTelemetry sidecar.
- The sidecar receives tracing and monitoring information from the Kubewarden
  component via the OpenTelemetry Protocol (OTLP)
- The OpenTelemetry collector:
  - Sends the trace events to a central Jaeger instance
  - Exposes Prometheus metrics on a specific port

The Kubewarden Helm chart doesn't cover all the possible deployment scenarios
of the OpenTelemetry collector. It's also possible to configure Kubewarden to
send data to an OpenTelemetry collector deployed by the user. Documentation for
that scenario is in the [custom OpenTelemetry
guide](./40-custom-otel-collector.md).

You first deploy OpenTelemetry in a Kubernetes cluster, so you can use it in
the following sections addressing tracing and metrics.

## Setting up a Kubernetes cluster

> This section has step-by-step instructions to create a
> Kubernetes cluster for the telemetry quickstarts.
>
> Feel free to skip this section if you already have a Kubernetes
> cluster available.

You can create a testing Kubernetes cluster using
[minikube](https://minikube.sigs.k8s.io/docs/).

Minikube has many backends, for this case you can use the
[kvm2](https://minikube.sigs.k8s.io/docs/drivers/kvm2/) driver which relies on
libvirt.

Assuming `libvirtd` is correctly running on your machine, issue the following
command:

```console
minikube start --driver=kvm2
```

The command produces output similar to the following one:

```console
$ minikube start --driver=kvm2
😄  minikube v1.23.2 on Opensuse-Leap 15.3
✨  Using the kvm2 driver based on user configuration
👍  Starting control plane node minikube in cluster minikube
🔥  Creating kvm2 VM (CPUs=2, Memory=6000MB, Disk=20000MB) ...
🐳  Preparing Kubernetes v1.22.2 on Docker 20.10.8 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

After the cluster is ready, you can continue with the rest of the guide.

### Install Traefik

The next telemetry guides use [Traefik](https://traefik.io/traefik/) as the
Ingress controller when exposing the Jaeger UI with Kubernetes `Ingress`
resources.

Install Traefik by using its Helm chart:

```console
helm repo add traefik https://traefik.github.io/charts
helm repo update

helm install --wait \
  --namespace traefik \
  --create-namespace \
  traefik traefik/traefik
```

The next guides create a standard Kubernetes `Ingress` with
`ingressClassName: traefik` and route the Jaeger Query UI through the Traefik
Service.

If you prefer not to install Traefik, the tracing guides also keep
`kubectl port-forward` as a fallback to access Jaeger directly.

## Install OpenTelemetry {#install-opentelemetry}

:::note
See [Dependency matrix](reference/dependency-matrix.md) for the latest supported component versions.
:::

You use the [OpenTelemetry
Operator](https://github.com/open-telemetry/opentelemetry-operator) to manage
the automatic injection of the OpenTelemetry Collector sidecar into the
PolicyServer pod.

The OpenTelemetry Operator requires installation of
[cert-manager](https://cert-manager.io/docs/installation/) in the cluster.

```console
helm repo add jetstack https://charts.jetstack.io

helm install --wait \
    --namespace cert-manager \
    --create-namespace \
    --set crds.enabled=true \
    --version 1.18.2 \
    cert-manager jetstack/cert-manager
```

Once cert-manager is running, you can install the OpenTelemetry operator Helm chart:

```console
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts

helm install --wait \
  --namespace open-telemetry \
  --create-namespace \
  --version 0.97.1 \
  --set "manager.collectorImage.repository=ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector-contrib" \
  my-opentelemetry-operator open-telemetry/opentelemetry-operator
```

## OpenTelemetry integration

You can now move to the next chapters to enable application metrics (via
Prometheus integration) and application tracing (via Jaeger integration).
