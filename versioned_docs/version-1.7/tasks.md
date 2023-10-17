---
sidebar_label: "Common tasks"
title: "Common tasks"
description: Description of some common tasks undertaken after installing Kubewarden. Provides examples of these tasks using kwctl
keywords: [kubewarden, kubernetes, kwctl, policy, policyserver, clusteradmissionpolicy, admissionpolicy]
---

This describes tasks that can be performed after you [install Kubewarden](/quick-start.md#install) in your Kubernetes cluster.

Each task can be done separately; they are shown here in a logical ordering.

## Test Policies

Kubewarden has two tools to help you find policies and test them locally:

- [Artifact Hub](https://artifacthub.io/packages/search?kind=13&sort=relevance&page=1) using their package filter for Kubewarden policies.
- [`kwctl`](https://github.com/kubewarden/kwctl) CLI tool

### Artifact hub

Artifact hub hosts policies contributed by the community. For example, you can find substitutes to the [deprecated Kubernetes Pod Security Policies](https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future/), created by the Kubewarden developers.

As shown in the screenshot below, once you find a policy of interest, select the `Install` button and use `kwctl` to fetch the policy for your cluster.

![Artifact Hub](/img/tasks-artifact-hub.png)

:::note
Previously, Kubewarden policies could be found at the [Kubewarden Policy Hub](https://hub.kubewarden.io). This has been [retired](https://www.kubewarden.io/blog/2022/07/artifact-hub-supports-kubewarden/). Policies are now available from [https://artifacthub.io](https://artifacthub.io/packages/search?kind=13&sort=relevance&page=1).
:::

### `kwctl` CLI tool

`kwctl` is our CLI tool for policy authors and the cluster administrators to test policies before they are applied to the Kubernetes cluster.

This tool has a similar interface to the `docker` CLI tool.

#### Use cases

You can use `kwctl` to help in these scenarios:

*As a policy author*

- *End-to-end testing of your policy*: Test your policy against crafted Kubernetes requests and ensure your policy behaves as you expect. You can even test context-aware policies that require access to a running cluster.
- *Embed metadata in your Wasm module*: the binary contains annotations of the permissions it needs to be executed. You can inspect and modify these annotations with `kwctl`.
- *Publish policies to OCI registries*: The binary is a fully compliant OCI object and can be stored in OCI registries.

*As a cluster administrator*

- *Inspect remote policies*: Given a policy in an OCI registry or in an HTTP server, show all static information about the policy.
- *Dry-run of a policy in your cluster*: Test the policy against crafted Kubernetes requests and ensure the policy behaves as you expect given the input data you provide. You can even test context-aware policies that require access to a running cluster, also in a dry-run mode.
- *Generate initial `ClusterAdmissionPolicy` scaffolding for your policy*: Generate a `YAML` file with all the required settings, which can be applied to your Kubernetes cluster using `kubectl`.

#### Installation

`kwctl` binaries for the stable releases are available from the [GitHub repository](https://github.com/kubewarden/kwctl/releases).  To build `kwctl` from the GitHub [repo](https://github.com/kubewarden/kwctl), you will need a [Rust](https://www.rust-lang.org/tools/install) development environment.

#### Usage

You can list all the `kwctl` options and sub-commands by running the following command:

```shell
$ kwctl --help
kwctl 0.2.5
Kubewarden Developers <kubewarden@suse.de>
Tool to manage Kubewarden policies

USAGE:
    kwctl [OPTIONS] <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -v               Increase verbosity
    -V, --version    Print version information

SUBCOMMANDS:
    annotate       Add Kubewarden metadata to a WebAssembly module
    completions    Generate shell completions
    digest         Fetch the digest of its OCI manifest
    help           Print this message or the help of the given subcommand(s)
    inspect        Inspect Kubewarden policy
    policies       Lists all downloaded policies
    pull           Pulls a Kubewarden policy from a given URI
    push           Pushes a Kubewarden policy to an OCI registry
    rm             Removes a Kubewarden policy from the store
    run            Runs a Kubewarden policy from a given URI
    scaffold       Scaffold a Kubernetes resource or configuration file
    verify         Verify a Kubewarden policy from a given URI using Sigstore
```

Here are a few command usage examples:

- *List the policies*: lists all the policies stored in the local `kwctl` registry

  - Command: `kwctl policies`

- *Obtain the policy*: download and store the policy inside the local `kwctl` store

  - Command: `kwctl pull <policy URI>`

    ```shell
    $ kwctl pull registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9
  
    $ kwctl policies
    +--------------------------------------------------------------+----------+---------------+--------------+----------+
    | Policy                                                       | Mutating | Context aware | SHA-256      | Size     |
    +--------------------------------------------------------------+----------+---------------+--------------+----------+
    | registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 | no       | no            | 59e34f482b40 | 21.86 kB |
    +--------------------------------------------------------------+----------+---------------+--------------+----------+
    ```

- *Understand how the policy works*: inspect the policy metadata

  - Command: `kwctl inspect <policy URI>`

    ```shell
      $ kwctl inspect registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9
      Details
      title:              pod-privileged
      description:        Limit the ability to create privileged containers
      author:             Flavio Castelli
      url:                https://github.com/kubewarden/pod-privileged-policy
      source:             https://github.com/kubewarden/pod-privileged-policy
      license:            Apache-2.0
      mutating:           false
      context aware:      false
      execution mode:     kubewarden-wapc
      protocol version:   1

      Annotations
      io.kubewarden.kwctl 0.1.9

      Rules
      ────────────────────
      ---
      - apiGroups:
          - ""
        apiVersions:
          - v1
        resources:
          - pods
        operations:
          - CREATE
      ────────────────────

      Usage
      This policy doesn't have a configuration. Once enforced, it will reject
      the creation of Pods that have at least a privileged container defined.
    ```

- *Evaluate the policy*: Assess the policy and, if available, find the right configuration values to match your requirements.

  You will need some familiarity with the [Kubernetes REST APIs](https://kubernetes.io/docs/reference/).

  - Command: `kwctl run -r <"Kubernetes Admission request" file path> -s <"JSON document" file path> <policy URI>`

  - Scenario 1:

    - Request to be evaluated: Create a pod with no 'privileged' container

      ```shell
      $ kwctl run registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 -r unprivileged-pod-request.json
      {"uid":"C6E115F4-A789-49F8-B0C9-7F84C5961FDE","allowed":true,"status":{"message":""}}
      ```
  
    - Equivalent command with the policy binary downloaded:
  
      ```shell
      `$ kwctl run file://$PWD/pod-privileged-policy.wasm -r unprivileged-pod-request.json
      {"uid":"C6E115F4-A789-49F8-B0C9-7F84C5961FDE","allowed":true,"status":{"message":""}}
      ```
  
    - Result: The policy allows the request
  
  - Scenario 2:
  
    - Request to be evaluated: Create a pod with at least one 'privileged' container
  
    - Command:
  
      ```shell
      kwctl run registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 -r privileged-pod-request.json
      ```
  
    - Equivalent command with the policy binary downloaded: `kwctl run file://$PWD/pod-privileged-policy.wasm -r privileged-pod-request.json`
  
    - Output:
  
      ```json
      {"uid":"8EE6AF8C-C8C8-45B0-9A86-CB52A70EC50D","allowed":false,"status":{"message":"User 'kubernetes-admin' cannot schedule privileged containers"}}
      ```
  
    - Result: The policy denies the request
  
    For some more complex examples, see the blog post [Introducing `kwctl` to Kubernetes Administrators](https://www.kubewarden.io/blog/2021/06/kwctl-intro-for-kubernetes-administrators/).
  
## Enforce Policies

You enforce a policy by defining a `ClusterAdmissionPolicy` and then deploy it to your cluster using `kubectl`.

`kwctl` helps generate a `ClusterAdmissionPolicy` from the policy you want to enforce.

After you have generated the `ClusterAdmissionPolicy` and applied it to your cluster, you can follow the steps described in the [Quick Start](/quick-start.md#example-enforce-your-first-policy) below:

  - Generate the `ClusterAdmissionPolicy` from the policy `manifest` and save it to a file
  
    - Command: `kwctl scaffold manifest -t ClusterAdmissionPolicy <policy URI> > <"policy name".yaml>`

      ```shell
      $ kwctl scaffold manifest -t ClusterAdmissionPolicy registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9
      ---
      apiVersion: policies.kubewarden.io/v1alpha2
      kind: ClusterAdmissionPolicy
      metadata:
        name: privileged-pods
      spec:
        module: "registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9"
        settings: {}
        rules:
          - apiGroups:
              - ""
            apiVersions:
              - v1
            resources:
              - pods
            operations:
              - CREATE
        mutating: false
      ```
  
    :::tip
    By default, the `name` value is set to `generated-policy`.
    You might want to edit it before you deploy the `ClusterAdmissionPolicy`.
    The name in the immediately previous example has been set to `privileged-pods`.
    :::
  
  - Deploy the `ClusterAdmissionPolicy` to your Kubernetes cluster

    - Command: `kubectl apply -f <"policy name".yaml>`

      ```shell
      $ kubectl apply -f pod-privileged-policy.yaml
      clusteradmissionpolicy.policies.kubewarden.io/privileged-pods created
      ```

After the `ClusterAdmissionPolicy` is deployed, all requests sent to your cluster will be evaluated by the policy if they're within the policy scope.

## Next steps

- [Writing Policies](/writing-policies/) explains how to write policies in different languages and generate WebAssembly binaries, so they can be used by Kubewarden.

- [Distributing Policies](/distributing-policies/) explains how to publish policies to [OCI registries](https://github.com/opencontainers/distribution-spec/blob/main/spec.md).
