# While creating a policy

Kubewarden Policies are regular programs compiled as WebAssembly. As with any kind
of program, it's important to have good test coverage.

Policy authors can leverage the testing frameworks and tools of their language
of choice to verify the behaviour of their policies.

As an example, you can take a look at these Kubewarden policies:

* [psp-apparmor](https://github.com/kubewarden/psp-apparmor): this
  is a Kubewarden Policy written using [Rust](/writing-policies/rust/01-intro.html).
* [ingress-policy](https://github.com/kubewarden/ingress-policy): this is
  a Kubewarden Policy written using [Go](/writing-policies/go/01-intro.html).
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
* [policy-testdrive](https://github.com/kubewarden/policy-server/releases):
  cli tool provided by Kubewarden to run its policies outside of
  Kubernetes.

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

For example, this is how `policy-testdrive` can be used to test the
WebAssembly binary of the `ingress-policy` linked above:

```
$ policy-testdrive -p ingress-policy.wasm \
    -r test_data/ingress-wildcard.json \
    -s '{"allowPorts": [80], "denyPorts": [3000]}'
Settings validation result: SettingsValidationResponse { valid: true, message: None }
Policy evaluation results:
ValidationResponse { uid: "", allowed: false, patch_type: None, patch: None, status: Some(ValidationResponseStatus { message: Some("These ports are not on the allowed list: Set{3000}"), code: None }) }
```

Using `bats` we can can write a test that runs this command and looks for the
expected outputs:

```bash
@test "all is good" {
  run policy-testdrive -p ingress-policy.wasm \
    -r test_data/ingress-wildcard.json \
    -s '{"allowPorts": [80], "denyPorts": [3000]}'

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

Checkout [this section](/writing-policies/go/05-e2e-tests.html)
of the documentation to learn more about writing end-to-end
tests of your policies.
