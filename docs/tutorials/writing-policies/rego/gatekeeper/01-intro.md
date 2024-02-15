---
sidebar_label: Gatekeeper support
title: Gatekeeper support
description: Introducing Gatekeeper support in Kubewarden.
keywords: [kubewarden, kubernetes, rego, gatekeeper]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, gatekeeper, introduction]
---

:::note
Gatekeeper support has been introduced starting from these releases:

  * kwctl: v0.2.0
  * policy-server: v0.2.0
:::

Gatekeeper is a project targeting Kubernetes, and as such, has some
features that are thought out of the box for being integrated with it.

## Compatibility with existing policies

All the existing Gatekeeper policies should be compatible with
Kubewarden as we will explain during this chapter.

:::info
If this is not the case, please report it to us and we
will do our best to make sure your policy runs flawlessly with
Kubewarden.
:::

Policies have to be compiled with the `opa` CLI to the `wasm` target.

In terms of policy execution, you can read more about the [Open Policy
Agent built-in support that is implemented in
Kubewarden](../builtin-support).
