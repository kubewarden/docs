# Context aware policies

> **NOTE:** This feature is a work in progress, and not to be depended
> upon. Features described here are incomplete and subject to change
> at any time until the feature stabilizes.
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

## Accessing the cluster context

Language SDK's that support cluster context at this time will expose
functions that allow policies to retrieve the current state of the
cluster.

The workflow we have seen until now has been that the policy exposes
well known waPC functions, namely: `validate` and
`validate_settings`. At some point, the host will call these functions
when it requires either to validate a request, or to validate the
settings that were provided to it for the given policy.

In this case, after the host calls to the `validate` waPC function in
the guest, the guest is able to retrieve cluster information in order
to produce a response to the `validate` waPC function that was called
by the host on the guest.

This guest-host intercommunication is performed using the regular waPC
host calling mechanism, and so any guest implementing the waPC
intercommunication mechanism is able to request this information from
the host.

waPC has the following function arguments when performing a call from
the guest to the host:

* Binding
* Namespace
* Operation
* Payload

By contract, or convention, policies can retrieve the Kubernetes
cluster information by calling the host in the following ways:

<table>
  <thead>
    <tr>
      <th>Binding</th>
      <th>Namespace</th>
      <th>Operation</th>
      <th>Input payload</th>
      <th>Output payload (JSON format)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>kubernetes</code></td>
      <td><code>ingresses</code></td>
      <td><code>list</code></td>
      <td>N/A</td>
      <td>Result of <code>GET /apis/networking.k8s.io/v1/ingresses</code></td>
    </tr>
    <tr>
      <td><code>kubernetes</code></td>
      <td><code>namespaces</code></td>
      <td><code>list</code></td>
      <td>N/A</td>
      <td>Result of <code>GET /apis/v1/namespaces</code></td>
    </tr>
    <tr>
      <td><code>kubernetes</code></td>
      <td><code>services</code></td>
      <td><code>list</code></td>
      <td>N/A</td>
      <td>Result of <code>GET /apis/v1/services</code></td>
    </tr>
  </tbody>
</table>

The request the waPC guest performs to the host is local, and served
from a cache -- this request does not get forwarded to the Kubernetes
API server. The policy-server (host) decides when to refresh this
information from the Kubernetes API server.

> **NOTE:** This is a proof-of-concept at this time, there are plans
> to generalize what resources can be fetched from the cluster, to
> include all built-in Kubernetes types, as well as custom resources.
