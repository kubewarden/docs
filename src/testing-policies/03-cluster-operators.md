# Before deployment

As a Kubernetes cluster operator you probably want to perform some tests
against a Kubewarden policy you just found.

You probably want to answer questions like:

* What are the correct policy settings to get the validation/mutation outcome
  I desire?
* How can I be sure everything will keep working as expected when I upgrade
  the policy to a newer version, when I add/change some Kubernetes resources,
  when I change the configuration parameters of the policy,...

Kubewarden has a dedicated utility that allows testing of the policies
outside of Kubernetes. This utility is called
[`policy-testdrive`](https://github.com/kubewarden/policy-server/tree/main/crates/policy-testdrive).

`policy-testdrive` usage is quite simple, we just have to invoke it with the
following data as input:

1. Path to the WebAssembly binary file of the policy to be run. This is
  specified through the `--policy` argument. Currently, `policy-testdrive`
  can only load policies from the local filesystem.
1. Path to the file containing the admission request object to be evaluated.
  This is provided via the `--request-file` argument.
1. The policy settings to be used at evaluation time, they can be provided
  via `--settings` flag. The flag takes a JSON blob as parameter.

Once the policy evaluation is done, `policy-testdrive` prints to the standard
output the `SettingsValidationResponse`and the `ValidationResponse` objects.

## Install

You can download pre-built binaries of `policy-testdrive`
from [here](https://github.com/kubewarden/policy-server/releases).

Currently `policy-testdrive` isn't able to download policies from OCI
registries. This can be done using the
[`wasm-to-oci`](https://github.com/engineerd/wasm-to-oci) tool.

Pre-built binaries of `wasm-to-oci`can be downloaded from the project's
[GitHub Releases page](https://github.com/engineerd/wasm-to-oci/releases).

## Quickstart

This section describes how to test the
[psp-apparmor](https://github.com/kubewarden/psp-apparmor) policy
with different configurations and validation request objects as input data.

We begin by downloading the WebAssembly binary of the policy, we will
do that using the `wasm-to-oci` tool:

```shell
wasm-to-oci pull ghcr.io/kubewarden/policies/psp-apparmor:v0.1.2
```

This will produce the following output:

```shell
INFO[0001] Pulled: ghcr.io/kubewarden/policies/psp-apparmor:v0.1.2 
INFO[0001] Size: 2682915
INFO[0001] Digest: sha256:5532a49834af8cc929994a65c0881190ef168295fffd2bed4e7325d2e91484b5 
```

This creates a `module.wasm` file in the current directory.

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

This request tries to create a Pod with a container called `nginx` that runs
with the `unconfined` AppArmor profile. Note well, running in `unconfined` mode
is a bad security practice.

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

This request tries to create a Pod with a container called `nginx` that uses the
`nginx-custom` profile provided by the administrators of the Kubernetes cluster.

> **Note well:** these are stripped down `AdmissionReview` objects, we left
> only the fields that are relevant to our policy.

### Test the policy

Now we can use `policy-testdrive` to test the creation of a Pod that doesn't
specify an AppArmor profile:

```console
policy-testdrive --policy module.wasm \
  --request-file pod-req-no-specific-apparmor-profile.json
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
$ policy-testdrive --policy module.wasm \
  --request-file pod-req-apparmor-unconfined.json

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
$ policy-testdrive --policy module.wasm \
  --request-file pod-req-apparmor-custom.json

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

## Automation

All these steps shown above can be automated using
[bats](https://github.com/bats-core/bats-core).

We can write a series of tests and integrate their execution inside
of your existing CI and CD pipelines.

That would ensure changes to the policy version, policy configuration
parameters, Kubernetes resources,... won't break the outcome of the
validation/mutation operations.

The commands used above can be easily "wrapped" into a `bats` test:

```bash
@test "all is good" {
  run policy-testdrive --policy module.wasm \
    --request-file pod-req-no-specific-apparmor-profile.json

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request accepted
  [[ "$output" == *"allowed: true"* ]]
}

@test "reject" {
  run policy-testdrive --policy module.wasm \
    --request-file pod-req-apparmor-custom.json

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request rejected
  [[ "$output" == *"allowed: false"* ]]
}
```

Assuming the snippet from above is inside of a file called `e2e.bats`,
we can run the test in this way:

```
$ bats e2e.bats
 ✓ all is good
 ✓ reject

2 tests, 0 failures
```
Checkout [this section](/writing-policies/go/05-e2e-tests.html)
of the documentation to learn more about writing end-to-end
tests of your policies.
