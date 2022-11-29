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
<td> WaPC function name </td> <td> Input payload </td> <td> Output payload </td>
</tr>
<tr>
<td>

`v1/is_certificate_trusted`

</td>
<td>

```json
{
  // **mandatory**: PEM-encoded certificate to verify
  "certificate": string,
  // optional:
  "cert_chain": [
      // list of PEM-encoded certs, ordered by trust
      // usage (intermediates first, root last)
      // If empty or missing, certificate is assumed
      // trusted
      string,
      ...
      string,
    ],
  // RFC 3339 time format string, to check expiration
  // against.
  // If missing, certificate is assumed never expired
  "not_after": string
}
```

</td>
<td> 

```json
{
   // true if certificate verified:
   "trusted": boolean,
   // empty if trusted == true:
   "reason": string
}
```

</td>
</tr>
</table>
