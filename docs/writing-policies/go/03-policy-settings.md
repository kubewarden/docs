---
sidebar_label: "Define Policy Settings"
title: ""
---

# Defining policy settings

As a first step we will define the structure that holds the policy settings.

We will do that by adding this code inside of the `settings.go` file:

```go
import (
	mapset "github.com/deckarep/golang-set"
	kubewarden "github.com/kubewarden/policy-sdk-go"
	kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"
	"github.com/mailru/easyjson"

	"fmt"
	"regexp"
)

type Settings struct {
	DeniedLabels      mapset.Set
	ConstrainedLabels map[string]*regexp.Regexp
}
```

As you can see we're using the `regexp` package to handle regular expression objects and
we use the [`mapset.Set`](https://github.com/deckarep/golang-set) type to store
the list of denied labels.

The `Settings` struct has no JSON attributes. That's because none of its
attributes can be deserialized from JSON:

  * `regexp.Regexp`: doesn't handle deserialization, not even with the official Go
    compiler
  * `mapset.Set`: given it uses `interface`s internally, this cannot be handled by
    TinyGo due to its lack of reflection. Even `easyjson` cannot help here.

Due to this, we are going to use a different Go type to deserialize the input
data. We will call this Go type: `BasicSettings`.


## Defining the `BasicSettings` type

The default policy defines its own `Settings` type inside of the `types.go` file.
Starting from this file, we then leverage the `easyjson` cli tool to create the
serialization and deserialization code.

Open the `types.go` file, remove the `Settings` type and define a new `BasicSettings`
one:

```go
type BasicSettings struct {
	DeniedLabels      []string          `json:"denied_labels"`
	ConstrainedLabels map[string]string `json:"constrained_labels"`
}
```
Next, let's regenerate the `types_easyjson.go` file. Usually there's no need to
do that manually because `make` handles that automatically. However, right now
we cannot rely on `make` because we're in the process of making invasive changes that have broken
the regular build process. Post completion of these changes, we should be able to leverage `make` once again.

To regenerate the `types_easyjson.go` file execute the following command:

```shell
make types_easyjson.go
```

:::note
This requires docker to be running on your machine.
:::

## Building `Settings` instances

A Kubewarden policy exposes two different functions that receive the
policy settings as input:

* `validate`: This is the function that is invoked every time some Kubernetes
  object has to be validated by the policy. The settings are received as part
  of the [`ValidationRequest`](https://pkg.go.dev/github.com/kubewarden/policy-sdk-go@v0.2.1/protocol#ValidationRequest)
  object
* `validate_settings`: This function is called only when the policy is first
  loaded by Kubewarden. The function receives the policy settings as input and
  ensures their validity.

We will create two helper functions that create a `Settings` object starting
from the JSON payload:

```go
func NewSettingsFromValidationReq(validationReq *kubewarden_protocol.ValidationRequest) (Settings, error) {
	return newSettings(validationReq.Settings)
}

func newSettings(settingsJson []byte) (Settings, error) {
	basicSettings := BasicSettings{}
	err := easyjson.Unmarshal(settingsJson, &basicSettings)
	if err != nil {
		return Settings{}, err
	}

	deniedLabels := mapset.NewThreadUnsafeSet()
	for _, label := range basicSettings.DeniedLabels {
		deniedLabels.Add(label)
	}

	constrainedLabels := make(map[string]*regexp.Regexp)
	for name, expr := range basicSettings.ConstrainedLabels {
		reg, err := regexp.Compile(expr)
		if err != nil {
			return Settings{}, fmt.Errorf("Cannot compile regexp %s: %v", expr, err)
		}
		constrainedLabels[name] = reg
	}

	return Settings{
		DeniedLabels:      deniedLabels,
		ConstrainedLabels: constrainedLabels,
	}, nil
}
```

As you can see, the heavy lifting of the setting is done inside of the `newSettings` function.

:::note
All the `mapset.Set` objects are deliberately created using
their [thread-unsafe variant](https://pkg.go.dev/github.com/deckarep/golang-set?utm_source=godoc#NewThreadUnsafeSet).
The WebAssembly code is executed in single thread, hence there are no
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
	constrainedLabels := mapset.NewThreadUnsafeSet()

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
inside of the `Settings` constructor.
:::

Finally, we have to ensure the `validateSettings` function that was automatically generated
is changed to look like that:

```go
func validateSettings(payload []byte) ([]byte, error) {
	settings, err := newSettings(payload)
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
The code we generated comes with a series of unit test defined inside of
the `settings_test.go` file.

We will have to change the contents of this file to reflect the new behaviour of the
`Settings` class.

We will start by including the Go packages we will use:

```go
import (
	kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"
	"github.com/mailru/easyjson"

	"testing"
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

	settings, err := newSettings(settingsJSON)
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

	_, err := newSettings(settingsJSON)
	if err == nil {
		t.Errorf("Didn'g get expected error")
	}
}
```

Next we will define a test that checks the behaviour
of the [`validate_settings`](/writing-policies/index.md#the-validate_settings-entry-point)
entry-point.

In this case we actually look at the `SettingsValidationResponse` object
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
	if err := easyjson.Unmarshal(responsePayload, &response); err != nil {
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
	if err := easyjson.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Valid {
		t.Error("Expected settings to not be valid")
	}

	if *response.Message != "Provided settings are not valid: Cannot compile regexp cc-[a+: error parsing regexp: missing closing ]: `[a+`" {
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
	if err := easyjson.Unmarshal(responsePayload, &response); err != nil {
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
go test -v settings.go types.go types_easyjson.go settings_test.go
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
