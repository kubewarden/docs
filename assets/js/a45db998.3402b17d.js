"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[85022],{15169:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>a,contentTitle:()=>s,default:()=>d,frontMatter:()=>n,metadata:()=>p,toc:()=>c});var r=i(85893),o=i(11151);const n={sidebar_label:"Gatekeeper support",title:"Gatekeeper support",description:"Introducing Gatekeeper support in Kubewarden.",keywords:["kubewarden","kubernetes","rego","gatekeeper"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","gatekeeper","introduction"]},s=void 0,p={id:"tutorials/writing-policies/rego/gatekeeper/intro",title:"Gatekeeper support",description:"Introducing Gatekeeper support in Kubewarden.",source:"@site/versioned_docs/version-1.11/tutorials/writing-policies/rego/gatekeeper/01-intro.md",sourceDirName:"tutorials/writing-policies/rego/gatekeeper",slug:"/tutorials/writing-policies/rego/gatekeeper/intro",permalink:"/1.11/tutorials/writing-policies/rego/gatekeeper/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.11/tutorials/writing-policies/rego/gatekeeper/01-intro.md",tags:[],version:"1.11",lastUpdatedAt:1724753916e3,sidebarPosition:1,frontMatter:{sidebar_label:"Gatekeeper support",title:"Gatekeeper support",description:"Introducing Gatekeeper support in Kubewarden.",keywords:["kubewarden","kubernetes","rego","gatekeeper"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","gatekeeper","introduction"]},sidebar:"docs",previous:{title:"Raw policies",permalink:"/1.11/tutorials/writing-policies/rego/open-policy-agent/raw-policies"},next:{title:"Create a New Policy",permalink:"/1.11/tutorials/writing-policies/rego/gatekeeper/create-policy"}},a={},c=[{value:"Compatibility with existing policies",id:"compatibility-with-existing-policies",level:2}];function l(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,o.a)(),...e.components},{Head:i}=t;return i||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i,{children:(0,r.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rego/gatekeeper/intro"})}),"\n",(0,r.jsxs)(t.admonition,{type:"note",children:[(0,r.jsx)(t.p,{children:"Gatekeeper support starts from these releases:"}),(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"kwctl: v0.2.0"}),"\n",(0,r.jsx)(t.li,{children:"policy-server: v0.2.0"}),"\n"]})]}),"\n",(0,r.jsx)(t.p,{children:"Gatekeeper is a project targeting Kubernetes with out-of-the-box features for integration."}),"\n",(0,r.jsx)(t.h2,{id:"compatibility-with-existing-policies",children:"Compatibility with existing policies"}),"\n",(0,r.jsx)(t.p,{children:"All existing Gatekeeper policies should be compatible with Kubewarden as explained in this chapter."}),"\n",(0,r.jsx)(t.admonition,{type:"info",children:(0,r.jsx)(t.p,{children:"If you find this not to be true, for your Gatekeeper policies,\nreport it,\nand we'll work to ensure your Gatekeeper policy runs with Kubewarden."})}),"\n",(0,r.jsxs)(t.p,{children:["Policies need compilation with the ",(0,r.jsx)(t.code,{children:"opa"})," CLI to ",(0,r.jsx)(t.code,{children:"wasm"})," target."]}),"\n",(0,r.jsxs)(t.p,{children:["For policy execution, you can read more about the Open Policy Agent\n",(0,r.jsx)(t.a,{href:"../builtin-support",children:"built-in support"})," in Kubewarden."]})]})}function d(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},11151:(e,t,i)=>{i.d(t,{Z:()=>p,a:()=>s});var r=i(67294);const o={},n=r.createContext(o);function s(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function p(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(n.Provider,{value:t},e.children)}}}]);