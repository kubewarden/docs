---
sidebar_label: "Host Capabilities Specification"
title: ""
---

# Host capabilities specification

While being evaluated, Kubewarden policies can access extra capabilities offered
by the host environment.
This mechanism uses an approach similar to traditional [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call).

This is what happens when a request is issued by a Kubewarden policy:

* Kubewarden policy:
  * Invokes the capability offered by the host environment
  * The invocation is a blocking operation, hence the policy code will wait until the
  host provides an answer
* Host environment:
  * A capability invocation is received
  * The host performs the operation
  * The host provides an answer to the policy, which could be either a success or a
  failure
* Kubewarden policy:
  * The code receives the answer from the host and resumes execution
  * The host response is handled accordingly


The host capabilities feature is implemented using [waPC](https://wapc.io/),
each capability is expressed using these details:

* waPC function name: name of the capability exposed by the host
* input payload: the body of the request made by the policy. This is always
  encoded using JSON format
* output payload: the body of the response coming from the host. This is
  always encoded using JSON format

When something goes wrong, the host will reply with an error . This is handled
using the idiomatic error type of the programming language used by the policy.
The error consists of a UTF-8 string that holds an explanation message.
