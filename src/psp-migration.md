# How to migrate from Kubernetes PSPs to Kubewarden policies?
Kubewarden can be used to replace all deprecated [PodSecurityPolicy](https://kubernetes.io/docs/concepts/security/pod-security-policy/). Different from the PSPs, Kubewarden has separated
policies to achieve the same goal of different fields from the PSPs. The policies to cover each of the PSP configuration fields can be found below in the [mapping table](#mapping-kuberwarden-policies-to-psp-fields).

To start deploying the Kubewarden policies to replace the PSPs, you need to install Kubewarden in your cluster. For that, please, refer to
the [installation guide](./quick-start.md).

Once you have our Kubewarden instance running, it's time to deploy some policies to replace PodSecurtyPolicy and keep your cluster secure. For that, you can start by listing
the PSP in use. Let's suppose you have a PSP disabling privileged escalation, privileged containers, blocking pods running as root, forcing some user group, blocking host namespaces and allowing pod to use the port 443 only.

Your PSP would be similar to this:

```console
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

Now, it's necessary to create the Kuberwarden policies to archive the same goal. It will be necessary 4 different policies. One for the user and group configuration, one for the host namespace, one for the privileged escalation and another for the privileged container configuration.

Let's start by blocking container escalation. For that you can deploy a policy like this:

```console
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-allowprivilegeescalation
spec:
  module: registry://ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v0.1.11
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

Once this policy start to run, it will block pods trying to escalate its permissions:

```console
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
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-allowprivilegeescalation.kubewarden.admission" denied the request: one of the containers has privilege escalation enabled
```

Now, to enforce the user and groups configuration, you can use the [user-group-psp](https://github.com/kubewarden/user-group-psp-policy) policy

```console
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-usergroup
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

Notice the policy is configured as `mutation: true`. This is required because the policy will add supplemental user groups when the user does not define them.

So, now users cannot deploy pods running as root:

```console
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
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-usergroup-fb836.kubewarden.admission" denied the request: RunAsNonRoot should be set to true
```

```console
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
Error from server: error when creating "STDIN": admission webhook "clusterwide-psp-usergroup-fb836.kubewarden.admission" denied the request: Invalid user ID: cannot run container with root ID (0)
```

 And a group should be added when not defined:

```console
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

To replace the PSP configuration to block privileged containers it's necessary to deploy the pod-privileged policy. This policy does not require any settings, once running, it will block pod privileged pods.

```console
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-privileged
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
EOF
```

To test the policy, we can try to run a pod with the privileged configuration enabled:

```console
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

To finish the migration of the PSP. It's necessary to disable host namespace sharing. As all the previous before, we can use another policy for that, the `host-namespace-psp`. It allow the cluster administrator block IPC, PID and Network namespaces individually. As well as set which ports the pods can export.

```console
$ kubectl apply -f - <<EOF
apiVersion: policies.kubewarden.io/v1alpha2
kind: ClusterAdmissionPolicy
metadata:
  name: psp-hostnamespaces
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
      - min: 443
        max: 443
    allow_host_network: false
EOF
```

Again, let's validate the policy. The pod should not be able to share host namespaces:

```console
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


```console
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

```console
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

And the pod can export only the port 443:

```console
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

## Mapping Kuberwarden policies to PSP fields

The following table show which Kubewarden policy can be used to replace each PSP configuration

| PSP field      | Kubewarden equivalent policy  |
|--------------|-------------------------------  |
| [privileged](https://kubernetes.io/docs/concepts/security/pod-security-policy/#privileged)                      | [pod-privileged-policy](https://github.com/kubewarden/pod-privileged-policy) |
| [hostPID](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                         | [host-namespaces-psp-policy](https://github.com/kubewarden/host-namespaces-psp-policy) |
| [hostIPC](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                         | [host-namespaces-psp-policy](https://github.com/kubewarden/host-namespaces-psp-policy) |
| [hostNetwork](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                     | [host-namespaces-psp-polic](https://github.com/kubewarden/host-namespaces-psp-policy)|
| [hostPorts](https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces)                       | [host-namespaces-psp-policy](https://github.com/kubewarden/host-namespaces-psp-policy) |
| [volumes](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)                         | [volumes-psp-policy](https://github.com/kubewarden/volumes-psp-policy) |
| [allowedHostPaths](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)                | [hostpaths-psp-policy](https://github.com/kubewarden/hostpaths-psp-policy) |
| [readOnlyRootFilesystem](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)          | [readonly-root-filesystem-psp-policy](https://github.com/kubewarden/readonly-root-filesystem-psp-policy) |
| [fsgroup](https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems)                         | [allowed-fsgroups-psp-policy ](https://github.com/kubewarden/allowed-fsgroups-psp-policy ) |
| [allowedFlexVolumes](https://kubernetes.io/docs/concepts/security/pod-security-policy/#flexvolume-drivers)              | [flexvolume-drivers-psp-policy](https://github.com/kubewarden/flexvolume-drivers-psp-policy) |
| [runAsUser](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups)                       | [user-group-psp-policy](https://github.com/kubewarden/user-group-psp-policy) |
| [runAsGroup](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups)                      | [user-group-psp-policy](https://github.com/kubewarden/user-group-psp-policy) |
| [supplementalGroups](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups)              | [user-group-psp-policy ](https://github.com/kubewarden/user-group-psp-policy ) |
| [allowPrivilegeEscalation](https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation)        | [allow-privilege-escalation-psp-policy ](https://github.com/kubewarden/allow-privilege-escalation-psp-policy ) |
| [defaultAllowPrivilegeEscalation](https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation) | [allow-privilege-escalation-psp-policy](https://github.com/kubewarden/allow-privilege-escalation-psp-policy) |
| [allowedCapabilities](https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities)             | [capabilities-psp-policy](https://github.com/kubewarden/capabilities-psp-policy) |
| [defaultAddCapabilities](https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities)          | [capabilities-psp-policy](https://github.com/kubewarden/capabilities-psp-policy) |
| [requiredDropCapabilities](https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities)        | [capabilities-psp-policy](https://github.com/kubewarden/capabilities-psp-policy) |
| [seLinux](https://kubernetes.io/docs/concepts/security/pod-security-policy/#selinux)                         | [selinux-psp-policy](https://github.com/kubewarden/selinux-psp-policy) |
| [allowedProcMountTypes](https://kubernetes.io/docs/concepts/security/pod-security-policy/#allowedprocmounttypes)           | [allowed-proc-mount-types-psp-policy](https://github.com/kubewarden/allowed-proc-mount-types-psp-policy) |
| [apparmor](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)                        | [apparmor-psp-policy ](https://github.com/kubewarden/apparmor-psp-policy ) |
| [seccomp](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)                         | [seccomp-psp-policy ](https://github.com/kubewarden/seccomp-psp-policy ) |
| [forbiddenSysctls](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)                | [sysctl-psp-policy ](https://github.com/kubewarden/sysctl-psp-policy ) |
| [allowedUnsafeSysctls](https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor)            | [sysctl-psp-policy ](https://github.com/kubewarden/sysctl-psp-policy ) |

