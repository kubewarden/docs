---
sidebar_label: Metrics Reference
sidebar_position: 30
title:  Metrics reference
description: Metrics reference documentation for Kubewarden.
keywords: [kubewarden, kubernetes, metrics, reference]
doc-persona: [kubewarden-user, kubewarden-operator, kubewarden-integrator]
doc-type: [reference]
doc-topic: [operator-manual, telemetry, metrics, reference]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/metrics-reference"/>
</head>

Kubewarden exposes relevant platform metrics allowing cluster administrators and
policy developers to identify patterns and potential issues.

## Policy Server

The Policy Server component initializes and runs policies.
When receiving requests from the Kubernetes API server,
it forwards the request to the policy,
returning the response provided by the policy to the Kubernetes API server.

### Metrics

:::note
[Baggage](https://opentelemetry.io/docs/concepts/signals/baggage/)
key-value attributes are added to the metric to provide additional information.
:::

Name | Type | |
--- | --- | --- |
`kubewarden_policy_evaluations_total` | Counter | [Baggage](#kubewarden_policy_evaluations_total) |

#### `kubewarden_policy_evaluations_total`

##### Baggage

Label | Description |
--- | --- |
`policy_name` | Name of the policy |
`resource_name` | Name of the evaluated resource |
`resource_kind` | Kind of the evaluated resource |
`resource_namespace` | Namespace of the evaluated resource. Not present if the resource is cluster scoped. |
`resource_request_operation` | Operation type: `CREATE`, `UPDATE`, `DELETE`, `PATCH`, `WATCH`... |
`accepted` | Was the request accepted? |
`mutated` | Was the request mutated? |
`error_code` | Error code returned by the policy if rejected, if any. Not present if the policy didn't provide one. |
