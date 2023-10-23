---
sidebar_label: "Rancher Fleet"
title: "Managing Kubewarden with Rancher Fleet"
description: Managing Kubewarden with Rancher Fleet.
keywords: [kubernetes, kubewarden, rancher fleet]
---

You can manage Kubewarden Helm charts,
like other Helm charts, with [Rancher Fleet](https://fleet.rancher.io/).
Rancher Fleet uses Kubernetes CRDs
to define a GitOps approach to managing Kubernetes clusters.
It does this by defining [Fleet Bundles](https://fleet.rancher.io/concepts).

## Installing

The Kubewarden charts are standard charts,
they have dependencies (such as `cert-manager`),
and depend transitively on each other

`kubewarden-crds` ← `kubewarden-controller` ← `kubewarden-defaults`

See the [Quickstart docs](https://docs.kubewarden.io/quick-start))
for more information.

Using Rancher Fleet, you can code the chart dependencies using
`dependsOn` in the [`fleet.yaml`](https://fleet.rancher.io/ref-fleet-yaml) file.

You may see transient errors until the charts are ready, such as:

```console
ErrApplied(1) [Cluster fleet-local/local: dependent bundle(s) are not ready:
[kubewarden-example-helm-kubewarden-controller]]
```

These errors don't signify a problem,
and once the charts have finished deployment,
they no longer appear.

## Removing

:::caution

When removing the GitRepo, all 3 Kubewarden charts get removed at once.
This means the `kubewarden-crds` chart gets removed.

Kubewarden uses a pre-delete helm hook job in `kubewarden-controller` chart that deletes the default policy-server.
This pre-delete hook is necessary to vacate the webhooks of the policies before deleting the PolicyServer.
This is true any Policy Engine.
If not, the cluster may have webhooks for policies that don't exist anymore
so rejecting everything and being in a failed state.

Removing the GitRepo, and hence the `kubewarden-crds` chart,
at the same time as the `kubewarden-controller` chart makes the pre-delete hook job fail.
It means the removal is incomplete, leaving 'debris' in the cluster.

:::

Uninstalling CRDs automatically isn't normally supported by any tooling, and
Rancher Fleet is no exception.

To perform a correct removal,
make sure to first remove the Bundle for `kubewarden-defaults` from the cluster.
Do this by committing those changes to the repository holding
the Fleet configuration and then waiting until it's applied.
Then remove `kubewarden-controller` in the same way,
and lastly, remove `kubewarden-crds`.

Another option is to add 2 GitRepos, one for the CRDs only,
and another for the rest of the Kubewarden charts.
This lets you remove the Kubewarden charts first and the Kubewarden CRDs last.

## Example

For an example of Fleet bundle definitions see
[github.com/kubewarden/fleet-example](https://github.com/kubewarden/fleet-example).
