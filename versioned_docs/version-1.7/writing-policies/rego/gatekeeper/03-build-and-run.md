---
sidebar_label: "Build and Run"
title: ""
---

# Build and run

Building and running the policy is done exactly the same way as a Rego
policy targeting Open Policy Agent. The structure of our project is
like:

```
.
├── data
│   ├── default-ns.json
│   └── other-ns.json
└── policy.rego

1 directory, 3 files
```

## Build

Let's build our policy by running the following `opa` command:

```shell
$ opa build -t wasm -e policy/violation policy.rego
```

What this does is build the rego policy, with:

- `target`: `wasm`. We want  to build the policy for the `wasm` target.
- `entrypoint`: `policy/violation`. The entry point is the `violation`
rule inside the `policy` package.
- `policy.rego`: build and include the `policy.rego` file.

The previous command generates a `bundle.tar.gz` file. You can extract
the wasm module from it:

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

We can now execute our policy!

## Run

Let's use `kwctl` to run our policy as follows:

```
$ kwctl run -e gatekeeper --request-path data/other-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

Given that this is our resource created in the namespace called
`other`, this resource is accepted, as expected.

Now let's execute a request that will be rejected by the policy:

```
$ kwctl run -e gatekeeper --request-path data/default-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "it is forbidden to use the default namespace"
  }
}
```

As you can see, our Gatekeeper policy rejected this resource as expected.
