---
sidebar_label: "Limitations"
title: "Audit Scanner - Limitations"
description: The limitation of the audit scanner
keywords: [kubewarden, kubernetes, audit scanner]
---

## Supported event types

Policies can inspect `CREATE`, `UPDATE`, and `DELETE` events.

The audit scanner can not simulate `UPDATE` events,
as it doesn't know which part of the resource need to be changed.

So, a policy concerned only with `UPDATE` events is ignored by the audit scanner.

:::note

The audit-scanner v1.7.0 release supports only `CREATE` events.
`DELETE` events will be handled in the near future.

:::

## Policies relying on user and user group information

Each Kubernetes admission request object has information about which user (or ServiceAccount) initiated the event,
and to which group they belong.

All the events simulated by the audit scanner are originated by the same hard coded user and group.
Because of that, policies that rely on these values to make their decisions will not produce meaningful results.

For these cases, the policy should be configured to be skipped from the audit checks.

## Policies relying on external data

Policies can request and use external data when performing an evaluation.
These policies can be evaluated by the audit checks,
but their outcomes can change depending on the external data.

## Usage of `*` by policies

Both the `AdmissionPolicy` and the `ClusterAdmissionPolicy` custom resources have the following fields:

```yaml
spec:
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations:
        - CREATE
        - UPDATE
```

The `apiGroups`, `apiVersions` and `resources` attributes can use the wildcard `*`.
This wildcard symbol causes the policy to match all the values used in the field.
The audit scanner ignores policies that make use of the `*` symbol.
