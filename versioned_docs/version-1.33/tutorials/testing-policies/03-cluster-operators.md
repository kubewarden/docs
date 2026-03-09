---
sidebar_label: Cluster operators
title: Testing for cluster operators
description: An introduction to testing Kubewarden policies for cluster operators.
keywords: [kubewarden, kubernetes, cluster operators, testing]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [testing-policies, cluster-operators]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/testing-policies/cluster-operators"/>
</head>

As a Kubernetes cluster operator, you'll want to perform testing for Kubewarden policies you want to use.

You'll have questions like:

- What are the correct policy settings to get the validation/mutation outcome needed?
- How can I be sure everything keeps working as expected when I:
  - upgrade the policy to a newer version?
  - add/change Kubernetes resources?
  - change the configuration parameters of the policy?
  - and so forth?

Kubewarden has a utility, [`kwctl`](https://github.com/kubewarden/kwctl),
that permits testing of the policies outside of Kubernetes.

To use `kwctl` you invoke it with following inputs:

1. A WebAssembly binary file URI of the policy to be run.
The Kubewarden policy can load from the:
    - local filesystem `file://`
    - a HTTP(s) server `https://`
    - an OCI registry `registry://`.
1. The admission request object to test.
You give it with the `--request-path` argument.
Use `stdin` by setting `--request-path` to `-`.
1. The policy settings for runtime as an inline JSON via `--settings-json` flag.
Or a JSON, or a YAML file, loaded from the file system via `--settings-path`.

After the test `kwctl`, prints the `ValidationResponse` object to the standard output.

You can download pre-built binaries of `kwctl`
[here](https://github.com/kubewarden/kwctl/releases).

## A testing example

This section describes how to test the
[psp-apparmor](https://github.com/kubewarden/psp-apparmor)
policy with different configurations and validation request objects.

### Create `AdmissionReview` requests

You need to create files holding the `AdmissionReview` objects to test the policy.

You can create a file named `pod-req-no-specific-apparmor-profile.json` with the following contents:

<details>

<summary><code>pod-req-no-specific-apparmor-profile.json</code></summary>

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

</details>

This request tries to create a Pod that doesn't specify any AppArmor profile to use.
This is because it doesn't have an `annotation` with the
`container.apparmor.security.beta.kubernetes.io/<container-name>` key.

You can create a file named `pod-req-apparmor-unconfined.json` with the
following contents:

<details>

<summary><code>pod-req-apparmor-unconfined.json</code></summary>

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

</details>

This request tries to create a Pod with a container called `nginx` running with the `unconfined` AppArmor profile.
This is for tutorial purposes only.
Running in `unconfined` mode is a bad security practice.

Now you can create a file named
`pod-req-apparmor-custom.json` with the following contents:

<details>

<summary><code>pod-req-apparmor-custom.json</code></summary>

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

</details>

:::note
These are all simplified `AdmissionReview` objects.
Only the fields relevant to our testing of the policy are used.
:::

### Test the policy

Now you can use `kwctl` to test the creation of a Pod not specifying an AppArmor profile:

```console
$ kwctl run \
    --request-path pod-req-no-specific-apparmor-profile.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 \
    | jq
```

The policy accepts the request and produces output like:

```console
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

The policy rejects the creation of a Pod with an `unconfined` AppArmor profile:

```console
$ kwctl run \
    --request-path pod-req-apparmor-unconfined.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 \
    | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "These AppArmor profiles are not allowed: [\"unconfined\"]"
  }
}
```

On both occasions you ran the policy **without** providing any kind of setting.
As the
[policy's documentation](https://github.com/kubewarden/psp-apparmor#configuration)
states, this results in preventing the usage of non-default profiles.

The Pod using a custom `nginx` profile gets rejected by the policy too:

```console
$ kwctl run \
    --request-path pod-req-apparmor-custom.json \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 \
    | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "These AppArmor profiles are not allowed: [\"localhost/nginx-custom\"]"
  }
}
```

You can change the default behavior, allowing chosen AppArmor profiles to be used:

```console
$ kwctl run \
    --request-path pod-req-apparmor-custom.json \
    --settings-json '{"allowed_profiles": ["runtime/default", "localhost/nginx-custom"]}' \
    registry://ghcr.io/kubewarden/policies/psp-apparmor:v0.1.4 \
    | jq
```

Now the request succeeds:

```console
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

## Automation

You can automate all these steps using
[bats](https://github.com/bats-core/bats-core).

You can write a series of tests and integrate their execution inside your existing CI and CD pipelines.

The commands can be "wrapped" into a `bats` test:

<details>

<summary>A <code>bats</code>test</summary>

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

</details>

If the `bats` code is in the file `e2e.bats`, you can run the test as:

```console
$ bats e2e.bats
 ✓ all is good
 ✓ reject

2 tests, 0 failures
```

[This](../writing-policies/go/05-e2e-tests.md)
section has more about writing end-to-end tests for your policies.
