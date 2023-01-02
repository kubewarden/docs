---
sidebar_label: "Installation"
title: ""
---

# Air gap installation

This guide will show you how to install Kubewarden in air-gapped environments. In an air-gapped installation of Kubewarden, 
you will need a private OCI registry accessible by your Kubernetes cluster. Kubewarden Policies 
are WebAssembly modules; therefore, they can be stored inside an OCI-compliant registry as OCI artifacts.
You need to add Kubewarden's images and policies to this OCI registry. Let's see how to do that.


## Download airgap.sh script

Script is available in [kwctl](https://github.com/kubewarden/kwctl/tree/main/scripts) repository.

```bash
wget https://raw.githubusercontent.com/kravciak/kwctl/main/scripts/airgap.sh
```


## Generate list of airgap artifacts

Generate json description of required components for airgap deployment. If you don't have cert-manager already installed you can use `--cert-manager` parameter.
Save list to the file, it will be needed in the following steps.  
You can edit this list if you want to add your custom policies. Only recommended policies will be downloaded by default.
```bash
airgap list | tee artifacts.json
```

List is assembled from kubewarden helm repository, image and policy lists in [release page](https://github.com/kubewarden/helm-charts/releases/). Alternatively the `imagelist.txt` and `policylist.txt` files are shipped inside the helm charts containing the used container images and policy wasm modules, respectively.


## Save artifacts in your workstation

This command will download items described in artifacts.json into current directory. You can use `--dry` parameter to see what would happen if you executed the command.
When the process completes, your current directory will contain downloaded archives. It will be present in the same directory where you executed the command.
```bash
# Print commands but do not execute
airgap pull --list artifacts.json --dry

# Start download
airgap pull --list artifacts.json
```

:::note
Optionally, you can verify the signatures of the [helm charts](../../security/verifying-kubewarden#helm-charts) and [container images](../../security/verifying-kubewarden#container-images)
:::

## Populate private registry

Now you upload archives from previous step into local registry. If you just want to play around you can start local registry with docker.

```bash
# Start local repository (optional)
# docker run -d -p 5000:5000 --restart=always --name registry registry:2

# Push images and policies into local registry
airgap push --list artifacts.json --registry=<REGISTRY.YOURDOMAIN.COM:PORT> --dry --insecure
```

The `sources.yaml` file is needed by kwctl to connect to registries that fall into these categories:
* Authentication is required
* Self signed certificate is being used
* No TLS termination is done

You can use `--insecure` parameter to skip certificate check, but if you need more controll use [sources.yaml](../../distributing-policies/custom-certificate-authorities.md) file.


## Install kubewarden

Finally you deploy helm charts. File artifacts.json is the same that was generated in first step.

```bash
airgap install --list artifacts.json --registry <REGISTRY.YOURDOMAIN.COM:PORT>
```

In a few moments you should see kubewarden-controller and policy-server pods running in kubewarden namespace.

We need to configure Policy Server to fetch policies from our private registry. See the [using private registry](../policy-servers/private-registry) section of the docs.
Alternativelly you can instruct policyserver to ignore certificates by using `--insecure` parameter. This is not recommended.


Done. Now we can create Kubewarden policies in our cluster! Policies must be available in your private registry.

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
