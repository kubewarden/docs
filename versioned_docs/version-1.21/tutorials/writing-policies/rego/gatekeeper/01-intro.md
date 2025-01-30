---
sidebar_label: Gatekeeper support
title: Gatekeeper support
description: Introducing Gatekeeper support in Kubewarden.
keywords: [kubewarden, kubernetes, rego, gatekeeper]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, gatekeeper, introduction]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/gatekeeper/intro"/>
</head>

:::note
Gatekeeper support starts from these releases:

  * kwctl: v0.2.0
  * policy-server: v0.2.0
:::

Gatekeeper is a project targeting Kubernetes with out-of-the-box features for integration.

## Compatibility with existing policies

All existing Gatekeeper policies should be compatible with Kubewarden as explained in this chapter.

:::info
If you find this not to be true, for your Gatekeeper policies,
report it,
and we'll work to ensure your Gatekeeper policy runs with Kubewarden.
:::

Policies need compilation with the `opa` CLI to `wasm` target.

For policy execution, you can read more about the Open Policy Agent
[built-in support](../builtin-support) in Kubewarden.
