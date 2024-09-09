"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[9333],{17272:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>u,contentTitle:()=>s,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var n=t(85893),o=t(11151);const r={sidebar_label:"Builtin Support",title:"Builtin support",description:"The Kubewarden provided support for executing wasm binaries.",keywords:["kubewarden","kubernetes","builtin wasm support"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","built-in-support"]},s=void 0,l={id:"tutorials/writing-policies/rego/builtin-support",title:"Builtin support",description:"The Kubewarden provided support for executing wasm binaries.",source:"@site/docs/tutorials/writing-policies/rego/02-builtin-support.md",sourceDirName:"tutorials/writing-policies/rego",slug:"/tutorials/writing-policies/rego/builtin-support",permalink:"/next/tutorials/writing-policies/rego/builtin-support",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/tutorials/writing-policies/rego/02-builtin-support.md",tags:[],version:"current",lastUpdatedAt:1725863934e3,sidebarPosition:2,frontMatter:{sidebar_label:"Builtin Support",title:"Builtin support",description:"The Kubewarden provided support for executing wasm binaries.",keywords:["kubewarden","kubernetes","builtin wasm support"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","built-in-support"]},sidebar:"docs",previous:{title:"Rego",permalink:"/next/tutorials/writing-policies/rego/intro-rego"},next:{title:"Introduction",permalink:"/next/tutorials/writing-policies/rego/open-policy-agent/intro"}},u={},p=[{value:"Executing policies with missing built-ins",id:"executing-policies-with-missing-built-ins",level:2}];function a(e){const i={a:"a",code:"code",h2:"h2",p:"p",...(0,o.a)(),...e.components},{Head:t}=i;return t||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t,{children:(0,n.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rego/builtin-support"})}),"\n",(0,n.jsxs)(i.p,{children:["Additionally, to building a policy for the ",(0,n.jsx)(i.code,{children:"wasm"})," target, it needs running."]}),"\n",(0,n.jsxs)(i.p,{children:["The Open Policy Agent (OPA) team has a page you can check for\n",(0,n.jsx)(i.a,{href:"https://www.openpolicyagent.org/docs/latest/policy-reference/#built-in-functions",children:"built-in support"}),"."]}),"\n",(0,n.jsx)(i.p,{children:"When building a Rego policy into a WebAssembly module,\ncertain of these built-in functions are in the Wasm file itself.\nThey're the built-ins marked with a green check in the linked built-in page.\nThe WebAssembly runtime evaluating the module, provides the others."}),"\n",(0,n.jsxs)(i.p,{children:["The built-ins marked as ",(0,n.jsx)(i.code,{children:"SDK-dependent"})," are the ones that the host has to implement,\nin this case, Kubewarden.\nOPA and Gatekeeper may use them depending on the needs of the policy.\nIn any case, these built-ins are exposed to the policy and any new or existing policy could depend on them."]}),"\n",(0,n.jsx)(i.p,{children:"There are still ceratin built-ins that aren't yet provided by Kubewarden,\nhowever, based on the policies seen in the open,\nthe ones already supported should be enough for the most Kubernetes users."}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.a,{href:"https://github.com/kubewarden/policy-evaluator/issues/56",children:"This GitHub issue"}),"\nkeeps track of the Rego built-ins we've still to implement.\nFeel free to comment there to help prioritize our work."]}),"\n",(0,n.jsx)(i.h2,{id:"executing-policies-with-missing-built-ins",children:"Executing policies with missing built-ins"}),"\n",(0,n.jsxs)(i.p,{children:["When a policy is run with ",(0,n.jsx)(i.code,{children:"kwctl"})," or with ",(0,n.jsx)(i.code,{children:"policy-server"}),",\nthe list of built-ins used by the policy is inspected.\nIf any of the used built-ins are missing,\nthe program stops execution logging a fatal error reporting the missing built-ins."]})]})}function c(e={}){const{wrapper:i}={...(0,o.a)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},11151:(e,i,t)=>{t.d(i,{Z:()=>l,a:()=>s});var n=t(67294);const o={},r=n.createContext(o);function s(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);