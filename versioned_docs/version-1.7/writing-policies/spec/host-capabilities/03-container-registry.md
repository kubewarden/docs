---
sidebar_label: "Container Registry Capabilities"
title: ""
---

# Container registry capabilities

Container registries can be used to distribute many types of OCI objects, going
from well-known container images to generic OCI Artifacts. OCI Artifacts are used
to store objects such as Kubewarden Policies, Helm charts, and more.

Below documented are the capabilities exposed by the Kubewarden host to interact with
container registries.

## Get OCI manifest digest

This function computes the digest of an OCI manifest. This information can
be used to identify an object stored inside of an OCI registry in an immutable
way, as opposed to `tags` which are mutable.

### Caching

Computing the digest involves a series of network requests between the Kubewarden
policy host and the remote registry. These operation can be time expensive,
because of that the results are going to be cached for 1 minute.

### Authentication

Interactions with private registries require the Kubewarden policy host to
authenticate against the remote registry.

The policy host will use the same set of credentials used to fetch policies
from the remote registry.

### Communication protocol

This is the description of the waPC protocol used to expose this capability:

<table>
<tr>
<th> waPC function name </th> <th> Input payload </th> <th> Output payload </th>
</tr>

<tr>
<td>

`v1/manifest_digest`

</td>
<td>

```hcl
# OCI URI - JSON encoded string
string
```

</td>

<td>

```hcl
{
  # digest of the OCI object
  "digest": string
}
```

</td>
</tr>

</table>

For example, when requesting the manifest digest of the `busybox:latest` image,
the payload would be the following ones:

* Input payload: `"busybox:latest"`
* Output payload: `{ "digest": "sha256:69e70a79f2d41ab5d637de98c1e0b055206ba40a8145e7bddb55ccc04e13cf8f"}`

