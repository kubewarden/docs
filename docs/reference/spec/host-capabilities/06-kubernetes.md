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
Kubernetes cluster where they are running. For that, the Kubewarden SDKs expose
functions that use the waPC communication protocol to talk with the host system
asking for data about the cluster.

## waPC protocol contract

Internally, the SDKs rely on these functions exposed by the policy host
environment:

- `list_resources_by_namespace` : Given a resource type and a namespace, list
  all the resources of that type that are defined in it. This cannot be used to
  list cluster-wide resources, like `Namespace`.
- `list_resources_all`: Given a resource type, list all the resources of that
  type that are defined inside the whole cluster. This can be used to list
  cluster-wide resources, like `Namespace`.
- `get_resource`: Find the exact resource identified by the given resource
  type, given name and an optional namespace identifier.
- `can_i`: Allow policy authors to send `SubjectAccessReview` object to
  Kubernetes authorization API to verify user permissions. Please refer to the
  [Kubernetes authorization
  docs](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)
  for more information.

This guest-host communication is performed using the standard waPC host calling
mechanism. Any guest implementing the waPC intercommunication mechanism is able
to request this information from the host.

waPC has the following function arguments when performing a call from the guest
to the host:

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

Return a Kubernetes
[`List`](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds),
which is a collection of Kubernetes objects of the same type.

:::info
Use this API function to fetch cluster-wide resources (e.g. namespaces)
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

Return a Kubernetes
[`List`](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds),
which is a collection of Kubernetes objects of the same type.

:::caution
This API function returns an error when used to fetch cluster-wide
resources (for example, namespaces). Use the `list_resources_all` when dealing
with cluster-wide resources.
:::

### Operation - `get_resource`

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

This operation determines if a specific user or group has the permission to perform an
action on a Kubernetes resource. It does this by making a
[`SubjectAccessReview`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#subjectaccessreview-v1-authorization-k8s-io)
request to the Kubernetes API server.

#### Input

The `can_i` operation requires a JSON object with the following parameters:

```hcl
{
  "subject_access_review": {
    "groups": null,
    "resource_attributes": {
      "group": "",
      "name": null,
      "namespace": "kube-system",
      "resource": "pods",
      "subresource": null,
      "verb": "create",
      "version": null
    },
    "user": "system:serviceaccount:customer-1:testing"
  },
  "disable_cache": false
}
```

#### Output

The output is a JSON object that contains the status of the
`SubjectAccessReview` request. This object indicates whether the requested
action is allowed or not. For a complete reference of all the fields available in the
output, see the official
[`SubjectAccessReviewStatus`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.32/#subjectaccessreviewstatus-v1-authorization-k8s-io)
documentation.

:::caution
It's important to remember that all of the returned values came from the
Kubernetes authorization API. Therefore, any configuration differences or
future change in the API can affect the results here as well.
:::

Example of an allowed operation. Some of the authorization plugins allows the operation:

```hcl
{
  "allowed": true, // Allowed is required. True if the action would be allowed, false otherwise.
  "denied": false, // Denied is optional. True if the action would be denied, otherwise false. If both allowed is false and denied is false, then the authorizer has no opinion on whether to authorize the action. Denied may not be true if Allowed is true.
  "evaluationError": "EvaluationError is an indication that some error occurred during the authorization check. It is entirely possible to get an error and be able to continue determine authorization status in spite of it. For instance, RBAC can be missing a role, but enough roles are still present and bound to reason about the request.",
  "reason": "Reason is optional. It indicates why a request was allowed or denied."
}
```

Example of an operation blocked by some authorization plugin:

```hcl

{
  "allowed": false,
  "denied": true,
  "evaluationError": "EvaluationError is an indication that some error occurred during the authorization check. It is entirely possible to get an error and be able to continue determine authorization status in spite of it. For instance, RBAC can be missing a role, but enough roles are still present and bound to reason about the request.",
  "reason": "Reason is optional. It indicates why a request was allowed or denied."
}
```

Example of an operation that none of the authorization plugins decided to allow
neither deny the operation:

```hcl
{
  "allowed": false,
  "denied": false,
  "evaluationError": "EvaluationError is an indication that some error occurred during the authorization check. It is entirely possible to get an error and be able to continue determine authorization status in spite of it. For instance, RBAC can be missing a role, but enough roles are still present and bound to reason about the request.",
  "reason": "Reason is optional. It indicates why a request was allowed or denied."
}
```
