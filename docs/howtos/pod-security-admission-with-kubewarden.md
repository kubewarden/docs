---
sidebar_label: Pod Security Admission
sidebar_position: 42
title: Using Pod Security Admission with Kubewarden
description: Using Pod Security Admission with Kubewarden, since the Kubernetes 1.25 release.
keywords: [kubewarden, pod security admission, pod security policy, kubernetes]
doc-persona: [kubewarden-user, kubewarden-operator, kubewarden-distributor, kubewarden-integrator]
doc-type: [howto]
doc-topic: [pod-security-admission-with-kubewarden]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/pod-security-admission-with-kubewarden"/>
</head>

Pod Security Policies (PSP) are removed since the Kubernetes 1.25 release.
They're replaced by the [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/) (PSA).

PSA simplifies securing the Pods in Kubernetes clusters.

PSA has three profiles (described [in Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)) for namespaces:

- **privileged**, providing the widest range of permissions
- **baseline**, to prevent new privilege escalations
- **restricted**, restricted to harden Pods

A PSA controller performs actions on violation detection.
The actions are: `enforce`, `audit`, and `warn`.
They can be configured.

At the time of writing, with Kubernetes 1.28, the PSA controller has  the following limitations:

- No mutation capabilities
- Higher level objects (like `Deployment`, `Job`) are evaluated only when the `audit` or `warn` modes are enabled

Kubewarden can be used to **integrate** a PSA profile to avoid these limitations.

:::note

You could use Kubewarden to replace the old PSP configuration as shown in [PSP migration](psp-migration.md).
However, the goal of this article is to show how Kubewarden can complement the new PSA.

:::

## Example

In this example we're creating a namespace and applying restrictive PSA policies:

```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: my-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: v1.25
EOF
```

This PSA profile doesn't allow creating containers that run their application as the `root` user.
When defining this container:

- the `runAsNonRoot` attribute must be set to `true`
- the `runAsUser` one can't be set to `0`.

So, the following resource won't reach its desired state:

<details>

<summary>`kubectl` command configuring a resource with `runAsUser: 0` marked as ➀</summary>

```shell
kubectl apply -n my-namespace -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: template-nginx
  template:
    metadata:
      labels:
        app: template-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        securityContext:
          runAsNonRoot: true
          runAsUser: 0 # ➀
          allowPrivilegeEscalation: false
          capabilities:
            drop:
              - "ALL"
          seccompProfile:
            type: "RuntimeDefault"
        ports:
        - containerPort: 80
EOF
```

</details>

If we check the deployment, we can see the PSA prevents the pod creation:

```shell
kubectl get deploy -n my-namespace nginx-deployment -o json | jq ".status.conditions[] | select(.reason == \"FailedCreate\")"
{
  "lastTransitionTime": "2022-10-28T19:09:56Z",
  "lastUpdateTime": "2022-10-28T19:09:56Z",
  "message": "pods \"nginx-deployment-5f98b4db8c-2m96l\" is forbidden: violates PodSecurity \"restricted:v1.25\": runAsUser=0 (container \"nginx\" must not set runAsUser=0)",
  "reason": "FailedCreate",
  "status": "True",
  "type": "ReplicaFailure"
}
```

You can fix this by removing the `runAsUser: 0` from the container definition:

<details>

<summary><code>kubectl</code> command configuring a resource without <code>runAsUser: 0</code></summary>

```shell
kubectl apply -n my-namespace -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: template-nginx
  template:
    metadata:
      labels:
        app: template-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        securityContext:
          runAsNonRoot: true
          allowPrivilegeEscalation: false
          capabilities:
            drop:
              - "ALL"
          seccompProfile:
            type: "RuntimeDefault"

        ports:
        - containerPort: 80
EOF
```

</details>

Now PSA allows an attempt at pod creation but it still fails.

```shell
kubectl get pods -n my-namespace
NAME                                READY   STATUS                       RESTARTS   AGE
nginx-deployment-57d8568bbb-h4bx7   0/1     CreateContainerConfigError   0          47s

```

It's because the container definition didn't specify a user to be used when starting a program inside the container.
The default is to run as the root user if this is the case.
That's not allowed by the `runAsNonRoot` directive:

