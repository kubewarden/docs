---
sidebar_label: Logging
sidebar_position: 060
title: Logging
description: A tutorial introduction to logging when using Go to write a Kubewarden policy.
keywords: [kubewarden, kubernetes, writing policies, golang, go, logging]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, golang, logging]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/go/logging"/>
</head>

The Go SDK integrates with the
[`onelog`](https://github.com/francoispqt/onelog)
project, almost out of the box.
<!--TODO: Last release 2019. Still good?-->

The project has chosen this library as:

- It works with WebAssembly binaries.
Other popular logging solutions can't compile to target WebAssembly.
- It provides [good performance](https://github.com/francoispqt/onelog#benchmarks).
- It supports structured logging.

## Initialize logger

You need to initialize a logger structure.
By performing this initialization in a global variable,
you can log from the two main policy entry points: `validate` and
`validate_settings`.

In the main package, `main.go` there is initialization for the logger:

```go
var (
    logWriter = kubewarden.KubewardenLogWriter{}
    logger    = onelog.New(
        &logWriter,
        onelog.ALL, // shortcut for onelog.DEBUG|onelog.INFO|onelog.WARN|onelog.ERROR|onelog.FATAL
    )
)
```

## Consuming the logger

Now, you can use the `logger` object to log from wherever required your policy:

```go
func validate(payload []byte) ([]byte, error) {
    // ...
    logger.Info("validating request")
    // ...
}
```

You can add structured logging:

```go
func validate(payload []byte) ([]byte, error) {
    // ...
    logger.WarnWithFields("logging something important", func(e onelog.Entry) {
        e.String("one_field", "a value")
        e.String("another_field", "another value")
    })
    // ...
}
```

You can refer to the
[`onelog` documentation](https://pkg.go.dev/github.com/francoispqt/onelog?utm_source=godoc)
for more information.

Policy logging goes to the policy evaluator
(for example, `kwctl` or `policy-server`),
and they log on behalf of the policy.
They use mechanisms that are interoperable with other components that enable distributed tracing such as
[Jaeger](https://www.jaegertracing.io/).
