---
sidebar_label: "Logging"
title: ""
---

# Logging

The Go SDK integrates with the [`onelog`](https://github.com/francoispqt/onelog) project almost out
of the box. The reasons why this library has been chosen are:

- It works with WebAssembly binaries. Other popular logging solutions cannot even be built to
  WebAssembly.

- It provides [good performance](https://github.com/francoispqt/onelog#benchmarks).

- It supports structured logging.

## Initialize logger

You first have to initialize a logger structure. By performing this initialization in a global
variable, you can easily log from the two main policy entry points: `validate` and
`validate_settings`. Let's initialize this structure in our main package:

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

Now, we can use the `logger` object to log from wherever we need in our policy:

```go
func validate(payload []byte) ([]byte, error) {
	// ...
	logger.Info("validating request")
	// ...
}
```
Let's add some structured logging:

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

You can refer to the [`onelog`
documentation](https://pkg.go.dev/github.com/francoispqt/onelog?utm_source=godoc) for more
information.

The logging produced by the policy will be sent to the policy evaluator (`kwctl` or `policy-server`
for example), and they will log on behalf of the policy using mechanisms that are easily pluggable
to other components that enable distributed tracing, such as Jaeger.