"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[86609],{81214:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>a});var n=r(85893),s=r(11151);const i={sidebar_label:"Metrics Reference Documentation",title:""},d="Metrics Reference",c={id:"operator-manual/telemetry/metrics/reference",title:"",description:"Kubewarden exposes some relevant metrics that enhance visibility of the platform, and allows cluster",source:"@site/versioned_docs/version-1.8/operator-manual/telemetry/metrics/02-reference.md",sourceDirName:"operator-manual/telemetry/metrics",slug:"/operator-manual/telemetry/metrics/reference",permalink:"/1.8/operator-manual/telemetry/metrics/reference",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/operator-manual/telemetry/metrics/02-reference.md",tags:[],version:"1.8",lastUpdatedAt:1725647084e3,sidebarPosition:2,frontMatter:{sidebar_label:"Metrics Reference Documentation",title:""},sidebar:"docs",previous:{title:"Threat Model",permalink:"/1.8/security/threat-model"},next:{title:"Custom Resources Definitions (CRDs)",permalink:"/1.8/operator-manual/CRDs"}},o={},a=[{value:"Policy Server",id:"policy-server",level:2},{value:"Metrics",id:"metrics",level:3},{value:"<code>kubewarden_policy_evaluations_total</code>",id:"kubewarden_policy_evaluations_total",level:4},{value:"Baggage",id:"baggage",level:5}];function l(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"metrics-reference",children:"Metrics Reference"})}),"\n",(0,n.jsx)(t.p,{children:"Kubewarden exposes some relevant metrics that enhance visibility of the platform, and allows cluster\nadministrators and policy developers to identify patterns and potential issues."}),"\n",(0,n.jsx)(t.h2,{id:"policy-server",children:"Policy Server"}),"\n",(0,n.jsx)(t.p,{children:"The Policy Server is the component that initializes and runs policies. Upon receiving requests from\nthe Kubernetes API server, it will forward the request to the policy, and return the response\nprovided by the policy to the Kubernetes API server."}),"\n",(0,n.jsx)(t.h3,{id:"metrics",children:"Metrics"}),"\n",(0,n.jsx)(t.admonition,{type:"note",children:(0,n.jsx)(t.p,{children:"Baggage are key-value attributes added to the metric. They are used to enrich the metric\nwith additional information."})}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Name"}),(0,n.jsx)(t.th,{children:"Type"}),(0,n.jsx)(t.th,{})]})}),(0,n.jsx)(t.tbody,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"kubewarden_policy_evaluations_total"})}),(0,n.jsx)(t.td,{children:"Counter"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.a,{href:"#kubewarden_policy_evaluations_total",children:"Baggage"})})]})})]}),"\n",(0,n.jsx)(t.h4,{id:"kubewarden_policy_evaluations_total",children:(0,n.jsx)(t.code,{children:"kubewarden_policy_evaluations_total"})}),"\n",(0,n.jsx)(t.h5,{id:"baggage",children:"Baggage"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Label"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"policy_name"})}),(0,n.jsx)(t.td,{children:"Name of the policy"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"resource_name"})}),(0,n.jsx)(t.td,{children:"Name of the evaluated resource"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"resource_kind"})}),(0,n.jsx)(t.td,{children:"Kind of the evaluated resource"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"resource_namespace"})}),(0,n.jsx)(t.td,{children:"Namespace of the evaluated resource. Not present if the resource is cluster scoped."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"resource_request_operation"})}),(0,n.jsxs)(t.td,{children:["Operation type: ",(0,n.jsx)(t.code,{children:"CREATE"}),", ",(0,n.jsx)(t.code,{children:"UPDATE"}),", ",(0,n.jsx)(t.code,{children:"DELETE"}),", ",(0,n.jsx)(t.code,{children:"PATCH"}),", ",(0,n.jsx)(t.code,{children:"WATCH"}),"..."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"accepted"})}),(0,n.jsx)(t.td,{children:"Whether the request was accepted or not"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"mutated"})}),(0,n.jsx)(t.td,{children:"Whether the request was mutated or not"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"error_code"})}),(0,n.jsx)(t.td,{children:"Error code returned by the policy in case of rejection, if any. Not present if the policy didn't provide one."})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},11151:(e,t,r)=>{r.d(t,{Z:()=>c,a:()=>d});var n=r(67294);const s={},i=n.createContext(s);function d(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);