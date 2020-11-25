# Testing Policies

Chimera Policies are regular WASM modules targeting the WASI interface. Morover,
they are also "exectutable" programs. Because of that it's really easy to run
your policies from your shell.

This can be done using the [Wasmtime](https://wasmtime.dev/) runtime.

Just follow the instructions on their website and install the `wasmtime` binary
on your machine. Once this is done you can invoke your Chimera Policy in this way:

```bash
$ wasmtime run [--env POLICY_SETTING=policy-value] policy.wasm
```

Your policy will then wait for the `AdmissionRequest` object to be provided
on its standard input.

You can create/record AdmissionRequests into json files and then feed them to
your policy in this way:

```bash
$ cat request.json | wasmtime run policy.wasm
```

## Example

The [pod-toleration policy](https://github.com/chimera-kube/pod-toleration-policy)
can be tested from the CLI in this way:

```shell
$ wasmtime run --env TAINT_KEY="dedicated-key" --env TAINT_VALUE="tenantA" --env ALLOWED_GROUPS="system:authenticated" target/wasm32-wasi/release/pod-toleration-policy.wasm
```

This "trick" is used to do some quick profiling of the policy using the
[hyperfine](https://github.com/sharkdp/hyperfine) utility.

This is a slightly redacted snippet taken from the `Makefile` of the project:

```shell
echo Accepting policy
hyperfine --warmup 10 "cat test_data/req_pod_with_equal_toleration.json | wasmtime run --env TAINT_KEY="dedicated-key" --env TAINT_VALUE="tenantA" --env ALLOWED_GROUPS="system:authenticated" target/wasm32-wasi/release/pod-toleration-policy.wasm"

echo Rejecting policy
hyperfine --warmup 10 "cat test_data/req_pod_with_equal_toleration.json | wasmtime run --env TAINT_KEY="dedicated-key" --env TAINT_VALUE="tenantA" --env ALLOWED_GROUPS="tenantA-users" target/wasm32-wasi/release/pod-toleration-policy.wasm"

echo Operation not relevant
hyperfine --warmup 10 "cat test_data/req_delete.json | wasmtime run --env TAINT_KEY="dedicated-key" --env TAINT_VALUE="tenantA" --env ALLOWED_GROUPS="tenantA-users" target/wasm32-wasi/release/pod-toleration-policy.wasm"
```
