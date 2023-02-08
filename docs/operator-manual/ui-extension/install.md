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

:::note
During the "App Install" step of the installation wizard, the "Install Kubewarden" button may remain grayed out. If this is the case, just refresh the page and navigate back to this step. 
:::

## Post-Installation

After the installation is complete the dashboard page and side menu will contain new items, namely Policy Servers, Cluster Admission Policies, and Admission Policies. From here you can create Policy Servers and Policies to control behavior within your cluster.

___Dashboard view___
![UI Dashboard](/img/ui_dashboard.png)

### Enabling the default Policy Server and policies

Within the dashboard page you can follow the "Install Chart" button to install the [`kubewarden-defaults`](https://github.com/kubewarden/helm-charts/tree/main/charts/kubewarden-defaults) Helm chart, which includes the default Policy Server and a few currated policies.

After installing the chart you can view the default Policy Server details with the related policies in a sortable table.  

___Policy Server detail view___
![UI PolicyServer Detail](/img/ui_policyserver_detail.png)

### Creating Policies

When creating policies you will initially be given a "Custom Policy" option from the Policy Grid. Provide the required information for your policy's Name, Module, and Rules.

___Creating a custom policy___ 
![UI Policy Whitelist](/img/ui_policy_custom.png)

If you wish to leverage policies from [ArtifactHub](https://artifacthub.io/packages/search?kind=13) you will need to add `artifacthub.io` to the `management.cattle.io.settings/whitelist-domain` setting. This allows your Rancher instance to retieve package information from ArtifactHub. Use the "Add ArtifactHub To Whitelist" button to automatically add the domain, the Policy Grid will refresh with the fetched policies.  

___ArtifactHub whitelist banner___ 
![UI Policy Whitelist](/img/ui_policy_whitelist.png)

___Policy Grid___
![UI Policy Create](/img/ui_policy_create.png)


### Additional Features

For installing additional features, follow the instructions in these docs to include [Metrics](./metrics.md) or [Tracing](./tracing.md).
