---
sidebar_label: New validation policy
sidebar_position: 020
title: Creating a new validation policy
description: Creating a new validation policy for Kubewarden using TypeScript.
keywords: [kubewarden, kubernetes, writing policies in TypeScript, new validation policy]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, typescript, creating a new validation policy]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/typescript/scaffold"/>
</head>

This tutorial covers creating a policy that validates the hostnames of Pod objects.

The policy is to reject all Pods that use one or more hostnames on the deny list.
You provide policy configuration using runtime settings.

To summarize, the policy settings should look like this:

```json
{
  "denied_hostnames": [ "bad-host", "forbidden-host" ]
}
```

The policy rejects the creation of this Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  hostname: bad-host
  containers:
    - name: nginx
      image: nginx:latest
```

But it accepts the creation of this Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  hostname: allowed-host
  containers:
    - name: nginx
      image: nginx:latest
```

## Scaffolding a new policy project

You can create a new policy project using the [template repository](https://github.com/kubewarden/js-policy-template). Select the "Use this template" green button near the top of the page and follow GitHub's wizard.

Clone the repository locally and update the `package.json` file to reflect your policy details:

```json
{
  "name": "your-policy-name",
  "version": "1.0.0",
  "description": "Your policy description",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/your-policy-name"
  }
}
```

Make sure to use a repository path that matches your actual GitHub repository.

## Testing

Provided the necessary tools are in place, the `make all` command builds the `annotated-policy.wasm` target. The command `make e2e` runs tests using `bats` with `kwctl`.

<details>
<summary>Output from the `make` commands</summary>

```console
make all
npx webpack --config webpack.config.cjs
asset bundled.js 5.52 KiB [compared for emit] [minimized] (name: main)
asset types.d.ts 430 bytes [compared for emit]
asset index.d.ts 11 bytes [compared for emit]
./src/index.ts 3.84 KiB [built] [code generated]
./node_modules/kubewarden-policy-sdk/dist/bundle.js 3.85 KiB [built] [code generated]
webpack 5.101.3 compiled successfully in 2280 ms
npm install

up to date, audited 400 packages in 2s

58 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

```console
make e2e
npx webpack --config webpack.config.cjs
asset bundled.js 5.52 KiB [compared for emit] [minimized] (name: main)
asset types.d.ts 430 bytes [compared for emit]
asset index.d.ts 11 bytes [compared for emit]
./src/index.ts 3.84 KiB [built] [code generated]
./node_modules/kubewarden-policy-sdk/dist/bundle.js 3.85 KiB [built] [code generated]
webpack 5.101.3 compiled successfully in 1909 ms
bats e2e.bats
e2e.bats
 ✓ reject because hostname is on the deny list
 ✓ accept because hostname is not on the deny list
 ✓ accept because the deny list is empty
 ✓ accept because pod has no hostname set
 ✓ accept non-pod resources

5 tests, 0 failures
```

</details>
