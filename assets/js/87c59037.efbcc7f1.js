"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[38836],{3797:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>l,toc:()=>d});var s=i(85893),r=i(11151);const t={sidebar_label:"Quick start",sidebar_position:20,title:"Quick start",description:"Getting started with Kubewarden, installing the Kubewarden stack and taking care of prerequisites and authentication",keywords:["Kubewarden","installation","quick start","policyserver","clusteradmissionpolicy","admissionpolicy"],"doc-persona":["kubewarden-all"],"doc-type":["tutorial"],"doc-topic":["quick-start"]},o=void 0,l={id:"quick-start",title:"Quick start",description:"Getting started with Kubewarden, installing the Kubewarden stack and taking care of prerequisites and authentication",source:"@site/versioned_docs/version-1.11/quick-start.md",sourceDirName:".",slug:"/quick-start",permalink:"/1.11/quick-start",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.11/quick-start.md",tags:[],version:"1.11",lastUpdatedAt:1726840766e3,sidebarPosition:20,frontMatter:{sidebar_label:"Quick start",sidebar_position:20,title:"Quick start",description:"Getting started with Kubewarden, installing the Kubewarden stack and taking care of prerequisites and authentication",keywords:["Kubewarden","installation","quick start","policyserver","clusteradmissionpolicy","admissionpolicy"],"doc-persona":["kubewarden-all"],"doc-type":["tutorial"],"doc-topic":["quick-start"]},sidebar:"docs",previous:{title:"Introduction",permalink:"/1.11/"},next:{title:"Writing Policies",permalink:"/1.11/tutorials/writing-policies/"}},c={},d=[{value:"Installation",id:"installation",level:2},{value:"Main components",id:"main-components",level:2},{value:"PolicyServer",id:"policyserver",level:3},{value:"ClusterAdmissionPolicy",id:"clusteradmissionpolicy",level:3},{value:"AdmissionPolicy",id:"admissionpolicy",level:3},{value:"Example: Enforce your first policy",id:"example-enforce-your-first-policy",level:2},{value:"Uninstall",id:"uninstall",level:2},{value:"Wrapping up",id:"wrapping-up",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function a(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/quick-start"})}),"\n",(0,s.jsx)(n.p,{children:"The Kubewarden stack comprises:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Some ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resources: this is how policies are defined for Kubernetes clusters"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Some ",(0,s.jsx)(n.code,{children:"PolicyServer"})," resources: representing a deployment of a Kubewarden ",(0,s.jsx)(n.code,{children:"PolicyServer"}),". Your administrator's policies are loaded and evaluated by the Kubewarden ",(0,s.jsx)(n.code,{children:"PolicyServer"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Some ",(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," resources: policies for a defined namespace"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["A deployment of a ",(0,s.jsx)(n.code,{children:"kubewarden-controller"}),": this controller monitors the ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resources and interacts with the Kubewarden ",(0,s.jsx)(n.code,{children:"PolicyServer"})," components."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["The Kubernetes Custom Resource Definitions (CRD) defined by Kubewarden are described ",(0,s.jsx)(n.a,{href:"/1.11/reference/CRDs",children:"here"}),"."]})}),"\n",(0,s.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsxs)(n.admonition,{title:"Prerequisites",type:"info",children:[(0,s.jsxs)(n.p,{children:["The Helm chart depends on ",(0,s.jsx)(n.code,{children:"cert-manager"}),". Ensure you install ",(0,s.jsx)(n.a,{href:"https://cert-manager.io/docs/installation/",children:(0,s.jsx)(n.code,{children:"cert-manager"})})," ",(0,s.jsx)(n.em,{children:"before"})," the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," chart."]}),(0,s.jsxs)(n.p,{children:["You can install the latest version of ",(0,s.jsx)(n.code,{children:"cert-manager"})," through Helm by running the following commands:"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm repo add jetstack https://charts.jetstack.io\n\nhelm install --wait --namespace cert-manager --create-namespace \\\n\t--set installCRDs=true cert-manager jetstack/cert-manager\n"})})]}),"\n",(0,s.jsxs)(n.admonition,{title:"Authentication",type:"info",children:[(0,s.jsxs)(n.p,{children:["Kubewarden policies can be retrieved from the GitHub container registry at ",(0,s.jsx)(n.a,{href:"https://ghcr.io",children:"https://ghcr.io"}),".\nYou need authentication to use the repository with the Kubewarden CLI, a ",(0,s.jsx)(n.a,{href:"https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",children:"GitHub personal access token"})," (PAT).\nTheir documentation guides you through creating one if you have not already done so.\nThen you authenticate with a command like:"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"echo $PAT | docker login ghcr.io --username <my-gh-username> --password-stdin\n"})})]}),"\n",(0,s.jsxs)(n.p,{children:["Deploy the Kubewarden stack using ",(0,s.jsx)(n.code,{children:"helm"})," charts as follows:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm repo add kubewarden https://charts.kubewarden.io\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm repo update kubewarden\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Install the following Helm charts inside the ",(0,s.jsx)(n.code,{children:"kubewarden"})," namespace in your Kubernetes cluster:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"kubewarden-crds"}),", which will register the ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"}),",\n",(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," and ",(0,s.jsx)(n.code,{children:"PolicyServer"})," Custom Resource Definitions.  As well as\nthe ",(0,s.jsx)(n.code,{children:"PolicyReport"})," Custom Resource Definitions used by the audit scanner"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"kubewarden-controller"}),", which will install the Kubewarden controller and the\naudit scanner"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["If you want to disable the audit scanner component. Please check out the audit\nscanner installation ",(0,s.jsx)(n.a,{href:"../howtos/audit-scanner",children:"docs page"}),"."]})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"kubewarden-defaults"}),", which will create a ",(0,s.jsx)(n.code,{children:"PolicyServer"})," resource named ",(0,s.jsx)(n.code,{children:"default"}),". It can also install a set of\nrecommended policies to secure your cluster by enforcing some well known best practices."]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm install --wait -n kubewarden --create-namespace kubewarden-crds kubewarden/kubewarden-crds\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm install --wait -n kubewarden kubewarden-defaults kubewarden/kubewarden-defaults\n"})}),"\n",(0,s.jsxs)(n.admonition,{type:"caution",children:[(0,s.jsxs)(n.p,{children:["Since ",(0,s.jsx)(n.a,{href:"https://github.com/kubewarden/kubewarden-controller/releases/tag/v0.4.0",children:(0,s.jsx)(n.code,{children:"v0.4.0"})}),", a ",(0,s.jsx)(n.code,{children:"PolicyServer"})," resource named ",(0,s.jsx)(n.code,{children:"default"})," will not be created using the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," chart.\nNow a Helm chart called ",(0,s.jsx)(n.code,{children:"kubewarden-defaults"}),", installs\nthe default policy server."]}),(0,s.jsxs)(n.p,{children:["This means that if you are not using the latest version of the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," and are trying to upgrade or delete,\nyour default policy server will not be upgraded or deleted.\nSo, you might run into issues if you try to install the ",(0,s.jsx)(n.code,{children:"kubewarden-defaults"})," with some conflicting information, for example, the same policy server name.\nTo be able to take advantage of future upgrades in the ",(0,s.jsx)(n.code,{children:"kubewarden-defaults"})," Helm chart remove the\nexisting ",(0,s.jsx)(n.code,{children:"PolicyServer"})," resource created by the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," before installing the new chart.\nNow you can update your policy server using Helm upgrades without resource conflicts.\nWhen you remove the ",(0,s.jsx)(n.code,{children:"PolicyServer"}),", all the policies bound to it will be removed as well."]})]}),"\n",(0,s.jsxs)(n.p,{children:["The default configuration values are sufficient for most deployments. All options are documented ",(0,s.jsx)(n.a,{href:"https://charts.kubewarden.io/#configuration",children:"here"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"main-components",children:"Main components"}),"\n",(0,s.jsx)(n.p,{children:"Kubewarden has three main components which you will interact with:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"The PolicyServer"}),"\n",(0,s.jsx)(n.li,{children:"The ClusterAdmissionPolicy"}),"\n",(0,s.jsx)(n.li,{children:"The AdmissionPolicy"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"policyserver",children:"PolicyServer"}),"\n",(0,s.jsxs)(n.p,{children:["A Kubewarden ",(0,s.jsx)(n.code,{children:"PolicyServer"})," is managed by the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," and multiple ",(0,s.jsx)(n.code,{children:"PolicyServers"})," can be deployed in the same Kubernetes cluster."]}),"\n",(0,s.jsxs)(n.p,{children:["A ",(0,s.jsx)(n.code,{children:"PolicyServer"})," validates incoming requests by executing Kubewarden policies against them."]}),"\n",(0,s.jsxs)(n.p,{children:["This is the default ",(0,s.jsx)(n.code,{children:"PolicyServer"})," configuration:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"apiVersion: policies.kubewarden.io/v1\nkind: PolicyServer\nmetadata:\n  name: reserved-instance-for-tenant-a\nspec:\n  image: ghcr.io/kubewarden/policy-server:v1.3.0\n  replicas: 2\n  serviceAccountName: ~\n  env:\n  - name: KUBEWARDEN_LOG_LEVEL\n    value: debug\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Check the ",(0,s.jsxs)(n.a,{href:"https://github.com/kubewarden/policy-server/pkgs/container/policy-server",children:["latest released ",(0,s.jsx)(n.code,{children:"PolicyServer"})," version"]})," and change the tag to match."]})}),"\n",(0,s.jsxs)(n.p,{children:["Overview of the attributes of the ",(0,s.jsx)(n.code,{children:"PolicyServer"})," resource:"]}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(n.th,{children:"Placeholder"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"Y"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"image"})}),(0,s.jsx)(n.td,{children:"The name of the container image"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"Y"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"replicas"})}),(0,s.jsx)(n.td,{children:"The number of desired instances"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"serviceAccountName"})}),(0,s.jsxs)(n.td,{children:["The name of the ",(0,s.jsx)(n.code,{children:"ServiceAccount"})," to use for the ",(0,s.jsx)(n.code,{children:"PolicyServer"})," deployment. If no value is provided, the default ",(0,s.jsx)(n.code,{children:"ServiceAccount"})," from the namespace, where the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," is installed, will be used"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"env"})}),(0,s.jsx)(n.td,{children:"The list of environment variables"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"annotations"})}),(0,s.jsx)(n.td,{children:"The list of annotations"})]})]})]}),"\n",(0,s.jsxs)(n.p,{children:["Changing any of these attributes causes a ",(0,s.jsx)(n.code,{children:"PolicyServer"})," deployment with the new configuration."]}),"\n",(0,s.jsx)(n.h3,{id:"clusteradmissionpolicy",children:"ClusterAdmissionPolicy"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resource is the core of the Kubewarden stack. It defines how policies evaluate requests."]}),"\n",(0,s.jsxs)(n.p,{children:["Enforcing policies is the most common operation which a Kubernetes administrator performs.\nYou can declare as many policies as you want, each will target one or more Kubernetes resources (i.e., ",(0,s.jsx)(n.code,{children:"pods"}),", ",(0,s.jsx)(n.code,{children:"Custom Resource"}),").\nYou will also specify the type of operations to be applied to targeted resources.\nThe operations available are ",(0,s.jsx)(n.code,{children:"CREATE"}),", ",(0,s.jsx)(n.code,{children:"UPDATE"}),", ",(0,s.jsx)(n.code,{children:"DELETE"})," and ",(0,s.jsx)(n.code,{children:"CONNECT"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Default ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," configuration:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'apiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-capabilities\nspec:\n  policyServer: reserved-instance-for-tenant-a\n  module: registry://ghcr.io/kubewarden/policies/psp-capabilities:v0.1.9\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n    - UPDATE\n  mutating: true\n  settings:\n    allowed_capabilities:\n    - CHOWN\n    required_drop_capabilities:\n    - NET_ADMIN\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Overview of the attributes of the ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resource:"]}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"center"},children:"Required"}),(0,s.jsx)(n.th,{children:"Placeholder"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"policy-server"})}),(0,s.jsxs)(n.td,{children:["Identifies an existing ",(0,s.jsx)(n.code,{children:"PolicyServer"})," object. The policy will be served only by this ",(0,s.jsx)(n.code,{children:"PolicyServer"})," instance. A ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," that doesn't have an explicit ",(0,s.jsx)(n.code,{children:"PolicyServer"}),", will be served by the one named ",(0,s.jsx)(n.code,{children:"default"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"Y"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"module"})}),(0,s.jsx)(n.td,{children:"The location of the Kubewarden policy. The following schemes are allowed:"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{}),(0,s.jsxs)(n.td,{children:["- ",(0,s.jsx)(n.code,{children:"registry"}),": The policy is downloaded from an ",(0,s.jsx)(n.a,{href:"https://github.com/opencontainers/artifacts",children:"OCI artifacts"})," compliant container registry. Example: ",(0,s.jsx)(n.code,{children:"registry://<OCI registry/policy URL>"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{}),(0,s.jsxs)(n.td,{children:["- ",(0,s.jsx)(n.code,{children:"http"}),", ",(0,s.jsx)(n.code,{children:"https"}),": The policy is downloaded from a regular HTTP(s) server. Example: ",(0,s.jsx)(n.code,{children:"https://<website/policy URL>"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{}),(0,s.jsxs)(n.td,{children:["- ",(0,s.jsx)(n.code,{children:"file"}),": The policy is loaded from a file in the computer file system. Example: ",(0,s.jsx)(n.code,{children:"file:///<policy WASM binary full path>"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"Y"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"resources"})}),(0,s.jsx)(n.td,{children:"The Kubernetes resources evaluated by the policy"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"Y"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"operations"})}),(0,s.jsx)(n.td,{children:"What operations for the previously given types should be forwarded to this admission policy by the API server for evaluation."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"Y"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"mutating"})}),(0,s.jsxs)(n.td,{children:["A boolean value that must be set to ",(0,s.jsx)(n.code,{children:"true"})," for policies that can mutate incoming requests"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"settings"})}),(0,s.jsx)(n.td,{children:"A free-form object that contains the policy configuration values"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"failurePolicy"})}),(0,s.jsx)(n.td,{children:"The action to take if the request evaluated by a policy results in an error. The following options are allowed:"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{}),(0,s.jsxs)(n.td,{children:["- ",(0,s.jsx)(n.code,{children:"Ignore"}),": an error calling the webhook is ignored and the API request is allowed to continue"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"center"},children:"N"}),(0,s.jsx)(n.td,{}),(0,s.jsxs)(n.td,{children:["- ",(0,s.jsx)(n.code,{children:"Fail"}),": an error calling the webhook causes the admission to fail and the API request to be rejected"]})]})]})]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["The  ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resources are registered with a ",(0,s.jsx)(n.code,{children:"*"})," webhook ",(0,s.jsx)(n.code,{children:"scope"}),", which means that registered webhooks will forward all requests matching the given ",(0,s.jsx)(n.code,{children:"resources"})," and ",(0,s.jsx)(n.code,{children:"operations"})," -- either namespaced or cluster-wide resources."]})}),"\n",(0,s.jsx)(n.h3,{id:"admissionpolicy",children:"AdmissionPolicy"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," is a namespace-wide resource.\nThe policy will process only the requests that are targeting the Namespace where the ",(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," is defined.\nOther than that, there are no functional differences between the ",(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," and ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," resources."]}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"AdmissionPolicy"})," requires Kubernetes 1.21.0 or above. This is because we are using the ",(0,s.jsx)(n.code,{children:"kubernetes.io/metadata.name"})," label, which was introduced in Kubernetes 1.21.0"]})}),"\n",(0,s.jsxs)(n.p,{children:["The complete documentation of these Custom Resources can be found ",(0,s.jsx)(n.a,{href:"https://github.com/kubewarden/kubewarden-controller/blob/main/docs/crds/README.asciidoc",children:"here"})," or on ",(0,s.jsx)(n.a,{href:"https://doc.crds.dev/github.com/kubewarden/kubewarden-controller",children:"docs.crds.dev"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"example-enforce-your-first-policy",children:"Example: Enforce your first policy"}),"\n",(0,s.jsxs)(n.p,{children:["We will use the ",(0,s.jsx)(n.a,{href:"https://github.com/kubewarden/pod-privileged-policy",children:(0,s.jsx)(n.code,{children:"pod-privileged"})})," policy.\nWe want to prevent the creation of privileged containers inside our Kubernetes cluster by enforcing this policy."]}),"\n",(0,s.jsxs)(n.p,{children:["Let's define a ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," to do that:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: privileged-pods\nspec:\n  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.2.2\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n    - UPDATE\n  mutating: false\nEOF\n'})}),"\n",(0,s.jsx)(n.p,{children:"This produces the following output:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"clusteradmissionpolicy.policies.kubewarden.io/privileged-pods created\n"})}),"\n",(0,s.jsxs)(n.p,{children:["When a ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," is defined, the status is set to ",(0,s.jsx)(n.code,{children:"pending"}),", and it will force a rollout of the targeted ",(0,s.jsx)(n.code,{children:"PolicyServer"}),".\nIn our example, it's the ",(0,s.jsx)(n.code,{children:"PolicyServer"})," named ",(0,s.jsx)(n.code,{children:"default"}),". You can monitor the rollout by running the following command:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl get clusteradmissionpolicy.policies.kubewarden.io/privileged-pods\n"})}),"\n",(0,s.jsx)(n.p,{children:"You should see the following output:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"NAME              POLICY SERVER   MUTATING   STATUS\nprivileged-pods   default         false      pending\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Once the new policy is ready to be served, the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," will register a ",(0,s.jsx)(n.a,{href:"https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io",children:"ValidatingWebhookConfiguration"})," object."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," status will be set to ",(0,s.jsx)(n.code,{children:"active"})," once the Deployment is done for every ",(0,s.jsx)(n.code,{children:"PolicyServer"})," instance.\nShow ",(0,s.jsx)(n.code,{children:"ValidatingWebhookConfiguration"})," with the following command:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l kubewarden\n"})}),"\n",(0,s.jsx)(n.p,{children:"You should see the following output:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"NAME                          WEBHOOKS   AGE\nclusterwide-privileged-pods   1          9s\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Once the ",(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," is active and the ",(0,s.jsx)(n.code,{children:"ValidatingWebhookConfiguration"})," is registered, you can test the policy."]}),"\n",(0,s.jsxs)(n.p,{children:["First, let's create a Pod with a Container ",(0,s.jsx)(n.em,{children:"not"})," in ",(0,s.jsx)(n.code,{children:"privileged"})," mode:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: unprivileged-pod\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\nEOF\n"})}),"\n",(0,s.jsx)(n.p,{children:"This will produce the following output:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"pod/unprivileged-pod created\n"})}),"\n",(0,s.jsx)(n.p,{children:"The Pod is successfully created."}),"\n",(0,s.jsxs)(n.p,{children:["Now, let's create a Pod with at least one Container ",(0,s.jsx)(n.code,{children:"privileged"})," flag:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: privileged-pod\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n      securityContext:\n          privileged: true\nEOF\n"})}),"\n",(0,s.jsx)(n.p,{children:"The creation of the Pod has been denied by the policy and you should see the following message:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'Error from server: error when creating "STDIN": admission webhook "clusterwide-privileged-pods.kubewarden.admission" denied the request: Privileged container is not allowed\n'})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Both examples didn't define a ",(0,s.jsx)(n.code,{children:"namespace"}),", which means the ",(0,s.jsx)(n.code,{children:"default"})," namespace was the target.\nHowever, as you could see in the second example, the policy is still applied.\nAs stated above, this is due to the scope being cluster-wide and not targeting a specific namespace."]})}),"\n",(0,s.jsx)(n.h2,{id:"uninstall",children:"Uninstall"}),"\n",(0,s.jsxs)(n.p,{children:["You can remove the resources created by uninstalling the ",(0,s.jsx)(n.code,{children:"helm"})," charts as follows:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm uninstall --namespace kubewarden kubewarden-defaults\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm uninstall --namespace kubewarden kubewarden-controller\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm uninstall --namespace kubewarden kubewarden-crds\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Once the ",(0,s.jsx)(n.code,{children:"helm"})," charts have been uninstalled, remove the Kubernetes namespace that was used to deploy the Kubewarden stack:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl delete namespace kubewarden\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.p,{children:["Kubewarden contains a helm pre-delete hook that will remove all ",(0,s.jsx)(n.code,{children:"PolicyServers"})," and ",(0,s.jsx)(n.code,{children:"kubewarden-controller"}),".\nThen the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," will delete all resources, so it is important that ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," is running when helm uninstall is executed."]})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ValidatingWebhookConfigurations"})," and ",(0,s.jsx)(n.code,{children:"MutatingWebhookConfigurations"})," created by kubewarden should be deleted, this can be checked with:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"\n'})}),"\n",(0,s.jsx)(n.p,{children:"If these resources are not automatically removed, remove them manually by using the following command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'kubectl delete -l "kubewarden" validatingwebhookconfigurations.admissionregistration.k8s.io\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'kubectl delete -l "kubewarden" mutatingwebhookconfigurations.admissionregistration.k8s.io\n'})}),"\n",(0,s.jsx)(n.h2,{id:"wrapping-up",children:"Wrapping up"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," is the core resource that a cluster operator has to manage. The ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," module automatically takes care of the configuration for the rest of the resources needed to run the policies."]}),"\n",(0,s.jsx)(n.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,s.jsxs)(n.p,{children:["Now, you are ready to deploy Kubewarden! Have a look at the policies on ",(0,s.jsx)(n.a,{href:"https://artifacthub.io/packages/search?kind=13",children:"artifacthub.io"}),", on ",(0,s.jsx)(n.a,{href:"https://github.com/topics/kubewarden-policy",children:"GitHub"}),", or reuse existing Rego policies as shown in the ",(0,s.jsx)(n.a,{href:"/1.11/tutorials/writing-policies/rego/intro-rego",children:"following chapters"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>o});var s=i(67294);const r={},t=s.createContext(r);function o(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);