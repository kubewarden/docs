# Signature verifier policies

Kubewarden implements support for the [Sigstore](https://www.sigstore.dev/)
project. This allows to implement a Secure Supply Chain for your cluster.

Part of that is to ensure that all container images running in the cluster are
signed and verified, proving that they come from their stated authors, and
haven't been tampered with. For further reading, do check out the docs on [how we implement a Secure Supply Chain for the policies themselves](TODO link to https://github.com/kubewarden/docs/pull/100/files)).

Sigstore signatures are stored inside of container registries, next to the OCI object being signed;
be it a container image or a more generic OCI artifact,  like a Kubewarden policy.
Given an object to be signed, all its signatures are going to be stored as layers of a special OCI
object created by sigstore. 
Policies that want to check Sigstore signatures of containers need then to check
those layers, and would need to pull the signature layers to see the
signatures themselves.

Obtaining and operating with those OCI layers needs to happen outside of
the WebAssembly guest (the policy). Hence this is done by the WebAssembly runtime: Kubewarden's
`policy-server` or `kwctl.

Just like for context-aware policies, the guest-host intercommunication is
performed using the regular waPC host calling mechanism, and any guest
implementing the waPC intercommunication mechanism is able to request this
information.

The different language SDKs for Kubewarden policies take care of all that, and
provide functions for container image verification. This ensures a safe and
tested codepath for verification. In addition, pulling images and
cryptographically verifying signatures can be time and computationally
expensive, so the SDKs stack ensures that both the image pulls and the
verification computations are cached.

The SDKs provide functions similar to the following:
- ```
  verify_pub_keys_image(
      image_url: string,
      vector_of_pub_keys: vector<string>,
      vector_of_sigstore_annotations: Vector<(key, value: string)>
      )
      returns (is_trusted: bool, digest_of_verified_image: string)
  ```
- ```
  verify_keyless_exact_match(
      image_url: string,
      vector_of_tuples_issuer_and_subject: vector<(issuer, subject: string)>,
      vector_of_sigstore_annotations: vector<(key, value: string)>
      )
      returns (is_trusted: bool, digest_of_verified_image: string)
  ```

Both functions verify that the image is signed and satisfy the passed
constraints.

Note well: on success, the functions return the digest of the verified image. It
is now on the policy to ensure that containers are instantiated from that
digest, and not from tag that may or may not match that checksum digest (and
therefore be compromised).


## A concrete example

The Kubewarden team [provides a verifier policy](TODO link to hub.kubewarden.io for the policy)
that enforces Sigstore signatures for all containers, built on Rust and with the
Rust SDK. The policy ensures that the containers are signed, and optionally,
mutates the requests substituting the container tag for the exact checksum
of the image matching the verified signature. It has also quality of life
additions on the UX, see its docs for specifics.

This policy may cover all your needs, but in case you would prefer a different
UX, of course you can build on top of it or any of the other SDKs.


# WaPC protocol contract

In case you are implementing your own language SDK, these are the functions a
policy that verifies signatures can use:

<table>
  <thead>
    <tr>
      <th>waPC function name</th>
      <th>Input payload</th>
      <th>Output payload</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>v1/verify</code></td>
      <td>
<pre>
{
  // <strong>mandatory</strong>:
  "image": &lt;string&gt;, // image URI to verify
  "pub_keys": [ // PEM-encoded public keys
    &lt;string&gt;
  ],
  // optional:
  "annotations": [ // signature annotations
    {
      "key": &lt;string&gt;,
      "value": &lt;string&gt;
    },
  ]
}
</pre>
      </td>
      <td>
<pre>
{
  "is_trusted": &lt;boolean&gt;, // true if image verified
  "digest": &lt;string&gt;       // digest of verified image
}
</pre>
      </td>
    </tr>
    <tr>
      <td><code>v1/verify</code></td>
      <td>
<pre>
{
  // <strong>mandatory</strong>:
  "image": &lt;string&gt;, // image URI to verify
  "keyless": [ // list of (issuer, subject) tuples
    {
      "issuer": &lt;string&gt;, // OIDC issuer
      "subject": &lt;string&gt; // signature subject (mail, CI URL...)
    }
  ],
  // optional:
  "annotations": [ // signature annotations
    {
      "key": &lt;string&gt;,
      "value": &lt;string&gt;
    },
  ]
}
</pre>
      </td>
      <td>
<pre>
{
  "is_trusted": &lt;boolean&gt;, // true if image verified
  "digest": &lt;string&gt;       // digest of verified image
}
</pre>
      </td>
    </tr>
  </tbody>
</table>
