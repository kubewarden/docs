"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[76584],{95427:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>l,frontMatter:()=>s,metadata:()=>r,toc:()=>p});const r=JSON.parse('{"id":"reference/spec/host-capabilities/crypto","title":"Cryptographic capabilities","description":"Cryptographic capabilities.","source":"@site/versioned_docs/version-1.11/reference/spec/host-capabilities/05-crypto.md","sourceDirName":"reference/spec/host-capabilities","slug":"/reference/spec/host-capabilities/crypto","permalink":"/1.11/reference/spec/host-capabilities/crypto","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.11/reference/spec/host-capabilities/05-crypto.md","tags":[],"version":"1.11","lastUpdatedAt":1742912250000,"sidebarPosition":5,"frontMatter":{"sidebar_label":"Cryptographic capabilities","title":"Cryptographic capabilities","description":"Cryptographic capabilities.","keywords":["kubewarden","kubernetes","policy specification","cryptographic capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","cryptographic-capabilities"]},"sidebar":"docs","previous":{"title":"Network capabilities","permalink":"/1.11/reference/spec/host-capabilities/net"},"next":{"title":"Kubernetes capabilities","permalink":"/1.11/reference/spec/host-capabilities/kubernetes"}}');var c=i(74848),n=i(28453);const s={sidebar_label:"Cryptographic capabilities",title:"Cryptographic capabilities",description:"Cryptographic capabilities.",keywords:["kubewarden","kubernetes","policy specification","cryptographic capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","cryptographic-capabilities"]},o=void 0,a={},p=[{value:"WaPC protocol contract",id:"wapc-protocol-contract",level:2}];function d(e){const t={code:"code",h2:"h2",p:"p",pre:"pre",...(0,n.R)(),...e.components},{Head:i}=t;return i||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i,{children:(0,c.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/spec/host-capabilities/crypto"})}),"\n",(0,c.jsx)(t.p,{children:"Because of Wasm constraints at the time of writing,\nsome cryptographic libraries cannot be compiled to Wasm.\nIn the meantime,\nKubewarden policies needing those libraries can perform callbacks to evaluate the cryptographic functions on the host side.\nThey receive the result, and continue with their tasks."}),"\n",(0,c.jsx)(t.h2,{id:"wapc-protocol-contract",children:"WaPC protocol contract"}),"\n",(0,c.jsx)(t.p,{children:"If you are implementing your own language SDK,\nthese are the functions performing cryptographic checks exposed by the host:"}),"\n",(0,c.jsxs)("table",{children:[(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:" waPC function name "}),(0,c.jsx)("th",{children:" Input payload "}),(0,c.jsx)("th",{children:" Output payload "})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)(t.p,{children:(0,c.jsx)(t.code,{children:"v1/is_certificate_trusted"})})}),(0,c.jsx)("td",{children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-hcl",children:'# Certificate:\n{\n  # **mandatory**: Which encoding is used by the certificate\n  # Either the string "Pem" or "Der".\n  "encoding": string,\n  # Actual certificate\n  # The certificate is UTF-8 encoded.\n  # It\'s an array of bytes of the unicode code pointers of a PEM/DER encoded\n  # certificate string.\n  "data": [byte(int), ..., byte(int)]\n}\n\n{\n  # **mandatory**: PEM-encoded certificate to verify\n  "cert": Certificate,\n  # optional:\n  "cert_chain": [\n      # list of certs, ordered by trust\n      # usage (intermediates first, root last)\n      # If empty or missing, certificate is assumed\n      # trusted\n      Certificate,\n      ...\n      Certificate,\n    ],\n  # RFC 3339 time format string, to check expiration\n  # against.\n  # If missing, certificate is assumed never expired\n  "not_after": string\n}\n'})})}),(0,c.jsx)("td",{children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-hcl",children:'{\n   # true if certificate verified:\n   "trusted": boolean,\n   # empty if trusted == true:\n   "reason": string\n}\n'})})})]})]})]})}function l(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>s,x:()=>o});var r=i(96540);const c={},n=r.createContext(c);function s(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:s(e.components),r.createElement(n.Provider,{value:t},e.children)}}}]);