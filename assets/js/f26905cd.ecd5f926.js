"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[60700],{74825:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"tutorials/writing-policies/CEL/intro-cel","title":"Introduction to CEL","description":"An introduction to writing Kubewarden policies with CEL.","source":"@site/versioned_docs/version-1.17/tutorials/writing-policies/CEL/01-intro-cel.md","sourceDirName":"tutorials/writing-policies/CEL","slug":"/tutorials/writing-policies/CEL/intro-cel","permalink":"/1.17/tutorials/writing-policies/CEL/intro-cel","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.17/tutorials/writing-policies/CEL/01-intro-cel.md","tags":[],"version":"1.17","lastUpdatedAt":1737464130000,"sidebarPosition":1,"frontMatter":{"sidebar_label":"Intro","title":"Introduction to CEL","description":"An introduction to writing Kubewarden policies with CEL.","keywords":["kubewarden","kubernetes","writing policies","introduction"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","cel","introduction"],"doc-persona":["kubewarden-policy-developer","kubewarden-operator"]},"sidebar":"docs","previous":{"title":"Writing Policies","permalink":"/1.17/tutorials/writing-policies/"},"next":{"title":"Reusing VAPs","permalink":"/1.17/tutorials/writing-policies/CEL/reusing-vap"}}');var t=n(74848),r=n(28453);const o={sidebar_label:"Intro",title:"Introduction to CEL",description:"An introduction to writing Kubewarden policies with CEL.",keywords:["kubewarden","kubernetes","writing policies","introduction"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","cel","introduction"],"doc-persona":["kubewarden-policy-developer","kubewarden-operator"]},c=void 0,l={},a=[{value:"CEL in Kubernetes",id:"cel-in-kubernetes",level:2},{value:"Kubernetes function libraries",id:"kubernetes-function-libraries",level:3},{value:"CEL in Kubewarden: <code>cel-policy</code>",id:"cel-in-kubewarden-cel-policy",level:2},{value:"Benefits of Kubewarden&#39;s <code>cel-policy</code> in comparison with ValidatingAdmissionPolicies",id:"benefits-of-kubewardens-cel-policy-in-comparison-with-validatingadmissionpolicies",level:3}];function d(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components},{Head:n}=i;return n||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/cel/intro-cel"})}),"\n",(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.a,{href:"https://cel.dev",children:"Common Expression Language (CEL)"})," is a general-purpose\nexpression language designed to be fast, portable, and safe to execute. CEL as\na language is memory-safe, side-effect free, terminating (programs cannot loop\nforever), and strong & dynamically typed. You can learn more about CEL at\n",(0,t.jsx)(i.a,{href:"https://cel.dev",children:"cel.dev"}),", and practice it in the ",(0,t.jsx)(i.a,{href:"https://playcel.undistro.io",children:"CEL\nplayground"}),"."]}),"\n",(0,t.jsx)(i.h2,{id:"cel-in-kubernetes",children:"CEL in Kubernetes"}),"\n",(0,t.jsx)(i.p,{children:'CEL was chosen as the language for Kubernetes validation rules as CEL\nexpressions can be easily inlined into CRD schemas, and compiled and type-checked\n"ahead-of-time" (when CRDs are created and updated). For these reasons\nand its general characteristics, it\'s a perfect candidate for extending the\nKubernetes API.'}),"\n",(0,t.jsxs)(i.p,{children:["Marked as stable with Kubernetes 1.30, one can use CEL on\n",(0,t.jsx)(i.a,{href:"https://kubernetes.io/docs/reference/access-authn-authz/validating-admission-policy",children:"ValidatingAdmissionPolicies"}),"\nand other validation rules. For more info, see the Kubernetes docs\n",(0,t.jsx)(i.a,{href:"https://kubernetes.io/docs/reference/using-api/cel",children:"here"}),"."]}),"\n",(0,t.jsx)(i.h3,{id:"kubernetes-function-libraries",children:"Kubernetes function libraries"}),"\n",(0,t.jsx)(i.p,{children:"Kubernetes CEL validation rules have access to several function libraries:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"https://github.com/google/cel-spec/blob/v0.7.0/doc/langdef.md#list-of-standard-definitions",children:"CEL standard functions"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"https://github.com/google/cel-spec/blob/v0.7.0/doc/langdef.md#macros",children:"CEL standard macros"})}),"\n",(0,t.jsx)(i.li,{children:(0,t.jsx)(i.a,{href:"https://pkg.go.dev/github.com/google/cel-go/ext#Strings",children:"CEL extended string function library"})}),"\n",(0,t.jsxs)(i.li,{children:[(0,t.jsx)(i.a,{href:"https://kubernetes.io/docs/reference/using-api/cel/#kubernetes-cel-libraries",children:"Kubernetes CEL extension libraries"}),",\nwith supplemental functions for lists, regex, URLs, authorizers, quantities,\noptional types, numerical comparisons, etc."]}),"\n"]}),"\n",(0,t.jsxs)(i.h2,{id:"cel-in-kubewarden-cel-policy",children:["CEL in Kubewarden: ",(0,t.jsx)(i.code,{children:"cel-policy"})]}),"\n",(0,t.jsxs)(i.p,{children:["Kubewarden provides ",(0,t.jsx)(i.a,{href:"https://github.com/kubewarden/cel-policy",children:"cel-policy"}),".\nThis is a policy that builds and bundles the upstream\n",(0,t.jsx)(i.a,{href:"https://pkg.go.dev/github.com/google/cel-go",children:"cel-go"})," interpreter, and also the\ndifferent libraries listed above and available for CEL in Kubernetes from\n",(0,t.jsx)(i.code,{children:"apiextensions-apiserver"}),"."]}),"\n",(0,t.jsxs)(i.p,{children:["In addition, ",(0,t.jsx)(i.code,{children:"cel-policy"})," bundles a ",(0,t.jsx)(i.strong,{children:"Kubewarden CEL extension library"})," that exposes\nKubewarden's ",(0,t.jsx)(i.a,{href:"https://github.com/kubewarden/cel-policy?tab=readme-ov-file#host-capabilities",children:"host capabilities as native\nCEL"}),":"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Sigstore verification"}),"\n",(0,t.jsx)(i.li,{children:"OCI interaction"}),"\n",(0,t.jsx)(i.li,{children:"Cryptographic functions"}),"\n",(0,t.jsx)(i.li,{children:"Network operations"}),"\n",(0,t.jsx)(i.li,{children:"Access to Kubernetes resources"}),"\n"]}),"\n",(0,t.jsxs)(i.p,{children:["This means that ",(0,t.jsx)(i.code,{children:"cel-policy"})," is a superset of Kubernetes CEL,\nand backwards-compatible. One can reuse CEL written for vanilla Kubernetes, and/or\nmake use of the features added by Kubewarden."]}),"\n",(0,t.jsxs)(i.p,{children:["The ",(0,t.jsx)(i.code,{children:"cel-policy"})," is shipped compiled and behaves as a CEL interpreter. Users of\nthe policy pass the desired CEL expressions in the ",(0,t.jsx)(i.code,{children:"spec.settings"})," of the\n(Cluster)AdmissionPolicy, and thanks to CEL features, the expression gets\ncompiled and typed-checked for correctness when creating or updating the\n(Cluster)AdmissionPolicy. This means there's no need for custom builds of the\n",(0,t.jsx)(i.code,{children:"cel-policy"}),"."]}),"\n",(0,t.jsxs)(i.h3,{id:"benefits-of-kubewardens-cel-policy-in-comparison-with-validatingadmissionpolicies",children:["Benefits of Kubewarden's ",(0,t.jsx)(i.code,{children:"cel-policy"})," in comparison with ValidatingAdmissionPolicies"]}),"\n",(0,t.jsxs)(i.p,{children:["The Kubewarden ",(0,t.jsx)(i.code,{children:"cel-policy"}),":"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"It's CEL code is backwards-compatible with ValidatingAdmissionPolicies."}),"\n",(0,t.jsx)(i.li,{children:"Contrary to ValidatingAdmissionPolicies, it doesn't need a binding such as\nValidatingAdmissionPolicyBinding, as this is included in Kubewarden's\n(Cluster)Admissionpolicies definitions."}),"\n",(0,t.jsx)(i.li,{children:"Can be deployed to clusters that lack ValidatingAdmissionPolicies support."}),"\n",(0,t.jsxs)(i.li,{children:["Is context-aware, and makes use of Kubewarden's fine-grained permissions\nfor ",(0,t.jsx)(i.a,{href:"/1.17/reference/spec/context-aware-policies",children:"context awareness"}),"."]}),"\n",(0,t.jsx)(i.li,{children:"Is deployed as (Cluster)AdmissionPolicy."}),"\n",(0,t.jsx)(i.li,{children:"Benefits from Kubewarden's tracing and telemetry on policies."}),"\n",(0,t.jsx)(i.li,{children:"It will be taken into account by the Audit Scanner."}),"\n",(0,t.jsx)(i.li,{children:"Can be developed and tested out-of-cluster thanks to kwctl."}),"\n"]})]})}function u(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>o,x:()=>c});var s=n(96540);const t={},r=s.createContext(t);function o(e){const i=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(r.Provider,{value:i},e.children)}}}]);