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

Kubewarden context aware policies require access to resources from the Kubernetes cluster where they are running.
For that, the Kubewarden SDKs expose functions that use the waPC communication protocol to talk with the host system asking for data about the cluster.

## waPC protocol contract

Internally, the SDKs rely on these functions exposed by the policy host environment:

- `list_resources_by_namespace` : Given a resource type and a namespace, list all the resources of that type that are defined in it.
  This cannot be used to list cluster-wide resources, like `Namespace`.
- `list_resources_all`: Given a resource type, list all the resources of that type that are defined inside the whole cluster.
  This can be used to list cluster-wide resources, like `Namespace`.
- `get_resource`: Find the exact resource identified by the given resource type, given name and an optional namespace identifier.

This guest-host communication is performed using the standard waPC host calling mechanism.
Any guest implementing the waPC intercommunication mechanism is able to request this information from the host.

waPC has the following function arguments when performing a call from the guest to the host:

- Binding - `kubewarden`
- Namespace - `kubernetes`
- Operation - `list_resources_all`, `list_resources_by_namespace`, or `get_resource`
- Payload - input payload - see below

and returns:

- Payload - output payload - see below

By contract, or by convention,
policies can retrieve the Kubernetes cluster information by calling the host in the following ways:

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

Return a Kubernetes [`List`](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds), which is a collection of Kubernetes objects of the same type.

:::caution
This API function returns an error when used to fetch cluster-wide resources
(for example, namespaces).
Use the `list_resources_all` when dealing with cluster-wide resources.
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
