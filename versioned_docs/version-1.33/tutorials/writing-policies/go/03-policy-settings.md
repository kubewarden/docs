---
sidebar_label: Defining policy settings
sidebar_position: 030
title: Defining policy settings
description: Defining policy setting for a Kubewarden policy written in Go.
keywords: [kubewarden, kubernetes, defining policy settings, Go]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, go, defining-policy-settings]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/policy-settings"/>
</head>

Firstly, you need to define the structure that holds the policy settings.

You do this by modifying the code in the `settings.go` file (from your local version of the Go policy template).
You need to add two extra lines to the `import` section,
change the `Settings` structure,
and add the `RegularExpression` structure.

It should match the following code:

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
    DeniedLabels      mapset.Set[string]            `json:"denied_labels"`
    ConstrainedLabels map[string]*RegularExpression `json:"constrained_labels"`
}

type RegularExpression struct {
    *regexp.Regexp
}
```

:::note
`DeniedNames` is no longer required in the `Settings` structure defined in `settings.go`.

As `DeniedNames` is no longer defined, you should also delete the function `IsNameDefined` in `settings.go`.
You should also remove the function that references it in `settings_test.go`, `TestIsNameDenied`.
:::

You're using the `regexp` package to handle regular expression objects and the
[`mapset.Set`](https://github.com/deckarep/golang-set) type to store
the list of denied labels.

Since `regexp.Regexp` doesn't handle deserialization,
you need to define custom functions to handle marshaling and unmarshaling of regular expressions:

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

Also, you need the `UnmarshalJSON` method to handle the deserialization of the `Settings` struct:

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

A Kubewarden policy exposes two different functions that receive the policy settings as input:

- `validate`: Use this function when Kubernetes object requires validation by the policy.
The settings are part of a
[`ValidationRequest`](https://pkg.go.dev/github.com/kubewarden/policy-sdk-go@v0.2.1/protocol#ValidationRequest)
object.
- `validate_settings`: Call this function when the policy is first loaded by Kubewarden.
The function receives the policy settings as input and checks validity.

You need to create a helper function that creates a `Settings` object starting from the JSON payload:

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
All the `mapset.Set` objects are created using the
[thread-unsafe variant](https://pkg.go.dev/github.com/deckarep/golang-set?utm_source=godoc#NewThreadUnsafeSet).
The WebAssembly code executes in a single thread, hence there are no concurrency issues.

The WebAssembly standard doesn't cover threads yet.
See [the official proposal](https://github.com/WebAssembly/threads) for more details.
:::

## Implementing `Settings` validation

All Kubewarden policies have to implement settings validation.

You do this by adding a `Valid` method to the `Settings` instances:

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

The `Valid` method ensures no "denied" label is also part of the "constrained" map.
Usage of the `Intersect` method provided by `mapset.Set` simplifies the check.

:::note
The `Valid` method invocation is on an already instantiated `Setting` object.
This means the validation of the regular expression provided by the user already took place in of the `Settings` unmarshaler.
:::

Finally, you need the `validateSettings` function,
provided by the scaffolding,
to change to look like this:

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

You can see the function takes advantage of the helper functions provided by
[Kubewarden's SDK](https://github.com/kubewarden/policy-sdk-go).

## Testing the settings code

It's important to have good test coverage of the code you write.
The code you are using, from the scaffolding, comes with a series of unit tests defined in the `settings_test.go` file.

You have to change the contents of this file to reflect the new behavior of the `Settings` class.

Include the Go packages you are using:

```go
import (
    "testing"

    "encoding/json"

    kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"
)
```

You can start by writing a unit test that ensures you can assign a `Settings`
instance from a `ValidationRequest` object:

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

Next, you need a test that checks a `Settings` instance isn't generated when the user provides a broken regular expression:

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
        t.Errorf("Didn't get expected error")
    }
}
```

Now, you can define a test that checks the behavior of the
`validate_settings` entry point.

You look at the `SettingsValidationResponse` object returned by your `validateSettings` function:

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

Finally, you write two more tests to check the `validateSettings` function rejects invalid settings with the right messages:

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

Now you can run the tests that you have defined so far by using the following command:

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
ok      command-line-arguments    0.002s
```

You can now implement the actual validation code in the next section.
