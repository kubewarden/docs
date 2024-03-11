"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[30279],{51388:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>n,toc:()=>u});var i=r(85893),s=r(11151);const o={sidebar_label:"Using Custom CAs",title:"Using custom certificate authorities",description:"Using custom certificate authorities with Kubewarden policy servers.",keywords:["kubewarden","kubernetes","custom certificate authorities"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto","reference"],"doc-topic":["operator-manual","policy-servers","custom-certificate-authorities"]},c=void 0,n={id:"operator-manual/policy-servers/custom-cas",title:"Using custom certificate authorities",description:"Using custom certificate authorities with Kubewarden policy servers.",source:"@site/versioned_docs/version-1.10/operator-manual/policy-servers/01-custom-cas.md",sourceDirName:"operator-manual/policy-servers",slug:"/operator-manual/policy-servers/custom-cas",permalink:"/operator-manual/policy-servers/custom-cas",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.10/operator-manual/policy-servers/01-custom-cas.md",tags:[],version:"1.10",lastUpdatedAt:1710161878,formattedLastUpdatedAt:"Mar 11, 2024",sidebarPosition:1,frontMatter:{sidebar_label:"Using Custom CAs",title:"Using custom certificate authorities",description:"Using custom certificate authorities with Kubewarden policy servers.",keywords:["kubewarden","kubernetes","custom certificate authorities"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto","reference"],"doc-topic":["operator-manual","policy-servers","custom-certificate-authorities"]},sidebar:"docs",previous:{title:"Operator Manual",permalink:"/operator-manual/intro"},next:{title:"Using private registries",permalink:"/operator-manual/policy-servers/private-registry"}},a={},u=[{value:"Custom Certificate Authorities for Policy registries",id:"custom-certificate-authorities-for-policy-registries",level:2},{value:"Insecure sources",id:"insecure-sources",level:3},{value:"Custom Certificate Authorities",id:"custom-certificate-authorities",level:3}];function l(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{id:"custom-certificate-authorities-for-policy-registries",children:"Custom Certificate Authorities for Policy registries"}),"\n",(0,i.jsxs)(t.p,{children:["It is possible to specify and configure the Certificate Authorities that a\nPolicyServer uses when pulling the ClusterAdmissionPolicy artifacts from the\npolicy registry. The following ",(0,i.jsx)(t.code,{children:"spec"})," fields will configure the deployed\n",(0,i.jsx)(t.code,{children:"policy-server"})," executable to that effect."]}),"\n",(0,i.jsx)(t.h3,{id:"insecure-sources",children:"Insecure sources"}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"Important"}),": the default behavior of ",(0,i.jsx)(t.code,{children:"kwctl"})," and ",(0,i.jsx)(t.code,{children:"policy-server"})," is to\nenforce HTTPS with trusted certificates matching the system CA store. You can\ninteract with registries using untrusted certificates or even without TLS, by\nusing the ",(0,i.jsx)(t.code,{children:"insecure_sources"})," setting. This approach is ",(0,i.jsx)(t.strong,{children:"highly discouraged"}),"\nfor environments closer to production."]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["To configure the PolicyServer to accept insecure connections to specific\nregistries, use the ",(0,i.jsx)(t.code,{children:"spec.insecureSources"})," field of PolicyServer. This field\naccepts a list of URIs to be regarded as insecure. Example:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-yaml",children:"spec:\n  insecureSources:\n    - localhost:5000\n    - host.k3d.internal:5000\n"})}),"\n",(0,i.jsxs)(t.p,{children:["See ",(0,i.jsx)(t.a,{href:"/distributing-policies/custom-certificate-authorities",children:"here"})," for more\ninformation on how the ",(0,i.jsx)(t.code,{children:"policy-server"})," executable treats them."]}),"\n",(0,i.jsx)(t.h3,{id:"custom-certificate-authorities",children:"Custom Certificate Authorities"}),"\n",(0,i.jsxs)(t.p,{children:["To configure the PolicyServer with a custom certificate chain of 1 or more\ncertificates for a specific URI, use the field ",(0,i.jsx)(t.code,{children:"spec.sourceAuthorities"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"This field is a map of URIs, each with its own list of strings that contain PEM\nencoded certificates. Example:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-yaml",children:'spec:\n  sourceAuthorities:\n    "registry-pre.example.com":\n      - |\n        -----BEGIN CERTIFICATE-----\n        ca-pre1-1 PEM cert\n        -----END CERTIFICATE-----\n      - |\n        -----BEGIN CERTIFICATE-----\n        ca-pre1-2 PEM cert\n        -----END CERTIFICATE-----\n    "registry-pre2.example.com:5500":\n      - |\n        -----BEGIN CERTIFICATE-----\n        ca-pre2 PEM cert\n        -----END CERTIFICATE-----\n'})}),"\n",(0,i.jsxs)(t.p,{children:["See ",(0,i.jsx)(t.a,{href:"/distributing-policies/custom-certificate-authorities",children:"here"})," for more\ninformation on how the ",(0,i.jsx)(t.code,{children:"policy-server"})," executable treats them."]})]})}function d(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},11151:(e,t,r)=>{r.d(t,{Z:()=>n,a:()=>c});var i=r(67294);const s={},o=i.createContext(s);function c(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function n(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);