# Quick Start

The Kubewarden stack is made of the following components:

  * An arbitrary number of `ClusterAdmissionPolicy` resources: this is how policies
    are defined inside of Kubernetes
  * A Deployment of Kubewarden `policy-server`: this component loads all the
    policies defined by the administrators and evaluates them
  * A Deployment of `kubewarden-controller`: this is the controller that monitors
    the `AdmissionPolicy` resources and interacts with the Kubewarden `policy-server`

## Install

The Kubewarden stack can be deployed using a helm chart:

```console
helm repo add kubewarden https://charts.kubewarden.io
helm install --namespace kubewarden --create-namespace kubewarden-controller kubewarden/kubewarden-controller
```

This will install `kubewarden-controller` on the Kubernetes cluster in the default
configuration and will register the `AdmissionPolicy` Custom Resource. The
components of the Kubewarden stack will be deployed inside of a Kubernetes
Namespace called `kubewarden`.

The default configuration values should be good enough for the majority of
deployments, all the options are documented [here](https://charts.kubewarden.io/#configuration).

The Kubewarden Policy Server is completely managed by the kubewarden-controller.

## Kubewarden Policies

Enforcing policies is by far the most common operation a Kubernetes
administrator will perform. You can declare as many policies as you want,
targeting any kind of Kubernetes resource and type of operation that can be
done against them.

The `ClusterAdmissionPolicy` resource is the core of the Kubewarden stack: this is
how validating policies are defined.

```yaml
apiVersion: policies.kubewarden.io/v1alpha1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-capabilities
spec:
  module: registry://ghcr.io/kubewarden/policies/psp-capabilities:v0.1.1
  resources:
  - pods
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

```console
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha1
kind: ClusterAdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.4
  resources:
  - pods
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

Defining the `ClusterAdmissionPolicy` will lead to a rollout of the Kubewarden Policy
Server Deployment. Once the new policy is ready to be served, the `kubewarden-controller`
will register a [ValidatingWebhookConfiguration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io)
object.

Once all the instances of `policy-server` are ready, the
`ValidatingWebhookConfiguration` will be visible:

```console
$ kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l kubewarden
NAME              WEBHOOKS   AGE
privileged-pods   1          9s
```

Let's try to create a Pod with no privileged containers:

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

This will produce the following output, which means the Pod was successfully
created:

```console
pod/unprivileged-pod created
```

Now, let's try to create a pod with at least one privileged container:

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

This time the creation of the Pod will be blocked, with the following message:

```console
Error from server: error when creating "STDIN": admission webhook "privileged-pods.kubewarden.admission" denied the request: User 'minikube-user' cannot schedule privileged containers
```

## Uninstall

As a first step remove all the `ClusterAdmissionPolicy` resources you have created.
This can be done with the following command:

```shell
kubectl delete --all clusteradmissionpolicies.policies.kubewarden.io
```

Then wait for the for the `kubewarden-controller` to remove all the
Kubernetes `ValidatingWebhookConfiguration` and the `MutatingWebhookConfiguration`
resources it created.

This can be monitored with the following command:

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

Finally you can uninstall the Helm chart:

```shell
helm uninstall kubewarden-controller
```

Once this is done you can remove the Kubernetes namespace that was used to deploy
the Kubewarden stack:

```shell
kubectl delete namespace kubewarden
```

This will delete all the resources that were created at runtime by the `kubewarden-controller`,
like the `policy-server` Deployment.


> **Note well:** it's extremely important to remove the `ValidatingWebhookConfiguration`
> and `MutatingWebhookConfiguration` resources **before** the
> `policy-server` Deployment. Otherwise the Kubernetes
> API server will continuously face timeout errors while trying to evaluate the
> incoming requests.
>
> By default the `ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration`
> resources created by Kubewarden have `policyFailure`
> set to `Fail`, which will cause all these incoming requests to be rejected.
>
> **This could bring havoc on your cluster.**

## Wrapping up

As we have seen, the `ClusterAdmissionPolicy` resource is the core type that
a cluster operator has to manage, the rest of the resources needed to
run the policies and configure them will be taken care of
automatically by the `kubewarden-controller` project.
