---
sidebar_label: Rancher Backup Operator
sidebar_position: 140
title: Backup and restore with Rancher Backup Operator
description: Backup and restore with Rancher Backup Operator
keywords: [kubernetes, kubewarden, rancher backup operator, backup, restore]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, rancher-backup-operator]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/Rancher-Backup-Operator"/>
</head>

The `rancher-backup` operator can be used to backup and restore Rancher on any
Kubernetes cluster.

Since version X.Y.Z, `rancher-backup` has support for Kubewarden. This includes:

- the default Rancher Namespace `catttle-kubewarden-system` (or
  `cattle-kubewarden-*`), and the default Kubewarden Namespace `kubewarden`.
- Kubewarden needed resources installed via the Helm charts.
- Kubewarden CRDs, which get reconciled after restore by the Kubewarden controller.
- The `policy-reporter` subchart of the `kubewarden-controller` chart, for their
  default values. This doesn't include the Grafana integration nor other plugins.

The backup process doesn't include Secrets created to [configure PolicyServers
for private registries](./policy-servers/private-registry#creating-the-secret)
unless those are correctly labeled.

## Installing Rancher Backup Operator

Follow the [Rancher
documentation](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/backup-restore-and-disaster-recovery).
For a Minikube install using the PersistentVolumes of type `hostPath` named
`standard` that Minikube supports out of the box, the installation would be as
follows:

```console
$ helm repo add rancher-charts https://charts.rancher.io
$ helm repo update
$ helm install --wait --create-namespace -n cattle-resources-system \
    rancher-backup-crd rancher-charts/rancher-backup-crd
$ helm install --wait -n cattle-resources-system \
    rancher-backup rancher-charts/rancher-backup \
    --set persistence.enabled=true --set persistence.storageClass=standard
```

## Backup

Use the `rancher-resource-set-full` to backup the Kubewarden Secrets. These
include the TLS Secrets that get created on Helm installation.

If you prefer the use `rancher-resource-basic`, please remember to backup or
manually create needed TLS Secrets.

Here is an example of performing an unencrypted backup to the default location
with the `rancher-resource-set-full`:

```shell
$ kubectl apply -f - <<EOF
apiVersion: resources.cattle.io/v1
kind: Backup
metadata:
  name: default-location-backup
spec:
  resourceSetName: rancher-resource-set-full
EOF
backup.resources.cattle.io/default-location-backup created
```

The `rancher-backup` logs or the backup will show the creation of the backup file:

```
$ kubectl logs -n cattle-resources-system -l app.kubernetes.io/name=rancher-backup -f
...
INFO[2025/06/26 10:07:48] Processing backup default-location-backup
INFO[2025/06/26 10:07:48] For backup CR default-location-backup, filename: default-location-backup-32d64f39-d3c7-4331-9101-8ca493bd9d2e-2025-06-26T10-07-48Z
...
INFO[2025/06/26 10:07:49] Done with backup
```

You can also see its status by describing the resource:

```shell
$ kubectl get backups
NAME                      LOCATION   TYPE       LATEST-BACKUP                                                                              RESOURCESET                 AGE    STATUS
default-location-backup   PV         One-time   default-location-backup-43f3ccb7-5624-4eed-9c3b-1c15d287080e-2025-06-26T15-53-27Z.tar.gz   rancher-resource-set-full   111s   Completed
```

See the Rancher docs for more [backup examples](https://ranchermanager.docs.rancher.com/reference-guides/backup-restore-configuration/examples#backup).

## Restore

To restore the unencrypted backup from the default location, take the filename
from the LATEST-BACKUP column when displaying the backup resource to create a Restore resource:

```shell
$ kubectl apply -f - <<EOF
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-default
spec:
  backupFilename: default-location-backup-32d64f39-d3c7-4331-9101-8ca493bd9d2e-2025-06-26T10-07-48Z.tar.gz
EOF
restore.resources.cattle.io/restore-default created

$ kubectl get restores
NAME              BACKUP-SOURCE   BACKUP-FILE                                                                                AGE   STATUS
restore-default   PV              default-location-backup-43f3ccb7-5624-4eed-9c3b-1c15d287080e-2025-06-26T15-53-27Z.tar.gz   6s    Completed
```

See the Rancher docs for more [restore examples](https://ranchermanager.docs.rancher.com/reference-guides/backup-restore-configuration/examples#restore).
