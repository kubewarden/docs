"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[69650],{10185:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>d,metadata:()=>n,toc:()=>u});const n=JSON.parse('{"id":"writing-policies/rust/build-and-distribute","title":"Building and distributing policies","description":"Building and distributing Kubewarden policies developed with Rust.","source":"@site/versioned_docs/version-1.10/writing-policies/rust/07-build-and-distribute.md","sourceDirName":"writing-policies/rust","slug":"/writing-policies/rust/build-and-distribute","permalink":"/1.10/writing-policies/rust/build-and-distribute","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.10/writing-policies/rust/07-build-and-distribute.md","tags":[],"version":"1.10","lastUpdatedAt":1742912250000,"sidebarPosition":7,"frontMatter":{"sidebar_label":"Building and distributing policies","title":"Building and distributing policies","description":"Building and distributing Kubewarden policies developed with Rust.","keywords":["kubewarden","kubernetes","writing policies","rust","build and distribute"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","build-and-distribute"],"doc-persona":["kubewarden-developer","kubewarden-developer-rust","kubewarden-operator"]},"sidebar":"docs","previous":{"title":"Logging","permalink":"/1.10/writing-policies/rust/logging"},"next":{"title":"Raw policies","permalink":"/1.10/writing-policies/rust/raw-policies"}}');var s=t(74848),r=t(28453);const d={sidebar_label:"Building and distributing policies",title:"Building and distributing policies",description:"Building and distributing Kubewarden policies developed with Rust.",keywords:["kubewarden","kubernetes","writing policies","rust","build and distribute"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","build-and-distribute"],"doc-persona":["kubewarden-developer","kubewarden-developer-rust","kubewarden-operator"]},o=void 0,l={},u=[{value:"Building the policy",id:"building-the-policy",level:2},{value:"Distributing the policy",id:"distributing-the-policy",level:2},{value:"More examples",id:"more-examples",level:2}];function a(e){const i={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h2,{id:"building-the-policy",children:"Building the policy"}),"\n",(0,s.jsx)(i.p,{children:"Thus far, you've built the policy with a compilation target of the same operating system and architecture of your development machine."}),"\n",(0,s.jsxs)(i.p,{children:["It's now time to build the policy as a WebAssembly binary, a ",(0,s.jsx)(i.code,{children:".wasm"})," file."]}),"\n",(0,s.jsx)(i.p,{children:"You use the command:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-console",children:"make policy.wasm\n"})}),"\n",(0,s.jsx)(i.p,{children:"This command builds the code in release mode, with a WebAssembly compilation target."}),"\n",(0,s.jsxs)(i.p,{children:["The build produces a ",(0,s.jsx)(i.code,{children:"policy.wasm"})," file:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-console",children:"$ file policy.wasm\npolicy.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)\n"})}),"\n",(0,s.jsx)(i.h2,{id:"distributing-the-policy",children:"Distributing the policy"}),"\n",(0,s.jsxs)(i.p,{children:["Kubewarden documents policy distribution in the\n",(0,s.jsx)(i.a,{href:"/1.10/distributing-policies",children:"distributing policies"}),"\nsection."]}),"\n",(0,s.jsx)(i.h2,{id:"more-examples",children:"More examples"}),"\n",(0,s.jsxs)(i.p,{children:["You can find more Rust Kubewarden policies in Kubewarden's GitHub space.\n",(0,s.jsx)(i.a,{href:"https://github.com/search?l=Rust&q=topic%3Apolicy-as-code+org%3Akubewarden&type=Repositories",children:"This query"}),"\ncan help you find them."]}),"\n",(0,s.jsx)(i.p,{children:"The Kubewarden policy repositories, shown by that query, have GitHub Actions that automate the following tasks:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Run unit tests and code linting on pull requests and after code merges into the main branch."}),"\n",(0,s.jsxs)(i.li,{children:["Build the policy in ",(0,s.jsx)(i.code,{children:"release"})," mode and push it to an OCI registry as an artifact."]}),"\n"]})]})}function c(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>d,x:()=>o});var n=t(96540);const s={},r=n.createContext(s);function d(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);