---
sidebar_label: New validation policy
sidebar_position: 020
title: Creating a new validation policy
description: Creating a new validation policy for Kubewarden using Go.
keywords: [kubewarden, kubernetes, writing policies in Go, new validation policy]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, go, creating a new validation policy]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/scaffold"/>
</head>

This tutorial covers creating a policy that validates the labels of Pod objects.

The policy is to reject all Pods that use one or more labels on the deny-list.
The policy also validates certain labels using a regular expression provided by the user.

To summarize, the policy settings should look like this:

```yaml
# List of labels that cannot be used
denied_labels:
- foo
- bar

# Labels that are validated with user-defined regular expressions
constrained_labels:
  priority: "[123]"
  cost-center: "^cc-\d+"
```

The policy rejects the creation of this Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    foo: hello world
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

It also rejects the creation of this Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    cost-center: cc-marketing
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

You can use the policy's settings to force using a label specification, regardless of content:

```yaml
constrained_labels:
  mandatory-label: ".*" # <- this label must be present, we don't care about its value
```

## Scaffolding new policy project

You can create a new policy project using the
[template repository](https://github.com/kubewarden/go-policy-template).
Select the "Use this template" green button near the top of the page
and follow GitHub's wizard.

Clone the repository locally and set the `module` directive in the `go.mod` file to look like:

```go
module <path to your repository>
```

:::note
A real policy would use a repository path, like `github.com/kubewarden/go-policy-template`.
:::

## Testing

Provided the necessary tools are in place a `make test` command uses Docker to pull a TinyGo compiler image using it to build and test the policy template.

The default `make` command builds the `policy.wasm` target. Then `make test` runs the defined Go tests.
The command `make e2e-tests` runs tests using [bats](https://github.com/bats-core/bats-core) within a Kubewarden cluster.
After cloning the `go-policy-template`, running these commands checks you have the tools in place for the tutorial.

<details>

<summary>Output from the `make` commands</summary>

```console
make test
docker run \
        --rm \
        -e GOFLAGS="-buildvcs=false" \
        -v /home/jhk/projects/suse/tmp/go-kw-demo:/src \
        -w /src tinygo/tinygo:0.30.0 \
        tinygo build -o policy.wasm -target=wasi -no-debug .
Unable to find image 'tinygo/tinygo:0.30.0' locally
0.30.0: Pulling from tinygo/tinygo
9aaefb8797c4: Pull complete
24ab7ca26e01: Pull complete
ca4ea8be6361: Pull complete
50380d0859d2: Pull complete
4f4fb700ef54: Pull complete
ea0ddd497f04: Pull complete
01ba28116afb: Pull complete
Digest: sha256:5cbf5e50aec3a00fcff8bb4ae070a07eea8198187a97b21dff6d873d2274ce7a
Status: Downloaded newer image for tinygo/tinygo:0.30.0
go test -v
=== RUN   TestParsingSettingsWithNoValueProvided
--- PASS: TestParsingSettingsWithNoValueProvided (0.00s)
=== RUN   TestIsNameDenied
--- PASS: TestIsNameDenied (0.00s)
=== RUN   TestEmptySettingsLeadsToApproval
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
--- PASS: TestEmptySettingsLeadsToApproval (0.00s)
=== RUN   TestApproval
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
--- PASS: TestApproval (0.00s)
=== RUN   TestApproveFixture
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
--- PASS: TestApproveFixture (0.00s)
=== RUN   TestRejectionBecauseNameIsDenied
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"info","message":"rejecting pod object","name":"test-pod","denied_names":"foo,test-pod"}
|
--- PASS: TestRejectionBecauseNameIsDenied (0.00s)
PASS
ok      github.com/kubewarden/go-policy-template        0.004s
```

and

```console
make e2e-tests
bats e2e.bats
e2e.bats
 ✓ reject because name is on deny list
 ✓ accept because name is not on the deny list
 ✓ accept because the deny list is empty

3 tests, 0 failures
```

</details>
