> **Note well:** WebAssembly and WASI are fast evolving targets. The contents
> of this page have been written during Nov 2020, hence they could be outdated.
>
> Please open an issue if the contents of this page have become outdated.

# Go

As stated on the [official website](https://golang.org/):

> Go is an open source programming language that makes it easy to build simple,
> reliable, and efficient software.

Currently the official Go compiler can build WebAssembly as documented
[here](https://github.com/golang/go/wiki/WebAssembly). However, the compiler is
not currently capable of producing Wasm modules targeting the WASI interface.
[This upstream issue](https://github.com/golang/go/issues/31105) is tracking
the evolution of this topic.

Due to that, it's not possible to use the Go compiler to write Kubewarden policies.

# TinyGo

TinyGo is an alternative Go compiler. As stated on the [official website](https://tinygo.org/):

> TinyGo is a project to bring the Go programming language to microcontrollers
> and modern web browsers by creating a new compiler based on LLVM.
>
> You can compile and run TinyGo programs on many different microcontroller
> boards such as the BBC micro:bit and the Arduino Uno.
>
> TinyGo can also be used to produce WebAssembly (Wasm) code which is very
> compact in size.

TinyGo has WebAssembly support and, starting from the `0.16.0` release, it
can produce Wasm modules targeting the WASI interface.

## Known limitations

Currently TinyGo does not provide all the capabilities required to
write Kubewarden policies. The basic requirements of Kubewarden policies are outlined
[here](./index.md#recap).

This is a quick schema of what works and what doesn't work with TinyGo.

Capability         | Status |
-------------------|--------|
Read from STDIN    |   ❌   |
Write to STDOUT    |   ✅   |
Read env variables |   ❌   |
Handle JSON        |   🤨   |

## Write to STDOUT

Writing to STDOUT can be done using the `ftm` package.

## Read from STDIN

Reading from standard input is not yet implemented.
[This issue](https://github.com/tinygo-org/tinygo/issues/1505) has been created
to track the problem.

## Read environment variables

Reading environment variables is not working, they are always seen empty.
[This issue](https://github.com/tinygo-org/tinygo/issues/1504) has been created
to track the problem.

## Handle JSON

TinyGo **does not support** the full Go language, [this page](https://tinygo.org/lang-support/)
provides an overview of the Go features that are not yet supported.
Moreover, [this additional page](https://tinygo.org/lang-support/stdlib/) shows a detailed
overview of the support level of Go's standard library.

As stated by the page above, the [`encoding/json`](https://golang.org/pkg/encoding/json/)
package is not yet supported.
However, it's possible to use the [`github.com/buger/jsonparser`](https://github.com/buger/jsonparser)
library with TinyGo. This allows to parse incoming JSON requests.

The [`github.com/buger/jsonparser`](https://github.com/buger/jsonparser) library
provides only JSON parsing capabilities.  Anyhow, a Kubewarden Policy has to write
a JSON `ValidationResponse` response object to its STDOUT.
Luckily, the [`ValidationResponse`](./index.md#the-validationresponse-object)
object is trivial to produce, even without the help of a JSON library.
