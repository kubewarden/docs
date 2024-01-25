---
sidebar_label: "Policy Settings"
title: ""
---
# Policy settings

Policy behaviour is not set in stone, it can be configured by providing configuration
details to the policy at runtime. The policy author has full freedom to define
the structure of the policy settings.

Kubewarden takes care of serializing the policy settings into JSON and provide
them to the policy every time it is invoked.

## Settings validation

Some policies might want to validate the settings a user provides to ensure
they are correct.

Each policy must register a waPC function called `validate_settings` that
takes care of validating the policy settings.

The `validate_settings` function receives as input a JSON representation of
the settings provided by the user. The function validates them and returns
as a response a `SettingsValidationResponse` object.

The structure of the `SettingsValidationResponse` object is the following one:

```yaml
{
  # mandatory
  "valid": <boolean>,

  # optional, ignored if accepted - recommended for rejections
  "message": <string>,
}
```

If the user provided settings are `valid`, the contents of `message` are ignored.
Otherwise the contents of `message` are shown to the user.

:::note
Kubewarden's [policy-server](https://github.com/chimera-kube/policy-server)
validates all the policy settings provided by users at start time.
The policy-server exits immediately with an error if at least one of its
policies received wrong configuration parameters.
:::

## Example

Let's take as an example the [psp-capabilities](https://github.com/kubewarden/psp-capabilities)
policy which has the following configuration format:

```yaml
allowed_capabilities:
- CHOWN

required_drop_capabilities:
- NET_ADMIN

default_add_capabilities:
- KILL
```

The `validate_settings` function will receive as input the following JSON
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

# Recap

Each policy must register a waPC function called `validate_settings` that has
the following API:

