---
sidebar_label: Tracing
title: Tracing
description: Tracing for Kubewarden.
keywords: [kubewarden, kubernetes, tracing]
doc-type: [hosto]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-topic: [operator-manual, ui-extension, tracing]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/ui-extension/tracing"/>
</head>

Tracing is the collection of fine-grained details about policy evaluations.
It's a useful tool for debugging issues in your Kubewarden deployment and
policies.

Kubewarden uses [Jaeger](https://www.jaegertracing.io/) to receive, store, and
visualize trace events.

**_Policy tracing logs_**
![UI Policy Tracing Logs](/img/ui_policy_tracing.png)

## Prerequisites

You need Cert-Manager and OpenTelemetry. Follow the
[instructions](../telemetry/10-opentelemetry-qs.md#install-opentelemetry) to
install Cert-Manager and the OpenTelemetry Operator.

## Install Jaeger

Apply the installation steps from the [tracing
quickstart](../telemetry/20-tracing-qs.md#install-jaeger).

Once the Jaeger operator creates all the resources, there is a Service under
`my-open-telemetry-collector.jaeger.svc.cluster.local`.

The Jaeger Query UI is reachable at the following address:

```console
https://<CLUSTER_IP>/api/v1/namespaces/jaeger/services/http:my-open-telemetry-query:16686/proxy/search
```

This endpoint may be unique depending on your configuration. You can find the
endpoint listed for your Jaeger resource on the Services page.

### Update `rancher-kubewarden-controller` with a Jaeger endpoint

You'll need to edit the `rancher-kubewarden-controller` resource to add the
Jaeger endpoint "my-open-telemetry-collector.jaeger.svc.cluster.local:4317".

For instance:

```yaml
telemetry:
  tracing: true
  mode: sidecar
  sidecar:
    tracing:
      jaeger:
        endpoint: my-open-telemetry-collector.jaeger.svc.cluster.local:4317
        tls:
          insecure: true
```

The installation of the service `my-open-telemetry-collector` is under the
`jaeger` namespace.

:::caution

For simplicity, the communication between the OpenTelemetry collector and the
Jaeger endpoint isn't encrypted.

This is __unsuitable for production deployment__. You should refer to Jaeger's
[documentation](https://www.jaegertracing.io/docs/latest/kubernetes/).

:::

You should now be able to view any failed requests for policies tied to a
specific Policy Server. You can also see the detail view for any given policy.
You can get a more in-depth view of the traces by using the Jaeger UI.
