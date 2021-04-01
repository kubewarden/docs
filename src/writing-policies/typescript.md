> **Note well:** WebAssembly and WASI are fast evolving targets. The contents
> of this page have been written during Nov 2020, hence they could be outdated.
>
> Please open an issue if the contents of this page have become outdated.

# TypeScript

As stated on the [official website](https://www.typescriptlang.org/):

> TypeScript extends JavaScript by adding types.
>
> By understanding JavaScript, TypeScript saves you time catching errors and
> providing fixes before you run code.

TypeScript **cannot** be converted to WebAssembly, however
[AssemblyScript](https://www.assemblyscript.org/) is a **subset** of TypeScript
designed explicitly for WebAssembly.

AssemblyScript can produce Wasm modules targeting the WASI interface by
leveraging the [as-wasi](https://github.com/jedisct1/as-wasi) project.

## Known limitations

AssemblyScript provides all the capabilities required to
write Kubewarden policies. The basic requirements of Kubewarden policies are outlined
[here](./index.md#recap).

This is a quick schema of what works and what doesn't work with AssemblyScript

Capability         | Status |
-------------------|--------|
Read from STDIN    |   ✅   |
Write to STDOUT    |   ✅   |
Read env variables |   ✅   |
Handle JSON        |   ✅   |

### Write to STDOUT

Writing to STDOUT can be done using the [`Console`](https://github.com/jedisct1/as-wasi/blob/master/REFERENCE_API_DOCS.md#classesconsolemd)
class defined by `as-wasi`.

### Read from STDIN

Reading from STDIN can be done using the [`Console`](https://github.com/jedisct1/as-wasi/blob/master/REFERENCE_API_DOCS.md#classesconsolemd)
class defined by `as-wasi`.

This has been working properly since the `0.4.4` relase of `as-wasi`.

### Read environment variables

This can be done using the [`Environ`](https://github.com/jedisct1/as-wasi/blob/master/REFERENCE_API_DOCS.md#classesenvironmd)
class provided by `as-wasi`.

### Handle JSON

AssemblyScript is a subset of TypeScript, hence JSON handling is not provided
out of the box.

This can be done using the [assemblyscript-json](https://github.com/nearprotocol/assemblyscript-json)
project.

## Example

[This GitHub repository](https://github.com/kubewarden/pod-privileged-policy)
contains a Kubewarden Policy written in AssemblyScript.

**Worth of note:** this repository has a series of GitHub Actions that automate
the following tasks:

  * Run unit tests and code linting on pull requests and after code is merged
    into the main branch
  * Build the policy in `release` mode and push it to a OCI registry as an
    artifact
