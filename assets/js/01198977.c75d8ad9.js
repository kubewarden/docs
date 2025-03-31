"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[25819],{31225:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"tutorials/writing-policies/index","title":"Writing Kubewarden policies","description":"An introduction to writing Kubewarden policies.","source":"@site/versioned_docs/version-1.13/tutorials/writing-policies/index.md","sourceDirName":"tutorials/writing-policies","slug":"/tutorials/writing-policies/","permalink":"/1.13/tutorials/writing-policies/","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.13/tutorials/writing-policies/index.md","tags":[],"version":"1.13","lastUpdatedAt":1743431197000,"frontMatter":{"sidebar_label":"Writing Policies","title":"Writing Kubewarden policies","description":"An introduction to writing Kubewarden policies.","keywords":["kubewarden","kubernetes","writing policies"],"doc-type":["tutorial"],"doc-topic":["writing-policies"],"doc-persona":["kubewarden-policy-developer"]},"sidebar":"docs","previous":{"title":"Quick start","permalink":"/1.13/quick-start"},"next":{"title":"Intro","permalink":"/1.13/tutorials/writing-policies/CEL/intro-cel"}}');var s=t(74848),r=t(28453);const o={sidebar_label:"Writing Policies",title:"Writing Kubewarden policies",description:"An introduction to writing Kubewarden policies.",keywords:["kubewarden","kubernetes","writing policies"],"doc-type":["tutorial"],"doc-topic":["writing-policies"],"doc-persona":["kubewarden-policy-developer"]},a=void 0,l={},c=[{value:"Programming language requirements",id:"programming-language-requirements",level:2}];function d(e){const i={a:"a",h2:"h2",li:"li",p:"p",ul:"ul",...(0,r.R)(),...e.components},{Head:t}=i;return t||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/index"})}),"\n",(0,s.jsx)(i.p,{children:"This section introduces Kubewarden policies using traditional computing analogies."}),"\n",(0,s.jsx)(i.p,{children:"A Kubewarden policy is like a program that does one job.\nIt receives input data, performs computation with that data and returns a result."}),"\n",(0,s.jsx)(i.p,{children:"The input data is Kubernetes admission requests.\nThe result of the computation is a validation response,\nwhich tells Kubernetes whether to accept, reject, or mutate the input data, the admission request."}),"\n",(0,s.jsxs)(i.p,{children:["The ",(0,s.jsx)(i.a,{href:"https://github.com/kubewarden/policy-server",children:"policy-server"}),"\ncomponent of Kubewarden performs these operations."]}),"\n",(0,s.jsx)(i.p,{children:"The policy server doesn't include any data processing capability.\nYou add processing capabilities at runtime with add-ons.\nThese add-ons are the Kubewarden policies."}),"\n",(0,s.jsxs)(i.p,{children:["So, a Kubewarden policy is like a\n",(0,s.jsx)(i.a,{href:"https://en.wikipedia.org/wiki/Plug-in_%28computing%29",children:"traditional plug-in"}),'\nof the "policy server" program.']}),"\n",(0,s.jsx)(i.p,{children:"To recap:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Kubewarden policies are plug-ins that expose a set of well-defined\nfunctionalities (validate a Kubernetes request object, validate policy settings provided by the user, and other functions) using a well-defined API"}),"\n",(0,s.jsx)(i.li,{children:'Policy server is the "main" program that loads the plug-ins\n(aka policies) and uses their exposed functionalities to accept, reject, or mutate Kubernetes requests'}),"\n"]}),"\n",(0,s.jsx)(i.p,{children:"Writing Kubewarden policies consists of writing the validation business logic and then exposing it through a well-defined API."}),"\n",(0,s.jsx)(i.h2,{id:"programming-language-requirements",children:"Programming language requirements"}),"\n",(0,s.jsxs)(i.p,{children:["You supply Kubewarden policies as\n",(0,s.jsx)(i.a,{href:"https://webassembly.org/",children:"WebAssembly"})," binaries."]}),"\n",(0,s.jsxs)(i.p,{children:["Policy authors can write policies using any programming language that supports WebAssembly as a compilation target.\nThe list of supported language is constantly evolving, ",(0,s.jsx)(i.a,{href:"https://github.com/appcypher/awesome-wasm-langs",children:"this page"})," provides a nice overview of the WebAssembly landscape."]}),"\n",(0,s.jsxs)(i.p,{children:["Currently, WebAssembly doesn't have an official way to share complex data types between the host and a WebAssembly guest.\nTo overcome this limitation Kubewarden policies use the ",(0,s.jsx)(i.a,{href:"https://github.com/wapc",children:"waPC"})," project, which provides a bi-directional communication channel."]}),"\n",(0,s.jsx)(i.p,{children:"So, your programming language of choice must have an available waPC guest SDK.\nIf that's not the case, feel free to reach out.\nThe project team can help you overcome this limitation."})]})}function p(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>o,x:()=>a});var n=t(96540);const s={},r=n.createContext(s);function o(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);