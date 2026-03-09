---
sidebar_label: Threat Model
sidebar_position: 80
title: Threat Model
description: The Kubernetes Admission Control Threat Model and Kubewarden.
keywords: [kubernetes, admission control threat model, kubewarden]
doc-persona: [kubewarden-all]
doc-type: [reference]
doc-topic: [security, threat-model]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/threat-model"/>
</head>

The
[Kubernetes Security Special Interest Group (SIG)](https://github.com/kubernetes/community/tree/master/sig-security)
has defined an Admission Control Threat Model for Kubernetes.
The Kubewarden team continuously evaluates Kubewarden against this threat model,
and works to provide secure defaults.
It's recommended that Kubewarden administrators read and understand the threat model,
and use it to devise their own circumstance specific threat model as needed.

Details about each threat is in the
[document published by SIG Security](https://github.com/kubernetes/sig-security/tree/main/sig-security-docs/papers/admission-control).

## Kubernetes threats

### Threat 1 - Attacker floods webhook with traffic preventing its operation

#### Scenario

An attacker who has access to the Webhook endpoint,
at the network level,
could send large quantities of traffic,
causing an effective denial of service to the admission controller.

#### Mitigation

Webhook fails closed.
if the webhook doesn't respond in time,
for any reason, the API server should reject the request.
This is Kubewarden's default behavior.

Failing closed means that if, for any reason,
Kubewarden stops responding or crashes,
the API server rejects the request by default.
This is even if the request is normally accepted by Kubewarden.

### Threat 2 - Attacker passes workloads which require complex processing causing timeouts

#### Scenario

An attacker, who can access the admission controller at a network level, passes
requests to the admission controller requiring complex processing and causing
timeouts as the admission controller uses compute power to process the workloads.

#### Mitigation

Webhook fails closed and authenticate callers.
This is Kubewarden's default behavior.

### Threat 3 - Attacker exploits misconfiguration of webhook to bypass

#### Scenario

An attacker, who has rights to create workloads in the cluster, is able to exploit
a misconfiguration to bypass the intended security control.

#### Mitigation

Regular reviews of webhook configuration can help catch issues.

### Threat 4 - Attacker has rights to delete or modify the Kubernetes webhook object

#### Scenario

An attacker who has Kubernetes API access, has sufficient privileges to delete
the webhook object in the cluster.

#### Mitigation

RBAC rights should be strictly controlled.

#### To-do

Most of RBAC isn't within the scope of the current discussion.
However, the following is coming, in due course, to help Kubewarden
users:

- Directions around the implementation of minimum RBAC features.
- Provision & documentation of a policy that detects and could block RBAC changes.

### Threat 5 - Attacker gets access to valid credentials for the webhook

#### Scenario

An attacker gains access to valid client credentials for the admission controller webhook.

#### Mitigation

Webhook fails closed.
This is Kubewarden's default behavior.

### Threat 6 - Attacker gains access to a cluster admin credential

#### Scenario

An attacker gains access to a cluster-admin level credential in the Kubernetes cluster.

#### Mitigation

N/A

### Threat 7 - Attacker sniffs traffic on the container network

#### Scenario

An attacker who has access to the container network is able to sniff traffic
between the API server and the admission controller webhook.

#### Mitigation

Since the webhook uses TLS encryption for all traffic, Kubewarden is safe.

### Threat 8 - Attacker carries out a MITM attack on the webhook

#### Scenario

An attacker on the container network, who has access to the NET_RAW capability,
can try to use MITM tooling to intercept traffic between the API server
and admission controller webhook.

#### Mitigation

Configure the cluster with mTLS authentication for the Webhooks and enable the mTLS feature in the
Kubewarden stack. Alternatively, setup mTLS using a CNI that supports Network Policies.
See ["Secure webhooks with mTLS"](./security-hardening/webhooks-hardening.md) for more information.

Use the
[capabilities-psp](https://artifacthub.io/packages/kubewarden/capabilities-psp/capabilities-psp)
policy and configure it to drop NET_RAW capabilities.

### Threat 9 - Attacker steals traffic from the webhook via spoofing

#### Scenario

An attacker is able to redirect traffic from the intended API server,
for the admission controller webhook, by spoofing.

#### Mitigation

Configure the cluster with mTLS authentication for the Webhooks and enable the mTLS feature in the
Kubewarden stack. Alternatively, setup mTLS using a CNI that supports Network Policies.
See [here](./security-hardening/webhooks-hardening.md) for more information.

### Threat 10 - Abusing a mutation rule to create a privileged container

#### Scenario

An attacker is able to cause a mutating admission controller to modify a workload,
such that it allows for privileged container creation.

#### Mitigation

Review and test all rules.

### Threat 11 - Attacker deploys workloads to namespaces that are exempt from admission control

#### Scenario

An attacker is able to deploy workloads to Kubernetes namespaces exempt
from the admission controller configuration.

#### Mitigation

RBAC rights are strictly controlled

#### To-do

Most of the RBAC is out of scope regarding this decision. However, the Kubewarden team aims to:

- Warn users via our docs and _suggest_ the minimum RBAC to be used.
- Provide a policy which detects RBAC changes and **perhaps** block them.

### Threat 12 - Block rule can be bypassed due to missing match (for example, missing initcontainers)

#### Scenario

An attacker created a workload manifest which uses a feature of the Kubernetes
API which isn't covered by the admission controller

#### Mitigation

Review and test all rules.
You should review PRs changing any rules in policies deployment.

### Threat 13 - Attacker exploits bad string matching on a blocklist to bypass rules

#### Scenario

An attacker, who has rights to create workloads, bypasses a rule by exploiting
bad string matching.

#### Mitigation

Review and test all rules.

#### To-do

Introduce tests to cover this rule.
As always, you should review PRs changing the rules in the policies deployment.

### Threat 14 - Attacker uses new/old features of the Kubernetes API which have no rules

#### Scenario

An attacker, with rights to create workloads, uses new features of the Kubernetes
API (for example, a changed API version) to bypass a rule.

#### Mitigation

All rules should be reviewed and tested. There is a policy that tests for the use of deprecated resources.
It's available from [the deprecated-api-versions-policy](https://github.com/kubewarden/deprecated-api-versions-policy).

Note: `deprecated-api-versions-policy` only deals with Custom Resources known to it.
The threat is both deprecated resource versions, and misuse of new unknown ones,
hence the policy only covers partof the problem.

### Threat 15 - Attacker deploys privileged container to node running Webhook controller

#### Scenario

An attacker, who has rights to deploy privileged containers to the cluster, creates
a privileged container on the cluster node where the admission controller webhook operates.

#### Mitigation

Admission controller uses restrictive policies to prevent privileged workloads.

### Threat 16 - Attacker mounts a privileged node hostpath allowing modification of Webhook controller configuration

#### Scenario

An attacker, who has rights to deploy hostPath volumes with workloads, creates a
volume that allows for access to the admission controller pod's files.

#### Mitigation

Deploy the `kubewarden-default` Helm chart and enable its
recommended policies, which includes the `hostpaths-psp` policy. This policy
is configured to reduce the shared hostPath volumes.

### Threat 17 - Attacker has privileged SSH access to cluster node running admission webhook

#### Scenario

An attacker is able to log into cluster nodes as a privileged user via SSH.

#### Mitigation

N/A

### Threat 18 - Attacker uses policies to send confidential data from admission requests to external systems

#### Scenario

An attacker is able to configure a policy that listens to admission requests and
sends sensitive data to an external system.

#### Mitigation

- Configure the cluster with mTLS authentication for the Webhooks and enable
  the mTLS feature in the Kubewarden stack. Alternatively, setup mTLS using a CNI
  that supports Network Policies.

- By default, Kubewarden policies don't have network access and run in a
  restrictive environment, strictly controlling external access on Webhooks.

## Kubewarden threats

### Kubewarden threat 1 - Bootstrapping of trust for admission controller

#### Scenario

Assuming a trusted but new Kubernetes cluster, an attacker is able to
compromise the Kubewarden stack before deployment and enforcement of any of the
policies securing it.

For example, by:

- using unsigned and malicious images for:
  - Kubewarden-controller
  - policy-server
  - any of the Kubewarden dependencies
  - any optional dependencies (Grafana, Prometheus, and others)
- by compromising the Helm charts payload

#### Mitigation

1. Kubewarden provides a Software Bill Of Materials, which lists all images needed. This aids with Zero-Trust.
   The Kubernetes Administrator must verify the Kubewarden images, its dependencies' images, and charts
   out of the Kubernetes cluster, in a trusted environment.
   You can do this with `cosign`, for example.
   Incidentally, this is part of the implementation needed for air-gapped installations.
2. Use signed Helm charts, and verified digests instead of tags for Kubewarden images in those Helm charts.
   This doesn't secure dependencies though.
