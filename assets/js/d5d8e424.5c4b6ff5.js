"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[51147],{1410:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"operator-manual/ui-extension/tracing","title":"Tracing","description":"Tracing allows to collect fine grained details about policy evaluations. It can be a useful tool for debugging issues inside of your Kubewarden deployment and policies.","source":"@site/versioned_docs/version-1.7/operator-manual/ui-extension/tracing.md","sourceDirName":"operator-manual/ui-extension","slug":"/operator-manual/ui-extension/tracing","permalink":"/1.7/operator-manual/ui-extension/tracing","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/operator-manual/ui-extension/tracing.md","tags":[],"version":"1.7","lastUpdatedAt":1743662333000,"frontMatter":{},"sidebar":"docs","previous":{"title":"Monitoring","permalink":"/1.7/operator-manual/ui-extension/metrics"},"next":{"title":"Requirements","permalink":"/1.7/operator-manual/airgap/requirements"}}');var a=r(74848),i=r(28453);const o={},s="Tracing",l={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Install Jaeger",id:"install-jaeger",level:2},{value:"Update <code>rancher-kubewarden-controller</code> with Jaeger endpoint",id:"update-rancher-kubewarden-controller-with-jaeger-endpoint",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"tracing",children:"Tracing"})}),"\n",(0,a.jsx)(n.p,{children:"Tracing allows to collect fine grained details about policy evaluations. It can be a useful tool for debugging issues inside of your Kubewarden deployment and policies."}),"\n",(0,a.jsxs)(n.p,{children:["We will use ",(0,a.jsx)(n.a,{href:"https://www.jaegertracing.io/",children:"Jaeger"})," to receive, store and visualize trace events."]}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.em,{children:(0,a.jsx)(n.strong,{children:"Policy tracing logs"})}),"\n",(0,a.jsx)(n.img,{alt:"UI Policy Tracing Logs",src:r(88939).A+"",width:"1075",height:"1061"})]}),"\n",(0,a.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,a.jsxs)(n.p,{children:["Cert-Manager and OpenTelemetry are required.\nFollow ",(0,a.jsx)(n.a,{href:"/1.7/operator-manual/telemetry/opentelemetry/quickstart#install-opentelemetry",children:"these instructions"})," to install Cert Manager and the OpenTelemetry Operator."]}),"\n",(0,a.jsx)(n.h2,{id:"install-jaeger",children:"Install Jaeger"}),"\n",(0,a.jsxs)(n.p,{children:["Apply the installation steps from the ",(0,a.jsx)(n.a,{href:"/1.7/operator-manual/telemetry/tracing/quickstart#install-jaeger",children:"tracing quickstart"}),"."]}),"\n",(0,a.jsxs)(n.p,{children:["Once all the resources have been created by the Jaeger operator, we will have a\nService under ",(0,a.jsx)(n.code,{children:"my-open-telemetry-collector.jaeger.svc.cluster.local"}),"."]}),"\n",(0,a.jsx)(n.p,{children:"The Jaeger Query UI will be reachable at the following address:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-console",children:"https://<CLUSTER_IP>/api/v1/namespaces/jaeger/services/http:my-open-telemetry-query:16686/proxy/search\n"})}),"\n",(0,a.jsx)(n.p,{children:"This endpoint may be unique depending on your configuration. You can find the endpoint listed for your Jaeger resource under the Services page."}),"\n",(0,a.jsxs)(n.h3,{id:"update-rancher-kubewarden-controller-with-jaeger-endpoint",children:["Update ",(0,a.jsx)(n.code,{children:"rancher-kubewarden-controller"})," with Jaeger endpoint"]}),"\n",(0,a.jsxs)(n.p,{children:["You will need to edit the ",(0,a.jsx)(n.code,{children:"rancher-kubewarden-controller"}),' resource to add the Jaeger endpoint "my-open-telemetry-collector.jaeger.svc.cluster.local:14250".']}),"\n",(0,a.jsx)(n.p,{children:"For instance:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:'telemetry:\n  enabled: True\n  tracing:\n    jaeger:\n      endpoint: "my-open-telemetry-collector.jaeger.svc.cluster.local:14250"\n      tls:\n        insecure: true\n'})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"my-open-telemetry-collector"})," is the service we installed under the ",(0,a.jsx)(n.code,{children:"jaeger"})," namespace."]}),"\n",(0,a.jsxs)(n.admonition,{type:"caution",children:[(0,a.jsx)(n.p,{children:"To keep things simple, we are not going to encrypt the communication between the\nOpenTelemetry collector and the Jaeger endpoint."}),(0,a.jsxs)(n.p,{children:["This is ",(0,a.jsx)(n.strong,{children:"not meant to be a production deployment"}),".\nWe strongly recommend\nto read Jaeger's ",(0,a.jsx)(n.a,{href:"https://www.jaegertracing.io/docs/latest/operator/",children:"official documentation"}),"."]})]}),"\n",(0,a.jsx)(n.p,{children:"You should now be able to view any failed requests for policies tied to a specific Policy Server or the detail view for any given policy. You can get a more in-depth view into the traces from the Jaeger UI."})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},88939:(e,n,r)=>{r.d(n,{A:()=>t});const t=r.p+"assets/images/ui_policy_tracing-8ed4d8fe989286a671f867e04131aedc.png"},28453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>s});var t=r(96540);const a={},i=t.createContext(a);function o(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);