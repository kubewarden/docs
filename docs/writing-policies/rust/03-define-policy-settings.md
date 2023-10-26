---
sidebar_label: "Defining policy settings"
title: "Defining policy settings"
description: Defining policy settings for a Kubewarden policy developed using Rust
keywords: [kubewarden, kubernetes, writing policies, policy settings, rust]
doc-type: [tutorial]
doc-topic: [writing-policies, rust, policy-settings]
---

<!--TODO:

These steps are not working for me. I get a few errors on

cargo test
cargo test
   Compiling demo v0.1.0 (/home/jhk/projects/suse/tmp/demo)
error[E0063]: missing field `invalid_names` in initializer of `settings::Settings`
  \-\-> src/lib.rs:80:23
   |
80 |             settings: Settings {},
   |                       ^^^^^^^^ missing `invalid_names`

Three of those errors. Any suggestions?

-->

## The policy settings structure

Firstly, define the structure that holds the policy settings.

Open the `demo/src/settings.rs` file and change the definition of the `Settings`
`struct` to look like:

```rust
use std::collections::HashSet;

#[derive(Deserialize, Default, Debug, Serialize)]
#[serde(default)]
pub(crate) struct Settings {
    pub invalid_names: HashSet<String>,
}
```

This automatically puts the list of invalid names in a Set collection.

## The settings validation function

Next, write a settings validation function to make sure the policy is always run with at least one invalid name.

You do this by changing the implementation of the `Validatable` trait.

Change the scaffolding implementation defined in `src/settings.rs` to look like:

```rust
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

## Add unit tests

Now you can write a unit test to make sure the settings validation is working.
You can do this in the [usual Rust way](https://doc.rust-lang.org/stable/book/ch11-00-testing.html).

There are already a few default tests at the bottom of the `src/settings.rs`
file. Replace the automatically generated code to look like that:

```rust
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

You can now run the unit tests by doing:

```shell
cargo test
```

This produces an output similar to the following one:

```shell
  Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)
    Finished test [unoptimized + debuginfo] target(s) in 4.19s
     Running target/debug/deps/demo-24670dd6a538fd72

running 2 tests
test settings::tests::accept_settings_with_a_list_of_invalid_names ... ok
test settings::tests::reject_settings_without_a_list_of_invalid_names ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```
