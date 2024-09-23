"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[19108],{99782:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>n,metadata:()=>s,toc:()=>d});var o=t(85893),i=t(11151);const n={sidebar_label:"Certificate Rotation",sidebar_position:10,title:"Policy Server certificate rotation issue",description:"How-to work around Policy Server certificate expiry issue",keywords:["kubewarden","kubernetes","policy server certificates"],"doc-persona":["kubewarden-operator","kubewarden-distributor","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["howto","workarounds","policy server certificates"]},a=void 0,s={id:"howtos/workarounds/policy-server-certificate-expiry",title:"Policy Server certificate rotation issue",description:"How-to work around Policy Server certificate expiry issue",source:"@site/docs/howtos/workarounds/policy-server-certificate-expiry.md",sourceDirName:"howtos/workarounds",slug:"/howtos/workarounds/policy-server-certificate-expiry",permalink:"/next/howtos/workarounds/policy-server-certificate-expiry",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/howtos/workarounds/policy-server-certificate-expiry.md",tags:[],version:"current",lastUpdatedAt:1727095216e3,sidebarPosition:10,frontMatter:{sidebar_label:"Certificate Rotation",sidebar_position:10,title:"Policy Server certificate rotation issue",description:"How-to work around Policy Server certificate expiry issue",keywords:["kubewarden","kubernetes","policy server certificates"],"doc-persona":["kubewarden-operator","kubewarden-distributor","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["howto","workarounds","policy server certificates"]},sidebar:"docs",previous:{title:"Common tasks",permalink:"/next/howtos/tasks"},next:{title:"PSP migration",permalink:"/next/howtos/psp-migration"}},c={},d=[];function l(e){const r={admonition:"admonition",p:"p",...(0,i.a)(),...e.components},{Head:t}=r;return t||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t,{children:(0,o.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/policy-server-certificate-expiry"})}),"\n",(0,o.jsx)(r.admonition,{type:"important",children:(0,o.jsx)(r.p,{children:"This workaround is only needed for Kubewarden v1.16.0 and earlier. Starting\nfrom v1.17.0, the controller will automatically renew the policy server\ncertificates."})}),"\n",(0,o.jsx)(r.p,{children:"During the release process for v1.14, a bug related to the policy server\ncertificate rotation was discovered. The Root CA is configured to expire in 10\nyears, but each policy-server certificate secret has a one-year expiry.\nHowever, the controller is currently unable to renew them automatically."}),"\n",(0,o.jsx)(r.p,{children:"In the v1.14 release, we have ensured that policy-server secrets are created\nwith a 10-year expiry."}),"\n",(0,o.jsx)(r.p,{children:"For future releases we'll implement an automated renewal process."}),"\n",(0,o.jsx)(r.p,{children:"Until then, users can manually delete the expired certificate secret\n(policy-server-default) and trigger a controller reconciliation. You do this by\nadding, removing, or updating a policy or by adjusting the number of replicas\nof a PolicyServer."})]})}function u(e={}){const{wrapper:r}={...(0,i.a)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},11151:(e,r,t)=>{t.d(r,{Z:()=>s,a:()=>a});var o=t(67294);const i={},n=o.createContext(i);function a(e){const r=o.useContext(n);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(n.Provider,{value:r},e.children)}}}]);