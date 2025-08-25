---
sidebar_label: Hauler installation
title: Air gap installation with Hauler
description: Air gap installation for Kubewarden using Hauler
keywords: [kubewarden, kubernetes, air gap installation, hauler]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, air gap, installation, hauler]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/airgap/hauler-sync"/>
</head>

This guide shows you how to install Kubewarden in air-gapped environments using
[Hauler](https://docs.hauler.dev/docs/intro). Hauler is a tool that helps users
run workloads in air-gapped environments. It moves the required resources for
apps into those air-gapped environments.

Kubewarden uses Hauler capabilities by providing a manifest file with all the
required resources to run Kubewarden in a private environment. This
documentation describes how you can use it. Refer to the Hauler documentation
to learn more about it.

The basic workflow using the Hauler manifest is:

1. Get it from a Kubewarden release page
2. Load all the resources required to run Kubewarden into a local store
3. Export them into a file
4. Move the file into the private environment
5. Load the resources into Hauler running inside the private environment
6. Copy everything into a registry, to be used in the installation process, in
   your air-gapped environment

## Download Hauler manifest from Helm chart release page

Download `hauler_manifest.yml` from the Kubewarden
[release page](https://github.com/kubewarden/helm-charts/releases/).

Sync the resources defined in the manifest to your Hauler store:

```shell
hauler store sync --filename hauler_manifest.yaml
```

Hauler downloads all the resources from the manifest to the local
store. This process takes a few minutes. When complete, you can
see the synced resources with the `hauler store info` command.

## Generate the tarball file with all Kubewarden resources

Run the Hauler command to export all the resources previously loaded in the
store to a file:

```shell
hauler store save --filename kubewarden-resources.tar.zst
```

:::note
Kubewarden container images support x86_64 and Arm architectures. Therefore,
when you save the resource into the file, you can see warning messages like
this:

```shell
2025-08-12 18:55:54 WRN specify an export platform to prevent potential platform mismatch on import of index [ghcr.io/kyverno/policy-reporter:3.3.3]
2025-08-12 18:55:54 WRN specify an export platform to prevent potential platform mismatch on import of index [ghcr.io/kyverno/policy-reporter-ui:2.4.1]
2025-08-12 18:55:54 WRN specify an export platform to prevent potential platform mismatch on import of index [ghcr.io/kubewarden/policy-server:v1.27.0]
2025-08-12 18:55:54 WRN specify an export platform to prevent potential platform mismatch on import of index [ghcr.io/kubewarden/audit-scanner:v1.27.0]
2025-08-12 18:55:54 WRN specify an export platform to prevent potential platform mismatch on import of index [ghcr.io/rancher/kuberlr-kubectl:v5.0.0]
2025-08-12 18:55:54 WRN specify an export platform to prevent potential platform mismatch on import of index [ghcr.io/kubewarden/kubewarden-controller:v1.27.0]
```

To avoid this warning message, you can set the `--platform` CLI flag to define
which platform architecture you want to save into the file.
:::

## Transfer the tarball into your isolated environment

Now that you have all the Kubewarden resources in
`kubewarden-resources.tar.zst`, copy it into your air-gapped environment and
load it into the Hauler store there:

```shell
hauler store load --filename kubewarden-resources.tar.zst
# Check if the resources are loaded
hauler store info
```

Now all the resources required to install Kubewarden are in the Hauler store in
your isolated environment.

## Populate private registry

To use the resources from your Hauler store, it is necessary to make them
available in an internal registry. You can use Hauler commands to copy them
into your private registry.

```shell
hauler store copy registry://localhost:5000
```

You can also run Hauler to start a registry with all the resources from the
store. This registry is insecure, you will need to adapt cluster configuration:

```shell
# Find IP address of your host
# hostname -I

# Update registries.yaml for k3s based cluster to allow insecure access
# mirrors:
#   "<HOST_IP>:5000":
#     endpoint:
#       - "http://<HOST_IP>:5000"
# configs:
#   "<HOST_IP>:5000":
#     tls:
#       insecure_skip_verify: true

# Configure policy-server to allow pulling policies from insecure sources
# helm install .. kubewarden-defaults .. --set policyServer.insecureSources[0]=<HOST_IP:5000>

hauler store serve registry
```

This will start a registry at the `localhost:5000` address. From this point,
you can use other commands like Skopeo to copy all the container images, policy
modules and Helm charts used by Kubewarden into your private registry.

## Install Kubewarden

Now that your private registry has everything required, you can install
Kubewarden. The difference from a standard Kubewarden installation is that you
need to change the registry in the container images and policies to be the
private registry. Additionally, the Helm charts must be installed from OCI
artifacts.

Install the Kubewarden stack:

```shell
helm install --wait -n kubewarden kubewarden-crds --create-namespace \
    oci://<REGISTRY.YOURDOMAIN.COM:PORT>/hauler/kubewarden-crds
helm install --wait -n kubewarden kubewarden-controller \
    --set "global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>" \
    oci://<REGISTRY.YOURDOMAIN.COM:PORT>/hauler/kubewarden-controller
```

:::caution
To use the PolicyReporter sub-chart available in the `kubewarden-controller`
chart you need to define other values specific for the sub-chart in an
air-gapped environment. See an example below:

```shell
helm install --wait -n kubewarden kubewarden-controller oci://<REGISTRY.YOURDOMAIN.COM:PORT>/hauler/kubewarden-controller \
    --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set auditScanner.policyReporter=true \
    --set policy-reporter.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set policy-reporter.image.repository=kyverno/policy-reporter \
    --set policy-reporter.ui.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set policy-reporter.ui.image.repository=kyverno/policy-reporter-ui
```

It's necessary to define `auditScanner.policyReporter` and four other values to
enable the sub-chart and to configure the registry and repository where the
Policy Reporter images are stored. For more information about the policy report
sub-chart values, refer to [Policy Reporter
documentation](https://kyverno.github.io/policy-reporter-docs/getting-started/helm.html).
:::

```shell
helm install --wait -n kubewarden \
  kubewarden-defaults oci://<REGISTRY.YOURDOMAIN.COM:PORT>/hauler/kubewarden-defaults \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

Finally, you need to configure each Policy Server to fetch policies from your
private registry. See the [using private
registry](../policy-servers/private-registry) section of the documentation.

Now you can create Kubewarden policies in your cluster. Policies must be
available in your private registry.

```
kubectl apply -f - <<EOF
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
EOF
```

:::caution
`PolicyServer` resources must use the image available in your private registry.
For example:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: reserved-instance-for-tenant-a
spec:
  image: <REGISTRY.YOURDOMAIN.COM:PORT>/kubewarden/policy-server:v1.3.0
  replicas: 2
  serviceAccountName: sa
```

:::
