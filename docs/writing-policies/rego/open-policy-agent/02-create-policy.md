---
sidebar_label: "Create a New Policy"
title: ""
---

# Create a new policy

Let's create a sample policy that will help us go through some
important concepts. Let's start!

:::note
We also provide a GitHub repository template
that you can use to quickly port an existing policy.

Check it out: [kubewarden/opa-policy-template](https://github.com/kubewarden/opa-policy-template)
:::

## Requirements

We will write, compile and execute the policy on this section. You
need some tools in order to complete this tutorial:

- [`opa`](https://github.com/open-policy-agent/opa/releases): we
will use the `opa` CLI to build our policy to a `wasm` target.

- [`kwctl`](https://github.com/kubewarden/kwctl/releases): we will use
`kwctl` to execute our built policy.

## The policy

We are going to create a policy that evaluates any kind of namespaced
resource. Its goal is to forbid the creation of any resource if the
target namespace is `default`. Otherwise, the request will be
accepted. Let's start by creating a folder called `opa-policy`.

We are going to create a folder named `data` inside of the
`opa-policy` folder. This folder will contain the recorded
`AdmissionReview` objects from the Kubernetes API server. I reduced
them greatly for the sake of simplicity for the exercise, so we can
focus on the bits that matter.

Let us first create a `default-ns.json` file with the following
contents inside the `data` directory:

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

This simulates a pod operation creation inside the `default`
namespace. Now, let's create another request example in
`other-ns.json` inside the `data` directory:

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

As you can see, this simulates another pod creation request, this time
under a namespace called `other`.

Let's go back to our `opa-policy` folder and start writing our Rego policy.

Inside this folder, we create a file named `request.rego` inside the
`opa-policy` folder. The name can be anything, but we'll use that one
for this exercise. As the name suggests, this is a Rego file that has
some utility code regarding the request/response itself: in
particular, it allows us to simplify our policy code itself and reuse
this common bit across different policies if desired. The contents
are:

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

We will not go too deep into the Rego code itself. You can learn about
it in [its
website](https://www.openpolicyagent.org/docs/latest/policy-language/).

Suffice to say that in this case, it will return either `allowed:
true` or `allowed: false` depending on whether other package
(`data.kubernetes.admission`) has any `deny` statement that evaluates
to `true`.

If any `data.kubernetes.admission.deny` evaluates to `true`, the
`response` here will evaluate to the first block. Otherwise, it will
evaluate to the second block -- leading to acceptance, because no
`deny` block evaluated to `true`, this means we are accepting the
request.

Now, this is just the shell of the policy, the utility. Now, we create
another file, called, for example `policy.rego` inside our
`opa-policy` folder with the following contents:

```rego
package kubernetes.admission

deny[msg] {
	input.request.object.metadata.namespace == "default"
	msg := "it is forbidden to use the default namespace"
}
```

This is our policy. The important part. `deny` will evaluate to true
if all statements within it evaluate to true. In this case, is only
one statement: checking if the namespace is `default`.

By Open Policy Agent design, `input` contains the queriable object
with the `AdmissionReview` object, so we can inspect it quite easily.

If everything went well, our tree should look like the following:

```
.
├── data
│   ├── default-ns.json
│   └── other-ns.json
├── policy.rego
└── request.rego

1 directory, 4 files
```
