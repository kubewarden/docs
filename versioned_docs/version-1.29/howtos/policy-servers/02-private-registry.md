---
sidebar_label: Using private registries
title: Configuring PolicyServers to use private registries
description: Configuring PolicyServers to use private registries in Kubewarden.
keywords: [kubewarden, kubernetes, policyservers, private registries]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, policy-servers, private-registry]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/policy-servers/private-registry"/>
</head>

It's possible to configure PolicyServers to use credentials of private OCI
registries. This permits those PolicyServers to download policies from
public and private registries.

Once you configure PolicyServer to access private registries, policies running
on it can also access those registries. This works when policies use the
provided SDKs or host capability APIs. This is because PolicyServers expose
that functionality through the defined policy SDKs and the lower level host
capability API. This is the case, for example, in policies that verify
signatures of container images.

To achieve this, you should create a Secret containing the private registry
credentials. Then configure your PolicyServers' resources, and then your Helm
chart to use it.

## Creating the Secret

PolicyServers support the usual [Docker configuration
Secrets](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets),
either of type `kubernetes.io/dockercfg` or type
`kubernetes.io/dockerconfigjson`. You can create these secrets with `kubectl
create secret docker-registry`.

You create the secret **in the namespace where you run your PolicyServer**.
This follows the principle of least privilege, and lets different
PolicyServers validate OCI artifacts, from different registries, independently.

You create this Secret for the PolicyServer with the following command:

```shell
kubectl --namespace kubewarden create secret docker-registry secret-ghcr-docker \
  --docker-username=myuser \
  --docker-password=mypass123 \
  --docker-server=myregistry.io
```

For more information on how to create the Docker Secrets, see the [Kubernetes
documentation](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets).

## Consuming the Secret in PolicyServers

Once you have the Secret created, it's necessary to configure the PolicyServer
instance. Set the `spec.imagePullSecret` field to the name of the Secret that
contains the credentials:

```yaml
# Example of a PolicyServer using a private registry
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: default
spec:
  image: ghcr.io/kubewarden/policy-server:v1.1.1
  serviceAccountName: policy-server
  replicas: 1
  annotations:
  imagePullSecret: "secret-ghcr-docker"
```

## Consuming the Secret in Helm charts

When deployed from the `kubewarden-defaults` Helm chart, you can set the
`policyServer.imagePullSecret` value to the Secret name. Then,
the created default policy server is able to download policies from your
private registry as well:

```yaml
# values file example
policyServer:
  telemetry:
    enabled: False
  imagePullSecret: secret-ghcr-docker
```
