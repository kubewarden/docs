"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[15922],{97961:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>a,metadata:()=>t,toc:()=>p});var i=s(85893),o=s(11151);const a={sidebar_label:"Configuring policies",title:"Configuring policies",description:"Dependency matrix of Kubewarden.",keywords:["policies","ClusterAdmissionPolicies","AdmissionPolicies","configuration","namespaces"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["explanation","reference"],"doc-topic":["operator-manual","policies"]},r=void 0,t={id:"operator-manual/policies",title:"Configuring policies",description:"Dependency matrix of Kubewarden.",source:"@site/versioned_docs/version-1.10/operator-manual/policies.md",sourceDirName:"operator-manual",slug:"/operator-manual/policies",permalink:"/operator-manual/policies",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.10/operator-manual/policies.md",tags:[],version:"1.10",lastUpdatedAt:1710161878,formattedLastUpdatedAt:"Mar 11, 2024",frontMatter:{sidebar_label:"Configuring policies",title:"Configuring policies",description:"Dependency matrix of Kubewarden.",keywords:["policies","ClusterAdmissionPolicies","AdmissionPolicies","configuration","namespaces"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["explanation","reference"],"doc-topic":["operator-manual","policies"]},sidebar:"docs",previous:{title:"Using private registries",permalink:"/operator-manual/policy-servers/private-registry"},next:{title:"Open Telemetry quickstart",permalink:"/operator-manual/telemetry/opentelemetry/quickstart"}},c={},p=[{value:"Skipping namespaces for a specific policy",id:"skipping-namespaces-for-a-specific-policy",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"skipping-namespaces-for-a-specific-policy",children:"Skipping namespaces for a specific policy"}),"\n",(0,i.jsxs)(n.p,{children:["By default, policies apply to all Namespaces that the ",(0,i.jsx)(n.code,{children:"PolicyServer"})," is configured for.\nIf you want a policy to target only specific namespaces, you can deploy several ",(0,i.jsx)(n.code,{children:"AdmissionPolicies"})," in each Namespace."]}),"\n",(0,i.jsxs)(n.p,{children:["Another option is to configure ",(0,i.jsx)(n.code,{children:"ClusterAdmissionPolicies"})," by setting their\n",(0,i.jsx)(n.code,{children:"spec.namespaceSelector"})," (see ",(0,i.jsx)(n.a,{href:"./CRDs#clusteradmissionpolicy",children:"CRD docs"}),"). The\n",(0,i.jsx)(n.code,{children:"spec.namespaceSelector"})," decides whether to run the policy on an object, based\non whether the namespace for that object matches the selector."]}),"\n",(0,i.jsxs)(n.p,{children:["For example, here is a policy that only targets the ",(0,i.jsx)(n.code,{children:"kube-system"})," and ",(0,i.jsx)(n.code,{children:"my-namespace"})," Namespaces:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psa-enforcer-privileged-namespaces\nspec:\n  module: registry://ghcr.io/kubewarden/policies/psa-label-enforcer:v0.1.1\n  rules:\n    - apiGroups: [""]\n      apiVersions: ["v1"]\n      resources: ["namespaces"]\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: true\n  namespaceSelector:\n    matchExpressions:\n      - key: "kubernetes.io/metadata.name"\n        operator: In\n        values: [kube-system, my-namespace]\n  settings:\n    modes:\n      enforce: "privileged"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Here is a policy that targets all the Namespaces besides the ",(0,i.jsx)(n.code,{children:"kube-system"})," and ",(0,i.jsx)(n.code,{children:"my-namespace"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psa-enforcer-default-mode\nspec:\n  module: registry://ghcr.io/kubewarden/policies/psa-label-enforcer:v0.1.1\n  rules:\n    - apiGroups: [""]\n      apiVersions: ["v1"]\n      resources: ["namespaces"]\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: true\n  namespaceSelector:\n    matchExpressions:\n      - key: "kubernetes.io/metadata.name"\n        operator: NotIn\n        values: [kube-system, my-namespace]\n  settings:\n    modes:\n      enforce: "restricted"\n'})})]})}function d(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>t,a:()=>r});var i=s(67294);const o={},a=i.createContext(o);function r(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);