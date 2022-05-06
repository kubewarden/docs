---
sidebar_label: "Defining Policy Settings"
title: ""
---

# Defining policy settings

As a first step we will define the structure that holds the policy settings.

Open the `src/settings.rs` file and change the definition of the `Settings`
struct to look like that:

```rust
use std::collections::HashSet;

#[derive(Deserialize, Default, Debug, Serialize)]
#[serde(default)]
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

Now we can write a unit test to ensure the settings validation is actually working.
This can be done in the [usual Rust way](https://doc.rust-lang.org/stable/book/ch11-00-testing.html).

There are already some default tests at the bottom of the `src/settings.rs`
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
