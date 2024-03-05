---
sidebar_label: Creating a new policy
title: Creating a new policy
description: Creating a new OPA policy for Kubewarden.
keywords: [kubewarden, kubernetes, creating a policy, open policy agent, opa, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, open-policy-agent, create-policy]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/open-policy-agent/create-policy"/>
</head>

You can create a sample policy that helps to understand the important concepts.

:::note
There is a [kubewarden/opa-policy-template](https://github.com/kubewarden/opa-policy-template)
that you can use to port an existing policy.
:::

## Requirements

You'll write, compile and execute a policy in this section.
You need these tools to complete this tutorial:

- [`opa`](https://github.com/open-policy-agent/opa/releases):
you'll use the `opa` CLI to build your policy as a `wasm` target.

- [`kwctl`](https://github.com/kubewarden/kwctl/releases):
you'll use `kwctl` to execute your built policy.

## The policy

You're going to create a policy that evaluates any kind of namespaced resource.
Its goal is to forbid the creation of any resource if the target namespace is `default`. Otherwise, the request is to accepted.
Start by creating a folder called `opa-policy`.

Create a folder named `data` in the `opa-policy` folder.
This folder has the recorded `AdmissionReview` objects from the Kubernetes API server.
They're reduced for the sake of simplicity for the exercise,
so you can focus on the bits that matter.

Create a `default-ns.json` file with the following contents inside the `data` directory:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
    "operation": "CREATE",
    "object": {
      "kind": "Pod",
      "apiVersion": "v1",
      "metadata": {
        "name": "nginx",
        "namespace": "default",
        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"
      }
    }
  }
}
```

This simulates a pod operation creation inside the `default` namespace.
Now, create another request example in `other-ns.json` inside the `data` directory:

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "request": {
    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",
    "operation": "CREATE",
    "object": {
      "kind": "Pod",
      "apiVersion": "v1",
      "metadata": {
        "name": "nginx",
        "namespace": "other",
        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"
      }
    }
  }
}
```

You can see this simulates another pod creation request,
this time under a namespace called `other`.

Go back to your `opa-policy` folder and start writing your Rego policy.

In this folder, create a file named `request.rego` in the `opa-policy` folder.
The name could be anything, but you'll use that for this exercise.
This is a Rego file that has utility code regarding the request/response itself.
In particular,
it lets you simplify your policy code and reuse this common part across different policies.

The contents are:

```rego
package policy

import data.kubernetes.admission

main = {
	"apiVersion": "admission.k8s.io/v1",
	"kind": "AdmissionReview",
	"response": response,
}

response = {
	"uid": input.request.uid,
	"allowed": false,
	"status": {"message": reason},
} {
	reason = concat(", ", admission.deny)
	reason != ""
} else = {
	"uid": input.request.uid,
	"allowed": true,
} {
	true
}
```

You have no need, at this point, to go, in detail, into the Rego code.
You can learn about it at its [website](https://www.openpolicyagent.org/docs/latest/policy-language/).

In this case, it returns either `allowed: true` or `allowed: false`.
This depends on whether the other package ,
`data.kubernetes.admission`,
has any `deny` statement that evaluates to `true`.

If any `data.kubernetes.admission.deny` evaluates to `true`,
the `response` here evaluates to the first block.
Otherwise, it evaluates to the second block, leading to acceptance.
Because no `deny` block evaluated to `true`,
this means the policy is accepting the request.

This is just the shell of the policy, the utility.
Now, you create another file, called, for example,
`policy.rego` inside our `opa-policy` folder with these contents:

```rego
package kubernetes.admission

deny[msg] {
	input.request.object.metadata.namespace == "default"
	msg := "it is forbidden to use the default namespace"
}
```

This is the important part of your policy.
The `deny` statement evaluates to `true` if all statements within it evaluate to `true`.
In this case, there is only one statement, checking if the namespace is `default`.

By Open Policy Agent design,
`input` has the query-able object with the `AdmissionReview` object,
so we can inspect it conveniently.

If everything went well, your tree should look like the following:

```console
.
├── data
│   ├── default-ns.json
│   └── other-ns.json
├── policy.rego
└── request.rego

1 directory, 4 files
```
