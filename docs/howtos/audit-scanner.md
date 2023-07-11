---
sidebar_label: "Audit Scanner Installation"
title: "Audit Scanner Installation"
---

# Audit Scanner installation

Beginning with version `v1.7.0`, Kubewarden has a new feature called "Audit Scanner".
A new component, called "audit-scanner", constantly checks the resources declared in the
cluster, flagging the ones that do not adhere with the deployed Kubewarden policies.

Policies evolve over the time: new ones are deployed and the existing ones can be
updated, both in terms of version and configuration settings.
This can lead to situations where resources already inside of the cluster
are no longer compliant.

The audit scanner feature provides Kubernetes administrators
with a tool to consistently verify the compliance state of their clusters.

## Installation

The audit scanner component is available since Kubewarden `v1.7.0`. Therefore,
make sure you are installing the Helm chart with app version `v1.7.0` or
higher.

1. Install the `kubewarden-crds` Helm chart. The chart install the needed
   `PolicyReport` CRDs by default.

   ```console
   helm install kubewarden-crds kubewarden/kubewarden-crds
   ```
   :::caution
      To store the results of policy reports, you need to have the PolicyReport
      Custom Resource Definitions (CRDs) available. If the necessary
      PolicyReport CRDs are already in the cluster, you cannot install them
      using the kubewarden-crds chart. In such case, you can disable the
      installation of PolicyReport CRDs by setting `installPolicyReportCRDs` to
      `false` in the chart. This means that the Kubewarden stack will not manage
      those CRDs, and the responsibility will be with the administrator.

      See more info about the CRDs at the [policy work group
      repository](https://github.com/kubernetes-sigs/wg-policy-prototypes)
   :::

2. Install the `kubewarden-controller` Helm chart. Remember to enable the audit
   scanner component.

   ```console
   helm install kubewarden-controller kubewarden/kubewarden-controller
   ```

   :::note
   The audit scanner is enabled by default. If you want to disable it, set the
   `auditScanner.enable=false`.
   :::

   For more information about the installation of Kubewarden see the [Quick Start guide](../quick-start.md)


By default, the Audit Scanner is implemented as a
[Cronjob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs)
that will be triggered every 60 minutes. You can adjust this and other audit
scanner settings by changing the kubewarden-controller chart
[values.yaml](https://github.com/kubewarden/helm-charts/blob/main/charts/kubewarden-controller/values.yaml).

See [here](../explanations/audit-scanner) more information about the Audit
Scanner.
