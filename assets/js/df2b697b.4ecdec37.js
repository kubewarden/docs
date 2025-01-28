"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[49769],{78754:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>a,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"tutorials/writing-policies/go/automate","title":"Integrating with GitHub Actions","description":"Integrating with GitHub actions when developing policies for Kubewarden in Go.","source":"@site/docs/tutorials/writing-policies/go/07-automate.md","sourceDirName":"tutorials/writing-policies/go","slug":"/tutorials/writing-policies/go/automate","permalink":"/next/tutorials/writing-policies/go/automate","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/tutorials/writing-policies/go/07-automate.md","tags":[],"version":"current","lastUpdatedAt":1738080561000,"sidebarPosition":56,"frontMatter":{"sidebar_label":"GitHub Actions","sidebar_position":56,"title":"Integrating with GitHub Actions","description":"Integrating with GitHub actions when developing policies for Kubewarden in Go.","keywords":["kubewarden","kubernetes","github","integration"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","golang","github-action-integration"],"doc-persona":["kubewarden-policy-developer"]},"sidebar":"docs","previous":{"title":"Logging","permalink":"/next/tutorials/writing-policies/go/logging"},"next":{"title":"Distributing policy","permalink":"/next/tutorials/writing-policies/go/distribute"}}');var s=t(74848),o=t(28453);const l={sidebar_label:"GitHub Actions",sidebar_position:56,title:"Integrating with GitHub Actions",description:"Integrating with GitHub actions when developing policies for Kubewarden in Go.",keywords:["kubewarden","kubernetes","github","integration"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","golang","github-action-integration"],"doc-persona":["kubewarden-policy-developer"]},r=void 0,a={},c=[{value:"Automation",id:"automation",level:2},{value:"Testing",id:"testing",level:2},{value:"Release",id:"release",level:2},{value:"An example",id:"an-example",level:3}];function d(e){const i={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components},{Head:t}=i;return t||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/go/automate"})}),"\n",(0,s.jsx)(i.h2,{id:"automation",children:"Automation"}),"\n",(0,s.jsx)(i.p,{children:"This section describes how you can use GitHub Actions to automate tasks."}),"\n",(0,s.jsxs)(i.p,{children:["The project scaffolding already includes all the GitHub actions you need.\nYou can find the Actions in the ",(0,s.jsx)(i.code,{children:".github/workflows/test.yml"})," and ",(0,s.jsx)(i.code,{children:".github/workflows/release.yml"})," files."]}),"\n",(0,s.jsx)(i.p,{children:"You can adapt these principles to use a different CI system."}),"\n",(0,s.jsx)(i.h2,{id:"testing",children:"Testing"}),"\n",(0,s.jsxs)(i.p,{children:["Automation of the unit tests and of the end-to-end tests works out of the box.\nIt uses the jobs defined in ",(0,s.jsx)(i.code,{children:".github/workflows/test.yml"}),"."]}),"\n",(0,s.jsx)(i.h2,{id:"release",children:"Release"}),"\n",(0,s.jsxs)(i.p,{children:["The project scaffolding has a ",(0,s.jsx)(i.code,{children:"release"})," job in ",(0,s.jsx)(i.code,{children:".github/workflows/release.yml"}),"."]}),"\n",(0,s.jsx)(i.p,{children:"This job performs the following steps:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Checkout code"}),"\n",(0,s.jsx)(i.li,{children:"Build the WebAssembly policy"}),"\n",(0,s.jsx)(i.li,{children:"Push the policy to an Open Container Initiative (OCI) registry"}),"\n",(0,s.jsx)(i.li,{children:"Create a new GitHub Release"}),"\n"]}),"\n",(0,s.jsxs)(i.p,{children:["To enable the job, adjust the ",(0,s.jsx)(i.code,{children:"oci-target"})," action input for the reusable workflow (",(0,s.jsx)(i.code,{children:"reusable-release-policy-go.yml"}),") called in the ",(0,s.jsx)(i.code,{children:"release.yml"})," file."]}),"\n",(0,s.jsx)(i.p,{children:"The job acts differently based on the commit that triggered its execution."}),"\n",(0,s.jsxs)(i.p,{children:["Regular commits lead to the creation of an OCI artifact called ",(0,s.jsx)(i.code,{children:"<policy-name>:latest"}),".\nA GitHub release isn't created for these commits."]}),"\n",(0,s.jsxs)(i.p,{children:["Creating a tag that matches the ",(0,s.jsx)(i.code,{children:"v*"})," pattern leads to:"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["Creation of an OCI artifact called ",(0,s.jsx)(i.code,{children:"<policy-name>:<tag>"}),"."]}),"\n",(0,s.jsxs)(i.li,{children:["Creation of a GitHub release named ",(0,s.jsx)(i.code,{children:"Release <full tag name>"}),".\nThe release includes the assets, the source code of the policy, and the WebAssembly binary."]}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"an-example",children:"An example"}),"\n",(0,s.jsxs)(i.p,{children:["Assume a policy named ",(0,s.jsx)(i.code,{children:"safe-labels"})," and that it needs\npublishing as ",(0,s.jsx)(i.code,{children:"ghcr.io/kubewarden/policies/safe-labels"}),"."]}),"\n",(0,s.jsxs)(i.p,{children:["The contents of the ",(0,s.jsx)(i.code,{children:"jobs.push-to-oci-registry.env"})," section of ",(0,s.jsx)(i.code,{children:"ci.yml"})," should\nlook like:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:"jobs:\n  push-to-oci-registry:\n    runs-on: ubuntu-latest\n    env:\n      WASM_BINARY_NAME: policy.wasm\n      OCI_TARGET: ghcr.io/kubewarden/policies/safe-labels\n"})}),"\n",(0,s.jsxs)(i.p,{children:["Pushing a tag named ",(0,s.jsx)(i.code,{children:"v0.1.0"})," leads to the creation and publishing of the\nOCI artifact called ",(0,s.jsx)(i.code,{children:"ghcr.io/kubewarden/policies/safe-labels:v0.1.0"}),"."]}),"\n",(0,s.jsxs)(i.p,{children:["It creates a GitHub release named ",(0,s.jsx)(i.code,{children:"Release v0.1.0"}),".\nThe release includes the following assets:"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["Source code compressed as ",(0,s.jsx)(i.code,{children:"zip"})," and ",(0,s.jsx)(i.code,{children:"tar.gz"})]}),"\n",(0,s.jsxs)(i.li,{children:["A file named ",(0,s.jsx)(i.code,{children:"policy.wasm"}),"; this is the actual WebAssembly policy"]}),"\n"]})]})}function u(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>l,x:()=>r});var n=t(96540);const s={},o=n.createContext(s);function l(e){const i=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),n.createElement(o.Provider,{value:i},e.children)}}}]);