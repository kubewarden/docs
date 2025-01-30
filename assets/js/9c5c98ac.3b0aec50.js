"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[22776],{88893:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"writing-policies/wasi/intro-wasi","title":"WASI","description":"Using WASI to develop Kubewarden policies.","source":"@site/versioned_docs/version-1.10/writing-policies/wasi/01-intro-wasi.md","sourceDirName":"writing-policies/wasi","slug":"/writing-policies/wasi/intro-wasi","permalink":"/1.10/writing-policies/wasi/intro-wasi","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.10/writing-policies/wasi/01-intro-wasi.md","tags":[],"version":"1.10","lastUpdatedAt":1738242412000,"sidebarPosition":1,"frontMatter":{"sidebar_label":"WASI","title":"WASI","description":"Using WASI to develop Kubewarden policies.","keywords":["kubewarden","kubernetes","wasi"],"doc-type":["how-to","explanation"],"doc-topic":["kubewarden","writing-policies","wasi"],"doc-persona":["kubewarden-developer"]},"sidebar":"docs","previous":{"title":"Other languages","permalink":"/1.10/writing-policies/other-languages"},"next":{"title":"Raw policies","permalink":"/1.10/writing-policies/wasi/raw-policies"}}');var o=t(74848),s=t(28453);const a={sidebar_label:"WASI",title:"WASI",description:"Using WASI to develop Kubewarden policies.",keywords:["kubewarden","kubernetes","wasi"],"doc-type":["how-to","explanation"],"doc-topic":["kubewarden","writing-policies","wasi"],"doc-persona":["kubewarden-developer"]},r=void 0,c={},l=[{value:"Limitations",id:"limitations",level:2},{value:"Use cases",id:"use-cases",level:2},{value:"Communication protocol",id:"communication-protocol",level:2},{value:"Validation",id:"validation",level:3},{value:"Mutation",id:"mutation",level:3},{value:"Context-aware",id:"context-aware",level:2},{value:"Settings validation",id:"settings-validation",level:3},{value:"Policy metadata",id:"policy-metadata",level:2},{value:"Template project",id:"template-project",level:2}];function d(e){const i={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(i.p,{children:["The ",(0,o.jsx)(i.a,{href:"https://wasi.dev/",children:"WebAssembly System Interface (WASI)"})," is a WebAssembly standard providing a set of interfaces allowing execution of WebAssembly outside of browser."]}),"\n",(0,o.jsxs)(i.admonition,{type:"caution",children:[(0,o.jsx)(i.p,{children:"Authors writing regular policies should never use plain WASI system interfaces to write policies."}),(0,o.jsx)(i.p,{children:"This page is for Kubewarden maintainers or low level policy authors who want to experiment with bleeding edge WASM platforms."})]}),"\n",(0,o.jsx)(i.p,{children:"Using WASI, you can have a WebAssembly module that interacts with system primitives like STDOUT, STDERR, STDIN, environment variables and more."}),"\n",(0,o.jsxs)(i.p,{children:["Many of the compilers used to compile Kubewarden policies produce WebAssembly modules that target WASI interfaces.\nHowever, Kubewarden policies use the ",(0,o.jsx)(i.a,{href:"https://github.com/wapc",children:"waPC"})," project to implement bi-directional communication between the policy and the policy runtime (",(0,o.jsx)(i.code,{children:"kwctl"})," or ",(0,o.jsx)(i.code,{children:"policy-server"}),").\nKubewarden use of the communication protocol is described ",(0,o.jsx)(i.a,{href:"/1.10/writing-policies/spec/intro-spec",children:"here"}),"."]}),"\n",(0,o.jsx)(i.p,{children:"There are special cases when the waPC project can't be used yet.\nIn these circumstances you can write a policy using the interfaces provided by WASI."}),"\n",(0,o.jsx)(i.admonition,{type:"info",children:(0,o.jsx)(i.p,{children:"Kubewarden supports WASI policies from the Kubewarden 1.7.0 release forward."})}),"\n",(0,o.jsx)(i.h2,{id:"limitations",children:"Limitations"}),"\n",(0,o.jsx)(i.p,{children:"You shouldn't use WASI policies under regular circumstances because they suffer from the following limitations:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsxs)(i.li,{children:["No bi-directional communication, hence ",(0,o.jsx)(i.a,{href:"/1.10/writing-policies/spec/host-capabilities/intro-host-capabilities",children:"host capabilities"})," aren't available"]}),"\n",(0,o.jsxs)(i.li,{children:[(0,o.jsx)(i.a,{href:"/1.10/explanations/context-aware-policies",children:"Context-aware"})," capabilities only through the Go SDK (though see the following note)"]}),"\n",(0,o.jsx)(i.li,{children:"Inferior performance at evaluation time compared to waPC/Rego based policies"}),"\n"]}),"\n",(0,o.jsx)(i.admonition,{type:"note",children:(0,o.jsx)(i.p,{children:"Host capabilities can be used also by WASI policies. Currently only the Kubewarden Go SDK exposes them to WASI policies.\nIf this is of interest to you, please get in touch.\nWe can then prioritize the effort."})}),"\n",(0,o.jsx)(i.h2,{id:"use-cases",children:"Use cases"}),"\n",(0,o.jsx)(i.p,{children:'The only reason to write a "plain WASI" policy is when you can\'t use the waPC communication mechanism.'}),"\n",(0,o.jsx)(i.p,{children:"Currently, (as of June 2023), the only good reason to do this is when using the official Go compiler to produce a WebAssembly module."}),"\n",(0,o.jsxs)(i.p,{children:["Starting from the 1.21 release, the official Go compiler is able to produce WebAssembly modules targeting the WASI interface.\nHowever, these modules can't yet export functions to the WebAssembly runtime.\nThis limitation, tracked by ",(0,o.jsx)(i.a,{href:"https://github.com/golang/go/issues/42372",children:"this dedicated issue"}),", prevents the adoption of the waPC protocol."]}),"\n",(0,o.jsxs)(i.p,{children:["The Kubewarden project team advise that you write Kubewarden Go policies using the TinyGo compiler, as described ",(0,o.jsx)(i.a,{href:"/1.10/writing-policies/go/intro-go",children:"here"}),"."]}),"\n",(0,o.jsxs)(i.p,{children:["However, certain complex Go code bases can't be compiled using the TinyGo compiler.\nThis includes, for example, code bases like ",(0,o.jsx)(i.a,{href:"https://github.com/google/cel-go",children:"CEL-go"})," or ",(0,o.jsx)(i.a,{href:"https://github.com/kyverno/kyverno/",children:"Kyverno"}),".\nIn these circumstances, usage of the official Go compiler can help."]}),"\n",(0,o.jsx)(i.h2,{id:"communication-protocol",children:"Communication protocol"}),"\n",(0,o.jsx)(i.p,{children:"This section describes how to write a plain WASI policy."}),"\n",(0,o.jsx)(i.p,{children:"You need to write the code as a regular CLI program.\nThe program must take the following sub-commands:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsxs)(i.li,{children:[(0,o.jsx)(i.code,{children:"validate"}),": this command is invoked by the policy engine to evaluate an admission request"]}),"\n",(0,o.jsxs)(i.li,{children:[(0,o.jsx)(i.code,{children:"validate-settings"}),": this command is invoked by the policy engine to validate the policy settings"]}),"\n"]}),"\n",(0,o.jsx)(i.p,{children:"In both cases, the data to be validated is provided via STDIN.\nThe policy must provide the answer via STDOUT.\nYou can use STDERR for debug or error messages."}),"\n",(0,o.jsx)(i.h3,{id:"validation",children:"Validation"}),"\n",(0,o.jsxs)(i.p,{children:["The validation of a request happens when invoking the policy CLI program using the ",(0,o.jsx)(i.code,{children:"validate"})," sub-command."]}),"\n",(0,o.jsxs)(i.p,{children:["STDIN must contain a JSON document describing a ",(0,o.jsx)(i.code,{children:"ValidationRequest"})," object.\nThe policy must write to STDOUT a JSON document that containing a ",(0,o.jsx)(i.code,{children:"ValidationResponse"})," object."]}),"\n",(0,o.jsxs)(i.p,{children:["Both the ",(0,o.jsx)(i.code,{children:"ValidationRequest"})," and ",(0,o.jsx)(i.code,{children:"ValidationResponse"})," objects are described ",(0,o.jsx)(i.a,{href:"/1.10/writing-policies/spec/validating-policies",children:"here"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"mutation",children:"Mutation"}),"\n",(0,o.jsxs)(i.p,{children:["Mutating policies work in the same way as validating ones.\nThe policy CLI program is invoked using the ",(0,o.jsx)(i.code,{children:"validate"})," sub-command."]}),"\n",(0,o.jsxs)(i.p,{children:["STDIN must contain a JSON document describing a ",(0,o.jsx)(i.code,{children:"ValidationRequest"})," object.\nThe policy must write to STDOUT a JSON document containing a ",(0,o.jsx)(i.code,{children:"ValidationResponse"})," object."]}),"\n",(0,o.jsxs)(i.p,{children:["Both the ",(0,o.jsx)(i.code,{children:"ValidationRequest"})," and ",(0,o.jsx)(i.code,{children:"ValidationResponse"})," objects are described ",(0,o.jsx)(i.a,{href:"/1.10/writing-policies/spec/validating-policies",children:"here"}),"."]}),"\n",(0,o.jsxs)(i.p,{children:["When a mutation is needed, the ",(0,o.jsx)(i.code,{children:"ValidationResponse"})," object must have a key, ",(0,o.jsx)(i.code,{children:"mutated_object"}),", containing the object to be created.\nThis process is described ",(0,o.jsx)(i.a,{href:"/1.10/writing-policies/spec/mutating-policies",children:"here"}),"."]}),"\n",(0,o.jsx)(i.h2,{id:"context-aware",children:"Context-aware"}),"\n",(0,o.jsxs)(i.p,{children:["Only supported via the Go SDK for now. The Go SDK exposes the context-aware\ncapabilities as usual, for more information see ",(0,o.jsx)(i.a,{href:"../spec/context-aware-policies",children:"here"}),"."]}),"\n",(0,o.jsxs)(i.p,{children:["As an example of a WASI Go context-aware policy, see the\n",(0,o.jsx)(i.a,{href:"https://github.com/kubewarden/go-wasi-context-aware-test-policy",children:"go-wasi-context-aware-test-policy"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"settings-validation",children:"Settings validation"}),"\n",(0,o.jsxs)(i.p,{children:["The policy must provide a sub-command named ",(0,o.jsx)(i.code,{children:"validate-settings"}),".\nThis command is used to validate the settings provided by the user."]}),"\n",(0,o.jsxs)(i.p,{children:["The program must receive on STDIN, a JSON object that holds the settings provided by the user.\nIt then validates them and writes a ",(0,o.jsx)(i.code,{children:"SettingsValidationResponse"})," object to STDOUT."]}),"\n",(0,o.jsxs)(i.p,{children:["The format of the ",(0,o.jsx)(i.code,{children:"SettingsValidationResponse"})," and the settings validation process is described ",(0,o.jsx)(i.a,{href:"/1.10/writing-policies/spec/settings",children:"here"}),"."]}),"\n",(0,o.jsx)(i.h2,{id:"policy-metadata",children:"Policy metadata"}),"\n",(0,o.jsxs)(i.p,{children:["Each Kubewarden policy must be annotated via the ",(0,o.jsx)(i.code,{children:"kwctl annotate"})," command.\nThe policy metadata of a plain WASI policy must have this value:"]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{className:"language-yaml",children:"executionMode: wasi\n"})}),"\n",(0,o.jsx)(i.h2,{id:"template-project",children:"Template project"}),"\n",(0,o.jsxs)(i.p,{children:[(0,o.jsx)(i.a,{href:"https://github.com/kubewarden/go-wasi-policy-template",children:"This GitHub repository"})," contains a template of a Go-based policy using the WASI protocol."]})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,o.jsx)(i,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>a,x:()=>r});var n=t(96540);const o={},s=n.createContext(o);function a(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(s.Provider,{value:i},e.children)}}}]);