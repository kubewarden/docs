---
sidebar_label: Validate charts with kwctl
title: Validate Helm charts with kwctl
description: An introduction to testing Kubewarden policies for policy authors.
keywords: [kubewarden, kwctl, helm, charts, continuous integration]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [tutorial]
doc-topic: [using-kubewarden-in-ci, kwctl, compliance]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/validate-charts-with-kwctl"/>
</head>

With the `kwctl` CLI tool, you can run Kubewarden policies against rendered
Helm charts outside of the cluster. This is a performant and effective way to
shift left on your security and compliance checks, as you can validate the Helm
charts without needing to deploy them nor have a K8s cluster. Let's see how.

## Prerequisites

You need:

- A Helm chart to validate. We will use the `opentelemetry-collector` Helm
  chart as an example.
- A list of Kubewarden policies to enforce. For example, the recommended policies
  installed with the `kubewarden-defaults` Helm chart.
- `kwctl` >= `1.28`.
- `yq` >= `4`, `awk` for splitting template files.

## Rendering the Helm chart

Rendering the Helm chart is as simple as using Helm as intended.

First, we obtain our Helm chart under test:

```console
$ helm pull open-telemetry/opentelemetry-collector --version 0.134.1 --untar
$ cd opentelemetry-collector
```

Once we have our chart, we can render it against whatever set of Helm Values
we desire. This is useful as we can test against several possible deployment
options.

The opentelemetry-collector Helm chart, like many Helm charts, has obligatory
Values that need to be set for install or upgrade. For this example, let's
go with the following:

```yaml
---
# our-values.yaml
image:
repository: "otel/opentelemetry-collector-contrib"
mode: deployment
```

With this Values, we can now render the Helm chart and save the resulting
templated resources each into their own file:

```console
$ helm template . --values our-values.yaml > template.yaml
$ mkdir resources_ut
$ yq ea 'splitDoc' template.yaml | \
  awk '/^---$/{x="resources_ut/resource_"++i".yaml";next}{print > x}'
$ cd resources_ut
$ ls
resource_1.yaml  resource_2.yaml  resource_3.yaml  resource_4.yaml
```

## Collecting a set of policies

$ helm pull kubewarden/kubewarden-defaults --version 3.6.1 --untar
$ cd kubewarden-defaults
$ helm template . --set recommendedPolicies.enabled=true > template.yaml
$ yq 'select(.kind == "ClusterAdmissionPolicy")' template.yaml > recommended-policies.yaml

## Running the policies against the Helm chart templates

```console
$ opentelemetry-collector/resources\*ut$
$ for f in \*.yaml; do kwctl scaffold admission-request --operation CREATE --object "$f" \
> adm_req\*$f.json; done
```

resource_1.yaml is a ServiceAccount, hence policies targetting Deployments for example
will fail to deserialize the request.

