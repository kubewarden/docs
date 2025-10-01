---
sidebar_label: Policy Groups
sidebar_position: 33
title: How to use policy groups
description: How to use Kubewarden policy groups
keywords: [kubewarden, policy groups, clusteradmissionpolicygroup, admissionpolicygroup]
doc-persona: [kubewarden-operator]
doc-type: [howto]
doc-topic: [explanations, policy-group]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/policy-groups"/>
</head>

:::tip
Before working with Policy Groups, consult the
[explanation](../explanations/policy-groups.md).
:::

Using the example from the [explanation of Policy Groups](../explanations/policy-groups.md),
use these commands to implement it.

```shell
kubectl apply -f group-policy-demo.yaml
```

<details>

<summary>
A `ClusterAdmissionPolicyGroup` that rejects Pods that use images with the `latest` tag,
unless the images are signed by two trusted parties: Alice and Bob.
</summary>

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicyGroup # or AdmissionPolicyGroup
metadata:
  name: demo
spec:
  rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations:
        - CREATE
        - UPDATE
  policies:
    signed_by_alice:
      module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.3.0
      settings:
        modifyImagesWithDigest: false
        signatures:
          - image: "*"
            pubKeys:
              - |
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEyg65hiNHt8FXTamzCn34IE3qMGcV
                yQz3gPlhoKq3yqa1GIofcgLjUZtcKlUSVAU2/S5gXqyDnsW6466Jx/ZVlg==
                -----END PUBLIC KEY-----
    signed_by_bob:
      module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.3.0
      settings:
        modifyImagesWithDigest: false
        signatures:
          - image: "*"
            pubKeys:
              - |
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEswA3Ec4w1ErOpeLPfCdkrh8jvk3X
                urm8ZrXi4S3an70k8bf1OlGnI/aHCcGleewHbBk1iByySMwr8BabchXGSg==
                -----END PUBLIC KEY-----
    reject_latest:
      module: registry://ghcr.io/kubewarden/policies/trusted-repos:v0.2.0
      settings:
        tags:
          reject:
            - latest
  expression: "reject_latest() || (signed_by_alice() && signed_by_bob())"
  message: "the image is using the latest tag or is not signed by Alice and Bob"
```

</details>

Once the policy is active, the creation of a non-compliant Pod will be rejected.
To obtain more information about the evaluation of the policies that are part of the
group, increase the verbosity level of `kubectl`:

```shell
kubectl -v4 apply -f signed-pod.yml
I0919 18:29:40.251332    4330 helpers.go:246] server response object: [{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "error when creating \"signed-pod.yml\": admission webhook \"clusterwide-demo.kubewarden.admission\" denied the request: the image is using the latest tag or is not signed by Alice and Bob",
  "details": {
    "causes": [
      {
        "message": "Resource signed is not accepted: verification of image testing.registry.svc.lan/busybox:latest failed: Host error: Callback evaluation failure: Image verification failed: missing signatures\nThe following constraints were not satisfied:\nkind: pubKey\nowner: null\nkey: |\n  -----BEGIN PUBLIC KEY-----\n  MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEswA3Ec4w1ErOpeLPfCdkrh8jvk3X\n  urm8ZrXi4S3an70k8bf1OlGnI/aHCcGleewHbBk1iByySMwr8BabchXGSg==\n  -----END PUBLIC KEY-----\nannotations: null\n",
        "field": "spec.policies.signed_by_bob"
      },
      {
        "message": "not allowed, reported errors: tags not allowed: latest",
        "field": "spec.policies.reject_latest"
      }
    ]
  },
  "code": 400
}]
Error from server: error when creating "signed-pod.yml": admission webhook "clusterwide-demo.kubewarden.admission" denied the request: the image is using the latest tag or is not signed by Alice and Bob
```

:::note
The evaluation output produced by the policies that are part of the group is visible
only by increasing the verbosity level of `kubectl`.

A verbosity level of `4` is enough to see the evaluation output of the policies.
:::
