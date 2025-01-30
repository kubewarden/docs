"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[96204],{52975:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"howtos/telemetry/opentelemetry-qs","title":"Open Telemetry quick start","description":"An Open Telemetry quickstart for Kubewarden.","source":"@site/docs/howtos/telemetry/10-opentelemetry-qs.md","sourceDirName":"howtos/telemetry","slug":"/howtos/telemetry/opentelemetry-qs","permalink":"/next/howtos/telemetry/opentelemetry-qs","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/howtos/telemetry/10-opentelemetry-qs.md","tags":[],"version":"current","lastUpdatedAt":1738227246000,"sidebarPosition":10,"frontMatter":{"sidebar_label":"Open Telemetry","title":"Open Telemetry quick start","description":"An Open Telemetry quickstart for Kubewarden.","keywords":["kubewarden","kubernetes","opentelemetry","open telemetry","quickstart"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","telemetry","opentelemetry","quick-start"]},"sidebar":"docs","previous":{"title":"Verify Images","permalink":"/next/howtos/application-collection/verify-images"},"next":{"title":"Tracing","permalink":"/next/howtos/telemetry/tracing-qs"}}');var o=t(74848),s=t(28453);const i={sidebar_label:"Open Telemetry",title:"Open Telemetry quick start",description:"An Open Telemetry quickstart for Kubewarden.",keywords:["kubewarden","kubernetes","opentelemetry","open telemetry","quickstart"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","telemetry","opentelemetry","quick-start"]},a=void 0,l={},c=[{value:"Setting up a Kubernetes cluster",id:"setting-up-a-kubernetes-cluster",level:2},{value:"Install OpenTelemetry",id:"install-opentelemetry",level:2},{value:"OpenTelemetry integration",id:"opentelemetry-integration",level:2}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t,{children:(0,o.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/telemetry/opentelemetry-qs"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://opentelemetry.io/",children:"OpenTelemetry"})," is a CNCF (Cloud Native Computing Foundation) framework for\nobservability. It enables your microservices to provide metrics, logs and traces."]}),"\n",(0,o.jsx)(n.p,{children:"Kubewarden's components using the OpenTelemetry SDK, report data to an\nOpenTelemetry collector -- called the agent."}),"\n",(0,o.jsxs)(n.p,{children:["This guide explains how to deploy the OpenTelemetry collector in ",(0,o.jsx)(n.code,{children:"sidecar"})," mode by using\nthe official Kubernetes Helm chart."]}),"\n",(0,o.jsx)(n.p,{children:"This is a simple deployment pattern using OpenTelemetry. Its final setup looks like this:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Each Pod of the Kubewarden stack (Policy Server, Controller) has an OpenTelemetry sidecar."}),"\n",(0,o.jsx)(n.li,{children:"The sidecar receives tracing and monitoring information from the Kubewarden component via the OpenTelemetry Protocol (OTLP)"}),"\n",(0,o.jsxs)(n.li,{children:["The OpenTelemetry collector:","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Sends the trace events to a central Jaeger instance"}),"\n",(0,o.jsx)(n.li,{children:"Exposes Prometheus metrics on a specific port"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["The Kubewarden Helm chart doesn't cover all the possible deployment scenarios of the OpenTelemetry collector.\nIt's also possible to configure Kubewarden to send data to an OpenTelemetry collector\ndeployed by the user. Documentation for that scenario is in the ",(0,o.jsx)(n.a,{href:"/next/howtos/telemetry/custom-otel-collector",children:"custom OpenTelemetry guide"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"You first deploy OpenTelemetry in a Kubernetes cluster, so you can use it in the following sections\naddressing tracing and metrics."}),"\n",(0,o.jsx)(n.h2,{id:"setting-up-a-kubernetes-cluster",children:"Setting up a Kubernetes cluster"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsx)(n.p,{children:"This section has step-by-step instructions to create a\nKubernetes cluster with an ingress controller enabled."}),"\n",(0,o.jsx)(n.p,{children:"Feel free to skip this section if you already have a Kubernetes\ncluster where you can define Ingress resources."}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["You can create a testing Kubernetes cluster using ",(0,o.jsx)(n.a,{href:"https://minikube.sigs.k8s.io/docs/",children:"minikube"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["Minikube has many backends, for this case you can use the\n",(0,o.jsx)(n.a,{href:"https://minikube.sigs.k8s.io/docs/drivers/kvm2/",children:"kvm2"})," driver\nwhich relies on libvirt."]}),"\n",(0,o.jsxs)(n.p,{children:["Assuming ",(0,o.jsx)(n.code,{children:"libvirtd"})," is correctly running on your machine, issue the\nfollowing command:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"minikube start --driver=kvm2\n"})}),"\n",(0,o.jsx)(n.p,{children:"The command produces output similar to the following one:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:'$ minikube start --driver=kvm2\n\ud83d\ude04  minikube v1.23.2 on Opensuse-Leap 15.3\n\u2728  Using the kvm2 driver based on user configuration\n\ud83d\udc4d  Starting control plane node minikube in cluster minikube\n\ud83d\udd25  Creating kvm2 VM (CPUs=2, Memory=6000MB, Disk=20000MB) ...\n\ud83d\udc33  Preparing Kubernetes v1.22.2 on Docker 20.10.8 ...\n    \u25aa Generating certificates and keys ...\n    \u25aa Booting up control plane ...\n    \u25aa Configuring RBAC rules ...\n\ud83d\udd0e  Verifying Kubernetes components...\n    \u25aa Using image gcr.io/k8s-minikube/storage-provisioner:v5\n\ud83c\udf1f  Enabled addons: storage-provisioner, default-storageclass\n\ud83c\udfc4  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default\n'})}),"\n",(0,o.jsx)(n.p,{children:"Now you need to enable the Ingress addon:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"minikube addons enable ingress\n"})}),"\n",(0,o.jsx)(n.p,{children:"This produces an output similar to the following one:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"$ minikube addons enable ingress\n    \u25aa Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.0\n    \u25aa Using image registry.k8s.io/ingress-nginx/controller:v1.0.0-beta.3\n    \u25aa Using image registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.0\n\ud83d\udd0e  Verifying ingress addon...\n\ud83c\udf1f  The 'ingress' addon is enabled\n"})}),"\n",(0,o.jsx)(n.h2,{id:"install-opentelemetry",children:"Install OpenTelemetry"}),"\n",(0,o.jsxs)(n.p,{children:["You use the ",(0,o.jsx)(n.a,{href:"https://github.com/open-telemetry/opentelemetry-operator",children:"OpenTelemetry Operator"}),"\nto manage the automatic injection of the OpenTelemetry Collector sidecar\ninto the PolicyServer pod."]}),"\n",(0,o.jsxs)(n.p,{children:["The OpenTelemetry Operator requires installation of ",(0,o.jsx)(n.a,{href:"https://cert-manager.io/docs/installation/",children:"cert-manager"}),"\nin the cluster."]}),"\n",(0,o.jsxs)(n.p,{children:["At the time of writing (2022-06-21), only specific versions of OpenTelemetry are compatible\nwith Cert Manager, ",(0,o.jsx)(n.a,{href:"https://github.com/open-telemetry/opentelemetry-operator#opentelemetry-operator-vs-kubernetes-vs-cert-manager",children:"see the compatibility chart"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"You should install the latest cert-manager Helm chart:"}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["At time of writing (2024-07-17) the latest cert-manager chart version is ",(0,o.jsx)(n.code,{children:"v1.15.1"})]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"helm repo add jetstack https://charts.jetstack.io\n\nhelm install --wait \\\n    --namespace cert-manager \\\n    --create-namespace \\\n    --set crds.enabled=true \\\n    --version 1.15.1 \\\n    cert-manager jetstack/cert-manager\n"})}),"\n",(0,o.jsx)(n.p,{children:"Once cert-manager is running, you can install the OpenTelemetry operator Helm chart:"}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["At the time of writing (2024-11-11) the latest OpenTelemetry operator chart version is ",(0,o.jsx)(n.code,{children:"0.65.0"})]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:'helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts\n\nhelm install --wait \\\n  --namespace open-telemetry \\\n  --create-namespace \\\n  --version 0.65.0 \\\n  --set "manager.collectorImage.repository=otel/opentelemetry-collector-contrib" \\\n  my-opentelemetry-operator open-telemetry/opentelemetry-operator\n'})}),"\n",(0,o.jsx)(n.h2,{id:"opentelemetry-integration",children:"OpenTelemetry integration"}),"\n",(0,o.jsx)(n.p,{children:"You can now move to the next chapters to enable application metrics (via Prometheus\nintegration) and application tracing (via Jaeger integration)."})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var r=t(96540);const o={},s=r.createContext(o);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);