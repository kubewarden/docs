---
sidebar_label: Tracing
title: Tracing
description: Tracing for Kubewarden.
keywords: [kubewarden, kubernetes, tracing]
doc-type: [explanation, tutorial]
doc-topic: [operator-manual, ui-extension, tracing]
doc-persona: [default]
---

Tracing allows collection of fine grained details about policy evaluations.
It's a useful tool for debugging issues in your Kubewarden deployment and policies.

[Jaeger](https://www.jaegertracing.io/) is used to receive, store and visualize trace events.

**_Policy tracing logs_**
![UI Policy Tracing Logs](/img/ui_policy_tracing.png)

## Prerequisites

Cert-Manager and OpenTelemetry are required.
Follow [these instructions](../telemetry/opentelemetry/01-quickstart.md#install-opentelemetry) to install Cert Manager and the OpenTelemetry Operator.

## Install Jaeger

Apply the installation steps from the [tracing quickstart](../telemetry/tracing/01-quickstart.md#install-jaeger).

Once all the resources are created by the Jaeger operator, there is a
Service under `my-open-telemetry-collector.jaeger.svc.cluster.local`.

The Jaeger Query UI is reachable at the following address:

```console
https://<CLUSTER_IP>/api/v1/namespaces/jaeger/services/http:my-open-telemetry-query:16686/proxy/search
```

This endpoint may be unique depending on your configuration.
You can find the endpoint listed for your Jaeger resource under the Services page.

### Update `rancher-kubewarden-controller` with Jaeger endpoint

You'll need to edit the `rancher-kubewarden-controller` resource to add the Jaeger endpoint "my-open-telemetry-collector.jaeger.svc.cluster.local:4317".

For instance:

```yaml
telemetry:
  tracing:
    enabled: True
    jaeger:
      endpoint: "my-open-telemetry-collector.jaeger.svc.cluster.local:4317"
      tls:
        insecure: true
```

`my-open-telemetry-collector` is the service we installed under the `jaeger` namespace.

:::caution
For simplicity, we're not going to encrypt the communication between the
OpenTelemetry collector and the Jaeger endpoint.

This is **not meant to be a production deployment**.
We recommend
you read Jaeger's [official documentation](https://www.jaegertracing.io/docs/latest/operator/).
:::

You should now be able to view any failed requests for policies tied to a specific Policy Server or the detail view for any given policy.
You can get a more in-depth view of the traces by using the Jaeger UI.
