# Context aware policies

> **NOTE:** This feature is a work in progress, and not to be depended upon.
>
> Feedback is highly appreciated.

The `policy-server` has capabilities to expose cluster information to
policies, so that they can take decisions based on other existing
resources, and not only based on the resource they are evaluated in
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
the latest available information exposed by the `policy-server`.
