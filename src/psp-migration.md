# How to migrate from Kubernetes PSPs to Kubewarden policies?
With the removal of [PodSecurityPolicy](https://kubernetes.io/docs/concepts/security/pod-security-policy/)
in Kubernetes v1.25, you can leverage Kubewarden for admission control on your Kubernetes clusters.
Contrasting with the PSPs, Kubewarden has separate policies to achieve the same goal. Therefore, each Kubewarden policy could be likened to a different
configuration within the spec of a PSP. A mapping of the PSP configuration fields to their respective policies can be found below
in the [mapping table](#mapping-kuberwarden-policies-to-psp-fields). Therefore, the operators have more granular control
of the configuration they want to apply in their clusters. If they want to apply part of the PSP security checks it
is not necessary to define the configurations related to the other fields.

Once you have the Kubewarden instance running, it's time to deploy some policies to replace the `PodSecurityPolicy` object. Start by listing
the PSPs in use. For the sake of this example, the following enforcements have been considered:

- a PSP disabling privileged escalation
- privileged containers
- blocking pods running as root
- forcing a particular user group
- blocking host namespaces
- allowing pod to use the port 443 only


The yaml definition of the aforementioned PSP would look like the below:

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

Let's create Kubewarden policies to achieve the same goal. One thing that you need to know about Kubewarden policies is that every rule will be enforced by a separate policy. In our example, individual policies will be required for the enforcement of user and group configuration, host namespaces,  privileged escalation, and for the privileged container configuration.

Let's start with blocking container escalation. For that you can deploy a policy as shown below:

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

If you notice, we have specified `default_allow_privilege_escalation` to assume a value `false`. Once this policy starts running, it will restrict pods trying to run with more privileges than the parent container by default.

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

Now, to enforce the user and groups configuration, you can use the [user-group-psp policy](https://github.com/kubewarden/user-group-psp-policy)

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

Notice the policy is configured as `mutation: true`. This is required because the policy will add [supplementalGroups](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups) when the user does not define them.

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

Also, the example below also demonstrates the addition of a [Supplemental group](https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups), despite it not being defined by us.

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

To replace the PSP configuration that blocks privileged containers, it's necessary to deploy the [pod-privileged policy](https://github.com/kubewarden/pod-privileged-policy). This policy does not require any settings. Once running, it will block privileged pods.

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

To test the policy, we can try running a pod with privileged configuration enabled:

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

To complete the PSP migration exercise, it's necessary to disable host namespace sharing.
To do that, we shall be using the [`host-namespace-psp` policy](https://github.com/kubewarden/host-namespaces-psp-policy).
It allows the cluster administrator to block IPC, PID, and network namespaces individually and set the ports
that the pods can be exposed on the host IP.

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

The pod should be only able to expose the port 443 and should throw an error when other port numbers are configured against the hostPort section.

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

