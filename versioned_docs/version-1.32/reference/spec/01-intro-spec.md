---
sidebar_label: Policy communication specification
title: Policy communication specification
description: Policy communication specification.
keywords: [kubewarden, kubernetes, policy specification, policy communication]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic: [writing-policies, specification, introduction]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/intro-spec"/>
</head>

The policy evaluator interacts with Kubewarden policies using a well-defined API.
The purpose of this section is to document the API used by the host
(be it `policy-server` or `kwctl`)
to communicate with Kubewarden's policies.
