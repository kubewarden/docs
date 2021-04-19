# End-to-end testing

So far we have tested the policy using a set of Go unit tests. This section shows
how we can write end-to-end test that run tests against the actual WebAssembly
binary produced by TinyGo.

## Prerequisites

These tools need to be installed on your development machine:

* docker or another container engine: used to build the WebAssembly
  policy. We will rely on the compiler shipped within the official
  TinyGo container image.
* [bats](https://github.com/bats-core/bats-core): used to write the
  tests and automate their execution.
* [policy-testdrive](https://github.com/kubewarden/policy-server/releases):
  cli tool provided by Kubewarden to run its policies outside of
  Kubernetes. This is covered in depth inside of [this section](/testing-policies.html)
  of the documentation.

## Building the policy

As a first step we need to build the policy into a WebAssembly binary.

This can be done with this simple command:

```shell
make wasm
```

This will pull the official TinyGo container image and run the build process
inside of an ephemeral container.

The compilation produces a file called `policy.wasm`.

## Writing tests

We are going to use [bats](https://github.com/bats-core/bats-core) to write and
automate our tests. Each test will be composed by the following steps:

1. Run the policy using `policy-testdrive`.
1. Perform some assertions against the output produced by the
  `policy-testdrive`.

All the end-to-end tests are located inside of a file called `e2e.bats`. The
scaffolded project already includes such a file. We will just change its
contents to reflect how our policy behaves.

As a final note, the end-to-end tests we will use the same test fixtures files
we previously used inside of the Go unit tests.

The first test ensures a request is approved when no settings are provided:

```bash
@test "accept when no settings are provided" {
  run policy-testdrive -p policy.wasm -r test_data/ingress.json

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request rejected
  [[ "$output" == *"allowed: true"* ]]
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
@test "accept user defined constraint is respected" {
  run policy-testdrive -p policy.wasm \
    -r test_data/ingress.json \
    -s '{"constrained_labels": {"owner": "^team-"}}'
  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request accepted
  [[ "$output" == *"allowed: true"* ]]
}
```

Next, we can write a test to ensure a request is accepted when none of the
labels is on the deny list:

```bash
@test "accept labels are not on deny list" {
  run policy-testdrive -p policy.wasm \
    -r test_data/ingress.json \
    -s '{"denied_labels": ["foo", "bar"]}'
  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request accepted
  [[ "$output" == *"allowed: true"* ]]
}
```

Let's improve the test coverage by adding a test that rejects a request
because one of the labels is on the deny list:

```bash
@test "reject because label is on deny list" {
  run policy-testdrive -p policy.wasm \
    -r test_data/ingress.json \
    -s '{"denied_labels": ["foo", "owner"]}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request rejected
  [[ "$output" == *"allowed: false"* ]]
  [[ "$output" == *"Label owner is on the deny list"* ]]
}
```

The following test ensures a request is rejected when one of its labels doesn't
satisfy the constraint provided by the user:

```bash
@test "reject because label doesn't pass validation constraint" {
  run policy-testdrive -p policy.wasm \
    -r test_data/ingress.json \
    -s '{"constrained_labels": {"cc-center": "^cc-\\d+$"}}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request rejected
  [[ "$output" == *"allowed: false"* ]]
  [[ "$output" == *"The value of cc-center doesn\'t pass user-defined constraint"* ]]
}
```

We want to ensure settings' validation is working properly. This can be done
with the following tests:

```bash
@test "fail settings validation because of conflicting labels" {
  run policy-testdrive -p policy.wasm \
    -r test_data/ingress.json \
    -s '{"denied_labels": ["foo", "cc-center"], "constrained_labels": {"cc-center": "^cc-\\d+$"}}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: false"* ]]
  [[ "$output" == *"Provided settings are not valid: These labels cannot be constrained and denied at the same time: Set{cc-center}"* ]]
}

@test "fail settings validation because of invalid constraint" {
  run policy-testdrive -p policy.wasm \
    -r test_data/ingress.json \
    -s '{"constrained_labels": {"cc-center": "^cc-[12$"}}'

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: false"* ]]
  [[ "$output" == *"Provided settings are not valid: error parsing regexp: missing closing ]: `[12$`"* ]]
}
```

## Conclusion

We have reached a pretty good level of coverage, let's run all the end-to-end
tests:

```shell
$ make e2e-tests
bats e2e.bats
 ✓ accept when no settings are provided
 ✓ accept user defined constraint is respected
 ✓ accept labels are not on deny list
 ✓ reject because label is on deny list
 ✓ reject because label doesn't pass validation constraint
 ✓ fail settings validation because of conflicting labels
 ✓ fail settings validation because of invalid constraint

7 tests, 0 failures
```
