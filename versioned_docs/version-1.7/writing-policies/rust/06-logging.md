---
sidebar_label: "Logging"
title: ""
---

# Logging

You can perform logging in your policy, so the `policy-server` or `kwctl` will forward those log
entries with the appropriate information.

The logging library chosen for the Rust SDK is [`slog`](https://github.com/slog-rs/slog), as it is a
well known crate and integrates in a very straightforward way with Kubewarden.

## Initialize logger

We recommend that you create a global sink where you can log from where you need within your policy. For this, we will use the `lazy_static` crate:

```rust
use slog::{o, Logger};

lazy_static! {
    static ref LOG_DRAIN: Logger = Logger::root(
        logging::KubewardenDrain::new(),
        o!("policy" => "sample-policy")
    );
}
```

## Consuming the logger

Now, from within our `validate`, or `validate_settings` functions, we are able to log using the macros exported by `slog` that match each supported logging level:

```rust
use slog::{info, o, warn, Logger};

fn validate(payload: &[u8]) -> CallResult {
    // ...
    info!(LOG_DRAIN, "starting validation");
    // ...
    warn!(
        LOG_DRAIN, "structured log";
        "some_resource_name" => &some_resource_name
    );
    // ...
}
```

The `slog` library will send all logs to the drain we initialized in the global variable, that will
get sinked to the policy evaluator executing the policy, `kwctl` or the `policy-server`. Then the
policy evaluator will log this information, adding more contextual information it knows about, such
as the Kubernetes request `uid`.

More information about the [logging macros](https://docs.rs/slog/2.7.0/slog/macro.log.html) offered
by slog can be found inside of [its documentation](https://docs.rs/slog/2.7.0/slog/index.html).