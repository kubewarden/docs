---
sidebar_label: Webhooks
title: Hardening the Kubewarden webhooks
description: Limit access to Kubewarden webhooks.
keywords: [kubewarden, kubernetes, security]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [reference]
doc-topic: [reference, security]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/security-hardening/webhooks-hardening"/>
</head>

The Kubewarden stack uses various webhooks to enforce policies in a Kubernetes cluster. Each `PolicyServer` instance exposes a webhook
that the Kubernetes API server calls to validate and mutate resources. Moreover, the `kubewarden-controller` exposes webhooks to validate and mutate
the custom resources provided by the Kubewarden project.

To decrease their attack surface, you should limit access to these webhooks to the only valid callers they have: 

- the Kubernetes API server
- the [audit scanner](../../explanations/audit-scanner/) component.
You can do this using network policies and authentication independently, or together, to harden the webhooks against attacks.

## Block External Traffic Using Network Policies

Webhooks are only expected to accept requests from the Kubernetes API server and the audit scanner component. By default, however, webhooks can accept traffic from any source.
If you are using a CNI that supports Network Policies, you can create a policy that blocks traffic that doesn't originate from the API server.

The built-in NetworkPolicy resource in Kubernetes can't block or admit traffic from the cluster hosts, and the `kube-apiserver` process is always running on the host network.
Therefore, you must use the advanced network policy resources from the CNI in use. Examples for Calico and Cilium follow. Consult the documentation for your CNI for more details.

### Calico

Use the NetworkPolicy resource in the `crd.projectcalico.org/v1` API group, define a network policy like the following one:

```yaml
apiVersion: crd.projectcalico.org/v1
kind: NetworkPolicy
metadata:
  name: allow-k8s-and-audit-scanner
  namespace: kubewarden # namespace where the kubewarden stack is deployed
spec:
  selector: 'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}'
  types:
    - Ingress
  ingress:
    # this allows the Kubernetes API server to reach the kubewarden controller and
    # all the policy server instances
    - action: Allow
      protocol: TCP
      source:
        nets:
        # CIDR of the control plane host. May list more than 1 if the hosts are in different subnets.
        - 192.168.42.0/24
      destination:
        selector: 'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}'
    # this allows all the workloads defined inside of the kubewarden namespace
    # (including audit-scanner) to reach the kubewarden controller and all the
    # policy server instances
    - action: Allow
      protocol: TCP
      source:
        # namespace where the kubewarden stack is deployed
        namespaceSelector: 'kubernetes.io/metadata.name == "kubewarden"' # namespace where the kubewarden stack is deployed
      destination:
        selector: 'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}'
```

:::warning

This network policy uses label selectors that have been introduced in Kubewarden 1.23.0. If you are using an older version,
you must update the labels in the policy to match the ones used in your deployment.

More specifically, the

```yaml
selector: 'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}'
```

selectors should be written as:


```yaml
selector: 'app.kubernetes.io/name == "kubewarden-controller" || has(kubewarden/policy-server)'
```

:::

### Cilium

Use the CiliumNetworkPolicy resource in the `cilium.io/v2` API group to define a network policy like the following one:

```yaml
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata:
  name: allow-k8s-and-audit-scanner
  namespace: kubewarden # namespace where the kubewarden stack is deployed
spec:
  endpointSelector:
    matchExpressions:
      - key: app.kubernetes.io/component
        operator: In
        values:
          - policy-server
          - controller
  ingress:
    # this allows the Kubernetes API server to reach the kubewarden controller and
    # all the policy server instances
    - fromEntities:
      - host
      - remote-node
    # this allows all the workloads defined inside of the kubewarden namespace
    # (including audit-scanner) to reach the kubewarden controller and all the
    # policy server instances
    - fromEndpoints:
        - matchLabels:
            # namespace where the kubewarden stack is deployed
            k8s:io.kubernetes.pod.namespace: kubewarden
```

:::warning

This network policy uses label selectors that have been introduced in Kubewarden 1.23.0. If you are using an older version,
you must update the labels in the policy to match the ones used in your deployment.

