---
sidebar_label: Verify Images
title: Verify Rancher Application Collection images
description: Verify Rancher Application Collection images with Kubewarden.
keywords:
  [rancher, application collection, appco, signature, verification, verify]
doc-type: [howto]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-topic: [operator-manual, rancher, installation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/application-collection/verify-images"/>
</head>

This section describes how to verify applications and images from the [Rancher
Application Collection](https://apps.rancher.io/) with Kubewarden.

It does so by deploying the [Verify Image
Signatures](https://artifacthub.io/packages/kubewarden/verify-image-signatures/verify-image-signatures)
policy and configuring the PolicyServers so they can pull the signature layers
of the images from Application Collection.

:::info
You need an access token or service account authentication to Application Collection.
:::

## Authenticating to Rancher Application Collection

Following the [Application Collection
docs](https://docs.apps.rancher.io/get-started/authentication/), create a an
access token and set up the cluster so it can pull from the Application
Collection registry, with a Docker Config Secret such as this one:

```console
$ kubectl create secret docker-registry application-collection \
  --docker-server=dp.apps.rancher.io \
  --docker-username=<mymail> \
  --docker-password=<mytoken>
```

## Create Secret for the PolicyServer so they can pull from Rancher Application Collection

The PolicyServer we are using needs to be configured so it can pull the image
layers that contain the signatures.

Following the [private registries how-to](../policy-servers/private-registry)
for Policy Servers, create a Docker Config Secret **in the same namespace of
the PolicyServer**. Do this by instantiating a Secret with
the same contents as the previous `application-collection`.

For PolicyServer `default`, installed with the `kubewarden-defaults` Helm chart
under the `kubewarden` namespace, it would be:

```console
$ kubectl create secret docker-registry application-collection-kw -n kubewarden \
  --docker-server=dp.apps.rancher.io \
  --docker-username=<mymail> \
  --docker-password=<mytoken>
```

## Configure PolicyServers to use the new Secret

If using the PolicyServer `default` from the `kubewarden-defaults` Helm chart,
configure it with the imagePullSecret `application-collection-kw` in the same
namespace by setting the following values for the chart:

```console
$ helm upgrade -i --wait --namespace kubewarden \
  --create-namespace kubewarden-defaults kubewarden/kubewarden-defaults \
  --reuse-values \
  --set policyServer.imagePullSecret=application-collection-kw
```

If you are using other PolicyServers, set their
[`spec.imagePullSecret`](../../reference/CRDs#policyserverspec).
Remember, the Secret must be in the same namespace as the PolicyServer.

## Apply the policy

Let's apply a ClusterAdmissionPolicy making use of [Verify Image
Signatures](https://artifacthub.io/packages/kubewarden/verify-image-signatures/verify-image-signatures)
policy. This policy will check all container images from
`dp.apps.rancher.io/containers/*`. The policy supports OCI registries and
artifacts.

We configure the policy settings with the [public
key](https://docs.apps.rancher.io/howto-guides/verify-signatures/) from
Application Collection (at the time of writing) in the `pubKeys` array.

```console
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  annotations:
    artifacthub/pkg: verify-image-signatures/verify-image-signatures/0.2.9
  name: check-appcollection-signatures
spec:
  backgroundAudit: true
  mode: protect
  module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.9
  mutating: true
  policyServer: default
  # On first policy call, the policy-server downloads the image layers to
  # verify the signatures. Later on it's cached. It may be useful to increase
  # this timeout:
  timeoutSeconds: 30 # default 10 seconds.
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations: ["CREATE", "UPDATE"]
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["replicationcontrollers"]
      operations: ["CREATE", "UPDATE"]
    - apiGroups: ["apps"]
      apiVersions: ["v1"]
      resources: ["deployments", "replicasets", "statefulsets", "daemonsets"]
      operations: ["CREATE", "UPDATE"]
    - apiGroups: ["batch"]
      apiVersions: ["v1"]
      resources: ["jobs", "cronjobs"]
      operations: ["CREATE", "UPDATE"]
  settings:
    modifyImagesWithDigest: true
    rule: PublicKey
    signatures:
      - image: dp.apps.rancher.io/containers/*
        pubKeys:
          # Note: this array constitutes an AND in validation, not an OR.
          - |-
            -----BEGIN PUBLIC KEY-----
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA02FtEt5gBywiyxbmkVsb
            CujcBg5lur0kpEbfDk10gCcs9shVEqEO3ZsOXHursgoaDAWqdPtsYhsgczGeJz9w
            Aw+r6BuRV8YOkE37A8s/7IOQUW0tlqtnt11OKhIiZ9+e5l3ed2H1ymKQO3dgreSy
            rShqYdA3hrItswyp41ApF6zhjSPlR6lAmq3X4wMYLAPptmzfxigTnR4hxB5UNPhs
            i2qA4vLrUM/i+NohECuLr1EAymvupH26HLEdM+eZnlQn+WbhIP5Grc4ba7XrBv7K
            kywgTC7CxkiJZR0mUcUD2wTX/Je8Ewj6oPSalx09e2jtzvmU5Kr9XUyMF7Zsj5CA
            IwIDAQAB
            -----END PUBLIC KEY-----
EOF
```

```
$ kubectl apply -f mypolicy.yml
$ kubectl get admissionpolicies -n default # wait for status active
```

To test it, deploy a Pod with a signed image from Application Collection:

```
$ kubectl run nginx --image [dp.apps.rancher.io/containers/nginx:1.24.0](http://dp.apps.rancher.io/containers/nginx:1.24.0) --overrides='{"spec": {"imagePullSecrets":[{"name": "application-collection"}]}}'
pod/nginx created
```

You can inspect the logs of your policy-server Pod to see that the verification
took place.
