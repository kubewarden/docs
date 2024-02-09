---
sidebar_label: Documentation architecture
title: Documentation architecture
description: Documentation architecture
---

The first place to start is the introduction, '[What is Kubewarden?](introduction.md)'.

## Who is this documentation for? {#who-for}

This documentation is for the Kubewarden community.
For the community we have defined personas or users of Kubewarden.

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

## What documentation types are there?

We have adopted the [Diátaxis](https://diataxis.fr) approach to document types.

|Type||
|---|---|
|[Tutorial](doc-types/tutorial)|Practical learning activities.|
|[Explanation](doc-types/explanation)|Understanding and context.|
|[How-tos](doc-types/howto)|Getting something *done*.|
|[Reference](doc-types/reference)|Technical description and information.|

These correspond to the top-level categories in the sidebar to the left.

## What topics does the documentation cover?

A different way of slicing/dicing or approaching the material.
For example, if one was interested in policy distribution,
a heading here could list all policy distribution material from each of the documentation types.

## Keywords used in the documentation

Index? Word cloud with links?

## Glossary

Should we have one of these? A set of key terms and their definitions.

Add `definition:` to the front-matter in documents to define them where they (first) occur.

```markdown
---
title: Something to do with Kubewarden and OCI
definition: Kubewarden :: A policy engine for Kubernetes.
definition: OCI :: Open Container initiative. https://opencontainers.org
---
```

A glossary generator can check and report duplicate errors.
There can be only one.

## Automation

This entire page hierarchy can be programmatically generated from the document source given a structured and sufficiently rich set of metadata tags in the front-matter for each document markdown page.

It's not necessary though.
It could be a simple rationale for the layout of the documentation and a few pointers.

The most important section is that about [who](#who-for) the documentation is for and to provide a path through the docs for each persona.
