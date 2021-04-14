# Writing the validation logic

It's now time to write the actual validation logic. This is done
inside of the `validate.go` file.

The scaffolded policy has already a `validate` function, we will need to make
very few changes to it.

This is how the function has to look like:

```go
func validate(payload []byte) ([]byte, error) {
	// NOTE 1
	if !gjson.ValidBytes(payload) {
		return kubewarden.RejectRequest(
			kubewarden.Message("Not a valid JSON document"),
			kubewarden.Code(400))
	}

	// NOTE 2
	settings, err := NewSettingsFromValidationReq(payload)
	if err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.Code(400))
	}

	// NOTE 3
	data := gjson.GetBytes(
		payload,
		"request.object.metadata.labels")

	// NOTE 4
	data.ForEach(func(key, value gjson.Result) bool {
		label := key.String()

		// NOTE 5
		if settings.DeniedLabels.Contains(label) {
			err = fmt.Errorf("Label %s is on the deny list", label)
			// stop iterating over labels
			return false
		}

		// NOTE 6
		regExp, found := settings.ConstrainedLabels[label]
		if found {
			// This is a constrained label
			if !regExp.Match([]byte(value.String())) {
				err = fmt.Errorf("The value of %s doesn't pass user-defined constraint", label)
				// stop iterating over labels
				return false
			}
		}

		return true
	})

	// NOTE 7
	if err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.NoCode)
	}

	return kubewarden.AcceptRequest()
```

The code has some `NOTE` section inside of it. Let's get through them:

1. The function ensures the JSON payload is properly formatted. This
  is done using a function provided by the `gjson` library
2. The `Settings` instance is created using one of the constructor
  methods we defined inside of `settings.go`
3. We use a `gjson` selector to get the `label` map provided by the object
  embedded into the request
4. We use a `gjson` helper to iterate over the results of the query. If the query
  has no results the loop will never take place.
5. We look for the `label` of the object inside of the list of denied labels
  provided by the user via the policy settings. If the `label` is a denied
  one, we set the value of the `err` variable and exit from the loop (that
  happens by returning `false` instead of `true`).
6. We look for the `label` of the object inside of the list of constrained labels
  provided by the user via the policy settings. When we have a match we use
  the regular expression provided by the user to validate the value of the label.
  If the validation fails, we set the value of the `err` variable and exit
  from the loop (that happens by returning `false` instead of `true`).
7. If the `err` variable is not `nil`, we use the helper provided by Kubewarden's
  SDK to reject the request. Otherwise we accept it.

## Testing the validation code

It's now time to write some unit tests to ensure the validation code is behaving
properly. These tests are going to be located inside of the `validate_test.go`
file.

