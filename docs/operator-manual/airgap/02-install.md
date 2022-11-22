---
sidebar_label: "Installation"
title: ""
---

# Air gap installation

This guide will show you how to install Kubewarden in air gap environments. In an air gap installation of Kubewarden, 
you will need a private OCI registry that is located somewhere accessible by your kubernetes cluster. Kubewarden Policies 
are WebAssembly modules, therefore they can be stored inside of an OCI compliant registry as OCI artifacts.
You need to add Kubewarden's images and policies to this OCI registry. Let's see how to do that.

## Save container images in your workstation

1. Download `kubewarden-images.txt` from the Kubewarden [release page](https://github.com/kubewarden/helm-charts/releases/). Alternatively, you can find `imagelist.txt` and `policylist.txt` files shipped inside the helm charts, that contain the used container images and policy wasm modules respectively.
:::note
Optionally, you can verify the signatures of the [helm charts](../../security/verifying-kubewarden#helm-charts) and [container images](../../security/verifying-kubewarden#container-images)
:::
2. Add `cert-manager` if it is not available in your private registry. 
```
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm pull jetstack/cert-manager --version v1.7.1
helm template ./cert-manager-v1.7.1.tgz | awk '$1 ~ /image:/ {print $2}' | sed s/\"//g >> ./kubewarden-images.txt
```
3. Download [kubewarden-save-images.sh](https://github.com/kubewarden/utils/blob/main/scripts/kubewarden-save-images.sh) 
and [kubewarden-load-images.sh](https://github.com/kubewarden/utils/blob/main/scripts/kubewarden-load-images.sh) from the Kubewarden utils repository.
4. Save Kubewarden container images into a tar.gz file:
```
./kubewarden-save-images.sh --image-list ./kubewarden-images.txt --images kubewarden-images.tar.gz
```
Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes. 
When the process completes, your current directory will output a tarball named `kubewarden-images.tar.gz`. Check that the output is in the directory.

## Save policies in your workstation

1. Add all the policies you want to use in a `policies.txt` file. 
Example: (TODO add link to default policies.txt once it is available) 
```
registry://ghcr.io/kubewarden/policies/pod-privileged:v0.2.2
registry://ghcr.io/kubewarden/policies/safe-labels:v0.1.5
```
2. Download `kubewarden-save-policies.sh` and `kubewarden-load-policies.sh` from the [kwctl repository](https://github.com/kubewarden/kwctl/tree/main/scripts)
3. Save policies into a tar.gz file:
```
./kubewarden-save-policies.sh --policies-list policies.txt
```
kwctl downloads all the policies and stores then in `kubewarden-policies.tar.gz`

## Helm charts

You need to download the following helm charts in your workstation:

```
helm pull kubewarden/kubewarden-crds         
helm pull kubewarden/kubewarden-controller
helm pull kubewarden/kubewarden-defaults  
helm pull jetstack/cert-manager         
```

Then move the helm chart tar.gz files to your air gap environment.

## Populate private registry

Move `kubewarden-policies.tar.gz`, `kubewarden-images.tar.gz`, `kubewarden-load-images.sh`, `kubewarden-load-policies.sh` and `policies.txt`
to the air gap environment.

1. load Kubewarden images into the private registry
```
./kubewarden-load-images.sh --image-list ./kubewarden-images.txt --images kubewarden-images.tar.gz --registry <REGISTRY.YOURDOMAIN.COM:PORT>
```
2. load Kubewarden policies into the private registry  
```
./kubewarden-load-policies.sh --policies kubewarden-policies.tar.gz --policies-list policies.txt --registry <REGISTRY.YOURDOMAIN.COM:PORT> --sources-path sources.yml 
```

:::caution
The `sources.yaml` file is needed by kwctl to connect to registries that fall into these categories:

* Authentication required
* Self signed certificate is being used
* No TLS termination is done

Please refer to [this section](../../distributing-policies/custom-certificate-authorities.md) of our documentation to learn more about how to configure the `sources.yaml` file
::: 

## Install kubewarden. 

Let's install Kubewarden now that we have everything we need in our private registry. The only difference with a normal
Kubewarden installation is that we need to change the registry in the container images and policies to our private registry.

Install cert-manager:

```
helm install --create-namespace cert-manager ./cert-manager-v1.7.1.tgz \
    -n kubewarden \
    --set installCRDs=true \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller \
    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-webhook \
    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-cainjector \
    --set startupapicheck.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-ctl
```

Let's install the Kubewarden stack:

```
helm install --wait -n kubewarden kubewarden-crds.tgz
```

```
helm install --wait -n kubewarden kubewarden-controller.tgz --set common.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

```
helm install --wait -n kubewarden kubewarden-defaults.tgz --set common.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
```

Finally, we need to configure PolicyServers to fetch policies from our private registry. See the [using private registry](../policy-servers/private-registry) section of the docs.

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
