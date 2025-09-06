---
sidebar_label: End-to-end testing
sidebar_position: 050
title: End-to-end testing
description: Writing end-to-end tests for a Kubewarden policy using TypeScript.
keywords: [kubewarden, kubernetes, testing policies, typescript, e2e testing]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, typescript, end-to-end-testing]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/typescript/end-to-end-testing"/>
</head>

This section shows how you can write end-to-end tests running against the actual WebAssembly binary produced by the Javy compilation toolchain.

## Prerequisites

Recall, you need these tools on your development machine:

- **bats**: Used to write the tests and automate their execution.
- **kwctl**: CLI tool provided by Kubewarden to run its policies outside of Kubernetes, among other actions. It's covered in [the testing policies section](../testing-policies/index.md) of the documentation.

## Writing tests

You'll be using bats to write and automate your tests. Each test has the following steps:

1. Run the policy using `kwctl`.
2. Perform assertions against the output produced by `kwctl`.

All the end-to-end tests go in a file called `e2e.bats`. The project scaffolding project already includes an example `e2e.bats`. You need to extend its contents to provide comprehensive test coverage for your policy behavior.

## Test data files

The end-to-end tests use JSON files containing Kubernetes resources. You should have these test data files:

**`test_data/pod.json`** - A Pod without a hostname:

```json
{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "test-pod"
  },
  "spec": {
    "containers": [
      {
        "name": "nginx",
        "image": "nginx:latest"
      }
    ]
  }
}
```

**`test_data/pod_with_hostname.json`** - A Pod with a hostname:

```json
{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "test-pod"
  },
  "spec": {
    "hostname": "test-hostname",
    "containers": [
      {
        "name": "nginx",
        "image": "nginx:latest"
      }
    ]
  }
}
```

**`test_data/deployment.json`** - A non-Pod resource:

```json
{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "test-deployment"
  },
  "spec": {
    "replicas": 1,
    "selector": {
      "matchLabels": {
        "app": "test"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "test"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "nginx",
            "image": "nginx:latest"
          }
        ]
      }
    }
  }
}
```

## Basic test cases

The template already provides several basic tests. Here are the existing tests with explanations:

### Test 1: Reject denied hostnames

```bash
@test "reject because hostname is on deny list" {
  # Convert Pod definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Pod -r test_data/pod_with_hostname.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output") --settings-json '{"denied_hostnames": ["forbidden-host", "test-hostname"]}'

  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # request rejected
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*false') -ne 0 ]
  [ $(expr "$output" : ".*Pod hostname 'test-hostname' is not allowed.*") -ne 0 ]
}
```

This test ensures the policy rejects Pods when their hostname is in the deny list.

### Test 2: Accept allowed hostnames

```bash
@test "accept because hostname is not on the deny list" {
  # Convert Pod definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Pod -r test_data/pod_with_hostname.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output") --settings-json '{"denied_hostnames": ["forbidden-host"]}'
  
  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # request accepted
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}
```

This test verifies the policy accepts Pods when their hostname isn't in the deny list.

### Test 3: Accept when no settings provided

```bash
@test "accept because the deny list is empty" {
  # Convert Pod definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Pod -r test_data/pod_with_hostname.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output")
  
  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # request accepted
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}
```

This test ensures the policy accepts requests when you provide no settings.

### Test 4: Accept pods without hostnames

```bash
@test "accept because pod has no hostname set" {
  # Convert Pod definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Pod -r test_data/pod.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output") --settings-json '{"denied_hostnames": ["forbidden-host"]}'
  
  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # request accepted (no hostname to check)
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}
```

This test verifies that the policy accepts Pods without hostnames regardless of the deny list.

### Test 5: Accept non-Pod resources

```bash
@test "accept non-pod resources" {
  # Convert Deployment definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Deployment -r test_data/deployment.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output") --settings-json '{"denied_hostnames": ["forbidden-host"]}'
  
  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # request accepted (not a pod)
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}
```

This test ensures the policy accepts resources that aren't Pods, since the policy only validates Pod hostnames.

## Extended test coverage

You can extend the test coverage by adding more test scenarios:

### Test 6: Settings validation

You can also add tests to verify settings validation works correctly:

```bash
@test "accept valid settings" {
  # Convert Pod definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Pod -r test_data/pod.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output") --settings-json '{"denied_hostnames": ["host1", "host2"]}'
  
  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # settings are valid, request processed normally
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}
```

### Test 7: Edge cases

```bash
@test "reject with multiple denied hostnames" {
  # Convert Pod definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Pod -r test_data/pod_with_hostname.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output") --settings-json '{"denied_hostnames": ["bad-host", "test-hostname", "forbidden-host"]}'
  
  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # request rejected
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*false') -ne 0 ]
  [ $(expr "$output" : ".*Pod hostname 'test-hostname' is not allowed.*") -ne 0 ]
}
```

```bash
@test "accept with empty denied hostnames array" {
  # Convert Pod definition to AdmissionRequest format
  run kwctl scaffold admission-request --type Pod -r test_data/pod_with_hostname.json
  [ "$status" -eq 0 ]
  
  # Run the policy with the AdmissionRequest
  run kwctl run annotated-policy.wasm -r <(echo "$output") --settings-json '{"denied_hostnames": []}'
  
  # this prints the output when one of the checks below fails
  echo "output = ${output}"

  # request accepted
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}
```

## Running the tests

You can run all the end-to-end tests by using this command:

```console
make e2e-tests
```

This produces output like:

```console
bats e2e.bats
e2e.bats
 ✓ reject because hostname is on the deny list
 ✓ accept because hostname is not on the deny list
 ✓ accept because the deny list is empty
 ✓ accept because pod has no hostname set
 ✓ accept non-pod resources
 ✓ accept valid settings
 ✓ reject with multiple denied hostnames
 ✓ accept with empty denied hostnames array

8 tests, 0 failures
```

## Understanding test output

Each test uses `kwctl` to run the policy and checks:

- **Exit status**: `kwctl` should exit with status 0 for successful policy execution
- **Allowed field**: The JSON output contains an `allowed` field indicating if the request was accepted
- **Message content**: For rejected requests, the output contains a descriptive error message

The `echo "output = ${output}"` statements in each test help with debugging by showing the actual policy output when a test fails.

## Conclusion

The end-to-end tests provide comprehensive coverage of the policy behavior by testing against the actual WebAssembly binary. This ensures that the policy works correctly when deployed in Kubewarden, not just in the TypeScript development environment.

:::tip
For more comprehensive examples of end-to-end tests, you can explore the [policy-sdk-js source code](https://github.com/kubewarden/policy-sdk-js/blob/main/demo_policy/e2e.bats), which includes extensive e2e tests demonstrating each of Kubewarden's host capabilities. These tests can serve as inspiration for testing more advanced policy features like networking, cryptographic operations, and OCI registry interactions.
:::

