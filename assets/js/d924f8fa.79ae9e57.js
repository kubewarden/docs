"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[41361],{15296:(i,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>d,default:()=>c,frontMatter:()=>o,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"tutorials/writing-policies/rust/build-and-distribute","title":"Building and distributing policies","description":"Building and distributing Kubewarden policies developed with Rust.","source":"@site/docs/tutorials/writing-policies/rust/07-build-and-distribute.md","sourceDirName":"tutorials/writing-policies/rust","slug":"/tutorials/writing-policies/rust/build-and-distribute","permalink":"/next/tutorials/writing-policies/rust/build-and-distribute","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/tutorials/writing-policies/rust/07-build-and-distribute.md","tags":[],"version":"current","lastUpdatedAt":1734604732000,"sidebarPosition":7,"frontMatter":{"sidebar_label":"Building and distributing policies","title":"Building and distributing policies","description":"Building and distributing Kubewarden policies developed with Rust.","keywords":["kubewarden","kubernetes","writing policies","rust","build and distribute"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","build-and-distribute"],"doc-persona":["kubewarden-policy-developer","kubewarden-operator"]},"sidebar":"docs","previous":{"title":"Logging","permalink":"/next/tutorials/writing-policies/rust/logging"},"next":{"title":"Raw policies","permalink":"/next/tutorials/writing-policies/rust/raw-policies"}}');var s=t(74848),r=t(28453);const o={sidebar_label:"Building and distributing policies",title:"Building and distributing policies",description:"Building and distributing Kubewarden policies developed with Rust.",keywords:["kubewarden","kubernetes","writing policies","rust","build and distribute"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","build-and-distribute"],"doc-persona":["kubewarden-policy-developer","kubewarden-operator"]},d=void 0,l={},a=[{value:"Building the policy",id:"building-the-policy",level:2},{value:"Distributing the policy",id:"distributing-the-policy",level:2},{value:"More examples",id:"more-examples",level:2}];function u(i){const e={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...i.components},{Head:t}=e;return t||function(i,e){throw new Error("Expected "+(e?"component":"object")+" `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rust/build-and-distribute"})}),"\n",(0,s.jsx)(e.h2,{id:"building-the-policy",children:"Building the policy"}),"\n",(0,s.jsx)(e.p,{children:"Thus far, you've built the policy with a compilation target of the same operating system and architecture of your development machine."}),"\n",(0,s.jsxs)(e.p,{children:["It's now time to build the policy as a WebAssembly binary, a ",(0,s.jsx)(e.code,{children:".wasm"})," file."]}),"\n",(0,s.jsx)(e.p,{children:"You use the command:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-console",children:"make policy.wasm\n"})}),"\n",(0,s.jsx)(e.p,{children:"This command builds the code in release mode, with a WebAssembly compilation target."}),"\n",(0,s.jsxs)(e.p,{children:["The build produces a ",(0,s.jsx)(e.code,{children:"policy.wasm"})," file:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-console",children:"$ file policy.wasm\npolicy.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)\n"})}),"\n",(0,s.jsx)(e.h2,{id:"distributing-the-policy",children:"Distributing the policy"}),"\n",(0,s.jsxs)(e.p,{children:["Kubewarden documents policy distribution in the\n",(0,s.jsx)(e.a,{href:"/next/explanations/distributing-policies",children:"distributing policies"}),"\nsection."]}),"\n",(0,s.jsx)(e.h2,{id:"more-examples",children:"More examples"}),"\n",(0,s.jsxs)(e.p,{children:["You can find more Rust Kubewarden policies in Kubewarden's GitHub space.\n",(0,s.jsx)(e.a,{href:"https://github.com/search?l=Rust&q=topic%3Apolicy-as-code+org%3Akubewarden&type=Repositories",children:"This query"}),"\ncan help you find them."]}),"\n",(0,s.jsx)(e.p,{children:"The Kubewarden policy repositories, shown by that query, have GitHub Actions that automate the following tasks:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Run unit tests and code linting on pull requests and after code merges into the main branch."}),"\n",(0,s.jsxs)(e.li,{children:["Build the policy in ",(0,s.jsx)(e.code,{children:"release"})," mode and push it to an OCI registry as an artifact."]}),"\n"]})]})}function c(i={}){const{wrapper:e}={...(0,r.R)(),...i.components};return e?(0,s.jsx)(e,{...i,children:(0,s.jsx)(u,{...i})}):u(i)}},28453:(i,e,t)=>{t.d(e,{R:()=>o,x:()=>d});var n=t(96540);const s={},r=n.createContext(s);function o(i){const e=n.useContext(r);return n.useMemo((function(){return"function"==typeof i?i(e):{...e,...i}}),[e,i])}function d(i){let e;return e=i.disableParentContext?"function"==typeof i.components?i.components(s):i.components||s:o(i.components),n.createElement(r.Provider,{value:e},i.children)}}}]);