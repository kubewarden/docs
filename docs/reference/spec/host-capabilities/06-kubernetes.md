---
sidebar_label: Kubernetes capabilities
title: Kubernetes capabilities
description: Kubernetes capabilities.
keywords:
  [kubewarden, kubernetes, policy specification, kubernetes capabilities]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic:
  [writing-policies, specification, host-capabilities, kubernetes-capabilities]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/host-capabilities/kubernetes"/>
</head>

Kubewarden context aware policies require access to resources from the
Kubernetes cluster where they're running. For that, the Kubewarden SDKs expose
functions that use the waPC communication protocol to talk with the host system
asking for data about the cluster.

## waPC protocol contract

Internally, the SDKs rely on these functions exposed by the policy host
environment:

- `list_resources_by_namespace` : Given a resource type and a namespace, list
  all the resources of that type defined in it. You can't use this to list
  cluster-wide resources, like `Namespace`.
- `list_resources_all`: Given a resource type, list all the resources of that
  type defined in the whole cluster. You can use this to list cluster-wide
  resources, like `Namespace`.
- `get_resource`: Find the exact resource identified by the given resource
  type, given name and an optional namespace identifier.
- `can_i`: Send a `SubjectAccessReview` object, as written by the policy authors, to
  Kubernetes authorization API to verify user permissions. Please refer to the
  [Kubernetes authorization
  documentation](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
  for more information.

The standard waPC host calling mechanism performs guest-host communication. Any
guest implementing the waPC intercommunication mechanism is able to request
this information from the host.

The following function arguments are provided by waPc when performing a call
from the guest to the host:

- Binding - `kubewarden`
- Namespace - `kubernetes`
- Operation - `list_resources_all`, `list_resources_by_namespace`, or
  `get_resource`, `can_i`
- Payload - input payload - see below

and returns:

- Payload - output payload - see below

By contract, or by convention, policies can retrieve the Kubernetes cluster
information by calling the host in the following ways:

### Operation - `list_resources_all`

#### Input

```hcl
{
	# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups
	"api_version": string,
	# Resource kind
	"kind": string,
	# Label selector to filter the resources
	"label_selector": string,
	# Field selector to filter the resources
	"field_selector": string
}
```

#### Output

Returns a Kubernetes
[`List`](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds),
which is a collection of Kubernetes objects of the same type.

:::info
Use this API function to fetch cluster-wide resources (for example, namespaces)
:::

### Operation - `list_resources_by_namespace`

#### Input

```hcl
{
	# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups
	"api_version": string,
	# Resource kind
	"kind": string,
	# Namespace where the requested resource lives in
	"namespace": string,
	# Label selector to filter the resources
	"label_selector": string,
	# Field selector to filter the resources
	"field_selector": string
}
```

#### Output

Returns a Kubernetes
[`List`](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds),
which is a collection of Kubernetes objects of the same type.

:::caution

This API function returns an error when used to fetch cluster-wide resources
(for example, namespaces). Use the `list_resources_all` when dealing with
cluster-wide resources.

:::

### Operation - `get_resource`

#### Caching

Result caching of the `get_resource` operation is for five seconds, by default,
to improve performance and reduce unnecessary load on the Kubernetes API
server.

If you require fresh data then use the `disable_cache` field to bypass the
cache.

#### Input

```hcl
{
	# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups
	"api_version": string,
	# Singular PascalCase name of the resource
	"kind": string,
	# Namespace scoping the search
	"namespace": string,
	# The name of the resource
	"name": string,
	# Disable caching of results obtained from Kubernetes API Server
	"disable_cache": bool
}
```

#### Output

Result of `GET /apis/$api_version/namespaces/$namespace/$kind/$name`

### Operation - `can_i`

This operation determines if a specific user or group has the permission to
perform an action on a Kubernetes resource. It does this by making a
[`SubjectAccessReview`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#subjectaccessreview-v1-authorization-k8s-io)
request to the Kubernetes API server.

#### Input

The `can_i` operation requires a JSON object with the following parameters:

```hcl
{
  "subject_access_review": {
    // The groups you're testing for.
    "groups": null,
    // Information for a resource access request
    "resource_attributes": {
      // Group is the API Group of the Resource.  "*" means all.
      "group": "",
      // Name is the name of the resource being requested for a "get" or deleted for a "delete". ""
      // (empty) means all.
      "name": null,
      // Namespace is the namespace of the action being requested.  Currently, there is no
      // distinction between no namespace and all namespaces.
      // - "" (empty) is empty for cluster-scoped resources
      // - "" (empty) means "all" for namespace scoped resources
      "namespace": "kube-system",
      // Resource is one of the existing resource types.  "*" means all.
      "resource": "pods",
      // Subresource is one of the existing resource types.  "" means none.
      "subresource": null,
      // Verb is a kubernetes resource API verb, like: get, list, watch, create, update, delete,
      // proxy.  "*" means all.
      "verb": "create",
      // Version is the API Version of the Resource.  "*" means all.
      "version": null
    },
    // User is the user you're testing for. If you specify "User" but not "Groups", then is it
    // interpreted as "What if User were not a member of any groups
    "user": "system:serviceaccount:customer-1:testing"
  },
  // Disable caching of results obtained from Kubernetes API Server
  // By default query results are cached for 5 seconds, that might cause
  // stale data to be returned.
  // However, making too many requests against the Kubernetes API Server
  // might cause issues to the cluster
  "disable_cache": false
}
```

#### Output

The output is a JSON object that contains the status of the
`SubjectAccessReview` request. It indicates access permissions for the
requested action. For a complete reference of all the fields available in the
output, see the official
[`SubjectAccessReviewStatus`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#subjectaccessreviewstatus-v1-authorization-k8s-io)
documentation.

:::caution

Remember that all returned values come from the Kubernetes authorization API.
Therefore, any configuration differences or future change in the API can affect
the results here as well.

:::

Example of an allowed operation. Some authorization plug-ins permit the
operation:

```hcl
{
  "allowed": true, // Allowed is required. True if the action would be allowed, false otherwise.
  "denied": false, // Denied is optional. True if the action would be denied, otherwise false. If both allowed is false and denied is false, then the authorizer has no opinion on whether to authorize the action. Denied may not be true if Allowed is true.
  "evaluationError": "", // EvaluationError is an indication that some error occurred during the authorization check. It is entirely possible to get an error and be able to continue determine authorization status in spite of it. For instance, RBAC can be missing a role, but enough roles are still present and bound to reason about the request.
  "reason": "" // Reason is optional. It indicates why a request was allowed or denied.
}
```

Example of an operation blocked by some authorization plug-ins:

```hcl

{
  "allowed": false, // Allowed is required. True if the action would be allowed, false otherwise.
  "denied": true,   // Denied is optional. True if the action would be denied, otherwise false. If both allowed is false and denied is false, then the authorizer has no opinion on whether to authorize the action. Denied may not be true if Allowed is true.
  "evaluationError": "", // EvaluationError is an indication that some error occurred during the authorization check. It is entirely possible to get an error and be able to continue determine authorization status in spite of it. For instance, RBAC can be missing a role, but enough roles are still present and bound to reason about the request.
  "reason": "User \"john\" cannot create resource \"pods\" in API group \"\" in the namespace \"development\": no RBAC rule matched" // Reason is optional. It indicates why a request was allowed or denied.
}
```

Example of an operation that none of the authorization plug-ins decided to
neither allow or deny the operation:

```hcl
{
  "allowed": false, // Allowed is required. True if the action would be allowed, false otherwise.
  "denied": false,  // Denied is optional. True if the action would be denied, otherwise false. If both allowed is false and denied is false, then the authorizer has no opinion on whether to authorize the action. Denied may not be true if Allowed is true.
  "evaluationError": "", // EvaluationError is an indication that some error occurred during the authorization check. It is entirely possible to get an error and be able to continue determine authorization status in spite of it. For instance, RBAC can be missing a role, but enough roles are still present and bound to reason about the request.
  "reason": "" // Reason is optional. It indicates why a request was allowed or denied.
}
```
