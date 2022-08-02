---
sidebar_label: "Using private registry"
title: ""
---

# Configuring Policy Servers to use private registry

It is possible to specify and configure the credentials used to authenticate
into a private registry where your policies are stored.


Before configure your Policy Server instance, you need to store the credentials
used to access the registry in a `docker-registry` secret. The secret should be
created in the same namespace where you run your Policy Server. This can be done
with the following command:

```shell
kubectl --namespace kubewarden create secret docker-registry secret-ghcr-docker \
  --docker-username=myuser \
  --docker-password=mypass123 \
  --docker-server=myregistry.io
```

If you want more information about how to create the secret. Please, go to the
[Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/secret/#docker-config-secrets).

Once you have the secret created, it is necessary to configure the Policy Server
instance setting the `imagePullSecret` field with the name of the secret created with the
credentials:

```yaml
# Example of a policy server using private registry
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

When deployed from the `kubewarden-defaults` Helm chart you can configure the
`policyServer.imagePullSecret` field in the values file with the secret name. Thus,
the policy server created will be able to download policies from your private
registry as well:

```yaml
# values file example
policyServer:
  telemetry:
    enabled: False
  imagePullSecret: secret-ghcr-docker
```
