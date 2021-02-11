# Running Policies

Running policies is by far the most common operation that a Kubernetes
operator will perform. You can configure as many policies as you want,
targeting any kind of resource and operation on those
resources. Policies that will run in a Kubernetes cluster is not a
static setting and might evolve over time: new policies can be
enforced, existing policies modified, updated or removed...

The recommended deployment model of Chimera on top of Kubernetes is to
use the [`chimera-controller`
project](https://github.com/chimera-kube/chimera-controller).

With the `chimera-controller` project you will be able to manage
admission policies in a very easy, safe and straightforward way.

## Deploy the `chimera-controller`

First of all, you will need an operative Kubernetes cluster, with a
`kubectl` context pointing to it.

1. Deploy `cert-manager`:

    ```console
    $ kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.1.0/cert-manager.yaml
    $ kubectl wait --for=condition=Available deployment --timeout=2m -n cert-manager --all
    ```

1. Deploy the `chimera-controller` after `cert-manager` is ready:

    ```console
    $ kubectl apply -f https://raw.githubusercontent.com/chimera-kube/chimera-controller/v0.0.1/config/generated/all.yaml
    $ kubectl wait --for=condition=Available deployment --timeout=2m -n chimera-controller-system --all
    ```

At this point, the `chimera-controller` is monitoring custom resources
of group/version `chimera.suse.com/v1alpha1` and kind
`AdmissionPolicy`.

## `AdmissionPolicy` resource

The `AdmissionPolicy` resource is the core of the `chimera-controller`
project. This resource is how you control the admission policies that
run in your cluster.

`AdmissionPolicy` resources can only be created and deleted at this
time, they cannot be edited.

> **NOTE:** Admission policies are registered with a `*` webhook
> `scope`, which means that registered webhooks will be forwarded all
> requests matching the given `resources` and `operations` -- either
> namespaced (in any namespace), or cluster-wide resources.

> **NOTE:** The `AdmissionPolicy` resource is cluster-wide. There are
> plans to also provide a namespaced version that will only impact
> registered namespaced resources on its own namespace.

```yaml
apiVersion: chimera.suse.com/v1alpha1
kind: AdmissionPolicy
metadata:
  name: admissionpolicy-sample
spec:
  module: registry://ghcr.io/chimera-kube/policies/pod-privileged:v0.0.1
  resources:
  - pods
  operations:
  - CREATE
```

* `module`: this is the location of the module, several schemas are
  supported.
  * `registry`: an [OCI
    artifacts](https://github.com/opencontainers/artifacts) compliant
    registry.
  * `http`, `https`: download from a regular HTTP server.
  * `file`: load the module from the local filesystem. This is not
    recommended, as the admission server will run in a container.

* `resources`: what type of resources should be forwarded to this
  admission policy by the API server for evaluation.

* `operations`: what operations for the previously given types should
  be forwarded to this admission policy by the API server for
  evaluation.

* `env` (optional): an arbitrary map that will be exposed as
  environment variables to the Wasm module. This allows you to provide
  static configuration to the module at definition time that will be
  exposed to the module at runtime.

## Admission policy reconciliation

The `chimera-controller` reconciles `AdmissionPolicy` resources,
managing different resources on your cluster. This is the list of
resources:

* Secret that contains automatically generated keys and certificates
  for the webhook server in the `chimera-controller-system` namespace.

* Webhook server deployment in the `chimera-controller-system`
  namespace.

* Webhook service deployment in the `chimera-controller-system`
  namespace.

* Admission registration registered against the listed resources and
  operations, forwarding admission requests to the service registered
  in the previous step.

## Deploy a sample admission policy

Let's deploy the previous example and check how it works:

```console
$ kubectl apply -f - <<EOF
apiVersion: chimera.suse.com/v1alpha1
kind: AdmissionPolicy
metadata:
  name: admissionpolicy-sample
spec:
  module: registry://ghcr.io/chimera-kube/policies/pod-privileged:v0.0.1
  resources:
  - pods
  operations:
  - CREATE
EOF
admissionpolicy.chimera.suse.com/admissionpolicy-sample created
```

The [`pod-privileged`
policy](https://github.com/chimera-kube/pod-privileged-policy) is a
very simple policy example that will reject any pod resource that
contains at least one privileged container.

Now that we have created the `AdmissionPolicy` resource, we can check
that the controller has deployed the webhook, with the same name that
we gave the admission policy in the previous step, in this case
`admissionpolicy-sample`:

```console
$ kubectl get validatingwebhookconfiguration admissionpolicy-sample
<snip>
```

Let's try to create a pod with no privileged containers:

```console
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: valid-pod
spec:
  containers:
    - name: nginx
      image: nginx:latest
EOF
```

Getting as a result:

```console
pod/valid-pod created
```

Now, let's try to create a pod with at least one privileged container:

```console
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: invalid-pod
spec:
  containers:
    - name: nginx
      image: nginx:latest
      securityContext:
          privileged: true
EOF
```

Getting as a result:

```console
Error from server: error when creating "STDIN": admission webhook "admissionpolicy-sample.chimera.admission" denied the request: User cannot schedule privileged containers
```

## Remove an admission policy

Removing admission policies is as simple as creating them. All we need
is to delete the `AdmissionPolicy` resource, letting the controller
cleanup every other resource linked to it:

```console
$ kubectl delete admissionpolicy admissionpolicy-sample
admissionpolicy.chimera.suse.com "admissionpolicy-sample" deleted
```

Now, we can double check that we can create a pod that having this
admission policy deployed would be considered invalid:

```console
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: invalid-pod
spec:
  containers:
    - name: nginx
      image: nginx:latest
      securityContext:
          privileged: true
EOF
```

Getting as a result:

```console
pod/invalid-pod created
```

## Wrapping up

As we have seen, the `AdmissionPolicy` resource is the core type that
a cluster operator has to manage, the rest of the resources needed to
run the policies and configure them will be taken care of
automatically by the `chimera-controller` project.
