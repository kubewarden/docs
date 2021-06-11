# Defining policy settings

As a first step we will define the structure that holds the policy settings.

We will do that by adding this code inside of the `settings.go` file:

```go
import (
	"github.com/deckarep/golang-set"
	"github.com/kubewarden/gjson"
	kubewarden "github.com/kubewarden/policy-sdk-go"

	"fmt"
	"regexp"
)

type Settings struct {
	DeniedLabels      mapset.Set                    `json:"denied_labels"`
	ConstrainedLabels map[string]*RegularExpression `json:"constrained_labels"`
}
```

As you can see we're using the `regexp` package to handle regular expression objects, plus
we use the `mapset.Set` structure to store the list of denied labels.

The `Settings` struct has json attributes, we will use them later when writing
our unit tests. The unit tests are going to be executed using Go official compiler, hence
we will be able to leverage the `encoding/json` package.

The `Settings` class is not using the official `regexp.RegExp` object to
represent regular expressions. That's because the `regexp.RegExp` struct doesn't
handle serialization and deserialization to JSON.

This is the implementation of the `RegularExpression` struct:

```go
// A wrapper around the standard regexp.Regexp struct
// that implements marshalling and unmarshalling
type RegularExpression struct {
	*regexp.Regexp
}

// Convenience method to build a regular expression
func CompileRegularExpression(expr string) (*RegularExpression, error) {
	nativeRegExp, err := regexp.Compile(expr)
	if err != nil {
		return nil, err
	}
	return &RegularExpression{nativeRegExp}, nil
}

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

## Building `Settings` instances

At runtime we can't rely on the automatic struct marshalling and unmarshalling
provided by the `encoding/json` package due to TinyGo current limitations.
Because of that we will create two initialization helpers:

  * `NewSettingsFromValidationReq`: this is used when building a `Settings`
    instance starting from a [`ValidationRequest`](/writing-policies/index.html#the-validationrequest-object)
    object
  * `NewSettingsFromValidateSettingsPayload`: this is used when building a
    `Settings` instance inside of the [`validate_settings`](/writing-policies/index.html#the-validate_settings-entry-point) entry point. This entry point receives the "naked" Settings JSON
    dictionary

This is the implementation of these functions:

```go
// Builds a new Settings instance starting from a validation
// request payload:
// {
//    "request": ...,
//    "settings": {
//       "denied_labels": [...],
//       "constrained_labels": { ... }
//    }
// }
func NewSettingsFromValidationReq(payload []byte) (Settings, error) {
	// Note well: we don't validate the input JSON now, this has
	// already done inside of the `validate` function

	return newSettings(
		payload,
		"settings.denied_labels",
		"settings.constrained_labels")
}

