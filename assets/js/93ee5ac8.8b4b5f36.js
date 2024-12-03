"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[15986],{74523:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"tutorials/verifying-kubewarden","title":"Verifying Kubewarden","description":"Verifying Kubewarden.","source":"@site/versioned_docs/version-1.13/tutorials/verifying-kubewarden.md","sourceDirName":"tutorials","slug":"/tutorials/verifying-kubewarden","permalink":"/1.13/tutorials/verifying-kubewarden","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.13/tutorials/verifying-kubewarden.md","tags":[],"version":"1.13","lastUpdatedAt":1733214925000,"sidebarPosition":30,"frontMatter":{"sidebar_label":"Verifying Kubewarden","sidebar_position":30,"title":"Verifying Kubewarden","description":"Verifying Kubewarden.","keywords":["kubewarden","kubernetes","security","verification"],"doc-persona":["kubewarden-operator","kubewarden-policy-developer","kubewarden-integrator"],"doc-type":["tutorial"],"doc-topic":["security","verifying-kubewarden"]},"sidebar":"docs","previous":{"title":"Cluster operators","permalink":"/1.13/tutorials/testing-policies/cluster-operators"},"next":{"title":"Publish to Artifact Hub","permalink":"/1.13/tutorials/publish-policy-to-artifact-hub"}}');var r=n(74848),s=n(28453);const c={sidebar_label:"Verifying Kubewarden",sidebar_position:30,title:"Verifying Kubewarden",description:"Verifying Kubewarden.",keywords:["kubewarden","kubernetes","security","verification"],"doc-persona":["kubewarden-operator","kubewarden-policy-developer","kubewarden-integrator"],"doc-type":["tutorial"],"doc-topic":["security","verifying-kubewarden"]},o=void 0,a={},d=[{value:"Helm charts",id:"helm-charts",level:2},{value:"Container images &amp; policies referenced in the charts",id:"container-images",level:3},{value:"Obtaining the lists",id:"obtaining-the-lists",level:4},{value:"Verifying the lists",id:"verifying-the-lists",level:3},{value:"kwctl",id:"kwctl",level:2},{value:"Policies",id:"policies",level:2}];function l(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components},{Head:n}=i;return n||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n,{children:(0,r.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/verifying-kubewarden"})}),"\n",(0,r.jsxs)(i.p,{children:["Kubewarden artifacts are signed using ",(0,r.jsx)(i.a,{href:"https://docs.sigstore.dev",children:"Sigstore"}),",\nwith the keyless workflow. This means that the signing certificate contains the\nfollowing info, where ",(0,r.jsx)(i.code,{children:"*"})," matches any following characters:"]}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:["issuer: ",(0,r.jsx)(i.code,{children:"https://token.actions.githubusercontent.com"})]}),"\n",(0,r.jsxs)(i.li,{children:["subject: ",(0,r.jsx)(i.code,{children:"https://github.com/kubewarden/*"})]}),"\n",(0,r.jsxs)(i.li,{children:['x509 certificate extension for GHA, "github_workflow_repository": ',(0,r.jsx)(i.code,{children:"kubewarden/*"})]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"helm-charts",children:"Helm charts"}),"\n",(0,r.jsxs)(i.p,{children:["You can find our Helm charts in our ",(0,r.jsx)(i.code,{children:"https://"})," traditional Helm repository under\n",(0,r.jsx)(i.a,{href:"https://charts.kubewarden.io",children:"https://charts.kubewarden.io"}),"."]}),"\n",(0,r.jsx)(i.p,{children:"The same Helm charts are signed via Sigstore's keyless signing, and pushed to an\nOCI repository that can hold both the Helm chart and its signature as OCI\nartifacts."}),"\n",(0,r.jsxs)(i.p,{children:["Since Helm 3.8.0, Helm has support for OCI registries, but because of\nconstraints in them, they can't be searched via ",(0,r.jsx)(i.code,{children:"helm"}),". You can find the\n",(0,r.jsx)(i.a,{href:"https://github.com/orgs/kubewarden/packages?tab=packages&q=charts",children:"list of charts in GitHub Container Registry"}),"."]}),"\n",(0,r.jsxs)(i.p,{children:["To verify a Helm chart, you need ",(0,r.jsx)(i.code,{children:"cosign"})," installed. Then execute the following\ncommand, for example:"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"cosign verify ghrc.io/kubewarden/charts/kubewarden-defaults:1.5.4 \\\n  --certificate-identity-regexp 'https://github.com/kubewarden/*' \\\n  --certificate-oidc-issuer https://token.actions.githubusercontent.com\n\nVerification for ghcr.io/kubewarden/charts/kubewarden-defaults:1.5.4 --\nThe following checks were performed on each of these signatures:\n  - The cosign claims were validated\n  - Existence of the claims in the transparency log was verified offline\n  - The code-signing certificate was verified using trusted certificate authority certificates\n\n<snipped json>\n"})}),"\n",(0,r.jsxs)(i.p,{children:["You can then verify that the cert in the returned json contains the correct\nissuer, subject, and ",(0,r.jsx)(i.code,{children:"github_workflow_repository"})," extensions."]}),"\n",(0,r.jsx)(i.h3,{id:"container-images",children:"Container images & policies referenced in the charts"}),"\n",(0,r.jsx)(i.h4,{id:"obtaining-the-lists",children:"Obtaining the lists"}),"\n",(0,r.jsxs)(i.p,{children:["Both the production images used in our Helm charts and our development images\n(tagged ",(0,r.jsx)(i.code,{children:":latest"}),") are signed with Sigstore's keyless signing."]}),"\n",(0,r.jsxs)(i.p,{children:["Kubewarden charts ship ",(0,r.jsx)(i.code,{children:"imagelist.txt"})," and (",(0,r.jsx)(i.code,{children:"policylist.txt"})," when relevant) inside\nof the chart. Hence, if you already verified the chart, you can use those lists\nto verify the consumed container images and policies."]}),"\n",(0,r.jsxs)(i.p,{children:["Kubewarden also follows the usual practices with regards to Helm charts. Hence, one\ncan also find all the images in the Helm charts with a plugin such as\n",(0,r.jsx)(i.a,{href:"https://github.com/cvila84/helm-image",children:"helm-image"}),", or with the following script:"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-bash",children:"#!/usr/bin/env bash\nhelm pull --untar kubewarden/kubewarden-controller && \\\nhelm pull --untar kubewarden/kubewarden-defaults && \\\n{ helm template ./kubewarden-controller; helm template ./kubewarden-defaults } \\\n    | yq '..|.image? | select(.)' \\\n    | sort -u | sed 's/\"//g'\n"})}),"\n",(0,r.jsx)(i.p,{children:"which gives us:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"ghcr.io/kubewarden/kubewarden-controller:v0.5.5\nghcr.io/kubewarden/policy-server:v0.3.1\nghcr.io/kubewarden/kubectl:v1.21.4\n"})}),"\n",(0,r.jsx)(i.h3,{id:"verifying-the-lists",children:"Verifying the lists"}),"\n",(0,r.jsx)(i.p,{children:"Now, for each image in that list you can verify their Sigstore signatures. E.g:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"cosign verify ghcr.io/kubewarden/policy-server:v1.5.3 \\\n  --certificate-identity-regexp 'https://github.com/kubewarden/*' \\\n  --certificate-oidc-issuer https://token.actions.githubusercontent.com\n\nVerification for ghcr.io/kubewarden/policy-server:v1.5.3 --\nThe following checks were performed on each of these signatures:\n  - The cosign claims were validated\n  - Existence of the claims in the transparency log was verified offline\n  - The code-signing certificate was verified using trusted certificate authority certificates\n\n<snipped json>\n"})}),"\n",(0,r.jsxs)(i.p,{children:["You can then verify that the cert in the returned json contains the correct\nissuer, subject, and ",(0,r.jsx)(i.code,{children:"github_workflow_repository"})," extensions."]}),"\n",(0,r.jsx)(i.h2,{id:"kwctl",children:"kwctl"}),"\n",(0,r.jsxs)(i.p,{children:["kwctl binaries are signed using ",(0,r.jsx)(i.a,{href:"https://docs.sigstore.dev/signing/signing_with_blobs/",children:"Sigstore's blog signing"}),"."]}),"\n",(0,r.jsxs)(i.p,{children:["When you download a ",(0,r.jsx)(i.a,{href:"https://github.com/kubewarden/kwctl/releases/",children:"kwctl\nrelease"})," each zip file contains\ntwo files that can be used for verification: ",(0,r.jsx)(i.code,{children:"kwctl.sig"})," and ",(0,r.jsx)(i.code,{children:"kwctl.pem"}),"."]}),"\n",(0,r.jsx)(i.p,{children:"In order to verify kwctl you need cosign installed, and then execute the\nfollowing command:"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"cosign verify-blob \\\n  --signature kwctl-linux-x86_64.sig \\\n  --cert kwctl-linux-x86_64.pem kwctl-linux-x86_64\n  --certificate-identity-regexp 'https://github.com/kubewarden/*' \\\n  --certificate-oidc-issuer https://token.actions.githubusercontent.com\n\nVerified OK\n"})}),"\n",(0,r.jsxs)(i.p,{children:["You can then verify that the cert in the returned json contains the correct\nissuer, subject, and ",(0,r.jsx)(i.code,{children:"github_workflow_repository"})," extensions."]}),"\n",(0,r.jsx)(i.h2,{id:"policies",children:"Policies"}),"\n",(0,r.jsxs)(i.p,{children:["Policies maintained by the Kubewarden team are also signed using the Sigstore project. Similar to\nusual container images, one can verify them using ",(0,r.jsx)(i.code,{children:"cosign"}),":"]}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{children:"cosign verify ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.5 \\\n  --certificate-identity-regexp 'https://github.com/kubewarden/*' \\\n  --certificate-oidc-issuer https://token.actions.githubusercontent.com\n\nVerification for ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.5 --\nThe following checks were performed on each of these signatures:\n  - The cosign claims were validated\n  - Existence of the claims in the transparency log was verified offline\n  - The code-signing certificate was verified using trusted certificate authority certificates\n\n  <snipped json>\n"})}),"\n",(0,r.jsxs)(i.p,{children:["You can then verify that the cert in the returned json contains the correct\nissuer, subject, and ",(0,r.jsx)(i.code,{children:"github_workflow_repository"})," extensions."]})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>c,x:()=>o});var t=n(96540);const r={},s=t.createContext(r);function c(e){const i=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),t.createElement(s.Provider,{value:i},e.children)}}}]);