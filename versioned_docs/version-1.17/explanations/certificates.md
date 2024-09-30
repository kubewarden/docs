---
sidebar_label: Certificate rotation
sidebar_position: 25
title: Certificate rotation
description: How Kubewarden controller manages its certificates
keywords: [kubewarden, certificate, controller, reconciliation]
doc-persona: [kubewarden-operator]
doc-type: [explanation]
doc-topic: [explanations, certificates]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/explanations/certificates"/>
</head>

Since Kubewarden v1.17.0, the cert-manager dependency was removed. The
controller is able to manage all the certificates used by all the components.
This means that the controller has a new reconciliation loop that ensures the
certificates are always up-to-date and the webhook configuration is correct.

The first certificate generation is done by the Helm chart installation. It
will generate the root CA with ten years until expiration. The Helm chart
installation also generates the controller webhook webserver certificate,
signed by the root CA. This is used by the API server to communicate with the
Kubewarden controller to validate the CRDs. It has a one year expiration.

Once the controller starts, its reconciler renews the certificates
automatically when they are about to expire. It also updates all the
certificates and webhook configurations used by the entire Kubewarden stack.

:::note
All the certificates generated by the Helm chart and later by the controller uses
ECDSA P256 keys.
:::

The reconciliation loop renews certificates 60 days before expiration. The
certificates are rotated without downtime.
The reconciliation loop takes care of renewing the root CA too. 60 days before
its expiration, a new root CA is generated and the CA bundled used by all the
webhooks is updated with one that includes both the new root CA and
the old one.
The change of the root CA leads the reconciler to recreate the certificates
issued to the webhooks.
The propagation of the new certificates requires some time. However during this
time the updated CA bundle allows the API server to continue to communicate
with all the webhooks without any downtime.

Once the new certificate is ready and the old one is invalid, the controller
will update the CA bundle used by the webhooks to include only the latest root CA.

When a policy server certificate or the controller webserver certificate is
renewed, the controller updates the secret with the new certificate signed by
the root CA. Due to this reload feature, the controller, and the policy server,
use the new certificate with no need to restart processes, hence no downtime.