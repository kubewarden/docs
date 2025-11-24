---
sidebar_label: ArgoCD Installation
sidebar_position: 90
title: ArgoCD Installation
description: How to install Kubewarden with ArgoCD
keywords: [kubewarden, gitops, argocd]
doc-persona: [kubewarden-operator]
doc-type: [howto]
doc-topic: [argocd-installation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/argocd-installation"/>
</head>

If you're using ArgoCD to manage your Kubernetes resources, you may want to
install Kubewarden using ArgoCD. This is possible, but there are some
considerations. Since Kubewarden v1.17.0, the cert-manager dependency has been
removed. There is a new certificate reconciler that automatically renews the
certificates. This means that the Kubewarden controller takes care of creating
and renewing the certificates for you. This includes both the root CA and all
webhook certificates.

The initial root CA and webhook certificate creation is during the Helm chart
installation using the available Helm functions. So, during Helm chart
rendering, the installation checks if the certificates are already created, and
if not, it creates them.

This poses a problem when using ArgoCD, as it uses Helm solely to render the
templates, with all resource lifecycle management by ArgoCD. Whenever ArgoCD
renders the Helm chart to check that the cluster application doesn't deviate
from the chart definition, it attempts certificate creation again. As a
result, it marks the secrets that store the certificates and the
webhook configuration as unsynchronized.

To resolve this issue, it's necessary to configure the ArgoCD application to
ignore:

* the `data` field in secrets
* the `caBundle` field in the `MutatingWebhookConfiguration`
* `ValidatingWebhookConfiguration` resources.

You do this by adding the `ignoreDifferences` field in the ArgoCD application:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: kubewarden-crds
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://charts.kubewarden.io
    chart: kubewarden-crds
    targetRevision: 1.13.0
  destination:
    server: https://kubernetes.default.svc
    namespace: kubewarden-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: kubewarden-controller
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://charts.kubewarden.io
    chart: kubewarden-controller
    targetRevision: 4.1.0
  destination:
    server: https://kubernetes.default.svc
    namespace: kubewarden-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:     # Sync options which modifies sync behavior
      # When syncing changes, respect fields ignored by the ignoreDifferences configuration
      - RespectIgnoreDifferences=true 
  # ignoreDifferences is the important configuration to avoid ArgoCD marking
  # the secrets and # webhook configurations as unsynchronized
  ignoreDifferences:
  - group: ""
    kind: "Secret"
    name: kubewarden-ca
    namespace: kubewarden-system
    jsonPointers:
      - /data
  - group: ""
    kind: "Secret"
    name: kubewarden-webhook-server-cert
    namespace: kubewarden-system
    jsonPointers:
      - /data
  - group: ""
    kind: "Secret"
    name: kubewarden-audit-scanner-client-cert
    namespace: kubewarden-system
    jsonPointers:
      - /data
  - group: "admissionregistration.k8s.io"
    kind: "MutatingWebhookConfiguration"
    jqPathExpressions:
      - '.webhooks[]?.clientConfig.caBundle'
  - group: "admissionregistration.k8s.io"
    kind: "ValidatingWebhookConfiguration"
    jqPathExpressions:
      - '.webhooks[]?.clientConfig.caBundle'
---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: kubewarden-defaults
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://charts.kubewarden.io
    chart: kubewarden-defaults
    targetRevision: 2.8.0
  destination:
    server: https://kubernetes.default.svc
    namespace: kubewarden-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

:::note

In the example, the key aspect is the `ignoreDifferences` configuration for the
Kubewarden controller application. The rest of the content provides context on
how to configure the ArgoCD application and to provide a complete example.

:::

