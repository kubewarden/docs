---
sidebar_label: Installation
title: Air gap installation
description: Air gap installation for Kubewarden.
keywords: [kubewarden, kubernetes, air gap installation]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, airgap, installation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/airgap/install"/>
</head>

This guide shows you how to install Kubewarden in air gapped environments.
For an air gapped installation of Kubewarden,
you need a private Open Container Initiative (OCI) registry accessible by your Kubernetes cluster.
Kubewarden Policies are WebAssembly modules,
therefore you can store them in an OCI-compliant registry as OCI artifacts.
You need to add Kubewarden's images and policies to this OCI registry. You can
see a list of Kubewarden artifacts in the [Artifacts reference](../../reference/artifacts.md) page.
The following sections describe the process.

## Save container images in your workstation

1.  Download `kubewarden-images.txt` from the Kubewarden
    [release page](https://github.com/kubewarden/helm-charts/releases/).
    Alternatively, the `imagelist.txt` and `policylist.txt` files are shipped inside the helm charts containing the used container images and policy Wasm modules, respectively.

        :::note

        Optionally, you can verify the signatures of the
        [helm charts](../../tutorials/verifying-kubewarden.md#helm-charts) and
        [container images](../../tutorials/verifying-kubewarden.md#container-images)

        :::

1.  Download `kubewarden-save-images.sh` and `kubewarden-load-images.sh` from the
    [utilities repository](https://github.com/kubewarden/utils).
1.  Save Kubewarden container images into a `.tar.gz` file:

    ```shell
    ./kubewarden-save-images.sh \
      --image-list ./kubewarden-images.txt \
      --images kubewarden-images.tar.gz
    ```

    Docker begins pulling the images used for an air gap install.
    Be patient.
    This process takes a few minutes.
    When complete, your current directory, where you ran the command, has a tarball, `kubewarden-images.tar.gz`.

## Save policies in your workstation

1. Add all the policies you want to use in a `policies.txt` file.
   A file with a list of default policies is in the Kubewarden defaults
   [release page](https://github.com/kubewarden/helm-charts/releases/).
1. Download `kubewarden-save-policies.sh` and `kubewarden-load-policies.sh` from the
   [`kwctl` repository](https://github.com/kubewarden/kwctl/tree/main/scripts)
1. Save policies into a `.tar.gz` file:

   ```shell
   ./kubewarden-save-policies.sh --policies-list policies.txt
   ```

   The policies are downloaded by `kwctl` and stored in the `kubewarden-policies.tar.gz` archive.

## Helm charts

You need to download the following helm charts to your workstation:

```shell
helm pull kubewarden/kubewarden-crds
helm pull kubewarden/kubewarden-controller
helm pull kubewarden/kubewarden-defaults
```

## Populate private registry

Move these files to the air gap environment:

- `kubewarden-policies.tar.gz`,
- `kubewarden-images.tar.gz`,
- `kubewarden-load-images.sh`,
- `kubewarden-load-policies.sh` and
- `policies.txt`

1.  Load Kubewarden images into the private registry.
    The Docker client must be authenticated against the local registry.

        ```shell
        ./kubewarden-load-images.sh \
          --image-list ./kubewarden-images.txt \
          --images kubewarden-images.tar.gz \
          --registry <REGISTRY.YOURDOMAIN.COM:PORT>
        ```

1.  Load Kubewarden policies into the private registry.
    Kwctl must be authenticated against the local registry
    (`kwctl` uses the same mechanism to authenticate as `docker`, a `~/.docker/config.json` file)

        ```shell
        ./kubewarden-load-policies.sh \
          --policies-list policies.txt \
          --policies kubewarden-policies.tar.gz \
          --registry <REGISTRY.YOURDOMAIN.COM:PORT> \
          --sources-path sources.yml
        ```

:::caution
The `sources.yaml` file is needed by kwctl to connect to registries in these categories:

- Authentication is required
- Self signed certificate is being used
- No TLS termination is done

Please refer to
[the section on custom certificate authorities](../custom-certificate-authorities.md)
in the documentation to learn about configuring the `sources.yaml` file
:::

## Install Kubewarden

Now that your private registry has everything required you can install
Kubewarden. The only difference to a standard Kubewarden installation is that
you need to change the registry in the container images and policies to be the
private registry.

Install the Kubewarden stack:

```shell
helm install --wait -n kubewarden \
  kubewarden-crds kubewarden-crds.tgz
```

```shell
helm install --wait -n kubewarden \
  kubewarden-controller kubewarden-controller.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

:::caution
To use the Policy Reported sub-chart available in the
`kubewarden-controller` chart you need to define other values specific for the
sub-chart in an air gapped environment.
See an example below:

```shell
helm install --wait -n kubewarden kubewarden-controller kubewarden-controller.tgz \
    --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set auditScanner.policyReporter=true \
    --set policy-reporter.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set policy-reporter.ui.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set policy-reporter.image.repository=kyverno/policy-reporter \
    --set policy-reporter.ui.image.repository=kyverno/policy-reporter-ui
```

It's necessary to define `auditScanner.policyReporter` to enable the sub-chart and 4 more values,
to configure the registry and repository where the Policy Reporter images are stored.
For more information about the policy report sub-chart values see
[Policy Reporter documentation](https://kyverno.github.io/policy-reporter-docs/getting-started/helm.html).
:::

```shell
helm install --wait -n kubewarden \
  kubewarden-defaults kubewarden-defaults.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

:::caution
To download the recommended policies installed by the `kubewarden-defaults` Helm Chart from a registry other than `global.cattle.systemDefaultRegistry`,
you can use the `recommendedPolicies.defaultPoliciesRegistry` configuration.
This configuration lets users specify a registry dedicated to pulling the OCI artifacts of the policies.
It's particularly useful when their container image repository doesn't support OCI artifacts.

To install, and wait for the installation to complete, use the following command:

```console
helm install --wait -n kubewarden \
  kubewarden-defaults kubewarden-defaults.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set recommendedPolicies.defaultPoliciesRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

If the `recommendedPolicies.defaultPoliciesRegistry` configuration isn't set,
the `global.cattle.systemDefaultRegistry` is used as the default registry.
:::

Finally, you need to configure Policy Server to fetch policies from your private registry.
See the [using private registry](../policy-servers/private-registry) section of the documentation.

Now you can create Kubewarden policies in your cluster.
Policies must be available in your private registry.

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
