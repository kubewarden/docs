"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[53169],{21135:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var i=n(85893),s=n(11151);const r={sidebar_label:"C#",title:""},o="C#",a={id:"writing-policies/dotnet",title:"",description:"Currently .NET Core has experimental support for the WebAssembly WASI",source:"@site/versioned_docs/version-1.9/writing-policies/dotnet.md",sourceDirName:"writing-policies",slug:"/writing-policies/dotnet",permalink:"/1.9/writing-policies/dotnet",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.9/writing-policies/dotnet.md",tags:[],version:"1.9",lastUpdatedAt:1723721936e3,frontMatter:{sidebar_label:"C#",title:""},sidebar:"docs",previous:{title:"Distribute",permalink:"/1.9/writing-policies/rego/gatekeeper/distribute"},next:{title:"Swift",permalink:"/1.9/writing-policies/swift"}},l={},d=[{value:"Current State",id:"current-state",level:2},{value:"Project template",id:"project-template",level:2}];function c(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"c",children:"C#"})}),"\n",(0,i.jsxs)(t.p,{children:["Currently .NET Core has experimental support for the WebAssembly WASI\nplatform.\nThis is delivered via the\n",(0,i.jsx)(t.a,{href:"https://github.com/SteveSandersonMS/dotnet-wasi-sdk",children:(0,i.jsx)(t.code,{children:"dotnet-wasi-sdk"})}),"\nproject."]}),"\n",(0,i.jsx)(t.admonition,{type:"note",children:(0,i.jsx)(t.p,{children:"You don't need a Windows machine to write or run .NET Core code. Everything\ncan be done also on a Linux or on an Apple machine."})}),"\n",(0,i.jsx)(t.h2,{id:"current-state",children:"Current State"}),"\n",(0,i.jsx)(t.p,{children:"Policy authors can leverage the following resources:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/kubewarden/policy-sdk-dotnet",children:"Kubewarden .NET Core SDK"}),":\nthis provides a set of objects and functions that simplify the process of\nwriting policies."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/kubewarden/policy-sdk-dotnet/tree/main/example",children:"Kubewarden policy example"}),":\nthis is an example of a working policy."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"No limitations has been found. The SDK allows both validating and mutating\npolicies to be written."}),"\n",(0,i.jsxs)(t.p,{children:["It's possible to use the\n",(0,i.jsx)(t.a,{href:"https://www.nuget.org/packages/KubernetesClient.Models",children:(0,i.jsx)(t.code,{children:"KubernetesClient.Models"})}),"\nlibrary to deal with the Kubernetes objects."]}),"\n",(0,i.jsx)(t.h2,{id:"project-template",children:"Project template"}),"\n",(0,i.jsx)(t.p,{children:"Currently we do not have a project template that can be used to quickly scaffold\na C# policy."}),"\n",(0,i.jsxs)(t.p,{children:["Please, ",(0,i.jsx)(t.a,{href:"https://github.com/kubewarden/policy-sdk-dotnet/issues",children:"open an issue"}),"\nif you are interested."]})]})}function p(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>o});var i=n(67294);const s={},r=i.createContext(s);function o(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);