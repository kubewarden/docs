---
sidebar_label: "Publish to Artifact Hub"
title: ""
---

# Publish Policies to Artifact Hub

[Artifact Hub](https://artifacthub.io/) is a website where users can find,
install, and publish packages and configurations for [CNCF](https://cncf.io) projects.

Kubewarden policies can be published on Artifact Hub and made
discoverable to the wide audience of CNCF users.

:::note
Artifact Hub is a content aggregation platform and doesn't actually host the
artifacts that are published on it.

Artifact Hub requires you to physically host container image repositories on a container
registry or a web server.
Refer to the *"[distributing policies](../distributing-policies)"* section for more information on how to
host your policies.
:::

This document focuses on the steps required to make a Kubewarden policy
discoverable on Artifact Hub.

## Prepare your Git repository

Artifact Hub crawls Git repositories looking for special metadata files.

There are different kind of layouts the Git repository can have. They
are all documented in depth in the [official Artifact Hub documentation](https://artifacthub.io/docs/topics/repositories/#kubewarden-policies-repositories).

Artifact Hub is pretty flexible and allows you to organize your code in these ways:

* Have a Git repository dedicated to Artifact Hub: this repository will not contain
  any policy source code. It will be a collection of the YAML files required by
  Artifact Hub.
* Add a Artifact Hub directory inside of the Git repository that holds the source
  of your policy. This is an iteration of the previous approach, the only difference
  is that it focuses just on one policy: the one defined inside of the Git repository.
  This approach allows to keep multiple versions of the policy published on Artifact Hub.
* Add the `artifacthub-pkg.yml` and the `artifacthub-repo.yml` files to the root
  of the Git repository that holds the policy source code. This approach is the 
  simplest one. The only limitation is that only the latest version of the policy
  will be visible on Artifact Hub.

The last approach is what we used inside of our official policy templates.
The Git repository that is scaffolded includes the `artifacthub-pkg.yml`
and `artifacthub-repo.yml` files.

## Publishing Steps

Before publishing a policy to Artifact Hub, you must create an account on
the [website](https://artifacthub.io/).

Before publishing the policy, ensure your Git repository has the proper layout.
The `artifacthub-pkg.yml` contains fields such as `version: `, `createdAt: `,
that need to match specific format, and be up-to-date. The format of the
`artifacthub-pkg.yml` is described
[here](https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-pkg.yml).

If you created the policy using one of our templates, then you have a `make
artifacthub-pkg.yml` target. Execute that target to generate the
`artifacthub-pkg.yml` file programmatically from `metadata.yml` and other
inputs. This target gets called as part as a normal build of a policy, so
your task is to commit the resulting changes to `artifacthub-pkg.yml`.

The policy templates make use of our GitHub Actions at
[github.com/kubewarden/github-actions](https://github.com/kubewarden/github-actions):
- If you are using our GitHub Actions >= `v3.1.0`, the workflows provide by
  default automated checking of the `artifacthub-pkg.yml` file.
- After a successful release, that is, after the policy has been successfully
  built, signed, and pushed, our GitHub Actions have a last job that pushes the
  files needed by Artifact Hub to an orphan `artifacthub` branch. The canonical
  files are always the ones in the `main` branch, and the GHA job overwrites the
  ones in `artifacthub` branch every time.

Finally, ensure your policy is published inside of a container registry or on a
web server.

:::note
Right now the contents of the `artifacthub-repo.yml` file are not relevant.
:::

Once everything is in place, log into Artifact Hub and go to your
[control plane](https://artifacthub.io/control-panel/repositories?page=1).

Decide whether you want to publish the policy as a user or under an Artifact Hub
organization you belong to. This is done by choosing the correct *"control panel context"*.

Then press the *"Add"* button and fill the form:

  * Choose *"Kubewarden policies"* as kind.
  * Enter a *"Name"* and *"Display name"* of your choice.
  * Enter the URL to your Git repository.
  * Enter `artifacthub` as the branch to track.

Finally, press the *"Add"* button. This will bring you back to the *"Repositories"*
page, where you will see your freshly created repository.

Each repository has several information fields. Find the *"ID"* property of the
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
[*"Verified Publisher"* badge](https://artifacthub.io/docs/topics/repositories/#verified-publisher)
to you Artifact Hub repository.

## Keeping Artifact Hub in Sync

Do not forget to update the contents of the `artifacthub-pkg.yml` file
every time you release a new version of your policy.

:::note
The contents of the `artifacthub-repo.yml` file do not need to be changed.
:::
