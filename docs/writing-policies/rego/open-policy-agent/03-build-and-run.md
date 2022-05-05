---
sidebar_label: "Build and Run"
title: ""
---

# Build and run

In the previous section we have written our Rego policy. The structure
looks as the following:

```
.
├── data
│   ├── default-ns.json
│   └── other-ns.json
├── policy.rego
└── request.rego

1 directory, 4 files
```

## Build

We have our policy, now let's go ahead and build it. We do:

```shell
$ opa build -t wasm -e policy/main policy.rego request.rego
```

What this does is build the rego policy, with:

- `target`: `wasm`. We want  to build the policy for the `wasm` target.
- `entrypoint`: `policy/main`. The entry point is the `main` rule
inside the `policy` package.
- `policy.rego`: build and include the `policy.rego` file.
- `request.rego`: build and include the `request.rego` file.

After the build is complete, `opa build` will have generated a
`bundle.tar.gz` file. You can extract it:

```shell
$ tar -xf bundle.tar.gz /policy.wasm
```

Now the tree looks like the following:

```shell
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

We have our precious `policy.wasm` file:

```shell
$ file policy.wasm
policy.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)
```

Now it's time to execute it! Let's go on.

## Run

We are going to use `kwctl` in order to run the policy:

```
$ kwctl run -e opa --request-path data/other-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": true
}
```

This request is accepted by the policy, since this is the request
pointing to the `other` namespace.

- `execution-mode`: `opa`. Rego policies can be targeting Open Policy
  Agent or Gatekeeper: we must tell `kwctl` what kind of policy we are
  running.


- `request-path`: the location of the recorded request `kwctl` will
  send to the policy to evaluate.

Now let's try to evaluate the request that creates the pod inside the
`default` namespace:

```
$ kwctl run -e opa --request-path data/default-ns.json policy.wasm | jq
{
  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
  "allowed": false,
  "status": {
    "message": "it is forbidden to use the default namespace"
  }
}
```

In this case, the policy is rejecting the request, and giving a reason
back to the API server that will be returned to the user or API consumer.
