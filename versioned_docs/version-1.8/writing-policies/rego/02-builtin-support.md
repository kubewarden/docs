---
sidebar_label: "Builtin Support"
title: ""
---

# Builtin support

Building a policy for the `wasm` target is only half of the problem,
it needs to be executed.

The Open Policy Agent team has a dedicated page you can check in order
to [find out the built-in support
level](https://www.openpolicyagent.org/docs/latest/policy-reference/#built-in-functions).

When building a Rego policy into a WebAssembly module, some of these
built-in functions are going to be implemented inside of the Wasm file
itself (the built-ins marked with a green check in the previously
linked table) -- regardless of the runtime; while others have to be
provided at execution time by the WebAssembly runtime evaluating the
module.

The built-ins marked as `SDK-dependent` are the ones that the host has
to implement -- in this case, Kubewarden. Open Policy Agent and
Gatekeeper may use them depending on the needs of the policy. In any
case, this built-ins are exposed to the policy and any new or existing
policy could depend on them.

There are still some built-ins that are not yet provided by us,
however, based on the policies we have seen in the open, the ones we
already support should be enough for the majority of Kubernetes users.

[This GitHub issue](https://github.com/kubewarden/policy-evaluator/issues/56)
keeps track of the Rego built-ins we have still to implement. Feel free to
comment over there to prioritize our work.

## Executing policies with missing built-ins

When a policy is instantiated with `kwctl` or with `policy-server`,
the list of built-ins used by the policy will be inspected, and if any
of the used built-ins is missing, the program will abort execution
logging a fatal error reporting what are the missing built-ins.
