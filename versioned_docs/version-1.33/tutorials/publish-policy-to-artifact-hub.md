---
sidebar_label: Publish to Artifact Hub
sidebar_position: 40
title: Publish policies to Artifact Hub
description: A brief introduction to publishing Kubewarden policies on Artifact Hub.
keywords: [kubewarden, kubernetes, publishing policies, artifact hub]
doc-persona:
  [
    kubewarden-user,
    kubewarden-operator,
    kubewarden-policy-developer,
    kubewarden-distributor,
    kubewarden-integrator,
  ]
doc-type: [tutorial]
doc-topic: [distributing-policies, publish-policy-to-artifacthub]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/publish-policy-to-artifact-hub"/>
</head>

[Artifact Hub](https://artifacthub.io/) is a website where users can find,
install, and publish packages and configurations for [CNCF](https://cncf.io) projects.

Kubewarden policies can be published on Artifact Hub and made
discoverable to the wide audience of CNCF users.

:::note
Artifact Hub is a content aggregation platform and doesn't actually host the
artifacts that are published on it.

Artifact Hub requires you to physically host container image repositories on a container
registry or a web server.
Refer to the [distributing policies](../explanations/distributing-policies) section for more information on how to
host your policies.
:::

This document focuses on the steps required to make a Kubewarden policy
discoverable on Artifact Hub.

## Prepare your Git repository

Artifact Hub crawls Git repositories looking for special metadata files.

There are different kind of layouts the Git repository can have. They
are all documented in depth in the [official Artifact Hub documentation](https://artifacthub.io/docs/topics/repositories/#kubewarden-policies-repositories).

Artifact Hub is flexible and allows you to organize your code in these ways:

- Have a Git repository dedicated to Artifact Hub: this repository will not contain
  any policy source code. It will be a collection of the YAML files required by
  Artifact Hub.
- Add a Artifact Hub directory in the Git repository holding the source
  of your policy. This is an iteration of the previous approach, focusing on just one policy,
  that which is defined in the Git repository.
  This approach allows keeping multiple versions of the policy published on Artifact Hub.
- Add the `artifacthub-pkg.yml` and the `artifacthub-repo.yml` files to the root
  of the Git repository that holds the policy source code. This approach is the
  simplest one. The only limitation is that only the latest version of the policy
  will be visible on Artifact Hub.

The last approach is used in our official policy templates. The
Git repository that is scaffolded includes the `artifacthub-repo.yml` file,
and our GitHub Actions generate and push the `artifacthub-pkg.yml` to an
`artifacthub` branch for Artifact Hub to consume.

## Publishing Steps

Before publishing a policy to Artifact Hub, you must create an account [there](https://artifacthub.io/).

Before publishing the policy, ensure your Git repository has the proper layout,
with a well formatted `metadata.yml` with the obligatory annotations.

If you want to do this manually, you can create the `artifacthub-pkg.yml` file
by doing a `kwctl scaffold artifacthub` (with version `>= 1.23`). This command
takes the `metadata.yml` in the current path and outputs an
`artifacthub-pkg.yml`. The `artifacthub-pkg.yml` contains fields such as
`version: `, `createdAt: `, that need to match specific format, and be
up-to-date. The format of the `artifacthub-pkg.yml` is described
[here](https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-pkg.yml).

If you use our GitHub Actions >= `v4.0.0`, the release workflow can be
configured with the input `artifacthub: true`. If so configured, after a
successful release (after the policy has been successfully built, signed and
pushed), our GitHub Actions have a last job that generates the
`artifacthub-pkg.yml` for you then commits, and pushes the changes to the
`artifacthub` branch. The canonical files are always the ones in the `main`
branch. For the behaviour of previous releases of our GitHub Actions, see the
docs versions pre 1.23.

Finally, ensure your policy is published inside of a container registry or on a
web server.

:::note
Right now the contents of the `artifacthub-repo.yml` file are not relevant.
:::

Once everything is in place, log into Artifact Hub and go to your
[control plane](https://artifacthub.io/control-panel/repositories?page=1).

Decide whether you want to publish the policy as a user or under an Artifact Hub
organization you belong to. This is done by choosing the correct _"control panel context"_.

Then press the _"Add"_ button and fill the form:

- Choose _"Kubewarden policies"_ as kind.
- Enter a _"Name"_ and _"Display name"_ of your choice.
- Enter the URL to your Git repository.
- Enter `artifacthub` as the branch to track.

Finally, press the _"Add"_ button. This will bring you back to the _"Repositories"_
page, where you will see your freshly created repository.

Each repository has several information fields. Find the _"ID"_ property of the
repository you just created and copy it.

Go back to your Git repository and edit the `artifacthub-repo.yml`. Ensure the
`repositoryID` key found inside of the document has the value you just copied from the
Artifact Hub web page.

:::tip
The format of the `artifacthub-repo.yml` file is defined
[here](https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-repo.yml).

Now it's a good time to do some further customizations to this file.
:::

Once you are done with the changes, commit the updated `artifacthub-repo.yml`
file and push it. During the next scan, Artifact Hub will find this file and
it will add the
[_"Verified Publisher"_ badge](https://artifacthub.io/docs/topics/repositories/#verified-publisher)
to you Artifact Hub repository.

## Keeping Artifact Hub in Sync

Do not forget to update the contents of the `metadata.yml` file
every time you release a new version of your policy. For example,
you must update the `io.kubewarden.policy.version` field (which usually matches
the policy OCI tag), and any other annotation you wish to change.

:::note
The contents of the `artifacthub-repo.yml` file do not need to be changed.
:::
