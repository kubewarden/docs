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

If you are using ArgoCD to manage your Kubernetes resources, you may be
interested in installing Kubewarden using ArgoCD. This is possible, but there
are some considerations to take into account. Since Kubewarden v1.17.0, the 
cert-manager dependency has been removed. There is a new certificate reconciler that
automatically renews the certificates. This means that the Kubewarden
controller takes care of creating and renewing the certificates for you,
including both the root CA and all the webhook certificates.

However, the initial root CA and webhook certificates are created during the
Helm chart installation using the available Helm functions. This means that
when the Helm chart is rendered, it checks if the certificates are already
created, and if not, it will create them. This poses a problem when using
ArgoCD, as it uses Helm solely to render the templates, while all resource
lifecycle management is handled by ArgoCD. Consequently, every time ArgoCD
renders the Helm chart to ensure that the application running in the cluster
does not deviate from the definition in the Helm chart, it will attempt to
create the certificates again. As a result, it marks the secrets that store
the certificates, as well as the webhook configuration, as unsynchronized.

To resolve this issue, it is necessary to configure the ArgoCD application to
ignore the `data` field in secrets and the `caBundle` field in the
`MutatingWebhookConfiguration` and `ValidatingWebhookConfiguration` resources.
This can be accomplished by adding the `ignoreDifferences` field in the ArgoCD
application:

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

In the example above, the key aspect is the
`ignoreDifferences` configuration for the Kubewarden controller application.
The rest of the content is included to provide context on how the ArgoCD
application should be configured and to offer a complete example.

:::

