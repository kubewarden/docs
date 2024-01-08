"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[5607],{24542:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var n=i(85893),s=i(11151);const o={sidebar_label:"Swift",title:""},r="Swift",a={id:"writing-policies/swift",title:"",description:"As stated on the official website:",source:"@site/versioned_docs/version-1.7/writing-policies/swift.md",sourceDirName:"writing-policies",slug:"/writing-policies/swift",permalink:"/1.7/writing-policies/swift",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/writing-policies/swift.md",tags:[],version:"1.7",lastUpdatedAt:1704718226,formattedLastUpdatedAt:"Jan 8, 2024",frontMatter:{sidebar_label:"Swift",title:""},sidebar:"docs",previous:{title:"C#",permalink:"/1.7/writing-policies/dotnet"},next:{title:"TypeScript",permalink:"/1.7/writing-policies/typescript"}},l={},c=[{value:"Current State",id:"current-state",level:2},{value:"More examples",id:"more-examples",level:2}];function d(e){const t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"swift",children:"Swift"}),"\n",(0,n.jsxs)(t.p,{children:["As stated on the ",(0,n.jsx)(t.a,{href:"https://swift.org/",children:"official website"}),":"]}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsx)(t.p,{children:"Swift is a general-purpose programming language built using a modern approach\nto safety, performance, and software design patterns."}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["The swift compiler doesn't yet have WebAssembly support, however the\n",(0,n.jsx)(t.a,{href:"https://swiftwasm.org/",children:"Swiftwasm"})," provides a patched compiler with this\ncapability."]}),"\n",(0,n.jsx)(t.p,{children:"The Swiftwasm team is also working to upstream all these changes into the\nSwift project. In the meantime the toolchain provided by the Swiftwasm project\ncan be used to build Kubewarden policies."}),"\n",(0,n.jsx)(t.admonition,{type:"note",children:(0,n.jsx)(t.p,{children:"You don't need an Apple system to write or run Swift code. Everything\ncan be done also on a Linux machine or on Windows (by using Docker for Windows)."})}),"\n",(0,n.jsx)(t.h2,{id:"current-state",children:"Current State"}),"\n",(0,n.jsx)(t.p,{children:"Policy authors can leverage the following resources:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"https://github.com/kubewarden/policy-sdk-swift",children:"Kubewarden Swift SDK"}),": this\nprovides a set of ",(0,n.jsx)(t.code,{children:"struct"})," and functions that simplify the process of\nwriting policies."]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.a,{href:"https://github.com/kubewarden/swift-policy-template",children:"Kubewarden Swift template project"}),":\nuse this template to quickly scaffold a Swift-based policy. The template comes\nwith a working policy and a set of GitHub Actions to automate its lifecycle."]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"No severe limitations have been found inside of Swift, only\nsome minor glitches:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["It's critical to perform some post-build optimizations before using the\npolicy ",(0,n.jsx)(t.em,{children:'"in production"'}),":","\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:["Strip the Wasm module via ",(0,n.jsx)(t.code,{children:"wasm-strip"})," to reduce its size"]}),"\n",(0,n.jsxs)(t.li,{children:["Optimize the Wasm module via ",(0,n.jsx)(t.code,{children:"wasm-opt"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"The GitHub Action provided by the template repository already takes care of that."}),"\n",(0,n.jsx)(t.h2,{id:"more-examples",children:"More examples"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://github.com/kubewarden/pod-runtime-class-policy",children:"This GitHub repository"}),"\ncontains a Kubewarden Policy written in Swift."]})]})}function p(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,t,i)=>{i.d(t,{Z:()=>a,a:()=>r});var n=i(67294);const s={},o=n.createContext(s);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);