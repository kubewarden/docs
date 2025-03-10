"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[88829],{35466:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"howtos/argocd-installation","title":"ArgoCD Installation","description":"How to install Kubewarden with ArgoCD","source":"@site/versioned_docs/version-1.21/howtos/argocd-installation.md","sourceDirName":"howtos","slug":"/howtos/argocd-installation","permalink":"/1.21/howtos/argocd-installation","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.21/howtos/argocd-installation.md","tags":[],"version":"1.21","lastUpdatedAt":1741590156000,"sidebarPosition":35,"frontMatter":{"sidebar_label":"ArgoCD Installation","sidebar_position":35,"title":"ArgoCD Installation","description":"How to install Kubewarden with ArgoCD","keywords":["kubewarden","gitops","argocd"],"doc-persona":["kubewarden-operator"],"doc-type":["howto"],"doc-topic":["argocd-installation"]},"sidebar":"docs","previous":{"title":"Pod Security Admission","permalink":"/1.21/howtos/pod-security-admission-with-kubewarden"},"next":{"title":"ValidatingAdmissionPolicy migration","permalink":"/1.21/howtos/vap-migration"}}');var a=t(74848),i=t(28453);const r={sidebar_label:"ArgoCD Installation",sidebar_position:35,title:"ArgoCD Installation",description:"How to install Kubewarden with ArgoCD",keywords:["kubewarden","gitops","argocd"],"doc-persona":["kubewarden-operator"],"doc-type":["howto"],"doc-topic":["argocd-installation"]},s=void 0,c={},d=[];function l(e){const n={admonition:"admonition",code:"code",p:"p",pre:"pre",...(0,i.R)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t,{children:(0,a.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/argocd-installation"})}),"\n",(0,a.jsx)(n.p,{children:"If you are using ArgoCD to manage your Kubernetes resources, you may be\ninterested in installing Kubewarden using ArgoCD. This is possible, but there\nare some considerations to take into account. Since Kubewarden v1.17.0, the\ncert-manager dependency has been removed. There is a new certificate reconciler that\nautomatically renews the certificates. This means that the Kubewarden\ncontroller takes care of creating and renewing the certificates for you,\nincluding both the root CA and all the webhook certificates."}),"\n",(0,a.jsx)(n.p,{children:"However, the initial root CA and webhook certificates are created during the\nHelm chart installation using the available Helm functions. This means that\nwhen the Helm chart is rendered, it checks if the certificates are already\ncreated, and if not, it will create them. This poses a problem when using\nArgoCD, as it uses Helm solely to render the templates, while all resource\nlifecycle management is handled by ArgoCD. Consequently, every time ArgoCD\nrenders the Helm chart to ensure that the application running in the cluster\ndoes not deviate from the definition in the Helm chart, it will attempt to\ncreate the certificates again. As a result, it marks the secrets that store\nthe certificates, as well as the webhook configuration, as unsynchronized."}),"\n",(0,a.jsxs)(n.p,{children:["To resolve this issue, it is necessary to configure the ArgoCD application to\nignore the ",(0,a.jsx)(n.code,{children:"data"})," field in secrets and the ",(0,a.jsx)(n.code,{children:"caBundle"})," field in the\n",(0,a.jsx)(n.code,{children:"MutatingWebhookConfiguration"})," and ",(0,a.jsx)(n.code,{children:"ValidatingWebhookConfiguration"})," resources.\nThis can be accomplished by adding the ",(0,a.jsx)(n.code,{children:"ignoreDifferences"})," field in the ArgoCD\napplication:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:'apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: kubewarden-crds\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://charts.kubewarden.io\n    chart: kubewarden-crds\n    targetRevision: 1.13.0\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: kubewarden-system\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n---\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: kubewarden-controller\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://charts.kubewarden.io\n    chart: kubewarden-controller\n    targetRevision: 4.1.0\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: kubewarden-system\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n    syncOptions:     # Sync options which modifies sync behavior\n      # When syncing changes, respect fields ignored by the ignoreDifferences configuration\n      - RespectIgnoreDifferences=true \n  # ignoreDifferences is the important configuration to avoid ArgoCD marking\n  # the secrets and # webhook configurations as unsynchronized\n  ignoreDifferences:\n  - group: ""\n    kind: "Secret"\n    name: kubewarden-ca\n    namespace: kubewarden-system\n    jsonPointers:\n      - /data\n  - group: ""\n    kind: "Secret"\n    name: kubewarden-webhook-server-cert\n    namespace: kubewarden-system\n    jsonPointers:\n      - /data\n  - group: "admissionregistration.k8s.io"\n    kind: "MutatingWebhookConfiguration"\n    jqPathExpressions:\n      - \'.webhooks[]?.clientConfig.caBundle\'\n  - group: "admissionregistration.k8s.io"\n    kind: "ValidatingWebhookConfiguration"\n    jqPathExpressions:\n      - \'.webhooks[]?.clientConfig.caBundle\'\n---\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: kubewarden-defaults\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://charts.kubewarden.io\n    chart: kubewarden-defaults\n    targetRevision: 2.8.0\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: kubewarden-system\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n'})}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsxs)(n.p,{children:["In the example above, the key aspect is the\n",(0,a.jsx)(n.code,{children:"ignoreDifferences"})," configuration for the Kubewarden controller application.\nThe rest of the content is included to provide context on how the ArgoCD\napplication should be configured and to offer a complete example."]})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>s});var o=t(96540);const a={},i=o.createContext(a);function r(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);