"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[90431],{38269:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"introduction","title":"What is Kubewarden?","description":"Introducing Kubewarden, a CNCF Sandbox project.","source":"@site/versioned_docs/version-1.22/introduction.md","sourceDirName":".","slug":"/","permalink":"/","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.22/introduction.md","tags":[],"version":"1.22","lastUpdatedAt":1740997772000,"sidebarPosition":1,"frontMatter":{"slug":"/","sidebar_label":"Introduction","sidebar_position":1,"title":"What is Kubewarden?","description":"Introducing Kubewarden, a CNCF Sandbox project.","keywords":["kubewarden","cncf","cncf sandbox","kubernetes"],"doc-persona":["kubewarden-all"],"doc-type":["explanation"],"doc-topic":["introduction"]},"sidebar":"docs","next":{"title":"Quick start","permalink":"/quick-start"}}');var r=i(74848),t=i(28453);const o={slug:"/",sidebar_label:"Introduction",sidebar_position:1,title:"What is Kubewarden?",description:"Introducing Kubewarden, a CNCF Sandbox project.",keywords:["kubewarden","cncf","cncf sandbox","kubernetes"],"doc-persona":["kubewarden-all"],"doc-type":["explanation"],"doc-topic":["introduction"]},a=void 0,c={},l=[{value:"How does Kubewarden help?",id:"how-does-kubewarden-help",level:2},{value:"Benefits and value",id:"benefits-and-value",level:3},{value:"Use cases",id:"use-cases",level:3},{value:"New to Kubewarden?",id:"new-to-kubewarden",level:2},{value:"What is WebAssembly?",id:"what-is-webassembly",level:2},{value:"Why use WebAssembly?",id:"why-use-webassembly",level:2},{value:"Policy distribution",id:"policy-distribution",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,t.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i,{children:(0,r.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io"})}),"\n",(0,r.jsx)(n.p,{children:"Kubewarden is a Kubernetes Policy Engine.\nIt aims to be the Universal Policy Engine for Kubernetes."}),"\n",(0,r.jsxs)(n.p,{children:["Kubewarden is a ",(0,r.jsx)(n.a,{href:"https://cncf.io",children:"CNCF"})," Sandbox project,\noriginally created by ",(0,r.jsx)(n.a,{href:"https://www.rancher.com/",children:"SUSE Rancher"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"how-does-kubewarden-help",children:"How does Kubewarden help?"}),"\n",(0,r.jsx)(n.p,{children:"Kubewarden offers flexibility for policy admission and enforcement in a Kubernetes environment."}),"\n",(0,r.jsx)(n.h3,{id:"benefits-and-value",children:"Benefits and value"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Use any programming language that generates ",(0,r.jsx)(n.a,{href:"https://webassembly.org",children:"WebAssembly"})," binaries to write your policies."]}),"\n",(0,r.jsx)(n.li,{children:"WebAssembly enables policy compatibility across processors and operating systems."}),"\n",(0,r.jsx)(n.li,{children:"Reuse of policies from other policy engines without the need for rewriting them."}),"\n",(0,r.jsxs)(n.li,{children:["Distribute policies using standard and secure mechanisms such as ",(0,r.jsx)(n.a,{href:"https://opencontainers.org",children:"OCI"})," compliant registries."]}),"\n",(0,r.jsx)(n.li,{children:"Policy enforcement at admission ensures only compliant workloads run."}),"\n",(0,r.jsx)(n.li,{children:"The Kubewarden audit scanner actively and continuously checks policy enforcement over time."}),"\n",(0,r.jsxs)(n.li,{children:["Verify policies using ",(0,r.jsx)(n.a,{href:"https://slsa.dev",children:"SLSA"})," (Supply Chain Levels for Software Artifacts) tools and practices."]}),"\n",(0,r.jsx)(n.li,{children:"Kubewarden provides a comprehensive approach to admission policy management."}),"\n",(0,r.jsx)(n.li,{children:"CNCF membership and a growing open source community and ecosystem help Kubewarden with transparency, collaboration and improvement."}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"use-cases",children:"Use cases"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Security hardening. For example, enforce policies restricting container privileges, enforce network policies, or block insecure image registries."}),"\n",(0,r.jsx)(n.li,{children:"Compliance auditing. Ensure workloads comply with organizational or regulatory standards and best practices."}),"\n",(0,r.jsx)(n.li,{children:"Resource optimization. Enforce resource limits and quotas."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"new-to-kubewarden",children:"New to Kubewarden?"}),"\n",(0,r.jsxs)(n.p,{children:["If new to the Kubewarden project start with the\n",(0,r.jsx)(n.a,{href:"/quick-start",children:"Quick start guide"}),"\nand the ",(0,r.jsx)(n.a,{href:"/explanations/architecture",children:"architecture"})," page.\nThen it depends where your interests take you.\nFor policy developers there are language specific sections in the tutorials.\nFor integrators and administrators there is a 'howtos' section.\nThe explanations section contains useful background material.\nThere is also a ",(0,r.jsx)(n.a,{href:"/glossary",children:"glossary"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"what-is-webassembly",children:"What is WebAssembly?"}),"\n",(0,r.jsxs)(n.p,{children:["As stated on ",(0,r.jsx)(n.a,{href:"https://webassembly.org/",children:"WebAssembly's official website"}),":"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"WebAssembly (abbreviated Wasm) is a binary instruction format for a\nstack-based virtual machine. Wasm is designed as a portable\ncompilation target for programming languages, enabling deployment on\nthe web for client and server applications."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:'Wasm was originally conceived as a browser "extension". However, the\nWebAssembly community is engaged in efforts to allow the execution of Wasm code\noutside browsers.'}),"\n",(0,r.jsx)(n.h2,{id:"why-use-webassembly",children:"Why use WebAssembly?"}),"\n",(0,r.jsx)(n.p,{children:"Users can write Kubernetes policies using their\nfavorite programming language, provided its toolchain can generate\nWasm binaries."}),"\n",(0,r.jsx)(n.p,{children:"Wasm modules are portable, once built they can run on any kind of processor\narchitecture and operating system.\nFor example, a policy developed and built on Apple Silicon can run on\nAMD64/Intel64 Linux without conversion."}),"\n",(0,r.jsx)(n.p,{children:'Policy authors can reuse their skills, tools and best practices. Policies are\n"traditional" programs that can have reusable blocks (regular libraries). You\ncan lint and test them and you can plug them into current CI and CD workflows.'}),"\n",(0,r.jsx)(n.h2,{id:"policy-distribution",children:"Policy distribution"}),"\n",(0,r.jsxs)(n.p,{children:["You can serve Kubewarden policies using a standard web server or, better, you\ncan be publish them in an OCI compliant registry as\n",(0,r.jsx)(n.a,{href:"https://github.com/opencontainers/artifacts",children:"OCI artifacts"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>a});var s=i(96540);const r={},t=s.createContext(r);function o(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);