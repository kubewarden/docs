---
sidebar_label: Build and run
title: Build and run a OPA policy for Kubewarden
description: Build and run a OPA policy for Kubewarden.
keywords: [kubewarden, kubernetes, build and run, open policy agent, opa, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, open-policy-agent, build-and-run]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/open-policy-agent/build-and-run"/>
</head>

In the previous section you wrote your Rego policy.
The structure looks like:

```console
.
├── data
│   ├── default-ns.json
│   └── other-ns.json
├── policy.rego
└── request.rego

1 directory, 4 files
```

## Build

To build:

```console
$ opa build -t wasm -e policy/main policy.rego request.rego
```

This builds the rego policy, with:

- `target`: `wasm`.
You want to build the policy for the `wasm` target.
- `entrypoint`: `policy/main`.
The entry point is the `main` rule inside the `policy` package.
- `policy.rego`:
Build and include the `policy.rego` file.
- `request.rego`:
Build and include the `request.rego` file.

After the build completes, `opa build` has generated a `bundle.tar.gz` file.
You can extract it:

```console
$ tar -xf bundle.tar.gz /policy.wasm
```

Now the tree looks like the following:

```console
.
├── bundle.tar.gz
├── data
│   ├── default-ns.json
│   └── other-ns.json
├── policy.rego
├── policy.wasm
└── request.rego

1 directory, 6 file
```

You have your `policy.wasm` file:

```console
$ file policy.wasm
policy.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)
```

Now you run it.

## Run

Use `kwctl` to run the policy:

```console
$ kwctl run -e opa --request-path data/other-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

This request is accepted by the policy,
since this is the request pointing to the `other` namespace.

- `execution-mode`: `opa`.
Rego policies can be targeting Open Policy Agent or Gatekeeper.
You must tell `kwctl` what kind of policy you're running.
- `request-path`:
The location of the recorded request that `kwctl` sends the policy to for evaluation.

Now try to evaluate the request that creates the pod inside the `default` namespace:

```console
$ kwctl run -e opa --request-path data/default-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "it is forbidden to use the default namespace"
  }
}
```

The policy is rejecting the request,
giving a reason back to the API server that's returned to the user or API consumer.
