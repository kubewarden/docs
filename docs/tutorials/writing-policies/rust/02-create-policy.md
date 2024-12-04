---
sidebar_label: Creating a policy
title: Creating a policy
description: Creating a Kubewarden policy using Rust.
keywords: [kubewarden, kubernetes, policy creation]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, rust, creating-policies]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rust/create-policy"/>
</head>

As an example, you create a simple validation policy that processes Pod creation requests.

The policy looks at the `metadata.name` attribute of the Pod and rejects pods having an invalid name.
It's list of invalid names should be configurable by end users of the policy.

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

### Testing

You can try:

```console
cargo test
```

This tests the generated scaffolding. If everything is correctly in place you'll see a series of compilation messages ending with output like:

```console
running 4 tests
test settings::tests::validate_settings ... ok
test tests::accept_request_with_non_pod_resource ... ok
test tests::accept_pod_with_valid_name ... ok
test tests::reject_pod_with_invalid_name ... ok

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```
