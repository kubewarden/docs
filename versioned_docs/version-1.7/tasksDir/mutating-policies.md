---
sidebar_label: "Mutating policies"
title: "Mutating policies"
description: Explains mutating policies in the context of Kubewarden
keywords: [kubewarden policy mutating kubernetes clusteradmissionpolicy admissionpolicy]
---

A mutating policy will rebuild the requests with
defined values that comply with the policy definition.
If you want to allow the behavior of mutating requests,
set the `ClusterAdmissionPolicy.mutating` field to `true`.

However, if you set the `ClusterAdmissionPolicy.mutating` field to `false`,
the mutated requests will be rejected.
For example, create the following `ClusterAdmissionPolicy` with the `mutating` field set to `true`:

```bash
# Command
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-user-group
spec:
  module: "registry://ghcr.io/kubewarden/policies/user-group-psp:v0.1.5"
  rules:
  - apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["pods"]
    operations:
    - CREATE
    - UPDATE
  mutating: true
  settings:
    run_as_user:
      rule: "MustRunAs"
      ranges:
        - min: 1000
          max: 2000
        - min: 3000
          max: 4000
    run_as_group:
      rule: "RunAsAny"
    supplemental_groups:
      rule: "RunAsAny" 
EOF

# Output
clusteradmissionpolicy.policies.kubewarden.io/psp-user-group created
```

The [`psp-user-group`](https://github.com/kubewarden/user-group-psp-policy) policy is used to control users and groups in containers and can mutate the requests.
In the example above, the `runAsUser` field is set and it will be added to the container `securityContext` section.

As the `mutating` field is set to `true`, the following request will be applied successfully:

```bash
# Command
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: pause-user-group
spec:
  containers:
    - name: pause
      image: registry.k8s.io/pause
EOF

# Output
pod/pause-user-group created
```
Once the request is applied, you can see the results of the container's `securityContext`:

```bash
# Command
kubectl get pods pause-user-group -o jsonpath='{ .spec.containers[].securityContext }'

# Output
{"runAsUser":1000}
```

Now, modify the `ClusterAdmissionPolicy` by setting the field `mutating` to `false`:

```bash
# Command
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-user-group
spec:
  module: "registry://ghcr.io/kubewarden/policies/user-group-psp:v0.1.5"
  rules:
  - apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["pods"]
    operations:
    - CREATE
    - UPDATE
  mutating: false
  settings:
    run_as_user:
      rule: "MustRunAs"
      ranges:
        - min: 1000
          max: 2000
        - min: 3000
          max: 4000
    run_as_group:
      rule: "RunAsAny"
    supplemental_groups:
      rule: "RunAsAny" 
EOF

# Output
clusteradmissionpolicy.policies.kubewarden.io/psp-user-group configured
```

As the `mutating` field is set to `false`, the following request will fail:

```bash
# Command
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: pause-user-group
spec:
  containers:
    - name: pause
      image: registry.k8s.io/pause
EOF

# Output
Error from server: error when creating ".\\pause-user-group.yaml": admission webhook "psp-user-group.kubewarden.admission" denied the request: Request rejected by policy psp-user-group. The policy attempted to mutate the request, but it is currently configured to not allow mutations.
```

In conclusion, you can see Kubewarden replicates the same behavior as the deprecated Kubernetes Pod Security Polices (PSP).