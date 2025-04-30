---
sidebar_label: Security hardening
sidebar_position: 50
title: Security hardening
description: Harden the Kubewarden installation
keywords: [kubewarden, kubernetes, security]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, security]
---

Kubewarden strives to be secure with little configuration.
In this section and its subpages you can find hardening tips (with their
trade-offs) to secure Kubewarden itself.

Please refer to our [threat model](../reference/threat-model) for more information.

### `kubewarden-defaults` Helm chart

Operators can obtain a secure deployment by installing all the
Kubewarden Helm charts. It's recommended to install the
`kubewarden-defaults` Helm chart and enable its recommended policies with:

```console
helm install --wait -n kubewarden kubewarden-defaults kubewarden/kubewarden-defaults \
  --set recommendedPolicies.enabled=True \
  --set recommendedPolicies.defaultPolicyMode=protect
```

This provides a default PolicyServer and default policies, in protect mode, to
ensure the Kubewarden stack is safe from other workloads.

### Verifying Kubewarden artifacts

See the [Verifying Kubewarden](../tutorials/verifying-kubewarden) tutorial.

### RBAC

Kubewarden describes RBAC configurations in different
_Explanations_ sections. Users can fine-tune the needed permissions for the
[Audit Scanner](../explanations/audit-scanner#permissions-and-serviceaccounts)
feature, as well as [per Policy Server](../explanations/context-aware-policies)
Service Account for the context-aware feature.

The view all Roles:

```console
kubectl get clusterroles,roles -A | grep kubewarden
```

### Per-policy permissions

For context-aware policies, operators specify fine-grained permissions per
policy under its `spec.contextAwareResources`, and those work in conjunction
with the Service Account configured for the Policy Server where the policy
runs.

### Workload coverage

By default, Kubewarden excludes specific Namespaces from Kubewarden coverage. This is
done to simplify first-time use and interoperability with other workloads.

Security-conscious operators can tune these Namespaces list via the
`.global.skipNamespaces` value for both the `kubewarden-controller` and
`kubewarden-defaults` Helm charts.

### SecurityContexts

Starting from 1.23, Kubewarden's stack is able to run in a Namespace
where the [restricted
Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted)
are enforced, with current Pod hardening best practices.

The `kubewarden-controller` Helm chart configures the SecurityContexts and
exposes them in its `values.yaml`.

The `kubewarden-defaults` Helm chart allows for configuring the default Policy
Server `.spec.securityContexts` under `.Values.policyServer.securityContexts`.

For Policy Servers managed by operators, you can configure them via their
[`spec.securityContexts`](https://docs.kubewarden.io/reference/CRDs#policyserversecurity).
