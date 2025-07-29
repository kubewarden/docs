---
sidebar_label: Emergency disable
sidebar_position: 31
title: Emergency disable
description: How to temporarily disable Kubewarden policies during emergencies
keywords: [ClusterAdmissionPolicies, AdmissionPolicies, configuration]
doc-persona: [kubewarden-operator]
doc-type: [howto]
doc-topic: [operator-manual]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/emergency-disable"/>
</head>

In an emergency, operations teams might need to perform actions that Kubewarden would block.

This document explains how to disable Kubewarden so operations teams can address cluster failures. After resolving the situation, operations teams can restart Kubewarden.

## Disable Kubewarden

First, stop the Kubewarden controller. You do this by scaling its Deployment to zero:

```console
kubectl scale deployment kubewarden-controller \
  --replicas=0 \
  -n kubewarden
```

:::tip

Ensure you use the name of the Namespace where the Kubewarden stack is deployed.
Here, the stack is deployed in the `kubewarden` Namespace.
:::

Next, delete all the `ValidatingWebhookConfigurations` and `MutatingWebhookConfigurations`
created by Kubewarden:

```console
# Delete all the ValidatingWebhookConfiguration created by Kubewarden
kubectl delete validatingwebhookconfigurations \
  -l app.kubernetes.io/part-of=kubewarden

# Delete all the MutatingWebhookConfiguration created by Kubewarden
kubectl delete mutatingwebhookconfigurations \
  -l app.kubernetes.io/part-of=kubewarden
```

## Restore Kubewarden

When the emergency is over, restore the Kubewarden stack by bringing back
the Kubewarden controller:

```console
kubectl scale deployment kubewarden-controller \
  --replicas=1 \
  -n kubewarden
```

:::tip

- Ensure you use the name of the Namespace where the Kubewarden stack is deployed.
  Here, the stack is deployed in the `kubewarden` Namespace.
- Ensure you scale the controller back to its original value. This example assumes
  there's only one replica of the controller running.
  :::

Once the controller is running, it reconciles the deployed
policies. The `ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration` resources,
previously deleted, are recreated, thus enforcing the policies.
