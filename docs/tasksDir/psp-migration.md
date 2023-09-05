---
sidebar_label: "PSP migration"
title: "PodSecurityPolicy migration"
description: Discusses PSP migration to Kubewarden policies after Kubernetes v1.25.
keywords: [kubewarden, kubernetes, appvia, psp, podsecuritypolicy]
---

For Kubernetes ≥ v1.25. [PodSecurityPolicy](https://kubernetes.io/docs/concepts/security/pod-security-policy/) (PSP) is removed.
Now you can use Kubewarden for admission control on your Kubernetes clusters.

Kubewarden has separate policies to achieve the same goal as a monolithic PSP configuration.
Each Kubewarden policy definition functions as a different configuration section in the specification of a PSP.
The mapping of PSP configuration fields to their respective Kubewarden policies is in the [mapping table](#mapping-kuberwarden-policies-to-psp-fields) below.

With Kubewarden, operators have granular control of policy configuration in their clusters.

With a Kubewarden instance, you can deploy policies to replace the `PodSecurityPolicy` object.
We consider these rules in this example::

- a PSP disabling privileged escalation
- privileged containers
- blocking pods running as root
- forcing a particular user group
- blocking host namespaces
- allowing a pod to use only port 443

The YAML definition of this PSP is:

<details>

<summary>PSP YAML definition</summary>

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  allowPrivilegeEscalation: false
  runAsUser:
    rule: MustRunAsNonRoot
  supplementalGroups:
    rule: MustRunAs
    ranges:
      - min: 1000
        max: 65535
  privileged: false
  hostNetwork: false
  hostIPC: false
  hostPID: false
  hostPorts:
    - min: 443
      max: 443
```

</details>

## Kubewarden replacements for PSP

Now we will create Kubewarden policies to achieve the same goal.
You enforce each rule with a separate Kubewarden policy.
So, in this example, you need a separate policy for the enforcement of each of:

- privileged escalation
- user and group configuration
- host namespaces
- privileged container configuration.

### Blocking container privilege escalation

You can deploy a policy as shown below:

<details>

<summary><code>kubectl</code> command for policy deployment</summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-allow-privilege-escalation
spec:
  module: ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v0.2.6
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    default_allow_privilege_escalation: false
EOF
```

</details>

In that command, we have specified `default_allow_privilege_escalation` to be `false`.
This policy restricts pods that try to run with more privileges than the parent container.

<details>

<summary>Output from <code>kubectl</code> that attempts to raise privilege</summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    securityContext:
      allowPrivilegeEscalation: true
  - name: sidecar
    image: sidecar
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-allow-privilege-escalation.kubewarden.admission" denied the request: one of the containers has privilege escalation enabled
```

</details>

### User and group configuration

Now, to enforce the user and group configuration, you can use the [user-group-psp policy](https://github.com/kubewarden/user-group-psp-policy)

<details>

<summary><code>kubectl</code> command to use <code>user-group-psp-policy</code></summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-user-group
spec:
  module: ghcr.io/kubewarden/policies/user-group-psp:v0.4.9
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: true
  settings:
    run_as_user:
      rule: MustRunAsNonRoot
    supplemental_groups:
      rule: MustRunAs
      ranges:
        - min: 1000
          max: 65535
EOF
```

</details>

You should configure the policy with `mutation: true`.
It's required because the policy will add [supplementalGroups](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups) when the user does not define them.

So, now users cannot deploy pods running as root:

<details>

<summary>Example output where <code>runAsNonRoot: false</code></summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    securityContext:
      runAsNonRoot: false
      runAsUser: 0
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-user-group-fb836.kubewarden.admission" denied the request: RunAsNonRoot should be set to true
```

</details>

<details>

<summary>Example output where <code>runAsUser: 0</code></summary>

```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    securityContext:
      runAsNonRoot: true
      runAsUser: 0
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-user-group-fb836.kubewarden.admission" denied the request: Invalid user ID: cannot run container with root ID (0)
```

</details>

This example below shows the addition of a [supplemental group](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups), despite it not being defined by us.

<details>

<summary>Example addition of a supplemental group</summary>

```shell
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
EOF
pod/nginx created
$ kubectl get pods -o json nginx | jq ".spec.securityContext"
{
  "supplementalGroups": [
    10000
  ]
}

```

</details>

### Privileged container configuration

You need to replace the older PSP configuration that blocks privileged containers.
It's necessary to deploy the [pod-privileged policy](https://github.com/kubewarden/pod-privileged-policy).
This policy does not need any settings.
Once running, it will block privileged pods.

<details>

<summary>Applying the <code>pod-privileged-policy</code></summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-privileged
spec:
  module: ghcr.io/kubewarden/policies/pod-privileged:v0.2.7
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings: null
EOF
```

</details>

To test the policy, we can try running a pod with privileged configuration enabled:

<details>

<summary>Pod run with privileged configuration enabled</summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
    securityContext:
      privileged: true
  - name: sleeping-sidecar
    image: alpine
    command: ["sleep", "1h"]
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-privileged.kubewarden.admission" denied the request: User 'system:admin' cannot schedule privileged containers
```

</details>

To finish the PSP migration exercise, you need to disable host namespace sharing.
For that, we shall be using the [`host-namespace-psp` policy](https://github.com/kubewarden/host-namespaces-psp-policy).
It allows the cluster administrator to block IPC, PID, and network namespaces individually.
It also sets the ports that the pods can be open on, on the host IP.

<details>

<summary>Disabling namespace sharing and setting ports</summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-hostnamespaces
spec:
  module: pull ghcr.io/kubewarden/policies/host-namespaces-psp:v0.1.6
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    allow_host_ipc: false
    allow_host_pid: false
    allow_host_ports:
      - min: 443
        max: 443
    allow_host_network: false
EOF
```

</details>

We can validate the policy.
The pod should not be able to share host namespaces:

<details>

<summary>Blocking namespace example</summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  hostIPC: true
  hostNetwork: false
  hostPID: false
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  - name: sleeping-sidecar
    image: alpine
    command: ["sleep", "1h"]
EOF

Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has IPC enabled, but this is not allowed
```

```shell
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  hostIPC: false
  hostNetwork: true
  hostPID: false
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  - name: sleeping-sidecar
    image: alpine
    command: ["sleep", "1h"]
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has host network enabled, but this is not allowed
```

```shell
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  hostIPC: false
  hostNetwork: false
  hostPID: true
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  - name: sleeping-sidecar
    image: alpine
    command: ["sleep", "1h"]
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has host PID enabled, but this is not allowed
```

</details>

In this last example, the pod should only be able to expose port 443.
If other ports are configured in `hostPorts` then an error should happen.

<details>

<summary>Attempting to use port 80 in <code>hostPorts</code></summary>

```shell
$ kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
    ports:
      - containerPort: 80
        hostPort: 80
  - name: sleeping-sidecar
    image: alpine
    command: ["sleep", "1h"]
EOF
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod is using unallowed host ports in containers
```

</details>

## Mapping Kuberwarden policies to PSP fields

This table maps PSP configuration fields to corresponding Kubewarden policies.

| PSP field                                                                                                                 | Kubewarden equivalent policy                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [privileged](https://kubernetes.io/docs/concepts/security/pod-security-policy/#privileged)                                | [pod-privileged-policy](https://github.com/kubewarden/pod-privileged-policy)                                  |
| [hostPID](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                              | [host-namespaces-psp-policy](https://github.com/kubewarden/host-namespaces-psp-policy)                        |
| [hostIPC](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                              | [host-namespaces-psp-policy](https://github.com/kubewarden/host-namespaces-psp-policy)                        |
| [hostNetwork](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                          | [host-namespaces-psp-polic](https://github.com/kubewarden/host-namespaces-psp-policy)                         |
| [hostPorts](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                            | [host-namespaces-psp-policy](https://github.com/kubewarden/host-namespaces-psp-policy)                        |
| [volumes](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)                     | [volumes-psp-policy](https://github.com/kubewarden/volumes-psp-policy)                                        |
| [allowedHostPaths](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)            | [hostpaths-psp-policy](https://github.com/kubewarden/hostpaths-psp-policy)                                    |
| [readOnlyRootFilesystem](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)      | [readonly-root-filesystem-psp-policy](https://github.com/kubewarden/readonly-root-filesystem-psp-policy)      |
| [fsgroup](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)                     | [allowed-fsgroups-psp-policy ](https://github.com/kubewarden/allowed-fsgroups-psp-policy)                     |
| [allowedFlexVolumes](https://kubernetes.io/docs/concepts/security/pod-security-policy/#flexvolume-drivers)                | [flexvolume-drivers-psp-policy](https://github.com/kubewarden/flexvolume-drivers-psp-policy)                  |
| [runAsUser](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups)                           | [user-group-psp-policy](https://github.com/kubewarden/user-group-psp-policy)                                  |
| [runAsGroup](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups)                          | [user-group-psp-policy](https://github.com/kubewarden/user-group-psp-policy)                                  |
| [supplementalGroups](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups)                  | [user-group-psp-policy ](https://github.com/kubewarden/user-group-psp-policy)                                 |
| [allowPrivilegeEscalation](https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation)        | [allow-privilege-escalation-psp-policy ](https://github.com/kubewarden/allow-privilege-escalation-psp-policy) |
| [defaultAllowPrivilegeEscalation](https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation) | [allow-privilege-escalation-psp-policy](https://github.com/kubewarden/allow-privilege-escalation-psp-policy)  |
| [allowedCapabilities](https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities)                     | [capabilities-psp-policy](https://github.com/kubewarden/capabilities-psp-policy)                              |
| [defaultAddCapabilities](https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities)                  | [capabilities-psp-policy](https://github.com/kubewarden/capabilities-psp-policy)                              |
| [requiredDropCapabilities](https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities)                | [capabilities-psp-policy](https://github.com/kubewarden/capabilities-psp-policy)                              |
| [seLinux](https://kubernetes.io/docs/concepts/security/pod-security-policy/#selinux)                                      | [selinux-psp-policy](https://github.com/kubewarden/selinux-psp-policy)                                        |
| [allowedProcMountTypes](https://kubernetes.io/docs/concepts/security/pod-security-policy/#allowedprocmounttypes)          | [allowed-proc-mount-types-psp-policy](https://github.com/kubewarden/allowed-proc-mount-types-psp-policy)      |
| [apparmor](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)                                    | [apparmor-psp-policy ](https://github.com/kubewarden/apparmor-psp-policy)                                     |
| [seccomp](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)                                     | [seccomp-psp-policy ](https://github.com/kubewarden/seccomp-psp-policy)                                       |
| [forbiddenSysctls](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)                            | [sysctl-psp-policy ](https://github.com/kubewarden/sysctl-psp-policy)                                         |
| [allowedUnsafeSysctls](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)                        | [sysctl-psp-policy ](https://github.com/kubewarden/sysctl-psp-policy)                                         |

## PSP migration script

The Kubewarden team has developed a script for PSP migration.
It uses the migration tool from [AppVia](https://github.com/appvia/psp-migration).
The AppVia tool reads a PSP YAML configuration.
It then generates the corresponding policies.
It does this for Kubewarden and other policy engines.

:::caution

Currently, the AppVia migration tool generates out-of-date Kubewarden policies. Use with caution. We need a pull request for AppVia for which work is ongoing. Contact us for more information if you need to.

:::

The script is available in the Kubewraden [utils](https://github.com/kubewarden/utils/blob/main/scripts/psp-to-kubewarden) repository.
It downloads the AppVia migration tool into the working directory to use.
It processes the PSPs defined in the `kubectl` default context.
Then it prints the Kuberwarden policies definitions on the standard output.
Users can redirect the content to a file or to `kubectl` directly.

Let's take a look at an example. In a cluster with the PSP:

- blocking access to host namespaces
- blocking privileged containers
- not allowing privilege escalation
- dropping container capabilities
- listing the allowed volume types
- defining the allowed users and groups to be used
- controlling the supplemental group applied to volumes
- forcing containers to run in a read-only root filesystem

The following YAML could be used.

<details>

<summary>The PSP configuration</summary>

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  hostNetwork: false
  hostIPC: false
  hostPID: false
  hostPorts:
    - min: 80
      max: 8080
  privileged: false
  # Required to prevent escalations to root.
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  # Allow core volume types.
  volumes:
    - "configMap"
    - "emptyDir"
    - "projected"
    - "secret"
    - "downwardAPI"
    # Assume that ephemeral CSI drivers & persistentVolumes set up by the cluster admin are safe to use.
    - "csi"
    - "persistentVolumeClaim"
    - "ephemeral"
  runAsUser:
    # Require the container to run without root privileges.
    rule: "MustRunAsNonRoot"
  seLinux:
    # This policy assumes the nodes are using AppArmor rather than SELinux.
    rule: "RunAsAny"
  supplementalGroups:
    rule: "MustRunAs"
    ranges:
      # Forbid adding the root group.
      - min: 1
        max: 65535
  fsGroup:
    rule: "MustRunAs"
    ranges:
      # Forbid adding the root group.
      - min: 1
        max: 65535
  readOnlyRootFilesystem: true
```

</details>

Kubewarden policies can be applied directly to a cluster using the following command:

```shell
$ ./psp-to-kubewarden | kubectl apply -f -
Warning: policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+, unavailable in v1.25+
Warning: policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+, unavailable in v1.25+
clusteradmissionpolicy.policies.kubewarden.io/psp-privileged-82bf2 created
clusteradmissionpolicy.policies.kubewarden.io/psp-readonlyrootfilesystem-b4a55 created
clusteradmissionpolicy.policies.kubewarden.io/psp-hostnamespaces-a25a2 created
clusteradmissionpolicy.policies.kubewarden.io/psp-volumes-cee05 created
clusteradmissionpolicy.policies.kubewarden.io/psp-capabilities-34d8e created
clusteradmissionpolicy.policies.kubewarden.io/psp-usergroup-878b0 created
clusteradmissionpolicy.policies.kubewarden.io/psp-fsgroup-3b08e created
clusteradmissionpolicy.policies.kubewarden.io/psp-defaultallowprivilegeescalation-b7e87 created
```

If users want to inspect the policies before applying, it's possible to redirect the content to a file or review it directly in the console

To store the generated policies and view them:

<details>

<summary>
<code>
$ ./psp-to-kubewarden &gt; policies.yaml &amp;&amp; cat policies.yaml
</code>
</summary>

```shell
$ ./psp-to-kubewarden > policies.yaml
$ cat policies.yaml
---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-privileged-82bf2
spec:
  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.10
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings: null

---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-readonlyrootfilesystem-b4a55
spec:
  module: registry://ghcr.io/kubewarden/policies/readonly-root-filesystem-psp:v0.1.3
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings: null

---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-hostnamespaces-a25a2
spec:
  module: registry://ghcr.io/kubewarden/policies/host-namespaces-psp:v0.1.2
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    allow_host_ipc: false
    allow_host_pid: false
    allow_host_ports:
      - max: 8080
        min: 80
    allow_host_network: false

---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-volumes-cee05
spec:
  module: registry://ghcr.io/kubewarden/policies/volumes-psp:v0.1.6
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    allowedTypes:
      - configMap
      - emptyDir
      - projected
      - secret
      - downwardAPI
      - csi
      - persistentVolumeClaim
      - ephemeral

---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-capabilities-34d8e
spec:
  module: registry://ghcr.io/kubewarden/policies/capabilities-psp:v0.1.9
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    allowed_capabilities: []
    required_drop_capabilities:
      - ALL

---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-usergroup-878b0
spec:
  module: registry://ghcr.io/kubewarden/policies/user-group-psp:v0.2.0
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    run_as_user:
      rule: MustRunAsNonRoot
    supplemental_groups:
      ranges:
        - max: 65535
          min: 1
      rule: MustRunAs

---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-fsgroup-3b08e
spec:
  module: registry://ghcr.io/kubewarden/policies/allowed-fsgroups-psp:v0.1.4
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    ranges:
      - max: 65535
        min: 1
    rule: MustRunAs

---
apiVersion: policies.kubewarden.io/v1
kind: ClusterAdmissionPolicy
metadata:
  name: psp-defaultallowprivilegeescalation-b7e87
spec:
  module: >-
    registry://ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v0.1.11
  rules:
    - apiGroups:
        - ""
      apiVersions:
        - v1
      resources:
        - pods
      operations:
        - CREATE
        - UPDATE
  mutating: false
  settings:
    default_allow_privilege_escalation: false

```

</details>

:::tip
The policy names are generated by the PSP migration tool.
You may want to change the name to something more meaningful.
:::

:::note
This script only works in Linux x86_64 machines.
:::
