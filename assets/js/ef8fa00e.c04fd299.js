"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[89229],{27288:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>c,metadata:()=>i,toc:()=>a});var r=n(85893),d=n(11151);const c={sidebar_label:"Dependency matrix",sidebar_position:10,title:"Dependency matrix",description:"Dependency matrix of Kubewarden.",keywords:["dependency","dependencies","CRD","charts","matrix"],"doc-persona":["kubewarden-all"],"doc-type":["reference"],"doc-topic":["operator-manual","dependencies"]},s=void 0,i={id:"reference/dependency-matrix",title:"Dependency matrix",description:"Dependency matrix of Kubewarden.",source:"@site/docs/reference/dependency-matrix.md",sourceDirName:"reference",slug:"/reference/dependency-matrix",permalink:"/next/reference/dependency-matrix",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/reference/dependency-matrix.md",tags:[],version:"current",lastUpdatedAt:1725863934e3,sidebarPosition:10,frontMatter:{sidebar_label:"Dependency matrix",sidebar_position:10,title:"Dependency matrix",description:"Dependency matrix of Kubewarden.",keywords:["dependency","dependencies","CRD","charts","matrix"],"doc-persona":["kubewarden-all"],"doc-type":["reference"],"doc-topic":["operator-manual","dependencies"]},sidebar:"docs",previous:{title:"Custom Resources Definitions (CRD)",permalink:"/next/reference/CRDs"},next:{title:"Upgrade path",permalink:"/next/reference/upgrade-path"}},l={},a=[{value:"Opentelemetry, metrics and tracing dependencies",id:"opentelemetry-metrics-and-tracing-dependencies",level:2},{value:"Optional dependencies",id:"optional-dependencies",level:2},{value:"Rancher",id:"rancher",level:2}];function o(e){const t={a:"a",code:"code",h2:"h2",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,d.a)(),...e.components},{Head:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n,{children:(0,r.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/dependency-matrix"})}),"\n",(0,r.jsx)(t.p,{children:"This page lists the dependencies of Kubewarden, with their relevant\nversion constraints. Versions outside of the provided ranges may work but are\nnot tested."}),"\n",(0,r.jsx)(t.h2,{id:"opentelemetry-metrics-and-tracing-dependencies",children:"Opentelemetry, metrics and tracing dependencies"}),"\n",(0,r.jsxs)(t.p,{children:["At the time of writing, the ",(0,r.jsx)(t.a,{href:"https://opentelemetry.io",children:"Opentelemetry"})," stack\nkeeps improving. Still, is not yet stable, and unannounced\nbackwards-incompatible changes still happen. Kubewarden devs do their best to\ntrack Opentelemetry stack changes and adjust to them. Kubewarden is tested against a known working\nrange of Opentelemetry, metrics and tracing stack."]}),"\n",(0,r.jsx)(t.h2,{id:"optional-dependencies",children:"Optional dependencies"}),"\n",(0,r.jsx)(t.p,{children:"Needed for specific features."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Chart dependency"}),(0,r.jsxs)(t.th,{style:{textAlign:"center"},children:["Helm chart ",(0,r.jsx)(t.code,{children:"appVersion"})]}),(0,r.jsxs)(t.th,{style:{textAlign:"center"},children:["Helm chart ",(0,r.jsx)(t.code,{children:"version"})]}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Feature"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.code,{children:"open-telemetry/opentelemetry-operator"})," chart"]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.code,{children:">= 0.98"})}),(0,r.jsxs)(t.td,{style:{textAlign:"center"},children:["Example: ",(0,r.jsx)(t.code,{children:"0.56.0"})]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"OTLM"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.code,{children:"prometheus-community/kube-prometheus-stack"})," chart"]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.code,{children:">= v0.69"})}),(0,r.jsxs)(t.td,{style:{textAlign:"center"},children:["Example: ",(0,r.jsx)(t.code,{children:"51.5.3"})]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"Metrics"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.code,{children:"jaegertracing/jaeger-operator"})," chart"]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.code,{children:">= 1.49 < 2"})}),(0,r.jsxs)(t.td,{style:{textAlign:"center"},children:["Example: ",(0,r.jsx)(t.code,{children:"2.49.0"})]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"Tracing"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.code,{children:"kyverno/policy-reporter"})," chart"]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.code,{children:">= 2 < 3"})}),(0,r.jsxs)(t.td,{style:{textAlign:"center"},children:["In ",(0,r.jsx)(t.code,{children:"kubewarden-controller"})," chart as subchart"]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"Policy Reports UI"})]})]})]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"CRD dependency"}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Version"}),(0,r.jsxs)(t.th,{style:{textAlign:"center"},children:["Helm chart ",(0,r.jsx)(t.code,{children:"version"})]}),(0,r.jsx)(t.th,{style:{textAlign:"center"},children:"Feature"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsxs)(t.td,{children:[(0,r.jsx)(t.code,{children:"policyreports.wgpolicyk8s.io"})," CRDs"]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:(0,r.jsx)(t.code,{children:"v1alpha1"})}),(0,r.jsxs)(t.td,{style:{textAlign:"center"},children:["In ",(0,r.jsx)(t.code,{children:"kubewarden-defaults"})," chart or manually installed"]}),(0,r.jsx)(t.td,{style:{textAlign:"center"},children:"Audit Scanner"})]})})]}),"\n",(0,r.jsx)(t.h2,{id:"rancher",children:"Rancher"}),"\n",(0,r.jsx)(t.p,{children:"For downstream consumers such as Rancher, Kubewarden is tested against the\nmonitoring and tracing Helm charts provided in the Rancher charts repository."})]})}function h(e={}){const{wrapper:t}={...(0,d.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>s});var r=n(67294);const d={},c=r.createContext(d);function s(e){const t=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),r.createElement(c.Provider,{value:t},e.children)}}}]);