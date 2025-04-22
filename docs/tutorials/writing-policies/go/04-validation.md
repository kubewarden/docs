---
sidebar_label: Validation logic
sidebar_position: 040
title: Writing the validation logic
description: A tutorial on writing validation logic for a Kubewarden policy using Go.
keywords: [kubewarden, kubernetes, writing policies, golang, go]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, golang, validation-logic]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/validation"/>
</head>

The validation logic goes be in the `validate.go` file.

Your validation logic needs to:

- Extract the relevant information from the incoming `payload` object.
- Return a response based on the input and the policy settings.

The incoming payload is a JSON object, described
[in this document](../../../reference/spec/validating-policies),
and you can get the data from it in two ways:

1. Unmarshal the JSON data into Go types.
1. Perform JSON queries (something similar to [`jq`](https://stedolan.github.io/jq/)).

This section of the documentation focuses on the first approach, using Go types.
A description of the second approach is in a later [validation with queries](validation-with-queries) section.

:::note

Relying on Kubernetes objects,
instead of doing jq-like searches,
leads to generation of bigger WebAssembly modules.
A policy using Kubernetes objects can be around 1.5&nbsp;MB
while one using `gjson` is around 300&nbsp;KB.

Apart from size,
the policy using Kubernetes objects take much more time during first execution.
Following invocations are fast because Kubewarden uses Wasmtime's cache feature.
The first execution can take about 20 seconds with `kwctl`, later executions, 1 to 2 seconds.
So, Kubewarden Policy Server has a slower start-up time but then policy evaluation times aren't usually effected by the usage of Kubernetes objects.

:::

## The `validate` function

The policy provided by the scaffold template, in `validate.go`, already has a `validate` function.
You need to make few changes to it for this tutorial.

This is how the function should be when complete:

```go
func validate(payload []byte) ([]byte, error) {
    // NOTE 1
    // Create a ValidationRequest instance from the incoming payload
    validationRequest := kubewarden_protocol.ValidationRequest{}
    err := json.Unmarshal(payload, &validationRequest)
    if err != nil {
        return kubewarden.RejectRequest(
            kubewarden.Message(err.Error()),
            kubewarden.Code(400))
    }

    // NOTE 2
    // Create a Settings instance from the ValidationRequest object
    settings, err := NewSettingsFromValidationReq(&validationRequest)
    if err != nil {
        return kubewarden.RejectRequest(
            kubewarden.Message(err.Error()),
            kubewarden.Code(400))
    }

    // NOTE 3
    // Access the **raw** JSON that describes the object
    podJSON := validationRequest.Request.Object

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

The code has five `NOTE` sections:

1. Create a `kubewarden_protocol.ValidationRequest` by unmarshalling the JSON payload.
1. Create a `Settings` object by using the function you earlier defined in the `settings.go` file.
1. Access the raw JSON representation of the Pod that's part of the `ValidationRequest`.
1. Unmarshal the Pod object.
1. Iterate over the labels of the Pod.
You use a new function called `validateLabel` to identify labels violating the policy.

You also need to define the `validateLabel` function in the `validate.go` file:

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

Now you can write unit tests to check the validation code is behaving.
Locate the tests in the `validate_test.go` file.

You should replace the contents of the scaffolding file to match this:

<details>

<summary>`validate_test.go`</summary>

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
    // NOTE 1
    cases := []struct {
        podLabels         map[string]string
        deniedLabels      mapset.Set[string]
        constrainedLabels map[string]*RegularExpression
        expectedIsValid   bool
    }{
        {
            // ➀
            // Pod has no labels -> should be accepted
            podLabels:         map[string]string{},
            deniedLabels:      mapset.NewThreadUnsafeSet[string]("owner"),
            constrainedLabels: map[string]*RegularExpression{},
            expectedIsValid:   true,
        },
        {
            // ➁
            // Pod has labels, none is denied -> should be accepted
            podLabels: map[string]string{
                "hello": "world",
            },
            deniedLabels:      mapset.NewThreadUnsafeSet[string]("owner"),
            constrainedLabels: map[string]*RegularExpression{},
            expectedIsValid:   true,
        },
        {
            // ➂
            // Pod has labels, one is denied -> should be rejected
            podLabels: map[string]string{
                "hello": "world",
            },
            deniedLabels:      mapset.NewThreadUnsafeSet[string]("hello"),
            constrainedLabels: map[string]*RegularExpression{},
            expectedIsValid:   false,
        },
        {
            // ➃
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
            // ➄
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
            // ➅
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

</details>

The test uses a "test-case driven" approach.
You start by defining a `struct` that holds the data needed by a test case, see `NOTE 1`:

```go
struct {
        podLabels         map[string]string
        deniedLabels      mapset.Set[string]
        constrainedLabels map[string]*RegularExpression
        expectedIsValid   bool
}
```

You then declare several test cases.
They have the start lines marked ➀ to ➅ in the large code block above.

For example,
you should consider a Pod that has no labels to be valid.
You can test this with these input values:

```go
{
  podLabels:         map[string]string{},
  deniedLabels:      mapset.NewThreadUnsafeSet[string]("owner"),
  constrainedLabels: map[string]*RegularExpression{},
  expectedIsValid:   true,
}
```

The test defines new scenarios in this way until `NOTE 2`.
This is where you iterate over the different test cases using the following code:

1. Create a `BasicSettings` object by using the data provided by the `testCase`.
1. Create a `Pod` object, assign to it the labels defined in `testCase`.
1. Create a `payload` object. Do this using a helper function of the Kubewarden SDK: `kubewarden_testing.BuildValidationRequest`.
This function takes as input the object the request is about, the `Pod`,
and the object that describes the settings, the `BasicSettings` instance.
1. Finally, the code invokes your `validate` function and performs a check on the result.

You can now run all the unit tests,
including the one defined in `settings_test.go`,
by using:

```console
make test
```

This produces the following output:

<details>
<summary>Output from `make test`</summary>

```shell
make test
go test -v
=== RUN   TestParsingSettingsWithNoValueProvided
--- PASS: TestParsingSettingsWithNoValueProvided (0.00s)
=== RUN   TestIsNameDenied
--- PASS: TestIsNameDenied (0.00s)
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
    validate_test.go:126: Unexpected acceptance with pod labels: map[owner:team-kubewarden], denied labels: Set{hello}, constrained labels: map[cc-center:team-\d+]
--- FAIL: TestValidateLabel (0.00s)
FAIL
exit status 1
FAIL    github.com/kubewarden/go-policy-template        0.003s
make: *** [Makefile:29: test] Error 1
```

</details>

As you can see all the `Settings` tests are passing, but there's one test case of the
`TestValidateLabel` that isn't:

```console
validate_test.go:126: Unexpected acceptance with pod labels: map[owner:team-kubewarden], denied labels: Set{hello}, constrained labels: map[cc-center:team-\d+]
```

In this scenario, your policy settings says that Pods must have a label,
with a key `cc-center`,
that satisfies the `team-\d+` regular expression.
The Pod tested doesn't have this label, so you should reject it.
This isn't happening however, so you can fix this in the next section.

:::note
You might be wondering why the output of the unit tests features lines like
`NATIVE: |{"level":"debug","message":"validating pod object","name":"test-pod","namespace":"default"}`

The `logger` statements in the policy produce this output.
This happens only when the code runs outside the WebAssembly context.
This doesn't happen when the policy evaluates in Kubewarden,
in that context the `logger` statements emit OpenTelemetry events instead.
:::

### Fix the broken unit test

To fix the broken test you discovered you have to make a change in your validation function, `validate` in `validate.go`.

Currently, the core of your validation logic is the following lines:

```go
for label, value := range pod.Metadata.Labels {
    if err := validateLabel(label, value, &settings); err != nil {
        return kubewarden.RejectRequest(
            kubewarden.Message(err.Error()),
            kubewarden.NoCode)
    }
}
```

Here you iterate over each label to check that it's not denied
and that it doesn't violate one of the constraints specified by the user.
However, you're not making sure that the Pod has all the labels specified in `Settings.ConstrainedLabels`.

Add the new code, right after the `for` loop:

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

Run the unit tests again:

```console
make test
```

This outputs:

<details>
<summary>Output from final `make test`</summary>

```console
make test
go test -v
=== RUN   TestParsingSettingsWithNoValueProvided
--- PASS: TestParsingSettingsWithNoValueProvided (0.00s)
=== RUN   TestIsNameDenied
--- PASS: TestIsNameDenied (0.00s)
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

</details>

As you can see, this time all the tests pass.
You can now move to the next step, writing the end-to-end tests.
