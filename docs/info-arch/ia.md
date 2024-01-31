---
sidebar_label: Documentation architecture
title: Documentation architecture
description: Documentation architecture
---

The first place to start is the introduction, '[What is Kubewarden?](introduction.md)'.

## Who is this documentation for?

This documentation is for the Kubewarden community.
We have a few defined personas or user of Kubewarden.

- [Policy user](personas/kubewarden-user).
Someone who takes a policy and uses it in a cluster.
They don’t develop policies and may not be software developers.
Their work is around running a policy in a cluster and seeing the results of that.

- [Operator](personas/kubewarden-operator).
Someone who operates KW in a cluster.
The person responsible for installing KW and keeping it up to date.
This is an ops/devops role.

- [Policy developer](personas/kubewarden-policy-developer).
Someone who writes a policy. Has software development skills.

- [Policy distributor](personas/kubewarden-distributor).
Someone who has written a policy and wants to share it with others.
They want the policy to be easily consumed by the “policy consumer” role.

- [Integrator](personas/kubewarden-integrator).
Those who want to build on top of Kubewarden.
This could be a custom UI, a helper tool for generating policies, or something else.

- [Developer](personas/kubewarden-developer).
People who develop Kubewarden. The project maintainers.

## What topics does the documentation cover?

## What documentation types are there?

We have adopted the [Diátaxis](https://diataxis.fr) approach to document types.

|Type||
|---|---|
|[Tutorial](doc-types/tutorial)|Practical learning activities.|
|[How-to](doc-types/howto)|Getting something *done*.|
|[Explanation](doc-types/explanation)|Understanding and context.|
|[Reference](doc-types/reference)|Technical description and information.|

## Keywords used in the documentation

Index? Word cloud with links?

## Document organization

<details>
<summary>What is Kubewarden?</summary>

[A brief introduction to what Kubewarden is all about.](introduction.md)

<details>
<summary>Metadata</summary>

|metadata-tag|metadata-value|
|---|---|
|Title|What is Kubewarden?|
|Description|A brief introduction to what Kubewarden is all about.|
|Keywords|[kubewarden](keywords/kubewarden), kubernetes, introduction, about|
|Persona|[Operator](personas/kubewarden-operator), [Manager](personas/kubewarden-manager), [Policy Developer](personas/kubewarden-policy-developer), [Developer](personas/kubewarden-developer)|
|Document Type|[Tutorial](doc-types/tutorial)|
|Document Topic|Introduction|

</details>

</details>

<details>
<summary>Getting started.</summary>

<details>
<summary>Overview</summary>

<details>
<summary>Installation and upgrading</summary>
</details>

<details>
<summary>Deploy policies</summary>
</details>

<details>
    <summary>Supported upgrade path</summary>

|fm-tag|fm-tag-value|
|---|---|
|sidebar_label| Supported upgrade path|
|title|Supported upgrade path|
|description|Supported upgrade path|

</details>

</details>

</details>

<details>
<summary>How-to guides</summary>
</details>

## Glossary

Should we have one of these. Maybe it's too like the keyword index?