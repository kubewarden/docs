---
sidebar_label: Context-aware policies
title: Context-aware CEL policies
description: "Example: context-aware CEL policy"
keywords:
  [
    kubewarden,
    kubernetes,
    writing policies,
    context-aware,
    context,
    aware,
    ingress,
  ]
doc-type: [tutorial]
doc-topic:
  [kubewarden, writing-policies, cel, context-aware, context, awaree, ingress]
doc-persona: [kubewarden-policy-developer, kubewarden-operator]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/cel/context-aware-policies"/>
</head>

Kubewarden's `cel-policy` supports the [context
awareness](../../../reference/spec/context-aware-policies) feature. The
policy has the capability to read cluster information and take decisions based
on other existing resources besides the resource that triggered the policy
evaluation via admission request.

To achieve this, we can use the [Kubewarden's CEL extension
libraries for host capabilities](https://github.com/kubewarden/cel-policy?tab=readme-ov-file#host-capabilities)
included in the policy.

## Example: Unique Ingress

Let's write a policy that, upon creation or update of Ingresses, checks that
Ingress is unique, so hosts have at most one Ingress rule.

For that, we declare that the policy is context-aware. We also declare the fine-grained
permissions we need to read other Ingress resources. This is achieved with
`spec.contextAwareResources` (1). We can get a starting point as usual by using `kwctl`:

```console
$ kwctl scaffold manifest -t ClusterAdmissionPolicy \
  registry://ghcr.io/kubewarden/policies/cel-policy:v1.0.0` \
  --allow-context-aware
```

Which then we can edit to be relevant to our Ingress resources:

```yaml title="./cel-policy-ingress.yaml" {16}
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: "unique-ingress"
  annotations:
    io.kubewarden.policy.category: Best practices
    io.kubewarden.policy.severity: low
spec:
  module: ghcr.io/kubewarden/policies/cel-policy:v1.0.0
  failurePolicy: Fail
  rules:
    - apiGroups: ["networking.k8s.io"]
      apiVersions: ["v1"]
      resources: ["ingresses"]
      operations: ["CREATE", "UPDATE"]
  contextAwareResources: # (1)
    - apiVersion: networking.k8s.io/v1
      kind: Ingress
```

Now, we need to write the CEL code that will fetch the existing Ingresses in
the cluster. For that, we use the [Kubewarden CEL extension
library](https://github.com/kubewarden/cel-policy?tab=readme-ov-file#host-capabilities).
Particularly, the `kw.k8s` host capabilities, which allows us to query the
cluster for GroupVersionKinds. You can see the available docs for the CEL
functions
[here](https://pkg.go.dev/github.com/kubewarden/cel-policy/internal/cel/library).

The library uses a builder pattern just as the upstream Kubernetes CEL
extensions; calling a CEL function method returns a CEL object which on its own
has specific function methods. This simplifies being certain of the scope and
returns of our CEL code.

In this case, we will use `kw.k8s.apiVersion("v1").kind("Ingress")`; here we
call the `apiVersion()` function of the `kw.k8s` library, which returns us a
`<ClientBuilder>` object. This object has the `<ClientBuilder>.kind()` method,
that returns a list of all resources, in an array called `items`.

With that, we save the list of Ingresses in the cluster in a variable:

```yaml
variables:
  - name: knownIngresses
    expression: kw.k8s.apiVersion("networking.k8s.io/v1").kind("Ingress").list().items
```

Then, we build a list of hosts from those Ingresses. Note that there can be
several hosts per Ingress, so this expression holds an array of arrays (which
is a current limitation of the CEL language):

```yaml
variables:
  - name: knownHosts
    expression: |
      variables.knownIngresses.map(i, i.spec.rules.map(r, r.host))
```

Yet, this doesn't take care of UPDATE operations correctly; for that, we need
to remove the current object and extract the hosts from the remaining Ingresses.
We can do that with a `filter()` on the current object at `object`.
With this, UPDATE operations are correctly checked. This also means that the
policy will correctly report results to the Audit Scanner, too. It will look
like this:

```yaml
variables:
  - name: knownHosts
    expression: |
      variables.knownIngresses
      .filter(i, (i.metadata.name != object.metadata.name) && (i.metadata.namespace != object.metadata.namespace))
      .map(i, i.spec.rules.map(r, r.host))
```

We also need a list of hosts in the current Ingress request to compare against:

```yaml
variables:
  - name: desiredHosts
    expression: |
      object.spec.rules.map(r, r.host)
```

With those 2 variables, we can do a set intersection between the known hosts and
the desired hosts, and if there's any, we reject:

```yaml
validations:
  - expression: |
      !variables.knownHost.exists_one(hosts, sets.intersects(hosts, variables.desiredHosts))
    message: "Cannot reuse a host across multiple ingresses"
```

Putting it all together, the policy looks as follows:

```yaml title="./cel-policy-ingress.yaml"
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: "unique-ingress"
  annotations:
    io.kubewarden.policy.category: Best practices
    io.kubewarden.policy.severity: low
spec:
  module: ghcr.io/kubewarden/policies/cel-policy:v1.0.0
  failurePolicy: Fail
  rules:
    - apiGroups: ["networking.k8s.io"]
      apiVersions: ["v1"]
      resources: ["ingresses"]
      operations: ["CREATE", "UPDATE"]
  contextAwareResources:
    - apiVersion: networking.k8s.io/v1
      kind: Ingress
  settings:
    variables:
      - name: knownIngresses
        expression: |
          kw.k8s.apiVersion("networking.k8s.io/v1").kind("Ingress").list().items
      - name: knownHosts
        expression: |
          variables.knownIngresses
          .filter(i, (i.metadata.name != object.metadata.name) && (i.metadata.namespace != object.metadata.namespace))
          .map(i, i.spec.rules.map(r, r.host))
      - name: desiredHosts
        expression: |
          object.spec.rules.map(r, r.host)
    validations:
      - expression: |
          !variables.knownHosts.exists_one(hosts, sets.intersects(hosts, variables.desiredHosts))
        message: "Cannot reuse a host across multiple ingresses"
```

## Deploying the policy

As normal, we can deploy our policy by instantiating its manifest:

```console
$ kubectl apply -f ./cel-policy-example.yaml
```

Now we can test it by instantiating Ingresses. The first one will succeed as
there's no other targeting that host:

```console
$ kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-host-foobar-1
spec:
  rules:
  - host: "foo.bar.com"
    http:
      paths:
      - pathType: Prefix
        path: "/bar"
        backend:
          service:
            name: service1
            port:
              number: 80
EOF
```

But the second one will result in a rejection:

```console
$ kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-host-foobar-2
spec:
  rules:
  - host: "foo.bar.com"
    http:
      paths:
      - pathType: Prefix
        path: "/foo"
        backend:
          service:
            name: service2
            port:
              number: 80
EOF
Error from server: error when creating "STDIN":
  admission webhook "clusterwide-unique-ingress.kubewarden.admission" denied the request:
  Cannot reuse a host across multiple ingresses
```
