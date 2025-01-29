"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[43335],{1119:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"introduction","title":"","description":"Kubewarden is a [Kubernetes Dynamic Admission","source":"@site/versioned_docs/version-1.7/introduction.md","sourceDirName":".","slug":"/","permalink":"/1.7/","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/introduction.md","tags":[],"version":"1.7","lastUpdatedAt":1738170247000,"frontMatter":{"slug":"/","sidebar_label":"Introduction","title":""},"sidebar":"docs","next":{"title":"Quick start","permalink":"/1.7/quick-start"}}');var i=s(74848),r=s(28453);const a={slug:"/",sidebar_label:"Introduction",title:""},o="Introduction",c={},l=[{value:"What is WebAssembly?",id:"what-is-webassembly",level:2},{value:"Why use WebAssembly?",id:"why-use-webassembly",level:2},{value:"Policy distribution",id:"policy-distribution",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",h1:"h1",h2:"h2",header:"header",p:"p",...(0,r.R)(),...e.components},{Head:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s,{children:(0,i.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io"})}),"\n",(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"introduction",children:"Introduction"})}),"\n",(0,i.jsxs)(n.p,{children:["Kubewarden is a ",(0,i.jsx)(n.a,{href:"https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/",children:"Kubernetes Dynamic Admission\nController"}),"\nthat validates incoming requests against WebAssembly policies. The policies can be developed in any programming language that generates WebAssembly binaries."]}),"\n",(0,i.jsxs)(n.p,{children:["Kubewarden is a ",(0,i.jsx)(n.a,{href:"https://cncf.io",children:"CNCF"})," Sandbox project, initially created by ",(0,i.jsx)(n.a,{href:"https://www.rancher.com/",children:"Rancher"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"what-is-webassembly",children:"What is WebAssembly?"}),"\n",(0,i.jsxs)(n.p,{children:["As stated on ",(0,i.jsx)(n.a,{href:"https://webassembly.org/",children:"WebAssembly's official website"}),":"]}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"WebAssembly (abbreviated Wasm) is a binary instruction format for a\nstack-based virtual machine. Wasm is designed as a portable\ncompilation target for programming languages, enabling deployment on\nthe web for client and server applications."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:'Wasm was originally conceived as a browser "extension".\nHowever, efforts are being made by the WebAssembly\ncommunity to allow the execution of Wasm code outside\nbrowsers.'}),"\n",(0,i.jsx)(n.h2,{id:"why-use-webassembly",children:"Why use WebAssembly?"}),"\n",(0,i.jsx)(n.p,{children:"Users can write Kubernetes policies using their\nfavorite programming language, provided its toolchain can generate\nWasm binaries."}),"\n",(0,i.jsx)(n.p,{children:"Wasm modules are portable, once built they can run on any kind of\nprocessor architecture and operating system. For example, a policy developed and built on Apple\nSilicon can run on AMD64/Intel64 Linux without conversion."}),"\n",(0,i.jsx)(n.p,{children:'Policy authors can reuse their skills, tools and best\npractices. Policies are "traditional" programs that can have reusable\nblocks (regular libraries), can be linted and tested, and be\nplugged into current CI and CD workflows.'}),"\n",(0,i.jsx)(n.h2,{id:"policy-distribution",children:"Policy distribution"}),"\n",(0,i.jsx)(n.p,{children:"Kubewarden policies can be served by a regular web server or,\nbetter, be published from an OCI compliant registry."}),"\n",(0,i.jsxs)(n.p,{children:["Kubewarden policies can be stored inside an OCI compliant registry as\n",(0,i.jsx)(n.a,{href:"https://github.com/opencontainers/artifacts",children:"OCI artifacts"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>o});var t=s(96540);const i={},r=t.createContext(i);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);