---
sidebar_label: "End-to-end testing"
title: ""
---

# End-to-end testing

So far we have tested the policy using a set of Go unit tests. This section shows
how we can write end-to-end tests that run against the actual WebAssembly
binary produced by TinyGo.

## Prerequisites

These tools need to be installed on your development machine:

- docker or another container engine: used to build the WebAssembly
  policy. We will rely on the compiler shipped within the official
  TinyGo container image.
- [bats](https://github.com/bats-core/bats-core): used to write the
  tests and automate their execution.
- [kwctl](https://github.com/kubewarden/kwctl/releases): CLI tool
  provided by Kubewarden to run its policies outside of Kubernetes,
  among other actions. This is covered in depth inside of [this section](/testing-policies/01-intro.md)](/testing-policies/01-intro.md) of the documentation.

## Writing tests

We are going to use [bats](https://github.com/bats-core/bats-core) to write and
automate our tests. Each test will be composed by the following steps:

1. Run the policy using `kwctl`.
1. Perform some assertions against the output produced by the
   `kwctl`.

All the end-to-end tests are located inside a file called `e2e.bats`. The
scaffolded project already includes such a file. We will just change its
contents to reflect how our policy behaves.

As a final note, for the end-to-end tests, we will use the same test fixtures files
we previously used inside of the Go unit tests.

The first test ensures a request is approved when no settings are provided:

```bash
@test "accept when no settings are provided" {
  run kwctl run -r test_data/pod.json policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # request is accepted
  [ $(expr "$output" : '.*"allowed":true.*') -ne 0 ]
}
```

We can execute the end-to-end tests by using this command:

```shell
make e2e-tests
```

This will produce the following output:

```shell
bats e2e.bats
 ✓ accept when no settings are provided

1 test, 0 failures
```

Let's write a test to ensure a request is approved when a user-defined constraint
is respected:

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

Next, we can write a test to ensure a request is accepted when none of the
labels is on the deny list:

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

Let's improve the test coverage by adding a test that rejects a request
because one of the labels is on the deny list:

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

The following test ensures a request is rejected when one of its labels doesn't
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

Now let's make sure the validation fails if one of the constrained labels is
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

We want to ensure settings' validation is working properly. This can be done
with the following tests:

```bash
@test "fail settings validation because of conflicting labels" {
  run kwctl run \
    -r test_data/pod.json \
    --settings-json '{"denied_labels": ["foo", "cc-center"], "constrained_labels": {"cc-center": "^cc-\\d+$"}}' \
    policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation failed
  [ $(expr "$output" : '.*"valid":false.*') -ne 0 ]
  [ $(expr "$output" : ".*Provided settings are not valid: These labels cannot be constrained and denied at the same time: Set{cc-center}.*") -ne 0 ]
}

@test "fail settings validation because of invalid constraint" {
  run kwctl run \
    -r test_data/pod.json \
    --settings-json '{"constrained_labels": {"cc-center": "^cc-[12$"}}' \
    policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  [ $(expr "$output" : '.*"valid":false.*') -ne 0 ]
  [ $(expr "$output" : ".*Provided settings are not valid: error parsing regexp.*") -ne 0 ]
}
```

## Conclusion

We have reached a pretty good level of coverage, let's run all the end-to-end
tests:

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
