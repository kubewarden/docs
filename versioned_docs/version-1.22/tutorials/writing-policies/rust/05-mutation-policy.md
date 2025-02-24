---
sidebar_label: Creating a new mutation policy
title: Creating a new mutation policy
description: Creating a new mutation policy using Rust
keywords: [kubewarden, kubernetes, creating a new mutation policy, mutation policy, rust]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, rust, new-mutation-policy]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rust/mutation-policy"/>
</head>

Mutating policies are similar to validating ones,
but also have the ability to mutate an incoming object.

They can:

- Reject a request
- Accept a request without changing the incoming object
- Mutate the incoming object as they need to and accept the request

Writing a Kubewarden mutation policy is uncomplicated.
You'll use the validating policy created in the previous sections,
and with a few changes,
turn it into a mutating one.

Your policy uses the same validation logic defined before,
but it also adds an annotation to all the Pods that have a valid name.

Attempting to create a Pod like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

Leads to the creation of this Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    kubewarden.policy.demo/inspected: true
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

## Write the mutation code

The mutation code is in the `validate` function.
You should change this function to approve the request using
[`mutate_request`](https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.mutate_request.html)
instead of
[`accept_request`](https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.accept_request.html).

This is how the `validate` function in `lib.rs` should look:

```rust showLineNumbers
fn validate(payload: &[u8]) -> CallResult {
    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;

    info!(LOG_DRAIN, "starting validation");
    if validation_request.request.kind.kind != apicore::Pod::KIND {
        warn!(LOG_DRAIN, "Policy validates Pods only. Accepting resource"; "kind" => &validation_request.request.kind.kind);
        return kubewarden::accept_request();
    }

    match serde_json::from_value::<apicore::Pod>(validation_request.request.object) {
        // NOTE 1
        Ok(mut pod) => {
            let pod_name = pod.metadata.name.clone().unwrap_or_default();
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
                // NOTE 2
                let mut new_annotations = pod.metadata.annotations.clone().unwrap_or_default();
                new_annotations.insert(
                    String::from("kubewarden.policy.demo/inspected"),
                    String::from("true"),
                );
                pod.metadata.annotations = Some(new_annotations);

                // NOTE 3
                let mutated_object = serde_json::to_value(pod)?;
                kubewarden::mutate_request(mutated_object)
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

Compared to the previous code, you have made three changes:

1. We defined the `pod` object as mutable, see the `mut` keyword. This is needed because we will extend its `metadata.annotations` attribute. <!--TODO: How best to describe the use of clone(). -->
2. This is the code that takes the existing `annotations`,
adds the new one, and finally puts the updated `annotations` object back into the original `pod` instance.
3. Serialize the `pod` object into a generic `serde_json::Value` and then return a mutation response.

Having done these changes, it's time to run unit tests again:

```console
$ cargo test
   Compiling demo-a v0.1.0 (/home/jhk/projects/suse/tmp/demo)
    Finished test [unoptimized + debuginfo] target(s) in 0.95s
     Running unittests src/lib.rs (target/debug/deps/demo_a-634b88b0dcb6e707)

running 5 tests
test settings::tests::reject_settings_without_a_list_of_invalid_names ... ok
test settings::tests::accept_settings_with_a_list_of_invalid_names ... ok
test tests::accept_request_with_non_pod_resource ... ok
test tests::reject_pod_with_invalid_name ... ok
test tests::accept_pod_with_valid_name ... FAILED

failures:

---- tests::accept_pod_with_valid_name stdout ----
{"column":5,"file":"src/lib.rs","level":"info","line":34,"message":"starting validation","policy":"sample-policy"}
thread 'tests::accept_pod_with_valid_name' panicked at src/lib.rs:98:9:
Something mutated with test case: Pod creation with valid name
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::accept_pod_with_valid_name

test result: FAILED. 4 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

As you can see, the `accept_pod_with_valid_name` fails because the response contains a mutated object.
It looks like our code is working.

## Update the unit tests

You can update the `accept_pod_with_valid_name` in `lib.rs` to look like this:

```rust
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
    // NOTE 1
    assert!(
        res.mutated_object.is_some(),
        "Expected accepted object to be mutated",
    );

    // NOTE 2
    let final_pod =
        serde_json::from_value::<apicore::Pod>(res.mutated_object.unwrap()).unwrap();
    let final_annotations = final_pod.metadata.annotations.unwrap();
    assert_eq!(
        final_annotations.get_key_value("kubewarden.policy.demo/inspected"),
        Some((
            &String::from("kubewarden.policy.demo/inspected"),
            &String::from("true")
        )),
    );

    Ok(())
}
```

Compared to the first test, there are two changes:

1. Change the `assert!` statement so that the request is still accepted, but it also includes a mutated object
1. Created a `Pod` instance starting from the mutated object that's part of the response.
Assert the mutated Pod object has the right `metadata.annotations`.

Run the tests again, this time all shall pass:

```shell
$ cargo test
   Compiling demo-a v0.1.0 (/home/jhk/projects/suse/tmp/demo)
    Finished test [unoptimized + debuginfo] target(s) in 1.25s
     Running unittests src/lib.rs (target/debug/deps/demo_a-634b88b0dcb6e707)

running 5 tests
test settings::tests::accept_settings_with_a_list_of_invalid_names ... ok
test settings::tests::reject_settings_without_a_list_of_invalid_names ... ok
test tests::accept_request_with_non_pod_resource ... ok
test tests::reject_pod_with_invalid_name ... ok
test tests::accept_pod_with_valid_name ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

As you can see, the creation of a mutation policy is straightforward.
