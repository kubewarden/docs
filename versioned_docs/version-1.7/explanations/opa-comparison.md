---
sidebar_label: "Kubewarden vs OPA Gatekeeper"
title: "Kubewarden vs OPA Gatekeeper"
---

:::info
This page has been written during August 2023. Both projects might have evolved
since then.

If you find something is missing or inaccurate, please
[file an issue](https://github.com/kubewarden/docs/)
or open a PR using the link at the bottom of the page.
:::

Both OPA Gatekeeper and Kubewarden are open source projects, and part of CNCF.

This table provides a comparison between OPA Gatekeeper and Kubewarden. Topics requiring more information have links to further explanation.

|                                                       | OPA Gatekeeper              | Kubewarden                       |
| ----------------------------------------------------- | --------------------------- | -------------------------------- |
| Validation                                            | ✅                          | ✅                               |
| Mutation                                              | ✅                          | ✅                               |
| Policy language [[1]](#writing-policies)              | Rego                        | Rego, Go, Rust,...               |
| Context aware [[2]](#context-aware)                   | ✅                          | ✅                               |
| Kubernetes integration [[3]](#kubernetes-integration) | cluster wide CRD            | cluster wide and namespaced CRDs |
| Policy distribution [[4]](#policy-distribution)       | embedded into Kubernetes CR | Container registry               |
| CI/CD integration [[5]](#cicd-integration)            | ✅                          | ✅                               |
| Policy enforcement modes                              | deny, warn                  | deny, warn                       |
| Deployment mode [[6]](#deployment-mode)               | single evaluation server    | multiple evaluation servers      |
| Background checks [[7]](#background-checks)           | ✅                          | ✅                               |

## Types of policies

Both OPA Gatekeeper and Kubernetes can write validation and mutation policies.

These policies can target any kind of Kubernetes resource, including Custom Resources.

## Writing policies

OPA Gatekeeper policies are written using [Rego](https://www.openpolicyagent.org/docs/latest/#rego).
Rego is a query language created by the Open Policy Agent project.

:::info
Rego can only be used to write validating policies. Mutating policies do not
use Rego, instead using ad-hoc rules defined in YAML (see [here](https://open-policy-agent.github.io/gatekeeper/website/docs/mutation)).
:::

Kubewarden allows policies to be written using different paradigms. Policy authors
can use both traditional programming languages (like Go, Rust and others) or [Domain Specific Languages](https://en.wikipedia.org/wiki/Domain-specific_language) like Rego.
Kubewarden's validating and mutating policies are written in the same way.

:::caution
Rego is used by the [kube-mgmt](https://github.com/open-policy-agent/kube-mgmt)
open source project, which is part of the Open Policy Agent project.

Despite using the same language, policies written for kube-mgmt are
not compatible with OPA Gatekeeper and vice versa.

Kubewarden can use Rego policies that have been written for both Open Policy Agent and
for OPA Gatekeeper. More information is [here](https://docs.kubewarden.io/writing-policies/rego/intro-rego).
:::

## Context aware

Sometimes a policy needs data about the current state of the cluster to make a
validation/mutation decision. For example, a policy validating Ingress resources might
need to know the other Ingress resources already defined inside of the cluster
to ensure no clashes happen.
These kind of policies are called "context aware".

Both OPA Gatekeeper and Kubewarden support these types of policies.

When deploying OPA Gatekeeper, a Kubernetes administrator decides which type of
cluster data should be made available to the policies at evaluation time.

It's important to highlight how this data is then accessible by all the policies
deployed.

For example, if an OPA Gatekeeper policy requires access to Kubernetes Secrets,
all the other policies being deployed will be able to read this data as well.

On the other hand, Kubewarden provides a granular access to cluster resources.
Each policy has access only to the resources that the Kubernetes administrator
specified. Attempting to read unauthorized data is immediately blocked and
reported to the cluster administrators.

## Kubernetes integration

OPA Gatekeeper has a cluster wide Custom Resource that allows policy definition
and how and where to enforce them.

Kubewarden has two different types of Custom Resources used
to declare policies. One works at the Cluster level, the other is namespaced.
The namespaced Custom Resource is called `AdmissionPolicy`.

Policies deployed via a `AdmissionPolicy` resource affect only the resources
created within the Namespace they belong to.
Because of that, non-admin Kubernetes users could be allowed
the RBAC privileges to manage `AdmissionPolicy` resources inside of the
Namespaces they have access to.

This allows Kubernetes administrators to delegate some policy-related work.

## Policy distribution

The source code of the policy (the Rego code) has to be written inside
the Custom Resource that defines a policy inside Kubernetes.

Kubewarden policies are managed like container images. Once built, they are pushed
into container registries as OCI artifacts.

Kubewarden policies can be signed and verified using container image tools
like `cosign`, from the [Sigstore project](https://sigstore.dev).

Kubewarden policies can be distributed among geographically distributed container
registries using the traditional tools and processes adopted for container images.

## CI/CD integration

Both OPA Gatekeeper and Kubewarden can be managed using GitOps methodologies.

However, in the context of OPA Gatekeeper, there's a coupling between the policy's source code
(the Rego code) and the Custom Resource used to deploy it inside of Kubernetes.
This introduces extra steps inside of CI/CD pipelines.

Rego has [testing tools](https://www.openpolicyagent.org/docs/latest/policy-testing/)
that allow the creation of unit test suites. Writing tests and executing them inside
a CI/CD pipeline is essential to ensure policies behave as expected.

To use these testing tools, the source code of the policy must be made available
inside of dedicated text files. It's not possible to read the source code from the YAML
files used to declare the OPA Gatekeeper policy.
The CI/CD pipeline must keep in sync the Rego source code being tested with the code
defined inside of the OPA Gatekeeper Custom Resource. This can be done using some 3rd
party tools.

Kubewarden policies have CI/CD pipelines like traditional microservices.
Usually their source code lives inside a Git repository and then, using
traditional CI/CD systems, unit tests are ran against it. The unit tests are
written using the testing frameworks of the language used to write the policy.
Once all the tests pass the policy is compiled to WebAssembly and pushed
to a container registry.
This kind of pipeline is usually maintained by the policy author.

Kubernetes administrators typically maintain other automation pipelines that react to
new releases of the policy (leveraging automation tools like
[Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot),
[Renovate bot](https://www.mend.io/renovate/),
[updatecli](https://www.updatecli.io/) and others), or to changes to the
policy configuration.

The pipeline tests the policy against different types of requests. The testing can be done using
the [kwctl](https://github.com/kubewarden/kwctl) cli tool, without requiring a running
Kubernetes cluster. kwctl uses the same evaluation engine used by the Kubewarden stack deployed
inside of a Kubernetes cluster.

## Policy enforcement modes

Both OPA Gatekeeper and Kubewarden can deploy policies using two different operation modes:

- `deny`: violation of a policy causes the request to be rejected
- `warn`: violation of a policy does not cause rejection. The
  violation is logged for auditing purposes

## Deployment mode

All the OPA Gatekeeper policies are evaluated by the same server.
On the other hand, Kubewarden allows multiple evaluation servers to be defined.
These servers are defined by a Custom Resource called `PolicyServer`.

When declaring a Kubewarden policy, the Kubernetes administrator decides
which `PolicyServer` will host it.

:::note
The `PolicyServer` object is a high level abstraction introduced by Kubewarden.
Behind the scenes a `Deployment` with a specific replica size is created.

Each `PolicyServer` can have a different replica size from others.
:::

This allows interesting scenarios like the following ones:

- Deploy critical policies to a dedicated Policy Server pool
- Deploy the policies of a noisy tenant to a dedicated Policy Server pool

## Background checks

As policies are added, removed, and reconfigured the resources already inside
of the cluster might become non-compliant.

Both OPA Gatekeeper and Kubewarden have a scanner that operates in the background.
This scanner evaluates resources already defined inside
the cluster and flags non-compliant ones.

The only difference between OPA Gatekeeper and Kubewarden is how the scanner results
are saved.

OPA Gatekeeper adds the violation details to the `status` field of a given `Constraint`
Custom Resource (see [here](https://open-policy-agent.github.io/gatekeeper/website/docs/audit#constraint-status)).

Kubewarden instead stores the results inside of a set of the Policy Report
Custom Resources defined by the [Policy Report working group](https://github.com/kubernetes-sigs/wg-policy-prototypes/tree/master/policy-report).
