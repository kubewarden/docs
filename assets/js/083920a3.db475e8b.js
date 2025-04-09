"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[99333],{88757:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>c,toc:()=>p});const c=JSON.parse('{"id":"reference/spec/host-capabilities/crypto","title":"Cryptographic capabilities","description":"Cryptographic capabilities.","source":"@site/versioned_docs/version-1.12/reference/spec/host-capabilities/05-crypto.md","sourceDirName":"reference/spec/host-capabilities","slug":"/reference/spec/host-capabilities/crypto","permalink":"/1.12/reference/spec/host-capabilities/crypto","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.12/reference/spec/host-capabilities/05-crypto.md","tags":[],"version":"1.12","lastUpdatedAt":1744181680000,"sidebarPosition":5,"frontMatter":{"sidebar_label":"Cryptographic capabilities","title":"Cryptographic capabilities","description":"Cryptographic capabilities.","keywords":["kubewarden","kubernetes","policy specification","cryptographic capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","cryptographic-capabilities"]},"sidebar":"docs","previous":{"title":"Network capabilities","permalink":"/1.12/reference/spec/host-capabilities/net"},"next":{"title":"Kubernetes capabilities","permalink":"/1.12/reference/spec/host-capabilities/kubernetes"}}');var n=i(74848),r=i(28453);const o={sidebar_label:"Cryptographic capabilities",title:"Cryptographic capabilities",description:"Cryptographic capabilities.",keywords:["kubewarden","kubernetes","policy specification","cryptographic capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","cryptographic-capabilities"]},a=void 0,s={},p=[{value:"WaPC protocol contract",id:"wapc-protocol-contract",level:2},{value:"waPC function - <code>v1/is_certificate_trusted</code> input",id:"wapc-function---v1is_certificate_trusted-input",level:4},{value:"waPC function - <code>v1/is_certificate_trusted</code> output",id:"wapc-function---v1is_certificate_trusted-output",level:4}];function d(e){const t={code:"code",h2:"h2",h4:"h4",p:"p",pre:"pre",...(0,r.R)(),...e.components},{Head:i}=t;return i||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/spec/host-capabilities/crypto"})}),"\n",(0,n.jsx)(t.p,{children:"Because of Wasm constraints at the time of writing,\nsome cryptographic libraries cannot be compiled to Wasm.\nIn the meantime,\nKubewarden policies needing those libraries can perform callbacks to evaluate the cryptographic functions on the host side.\nThey receive the result, and continue with their tasks."}),"\n",(0,n.jsx)(t.h2,{id:"wapc-protocol-contract",children:"WaPC protocol contract"}),"\n",(0,n.jsx)(t.p,{children:"If you are implementing your own language SDK,\nthese are the functions performing cryptographic checks exposed by the host:"}),"\n",(0,n.jsxs)(t.h4,{id:"wapc-function---v1is_certificate_trusted-input",children:["waPC function - ",(0,n.jsx)(t.code,{children:"v1/is_certificate_trusted"})," input"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-hcl",children:'# Certificate:\n{\n  # **mandatory**: Which encoding is used by the certificate\n  # Either the string "Pem" or "Der".\n  "encoding": string,\n  # Actual certificate\n  # The certificate is UTF-8 encoded.\n  # It\'s an array of bytes of the unicode code pointers of a PEM/DER encoded\n  # certificate string.\n  "data": [byte(int), ..., byte(int)]\n}\n\n{\n  # **mandatory**: PEM-encoded certificate to verify\n  "cert": Certificate,\n  # optional:\n  "cert_chain": [\n      # list of certs, ordered by trust\n      # usage (intermediates first, root last)\n      # If empty or missing, certificate is assumed\n      # trusted\n      Certificate,\n      ...\n      Certificate,\n    ],\n  # RFC 3339 time format string, to check expiration\n  # against.\n  # If missing, certificate is assumed never expired\n  "not_after": string\n}\n'})}),"\n",(0,n.jsxs)(t.h4,{id:"wapc-function---v1is_certificate_trusted-output",children:["waPC function - ",(0,n.jsx)(t.code,{children:"v1/is_certificate_trusted"})," output"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-hcl",children:'{\n   # true if certificate verified:\n   "trusted": boolean,\n   # empty if trusted == true:\n   "reason": string\n}\n'})})]})}function l(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>a});var c=i(96540);const n={},r=c.createContext(n);function o(e){const t=c.useContext(r);return c.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),c.createElement(r.Provider,{value:t},e.children)}}}]);