---
sidebar_label: Quickstart
title: Rancher UI extension quickstart
description: UI extension quickstart for Kubewarden.
keywords: [kubewarden, kubernetes, rancher ui extension]
doc-type: [howto]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-topic: [operator-manual, ui-extension, installation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/ui-extension/install"/>
</head>

This section describes installing the Kubewarden UI as an extension of
[Rancher Manager](https://github.com/rancher/rancher).

:::info
You need a running instance of Rancher Manager `v2.7.0` or greater.
:::

## Install Kubewarden UI Extension

The Kubewarden UI is installed as a global extension,
however,
the Kubewarden controller is installed through the Rancher UI as a cluster scoped resource.

:::note
For air-gapped installations, follow [these steps](../airgap/02-install.md).
:::

Within the Extensions page,
select the "Enable" button and choose the option to add the Rancher Extensions Repository.
When enabled, the "Kubewarden" extension item appears automatically.
Select this item to install the extension.
Once installed, you can install Kubewarden into the required cluster.

### Install Kubewarden

Following the previous steps, within your cluster a new item appears in the side-menu for Kubewarden.
This dashboard page guides you through the installation process, completing the prerequisites.

:::note
During the "App Install" step of the installation wizard,
the "Install Kubewarden" button may remain grayed out.
If this happens, refresh the page and navigate back to this step.
:::

## Post-Installation

After completing the installation the dashboard page and side menu now contain new items,
namely Policy Servers, Cluster Admission Policies, and Admission Policies.
From here you can create Policy Servers and Policies to control behavior within your cluster.

___Dashboard view___
![UI Dashboard](/img/ui_dashboard.png)

### Enabling the default Policy Server and policies

Within the dashboard page you can select the "Install Chart" button to install the
[`kubewarden-defaults`](https://github.com/kubewarden/helm-charts/tree/main/charts/kubewarden-defaults)
Helm chart,
which includes the default Policy Server and a few curated policies.

After installing the chart, you can view the default Policy Server details with the related policies in a sortable table.

___Policy Server detail view___
![UI PolicyServer Detail](/img/ui_policyserver_detail.png)

### Creating policies

When creating policies, you will initially be given a "Custom Policy" option from the Policy Grid.
Provide the required information for your policy's Name, Module, and Rules.

___Creating a custom policy___ 
![UI Policy Whitelist](/img/ui_policy_custom.png)

If you wish to use policies from [ArtifactHub](https://artifacthub.io/packages/search?kind=13),
you will need to add `artifacthub.io` to the `management.cattle.io.settings/whitelist-domain` setting.
This allows your Rancher instance to retrieve package information from ArtifactHub.
Use the "Add ArtifactHub To Whitelist" button to automatically add the domain,
the Policy Grid will refresh with the fetched policies.

___ArtifactHub whitelist banner___ 
![UI Policy Whitelist](/img/ui_policy_whitelist.png)

___Policy Grid___
![UI Policy Create](/img/ui_policy_create.png)

### Additional features

Follow the instructions to include [Monitoring](./02-metrics.md) or [Tracing](./03-tracing.md).

## Airgap installation

:::caution
This requires Rancher Manager version `v2.8.0` or greater.
:::

As Kubewarden is a Rancher Official Extension,
the Rancher team provides a mechanism to automatically generate an Extension Catalog Image.
This is added to the `rancher-images.txt` file when
[installing Rancher Manager](https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/publish-images#1-find-the-required-assets-for-your-rancher-version)
for air-gapped instances.

Once this image has been mirrored to a registry accessible to your air-gapped cluster,
you can import the image within the Rancher UI.
This creates a local Helm repository with the Kubewarden UI chart for installation.

### Installation steps

1. [Create](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/kubernetes-resources-setup/secrets)
a registry secret within the `cattle-ui-plugin-system` namespace.
Enter the domain of the image address in the __Registry Domain Name__ field.

1. Navigate back to the __Extensions__ page
(for example, `https://cluster-ip/dashboard/c/local/uiplugins`).

1. On the top right, select __Manage Extension Catalogs__.
![Manage Catalogs](/img/ui_airgap_01.png)

1. Select the __Import Extension Catalog__ button.
![Import Catalogs](/img/ui_airgap_02.png)

1. Enter the image address in the __Catalog Image Reference__ field.

1. Select the secret you just created from the __Pull Secrets__ drop-down menu.
![Enter Catalog Info](/img/ui_airgap_03.png)

1. Click __Load__. The extension will now be __Pending__.

1. Return to the __Extensions__ page.

1. Select the __Available__ tab,
and click the __Reload__ button to make sure that the list of extensions is up to date.
![Install Kubewarden](/img/ui_airgap_04.png)

1. Find the Kubewarden extension you just added, and select the __Install__ button.
