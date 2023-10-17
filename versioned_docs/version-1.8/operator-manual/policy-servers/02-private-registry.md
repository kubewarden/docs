---
sidebar_label: "Using private registries"
title: ""
---

# Configuring PolicyServers to use private registries

It is possible to configure PolicyServers to use credentials of private OCI
registries. This will allow those PolicyServers to download policies from
public and private registries.

Once a PolicyServer is configured to access private registries, policies running
on it and using the defined SDKs and lower level host capabilities APIs will be
able to access private registries too. This is because PolicyServers expose that
functionality through the defined policy SDKs and lower level host capability
API. This is the case, for example, in policies that verify signatures of
container images.

To achieve this, we will create a Secret containing the private registry
credentials, and configure our PolicyServers' resources, and/or our Helm chart
to use it.

## Creating the Secret

PolicyServers support the usual
[Docker config Secrets](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets)
, either of type `kubernetes.io/dockercfg` or type `kubernetes.io/dockerconfigjson`.
These secrets can be created with `kubectl create secret docker-registry`.

For configuring your PolicyServer instance, store the credentials
used to access the registry in a `docker-registry` Secret. The secret should be
created in the same namespace where you run your PolicyServer. This can be done
with the following command:

```shell
kubectl --namespace kubewarden create secret docker-registry secret-ghcr-docker \
  --docker-username=myuser \
  --docker-password=mypass123 \
  --docker-server=myregistry.io
```

For more information on how to create the Docker Secrets, see the [Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets).

## Consuming the Secret in PolicyServers

Once you have the Secret created, it is necessary to configure the PolicyServer
instance by setting the `spec.imagePullSecret` field with the name of the Secret that
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
`policyServer.imagePullSecret` value with the Secret name. Thus,
the created default policy server will be able to download policies from your
private registry as well:

```yaml
# values file example
policyServer:
  telemetry:
    enabled: False
  imagePullSecret: secret-ghcr-docker
```
