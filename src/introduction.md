> **WARNING:** Kubewarden is in early development stage, it's not production ready.
>
> Feedback is highly appreciated.

# Introduction

Kubewarden is a [Kubernetes Dynamic Admission
Controller](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/)
that validates incoming requests using policies written in
WebAssembly.

## What is WebAssembly?

As stated on [WebAssembly's official
website](https://webassembly.org/):

> WebAssembly (abbreviated Wasm) is a binary instruction format for a
> stack-based virtual machine. Wasm is designed as a portable
> compilation target for programming languages, enabling deployment on
> the web for client and server applications.

WebAssembly has been originally conceived as an "extension" of
browsers. However, recent efforts have been made by the WebAssembly
community to allow the execution of WebAssembly code outside of
browsers.

## Why use WebAssembly?

By using WebAssembly, users can write Kubernetes policies using their
favorite programming language, as long as the language can produce
Wasm binaries.

Policy authors can reuse their skills, tools and best
practices. Policies are "traditional" programs that can have reusable
blocks (regular libraries), can be tested, can be linted, can be
plugged into their current CI and CD workflows,...

Wasm modules are portable, once built they can run on any kind of
processor architecture and Operating System. A policy built on a Apple
Silicon machine can be run on a x86_64 Linux server without any
conversion.

## Policy distribution

Kubewarden Policies can be served by a regular web server or, even
better, can be published inside of an OCI compliant registry.

Kubewarden Policies can be stored inside of an OCI compliant registry as
[OCI artifacts](https://github.com/opencontainers/artifacts).
