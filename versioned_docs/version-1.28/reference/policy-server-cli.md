---
sidebar_label: Policy Server CLI Reference
sidebar_position: 121
title: Policy Server CLI
description: Policy Server CLI reference documentation
keywords: [cli, reference, policy-server]
doc-persona: [kubewarden-operator]
doc-type: [reference]
doc-topic: [operator-manual]
---
# Command-Line Help for `policy-server`

This document contains the help content for the `policy-server` command-line program.

**Command Overview:**

* [`policy-server`](#policy-server)
* [`policy-server docs`](#policy-server-docs)

## `policy-server`



**Usage:** `policy-server [OPTIONS] [COMMAND]`

###### **Subcommands:**

* `docs` — Generates the markdown documentation for policy-server commands

###### **Options:**

* `--addr <BIND_ADDRESS>` — Bind against ADDRESS

  Default value: `0.0.0.0`
* `--always-accept-admission-reviews-on-namespace <NAMESPACE>` — Always accept AdmissionReviews that target the given namespace
* `--cert-file <CERT_FILE>` — Path to an X.509 certificate file for HTTPS
* `--client-ca-file <CLIENT_CA_FILE>` — Path to an CA certificate file that issued the client certificate. Required to enable mTLS
* `--daemon` — If set, runs policy-server in detached mode as a daemon
* `--daemon-pid-file <DAEMON-PID-FILE>` — Path to the PID file, used only when running in daemon mode

  Default value: `policy-server.pid`
* `--daemon-stderr-file <DAEMON-STDERR-FILE>` — Path to the file holding stderr, used only when running in daemon mode
* `--daemon-stdout-file <DAEMON-STDOUT-FILE>` — Path to the file holding stdout, used only when running in daemon mode
* `--disable-timeout-protection` — Disable policy timeout protection
* `--docker-config-json-path <DOCKER_CONFIG>` — Path to a Docker config.json-like path. Can be used to indicate registry authentication details
* `--enable-metrics` — Enable metrics
* `--enable-pprof` — Enable pprof profiling
* `--ignore-kubernetes-connection-failure` — Do not exit with an error if the Kubernetes connection fails. This will cause context-aware policies to break when there's no connection with Kubernetes.
* `--key-file <KEY_FILE>` — Path to an X.509 private key file for HTTPS
* `--log-fmt <LOG_FMT>` — Log output format

  Default value: `text`

  Possible values: `text`, `json`, `otlp`

* `--log-level <LOG_LEVEL>` — Log level

  Default value: `info`

  Possible values: `trace`, `debug`, `info`, `warn`, `error`

* `--log-no-color` — Disable colored output for logs
* `--policies <POLICIES_FILE>` — YAML file holding the policies to be loaded and their settings

  Default value: `policies.yml`
* `--policies-download-dir <POLICIES_DOWNLOAD_DIR>` — Download path for the policies

  Default value: `.`
* `--policy-timeout <MAXIMUM_EXECUTION_TIME_SECONDS>` — Interrupt policy evaluation after the given time

  Default value: `2`
* `--port <PORT>` — Listen on PORT

  Default value: `3000`
* `--readiness-probe-port <READINESS_PROBE_PORT>` — Expose readiness endpoint on READINESS_PROBE_PORT

  Default value: `8081`
* `--sigstore-cache-dir <SIGSTORE_CACHE_DIR>` — Directory used to cache sigstore data

  Default value: `sigstore-data`
* `--sources-path <SOURCES_PATH>` — YAML file holding source information (https, registry insecure hosts, custom CA's...)
* `--verification-path <VERIFICATION_CONFIG_PATH>` — YAML file holding verification information (URIs, keys, annotations...)
* `--workers <WORKERS_NUMBER>` — Number of worker threads to create



## `policy-server docs`

Generates the markdown documentation for policy-server commands

**Usage:** `policy-server docs --output <FILE>`

###### **Options:**

* `-o`, `--output <FILE>` — path where the documentation file will be stored



<hr/>

<small><i>
    This document was generated automatically by
    <a href="https://crates.io/crates/clap-markdown"><code>clap-markdown</code></a>.
</i></small>
