---
sidebar_label: "Metrics Reference Documentation"
title: ""
---

# Metrics Reference

Kubewarden exposes some relevant metrics that enhance visibility of the platform, and allows cluster
administrators and policy developers to identify patterns and potential issues.

## Policy Server

The Policy Server is the component that initializes and runs policies. Upon receiving requests from
the Kubernetes API server, it will forward the request to the policy, and return the response
provided by the policy to the Kubernetes API server.

### Metrics

:::note
Baggage are key-value attributes added to the metric. They are used to enrich the metric
with additional information.
:::

Name | Type | |
--- | --- | ---
`kubewarden_policy_evaluations_total` | Counter | [Baggage](#kubewarden_policy_evaluations_total)

#### `kubewarden_policy_evaluations_total`

##### Baggage

Label | Description
--- | ---
`policy_name` | Name of the policy
`resource_name` | Name of the evaluated resource
`resource_kind` | Kind of the evaluated resource
`resource_namespace` | Namespace of the evaluated resource. Not present if the resource is cluster scoped.
`resource_request_operation` | Operation type: `CREATE`, `UPDATE`, `DELETE`, `PATCH`, `WATCH`...
`accepted` | Whether the request was accepted or not
`mutated` | Whether the request was mutated or not
`error_code` | Error code returned by the policy in case of rejection, if any. Not present if the policy didn't provide one.
