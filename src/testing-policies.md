# Testing Policies

This section covers the topic of testing Kubewarden Policies. There are two possible
personas interested in testing policies:

  * As a policy author: you're writing a Kubewarden Policy and you want to ensure
    your code behaves the way you expect.
  * As an end user: you found a Kubewarden Policy and you want to tune/test the policy
    settings before deploying it, maybe you want to keep testing these settings
    inside of your CI/CD pipelines,...

# Kubewarden Policy authors

Kubewarden Policies are regular programs compiled as WebAssembly. As with any kind
of program, it's important to have a good test coverage.

Policy authors can leverage the testing frameworks and tools of their language
of choice to verify the behaviour of their policies.

As an example, you can take a look at these Kubewarden policies:

  * [pod-privileged-policy](https://github.com/kubewarden/pod-privileged-policy): this
    is a Kubewarden Policy written using [AssemblyScript](https://www.assemblyscript.org/).
  * [psp-apparmor](https://github.com/kubewarden/psp-apparmor): this
    is a Kubewarden Policy written using [Rust](https://www.rust-lang.org/).

Both policies have integrated test suites built using the regular testing libraries
of Rust and AssemblyScript.

Finally, both projects rely on GitHub actions to implement their CI pipelines.

# End users

Aside from the approach of testing policy logic with the tools that
your language toolchain already provides, Kubewarden has a dedicated
project for testing policies:
[`policy-testdrive`](https://github.com/kubewarden/policy-server/tree/main/crates/policy-testdrive).

The concept of `policy-testdrive` is quite simple from a user
point of view. You have to provide:

1. The Wasm file providing the policy to be tested. The file is specified through
  the `--policy` argument. At this  time you can only load files in the local
  filesystem.
1. A file containing the admission request object to be evaluated by
  the policy. This is provided via the `--request-file` argument.
1. The policy settings to be used at evaluation time, they can be provided
  via `--settings` flag. The flag takes a JSON blob as parameter.


## Install

You can download pre-built binaries of `policy-testdrive`
from [here](https://github.com/kubewarden/policy-server/releases).

## Quickstart

### Prerequisites

We will use [`wasm-to-oci`](https://github.com/engineerd/wasm-to-oci)
to download a Kubewarden Policy published on a Container registry.

Pre-built binaries of `wasm-to-oci`can be downloaded from the project's
[GitHub Releases page](https://github.com/engineerd/wasm-to-oci/releases).

### Obtain a Kubewarden policy

We will download the
[psp-apparmor](https://github.com/kubewarden/psp-apparmor) policy:

```console
wasm-to-oci pull ghcr.io/kubewarden/policies/psp-apparmor:v0.1.2
```

This will produce the following output:
```console
INFO[0001] Pulled: ghcr.io/kubewarden/policies/psp-apparmor:v0.1.2 
INFO[0001] Size: 2682915
INFO[0001] Digest: sha256:5532a49834af8cc929994a65c0881190ef168295fffd2bed4e7325d2e91484b5 
```

This should have created a `module.wasm` file in the current directory.

### Create `AdmissionReview` requests

We have to create some files holding the `AdmissionReview` objects that
will be evaluated by the policy.

Let's create a file named `pod-req-no-specific-apparmor-profile.json` with the following
contents:

```json
{
  "kind": {
    "kind": "Pod",
    "version": "v1"
  },
  "object": {
    "metadata": {
      "name": "no-apparmor"
    },
    "spec": {
      "containers": [
        {
          "image": "nginx",
          "name": "nginx"
        }
      ]
    }
  },
  "operation": "CREATE",
  "requestKind": {"version": "v1", "kind": "Pod"},
  "userInfo": {
    "username": "alice",
    "uid": "alice-uid",
    "groups": ["system:authenticated"]
  }
}
```

This request tries to create a Pod that doesn't specify any AppArmor
profile to be used, that's because it doesn't have an `annotation` with the
`container.apparmor.security.beta.kubernetes.io/<name of the container>`
key.

Let's create a file named `pod-req-apparmor-unconfined.json` with the following
contents:

```json
{
  "kind": {
    "kind": "Pod",
    "version": "v1"
  },
  "object": {
    "metadata": {
      "name": "privileged-pod",
      "annotations": {
        "container.apparmor.security.beta.kubernetes.io/nginx": "unconfined"
      }
    },
    "spec": {
      "containers": [
        {
          "image": "nginx",
          "name": "nginx"
        }
      ]
    }
  },
  "operation": "CREATE",
  "requestKind": {"version": "v1", "kind": "Pod"},
  "userInfo": {
    "username": "alice",
    "uid": "alice-uid",
    "groups": ["system:authenticated"]
  }
}
```

This request tries to create a Pod with a container called `nginx` that is going
to be run with the `unconfined` AppArmor profile. This is considered a bad
security practice.

Finally, let's create a file named `pod-req-apparmor-custom.json` with the following
contents:

```json
{
  "kind": {
    "kind": "Pod",
    "version": "v1"
  },
  "object": {
    "metadata": {
      "name": "privileged-pod",
      "annotations": {
        "container.apparmor.security.beta.kubernetes.io/nginx": "localhost/nginx-custom"
      }
    },
    "spec": {
      "containers": [
        {
          "image": "nginx",
          "name": "nginx"
        }
      ]
    }
  },
  "operation": "CREATE",
  "requestKind": {"version": "v1", "kind": "Pod"},
  "userInfo": {
    "username": "alice",
    "uid": "alice-uid",
    "groups": ["system:authenticated"]
  }
}
```

This request tries to create a Pod with a container called `nginx` that is going
to be run with the profile provided by the administrators of the Kubernetes cluster.
This profile is called `nginx-custom`.

> **Note well:** these are stripped down `AdmissionReview` objects, we left
> only the fields that are relevant to our policy.

### Test the policy

Now we can use `policy-testdrive` to test the creation of a Pod that doesn't
specify an AppArmor profile:
```console
policy-testdrive --policy module.wasm --request-file pod-req-no-specific-apparmor-profile.json
```

The policy will accept the request and produce the following output:
```console
Settings validation result: SettingsValidationResponse { valid: true, message: None }
Policy evaluation results:
ValidationResponse { uid: "", allowed: true, patch_type: None, patch: None, status: None }
```

The policy will instead reject the creation of a Pod with an `unconfined` AppArmor
profile:
```console
$ policy-testdrive --policy module.wasm --request-file pod-req-apparmor-unconfined.json

Settings validation result: SettingsValidationResponse { valid: true, message: None }
Policy evaluation results:
ValidationResponse { uid: "", allowed: false, patch_type: None, patch: None, status: Some(ValidationResponseStatus { message: Some("These AppArmor profiles are not allowed: [\"unconfined\"]"), code: None }) }
```

Both times we did a test drive of the policy **without** providing any kind of
setting. As the [policy's documentation](https://github.com/kubewarden/psp-apparmor#configuration)
states, this results in preventing the usage of non-default profiles.

As a matter of fact, the Pod using a custom `nginx` profile gets rejected by
the policy too:

```console
$ policy-testdrive --policy module.wasm --request-file pod-req-apparmor-custom.json 

Settings validation result: SettingsValidationResponse { valid: true, message: None }
Policy evaluation results:
ValidationResponse { uid: "", allowed: false, patch_type: None, patch: None, status: Some(ValidationResponseStatus { message: Some("These AppArmor profiles are not allowed: [\"localhost/nginx-custom\"]"), code: None }) }
```

We can change the default behaviour and allow some chosen AppArmor to be used:
```console
policy-testdrive --policy module.wasm \
  --request-file pod-req-apparmor-custom.json \
  --settings '{"allowed_profiles": ["runtime/default", "localhost/nginx-custom"]}'
```

This time the request is accepted:
```console
Settings validation result: SettingsValidationResponse { valid: true, message: None }
Policy evaluation results:
ValidationResponse { uid: "", allowed: true, patch_type: None, patch: None, status: None }
```

## Wrapping up

Testing Kubewarden Policies is extremely important.

As a Kubewarden Policy author you can leverage the testing frameworks of your favorite
programming language and combine it with the CI systems of your choice to
ensure your code behaves as expected.

As a Kubewarden Policy end user you can use `policy-testdrive` to test
policies and their tuning outside of Kubernetes.
