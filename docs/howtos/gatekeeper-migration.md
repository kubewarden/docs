---
sidebar_label: Migrating Gatekeeper Policies to Kubewarden
title: "Migrating Gatekeeper Policies to Kubewarden"
description: "Migrating Gatekeeper Policies to Kubewarden"
keywords: [kubewarden, gatekeeper]
doc-persona:
  [kubewarden-operator, kubewarden-integrator, kubewarden-policy-developer]
doc-type: [howto]
doc-topic: [operator-manual]
---

This guide shows you how to convert an existing Gatekeeper policy into a
Kubewarden policy. This process involves two main steps:

1. Compile the Rego program into a WebAssembly (Wasm) module.
2. Distribute the WebAssembly module as a Kubewarden policy.

Our [Rego policies
tutorial](docs/tutorials/writing-policies/rego/01-intro-rego.md) covers most of
the build process for compiling Rego code into a WebAssembly module. This guide
focuses on the step-by-step process of extracting Gatekeeper Custom Resource
Definitions (CRDs) and migrating them into a functional Kubewarden policy. We
will use a basic Gatekeeper demo policy Prerequisites:

- [opa](https://github.com/open-policy-agent/opa/releases): you use this tool
  to build the code into wasm. This guide was written using the `v1.5.1` version.
- [kwctl](https://github.com/kubewarden/kwctl/releases): tool you use to
  prepare and run Kubewarden web assembly module
- [bats](https://github.com/bats-core/bats-core): tool used to run end-to-end
  tests. If you decided to write such kind of tests

## Before migrate your policies

Before starting the process of migration Gatekeeper policies, consider to use
the already available policies in the Kubewarden
[catalog](https://artifacthub.io/packages/search?kind=13). Some of the
[policies](https://github.com/kubewarden/rego-policies-library) are public
available OPA and Gatekeeper policies migrated to Kubewarden

Furthermore, you may be interested in our
[comparison](docs/explanations/comparisons/opa-comparison.md) documentation
between Kubewarden and Gatekeeper

## Step 1: Initialize Your Kubewarden Policy Project

First, use the Kubewarden Gatekeeper
[template](https://github.com/kubewarden/gatekeeper-policy-template) to create
a basic policy project structure. This provides Makefile targets for building
and testing your policy. After you create the policy code from the template,
run the Makefile commands to ensure the policy builds and tests run
successfully:

```console
$ make policy.wasm test
opa build -t wasm -e policy/violation -o bundle.tar.gz policy.rego
tar xvf bundle.tar.gz /policy.wasm
tar: Removing leading `/' from member names
/policy.wasm
rm bundle.tar.gz
touch policy.wasm # opa creates the bundle with unix epoch timestamp, fix it
opa test *.rego
PASS: 2/2
```

## Step 2: Migrate Gatekeeper Policy Code

Now, begin migrating the Gatekeeper policy. This involves converting a
`ConstraintTemplate` and its associated `Constraint` resources into a Kubewarden
policy. In the Kubewarden context, consider the `ConstraintTemplate` as the core
policy code, while the `Constraint instances` translate into policy instances
running within Kubewarden.

First, copy the Rego code from your `ConstraintTemplate` into the `policy.rego`
file the Kubewarden template generated. For this example, we will use the
following basic
[demo policy](https://github.com/open-policy-agent/gatekeeper/blob/896d6620f9c16d7a5d91a74a6a4260db8d735640/demo/basic/demo.sh#L1)
from the Gatekeeper repository.

<details>
<summary> Gatekeeper policy yaml </summary>
```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          type: object
          properties:
            labels:
              type: array
              items:
                type: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels

        violation[{"msg": msg, "details": {"missing_labels": missing}}] {
          provided := {label | input.review.object.metadata.labels[label]}
          required := {label | label := input.parameters.labels[_]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("you must provide labels: %v", [missing])
        }

````

</details>

Copy the Rego code snippet from the `rego` field into your `policy.rego` file:

```console
cat gatekeeper/demo/basic/templates/k8srequiredlabels_template.yaml | yq ".spec.targets[0].rego" > policy.rego
````

### Adapt Rego Code for Kubewarden

You need to make sure the `package` name used inside of the Rego code is `policy`.
This is the value expected in many places by the Kubewarden Gatekeeper template.

If you don't change it, you will have errors when building the policy and running its end-to-end tests.

For example, the demo policy we're converting is defined inside of the `k8srequiredlabels` package, this value must be changed to be `policy`.

This is how the contents of the `policy.rego` file have to be:

```rego
package policy

violation[{"msg": msg, "details": {"missing_labels": missing}}] {
provided := {label | input.review.object.metadata.labels[label]}
required := {label | label := input.parameters.labels[_]}
missing := required - provided
count(missing) > 0
msg := sprintf("you must provide labels: %v", [missing])
}
```

Attempting to build the code after this change might reveal new compilation errors:

```console
opa build -t wasm -e policy/violation -o bundle.tar.gz policy.rego
error: load error: 2 errors occurred during loading:
policy.rego:3: rego_parse_error: `if` keyword is required before rule body
policy.rego:3: rego_parse_error: `contains` keyword is required for partial set rules
make: *** [Makefile:4: policy.wasm] Error 1
```

The policy author must fix these errors to allow the `opa` CLI to build the
code successfully. The specific changes may vary depending on the `opa` version
and the original policy code. For this example, as we are migrationg a rego
policy previous the OPA v1, we need to update the code to be v1 complaint.The
final `policy.rego` code looks like this:

```rego
package policy

violation contains {"msg": msg, "details": {"missing_labels": missing}} if {
  provided := {label | input.review.object.metadata.labels[label]}
  required := {label | label := input.parameters.labels[_]}
  missing := required - provided
  count(missing) > 0
  msg = sprintf("you must provide labels: %v", [missing])
}
```

After you adjust the code, build the policy:

```console
$ make policy.wasm
opa build -t wasm -e policy/violation -o bundle.tar.gz policy.rego
tar xvf bundle.tar.gz /policy.wasm
tar: Removing leading `/' from member names
/policy.wasm
rm bundle.tar.gz
touch policy.wasm # opa creates the bundle with unix epoch timestamp, fix it
```

See more information on how to build Gatekeeper policies from our
[tutorial](docs/tutorials/writing-policies/rego/gatekeeper/03-build-and-run.md)

### Rego Policy code and OPA v1.0.0 Compatibility

With the release of OPA (Open Policy Agent) v1.0.0 in December 2024, a
potentially breaking change was introduced regarding Rego policy syntax.

Previously, if for all rule definitions and contains for multi-value rules were
optional; now, they are mandatory. This change affects most older policies.

Here's a summary of what you need to know:

- OPA v1.0.0 Syntax: OPA v1.0.0 mandates the use of if for all rule definitions
  and contains for multi-value rules. Policies not adhering to this syntax will
  break.
- Backward Compatibility: If you need to build older policies that do not use
  the new v1.0.0 syntax, you must provide the --v0-compatible flag to the opa
  build command.
- Gatekeeper Integration: Gatekeeper updated its OPA dependency to v1.0.0 in
  its v3.19.0 release.
- Rego Version in Gatekeeper Templates: Gatekeeper assumes v0 syntax is used
  unless the template explicitly specifies version: "v1" within the source field
  under code.engine: Rego.
- For example, to explicitly use Rego v1 syntax in a Gatekeeper template:

```yaml
targets:
  - target: admission.k8s.gatekeeper.sh
    code:
      - engine: Rego
        source:
          version: "v1"
          rego: |
            # <v1-rego-code>
```

What this means for you:

- If your Rego policy template does NOT specify a version (or implies v0): You
  must either use the `--v0-compatible` flag with the `opa build` command defined
  in the `Makefile` or update your policy to the new v1.0.0 syntax.
- If your Rego policy template explicitly specifies version: "v1": You must use
  a recent version of OPA (v1.0.0 or later), and no special build flags are
  required for the opa build command.

## Step 3: Update and Run Tests

While highly recommended, policy authors might skip creating tests for the
initial version of a policy. If this applies to you, you'll need to disable the
Makefile targets used to run tests. You can't remove these targets entirely, as
the default CI jobs expect them to be defined. Instead, you should replace the
commands that call `opa` and `bats` with a "no-op" operation. For example, you can
use an `echo` command to print an explanation for why the tests aren't being run.

The Kubewarden Gatekeeper template includes both Rego unit tests and end-to-end
(e2e) tests using Bats and `kwctl`. If you plan to include tests, both sets will
need to be adapted for your policy.

If your Gatekeeper policy already has Rego tests, you can copy them into the
`policy_test.rego` file. These will then run automatically when you execute the
`make test` command.

:::warning
Keep in mind that any Rego tests you write in `policy_test.rego` are subject to
the same compatibility issues detailed in the [Rego Policy code and OPA v1.0.0
Compatibility](#rego-policy-code-and-opa-v100-compatibility) section.
:::

The policy we are migrating in this guide does not have tests, we need to add
them by ourselves. Therefore, we'll update the `policy_test.rego` test file
with some basic tests:

```rego
package policy

review_required_labels := {
	"parameters": {"labels": ["test"]},
	"review": {"object": {"metadata": {"labels": {"test": "value"}}}},
}

review_missing_labels := {
	"parameters": {"labels": ["test"]},
	"review": {"object": {"metadata": {"labels": {"other": "value"}}}},
}

test_accept if {
	r = review_required_labels
	res = violation with input as r
	count(res) = 0
}

test_reject if {
	r = review_missing_labels
	res = violation with input as r
	count(res) = 1
}
```

Now, running `make test` should validate your policy:

```
$ make policy.wasm test
opa build -t wasm -e policy/violation -o bundle.tar.gz policy.rego
tar xvf bundle.tar.gz /policy.wasm
tar: Removing leading `/' from member names
/policy.wasm
rm bundle.tar.gz
touch policy.wasm # opa creates the bundle with unix epoch timestamp, fix it
opa test *.rego
PASS: 2/2
```

Next, update the e2e tests file (`e2e.bats`):

```
#!/usr/bin/env bats

@test "accept because required label is present" {
  run kwctl run -e gatekeeper annotated-policy.wasm --settings-path test_data/settings.json --request-path test_data/accept_deploy_request.json

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # request accepted
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*true') -ne 0 ]
}

@test "reject because required label is missing" {
run kwctl run -e gatekeeper annotated-policy.wasm --settings-path test_data/settings.json --request-path test_data/reject_deploy_request.json

  # this prints the output when one the checks below fails
  echo "output = ${output}"

  # request rejected
  [ "$status" -eq 0 ]
  [ $(expr "$output" : '.*allowed.*false') -ne 0 ]
  [ $(expr "$output" : '.*message.*you must provide labels: \[test\]') -ne 0 ]
}
```

You'll need to create the `test_data/settings.json` and
`test_data/accept_deploy_request.json` / `test_data/reject_deploy_request.json`
files to support these tests. For example:

<details>
<summary>test_data/settings.json</summary>

```json
{
  "labels": ["test"]
}
```

</details>

<details>
<summary>test_data/accept_deploy_request.json</summary>

```json
{
  "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",
  "kind": {
    "group": "apps",
    "version": "v1",
    "kind": "Deployment"
  },
  "resource": {
    "group": "apps",
    "version": "v1",
    "resource": "deployments"
  },
  "requestKind": {
    "group": "apps",
    "version": "v1",
    "kind": "Deployment"
  },
  "requestResource": {
    "group": "apps",
    "version": "v1",
    "resource": "deployments"
  },
  "name": "sample-deployment",
  "namespace": "default",
  "operation": "CREATE",
  "userInfo": {
    "username": "system:serviceaccount:kube-system:replicaset-controller",
    "uid": "b06b5f63-63a9-11e8-8f3e-42010a800003",
    "groups": [
      "system:serviceaccounts",
      "system:serviceaccounts:kube-system",
      "system:authenticated"
    ]
  },
  "object": {
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "metadata": {
      "name": "sample-deployment",
      "namespace": "default",
      "labels": {
        "app": "sample-app",
        "test": "value"
      }
    },
    "spec": {
      "replicas": 3,
      "selector": {
        "matchLabels": {
          "app": "sample-app"
        }
      },
      "template": {
        "metadata": {
          "labels": {
            "app": "sample-app"
          }
        },
        "spec": {
          "containers": [
            {
              "name": "main-container",
              "image": "nginx:latest",
              "env": [
                {
                  "name": "ENV_VAR_1",
                  "value": "value1"
                },
                {
                  "name": "ENV_VAR_2",
                  "value": "value2"
                },
                {
                  "name": "ENV_VAR_3",
                  "value": "value3"
                },
                {
                  "name": "ENV_VAR_4",
                  "value": "value4"
                },
                {
                  "name": "ENV_VAR_5",
                  "value": "value5"
                }
              ]
            }
          ]
        }
      }
    }
  },
  "oldObject": null,
  "dryRun": false,
  "options": {
    "kind": "CreateOptions",
    "apiVersion": "meta.k8s.io/v1"
  }
}
```

</details>

<details>
<summary>test_data/reject_deploy_request.json</summary>

```json
{
  "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",
  "kind": {
    "group": "apps",
    "version": "v1",
    "kind": "Deployment"
  },
  "resource": {
    "group": "apps",
    "version": "v1",
    "resource": "deployments"
  },
  "requestKind": {
    "group": "apps",
    "version": "v1",
    "kind": "Deployment"
  },
  "requestResource": {
    "group": "apps",
    "version": "v1",
    "resource": "deployments"
  },
  "name": "sample-deployment",
  "namespace": "default",
  "operation": "CREATE",
  "userInfo": {
    "username": "system:serviceaccount:kube-system:replicaset-controller",
    "uid": "b06b5f63-63a9-11e8-8f3e-42010a800003",
    "groups": [
      "system:serviceaccounts",
      "system:serviceaccounts:kube-system",
      "system:authenticated"
    ]
  },
  "object": {
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "metadata": {
      "name": "sample-deployment",
      "namespace": "default",
      "labels": {
        "app": "sample-app"
      }
    },
    "spec": {
      "replicas": 3,
      "selector": {
        "matchLabels": {
          "app": "sample-app"
        }
      },
      "template": {
        "metadata": {
          "labels": {
            "app": "sample-app"
          }
        },
        "spec": {
          "containers": [
            {
              "name": "main-container",
              "image": "nginx:latest",
              "env": [
                {
                  "name": "ENV_VAR_1",
                  "value": "value1"
                },
                {
                  "name": "ENV_VAR_2",
                  "value": "value2"
                },
                {
                  "name": "ENV_VAR_3",
                  "value": "value3"
                },
                {
                  "name": "ENV_VAR_4",
                  "value": "value4"
                },
                {
                  "name": "ENV_VAR_5",
                  "value": "value5"
                }
              ]
            }
          ]
        }
      }
    }
  },
  "oldObject": null,
  "dryRun": false,
  "options": {
    "kind": "CreateOptions",
    "apiVersion": "meta.k8s.io/v1"
  }
}
```

</details>

Check if the e2e tests are passing:

```console
$ make e2e-tests
bats e2e.bats
e2e.bats
  ✓ accept because required label is present
  ✓ reject because required label is missing
```

:::important Important Note on Policy Parameters
The policy parameters (e.g., labels in
this example) originate from the policy settings. This allows you to deploy
multiple instances of the same policy with different parameters/settings,
similar to how Constraints function in Gatekeeper.
:::

## Step 4: Prepare `metadata.yml` for Distribution

Now that you have a functional policy, prepare the `metadata.yml` file for
distribution. This file defines annotations with the policy description,
author, license, and other essential information. Crucially, it defines the
`rules` that specify which resources and verbs the policy can validate. This
information drives the `kwctl scaffold` command to generate the manifest for
deploying the policy in your cluster.

Gatekeeper's `Constraints` CRDs, which are instances of policies defined in
`ConstraintTemplates`, specify which resources a policy instance evaluates.
Therefore, if you have existing `Constraints` that apply a `ConstraintTemplat`,
they offer a good reference for the resources you should define in your
`metadata.yml` file. For instance, in the Gatekeeper example used earlier, the
`K8sRequiredLabels` `Constraint` created from the `k8srequiredlabels`
`ConstraintTemplate` applies to `Namespaces`:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta
kind: K8sRequiredLabels
metadata:
  name: ns-must-have-gk
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Namespace"]
  parameters:
    labels: ["gatekeeper"]
```

Based on this, update the `rules` section of your `metadata.yml` to include a new
`rule` for validating `namespaces` during `CREATE` and `UPDATE` operations:

```yaml
rules:
  - apiGroups: ["apps"]
    apiVersions: ["v1"]
    resources: ["deployments"]
    operations: ["CREATE", "UPDATE"]
  - apiGroups: [""]
    apiVersions: ["v1"]
    resources: ["namespaces"]
    operations: ["CREATE", "UPDATE"]
mutating: false
contextAware: false
executionMode: gatekeeper
# Consider the policy for the background audit scans. Default is true. Note the
# intrinsic limitations of the background audit feature on docs.kubewarden.io;
# If your policy hits any limitations, set to false for the audit feature to
# skip this policy and not generate false positives.
backgroundAudit: true
annotations:
  # artifacthub specific:
  io.artifacthub.displayName: Policy Name
  io.artifacthub.resources: Pod
  io.artifacthub.keywords: pod, cool policy, kubewarden
  io.kubewarden.policy.ociUrl: ghcr.io/yourorg/policies/policy-name # must match release workflow oci-target
  # kubewarden specific:
  io.kubewarden.policy.title: policy-name
  io.kubewarden.policy.version: 0.0.1-unreleased
  io.kubewarden.policy.description: Short description
  io.kubewarden.policy.author: "Author name <author-email@example.com>"
  io.kubewarden.policy.url: https://github.com/yourorg/policy-name
  io.kubewarden.policy.source: https://github.com/yourorg/policy-name
  io.kubewarden.policy.license: Apache-2.0
  # The next two annotations are used in the policy report generated by the
  # Audit scanner. Severity indicates policy check result criticality and
  # Category indicates policy category. See more here at docs.kubewarden.io
  io.kubewarden.policy.severity: medium # one of info, low, medium, high, critical. See docs.
  io.kubewarden.policy.category: Resource validation
```

Now, your policy is ready to be distributed and deployed. Refer to the
[Publishing the
policy](docs/tutorials/writing-policies/rego/gatekeeper/04-distribute.md#pushing-the-policy)
section from our tutorial to learn how to push it to a remote registry.

You can scaffold the policy manifest using `kwctl`:

```console
$ kwctl scaffold manifest --type ClusterAdmissionPolicy annotated-policy.wasm
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  annotations:
    io.kubewarden.policy.category: Resource validation
    io.kubewarden.policy.severity: medium
  name: policy-name
spec:
  module: file:///home/jvanz/SUSE/mygatekeeperpolicy/annotated-policy.wasm
  settings: {}
  rules:
  - apiGroups:
    - apps
    apiVersions:
    - v1
    resources:
    - deployments
    operations:
    - CREATE
    - UPDATE
  - apiGroups:
    - ''
    apiVersions:
    - v1
    resources:
    - namespaces
    operations:
    - CREATE
    - UPDATE
  mutating: false
```

**Define Policy Settings**

Note that this policy has parameters, which Gatekeeper defines within the
`Constraint`. You need to update the `settings` section in the generated Kubewarden
policy manifest to include these required parameters. In the following example,
beyond defining the settings, let's test the policy from OCI registry:

```yaml
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  annotations:
    io.kubewarden.policy.category: Resource validation
    io.kubewarden.policy.severity: medium
  name: policy-name
spec:
  module: registry://ghcr.io/jvanz/policies/mygatekeeperpolicy:latest
  settings:
    labels:
      - "gatekeeper"
  rules:
    - apiGroups:
        - apps
      apiVersions:
        - v1
      resources:
        - deployments
      operations:
        - CREATE
        - UPDATE
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - namespaces
      operations:
        - CREATE
        - UPDATE
  mutating: false
```

Try to deploy a namespace missing the required `gatekeeper` label:

```console
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: your-namespace-name
  labels:
    purpose: demo
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-policy-name.kubewarden.admission" denied the request: you must provide labels: [gatekeeper]
```

And another namespace with the required label:

```console
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: your-namespace-name
  labels:
    purpose: demo
    gatekeeper: test
EOF

namespace/your-namespace-name created
```
