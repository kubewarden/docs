"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[81854],{373:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"howtos/policy-groups","title":"How to use policy groups","description":"How to use Kubewarden policy groups","source":"@site/versioned_docs/version-1.22/howtos/policy-groups.md","sourceDirName":"howtos","slug":"/howtos/policy-groups","permalink":"/howtos/policy-groups","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.22/howtos/policy-groups.md","tags":[],"version":"1.22","lastUpdatedAt":1741088150000,"sidebarPosition":36,"frontMatter":{"sidebar_label":"Policy Groups","sidebar_position":36,"title":"How to use policy groups","description":"How to use Kubewarden policy groups","keywords":["kubewarden","policy groups","clusteradmissionpolicygroup","admissionpolicygroup"],"doc-persona":["kubewarden-operator"],"doc-type":["howto"],"doc-topic":["explanations","policy-group"]},"sidebar":"docs","previous":{"title":"ValidatingAdmissionPolicy migration","permalink":"/howtos/vap-migration"},"next":{"title":"Secure supply chain","permalink":"/howtos/secure-supply-chain"}}');var i=n(74848),t=n(28453);const r={sidebar_label:"Policy Groups",sidebar_position:36,title:"How to use policy groups",description:"How to use Kubewarden policy groups",keywords:["kubewarden","policy groups","clusteradmissionpolicygroup","admissionpolicygroup"],"doc-persona":["kubewarden-operator"],"doc-type":["howto"],"doc-topic":["explanations","policy-group"]},a=void 0,l={},c=[];function d(e){const o={a:"a",admonition:"admonition",code:"code",p:"p",pre:"pre",...(0,t.R)(),...e.components},{Details:n,Head:s}=o;return n||u("Details",!0),s||u("Head",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s,{children:(0,i.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/policy-groups"})}),"\n",(0,i.jsx)(o.admonition,{type:"tip",children:(0,i.jsxs)(o.p,{children:["Before working with Policy Groups, consult the\n",(0,i.jsx)(o.a,{href:"/explanations/policy-groups",children:"explanation"}),"."]})}),"\n",(0,i.jsxs)(o.p,{children:["Using the example from the ",(0,i.jsx)(o.a,{href:"/explanations/policy-groups",children:"explanation of Policy Groups"}),",\nuse these commands to implement it."]}),"\n",(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:"language-shell",children:"kubectl apply -f group-policy-demo.yaml\n"})}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:(0,i.jsxs)(o.p,{children:["A ",(0,i.jsx)(o.code,{children:"ClusterAdmissionPolicyGroup"})," that rejects Pods that use images with the ",(0,i.jsx)(o.code,{children:"latest"})," tag,\nunless the images are signed by two trusted parties: Alice and Bob."]})}),(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:"language-yaml",children:'apiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicyGroup # or AdmissionPolicyGroup\nmetadata:\n  name: demo\nspec:\n  rules:\n    - apiGroups: [""]\n      apiVersions: ["v1"]\n      resources: ["pods"]\n      operations:\n        - CREATE\n        - UPDATE\n  policies:\n    signed_by_alice:\n      module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.3.0\n      settings:\n        modifyImagesWithDigest: false\n        signatures:\n          - image: "*"\n            pubKeys:\n              - |\n                -----BEGIN PUBLIC KEY-----\n                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEyg65hiNHt8FXTamzCn34IE3qMGcV\n                yQz3gPlhoKq3yqa1GIofcgLjUZtcKlUSVAU2/S5gXqyDnsW6466Jx/ZVlg==\n                -----END PUBLIC KEY-----\n    signed_by_bob:\n      module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.3.0\n      settings:\n        modifyImagesWithDigest: false\n        signatures:\n          - image: "*"\n            pubKeys:\n              - |\n                -----BEGIN PUBLIC KEY-----\n                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEswA3Ec4w1ErOpeLPfCdkrh8jvk3X\n                urm8ZrXi4S3an70k8bf1OlGnI/aHCcGleewHbBk1iByySMwr8BabchXGSg==\n                -----END PUBLIC KEY-----\n    reject_latest:\n      module: registry://ghcr.io/kubewarden/policies/trusted-repos:v0.2.0\n      settings:\n        tags:\n          reject:\n            - latest\n  expression: "reject_latest() || (signed_by_alice() && signed_by_bob())"\n  message: "the image is using the latest tag or is not signed by Alice and Bob"\n'})})]}),"\n",(0,i.jsxs)(o.p,{children:["Once the policy is active, the creation of a non-compliant Pod will be rejected.\nTo obtain more information about the evaluation of the policies that are part of the\ngroup, increase the vebosity level of ",(0,i.jsx)(o.code,{children:"kubectl"}),":"]}),"\n",(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:"language-shell",children:'kubectl -v4 apply -f signed-pod.yml\nI0919 18:29:40.251332    4330 helpers.go:246] server response object: [{\n  "kind": "Status",\n  "apiVersion": "v1",\n  "metadata": {},\n  "status": "Failure",\n  "message": "error when creating \\"signed-pod.yml\\": admission webhook \\"clusterwide-demo.kubewarden.admission\\" denied the request: the image is using the latest tag or is not signed by Alice and Bob",\n  "details": {\n    "causes": [\n      {\n        "message": "Resource signed is not accepted: verification of image testing.registry.svc.lan/busybox:latest failed: Host error: Callback evaluation failure: Image verification failed: missing signatures\\nThe following constraints were not satisfied:\\nkind: pubKey\\nowner: null\\nkey: |\\n  -----BEGIN PUBLIC KEY-----\\n  MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEswA3Ec4w1ErOpeLPfCdkrh8jvk3X\\n  urm8ZrXi4S3an70k8bf1OlGnI/aHCcGleewHbBk1iByySMwr8BabchXGSg==\\n  -----END PUBLIC KEY-----\\nannotations: null\\n",\n        "field": "spec.policies.signed_by_bob"\n      },\n      {\n        "message": "not allowed, reported errors: tags not allowed: latest",\n        "field": "spec.policies.reject_latest"\n      }\n    ]\n  },\n  "code": 400\n}]\nError from server: error when creating "signed-pod.yml": admission webhook "clusterwide-demo.kubewarden.admission" denied the request: the image is using the latest tag or is not signed by Alice and Bob\n'})}),"\n",(0,i.jsxs)(o.admonition,{type:"note",children:[(0,i.jsxs)(o.p,{children:["The evaluation output produced by the policies that are part of the group is visible\nonly by increasing the verbosity level of ",(0,i.jsx)(o.code,{children:"kubectl"}),"."]}),(0,i.jsxs)(o.p,{children:["A verbosity level of ",(0,i.jsx)(o.code,{children:"4"})," is enough to see the evaluation output of the policies."]})]})]})}function p(e={}){const{wrapper:o}={...(0,t.R)(),...e.components};return o?(0,i.jsx)(o,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}function u(e,o){throw new Error("Expected "+(o?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},28453:(e,o,n)=>{n.d(o,{R:()=>r,x:()=>a});var s=n(96540);const i={},t=s.createContext(i);function r(e){const o=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function a(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(t.Provider,{value:o},e.children)}}}]);