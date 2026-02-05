---
sidebar_label: Mutating policies
sidebar_position: 10
title: Mutating policies
description: Explains mutating policies in the context of Kubewarden
keywords: [kubewarden, policy mutating, kubernetes, clusteradmissionpolicy, admissionpolicy]
doc-persona: [kubewarden-policy-developer, kubewarden-integrator]
doc-type: [explanation]
doc-topic: [mutating-policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/explanations/mutating-policies"/>
</head>

Mutating policies receive an object request and rebuild it
(mutate it) into a new request, according to the defined values in the policy settings.
The request proceeds through the Kubernetes API, potentially being
evaluated by other policies.

To permit mutating request behavior in a policy
set the `ClusterAdmissionPolicy.mutating` field to `true`.

## Why mutating policies can be dangerous

### Unreviewed mutating policies can introduce vulnerabilities

:::danger
To prevent system abuse, Kubewarden administrators should review mutating
policies. Mutating policies could, for example, modify a workload, such that it
permits privileged container creation.
:::

#### Solution

If in doubt, split policies into mutating and validating policies, instead of
writing or deploying policies that both validate and mutate. This is particularly
important when using a DSL, such as Rego, to build complex policies.

### Misconfigured mutating policies together with third party Kubernetes Controllers can get stuck in an infinite loop

:::danger
Mutating policies return requests that proceed through the Kubernetes API. If
there are other Kubernetes Controllers that listen for those same resources,
they may mutate them back in a follow-up request. This could lead to an
infinite feedback loop of mutations.
:::

#### Solution

Perform the mutation against:

1. The lower type of resource (for example, Pod).
2. The highest type of resource (for example, Deployment). Note: this could still lead
   to loops if a controller is managing those resources. For example,
   controllers of GitOps solutions (like fleet, flux, argo, ...) or other third
   party controllers that translate their own CRDs into Deployment objects.

## Examples

You can see a mutating policy at work. Create the following
`ClusterAdmissionPolicy` with the `mutating` field set to `true`:

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

You use the
[`psp-user-group`](https://github.com/kubewarden/user-group-psp-policy)
policy to control users and groups in containers and mutate the requests.
In the previous example, you set the `run_as_user` field and it's added to the container `securityContext` section.

As the `mutating` field is `true`, the following request succeeds:

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

You can see the results of the container's `securityContext` after the request application:

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

As the `mutating` field is `false`, the following request fails:

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

In conclusion, you can see Kubewarden replicates the same behavior as the deprecated Kubernetes Pod Security Policies (PSP).