The tests will rely on some [test fixtures](https://en.wikipedia.org/wiki/Test_fixture#Software)
located inside of the `test_data` directory. This directory has already
been populated by the template repository.

We will start by including the following packages:

```go
import (
	"encoding/json"
	"testing"

	"github.com/deckarep/golang-set"
	kubewarden_testing "github.com/kubewarden/policy-sdk-go/testing"
)
```

The first unit test will ensure that having no user settings leads
to the request to be accepted:

```go
func TestEmptySettingsLeadsToRequestAccepted(t *testing.T) {
	settings := Settings{}

	payload, err := kubewarden_testing.BuildValidationRequest(
		"test_data/ingress.json",
		&settings)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	responsePayload, err := validate(payload)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	var response kubewarden_testing.ValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Accepted != true {
		t.Error("Unexpected rejection")
	}
}
```

As you can see we are using some test helper functions and structures provided
by the Kubewarden SDK.

The next test ensures a request can be accepted when none of its labels
is relevant to the user:

```go
func TestRequestAccepted(t *testing.T) {
	constrainedLabels := make(map[string]*RegularExpression)
	re, err := CompileRegularExpression(`^world-`)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}
	constrainedLabels["hello"] = re

	settings := Settings{
		DeniedLabels:      mapset.NewThreadUnsafeSetFromSlice([]interface{}{"bad1", "bad2"}),
		ConstrainedLabels: constrainedLabels,
	}

	payload, err := kubewarden_testing.BuildValidationRequest(
		"test_data/ingress.json",
		&settings)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	responsePayload, err := validate(payload)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	var response kubewarden_testing.ValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Accepted != true {
		t.Error("Unexpected rejection")
	}
}
```

Next we will ensure a request is accepted when one of its labels satisfies
the constraint provided by the user:

```go
func TestAcceptRequestWithConstraintLabel(t *testing.T) {
	constrainedLabels := make(map[string]*RegularExpression)
	re, err := CompileRegularExpression(`^team-`)
	if err != nil {
		t.Errorf("Unexpected error: %s", err)
	}
	constrainedLabels["owner"] = re
	settings := Settings{
		DeniedLabels:      mapset.NewThreadUnsafeSetFromSlice([]interface{}{"bad1", "bad2"}),
		ConstrainedLabels: constrainedLabels,
	}

	payload, err := kubewarden_testing.BuildValidationRequest(
		"test_data/ingress.json",
		&settings)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	responsePayload, err := validate(payload)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	var response kubewarden_testing.ValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Accepted != true {
		t.Error("Unexpected rejection")
	}
}
```

It's now time to test the rejection of requests.

This test verifies a request is rejected when one of the labels is
on the deny list:

```go
func TestRejectionBecauseDeniedLabel(t *testing.T) {
	constrainedLabels := make(map[string]*RegularExpression)
	re, err := CompileRegularExpression(`^world-`)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}
	constrainedLabels["hello"] = re

	settings := Settings{
		DeniedLabels:      mapset.NewThreadUnsafeSetFromSlice([]interface{}{"owner"}),
		ConstrainedLabels: constrainedLabels,
	}

	payload, err := kubewarden_testing.BuildValidationRequest(
		"test_data/ingress.json",
		&settings)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	responsePayload, err := validate(payload)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	var response kubewarden_testing.ValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Accepted != false {
		t.Error("Unexpected accept response")
	}

	expected_message := "Label owner is on the deny list"
	if response.Message != expected_message {
		t.Errorf("Got '%s' instead of '%s'", response.Message, expected_message)
	}
}
```

The next test ensures a request is rejected when one of the user defined
constraints is not satisfied:

```go
func TestRejectionBecauseConstrainedLabelNotValid(t *testing.T) {
	constrainedLabels := make(map[string]*RegularExpression)
	re, err := CompileRegularExpression(`^cc-\d+$`)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}
	constrainedLabels["cc-center"] = re

	settings := Settings{
		DeniedLabels:      mapset.NewThreadUnsafeSetFromSlice([]interface{}{}),
		ConstrainedLabels: constrainedLabels,
	}

	payload, err := kubewarden_testing.BuildValidationRequest(
		"test_data/ingress.json",
		&settings)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	responsePayload, err := validate(payload)
	if err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	var response kubewarden_testing.ValidationResponse
	if err := json.Unmarshal(responsePayload, &response); err != nil {
		t.Errorf("Unexpected error: %+v", err)
	}

	if response.Accepted != false {
		t.Error("Unexpected accept response")
	}

	expected_message := "The value of cc-center doesn't pass user-defined constraint"
	if response.Message != expected_message {
		t.Errorf("Got '%s' instead of '%s'", response.Message, expected_message)
	}
}
```

We can now run all the unit tests, including the one defined inside of `settings_test.go`,
by using this simple command:

```shell
make test
```

This will produce the following output:

```shell
go test -v
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
=== RUN   TestEmptySettingsLeadsToRequestAccepted
--- PASS: TestEmptySettingsLeadsToRequestAccepted (0.00s)
=== RUN   TestRequestAccepted
--- PASS: TestRequestAccepted (0.00s)
=== RUN   TestAcceptRequestWithConstraintLabel
--- PASS: TestAcceptRequestWithConstraintLabel (0.00s)
=== RUN   TestRejectionBecauseDeniedLabel
--- PASS: TestRejectionBecauseDeniedLabel (0.00s)
=== RUN   TestRejectionBecauseConstrainedLabelNotValid
--- PASS: TestRejectionBecauseConstrainedLabelNotValid (0.00s)
PASS
ok  	github.com/kubewarden/safe-labels-policy	0.001s
```

We can now move to the next step, write some end-to-end tests.
