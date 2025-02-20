"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[69060],{41182:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"writing-policies/spec/host-capabilities/intro-host-capabilities","title":"","description":"While being evaluated, Kubewarden policies can access extra capabilities offered","source":"@site/versioned_docs/version-1.8/writing-policies/spec/host-capabilities/01-intro-host-capabilities.md","sourceDirName":"writing-policies/spec/host-capabilities","slug":"/writing-policies/spec/host-capabilities/intro-host-capabilities","permalink":"/1.8/writing-policies/spec/host-capabilities/intro-host-capabilities","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/writing-policies/spec/host-capabilities/01-intro-host-capabilities.md","tags":[],"version":"1.8","lastUpdatedAt":1740037204000,"sidebarPosition":1,"frontMatter":{"sidebar_label":"Host Capabilities Specification","title":""},"sidebar":"docs","previous":{"title":"Context Aware Policies","permalink":"/1.8/writing-policies/spec/context-aware-policies"},"next":{"title":"Signature Verifier Policies","permalink":"/1.8/writing-policies/spec/host-capabilities/signature-verifier-policies"}}');var t=s(74848),a=s(28453);const o={sidebar_label:"Host Capabilities Specification",title:""},r="Host capabilities specification",c={},l=[];function h(e){const i={a:"a",h1:"h1",header:"header",li:"li",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.header,{children:(0,t.jsx)(i.h1,{id:"host-capabilities-specification",children:"Host capabilities specification"})}),"\n",(0,t.jsxs)(i.p,{children:["While being evaluated, Kubewarden policies can access extra capabilities offered\nby the host environment.\nThis mechanism uses an approach similar to traditional ",(0,t.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Remote_procedure_call",children:"RPC"}),"."]}),"\n",(0,t.jsx)(i.p,{children:"This is what happens when a request is issued by a Kubewarden policy:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Kubewarden policy:","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Invokes the capability offered by the host environment"}),"\n",(0,t.jsx)(i.li,{children:"The invocation is a blocking operation, hence the policy code will wait until the\nhost provides an answer"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["Host environment:","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"A capability invocation is received"}),"\n",(0,t.jsx)(i.li,{children:"The host performs the operation"}),"\n",(0,t.jsx)(i.li,{children:"The host provides an answer to the policy, which could be either a success or a\nfailure"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["Kubewarden policy:","\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"The code receives the answer from the host and resumes execution"}),"\n",(0,t.jsx)(i.li,{children:"The host response is handled accordingly"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(i.p,{children:["The host capabilities feature is implemented using ",(0,t.jsx)(i.a,{href:"https://wapc.io/",children:"waPC"}),",\neach capability is expressed using these details:"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"waPC function name: name of the capability exposed by the host"}),"\n",(0,t.jsx)(i.li,{children:"input payload: the body of the request made by the policy. This is always\nencoded using JSON format"}),"\n",(0,t.jsx)(i.li,{children:"output payload: the body of the response coming from the host. This is\nalways encoded using JSON format"}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"When something goes wrong, the host will reply with an error . This is handled\nusing the idiomatic error type of the programming language used by the policy.\nThe error consists of a UTF-8 string that holds an explanation message."})]})}function p(e={}){const{wrapper:i}={...(0,a.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},28453:(e,i,s)=>{s.d(i,{R:()=>o,x:()=>r});var n=s(96540);const t={},a=n.createContext(t);function o(e){const i=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),n.createElement(a.Provider,{value:i},e.children)}}}]);