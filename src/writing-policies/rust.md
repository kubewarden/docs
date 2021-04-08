# Rust

[Rust](https://www.rust-lang.org/) is the most mature programming language that
can generate WebAssembly modules: WebAssembly is a first-class citizen
in the Rust world. That means many of the tools and crates of the Rust
ecosystem work out of the box.

Kubewarden provides a [Rust SDK](https://crates.io/crates/kubewarden-policy-sdk)
that simplifies the process of writing policies, plus a
[template project](https://github.com/kubewarden/policy-rust-template) to
quickly scaffold a policy project using the
[`cargo-generate`](https://github.com/cargo-generate/cargo-generate) utility.

This document illustrates how to take advantage of these projects to write
Kubewarden policies using the Rust programming language.

Note well, we won't cover the details of Kubewarden's Rust SDK inside of this
page. These can be found inside of the
[official crate documentation](https://docs.rs/kubewarden-policy-sdk/0.1.0).

## Getting Rust dependencies

This section guides you through the process of installing the Rust compiler and
its dependencies.

As a first step install the Rust compiler and its tools, this can be easily done
using [rustup](https://github.com/rust-lang/rustup). Please follow
[rustup's install documentation](https://rust-lang.github.io/rustup/installation/index.html).

Once `rustup` is installed add the Wasm target:

```shell
rustup target add wasm32-unknown-unknown
```
 
Finally, install the [cargo-generate](https://github.com/cargo-generate/cargo-generate) utility:

```shell
cargo install cargo-generate
```

## Creating a new validation policy

We are going to create a simple validation policy that processes
Pod creation requests.

The policy will look at the `metadata.name` attribute of the Pod and reject
the pods that have an invalid name. We want the list of invalid names to be
configurable by the end users of the policy.

To summarize, the policy settings will look like that:

```yaml
invalid_names:
- bad_name1
- bad_name2
```

The policy will accept the creation of a Pod like the following one:

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

While it will reject the creation of a Pod like the following one:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: bad_name1
spec:
  containers:
    - name: nginx
      image: nginx:latest
```

### Scaffolding new policy project

The creation of a new policy project can be done by feeding this
[template project](https://github.com/kubewarden/policy-rust-template)
into `cargo generate`:

```shell
cargo generate --git https://github.com/kubewarden/policy-rust-template \
               --branch main \
               --name demo
```

The command will produce the following output:

```
🔧   Creating project called `demo`...
✨   Done! New project created /home/flavio/hacking/kubernetes/kubewarden/demo
```

The new policy project can now be found inside of the `demo` directory.

### Defining policy settings

As a first step we will define the structure that holds the policy settings.

Open the `src/settings.rs` file and change the definition of the `Settings`
struct to look like that:

```rust,norun,noplayground
use std::collections::HashSet;

#[derive(Deserialize, Default, Debug, Serialize)]
pub(crate) struct Settings {
    pub invalid_names: HashSet<String>,
}
```

This will automatically put the list of invalid names inside of
a Set collection.

Next we will write a settings validation function: we want to ensure
the policy is always run with at least one invalid name.

This can be done by changing the implementation of the `Validatable` trait.

Change the scaffolded implementation defined inside of `src/settings.rs`
to look like that:

```rust,norun,noplayground
impl kubewarden::settings::Validatable for Settings {
    fn validate(&self) -> Result<(), String> {
        if self.invalid_names.is_empty() {
            Err(String::from("No invalid name specified. Specify at least one invalid name to match"))
        } else {
            Ok(())
        }
    }
}
```

Now we can write a unit test to ensure the settings validation is actually working.
This can be done in the [usual Rust way](https://doc.rust-lang.org/stable/book/ch11-00-testing.html).

There are already some default tests at the bottom of the `src/settings.rs`
file. Replace the automatically generated code to look like that:

```rust,norun,noplayground
#[cfg(test)]
mod tests {
    use super::*;

    use kubewarden_policy_sdk::settings::Validatable;

    #[test]
    fn accept_settings_with_a_list_of_invalid_names() -> Result<(), ()> {
        let mut invalid_names = HashSet::new();
        invalid_names.insert(String::from("bad_name1"));
        invalid_names.insert(String::from("bad_name2"));

        let settings = Settings { invalid_names };

        assert!(settings.validate().is_ok());
        Ok(())
    }

    #[test]
    fn reject_settings_without_a_list_of_invalid_names() -> Result<(), ()> {
        let invalid_names = HashSet::<String>::new();
        let settings = Settings { invalid_names };

        assert!(settings.validate().is_err());
        Ok(())
    }
}
```

We can now run the unit tests by doing:

```shell
cargo test
```

This will produce an output similar to the following one:

```shell
  Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)
    Finished test [unoptimized + debuginfo] target(s) in 4.19s
     Running target/debug/deps/demo-24670dd6a538fd72

running 2 tests
test settings::tests::accept_settings_with_a_list_of_invalid_names ... ok
test settings::tests::reject_settings_without_a_list_of_invalid_names ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

### Writing the validation business logic

It's time to write the actual validation code. This is defined inside of the
`src/lib.rs` file. Inside of this file you will find a function called `validate`.


The scaffolded function is already doing something:

```rust,norun,noplayground
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

This is a walk-through the code described above:

  1. Parse the incoming `payload` into a `ValidationRequest<Setting>` object. This
    automatically populates the `Settings` instance inside of `ValidationRequest` with
    the params provided by the user.
  2. Convert the Kubernetes raw JSON object embedded into the request
    into an instance of the [Pod struct](https://arnavion.github.io/k8s-openapi/v0.11.x/k8s_openapi/api/core/v1/struct.Pod.html)
  3. The request contains a Pod object, the code approves only the requests
    that do not have `metadata.name` equal to the hard-coded value `invalid-pod-name`
  4. The request doesn't contain a Pod object, hence the policy accepts the request

As you can see the code is already doing a validation that resembles the one we
want to implement. We just have to get rid of the hard-coded value and use the
values provided by the user via the policy settings.

This can be done with the following code:

```rust,norun,noplayground
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

Finally, we will create some unit tests to ensure the validation code works as
expected.

The `lib.rs` file has already some tests defined at the bottom of the file, as
you can see Kubewarden's Rust SDK provides some test helpers too.

Moreover, the scaffolded project already ships with some default
[test fixtures](https://en.wikipedia.org/wiki/Test_fixture#Software) inside of
the `test_data` directory. We are going to take advantage of these recorded
admission requests to write our unit tests.

Change the contents of the test section inside of `src/lib.rs` to look like that:

```rust,norun,noplayground
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

We now have three unit tests defined inside of this file:

  * `accept_pod_with_valid_name`: ensures a Pod with a valid
    name is accepted
  * `reject_pod_with_invalid_name`: ensures a Pod with an invalid
    name is rejected
  * `accept_request_with_non_pod_resource`: ensure the policy accepts
    request that do not have a `Pod` as object

We can run the unit tests again:

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

That's all if you want to write a simple validating policy.

## Creating a new mutation policy

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

### Write the mutation code

The mutation code is done inside of the `validate` function. The function should be changed
to approve the request via the [`mutate_request`](https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.mutate_request.html)
instead of the [`accept_request`](https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.accept_request.html).

This is how the `validate` function has to look like:

```rust,norun,noplayground
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
                kubewarden::mutate_request(&mutated_object)
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

Let's update the `accept_pod_with_valid_name` to look like that:

```rust,norun,noplayground
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

## Building the policy

So far we have built the policy using as a compilation target the same operating
system and architecture of our development machine.

It's now time to build the policy as a WebAssembly binary, also known as `.wasm`
file.

This can be done with a simple command:

```shell
make build
```

This command will build the code in release mode, with WebAssembly as
compilation target.

The build will produce the following file:

```shell
$ file target/wasm32-unknown-unknown/release/demo.wasm
target/wasm32-unknown-unknown/release/demo.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)
```

## Distributing the policy

This topic is covered inside of the ["distributing policies"](/distributing-policies.html)
section of Kubewarden's documentation.

## More examples

You can find more Kubewarden policies written in Rust inside of Kubewarden's
GitHub space. [This query](https://github.com/search?l=Rust&q=topic%3Apolicy-as-code+org%3Akubewarden&type=Repositories)
can help you find them.

**Worth of note:** these repositories have a series of GitHub Actions that automate
the following tasks:

  * Run unit tests and code linting on pull requests and after code is merged
    into the main branch
  * Build the policy in `release` mode and push it to a OCI registry as an
    artifact
