---
sidebar_label: Security hardening
sidebar_position: 50
title: Security hardening
description: Harden the Kubewarden installation
keywords: [kubewarden, kubernetes, security]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic: [operator-manual, security]
---

Kubewarden strives to be reasonable secure by default, even acknowledging that
security is a spectrum.
In this section and its subpages you can find hardening tips (with their
trade-offs) to secure Kubewarden itself.

Please refer to our [threat model](../reference/threat-model) for more information.

### `kubewarden-defaults` Helm chart

Operators can obtain a reasonable secure deployment by installing all the
Kubewarden Helm charts. Particularly, it is recommended to install the
`kubewarden-defaults` Helm chart and enable its recommended policies with:

```console
helm install --wait -n kubewarden kubewarden-defaults kubewarden/kubewarden-defaults \
  --set recommendedPolicies.enabled=True \
  --set recommendedPolicies.defaultPolicyMode=protect
```

This provides a default PolicyServer and default policies in protect mode to
ensure the Kubewarden stack is safe from other workloads.
