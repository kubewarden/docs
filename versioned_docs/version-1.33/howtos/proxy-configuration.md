---
sidebar_label: Proxy configuration
sidebar_position: 60
title: Proxy configuration
description: Using proxies with Kubewarden.
keywords: [kubewarden, kubernetes, proxy, proxies]
doc-persona: [kubewarden-user, kubewarden-operator, kubewarden-distributor, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, proxy]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/proxy-configuration"/>
</head>

For both of `kwctl` and `policy-server` you can configure HTTP and HTTPS
proxies, as well as exempt domains from this proxy configuration.

You can do this in two ways:
- By setting the environment variables `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`
  (and its lowercase counterparts) for either `kwctl` or `policy-server`. To
  configure a PolicyServer CR, set its `spec.env` array.
- By providing a `sources.yaml` file via the `--sources-path` argument. A
  `sources.yaml` file has precedence over the environment variables. Consuming
  this configuration via the `spec` field is not yet exposed in PolicyServer CRs.

Setting a proxy configuration influences:

- Policy pull, push , pull-and-run from and to the OCI registry.
- Host capabilities from context-aware calls, such as:
  - Container registry, like obtaining an OCI manifest or manifest digest.
    Instead of hitting the OCI registry directly, traffic will be routed
    through the configured proxies.
  - Sigstore capabilities, like verifying a keyless signature. Instead
    of hitting the Sigstore defined services, traffic will be routed through
    the configured proxies.

### Example

You can set the following environment variables, for either `kwctl` or
`policy-server` (through the PolicyServer `spec.env`):

```
  HTTP_PROXY="http://proxy.corp:3128"
  https_proxy="http://proxy.corp:3129"
  NO_PROXY="localhost,.corp"
```

With this configuration:
- Unsecured traffic via HTTP, such as the one to and from  an insecure OCI
  registry, is routed through `http://proxy.corp:3128`. This
  will affect pulling policies, and policies calling context-aware capabilities
  that have OCI image manifest digests for containers in that repository.
- Encrypted traffic via HTTPS  will be routed through
  `https://proxy.corp:3129`. For example, this includes pulling and pushing
  policies to any secure OCI registry, and the mentioned context-aware capabilities
  of policies.
- Traffic to and from localhost or any domain under `.corp` will be exempt of the
  previous configurations.


## The `sources.yaml` file

For more details, check the [`sources.yaml`](../reference/sources_yaml.md)
reference.
