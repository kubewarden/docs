"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[2093],{20631:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var t=i(85893),s=i(11151);const o={sidebar_label:"Limitations",title:"Audit Scanner - Limitations",description:"The limitation of the audit scanner",keywords:["kubewarden","kubernetes","audit scanner"]},a=void 0,r={id:"explanations/audit-scanner/limitations",title:"Audit Scanner - Limitations",description:"The limitation of the audit scanner",source:"@site/versioned_docs/version-1.9/explanations/audit-scanner/limitations.md",sourceDirName:"explanations/audit-scanner",slug:"/explanations/audit-scanner/limitations",permalink:"/explanations/audit-scanner/limitations",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.9/explanations/audit-scanner/limitations.md",tags:[],version:"1.9",lastUpdatedAt:1704718226,formattedLastUpdatedAt:"Jan 8, 2024",frontMatter:{sidebar_label:"Limitations",title:"Audit Scanner - Limitations",description:"The limitation of the audit scanner",keywords:["kubewarden","kubernetes","audit scanner"]},sidebar:"docs",previous:{title:"What is the Audit Scanner?",permalink:"/explanations/audit-scanner/"},next:{title:"Policy Reports",permalink:"/explanations/audit-scanner/policy-reports"}},d={},c=[{value:"Supported event types",id:"supported-event-types",level:2},{value:"Policies relying on user and user group information",id:"policies-relying-on-user-and-user-group-information",level:2},{value:"Policies relying on external data",id:"policies-relying-on-external-data",level:2},{value:"Usage of <code>*</code> by policies",id:"usage-of--by-policies",level:2}];function l(e){const n={admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"supported-event-types",children:"Supported event types"}),"\n",(0,t.jsxs)(n.p,{children:["Policies can inspect ",(0,t.jsx)(n.code,{children:"CREATE"}),", ",(0,t.jsx)(n.code,{children:"UPDATE"}),", and ",(0,t.jsx)(n.code,{children:"DELETE"})," events."]}),"\n",(0,t.jsxs)(n.p,{children:["The audit scanner can not simulate ",(0,t.jsx)(n.code,{children:"UPDATE"})," events,\nas it doesn't know which part of the resource need to be changed."]}),"\n",(0,t.jsxs)(n.p,{children:["So, a policy concerned only with ",(0,t.jsx)(n.code,{children:"UPDATE"})," events is ignored by the audit scanner."]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["The audit-scanner v1.7.0 release supports only ",(0,t.jsx)(n.code,{children:"CREATE"})," events.\n",(0,t.jsx)(n.code,{children:"DELETE"})," events will be handled in the near future."]})}),"\n",(0,t.jsx)(n.h2,{id:"policies-relying-on-user-and-user-group-information",children:"Policies relying on user and user group information"}),"\n",(0,t.jsx)(n.p,{children:"Each Kubernetes admission request object has information about which user (or ServiceAccount) initiated the event,\nand to which group they belong."}),"\n",(0,t.jsx)(n.p,{children:"All the events simulated by the audit scanner are originated by the same hard coded user and group.\nBecause of that, policies that rely on these values to make their decisions will not produce meaningful results."}),"\n",(0,t.jsx)(n.p,{children:"For these cases, the policy should be configured to be skipped from the audit checks."}),"\n",(0,t.jsx)(n.h2,{id:"policies-relying-on-external-data",children:"Policies relying on external data"}),"\n",(0,t.jsx)(n.p,{children:"Policies can request and use external data when performing an evaluation.\nThese policies can be evaluated by the audit checks,\nbut their outcomes can change depending on the external data."}),"\n",(0,t.jsxs)(n.h2,{id:"usage-of--by-policies",children:["Usage of ",(0,t.jsx)(n.code,{children:"*"})," by policies"]}),"\n",(0,t.jsxs)(n.p,{children:["Both the ",(0,t.jsx)(n.code,{children:"AdmissionPolicy"})," and the ",(0,t.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," custom resources have the following fields:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'spec:\n  rules:\n    - apiGroups: [""]\n      apiVersions: ["v1"]\n      resources: ["pods"]\n      operations:\n        - CREATE\n        - UPDATE\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"apiGroups"}),", ",(0,t.jsx)(n.code,{children:"apiVersions"})," and ",(0,t.jsx)(n.code,{children:"resources"})," attributes can use the wildcard ",(0,t.jsx)(n.code,{children:"*"}),".\nThis wildcard symbol causes the policy to match all the values used in the field.\nThe audit scanner ignores policies that make use of the ",(0,t.jsx)(n.code,{children:"*"})," symbol."]})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>a});var t=i(67294);const s={},o=t.createContext(s);function a(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);