"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[70183],{56512:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"tutorials/writing-policies/rego/gatekeeper/create-policy","title":"Creating a new Gatekeeper Rego policy","description":"Creating a new Gatekeeper rego policy.","source":"@site/versioned_docs/version-1.16/tutorials/writing-policies/rego/gatekeeper/02-create-policy.md","sourceDirName":"tutorials/writing-policies/rego/gatekeeper","slug":"/tutorials/writing-policies/rego/gatekeeper/create-policy","permalink":"/1.16/tutorials/writing-policies/rego/gatekeeper/create-policy","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.16/tutorials/writing-policies/rego/gatekeeper/02-create-policy.md","tags":[],"version":"1.16","lastUpdatedAt":1742923074000,"sidebarPosition":2,"frontMatter":{"sidebar_label":"Create a New Policy","title":"Creating a new Gatekeeper Rego policy","description":"Creating a new Gatekeeper rego policy.","keywords":["kubewarden","kubernetes","gatekeeper rego policy"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","gatekeeper","create-policy"]},"sidebar":"docs","previous":{"title":"Gatekeeper support","permalink":"/1.16/tutorials/writing-policies/rego/gatekeeper/intro"},"next":{"title":"Build and run","permalink":"/1.16/tutorials/writing-policies/rego/gatekeeper/build-and-run"}}');var o=t(74848),r=t(28453);const s={sidebar_label:"Create a New Policy",title:"Creating a new Gatekeeper Rego policy",description:"Creating a new Gatekeeper rego policy.",keywords:["kubewarden","kubernetes","gatekeeper rego policy"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","gatekeeper","create-policy"]},a=void 0,c={},l=[{value:"Requirements",id:"requirements",level:2},{value:"The policy",id:"the-policy",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t,{children:(0,o.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rego/gatekeeper/create-policy"})}),"\n",(0,o.jsxs)(n.p,{children:["For this tutorial you'll implement the same policy that you wrote with\n",(0,o.jsx)(n.a,{href:"../open-policy-agent/create-policy",children:"Open Policy Agent"}),".\nNamely, a policy that rejects a resource if it's targeting the ",(0,o.jsx)(n.code,{children:"default"})," namespace."]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["There is a\n",(0,o.jsx)(n.a,{href:"https://github.com/kubewarden/gatekeeper-policy-template",children:"repository template"}),"\nthat you can use as a base to port an existing policy."]})}),"\n",(0,o.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,o.jsx)(n.p,{children:"You need the following tools:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"opa"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"kwctl"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"the-policy",children:"The policy"}),"\n",(0,o.jsx)(n.p,{children:"Gatekeeper policies must return none or more violation objects.\nIf no violations are reported, the request is accepted.\nIf one, or more violations are reported, the request is rejected."}),"\n",(0,o.jsxs)(n.p,{children:["Create a new folder, named ",(0,o.jsx)(n.code,{children:"rego-policy"}),".\nIn it, create a ",(0,o.jsx)(n.code,{children:"policy.rego"})," file with the contents:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-rego",children:'package policy\n\nviolation[{"msg": msg}] {\n        input.review.object.metadata.namespace == "default"\n        msg := "it is forbidden to use the default namespace"\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["In this case, the entrypoint is ",(0,o.jsx)(n.code,{children:"policy/violation"}),",\nand due to how Rego works, the policy can have the following outcomes:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Return 1 violation: the object reviewed is targeting the default namespace."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Return 0 violations: the object reviewed is compliant with the policy."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Take a moment to compare this policy with the one written in the Open Policy Agent section.\nThat one had to build the whole ",(0,o.jsx)(n.code,{children:"AdmissionReview"})," response,\nand the inputs were slightly different.\nIn the Gatekeeper mode,\nthe ",(0,o.jsx)(n.code,{children:"AdmissionRequest"})," object is provided with the ",(0,o.jsx)(n.code,{children:"input.review"})," attribute.\nAll attributes of the ",(0,o.jsx)(n.code,{children:"AdmissionRequest"})," are readable along with ",(0,o.jsx)(n.code,{children:"object"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Now, you can create the requests to evaluate in the next section."}),"\n",(0,o.jsxs)(n.p,{children:["You first create a ",(0,o.jsx)(n.code,{children:"default-ns.json"})," file with the following contents inside the ",(0,o.jsx)(n.code,{children:"data"})," directory:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "request": {\n    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n    "operation": "CREATE",\n    "object": {\n      "kind": "Pod",\n      "apiVersion": "v1",\n      "metadata": {\n        "name": "nginx",\n        "namespace": "default",\n        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"\n      }\n    }\n  }\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Now, create another ",(0,o.jsx)(n.code,{children:"AdmissionReview"})," object that, this time,\nis targeting a namespace different to the ",(0,o.jsx)(n.code,{children:"default"})," one.\nName this file ",(0,o.jsx)(n.code,{children:"other-ns.json"}),".\nIt has the following contents:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "request": {\n    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n    "operation": "CREATE",\n    "object": {\n      "kind": "Pod",\n      "apiVersion": "v1",\n      "metadata": {\n        "name": "nginx",\n        "namespace": "other",\n        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"\n      }\n    }\n  }\n}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["You can see, this simulates another pod creation request,\nthis time under a namespace called ",(0,o.jsx)(n.code,{children:"other"}),"."]})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var i=t(96540);const o={},r=i.createContext(o);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);