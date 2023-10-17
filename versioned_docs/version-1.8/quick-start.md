---
sidebar_label: "Quick start"
title: "Quick start"
description: Getting started with Kubewarden, installing the Kubewarden stack and taking care of prerequisites and authentication
keywords: [Kubewarden, installation, quick start, policyserver, clusteradmissionpolicy, admissionpolicy]
---


The Kubewarden stack comprises:

* Some `ClusterAdmissionPolicy` resources: this is how policies are defined for Kubernetes clusters

* Some `PolicyServer` resources: representing a deployment of a Kubewarden `PolicyServer`. Your administrator's policies are loaded and evaluated by the Kubewarden `PolicyServer`

* Some `AdmissionPolicy` resources: policies for a defined namespace

* A deployment of a `kubewarden-controller`: this controller monitors the `ClusterAdmissionPolicy` resources and interacts with the Kubewarden `PolicyServer` components.

:::tip

The Kubernetes Custom Resource Definitions (CRD) defined by Kubewarden are described [here](operator-manual/CRDs.md).

:::

## Installation

:::info Prerequisites
The Helm chart depends on `cert-manager`. Ensure you install [`cert-manager`](https://cert-manager.io/docs/installation/) *before* the `kubewarden-controller` chart.

You install the latest version of `cert-manager` by running the following commands:

```console
kubectl apply -f https://github.com/jetstack/cert-manager/releases/latest/download/cert-manager.yaml
```

```console
kubectl wait --for=condition=Available deployment --timeout=2m -n cert-manager --all
```

:::

:::info Authentication
Kubewarden policies can be retrieved from the GitHub container registry at https://ghcr.io.
You need authentication to use the repository with the Kubewarden CLI, a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) (PAT).
Their documentation guides you through creating one if you have not already done so.
Then you authenticate with a command like:

```console
echo $PAT | docker login ghcr.io --username <my-gh-username> --password-stdin
```

:::

Deploy the Kubewarden stack using `helm` charts as follows:

```console
helm repo add kubewarden https://charts.kubewarden.io
```

```console
helm repo update kubewarden
```

Install the following Helm charts inside the `kubewarden` namespace in your Kubernetes cluster:

* `kubewarden-crds`, which will register the `ClusterAdmissionPolicy`,
  `AdmissionPolicy` and `PolicyServer` Custom Resource Definitions.  As well as
  the `PolicyReport` Custom Resource Definitions used by the audit scanner

* `kubewarden-controller`, which will install the Kubewarden controller and the
  audit scanner
:::note
If you want to disable the audit scanner component. Please check out the audit
scanner installation [docs page](../howtos/audit-scanner).
:::

* `kubewarden-defaults`, which will create a `PolicyServer` resource named `default`. It can also install a set of
recommended policies to secure your cluster by enforcing some well known best practices.

```console
helm install --wait -n kubewarden --create-namespace kubewarden-crds kubewarden/kubewarden-crds
```

```console
helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller
```

```console
helm install --wait -n kubewarden kubewarden-defaults kubewarden/kubewarden-defaults
```

