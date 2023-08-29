---
sidebar_label: "Policy authors"
title: "Testing for policy authors"
description: An introduction to testing Kubewarden policies for policy authors.
keywords: [kubewarden, policy testing, policy author, rust, go, assemblyscript, development environment]
---

Kubewarden policies are regular programs compiled as WebAssembly (Wasm).
As with any kind of program, good test coverage is important.

Policy authors can use their favorite development environments, tools and, testing frameworks to verify their development.

These three Kubewarden policies provide an example written in each of [Rust](/writing-policies/rust/01-intro-rust.md), [Go](/writing-policies/go/01-intro-go.md) and [AssemblyScript](https://www.assemblyscript.org/) respectively:

- [psp-apparmor](https://github.com/kubewarden/psp-apparmor)
- [ingress-policy](https://github.com/kubewarden/ingress-policy)
- [pod-privileged-policy](https://github.com/kubewarden/pod-privileged-policy)

These policies have integrated test suites using the regular testing libraries of their development environments.

Also, the projects that develop these policies use GitHub Actions to implement their CI pipelines.

## End-to-end tests

Policy authors can also write tests that are executed against the actual Wasm binary containing your policy.
This can be done without having to deploy a Kubernetes cluster by using these tools:

- [bats](https://github.com/bats-core/bats-core): is used to write tests and automate their execution.
- [kwctl](https://github.com/kubewarden/kwctl): Kubewarden's default CLI tool that helps you with policy-related operations; pull, inspect, annotate, push, and run.

To use `kwctl run` the following input is needed:

1. Wasm binary file reference of the policy to be run.
The Kubewarden policy can be loaded from the local filesystem (`file://`), an HTTP(s) server (`https://`) or an OCI registry (`registry://`).
1. The admission request object to be evaluated.
This is provided via the `--request-path` argument.
The request can be provided on `stdin` by setting `--request-path` to `-`.
1. The policy settings to be used at evaluation time, can be provided as an inline JSON via `--settings-json` flag.
Or a JSON, or a YAML file loaded from the filesystem via `--settings-path`.

Once the policy evaluation is done, `kwctl` prints the `ValidationResponse` object to the standard output.

For example, this is how `kwctl` can be used to test the Wasm
binary of the `ingress-policy` linked above:

```
$ curl https://raw.githubusercontent.com/kubewarden/ingress-policy/v0.1.8/test_data/ingress-wildcard.json 2> /dev/null | \
    kwctl run \
        --settings-json '{"allowPorts": [80], "denyPorts": [3000]}' \
        --request-path - \
        registry://ghcr.io/kubewarden/policies/ingress:v0.1.8 | jq
```

Using `bats` you can write a test that runs this command and looks for the expected outputs:

```bash
@test "all is good" {
  run kwctl run \
    --request-path test_data/ingress-wildcard.json \
    --settings-json '{"allowPorts": [80], "denyPorts": [3000]}' \
    ingress-policy.wasm

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # settings validation passed
  [[ "$output" == *"valid: true"* ]]

  # request accepted
  [[ "$output" == *"allowed: true"* ]]
}
```

You can put the code in a file, `e2e.bats`, for example, and then invoke `bats` by:

```
$ bats e2e.bats
 ✓ all is good

1 tests, 0 failures
```

[This](/writing-policies/go/05-e2e-tests.md) section of the documentation has more about writing end-to-end tests of your policies.
