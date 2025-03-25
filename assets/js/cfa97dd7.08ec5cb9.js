"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[83120],{33011:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>d,frontMatter:()=>c,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"reference/spec/host-capabilities/net","title":"Network capabilities","description":"Network capabilities.","source":"@site/docs/reference/spec/host-capabilities/04-net.md","sourceDirName":"reference/spec/host-capabilities","slug":"/reference/spec/host-capabilities/net","permalink":"/next/reference/spec/host-capabilities/net","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/reference/spec/host-capabilities/04-net.md","tags":[],"version":"current","lastUpdatedAt":1742911392000,"sidebarPosition":4,"frontMatter":{"sidebar_label":"Network capabilities","title":"Network capabilities","description":"Network capabilities.","keywords":["kubewarden","kubernetes","policy specification","network capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","network-capabilities"]},"sidebar":"docs","previous":{"title":"Container registry capabilities","permalink":"/next/reference/spec/host-capabilities/container-registry"},"next":{"title":"Cryptographic capabilities","permalink":"/next/reference/spec/host-capabilities/crypto"}}');var o=i(74848),s=i(28453);const c={sidebar_label:"Network capabilities",title:"Network capabilities",description:"Network capabilities.",keywords:["kubewarden","kubernetes","policy specification","network capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","network-capabilities"]},r=void 0,a={},l=[{value:"DNS host lookup",id:"dns-host-lookup",level:2},{value:"Caching",id:"caching",level:3},{value:"Communication protocol",id:"communication-protocol",level:3},{value:"waPC function - <code>v1/dns_lookup_host</code> input",id:"wapc-function---v1dns_lookup_host-input",level:4},{value:"waPC function - <code>v1/dns_lookup_host</code> output",id:"wapc-function---v1dns_lookup_host-output",level:4}];function p(e){const t={code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components},{Head:i}=t;return i||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{children:(0,o.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/spec/host-capabilities/net"})}),"\n",(0,o.jsx)(t.p,{children:"Kubewarden policies cannot make network request from within the WebAssembly execution context."}),"\n",(0,o.jsx)(t.p,{children:"Network operations can be done by leveraging a series of capabilities exposed by the host."}),"\n",(0,o.jsx)(t.h2,{id:"dns-host-lookup",children:"DNS host lookup"}),"\n",(0,o.jsx)(t.p,{children:"This function performs a DNS lookup starting from the FQDN given by the policy."}),"\n",(0,o.jsx)(t.h3,{id:"caching",children:"Caching"}),"\n",(0,o.jsx)(t.p,{children:"Lookup results are cached for 1 minute."}),"\n",(0,o.jsx)(t.h3,{id:"communication-protocol",children:"Communication protocol"}),"\n",(0,o.jsx)(t.p,{children:"This is the description of the waPC protocol used to expose this capability:"}),"\n",(0,o.jsxs)(t.h4,{id:"wapc-function---v1dns_lookup_host-input",children:["waPC function - ",(0,o.jsx)(t.code,{children:"v1/dns_lookup_host"})," input"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-hcl",children:"# hostname - JSON encoded string\nstring\n"})}),"\n",(0,o.jsxs)(t.h4,{id:"wapc-function---v1dns_lookup_host-output",children:["waPC function - ",(0,o.jsx)(t.code,{children:"v1/dns_lookup_host"})," output"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-hcl",children:'\n{\n  # list of IPs\n  "ips": [string]\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"All the IP addresses associated with the given FQDN,\nare going to be returned as strings in the response.\nBoth IPv4 and IPv6 entries are returned as part of the same response."}),"\n",(0,o.jsxs)(t.p,{children:["For example, when requesting the manifest digest of the\n",(0,o.jsx)(t.code,{children:"busybox:latest"})," image,\nthe payloads would be:"]}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["Input payload: ",(0,o.jsx)(t.code,{children:'"google.com"'})]}),"\n",(0,o.jsxs)(t.li,{children:["Output payload: ",(0,o.jsx)(t.code,{children:'{ "ips": ["127.0.0.1"]}'})]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>c,x:()=>r});var n=i(96540);const o={},s=n.createContext(o);function c(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);