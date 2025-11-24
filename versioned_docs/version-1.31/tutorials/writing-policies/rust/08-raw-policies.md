---
sidebar_label: Raw policies
title: Raw policies
description: Kubewarden support for raw policies using Rust.
keywords: [kubewarden, kubernetes, raw policies, rust]
doc-persona: [kubewarden-policy-developer, kubewarden-integrator]
doc-type: [tutorial]
doc-topic: [writing-policies, rust, raw-policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rust/raw-policies"/>
</head>

Raw policies are policies that can evaluate arbitrary JSON documents.
For more information about raw policies, please refer to the [raw policies](../../../howtos/raw-policies.md) page.

## Examples

The following examples should look familiar if you completed the [validation](05-mutation-policy.md) page of this tutorial.

:::note
Remember to mark the policy as `raw` by using the `policyType` field in the `metadata.yml` configuration.
Please refer to the [metadata](../metadata.md) specification for more information.
:::

### Validation

Let's write a policy that accepts a request in the following format:

```json
{
  "request": {
    "user": "alice",
    "action": "delete",
    "resource": "products"
  }
}
```

and validates that:

- `user` is in the list of valid users
- `action` is in the list of valid actions
- `resource` is in the list of valid resources

Start by scaffolding the policy by using the [rust policy template](https://github.com/kubewarden/rust-policy-template).

First, we define the types that represent the payload of the request.
We will declare a custom `RawValidationRequest` type that contains the `Request` and the `Settings`,
instead of using the `ValidationRequest` type that is provided by the SDK:

```rust
/// RawValidationRequest represents the request that is sent to the validate function by the Policy Server.
#[derive(Deserialize)]
pub(crate) struct RawValidationRequest {
    pub(crate) request: Request,
    pub(crate) settings: Settings,
}

#[derive(Serialize, Deserialize)]
/// Request represents the payload of the request.
pub(crate) struct Request {
    pub(crate) user: String,
    pub(crate) resource: String,
    pub(crate) action: String,
}
```

Then we need to define the `Settings` type and implement the `Validatable` trait:

```rust
/// Settings represents the settings of the policy.
#[derive(Serialize, Deserialize, Default, Debug)]
#[serde(default, rename_all = "camelCase")]
pub(crate) struct Settings {
    pub(crate) valid_users: Vec<String>,
    pub(crate) valid_actions: Vec<String>,
    pub(crate) valid_resources: Vec<String>,
}

impl kubewarden::settings::Validatable for Settings {
    fn validate(&self) -> Result<(), String> {
        info!(LOG_DRAIN, "starting settings validation");

        if self.valid_users.is_empty() {
            return Err("validUsers cannot be empty".to_string());
        }

        if self.valid_actions.is_empty() {
            return Err("validActions cannot be empty".to_string());
        }

        if self.valid_resources.is_empty() {
            return Err("validResources cannot be empty".to_string());
        }

        Ok(())
    }
}
```

Finally, we define the `validate` function:

```rust
fn validate(payload: &[u8]) -> CallResult {
    let validation_request: RawValidationRequest =
        if let Ok(validation_request) = serde_json::from_slice(payload) {
            validation_request
        } else {
            return kubewarden::reject_request(
                Some("cannot unmarshal request".to_string()),
                None,
                None,
                None,
            );
        };

    info!(LOG_DRAIN, "starting validation");

    let request = validation_request.request;
    let settings = validation_request.settings;

    if settings.valid_users.contains(&request.user)
        && settings.valid_actions.contains(&request.action)
        && settings.valid_resources.contains(&request.resource)
    {
        info!(LOG_DRAIN, "accepting resource");
        kubewarden::accept_request()
    } else {
        kubewarden::reject_request(
            Some("this request is not accepted".to_string()),
            None,
            None,
            None,
        )
    }
}
```

### Mutation

Let's modify the previous example to mutate the request instead of rejecting it.
In this case, the settings will contain the `defaultUser`, `defaultAction` and `defaultRequest` that will be used to mutate the request if the user, the action or the resource is not valid.

We need to update the `Settings` type with the new fields:

```rust
/// Settings represents the settings of the policy.
#[derive(Serialize, Deserialize, Default, Debug)]
#[serde(default, rename_all = "camelCase")]
pub(crate) struct Settings {
    pub(crate) valid_users: Vec<String>,
    pub(crate) valid_actions: Vec<String>,
    pub(crate) valid_resources: Vec<String>,
    pub(crate) default_user: String,
    pub(crate) default_action: String,
    pub(crate) default_resource: String,
}

impl kubewarden::settings::Validatable for Settings {
    fn validate(&self) -> Result<(), String> {
        info!(LOG_DRAIN, "starting settings validation");

        if self.valid_users.is_empty() {
            return Err("validUsers cannot be empty".to_string());
        }

        if self.valid_actions.is_empty() {
            return Err("validActions cannot be empty".to_string());
        }

        if self.valid_resources.is_empty() {
            return Err("validResources cannot be empty".to_string());
        }

        if self.default_user.is_empty() {
            return Err("defaultUser cannot be empty".to_string());
        }

        if self.default_action.is_empty() {
            return Err("defaultAction cannot be empty".to_string());
        }

        if self.default_resource.is_empty() {
            return Err("defaultResource cannot be empty".to_string());
        }

        Ok(())
    }
}
```

and the `validate` function to introduce the mutation:

```rust
fn validate(payload: &[u8]) -> CallResult {
    let validation_request: RawValidationRequest =
        if let Ok(validation_request) = serde_json::from_slice(payload) {
            validation_request
        } else {
            return kubewarden::reject_request(
                Some("cannot unmarshal request".to_string()),
                None,
                None,
                None,
            );
        };

    info!(LOG_DRAIN, "starting validation");

    let request = validation_request.request;
    let settings = validation_request.settings;

    if settings.valid_users.contains(&request.user)
        && settings.valid_actions.contains(&request.action)
        && settings.valid_resources.contains(&request.resource)
    {
        info!(LOG_DRAIN, "accepting request");
        return kubewarden::accept_request();
    }

    info!(LOG_DRAIN, "mutating request");
    let mut request = request;

    if !settings.valid_users.contains(&request.user) {
        request.user = settings.default_user;
    }

    if !settings.valid_actions.contains(&request.action) {
        request.action = settings.default_action;
    }

    if !settings.valid_resources.contains(&request.resource) {
        request.resource = settings.default_resource;
    }

    let mutated_request = serde_json::to_value(request)?;
    kubewarden::mutate_request(mutated_request)
}
```
