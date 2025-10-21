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

### ValidatingAdmissionPolicy

The following ValidatingAdmissionPolicy is adapted from the [Kubernetes
docs](https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy/#creating-a-validatingadmissionpolicy).

This policy checks that the number of Replicas in Deployments is less or equal
to a default maxreplicas of 5. Users can override this default per Namespace or
Deployment and pick a smaller number via the use of a parameter.

It is bound with a ValidatingAdmissionPolicyBinding so it only affects
Namespaces that have a label `environment` set to `test`.

```yaml title="./vap-policy-example.yaml" {6,7,13,16,19,38,39,43}
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
    - name: maxReplicas # hardcoded global default
      expression: int(5)
  paramKind: # (4)
    apiVersion: v1
    kind: ConfigMap # user-provided override
  validations: # (5)
    - expression: |
        object.spec.replicas <= (
          params.data.overrideReplicas != null && params.data.overrideReplicas < variables.maxReplicas
          ? params.data.overrideReplicas
          : variables.maxReplicas
        )
      messageExpression: |
        'The number of replicas must be less than or equal to ' +
        string(params.data.overrideReplicas != null && params.data.overrideReplicas < variables.maxReplicas
          ? params.data.overrideReplicas
          : variables.maxReplicas)
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: "replicalimit-binding-test.example.com"
spec:
  policyName: "replicalimit-policy.example.com"
  validationActions: [Deny] # (7)
  matchResources: # (8)
    namespaceSelector:
      matchLabels:
        environment: test
  paramRef: # (4)
    name: "replica-limit-override"
    namespace: "test"
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: replica-limit-override
  namespace: test
data:
  overrideReplicas: "3"
```

Here we have an equivalent Kubewarden policy:

### Kubewarden's `cel-policy`

```yaml title="./cel-policy-example.yaml" {10,11,12,18,19,24,27,30,43}
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  annotations:
    io.kubewarden.policy.category: Resource validation # (9)
    io.kubewarden.policy.severity: low # (9)
  name: "cel-policy-replica-example"
spec:
  module: registry://ghcr.io/kubewarden/policies/cel-policy:v1.0.0
  failurePolicy: Fail # (6). Webhook behavior. Defaults to "Fail"
  mode: protect # (7). Defaults to "protect"
  rules: # (2)
    - apiGroups: ["apps"]
      apiVersions: ["v1"]
      operations: ["CREATE", "UPDATE"]
      resources: ["deployments"]
  settings:
    failurePolicy: Fail # (1). CEL behavior. Defaults to "Fail"
    variables: # (3)
      - name: "replicas"
        expression: "object.spec.replicas"
      - name: maxReplicas
        expression: int(5)
    paramKind: # (4)
      apiVersion: v1
      kind: ConfigMap # user-provided override
    paramRef: # (4)
      name: "replica-limit-override"
      namespace: "test"
    validations: # (5)
      - expression: |
          object.spec.replicas <= (
            params.data.overrideReplicas != null && params.data.overrideReplicas < variables.maxReplicas
            ? params.data.overrideReplicas
            : variables.maxReplicas
          )
        messageExpression: |
          'The number of replicas must be less than or equal to ' +
          string(params.data.overrideReplicas != null && params.data.overrideReplicas < variables.maxReplicas
            ? params.data.overrideReplicas
            : variables.maxReplicas)
  backgroundAudit: true # (9). Defaults to "true"
  namespaceSelector: # (8)
    matchLabels:
      environment: test
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: replica-limit-override
  namespace: test
data:
  overrideReplicas: "3"
```

Notice the commented numbers on both the YAML manifests. Let's expand on them:

| #   | VAP field                         | `cel-policy` field                       |                                                                                                                                                                                                                                                  |
| --- | --------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `failurePolicy`                   | `settings.failurePolicy`                 | CEL behavior, for when CEL expression evaluates to false, there's CEL runtime errors, or there's invalid or mis-configured CEL. For example, a CEL expression returning false, mising parameters, or missing variables. Not to confuse with (6). |
| 2   | `matchConstraints`                | `rules`                                  | Both accept the same [RuleWithOperations](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/#rulewithoperations-v1-admissionregistration) that informs on what kind of Resource the policy applies to.                         |
| 3   | `variables`                       | `settings.variables`                     | In Kubewarden's `cel-policy`, expressions that define variables are in `settings.variables`. Apart from that, they are equivalent.                                                                                                               |
| 4   | `paramKind`,`paramRef`            | `settings.paramKind`,`settings.paramRef` | In Kubewarden's `cel-policy`, parameter definitions are in `settings.paramKind`, `settings.paramRef`. Apart from that, they are equivalent.                                                                                                      |
| 5   | `validations`                     | `settings.validations`                   | In Kubewarden's `cel-policy`, expressions that define validations are in `settings.validations`. Apart from that, they are equivalent.                                                                                                           |
| 6   | `---`                             | `failurePolicy`                          | Webhook behavior, for Kubernetes API Webhook error or timeout, or for matchConditions evaluation. Not to confuse with (1).                                                                                                                       |
| 7   | `validationActions`               | `mode`                                   | `mode` has as options `protect` and `monitor`. Auditing is more full featured in Kubewarden, see (9).                                                                                                                                            |
| 8   | `matchResources`                  | `namespaceSelector`, `objectSelector`    | Define ways to constraint using Selectors. Kubewarden's policies have them as `namespaceSelector` and `objectSelector`.                                                                                                                          |
| 9   | `auditAnnotations` (not pictured) | `backgroundAudit`, annotations           | Use Kubewarden fields instead to set the policy usage in [Audit Scanner](../../../explanations/audit-scanner), and its category and severity for OpenReports.                                                                                    |
|     | `matchConditions`                 | `matchConditions`                        | Kubewarden's policies have `matchConditions` (not pictured in this example).                                                                                                                                                                     |
|     | `---`                             | Kubewarden-only features                 | For other features, see the rest of tutorial CEL examples.                                                                                                                                                                                       |

:::tip

You can use the `kwctl` tool to migrate a VAP policy to Kubewarden.

This [VAP migration how-to](../../../howtos/vap-migration) describes how to do
so.

:::

### Yet to be implemented equivalences

There are some VAP features that aren't yet implemented. If look forward to them, please get in contact with us. These are:

- VAP [authorizer library](https://pkg.go.dev/k8s.io/apiserver/pkg/cel/library#Authz).
- VAP [Audit Annotations](https://kubernetes.io/docs/reference/labels-annotations-taints/audit-annotations/)
  (ValidatingAdmissionPolicy `spec.auditAnnotations` when ValidatingAdmissionPolicyBinding `spec.validationActions` is set to "Audit").
  This is covered by Kubewarden's [Audit Scanner](../../../explanations/audit-scanner) and OpenReports, which allows
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
  The number of replicas must be less than or equal to 3
```
