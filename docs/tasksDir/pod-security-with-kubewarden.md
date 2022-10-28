---
sidebar_label: "Pod Security Admission"
title: ""
---

# Using Pod Security Admission with Kubewarden

Starting in the Kubernetes `v1.25` the [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/) feature is consider stable. It has been created to help operators enforce security rules in the namespace level. It can be used to enforce some of the same rules provided by the, now deprecated, Pod Security Policies. With the Pod Security Admission, cluster operators are able to define [three different levels](https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline) of compliance for each namespace: `privileged`, `baseline` and `restricted`. Where `privileged` is the most unrestricted. While the `restricted`, as the name suggests, is the most restrictive rules.  The admission controller also allows the cluster administrator define what kind of operation is performed when a violation occurs. The actions are: `enforce`, `audit` and `warn`. See the Kubernetes documentation to get more information about how this [feature works](https://kubernetes.io/docs/tasks/configure-pod-container/enforce-standards-namespace-labels/).

However, be the time of this writing, the Pod Security Admission is not able to enforce the rules for workload objects (e.g. `Deployments`, `Job`). It can only evaluate this kind of resources when used with `audit` or `warn` modes. Furthermore, it cannot mutates resources on demand. Therefore, cluster operators can use the Pod Security Admission together with Kubewarden. Where Pod Security policies will enforce best practices. And Kubewarden will be responsible to complement adding more security rules as well as mutating resources, if necessary. Furthermore, Kubewarden can be used to enforce rules in a cluster wide fashion, while different namespaces can be configure with different security policies using Pod Security Admission.

:::tip
> It's also possible to enforce the same level of security using Kubewarden policies only. But this goal here is to show how both can be used together.
:::



## Example

Now let's take a look in the example creating a namespace where the most restrictive Pod Security Admission policies are enforced:

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


In this namespace we want to ensure that none container can run with a root user. In other words, `runAsNonRoot` must be set to `true` and `runAsUser` cannot be `0`. Therefore, the follow resource will not run:

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

If we check the deployment, we can see the the Pod Security Admission is preventing the pods from being created:

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

As the `restricted` policies allow any non zero value or `undefined` for the `runAsUser` field, the user can fix this issue removing the `runAsUser` from the `Deployment` containers.

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

This way, the Pod Security Admission will allow the pod to be created. But in this case the creation will failed because the default user used is not allowed. Because the container image will try to run as root and the `runAsNonRoot` does not allow that:

```console
kubectl get pods -n my-namespace
NAME                                READY   STATUS                       RESTARTS   AGE
nginx-deployment-57d8568bbb-h4bx7   0/1     CreateContainerConfigError   0          47s

```

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

This is where Kubewarden can help. In this case the `user-group-policy` can be used to mutate the request adding a default user. Avoiding this kind of problems. Or even enforcing a user ID range. Let's apply the policy:

:::note
This documentation expects that you already have the Kubewarden stack installed. See the QuickStart for instructions on how to install Kubewarden.
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

Now the resource will be mutated and the container will have a default `runAsUser` value complient with the Pod Security Admission rules and Kubewarden policies:

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

Besides that, even if the resource creator define a non zero value, with the Kubewarden policy you can add another level of verification. Ensuring that the value is from a predefined range. In this case, between `1000` ~ `2000` or `4000` ~ `5000`. Thus, the following resource will be reject by Kubewarden:

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


This is an simple example how users can leverage Pod Security Admission and Kubewarden together, mixing the policies to make the cluster more secure.

