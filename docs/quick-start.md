---
sidebar_label: "Quick Start"
title: ""
---

# Quick Start

The Kubewarden stack is made of the following components:

* An arbitrary number of `ClusterAdmissionPolicy` resources: this is how policies are defined inside Kubernetes
* An arbitrary number of `PolicyServer` resources: this component represents a Deployment of a Kubewarden `PolicyServer`. The policies defined by the administrators are loaded and evaluated by the Kubewarden `PolicyServer`
* A Deployment of `kubewarden-controller`: this is the controller that monitors the `ClusterAdmissionPolicy` resources and interacts with the Kubewarden `PolicyServer` components

## Installation

> **PREREQUISITES:**
>
> Currently, the chart depends on `cert-manager`. Make sure you have [`cert-manager` installed](https://cert-manager.io/docs/installation/) *before* installing the `kubewarden-controller` chart.
>
> You can install the latest version of `cert-manager` by running the following commands:
>
```console
kubectl apply -f https://github.com/jetstack/cert-manager/releases/latest/download/cert-manager.yaml
```
```console
kubectl wait --for=condition=Available deployment --timeout=2m -n cert-manager --all
```

The Kubewarden stack can be deployed using `helm` charts as follows:

```console
helm repo add kubewarden https://charts.kubewarden.io

helm install --wait -n kubewarden --create-namespace kubewarden-crds kubewarden/kubewarden-crds

helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller

helm install --wait -n kubewarden kubewarden-defaults kubewarden/kubewarden-defaults
```

The following charts should be installed inside the `kubewarden` namespace in your Kubernetes cluster:

* `kubewarden-crds`, which will register the `ClusterAdmissionPolicy` and `PolicyServer` Custom Resource Definitions

* `kubewarden-controller`, which will install the Kubewarden controller

* `kubewarden-defaults`, which will create a `PolicyServer` resource named `default`. It can also installs a set of
recommended policies to secure your cluster by enforcing some well known best practices.


> **WARNING:**
> Since [`v0.4.0`](https://github.com/kubewarden/kubewarden-controller/releases/tag/v0.4.0), a PolicyServer resource named default will not be created using the `kubewarden-controller` chart.
> There is another Helm chart called `kubewarden-defaults`, which now installs
> the default policy server.
>
> This also means that if you are not using the latest version of the `kubewarden-controller` and are trying to upgrade,
> your default policy server will not be upgraded or deleted. As a result, you might run into
> issues if you try to install the `kubewarden-defaults` with some conflicting information, for example the same policy server name.
> Therefore, to be able to take advantage of future upgrades in the `kubewarden-defaults` helm chart you need to remove the
> existing PolicyServer resource created by the `kubewarden-controller` before installing the new chart. With this step, you ensure that you are able to update your policy server using Helm upgrades without running into
> resource conflicts. It worth mentioning that when you remove the PolicyServer, all the policies bounded to it will be removed as well.

> **QUICK NOTE:**
>
> The default configuration values should be good enough for the majority of deployments. All options are documented [here](https://charts.kubewarden.io/#configuration).

## Main components

Kubewarden has three main components which you will interact with:
* The PolicyServer
* The ClusterAdmissionPolicy
* The AdmissionPolicy

### PolicyServer

A Kubewarden `PolicyServer` is completely managed by the `kubewarden-controller` and multiple `PolicyServers` can be deployed in the same Kubernetes cluster.

The `PolicyServer` is the component which executes the Kubewarden policies when requests arrive and validates them.

Default `PolicyServer` configuration:

```yaml
apiVersion: policies.kubewarden.io/v1alpha2
kind: PolicyServer
metadata:
  name: reserved-instance-for-tenant-a
spec:
  image: ghcr.io/kubewarden/policy-server:v0.3.0
  replicas: 2
  serviceAccountName: ~
  env:
  - name: KUBEWARDEN_LOG_LEVEL
    value: debug
```

> **NOTE:** Check the [latest released PolicyServer version](https://github.com/kubewarden/policy-server/pkgs/container/policy-server) and change the tag accordantly.

Overview of the attributes of the `PolicyServer` resource:

| Required | Placeholder         | Description    |
|:--------:| ------------------- | ----------------------------- |
| ✅ | `image`  | The name of the container image |
| ✅ | `replicas`  | The number of desired instances |
| - | `serviceAccountName` | The name of the `ServiceAccount` to use for the `PolicyServer` deployment. If no value is provided, the default `ServiceAccount` from the namespace, where the `kubewarden-controller` is installed, will be used |
| - | `env` | The list of environment variables |
| - | `annotations` | The list of annotations |

Changing any of these attributes will lead to a rollout of the `PolicyServer` Deployment with the new configuration.

### ClusterAdmissionPolicy

The `ClusterAdmissionPolicy` resource is the core of the Kubewarden stack. This resource defines how policies evaluate requests.

Enforcing policies is the most common operation which a Kubernetes administrator will perform. You can declare as many policies as you want, and each policy will target one or more specific Kubernetes resources (i.e., `pods`, `Custom Resource`). You will also specify the type of operation(s) that will be applied for the targeted resource(s). The operations available are `CREATE`, `UPDATE`, `DELETE` and `CONNECT`.

Default `ClusterAdmissionPolicy` configuration:

```yaml
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-capabilities
spec:
  policyServer: reserved-instance-for-tenant-a
  module: registry://ghcr.io/kubewarden/policies/psp-capabilities:v0.1.3
  rules:
  - apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["pods"]
    operations:
    - CREATE
    - UPDATE
  mutating: true
  settings:
    allowed_capabilities:
    - CHOWN
    required_drop_capabilities:
    - NET_ADMIN
```

Overview of the attributes of the `ClusterAdmissionPolicy` resource:

| Required | Placeholder         | Description    |
|:--------:| ------------------- | ----------------------------- |
| - | `policy-server`  | Identifies an existing `PolicyServer` object. The policy will be served only by this `PolicyServer` instance. A `ClusterAdmissionPolicy` that doesn't have an explicit `PolicyServer`, will be served by the one named `default` |
| ✅ | `module`  | The location of the Kubewarden policy. The following schemes are allowed: |
| | | - `registry`: The policy is downloaded from an [OCI artifacts](https://github.com/opencontainers/artifacts) compliant container registry. Example: `registry://<OCI registry/policy URL>` |
| | | - `http`, `https`: The policy is downloaded from a regular HTTP(s) server. Example: `https://<website/policy URL>` |
| | | - `file`: The policy is loaded from a file in the computer filesystem. Example: `file:///<policy WASM binary full path>` |
| ✅ | `resources` | The Kubernetes resources evaluated by the policy |
| ✅ | `operations` | What operations for the previously given types should be forwarded to this admission policy by the API server for evaluation. |
| ✅ | `mutating` | A boolean value that must be set to `true` for policies that can mutate incoming requests |
| - | `settings` | A free-form object that contains the policy configuration values |
| - | `failurePolicy` | The action to take if the request evaluated by a policy results in an error. The following options are allowed: |
| | | - `Ignore`: an error calling the webhook is ignored and the API request is allowed to continue |
| | | - `Fail`: an error calling the webhook causes the admission to fail and the API request to be rejected |

> **NOTE:** The  `ClusterAdmissionPolicy` resources are registered with a `*` webhook `scope`, which means that registered webhooks will forward all requests matching the given `resources` and `operations` -- either namespaced (in any namespace), or cluster-wide resources.

### AdmissionPolicy

`AdmissionPolicy` is a namespace-wide resource. The policy will process only the requests that are targeting the Namespace where the `AdmissionPolicy` is defined. Other than that, there are no functional differences between the `AdmissionPolicy` and `ClusterAdmissionPolicy` resources.
> **NOTE:**  `AdmissionPolicy` requires kubernetes 1.21.0 or above. This is because we are using the `kubernetes.io/metadata.name` label, which was introduced in kubernetes 1.21.0

The complete documentation of these Custom Resources can be found [here](https://github.com/kubewarden/kubewarden-controller/blob/main/docs/crds/README.asciidoc) or on [docs.crds.dev](https://doc.crds.dev/github.com/kubewarden/kubewarden-controller).

## Example: Enforce your first policy

For this first example, we will use the [`pod-privileged` policy](https://github.com/kubewarden/pod-privileged-policy).
Our goal will be to prevent the creation of privileged containers inside our Kubernetes cluster by enforcing this policy.

Let's define a `ClusterAdmissionPolicy` for that:

```console
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9
  rules:
  - apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["pods"]
    operations:
    - CREATE
    - UPDATE
  mutating: false
EOF
```

This will produce the following output:
```console
clusteradmissionpolicy.policies.kubewarden.io/privileged-pods created
```

When a  `ClusterAdmissionPolicy` is defined, the status is set to `pending`, and it will force a rollout of the targeted `PolicyServer`. In our example, it's the `PolicyServer` named `default`. You can monitor the rollout by running the following command:

```console
kubectl get clusteradmissionpolicy.policies.kubewarden.io/privileged-pods
```

You should see the following output:

```console
NAME              POLICY SERVER   MUTATING   STATUS
privileged-pods   default         false      pending
```

Once the new policy is ready to be served, the `kubewarden-controller` will register a [ValidatingWebhookConfiguration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io) object.

The `ClusterAdmissionPolicy` status will be set to `active` once the Deployment is done for every `PolicyServer` instance. The `ValidatingWebhookConfiguration` can be shown with the following command:

```console
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l kubewarden
```

You should see the following output:

```console
NAME              WEBHOOKS   AGE
privileged-pods   1          9s
```

Once the `ClusterAdmissionPolicy` is active and the `ValidatingWebhookConfiguration` is registered, you can test the policy.

First, let's create a Pod with a Container *not* in `privileged` mode:

```console
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: unprivileged-pod
spec:
  containers:
    - name: nginx
      image: nginx:latest
EOF
```

This will produce the following output:

```console
pod/unprivileged-pod created
```

The Pod is successfully created.

Now, let's create a Pod with at least one Container `privileged` flag:

```console
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: privileged-pod
spec:
  containers:
    - name: nginx
      image: nginx:latest
      securityContext:
          privileged: true
EOF
```

The creation of the Pod has been denied by the policy and you should see the following message:

```console
Error from server: error when creating "STDIN": admission webhook "privileged-pods.kubewarden.admission" denied the request: User 'minikube-user' cannot schedule privileged containers
```

> **NOTE:** both examples didn't define a `namespace`, which means the `default` namespace was the target. However, as you could see in the second example, the policy is still applied. As stated above, this is due to the scope being cluster-wide and not targeting a specific namespace.

## Uninstall

You can remove the resources created by uninstalling the `helm` charts as follow:

```console
helm uninstall --namespace kubewarden kubewarden-defaults

helm uninstall --namespace kubewarden kubewarden-controller

helm uninstall --namespace kubewarden kubewarden-crds
```

Once the `helm` charts have been uninstalled, you can remove the Kubernetes namespace that was used to deploy the Kubewarden stack:

```console
kubectl delete namespace kubewarden
```

> **Note:** kubewarden contains a helm pre-delete hook that will remove all `PolicyServers` and `kubewarden-controller`.
> Then the `kubewarden-controller` will delete all resources, so it is important that `kubewarden-controller` is running when helm uninstall is executed.

`ValidatingWebhookConfigurations` and `MutatingWebhookConfigurations` created by kubewarden should be deleted, this can be checked with:

```console
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"

kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"
```


If these resources are not automatically removed, you can remove them manually by using the following command:

```console
kubectl delete -l "kubewarden" validatingwebhookconfigurations.admissionregistration.k8s.io

kubectl delete -l "kubewarden" mutatingwebhookconfigurations.admissionregistration.k8s.io
```
## Wrapping up

As we have seen, `ClusterAdmissionPolicy` is the core resource that a cluster operator has to manage. The `kubewarden-controller` module automatically takes care of the configuration for the rest of the resources needed to run the policies.

Now, you are ready to deploy Kubewarden! Have a look at the policies on [hub.kubewarden.io](https://hub.kubewarden.io), [on Github](https://github.com/topics/kubewarden-policy), or reuse existing Rego policies as shown in the [following chapters!](./writing-policies/rego/01-intro-rego.md)
