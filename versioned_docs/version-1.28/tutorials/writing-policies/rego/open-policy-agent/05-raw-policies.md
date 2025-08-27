---
sidebar_label: Raw policies
title: Writing raw policies
description: Writing raw OPA policies for Kubewarden.
keywords: [kubewarden, kubernetes, raw policies, open policy agent, opa, rego]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, open-policy-agent, raw-policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/open-policy-agent/raw-policies"/>
</head>

Raw policies are policies that can evaluate arbitrary JSON documents.
For more information about raw policies, please refer to the
[raw policies](../../../../howtos/raw-policies.md) page.

## Example

The following examples should look familiar if you completed the
[validation](02-create-policy.md) page of this tutorial.

:::note
Remember to mark the policy as `raw`,
by using the `policyType` field in the `metadata.yml` configuration.
Please refer to the
[metadata](../../metadata.md)
specification for more information.
:::

### Validation

You're going to write a policy that accepts a request in the following format:

```json
{
  "request": {
    "user": "alice",
    "action": "read",
    "resource": "products"
  }
}
```

It validates that only the `admin` user can delete resources.

Start by scaffolding a policy by using the
[OPA policy template](https://github.com/kubewarden/opa-policy-template).

First you need to change the `policy.rego` file to look like this:

```rego
package validation

deny[msg] {
    input.request.action == "delete"
    input.request.user != "admin"
    msg := sprintf("user %v is not allowed to delete resources", [input.request.user])
}
```

The `utility/policy.rego` module needs modification to remove Kubernetes-specific code:

```rego
package policy

import data.validation

main = {
	"response": response,
}

# OPA policy responses need the uid field to be set.
# If the request doesn't contain a uid, set it to an empty string.
default uid = ""

uid = input.request.uid

response = {
	"uid": uid,
	"allowed": false,
	"status": {"message": reason},
} {
	reason = concat(", ", validation.deny)
	reason != ""
} else = {
	"uid": uid,
	"allowed": true,
} {
	true
}
```
