---
sidebar_label: "Policy Authors"
title: ""
---

# While creating a policy

Kubewarden Policies are regular programs compiled as WebAssembly. As with any kind
of program, it's important to have good test coverage.

Policy authors can leverage the testing frameworks and tools of their language
of choice to verify the behaviour of their policies.

As an example, you can take a look at these Kubewarden policies:

* [psp-apparmor](https://github.com/kubewarden/psp-apparmor): this
  is a Kubewarden Policy written using [Rust](/writing-policies/rust/01-intro-rust.md).
* [ingress-policy](https://github.com/kubewarden/ingress-policy): this is
  a Kubewarden Policy written using [Go](/writing-policies/go/01-intro-go.md).
* [pod-privileged-policy](https://github.com/kubewarden/pod-privileged-policy): this
  is a Kubewarden Policy written using [AssemblyScript](https://www.assemblyscript.org/).

All these policies have integrated test suites built using the regular testing libraries
of Rust, Go and AssemblyScript.

Finally, all these projects rely on GitHub Actions to implement their CI pipelines.

## End-to-end tests

As a policy author you can also write tests that are executed against the actual
WebAssembly binary containing your policy. This can be done without having
to deploy a Kubernetes cluster by using these tools:

* [bats](https://github.com/bats-core/bats-core): used to write the
  tests and automate their execution.
* [kwctl](https://github.com/kubewarden/kwctl): Kubewarden go-to CLI
  tool that helps you with policy related operations such as pull,
  inspect, annotate, push and run.

`kwctl run` usage is quite simple, we just have to invoke it with the
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

For example, this is how `kwctl` can be used to test the WebAssembly
binary of the `ingress-policy` linked above:

```
$ curl https://raw.githubusercontent.com/kubewarden/ingress-policy/v0.1.8/test_data/ingress-wildcard.json 2> /dev/null | \
    kwctl run \
        --settings-json '{"allowPorts": [80], "denyPorts": [3000]}' \
        --request-path - \
        registry://ghcr.io/kubewarden/policies/ingress:v0.1.8 | jq
```

Using `bats` we can can write a test that runs this command and looks for the
expected outputs:

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

We can copy the snippet from above inside of a file called `e2e.bats`,
and then invoke `bats` in this way:

```
$ bats e2e.bats
 ✓ all is good

1 tests, 0 failures
```

Checkout [this section](/writing-policies/go/05-e2e-tests.md)
of the documentation to learn more about writing end-to-end
tests of your policies.
