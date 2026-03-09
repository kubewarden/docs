---
sidebar_label: Cryptographic capabilities
title: Cryptographic capabilities
description: Cryptographic capabilities.
keywords:
  [kubewarden, kubernetes, policy specification, cryptographic capabilities]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic:
  [
    writing-policies,
    specification,
    host-capabilities,
    cryptographic-capabilities,
  ]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/host-capabilities/crypto"/>
</head>

Because of Wasm constraints at the time of writing, some cryptographic
libraries cannot be compiled to Wasm. In the meantime, Kubewarden policies
needing those libraries can perform callbacks to evaluate the cryptographic
functions on the host side. They receive the result, and continue with their
tasks.

## Behaviour

The Wasm host relies on `rustls-wepki` for the implementation of x.509 and PKI certificates.
This means:

- Key usage: We have elected to accept any key usage, which helps covering
  several use cases (as usual, please get in contact if you would like to discuss
  different approaches).
- Certificate chains: A certificate will be considered untrusted if its
  intermediate CA is expired.
- Certificate expiration dates: If a certificate chain is provided, we will
  always validate the certificate's entire validity period. Wepki does not check
  the expiration of the root CA.
- We always validate the certificate, and if no chain is provided, the
  Mozilla's CA is used.

## WaPC protocol contract

If you are implementing your own language SDK, these are the functions
performing cryptographic checks exposed by the host:

#### waPC function - `v1/is_certificate_trusted` input

```hcl
# Certificate:
{
  # **mandatory**: Which encoding is used by the certificate
  # Either the string "Pem" or "Der".
  "encoding": string,
  # Actual certificate
  # The certificate is UTF-8 encoded.
  # It's an array of bytes of the unicode code pointers of a PEM/DER encoded
  # certificate string.
  "data": [byte(int), ..., byte(int)]
}

{
  # **mandatory**: PEM-encoded certificate to verify
  "cert": Certificate,
  # optional:
  "cert_chain": [
      # list of certs, ordered by trust
      # usage (intermediates first, root last)
      # If not provided, the Mozilla's CA is used.
      Certificate,
      ...
      Certificate,
    ],
  # RFC 3339 time format string, to check expiration
  # against.
  # If missing, time is now
  "not_after": string
}
```

#### waPC function - `v1/is_certificate_trusted` output

```hcl
{
   # true if certificate verified:
   "trusted": boolean,
   # empty if trusted == true:
   "reason": string
}
```
