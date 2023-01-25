---
sidebar_label: "Quickstart"
title: ""
---

# Rancher UI Extension

This section describes how to install the Kubewarden UI as an extension of [Rancher Manager](https://github.com/rancher/rancher).

:::caution
This requires a running instance of Rancher Manager `v2.7.0` or greater.
:::

## Install Kubewarden UI Extension

The Kubewarden UI is installed as a global extension, however, the Kubewarden controller will be installed through the Rancher UI as a cluster scoped resource.

Within the Extensions page, click on the "Enable" button and select the option to add the Rancher Extensions Repository, once enabled the "Kubewarden" extension item will appear automatically. Click on this item to install the extension. Once installed, you will then be able to install Kubewarden into your desired Cluster.

### Install Kubewarden

Within your cluster a new menu item will appear in the side-menu for Kubewarden, this dashboard page will guide you through the installation process by completing some prerequisites.

## Post-Installation

After the installation is complete a few items will be listed under the Kubewarden menu, namely PolicyServers, ClusterAdmissionPolicies, and AdmissionPolicies. From here you can create Policy Servers and Policies to control behavior within your cluster.

___Policy Server detail view___
![UI PolicyServer Detail](/img/ui_policyserver_detail.png)

___Admission Policy creation view___
![UI Policy Create](/img/ui_policy_create.png)

### Additional Features

For installing additional features, follow the instructions in these docs to include [Metrics](./metrics.md) or [Tracing](./tracing.md).
