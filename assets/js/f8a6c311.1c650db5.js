"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[39004],{55244:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>o,metadata:()=>r,toc:()=>i});const r=JSON.parse('{"id":"howtos/telemetry/custom-otel-collector","title":"Custom OpenTelemetry Collector","description":"How to use a custom OpenTelemetry Collector with Kubewarden.","source":"@site/versioned_docs/version-1.22/howtos/telemetry/40-custom-otel-collector.md","sourceDirName":"howtos/telemetry","slug":"/howtos/telemetry/custom-otel-collector","permalink":"/howtos/telemetry/custom-otel-collector","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.22/howtos/telemetry/40-custom-otel-collector.md","tags":[],"version":"1.22","lastUpdatedAt":1742923074000,"sidebarPosition":40,"frontMatter":{"sidebar_label":"Custom OpenTelemetry Collector","title":"Custom OpenTelemetry Collector","description":"How to use a custom OpenTelemetry Collector with Kubewarden.","keywords":["kubewarden","kubernetes","metrics","tracing","opentelemetry"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","telemetry","metrics","quick-start"]},"sidebar":"docs","previous":{"title":"Metrics","permalink":"/howtos/telemetry/metrics-qs"},"next":{"title":"Rancher Fleet","permalink":"/howtos/Rancher-Fleet"}}');var s=t(74848),a=t(28453);const o={sidebar_label:"Custom OpenTelemetry Collector",title:"Custom OpenTelemetry Collector",description:"How to use a custom OpenTelemetry Collector with Kubewarden.",keywords:["kubewarden","kubernetes","metrics","tracing","opentelemetry"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","telemetry","metrics","quick-start"]},c=void 0,l={},i=[{value:"Install dependencies",id:"install-dependencies",level:2},{value:"Install cert-manager and OpenTelemetry",id:"install-cert-manager-and-opentelemetry",level:3},{value:"Install Jaeger and Prometheus",id:"install-jaeger-and-prometheus",level:3},{value:"Install OpenTelemetry Collector",id:"install-opentelemetry-collector",level:2},{value:"Install Kubewarden stack",id:"install-kubewarden-stack",level:2},{value:"Exploring the Jaeger UI",id:"exploring-the-jaeger-ui",level:2},{value:"Exploring the Prometheus UI",id:"exploring-the-prometheus-ui",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,a.R)(),...e.components},{Head:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/telemetry/custom-otel-collector"})}),"\n",(0,s.jsx)(n.p,{children:"This guide explains how to configure Kubewarden to send telemetry data to an OpenTelemetry collector\nalready deployed on the cluster."}),"\n",(0,s.jsxs)(n.p,{children:["You should deploy only one instance of the ",(0,s.jsx)(n.a,{href:"https://opentelemetry.io/docs/collector/",children:"OpenTelemetry Collector"}),"\nin the cluster."]}),"\n",(0,s.jsx)(n.h2,{id:"install-dependencies",children:"Install dependencies"}),"\n",(0,s.jsx)(n.p,{children:"First, begin by installing the dependencies of OpenTelemetry Collector."}),"\n",(0,s.jsxs)(n.p,{children:["You need the communication between the Kubewarden components and the collector to be encrypted.\nYou can use ",(0,s.jsx)(n.a,{href:"https://cert-manager.io/",children:"cert-manager"})," to manage all the certificates\nrequired for secure communications."]}),"\n",(0,s.jsxs)(n.p,{children:["OpenTelemetry Collector traces get sent to a ",(0,s.jsx)(n.a,{href:"https://www.jaegertracing.io/",children:"Jaeger"}),"\ninstance."]}),"\n",(0,s.jsx)(n.p,{children:"The Kubewarden stack sends metrics to the OpenTelemetry Collector.\nThis one exposes the metrics\nas a Prometheus endpoint.\nThe metrics are then collected by a Prometheus instance and stored in its\ndatabase. The same Prometheus instance also exposes a UI to view and use the metrics."}),"\n",(0,s.jsxs)(n.p,{children:["Resources you create get defined in the ",(0,s.jsx)(n.code,{children:"kubewarden"}),"\nNamespace, or expect its existence.\nDue to that, you should begin by creating the Namespace:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl create namespace kubewarden\n"})}),"\n",(0,s.jsx)(n.h3,{id:"install-cert-manager-and-opentelemetry",children:"Install cert-manager and OpenTelemetry"}),"\n",(0,s.jsx)(n.p,{children:"You install cert-manager and OpenTelemetry operator in this way:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'helm repo add jetstack https://charts.jetstack.io\nhelm install --wait \\\n    --namespace cert-manager \\\n    --create-namespace \\\n    --set crds.enabled=true \\\n    --version 1.15.1 \\\n    cert-manager jetstack/cert-manager\n\nhelm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts\nhelm install --wait \\\n  --namespace open-telemetry \\\n  --create-namespace \\\n  --version 0.65.0 \\\n  --set "manager.collectorImage.repository=otel/opentelemetry-collector-contrib" \\\n  my-opentelemetry-operator open-telemetry/opentelemetry-operator\n'})}),"\n",(0,s.jsx)(n.p,{children:"You set up communication between Kubewarden components and the OpenTelemetry Collector\nusing mTLS."}),"\n",(0,s.jsx)(n.p,{children:"To do that, you need to create the whole PKI infrastructure:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"# pki.yaml file\napiVersion: cert-manager.io/v1\nkind: Certificate\nmetadata:\n  name: my-client-certificate\n  namespace: kubewarden\nspec:\n  dnsNames:\n  - kubewarden.kubewarden.svc\n  - kubewarden.kubewarden.svc.cluster.local\n  issuerRef:\n    kind: Issuer\n    name: my-selfsigned-issuer\n  secretName: my-client-cert\n---\napiVersion: cert-manager.io/v1\nkind: Certificate\nmetadata:\n  name: my-certificate\n  namespace: kubewarden\nspec:\n  dnsNames:\n  - my-collector-collector.kubewarden.svc\n  - my-collector-collector.kubewarden.svc.cluster.local\n  issuerRef:\n    kind: Issuer\n    name: my-selfsigned-issuer\n  secretName: my-server-cert\n---\napiVersion: cert-manager.io/v1\nkind: Issuer\nmetadata:\n  name: my-selfsigned-issuer\n  namespace: kubewarden\nspec:\n  selfSigned: {}\n"})}),"\n",(0,s.jsx)(n.p,{children:"Apply the manifest:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl apply -f pki.yaml\n"})}),"\n",(0,s.jsx)(n.h3,{id:"install-jaeger-and-prometheus",children:"Install Jaeger and Prometheus"}),"\n",(0,s.jsxs)(n.p,{children:["After that, you install ",(0,s.jsx)(n.a,{href:"https://www.jaegertracing.io/",children:"Jaeger"})," to store\nand visualize trace events."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm repo add jaegertracing https://jaegertracing.github.io/helm-charts\nhelm upgrade -i --wait \\\n  --namespace jaeger \\\n  --create-namespace \\\n  --version 2.49.0 \\\n  jaeger-operator jaegertracing/jaeger-operator \\\n  --set rbac.clusterRole=true\n\nkubectl apply -f - <<EOF\napiVersion: jaegertracing.io/v1\nkind: Jaeger\nmetadata:\n  name: my-open-telemetry\n  namespace: jaeger\nspec:\n  ingress:\n    enabled: true\n    annotations:\n      kubernetes.io/ingress.class: nginx\nEOF\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now you install ",(0,s.jsx)(n.a,{href:"https://prometheus.io/",children:"Prometheus"})," to store and visualize metrics."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"cat <<EOF > kube-prometheus-stack-values.yaml\nprometheus:\n  additionalServiceMonitors:\n    - name: kubewarden\n      selector:\n        matchLabels:\n          app.kubernetes.io/instance: kubewarden.my-collector\n      namespaceSelector:\n        matchNames:\n          - kubewarden\n      endpoints:\n      - port: prometheus\n        interval: 10s\nEOF\n\nhelm repo add prometheus-community https://prometheus-community.github.io/helm-charts\nhelm install --wait --create-namespace \\\n  --namespace prometheus \\\n  --version 51.5.3 \\\n  --values kube-prometheus-stack-values.yaml \\\n  prometheus prometheus-community/kube-prometheus-stack\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["The Prometheus service monitor obtains the Kubewarden metrics by scraping the\nOpenTelemetry collector running in the ",(0,s.jsx)(n.code,{children:"kubewarden"})," Namespace."]})}),"\n",(0,s.jsx)(n.h2,{id:"install-opentelemetry-collector",children:"Install OpenTelemetry Collector"}),"\n",(0,s.jsxs)(n.p,{children:["Now you can  deploy a custom OpenTelemetry Collector in the ",(0,s.jsx)(n.code,{children:"kubewarden"})," Namespace."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'# otel-collector.yaml file\napiVersion: opentelemetry.io/v1beta1\nkind: OpenTelemetryCollector\nmetadata:\n  name: my-collector\n  namespace: kubewarden\nspec:\n  mode: deployment # This configuration is omittable.\n  volumes:\n    - name: server-certificate\n      secret:\n        secretName: my-server-cert\n    - name: client-certificate\n      secret:\n        secretName: my-client-cert\n  volumeMounts:\n    - name: server-certificate\n      mountPath: /tmp/etc/ssl/certs/my-server-cert\n      readOnly: true\n    - name: client-certificate\n      mountPath: /tmp/etc/ssl/certs/my-client-cert\n      readOnly: true\n  config:\n    receivers:\n      otlp:\n        protocols:\n          grpc:\n            tls:\n              cert_file: /tmp/etc/ssl/certs/my-server-cert/tls.crt\n              key_file: /tmp/etc/ssl/certs/my-server-cert/tls.key\n              client_ca_file: /tmp/etc/ssl/certs/my-client-cert/ca.crt\n    processors: {}\n    exporters:\n      debug:\n        verbosity: normal\n      prometheus:\n        endpoint: ":8080"\n      otlp/jaeger:\n        endpoint: "my-open-telemetry-collector.jaeger.svc.cluster.local:4317"\n        tls:\n          insecure: true\n    service:\n      pipelines:\n        metrics:\n          receivers: [otlp]\n          processors: []\n          exporters: [debug, prometheus]\n        traces:\n          receivers: [otlp]\n          processors: []\n          exporters: [debug, otlp/jaeger]\n'})}),"\n",(0,s.jsx)(n.p,{children:"Apply the manifest:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl apply -f otel-collector.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"That configuration uses a trivial processing pipeline to receive trace events\nand forward them to Jaeger.\nIt also receives metrics and exposes them for\ncollection by Prometheus."}),"\n",(0,s.jsx)(n.p,{children:"You secure communication between the Kubewarden stack and the OpenTelemetry Collector\nusing mTLS. However the communication between the OpenTelemetry\nCollector and Jaeger isn't secured, to reduce the complexity of the example."}),"\n",(0,s.jsx)(n.h2,{id:"install-kubewarden-stack",children:"Install Kubewarden stack"}),"\n",(0,s.jsx)(n.p,{children:"When the OpenTelemetry Collector is running, you can deploy Kubewarden in\nthe usual way."}),"\n",(0,s.jsx)(n.p,{children:"You need to configure the Kubewarden components so they send\nevents and metrics to the OpenTelemetry Collector."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'# values.yaml\ntelemetry:\n  mode: custom\n  metrics: True\n  tracing: True\n  custom:\n    endpoint: "https://my-collector-collector.kubewarden.svc:4317"\n    insecure: false\n    otelCollectorCertificateSecret: "my-server-cert"\n    otelCollectorClientCertificateSecret: "my-client-cert"\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The Secret referenced by the ",(0,s.jsx)(n.code,{children:"otelCollectorCertificateSecret"})," key must have an\nentry named ",(0,s.jsx)(n.code,{children:"ca.crt"}),".\nThat holds the certificate of the CA that issued the\ncertificate used by the OpenTelemetry Collector."]}),"\n",(0,s.jsxs)(n.p,{children:["The Secret referenced by the ",(0,s.jsx)(n.code,{children:"otelCollectorClientCertificateSecret"})," key must have\nthe following entries: ",(0,s.jsx)(n.code,{children:"tls.crt"})," and ",(0,s.jsx)(n.code,{children:"tls.key"})," keys.\nThese are the client certificate and\nits key that used by the Kubewarden stack to authenticate against the OpenTelemetry Collector."]}),"\n",(0,s.jsx)(n.p,{children:"Leave these values empty if you do not use encryption or mTLS."}),"\n",(0,s.jsx)(n.p,{children:"Install the Kubewarden stack:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm install --wait \\\n  --namespace kubewarden --create-namespace \\\n  kubewarden-crds kubewarden/kubewarden-crds\n\nhelm install --wait \\\n  --namespace kubewarden \\\n  --create-namespace \\\n  --values values.yaml \\\n  kubewarden-controller kubewarden/kubewarden-controller\n\nhelm install --wait \\\n  --namespace kubewarden \\\n  --create-namespace \\\n  kubewarden-defaults kubewarden/kubewarden-defaults \\\n  --set recommendedPolicies.enabled=True \\\n  --set recommendedPolicies.defaultPolicyMode=monitor\n"})}),"\n",(0,s.jsx)(n.p,{children:"Now everything is in place."}),"\n",(0,s.jsx)(n.h2,{id:"exploring-the-jaeger-ui",children:"Exploring the Jaeger UI"}),"\n",(0,s.jsxs)(n.p,{children:["You can see the trace events generated by Kubewarden by using the Jaeger web UI.\nThey're grouped under the ",(0,s.jsx)(n.code,{children:"kubewarden-policy-server"})," service:"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"The Jaeger dashboard",src:t(98380).A+"",title:"The Jaeger dashboard",width:"1921",height:"881"})}),"\n",(0,s.jsx)(n.p,{children:"To access the Jaeger UI, you can create an Ingress or you can do a port\nforwarding to your local machine:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl -n jaeger port-forward service/my-open-telemetry-query 16686\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The web UI is reachable at ",(0,s.jsx)(n.a,{href:"localhost:16686",children:"localhost:16686"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"exploring-the-prometheus-ui",children:"Exploring the Prometheus UI"}),"\n",(0,s.jsx)(n.p,{children:"You can access the Prometheus UI by port forwarding to your local machine:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-operated 9090 \n"})}),"\n",(0,s.jsxs)(n.p,{children:["The web UI is now reachable at ",(0,s.jsx)(n.a,{href:"localhost:9090",children:"localhost:9090"}),"."]})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},98380:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/jaeger-custom-otel-collector-b0aceac8e0ce50c1e9fbdb7116dd3678.png"},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var r=t(96540);const s={},a=r.createContext(s);function o(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);