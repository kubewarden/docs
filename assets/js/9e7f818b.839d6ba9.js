"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[5939],{45357:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var i=n(85893),o=n(11151);const r={sidebar_label:"C#",title:"C#",description:"Kubewarden policies using C# and .NET",keywords:["kubewarden","kubernetes","writing policies","c#",".net"],"doc-type":["how-to","explanation","tutorial","reference"],"doc-topic":["kubewarden","writing-policies","c#"],"doc-persona":["kubewarden-policy-developer"]},s=void 0,a={id:"writing-policies/dotnet",title:"C#",description:"Kubewarden policies using C# and .NET",source:"@site/docs/writing-policies/dotnet.md",sourceDirName:"writing-policies",slug:"/writing-policies/dotnet",permalink:"/next/writing-policies/dotnet",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/dotnet.md",tags:[],version:"current",lastUpdatedAt:1704718226,formattedLastUpdatedAt:"Jan 8, 2024",frontMatter:{sidebar_label:"C#",title:"C#",description:"Kubewarden policies using C# and .NET",keywords:["kubewarden","kubernetes","writing policies","c#",".net"],"doc-type":["how-to","explanation","tutorial","reference"],"doc-topic":["kubewarden","writing-policies","c#"],"doc-persona":["kubewarden-policy-developer"]},sidebar:"docs",previous:{title:"Distribute",permalink:"/next/writing-policies/rego/gatekeeper/distribute"},next:{title:"Swift",permalink:"/next/writing-policies/swift"}},c={},d=[{value:"Current state",id:"current-state",level:2},{value:"Project template",id:"project-template",level:2}];function l(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["Currently, .NET Core has experimental support for the WebAssembly WASI platform.\nThis is from the ",(0,i.jsx)(t.a,{href:"https://github.com/SteveSandersonMS/dotnet-wasi-sdk",children:(0,i.jsx)(t.code,{children:"dotnet-wasi-sdk"})})," project."]}),"\n",(0,i.jsx)(t.admonition,{type:"note",children:(0,i.jsx)(t.p,{children:"You don't need a Windows installation to write or run .NET Core code.\nEverything can be done also on a Linux or on an macOS machine."})}),"\n",(0,i.jsx)(t.h2,{id:"current-state",children:"Current state"}),"\n",(0,i.jsx)(t.p,{children:"Policy authors can use the following resources:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/kubewarden/policy-sdk-dotnet",children:"Kubewarden .NET Core SDK"}),":\nthis provides a set of objects and functions that simplify the process of writing policies."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/kubewarden/policy-sdk-dotnet/tree/main/example",children:"Kubewarden policy example"}),":\nthis is an example of a working policy."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"No limitations are known.\nThe SDK enables writing both validating and mutating policies."}),"\n",(0,i.jsxs)(t.p,{children:["It's possible to use the\n",(0,i.jsx)(t.a,{href:"https://www.nuget.org/packages/KubernetesClient.Models",children:(0,i.jsx)(t.code,{children:"KubernetesClient.Models"})}),"\nlibrary to deal with the Kubernetes objects."]}),"\n",(0,i.jsx)(t.h2,{id:"project-template",children:"Project template"}),"\n",(0,i.jsx)(t.p,{children:"Currently, we don't have a project template that can scaffold a C# policy."}),"\n",(0,i.jsxs)(t.p,{children:["Please, ",(0,i.jsx)(t.a,{href:"https://github.com/kubewarden/policy-sdk-dotnet/issues",children:"open an issue"}),"\nif interested."]})]})}function p(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>s});var i=n(67294);const o={},r=i.createContext(o);function s(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);