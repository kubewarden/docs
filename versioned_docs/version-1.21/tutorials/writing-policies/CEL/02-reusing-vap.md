---
sidebar_label: Reusing VAPs
title: Reusing ValidatingAdmissionPolicies
description: "Example: Reusing ValidatingAdmissionPolicies"
keywords:
  [kubewarden, kubernetes, writing policies, ValidatingAdmissionPolicies]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, cel, ValidatingAdmissionPolicies]
doc-persona: [kubewarden-policy-developer, kubewarden-operator]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/cel/resuing-vap"/>
</head>

Kubernetes vanilla [Validating
policies](https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy)
consist of the following resources:

- ValidatingAdmissionPolicy: describes the logic in CEL. It optionally accepts
  also parameters in `spec.paramKind`.
- ValidatingAdmissionPolicyBinding: scopes the policy.

Let's see a concrete example. These and others can be reused with Kubewarden's
`cel-policy` with little effort.

The following ValidatingAdmissionPolicy comes from the [Kubernetes
docs](https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/#creating-a-validatingadmissionpolicy).
This policy checks that the number of Replicas in Deployments is less or equal
to 5. It is bound with a ValidatingAdmissionPolicyBinding so it only affects
Namespaces that havel a label `environment` set to `test`.

### ValidatingAdmissionPolicy

```yaml {6,7,13,16,26,27}
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: "replicalimit-policy.example.com"
spec:
  failurePolicy: Fail # (1)
  matchConstraints: # (2)
    resourceRules:
      - apiGroups: ["apps"]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["deployments"]
  variables: # (3)
    - name: maxreplicas
      expression: int(5)
  validations: # (4)
    - expression: "object.spec.replicas <= variables.maxreplicas"
      messageExpression: "'the number of replicast must be less than or equal to ' + string(variables.maxreplicas)"
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "replicalimit-binding-test.example.com"
spec:
  policyName: "replicalimit-policy.example.com"
  validationActions: [Deny] # (5)
  matchResources: # (6)
    namespaceSelector:
      matchLabels:
        environment: test
```

Here we have an equivalent Kubewarden policy:

### Kubewarden's `cel-policy`

```yaml title="./cel-policy-example.yaml" {10,11,12,18,23,27}
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  annotations:
    io.kubewarden.policy.category: Resource validation # (7)
    io.kubewarden.policy.severity: low # (7)
  name: "cel-policy-replica-example"
spec:
  module: registry://ghcr.io/kubewarden/policies/cel-policy:v1.0.0
  failurePolicy: Fail # (1). Defaults to "Fail"
  mode: protect # (5). Defaults to "protect"
  rules: # (2)
    - apiGroups: ["apps"]
      apiVersions: ["v1"]
      operations: ["CREATE", "UPDATE"]
      resources: ["deployments"]
  settings:
    variables: # (3)
      - name: "replicas"
        expression: "object.spec.replicas"
      - name: maxreplicas
        expression: int(5)
    validations: # (4)
      - expression: "variables.replicas <= variables.maxreplicas"
        messageExpression: "'the number of replicast must be less than or equal to ' + string(variables.maxreplicas)"
  backgroundAudit: true # (7). Defaults to "true"
  namespaceSelector: # (6)
    matchLabels:
      environment: test
```

Notice the commented numbers on both the YAML manifests. Let's expand on them:

| #   | VAP field           | `cel-policy` field                    |                                                                                                                                                                                                                          |
| --- | ------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `failurePolicy`     | `failurePolicy`                       | Both inform on behaviour when the policy server errors. Not to confuse with (5).                                                                                                                                         |
| 2   | `matchConstraints`  | `rules`                               | Both accept the same [RuleWithOperations](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/#rulewithoperations-v1-admissionregistration) that informs on what kind of Resource the policy applies to. |
| 3   | `variables`         | `settings.variables`                  | In Kubewarden's `cel-policy`, expressions that define variables are separated into `settings.variables`. Apart from that, they are equivalent.                                                                           |
| 4   | `validations`       | `settings.validations`                | In Kubewarden's `cel-policy`, expressions that define validations are separated into `settings.validations`. Apart from that, they are equivalent.                                                                       |
| 5   | `validationActions` | `mode`                                | `mode` has as options `protect` and `monitor`. Auditing is more full featured in Kubewarden, see (7).                                                                                                                    |
| 6   | `matchResources`    | `namespaceSelector`, `objectSelector` | Define ways to constraint using Selectors. Kubewarden's policies have them as `namespaceSelector` and `objectSelector`.                                                                                                  |
| 7   | `auditAnnotations`  | `backgroundAudit`, annotations        | These Kubewarden fields set the policy usage in [Audit Scanner](../../../explanations/audit-scanner), and its category and severity for PolicyReports.                                                                   |
|     | `matchConditions`   | `matchConditions`                     | Kubewarden's policies have `matchConditions`.                                                                                                                                                                            |
|     | `---`               | Kubewarden-only features              | For other features, see the rest of tutorial CEL examples.                                                                                                                                                               |

:::tip
The `kwctl` tool can be used to migrate a VAP policy to Kubewarden.

This is described inside of [this howto](../../../howtos/vap-migration).
:::

### Yet to be implemented equivalences

There are some VAP features that aren't yet implemented. If look forward to them, please get in contact with us. These are:

- VAP [authorizer library](https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz).
- VAP [Parameters](https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/#parameter-resources)
  (ValidatingAdmissionPolicy `spec.paramKind` & ValidatingAdmissionPolicyBinding `spec.paramRef`).
- VAP [Audit Annotations](https://kubernetes.io/docs/reference/labels-annotations-taints/audit-annotations/)
  (ValidatingAdmissionPolicy `spec.auditAnnotations` when ValidatingAdmissionPolicyBinding `spec.validationActions` is set to "Audit").
  This is covered by Kubewarden's [Audit Scanner](../../../explanations/audit-scanner) and PolicyReports, which allows
  to audit resources already in the cluster.
- CEL [resource constraints and estimated cost
  limit](https://kubernetes.io/docs/reference/using-api/cel/#resource-constraints).
  This is partially covered by Kubewarden's general [policy timeout
  protection](../../../reference/policy-evaluation-timeout).

## Applying the policy

As normal, we can deploy our policy by instantiating its manifest:

```console
$ kubectl apply -f ./cel-policy-example.yaml
```

And then test it by instantiating a deployment:

```console
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: test
  labels:
    environment: test
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: test
spec:
  replicas: 6
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
EOF

namespace/test created
Error from server: error when creating "STDIN":
  admission webhook "clusterwide-cel-policy-replica-example.kubewarden.admission" denied the request:
  The number of replicas must be less than or equal to 5
```
