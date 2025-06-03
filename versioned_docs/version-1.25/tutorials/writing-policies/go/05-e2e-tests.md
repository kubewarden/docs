---
sidebar_label: End-to-end testing
sidebar_position: 050
title: End-to-end testing
description: A tutorial introduction to end-to-end testing for writing Kubewarden policies in the Go language.
keywords: [kubewarden, kubernetes, writing policies, end-to-end testing, golang, go]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, golang, end-to-end-testing]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/e2e-tests"/>
</head>

So far, you have tested the policy using a set of Go unit tests.
This section shows how you can write end-to-end tests running against the actual WebAssembly binary produced by TinyGo.

## Prerequisites

Recall, you need these tools on your development machine:

- Docker, or another container engine: Used to build the WebAssembly policy.
You'll use the compiler shipped within the official TinyGo container image.
- [bats](https://github.com/bats-core/bats-core):
Used to write the tests and automate their execution.
- [`kwctl`](https://github.com/kubewarden/kwctl/releases):
CLI tool provided by Kubewarden to run its policies outside of Kubernetes, among other actions.
It's covered in [this section](../../testing-policies/index.md) of the documentation.

## Writing tests

You'll be using
[bats](https://github.com/bats-core/bats-core)
to write and automate your tests.
Each test has the following steps:

1. Run the policy using `kwctl`.
1. Perform assertions against the output produced by the `kwctl`.

All the end-to-end tests go in a file called `e2e.bats`.
The project scaffolding project already includes an example `e2e.bats`.
You need to change its contents to reflect how your policy behaves.
You can remove the contents from the scaffolding file and replace them with the contents below as you work through this tutorial.

For the end-to-end tests, you use the same test fixtures files you used in the Go unit tests.

The first test ensures request approval when there are no settings provided:

```bash
@test "accept when no settings are provided" {
  run kwctl run -r test_data/pod.json policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # request is accepted
  [ $(expr "$output" : '.*"allowed":true.*') -ne 0 ]
}
```

You execute the end-to-end tests by using this command:

```console
make e2e-tests
```

This produces the following output:

```console
bats e2e.bats
 ✓ accept when no settings are provided

1 test, 0 failures
```

You should write a test ensuring request approval when respecting a user-defined constraint:

```bash
@test "accept because label is satisfying a constraint" {
  run kwctl run annotated-policy.wasm \
    -r test_data/pod.json \
    --settings-json '{"constrained_labels": {"cc-center": "\\d+"}}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}
```

Next, you can write a test checking request acceptance when none of the labels is on the deny list:

```bash
@test "accept labels are not on deny list" {
  run kwctl run \
    -r test_data/pod.json \
    --settings-json '{"denied_labels": ["foo", "bar"]}' \
    policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  [ $(expr "$output" : '.*"allowed":true.*') -ne 0 ]
}
```

You can improve the test coverage by adding a test that rejects a request because one of the labels is on the deny list:

```bash
@test "reject because label is on deny list" {
  run kwctl run annotated-policy.wasm \
    -r test_data/pod.json \
    --settings-json '{"denied_labels": ["foo", "owner"]}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*false') -ne 0 ]
  [ $(expr "$output" : ".*Label owner is on the deny list.*") -ne 0 ]
}
```

The following test ensures a request rejection when one of its labels doesn't
satisfy the constraint provided by the user.

```bash
@test "reject because label is not satisfying a constraint" {
  run kwctl run annotated-policy.wasm \
    -r test_data/pod.json \
    --settings-json '{"constrained_labels": {"cc-center": "team-\\d+"}}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*false') -ne 0 ]
  [ $(expr "$output" : ".*The value of cc-center doesn't pass user-defined constraint.*") -ne 0 ]
}
```

Now you can make sure the validation fails if one of the constrained labels is
not found:

```bash
@test "reject because constrained label is missing" {
  run kwctl run annotated-policy.wasm \
    -r test_data/pod.json \
    --settings-json '{"constrained_labels": {"organization": "\\d+"}}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*false') -ne 0 ]
  [ $(expr "$output" : ".*Constrained label organization not found inside of Pod.*") -ne 0 ]
}
```

You want to check settings validation is working correctly.
You can do this with the following tests:

```bash
@test "fail settings validation because of conflicting labels" {
  run kwctl run \
    -r test_data/pod.json \
    --settings-json '{"denied_labels": ["foo", "cc-center"], "constrained_labels": {"cc-center": "^cc-\\d+$"}}' \
    policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation failed
  [ $(expr "$output" : ".*Provided settings are not valid: These labels cannot be constrained and denied at the same time: Set{cc-center}.*") -ne 0 ]
}

@test "fail settings validation because of invalid constraint" {
  run kwctl run \
    -r test_data/pod.json \
    --settings-json '{"constrained_labels": {"cc-center": "^cc-[12$"}}' \
    policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation failed
  [ $(expr "$output" : ".*Provided settings are not valid: error parsing regexp.*") -ne 0 ]
}
```

## Conclusion

The eight end-to-end tests now give a good level of coverage, you can run them all:

```shell
$ make e2e-tests
bats e2e.bats
e2e.bats
 ✓ accept when no settings are provided
 ✓ accept because label is satisfying a constraint
 ✓ accept labels are not on deny list
 ✓ reject because label is on deny list
 ✓ reject because label is not satisfying a constraint
 ✓ reject because constrained label is missing
 ✓ fail settings validation because of conflicting labels
 ✓ fail settings validation because of invalid constraint

8 tests, 0 failures
```
