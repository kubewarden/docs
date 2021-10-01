# Tracing

This section illustrates how to enable tracing support of
Policy Server.

Tracing allows to collect fine grained details about policy evaluations. It can
be a useful tool for debugging issues inside of your Kubewarden deployment and policies.

## The stack

We will use the following tools to enable tracing:

  * [Jaeger](https://www.jaegertracing.io/): it is used to receive, store
    and visualize trace events.
  * [OpenTelemetry](https://opentelemetry.io/): it is used to collect
    trace events originated by PolicyServer and forward them to Jaeger

The OpenTelemetry collector will be deployed as a sidecar inside of each PolicyServer
Pod.

## Setting up a Kubernetes cluster

> This section gives step-by-step instructions to create a
> Kubernetes cluster with an ingress controller enabled.
>
> Feel free to skip this section if you already have a Kubernetes
> cluster where you can define Ingress resources.

We are going to create a testing Kubernetes cluster using [minikube](https://minikube.sigs.k8s.io/docs/).

minikube has many backends, in this case we will use the
[kvm2](https://minikube.sigs.k8s.io/docs/drivers/kvm2/) driver
which relies on libvirt.

Assuming `libvirtd` is properly running on your machine, issue the
following command:

```console
minikube start --driver=kvm2
```

The command will produce an output similar to the following one:

```console
$ minikube start --driver=kvm2
😄  minikube v1.23.2 on Opensuse-Leap 15.3
✨  Using the kvm2 driver based on user configuration
👍  Starting control plane node minikube in cluster minikube
🔥  Creating kvm2 VM (CPUs=2, Memory=6000MB, Disk=20000MB) ...
🐳  Preparing Kubernetes v1.22.2 on Docker 20.10.8 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

Now we have to enable the Ingress addon:

```console
minikube addons enable ingress
```

This will produce an output similar to the following one:

```console
$ minikube addons enable ingress
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.0
    ▪ Using image k8s.gcr.io/ingress-nginx/controller:v1.0.0-beta.3
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.0
🔎  Verifying ingress addon...
🌟  The 'ingress' addon is enabled
```

## Install Jaeger

We are going to use the [Jaeger Operator](https://github.com/jaegertracing/jaeger-operator)
to manage all the different Jaeger components.

The operator can be installed in many ways, we are going to use
its helm chart.

As a first step, we need to add the helm repository containing the Jaeger Operator
charts:

```console
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
```

Then we install the operator inside of a dedicated Namespace called `jaeger`:

```console
helm install --namespace jaeger --create-namespace jaeger-operator jaegertracing/jaeger-operator
```

This will produce an output similar to the following one:

```console
helm install --namespace jaeger --create-namespace jaeger-operator jaegertracing/jaeger-operator
manifest_sorter.go:192: info: skipping unknown hook: "crd-install"
NAME: jaeger-operator
LAST DEPLOYED: Tue Sep 28 14:54:02 2021
NAMESPACE: jaeger
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
jaeger-operator is installed.


Check the jaeger-operator logs
  export POD=$(kubectl get pods -l app.kubernetes.io/instance=jaeger-operator -lapp.kubernetes.io/name=jaeger-operator --namespace jaeger --output name)
  kubectl logs $POD --namespace=jaeger
```

Given this is a testing environment, we will use default 
["AllInOne"](https://www.jaegertracing.io/docs/1.26/operator/#allinone-default-strategy)
strategy. As stated on the upstream documentation: this deployment strategy is
meant to be used only for development, testing and demo purposes.

> **Note well:** the operator can deploy Jaeger in many different ways. We strongly recommend
> to read its [official documentation](https://www.jaegertracing.io/docs/1.26/operator/).

Let's create a Jaeger resource:

```console
kubectl apply -f - <<EOF
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: all-in-one
  namespace: jaeger
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
## Install OpenTelemetry

We are going to use the [OpenTelemetry Operator](https://github.com/open-telemetry/opentelemetry-operator)
to manage the automatic injection of the OpenTelemetry Collector sidecar
inside of the PolicyServer Deployment.

The OpenTelemetry Operator requires [cert-manager](https://cert-manager.io/docs/installation/)
to be installed inside of the cluster.

This can be done with this command:

```console
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml
```

We can wait for cert-manager to be ready in this way:

```console
kubectl wait --for=condition=Available deployment --timeout=2m -n cert-manager --all
```

Once cert-manager is up and running, the operator can be installed in this way:

```console
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```

Now we have to create a [OpenTelemetryCollector](https://github.com/open-telemetry/opentelemetry-operator#sidecar-injection)
resource inside of the Namespace where Kubewarden is going to be deployed.

As a first step we have to create a `kubewarden` Namespace:

```console
kubectl create ns kubewarden
```

The OpenTelemetryCollector can be created in this way:

```console
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: sidecar-from-otel-to-jaeger
  namespace: kubewarden
spec:
  mode: sidecar
  config: |
    receivers:
      otlp:
        protocols:
          grpc:

    processors:
      batch:

    exporters:
      jaeger:
        endpoint: "all-in-one-collector.jaeger.svc.cluster.local:14250"
        insecure: true

    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [batch]
          exporters: [jaeger]
EOF
```

The OpenTelemetryCollector resource comes with a simple configuration:

  * The collector receives incoming traces that are delivered using the
    OpenTelemetry format. The communication between the PolicyServer and
    the sidecar collector happens over gRPC.
  * The collector will then export all the traces in batches. The traces will
    be sent to a Jaeger collector.
  * The Jaeger collector is exposed via the internal Service that was created
    by the Jaeger Operator.
  * The communication between the OpenTelemetry Collector and the Jaeger endpoint
    is not secured by TLS. We are fine with this limitation because this is
    just a demo environment.

Everything is ready, we can now deploy Kubewarden.

## Install Kubewarden

We can proceed to the deployment of Kubewarden in the usual way.

> **Note well:** cert-manager is a requirement of Kubewarden, but we've already
> installed it before performing the deployment of the OpenTelemetry Operator.

As a first step, we have to add the Helm repository that contains Kubewarden:

```console
helm repo add kubewarden https://charts.kubewarden.io
```

Then we have to install the Custom Resource Definitions (CRDs) defined by
Kubewarden:

```console
helm install --create-namespace -n kubewarden kubewarden-crds kubewarden/kubewarden-crds
```

Now we can deploy the rest of the Kubewarden stack. The official
helm chart will create a PolicyServer named `default`. We want this PolicyServer
instance to have tracing enabled.

In order to do that, we have to specify some extra values at installation time.
Let's create a `values.yaml` file with the following contents:

```yaml
policyServer:
  env:
  - name: KUBEWARDEN_LOG_LEVEL
    value: info
  - name: KUBEWARDEN_LOG_FMT
    value: otlp
  annotations:
    sidecar.opentelemetry.io/inject: "true"
```

Then we can proceed with the installation of the helm chart:

```console
helm install --wait --namespace kubewarden --values values.yaml kubewarden-controller kubewarden/kubewarden-controller
```

This leads to the creation of the `default` instance of `PolicyServer`:

```console
kubectl get -n kubewarden policyservers.policies.kubewarden.io
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
        - "*"
      apiVersions:
        - "*"
      resources:
        - "*"
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

![Jaeger homepage](/operator-manual/tracing/jaeger-ui-home.png "The homepage of Jaeger")

The Jaeger collector is properly receiving the traces generated by our PolicyServer.
