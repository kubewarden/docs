---
sidebar_label: "Quickstart"
title: ""
---

# Rancher UI Extension

This section describes how to install the Kubewarden UI as an extension of [Rancher Manager](https://github.com/rancher/rancher).

:::caution
This requires a running instance of Rancher Manager `v2.7.0` or greater.
:::

## Install

The Kubewarden UI is installed as a global extension, however, the Kubewarden controller will be installed through the Rancher UI as a cluster scoped resource.

### Create the UI extension repository

With Rancher Extensions enabled, navigate to the Extensions page from the side-navigation and select "Manage Repositories" within the action menu (the three dots) in the top-right corner of the page. Create a new Helm index repository with `https://kubewarden.github.io/ui` for the Index URL.

### Add the Kubewarden extension

Once the repository is added to the list, navigate back to the Extensions page and you will see the Kubewarden Extension is available. Install the latest version and you will be prompted to reload the page.

After installation of the extension you will then be able to install Kubewarden into your desired Cluster. 

### Install Kubewarden

Within your cluster a new menu item will appear in the side-menu for Kubewarden, this overview page will guide you through the installation process by completing some prerequisites.

## Post-Installation

After the installation is complete a few items will be listed under the Kubewarden menu, namely PolicyServers, ClusterAdmissionPolicies, and AdmissionPolicies. From here you can create Policy Servers and Policies to control behavior within your cluster.

___Policy Server detail view___
![UI PolicyServer Detail](/img/ui_policyserver_detail.png)

___Admission Policy creation view___
![UI Policy Create](/img/ui_policy_create.png)

### Additional Features

For installing additional features, follow the instructions in these docs to include [Metrics](/operator-manual/ui-extension/metrics) or [Tracing](/operator-manual/ui-extension/tracing).

___Policy tracing logs___
![UI Policy Tracing Logs](/img/ui_policy_tracing.png)
