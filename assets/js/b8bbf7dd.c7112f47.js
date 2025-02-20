"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[79660],{72450:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"writing-policies/go/scaffold","title":"","description":"We are going to create a policy that validates the labels of Pod","source":"@site/versioned_docs/version-1.7/writing-policies/go/02-scaffold.md","sourceDirName":"writing-policies/go","slug":"/writing-policies/go/scaffold","permalink":"/1.7/writing-policies/go/scaffold","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/writing-policies/go/02-scaffold.md","tags":[],"version":"1.7","lastUpdatedAt":1740037204000,"sidebarPosition":2,"frontMatter":{"sidebar_label":"Create a New Policy","title":""},"sidebar":"docs","previous":{"title":"Introduction to Go","permalink":"/1.7/writing-policies/go/intro-go"},"next":{"title":"Define Policy Settings","permalink":"/1.7/writing-policies/go/policy-settings"}}');var o=t(74848),a=t(28453);const s={sidebar_label:"Create a New Policy",title:""},l="Creating a new validation policy",r={},c=[{value:"Scaffolding new policy project",id:"scaffolding-new-policy-project",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"creating-a-new-validation-policy",children:"Creating a new validation policy"})}),"\n",(0,o.jsx)(n.p,{children:"We are going to create a policy that validates the labels of Pod\nobjects."}),"\n",(0,o.jsx)(n.p,{children:"The policy will reject all the Pods that use one or more labels on the deny list.\nThe policy will also validate certain labels using a regular expression\nprovided by the user."}),"\n",(0,o.jsx)(n.p,{children:"To summarize, the policy settings will look like that:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:'# List of labels that cannot be used\ndenied_labels:\n- foo\n- bar\n\n# Labels that are validated with user-defined regular expressions\nconstrained_labels:\n  priority: "[123]"\n  cost-center: "^cc-\\d+"\n'})}),"\n",(0,o.jsx)(n.p,{children:"The policy would reject the creation of this Pod:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\n  labels:\n    foo: hello world\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n"})}),"\n",(0,o.jsx)(n.p,{children:"The policy would also reject the creation of this Pod:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\n  labels:\n    cost-center: cc-marketing\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n"})}),"\n",(0,o.jsx)(n.p,{children:"Policy's settings can also be used to force certain labels to be specified,\nregardless of their contents:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"# Policy's settings\n\nconstrained_labels:\n  mandatory-label: \".*\" # <- this label must be present, we don't care about its value\n"})}),"\n",(0,o.jsx)(n.h2,{id:"scaffolding-new-policy-project",children:"Scaffolding new policy project"}),"\n",(0,o.jsxs)(n.p,{children:["The creation of a new policy project can be done by using this GitHub\ntemplate repository: ",(0,o.jsx)(n.a,{href:"https://github.com/kubewarden/go-policy-template",children:"kubewarden/go-policy-template"}),'.\nJust press the "Use  this template" green button near the top of the page\nand follow GitHub\'s wizard.']}),"\n",(0,o.jsxs)(n.p,{children:["Clone the repository locally and then ensure the ",(0,o.jsx)(n.code,{children:"module"})," directive inside\nof the ",(0,o.jsx)(n.code,{children:"go.mod"})," file looks like that:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-go-mod",children:"module <path to your repository>\n"})})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>l});var i=t(96540);const o={},a=i.createContext(o);function s(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);