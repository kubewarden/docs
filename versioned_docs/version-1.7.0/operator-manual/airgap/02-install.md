---
sidebar_label: "Installation"
title: ""
---

# Air gap installation

This guide will show you how to install Kubewarden in air-gapped environments. In an air-gapped installation of Kubewarden,
you will need a private OCI registry accessible by your Kubernetes cluster. Kubewarden Policies
are WebAssembly modules; therefore, they can be stored inside an OCI-compliant registry as OCI artifacts.
You need to add Kubewarden's images and policies to this OCI registry. Let's see how to do that.

## Save container images in your workstation

1. Download `kubewarden-images.txt` from the Kubewarden [release page](https://github.com/kubewarden/helm-charts/releases/). Alternatively, the `imagelist.txt` and `policylist.txt` files are shipped inside the helm charts containing the used container images and policy wasm modules, respectively.
:::note
Optionally, you can verify the signatures of the [helm charts](../../security/verifying-kubewarden#helm-charts) and [container images](../../security/verifying-kubewarden#container-images)
:::
2. Add `cert-manager` if it is not available in your private registry.
```
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm pull jetstack/cert-manager
helm template ./cert-manager-<Version>.tgz | \
  awk '$1 ~ /image:/ {print $2}' | sed s/\"//g >> ./kubewarden-images.txt
```
3. Download `kubewarden-save-images.sh` and `kubewarden-load-images.sh` from the [utils repository](https://github.com/kubewarden/utils).
4. Save Kubewarden container images into a .tar.gz file:
```
./kubewarden-save-images.sh \
  --image-list ./kubewarden-images.txt \
  --images kubewarden-images.tar.gz
```
Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes.
When the process completes, your current directory will output a tarball named `kubewarden-images.tar.gz`. It will be present in the same directory where you executed the command.

## Save policies in your workstation

1. Add all the policies you want to use in a `policies.txt` file. A file with a list of the default policies can be found in the Kubewarden defaults [release page](https://github.com/kubewarden/helm-charts/releases/)
2. Download `kubewarden-save-policies.sh` and `kubewarden-load-policies.sh` from the [kwctl repository](https://github.com/kubewarden/kwctl/tree/main/scripts)
3. Save policies into a .tar.gz file:
```
./kubewarden-save-policies.sh --policies-list policies.txt
```
kwctl downloads all the policies and stores them as `kubewarden-policies.tar.gz` archive.

## Helm charts

You need to download the following helm charts in your workstation:

```
helm pull kubewarden/kubewarden-crds
helm pull kubewarden/kubewarden-controller
helm pull kubewarden/kubewarden-defaults
```

Download `cert-manager` if it is not installed in the air gap cluster.

```
helm pull jetstack/cert-manager
```

## Populate private registry

Move `kubewarden-policies.tar.gz`, `kubewarden-images.tar.gz`, `kubewarden-load-images.sh`, `kubewarden-load-policies.sh` and `policies.txt`
to the air gap environment.

1. Load Kubewarden images into the private registry. Docker client must be authenticated against the local registry
```
./kubewarden-load-images.sh \
  --image-list ./kubewarden-images.txt \
  --images kubewarden-images.tar.gz \
  --registry <REGISTRY.YOURDOMAIN.COM:PORT>
```
2. Load Kubewarden policies into the private registry. Kwctl must be authenticated against the local registry (`kwctl` uses the same mechanism to authenticate as `docker`, a `~/.docker/config.json` file)
```
./kubewarden-load-policies.sh \
  --policies-list policies.txt \
  --policies kubewarden-policies.tar.gz \
  --registry <REGISTRY.YOURDOMAIN.COM:PORT> \
  --sources-path sources.yml
```

:::caution
The `sources.yaml` file is needed by kwctl to connect to registries that fall into these categories:

* Authentication is required
* Self signed certificate is being used
* No TLS termination is done

Please refer to [the section on custom certificate authorities](../../distributing-policies/custom-certificate-authorities.md) in our documentation to learn more about configuring the `sources.yaml` file
:::

## Install Kubewarden

Let's install Kubewarden now that we have everything we need in our private registry. The only difference with a normal
Kubewarden installation is that we need to change the registry in the container images and policies to our private registry.

Install `cert-manager` if it is not already installed in the air gap cluster:

```
helm install --create-namespace cert-manager ./cert-manager-<Version>.tgz \
    -n kubewarden \
    --set installCRDs=true \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-controller \
    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-webhook \
    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-cainjector \
    --set startupapicheck.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-ctl
```

Let's install the Kubewarden stack:

```
helm install --wait -n kubewarden \
  kubewarden-crds kubewarden-crds.tgz
```

```
helm install --wait -n kubewarden \
  kubewarden-controller kubewarden-controller.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

:::caution
If you want to use the Policy Reported subchart available in the
`kubewarden-controller` chart you need to define other values specific for the
subchart in an air-gapped environment. See an example below:

```console
helm install --wait -n kubewarden kubewarden-controller kubewarden-controller.tgz \
	--set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
	--set auditScanner.policyReporter=true \
	--set policy-reporter.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
	--set policy-reporter.ui.image.registry=<REGISTRY.YOURDOMAIN.COM:PORT> \
	--set policy-reporter.image.repository=kyverno/policy-reporter \
	--set policy-reporter.ui.image.repository=kyverno/policy-reporter-ui
```

Note that is necessary to define `auditScanner.policyReporter` to enable the
subchart and 4 more additional values to configure the registry and repository
where the Policy Reporter images are stored. For more information about the
policy report subchart values take a look in [chart
repository](https://github.com/kyverno/policy-reporter/tree/policy-reporter-2.19.4/charts/policy-reporter).
:::

```
helm install --wait -n kubewarden \
  kubewarden-defaults kubewarden-defaults.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

:::caution
To download the recommended policies installed by the `kubewarden-defaults` Helm
Chart from a registry other than `global.cattle.systemDefaultRegistry`, you can
utilize the `recommendedPolicies.defaultPoliciesRegistry` configuration. This
configuration allows users to specify a registry dedicated to pulling the OCI
artifacts of the policies. It is particularly useful when their container image
repository does not support OCI artifacts.

To install and wait for the installation to complete, use the following command:

```console
helm install --wait -n kubewarden \
  kubewarden-defaults kubewarden-defaults.tgz \
  --set global.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set recommendedPolicies.defaultPoliciesRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

If the `recommendedPolicies.defaultPoliciesRegistry` configuration is not set,
the `global.cattle.systemDefaultRegistry` will be used as the default registry.
:::

Finally, we need to configure Policy Server to fetch policies from our private registry. See the [using private registry](../policy-servers/private-registry) section of the docs.

Now we can create Kubewarden policies in our cluster! Policies must be available in your private registry.

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
`PolicyServer` resources must use the image available in your private registry. For example:
```
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
