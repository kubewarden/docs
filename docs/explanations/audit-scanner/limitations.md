---
sidebar_label: "Limitations"
title: "Audit Scanner - Limitations"
---

## Supported event types

Policies can inspect `CREATE`, `UPDATE`, and `DELETE` events.

The audit scanner cannot simulate `UPDATE` events, as it doesn't know exactly
which part of the resource needs to be changed in a meaningful way.

Because of that, policy interested only in `UPDATE` events will be ignored by
the audit scanner.

:::note
The audit-scanner v1.7.0 release supports only `CREATE` events. `DELETE` ones
will be handled in the near future.
:::

## Policies relying on user and user group information

Each Kubernetes admission request object contains information about which user
(or ServiceAccount) initiated the event, and to which group they belong.

All the events simulated by the audit scanner are originated by the same hard
coded user and group. Because of that, policies that rely on these values to
make their decisions will not produce meaningful results.

For these cases, the policy should be configured to be skipped from the audit
checks.

## Policies relying on external data

Policies can request and use external data when performing an evaluation. These
policies can be evaluated by the audit checks, but their outcome can change
over time depending on the external data.

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

The `apiGroups`, `apiVersions` and `resources` attributes can use the special `*` inside of them. This is a wildcard
symbol that causes the policy to match all the values used inside of the field.

Policies that make use of the `*` symbol are going to be ignored by the audit scanner.
