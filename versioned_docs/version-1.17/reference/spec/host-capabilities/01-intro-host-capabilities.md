---
sidebar_label: Host capabilities specification
title: Host capabilities specification
description: Host capabilities specification.
keywords: [kubewarden, kubernetes, policy specification, host capabilities]
doc-persona: [kubewarden-policy-developer]
doc-type: [reference]
doc-topic: [writing-policies, specification, host-capabilities, introduction]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/reference/spec/host-capabilities/intro-host-capabilities"/>
</head>

During evaluation, Kubewarden policies can access extra capabilities offered by the host environment.
This mechanism uses an approach similar to traditional
[RPC](https://en.wikipedia.org/wiki/Remote_procedure_call).

This is what happens when a request is issued by a Kubewarden policy:

- Kubewarden policy:
  - Invokes the capability offered by the host environment.
  - The invocation is a blocking operation,
  hence the policy code will wait until the host provides an answer.
- Host environment:
  - A capability invocation is received.
  - The host performs the operation.
  - The host provides an answer to the policy, which could be either a success or a failure.
- Kubewarden policy:
  - The code receives the answer from the host and resumes execution.
  - The host response is handled accordingly.

The host capabilities feature is implemented using
[waPC](https://wapc.io/).
Each capability uses these details:

- waPC function name: The name of the capability exposed by the host.
- Input payload: The body of the request made by the policy.
This is always encoded in JSON format.
- Output payload: The body of the response coming from the host. This is always encoded in JSON format.

When something goes wrong, the host replies with an error.
This is done using the error type of the programming language used by the policy.
The error is a UTF-8 string that holds an explanation message.
