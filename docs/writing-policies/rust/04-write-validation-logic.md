---
sidebar_label: "Writing validation logic"
title: "Writing validation logic"
description: This tutorial covers writing validation logic for a Kubewarden policy being developed in Rust.
keywords: [kubewarden, kubernetes, policy development, rust, validation logic]
doc-type: [tutorial]
doc-topic: [writing-policies, rust, validation-logic]
---

You define validation code in the `src/lib.rs` file.
In this file there is a `validate` function.

The scaffolding has already inserted a function to use and adapt.

```rust
fn validate(payload: &[u8]) -> CallResult {
    // NOTE 1
    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;

    // NOTE 2
    match serde_json::from_value::<apicore::Pod>(validation_request.request.object) {
        Ok(pod) => {
            // NOTE 3
            if pod.metadata.name == Some("invalid-pod-name".to_string()) {
                kubewarden::reject_request(
                    Some(format!("pod name {:?} is not accepted", pod.metadata.name)),
                    None,
                )
            } else {
                kubewarden::accept_request()
            }
        }
        Err(_) => {
            // NOTE 4
            // We were forwarded a request we cannot unmarshal or
            // understand, just accept it
            kubewarden::accept_request()
        }
    }
}
```

This code performs the following operations:

1. Parses the incoming `payload` into a `ValidationRequest<Setting>` object.
This populates the `Settings` instance inside of `ValidationRequest` with the parameters from the user.
1. Converts the Kubernetes raw JSON object, embedded into the request, into an instance of the
[Pod struct](https://arnavion.github.io/k8s-openapi/v0.11.x/k8s_openapi/api/core/v1/struct.Pod.html)
1. If the request has a Pod object, the code approves only the requests that don't have `metadata.name` equal to the hard-coded value `invalid-pod-name`
1. If the request doesn't contain a Pod object, the policy accepts the request

As you can see the code is already doing a validation that resembles the one required.
You need to remove the hard-coded value instead using the values, provided by the caller, in the policy settings.

You do this with the following code:

```rust
fn validate(payload: &[u8]) -> CallResult {
    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;

    match serde_json::from_value::<apicore::Pod>(validation_request.request.object) {
        Ok(pod) => {
            let pod_name = pod.metadata.name.unwrap_or_default();
            if validation_request
                .settings
                .invalid_names
                .contains(&pod_name)
            {
                kubewarden::reject_request(
                    Some(format!("pod name {:?} is not accepted", pod_name)),
                    None,
                )
            } else {
                kubewarden::accept_request()
            }
        }
        Err(_) => {
            // We were forwarded a request we cannot unmarshal or
            // understand, just accept it
            kubewarden::accept_request()
        }
    }
}
```

## Unit tests

Now, you need to create unit tests to check the validation code works as
expected.

The `lib.rs` file already tests defined at the bottom of the file and, as
you can see, Kubewarden's Rust SDK provides test helpers too.

Moreover, the scaffolding ships with default [test fixtures](https://en.wikipedia.org/wiki/Test_fixture#Software) in the `test_data` directory.
<!--TODO: Is that the right word, 'recorded'?-->
You can use the recorded admission requests to write your unit tests.

Change the contents of the test section inside of `src/lib.rs` to look like that:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    use kubewarden_policy_sdk::test::Testcase;
    use std::collections::HashSet;

    #[test]
    fn accept_pod_with_valid_name() -> Result<(), ()> {
        let mut invalid_names = HashSet::new();
        invalid_names.insert(String::from("bad_name1"));
        let settings = Settings { invalid_names };

        let request_file = "test_data/pod_creation.json";
        let tc = Testcase {
            name: String::from("Pod creation with valid name"),
            fixture_file: String::from(request_file),
            expected_validation_result: true,
            settings,
        };

        let res = tc.eval(validate).unwrap();
        assert!(
            res.mutated_object.is_none(),
            "Something mutated with test case: {}",
            tc.name,
        );

        Ok(())
    }

    #[test]
    fn reject_pod_with_invalid_name() -> Result<(), ()> {
        let mut invalid_names = HashSet::new();
        invalid_names.insert(String::from("nginx"));
        let settings = Settings { invalid_names };

        let request_file = "test_data/pod_creation.json";
        let tc = Testcase {
            name: String::from("Pod creation with invalid name"),
            fixture_file: String::from(request_file),
            expected_validation_result: false,
            settings,
        };

        let res = tc.eval(validate).unwrap();
        assert!(
            res.mutated_object.is_none(),
            "Something mutated with test case: {}",
            tc.name,
        );

        Ok(())
    }

    #[test]
    fn accept_request_with_non_pod_resource() -> Result<(), ()> {
        let mut invalid_names = HashSet::new();
        invalid_names.insert(String::from("prod"));
        let settings = Settings { invalid_names };

        let request_file = "test_data/ingress_creation.json";
        let tc = Testcase {
            name: String::from("Ingress creation"),
            fixture_file: String::from(request_file),
            expected_validation_result: true,
            settings,
        };

        let res = tc.eval(validate).unwrap();
        assert!(
            res.mutated_object.is_none(),
            "Something mutated with test case: {}",
            tc.name,
        );

        Ok(())
    }
}
```

You now have three unit tests defined inside of this file:

- `accept_pod_with_valid_name`: ensures acceptance of a Pod with a valid name
- `reject_pod_with_invalid_name`: ensures rejection a Pod with an invalid name
- `accept_request_with_non_pod_resource`: ensures the policy accepts request without  a `Pod` as object

You can run the unit tests again:

```console
$ cargo test
   Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)
    Finished test [unoptimized + debuginfo] target(s) in 3.45s
     Running target/debug/deps/demo-24670dd6a538fd72

running 5 tests
test settings::tests::accept_settings_with_a_list_of_invalid_names ... ok
test settings::tests::reject_settings_without_a_list_of_invalid_names ... ok
test tests::accept_request_with_non_pod_resource ... ok
test tests::accept_pod_with_valid_name ... ok
test tests::reject_pod_with_invalid_name ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

That's all that's needed for writing a simple validating policy.