```console
$ kwctl run --request-path adm_req_resource_1.yaml.json ../../kubewarden-defaults/recommended-policies.yaml
  Successfully pulled policy from ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v1.0.2
  Successfully pulled policy from ghcr.io/kubewarden/policies/capabilities-psp:v1.0.5
  Successfully pulled policy from ghcr.io/kubewarden/policies/host-namespaces-psp:v1.1.2
  Successfully pulled policy from ghcr.io/kubewarden/policies/hostpaths-psp:v1.0.5
  Successfully pulled policy from ghcr.io/kubewarden/policies/pod-privileged:v1.0.5
  Successfully pulled policy from ghcr.io/kubewarden/policies/user-group-psp:v1.0.5
2025-09-29T10:24:49.817439Z  WARN kwctl::command::run: Multiple policies defined inside of the CRD file. All of them will run sequentially using the same request.
2025-09-29T10:24:50.990417Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="no-privilege-escalation" allowed_to_mutate=true response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: false, patch_type: None, patch: None, status: Some(AdmissionResponseStatus { status: None, message: Some(\"Cannot parse validation request\"), reason: None, details: None, code: None }), audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:24:52.120052Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="drop-capabilities" allowed_to_mutate=true response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: false, patch_type: None, patch: None, status: Some(AdmissionResponseStatus { status: None, message: Some(\"Error deserializing Pod specification: Object should be one of these kinds: Deployment, ReplicaSet, StatefulSet, DaemonSet, ReplicationController, Job, CronJob, Pod\"), reason: None, details: None, code: None }), audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:24:53.062907Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="no-host-namespace-sharing" allowed_to_mutate=false response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: None, patch: None, status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:24:53.477540Z  INFO validate_settings{self=PolicyEvaluator { runtime: "wapc" } settings=PolicySettings({"allowedHostPaths": Array [Object {"pathPrefix": String("/tmp"), "readOnly": Bool(true)}]})}:policy_log{self=EvaluationContext { policy_id: "ghcr.io/kubewarden/policies/hostpaths-psp:v1.0.5", callback_channel: Some(...), allowed_kubernetes_resources: {} }}: policy_log: validating settings data={}
2025-09-29T10:24:53.477678Z  INFO validate_settings{self=PolicyEvaluator { runtime: "wapc" } settings=PolicySettings({"allowedHostPaths": Array [Object {"pathPrefix": String("/tmp"), "readOnly": Bool(true)}]})}:policy_log{self=EvaluationContext { policy_id: "ghcr.io/kubewarden/policies/hostpaths-psp:v1.0.5", callback_channel: Some(...), allowed_kubernetes_resources: {} }}: policy_log: accepting settings data={}
2025-09-29T10:24:53.478091Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="do-not-share-host-paths" allowed_to_mutate=false response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: None, patch: None, status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:24:54.466667Z  INFO validate{self=PolicyEvaluator { runtime: "wapc" } settings=PolicySettings({"skip_ephemeral_containers": Bool(false), "skip_init_containers": Bool(false)})}:policy_log{self=EvaluationContext { policy_id: "ghcr.io/kubewarden/policies/pod-privileged:v1.0.5", callback_channel: Some(...), allowed_kubernetes_resources: {} }}: policy_log: starting validation data={"column":5,"file":"src/lib.rs","line":33,"policy":"sample-policy"}
2025-09-29T10:24:54.466727Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="no-privileged-pod" allowed_to_mutate=false response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: false, patch_type: None, patch: None, status: Some(AdmissionResponseStatus { status: None, message: Some(\"Cannot parse validation request\"), reason: None, details: None, code: None }), audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:24:55.748072Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="do-not-run-as-root" allowed_to_mutate=true response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: false, patch_type: None, patch: None, status: Some(AdmissionResponseStatus { status: None, message: Some(\"Cannot parse validation request\"), reason: None, details: None, code: None }), audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
```

resource_4.yaml is a Deployment:

