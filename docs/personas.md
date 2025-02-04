---
sidebar_label: For who?
sidebar_position: 73
title: Who is this project for? The personas.
description: how is the Kubewarden documentation organized?
keywords: [Kubewarden, documentation, personas]
doc-persona: [kubewarden-all]
doc-type: [explanation]
doc-topic: [explanation]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/personas"/>
</head>

|Persona|Description|
|-|-|
|**Policy user**|Someone who takes a policy and uses it in a cluster. They deploy policies and observe results. They configure the policy settings but don't write the policy internal code (if there is any).|
|**Operator**|Someone operating Kubewarden in a cluster. Installs and maintains Kubewarden.|
|**Policy distributor**|Someone who has written a policy and wants to share it with others. They want the policy consumed by the “policy user” role. A distributor of Kubewarden policies, to places such as ArtifactHub or private OCI repositories.|
|**Policy developer**| A person designing and writing policies for Kubewarden for others to consume.|
|**Integrator**|Builds with, using, or on top of Kubewarden. Perhaps a custom UI or a helper tool for generating policies.|
|**Developer**|A person working on the Kubewarden product set. Building Kubewarden itself.|
