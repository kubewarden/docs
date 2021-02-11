# Testing Policies

Policies usually need to be tested so we are sure that they behave as
we expect when deployed on a Kubernetes cluster.

Aside from the approach of testing policy logic with the tools that
your language toolchain already provides, Chimera has a dedicated
project for testing policies:
[`chimera-policy-testdrive`](https://github.com/chimera-kube/chimera-policy-testdrive).

The concept of `chimera-policy-testdrive` is quite simple from a user
point of view. You have to provide:

* The policy to be tested: through the `--policy` argument. At this
  time you can only load files in the local filesystem. This might
  change, but it should be good enough for the develop, build, test
  cycle.

* A file that contains the admission request object to be provided to
  the policy. This is a specific Kubernetes operation to be tested
  against the policy. Provided using the `--request-file` argument.

* Settings file that contains an arbitrary JSON document, that will be
  exposed to the policy. This document allows static configuration of
  the policy. Provided using the `--settings` parameter.

## Install `chimera-policy-testdrive`

You can install the `chimera-policy-testdrive` with the `cargo`
package manager:

```console
$ cargo install --git https://github.com/chimera-kube/chimera-policy-testdrive.git --branch main
```

You should now have a `chimera-policy-testdrive` executable in your
`$PATH`:

```console
$ which chimera-policy-testdrive
/home/ereslibre/.cargo/bin/chimera-policy-testdrive
```

## Policy test example

### Download a sample policy to test

We will use [`wasm-to-oci`](https://github.com/engineerd/wasm-to-oci)
in order to download a Wasm policy. We can also build a Wasm policy of
our own if we prefer to do so.

```console
$ wasm-to-oci pull ghcr.io/chimera-kube/policies/pod-privileged:v0.1.0
INFO[0002] Pulled: ghcr.io/chimera-kube/policies/pod-privileged:v0.1.0
INFO[0002] Size: 21709
INFO[0002] Digest: sha256:24d6cb6598815e0c1ccdb8e1e96aa4b9e4a63eab2b41fe271c9329f8263ab9a2
```

This should have created a `module.wasm` file in the current directoy.

### The requests

In order to mimic what the policy would evaluate during the execution
on top of a Kubernetes cluster, we have to provide the resource type
that it would receive from the API server: `AdmissionReview` API
object types.

Let's create two different requests, one that is valid, while the
other is invalid.

This is a valid `AdmissionReview.request` object according to the
policy that we want to test:

```json
{
  "kind": {
    "kind": "Pod",
    "version": "v1"
  },
  "object": {
    "metadata": {
      "name": "valid-pod"
    },
    "spec": {
      "containers": [
        {
          "image": "nginx",
          "name": "valid-container"
        }
      ]
    }
  },
  "operation": "CREATE",
  "requestKind": {"version": "v1", "kind": "Pod"},
  "userInfo": {
    "username": "some-user",
    "uid": "some-uid",
    "groups": ["system:authenticated", "group-a", "group-b"]
  }
}
```

This is an invalid `AdmissionReview.request` object according to the
policy that we want to test:

```json
{
  "kind": {
    "kind": "Pod",
    "version": "v1"
  },
  "object": {
    "metadata": {
      "name": "invalid-pod"
    },
    "spec": {
      "containers": [
        {
          "image": "nginx",
          "name": "invalid-container",
          "securityContext": {
            "privileged": true
          }
        }
      ]
    }
  },
  "operation": "CREATE",
  "requestKind": {"version": "v1", "kind": "Pod"},
  "userInfo": {
    "username": "some-user",
    "uid": "some-uid",
    "groups": ["system:authenticated", "group-a", "group-b"]
  }
}
```

### Test the policy

Now we can use `chimera-policy-testdrive` to test both requests:

```console
$ chimera-policy-testdrive --policy module.wasm --request-file valid-admission-review.json
ValidationResponse { accepted: true, message: Some(""), code: None }
```

Whereas if we execute the invalid request, we will get:

```console
$ chimera-policy-testdrive --policy module.wasm --request-file invalid-admission-review.json
ValidationResponse { accepted: false, message: Some("User cannot schedule privileged containers"), code: None }
```

## Wrapping up

We have seen how to use `chimera-policy-testdrive` to test existing
admission policies. This allows us to integrate the logic of our
admission policy with real resources that will be provided by
Kubernetes, so we have yet another tool for testing the integration
without the the need of an already existing and running Kubernetes
cluster.

You can record `AdmissionReview` objects, or create specific ones and
execute the `chimera-policy-testdrive` as desired with the admission
reviews and the Wasm module you want to test against. These Wasm
modules are currently located in the local filesystem, but you can use
other tools like `wasm-to-oci` to download from an OCI registry if
that's where these modules are located.
