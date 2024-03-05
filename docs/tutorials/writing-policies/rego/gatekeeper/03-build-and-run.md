---
sidebar_label: Build and run
title: Build and run a Gatekeeper policy
description: Building and running a Gatekeeper policy written in Rego.
keywords: [kubewarden, kubernetes, gatekeeper policy, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, gatekeeper, build-and-run]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/gatekeeper/build-and-run"/>
</head>

You can build and run the policy in exactly the same way as a Rego policy targeting Open Policy Agent.
The structure of your project is:

```
.
├── data
│   ├── default-ns.json
│   └── other-ns.json
└── policy.rego

1 directory, 3 files
```

## Build

Build the policy by running the `opa` command:

```shell
$ opa build -t wasm -e policy/violation policy.rego
```

This builds the rego policy, with:

- `target`: `wasm`. We want to build the policy for the `wasm` target.
- `entrypoint`: `policy/violation`. The entry point is the `violation`
rule inside the `policy` package.
- `policy.rego`: build and include the `policy.rego` file.

The earlier command generates a `bundle.tar.gz` file.
You can extract the Wasm module from it:

```shell
$ tar -xf bundle.tar.gz /policy.wasm
```

The project tree looks like the following:

```
.
├── bundle.tar.gz
├── data
│   ├── default-ns.json
│   └── other-ns.json
├── policy.rego
└── policy.wasm

1 directory, 5 files
```

You can now execute your policy.

## Run

Use `kwctl` to run your policy as follows:

```
$ kwctl run -e gatekeeper --request-path data/other-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

This is your resource created in the namespace called `other`, it's accepted, as expected.

Now you can run a request that is rejected by the policy:

```console
$ kwctl run -e gatekeeper --request-path data/default-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "it is forbidden to use the default namespace"
  }
}
```

You can see your Gatekeeper policy rejected this resource.
