# Getting started

[chimera-admission](https://github.com/chimera-kube/chimera-admission)
is the core component of the Chimera project. It's a Kubernetes dynamic admission
controller that is designed to validate and, in the near future, to mutate
incoming requests using policies delivered as Wasm modules.

The next sections will guide you through the deployment of `chimera-admission`.

The Chimera project is still in its early days, the admission controller is
not meant to be used in production. We also plan to improve its UX in
the near future.

However everything is already functional and it can be used to play with
Kubernetes admission policies written in WebAssembly.
