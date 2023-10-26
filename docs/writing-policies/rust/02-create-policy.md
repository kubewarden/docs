---
sidebar_label: "Creating a policy"
title: "Creating a policy"
description: Creating a Kubewarden policy using Rust.
keywords: [kubewarden, kubernetes, policy creation]
doc-type: [tutorial]
doc-topic: [writing-policies, rust, creating-policies]
---

As an example, we create a simple validation policy that processes Pod creation requests.

The policy looks at the `metadata.name` attribute of the Pod and rejects pods having an invalid name.
The list of invalid names should be configurable by end users of the policy.

The policy settings look something like:

```yaml
invalid_names:
- bad_name1
- bad_name2
```

The policy should accept the creation of a Pod like the following one:

```yaml
apiVersion: v1
kind: Pod
metadata:
// highlight-next-line
  name: nginx
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

It should reject the creation of a Pod like:

```yaml
apiVersion: v1
kind: Pod
metadata:
// highlight-next-line
  name: bad_name1
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

## Scaffolding the new policy project

You can create a new policy project by using `cargo generate` with the
[template project](https://github.com/kubewarden/rust-policy-template).

First, install `cargo-generate`. This requires [openssl-devel](https://pkgs.org/download/openssl-devel).

```shell
cargo install cargo-generate
```

Now scaffold the project as follows:

```shell
cargo generate --git https://github.com/kubewarden/rust-policy-template \
               --branch main \
               --name demo
```

The command produces output like:

```console
🔧   Creating project called `demo`...
✨   Done! New project created /<some-path-name>/demo
```

This creates the new policy project in the `demo` sub-directory.

:::note

If you plan to make use of the GitHub container registry functionality in the demo, you need to
[enable improved container support](https://docs.github.com/en/packages/working-with-a-github-packages-registry/enabling-improved-container-support-with-the-container-registry#enabling-the-container-registry-for-your-personal-account).

:::
