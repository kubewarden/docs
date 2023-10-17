---
sidebar_label: "Creating a new mutation policy"
title: ""
---

# Creating a new mutation policy

Mutating policies are similar to validating ones, but have also the ability to mutate an
incoming object.

They can:

  * Reject a request
  * Accept a request without doing any change to the incoming object
  * Mutate the incoming object as they like and accept the request

Writing a Kubewarden mutation policies is extremely simple. We will use the validating
policy created inside of the previous steps and, with very few changes, turn it into a
mutating one.

Our policy will use the same validation logic defined before, but it will also add
an annotation to all the Pods that have a valid name.

Attempting to create a Pod like that:

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

Will lead to the creation of this Pod:

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

The mutation code is done inside of the `validate` function. The function should be changed
to approve the request via the [`mutate_request`](https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.mutate_request.html)
instead of the [`accept_request`](https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.accept_request.html).

This is how the `validate` function has to look like:

```rust
fn validate(payload: &[u8]) -> CallResult {
    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;

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

Compared to the previous code, we made only three changes:

  1. We defined the `pod` object as mutable, see the `mut` keyword. This is
    needed because we will extend its `metadata.annotations` attribute
  2. This is the actual code that takes the existing `annotations`, adds the
    new one, and finally puts the updated `annotations` object back into the original
    `pod` instance
  3. Serialize the `pod` object into a generic `serde_json::Value` and then return
    a mutation response

Having done these changes, it's time to run the unit tests again:

```shell
$ cargo test
   Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)
    Finished test [unoptimized + debuginfo] target(s) in 4.53s
     Running target/debug/deps/demo-24670dd6a538fd72

running 5 tests
test settings::tests::reject_settings_without_a_list_of_invalid_names ... ok
test settings::tests::accept_settings_with_a_list_of_invalid_names ... ok
test tests::reject_pod_with_invalid_name ... ok
test tests::accept_pod_with_valid_name ... FAILED
test tests::accept_request_with_non_pod_resource ... ok

failures:

---- tests::accept_pod_with_valid_name stdout ----
thread 'tests::accept_pod_with_valid_name' panicked at 'Something mutated with test case: Pod creation with valid name', src/lib.rs:74:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::accept_pod_with_valid_name

test result: FAILED. 4 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

As you can see, the `accept_pod_with_valid_name` fails because the response actually
contains a mutated object. It looks like our code is actually working!

## Update the unit tests

Let's update the `accept_pod_with_valid_name` to look like that:

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
        serde_json::from_str::<apicore::Pod>(res.mutated_object.unwrap().as_str()).unwrap();
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

Compared to the initial test, we made only two changes:

  1. Change the `assert!` statement to ensure the request is still accepted,
    but it also includes a mutated object
  2. Created a `Pod` instance starting from the mutated object that is part of
    the response. Assert the mutated Pod object contains the right
    `metadata.annotations`.

We can run the tests again, this time all of them will pass:

```shell
$ cargo test
   Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)
    Finished test [unoptimized + debuginfo] target(s) in 2.61s
     Running target/debug/deps/demo-24670dd6a538fd72

running 5 tests
test settings::tests::reject_settings_without_a_list_of_invalid_names ... ok
test settings::tests::accept_settings_with_a_list_of_invalid_names ... ok
test tests::accept_request_with_non_pod_resource ... ok
test tests::reject_pod_with_invalid_name ... ok
test tests::accept_pod_with_valid_name ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

As you can see the creation of a mutation policy is pretty straightforward.
