# Creating a new validation policy

We are going to create a simple validation policy that processes
Pod creation requests.

The policy will look at the `metadata.name` attribute of the Pod and reject
the pods that have an invalid name. We want the list of invalid names to be
configurable by the end users of the policy.

To summarize, the policy settings will look like that:

```yaml
invalid_names:
- bad_name1
- bad_name2
```

The policy will accept the creation of a Pod like the following one:

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

While it will reject the creation of a Pod like the following one:

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

## Scaffolding new policy project

The creation of a new policy project can be done by feeding this
[template project](https://github.com/kubewarden/policy-rust-template)
into `cargo generate`.

First, install `cargo-generate`. Note, this requires [openssl-devel](https://pkgs.org/download/openssl-devel).

```
cargo install cargo-generate
```

Now scaffold the project as follows:

```shell
cargo generate --git https://github.com/kubewarden/policy-rust-template \
               --branch main \
               --name demo
```

The command will produce the following output:

```
🔧   Creating project called `demo`...
✨   Done! New project created /home/flavio/hacking/kubernetes/kubewarden/demo
```

The new policy project can now be found inside of the `demo` directory.
