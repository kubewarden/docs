---
sidebar_label: Custom Certificate Authorities
sidebar_position: 50
title: Custom certificate authorities
description: Using custom certificate authorities with Kubewarden.
keywords: [kubewarden, kubernetes, custom certificate authorities]
doc-persona: [kubewarden-user, kubewarden-operator, kubewarden-distributor, kubewarden-integrator]
doc-type: [howto]
doc-topic: [distributing-policies, custom-certificate-authorities]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/custom-certificate-authorities"/>
</head>

With both of `kwctl` and `policy-server`
you can pull policies from Open Container Initiative (OCI) registries and HTTP servers.
You can only push policies to OCI registries.
By default, HTTPS is used with host TLS verification for this.

The system's certificate authority (CA) store is used to
validate the trusted chain of certificates from the OCI registry.
In a standard Kubewarden installation, the `policy-server` uses the
CA store shipped with its Linux container.
On the client side, `kwctl` uses your operating system CA store.

If you are using the
[Kubewarden Controller](https://github.com/kubewarden/kubewarden-controller),
you can configure the PolicyServer via its
[`spec` fields](/howtos/policy-servers/01-custom-cas.md).

:::note

The default behavior of `kwctl` and `policy-server` enforces HTTPS with trusted certificates matching the system CA store.
You can interact with registries using untrusted certificates or even without TLS, by using the `insecure_sources` setting.
Clearly, it's not for production environments.

:::

## The `sources.yaml` file

You can tune the push-pull behavior of `kwctl` and `policy-server` using the `sources.yaml` file.

For reference details, check the [`sources.yaml`](../reference/sources_yaml.md) reference.
