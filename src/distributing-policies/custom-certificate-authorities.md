# Custom Certificate Authorities

Both `kwctl` and `policy-server` allow you to pull policies from OCI registries and HTTP servers, as well as pushing to OCI registries. In this process, by default, HTTPS is enforced with host TLS verification.

The system CA store is used to validate the trusted chain of certificates presented by the OCI registry. In a regular Kubewarden installation, the `policy-server` will use the CA store shipped with its Linux container. In the client side, `kwctl` will use your operating system CA store.

If you are using the [Kubewarden Controller](https://github.com/kubewarden/kubewarden-controller),
you can configure the PolicyServer via their `spec` fields, as documented
[here](../operator-manual/policy-servers/01-custom-cert-auths.html).

> **Important**: the default behavior of `kwctl` and `policy-server` is to enforce HTTPS with trusted certificates matching the system CA store. You can interact with registries using untrusted certificates or even without TLS, by using the `insecure_sources` setting. This approach is **highly discouraged** in environments closer to production.

## The `sources.yaml` file

The pull and push behavior of `kwctl` and `policy-server` can be tuned via the `sources.yaml` file.

This file can be provided both to `kwctl` and the `policy-server` in the `--sources-path` argument. Its structure is as follows:

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

This file can be provided in YAML or JSON format. All keys are optional, so the following are also valid `sources.yaml` files:

```yaml
insecure_sources: ["dev.registry.example.com"]
```

As well as:

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
