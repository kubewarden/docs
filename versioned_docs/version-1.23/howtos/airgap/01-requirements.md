---
sidebar_label: Requirements
title: Requirements for installing Kubewarden in an air gapped environment
description: Requirements for installing Kubewarden in an air gapped installation.
keywords: [kubewarden, kubernetes, air gap installation]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, airgap, requirements]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/airgap/requirements"/>
</head>

1. Private registry that supports OCI artifacts.
It's needed for storing container images and policies.
There is a list of supported Open Container Initiative (OCI) registries [here](../../reference/oci-registries-support).
1. [`kwctl`](https://github.com/kubewarden/kwctl) 1.3.1 or later.
1. docker v20.10.6 or later.
