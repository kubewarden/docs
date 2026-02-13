---
sidebar_label: Using Proxies
title: Configuring PolicyServers with proxies
description: Configuring PolicyServers with proxies
keywords:
  [
    kubewarden,
    kubernetes,
    policyservers,
    production,
    proxy,
    proxies,
    socks,
  ]
doc-persona: [kubewarden-operator, kubewarden-integrator]
doc-type: [howto]
doc-topic:
  [
    operator-manual,
    policy-servers,
    production,
    proxy,
    proxies,
    socks,
  ]
---

PolicyServers respect the standard environment variables for dealing with proxy setups.
The policy-server will use the configured proxy when downloading policies. This includes
Sigstore operations when verifying policies and images.

These variables are:
- `HTTP_PROXY` or `http_proxy`: proxy server for HTTP requests
- `HTTPS_PROXY` or `https_proxy`: proxy server for HTTPS requests
- `NO_PROXY` or `no_proxy`: comma-separated list of hosts to exclude from proxying

Please refer to the
[`PolicyServer.spec.env`](,,/../reference/CRDs#policyserverspec) field of the
CRD to set these environment variables.