```console
$ kwctl run --request-path adm_req_resource_4.yaml.json ../../kubewarden-defaults/recommended-policies.yaml
  Successfully pulled policy from ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v1.0.2
  Successfully pulled policy from ghcr.io/kubewarden/policies/capabilities-psp:v1.0.5
  Successfully pulled policy from ghcr.io/kubewarden/policies/host-namespaces-psp:v1.1.2
  Successfully pulled policy from ghcr.io/kubewarden/policies/hostpaths-psp:v1.0.5
  Successfully pulled policy from ghcr.io/kubewarden/policies/pod-privileged:v1.0.5
  Successfully pulled policy from ghcr.io/kubewarden/policies/user-group-psp:v1.0.5                                                                                                                                                                                                                                             2025-09-29T10:36:48.798630Z  WARN kwctl::command::run: Multiple policies defined inside of the CRD file. All of them will run sequentially using the same request.
2025-09-29T10:36:48.828389Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="no-privilege-escalation" allowed_to_mutate=true response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: None, patch: None, status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:36:48.863484Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="drop-capabilities" allowed_to_mutate=true response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: Some(JSONPatch), patch: Some(\"W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdGVtcGxhdGUvc3BlYy9jb250YWluZXJzLzAvc2VjdXJpdHlDb250ZXh0L2NhcGFiaWxpdGllcyIsInZhbHVlIjp7ImFkZCI6W10sImRyb3AiOlsiQUxMIl19fV0=\"), status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:36:48.895133Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="no-host-namespace-sharing" allowed_to_mutate=false response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: None, patch: None, status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:36:48.920004Z  INFO validate_settings{self=PolicyEvaluator { runtime: "wapc" } settings=PolicySettings({"allowedHostPaths": Array [Object {"pathPrefix": String("/tmp"), "readOnly": Bool(true)}]})}:policy_log{self=EvaluationContext { policy_id: "ghcr.io/kubewarden/policies/hostpaths-psp:v1.0.5", callback_channel: Some(...), allowed_kubernetes_resources: {} }}: policy_log: validating settings data={}
2025-09-29T10:36:48.920044Z  INFO validate_settings{self=PolicyEvaluator { runtime: "wapc" } settings=PolicySettings({"allowedHostPaths": Array [Object {"pathPrefix": String("/tmp"), "readOnly": Bool(true)}]})}:policy_log{self=EvaluationContext { policy_id: "ghcr.io/kubewarden/policies/hostpaths-psp:v1.0.5", callback_channel: Some(...), allowed_kubernetes_resources: {} }}: policy_log: accepting settings data={}
2025-09-29T10:36:48.920318Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="do-not-share-host-paths" allowed_to_mutate=false response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: None, patch: None, status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:36:48.947881Z  INFO validate{self=PolicyEvaluator { runtime: "wapc" } settings=PolicySettings({"skip_ephemeral_containers": Bool(false), "skip_init_containers": Bool(false)})}:policy_log{self=EvaluationContext { policy_id: "ghcr.io/kubewarden/policies/pod-privileged:v1.0.5", callback_channel: Some(...), allowed_kubernetes_resources: {} }}: policy_log: starting validation data={"column":5,"file":"src/lib.rs","line":33,"policy":"sample-policy"}
2025-09-29T10:36:48.948070Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="no-privileged-pod" allowed_to_mutate=false response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: None, patch: None, status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
2025-09-29T10:36:48.983144Z  INFO policy_evaluator::admission_response_handler: policy evaluation (monitor mode) policy_id="do-not-run-as-root" allowed_to_mutate=true response="AdmissionResponse { uid: \"705ab4f5-6393-11e8-b7cc-42010a800002\", allowed: true, patch_type: Some(JSONPatch), patch: Some(\"W3sib3AiOiJhZGQiLCJwYXRoIjoiL3NwZWMvdGVtcGxhdGUvc3BlYy9jb250YWluZXJzLzAvc2VjdXJpdHlDb250ZXh0L3J1bkFzTm9uUm9vdCIsInZhbHVlIjp0cnVlfSx7Im9wIjoiYWRkIiwicGF0aCI6Ii9zcGVjL3RlbXBsYXRlL3NwZWMvc2VjdXJpdHlDb250ZXh0L3J1bkFzTm9uUm9vdCIsInZhbHVlIjp0cnVlfV0=\"), status: None, audit_annotations: None, warnings: None }"
{"uid":"705ab4f5-6393-11e8-b7cc-42010a800002","allowed":true,"auditAnnotations":null,"warnings":null}
```

We can see that all policies returned `allowed: true` for this resource.

To run `kctl run` against all requests, one can do:

```
$ for req in adm_req_*.json; do kwctl run --request-path "$req" ../../kubewarden-defaults/recommended-policies.yaml; done
```

## Limitations

While `kwctl` supports almost all functionalities as if running policies inside
of a cluster, there are some cases that cannot be covered. For example, `kwctl`
can make context-aware calls and use recordings (see
[here](../reference/spec/context-aware-policies#testing-context-aware-policies-locally))
of those calls, but the recordings don't contain up-to-date information on
Kubernetes resources. A concrete example could be if reading a Custom Resource
that contains scans for CVEs; as information needs to be current.