```shell
kubectl get pods -n my-namespace nginx-deployment-57d8568bbb-h4bx7 -o json | jq ".status.containerStatuses"
[
  {
    "image": "nginx:1.14.2",
    "imageID": "",
    "lastState": {},
    "name": "nginx",
    "ready": false,
    "restartCount": 0,
    "started": false,
    "state": {
      "waiting": {
        "message": "container has runAsNonRoot and image will run as root (pod: \"nginx-deployment-57d8568bbb-8mvkc_my-namespace(add7bcc5-3d23-43d0-94e9-6e78f887a53f)\", container: nginx)",
        "reason": "CreateContainerConfigError"
      }
    }
  }
]
```

This is where Kubewarden can help.
You can use the [`user-group-policy`](https://artifacthub.io/packages/kubewarden/user-group-psp/user-group-psp) policy to mutate the Deployment definition.
This configures a default user for containers omitting that information.

:::note

You need the Kubewarden stack in the Kubernetes cluster for this example.
See the [QuickStart](../quick-start.md) for more details.

:::

It's possible to enforce a user ID range, for example, 1000—2000 and 4000—5000:

<details>

<summary><code>kubectl</code> command enforcing a user id range</summary>

```shell
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: user-group-psp
spec:
  policyServer: default
  module: registry://ghcr.io/kubewarden/policies/user-group-psp:latest
  rules:
  - apiGroups: ["", "apps"]
    apiVersions: ["v1"]
    resources: ["pods", "deployments"]
    operations:
    - CREATE
    - UPDATE
  mutating: true
  settings:
    run_as_user:
      rule: "MustRunAs"
      overwrite: false
      ranges:
        - min: 1000
          max: 2000
        - min: 4000
          max: 5000
    run_as_group:
      rule: "RunAsAny"
    supplemental_groups:
      rule: "RunAsAny"
EOF
```

</details>

Check the policy is active before continuing:

```shell
kubectl get clusteradmissionpolicy.policies.kubewarden.io/user-group-psp
```

When the policy is active, re-create the deployment:

<details>

<summary><code>kubectl</code> command recreating the deployment</summary>

```shell
kubectl delete deployment -n my-namespace nginx-deployment && \
kubectl apply -n my-namespace -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: template-nginx
  template:
    metadata:
      labels:
        app: template-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        securityContext:
          runAsNonRoot: true
          allowPrivilegeEscalation: false
          capabilities:
            drop:
              - "ALL"
          seccompProfile:
            type: "RuntimeDefault"

        ports:
        - containerPort: 80
EOF
```

</details>

Now the deployment is mutated by Kubewarden's policy which allows the Pod to be started.
The container defined inside the Pod has a default `runAsUser` value:

```shell
kubectl get pods -n my-namespace nginx-deployment-57d8568bbb-nv8fj -o json | jq ".spec.containers[].securityContext"
{
  "allowPrivilegeEscalation": false,
  "capabilities": {
    "drop": [
      "ALL"
    ]
  },
  "runAsNonRoot": true,
  "runAsUser": 1000,
  "seccompProfile": {
    "type": "RuntimeDefault"
  }
}
```

The Kubewarden integration can do more in this scenario.
It can check the value of the `runAsUser` provided.

This resource is rejected by the Kubewarden policy from earlier:

<details>

<summary><code>kubectl</code> command to show resource rejection</summary>

```shell
kubectl apply -n my-namespace -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment2
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: template-nginx
  template:
    metadata:
      labels:
        app: template-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        securityContext:
          runAsNonRoot: true
          runAsUser: 7000
          allowPrivilegeEscalation: false
          capabilities:
            drop:
              - "ALL"
          seccompProfile:
            type: "RuntimeDefault"
        ports:
        - containerPort: 80
EOF
```

</details>

It's rejected because the `runAsUser` value is set to `7000`, which is outside the ranges allowed by the policy:

```shell
kubectl get deploy -n my-namespace nginx-deployment -o json | jq ".status.conditions[] | select(.reason == \"FailedCreate\")"
{
  "lastTransitionTime": "2022-10-28T19:22:04Z",
  "lastUpdateTime": "2022-10-28T19:22:04Z",
  "message": "admission webhook \"clusterwide-user-group-psp.kubewarden.admission\" denied the request: User ID outside defined ranges",
  "reason": "FailedCreate",
  "status": "True",
  "type": "ReplicaFailure"
}
```

## Summary

PSA provides an easy way to secure Kubernetes clusters.
The main goal of PSA is simplicity and it doesn't have the power and flexibility of the earlier PSP.

Using Kubewarden together with PSA helps fill this gap.
