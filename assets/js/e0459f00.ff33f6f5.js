"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[27245],{13389:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>a});var i=n(85893),t=n(11151);const r={sidebar_label:"Monitor mode",sidebar_position:50,title:"Monitor mode",description:"The Kubewarden monitor mode and how to activate it.",keywords:["kubernetes","kubewarden","monitor mode"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-integrator"],"doc-type":["reference"],"doc-topic":["operator-manual","monitor-mode"]},c=void 0,s={id:"reference/monitor-mode",title:"Monitor mode",description:"The Kubewarden monitor mode and how to activate it.",source:"@site/versioned_docs/version-1.11/reference/monitor-mode.md",sourceDirName:"reference",slug:"/reference/monitor-mode",permalink:"/reference/monitor-mode",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.11/reference/monitor-mode.md",tags:[],version:"1.11",lastUpdatedAt:1712751415e3,sidebarPosition:50,frontMatter:{sidebar_label:"Monitor mode",sidebar_position:50,title:"Monitor mode",description:"The Kubewarden monitor mode and how to activate it.",keywords:["kubernetes","kubewarden","monitor mode"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-integrator"],"doc-type":["reference"],"doc-topic":["operator-manual","monitor-mode"]},sidebar:"docs",previous:{title:"Metrics Reference",permalink:"/reference/metrics-reference"},next:{title:"Policy communication specification",permalink:"/reference/spec/intro-spec"}},d={},a=[{value:"Changing policy mode",id:"changing-policy-mode",level:2},{value:"A note on mutating policies",id:"a-note-on-mutating-policies",level:2}];function l(e){const o={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components},{Head:n}=o;return n||function(e,o){throw new Error("Expected "+(o?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n,{children:(0,i.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/monitor-mode"})}),"\n",(0,i.jsxs)(o.p,{children:["When defining a policy,\nyou can choose between two modes,\nspecified in its ",(0,i.jsx)(o.a,{href:"CRDs#admissionpolicyspec",children:(0,i.jsx)(o.code,{children:"spec.mode"})}),".\nBy default, the policy is deployed in ",(0,i.jsx)(o.code,{children:"mode: protect"}),",\nwhere it accepts, rejects, or mutates requests."]}),"\n",(0,i.jsx)(o.p,{children:"One can choose to deploy a policy in monitor mode. In monitor mode:"}),"\n",(0,i.jsxs)(o.ul,{children:["\n",(0,i.jsx)(o.li,{children:"The policy accepts all requests, as if the policy wasn't installed."}),"\n",(0,i.jsxs)(o.li,{children:["The ",(0,i.jsx)(o.code,{children:"policy-server"})," traces the policy normally.\nDetails are included in the trace on whether the request would have been rejected,\nor if a mutation would have been proposed by the policy."]}),"\n",(0,i.jsxs)(o.li,{children:["The ",(0,i.jsx)(o.code,{children:"policy-server"})," metrics are updated normally, with the mode included in the metric baggage.\nTherefore, it's easy to filter policies by mode, and focus on the ones deployed via ",(0,i.jsx)(o.code,{children:"monitor"})," mode."]}),"\n"]}),"\n",(0,i.jsxs)(o.p,{children:["The ",(0,i.jsx)(o.code,{children:"mode"})," is an attribute included in the ",(0,i.jsx)(o.code,{children:"ClusterAdmissionPolicy"})," and ",(0,i.jsx)(o.code,{children:"AdmissionPolicy"})," resources.\nThere are two values that the ",(0,i.jsx)(o.code,{children:"mode"})," attribute can assume: ",(0,i.jsx)(o.code,{children:"monitor"})," and ",(0,i.jsx)(o.code,{children:"protect"}),".\nThe ",(0,i.jsx)(o.code,{children:"mode"})," defaults to ",(0,i.jsx)(o.code,{children:"protect"})," if omitted."]}),"\n",(0,i.jsxs)(o.p,{children:["To create a policy in ",(0,i.jsx)(o.code,{children:"monitor mode"})," you to need include the ",(0,i.jsx)(o.code,{children:"mode: monitor"})," as part of the specification of the resource.\nFor example, as highlighted, in this ",(0,i.jsx)(o.code,{children:"ClusterAdmissionPolicy"}),":"]}),"\n",(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:"language-yaml",children:'apiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-capabilities\nspec:\n// highlight-next-line\n  mode: monitor\n  policyServer: reserved-instance-for-tenant-a\n  module: registry://ghcr.io/kubewarden/policies/psp-capabilities:v0.1.3\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n    - UPDATE\n  mutating: true\n  settings:\n    allowed_capabilities:\n    - CHOWN\n    required_drop_capabilities:\n    - NET_ADMIN\n'})}),"\n",(0,i.jsx)(o.h2,{id:"changing-policy-mode",children:"Changing policy mode"}),"\n",(0,i.jsxs)(o.p,{children:["For security purposes, a user with ",(0,i.jsx)(o.code,{children:"UPDATE"})," permissions on policy resources can make the policy more restrictive.\nThis means that you can change the ",(0,i.jsx)(o.code,{children:"mode"})," of an existing ",(0,i.jsx)(o.code,{children:"ClusterAdmissionPolicy"})," or ",(0,i.jsx)(o.code,{children:"AdmissionPolicy"})," from ",(0,i.jsx)(o.code,{children:"monitor"})," to ",(0,i.jsx)(o.code,{children:"protect"}),"."]}),"\n",(0,i.jsxs)(o.p,{children:["However, you can't change the ",(0,i.jsx)(o.code,{children:"mode"})," of an existing ",(0,i.jsx)(o.code,{children:"ClusterAdmissionPolicy"})," or ",(0,i.jsx)(o.code,{children:"AdmissionPolicy"})," from ",(0,i.jsx)(o.code,{children:"protect"})," to ",(0,i.jsx)(o.code,{children:"monitor"}),"."]}),"\n",(0,i.jsxs)(o.p,{children:["So, to change the ",(0,i.jsx)(o.code,{children:"mode"})," of a policy from ",(0,i.jsx)(o.code,{children:"protect"})," to ",(0,i.jsx)(o.code,{children:"monitor"}),",\nyou need to delete the policy and re-create it in ",(0,i.jsx)(o.code,{children:"monitor"})," mode.\nSwitching a policy from ",(0,i.jsx)(o.code,{children:"protect"})," to ",(0,i.jsx)(o.code,{children:"monitor"})," is effectively the same as deleting the policy so this approach ensures that the user has policy delete permissions."]}),"\n",(0,i.jsx)(o.h2,{id:"a-note-on-mutating-policies",children:"A note on mutating policies"}),"\n",(0,i.jsxs)(o.p,{children:["Mutating policies in ",(0,i.jsx)(o.code,{children:"monitor"})," mode won't perform a mutation on the resource.\nIn ",(0,i.jsx)(o.code,{children:"monitor"})," mode policies log what their action would have been.\nThey also log the mutation patch they would have produced in ",(0,i.jsx)(o.code,{children:"protect"})," mode."]}),"\n",(0,i.jsxs)(o.p,{children:["When a mutating policy is in ",(0,i.jsx)(o.code,{children:"monitor"})," mode, later policies evaluate an unchanged, and so different resource, than when the mutating policy is in ",(0,i.jsx)(o.code,{children:"protect"})," mode."]})]})}function h(e={}){const{wrapper:o}={...(0,t.a)(),...e.components};return o?(0,i.jsx)(o,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},11151:(e,o,n)=>{n.d(o,{Z:()=>s,a:()=>c});var i=n(67294);const t={},r=i.createContext(t);function c(e){const o=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function s(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(r.Provider,{value:o},e.children)}}}]);