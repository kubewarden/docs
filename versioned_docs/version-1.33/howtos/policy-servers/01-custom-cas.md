---
sidebar_label: Using Custom CAs
title: Using custom certificate authorities
description: Using custom certificate authorities with Kubewarden policy servers.
keywords: [kubewarden, kubernetes, custom certificate authorities]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, policy-servers, custom-certificate-authorities]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/policy-servers/custom-cas"/>
</head>

## Custom Certificate Authorities for Policy registries

It's possible to specify and configure the Certificate Authorities that a
PolicyServer uses when pulling the ClusterAdmissionPolicy artifacts from the
policy registry. The following `spec` fields configure the deployed
`policy-server` executable to that effect.

### Insecure sources

:::note

The default behavior of `kwctl` and `policy-server` is to enforce HTTPS with
trusted certificates matching the system CA store. You can interact with
registries using untrusted certificates or even without TLS, by using the
`insecure_sources` setting. This approach is **highly discouraged** for
environments closer to production.

:::

To configure the PolicyServer to accept insecure connections to specific
registries, use the `spec.insecureSources` field of PolicyServer. This field
accepts a list of insecure URIs. For example:

```yaml
spec:
  insecureSources:
    - localhost:5000
    - host.k3d.internal:5000
```

See the [Custom Certificates Authority](../custom-certificate-authorities.md)
documentation for more information on how the `policy-server` executable treats
insecure URIs.


### Custom Certificate Authorities

You can configure the PolicyServer with a custom certificate chain of 1 or more
certificates for a specific URI. To do this you use the field
`spec.sourceAuthorities`.

This field is a map of URIs, each with its own list of strings that contain
Privacy-Enhanced Mail (PEM) encoded certificates. For example:

```yaml
spec:
  sourceAuthorities:
    "registry-pre.example.com":
      - |
        -----BEGIN CERTIFICATE-----
        ca-pre1-1 PEM cert
        -----END CERTIFICATE-----
      - |
        -----BEGIN CERTIFICATE-----
        ca-pre1-2 PEM cert
        -----END CERTIFICATE-----
    "registry-pre2.example.com:5500":
      - |
        -----BEGIN CERTIFICATE-----
        ca-pre2 PEM cert
        -----END CERTIFICATE-----
```

See the [Custom Certificate Authorities](../custom-certificate-authorities.md)
documentation for more information on how the `policy-server` executable treats
them.
