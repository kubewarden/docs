"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[80201],{22958:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"writing-policies/rego/open-policy-agent/raw-policies","title":"Raw policies","description":"Raw policies are policies that can evaluate arbitrary JSON documents.","source":"@site/versioned_docs/version-1.9/writing-policies/rego/open-policy-agent/05-raw-policies.md","sourceDirName":"writing-policies/rego/open-policy-agent","slug":"/writing-policies/rego/open-policy-agent/raw-policies","permalink":"/1.9/writing-policies/rego/open-policy-agent/raw-policies","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.9/writing-policies/rego/open-policy-agent/05-raw-policies.md","tags":[],"version":"1.9","lastUpdatedAt":1740997772000,"sidebarPosition":5,"frontMatter":{"sidebar_label":"Raw policies","title":"Raw policies"},"sidebar":"docs","previous":{"title":"Distribute","permalink":"/1.9/writing-policies/rego/open-policy-agent/distribute"},"next":{"title":"Introduction","permalink":"/1.9/writing-policies/rego/gatekeeper/intro"}}');var o=n(74848),r=n(28453);const s={sidebar_label:"Raw policies",title:"Raw policies"},a="Writing raw policies",l={},c=[{value:"Example",id:"example",level:2},{value:"Validation",id:"validation",level:3}];function d(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.header,{children:(0,o.jsx)(i.h1,{id:"writing-raw-policies",children:"Writing raw policies"})}),"\n",(0,o.jsxs)(i.p,{children:["Raw policies are policies that can evaluate arbitrary JSON documents.\nFor more information about raw policies, please refer to the ",(0,o.jsx)(i.a,{href:"/1.9/howtos/raw-policies",children:"raw policies"})," page."]}),"\n",(0,o.jsx)(i.h2,{id:"example",children:"Example"}),"\n",(0,o.jsxs)(i.p,{children:["The following examples should look familiar if you completed the ",(0,o.jsx)(i.a,{href:"/1.9/writing-policies/rego/open-policy-agent/create-policy",children:"validation"})," page of this tutorial."]}),"\n",(0,o.jsx)(i.admonition,{type:"note",children:(0,o.jsxs)(i.p,{children:["Remember to mark the policy as ",(0,o.jsx)(i.code,{children:"raw"})," by using the ",(0,o.jsx)(i.code,{children:"policyType"})," field in the ",(0,o.jsx)(i.code,{children:"metadata.yml"})," configuration.\nPlease refer to the ",(0,o.jsx)(i.a,{href:"/1.9/writing-policies/metadata",children:"metadata"})," specification for more information."]})}),"\n",(0,o.jsx)(i.h3,{id:"validation",children:"Validation"}),"\n",(0,o.jsx)(i.p,{children:"We are going to write a policy that accepts a request in the following format:"}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{className:"language-json",children:'{\n  "request": {\n    "user": "alice",\n    "action": "read",\n    "resource": "products"\n  }\n}\n'})}),"\n",(0,o.jsxs)(i.p,{children:["and validates that only the ",(0,o.jsx)(i.code,{children:"admin"})," user can delete resources."]}),"\n",(0,o.jsxs)(i.p,{children:["Let's start by scaffolding a policy by using the ",(0,o.jsx)(i.a,{href:"https://github.com/kubewarden/opa-policy-template",children:"OPA policy template"}),"."]}),"\n",(0,o.jsxs)(i.p,{children:["First, we need to modify the ",(0,o.jsx)(i.code,{children:"policy.rego"})," file to look like this:"]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{className:"language-rego",children:'package validation\n\ndeny[msg] {\n    input.request.action == "delete"\n    input.request.user != "admin"\n    msg := sprintf("user %v is not allowed to delete resources", [input.request.user])\n}\n'})}),"\n",(0,o.jsxs)(i.p,{children:["The ",(0,o.jsx)(i.code,{children:"utility/policy.rego"})," module must be modified to remove Kubernetes-specific code:"]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{className:"language-rego",children:'package policy\n\nimport data.validation\n\nmain = {\n\t"response": response,\n}\n\n// highlight-start\n# OPA policy responses need the uid field to be set.\n# If the request doesn\'t contain a uid, set it to an empty string.\ndefault uid = ""\n\nuid = input.request.uid\n// highlight-end\n\nresponse = {\n\t"uid": uid,\n\t"allowed": false,\n\t"status": {"message": reason},\n} {\n\treason = concat(", ", validation.deny)\n\treason != ""\n} else = {\n\t"uid": uid,\n\t"allowed": true,\n} {\n\ttrue\n}\n'})})]})}function p(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,o.jsx)(i,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>s,x:()=>a});var t=n(96540);const o={},r=t.createContext(o);function s(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(r.Provider,{value:i},e.children)}}}]);