---
sidebar_label: Validation using JSON queries
sidebar_position: 090
title: Validation using JSON queries
description: Validation using JSON queries with Kubewarden policies in Go.
keywords: [kubewarden, kubernetes, validation using JSON queries]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, golang, validation-using-json]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/validation-with-queries"/>
</head>

An earlier section shows how to write a
[validation](04-validation.md)
policy by using Go types describing Kubernetes objects.

There is another way to write validation logic,
by extracting the relevant data from the JSON document using ad-hoc queries.

This _"jq-like"_ approach can be useful when the policy has to look deep inside a Kubernetes object.
It's especially helpful when dealing with optional inner objects.

This document re-implements the earlier code using JSON queries instead of unmarshalling the JSON payload into Go types.

## The `validate` function

You can use the policy you just created and change its `validate` function
to not use the Go types that define Kubernetes objects.

You can instead use the [`gjson`](https://github.com/tidwall/gjson) library to extract data from the raw JSON object.

Firstly, you need to change the requirement section.
This is how the code should look:

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

Change the `validate` function to look like:

<details>
<summary>`validate` function</summary>

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

    // NOTE 1
    data := gjson.GetBytes(
        podJSON,
        "metadata.labels")

    var validationErr error
    labels := mapset.NewThreadUnsafeSet[string]()
    data.ForEach(func(key, value gjson.Result) bool {
        // NOTE 2
        label := key.String()
        labels.Add(label)

        // NOTE 3
        validationErr = validateLabel(label, value.String(), &settings)

        // keep iterating if there are no errors
        return validationErr == nil
    })

    // NOTE 4
    if validationErr != nil {
        return kubewarden.RejectRequest(
            kubewarden.Message(validationErr.Error()),
            kubewarden.NoCode)
    }

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

</details>

The first part of the `validate` function is similar as before.
The 'NOTE's mark the changes.

1. You use a `gjson` selector to get the `label` map provided by the object embedded into the request
1. You use a `gjson` helper to iterate over the results of the query.
If the query has no results, the loop never takes place.
1. You use the `validateLabel` function to validate the label and its value, as before.
You're also adding the labels found in the Pod to a previously defined `mapset.Set`.
1. If the validation produced an error, you immediately return with a validation rejection reply.
1. As before, you iterate over the `constrainedLabels` to check all are specified in the Pod.
The code has been slightly changed to make use of the previously populated `mapset.Set`.

## Testing the validation code

The unit tests and the end-to-end tests don't need any change, you can run them as before:

```console
make test
```

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
--- PASS: TestValidateLabel (0.00s)
PASS
ok      github.com/kubewarden/go-policy-template    0.002s
```

```console
make e2e-tests
```

```console
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

All the tests are working as expected.
