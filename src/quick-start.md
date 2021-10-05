# Quick Start

The Kubewarden stack is made of the following components:

* An arbitrary number of `ClusterAdmissionPolicy` resources: this is how policies
  are defined inside of Kubernetes
* An arbitrary number of `PolicyServer` resources, which represent a Deployment of a Kubewarden `policy-server`.
  This component loads all the policies defined by the administrators and evaluates them
* A Deployment of `kubewarden-controller`: this is the controller
  that monitors the `ClusterAdmissionPolicy` resources and interacts
  with the Kubewarden `policy-server`

## Install

The Kubewarden stack can be deployed using a helm chart.
Currently, the chart depends on cert-manager. Make sure you have [`cert-manager` installed](https://cert-manager.io/docs/installation/) and then install the kubewarden-controller chart. For example:

```console
helm repo add kubewarden https://charts.kubewarden.io
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml
helm install --create-namespace -n kubewarden kubewarden-crds kubewarden/kubewarden-crds
helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller
```

This will install on the Kubernetes cluster:
* `kubewarden-crds`  will register the
`ClusterAdmissionPolicy` and `PolicyServer` Custom Resources.

* `kubewarden-controller` with
the default configuration. It will create a `PolicyServer` resource named `default`. The components of the
Kubewarden stack will be deployed inside of a Kubernetes Namespace
called `kubewarden`.

The default configuration values should be good enough for the majority of
deployments, all the options are documented [here](https://charts.kubewarden.io/#configuration).

The Kubewarden Policy Servers are completely managed by the `kubewarden-controller`.

## Policy Server

Represents a Deployment of Kubewarden `policy-server`, which receives the requests to be validated. It does that
by executing Kubewarden's policies

```yaml
apiVersion: policies.kubewarden.io/v1alpha2
kind: PolicyServer
metadata:
  name: reserved-instance-for-tenant-a
spec:
  image: ghcr.io/kubewarden/policy-server:v1.0.0
  replicaSize: 2
  serviceAccountName: sa
  env:
  - name: KUBEWARDEN_LOG_LEVEL
    value: debug
  - name: KUBEWARDEN_LOG_FMT
    value: jaeger
  annotations:
    sidecar.jaegertracing.io/inject: default
  ```

Overview of the attributes of the `PolicyServer` resource:

* `image`: container image name
* `replicaSize`: number of desired instances
* `serviceAccountName` (optional): `policy-server` ServiceAccount. Namespace's `default` ServiceAccount will be used if nothing is provided
* `env` (optional): `policy-server` environment variables
* `annotations` (optional): `policy-server` annotations

Changing any of these attributes will lead to a rollout of the `policy-server` Deployment with the new configuration.

## Kubewarden Policies

Enforcing policies is by far the most common operation a Kubernetes
administrator will perform. You can declare as many policies as you want,
targeting any kind of Kubernetes resource and type of operation that can be
done against them.

The `ClusterAdmissionPolicy` resource is the core of the Kubewarden stack: this is
how validating policies are defined.

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

This is a quick overview of the attributes of the `ClusterAdmissionPolicy` resource:

* `policyServer`(optional): identifies an existing `PolicyServer` object. The policy will be served only by this
 `policy-server` instance. A `ClusterAdmissionPolicy` that doesn't have an explicit `PolicyServer`, will be served
  by the one named `default`.
* `module`: this is the location of the Kubewarden policy, several schemas are
  supported.
    * `registry`: download from an [OCI artifacts](https://github.com/opencontainers/artifacts)
      compliant container registry
    * `http`, `https`: download from a regular HTTP(s) server
    * `file`: load the module from the local filesystem
* `resources`: types of resources evaluated by the policy
* `operations`: what operations for the previously given types should
  be forwarded to this admission policy by the API server for
  evaluation.
* `mutating`: a boolean value that must be set to `true` for policies that can
  mutate incoming requests.
* `settings` (optional): a free-form object that contains the policy
  configuration values.
* `failurePolicy` (optional): how unrecognized errors and timeout errors from
  the policy are handled. Allowed values are `Ignore` or `Fail`. `Ignore` means
  that an error calling the webhook is ignored and the API request is allowed
  to continue. `Fail` means that an error calling the webhook causes the
  admission to fail and the API request to be rejected.
  The default behaviour is `Fail`.

The complete documentation of this Custom Resource can be found
[here](https://github.com/kubewarden/kubewarden-controller/blob/main/docs/crds/README.asciidoc)
or on
[docs.crds.dev](https://doc.crds.dev/github.com/kubewarden/kubewarden-controller).

> **NOTE:** ClusterAdmissionPolicy resources are registered with a `*` webhook
> `scope`, which means that registered webhooks will be forwarded all
> requests matching the given `resources` and `operations` -- either
> namespaced (in any namespace), or cluster-wide resources.

> **NOTE:** The `ClusterAdmissionPolicy` resource is cluster-wide. There are
> plans to also provide a namespaced version that will only impact
> registered namespaced resources on its own namespace.

## Enforce your first policy

We will use the [`pod-privileged` policy](https://github.com/kubewarden/pod-privileged-policy).
This policy prevents the creation of privileged containers inside of a Kubernetes cluster.

Let's define a `ClusterAdmissionPolicy` for that:

```shell
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.5
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
`clusteradmissionpolicy.policies.kubewarden.io/privileged-pods created`

Defining the `ClusterAdmissionPolicy` will set its status to `pending`, and it will lead to a rollout of the `PolicyServer` named `default`. Once the new policy is ready to be served, the `kubewarden-controller`
will register a [ValidatingWebhookConfiguration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io)
object.

`ClusterAdmissionPolicy` status will be set to `active` once all the instances of Deployment rollout of the `policy-server` is done. The
`ValidatingWebhookConfiguration` can be shown with:

```shell
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l kubewarden
```

Which will output something like

```
NAME              WEBHOOKS   AGE     STATUS
privileged-pods   1          9s      active
```

Let's try to create a Pod with no privileged containers:

```shell
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

This will produce the following output, which means the Pod was successfully
created:

`pod/unprivileged-pod created`

Now, let's try to create a pod with at least one privileged container:

```shell
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

This time the creation of the Pod will be blocked, with the following message:

```
Error from server: error when creating "STDIN": admission webhook "privileged-pods.kubewarden.admission" denied the request: User 'minikube-user' cannot schedule privileged containers
```

## Uninstall

```shell
helm uninstall --namespace kubewarden kubewarden-controller
helm uninstall --namespace kubewarden kubewarden-crds
```

Once this is done you can remove the Kubernetes namespace that was used to deploy
the Kubewarden stack:

```shell
kubectl delete namespace kubewarden
```

> **Note:** kubewarden contains a helm pre-delete hook that will remove all `PolicyServers` and `kubewarden-controller`.
> Then the `kubewarden-controller` will delete all resources, so it is important that `kubewarden-controller` is running
> when helm uninstall is executed. 

`ValidatingWebhookConfigurations` and `MutatingWebhookConfigurations` created by kubewarden should be deleted, this can be checked with:

```shell
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden" && \
kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"
```

If these resources are not automatically removed, you can do
remove them manually by using the following command:

```shell
kubectl delete -l "kubewarden" validatingwebhookconfigurations.admissionregistration.k8s.io && \
kubectl delete -l "kubewarden" mutatingwebhookconfigurations.admissionregistration.k8s.io
```
## Wrapping up

As we have seen, the `ClusterAdmissionPolicy` resource is the core type that
a cluster operator has to manage, the rest of the resources needed to
run the policies and configure them will be taken care of
automatically by the `kubewarden-controller` project.