More specifically, the

```yaml
matchExpressions:
  - key: app.kubernetes.io/component
    operator: In
    values:
      - policy-server
      - controller
```

expression should be written as:


```yaml
endpointSelector:
matchExpressions:
  - key: app.kubernetes.io/name
    operator: In
    values:
      - kubewarden-controller
  - key: kubewarden/policy-server
    operator: Exists
```

:::

## Require the Kubernetes API Server to Authenticate to the Webhook

:::tip

See [this how-to](../../howtos/security-hardening/webhook-mtls/) for a step-by-step guide on
configuring the Kubernetes API server of K3s to authenticate to the webhook.

:::

The webhooks exposed by the Kubewarden stack should only accept requests from the Kubernetes API server or
from the audit scanner component.
By default, these webhooks don’t require clients to authenticate to it. They will accept any request.

You can configure the webhooks to require credentials so that only the API server and the audit scanner processes
can access them.
See the [Kubernetes documentation](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#authenticate-apiservers) for more information.

1. Configure the API server to present a client certificate to the webhook, pointing to an `AdmissionConfiguration`
    file to configure the `ValidatingAdmissionWebhook` and `MutatingAdmissionWebhook` plugins:

    Create a file named `admission.yaml` with the following contents:

    ```yaml
    apiVersion: apiserver.config.k8s.io/v1
    kind: AdmissionConfiguration
    plugins:
    - name: ValidatingAdmissionWebhook
      configuration:
        apiVersion: apiserver.config.k8s.io/v1
        kind: WebhookAdmissionConfiguration
        kubeConfigFile: "/etc/k8s/admission/kubeconfig"
    - name: MutatingAdmissionWebhook
      configuration:
        apiVersion: apiserver.config.k8s.io/v1
        kind: WebhookAdmissionConfiguration
        kubeConfigFile: "/etc/k8s/admission/kubeconfig"
    ```

    This is the same configuration file used to configure other plugins, such as `PodSecurity`.
    If your distribution or setup uses additional admission plugins, you should also configure those.

2. Create the `kubeconfig` file the admission plugins refer to. Kubewarden only supports client certificate authentication, so generate a TLS key pair,
    and set the kubeconfig to use either client-certificate and client-key or client-certificate-data and client-key-data.

    For example:

    ```yaml
    # /etc/k8s/admission/kubeconfig
    apiVersion: v1
    kind: Config
    users:
    - name: '*.kubewarden.svc'
      user:
        client-certificate: /path/to/client/cert
        client-key: /path/to/client/key
    ```

3. Start the `kube-apiserver` binary with the flag `--admission-control-config-file` pointing to your `AdmissionConfiguration` file.
   The way to do this varies by distribution, and it isn't supported universally, such as in hosted Kubernetes providers.
   Consult the documentation for your Kubernetes distribution.

4. The certificate of the root CA that issued the API server client certificate must be made available to
   the Kubewarden stack.

   Its content has to be put into a `ConfigMap` under the `kubewarden` namespace using a key named `client-ca.crt`.

   Assuming the root CA is available at `/etc/k8s/admission/certs/rootCA.crt`, create the `ConfigMap`
   with the following command:

    ```console
    kubectl create configmap -n kubewarden api-server-mtls \
        --from-file=client-ca.crt=/etc/k8s/admission/certs/rootCA.crt
    ```

5. Finally, when installing the `kubewarden-controller` Helm chart,
   make sure to enable the following values:

     - `mTLS.enable`: must be set to `true`.
     - `mTLS.configMapName`: must be set to name of the `ConfigMap` that was previously created.

    Given the `ConfigMap` was named `api-server-mtls`, the Helm command to install the `kubewarden-controller` is:

    ```console
    helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller \
        --set mTLS.enable=true \
        --set mTLS.configMapName=api-server-mtls
    ```

    The Kubewarden controller creates a client certificate for use by the audit scanner component.
    The certificate is automatically rotated, by the controller, when needed.
