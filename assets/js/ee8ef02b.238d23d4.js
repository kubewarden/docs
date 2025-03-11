"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[31006],{13779:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"explanations/comparisons/opa-comparison","title":"Kubewarden vs OPA Gatekeeper","description":"A brief comparison of the difference between Kubewarden and OPA Gatekeeper.","source":"@site/docs/explanations/comparisons/opa-comparison.md","sourceDirName":"explanations/comparisons","slug":"/explanations/comparisons/opa-comparison","permalink":"/next/explanations/comparisons/opa-comparison","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/explanations/comparisons/opa-comparison.md","tags":[],"version":"current","lastUpdatedAt":1741689762000,"frontMatter":{"sidebar_label":"Kubewarden vs OPA Gatekeeper","title":"Kubewarden vs OPA Gatekeeper","description":"A brief comparison of the difference between Kubewarden and OPA Gatekeeper.","keywords":["kubewarden","kubernetes","opa gatekeeper","comparison"],"doc-persona":["kubewarden-all"],"doc-type":["explanation"],"doc-topic":["explanations","kubewarden-vs-opa_gatekeeper"]},"sidebar":"docs","previous":{"title":"Distributing policies","permalink":"/next/explanations/distributing-policies"},"next":{"title":"Audit Scanner","permalink":"/next/explanations/audit-scanner/"}}');var s=i(74848),o=i(28453);const r={sidebar_label:"Kubewarden vs OPA Gatekeeper",title:"Kubewarden vs OPA Gatekeeper",description:"A brief comparison of the difference between Kubewarden and OPA Gatekeeper.",keywords:["kubewarden","kubernetes","opa gatekeeper","comparison"],"doc-persona":["kubewarden-all"],"doc-type":["explanation"],"doc-topic":["explanations","kubewarden-vs-opa_gatekeeper"]},a=void 0,c={},d=[{value:"Types of policies",id:"types-of-policies",level:2},{value:"Writing policies",id:"writing-policies",level:2},{value:"Context aware",id:"context-aware",level:2},{value:"Kubernetes integration",id:"kubernetes-integration",level:2},{value:"Policy distribution",id:"policy-distribution",level:2},{value:"CI/CD integration",id:"cicd-integration",level:2},{value:"Policy enforcement modes",id:"policy-enforcement-modes",level:2},{value:"Deployment mode",id:"deployment-mode",level:2},{value:"Background checks",id:"background-checks",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/explanations/comparisons/opa-comparison"})}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsx)(n.p,{children:"This page is from August 2023. Both projects may have evolved\nsince then."}),(0,s.jsxs)(n.p,{children:["If you find something is missing or inaccurate, please\n",(0,s.jsx)(n.a,{href:"https://github.com/kubewarden/docs/",children:"file an issue"}),"\nor open a PR using the link at the bottom of the page."]})]}),"\n",(0,s.jsx)(n.p,{children:"Both OPA Gatekeeper and Kubewarden are open source projects, and part of CNCF."}),"\n",(0,s.jsx)(n.p,{children:"This table provides a comparison between OPA Gatekeeper and Kubewarden. Topics\nrequiring more information have links to further explanation."}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{}),(0,s.jsx)(n.th,{children:"OPA Gatekeeper"}),(0,s.jsx)(n.th,{children:"Kubewarden"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"Validation"}),(0,s.jsx)(n.td,{children:"\u2705"}),(0,s.jsx)(n.td,{children:"\u2705"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"Mutation"}),(0,s.jsx)(n.td,{children:"\u2705"}),(0,s.jsx)(n.td,{children:"\u2705"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["Policy language ",(0,s.jsx)(n.a,{href:"#writing-policies",children:"[1]"})]}),(0,s.jsx)(n.td,{children:"Rego"}),(0,s.jsx)(n.td,{children:"Rego, CEL, Go, Rust,..."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["Context aware ",(0,s.jsx)(n.a,{href:"#context-aware",children:"[2]"})]}),(0,s.jsx)(n.td,{children:"\u2705"}),(0,s.jsx)(n.td,{children:"\u2705"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["Kubernetes integration ",(0,s.jsx)(n.a,{href:"#kubernetes-integration",children:"[3]"})]}),(0,s.jsx)(n.td,{children:"cluster wide CRD"}),(0,s.jsx)(n.td,{children:"cluster wide and namespaced CRDs"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["Policy distribution ",(0,s.jsx)(n.a,{href:"#policy-distribution",children:"[4]"})]}),(0,s.jsx)(n.td,{children:"embedded into Kubernetes CR"}),(0,s.jsx)(n.td,{children:"Container registry, or embeded into Kubernetes CR (CEL)"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["CI/CD integration ",(0,s.jsx)(n.a,{href:"#cicd-integration",children:"[5]"})]}),(0,s.jsx)(n.td,{children:"\u2705"}),(0,s.jsx)(n.td,{children:"\u2705"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"Policy enforcement modes"}),(0,s.jsx)(n.td,{children:"deny, warn"}),(0,s.jsx)(n.td,{children:"deny, warn"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["Deployment mode ",(0,s.jsx)(n.a,{href:"#deployment-mode",children:"[6]"})]}),(0,s.jsx)(n.td,{children:"single evaluation server"}),(0,s.jsx)(n.td,{children:"multiple evaluation servers"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:["Background checks ",(0,s.jsx)(n.a,{href:"#background-checks",children:"[7]"})]}),(0,s.jsx)(n.td,{children:"\u2705"}),(0,s.jsx)(n.td,{children:"\u2705"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"types-of-policies",children:"Types of policies"}),"\n",(0,s.jsx)(n.p,{children:"Both OPA Gatekeeper and Kubernetes can write validation and mutation policies."}),"\n",(0,s.jsx)(n.p,{children:"These policies can target any kind of Kubernetes resource, including Custom\nResources."}),"\n",(0,s.jsx)(n.h2,{id:"writing-policies",children:"Writing policies"}),"\n",(0,s.jsxs)(n.p,{children:["You write OPA Gatekeeper policies using\n",(0,s.jsx)(n.a,{href:"https://www.openpolicyagent.org/docs/latest/#rego",children:"Rego"}),". Rego is a query\nlanguage created by the Open Policy Agent project."]}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["You can only use Rego to write validating policies. Mutating policies don't\nuse Rego, instead using ad-hoc rules defined in YAML (see\n",(0,s.jsx)(n.a,{href:"https://open-policy-agent.github.io/gatekeeper/website/docs/mutation",children:"here"}),")."]})}),"\n",(0,s.jsxs)(n.p,{children:["You can write Kubewarden policies using different paradigms. Policy\nauthors can use both traditional programming languages (like Go, Rust and\nothers) or ",(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Domain-specific_language",children:"Domain Specific\nLanguages"})," like Rego\nand CEL. In Kubewarden, you write validating and mutating policies the same\nway."]}),"\n",(0,s.jsxs)(n.admonition,{type:"caution",children:[(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"https://github.com/open-policy-agent/kube-mgmt",children:"kube-mgmt"})," open source\nproject, part of the Open Policy Agent project, uses Rego."]}),(0,s.jsx)(n.p,{children:"Despite using the same language, policies written for kube-mgmt aren't\ncompatible with OPA Gatekeeper and vice versa."}),(0,s.jsxs)(n.p,{children:["Kubewarden can use Rego policies written for both Open Policy\nAgent and for OPA Gatekeeper. More information is\n",(0,s.jsx)(n.a,{href:"https://docs.kubewarden.io/writing-policies/rego/intro-rego",children:"here"}),"."]})]}),"\n",(0,s.jsx)(n.h2,{id:"context-aware",children:"Context aware"}),"\n",(0,s.jsx)(n.p,{children:'Sometimes a policy needs data about the current state of the cluster to make a\nvalidation or mutation decision. For example, a policy validating Ingress\nresources might need to know other Ingress resources already defined in\nthe cluster to ensure no clashes happen. These kind of policies are called\n"context aware".'}),"\n",(0,s.jsx)(n.p,{children:"Both OPA Gatekeeper and Kubewarden support these types of policies."}),"\n",(0,s.jsx)(n.p,{children:"When deploying OPA Gatekeeper, a Kubernetes administrator decides which type of\ncluster data to make available to policies at evaluation time."}),"\n",(0,s.jsx)(n.p,{children:"It's important to highlight how this data is then accessible by all the\npolicies deployed."}),"\n",(0,s.jsx)(n.p,{children:"For example, if an OPA Gatekeeper policy requires access to Kubernetes Secrets,\nall the other policies deployed are able to read this data as well."}),"\n",(0,s.jsx)(n.p,{children:"Conversely, Kubewarden provides a granular access to cluster resources.\nEach policy has access only to the resources that the Kubernetes administrator\nspecifies. Attempting to read unauthorized data is immediately blocked and\nreported to the cluster administrators."}),"\n",(0,s.jsx)(n.h2,{id:"kubernetes-integration",children:"Kubernetes integration"}),"\n",(0,s.jsx)(n.p,{children:"OPA Gatekeeper has a cluster wide Custom Resource, permitting policy definition,\nand how and where to enforce them."}),"\n",(0,s.jsxs)(n.p,{children:["Kubewarden has two different types of Custom Resources used to declare\npolicies. One works at the Cluster level, the other is namespaced. The name of\nthe namespaced Custom Resource is ",(0,s.jsx)(n.code,{children:"AdmissionPolicy"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Policies deployed via a ",(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," resource affect only the resources\ncreated within the namespace they belong to. Because of that, you can allow\nnon-admin Kubernetes users to have the RBAC privileges necessary to manage\n",(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," resources, in the namespaces they can access."]}),"\n",(0,s.jsx)(n.p,{children:"This allows Kubernetes administrators to delegate policy-related work."}),"\n",(0,s.jsx)(n.h2,{id:"policy-distribution",children:"Policy distribution"}),"\n",(0,s.jsx)(n.p,{children:"OPA Gatekeeper and Kubewarden policies have policy source code (Rego for OPA\nGatekeeper, CEL for Kubewarden) in the Custom Resource defining a policy in\nKubernetes."}),"\n",(0,s.jsx)(n.p,{children:"Also, Kubewarden policies can have the source code of the policy managed like\ncontainer images (for Rego, Go, Rust, ...). Once built, they're pushed into\ncontainer registries as OCI artifacts."}),"\n",(0,s.jsxs)(n.p,{children:["You can sign and verify Kubewarden policies using container image tools like\n",(0,s.jsx)(n.code,{children:"cosign"}),", from the ",(0,s.jsx)(n.a,{href:"https://sigstore.dev",children:"Sigstore project"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"You can distribute Kubewarden policies among geographically distributed\ncontainer registries using the traditional tools and processes adopted for\ncontainer images."}),"\n",(0,s.jsx)(n.h2,{id:"cicd-integration",children:"CI/CD integration"}),"\n",(0,s.jsx)(n.p,{children:"Both OPA Gatekeeper and Kubewarden are managed using GitOps methodologies."}),"\n",(0,s.jsx)(n.p,{children:"However, for OPA Gatekeeper, there's a coupling between the\npolicy's Rego code and the Custom Resource used to deploy it\nin Kubernetes. This introduces extra steps in CI/CD pipelines."}),"\n",(0,s.jsxs)(n.p,{children:["Rego has\n",(0,s.jsx)(n.a,{href:"https://www.openpolicyagent.org/docs/latest/policy-testing/",children:"testing tools"}),"\nallowing the creation of unit test suites. Writing tests and executing them in\na CI/CD pipeline is essential to ensure policies behave as expected."]}),"\n",(0,s.jsx)(n.p,{children:"To use these testing tools, the source code of the policy must be available in\ndedicated text files. It's impossible to read the source code from the YAML\nfiles used to declare the OPA Gatekeeper policy. The CI/CD pipeline must\nsynchronize the Rego source code to test with the code defined in the\nOPA Gatekeeper Custom Resource. You can do this using third party tools."}),"\n",(0,s.jsx)(n.p,{children:"Kubewarden policies have CI/CD pipelines like traditional microservices.\nUsually their source code lives in a Git repository and then, using traditional\nCI/CD systems, unit tests run against it. You write unit tests using the\ntesting frameworks of the language used to write the policy. Once all the tests\npass, you compile the policy to WebAssembly and push it to a container\nregistry. This kind of pipeline is usually maintained by the policy author."}),"\n",(0,s.jsxs)(n.p,{children:["Kubernetes administrators typically maintain other automation pipelines that\nreact to new releases of the policy (using automation tools like\n",(0,s.jsx)(n.a,{href:"https://docs.github.com/en/code-security/dependabot/working-with-dependabot",children:"Dependabot"}),",\n",(0,s.jsx)(n.a,{href:"https://www.mend.io/renovate/",children:"Renovate bot"}),",\n",(0,s.jsx)(n.a,{href:"https://www.updatecli.io/",children:"updatecli"})," and others), or to changes to the policy\nconfiguration."]}),"\n",(0,s.jsxs)(n.p,{children:["The pipeline tests the policy against different types of requests. You can do\nthe testing using the ",(0,s.jsx)(n.a,{href:"https://github.com/kubewarden/kwctl",children:"kwctl"})," CLI tool,\nwithout requiring a running Kubernetes cluster. kwctl uses the same evaluation\nengine used by the Kubewarden stack deployed in a Kubernetes cluster."]}),"\n",(0,s.jsx)(n.h2,{id:"policy-enforcement-modes",children:"Policy enforcement modes"}),"\n",(0,s.jsx)(n.p,{children:"Both OPA Gatekeeper and Kubewarden can deploy policies using two different\noperation modes:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"deny"}),": violation of a policy rejects the request."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"warn"}),": violation of a policy doesn't cause rejection. You can log violation\nfor auditing purposes."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"deployment-mode",children:"Deployment mode"}),"\n",(0,s.jsxs)(n.p,{children:["The same server evaluates all the OPA Gatekeeper policies. Conversely,\nKubewarden allows definition of multiple evaluation servers. You define these\nservers by a Custom Resource called ",(0,s.jsx)(n.code,{children:"PolicyServer"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["When declaring a Kubewarden policy, the Kubernetes administrator decides which\n",(0,s.jsx)(n.code,{children:"PolicyServer"})," hosts it."]}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"PolicyServer"})," object is a high level abstraction introduced by Kubewarden.\nBehind the scenes a ",(0,s.jsx)(n.code,{children:"Deployment"})," with a specific replica size gets created."]}),(0,s.jsxs)(n.p,{children:["Each ",(0,s.jsx)(n.code,{children:"PolicyServer"})," can have a different replica size from others."]})]}),"\n",(0,s.jsx)(n.p,{children:"This allows interesting scenarios like the following ones:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Deploy critical policies to a dedicated Policy Server pool."}),"\n",(0,s.jsx)(n.li,{children:"Deploy the policies of a noisy tenant to a dedicated Policy Server pool."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"background-checks",children:"Background checks"}),"\n",(0,s.jsx)(n.p,{children:"As policies are added, removed, and reconfigured the resources already in\nthe cluster might become non-compliant."}),"\n",(0,s.jsx)(n.p,{children:"Both OPA Gatekeeper and Kubewarden have a scanner that operates in the background.\nThis scanner evaluates resources already defined in\nthe cluster and flags non-compliant ones."}),"\n",(0,s.jsx)(n.p,{children:"The only difference between OPA Gatekeeper and Kubewarden is how the scanner\nresults get saved."}),"\n",(0,s.jsxs)(n.p,{children:["OPA Gatekeeper adds the violation details to the ",(0,s.jsx)(n.code,{children:"status"})," field of a given\n",(0,s.jsx)(n.code,{children:"Constraint"})," Custom Resource (see\n",(0,s.jsx)(n.a,{href:"https://open-policy-agent.github.io/gatekeeper/website/docs/audit#constraint-status",children:"here"}),")."]}),"\n",(0,s.jsxs)(n.p,{children:["Kubewarden instead stores the results in a set of the Policy Report\nCustom Resources defined by the ",(0,s.jsx)(n.a,{href:"https://github.com/kubernetes-sigs/wg-policy-prototypes/tree/master/policy-report",children:"Policy Report working\ngroup"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>a});var t=i(96540);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);