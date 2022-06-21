---
sidebar_label: "Tracing Quickstart"
title: ""
---

# Tracing

This section illustrates how to enable tracing support of
Policy Server.

:::note
Before continuing, make sure you completed the previous
[OpenTelemetry](../opentelemetry/01-quickstart.md#install-opentelemetry) section of this book. It
is required for this section to work correctly.
:::

Tracing allows to collect fine grained details about policy evaluations. It can
be a useful tool for debugging issues inside of your Kubewarden deployment and policies.

We will use [Jaeger](https://www.jaegertracing.io/) -- used to receive, store and visualize trace
events.

## Install Jaeger

We are going to use the [Jaeger Operator](https://github.com/jaegertracing/jaeger-operator)
to manage all the different Jaeger components.

At the time of writing, only specific versions of Jaeger are compatible with
Cert Manager, [see the compat chart](https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger-operator/COMPATIBILITY.md).

The operator can be installed in many ways. We are going to install via
manifests, as it gives us RBACs already set up:

```console
kubectl create namespace observability
kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.34.0/jaeger-operator.yaml -n observability
```

This will produce an output similar to the following one:

```console
customresourcedefinition.apiextensions.k8s.io/jaegers.jaegertracing.io created
serviceaccount/jaeger-operator created
role.rbac.authorization.k8s.io/leader-election-role created
role.rbac.authorization.k8s.io/prometheus created
clusterrole.rbac.authorization.k8s.io/jaeger-operator-metrics-reader created
clusterrole.rbac.authorization.k8s.io/manager-role created
clusterrole.rbac.authorization.k8s.io/proxy-role created
rolebinding.rbac.authorization.k8s.io/leader-election-rolebinding created
rolebinding.rbac.authorization.k8s.io/prometheus created
clusterrolebinding.rbac.authorization.k8s.io/jaeger-operator-proxy-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/manager-rolebinding created
service/jaeger-operator-metrics created
service/jaeger-operator-webhook-service created
deployment.apps/jaeger-operator created
certificate.cert-manager.io/jaeger-operator-serving-cert created
issuer.cert-manager.io/jaeger-operator-selfsigned-issuer created
mutatingwebhookconfiguration.admissionregistration.k8s.io/jaeger-operator-mutating-webhook-configuration created
validatingwebhookconfiguration.admissionregistration.k8s.io/jaeger-operator-validating-webhook-configuration created
```

Given this is a testing environment, we will use the default
["AllInOne"](https://www.jaegertracing.io/docs/1.35/operator/#allinone-default-strategy)
strategy. As stated on the upstream documentation: this deployment strategy is
meant to be used only for development, testing and demo purposes.

:::note
The operator can deploy Jaeger in many different ways. We strongly recommend
to read its [official documentation](https://www.jaegertracing.io/docs/latest/operator/).
:::

Let's create a Jaeger resource:

```console
kubectl apply -f - <<EOF
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: all-in-one
  namespace: observability
spec:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
EOF
```

Once all the resources have been created by the Jaeger operator, the
Jaeger Query UI will be reachable at the following address:

```console
echo http://`minikube ip`
```

## Install Kubewarden

We can proceed to the deployment of Kubewarden in the usual way.

:::note
cert-manager is a requirement of Kubewarden, and OpenTelemetry is required for this
feature, but we've already installed them in a previous section of this book.
:::

As a first step, we have to add the Helm repository that contains Kubewarden:

```console
helm repo add kubewarden https://charts.kubewarden.io
```

Then we have to install the Custom Resource Definitions (CRDs) defined by
Kubewarden:

```console
helm install --wait --namespace kubewarden --create-namespace kubewarden-crds kubewarden/kubewarden-crds
```

Now we can deploy the rest of the Kubewarden stack. The official
helm chart will create a PolicyServer named `default`. We want this PolicyServer
instance to have tracing enabled.

In order to do that, we have to specify some extra values at installation time.
Let's create a `values.yaml` file with the following contents:

```yaml
telemetry:
  enabled: True
  tracing:
    jaeger:
      endpoint: "all-in-one-collector.observability.svc.cluster.local:14250"
```

Then we can proceed with the installation of the helm charts:

```console
helm install --wait --namespace kubewarden --create-namespace \
  --values values.yaml \
  kubewarden-controller kubewarden/kubewarden-controller
helm install --wait --namespace kubewarden --create-namespace \
  --set policyServer.telemetry.enabled=true \
  kubewarden-defaults kubewarden/kubewarden-defaults
```

This leads to the creation of the `default` instance of `PolicyServer`:

```console
kubectl get policyservers.policies.kubewarden.io
NAME      AGE
default   3m7s
```

Looking closer at the Pod running the PolicyServer instance, we will find it has
two containers inside of it: the actual `policy-server` and the OpenTelemetry
Collector sidecar `otc-container`.

## Enforcing a policy

We will start by deploying the [safe-labels](https://github.com/kubewarden/safe-labels-policy)
policy.

We want the policy to be enforced only inside of Namespaces that have a
label `environment` with value `production`.

Let's create a Namespace that has such a label:

```console
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: team-alpha-prod
  labels:
    environment: production
EOF
```

Next, let's define a ClusterAdmissionPolicy:

```yaml
kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: safe-labels
spec:
  module: registry://ghcr.io/kubewarden/policies/safe-labels:v0.1.6
  settings:
    mandatory_labels:
    - owner
  rules:
    - apiGroups:
        - apps
      apiVersions:
        - v1
      resources:
        - deployments
      operations:
        - CREATE
        - UPDATE
  namespaceSelector:
    matchExpressions:
    - key: environment
      operator: In
      values: ["production"]
  mutating: false
EOF
```

We can wait for the policy to be active in this way:

```console
kubectl wait --for=condition=PolicyActive clusteradmissionpolicy/safe-labels
```

Once the policy is active, we can try it out in this way:

```console
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: team-alpha-prod
  labels:
    owner: flavio
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 0
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
EOF
```

This Deployment object will be created because it doesn't violate the policy.

On the other hand, this Deployment will be blocked by the policy:

```console
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment-without-labels
  namespace: team-alpha-prod
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 0
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
EOF
```

The policy is not enforced inside of another Namespace.

The following command creates a new Namespace called `team-alpha-staging`:

```console
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: team-alpha-staging
  labels:
    environment: staging
EOF
```

As expected, the creation of a Deployment resource that doesn't have any label
is allowed inside of the `team-alpha-staging` Namespace:

```
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment-without-labels
  namespace: team-alpha-staging
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 0
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
EOF
```

As expected, this resource is successfully created.

## Exploring the Jaeger UI

We can see the trace events have been sent by the PolicyServer instance to Jaeger:

![Jaeger homepage](/img/jaeger-ui-home.png "The homepage of Jaeger")

The Jaeger collector is properly receiving the traces generated by our PolicyServer.