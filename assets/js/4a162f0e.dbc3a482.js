"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[20698],{39903:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"writing-policies/rego/gatekeeper/distribute","title":"","description":"Policies have to be annotated for them to be pushed, and eventually","source":"@site/versioned_docs/version-1.8/writing-policies/rego/gatekeeper/04-distribute.md","sourceDirName":"writing-policies/rego/gatekeeper","slug":"/writing-policies/rego/gatekeeper/distribute","permalink":"/1.8/writing-policies/rego/gatekeeper/distribute","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/writing-policies/rego/gatekeeper/04-distribute.md","tags":[],"version":"1.8","lastUpdatedAt":1738156515000,"sidebarPosition":4,"frontMatter":{"sidebar_label":"Distribute","title":""},"sidebar":"docs","previous":{"title":"Build and Run","permalink":"/1.8/writing-policies/rego/gatekeeper/build-and-run"},"next":{"title":"C#","permalink":"/1.8/writing-policies/dotnet"}}');var o=t(74848),s=t(28453);const r={sidebar_label:"Distribute",title:""},a="Distribute",c={},l=[{value:"Annotating the policy",id:"annotating-the-policy",level:2},{value:"Pushing the policy",id:"pushing-the-policy",level:2},{value:"Deploying on Kubernetes",id:"deploying-on-kubernetes",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"distribute",children:"Distribute"})}),"\n",(0,o.jsxs)(n.p,{children:["Policies have to be annotated for them to be pushed, and eventually\nexecuted by the Kubewarden ",(0,o.jsx)(n.code,{children:"policy-server"})," in a Kubernetes cluster."]}),"\n",(0,o.jsx)(n.p,{children:"Annotating and distributing our Gatekeeper policy is very similar to\ndistributing an Open Policy Agent one. Let's go through it."}),"\n",(0,o.jsx)(n.h2,{id:"annotating-the-policy",children:"Annotating the policy"}),"\n",(0,o.jsxs)(n.p,{children:["We are going to write a ",(0,o.jsx)(n.code,{children:"metadata.yaml"})," file in our policy directory\nwith contents:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:'rules:\n- apiGroups: [""]\n  apiVersions: ["*"]\n  resources: ["*"]\n  operations: ["CREATE"]\nmutating: false\ncontextAware: false\nexecutionMode: gatekeeper\nannotations:\n  io.kubewarden.policy.title: no-default-namespace\n  io.kubewarden.policy.description: This policy will reject any resource created inside the default namespace\n  io.kubewarden.policy.author: The Kubewarden Authors\n  io.kubewarden.policy.url: https://github.com/kubewarden/some-policy\n  io.kubewarden.policy.source: https://github.com/kubewarden/some-policy\n  io.kubewarden.policy.license: Apache-2.0\n  io.kubewarden.policy.usage: |\n      This policy is just an example.\n\n      You can write interesting descriptions about the policy here.\n'})}),"\n",(0,o.jsxs)(n.p,{children:["As you can see, everything is the same as the Open Policy Agent\nversion metadata, except for the ",(0,o.jsx)(n.code,{children:"executionMode: gatekeeper"})," bit."]}),"\n",(0,o.jsx)(n.p,{children:"Let's go ahead and annotate the policy:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"$ kwctl annotate policy.wasm --metadata-path metadata.yaml --output-path annotated-policy.wasm\n"})}),"\n",(0,o.jsx)(n.h2,{id:"pushing-the-policy",children:"Pushing the policy"}),"\n",(0,o.jsx)(n.p,{children:"Let's push our policy to an OCI registry:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"$ kwctl push annotated-policy.wasm registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1\nPolicy successfully pushed\n"})}),"\n",(0,o.jsx)(n.h2,{id:"deploying-on-kubernetes",children:"Deploying on Kubernetes"}),"\n",(0,o.jsxs)(n.p,{children:["We have to pull our policy to our ",(0,o.jsx)(n.code,{children:"kwctl"})," local store first:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"$ kwctl pull registry://registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1\npulling policy...\n"})}),"\n",(0,o.jsxs)(n.p,{children:["We can now create a scaffold ",(0,o.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resource:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:'$ kwctl scaffold manifest registry://registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1 --type ClusterAdmissionPolicy\n---\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: generated-policy\nspec:\n  module: "registry://registry.my-company.com/kubewarden/no-default-namespace-gatekeeper:v0.0.1"\n  settings: {}\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - "*"\n      resources:\n        - "*"\n      operations:\n        - CREATE\n  mutating: false\n'})}),"\n",(0,o.jsxs)(n.p,{children:["We could now use this ",(0,o.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resource to deploy our\npolicy to a Kubernetes cluster."]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(96540);const o={},s=i.createContext(o);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);