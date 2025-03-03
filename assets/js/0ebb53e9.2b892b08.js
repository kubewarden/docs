"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[17980],{9451:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"writing-policies/index","title":"","description":"In this section we will explain what Kubewarden policies are by using some traditional computing","source":"@site/versioned_docs/version-1.8/writing-policies/index.md","sourceDirName":"writing-policies","slug":"/writing-policies/","permalink":"/1.8/writing-policies/","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/writing-policies/index.md","tags":[],"version":"1.8","lastUpdatedAt":1741013230000,"frontMatter":{"sidebar_label":"Writing Policies","title":""},"sidebar":"docs","previous":{"title":"Common tasks","permalink":"/1.8/tasks"},"next":{"title":"Introduction to Rust","permalink":"/1.8/writing-policies/rust/intro-rust"}}');var s=n(74848),a=n(28453);const r={sidebar_label:"Writing Policies",title:""},o="What is a Kubewarden policy",l={},c=[];function d(e){const i={a:"a",h1:"h1",header:"header",li:"li",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"what-is-a-kubewarden-policy",children:"What is a Kubewarden policy"})}),"\n",(0,s.jsx)(i.p,{children:"In this section we will explain what Kubewarden policies are by using some traditional computing\nanalogies."}),"\n",(0,s.jsx)(i.p,{children:"A Kubewarden policy can be seen as a regular program that does one job: it receives\ninput data, performs some computation against that and it finally returns a response."}),"\n",(0,s.jsx)(i.p,{children:"The input data are Kubernetes admission requests and the result of the computation\nis a validation response, something that tells to Kubernetes whether to accept, reject or\nmutate the original input data."}),"\n",(0,s.jsxs)(i.p,{children:["All these operations are performed by a component of Kubewarden that is called\n",(0,s.jsx)(i.a,{href:"https://github.com/kubewarden/policy-server",children:"policy-server"}),"."]}),"\n",(0,s.jsx)(i.p,{children:"The policy server doesn't bundle any data processing capability. All these capabilities are\nadded at runtime via add-ons: the Kubewarden policies."}),"\n",(0,s.jsxs)(i.p,{children:["As a consequence, a Kubewarden policy can be seen as a ",(0,s.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Plug-in_%28computing%29",children:"traditional plug-in"}),'\nof the "policy server" program.']}),"\n",(0,s.jsx)(i.p,{children:"To recap:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Kubewarden policies are plug-ins that expose a set of well-defined\nfunctionalities (validate a Kubernetes request object, validate policy settings\nprovided by the user,...) using a well-defined API"}),"\n",(0,s.jsx)(i.li,{children:'Policy server is the "main" program that loads the plug-ins\n(aka policies) and leverages their exposed functionalities to validate or mutate\nKubernetes requests'}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"Writing Kubewarden policies consists of writing the validation business logic\nand then exposing it through a well-defined API."}),"\n",(0,s.jsx)(i.h1,{id:"programming-language-requirements",children:"Programming language requirements"}),"\n",(0,s.jsxs)(i.p,{children:["Kubewarden policies are delivered as ",(0,s.jsx)(i.a,{href:"https://webassembly.org/",children:"WebAssembly"}),"\nbinaries."]}),"\n",(0,s.jsxs)(i.p,{children:["Policy authors can write policies using any programming language that supports\nWebAssembly as a compilation target. The list of supported language is constantly\nevolving, ",(0,s.jsx)(i.a,{href:"https://github.com/appcypher/awesome-wasm-langs",children:"this page"}),"\nprovides a nice overview of the WebAssembly landscape."]}),"\n",(0,s.jsxs)(i.p,{children:["Currently WebAssembly doesn't have an official way to share complex data types\nbetween the host and a WebAssembly guest. To overcome this limitation\nKubewarden policies leverage the ",(0,s.jsx)(i.a,{href:"https://github.com/wapc",children:"waPC"})," project, which\nprovides a bi-directional communication channel."]}),"\n",(0,s.jsx)(i.p,{children:"Because of that your programming language of choice must provide a waPC guest SDK.\nIf that's not the case, feel free to reach out. We can help you overcome this\nlimitation."})]})}function p(e={}){const{wrapper:i}={...(0,a.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>o});var t=n(96540);const s={},a=t.createContext(s);function r(e){const i=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(a.Provider,{value:i},e.children)}}}]);