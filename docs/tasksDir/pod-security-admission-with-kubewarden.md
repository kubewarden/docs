---
sidebar_label: "Using Pod Security Admission with Kubewarden"
title: ""
---

# Using Pod Security Admission with Kubewarden

Starting from Kubernetes 1.25 release, the Pod Security Policies have been removed
and have been replaced by [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/),
also known as *"PSA"*.

Pod Security Admission has been created to simplify the process of securing Pods
defined inside of Kubernetes clusters. Because of that it doesn't expose the
same amount of configuration knobs provided by Pod Security Policies.

Pod Security Admission works at the Namespace level and provides three profiles
that can be applied: `privileged`, `baseline` and `restricted`.
The `privileged` profile has few limitations, while the `restricted` one is the
one that tightens Pod permissions.

In addition to choosing the profile to be used, the Kubernetes operators can decide
what kind of action is going to be performed by Pod Security Admission controller
once a violation is detected. The possible actions are: `enforce`, `audit` and
`warn`.

Pod Security Admission is not a full replacement for the old Pod Security Policies.
Currently, with the Kubernetes 1.25 release, it suffers the following limitations:

* No mutation capabilities
* Higher level objects (like `Deployment`, `Job`) are evaluated only when the
  `audit` or `warn` modes are enabled

A solution like Kubewarden can be used to **integrate** a Pod Security Admission
profile to workaround these limitations.

:::note
Kubewarden can be used to replace all the previous Pod Security Policies
as shown [here](../tasksDir/psp-migration.md).
However, the goal of this article is to demonstrate how Kubewarden can complement
the new Pod Security Admission.
:::

## Example

Now let's take a look in the example creating a Namespace where the most restrictive Pod Security Admission policies are enforced:

```console
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

This PSA profile does not allow the creation of containers that run their
application as root user.
In other words, when defining a container, the `runAsNonRoot` attribute must be set to `true`
and the `runAsUser` one cannot be set to `0`.

Therefore, the following resource will not reach its desired state:

```console
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
          runAsUser: 0
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

If we check the Deployment, we can see the Pod Security Admission is preventing
its Pod from being created:

```console
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

The user can fix this issue removing the `runAsUser` from the container definition:

```console
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

This time the Pod Security Admission will allow the Pod to be created, but the Pod creation will still fail.

```console
kubectl get pods -n my-namespace
NAME                                READY   STATUS                       RESTARTS   AGE
nginx-deployment-57d8568bbb-h4bx7   0/1     CreateContainerConfigError   0          47s

```

That's happening because the container definition didn't specify which user should
be used when starting a program inside of the container. That results with the
the root user (`0`) being used, which is not allowed by the `runAsNonRoot` directive:

```console
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

This is where Kubewarden can help. In this case the 
[`user-group-policy`]
(https://artifacthub.io/packages/kubewarden/user-group-psp/user-group-psp)
policy can be used to mutate the Deployment definition, configuring a default
user to be used to all the containers that omit this information.
Or even enforcing a user ID range. Let's apply the policy:
The policy even allows to set a user ID range:

:::note
This example assumes the Kubewarden stack is already installed inside of your
Kubernetes cluster.
See the [QuickStart](../quick-start.md) article
for more details.
:::

```console
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

Before moving forward, we have to wait for the policy to be active. This can be
checked with the following command:

```console
kubectl get clusteradmissionpolicy.policies.kubewarden.io/user-group-psp
```

Once the policy is active, we can re-create the Deployment:

```console
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

This time the Deployment definition is mutated by Kubewarden's policy, allowing
the Pod to be started.
The container defined inside of the Pod will have a default `runAsUser` value:

```console
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

The Kubewarden integration can do even more in this scenario: it can
validate the value of the `runAsUser` provided by the users.

For example, the following resource will be reject by the Kubewarden policy
we previously enforced:

```console
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

The rejection happens because the `runAsUser` value is set to `7000`,
which is outside of the ranges allowed by the policy:

```console
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

Pod Security Admission provide an easy way to secure Kubernetes clusters.
The main goal of PSA is simplicity, because of that they do not offer all the
power and flexibility of the previous Pod Security Policies.

Kubewarden can be used together with Pod Security Admission to fill this gap.
