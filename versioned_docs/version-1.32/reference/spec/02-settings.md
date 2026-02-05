---
sidebar_label: Policy settings
title: Policy settings
description: Policy settings.
keywords: [kubewarden, kubernetes, policy specification, policy settings]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic: [writing-policies, specification, settings]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/settings"/>
</head>

Policy behavior isn't rigid, you can configure it by providing configuration
details to the policy at runtime. The policy author has the freedom to define
the structure of policy settings.

Kubewarden takes care of serializing the policy settings into JSON and provides
them to the policy each time it's invoked.

## Settings validation

Policies should validate the settings a user provides to check correctness.

Each policy registers a waPC function called `validate_settings` that validates
the policy settings.

The `validate_settings` function receives as input a JSON representation of the
settings provided by the user. This function validates them and returns as a
response a `SettingsValidationResponse` object.

The structure of the `SettingsValidationResponse` object is:

```yaml
{
  # mandatory
  "valid": <boolean>,

  # optional, ignored if accepted - recommended for rejections
  "message": <string>,
}
```

If the user provided settings are `valid`, `validate_settings` ignores the
`message` contents. Otherwise, `validate_settings` displays the `message`
contents.

:::note

Kubewarden's [policy-server](https://github.com/chimera-kube/policy-server)
validates all the policy settings provided by users at start time. The
policy-server exits immediately with an error if at least one of its policies
received wrong configuration parameters.

:::

## Example

As an example, consider the
[psp-capabilities](https://github.com/kubewarden/psp-capabilities) policy which
has the following configuration format:

```yaml
allowed_capabilities:
- CHOWN

required_drop_capabilities:
- NET_ADMIN

default_add_capabilities:
- KILL
```

The `validate_settings` function receives as input the following JSON
document:

```json
{
  "allowed_capabilities": [
    "CHOWN"
  ],
  "required_drop_capabilities": [
    "NET_ADMIN"
  ],
  "default_add_capabilities": [
    "KILL"
  ]
}
```

## Recap

Each policy must register a waPC function, `validate_settings`.
