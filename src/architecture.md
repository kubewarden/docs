# Architecture

## Diagram

TBD

## Main components

`kubewarden` has these main components:

- [`kubewarden-controller`](https://github.com/kubewarden/kubewarden-controller):
  this is the component that is deployed on top of the Kubernetes
  cluster that you want to enrich with Wasm admission and mutation
  policies.

- [`policy-server`](https://github.com/kubewarden/policy-server):
  its main responsibility is to instantiate the Wasm policies inside
  safe Wasm sandboxes. A single `policy-server` can instantiate a
  number of policies, each one running in a sandboxed environment,
  lacking access to other policies execution environment.

### `kubewarden-controller`

The `kubewarden-controller` is deployed on top of the target
Kubernetes cluster and its main duty is to reconcile
`ClusterAdmissionPolicy` resources.

For every discovered `ClusterAdmissionPolicy` resource, it takes care
of reconciling the following resources in the Kubernetes cluster:

1. The `policy-server` deployment, so that this deployment
   instantiates all policies defined in `ClusterAdmissionPolicy`
   custom resources.

1. The `policy-server` internal Kubernetes service, used by the
   API server to communicate with the `policy-server` webhook.

1. Generates secrets required for the webhook to be registered and
   configured on the Kubernetes API server.

1. Once the `policy-server` deployment is ready, it registers a
   `ValidatingWebhookConfiguration` or a
   `MutatingWebhookConfiguration` resource on the API server, so that
   it starts querying the webhook for resource validation or mutation.

### `policy-server`

The `policy-server` is a regular HTTP server exposed by a service
created by the `kubewarden-controller`.

For every registered policy, the `policy-server` performs the
following operations:

1. Download all Wasm policy binary artifacts from each policy origin:
    1. Local filesystem
    1. HTTP server
    1. OCI-artifacts enabled registry
2. Start a threaded worker pool
    1. For each policy,
        1. Initialize a Wasm runtime sandbox.
        1. Initialize a waPC host instance, so policies (waPC guests)
           and the waPC host can communicate with each other.
        1. Link a URL path to this policy, so when a request comes in,
           the right policy gets called.

#### Kubernetes cluster context awareness

> **NOTE:** This feature is a work in progress, and not to be depended upon.
>
> Feedback is highly appreciated.

The `policy-server` has capabilities to expose cluster information to
policies, so that they can take decisions based on other existing
resources, and not only based on the resource they are evaluationg in
isolation.

The `policy-server` being a deployment, is deployed on the Kubernetes
cluster with a specific service account, that is able to list and
watch a subset of Kubernetes resources, meaning:

* Namespaces
* Services
* Ingresses

This information is exposed to policies (waPC guests) through a
well known procedure call set of endpoints, that allows to retrieve
this cached information.

The result of these procedure calls is the JSON-encoded result of the
list of resources, as provided by Kubernetes.

The `policy-server` will be the component responsible for refreshing
this information when it considers, and the policy always retrieves
tha latest available information exposed by the `policy-server`.

## Satellite components

Despite the `kubewarden-controller` and the `policy-server` are the
main components, there are other satellite components worth
mentioning. Let's go through them.

### waPC: Wasm host (`policy-server`) and guest (`policy`) intercommunication

### `policy-testdrive`
