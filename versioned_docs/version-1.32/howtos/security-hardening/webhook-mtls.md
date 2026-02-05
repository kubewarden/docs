---
sidebar_label: Enable mTLS with K3s
title: Secure webhooks with mutual TLS with K3s
description: Harden the webhook configuration.
keywords: [kubewarden, kubernetes, security]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, security]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/security-hardening/webhook-mtls"/>
</head>

This guide shows you how to enable mutual Transport Layer Security (mTLS) for
Kubewarden stack webhooks when using [K3s](https://k3s.io/) as your Kubernetes
distribution.

For more information on how to harden the webhooks, see the [reference
page](../../reference/security-hardening/webhooks-hardening).

## Prerequisites

Before installing K3s, you need to create a certificate authority (CA) and a
client certificate. You use to secure the communication between the Kubewarden
webhooks and the Kubernetes API server.

As a first step, create the `/etc/rancher/k3s/admission/certs` directory:

```console
sudo mkdir -p /etc/rancher/k3s/admission/certs
```

### Create a root CA and the client certificate

As `root` user, change directory to the `/etc/rancher/k3s/admission/certs`
directory and create all needed certificates:

```console
export FQDN=mtls.kubewarden.io

# Create openssl config file
cat > openssl.cnf <<EOL
[ req ]
default_keyfile     = rootCA.key
distinguished_name  = req_distinguished_name
x509_extensions     = v3_ca
string_mask         = utf8only

[ req_distinguished_name ]
countryName         = Country Name (2 letter code)
countryName_default = US
stateOrProvinceName = State or Province Name (full name)
localityName        = Locality Name (eg, city)
organizationName    = Organization Name (eg, company)
commonName          = Common Name (eg, your domain or your CA name)

[ v3_ca ]
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints = critical, CA:true, pathlen:1
keyUsage = critical, keyCertSign, cRLSign
EOL

# Create CA
openssl req -nodes -batch -x509 -sha256 -days 3650 -newkey rsa:4096 -keyout rootCA.key -out rootCA.crt \
  -config openssl.cnf

# Create CSR
openssl req -nodes -batch -newkey rsa:4096 -keyout client.key -out client.csr \
    -addext "subjectAltName = DNS:$FQDN"  -config openssl.cnf

# Create CRT
openssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in client.csr -out client.crt -days 3650 -CAcreateserial \
    -extfile <(echo "subjectAltName=DNS:$FQDN")

# Print CRT
openssl x509 -text -noout -in client.crt
```

This creates the following files:

- `client.crt`
- `client.csr`
- `client.key`
- `rootCA.crt`
- `rootCA.key`
- `rootCA.srl`

### Create the Kubernetes configuration file

Create the `/etc/rancher/k3s/admission/admission.yaml` file with the following
content:

```yaml
# /etc/rancher/k3s/admission/admission.yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
  - name: ValidatingAdmissionWebhook
    configuration:
      apiVersion: apiserver.config.k8s.io/v1
      kind: WebhookAdmissionConfiguration
      kubeConfigFile: "/etc/rancher/k3s/admission/kubeconfig"
  - name: MutatingAdmissionWebhook
    configuration:
      apiVersion: apiserver.config.k8s.io/v1
      kind: WebhookAdmissionConfiguration
      kubeConfigFile: "/etc/rancher/k3s/admission/kubeconfig"
```

Finally, create a `kubeconfig` file at `/etc/rancher/k3s/admission/kubeconfig`:

```yaml
# /etc/rancher/admission/kubeconfig
apiVersion: v1
kind: Config
users:
  - name: "*.kubewarden.svc" # namespace where the kubewarden stack is deployed
    user:
      client-certificate: /etc/rancher/k3s/admission/certs/client.crt
      client-key: /etc/rancher/k3s/admission/certs/client.key
```

### Create a K3s configuration file

Create a K3s configuration file at `/etc/rancher/k3s/config.yaml`:

```yaml
# /etc/rancher/k3s/config.yaml
kube-apiserver-arg:
  - admission-control-config-file=/etc/rancher/k3s/admission/admission.yaml
```

## Install K3s

Install K3s using the following command:

```console
curl -sfL https://get.k3s.io | sh -
```

Wait for the installation to complete.

## Install the Kubewarden stack

### Prerequisites

The certificate of the root CA, that issued the Kubernetes client certificate,
needs to be available to the Kubewarden stack.

The root CA is available at `/etc/rancher/k3s/admission/certs/rootCA.crt` on
the Kubernetes node. You need its content in a `ConfigMap` under the
`kubewarden` namespace. You store the contents of the `rootCA.crt` file in the
key named `client-ca.crt`.

First, create the `kubewarden` namespace:

```console
kubectl create namespace kubewarden
```

Then create the `ConfigMap` in it. The following command, run on the Kubernetes
node, does that:

```console
kubectl create configmap -n kubewarden api-server-mtls \
    --from-file=client-ca.crt=/etc/rancher/k3s/admission/certs/rootCA.crt
```

The name of the resulting `ConfigMap` is `api-server-mtls`.

### Install the Kubewarden stack

Install the Kubewarden stack as described in the [quickstart
guide](../../quick-start.md). Follow all the steps, but when installing the
`kubewarden-controller` Helm chart, make sure to enable the following values:

- `mTLS.enable`: must be `true`.
- `mTLS.configMapName`: must be the name of the `ConfigMap` that was previously
  created.

The `ConfigMap` name is `api-server-mtls`. The Helm command to install
the `kubewarden-controller` is:

```console
helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller \
    --set mTLS.enable=true \
    --set mTLS.configMapName=api-server-mtls
```

Once this command finishes, mTLS secures the installation of the Kubewarden
stack and its webhooks.
