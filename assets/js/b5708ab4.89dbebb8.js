"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[67406],{64410:(i,e,s)=>{s.r(e),s.d(e,{assets:()=>r,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"writing-policies/spec/host-capabilities/intro-host-capabilities","title":"Host capabilities specification","description":"Host capabilities specification.","source":"@site/versioned_docs/version-1.10/writing-policies/spec/host-capabilities/01-intro-host-capabilities.md","sourceDirName":"writing-policies/spec/host-capabilities","slug":"/writing-policies/spec/host-capabilities/intro-host-capabilities","permalink":"/1.10/writing-policies/spec/host-capabilities/intro-host-capabilities","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.10/writing-policies/spec/host-capabilities/01-intro-host-capabilities.md","tags":[],"version":"1.10","lastUpdatedAt":1737382350000,"sidebarPosition":1,"frontMatter":{"sidebar_label":"Host capabilities specification","title":"Host capabilities specification","description":"Host capabilities specification.","keywords":["kubewarden","kubernetes","policy specification","host capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","specification","host-capabilities","introduction"]},"sidebar":"docs","previous":{"title":"Context aware policies","permalink":"/1.10/writing-policies/spec/context-aware-policies"},"next":{"title":"Signature verifier policies","permalink":"/1.10/writing-policies/spec/host-capabilities/signature-verifier-policies"}}');var n=s(74848),o=s(28453);const a={sidebar_label:"Host capabilities specification",title:"Host capabilities specification",description:"Host capabilities specification.",keywords:["kubewarden","kubernetes","policy specification","host capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","specification","host-capabilities","introduction"]},c=void 0,r={},l=[];function p(i){const e={a:"a",li:"li",p:"p",ul:"ul",...(0,o.R)(),...i.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(e.p,{children:["While being evaluated, Kubewarden policies can access extra capabilities offered\nby the host environment.\nThis mechanism uses an approach similar to traditional ",(0,n.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/Remote_procedure_call",children:"RPC"}),"."]}),"\n",(0,n.jsx)(e.p,{children:"This is what happens when a request is issued by a Kubewarden policy:"}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsxs)(e.li,{children:["Kubewarden policy:","\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"Invokes the capability offered by the host environment"}),"\n",(0,n.jsx)(e.li,{children:"The invocation is a blocking operation, hence the policy code will wait until the\nhost provides an answer"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(e.li,{children:["Host environment:","\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"A capability invocation is received"}),"\n",(0,n.jsx)(e.li,{children:"The host performs the operation"}),"\n",(0,n.jsx)(e.li,{children:"The host provides an answer to the policy, which could be either a success or a\nfailure"}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(e.li,{children:["Kubewarden policy:","\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"The code receives the answer from the host and resumes execution"}),"\n",(0,n.jsx)(e.li,{children:"The host response is handled accordingly"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsxs)(e.p,{children:["The host capabilities feature is implemented using ",(0,n.jsx)(e.a,{href:"https://wapc.io/",children:"waPC"}),",\neach capability is expressed using these details:"]}),"\n",(0,n.jsxs)(e.ul,{children:["\n",(0,n.jsx)(e.li,{children:"waPC function name: name of the capability exposed by the host"}),"\n",(0,n.jsx)(e.li,{children:"input payload: the body of the request made by the policy. This is always\nencoded using JSON format"}),"\n",(0,n.jsx)(e.li,{children:"output payload: the body of the response coming from the host. This is\nalways encoded using JSON format"}),"\n"]}),"\n",(0,n.jsx)(e.p,{children:"When something goes wrong, the host will reply with an error . This is handled\nusing the idiomatic error type of the programming language used by the policy.\nThe error consists of a UTF-8 string that holds an explanation message."})]})}function d(i={}){const{wrapper:e}={...(0,o.R)(),...i.components};return e?(0,n.jsx)(e,{...i,children:(0,n.jsx)(p,{...i})}):p(i)}},28453:(i,e,s)=>{s.d(e,{R:()=>a,x:()=>c});var t=s(96540);const n={},o=t.createContext(n);function a(i){const e=t.useContext(o);return t.useMemo((function(){return"function"==typeof i?i(e):{...e,...i}}),[e,i])}function c(i){let e;return e=i.disableParentContext?"function"==typeof i.components?i.components(n):i.components||n:a(i.components),t.createElement(o.Provider,{value:e},i.children)}}}]);