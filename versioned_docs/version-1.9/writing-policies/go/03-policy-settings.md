---
sidebar_label: "Define Policy Settings"
title: ""
---

# Defining policy settings

As a first step we will define the structure that holds the policy settings.

We will do that by adding this code inside of the `settings.go` file:

```go
import (
	"encoding/json"
	"fmt"
	"regexp"

	mapset "github.com/deckarep/golang-set/v2"
	kubewarden "github.com/kubewarden/policy-sdk-go"
	kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"
)

type Settings struct {
	DeniedLabels      mapset.Set[string]        `json:"denied_labels"`
	ConstrainedLabels map[string]*RegularExpression `json:"constrained_labels"`
}

type RegularExpression struct {
	*regexp.Regexp
}
```

As you can see we're using the `regexp` package to handle regular expression objects and
we use the [`mapset.Set`](https://github.com/deckarep/golang-set) type to store
the list of denied labels.

Since `regexp.Regexp` doesn't handle deserialization, we need to define a custom type to handle marshaling and unmarshalling of regular expressions:

```go
// UnmarshalText satisfies the encoding.TextMarshaler interface,
// also used by json.Unmarshal.
func (r *RegularExpression) UnmarshalText(text []byte) error {
	nativeRegExp, err := regexp.Compile(string(text))
	if err != nil {
		return err
	}
	r.Regexp = nativeRegExp
	return nil
}

// MarshalText satisfies the encoding.TextMarshaler interface,
// also used by json.Marshal.
func (r *RegularExpression) MarshalText() ([]byte, error) {
	if r.Regexp != nil {
		return []byte(r.Regexp.String()), nil
	}

	return nil, nil
}
```

Also, we define the `UnmarshalJSON` method to handle the deserialization of the
`Settings` struct:

```go
func (s *Settings) UnmarshalJSON(data []byte) error {
	rawSettings := struct {
		DeniedLabels      []string          `json:"denied_labels"`
		ConstrainedLabels map[string]*RegularExpression `json:"constrained_labels"`
	}{}

	err := json.Unmarshal(data, &rawSettings)
	if err != nil {
		return err
	}

	s.DeniedLabels = mapset.NewThreadUnsafeSet[string](rawSettings.DeniedLabels...)
	s.ConstrainedLabels = rawSettings.ConstrainedLabels

	return nil
}
```

## Building `Settings` instances

A Kubewarden policy exposes two different functions that receive the
policy settings as input:

- `validate`: This is the function that is invoked every time some Kubernetes
  object has to be validated by the policy. The settings are received as part
  of the [`ValidationRequest`](https://pkg.go.dev/github.com/kubewarden/policy-sdk-go@v0.2.1/protocol#ValidationRequest)
  object
- `validate_settings`: This function is called only when the policy is first
  loaded by Kubewarden. The function receives the policy settings as input and
  ensures their validity.

We will create a helper function that creates a `Settings` object starting
from the JSON payload:

```go
func NewSettingsFromValidationReq(validationReq *kubewarden_protocol.ValidationRequest) (Settings, error) {
	settings := Settings{}
	err := json.Unmarshal(validationReq.Settings, &settings)
	if err != nil {
		return Settings{}, err
	}

	return settings, nil
}
```

:::note
All the `mapset.Set` objects are deliberately created using
their [thread-unsafe variant](https://pkg.go.dev/github.com/deckarep/golang-set?utm_source=godoc#NewThreadUnsafeSet).
The WebAssembly code is executed in a single thread, hence there are no
concurrency issues.

Moreover, the WebAssembly standard doesn't cover
threads yet. See [the official proposal](https://github.com/WebAssembly/threads)
for more details.
:::

## Implementing `Settings` validation

All Kubewarden policies have to implement
[settings validation](/writing-policies/index.md#the-validate_settings-entry-point).

This can be easily done by adding a `Valid` method to the `Settings` instances:

```go
func (s *Settings) Valid() (bool, error) {
	constrainedLabels := mapset.NewThreadUnsafeSet[string]()

	for label := range s.ConstrainedLabels {
		constrainedLabels.Add(label)
	}

	constrainedAndDenied := constrainedLabels.Intersect(s.DeniedLabels)
	if constrainedAndDenied.Cardinality() != 0 {
		return false,
			fmt.Errorf("These labels cannot be constrained and denied at the same time: %v", constrainedAndDenied)
	}

	return true, nil
}
```

The `Valid` method ensures no "denied" label is also part of the "constrained" map. The check
is simplified by the usage of the `Intersect` method provided by `mapset.Set`.

:::note
The `Valid` method is invoked against an already instantiated `Setting` object. That means
the validation of the regular expression provided by the user already took place
inside of the `Settings` unmarshaller.
:::

Finally, we have to ensure the `validateSettings` function that was automatically generated
is changed to look like that:

```go
func validateSettings(payload []byte) ([]byte, error) {
	settings := Settings{}
	err := json.Unmarshal(payload, &settings)
	if err != nil {
		return kubewarden.RejectSettings(
			kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))
	}

	valid, err := settings.Valid()
	if valid {
		return kubewarden.AcceptSettings()
	}

	return kubewarden.RejectSettings(
		kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))
}
```

As you can see, the function takes advantage of the helper functions provided
by [Kubewarden's SDK](https://github.com/kubewarden/policy-sdk-go).

## Testing the settings code

As always, it's important to have good test coverage of the code we write.
The code we generated comes with a series of unit tests defined inside of
the `settings_test.go` file.

We will have to change the contents of this file to reflect the new behaviour of the
`Settings` class.

We will start by including the Go packages we will use:

```go
import (
	"testing"

	"encoding/json"

	kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"
)
```

We will start by writing a unit test that ensures we can allocate a `Settings`
instance from a [`ValidationRequest`](/writing-policies/index.md#the-validationrequest-object)
object:

```go
func TestParseValidSettings(t *testing.T) {
	settingsJSON := []byte(`
		{
			"denied_labels": [ "foo", "bar" ],
			"constrained_labels": {
					"cost-center": "cc-\\d+"
			}
		}`)

	settings := Settings{}
	err := json.Unmarshal(settingsJSON, &settings)
	if err != nil {
		t.Errorf("Unexpected error %+v", err)
	}

	expected_denied_labels := []string{"foo", "bar"}
	for _, exp := range expected_denied_labels {
		if !settings.DeniedLabels.Contains(exp) {
			t.Errorf("Missing value %s", exp)
		}
	}

	re, found := settings.ConstrainedLabels["cost-center"]
	if !found {
		t.Error("Didn't find the expected constrained label")
	}

	expected_regexp := `cc-\d+`
	if re.String() != expected_regexp {
		t.Errorf("Expected regexp to be %v - got %v instead",
			expected_regexp, re.String())
	}
}
```

Next we will define a test that ensures a `Settings` instance
cannot be generated when the user provides a broken regular
expression:

```go
func TestParseSettingsWithInvalidRegexp(t *testing.T) {
	settingsJSON := []byte(`
		{
			"denied_labels": [ "foo", "bar" ],
			"constrained_labels": {
					"cost-center": "cc-[a+"
			}
		}`)

	err := json.Unmarshal(settingsJSON, &Settings{})
	if err == nil {
		t.Errorf("Didn'g get expected error")
	}
}
```

Next we will define a test that checks the behaviour
of the [`validate_settings`](/writing-policies/index.md#the-validate_settings-entry-point)
entry-point.

In this case, we actually look at the `SettingsValidationResponse` object
returned by our `validateSettings` function:

```go
func TestDetectValidSettings(t *testing.T) {
	settingsJSON := []byte(`
    {
        "denied_labels": [ "foo", "bar" ],
        "constrained_labels": {
            "cost-center": "cc-\\d+"
        }
    }`)

	responsePayload, err := validateSettings(settingsJSON)
	if err != nil {
		t.Errorf("Unexpected error %+v", err)
	}

	var response kubewarden_protocol.SettingsValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if !response.Valid {
		t.Errorf("Expected settings to be valid: %s", *response.Message)
	}
}
```

Finally, we write two more tests to ensure the `validateSettings` function
rejects invalid settings with the right messages:

```go
func TestDetectNotValidSettingsDueToBrokenRegexp(t *testing.T) {
	settingsJSON := []byte(`
    {
        "denied_labels": [ "foo", "bar" ],
        "constrained_labels": {
            "cost-center": "cc-[a+"
        }
    }
    `)

	responsePayload, err := validateSettings(settingsJSON)
	if err != nil {
		t.Errorf("Unexpected error %+v", err)
	}

	var response kubewarden_protocol.SettingsValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Valid {
		t.Error("Expected settings to not be valid")
	}

	if *response.Message != "Provided settings are not valid: error parsing regexp: missing closing ]: `[a+`" {
		t.Errorf("Unexpected validation error message: %s", *response.Message)
	}
}

func TestDetectNotValidSettingsDueToConflictingLabels(t *testing.T) {
	settingsJSON := []byte(`
    {
        "denied_labels": [ "foo", "bar", "cost-center" ],
        "constrained_labels": {
            "cost-center": ".*"
        }
    }`)
	responsePayload, err := validateSettings(settingsJSON)
	if err != nil {
		t.Errorf("Unexpected error %+v", err)
	}

	var response kubewarden_protocol.SettingsValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Valid {
		t.Error("Expected settings to not be valid")
	}

	if *response.Message != "Provided settings are not valid: These labels cannot be constrained and denied at the same time: Set{cost-center}" {
		t.Errorf("Unexpected validation error message: %s", *response.Message)
	}
}
```

Now we can run the test by using the following command:

```shell
go test -v settings.go settings_test.go
```

All the tests will pass with the following output:

```shell
=== RUN   TestParseValidSettings
--- PASS: TestParseValidSettings (0.00s)
=== RUN   TestParseSettingsWithInvalidRegexp
--- PASS: TestParseSettingsWithInvalidRegexp (0.00s)
=== RUN   TestDetectValidSettings
--- PASS: TestDetectValidSettings (0.00s)
=== RUN   TestDetectNotValidSettingsDueToBrokenRegexp
--- PASS: TestDetectNotValidSettingsDueToBrokenRegexp (0.00s)
=== RUN   TestDetectNotValidSettingsDueToConflictingLabels
--- PASS: TestDetectNotValidSettingsDueToConflictingLabels (0.00s)
PASS
ok  	command-line-arguments	0.002s
```

We can now move to implement the actual validation code.
