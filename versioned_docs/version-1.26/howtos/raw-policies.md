---
sidebar_label: Raw policies
sidebar_position: 60
title: Raw policies
description: Kubewarden support for 'raw' policies.
keywords: [kubewarden, kubernetes, support, raw policies]
doc-persona:
  [
    kubewarden-distributor,
    kubewarden-integrator,
    kubewarden-operator,
    kubewarden-policy-developer,
  ]
doc-type: [howto]
doc-topic: [kubewarden, kubernetes, raw-policies]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/raw-policies"/>
</head>

From `v1.9.0` onwards, Kubewarden supports the ability to write and execute policies
outside a Kubernetes cluster, as a generic policy evaluation engine.
The Policy Server exposes the `/validate_raw` endpoint that can be used to validate
arbitrary JSON documents against a Kubewarden policy.

For this guide, we will use the following raw policies:

- [raw-validation-policy](https://github.com/kubewarden/raw-validation-policy)
- [raw-mutation-policy](https://github.com/kubewarden/raw-mutation-policy)

:::note
Please ensure that the policy author has marked the policy as `policyType: raw` in the metadata.
You can inspect the metadata by using `kwctl`

```bash
kwctl inspect registry://ghcr.io/kubewarden/tests/raw-mutation-policy:v0.1.0
```

:::

## Running the policy server outside Kubernetes

The Policy Server can be run outside Kubernetes as a standalone container.

First, create a `policies.yml` file with the following content:

```yaml
raw-validation:
  module: ghcr.io/kubewarden/tests/raw-validation-policy:v0.1.0
  settings:
    validUsers:
      - alice
      - bob
    validActions:
      - read
      - write
    validResources:
      - orders
      - products

raw-mutation:
  module: ghcr.io/kubewarden/tests/raw-mutation-policy:v0.1.0
  allowedToMutate: true
  settings:
    forbiddenResources:
      - privateResource
      - secretResource
    defaultResource: publicResource
```

To start the policy server:

```bash
# Create a docker volume to store the policies
docker volume create --driver local \
                --opt type=tmpfs \
                --opt device=tmpfs \
                --opt o=ui=65533 \
                policy-store

# Start the policy server
docker run --rm -it \
    -p 3000:3000 \
    -v $(pwd)/policies.yml:/policies.yml \
    -v policy-store:/registry \
    ghcr.io/kubewarden/policy-server \
    --ignore-kubernetes-connection-failure
```

:::note
The flag `--ignore-kubernetes-connection-failure` is required to start the policy server without Kubernetes.
:::

You can also use a bind mount to store the policies modules in a persistent way:
```bash
mkdir -p ./registry

# start the policy server
docker run --rm -it \
    -p 3000:3000 \
    -v $(pwd)/policies.yml:/policies.yml \
    -v $(pwd)/registry:/registry \
    ghcr.io/kubewarden/policy-server \
    --ignore-kubernetes-connection-failure
```

However, it is possible to start the Policy Server with/inside Kubernetes and use the raw validation endpoint.
Raw policies can access context-aware[ capabilities](../explanations/context-aware-policies.md) like standard policies.

## Running a Policy Server inside Kubernetes without the Kubewarden controller

It's not possible to use a Policy Server instance managed by the Kubewarden controller to host raw policies.
The controller will not allow the user to change the Policy Server ConfigMap to add a raw policy,
since it will try to reconcile it reverting the changes.
Because of that, a dedicated Policy Server has to be started.

Create a `policy-server.yaml` file with the following content:

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: policy-server-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: policy-server
  template:
    metadata:
      labels:
        app: policy-server
    spec:
      containers:
        - name: policy-server
          image: ghcr.io/kubewarden/policy-server:v1.9.0
          ports:
            - containerPort: 3000
          volumeMounts:
            - name: policy-store
              mountPath: /registry
            - name: policies-config
              mountPath: /policies.yml
              subPath: policies.yml
      volumes:
        - name: policy-store
          emptyDir: {}
        - name: policies-config
          configMap:
            name: policies-configmap
---
apiVersion: v1
kind: Service
metadata:
  name: policy-server-service
spec:
  selector:
    app: policy-server
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: policies-configmap
data:
  policies.yml: |
    raw-validation:
      module: ghcr.io/kubewarden/tests/raw-validation-policy:v0.1.0
      settings: 
        validUsers:
          - alice
          - bob
        validActions:
          - read
          - write
        validResources:
          - orders
          - products
    raw-mutation:
      module: ghcr.io/kubewarden/tests/raw-mutation-policy:v0.1.0
      allowedToMutate: true
      settings:
        forbiddenResources:
          - privateResource
          - secretResource
        defaultResource: publicResource
```

Apply the configuration:

```bash
kubectl apply -f policy-server.yaml
```

:::info
The Policy Server instance deployed will have access to Kubernetes resources that could be leveraged by context aware policies.
The access level to the Kubernetes resources is determined by the Service Account used to run the Policy Server workload.

In the previous example, no Service Account is defined inside of the Deployment specification; hence the `default` Service Account is going to be used.
:::

## Using the validate_raw endpoint

### Validation

The raw validation endpoint is exposed at `/validate_raw` and accepts `POST` requests.
Since we have deployed a service, we can set a port-forward to access it with
`kubectl port-forward service/policy-server-service 3000:3000 -n default`.

Let's try to validate a JSON document against the `raw-validation` policy:

```bash
curl -X POST \
  http://localhost:3000/validate_raw/raw-validation \
  -H 'Content-Type: application/json' \
  -d '{
  "request": {
    "user": "alice",
    "action": "read",
    "resource": "customers"
  }
}'
```

The request will be not accepted, since `alice` has not been granted access to the `customers` resource:

```json
{
  "response": {
    "uid": "",
    "allowed": false,
    "auditAnnotations": null,
    "warnings": null
  }
}
```

Let's try again with a valid resource:

```bash
curl -X POST \
  http://localhost:3000/validate_raw/raw-validation \
  -H 'Content-Type: application/json' \
  -d '{
  "request": {
    "user": "alice",
    "action": "read",
    "resource": "orders"
  }
}'
```

This time, the request will be accepted:

```json
{
  "response": {
    "uid": "",
    "allowed": true,
    "auditAnnotations": null,
    "warnings": null
  }
}
```

:::note
If the `uid` field is provided in the request payload, it will be returned as part of the response.
:::

### Mutation

Now, let's try to mutate a JSON document against the `raw-mutation` policy:

```bash
curl -X POST \
  http://localhost:3000/validate_raw/raw-mutation \
  -H 'Content-Type: application/json' \
  -d '{
  "request": {
    "user": "alice",
    "action": "read",
    "resource": "privateResource"
  }
}'
```

The request will be mutated and the response will contain a JSONPatch:

```json
{
  "response": {
    "uid": "",
    "allowed": true,
    "patchType": "JSONPatch",
    "patch": "W3sib3AiOiJyZXBsYWNlIiwicGF0aCI6Ii9yZXNvdXJjZSIsInZhbHVlIjoicHVibGljUmVzb3VyY2UifV0=",
    "auditAnnotations": null,
    "warnings": null
  }
}
```

## Writing raw policies

Similarly to policies that validate Kubernetes resources, raw policies are written in WebAssembly using Kubewarden SDKs.
If you are interested in writing raw policies, please refer to language-specific documentation for more information:

- [Go](../tutorials/writing-policies/go/10-raw-policies.md)
- [Rust](../tutorials/writing-policies/rust/08-raw-policies.md)
- [OPA](../tutorials/writing-policies/rego/open-policy-agent/05-raw-policies.md)
- [WASI](../tutorials/writing-policies/wasi/02-raw-policies.md)
