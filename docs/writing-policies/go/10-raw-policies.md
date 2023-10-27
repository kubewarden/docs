---
sidebar_label: "Raw policies"
title: "Raw policies"
---

# Writing raw policies

Raw policies are policies that can evaluate arbitrary JSON documents.
For more information about raw policies, please refer to the [raw policies](../../howtos/raw-policies.md) page.

## Examples

The following examples should look familiar if you completed the [validation](04-validation.md) page of this tutorial.

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

Start by scaffolding the policy by using the [go policy template](https://github.com/kubewarden/go-policy-template).

First, we define the types that represent the payload of the request.

We will declare a custom `RawValidationRequest` type that contains the `Request` and the `Settings`,
instead of using the `ValidationRequest` type that is provided by the SDK:

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

Then we need to define the `Settings` type and the `validateSettings` function:

```go
// Settings represents the settings of the policy.
type Settings struct {
	ValidUsers     []string `json:"validUsers"`
	ValidActions   []string `json:"validActions"`
	ValidResources []string `json:"validResources"`
}

// Valid returns true if the settings are valid.
func (s *Settings) Valid() (bool, error) {
	if len(s.ValidUsers) == 0 {
		return false, fmt.Errorf("validUsers cannot be empty")
	}

	if len(s.ValidActions) == 0 {
		return false, fmt.Errorf("validActions cannot be empty")
	}

	if len(s.ValidResources) == 0 {
		return false, fmt.Errorf("validResources cannot be empty")
	}

	return true, nil
}

// validateSettings validates the settings.
func validateSettings(payload []byte) ([]byte, error) {
	logger.Info("validating settings")

	settings := Settings{}
	err := json.Unmarshal(payload, &settings)
	if err != nil {
		return kubewarden.RejectSettings(kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))
	}

	valid, err := settings.Valid()
	if err != nil {
		return kubewarden.RejectSettings(kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))
	}
	if valid {
		return kubewarden.AcceptSettings()
	}

	logger.Warn("rejecting settings")
	return kubewarden.RejectSettings(kubewarden.Message("Provided settings are not valid"))
}
```

Finally, we define the `validate` function:

```go
func validate(payload []byte) ([]byte, error) {
	// Unmarshal the payload into a RawValidationRequest instance
	validationRequest := RawValidationRequest{}
	err := json.Unmarshal(payload, &validationRequest)
	if err != nil {
		// If the payload is not valid, reject the request
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.Code(400))
	}

	request := validationRequest.Request
	settings := validationRequest.Settings

	// Validate the payload
	if slices.Contains(settings.ValidUsers, request.User) &&
		slices.Contains(settings.ValidActions, request.Action) &&
		slices.Contains(settings.ValidResources, request.Resource) {
		return kubewarden.AcceptRequest()
	}

	return kubewarden.RejectRequest(
		kubewarden.Message("The request cannot be accepted."),
		kubewarden.Code(400))
}
```

### Mutation

Let's modify the previous example to mutate the request instead of rejecting it.
In this case, the settings will contain the `defaultUser`, `defaultAction` and `defaultRequest` that will be used to mutate the request if the user, the action or the resource is not valid.

We need to update the `Settings` type with the new fields:

```go
// Settings defines the settings of the policy.
type Settings struct {
	ValidUsers      []string `json:"validUsers"`
	ValidActions    []string `json:"validActions"`
	ValidResources  []string `json:"validResources"`
	DefaultUser     string   `json:"defaultUser"`
	DefaultAction   string   `json:"defaultAction"`
	DefaultResource string   `json:"defaultResource"`
}

// Valid returns true if the settings are valid.
func (s *Settings) Valid() (bool, error) {
	if len(s.ValidUsers) == 0 {
		return false, fmt.Errorf("validUsers cannot be empty")
	}

	if len(s.ValidActions) == 0 {
		return false, fmt.Errorf("validActions cannot be empty")
	}

	if len(s.ValidResources) == 0 {
		return false, fmt.Errorf("validResources cannot be empty")
	}

	if s.DefaultUser == "" {
		return false, fmt.Errorf("defaultUser cannot be empty")
	}

	if s.DefaultAction == "" {
		return false, fmt.Errorf("defaultUser cannot be empty")
	}

	if s.DefaultResource == "" {
		return false, fmt.Errorf("defaultResource cannot be empty")
	}

	return true, nil
}
```

and the `validate` function to introduce the mutation:

```go
func validate(payload []byte) ([]byte, error) {
	// Unmarshal the payload into a RawValidationRequest instance
	validationRequest := RawValidationRequest{}
	err := json.Unmarshal(payload, &validationRequest)
	if err != nil {
		// If the payload is not valid, reject the request
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.Code(400))
	}

	request := validationRequest.Request
	settings := validationRequest.Settings

	logger.Info("validating request")

	// Accept the request without mutating it if it is valid
	if slices.Contains(settings.ValidUsers, request.User) &&
		slices.Contains(settings.ValidActions, request.Action) &&
		slices.Contains(settings.ValidResources, request.Resource) {
		return kubewarden.AcceptRequest()
	}

	logger.Info("mutating request")

	// Mutate the request if it is not valid
	if !slices.Contains(settings.ValidUsers, request.User) {
		request.User = settings.DefaultUser
	}

	if !slices.Contains(settings.ValidActions, request.Action) {
		request.Action = settings.DefaultAction
	}

	if !slices.Contains(settings.ValidResources, request.Resource) {
		request.Resource = settings.DefaultResource
	}

	return kubewarden.MutateRequest(request)
}
```
