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

Kubewarden strives to be reasonable secure with little configuration, even
acknowledging that security is a spectrum.
In this section and its subpages you can find hardening tips (with their
trade-offs) to secure Kubewarden itself.

Please refer to our [threat model](../reference/threat-model) for more information.

### `kubewarden-defaults` Helm chart

Operators can obtain a reasonable secure deployment by installing all the
Kubewarden Helm charts. Particularly, it is recommended to install the
`kubewarden-defaults` Helm chart and enable its recommended policies with:

```console
helm install --wait -n kubewarden kubewarden-defaults kubewarden/kubewarden-defaults \
  --set recommendedPolicies.enabled=True \
  --set recommendedPolicies.defaultPolicyMode=protect
```

This provides a default PolicyServer and default policies in protect mode to
ensure the Kubewarden stack is safe from other workloads.

### Verifying Kubewarden artifacts

See the [Verifying Kubewarden](../tutorials/verifying-kubewarden) tutorial.

### RBAC

The Kubewarden RBAC configurations are described in the different
_Explanations_ sections. Users can fine-tune the needed permissions for the
[Audit Scanner](../explanations/audit-scanner#permissions-and-serviceaccounts)
feature, as well as [per Policy Server](../explanations/context-aware-policies)
Service Account for the context-aware feature.

The view all Roles:

```console
kubectl get clusterroles,roles -A | grep kubewarden
```

### Per-policy permissions

For context-aware policies, operators specify fine-graded permissions per
policy under its `spec.contectAwareResources`, and those work in conjuction
with the Service Account configured for the Policy Server where the policy
runs.

### Workload coverage

By default, specific Namespaces are excluded from Kubewarden coverage. This is
done to simplify first-time use and interoperability with other workloads.

Security-conscious operators can tune these Namespaces list via the
`.global.skipNamespaces` Value for both the `kubewarden-controller` and
`kubewarden-defaults` Helm charts.

### SecurityContexts

Starting from 1.23, Kubewarden's stack is able to run inside of a Namespace
where the [restricted
Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted)
is enforced, with current Pod hardening best practices.

The `kubewarden-controller` Helm chart configures the SecurityContexts and
exposes it in its `values.yaml`.

The `kubewarden-defaults` Helm chart allows for configuing the default Policy
Server `.spec.securityContexts` under `.Values.policyServer.securityContexts`.

For Policy Servers managed by operators, they can be configured via their
[`spec.securityContexts`](https://docs.kubewarden.io/reference/CRDs#policyserversecurity).
