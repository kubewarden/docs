"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[41780],{33660:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"explanations/certificates","title":"Certificate rotation","description":"How Kubewarden controller manages its certificates","source":"@site/versioned_docs/version-1.22/explanations/certificates.md","sourceDirName":"explanations","slug":"/explanations/certificates","permalink":"/explanations/certificates","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.22/explanations/certificates.md","tags":[],"version":"1.22","lastUpdatedAt":1741590156000,"sidebarPosition":25,"frontMatter":{"sidebar_label":"Certificate rotation","sidebar_position":25,"title":"Certificate rotation","description":"How Kubewarden controller manages its certificates","keywords":["kubewarden","certificate","controller","reconciliation"],"doc-persona":["kubewarden-operator"],"doc-type":["explanation"],"doc-topic":["explanations","certificates"]},"sidebar":"docs","previous":{"title":"Policy Groups","permalink":"/explanations/policy-groups"},"next":{"title":"Distributing policies","permalink":"/explanations/distributing-policies"}}');var i=n(74848),r=n(28453);const a={sidebar_label:"Certificate rotation",sidebar_position:25,title:"Certificate rotation",description:"How Kubewarden controller manages its certificates",keywords:["kubewarden","certificate","controller","reconciliation"],"doc-persona":["kubewarden-operator"],"doc-type":["explanation"],"doc-topic":["explanations","certificates"]},s=void 0,c={},l=[];function d(e){const t={admonition:"admonition",p:"p",...(0,r.R)(),...e.components},{Head:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n,{children:(0,i.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/explanations/certificates"})}),"\n",(0,i.jsx)(t.p,{children:"Kubewarden v1.17.0 removed the cert-manager dependency. The\ncontroller is able to manage all the certificates used by all the components.\nNow, the controller has a new reconciliation loop that ensures the\ncertificates are always up-to-date and the webhook configuration is correct."}),"\n",(0,i.jsx)(t.p,{children:"The Helm chart installation does the first certificate generation. It\ngenerates the root CA with ten years until expiration. The Helm chart\ninstallation also generates the controller webhook web server certificate,\nsigned by the root CA. The API server use this to communicate with the\nKubewarden controller to validate the CRDs. It has a one year expiration."}),"\n",(0,i.jsx)(t.p,{children:"Once the controller starts, its reconciler renews the certificates\nautomatically when they're about to expire. It also updates the\ncertificates and webhook configurations used by the entire Kubewarden stack."}),"\n",(0,i.jsx)(t.admonition,{type:"note",children:(0,i.jsx)(t.p,{children:"All the certificates generated by the Helm chart and later by the controller uses\nECDSA P256 keys."})}),"\n",(0,i.jsx)(t.p,{children:"The reconciliation loop renews certificates 60 days before expiration.\nCertificates rotate without downtime. The reconciliation loop takes care of\nrenewing the root CA too."}),"\n",(0,i.jsx)(t.p,{children:"The controller generates a new root CA 60 days before expiration. The\ncontroller updates the CA bundle used by all the webhooks to include both the\nnew root CA and the old one."}),"\n",(0,i.jsx)(t.p,{children:"The change of the root CA leads the reconciler to re-create the certificates\nissued to the webhooks. The propagation of the new certificates requires a\nperiod of time. However, during this time the updated CA bundle lets the API\nserver continue to communicate with all the webhooks without any downtime."}),"\n",(0,i.jsx)(t.p,{children:"When a new certificate is ready, and the old one is invalid, the controller\nupdates the CA bundle, used by webhooks, to include only the latest root\nCA."}),"\n",(0,i.jsx)(t.p,{children:"When a policy server, or controller web server certificate\nrenews, the controller updates the secret with the new certificate signed by\nthe root CA. Due to this reload feature, the controller, and the policy server,\nuse the new certificate with no need to restart processes, hence no downtime."})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>s});var o=n(96540);const i={},r=o.createContext(i);function a(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);