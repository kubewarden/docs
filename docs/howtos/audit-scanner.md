---
sidebar_label: Audit Scanner
sidebar_position: 21
title: Audit Scanner
description: How-to install and use Audit Scanner.
keywords: [kubewarden, kubernetes, audit scanner]
doc-persona: [kubewarden-operator, kubewarden-distributor, kubewarden-integrator]
doc-type: [howto]
doc-topic: [howto, audit-scanner-installation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/audit-scanner"/>
</head>

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

2. Install the `kubewarden-controller` Helm chart.

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

### Policy Reporter UI (optional)

The `kubewarden-controller` chart comes with a subchart of the [Policy Reporter](https://kyverno.github.io/policy-reporter).
It is disabled by default, and can be enabled by setting `auditScanner.policyReporter=true`.
The values of the Policy Reporter subchart are exposed under the `policyReporter` key of
the `kubewarden-controller` values.

This will install only part of the Policy Reporter upstream chart, the UI, which provides a visualization
of the PolicyReports and ClusterPolicyReports in cluster.
See [here](../explanations/audit-scanner) more information about the Policy Reporter UI.

By default, the Policy Reporter UI is only exposed as a ClusterIP service with
name `kubewarden-controller-ui` in the namespace where the
`kubewarden-controller` chart was installed.

#### Ingress

Users can provide their own Ingress configuration, or enable an Ingress via the subchart configuration (see the `ingress`
config of the UI subchart
[here](https://github.com/kyverno/policy-reporter/blob/policy-reporter-2.19.4/charts/policy-reporter/charts/ui/values.yaml#L172-L189)).

See this example of an Ingress configuration via the subchart:

```yaml
auditScanner:
  policyReporter: true
policy-reporter: # subchart values settings
  ui:
    enabled: true
    ingress:
      enabled: true
      hosts:
        - host: "*.local" # change this to your appropriate domain
          paths:
            - path: /
              pathType: ImplementationSpecific
```

#### Port-forwarding

For a quick look or debugging, one can setup a port-forwarding to the service with:

```console
kubectl port-forward service/kubewarden-controller-ui 8082:8080 -n kubewarden
```

Which will make the Policy Reporter UI available at http://localhost:8082.

## Trigger manual run

The audit scanner is implemented as a Cronjob that runs every 60 minutes by default. It's possible to trigger a manual run by running the following command:

```bash
kubectl create job \
    --namespace kubewarden \
    --from cronjob/audit-scanner \
    audit-scanner-manual-$(date +%Y-%m-%d-%H-%M-%S)
```

The status of the job can be checked with:

```console
kubectl get -n kubewarden jobs
```
