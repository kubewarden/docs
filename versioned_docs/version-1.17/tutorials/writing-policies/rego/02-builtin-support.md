---
sidebar_label: Builtin Support
title: Builtin support
description: The Kubewarden provided support for executing wasm binaries.
keywords: [kubewarden, kubernetes, builtin wasm support]
doc-persona: [kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [writing-policies, rego, built-in-support]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/rego/builtin-support"/>
</head>

Additionally, to building a policy for the `wasm` target, it needs running.

The Open Policy Agent (OPA) team has a page you can check for
[built-in support](https://www.openpolicyagent.org/docs/latest/policy-reference/#built-in-functions).

When building a Rego policy into a WebAssembly module,
certain of these built-in functions are in the Wasm file itself.
They're the built-ins marked with a green check in the linked built-in page.
The WebAssembly runtime evaluating the module, provides the others.

The built-ins marked as `SDK-dependent` are the ones that the host has to implement,
in this case, Kubewarden.
OPA and Gatekeeper may use them depending on the needs of the policy.
In any case, these built-ins are exposed to the policy and any new or existing policy could depend on them.

There are still ceratin built-ins that aren't yet provided by Kubewarden,
however, based on the policies seen in the open,
the ones already supported should be enough for the most Kubernetes users.

[This GitHub issue](https://github.com/kubewarden/policy-evaluator/issues/56)
keeps track of the Rego built-ins we've still to implement.
Feel free to comment there to help prioritize our work.

## Executing policies with missing built-ins

When a policy is run with `kwctl` or with `policy-server`,
the list of built-ins used by the policy is inspected.
If any of the used built-ins are missing,
the program stops execution logging a fatal error reporting the missing built-ins.
