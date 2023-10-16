---
sidebar_label: "Open Telemetry Quickstart"
title: ""
---

# OpenTelemetry

[OpenTelemetry](https://opentelemetry.io/) is a Cloud Native Computing Foundation framework for
observability. It enables your microservices to provide metrics, logs and traces.

Kubewarden's components are instrumented with the OpenTelemetry SDK, reporting data to an
OpenTelemetry collector -- called the agent.

By following this documentation, we will integrate OpenTelemetry using the following architecture:

- Each Pod of the Kubewarden stack will have a OpenTelemetry sidecar.
- The sidecar receives tracing and monitoring information from the Kubewarden component via the OpenTelemetry Protocol (OTLP)
- The OpenTelemetry collector will:
  - Send the trace events to a central Jaeger instance
  - Expose Prometheus metrics on a specific port

For more information about the other deployment modes, please refer to the [OpenTelemetry official
documentation](https://opentelemetry.io/docs/).

Let's first deploy OpenTelemetry in a Kubernetes cluster, so we can reuse it in the next sections
that will address specifically tracing and metrics.

## Setting up a Kubernetes cluster

> This section gives step-by-step instructions to create a
> Kubernetes cluster with an ingress controller enabled.
>
> Feel free to skip this section if you already have a Kubernetes
> cluster where you can define Ingress resources.

We are going to create a testing Kubernetes cluster using [minikube](https://minikube.sigs.k8s.io/docs/).

minikube has many backends, in this case we will use the
[kvm2](https://minikube.sigs.k8s.io/docs/drivers/kvm2/) driver
which relies on libvirt.

Assuming `libvirtd` is properly running on your machine, issue the
following command:

```console
minikube start --driver=kvm2
```

The command will produce an output similar to the following one:

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

Now we have to enable the Ingress addon:

```console
minikube addons enable ingress
```

This will produce an output similar to the following one:

```console
$ minikube addons enable ingress
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.0
    ▪ Using image registry.k8s.io/ingress-nginx/controller:v1.0.0-beta.3
    ▪ Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.0
🔎  Verifying ingress addon...
🌟  The 'ingress' addon is enabled
```

## Install OpenTelemetry

We are going to use the [OpenTelemetry Operator](https://github.com/open-telemetry/opentelemetry-operator)
to manage the automatic injection of the OpenTelemetry Collector sidecar
inside of the PolicyServer pod.

The OpenTelemetry Operator requires [cert-manager](https://cert-manager.io/docs/installation/)
to be installed inside of the cluster.

At the time of writing, only specific versions of OpenTelemetry are compatible
with Cert Manager, [see the compat chart](https://github.com/open-telemetry/opentelemetry-operator#opentelemetry-operator-vs-kubernetes-vs-cert-manager).

We will install the latest cert-manager Helm chart:

:::note
At time of writing the latest cert-manager chart version is `v1.13.1`
:::

```console
helm repo add jetstack https://charts.jetstack.io

helm install --wait \
    --namespace cert-manager \
    --create-namespace \
    --set installCRDs=true \
    --version 1.13.1 \
    cert-manager jetstack/cert-manager
```

Once cert-manager is up and running, the OpenTelemetry operator Helm chart can be installed in this way:

:::note
At time of writing the latest OpenTelemetry operator chart version is `0.39.2`
:::

```console
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts

helm install --wait \
  --namespace open-telemetry \
  --create-namespace \
  --version 0.39.2 \
  my-opentelemetry-operator open-telemetry/opentelemetry-operator
```

## OpenTelemetry integration

We can now move to the next chapters to enable application metrics (via Prometheus
integration) and application tracing (via Jaeger integration).
