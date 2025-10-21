---
sidebar_label: Kubewarden vs OPA Gatekeeper
title: Kubewarden vs OPA Gatekeeper
description: A brief comparison of the difference between Kubewarden and OPA Gatekeeper.
keywords: [kubewarden, kubernetes, opa gatekeeper, comparison]
doc-persona: [kubewarden-all]
doc-type: [explanation]
doc-topic: [explanations, kubewarden-vs-opa_gatekeeper]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/explanations/comparisons/opa-comparison"/>
</head>

:::info
This page is from August 2023. Both projects may have evolved
since then.

If you find something is missing or inaccurate, please
[file an issue](https://github.com/kubewarden/docs/)
or open a PR using the link at the bottom of the page.
:::

Both OPA Gatekeeper and Kubewarden are open source projects, and part of CNCF.

This table provides a comparison between OPA Gatekeeper and Kubewarden. Topics
requiring more information have links to further explanation.

|                                                       | OPA Gatekeeper              | Kubewarden                                               |
| ----------------------------------------------------- | --------------------------- | -------------------------------------------------------- |
| Validation                                            | ✅                          | ✅                                                       |
| Mutation                                              | ✅                          | ✅                                                       |
| Policy language [[1]](#writing-policies)              | Rego                        | Rego, CEL, Go, Rust,...                                  |
| Context aware [[2]](#context-aware)                   | ✅                          | ✅                                                       |
| Kubernetes integration [[3]](#kubernetes-integration) | cluster wide CRD            | cluster wide and namespaced CRDs                         |
| Policy distribution [[4]](#policy-distribution)       | embedded into Kubernetes CR | Container registry, or embedded into Kubernetes CR (CEL) |
| CI/CD integration [[5]](#cicd-integration)            | ✅                          | ✅                                                       |
| Policy enforcement modes                              | deny, warn                  | deny, warn                                               |
| Deployment mode [[6]](#deployment-mode)               | single evaluation server    | multiple evaluation servers                              |
| Background checks [[7]](#background-checks)           | ✅                          | ✅                                                       |

## Types of policies

Both OPA Gatekeeper and Kubernetes can write validation and mutation policies.

These policies can target any kind of Kubernetes resource, including Custom
Resources.

## Writing policies

You write OPA Gatekeeper policies using
[Rego](https://www.openpolicyagent.org/docs/latest/#rego). Rego is a query
language created by the Open Policy Agent project.

:::info

You can only use Rego to write validating policies. Mutating policies don't
use Rego, instead using ad-hoc rules defined in YAML (see
[here](https://open-policy-agent.github.io/gatekeeper/website/docs/mutation)).

:::

You can write Kubewarden policies using different paradigms. Policy
authors can use both traditional programming languages (like Go, Rust and
others) or [Domain Specific
Languages](https://en.wikipedia.org/wiki/Domain-specific_language) like Rego
and CEL. In Kubewarden, you write validating and mutating policies the same
way.

:::caution

The [kube-mgmt](https://github.com/open-policy-agent/kube-mgmt) open source
project, part of the Open Policy Agent project, uses Rego.

Despite using the same language, policies written for kube-mgmt aren't
compatible with OPA Gatekeeper and vice versa.

Kubewarden can use Rego policies written for both Open Policy
Agent and for OPA Gatekeeper. More information is
[here](https://docs.kubewarden.io/tutorials/writing-policies/rego/intro-rego).

:::

## Context aware

Sometimes a policy needs data about the current state of the cluster to make a
validation or mutation decision. For example, a policy validating Ingress
resources might need to know other Ingress resources already defined in
the cluster to ensure no clashes happen. These kind of policies are called
"context aware".

Both OPA Gatekeeper and Kubewarden support these types of policies.

When deploying OPA Gatekeeper, a Kubernetes administrator decides which type of
cluster data to make available to policies at evaluation time.

It's important to highlight how this data is then accessible by all the
policies deployed.

For example, if an OPA Gatekeeper policy requires access to Kubernetes Secrets,
all the other policies deployed are able to read this data as well.

Conversely, Kubewarden provides a granular access to cluster resources.
Each policy has access only to the resources that the Kubernetes administrator
specifies. Attempting to read unauthorized data is immediately blocked and
reported to the cluster administrators.

## Kubernetes integration

OPA Gatekeeper has a cluster wide Custom Resource, permitting policy definition,
and how and where to enforce them.

Kubewarden has two different types of Custom Resources used to declare
policies. One works at the Cluster level, the other is namespaced. The name of
the namespaced Custom Resource is `AdmissionPolicy`.

Policies deployed via a `AdmissionPolicy` resource affect only the resources
created within the namespace they belong to. Because of that, you can allow
non-admin Kubernetes users to have the RBAC privileges necessary to manage
`AdmissionPolicy` resources, in the namespaces they can access.

This allows Kubernetes administrators to delegate policy-related work.

## Policy distribution

OPA Gatekeeper and Kubewarden policies have policy source code (Rego for OPA
Gatekeeper, CEL for Kubewarden) in the Custom Resource defining a policy in
Kubernetes.

Also, Kubewarden policies can have the source code of the policy managed like
container images (for Rego, Go, Rust, ...). Once built, they're pushed into
container registries as OCI artifacts.

You can sign and verify Kubewarden policies using container image tools like
`cosign`, from the [Sigstore project](https://sigstore.dev).

You can distribute Kubewarden policies among geographically distributed
container registries using the traditional tools and processes adopted for
container images.

## CI/CD integration

Both OPA Gatekeeper and Kubewarden are managed using GitOps methodologies.

However, for OPA Gatekeeper, there's a coupling between the
policy's Rego code and the Custom Resource used to deploy it
in Kubernetes. This introduces extra steps in CI/CD pipelines.

Rego has
[testing tools](https://www.openpolicyagent.org/docs/latest/policy-testing/)
allowing the creation of unit test suites. Writing tests and executing them in
a CI/CD pipeline is essential to ensure policies behave as expected.

To use these testing tools, the source code of the policy must be available in
dedicated text files. It's impossible to read the source code from the YAML
files used to declare the OPA Gatekeeper policy. The CI/CD pipeline must
synchronize the Rego source code to test with the code defined in the
OPA Gatekeeper Custom Resource. You can do this using third party tools.

Kubewarden policies have CI/CD pipelines like traditional microservices.
Usually their source code lives in a Git repository and then, using traditional
CI/CD systems, unit tests run against it. You write unit tests using the
testing frameworks of the language used to write the policy. Once all the tests
pass, you compile the policy to WebAssembly and push it to a container
registry. This kind of pipeline is usually maintained by the policy author.

Kubernetes administrators typically maintain other automation pipelines that
react to new releases of the policy (using automation tools like
[Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot),
[Renovate bot](https://www.mend.io/renovate/),
[updatecli](https://www.updatecli.io/) and others), or to changes to the policy
configuration.

The pipeline tests the policy against different types of requests. You can do
the testing using the [`kwctl`](https://github.com/kubewarden/kwctl) CLI tool,
without requiring a running Kubernetes cluster. kwctl uses the same evaluation
engine used by the Kubewarden stack deployed in a Kubernetes cluster.

## Policy enforcement modes

Both OPA Gatekeeper and Kubewarden can deploy policies using two different
operation modes:

- `deny`: violation of a policy rejects the request.
- `warn`: violation of a policy doesn't cause rejection. You can log violation
  for auditing purposes.

## Deployment mode

The same server evaluates all the OPA Gatekeeper policies. Conversely,
Kubewarden allows definition of multiple evaluation servers. You define these
servers by a Custom Resource called `PolicyServer`.

When declaring a Kubewarden policy, the Kubernetes administrator decides which
`PolicyServer` hosts it.

:::note

The `PolicyServer` object is a high level abstraction introduced by Kubewarden.
Behind the scenes a `Deployment` with a specific replica size gets created.

Each `PolicyServer` can have a different replica size from others.

:::

This allows interesting scenarios like the following ones:

- Deploy critical policies to a dedicated Policy Server pool.
- Deploy the policies of a noisy tenant to a dedicated Policy Server pool.

## Background checks

As policies are added, removed, and reconfigured the resources already in
the cluster might become non-compliant.

Both OPA Gatekeeper and Kubewarden have a scanner that operates in the background.
This scanner evaluates resources already defined in
the cluster and flags non-compliant ones.

The only difference between OPA Gatekeeper and Kubewarden is how the scanner
results get saved.

OPA Gatekeeper adds the violation details to the `status` field of a given
`Constraint` Custom Resource (see
[here](https://open-policy-agent.github.io/gatekeeper/website/docs/audit#constraint-status)).

Kubewarden instead stores the results in a set of the Reports
Custom Resources defined by [openreports.io](https://openreports.io).
