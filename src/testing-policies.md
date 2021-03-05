# Testing Policies

This section covers the topic of testing Chimera Policies. There are two possible
personas interested in testing policies:

  * As a policy author: you're writing a Chimera Policy and you want to ensure
    your code behaves the way you expect.
  * As an end user: you found a Chimera Policy and you want to tune/test the policy
    settings before deploying it, maybe you want to keep testing these settings
    inside of your CI/CD pipelines,...

# Chimera Policy authors

Chimera Policies are regular programs compiled as WebAssembly. As with any kind
of program, it's important to have a good test coverage.

Policy authors can leverage the testing frameworks and tools of their language
of choice to verify the behaviour of their policies.

As an example, you can take a look at these Chimera policies:

  * [pod-privileged-policy](https://github.com/chimera-kube/pod-privileged-policy): this
    is a Chimera Policy written using [AssemblyScript](https://www.assemblyscript.org/).
  * [pod-toleration-policy](https://github.com/chimera-kube/pod-toleration-policy): this
    is a Chimera Policy written using [Rust](https://www.rust-lang.org/).

Both policies have integrated test suites built using the regular testing libraries
of Rust and AssemblyScript.

Both projectes also rely on GitHub actions to implement their CI pipelines.

# End users

Aside from the approach of testing policy logic with the tools that
your language toolchain already provides, Chimera has a dedicated
project for testing policies:
[`chimera-policy-testdrive`](https://github.com/chimera-kube/chimera-policy-testdrive).

The concept of `chimera-policy-testdrive` is quite simple from a user
point of view. You have to provide:

1. The Wasm file providing the policy to be tested. The file is specified through
  the `--policy` argument. At this  time you can only load files in the local
  filesystem.
1. A file containing the admission request object to be evaluated by
  the policy. This is provided via the `--request-file` argument.
1. The policy settings to be used at evaluation time, they can be provided
  via `--settings` flag. The flag takes a JSON blob as parameter.


## Install

You can install the `chimera-policy-testdrive` with Rust's `cargo`
package manager:

```console
cargo install --git https://github.com/chimera-kube/chimera-policy-testdrive.git --branch main
```

You should now have a `chimera-policy-testdrive` executable in your
`$PATH`:

```console
$ which chimera-policy-testdrive
~/.cargo/bin/chimera-policy-testdrive
```

## Quickstart

### Prerequisites

We will use [`wasm-to-oci`](https://github.com/engineerd/wasm-to-oci)
to download a Chimera Policy published on a Container registry.

Pre-built binaries of `wasm-to-oci`can be downloaded from the project's
[GitHub Releases page](https://github.com/engineerd/wasm-to-oci/releases).

### Obtain a Chimera policy

We will download the 
[pod-privileged-policy](https://github.com/chimera-kube/pod-privileged-policy):

```console
wasm-to-oci pull ghcr.io/chimera-kube/policies/pod-privileged:v0.1.1
```

This will produce the following output:
```console
INFO[0001] Pulled: ghcr.io/chimera-kube/policies/pod-privileged:v0.1.1
INFO[0001] Size: 21769
INFO[0001] Digest: sha256:2d31248b45c51efbab5cb88b47ed5d6cff7611158591dbf8974e3c26589891f9
```

This should have created a `module.wasm` file in the current directoy.

### Create `AdmissionReview` requests

We have to create some files holding the `AdmissionReview` objects that
will be evaluated by the policy.

Let's create a file named `unprivileged-pod-req.json` with the following
contents:

```json
{
  "kind": {
    "kind": "Pod",
    "version": "v1"
  },
  "object": {
    "metadata": {
      "name": "unprivileged-pod"
    },
    "spec": {
      "containers": [
        {
          "image": "nginx",
          "name": "unprivileged-container"
        }
      ]
    }
  },
  "operation": "CREATE",
  "requestKind": {"version": "v1", "kind": "Pod"},
  "userInfo": {
    "username": "alice",
    "uid": "alice-uid",
    "groups": ["system:authenticated", "devops-guild", "agile-guild"]
  }
}
```

This request has been made by the user `alice` who belongs to the following
groups: `system:authenticated`, `devops-guild` and `agile-guild`.
All these informations can be found inside of the `userInfo` map.


Let's create a file named `privileged-pod-req.json` with the following
contents:

```json
{
  "kind": {
    "kind": "Pod",
    "version": "v1"
  },
  "object": {
    "metadata": {
      "name": "privileged-pod"
    },
    "spec": {
      "containers": [
        {
          "image": "nginx",
          "name": "privileged-container",
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
    "username": "alice",
    "uid": "alice-uid",
    "groups": ["system:authenticated", "devops-guild", "agile-guild"]
  }
}
```

This request is coming from the very same user `alice` show before.

> **Note well:** these are stripped down `AdmissionReview` objects, we left
> only the fields that are relevant to our policy.

### Test the policy

Now we can use `chimera-policy-testdrive` to test both requests:
```console
chimera-policy-testdrive --policy module.wasm --request-file unprivileged-pod-req.json
```

The policy will accept the request and produce the following output:
```console
ValidationResponse { accepted: true, message: Some(""), code: None }
```

Whereas if we evaluate the privileged pod request:
```console
chimera-policy-testdrive --policy module.wasm --request-file privileged-pod-req.json
```

The policy will reject the request and produce the following output:
```console
ValidationResponse { accepted: false, message: Some("User \'alice\' cannot schedule privileged containers"), code: None }
```

Both times we did a test drive of the policy **without** providing any kind of
setting. As the [policy's documentation](https://github.com/chimera-kube/pod-privileged-policy#configuration)
states, this results in preventing all the users to create privileged Pods.

We can change the default behaviour and allow members of the `devops-guild`
group to create privileged Pods. This can be done by setting the `trusted_groups`
value of the policy:
```console
chimera-policy-testdrive --policy module.wasm \
  --request-file privileged-pod-req.json \
  --settings '{"trusted_groups": ["administrators", "devops-guild"]}'
```

This time the request is accepted:
```console
ValidationResponse { accepted: true, message: Some(""), code: None }
```

That happens because the request is coming from the user `alice`, who is
a member of the `devops-guild` group.

## Wrapping up

Testing Chimera Policies is extremely important.

As a Chimera Policy author you can leverage the testing frameworks of your favorite
programming language and combine it with the CI systems of your choice to
ensure your code behaves as expected.

As a Chimera Policy end user you can use `chimera-policy-testdrive` to test
policies and their tuning outside of Kubernetes.