// Builds a new Settings instance starting from a Settings
// payload:
// {
//    "denied_names": [ ... ],
//    "constrained_labels": { ... }
// }
func NewSettingsFromValidateSettingsPayload(payload []byte) (Settings, error) {
	if !gjson.ValidBytes(payload) {
		return Settings{}, fmt.Errorf("denied JSON payload")
	}

	return newSettings(
		payload,
		"denied_labels",
		"constrained_labels")
}
```

The heavy lifting of the setting is done inside of the `newSettings` function, which
is invoked by both `NewSettingsFromValidateSettingsPayload` and `NewSettingsFromValidationReq`.

The function takes the raw JSON payload and a list of [gjson](https://github.com/tidwall/gjson)
queries. These queries are used to extract the values from the JSON data and
build the actual object:


```go
func newSettings(payload []byte, paths ...string) (Settings, error) {
	if len(paths) != 2 {
		return Settings{}, fmt.Errorf("wrong number of json paths")
	}

	data := gjson.GetManyBytes(payload, paths...)

	deniedLabels := mapset.NewThreadUnsafeSet()
	data[0].ForEach(func(_, entry gjson.Result) bool {
		deniedLabels.Add(entry.String())
		return true
	})

	constrainedLabels := make(map[string]*RegularExpression)
	var err error
	data[1].ForEach(func(key, value gjson.Result) bool {
		var regExp *RegularExpression
		regExp, err = CompileRegularExpression(value.String())
		if err != nil {
			return false
		}

		constrainedLabels[key.String()] = regExp
		return true
	})
	if err != nil {
		return Settings{}, err
	}

	return Settings{
		DeniedLabels:      deniedLabels,
		ConstrainedLabels: constrainedLabels,
	}, nil
}
```

As you can see the code above is pretty straightforward. The `gjson` package
provides a convenient method to fetch multiple values from the JSON data.

The `newSettings` function also creates instances of `regexp.Regexp` objects
and ensures the regular expressions provided by the user are correct.

> **Note well:** all the `mapset.Set` objects are deliberately created using
> their [thread-unsafe variant](https://pkg.go.dev/github.com/deckarep/golang-set?utm_source=godoc#NewThreadUnsafeSet).
> The WebAssembly code is executed in single thread, hence there are no
> concurrency issues.
>
> Moreover, the WebAssembly standard doesn't cover
> threads yet. See [the official proposal](https://github.com/WebAssembly/threads)
> for more details.


## Implementing `Settings` validation

All Kubewarden policies have to implement
[settings validation](/writing-policies/index.html#the-validate_settings-entry-point).

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

> **Note well:** the `Valid` method is invoked against an already instantiated `Setting` object. That means
> the validation of the regular expression provided by the user already took place at
> inside of the `Settings` constructor.

Finally, we have to ensure the `validateSettings` function that was automatically generated
is changed to look like that:

```go
func validateSettings(payload []byte) ([]byte, error) {
	settings, err := NewSettingsFromValidateSettingsPayload(payload)
	if err != nil {
		// this happens when one of the user-defined regular expressions are invalid
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
	"encoding/json"
	"testing"

	kubewarden_testing "github.com/kubewarden/policy-sdk-go/testing"
)
```

As stated before, the unit tests are not part of the final WebAssembly binary, hence
we can build them using the official Go compiler. That means we can use the `encoding/json`
package to simplify our tests.

We will start by writing a unit test that ensures we can allocate a `Settings`
instance from a [`ValidationRequest`](/writing-policies/index.html#the-validationrequest-object)
object:

```go
func TestParseValidSettings(t *testing.T) {
	request := `
	{
		"request": "doesn't matter here",
		"settings": {
			"denied_labels": [ "foo", "bar" ],
			"constrained_labels": {
				"cost-center": "cc-\\d+"
			}
		}
	}
	`
	rawRequest := []byte(request)

	settings, err := NewSettingsFromValidationReq(rawRequest)
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
		t.Errorf("Execpted regexp to be %v - got %v instead",
			expected_regexp, re.String())
	}
}
```

Next we will define a test that ensures a `Settings` instance
cannot be generated when the user provides a broken regular
expression:

```go
func TestParseSettingsWithInvalidRegexp(t *testing.T) {
	request := `
	{
		"request": "doesn't matter here",
		"settings": {
			"denied_labels": [ "foo", "bar" ],
			"constrained_labels": {
				"cost-center": "cc-[a+"
			}
		}
	}
	`
	rawRequest := []byte(request)

	_, err := NewSettingsFromValidationReq(rawRequest)
	if err == nil {
		t.Errorf("Didn'g get expected error")
	}
}
```

Next we will define a test that checks the behaviour
of the [`validate_settings`](/writing-policies/index.html#the-validate_settings-entry-point)
entry-point.

In this case we actually look at the `SettingsValidationResponse` objected
returned by our `validateSettings` function:

```go
func TestDetectValidSettings(t *testing.T) {
	request := `
	{
		"denied_labels": [ "foo", "bar" ],
		"constrained_labels": {
			"cost-center": "cc-\\d+"
		}
	}
	`
	rawRequest := []byte(request)
	responsePayload, err := validateSettings(rawRequest)
	if err != nil {
		t.Errorf("Unexpected error %+v", err)
	}

	var response kubewarden_testing.SettingsValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if !response.Valid {
		t.Errorf("Expected settings to be valid: %s", response.Message)
	}
}
```

Finally, we write two more tests to ensure the `validateSettings` function
rejects invalid settings with the right messages:

```go
func TestDetectNotValidSettingsDueToBrokenRegexp(t *testing.T) {
	request := `
	{
		"denied_labels": [ "foo", "bar" ],
		"constrained_labels": {
			"cost-center": "cc-[a+"
		}
	}
	`
	rawRequest := []byte(request)
	responsePayload, err := validateSettings(rawRequest)
	if err != nil {
		t.Errorf("Unexpected error %+v", err)
	}

	var response kubewarden_testing.SettingsValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Valid {
		t.Error("Expected settings to not be valid")
	}

	if response.Message != "Provided settings are not valid: error parsing regexp: missing closing ]: `[a+`" {
		t.Errorf("Unexpected validation error message: %s", response.Message)
	}
}

func TestDetectNotValidSettingsDueToConflictingLabels(t *testing.T) {
	request := `
	{
		"denied_labels": [ "foo", "bar", "cost-center" ],
		"constrained_labels": {
			"cost-center": ".*"
		}
	}
	`
	rawRequest := []byte(request)
	responsePayload, err := validateSettings(rawRequest)
	if err != nil {
		t.Errorf("Unexpected error %+v", err)
	}

	var response kubewarden_testing.SettingsValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Valid {
		t.Error("Expected settings to not be valid")
	}

	if response.Message != "Provided settings are not valid: These labels cannot be constrained and denied at the same time: Set{cost-center}" {
		t.Errorf("Unexpected validation error message: %s", response.Message)
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
ok  	command-line-arguments	0.001s
```

We can now move to implement the actual validation code.
