# Local evaluation with k3s

You need a Kubernetes cluster running and accessible through a
`kubeconfig` file.  This can be done quickly using k3s.

The following commands download k3s and then run it locally:

```shell
$ wget https://github.com/rancher/k3s/releases/download/v1.19.4%2Bk3s1/k3s
$ chmod +x k3s
$ ./k3s server --disable-agent
```
The policy will be downloaded as an OCI artifact from
[here](https://github.com/orgs/chimera-kube/packages/container/package/policies%2Fpod-toleration).

```shell
$ CHIMERA_RESOURCES=pods \
  CHIMERA_EXPORT_TAINT_KEY=dedicated \
  CHIMERA_EXPORT_TAINT_VALUE=tenantA \
  CHIMERA_EXPORT_ALLOWED_GROUPS=system:masters \
  CHIMERA_WASM_URI=registry://ghcr.io/chimera-kube/policies/pod-toleration:v0.0.2 \
  KUBECONFIG=$HOME/.kube/k3s.yaml \
  ./chimera-admission-amd64
```

Now we can see the policy in action by creating the following Pod:

```shell
$ k3s kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "tenantA"
    effect: "NoSchedule"
EOF
```

The `chimera-admission` instance will accept the creation request because the
`kubeconfig` used by k3s authenticates us as user named `kubernetes-admin` who
belongs to the `sytem:masters` and to the `system:authenticated`
groups.

Let's remove the Pod now, so that we can make one last test:

```shell
$ k3s kubectl delete pod nginx
```

Stop the previous admission server execution, and re-run it with
a different tuning of the Chimera Policy:

```shell
$ CHIMERA_RESOURCES=pods \
  CHIMERA_EXPORT_TAINT_KEY=dedicated \
  CHIMERA_EXPORT_TAINT_VALUE=tenantA \
  CHIMERA_EXPORT_ALLOWED_GROUPS=some-other-user-group \
  CHIMERA_WASM_URI=registry://ghcr.io/chimera-kube/policies/pod-toleration:v0.0.2 \
  KUBECONFIG=$HOME/.kube/k3s.yaml \
  ./chimera-admission-amd64
```

Now the policy accepts this toleration only when a user who belongs to the
`trusted-users` group is the author of the request.

Let's create the same Pod one last time:

```shell
$ k3s kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  tolerations:
  - key: "dedicated"
    operator: "Equal""
    value: "tenantA"
    effect: "NoSchedule"
EOF
Error from server: error when creating "STDIN": admission webhook "rule-0.wasm.admission.rule" denied the request: User not allowed to create Pod objects with toleration: key: example-key, operator: Exists, effect: NoSchedule)
```

The admission controller is properly working: the creation request has
been rejected because it's not done by a user who belongs to one of the
valid groups.
