# Architecture

Kubewarden is a Kubernetes policy engine that uses policies written using
WebAssembly.

The Kubewarden stack is made by the following components:

- Kubewarden Custom Resources: these are [Kubenetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
  that simplify the process of managing policies.

- [`kubewarden-controller`](https://github.com/kubewarden/kubewarden-controller):
  this is a Kubernetes controller that reconciles Kubewarden's Custom Resources.
  This component creates parts of the Kubewarden stack and, most important of
  all, translates Kubewarden's concepts into native Kubernetes directives.

- Kubewarden policies: these are WebAssembly modules that hold the validation
  or mutation logic. These are covered in depth inside of [this chapter](/writing-policies/index.html).

- [`policy-server`](https://github.com/kubewarden/policy-server):
  this component receives the requests to be validated. It does that
  by executing Kubewarden's policies.

At the bottom of the stack, Kubewarden's integrates with Kubernetes using the
concept of [Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/).
In particular, Kubewarden operates as a Kubernetes Admission Webhook.
`policy-server` is the actual Webhook endpoint that is reached by Kubernetes
API server to validate relevant requests.

Kubernetes is made aware of the existence of Kubewarden's Webhook endpoints by
`kubewarden-controller`. This is done by registering either
a `MutatingWebhookConfiguration` or a `ValidatingWebhookConfiguration`
object.

This diagram shows the full architecture overview of a cluster running
the Kubewarden stack:

![Full architecture](/images/architecture.png)

## Journey of a Kubewarden policy

The architecture diagram from above can be intimidating at first, this
section explains it step by step.

### Defining the first policy

On a fresh new cluster, the only Kubewarden components defined are its Custom
Resources and the `kubewarden-controller` Deployment.

This chart shows what happens when the first policy is defined inside of the
cluster:

![Defining the first ClusterAdmissionPolicy resource](/images/architecture_sequence_01.png)

`kubewarden-controller` notices the new `ClusterAdmissionPolicy` resource and,
as a result of that, it initializes the `policy-server` component.

As stated above, Kubewarden works as a Kubernetes Admission Webhook. Kubernetes
dictates that all the Webhook endpoints must be secured with TLS.
`kubewarden-controller` takes care of setting up this secure communication
by doing these steps:

1. Generate a self-signed Certificate Authority
1. Use this CA to generate a TLS certificate and a TLS key for the
  `policy-server` Service.

All these objects are stored into Kubernetes as Secret resources.

`kubewarden-controller` then creates a ConfigMap that
holds the configuration of `policy-server`. This configuration includes
the policy defined inside of the `ClusterAdmissionPolicy` resource.

Finally, `kubewarden-controller` will create the `policy-server`
Deployment and a Kubernetes ClusterIP Service to expose it inside of
the cluster network.

### Initialization of `policy-server`

At start time, `policy-server` reads its configuration and downloads
all the Kubewarden policies. Policies can be downloaded from remote
endpoints like HTTP(s) servers and container registries.

Policies' behaviour can be tuned by users via policy-specific configuration
parameters. Once all the policies are downloaded, `policy-server` will ensure
the policy settings provided by the user are valid.

`policy-server` performs the validation of policies's settings by
invoking the `validate_setting` function exposed by each policy.
This topic is covered more in depth inside
of [this section](/writing-policies/spec/01-intro.html) of the documentation.

`policy-server` will exit with an error if one or more policies received wrong
configuration parameters from the end user.

If all the policies are properly configured, `policy-server` will spawn a
pool of worker threads to evaluate incoming requests using the Kubewarden
policies specified by the user.

Finally, `policy-server` will start a HTTPS server that listens to incoming
validation requests. The web server is secured using the TLS key and certificate
that have been previously created by `kubewarden-controller`.

Each policy is exposed by the web server via a dedicated path that follows this
naming convention: `/validate/<policy ID>`.

This is how the cluster looks like once the initialization of `policy-server`
is completed:

![policy-server initialized](/images/architecture_sequence_02.png)

### Making Kubernetes aware of the policy

The `policy-server` Pods have a
[`Readiness Probe`](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/),
`kubewarden-controller` relies on that to know when the `policy-server` Deployment
is ready to evaluate admission reviews.

Once the `policy-server` Deployed is marked as `Ready`, `kubewarden-controller`
will make the Kubernetes API server aware of the new policy by creating either a
`MutatingWebhookConfiguration` or a `ValidatingWebhookConfiguration`
object.

Each policy has its dedicated `MutatingWebhookConfiguration`/`ValidatingWebhookConfiguration`
which points to the Webhook endpoint served by `policy-server`. The endpoint
is reachable by the `/validate/<policy ID>` URL mentioned before.

![Kubernetes Webhook endpoint configuration](/images/architecture_sequence_03.png)

### Policy in action

Now that all the plumbing has been done, Kubernetes will start sending the
relevant Admission Review requests to the right `policy-server` endpoint.

![Policy in action](/images/architecture_sequence_04.png)

`policy-server` receives the Admission Request object and, based on the
endpoint that received the request, uses the right policy to evaluate it.

Each policy is evaluated inside of its own dedicated WebAssembly sandbox.
The communication between `policy-server` (the "host") and the WebAssembly
policy (the "guest") is done using the waPC communication protocol. This is
covered in depth inside of [this](/writing-policies/index.html)
section of the documentation.

## How multiple policies are handled

A cluster can have multiple Kubewarden policies defined. This leads
back to the initial diagram:

![Full architecture](/images/architecture.png)

Each policy is defined via its own `ClusterAdmissionPolicy` resource. All of
them are loaded by the same instance of `policy-server`.

`policy-server` defines multiple validation endpoints, one per policy defined
inside of its configuration file. It's also possible to load the same policy
multiple times, just with different configuration parameters.

The Kubernetes API server is made aware of these policy via the
`ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration` resources
that are kept in sync by `kubewarden-controller`.

Finally, the incoming admission requests are then dispatched by the Kubernetes
API server to the right validation endpoint exposed by `policy-server`.
