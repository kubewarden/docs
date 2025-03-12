"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[96713],{4203:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"explanations/audit-scanner/audit-scanner","title":"What is the Audit Scanner?","description":"An overview of the Kubewarden Audit Scanner.","source":"@site/versioned_docs/version-1.22/explanations/audit-scanner/audit-scanner.md","sourceDirName":"explanations/audit-scanner","slug":"/explanations/audit-scanner/","permalink":"/explanations/audit-scanner/","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.22/explanations/audit-scanner/audit-scanner.md","tags":[],"version":"1.22","lastUpdatedAt":1741767418000,"sidebarPosition":50,"frontMatter":{"sidebar_label":"Audit Scanner","sidebar_position":50,"title":"What is the Audit Scanner?","description":"An overview of the Kubewarden Audit Scanner.","keywords":["kubewarden","audit scanner","kubernetes"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-policy-developer","kubewarden-integrator"],"doc-type":["explanation"],"doc-topic":["explanations","audit-scanner"]},"sidebar":"docs","previous":{"title":"Kubewarden vs OPA Gatekeeper","permalink":"/explanations/comparisons/opa-comparison"},"next":{"title":"Limitations","permalink":"/explanations/audit-scanner/limitations"}}');var s=t(74848),r=t(28453);const a={sidebar_label:"Audit Scanner",sidebar_position:50,title:"What is the Audit Scanner?",description:"An overview of the Kubewarden Audit Scanner.",keywords:["kubewarden","audit scanner","kubernetes"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-policy-developer","kubewarden-integrator"],"doc-type":["explanation"],"doc-topic":["explanations","audit-scanner"]},o=void 0,c={},d=[{value:"Enable audit scanner",id:"enable-audit-scanner",level:2},{value:"Policies",id:"policies",level:2},{value:"Permissions and ServiceAccounts",id:"permissions-and-serviceaccounts",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,r.R)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/explanations/audit-scanner"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"The Audit Scanner feature is available starting from Kubewarden 1.7.0 release"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"audit-scanner"})," component constantly checks resources in the cluster.\nIt flags the ones not adhering to Kubewarden policies deployed in the cluster."]}),"\n",(0,s.jsx)(n.p,{children:"Policies evolve over time. There are new policy deployments and policy updates.\nVersions and configuration settings change. This can lead to situations where\nresources already inside the cluster are no longer compliant. The audit\nscanning feature provides Kubernetes administrators with a tool that constantly\nverifies the compliance state of their clusters."}),"\n",(0,s.jsx)(n.p,{children:"To explain the use of the audit scanner in Kubewarden, consider the following\nscenario:"}),"\n",(0,s.jsx)(n.p,{children:"Assume Bob is deploying a WordPress Pod in the cluster. Bob is new to\nKubernetes, makes a mistake and deploys the Pod running as a privileged\ncontainer. At the moment, there's no policy preventing that so the Pod is\nsuccessfully created in the cluster."}),"\n",(0,s.jsx)(n.p,{children:"A few days later, Alice, the Kubernetes administrator, enforces a Kubewarden\npolicy that prohibits the creation of privileged containers. The Pod deployed\nby Bob keeps running in the cluster as it already exists."}),"\n",(0,s.jsx)(n.p,{children:"A report generated by the audit scanner lets Alice identify all the workloads\nthat are violating creation policies. This includes the WordPress Pod created\nby Bob."}),"\n",(0,s.jsx)(n.p,{children:"The audit scanner operates by:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"identifying all the resources to audit"}),"\n",(0,s.jsx)(n.li,{children:"for each resource, it builds a synthetic admission request with the\nresource's data"}),"\n",(0,s.jsx)(n.li,{children:"it sends each admission request to a policy server endpoint which is only for\naudit requests"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"For the policy evaluating the request, there are no differences between real or\naudit requests. This auditing policy server endpoint has instrumentation to\ncollect data about the evaluation. So, users can use their monitoring tools to\nanalyze audit scanner data."}),"\n",(0,s.jsx)(n.h2,{id:"enable-audit-scanner",children:"Enable audit scanner"}),"\n",(0,s.jsx)(n.p,{children:"You can enable the audit scanner starting from the Kubewarden 1.7.0 release."}),"\n",(0,s.jsxs)(n.p,{children:["Detailed installation instructions are in the\n",(0,s.jsx)(n.a,{href:"../howtos/audit-scanner",children:"audit scanner How-to"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"policies",children:"Policies"}),"\n",(0,s.jsxs)(n.p,{children:["By default, the audit scanner evaluates every policy. Operators that want to\nskip a policy evaluation in the audit scanner must set the\n",(0,s.jsx)(n.code,{children:"spec.backgroundAudit"})," field to ",(0,s.jsx)(n.code,{children:"false"})," in the policy definition."]}),"\n",(0,s.jsx)(n.p,{children:"Also, policies in Kubewarden now support two optional annotations:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"io.kubewarden.policy.severity"})," annotation lets you specify the severity\nlevel of the policy violation, such as ",(0,s.jsx)(n.code,{children:"critical"}),", ",(0,s.jsx)(n.code,{children:"high"}),", ",(0,s.jsx)(n.code,{children:"medium"}),", ",(0,s.jsx)(n.code,{children:"low"})," or\n",(0,s.jsx)(n.code,{children:"info"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"io.kubewarden.policy.category"})," annotation lets you categorize the policy\nbased on a specific domain or purpose, such as ",(0,s.jsx)(n.code,{children:"PSP"}),", ",(0,s.jsx)(n.code,{children:"compliance"}),", or\n",(0,s.jsx)(n.code,{children:"performance"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["See the policy authors\n",(0,s.jsx)(n.a,{href:"/tutorials/writing-policies/",children:"documentation"})," for more\ninformation."]}),"\n",(0,s.jsx)(n.h2,{id:"permissions-and-serviceaccounts",children:"Permissions and ServiceAccounts"}),"\n",(0,s.jsx)(n.p,{children:"The audit scanner in Kubewarden requires specific Role Based Access Control\n(RBAC) configurations to be able to scan Kubernetes resources and save the\nresults. Installation creates a correct default Service Account with those\npermissions. The user can create their own ServiceAccount to configure access\nto resources."}),"\n",(0,s.jsxs)(n.p,{children:["The default audit scanner ",(0,s.jsx)(n.code,{children:"ServiceAccount"})," binds to the ",(0,s.jsx)(n.code,{children:"view"})," ",(0,s.jsx)(n.code,{children:"ClusterRole"}),"\nprovided by Kubernetes. This ",(0,s.jsx)(n.code,{children:"ClusterRole"})," permits read-only access to a wide\nrange of Kubernetes resources within a namespace. You can find more details\nabout this role in the ",(0,s.jsx)(n.a,{href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles",children:"Kubernetes\ndocumentation"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["The audit scanner binds to a ",(0,s.jsx)(n.code,{children:"ClusterRole"})," that grants read access to\nKubewarden resource types and read-write access to the ",(0,s.jsx)(n.code,{children:"PolicyReport"})," CRDs.\nThese permissions let the scanner fetch resources for conducting audit\nevaluations and creating policy reports based on the evaluation results."]})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var i=t(96540);const s={},r=i.createContext(s);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);