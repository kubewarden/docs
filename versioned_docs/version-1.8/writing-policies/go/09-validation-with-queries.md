---
sidebar_label: "Validate doing JSON queries"
title: ""
---

# Validate by doing JSON queries

In the previous section, we have shown how to write a [validation policy](validation)
policy by using Go types that describe Kubernetes objects.

There is however another way to write validation logic: by extracting the
relevant data from the JSON document using ad-hoc queries.

This _"jq-like"_ approach can be pretty handy when the policy has to look
deep inside a Kubernetes object. This is especially helpful when dealing with
inner objects that are optional.

This section of the document reimplements the previous code by doing JSON queries
instead of unmarshaling the JSON payload into native Go types.

## The `validate` function

We will use the policy we just created and change its `validate` function to not
use the Go types that define Kubernetes objects.

We will instead use the [`gjson`](https://github.com/tidwall/gjson) library to
extract data from the raw JSON object.

First of all, we have to change the requirement section. This is how the code
has to look like:

```go
import (
    "encoding/json"
	"fmt"

	mapset "github.com/deckarep/golang-set/v2"
	kubewarden "github.com/kubewarden/policy-sdk-go"
	kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"
	"github.com/tidwall/gjson"
)
```

The validation function has to be changed to look like that:

```go
func validate(payload []byte) ([]byte, error) {
	// Create a ValidationRequest instance from the incoming payload
	validationRequest := kubewarden_protocol.ValidationRequest{}
	err := json.Unmarshal(payload, &validationRequest)
	if err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.Code(400))
	}

	// Create a Settings instance from the ValidationRequest object
	settings, err := NewSettingsFromValidationReq(&validationRequest)
	if err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.Code(400))
	}

	// Access the **raw** JSON that describes the object
	podJSON := validationRequest.Request.Object

	// highlight-next-line
	// NOTE 1
	data := gjson.GetBytes(
		podJSON,
		"metadata.labels")

	var validationErr error
	labels := mapset.NewThreadUnsafeSet[string]()
	data.ForEach(func(key, value gjson.Result) bool {
		// highlight-next-line
		// NOTE 2
		label := key.String()
		labels.Add(label)

		// highlight-next-line
		// NOTE 3
		validationErr = validateLabel(label, value.String(), &settings)

        // keep iterating if there are no errors
		return validationErr == nil
	})

	// highlight-next-line
	// NOTE 4
	if validationErr != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(validationErr.Error()),
			kubewarden.NoCode)
	}

	// highlight-next-line
	// NOTE 5
	for requiredLabel := range settings.ConstrainedLabels {
		if !labels.Contains(requiredLabel) {
			return kubewarden.RejectRequest(
				kubewarden.Message(fmt.Sprintf("Constrained label %s not found inside of Pod", requiredLabel)),
				kubewarden.NoCode)
		}
	}

	return kubewarden.AcceptRequest()
}
```

The initial part of the `validate` function is similar to the previous one. Things
start to change only as soon as we reach the `NOTE` sections.
Let's get through them:

1. We use a `gjson` selector to get the `label` map provided by the object
   embedded into the request
2. We use a `gjson` helper to iterate over the results of the query. If the query
   has no results the loop will never take place.
3. We use the `validateLabel` function to validate the label and its value, like
   we did before. We're also adding the labels found inside of the Pod to a
   `mapset.Set` that we previously defined.
4. If the validation produced an error, we immediately return with a validation
   rejection reply.
5. Like before, we iterate over the `constrainedLabels` to make sure all of them
   have been specified inside of the Pod. The code has been slightly changed
   to make use of the `mapset.Set` object we previously populated.

## Testing the validation code

The unit tests do not need any change, we can run them like before:

```shell
make test
```

All of them are working as expected:

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
=== RUN   TestValidateLabel
--- PASS: TestValidateLabel (0.00s)
PASS
ok  	github.com/kubewarden/go-policy-template	0.002s
```

## End to end tests

End to end test need no changes at all. Let's run them to ensure they
are still green:

```shell
make e2e-tests
```

This is the output we will get:

```shell
bats e2e.bats
e2e.bats
 ✓ accept when no settings are provided
 ✓ accept because label is satisfying a constraint
 ✓ accept labels are not on deny list
 ✓ reject because label is on deny list
 ✓ reject because label is not satisfying a constraint
 ✓ reject because constrained label is missing
 ✓ fail settings validation because of conflicting labels
 ✓ fail settings validation because of invalid constraint

8 tests, 0 failures
```

Again, all the tests are working as expected.
