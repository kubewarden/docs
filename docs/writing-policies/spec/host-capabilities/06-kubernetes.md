---
sidebar_label: "Kubernetes Capabilities"
title: ""
---

# Kubernetes Capabilities

Kubewarden context aware policies requires access to resources from the Kubernetes
cluster where they are running on. For that, the Kubewarden SDKs expose functions
that uses the waPC communication protocol to talk with the host system asking for
data about the cluster.

## waPC protocol contract

Under the hood, the SDKs functions rely on these functions exposed by
the policy host environment:

- `list_resources_by_namespace` : waPC function to request resources information from a given namespace
- `list_resources_all`: waPC function to request resources information from the whole cluster
- `get_resource`:  WaPC function to request a resource information by its name


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
<tr>
<th>Binding</th>
<th>Namespace</th>
<th>Operation</th>
<th>Input payload</th>
<th>Output payload (JSON format)</th>
</tr>
<tr>
<td><code>kubewarden</code></td>
<td><code>kubernetes</code></td>
<td><code>list_resources_all</code></td>
<td>

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

</td>
<td>

Return a Kubernetes [`List`](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds), which is a collection of Kubernetes objects of the same type.

:::info
Use this API function to fetch cluster-wide resources (e.g. namespaces)
:::

</td>
</tr>
<tr>
<td><code>kubewarden</code></td>
<td><code>kubernetes</code></td>
<td><code>list_resources_by_namespace</code></td>
<td>

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

</td>
<td>

Return a Kubernetes [`List`](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds), which is a collection of Kubernetes objects of the same type.

:::caution
This API function returns an error when used to fetch cluster-wide resources (e.g. namespaces).
Please use the `list_resources_all` when dealing with cluster-wide resources.
:::

</td>
</tr>
<tr>
<td><code>kubewarden</code></td>
<td><code>kubernetes</code></td>
<td><code>get_resource</code></td>
<td>

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

</td>
<td>Result of <code>GET /apis/$api_version/namespaces/$namespace/$kind/$name </code></td>
</tr>

</table>