:::caution
Since [`v0.4.0`](https://github.com/kubewarden/kubewarden-controller/releases/tag/v0.4.0), a `PolicyServer` resource named `default` will not be created using the `kubewarden-controller` chart.
Now a Helm chart called `kubewarden-defaults`, installs
the default policy server.

This means that if you are not using the latest version of the `kubewarden-controller` and are trying to upgrade or delete,
your default policy server will not be upgraded or deleted.
So, you might run into issues if you try to install the `kubewarden-defaults` with some conflicting information, for example, the same policy server name.
To be able to take advantage of future upgrades in the `kubewarden-defaults` Helm chart remove the
existing `PolicyServer` resource created by the `kubewarden-controller` before installing the new chart.
Now you can update your policy server using Helm upgrades without resource conflicts.
When you remove the `PolicyServer`, all the policies bound to it will be removed as well.
:::

The default configuration values are sufficient for most deployments. All options are documented [here](https://charts.kubewarden.io/#configuration).

## Main components

Kubewarden has three main components which you will interact with:

* The PolicyServer
* The ClusterAdmissionPolicy
* The AdmissionPolicy

### PolicyServer

A Kubewarden `PolicyServer` is managed by the `kubewarden-controller` and multiple `PolicyServers` can be deployed in the same Kubernetes cluster.

A `PolicyServer` validates incoming requests by executing Kubewarden policies against them.

This is the default `PolicyServer` configuration:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: PolicyServer
metadata:
  name: reserved-instance-for-tenant-a
spec:
  image: ghcr.io/kubewarden/policy-server:v1.3.0
  replicas: 2
  serviceAccountName: ~
  env:
  - name: KUBEWARDEN_LOG_LEVEL
    value: debug
```

:::note
Check the [latest released `PolicyServer` version](https://github.com/kubewarden/policy-server/pkgs/container/policy-server) and change the tag to match.
:::

Overview of the attributes of the `PolicyServer` resource:

| Required | Placeholder         | Description    |
|:--------:| ------------------- | ----------------------------- |
| Y | `image`  | The name of the container image |
| Y | `replicas`  | The number of desired instances |
| N | `serviceAccountName` | The name of the `ServiceAccount` to use for the `PolicyServer` deployment. If no value is provided, the default `ServiceAccount` from the namespace, where the `kubewarden-controller` is installed, will be used |
| N | `env` | The list of environment variables |
| N | `annotations` | The list of annotations |

Changing any of these attributes causes a `PolicyServer` deployment with the new configuration.

### ClusterAdmissionPolicy

The `ClusterAdmissionPolicy` resource is the core of the Kubewarden stack. It defines how policies evaluate requests.

Enforcing policies is the most common operation which a Kubernetes administrator performs.
You can declare as many policies as you want, each will target one or more Kubernetes resources (i.e., `pods`, `Custom Resource`).
You will also specify the type of operations to be applied to targeted resources.
The operations available are `CREATE`, `UPDATE`, `DELETE` and `CONNECT`.

Default `ClusterAdmissionPolicy` configuration:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-capabilities
spec:
  policyServer: reserved-instance-for-tenant-a
  module: registry://ghcr.io/kubewarden/policies/psp-capabilities:v0.1.9
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
| N | `policy-server`  | Identifies an existing `PolicyServer` object. The policy will be served only by this `PolicyServer` instance. A `ClusterAdmissionPolicy` that doesn't have an explicit `PolicyServer`, will be served by the one named `default` |
| Y | `module`  | The location of the Kubewarden policy. The following schemes are allowed: |
| N | | - `registry`: The policy is downloaded from an [OCI artifacts](https://github.com/opencontainers/artifacts) compliant container registry. Example: `registry://<OCI registry/policy URL>` |
| N | | - `http`, `https`: The policy is downloaded from a regular HTTP(s) server. Example: `https://<website/policy URL>` |
| N | | - `file`: The policy is loaded from a file in the computer file system. Example: `file:///<policy WASM binary full path>` |
| Y | `resources` | The Kubernetes resources evaluated by the policy |
| Y | `operations` | What operations for the previously given types should be forwarded to this admission policy by the API server for evaluation. |
| Y | `mutating` | A boolean value that must be set to `true` for policies that can mutate incoming requests |
| N | `settings` | A free-form object that contains the policy configuration values |
| N | `failurePolicy` | The action to take if the request evaluated by a policy results in an error. The following options are allowed: |
| N | | - `Ignore`: an error calling the webhook is ignored and the API request is allowed to continue |
| N | | - `Fail`: an error calling the webhook causes the admission to fail and the API request to be rejected |

:::note
The  `ClusterAdmissionPolicy` resources are registered with a `*` webhook `scope`, which means that registered webhooks will forward all requests matching the given `resources` and `operations` -- either namespaced or cluster-wide resources.
:::

### AdmissionPolicy

`AdmissionPolicy` is a namespace-wide resource.
The policy will process only the requests that are targeting the Namespace where the `AdmissionPolicy` is defined.
Other than that, there are no functional differences between the `AdmissionPolicy` and `ClusterAdmissionPolicy` resources.

:::info
`AdmissionPolicy` requires Kubernetes 1.21.0 or above. This is because we are using the `kubernetes.io/metadata.name` label, which was introduced in Kubernetes 1.21.0
:::

The complete documentation of these Custom Resources can be found [here](https://github.com/kubewarden/kubewarden-controller/blob/main/docs/crds/README.asciidoc) or on [docs.crds.dev](https://doc.crds.dev/github.com/kubewarden/kubewarden-controller).

## Example: Enforce your first policy

We will use the [`pod-privileged`](https://github.com/kubewarden/pod-privileged-policy) policy.
We want to prevent the creation of privileged containers inside our Kubernetes cluster by enforcing this policy.

Let's define a `ClusterAdmissionPolicy` to do that:

```console
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.2.2
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

This produces the following output:

```console
clusteradmissionpolicy.policies.kubewarden.io/privileged-pods created
```

When a `ClusterAdmissionPolicy` is defined, the status is set to `pending`, and it will force a rollout of the targeted `PolicyServer`.
In our example, it's the `PolicyServer` named `default`. You can monitor the rollout by running the following command:

```console
kubectl get clusteradmissionpolicy.policies.kubewarden.io/privileged-pods
```

You should see the following output:

```console
NAME              POLICY SERVER   MUTATING   STATUS
privileged-pods   default         false      pending
```

Once the new policy is ready to be served, the `kubewarden-controller` will register a [ValidatingWebhookConfiguration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io) object.

The `ClusterAdmissionPolicy` status will be set to `active` once the Deployment is done for every `PolicyServer` instance.
Show `ValidatingWebhookConfiguration` with the following command:

```console
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l kubewarden
```

You should see the following output:

```console
NAME                          WEBHOOKS   AGE
clusterwide-privileged-pods   1          9s
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
Error from server: error when creating "STDIN": admission webhook "clusterwide-privileged-pods.kubewarden.admission" denied the request: Privileged container is not allowed
```
:::note
Both examples didn't define a `namespace`, which means the `default` namespace was the target.
However, as you could see in the second example, the policy is still applied.
As stated above, this is due to the scope being cluster-wide and not targeting a specific namespace.
:::

## Uninstall

You can remove the resources created by uninstalling the `helm` charts as follows:

```console
helm uninstall --namespace kubewarden kubewarden-defaults
```
```console
helm uninstall --namespace kubewarden kubewarden-controller
```
```console
helm uninstall --namespace kubewarden kubewarden-crds
```

Once the `helm` charts have been uninstalled, remove the Kubernetes namespace that was used to deploy the Kubewarden stack:

```console
kubectl delete namespace kubewarden
```

:::caution
Kubewarden contains a helm pre-delete hook that will remove all `PolicyServers` and `kubewarden-controller`.
Then the `kubewarden-controller` will delete all resources, so it is important that `kubewarden-controller` is running when helm uninstall is executed.
:::

`ValidatingWebhookConfigurations` and `MutatingWebhookConfigurations` created by kubewarden should be deleted, this can be checked with:

```console
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"
```
```console
kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"
```

If these resources are not automatically removed, remove them manually by using the following command:

```console
kubectl delete -l "kubewarden" validatingwebhookconfigurations.admissionregistration.k8s.io
```

```console
kubectl delete -l "kubewarden" mutatingwebhookconfigurations.admissionregistration.k8s.io
```

## Wrapping up

`ClusterAdmissionPolicy` is the core resource that a cluster operator has to manage. The `kubewarden-controller` module automatically takes care of the configuration for the rest of the resources needed to run the policies.

Now, you are ready to deploy Kubewarden! Have a look at the policies on [hub.kubewarden.io](https://hub.kubewarden.io), on [GitHub](https://github.com/topics/kubewarden-policy), or reuse existing Rego policies as shown in the [following chapters](./writing-policies/rego/01-intro-rego.md).
