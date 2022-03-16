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
outside of Kubernetes, among other operations. This utility is called
[`kwctl`](https://github.com/kubewarden/kwctl).

`kwctl` usage is quite simple, we just have to invoke it with the
following data as input:

1. WebAssembly binary file reference of the policy to be run. The
   Kubewarden policy can be loaded from the local filesystem
   (`file://`), an HTTP(s) server (`https://`) or an OCI registry
   (`registry://`).
1. The admission request object to be evaluated.  This is provided via
  the `--request-path` argument. The request can be provided through
  `stdin` by setting `--request-path` to `-`.
1. The policy settings to be used at evaluation time, they can be
  provided as an inline JSON via `--settings-json` flag, or a JSON or
  YAML file loaded from the filesystem via `--settings-path`.

Once the policy evaluation is done, `kwctl` prints the
`ValidationResponse` object to the standard output.

## Install

You can download pre-built binaries of `kwctl` from
[here](https://github.com/kubewarden/kwctl/releases).

## Quickstart

This section describes how to test the
[psp-apparmor](https://github.com/kubewarden/psp-apparmor) policy with
different configurations and validation request objects as input data.

### Create `AdmissionReview` requests

We have to create some files holding the `AdmissionReview` objects
that will be evaluated by the policy.

Let's create a file named `pod-req-no-specific-apparmor-profile.json` with the following
contents:

```json
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
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
profile to be used, that's because it doesn't have an `annotation`
with the `container.apparmor.security.beta.kubernetes.io/<name of the
container>` key.

Let's create a file named `pod-req-apparmor-unconfined.json` with the
following contents:

```json
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
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
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
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

> **Note well:** these are stripped down `AdmissionReview` objects, we
> left only the fields that are relevant to our policy.


### Test the policy

Now we can use `kwctl` to test the creation of a Pod that doesn't
specify an AppArmor profile:

```console
$ kwctl run \
    --request-path pod-req-no-specific-apparmor-profile.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 | jq
```

The policy will accept the request and produce the following output:

```console
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

The policy will instead reject the creation of a Pod with an
`unconfined` AppArmor profile:

```console
$ kwctl run \
    --request-path pod-req-apparmor-unconfined.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "These AppArmor profiles are not allowed: [\"unconfined\"]"
  }
}
```

Both times we ran the policy **without** providing any kind of
setting. As the [policy's
documentation](https://github.com/kubewarden/psp-apparmor#configuration)
states, this results in preventing the usage of non-default profiles.

As a matter of fact, the Pod using a custom `nginx` profile gets rejected by
the policy too:

```console
$ kwctl run \
    --request-path pod-req-apparmor-custom.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "These AppArmor profiles are not allowed: [\"localhost/nginx-custom\"]"
  }
}
```

We can change the default behaviour and allow some chosen AppArmor to be used:

```console
$ kwctl run \
    --request-path pod-req-apparmor-custom.json \
    --settings-json '{"allowed_profiles": ["runtime/default", "localhost/nginx-custom"]}' \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 | jq
```

This time the request is accepted:

```console
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

## Automation

All these steps shown above can be automated using
[bats](https://github.com/bats-core/bats-core).

We can write a series of tests and integrate their execution inside of
your existing CI and CD pipelines.

That would ensure changes to the policy version, policy configuration
parameters, Kubernetes resources,... won't break the outcome of the
validation/mutation operations.

The commands used above can be easily "wrapped" into a `bats` test:

```bash
@test "all is good" {
  run kwctl run \
    --request-path pod-req-no-specific-apparmor-profile.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # request accepted
  [ $(expr "$output" : '.*"allowed":true.*') -ne 0 ]
}

@test "reject" {
  run kwctl run \
    --request-path pod-req-apparmor-custom.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # request rejected
  [ $(expr "$output" : '.*"allowed":false.*') -ne 0 ]
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

Checkout [this section](/writing-policies/go/05-e2e-tests.md) of the
documentation to learn more about writing end-to-end tests of your
policies.
