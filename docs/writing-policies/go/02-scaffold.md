---
sidebar_label: New validation policy
title: Creating a new validation policy
description: Creating a new validation policy for Kubewarden using Go.
keywords: [kubewarden, kubernetes, writing policies in Go, new validation policy]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, go, creating a new validation policy]
doc-persona: [kubewarden-developer]
---

This tutorial covers creating a policy that validates the labels of Pod objects.

The policy is to reject all Pods that use one or more labels on the deny-list.
The policy also validates certain labels using a regular expression provided by the user.

To summarize, the policy settings should look like this:

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

The policy rejects the creation of this Pod:

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

It also rejects the creation of this Pod:

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

You can use the policy's settings to force using a label specification, regardless of content:

```yaml
constrained_labels:
  mandatory-label: ".*" # <- this label must be present, we don't care about its value
```

## Scaffolding new policy project

You can create a new policy project using the
[template repository](https://github.com/kubewarden/go-policy-template).
Select the "Use this template" green button near the top of the page
and follow GitHub's wizard.

Clone the repository locally and set the `module` directive in the `go.mod` file to look like:

```go
module <path to your repository>
```
