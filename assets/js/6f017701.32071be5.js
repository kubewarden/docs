"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[8449],{93053:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"reference/dependency-matrix","title":"Dependency matrix","description":"Dependency matrix of Kubewarden.","source":"@site/versioned_docs/version-1.22/reference/dependency-matrix.md","sourceDirName":"reference","slug":"/reference/dependency-matrix","permalink":"/reference/dependency-matrix","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.22/reference/dependency-matrix.md","tags":[],"version":"1.22","lastUpdatedAt":1741855593000,"sidebarPosition":10,"frontMatter":{"sidebar_label":"Dependency matrix","sidebar_position":10,"title":"Dependency matrix","description":"Dependency matrix of Kubewarden.","keywords":["dependency","dependencies","CRD","charts","matrix"],"doc-persona":["kubewarden-all"],"doc-type":["reference"],"doc-topic":["operator-manual","dependencies"]},"sidebar":"docs","previous":{"title":"Custom Resources Definitions (CRD)","permalink":"/reference/CRDs"},"next":{"title":"Artifacts","permalink":"/reference/artifacts"}}');var d=t(74848),c=t(28453);const s={sidebar_label:"Dependency matrix",sidebar_position:10,title:"Dependency matrix",description:"Dependency matrix of Kubewarden.",keywords:["dependency","dependencies","CRD","charts","matrix"],"doc-persona":["kubewarden-all"],"doc-type":["reference"],"doc-topic":["operator-manual","dependencies"]},i=void 0,l={},a=[{value:"OpenTelemetry, metrics and tracing dependencies",id:"opentelemetry-metrics-and-tracing-dependencies",level:2},{value:"Optional dependencies",id:"optional-dependencies",level:2},{value:"Rancher",id:"rancher",level:2}];function o(e){const n={a:"a",code:"code",h2:"h2",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,c.R)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t,{children:(0,d.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/dependency-matrix"})}),"\n",(0,d.jsx)(n.p,{children:"This page lists the dependencies of Kubewarden, with their relevant\nversion constraints. Versions outside of the provided ranges may work but are\nnot tested."}),"\n",(0,d.jsx)(n.h2,{id:"opentelemetry-metrics-and-tracing-dependencies",children:"OpenTelemetry, metrics and tracing dependencies"}),"\n",(0,d.jsxs)(n.p,{children:["At the time of writing, the ",(0,d.jsx)(n.a,{href:"https://opentelemetry.io",children:"OpenTelemetry"})," stack\nkeeps improving. However, it's not yet stable, and unannounced\nbackwards-incompatible changes still happen. The Kubewarden developers endeavor\nto track OpenTelemetry stack changes and adjust to them. The project tests\nagainst a known working range of OpenTelemetry, metrics and tracing stack."]}),"\n",(0,d.jsx)(n.h2,{id:"optional-dependencies",children:"Optional dependencies"}),"\n",(0,d.jsx)(n.p,{children:"Needed for specific features."}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"Chart dependency"}),(0,d.jsxs)(n.th,{style:{textAlign:"center"},children:["Helm chart ",(0,d.jsx)(n.code,{children:"appVersion"})]}),(0,d.jsxs)(n.th,{style:{textAlign:"center"},children:["Helm chart ",(0,d.jsx)(n.code,{children:"version"})]}),(0,d.jsx)(n.th,{style:{textAlign:"center"},children:"Feature"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.code,{children:"open-telemetry/opentelemetry-operator"})," chart"]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:(0,d.jsx)(n.code,{children:">= 0.104"})}),(0,d.jsxs)(n.td,{style:{textAlign:"center"},children:["Example: ",(0,d.jsx)(n.code,{children:"0.65.0"})]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:"OTLM"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.code,{children:"prometheus-community/kube-prometheus-stack"})," chart"]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:(0,d.jsx)(n.code,{children:">= v0.69"})}),(0,d.jsxs)(n.td,{style:{textAlign:"center"},children:["Example: ",(0,d.jsx)(n.code,{children:"51.5.3"})]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:"Metrics"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.code,{children:"jaegertracing/jaeger-operator"})," chart"]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:(0,d.jsx)(n.code,{children:">= 1.49 < 2"})}),(0,d.jsxs)(n.td,{style:{textAlign:"center"},children:["Example: ",(0,d.jsx)(n.code,{children:"2.49.0"})]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:"Tracing"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.code,{children:"kyverno/policy-reporter"})," chart"]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:(0,d.jsx)(n.code,{children:">= 2 < 4"})}),(0,d.jsxs)(n.td,{style:{textAlign:"center"},children:["In ",(0,d.jsx)(n.code,{children:"kubewarden-controller"})," chart as subchart"]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:"Policy Reports UI"})]})]})]}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"CRD dependency"}),(0,d.jsx)(n.th,{style:{textAlign:"center"},children:"Version"}),(0,d.jsxs)(n.th,{style:{textAlign:"center"},children:["Helm chart ",(0,d.jsx)(n.code,{children:"version"})]}),(0,d.jsx)(n.th,{style:{textAlign:"center"},children:"Feature"})]})}),(0,d.jsx)(n.tbody,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsxs)(n.td,{children:[(0,d.jsx)(n.code,{children:"policyreports.wgpolicyk8s.io"})," CRDs"]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:(0,d.jsx)(n.code,{children:"v1alpha1"})}),(0,d.jsxs)(n.td,{style:{textAlign:"center"},children:["In ",(0,d.jsx)(n.code,{children:"kubewarden-defaults"})," chart or manually installed"]}),(0,d.jsx)(n.td,{style:{textAlign:"center"},children:"Audit Scanner"})]})})]}),"\n",(0,d.jsx)(n.h2,{id:"rancher",children:"Rancher"}),"\n",(0,d.jsx)(n.p,{children:"Kubewarden tests against the monitoring and tracing Helm charts provided in the\nRancher charts repository."})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(o,{...e})}):o(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var r=t(96540);const d={},c=r.createContext(d);function s(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),r.createElement(c.Provider,{value:n},e.children)}}}]);