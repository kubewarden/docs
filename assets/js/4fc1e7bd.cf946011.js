"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[72327],{31763:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"explanations/audit-scanner/limitations","title":"Audit Scanner - Limitations","description":"The limitation of the audit scanner","source":"@site/versioned_docs/version-1.16/explanations/audit-scanner/limitations.md","sourceDirName":"explanations/audit-scanner","slug":"/explanations/audit-scanner/limitations","permalink":"/1.16/explanations/audit-scanner/limitations","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.16/explanations/audit-scanner/limitations.md","tags":[],"version":"1.16","lastUpdatedAt":1737550787000,"frontMatter":{"sidebar_label":"Limitations","title":"Audit Scanner - Limitations","description":"The limitation of the audit scanner","keywords":["kubewarden","kubernetes","audit scanner"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-policy-developer","kubewarden-integrator"],"doc-type":["explanation"],"doc-topic":["explanations","audit-scanner","limitations"]},"sidebar":"docs","previous":{"title":"Audit Scanner","permalink":"/1.16/explanations/audit-scanner/"},"next":{"title":"Policy Reports","permalink":"/1.16/explanations/audit-scanner/policy-reports"}}');var s=i(74848),o=i(28453);const a={sidebar_label:"Limitations",title:"Audit Scanner - Limitations",description:"The limitation of the audit scanner",keywords:["kubewarden","kubernetes","audit scanner"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-policy-developer","kubewarden-integrator"],"doc-type":["explanation"],"doc-topic":["explanations","audit-scanner","limitations"]},r=void 0,d={},c=[{value:"Supported event types",id:"supported-event-types",level:2},{value:"Policies relying on user and user group information",id:"policies-relying-on-user-and-user-group-information",level:2},{value:"Policies relying on external data",id:"policies-relying-on-external-data",level:2},{value:"Usage of <code>*</code> by policies",id:"usage-of--by-policies",level:2}];function l(e){const n={admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/explanations/audit-scanner/limitations"})}),"\n",(0,s.jsx)(n.h2,{id:"supported-event-types",children:"Supported event types"}),"\n",(0,s.jsxs)(n.p,{children:["Policies can inspect ",(0,s.jsx)(n.code,{children:"CREATE"}),", ",(0,s.jsx)(n.code,{children:"UPDATE"}),", and ",(0,s.jsx)(n.code,{children:"DELETE"})," events."]}),"\n",(0,s.jsxs)(n.p,{children:["The audit scanner can not simulate ",(0,s.jsx)(n.code,{children:"UPDATE"})," events,\nas it doesn't know which part of the resource need to be changed."]}),"\n",(0,s.jsxs)(n.p,{children:["So, a policy concerned only with ",(0,s.jsx)(n.code,{children:"UPDATE"})," events is ignored by the audit scanner."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["The audit-scanner v1.7.0 release supports only ",(0,s.jsx)(n.code,{children:"CREATE"})," events.\n",(0,s.jsx)(n.code,{children:"DELETE"})," events will be handled in the near future."]})}),"\n",(0,s.jsx)(n.h2,{id:"policies-relying-on-user-and-user-group-information",children:"Policies relying on user and user group information"}),"\n",(0,s.jsx)(n.p,{children:"Each Kubernetes admission request object has information about which user (or ServiceAccount) initiated the event,\nand to which group they belong."}),"\n",(0,s.jsx)(n.p,{children:"All the events simulated by the audit scanner are originated by the same hard coded user and group.\nBecause of that, policies that rely on these values to make their decisions will not produce meaningful results."}),"\n",(0,s.jsx)(n.p,{children:"For these cases, the policy should be configured to be skipped from the audit checks."}),"\n",(0,s.jsx)(n.h2,{id:"policies-relying-on-external-data",children:"Policies relying on external data"}),"\n",(0,s.jsx)(n.p,{children:"Policies can request and use external data when performing an evaluation.\nThese policies can be evaluated by the audit checks,\nbut their outcomes can change depending on the external data."}),"\n",(0,s.jsxs)(n.h2,{id:"usage-of--by-policies",children:["Usage of ",(0,s.jsx)(n.code,{children:"*"})," by policies"]}),"\n",(0,s.jsxs)(n.p,{children:["Both the ",(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," and the ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," custom resources have the following fields:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'spec:\n  rules:\n    - apiGroups: [""]\n      apiVersions: ["v1"]\n      resources: ["pods"]\n      operations:\n        - CREATE\n        - UPDATE\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"apiGroups"}),", ",(0,s.jsx)(n.code,{children:"apiVersions"})," and ",(0,s.jsx)(n.code,{children:"resources"})," attributes can use the wildcard ",(0,s.jsx)(n.code,{children:"*"}),".\nThis wildcard symbol causes the policy to match all the values used in the field.\nThe audit scanner ignores policies that make use of the ",(0,s.jsx)(n.code,{children:"*"})," symbol."]})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var t=i(96540);const s={},o=t.createContext(s);function a(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);