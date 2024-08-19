"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[61575],{70633:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var t=n(85893),s=n(11151);const r={sidebar_label:"Building & Distributing Policies",title:""},o=void 0,l={id:"writing-policies/rust/build-and-distribute",title:"",description:"Building the policy",source:"@site/versioned_docs/version-1.9/writing-policies/rust/07-build-and-distribute.md",sourceDirName:"writing-policies/rust",slug:"/writing-policies/rust/build-and-distribute",permalink:"/1.9/writing-policies/rust/build-and-distribute",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.9/writing-policies/rust/07-build-and-distribute.md",tags:[],version:"1.9",lastUpdatedAt:1724077046e3,sidebarPosition:7,frontMatter:{sidebar_label:"Building & Distributing Policies",title:""},sidebar:"docs",previous:{title:"Logging",permalink:"/1.9/writing-policies/rust/logging"},next:{title:"Raw policies",permalink:"/1.9/writing-policies/rust/raw-policies"}},a={},d=[{value:"Building the policy",id:"building-the-policy",level:2},{value:"Distributing the policy",id:"distributing-the-policy",level:2},{value:"More examples",id:"more-examples",level:2}];function c(e){const i={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h2,{id:"building-the-policy",children:"Building the policy"}),"\n",(0,t.jsx)(i.p,{children:"So far we have built the policy using as a compilation target the same operating\nsystem and architecture of our development machine."}),"\n",(0,t.jsxs)(i.p,{children:["It's now time to build the policy as a WebAssembly binary, also known as ",(0,t.jsx)(i.code,{children:".wasm"}),"\nfile."]}),"\n",(0,t.jsx)(i.p,{children:"This can be done with a simple command:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-shell",children:"make policy.wasm\n"})}),"\n",(0,t.jsx)(i.p,{children:"This command will build the code in release mode, with WebAssembly as\ncompilation target."}),"\n",(0,t.jsx)(i.p,{children:"The build will produce the following file:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-shell",children:"$ file target/wasm32-wasi/release/demo.wasm\ntarget/wasm32-wasi/release/demo.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)\n"})}),"\n",(0,t.jsx)(i.h2,{id:"distributing-the-policy",children:"Distributing the policy"}),"\n",(0,t.jsxs)(i.p,{children:["This topic is covered inside of the ",(0,t.jsx)(i.a,{href:"../../distributing-policies/",children:"distributing\npolicies"})," section of Kubewarden's\ndocumentation."]}),"\n",(0,t.jsx)(i.h2,{id:"more-examples",children:"More examples"}),"\n",(0,t.jsxs)(i.p,{children:["You can find more Kubewarden policies written in Rust inside of Kubewarden's\nGitHub space. ",(0,t.jsx)(i.a,{href:"https://github.com/search?l=Rust&q=topic%3Apolicy-as-code+org%3Akubewarden&type=Repositories",children:"This query"}),"\ncan help you find them."]}),"\n",(0,t.jsxs)(i.p,{children:[(0,t.jsx)(i.strong,{children:"Worth of note:"})," these repositories have a series of GitHub Actions that automate\nthe following tasks:"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Run unit tests and code linting on pull requests and after code is merged\ninto the main branch"}),"\n",(0,t.jsxs)(i.li,{children:["Build the policy in ",(0,t.jsx)(i.code,{children:"release"})," mode and push it to a OCI registry as an\nartifact"]}),"\n"]})]})}function u(e={}){const{wrapper:i}={...(0,s.a)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},11151:(e,i,n)=>{n.d(i,{Z:()=>l,a:()=>o});var t=n(67294);const s={},r=t.createContext(s);function o(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(r.Provider,{value:i},e.children)}}}]);