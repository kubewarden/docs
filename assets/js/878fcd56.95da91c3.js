"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[22238],{44890:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>o,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"reference/metrics-reference","title":"Metrics reference","description":"Metrics reference documentation for Kubewarden.","source":"@site/versioned_docs/version-1.11/reference/metrics-reference.md","sourceDirName":"reference","slug":"/reference/metrics-reference","permalink":"/1.11/reference/metrics-reference","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.11/reference/metrics-reference.md","tags":[],"version":"1.11","lastUpdatedAt":1734604732000,"sidebarPosition":30,"frontMatter":{"sidebar_label":"Metrics Reference","sidebar_position":30,"title":"Metrics reference","description":"Metrics reference documentation for Kubewarden.","keywords":["kubewarden","kubernetes","metrics","reference"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-integrator"],"doc-type":["reference"],"doc-topic":["operator-manual","telemetry","metrics","reference"]},"sidebar":"docs","previous":{"title":"Upgrade path","permalink":"/1.11/reference/upgrade-path"},"next":{"title":"Monitor mode","permalink":"/1.11/reference/monitor-mode"}}');var c=t(74848),s=t(28453);const i={sidebar_label:"Metrics Reference",sidebar_position:30,title:"Metrics reference",description:"Metrics reference documentation for Kubewarden.",keywords:["kubewarden","kubernetes","metrics","reference"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-integrator"],"doc-type":["reference"],"doc-topic":["operator-manual","telemetry","metrics","reference"]},d=void 0,o={},a=[{value:"Policy Server",id:"policy-server",level:2},{value:"Metrics",id:"metrics",level:3},{value:"<code>kubewarden_policy_evaluations_total</code>",id:"kubewarden_policy_evaluations_total",level:4},{value:"Baggage",id:"baggage",level:5}];function l(e){const r={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...e.components},{Head:t}=r;return t||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t,{children:(0,c.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/metrics-reference"})}),"\n",(0,c.jsx)(r.p,{children:"Kubewarden exposes relevant platform metrics allowing cluster administrators and\npolicy developers to identify patterns and potential issues."}),"\n",(0,c.jsx)(r.h2,{id:"policy-server",children:"Policy Server"}),"\n",(0,c.jsx)(r.p,{children:"The Policy Server component initializes and runs policies.\nWhen receiving requests from the Kubernetes API server,\nit forwards the request to the policy,\nreturning the response provided by the policy to the Kubernetes API server."}),"\n",(0,c.jsx)(r.h3,{id:"metrics",children:"Metrics"}),"\n",(0,c.jsx)(r.admonition,{type:"note",children:(0,c.jsxs)(r.p,{children:[(0,c.jsx)(r.a,{href:"https://opentelemetry.io/docs/concepts/signals/baggage/",children:"Baggage"}),"\nkey-value attributes are added to the metric to provide additional information."]})}),"\n",(0,c.jsxs)(r.table,{children:[(0,c.jsx)(r.thead,{children:(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.th,{children:"Name"}),(0,c.jsx)(r.th,{children:"Type"}),(0,c.jsx)(r.th,{})]})}),(0,c.jsx)(r.tbody,{children:(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"kubewarden_policy_evaluations_total"})}),(0,c.jsx)(r.td,{children:"Counter"}),(0,c.jsx)(r.td,{children:(0,c.jsx)(r.a,{href:"#kubewarden_policy_evaluations_total",children:"Baggage"})})]})})]}),"\n",(0,c.jsx)(r.h4,{id:"kubewarden_policy_evaluations_total",children:(0,c.jsx)(r.code,{children:"kubewarden_policy_evaluations_total"})}),"\n",(0,c.jsx)(r.h5,{id:"baggage",children:"Baggage"}),"\n",(0,c.jsxs)(r.table,{children:[(0,c.jsx)(r.thead,{children:(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.th,{children:"Label"}),(0,c.jsx)(r.th,{children:"Description"})]})}),(0,c.jsxs)(r.tbody,{children:[(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"policy_name"})}),(0,c.jsx)(r.td,{children:"Name of the policy"})]}),(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"resource_name"})}),(0,c.jsx)(r.td,{children:"Name of the evaluated resource"})]}),(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"resource_kind"})}),(0,c.jsx)(r.td,{children:"Kind of the evaluated resource"})]}),(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"resource_namespace"})}),(0,c.jsx)(r.td,{children:"Namespace of the evaluated resource. Not present if the resource is cluster scoped."})]}),(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"resource_request_operation"})}),(0,c.jsxs)(r.td,{children:["Operation type: ",(0,c.jsx)(r.code,{children:"CREATE"}),", ",(0,c.jsx)(r.code,{children:"UPDATE"}),", ",(0,c.jsx)(r.code,{children:"DELETE"}),", ",(0,c.jsx)(r.code,{children:"PATCH"}),", ",(0,c.jsx)(r.code,{children:"WATCH"}),"..."]})]}),(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"accepted"})}),(0,c.jsx)(r.td,{children:"Whether the request was accepted or not"})]}),(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"mutated"})}),(0,c.jsx)(r.td,{children:"Whether the request was mutated or not"})]}),(0,c.jsxs)(r.tr,{children:[(0,c.jsx)(r.td,{children:(0,c.jsx)(r.code,{children:"error_code"})}),(0,c.jsx)(r.td,{children:"Error code returned by the policy in case of rejection, if any. Not present if the policy didn't provide one."})]})]})]})]})}function h(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,c.jsx)(r,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}},28453:(e,r,t)=>{t.d(r,{R:()=>i,x:()=>d});var n=t(96540);const c={},s=n.createContext(c);function i(e){const r=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),n.createElement(s.Provider,{value:r},e.children)}}}]);