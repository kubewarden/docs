---
sidebar_label: "Create a New Policy"
title: ""
---

# Creating a new validation policy

We are going to create a policy that validates the labels of Pod
objects.

The policy will reject all the Pods that use one or more labels on the deny list.
The policy will also validate certain labels using a regular expression
provided by the user.

To summarize, the policy settings will look like that:

```yaml
# List of labels that cannot be used
denied_labels:
- foo
- bar

# Labels that are validated with user-defined regular expressions
constrained_labels:
  priority: "[123]"
  cost-center: "^cc-\d+"
```

The policy would reject the creation of this Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    foo: hello world
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

The policy would also reject the creation of this Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    cost-center: cc-marketing
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

Policy's settings can also be used to force certain labels to be specified,
regardless of their contents:

```yaml
# Policy's settings

constrained_labels:
  mandatory-label: ".*" # <- this label must be present, we don't care about its value
```

## Scaffolding new policy project

The creation of a new policy project can be done by using this GitHub
template repository: [kubewarden/go-policy-template](https://github.com/kubewarden/go-policy-template).
Just press the "Use  this template" green button near the top of the page
and follow GitHub's wizard.

Clone the repository locally and then ensure the `module` directive inside
of the `go.mod` file looks like that:

```go-mod
module <path to your repository>
```
