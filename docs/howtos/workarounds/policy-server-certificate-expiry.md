---
sidebar_label: Certificate Rotation
sidebar_position: 10
title: Policy Server certificate rotation issue
description: How-to work around Policy Server certificate expiry issue
keywords: [kubewarden, kubernetes, policy server certificates]
doc-persona: [kubewarden-operator, kubewarden-distributor, kubewarden-integrator]
doc-type: [howto]
doc-topic: [howto, workarounds, policy server certificates]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/policy-server-certificate-expiry"/>
</head>

:::important
This workaround is only needed for Kubewarden v1.16.0 and earlier. Starting
from v1.17.0, the controller will automatically renew the policy server
certificates.
:::

During the release process for v1.14, a bug related to the policy server
certificate rotation was discovered. The Root CA is configured to expire in 10
years, but each policy-server certificate secret has a one-year expiry.
However, the controller is currently unable to renew them automatically.

In the v1.14 release, we have ensured that policy-server secrets are created
with a 10-year expiry.

For future releases we'll implement an automated renewal process.

Until then, users can manually delete the expired certificate secret
(policy-server-default) and trigger a controller reconciliation. You do this by
adding, removing, or updating a policy or by adjusting the number of replicas
of a PolicyServer.
