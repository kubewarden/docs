---
sidebar_label: Network capabilities
title: Network capabilities
description: Network capabilities.
keywords: [kubewarden, kubernetes, policy specification, network capabilities]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic:
  [writing-policies, specification, host-capabilities, network-capabilities]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/host-capabilities/net"/>
</head>

Kubewarden policies cannot make network request from within the WebAssembly execution context.

Network operations can be done by leveraging a series of capabilities exposed by the host.

## DNS host lookup

This function performs a DNS lookup starting from the FQDN given by the policy.

### Caching

Lookup results are cached for 1 minute.

### Communication protocol

This is the description of the waPC protocol used to expose this capability:

#### waPC function - `v1/dns_lookup_host` input

```hcl
# hostname - JSON encoded string
string
```

#### waPC function - `v1/dns_lookup_host` output

```hcl

{
  # list of IPs
  "ips": [string]
}
```

All the IP addresses associated with the given FQDN,
are going to be returned as strings in the response.
Both IPv4 and IPv6 entries are returned as part of the same response.

For example, when requesting the manifest digest of the
`busybox:latest` image,
the payloads would be:

- Input payload: `"google.com"`
- Output payload: `{ "ips": ["127.0.0.1"]}`
