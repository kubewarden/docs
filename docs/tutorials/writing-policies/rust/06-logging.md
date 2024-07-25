---
sidebar_label: Logging
title: Logging
description: How to use logging functionality when writing a Kubewarden policy in Rust.
keywords: [Kubewarden, kubernetes, logging]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, rust, logging]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rust/logging"/>
</head>

You can have your policy perform logging.
The `policy-server` or `kwctl` forwards those log entries with the appropriate information.

The logging library chosen for the Rust SDK is
[`slog`](https://github.com/slog-rs/slog).
It's a popular, well known crate and integrates cleanly with Kubewarden.

## Initialize logger

The project recommends you create a global sink you can log to, from where needed in your policy.
For this, use the `lazy_static` crate:

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

Now, from within the `validate`, or `validate_settings` functions,
you can log using the macros exported by `slog` that match each supported logging level:

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

The `slog` library sends all logs to the drain initialized in the global variable.
This synchronizes to the policy evaluator executing the policy.
This is either `kwctl` or the `policy-server`.
Then the policy evaluator logs this information,
adding further known contextual information,
such as the Kubernetes request `uid`.

More information about the
[logging macros](https://docs.rs/slog/2.7.0/slog/macro.log.html)
offered by slog are in its
[documentation](https://docs.rs/slog/2.7.0/slog/index.html).
