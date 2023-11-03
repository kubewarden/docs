---
sidebar_label: "Write the Validation Logic"
title: ""
---

# Writing the validation logic

It's now time to write the actual validation logic. This is done
inside of the `validate.go` file.

The validation logic needs to extract the relevant information
from the incoming `payload` object and then, based on the input
and the policy settings, return a response.

The incoming payload is a JSON object (as described [here](../spec/validating-policies)) and
the relevant data can be extracted from it in two ways:

1. Unmarshal the JSON data into native Go types
2. Perform JSON queries (something similar to [`jq`](https://stedolan.github.io/jq/))

This section of the documentation focuses on the first approach: relying on native
Go types. The second approach is described [later](validation-with-queries).

:::note
Relying on Kubernetes objects instead of doing jq-like searches
leads to bigger WebAssembly modules being produced.
A policy using Kubernetes objects can be around 1.5 Mb versus the 300 Kb of
a policy that uses gjson.

Leaving the WebAssembly module dimension aside, the policy using Kubernetes
objects will take significantly more time during its first execution.
Subsequent invocations will be fast because Kubewarden leverages Wasmtime's
cache feature.
The first execution can take approximatively 21 seconds with kwctl, later executions
take close to 1.5 seconds.
Kubewarden Policy Server will just have a slower start-up time, policy evaluation times are not going to be affected by the usage of Kubernetes objects.
:::

## The `validate` function

The scaffolded policy already has a `validate` function and we will need to make
very few changes to it.

This is how the function has to look like:

```go
func validate(payload []byte) ([]byte, error) {
	// highlight-next-line
	// NOTE 1
	// Create a ValidationRequest instance from the incoming payload
	validationRequest := kubewarden_protocol.ValidationRequest{}
	err := json.Unmarshal(payload, &validationRequest)
	if err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.Code(400))
	}

	// highlight-next-line
	// NOTE 2
	// Create a Settings instance from the ValidationRequest object
	settings, err := NewSettingsFromValidationReq(&validationRequest)
	if err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.Code(400))
	}

	// highlight-next-line
	// NOTE 3
	// Access the **raw** JSON that describes the object
	podJSON := validationRequest.Request.Object

	// highlight-next-line
	// NOTE 4
	// Try to create a Pod instance using the RAW JSON we got from the
	// ValidationRequest.
	pod := &corev1.Pod{}
	if err := json.Unmarshal([]byte(podJSON), pod); err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(
				fmt.Sprintf("Cannot decode Pod object: %s", err.Error())),
			kubewarden.Code(400))
	}

	logger.DebugWithFields("validating pod object", func(e onelog.Entry) {
		e.String("name", pod.Metadata.Name)
		e.String("namespace", pod.Metadata.Namespace)
	})

	// highlight-next-line
	// NOTE 5
	for label, value := range pod.Metadata.Labels {
		if err := validateLabel(label, value, &settings); err != nil {
			return kubewarden.RejectRequest(
				kubewarden.Message(err.Error()),
				kubewarden.NoCode)
		}
	}

	return kubewarden.AcceptRequest()
}
```

The code has some `NOTE` sections inside of it, let's get through them:

1. We create a `kubewarden_protocol.ValidationRequest` by unmarshaling the
   JSON payload
2. We create a `Settings` object by using the function we previously defined
   inside of the `settings.go` file.
3. We access the raw JSON representation of the Pod that is part of the `ValidationRequest`.
4. We unmarshal the Pod object
5. We iterate over the labels of the Pod. We use a new function called `validateLabel`
   to identify labels that are violating the policy

Let's define the `validateLabel` function at the bottom of the `validate.go` file:

```go
func validateLabel(label, value string, settings *Settings) error {
	if settings.DeniedLabels.Contains(label) {
		return fmt.Errorf("Label %s is on the deny list", label)
	}

	regExp, found := settings.ConstrainedLabels[label]
	if found {
		// This is a constrained label
		if !regExp.Match([]byte(value)) {
			return fmt.Errorf("The value of %s doesn't pass user-defined constraint", label)
		}
	}

	return nil
}
```

## Testing the validation code

It's now time to write some unit tests to ensure the validation code is behaving
properly. These tests are going to be located inside of the `validate_test.go`
file.

We will replace the contents of the generated file to match the following
ones:

```go
package main

import (
	"regexp"
	"testing"

	"encoding/json"

	mapset "github.com/deckarep/golang-set/v2"
	corev1 "github.com/kubewarden/k8s-objects/api/core/v1"
	metav1 "github.com/kubewarden/k8s-objects/apimachinery/pkg/apis/meta/v1"
	kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"
	kubewarden_testing "github.com/kubewarden/policy-sdk-go/testing"
)

func TestValidateLabel(t *testing.T) {
	// highlight-next-line
	// NOTE 1
	cases := []struct {
		podLabels         map[string]string
		deniedLabels      mapset.Set[string]
		constrainedLabels map[string]*RegularExpression
		expectedIsValid   bool
	}{
		{
			// highlight-next-line
			// Pod has no labels -> should be accepted
			podLabels:         map[string]string{},
			deniedLabels:      mapset.NewThreadUnsafeSet[string]("owner"),
			constrainedLabels: map[string]*RegularExpression{},
			expectedIsValid:   true,
		},
		{
			// highlight-next-line
			// Pod has labels, none is denied -> should be accepted
			podLabels: map[string]string{
				"hello": "world",
			},
			deniedLabels:      mapset.NewThreadUnsafeSet[string]("owner"),
			constrainedLabels: map[string]*RegularExpression{},
			expectedIsValid:   true,
		},
		{
			// highlight-next-line
			// Pod has labels, one is denied -> should be rejected
			podLabels: map[string]string{
				"hello": "world",
			},
			deniedLabels:      mapset.NewThreadUnsafeSet[string]("hello"),
			constrainedLabels: map[string]*RegularExpression{},
			expectedIsValid:   false,
		},
		{
			// highlight-next-line
			// Pod has labels, one has constraint that is respected -> should be accepted
			podLabels: map[string]string{
				"cc-center": "team-123",
			},
			deniedLabels: mapset.NewThreadUnsafeSet[string]("hello"),
			constrainedLabels: map[string]*RegularExpression{
				"cc-center": {
					Regexp: regexp.MustCompile(`team-\d+`),
				},
			},
			expectedIsValid: true,
		},
		{
			// highlight-next-line
			// Pod has labels, one has constraint that are not respected -> should be rejected
			podLabels: map[string]string{
				"cc-center": "team-kubewarden",
			},
			deniedLabels: mapset.NewThreadUnsafeSet[string]("hello"),
			constrainedLabels: map[string]*RegularExpression{
				"cc-center": {
					Regexp: regexp.MustCompile(`team-\d+`),
				},
			},
			expectedIsValid: false,
		},
		{
			// highlight-next-line
			// Settings have a constraint, pod doesn't have this label -> should be rejected
			podLabels: map[string]string{
				"owner": "team-kubewarden",
			},
			deniedLabels: mapset.NewThreadUnsafeSet[string]("hello"),
			constrainedLabels: map[string]*RegularExpression{
				"cc-center": {
					Regexp: regexp.MustCompile(`team-\d+`),
				},
			},
			expectedIsValid: false,
		},
	}

	// highlight-next-line
	// NOTE 2
	for _, testCase := range cases {
		settings := Settings{
			DeniedLabels:      testCase.deniedLabels,
			ConstrainedLabels: testCase.constrainedLabels,
		}

		pod := corev1.Pod{
			Metadata: &metav1.ObjectMeta{
				Name:      "test-pod",
				Namespace: "default",
				Labels:    testCase.podLabels,
			},
		}

		payload, err := kubewarden_testing.BuildValidationRequest(&pod, &settings)
		if err != nil {
			t.Errorf("Unexpected error: %+v", err)
		}

		responsePayload, err := validate(payload)
		if err != nil {
			t.Errorf("Unexpected error: %+v", err)
		}

		var response kubewarden_protocol.ValidationResponse
		if err := json.Unmarshal(responsePayload, &response); err != nil {
			t.Errorf("Unexpected error: %+v", err)
		}

		if testCase.expectedIsValid && !response.Accepted {
			t.Errorf("Unexpected rejection: msg %s - code %d with pod labels: %v, denied labels: %v, constrained labels: %v",
				*response.Message, *response.Code, testCase.podLabels, testCase.deniedLabels, testCase.constrainedLabels)
		}

		if !testCase.expectedIsValid && response.Accepted {
			t.Errorf("Unexpected acceptance with pod labels: %v, denied labels: %v, constrained labels: %v",
				testCase.podLabels, testCase.deniedLabels, testCase.constrainedLabels)
		}
	}
}
```

The test uses a "test-case driven" approach. We start by defining a `struct` that
holds the data needed by a test case, see `NOTE 1`:

```go
struct {
		podLabels         map[string]string
		deniedLabels      mapset.Set[string]
		constrainedLabels map[string]*RegularExpression
		expectedIsValid   bool
}
```

We then declare several test cases, each one is highlighted in the code
snippet from above.

For example, a Pod that has no labels should always be considered valid. This is tested
with these input values:

```go
{
  podLabels:         map[string]string{},
  deniedLabels:      mapset.NewThreadUnsafeSet[string]("owner"),
  constrainedLabels: map[string]*RegularExpression{},
  expectedIsValid:   true,
}
```

The test keeps defining new scenarios in this way until we reach `NOTE 2`.
This is where we iterate over the different test cases and perform the following code:

1. Create a `BasicSettings` object by using the data provided by the `testCase`
2. Create a `Pod` object, assign to it the labels defined inside of the `testCase`
3. Create a `payload` object. This is done using a helper function of the Kubewarden SDK:
   `kubewarden_testing.BuildValidationRequest`. This function takes as input the object
   the request is about (the `Pod` in our case) and the object that describes the settings (the
   `BasicSettings` instance in our case)
4. Finally, the code invokes our `validate` function and performs a check against its
   outcome

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
=== RUN   TestValidateLabel
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
    validate_test.go:134: Unexpected acceptance with pod labels: map[owner:team-kubewarden], denied labels: Set{hello}, constrained labels: map[cc-center:team-\d+]
--- FAIL: TestValidateLabel (0.00s)
FAIL
exit status 1
FAIL    github.com/kubewarden/go-policy-template        0.003s
make: *** [Makefile:29: test] Error 1
```

As we can see all the `Settings` tests are passing, but there's one test case of the
`TestValidateLabel` that is not:

```console
validate_test.go:134: Unexpected acceptance with pod labels: map[owner:team-kubewarden], denied labels: Set{hello}, constrained labels: map[cc-center:team-\d+]
```

In this scenario, our policy settings dictate that Pods must have a label with
a key `cc-center` that satisfies the `team-\d+` regular expression.
The Pod being tested doesn't have this label, hence it should be rejected. This
isn't happening however.

:::note
You might be wondering why the output of the unit tests features
lines like `NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}`

This output is produced by the `logger` statements used inside of the policy. This happens
only when the code is run outside of the WebAssembly context. This does not happen when
the policy is evaluated by Kubewarden, in that context the `logger` statements will emit
OpenTelemetry events instead.
:::

### Fix the broken unit test

To fix the broken test we just discovered we have to make a small change inside
of our validation function.

Currently the core of our validation logic is made by the following lines:

```go
for label, value := range pod.Metadata.Labels {
	if err := validateLabel(label, value, &settings); err != nil {
		return kubewarden.RejectRequest(
			kubewarden.Message(err.Error()),
			kubewarden.NoCode)
	}
}
```

Here we iterate over each label to ensure that it is not denied and
that it doesn't violate one of the constraints specified by the user.
However, we are not making sure that the Pod has all the labels specified inside
of the `Settings.ConstrainedLabels`.

Let's add some new code, right after the `for` loop shown above:

```go
for requiredLabel := range settings.ConstrainedLabels {
	_, found := pod.Metadata.Labels[requiredLabel]
	if !found {
		return kubewarden.RejectRequest(
			kubewarden.Message(fmt.Sprintf(
				"Constrained label %s not found inside of Pod",
				requiredLabel),
			),
			kubewarden.NoCode)
	}
}
```

Let's run the unit tests again:

```console
make test
```

This will produce the following output:

```console
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
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}
|
--- PASS: TestValidateLabel (0.00s)
PASS
ok      github.com/kubewarden/go-policy-template        0.003s
```

As you can see, this time all the tests are passing.
We can now move to the next step, write some end-to-end tests.
