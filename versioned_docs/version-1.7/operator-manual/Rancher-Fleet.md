---
sidebar_label: "Rancher Fleet"
title: ""
---

# Managing Kubewarden with Rancher Fleet

The Kubewarden Helm charts, like other Helm charts, can be managed via [Rancher
Fleet](https://fleet.rancher.io/). Rancher Fleet uses Kubernetes CRDs to define
a GitOps approach for managing Kubernetes clusters. It does this by defining
Fleet Bundles.

### Installing

The Kubewarden charts are normal charts, they have dependencies (such as
`cert-manager`), and depend transitively on each other (`kubewarden-crds` ←
`kubewarden-controller` ← `kubewarden-defaults`, see the [Quickstart
docs](https://docs.kubewarden.io/quick-start)).

On Rancher Fleet, one can codify the chart dependencies using
`dependsOn` in the [_fleet.yaml_ file](https://fleet.rancher.io/gitrepo-structure#fleetyaml).

At the time of writing and by how Rancher Fleet works, one may see transient
errors until the charts are ready, such as:
```
ErrApplied(1) [Cluster fleet-local/local: dependent bundle(s) are not ready:
[kubewarden-example-helm-kubewarden-controller]]
```
These errors don't signify a problem, and once each chart has finished
deploying, they will be gone.

### Removing

:::caution

When blindly removing the GitRepo, all 3 Kubewarden charts get removed at once.
This means the `kubewarden-crds` chart gets removed.

Kubewarden uses a pre-delete helm hook job in `kubewarden-controller` chart that
deletes the default policy-server. This pre-delete hook is needed because we
need to vacate the webhooks of the policies (this is true any Policy Engine)
before deleting the PolicyServer. If not, the cluster will have webhooks for
policies that don't exist anymore, rejecting everything and being in a
failed state.

Removing the GitRepo and hence the `kubewarden-crds` chart at the same time as
the `kubewarden-controller` chart will make the pre-delete hook job to fail, and
the removal to be incomplete, leaving leftovers in the cluster.

:::

Uninstalling CRDs automatically is normally not supported in any tooling, and
Rancher Fleet is no exception.

If you want to perform a correct removal, make sure to remove first the Bundle
for `kubewarden-defaults` from the cluster by commiting those changes to the
repo holding the Fleet configuration and waiting for it being applied. Then
`kubewarden-controller` in the same way, and last, `kubewarden-crds`.

Another option is to add 2 GitRepos, one for the CRDs only, and another for the
rest of the Kubewarden charts. This way you can remove the Kubewarden charts
first and the Kubewarden CRDs last.

### Example

Have a look at [github.com/kubewarden/fleet-example](https://github.com/kubewarden/fleet-example)
for an example of Fleet Bundle definitions.
