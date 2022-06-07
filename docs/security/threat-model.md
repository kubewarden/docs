---
sidebar_label: "Threat Model"
title: ""
---

# Threat Model

The [Kubernetes SIG Security team](https://github.com/kubernetes/community/tree/master/sig-security) has
defined an Admission Control Threat Model. The Kubewarden team has evaluated
Kubewarden against this threat model, and strives to provide secure defaults
that cover it. Still, it is recommended for Kubewarden administrators to read
and understand the threat model, and use it to devise their own thread model as
needed.

If more details about each threat is needed, refer to the [original document published by SIG-security](https://github.com/kubernetes/sig-security/tree/main/sig-security-docs/papers/admission-control).


## Threat 1 - Attacker floods webhook with traffic preventing its operation

An attacker who has access to the Webhook endpoint, at the network level, could
send large quantities of traffic, causing an effective denial of service to the
admission controller.

**Mitigation**

Webhook fails closed. In other words, if the webhook does not respond in time,
for any reasion, API server should reject the request.
Kubewarden default behavior already does that.

## Threat 2 - Attacker passes workloads which require complex  processing causing timeouts

An attacker, who can access the admission controller at a network level, passes
requests to  the admission controller which require complex processing, causing
timeouts as the  admission controller uses compute power to process the workloads

**Mitigation**
Webhook fail closed and authenticate callers. Kubewarden default behaviour
already does that.

## Threat 3 - Attacker exploits misconfiguration of webhook to bypass
An attacker, who has rights to create workloads in the cluster, is able to exploit
a misconfiguration to bypass the intended security control

**Mitigation**
Regular reviews of webhook configuration catch issues.


### Threat 4 - Attacker has rights to delete or modify the k8s webhook  object

An attacker who has Kubernetes API access, has sufficient privileges to delete
the webhook object in the cluster.

**Mitigation**
RBAC rights are strictly controlled.

**To do**
Most of RBAC isn't within the scope of the current discussion. 
However, the following will be provided in due course for helping Kubewarden
users:
- Directions around minimum RBAC to be implemented.
- Provision & documentation of a policy that detects and could potentially block RBAC changes.


## Threat 5 - Attacker gets access to valid credentials for the webhook
An attacker gains access to valid client credentials for the admission controller webhook

**Mitigation**
Webhook fails closed.

Kubewarden default behaviour is failed closed. Thus, it covers this.

(Failing closed means that if, for any reason, Kubewarden stops responding or
crashes, the API server will reject the request by default, even if the request
would be accepted by Kubewarden in normal situations)

## Threat  6 - Attacker gains access to a cluster admin credential

An attacker gains access to a cluster-admin level credential in the kubernetes cluster.

**Mitigation**
N/A


## Threat 7 - Attacker sniffs traffic on the container network
An attacker who has access to the container network is able to sniff traffic
between the API  server and the admission controller webhook.

**Mitigation**
Since the webhook uses TLS encryption for all traffic, Kubewarden is safe.


## Threat 8 - Attacker carries out a MITM attack on the webhook
An attacker on the container network, who has access to the NET_RAW capability
can attempt to use MITM tooling to intercept traffic between the API server
and admission controller webhook.

**Mitigation**
Webhook mTLS authentication is used.

**To do**
Kubewarden should implement mutual TLS authentication
Additionally, within the recommended policies section in the `kubewarden-defaults` Helm
chart a policy to drop the `NET_RAW` capability could potentially be incorporated.

### Threat 9 - Attacker steals traffic from the webhook via spoofing
An attacker is able to redirect traffic from the API server which is intended
for the admission controller webhook by spoofing.

**Mitigation**
Webhook mTLS authentication is used.

**To do**
Kubewarden should implement mutual TLS authentication

### Threat 10 - Abusing a mutation rule to create a privileged container
An attacker is able to cause a mutating admission controller to modify a workload,
such that it allows for privileged container creation.

**Mitigation**
All rules are reviewed and tested.

**To do**
The Kubewarden team may come up with some tests to cover the review of these rules in the future.
In addition to the above, any change of rules during policies deployment must be carefully reviewed.

## Threat 11 - Attacker deploys workloads to namespaces that are  exempt from admission control
An attacker is able to deploy workloads to Kubernetes namespaces that are exempt
from the admission controller configuration.

**Mitigation**
RBAC rights are strictly controlled

**To do**
Most of the RBAC is not Kubewarden responsability. But still Kubewarden can:
- Warning users in our docs and *suggest* some minimum RBAC to be used.
- Provide a policy which detects RBAC changes and **maybe** block them.

## Threat ID 12 - Block rule can be bypassed due to missing match (e.g.  missing initcontainers)
An attacker created a workload manifest which uses a feature of the Kubernetes
API which is not covered by the admission controller

**Mitigation**
All rules are reviewed and tested.

**To do**
Introduce tests to cover this rule.
As always, carefully review PRs changing the rules in the policies deployment.

## Threat ID 13 - Attacker exploits bad string matching on a blocklist to  bypass rules
An attacker, who has rights to create workloads, bypasses a rule by exploiting
bad string matching.

**Mitigation**
All rules are reviewed and tested.

**To do**
Introduce tests to cover this rule.
As always, carefully review PRs changing the rules in the policies deployment.

## Threat ID 14 - Attacker uses new/old features of the Kubernetes API  which have no rules
An attacker, with rights to create workloads, uses new features of the Kubernetes
API (for  example a changed API version) to bypass a rule.

**Mitigation**
All rules are reviewed and tested.

**To do**
Introduce tests to cover this rule.
Create a configuration to reject by default requests where the API version not
cover by the policy. Kubewarden should warn policy developers to cover all the
supported API version in theirs tests and reject all of others.


## Threat ID 15 - Attacker deploys privileged container to node running  Webhook controller
An attacker, who has rights to deploy privileged containers to the cluster, creates
a privileged container on the cluster node where the admission controller webhook operates.

**Mitigation**
Admission controller uses restrictive policies to prevent privileged workloads.


## Threat ID 16 - Attacker mounts a privileged node hostpath allowing  modification of Webhook controller configuration
An attacker, who has rights to deploy hostPath volumes with workloads, creates a
volume that allows for access to the admission controller pod’s files.

**Mitigation**
Admission controller uses restrictive policies to prevent privileged  workloads

**To do**
Add a recommended policy in the `kubewarden-default` Helm chart to prevent this.


## Threat ID 17 - Attacker has privileged SSH access to cluster node  running admission webhook
An attacker is able to log into cluster nodes as a privileged user via SSH.

**Mitigation**
N/A

## Threat ID 18 - Attacker uses policies to send confidential data from  admission requests to external systems
An attacker is able to configure a policy that listens to admission requests and
sends sensitive data to an external system.

**Mitigation**
Strictly control external access for webhook

Kubewarden policies run in a restrictive environment. They do not have network access.


## Threat Kubewarden ID 1 - Bootstrapping of trust for admission controller
Assuming a trusted but fresh Kubernetes cluster, an attacker is able to compromise the Kubewarden stack 
before any of the policies securing it are deployed and enforced.  For example, by using unsigned and 
malicious images for kubewarden-controller, policy-server, or any of the Kubewarden dependencies 
(cert-manager) or optional dependencies (grafana, prometheus, etc.), or by compromising 
the Helm charts payload.

** Mitigation **
1. Kubewarden provides a Software Bill Of Materials, which lists all images needed. This aids with Zero-Trust.
  The Kubernetes Administrator must verify the Kubewarden images, its dependencies' images, and charts 
  out of the Kubernetes cluster, in a trusted environment. This can be done with `cosign`, for example.
  Incidentally, this is part of the implementation needed for air-gapped installations.
 2. Use signed Helm charts, and verified digests instead of tags for Kubewarden images in those Helm charts. 
 This doesn't secure dependencies though.
