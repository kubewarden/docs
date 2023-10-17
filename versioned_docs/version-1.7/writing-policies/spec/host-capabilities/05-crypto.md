---
sidebar_label: "Cryptographic Capabilities"
title: ""
---

# Cryptographic capabilities

Because of Wasm constraints at the time of writing, some cryptographic libraries
cannot be compiled to Wasm. In the meantime, Kubewarden policies needing those
can instead perform these callbacks to evaluate the cryptographic functions
host-side, receive the result, and continue with their logic.

# WaPC protocol contract

In case you are implementing your own language SDK, these are the functions
performing cryptographic checks exposed by the host:

<table>
<tr>
<th> waPC function name </th> <th> Input payload </th> <th> Output payload </th>
</tr>
<tr>
<td>

`v1/is_certificate_trusted`

</td>
<td>

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
      # If empty or missing, certificate is assumed
      # trusted
      Certificate,
      ...
      Certificate,
    ],
  # RFC 3339 time format string, to check expiration
  # against.
  # If missing, certificate is assumed never expired
  "not_after": string
}
```

</td>
<td> 

```hcl
{
   # true if certificate verified:
   "trusted": boolean,
   # empty if trusted == true:
   "reason": string
}
```

</td>
</tr>
</table>
