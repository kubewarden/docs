---
sidebar_label: "Custom Certificate Authorities"
title: ""
---

# Custom Certificate Authorities

With both of `kwctl` and `policy-server`
you can pull policies from Open Container Initiative (OCI) registries and HTTP servers.
You can only push policies to OCI registries.
By default, HTTPS is used with host TLS verification for this.

The system certificate authority (CA) store is used to validate the trusted chain of certificates from the OCI registry.
In a standard Kubewarden installation, the `policy-server` uses the CA store shipped with its Linux container.
On the client side, `kwctl` uses your operating system CA store.

If you are using the
[Kubewarden Controller](https://github.com/kubewarden/kubewarden-controller),
you can configure the PolicyServer via its
[`spec` fields](/operator-manual/policy-servers/01-custom-cas.md).

:::note
The default behavior of `kwctl` and `policy-server` is to enforce HTTPS with trusted certificates matching the system CA store.
You can interact with registries using untrusted certificates or even without TLS, by using the `insecure_sources` setting.
Clearly, this isn't for production environments.
:::

## The `sources.yaml` file

You can tune the push-pull behavior of `kwctl` and `policy-server` using the `sources.yaml` file.

The `--sources-path` argument to both tools specifies the file.

The command `kwctl` tries to load the `sources.yaml` file from these folders if the `--sources-path` argument is omitted:
- Linux `$HOME/.config/kubewarden/sources.yaml` 
- Mac `$HOME/Library/Application Support/io.kubewarden.kubewarden/sources.yaml`
- Windows `$HOME\AppData\Roaming\kubewarden\config\sources.yaml`

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
All keys are optional, so the following are also valid `sources.yaml` files:

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

Hosts listed in the `insecure_sources` configuration behave in a different way than hosts that are not listed.

* Unlisted hosts (default)
  * Try to connect using HTPS, verifying the server identity. If the connection fails, operation is aborted.

* Listed hosts
  * Try to connect using HTTPS verifying the server identity. If the connection fails,
  * Try to connect using HTTPS, skipping host verification. If the connection fails,
  * Try to connect using HTTP. If the connection fails, operation is aborted.

It is generally fine to use `insecure_sources` when using local registries or
HTTP servers when developing locally, to avoid the certificate burden. However,
this setting is **completely discouraged** for environments closer to
production.

### Source authorities

The `source_authorities` is a map that contains URIs and a list of CA
certificates that form a certificate chain for that URI, used to verify the
identity of OCI registries and HTTPs servers.

These certificates can be encoded in PEM or DER format. Certificates in binary
DER format can be provided as a path to a file containing the certificate,
meanwhile certificates in PEM format can either by a path to the certificate
file, or a string with the certificate contents. Both possibilities are
specified via a `type` key:

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
            ca-pre1-3 PEM cert
            -----END CERTIFICATE-----
  "registry-pre2.example.com:5500":
    - type: Path
      path: /opt/example.com/pki/ca-pre2-1.der
```
