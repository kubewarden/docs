---
sidebar_label: Raw policies
title: Writing raw policies
description: Using Kubewarden for writing raw policies.
keywords: [kubewarden, kubernetes, raw policies]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, raw-policies]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/wasi/raw-policies"/>
</head>

Raw policies are policies that can evaluate arbitrary JSON documents.
For more information about raw policies, please refer to the [raw policies](../../../howtos/raw-policies.md) page.

## Examples

Please refer to [Introduction to WASI](01-intro-wasi.md) for an overview of the WASI execution mode.

:::note

You mark the policy as `raw` by using the `policyType` field in the `metadata.yml` configuration.
Please refer to the [metadata](../metadata.md) specification for more information.

:::

### Validation

As an example you can write a policy that accepts a request in the following format:

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

Start by scaffolding the policy by using the
[go WASI policy template](https://github.com/kubewarden/go-wasi-policy-template).

First, you need to define the types that represent the payload of the request.

You should declare a custom `RawValidationRequest` type containing the `Request` and the `Settings`, instead of using the `ValidationRequest` type provided by the `kw_sdk.go`:

```go
// RawValidationRequest represents the request that is sent to the validate function by the Policy Server.
type RawValidationRequest struct {
    Request Request `json:"request"`
    // Raw policies can have settings.
    Settings Settings `json:"settings"`
}

// Request represents the payload of the request.
type Request struct {
    User     string `json:"user"`
    Action   string `json:"action"`
    Resource string `json:"resource"`
}
```

Then you define the `Settings` type and the `validateSettings` function in the `settings.go` file:

```go
// Settings represents the settings of the policy.
type Settings struct {
    ValidUsers     []string `json:"validUsers"`
    ValidActions   []string `json:"validActions"`
    ValidResources []string `json:"validResources"`
}

func validateSettings(input []byte) []byte {
    var response SettingsValidationResponse

    settings := &Settings{}
    if err := json.Unmarshal(input, &settings); err != nil {
        response = RejectSettings(Message(fmt.Sprintf("cannot unmarshal settings: %v", err)))
    } else {
        response = validateCliSettings(settings)
    }

    responseBytes, err := json.Marshal(&response)
    if err != nil {
        log.Fatalf("can not marshal validation response: %v", err)
    }
    return responseBytes
}

func validateCliSettings(settings *Settings) SettingsValidationResponse {
    if len(settings.ValidUsers) == 0 {
        return RejectSettings(Message(
            "At least one valid user must be specified"))
    }

    if len(settings.ValidActions) == 0 {
        return RejectSettings(Message(
            "At least one valid action must be specified"))
    }

    if len(settings.ValidResources) == 0 {
        return RejectSettings(Message(
            "At least one valid resource must be specified"))
    }

    return AcceptSettings()
}
```

Finally, you update the validation logic in `validate.go`:

```go
func validate(input []byte) []byte {
    var validationRequest RawValidationRequest
    validationRequest.Settings = Settings{}
    decoder := json.NewDecoder(strings.NewReader(string(input)))
    decoder.DisallowUnknownFields()
    err := decoder.Decode(&validationRequest)
    if err != nil {
        return marshalValidationResponseOrFail(
            RejectRequest(
                Message(fmt.Sprintf("Error deserializing validation request: %v", err)),
                Code(400)))
    }

    return marshalValidationResponseOrFail(
        validateRequest(validationRequest.Settings, validationRequest.Request))
}

func marshalValidationResponseOrFail(response ValidationResponse) []byte {
    responseBytes, err := json.Marshal(&response)
    if err != nil {
        log.Fatalf("cannot marshal validation response: %v", err)
    }
    return responseBytes
}

func validateRequest(settings Settings, request Request) ValidationResponse {
    if slices.Contains(settings.ValidUsers, request.User) &&
        slices.Contains(settings.ValidActions, request.Action) &&
        slices.Contains(settings.ValidResources, request.Resource) {
        return AcceptRequest()
    }

    return RejectRequest(
        Message("The request cannot be accepted."),
        Code(403))
}
```

### Mutation

You can change the earlier example to mutate the request instead of rejecting it.

In this case, the settings should contain the `defaultUser`, `defaultAction` and `defaultRequest` to use to mutate the request if the user, the action, or the resource isn't valid.

You need to update the `Settings` type with the new fields:

```go
// Settings represents the settings of the policy.
type Settings struct {
    ValidUsers []string `json:"validUsers"`
    ValidActions []string `json:"validActions"`
    ValidResources []string `json:"validResources"`
    DefaultUser string `json:"defaultUser"`
    DefaultAction string `json:"defaultAction"`
    DefaultResource string `json:"defaultResource"`
}

func validateCliSettings(settings *Settings) SettingsValidationResponse {
    if len(settings.ValidUsers) == 0 {
        return RejectSettings(Message(
            "At least one valid user must be specified"))
    }

    if len(settings.ValidActions) == 0 {
        return RejectSettings(Message(
            "At least one valid action must be specified"))
    }

    if len(settings.ValidResources) == 0 {
        return RejectSettings(Message(
            "At least one valid resource must be specified"))
    }

    if settings.DefaultUser == "" {
        return RejectSettings(Message(
            "Default user must be specified"))
    }

    if settings.DefaultAction == "" {
        return RejectSettings(Message(
            "Default action must be specified"))
    }

    if settings.DefaultResource == "" {
        return RejectSettings(Message(
            "Default resource must be specified"))
    }

    return AcceptSettings()
}
```

You also need to update the `ValidationResponse` struct and the `MutateRequest` function in `kw_sdk.go` to remove the Kubernetes-specific types and use Kubewarden types instead:

```go
// ValidationResponse defines the response given when validating a request
type ValidationResponse struct {
    Accepted bool `json:"accepted"`
    // Optional - ignored if accepted
    Message *string `json:"message,omitempty"`
    // Optional - ignored if accepted
    Code *uint16 `json:"code,omitempty"`
    // Optional - used only by mutating policies
    MutatedObject *Request `json:"mutated_object,omitempty"`
}

// MutateRequest accepts the request. The given `mutatedObject` is how
// the evaluated object must look once accepted
func MutateRequest(mutatedObject *Request) ValidationResponse {
    return ValidationResponse{
        Accepted:      true,
        MutatedObject: mutatedObject,
    }
}
```

Now you can update the `validate` function to mutate the request if not valid:

```go
func validateRequest(settings Settings, request Request) ValidationResponse {
    if slices.Contains(settings.ValidUsers, request.User) &&
        slices.Contains(settings.ValidActions, request.Action) &&
        slices.Contains(settings.ValidResources, request.Resource) {
        return AcceptRequest()
    }

    if !slices.Contains(settings.ValidUsers, request.User) {
        request.User = settings.DefaultUser
    }

    if !slices.Contains(settings.ValidActions, request.Action) {
        request.Action = settings.DefaultAction
    }

    if !slices.Contains(settings.ValidResources, request.Resource) {
        request.Resource = settings.DefaultResource
    }

    return MutateRequest(&request)
}
```
