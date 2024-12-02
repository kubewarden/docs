"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[98552],{2145:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"writing-policies/spec/settings","title":"","description":"Policy behaviour is not set in stone, it can be configured by providing configuration","source":"@site/versioned_docs/version-1.7/writing-policies/spec/02-settings.md","sourceDirName":"writing-policies/spec","slug":"/writing-policies/spec/settings","permalink":"/1.7/writing-policies/spec/settings","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/writing-policies/spec/02-settings.md","tags":[],"version":"1.7","lastUpdatedAt":1733126327000,"sidebarPosition":2,"frontMatter":{"sidebar_label":"Policy Settings","title":""},"sidebar":"docs","previous":{"title":"Policy Communication Specification","permalink":"/1.7/writing-policies/spec/intro-spec"},"next":{"title":"Validating Policies","permalink":"/1.7/writing-policies/spec/validating-policies"}}');var s=n(74848),o=n(28453);const a={sidebar_label:"Policy Settings",title:""},r="Policy settings",c={},l=[{value:"Settings validation",id:"settings-validation",level:2},{value:"Example",id:"example",level:2}];function d(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"policy-settings",children:"Policy settings"})}),"\n",(0,s.jsx)(i.p,{children:"Policy behaviour is not set in stone, it can be configured by providing configuration\ndetails to the policy at runtime. The policy author has full freedom to define\nthe structure of the policy settings."}),"\n",(0,s.jsx)(i.p,{children:"Kubewarden takes care of serializing the policy settings into JSON and provide\nthem to the policy every time it is invoked."}),"\n",(0,s.jsx)(i.h2,{id:"settings-validation",children:"Settings validation"}),"\n",(0,s.jsx)(i.p,{children:"Some policies might want to validate the settings a user provides to ensure\nthey are correct."}),"\n",(0,s.jsxs)(i.p,{children:["Each policy must register a waPC function called ",(0,s.jsx)(i.code,{children:"validate_settings"})," that\ntakes care of validating the policy settings."]}),"\n",(0,s.jsxs)(i.p,{children:["The ",(0,s.jsx)(i.code,{children:"validate_settings"})," function receives as input a JSON representation of\nthe settings provided by the user. The function validates them and returns\nas a response a ",(0,s.jsx)(i.code,{children:"SettingsValidationResponse"})," object."]}),"\n",(0,s.jsxs)(i.p,{children:["The structure of the ",(0,s.jsx)(i.code,{children:"SettingsValidationResponse"})," object is the following one:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:'{\n  # mandatory\n  "valid": <boolean>,\n\n  # optional, ignored if accepted - recommended for rejections\n  "message": <string>,\n}\n'})}),"\n",(0,s.jsxs)(i.p,{children:["If the user provided settings are ",(0,s.jsx)(i.code,{children:"valid"}),", the contents of ",(0,s.jsx)(i.code,{children:"message"})," are ignored.\nOtherwise the contents of ",(0,s.jsx)(i.code,{children:"message"})," are shown to the user."]}),"\n",(0,s.jsx)(i.admonition,{type:"note",children:(0,s.jsxs)(i.p,{children:["Kubewarden's ",(0,s.jsx)(i.a,{href:"https://github.com/chimera-kube/policy-server",children:"policy-server"}),"\nvalidates all the policy settings provided by users at start time.\nThe policy-server exits immediately with an error if at least one of its\npolicies received wrong configuration parameters."]})}),"\n",(0,s.jsx)(i.h2,{id:"example",children:"Example"}),"\n",(0,s.jsxs)(i.p,{children:["Let's take as an example the ",(0,s.jsx)(i.a,{href:"https://github.com/kubewarden/psp-capabilities",children:"psp-capabilities"}),"\npolicy which has the following configuration format:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-yaml",children:"allowed_capabilities:\n- CHOWN\n\nrequired_drop_capabilities:\n- NET_ADMIN\n\ndefault_add_capabilities:\n- KILL\n"})}),"\n",(0,s.jsxs)(i.p,{children:["The ",(0,s.jsx)(i.code,{children:"validate_settings"})," function will receive as input the following JSON\ndocument:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-json",children:'{\n  "allowed_capabilities": [\n    "CHOWN"\n  ],\n  "required_drop_capabilities": [\n    "NET_ADMIN"\n  ],\n  "default_add_capabilities": [\n    "KILL"\n  ]\n}\n'})}),"\n",(0,s.jsx)(i.h1,{id:"recap",children:"Recap"}),"\n",(0,s.jsxs)(i.p,{children:["Each policy must register a waPC function called ",(0,s.jsx)(i.code,{children:"validate_settings"})," that has\nthe following API:"]})]})}function p(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>a,x:()=>r});var t=n(96540);const s={},o=t.createContext(s);function a(e){const i=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(o.Provider,{value:i},e.children)}}}]);