# Common Tasks

This page lists a set of tasks that can be performed after you [install Kubewarden](/quick-start.html#install) in your Kubernetes cluster.

Each task can be done separately; however, if you're not familiar with Kubewarden, or Kubernetes policies in general, we recommend that you follow the tasks below in sequential order.

## Test Policies

Kubewarden has two main tools to help you find policies and test them locally:

- [Kubewarden Policy Hub](https://hub.kubewarden.io/)
- [`kwctl`](https://github.com/kubewarden/kwctl) CLI tool

### Kubewarden Policy Hub

The Kubewarden Policy Hub hosts a set of pre-made policies that are created by the Kubewarden developers. These policies are based on the current set of [Kubernetes Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

As shown in the picture below, once you find the policy to be tested, you can copy the registry path<sup>1</sup> or download<sup>2</sup> the `WASM` binary containing the policy and additional metadata:

![Kubewarden Policy Hub](/images/tasks-policy-hub.png)

Once you have the policy `WASM` binary or the registry path, you can test it with `kwctl`.

### `kwctl` CLI tool

`kwctl` is a Command Line Interface (CLI) tool that will allow both the policy authors and the cluster administrators to test policies before they are applied to the Kubernetes cluster.

The user experience (UX) of this tool is intended to be as easy and intuitive as possible. Think of it as the `docker` CLI tool if you were working with containers.

#### Use cases

Depending on your role, `kwctl` will help you in the following non-exhaustive scenarios:

*As a policy author*

- *End-to-end testing of your policy*: Test your policy against crafted Kubernetes requests and ensure your policy behaves as you expect. You can even test context-aware policies that require access to a running cluster.
- *Embed metadata in your Wasm module*: the binary is annotated with the permissions it needs to execute
- *Publish policies to OCI registries*: The binary is a fully compliant OCI object and can be stored in OCI registries.

*As a cluster administrator*

- *Inspect remote policies*: given a policy in an OCI registry, or in an HTTP server, show all static information about the policy.
- *Dry-run of a policy in your cluster*: test the policy against crafted Kubernetes requests, and ensure the policy behaves as you expect given the input data you provide. You can even test context-aware policies, that require access to a running cluster, also in a dry-run mode.
- *Generate initial `ClusterAdmissionPolicy` scaffolding for your policy*: generates a `YAML` file with all the required settings, which can be applied to your Kubernetes cluster using `kubectl`

#### Installation

`kwctl` binaries, for the stable releases, are directly available from the [GitHub repository](https://github.com/kubewarden/kwctl/releases).

> **NOTE**: If you want to build `kwctl` from the development branch, you need to install [Rust](https://www.rust-lang.org/tools/install). And for building `kwctl`, please refer to the `Build kwctl from source` section in the [GitHub repo](https://github.com/kubewarden/kwctl).

#### Usage

As stated above, `kwctl` will allow you to perform an end-to-end testing of the policies.

You can list all the `kwctl` options and subcommandes by running the following command:

```shell
$ kwctl --help
kwctl 0.2.4
Flavio Castelli <fcastelli@suse.com>:Rafael Fernández López <rfernandezlopez@suse.com>
Tool to manage Kubewarden policies

USAGE:
    kwctl [FLAGS] <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information
    -v               Increase verbosity

SUBCOMMANDS:
    annotate       Add Kubewarden metadata to a WebAssembly module
    completions    Generate shell completions
    help           Prints this message or the help of the given subcommand(s)
    inspect        Inspect Kubewarden policy
    manifest       Scaffold a Kubernetes resource
    policies       Lists all downloaded policies
    pull           Pulls a Kubewarden policy from a given URI
    push           Pushes a Kubewarden policy to an OCI registry
    rm             Removes a Kubewarden policy from the store
    run            Runs a Kubewarden policy from a given URI
    verify         Verify a Kubewarden policy from a given URI using Sigstore
```

Here are few examples of the commands you should run, depending on the task you want to perform:

- *List the policies*: lists all the policies stored in the local `kwctl` registry

  - Command: `kwctl policies`

- *Obtain the policy*: download and store the policy inside the local `kwctl` registry

  - Command: `kwctl pull <policy URI>`
  - Example:

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
  - Example:

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

- *Evaluate the policy*: assess the policy and, if available, find the right configuration values to match your requirements

  > NOTE: Familiarity with [Kubernetes REST APIs](https://kubernetes.io/docs/reference/) is a prerequisite.

  - Command: `kwctl run -r <"Kubernetes Admission request" file path> -s <"JSON document" file path> <policy URI>`

    - Command breakdown:

      | Required | Option         | Description                                                  | Comment                                                      |
      | :--------: | -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
      | ✅        | `-r`           | Path to a file containing the Kubernetes Admission Request to be evaluated | Unfortunately, obtaining Kubernetes Admission Requests requires some extra work. This is a “Kubernetes problem”, we plan to address it in the near future |
      | -        | `-s`           | Path to a file containing the policy's settings              | It's also possible to use `--settings-json` followed by the settings in JSON format |
      | ✅        | `<policy URI>` | URI pointing to the policy to be used                        | The supported schemes are: registry://, https://, file://    |

  - Scenario 1:

    - Request to be evaluated: Create a pod with no 'privileged' container

    - Example:

      ```shell
      $ kwctl run registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 -r unprivileged-pod-request.json
      {"uid":"C6E115F4-A789-49F8-B0C9-7F84C5961FDE","allowed":true,"status":{"message":""}}
      ```
  
      - Equivalent command with the policy binary downloaded:
  
         ```shell
        `$ kwctl run file://$PWD/pod-privileged-policy.wasm -r unprivileged-pod-request.json
        {"uid":"C6E115F4-A789-49F8-B0C9-7F84C5961FDE","allowed":true,"status":{"message":""}}
        ```
  
    - Result: The policy allowes the request
  
  - Scenario 2:
  
    - Request to be evaluated: Create a pod with at least one 'privileged' container
  
    - Command: 
  
      ```
      kwctl run registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 -r privileged-pod-request.json
      ```
  
      - Equivalent command with the policy binary downloaded: `kwctl run file://$PWD/pod-privileged-policy.wasm -r privileged-pod-request.json`
  
    - Output:
  
      ```json
      {"uid":"8EE6AF8C-C8C8-45B0-9A86-CB52A70EC50D","allowed":false,"status":{"message":"User 'kubernetes-admin' cannot schedule privileged containers"}}
      ```
  
    - Result: The policy denies the request
  
    > **INFO**: if you want to see a more complex example, you can read this Kubewarden blog post: [Introducing `kwctl` to Kubernetes Administrators](https://www.kubewarden.io/blog/2021/06/kwctl-intro-for-kubernetes-administrators/)
  
## Enforce Policies

As described in the [Quick Start](/quick-start.html#example-enforce-your-first-policy), you can enforce a policy by defining a `ClusterAdmissionPolicy` and then deploy it to your cluster using `kubectl`.

`kwctl` will help to generate a `ClusterAdmissionPolicy` from the policy you want to enforce. 

After you have generated the `ClusterAdmissionPolicy` and applied it to your Kubernetes cluster, you can follow the steps described in the [Quick Start](/quick-start.md#example-enforce-your-first-policy) below:

  - Generate the `ClusterAdmissionPolicy` from the policy `manifest` and save it to a file
  
    - Command: `kwctl manifest -t ClusterAdmissionPolicy <policy URI> > <"policy name".yaml>`
    - Example:
    
    ```shell
    $ kwctl manifest -t ClusterAdmissionPolicy registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9
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
  
    > TIP: By default, the `name` value is set to `generated-policy`. You might want to edit it before you deploy the `ClusterAdmissionPolicy`. 
    >
    > NOTE: To avoid confusion, the value above has been set to `privileged-pods`.
  
  - Deploy the `ClusterAdmissionPolicy` to your Kubernetes cluster

    - Command: `kubectl apply -f <"policy name".yaml>`
    - Example:
    
    ```shell
    $ kubectl apply -f pod-privileged-policy.yaml
    clusteradmissionpolicy.policies.kubewarden.io/privileged-pods created
    ```

Once the `ClusterAdmissionPolicy` deployed, the requests sent to your Kubernetes cluster will be evaluated by the policy, if they're within the policy scope.

## Next steps

### Write Policies

The section [Writing Policies](/writing-policies/) explains how to write policies in different languages and how to export them into Webassembly that can be interpreted by Kubewarden.

### Distribute Policies

The [Distributing Policies](/distributing-policies/) section explains how to publish policies to [OCI registries](https://github.com/opencontainers/distribution-spec/blob/main/spec.md).