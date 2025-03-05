"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[9991],{56315:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"howtos/telemetry/metrics-qs","title":"Metrics quickstart","description":"Metrics quickstart in Kubewarden.","source":"@site/docs/howtos/telemetry/30-metrics-qs.md","sourceDirName":"howtos/telemetry","slug":"/howtos/telemetry/metrics-qs","permalink":"/next/howtos/telemetry/metrics-qs","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/howtos/telemetry/30-metrics-qs.md","tags":[],"version":"current","lastUpdatedAt":1741183468000,"sidebarPosition":30,"frontMatter":{"sidebar_label":"Metrics","title":"Metrics quickstart","description":"Metrics quickstart in Kubewarden.","keywords":["kubewarden","kubernetes","metrics quickstart"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","telemetry","metrics","quick-start"]},"sidebar":"docs","previous":{"title":"Tracing","permalink":"/next/howtos/telemetry/tracing-qs"},"next":{"title":"Custom OpenTelemetry Collector","permalink":"/next/howtos/telemetry/custom-otel-collector"}}');var t=r(74848),a=r(28453);const o={sidebar_label:"Metrics",title:"Metrics quickstart",description:"Metrics quickstart in Kubewarden.",keywords:["kubewarden","kubernetes","metrics quickstart"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","telemetry","metrics","quick-start"]},i=void 0,c={},l=[{value:"Install Prometheus",id:"install-prometheus",level:2},{value:"Install Kubewarden",id:"install-kubewarden",level:2},{value:"Accessing Prometheus",id:"accessing-prometheus",level:2},{value:"Accessing Grafana",id:"accessing-grafana",level:2},{value:"Using the Kubewarden Grafana dashboard",id:"using-the-kubewarden-grafana-dashboard",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,a.R)(),...e.components},{Head:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/telemetry/metrics-qs"})}),"\n",(0,t.jsx)(n.p,{children:"This section documents how to enable metrics reporting on the Policy Server."}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["Before continuing, make sure you completed the previous\n",(0,t.jsx)(n.a,{href:"/next/howtos/telemetry/opentelemetry-qs#install-opentelemetry",children:"OpenTelemetry"})," section of this book. You\nneed it for this section to work correctly."]})}),"\n",(0,t.jsxs)(n.p,{children:["You use ",(0,t.jsx)(n.a,{href:"https://prometheus.io/",children:"Prometheus"})," to collect metrics exposed by the Policy\nServer."]}),"\n",(0,t.jsx)(n.h2,{id:"install-prometheus",children:"Install Prometheus"}),"\n",(0,t.jsxs)(n.p,{children:["You use the ",(0,t.jsx)(n.a,{href:"https://github.com/prometheus-operator/prometheus-operator",children:"Prometheus Operator"}),",\nthat lets define Prometheus' targets."]}),"\n",(0,t.jsx)(n.p,{children:"There are many ways to install and set up Prometheus.\nFor ease of deployment, you should use the\nPrometheus community Helm chart."}),"\n",(0,t.jsxs)(n.p,{children:["The Prometheus Operator deployed with this Helm chart uses ",(0,t.jsx)(n.a,{href:"https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#servicemonitor",children:"Service Monitors"})," to define which services Prometheus should monitor."]}),"\n",(0,t.jsxs)(n.p,{children:["In your case, you are adding a ServiceMonitor targeting the ",(0,t.jsx)(n.code,{children:"kubewarden"})," namespace for services that\nmatch labels ",(0,t.jsx)(n.code,{children:"app=kubewarden-policy-server-default"})," and ",(0,t.jsx)(n.code,{children:"app.kubernetes.io/name: kubewarden-controller"}),".\nThis configures the Prometheus Operator to inspect which Kubernetes endpoints belong to services matching these conditions."]}),"\n",(0,t.jsxs)(n.p,{children:["You can create two ServiceMonitors named ",(0,t.jsx)(n.code,{children:"kubewarden-controller"})," and ",(0,t.jsx)(n.code,{children:"kubewarden-policy-server"})," for use by the\ndefault Prometheus instance installed by the Helm chart.\nTo do that, you should create the following values file:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"cat <<EOF > kube-prometheus-stack-values.yaml\nprometheus:\n  additionalServiceMonitors:\n    - name: kubewarden\n      selector:\n        matchLabels:\n          app: kubewarden-policy-server-default\n      namespaceSelector:\n        matchNames:\n          - kubewarden\n      endpoints:\n        - port: metrics\n          interval: 10s\n    - name: kubewarden-controller\n      selector:\n        matchLabels:\n          app.kubernetes.io/name: kubewarden-controller\n      namespaceSelector:\n        matchNames:\n          - kubewarden\n      endpoints:\n        - port: metrics\n          interval: 10s\nEOF\n"})}),"\n",(0,t.jsx)(n.p,{children:"You should install the Prometheus stack Helm chart:"}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["At time of writing (2023-11-17) the latest chart version is ",(0,t.jsx)(n.code,{children:"51.5.3"})]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"helm repo add prometheus-community https://prometheus-community.github.io/helm-charts\n\nhelm install --wait --create-namespace \\\n  --namespace prometheus \\\n  --version 51.5.3 \\\n  --values kube-prometheus-stack-values.yaml \\\n  prometheus prometheus-community/kube-prometheus-stack\n"})}),"\n",(0,t.jsx)(n.h2,{id:"install-kubewarden",children:"Install Kubewarden"}),"\n",(0,t.jsx)(n.p,{children:"You can now install Kubewarden, in the recommended way, using Helm charts."}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"cert-manager is a requirement of OpenTelemetry, but you have already installed\nit in a previous section of this book."})}),"\n",(0,t.jsx)(n.p,{children:"First, you should add the Helm repository that contains Kubewarden:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"helm repo add kubewarden https://charts.kubewarden.io\n"})}),"\n",(0,t.jsx)(n.p,{children:"Then you install the Custom Resource Definitions (CRDs) defined by\nKubewarden:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"helm install --wait \\\n  --namespace kubewarden --create-namespace \\\n  kubewarden-crds kubewarden/kubewarden-crds\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Now you can deploy the rest of the Kubewarden stack. The official helm\nchart creates a PolicyServer named ",(0,t.jsx)(n.code,{children:"default"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["You should configure the Helm chart so that you have metrics enabled\nin Kubewarden. The ",(0,t.jsx)(n.code,{children:"kubewarden-values.yaml"})," file should have the following contents:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"telemetry:\n  mode: sidecar\n  metrics: True\n  sidecar:\n    metrics:\n      port: 8080\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now, install the helm charts:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"helm install --wait \\\n  --namespace kubewarden \\\n  --create-namespace \\\n  --values kubewarden-values.yaml \\\n  kubewarden-controller kubewarden/kubewarden-controller\n\nhelm install --wait \\\n  --namespace kubewarden \\\n  --create-namespace \\\n  kubewarden-defaults kubewarden/kubewarden-defaults \\\n  --set recommendedPolicies.enabled=True \\\n  --set recommendedPolicies.defaultPolicyMode=monitor\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This creates the ",(0,t.jsx)(n.code,{children:"default"})," instance of ",(0,t.jsx)(n.code,{children:"PolicyServer"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"kubectl get policyservers.policies.kubewarden.io\nNAME      AGE\ndefault   3m7s\n"})}),"\n",(0,t.jsx)(n.p,{children:"By default, this policy server doesn't have metrics enabled."}),"\n",(0,t.jsx)(n.h2,{id:"accessing-prometheus",children:"Accessing Prometheus"}),"\n",(0,t.jsx)(n.p,{children:"Prometheus exposes a UI that you can use to inspect metrics exposed by different\ncomponents within your Kubernetes cluster."}),"\n",(0,t.jsx)(n.p,{children:"You can forward the Prometheus port so you can access it."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-operated 9090\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Now, you can visit Prometheus on port ",(0,t.jsx)(n.code,{children:"9090"})," and perform a query, for example:\n",(0,t.jsx)(n.code,{children:"kubewarden_policy_evaluations_total"}),".\nYou see that the number of evaluations grows over\ntime as more requests go through the policy."]}),"\n",(0,t.jsx)(n.h2,{id:"accessing-grafana",children:"Accessing Grafana"}),"\n",(0,t.jsx)(n.p,{children:"You can forward the Grafana service so you can access it."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-grafana 8080:80\n"})}),"\n",(0,t.jsxs)(n.p,{children:["You can now login with the default username ",(0,t.jsx)(n.code,{children:"admin"})," and password ",(0,t.jsx)(n.code,{children:"prom-operator"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"using-the-kubewarden-grafana-dashboard",children:"Using the Kubewarden Grafana dashboard"}),"\n",(0,t.jsxs)(n.p,{children:["Kubewarden has a Grafana dashboard with basic metrics\ngiving an overview about how Kubewarden behaves in the cluster.\nThis dashboard\nis available in the GitHub releases of the Kubewarden ",(0,t.jsx)(n.code,{children:"policy-server"})," repository as a\n",(0,t.jsx)(n.a,{href:"https://github.com/kubewarden/policy-server/releases/latest/download/kubewarden-dashboard.json",children:"JSON file"}),"\nor at the ",(0,t.jsx)(n.a,{href:"https://grafana.com/grafana/dashboards/15314",children:"Grafana website"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"To import the dashboard into your environment, you can download the JSON file\nfrom the Grafana website or the repository:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"curl https://github.com/kubewarden/policy-server/releases/latest/download/kubewarden-dashboard.json\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Once you have the file you should access the Grafana dashboard and\n",(0,t.jsx)(n.a,{href:"https://grafana.com/docs/grafana/latest/dashboards/export-import/#import-dashboard",children:"import it"}),".\nVisit ",(0,t.jsx)(n.code,{children:"/dashboard/import"})," in the Grafana dashboard and follow these steps:"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Copy and paste the JSON file contents into the ",(0,t.jsx)(n.code,{children:"Import via panel json"})," box in the Grafana UI."]}),"\n",(0,t.jsxs)(n.li,{children:["Click the ",(0,t.jsx)(n.code,{children:"Load"})," button."]}),"\n",(0,t.jsxs)(n.li,{children:["Choose ",(0,t.jsx)(n.code,{children:"Prometheus"})," as the source."]}),"\n",(0,t.jsxs)(n.li,{children:["Click the ",(0,t.jsx)(n.code,{children:"Import"})," button."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Another option is import it directly from the Grafana.com website. For this:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Copy the dashboard ID from the ",(0,t.jsx)(n.a,{href:"https://grafana.com/grafana/dashboards/15314",children:"dashboard page"}),","]}),"\n",(0,t.jsxs)(n.li,{children:["Paste it into the ",(0,t.jsx)(n.code,{children:"Import via grafana.com"})," field."]}),"\n",(0,t.jsxs)(n.li,{children:["Click the ",(0,t.jsx)(n.code,{children:"load"})," button."]}),"\n",(0,t.jsx)(n.li,{children:"After importing the dashboard, define the Prometheus data source to use and finish\nthe import process."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"The Grafana dashboard has panes showing the state of all\npolicies managed by Kubewarden. It also has policy-specific panels."}),"\n",(0,t.jsxs)(n.p,{children:["You can obtain detailed metrics for a specific policy by changing the value of the ",(0,t.jsx)(n.code,{children:"policy_name"})," variable to match the required policy's name."]}),"\n",(0,t.jsx)(n.p,{children:"You should be able to see the dashboard similar to this:"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Dashboard",src:r(72506).A+"",width:"1920",height:"5460"})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},72506:(e,n,r)=>{r.d(n,{A:()=>s});const s=r.p+"assets/images/grafana_dashboard-00109cfaf657e90256248ea067eb8ed5.png"},28453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>i});var s=r(96540);const t={},a=s.createContext(t);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);