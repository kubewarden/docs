# Quick Start

The Chimera stack is made of the following components:

  * An arbitrary number of `AdmissionPolicy` resources: this is how policies
    are defined inside of Kubernetes
  * A Deployment of Chimera `policy-server`: this component loads all the
    policies defined by the administrators and evaluates them
  * A Deployment of `chimera-controller`: this is the controller that monitors
    the `AdmissionPolicy` resources and interacts with the Chimera `policy-server`

## Install

The Chimera stack can be deployed using a helm chart:

```console
helm repo add chimera https://chimera-kube.github.io/helm-charts/
helm install --namespace chimera --create-namespace chimera-controller chimera/chimera-controller
```

This will install `chimera-controller` on the Kubernetes cluster in the default
configuration and will register the `AdmissionPolicy` Custom Resource. The
components of the Chimera stack will be deployed inside of a Kubernetes
Namespace called `chimera`.

The default configuration values should be good enough for the majority of
deployments, all the options are documented [here](https://chimera-kube.github.io/helm-charts/#configuration).

The Chimera Policy Server is completely managed by the chimera-controller.

## Chimera Policies

Enforcing policies is by far the most common operation a Kubernetes
administrator will perform. You can declare as many policies as you want,
targeting any kind of Kubernetes resource and type of operation that can be
done against them.

The `AdmissionPolicy` resource is the core of the Chimera stack: this is
how validating policies are defined.

```yaml
apiVersion: chimera.suse.com/v1alpha1
kind: AdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://ghcr.io/chimera-kube/policies/pod-privileged:v0.1.1
  resources:
  - pods
  operations:
  - CREATE
  - UPDATE
  settings:
    trusted_users:
    - alice
```

This is a quick overview of the attributes of the `AdmissionPolicy` resource:

* `module`: this is the location of the Chimera policy, several schemas are
  supported.
  * `registry`: download from an [OCI artifacts](https://github.com/opencontainers/artifacts)
    compliant container registry
  * `http`, `https`: download from a regular HTTP(s) server
  * `file`: load the module from the local filesystem
* `resources`: types of resources evaluated by the policy
* `operations`: what operations for the previously given types should
  be forwarded to this admission policy by the API server for
  evaluation.
* `settings` (optional): a free-form object that contains the policy
  configuration values.
* `failurePolicy` (optional): how unrecognized errors and timeout errors from
  the policy are handled. Allowed values are `Ignore` or `Fail`. `Ignore` means
  that an error calling the webhook is ignored and the API request is allowed
  to continue. `Fail` means that an error calling the webhook causes the
  admission to fail and the API request to be rejected.
  The default behaviour is `Fail`.

The complete documentation of this Custom Resource can be found
[here](https://github.com/chimera-kube/chimera-controller/blob/main/docs/crds/README.asciidoc)
or on
[docs.crds.dev](https://doc.crds.dev/github.com/chimera-kube/chimera-controller).

> **NOTE:** Admission policies are registered with a `*` webhook
> `scope`, which means that registered webhooks will be forwarded all
> requests matching the given `resources` and `operations` -- either
> namespaced (in any namespace), or cluster-wide resources.

> **NOTE:** The `AdmissionPolicy` resource is cluster-wide. There are
> plans to also provide a namespaced version that will only impact
> registered namespaced resources on its own namespace.

## Enforce your first policy

We will use the [`pod-privileged` policy](https://github.com/chimera-kube/pod-privileged-policy).
This policy regulates who can create privileged containers inside of a Kubernetes cluster.
Only a chosen set of users, or groups of users, will be granted the ability to
create privileged containers.

Let's define a `AdmissionPolicy` that allows only the members of the
`the_trusted_ones` group to create privileged containers:

```console
kubectl apply -f - <<EOF
apiVersion: chimera.suse.com/v1alpha1
kind: AdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://ghcr.io/chimera-kube/policies/pod-privileged:v0.1.1
  resources:
  - pods
  operations:
  - CREATE
  - UPDATE
  settings:
    trusted_groups:
    - the_trusted_ones
EOF
```

This will produce the following output:
```console
admissionpolicy.chimera.suse.com/privileged-pods created
```

Defining the `AdmissionPolicy` will lead to a rollout of the Chimera Policy
Server Deployment. Once the new policy is ready to be served, the `chimera-controller`
will register a [ValidatingWebhookConfiguration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io)
object.

Once all the instances of `policy-server` are ready, the
`ValidatingWebhookConfiguration` will be visible:

```console
$ kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io
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
Error from server: error when creating "STDIN": admission webhook "privileged-pods.chimera.admission" denied the request: User 'minikube-user' cannot schedule privileged containers
```

Let's update the policy to allow our ourselves to create privileged containers.
Note well: our username was part of the previous failure message:

```console
kubectl apply -f - <<EOF
apiVersion: chimera.suse.com/v1alpha1
kind: AdmissionPolicy
metadata:
  name: privileged-pods
spec:
  module: registry://ghcr.io/chimera-kube/policies/pod-privileged:v0.1.1
  resources:
  - pods
  operations:
  - CREATE
  - UPDATE
  settings:
    trusted_users:
    - minikube-user # replace that with your username
    trusted_groups:
    - the_trusted_ones
EOF
```

Let's wait for the Policy Server to be redeployed using the new policy configuration:

```console
kubectl rollout status deployment policy-server
```

Once this is done we can try again:

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

This time the Pod creation will succeed:

```console
pod/privileged-pod created
```

## Uninstall

As a first step remove all the `AdmissionPolicy` resources you have created.
This can be done with the following command:

```shell
kubectl delete --all admissionpolicies.chimera.suse.com
```

Then wait for the for the `chimera-controller` to remove all the
Kubernetes `ValidatingWebhookConfiguration` resources it created.

This can be monitored with the following command:

```shell
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l "chimera"
```

If these resources are not automatically removed, you can do
remove them manually by using the following command:

```shell
kubectl delete -l "chimera" validatingwebhookconfigurations.admissionregistration.k8s.io
```

Finally you can uninstall the Helm chart:

```shell
helm uninstall chimera-controller
```

Once this is done you can remove the Kubernetes namespace that was used to deploy
the Chimera stack:

```shell
kubectl delete namespace chimera
```

This will delete all the resources that were created at runtime by the `chimera-controller`,
like the `policy-server` Deployment.


> **Note well:** it's extremely important to remove the `ValidatingWebhookConfiguration`
> resources **before** the `policy-server` Deployment. Otherwise the Kubernetes
> API server will continuously face timeout errors while trying to evaluate the
> incoming requests.
>
> By default the `ValidatingWebhookConfiguration` created by Chimera have `policyFailure`
> set to `Fail`, which will cause all these incoming requests to be rejected.
> This could bring havoc on your cluster.

## Wrapping up

As we have seen, the `AdmissionPolicy` resource is the core type that
a cluster operator has to manage, the rest of the resources needed to
run the policies and configure them will be taken care of
automatically by the `chimera-controller` project.
