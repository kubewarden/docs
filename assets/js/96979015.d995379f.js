"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[75431],{3253:(e,i,o)=>{o.r(i),o.d(i,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"tutorials/writing-policies/rego/open-policy-agent/intro","title":"Introduction to Open Policy Agent","description":"Introduction to Open Policy Agent and Kubewarden.","source":"@site/versioned_docs/version-1.19/tutorials/writing-policies/rego/open-policy-agent/01-intro.md","sourceDirName":"tutorials/writing-policies/rego/open-policy-agent","slug":"/tutorials/writing-policies/rego/open-policy-agent/intro","permalink":"/1.19/tutorials/writing-policies/rego/open-policy-agent/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.19/tutorials/writing-policies/rego/open-policy-agent/01-intro.md","tags":[],"version":"1.19","lastUpdatedAt":1737971763000,"sidebarPosition":1,"frontMatter":{"sidebar_label":"Introduction","title":"Introduction to Open Policy Agent","description":"Introduction to Open Policy Agent and Kubewarden.","keywords":["kubewarden","kubernetes","open policy agent","opa","rego"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","open-policy-agent","introduction"]},"sidebar":"docs","previous":{"title":"Builtin Support","permalink":"/1.19/tutorials/writing-policies/rego/builtin-support"},"next":{"title":"Creating a new policy","permalink":"/1.19/tutorials/writing-policies/rego/open-policy-agent/create-policy"}}');var n=o(74848),r=o(28453);const s={sidebar_label:"Introduction",title:"Introduction to Open Policy Agent",description:"Introduction to Open Policy Agent and Kubewarden.",keywords:["kubewarden","kubernetes","open policy agent","opa","rego"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","open-policy-agent","introduction"]},c=void 0,l={},a=[{value:"Introduction",id:"introduction",level:2},{value:"Compatibility with existing policies",id:"compatibility-with-existing-policies",level:2}];function p(e){const i={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,r.R)(),...e.components},{Head:o}=i;return o||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o,{children:(0,n.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rego/open-policy-agent/intro"})}),"\n",(0,n.jsxs)(i.admonition,{type:"note",children:[(0,n.jsx)(i.p,{children:"Open Policy Agent support has been introduced starting from these releases:"}),(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"kwctl: v0.2.0"}),"\n",(0,n.jsx)(i.li,{children:"policy-server: v0.2.0"}),"\n"]})]}),"\n",(0,n.jsx)(i.p,{children:"Open Policy Agent (OPA) is a general purpose policy framework that uses the\nRego language to write policies."}),"\n",(0,n.jsx)(i.h2,{id:"introduction",children:"Introduction"}),"\n",(0,n.jsx)(i.p,{children:"Rego policies work by receiving an input to evaluate,\nand produce an output as a response.\nIn this sense, OPA has no specific tooling for targeting writing policies for Kubernetes."}),"\n",(0,n.jsxs)(i.p,{children:["Specifically, policies in OPA receive a JSON input and produce a JSON output.\nThe OPA server is configured to receive admission review requests from Kubernetes.\nThe policies receive a Kubernetes ",(0,n.jsx)(i.code,{children:"AdmissionReview"})," object in JSON format.\nThey have to return a valid ",(0,n.jsx)(i.code,{children:"AdmissionReview"})," object as the evaluation results."]}),"\n",(0,n.jsx)(i.h2,{id:"compatibility-with-existing-policies",children:"Compatibility with existing policies"}),"\n",(0,n.jsxs)(i.p,{children:["All policies can be compiled to the ",(0,n.jsx)(i.code,{children:"wasm"})," target (WebAssembly) with the official ",(0,n.jsx)(i.code,{children:"opa"})," CLI tool."]}),"\n",(0,n.jsxs)(i.p,{children:["In terms of policy execution,\nyou can read more about the ",(0,n.jsx)(i.a,{href:"../builtin-support",children:"OPA built-in support"})," implemented in Kubewarden."]})]})}function d(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},28453:(e,i,o)=>{o.d(i,{R:()=>s,x:()=>c});var t=o(96540);const n={},r=t.createContext(n);function s(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),t.createElement(r.Provider,{value:i},e.children)}}}]);