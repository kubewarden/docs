---
sidebar_label: Requirements
title: Requirements for a Kubewarden air gap installation
description: Requirements for a Kubewarden air gap installation.
keywords: [kubewarden, kubernetes, air gap installation]
doc-persona: [kubewarden-user, kubewarden-operator, kubewarden-integrator]
doc-type: [explanation, howto]
doc-topic: [operator-manual, airgap, requirements]
---

1. Private registry that supports OCI artifacts, [here](../../reference/oci-registries-support) you can find a list of supported OCI registries. It will be used for storing the container images and policies.
2. [kwctl](https://github.com/kubewarden/kwctl) 1.3.1 or above
3. docker v20.10.6 or above
