---
sidebar_label: Policy testing
title: Policy testing
description: A tutorial about testing policies in Kubewarden.
keywords: [kubewarden, persons, policy author, cluster operator]
doc-persona: [kubewarden-operator, kubewarden-policy-developer]
doc-type: [tutorial]
doc-topic: [testing-policies, introduction]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/testing-policies/index"/>
</head>

## Policy testing personas

This section covers the topic of testing Kubewarden Policies.
There are two personas interested in testing policies:

- **Policy developer**: you're writing a Kubewarden Policy and you want to make sure your code behaves the way you expect.

- **Cluster operator**: you found a Kubewarden Policy and you want to test and tune the policy settings before deploying it.
You want to keep testing these settings in your CI/CD pipelines, and other administrative tasks.

The next sections of the documentation shows how these personas can test Kubewarden policies.
