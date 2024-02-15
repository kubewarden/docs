---
sidebar_label: Quickstart
title: Rancher UI extension quickstart
description: UI extension quickstart for Kubewarden.
keywords: [kubewarden, kubernetes, rancher ui extension]
doc-type: [howto]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-topic: [operator-manual, ui-extension, installation]
---

This section describes how to install the Kubewarden UI as an extension of [Rancher Manager](https://github.com/rancher/rancher).

:::caution
This requires a running instance of Rancher Manager `v2.7.0` or greater.
:::

## Install Kubewarden UI Extension

The Kubewarden UI is installed as a global extension, however, the Kubewarden controller will be installed through the Rancher UI as a cluster scoped resource.

:::note
For air-gapped installations, follow [these steps](#airgap-installation).
:::

Within the Extensions page, click on the "Enable" button and select the option to add the Rancher Extensions Repository.
Once enabled the "Kubewarden" extension item will appear automatically. 
Click on this item to install the extension. 
Once installed, you will then be able to install Kubewarden into your desired Cluster.

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

For installing additional features, follow the instructions in these docs to include [Metrics](./02-metrics.md) or [Tracing](./03-tracing.md).

## Airgap Installation

:::caution
This requires Rancher Manager version `v2.8.0` or greater.
:::

As Kubewarden is considered a Rancher Official Extension, the Rancher team provides a mechanism to automatically generate an Extension Catalog Image.
This will be added to the `rancher-images.txt` file when [installing Rancher Manager](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/publish-images#1-find-the-required-assets-for-your-rancher-version) for air-gapped instances.

Once this image has been mirrored to a registry that is accessible to your air-gapped cluster, you will be able to import the image within the Rancher UI.
This creates a local Helm repository with the Kubewarden UI chart for installation.

### Installation Steps

1. [Create](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/kubernetes-resources-setup/secrets) a registry secret within the `cattle-ui-plugin-system` namespace. Enter the domain of the image address in the **Registry Domain Name** field.

1. Navigate back to the **Extensions** page (for example, `https://cluster-ip/dashboard/c/local/uiplugins`).

1. On the top right, click **⋮ > Manage Extension Catalogs**.
![Manage Catalogs](/img/ui_airgap_01.png)

1. Select the **Import Extension Catalog** button.
![Import Catalogs](/img/ui_airgap_02.png)

1. Enter the image address in the **Catalog Image Reference** field.

1. Select the secret you just created from the **Pull Secrets** drop-down menu.
![Enter Catalog Info](/img/ui_airgap_03.png)

1. Click **Load**. The extension will now be **Pending**.

1. Return to the **Extensions** page.

1. Select the **Available** tab, and click the **Reload** button to make sure that the list of extensions is up to date.
![Install Kubewarden](/img/ui_airgap_04.png)

1. Find the Kubewarden extension you just added, and click the **Install** button.
