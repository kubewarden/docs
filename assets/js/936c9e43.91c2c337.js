"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[7576],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),m=i,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||r;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9384:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_label:"Kubewarden vs OPA Gatekeeper",title:"Kubewarden vs OPA Gatekeeper"},o=void 0,l={unversionedId:"explanations/opa-comparison",id:"version-1.7/explanations/opa-comparison",title:"Kubewarden vs OPA Gatekeeper",description:"This page has been written during August 2023. Both projects might have evolved",source:"@site/versioned_docs/version-1.7/explanations/opa-comparison.md",sourceDirName:"explanations",slug:"/explanations/opa-comparison",permalink:"/1.7/explanations/opa-comparison",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/explanations/opa-comparison.md",tags:[],version:"1.7",lastUpdatedAt:1699005473,formattedLastUpdatedAt:"Nov 3, 2023",frontMatter:{sidebar_label:"Kubewarden vs OPA Gatekeeper",title:"Kubewarden vs OPA Gatekeeper"},sidebar:"docs",previous:{title:"Context aware policies",permalink:"/1.7/explanations/context-aware-policies"},next:{title:"What is the Audit Scanner?",permalink:"/1.7/explanations/audit-scanner/"}},s={},p=[{value:"Types of policies",id:"types-of-policies",level:2},{value:"Writing policies",id:"writing-policies",level:2},{value:"Context aware",id:"context-aware",level:2},{value:"Kubernetes integration",id:"kubernetes-integration",level:2},{value:"Policy distribution",id:"policy-distribution",level:2},{value:"CI/CD integration",id:"cicd-integration",level:2},{value:"Policy enforcement modes",id:"policy-enforcement-modes",level:2},{value:"Deployment mode",id:"deployment-mode",level:2},{value:"Background checks",id:"background-checks",level:2}],d={toc:p},c="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"This page has been written during August 2023. Both projects might have evolved\nsince then."),(0,i.kt)("p",{parentName:"admonition"},"If you find something is missing or inaccurate, please\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/docs/"},"file an issue"),"\nor open a PR using the link at the bottom of the page.")),(0,i.kt)("p",null,"Both OPA Gatekeeper and Kubewarden are open source projects, and part of CNCF."),(0,i.kt)("p",null,"This table provides a comparison between OPA Gatekeeper and Kubewarden. Topics requiring more information have links to further explanation."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null}),(0,i.kt)("th",{parentName:"tr",align:null},"OPA Gatekeeper"),(0,i.kt)("th",{parentName:"tr",align:null},"Kubewarden"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Validation"),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705"),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Mutation"),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705"),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Policy language ",(0,i.kt)("a",{parentName:"td",href:"#writing-policies"},"[1]")),(0,i.kt)("td",{parentName:"tr",align:null},"Rego"),(0,i.kt)("td",{parentName:"tr",align:null},"Rego, Go, Rust,...")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Context aware ",(0,i.kt)("a",{parentName:"td",href:"#context-aware"},"[2]")),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705"),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Kubernetes integration ",(0,i.kt)("a",{parentName:"td",href:"#kubernetes-integration"},"[3]")),(0,i.kt)("td",{parentName:"tr",align:null},"cluster wide CRD"),(0,i.kt)("td",{parentName:"tr",align:null},"cluster wide and namespaced CRDs")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Policy distribution ",(0,i.kt)("a",{parentName:"td",href:"#policy-distribution"},"[4]")),(0,i.kt)("td",{parentName:"tr",align:null},"embedded into Kubernetes CR"),(0,i.kt)("td",{parentName:"tr",align:null},"Container registry")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"CI/CD integration ",(0,i.kt)("a",{parentName:"td",href:"#cicd-integration"},"[5]")),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705"),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Policy enforcement modes"),(0,i.kt)("td",{parentName:"tr",align:null},"deny, warn"),(0,i.kt)("td",{parentName:"tr",align:null},"deny, warn")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Deployment mode ",(0,i.kt)("a",{parentName:"td",href:"#deployment-mode"},"[6]")),(0,i.kt)("td",{parentName:"tr",align:null},"single evaluation server"),(0,i.kt)("td",{parentName:"tr",align:null},"multiple evaluation servers")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Background checks ",(0,i.kt)("a",{parentName:"td",href:"#background-checks"},"[7]")),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705"),(0,i.kt)("td",{parentName:"tr",align:null},"\u2705")))),(0,i.kt)("h2",{id:"types-of-policies"},"Types of policies"),(0,i.kt)("p",null,"Both OPA Gatekeeper and Kubernetes can write validation and mutation policies."),(0,i.kt)("p",null,"These policies can target any kind of Kubernetes resource, including Custom Resources."),(0,i.kt)("h2",{id:"writing-policies"},"Writing policies"),(0,i.kt)("p",null,"OPA Gatekeeper policies are written using ",(0,i.kt)("a",{parentName:"p",href:"https://www.openpolicyagent.org/docs/latest/#rego"},"Rego"),".\nRego is a query language created by the Open Policy Agent project."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Rego can only be used to write validating policies. Mutating policies do not\nuse Rego, instead using ad-hoc rules defined in YAML (see ",(0,i.kt)("a",{parentName:"p",href:"https://open-policy-agent.github.io/gatekeeper/website/docs/mutation"},"here"),").")),(0,i.kt)("p",null,"Kubewarden allows policies to be written using different paradigms. Policy authors\ncan use both traditional programming languages (like Go, Rust and others) or ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Domain-specific_language"},"Domain Specific Languages")," like Rego.\nKubewarden's validating and mutating policies are written in the same way."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Rego is used by the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/open-policy-agent/kube-mgmt"},"kube-mgmt"),"\nopen source project, which is part of the Open Policy Agent project."),(0,i.kt)("p",{parentName:"admonition"},"Despite using the same language, policies written for kube-mgmt are\nnot compatible with OPA Gatekeeper and vice versa."),(0,i.kt)("p",{parentName:"admonition"},"Kubewarden can use Rego policies that have been written for both Open Policy Agent and\nfor OPA Gatekeeper. More information is ",(0,i.kt)("a",{parentName:"p",href:"https://docs.kubewarden.io/writing-policies/rego/intro-rego"},"here"),".")),(0,i.kt)("h2",{id:"context-aware"},"Context aware"),(0,i.kt)("p",null,'Sometimes a policy needs data about the current state of the cluster to make a\nvalidation/mutation decision. For example, a policy validating Ingress resources might\nneed to know the other Ingress resources already defined inside of the cluster\nto ensure no clashes happen.\nThese kind of policies are called "context aware".'),(0,i.kt)("p",null,"Both OPA Gatekeeper and Kubewarden support these types of policies."),(0,i.kt)("p",null,"When deploying OPA Gatekeeper, a Kubernetes administrator decides which type of\ncluster data should be made available to the policies at evaluation time."),(0,i.kt)("p",null,"It's important to highlight how this data is then accessible by all the policies\ndeployed."),(0,i.kt)("p",null,"For example, if an OPA Gatekeeper policy requires access to Kubernetes Secrets,\nall the other policies being deployed will be able to read this data as well."),(0,i.kt)("p",null,"On the other hand, Kubewarden provides a granular access to cluster resources.\nEach policy has access only to the resources that the Kubernetes administrator\nspecified. Attempting to read unauthorized data is immediately blocked and\nreported to the cluster administrators."),(0,i.kt)("h2",{id:"kubernetes-integration"},"Kubernetes integration"),(0,i.kt)("p",null,"OPA Gatekeeper has a cluster wide Custom Resource that allows policy definition\nand how and where to enforce them."),(0,i.kt)("p",null,"Kubewarden has two different types of Custom Resources used\nto declare policies. One works at the Cluster level, the other is namespaced.\nThe namespaced Custom Resource is called ",(0,i.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy"),"."),(0,i.kt)("p",null,"Policies deployed via a ",(0,i.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," resource affect only the resources\ncreated within the Namespace they belong to.\nBecause of that, non-admin Kubernetes users could be allowed\nthe RBAC privileges to manage ",(0,i.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," resources inside of the\nNamespaces they have access to."),(0,i.kt)("p",null,"This allows Kubernetes administrators to delegate some policy-related work."),(0,i.kt)("h2",{id:"policy-distribution"},"Policy distribution"),(0,i.kt)("p",null,"The source code of the policy (the Rego code) has to be written inside\nthe Custom Resource that defines a policy inside Kubernetes."),(0,i.kt)("p",null,"Kubewarden policies are managed like container images. Once built, they are pushed\ninto container registries as OCI artifacts."),(0,i.kt)("p",null,"Kubewarden policies can be signed and verified using container image tools\nlike ",(0,i.kt)("inlineCode",{parentName:"p"},"cosign"),", from the ",(0,i.kt)("a",{parentName:"p",href:"https://sigstore.dev"},"Sigstore project"),"."),(0,i.kt)("p",null,"Kubewarden policies can be distributed among geographically distributed container\nregistries using the traditional tools and processes adopted for container images."),(0,i.kt)("h2",{id:"cicd-integration"},"CI/CD integration"),(0,i.kt)("p",null,"Both OPA Gatekeeper and Kubewarden can be managed using GitOps methodologies."),(0,i.kt)("p",null,"However, in the context of OPA Gatekeeper, there's a coupling between the policy's source code\n(the Rego code) and the Custom Resource used to deploy it inside of Kubernetes.\nThis introduces extra steps inside of CI/CD pipelines."),(0,i.kt)("p",null,"Rego has ",(0,i.kt)("a",{parentName:"p",href:"https://www.openpolicyagent.org/docs/latest/policy-testing/"},"testing tools"),"\nthat allow the creation of unit test suites. Writing tests and executing them inside\na CI/CD pipeline is essential to ensure policies behave as expected."),(0,i.kt)("p",null,"To use these testing tools, the source code of the policy must be made available\ninside of dedicated text files. It's not possible to read the source code from the YAML\nfiles used to declare the OPA Gatekeeper policy.\nThe CI/CD pipeline must keep in sync the Rego source code being tested with the code\ndefined inside of the OPA Gatekeeper Custom Resource. This can be done using some 3rd\nparty tools."),(0,i.kt)("p",null,"Kubewarden policies have CI/CD pipelines like traditional microservices.\nUsually their source code lives inside a Git repository and then, using\ntraditional CI/CD systems, unit tests are ran against it. The unit tests are\nwritten using the testing frameworks of the language used to write the policy.\nOnce all the tests pass the policy is compiled to WebAssembly and pushed\nto a container registry.\nThis kind of pipeline is usually maintained by the policy author."),(0,i.kt)("p",null,"Kubernetes administrators typically maintain other automation pipelines that react to\nnew releases of the policy (leveraging automation tools like\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/code-security/dependabot/working-with-dependabot"},"Dependabot"),",\n",(0,i.kt)("a",{parentName:"p",href:"https://www.mend.io/renovate/"},"Renovate bot"),",\n",(0,i.kt)("a",{parentName:"p",href:"https://www.updatecli.io/"},"updatecli")," and others), or to changes to the\npolicy configuration."),(0,i.kt)("p",null,"The pipeline tests the policy against different types of requests. The testing can be done using\nthe ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kwctl"},"kwctl")," cli tool, without requiring a running\nKubernetes cluster. kwctl uses the same evaluation engine used by the Kubewarden stack deployed\ninside of a Kubernetes cluster."),(0,i.kt)("h2",{id:"policy-enforcement-modes"},"Policy enforcement modes"),(0,i.kt)("p",null,"Both OPA Gatekeeper and Kubewarden can deploy policies using two different operation modes:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"deny"),": violation of a policy causes the request to be rejected"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"warn"),": violation of a policy does not cause rejection. The\nviolation is logged for auditing purposes")),(0,i.kt)("h2",{id:"deployment-mode"},"Deployment mode"),(0,i.kt)("p",null,"All the OPA Gatekeeper policies are evaluated by the same server.\nOn the other hand, Kubewarden allows multiple evaluation servers to be defined.\nThese servers are defined by a Custom Resource called ",(0,i.kt)("inlineCode",{parentName:"p"},"PolicyServer"),"."),(0,i.kt)("p",null,"When declaring a Kubewarden policy, the Kubernetes administrator decides\nwhich ",(0,i.kt)("inlineCode",{parentName:"p"},"PolicyServer")," will host it."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"PolicyServer")," object is a high level abstraction introduced by Kubewarden.\nBehind the scenes a ",(0,i.kt)("inlineCode",{parentName:"p"},"Deployment")," with a specific replica size is created."),(0,i.kt)("p",{parentName:"admonition"},"Each ",(0,i.kt)("inlineCode",{parentName:"p"},"PolicyServer")," can have a different replica size from others.")),(0,i.kt)("p",null,"This allows interesting scenarios like the following ones:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Deploy critical policies to a dedicated Policy Server pool"),(0,i.kt)("li",{parentName:"ul"},"Deploy the policies of a noisy tenant to a dedicated Policy Server pool")),(0,i.kt)("h2",{id:"background-checks"},"Background checks"),(0,i.kt)("p",null,"As policies are added, removed, and reconfigured the resources already inside\nof the cluster might become non-compliant."),(0,i.kt)("p",null,"Both OPA Gatekeeper and Kubewarden have a scanner that operates in the background.\nThis scanner evaluates resources already defined inside\nthe cluster and flags non-compliant ones."),(0,i.kt)("p",null,"The only difference between OPA Gatekeeper and Kubewarden is how the scanner results\nare saved."),(0,i.kt)("p",null,"OPA Gatekeeper adds the violation details to the ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," field of a given ",(0,i.kt)("inlineCode",{parentName:"p"},"Constraint"),"\nCustom Resource (see ",(0,i.kt)("a",{parentName:"p",href:"https://open-policy-agent.github.io/gatekeeper/website/docs/audit#constraint-status"},"here"),")."),(0,i.kt)("p",null,"Kubewarden instead stores the results inside of a set of the Policy Report\nCustom Resources defined by the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/wg-policy-prototypes/tree/master/policy-report"},"Policy Report working group"),"."))}u.isMDXComponent=!0}}]);