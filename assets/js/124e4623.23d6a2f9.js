"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[45724],{13938:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"tutorials/writing-policies/typescript","title":"Typescript","description":"Writing Kubewarden policies with Typescript","source":"@site/versioned_docs/version-1.23/tutorials/writing-policies/typescript.md","sourceDirName":"tutorials/writing-policies","slug":"/tutorials/writing-policies/typescript","permalink":"/tutorials/writing-policies/typescript","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.23/tutorials/writing-policies/typescript.md","tags":[],"version":"1.23","lastUpdatedAt":1743165692000,"sidebarPosition":60,"frontMatter":{"sidebar_label":"Typescript","sidebar_position":60,"title":"Typescript","description":"Writing Kubewarden policies with Typescript","keywords":["kubewarden","kubernetes","typescript"],"doc-type":["tutorial"],"doc-topic":["root-branch"],"doc-persona":["kubewarden-developer"]},"sidebar":"docs","previous":{"title":"Swift","permalink":"/tutorials/writing-policies/swift"},"next":{"title":"Other languages","permalink":"/tutorials/writing-policies/other-languages"}}');var r=i(74848),n=i(28453);const o={sidebar_label:"Typescript",sidebar_position:60,title:"Typescript",description:"Writing Kubewarden policies with Typescript",keywords:["kubewarden","kubernetes","typescript"],"doc-type":["tutorial"],"doc-topic":["root-branch"],"doc-persona":["kubewarden-developer"]},c=void 0,a={},l=[{value:"Current state",id:"current-state",level:2},{value:"Example",id:"example",level:2}];function p(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,n.R)(),...e.components},{Head:i}=t;return i||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i,{children:(0,r.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/typescript"})}),"\n",(0,r.jsxs)(t.p,{children:["As stated on the ",(0,r.jsx)(t.a,{href:"https://www.typescriptlang.org/",children:"official website"}),":"]}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:"TypeScript extends JavaScript by adding types."}),"\n",(0,r.jsx)(t.p,{children:"By understanding JavaScript, TypeScript saves you time catching errors and\nproviding fixes before you run code."}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["TypeScript can't target WebAssembly, however\n",(0,r.jsx)(t.a,{href:"https://www.assemblyscript.org/",children:"AssemblyScript"}),"\nis a ",(0,r.jsx)(t.strong,{children:"subset"})," of TypeScript designed for WebAssembly."]}),"\n",(0,r.jsx)(t.h2,{id:"current-state",children:"Current state"}),"\n",(0,r.jsx)(t.p,{children:"Currently, there's no Kubewarden SDK for AssemblyScript.\nResources permitting, we hope to have on in the near future."}),"\n",(0,r.jsx)(t.p,{children:"However, there are limitations affecting AssemblyScript:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["There's no built-in way to serialize and deserialize Classes to\nand from JSON.\nSee ",(0,r.jsx)(t.a,{href:"https://github.com/AssemblyScript/assemblyscript/issues/292",children:"this issue"})]}),"\n",(0,r.jsxs)(t.li,{children:["It ",(0,r.jsx)(t.em,{children:"seems"})," there's no JSON path library for AssemblyScript"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://github.com/kubewarden/pod-privileged-policy/tree/assemblyscript-implementation",children:"This GitHub repository branch "}),"\nhas a Kubewarden Policy written in AssemblyScript."]}),"\n",(0,r.jsx)(t.p,{children:"This repository has a series of GitHub Actions that automate the following tasks:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Run unit tests and code linting on pull requests and after code is merged into the main branch"}),"\n",(0,r.jsxs)(t.li,{children:["Build the policy in ",(0,r.jsx)(t.code,{children:"release"})," mode and push it to an OCI registry as an artifact"]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>c});var s=i(96540);const r={},n=s.createContext(r);function o(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(n.Provider,{value:t},e.children)}}}]);