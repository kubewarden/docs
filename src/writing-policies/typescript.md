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

TypeScript **cannot** be converted to WebAssembly, however the
[AssemblyScript](https://www.assemblyscript.org/) is a **subset** of TypeScript
designed explicitly for WebAssembly.

AssemblyScript can produce Wasm modules targeting the WASI interface by leveraging
the [as-wasi](https://github.com/jedisct1/as-wasi) project.

# Known limitations

Currently AssemblyScript does not provide all the capabilities required to
write Chimera policies. The basic requirements of Chimera policies are outlined
[here](/writing_policies/index.html#recap).

This is a quick schema of what works and what doesn't work with AssemblyScript

Capability         | Status |
-------------------|--------|
Read from STDIN    |   ❌   |
Write to STDOUT    |   ✅   |
Read env variables |   ✅   |
Handle JSON        |   ❔   |

## Write to STDOUT

Writing to STDOUT can be done using the [`Console`](https://github.com/jedisct1/as-wasi/blob/master/REFERENCE_API_DOCS.md#classesconsolemd)
class defined by `as-wasi`.

## Read from STDIN

Reading from STDIN can theoretically be done using the [`Console`](https://github.com/jedisct1/as-wasi/blob/master/REFERENCE_API_DOCS.md#classesconsolemd)
class defined by `as-wasi`.

Unfortunately right now no data is read from the STDIN.
[This issue](https://github.com/jedisct1/as-wasi/issues/95) has been created to track the problem.

## Read environment variables

This can be done using the [`Environ`](https://github.com/jedisct1/as-wasi/blob/master/REFERENCE_API_DOCS.md#classesenvironmd)
class provided by `as-wasi`.

## Handle JSON

AssemblyScript is a subset of TypeScript, hence JSON handling is not provided
out of the box.

The [assemblyscript-json](https://github.com/nearprotocol/assemblyscript-json)
project seems to provide this capability. However we haven't tested the library yet.
