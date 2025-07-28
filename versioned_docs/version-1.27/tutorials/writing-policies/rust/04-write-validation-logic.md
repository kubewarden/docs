---
sidebar_label: Writing validation logic
title: Writing validation logic
description: Writing validation logic in Rust for a Kubewarden policy
keywords: [kubewarden, kubernetes, policy, writing, rust, validation logic]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, rust, validation-logic]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rust/write-validation-logic"/>
</head>

It's time to write the actual validation code.
It's defined in the `src/lib.rs` file.
In this file you can find a function called `validate`.

This is the scaffolding provided function:

```rust showLineNumbers
fn validate(payload: &[u8]) -> CallResult {
    // ➀
    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;

    info!(LOG_DRAIN, "starting validation");
    if validation_request.request.kind.kind != apicore::Pod::KIND {
        warn!(LOG_DRAIN, "Policy validates Pods only. Accepting resource"; "kind" => &validation_request.request.kind.kind);
        return kubewarden::accept_request();
    }
    // TODO: you can unmarshal any Kubernetes API type you are interested in
    // ➁
    match serde_json::from_value::<apicore::Pod>(validation_request.request.object) {
        Ok(pod) => {
            // TODO: your logic goes here
            // ➂
            if pod.metadata.name == Some("invalid-pod-name".to_string()) {
                let pod_name = pod.metadata.name.unwrap();
                info!(
                    LOG_DRAIN,
                    "rejecting pod";
                    "pod_name" => &pod_name
                );
                kubewarden::reject_request(
                    Some(format!("pod name {} is not accepted", &pod_name)),
                    None,
                    None,
                    None,
                )
            } else {
                info!(LOG_DRAIN, "accepting resource");
                kubewarden::accept_request()
            }
        }
        Err(_) => {
            // TODO: handle as you wish
            // We were forwarded a request we cannot unmarshal or
            // understand, just accept it
            warn!(LOG_DRAIN, "cannot unmarshal resource: this policy does not know how to evaluate this resource; accept it");
            // ➃
            kubewarden::accept_request()
        }
    }
}
```

Walking through the code listing:

- In the line marked ➀. Parse the incoming `payload` into a `ValidationRequest<Setting>` object.
This automatically populates the `Settings` instance inside the `ValidationRequest` with the parameters provided by the user.
- In the line marked ➁. Convert the Kubernetes raw JSON object embedded into the request into an instance of the
[Pod struct](https://arnavion.github.io/k8s-openapi/v0.25.x/k8s_openapi/api/core/v1/struct.Pod.html)
- In the line marked ➂. The request has a Pod object, the code approves only the requests that don't have `metadata.name` equal to the hard-coded value `invalid-pod-name`
- In the line marked ➃. The request doesn't contain a Pod object, hence the policy accepts the request.

As you can see, the code is already doing a validation that resembles the one you want to implement.
You just have to remove the hard-coded value and use the values provided by the user via the policy settings.

You can do by replacing the scaffolding `validate` function, in `src/lib.rs`, with this one:

```rust
fn validate(payload: &[u8]) -> CallResult {
    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;

    info!(LOG_DRAIN, "starting validation");
    if validation_request.request.kind.kind != apicore::Pod::KIND {
        warn!(LOG_DRAIN, "Policy validates Pods only. Accepting resource"; "kind" => &validation_request.request.kind.kind);
        return kubewarden::accept_request();
    }

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
                    None,
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

Finally, you can create unit tests to check the validation code works as
expected.

The `lib.rs` file already has tests defined at the bottom of the file, and as
you can see, Kubewarden's Rust SDK provides test helpers too.

Moreover, the scaffold project already ships with default
[test fixtures](https://en.wikipedia.org/wiki/Test_fixture#Software) in
the `test_data` directory. You are going to use of these recorded
admission requests to write your unit tests.

Change the contents of the test section at the end of `src/lib.rs` to look like this:

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

You now have three unit tests defined in `lib.rs`:

- `accept_pod_with_valid_name`: accepts a Pod with a valid name
- `reject_pod_with_invalid_name`: rejects a Pod with an invalid name
- `accept_request_with_non_pod_resource`: accept requests that don't have a `Pod` as an object

You can run the unit tests again:

```shell
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

That's all that's required if you need to write a simple validating policy.
