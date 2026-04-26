---
sidebar_label: Install and configure
title: Install and configure Kubewarden from a private registry
description: Install Kubewarden from a private registry and configure PolicyServers in air-gapped environments.
keywords: [kubewarden, kubernetes, air gap installation, policyserver]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, air gap, installation, policyservers]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/airgap/install-configure"/>
</head>

After you populate the private registry, install Kubewarden from the Helm
charts and artifacts that are available inside the air-gapped environment.

The installation needs two registry-related settings:

- `global.cattle.systemDefaultRegistry` points the Kubewarden charts to the
  private registry that contains container images.
- `recommendedPolicies.defaultPoliciesRegistry` points `kubewarden-defaults`
  to the registry that contains the recommended policy OCI artifacts. When
  unset, `kubewarden-defaults` uses `global.cattle.systemDefaultRegistry`.

If your private registry requires credentials or uses custom TLS settings,
configure the `default` PolicyServer with `kubewarden-defaults` Helm values.
For custom PolicyServers, configure the `PolicyServer` resource directly.

## Install from chart archives

Use this path when you copied `.tgz` chart archives into the air-gapped
environment with the manual process.

```shell
helm install --wait -n kubewarden kubewarden-crds kubewarden-crds.tgz \
  --create-namespace
helm install --wait -n kubewarden kubewarden-controller kubewarden-controller.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
helm install --wait -n kubewarden kubewarden-defaults kubewarden-defaults.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

## Install from Hauler OCI artifacts

Use this path when Hauler copied the Helm charts into your private registry as
OCI artifacts.

```shell
helm install --wait -n kubewarden kubewarden-crds \
  oci://<REGISTRY.YOURDOMAIN.COM:PORT>/hauler/kubewarden-crds \
  --create-namespace
helm install --wait -n kubewarden kubewarden-controller \
  oci://<REGISTRY.YOURDOMAIN.COM:PORT>/hauler/kubewarden-controller \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
helm install --wait -n kubewarden kubewarden-defaults \
  oci://<REGISTRY.YOURDOMAIN.COM:PORT>/hauler/kubewarden-defaults \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

In the commands below, replace `kubewarden-defaults.tgz` with the Hauler OCI
chart URL if you installed `kubewarden-defaults` from an OCI artifact.

## Configure recommended policy registry

If the recommended policy OCI artifacts are mirrored to a registry different
from `global.cattle.systemDefaultRegistry`, set
`recommendedPolicies.defaultPoliciesRegistry` on `kubewarden-defaults`:

```shell
helm upgrade --install --wait -n kubewarden kubewarden-defaults kubewarden-defaults.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set recommendedPolicies.defaultPoliciesRegistry=<POLICY-REGISTRY.YOURDOMAIN.COM:PORT>
```

## Configure the default PolicyServer

The `kubewarden-defaults` chart owns the `PolicyServer` named `default`.
Configure that PolicyServer by setting `policyServer.*` Helm values when you
install or upgrade `kubewarden-defaults`.

For a private registry that requires credentials, create the image pull Secret
in the Kubewarden namespace and set `policyServer.imagePullSecret`:

```shell
kubectl --namespace kubewarden create secret docker-registry secret-private-registry \
  --docker-username=<USER> \
  --docker-password=<PASSWORD> \
  --docker-server=<REGISTRY.YOURDOMAIN.COM:PORT>

helm upgrade --install --wait -n kubewarden kubewarden-defaults kubewarden-defaults.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set policyServer.imagePullSecret=secret-private-registry
```

For a private registry without TLS, set `policyServer.insecureSources`:

```yaml
# values.yaml
global:
  cattle:
    systemDefaultRegistry: <REGISTRY.YOURDOMAIN.COM:PORT>
policyServer:
  insecureSources:
    - <REGISTRY.YOURDOMAIN.COM:PORT>
```

For a private registry that uses a custom CA, set
`policyServer.sourceAuthorities`:

```yaml
# values.yaml
global:
  cattle:
    systemDefaultRegistry: <REGISTRY.YOURDOMAIN.COM:PORT>
policyServer:
  sourceAuthorities:
    - uri: <REGISTRY.YOURDOMAIN.COM:PORT>
      certs:
        - |
          -----BEGIN CERTIFICATE-----
          <PEM encoded CA certificate>
          -----END CERTIFICATE-----
```

Then install or upgrade the chart with the values file:

```shell
helm upgrade --install --wait -n kubewarden kubewarden-defaults kubewarden-defaults.tgz \
  -f values.yaml
```

## Configure custom PolicyServers

For a custom PolicyServer that you manage yourself, configure the
`PolicyServer` resource. The `image` field must reference the policy-server
image in your private registry. Add `imagePullSecret`, `insecureSources`, or
`sourceAuthorities` when your registry needs them.

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: reserved-instance-for-tenant-a
spec:
  image: <REGISTRY.YOURDOMAIN.COM:PORT>/kubewarden/policy-server:v1.34.2
  replicas: 2
  serviceAccountName: policy-server
  imagePullSecret: secret-private-registry
  insecureSources:
    - <REGISTRY.YOURDOMAIN.COM:PORT>
```

## Create policies

After Kubewarden is installed and the target PolicyServer can reach your
private registry, create policies that reference policy modules from the same
registry:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://<REGISTRY.YOURDOMAIN.COM:PORT>/kubewarden/policies/pod-privileged:v0.2.2
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations:
        - CREATE
  mutating: false
```

## Policy Reporter subchart

If you enable the Policy Reporter subchart in `kubewarden-controller`, configure
its image registry and repository values for the air-gapped registry:

```shell
helm upgrade --install --wait -n kubewarden kubewarden-controller kubewarden-controller.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set auditScanner.policyReporter=true \
  --set policy-reporter.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set policy-reporter.image.repository=kyverno/policy-reporter \
  --set policy-reporter.ui.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set policy-reporter.ui.image.repository=kyverno/policy-reporter-ui
```

For more information about Policy Reporter chart values, see the
[Policy Reporter documentation](https://kyverno.github.io/policy-reporter-docs/getting-started/helm.html).
