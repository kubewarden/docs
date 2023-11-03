---
sidebar_label: "Custom Certificate Authorities"
title: ""
---

# Custom Certificate Authorities

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
[`spec` fields](/operator-manual/policy-servers/01-custom-cas.md).

:::note

The default behavior of `kwctl` and `policy-server` enforces HTTPS with trusted certificates matching the system CA store.
You can interact with registries using untrusted certificates or even without TLS, by using the `insecure_sources` setting.
Clearly, it's not for production environments.

:::

## The `sources.yaml` file

You can tune the push-pull behavior of `kwctl` and `policy-server` using the `sources.yaml` file.

The `--sources-path` argument to both tools specifies the file.

The command `kwctl` tries to load the `sources.yaml` file from these folders if the `--sources-path` argument is omitted:
- Linux: `$HOME/.config/kubewarden/sources.yaml`
- Mac: `$HOME/Library/Application Support/io.kubewarden.kubewarden/sources.yaml`
- Windows: `$HOME\AppData\Roaming\kubewarden\config\sources.yaml`

Its structure is as follows:

```yaml
insecure_sources:
  - "registry-dev.example.com"
  - "registry-dev2.example.com:5500"
source_authorities:
  "registry-pre.example.com":
    - type: Path
      path: /opt/example.com/pki/ca-pre1-1.pem
    - type: Path
      path: /opt/example.com/pki/ca-pre1-2.der
  "registry-pre2.example.com:5500":
    - type: Data
      data: |
            -----BEGIN CERTIFICATE-----
            ca-pre2 PEM cert
            -----END CERTIFICATE-----
```

This file is in either YAML or JSON format.
All keys are optional, so the following is a valid `sources.yaml` file:

```yaml
insecure_sources: ["dev.registry.example.com"]
```

As is:

```json
{
    "source_authorities": {
        "host.k3d.internal:5000": [
            {"type": "Data","data":"pem cert 1"},
            {"type": "Data","data":"pem cert 2"}
        ]
    }
}
```

### Insecure sources

Hosts in the `insecure_sources` section behave differently to those not listed.

- Hosts not listed, try:
  - to connect using HTTPS, verifying the server identity

  If the connection fails, then the operation stops.

- Hosts listed in `insecure_sources`, try in order:
  - to connect using HTTPS verifying the server identity
  - to connect using HTTPS, skipping host verification
  - to connect using HTTP

  The operation stops if all fail.

:::note

It's usually fine to use `insecure_sources` when using local registries or
HTTP servers for development.
It avoids the burden of managing certificates.
Clearly, it's not for production use.

:::

### Source authorities

The `source_authorities` section contains URIs and CA certificates.
It forms a certificate chain for that URI.
It's used to verify the identity of OCI registries and HTTPS servers.

These certificates are encoded in either PEM or DER format.
You specify DER format certificates as path to a file containing the certificate.
In PEM format you specify either a path to the certificate file, or a string with the actual certificate.
You specify both with a `type` key:

```yaml
source_authorities:
  "registry-pre.example.com":
    - type: Path
      path: /opt/example.com/pki/ca-pre1-1.pem
    - type: Path
      path: /opt/example.com/pki/ca-pre1-2.der
    - type: Data
      data: |
            -----BEGIN CERTIFICATE-----
            A string with the ca-pre1-3 PEM cert
            -----END CERTIFICATE-----
  "registry-pre2.example.com:5500":
    - type: Path
      path: /opt/example.com/pki/ca-pre2-1.der
```
