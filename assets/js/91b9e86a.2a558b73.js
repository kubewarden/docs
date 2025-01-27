"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[44314],{45316:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"writing-policies/spec/host-capabilities/net","title":"","description":"Kubewarden policies cannot make network request from within the WebAssembly","source":"@site/versioned_docs/version-1.8/writing-policies/spec/host-capabilities/04-net.md","sourceDirName":"writing-policies/spec/host-capabilities","slug":"/writing-policies/spec/host-capabilities/net","permalink":"/1.8/writing-policies/spec/host-capabilities/net","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/writing-policies/spec/host-capabilities/04-net.md","tags":[],"version":"1.8","lastUpdatedAt":1737971763000,"sidebarPosition":4,"frontMatter":{"sidebar_label":"Network Capabilities","title":""},"sidebar":"docs","previous":{"title":"Container Registry Capabilities","permalink":"/1.8/writing-policies/spec/host-capabilities/container-registry"},"next":{"title":"Cryptographic Capabilities","permalink":"/1.8/writing-policies/spec/host-capabilities/crypto"}}');var s=t(74848),o=t(28453);const r={sidebar_label:"Network Capabilities",title:""},c="Network capabilities",a={},l=[{value:"DNS host lookup",id:"dns-host-lookup",level:2},{value:"Caching",id:"caching",level:3},{value:"Communication protocol",id:"communication-protocol",level:3}];function d(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"network-capabilities",children:"Network capabilities"})}),"\n",(0,s.jsx)(i.p,{children:"Kubewarden policies cannot make network request from within the WebAssembly\nexecution context."}),"\n",(0,s.jsx)(i.p,{children:"Network operations can be done by leveraging a series of capabilities exposed\nby the host."}),"\n",(0,s.jsx)(i.h2,{id:"dns-host-lookup",children:"DNS host lookup"}),"\n",(0,s.jsx)(i.p,{children:"This function performs a DNS lookup starting from the FQDN given by the policy."}),"\n",(0,s.jsx)(i.h3,{id:"caching",children:"Caching"}),"\n",(0,s.jsx)(i.p,{children:"Lookup results are cached for 1 minute."}),"\n",(0,s.jsx)(i.h3,{id:"communication-protocol",children:"Communication protocol"}),"\n",(0,s.jsx)(i.p,{children:"This is the description of the waPC protocol used to expose this capability:"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:" waPC function name "}),(0,s.jsx)("th",{children:" Input payload "}),(0,s.jsx)("th",{children:" Output payload "})]}),(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(i.p,{children:(0,s.jsx)(i.code,{children:"v1/dns_lookup_host"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-hcl",children:"# hostname - JSON encoded string\nstring\n"})})}),(0,s.jsx)("td",{children:(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-hcl",children:'\n{\n  # list of IPs\n  "ips": [string]\n}\n'})})})]})]}),"\n",(0,s.jsx)(i.p,{children:"All the IPs associated with the given FQDN, are going to be returned as strings\ninside of the response. Both IPv4 and IPv6 entries are going to be returned as\npart of the same response."}),"\n",(0,s.jsxs)(i.p,{children:["For example, when requesting the manifest digest of the ",(0,s.jsx)(i.code,{children:"busybox:latest"})," image,\nthe payload would be the following ones:"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["Input payload: ",(0,s.jsx)(i.code,{children:'"google.com"'})]}),"\n",(0,s.jsxs)(i.li,{children:["Output payload: ",(0,s.jsx)(i.code,{children:'{ "ips": ["127.0.0.1"]}'})]}),"\n"]})]})}function p(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,i,t)=>{t.d(i,{R:()=>r,x:()=>c});var n=t(96540);const s={},o=n.createContext(s);function r(e){const i=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(o.Provider,{value:i},e.children)}}}]);