"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[314],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=p(n),m=r,k=c["".concat(s,".").concat(m)]||c[m]||u[m]||i;return n?a.createElement(k,o(o({ref:t},d),{},{components:n})):a.createElement(k,o({ref:t},d))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6618:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_label:"Quick start",title:"Quick start",description:"Getting started with Kubewarden, installing the Kubewarden stack and taking care of prerequisites and authentication",keywords:["Kubewarden","installation","quick start","policyserver","clusteradmissionpolicy","admissionpolicy"]},o=void 0,l={unversionedId:"quick-start",id:"version-1.8/quick-start",title:"Quick start",description:"Getting started with Kubewarden, installing the Kubewarden stack and taking care of prerequisites and authentication",source:"@site/versioned_docs/version-1.8/quick-start.md",sourceDirName:".",slug:"/quick-start",permalink:"/quick-start",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/quick-start.md",tags:[],version:"1.8",lastUpdatedAt:1699005473,formattedLastUpdatedAt:"Nov 3, 2023",frontMatter:{sidebar_label:"Quick start",title:"Quick start",description:"Getting started with Kubewarden, installing the Kubewarden stack and taking care of prerequisites and authentication",keywords:["Kubewarden","installation","quick start","policyserver","clusteradmissionpolicy","admissionpolicy"]},sidebar:"docs",previous:{title:"Introduction",permalink:"/"},next:{title:"Common tasks",permalink:"/tasks"}},s={},p=[{value:"Installation",id:"installation",level:2},{value:"Main components",id:"main-components",level:2},{value:"PolicyServer",id:"policyserver",level:3},{value:"ClusterAdmissionPolicy",id:"clusteradmissionpolicy",level:3},{value:"AdmissionPolicy",id:"admissionpolicy",level:3},{value:"Example: Enforce your first policy",id:"example-enforce-your-first-policy",level:2},{value:"Uninstall",id:"uninstall",level:2},{value:"Wrapping up",id:"wrapping-up",level:2}],d={toc:p},c="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The Kubewarden stack comprises:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Some ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," resources: this is how policies are defined for Kubernetes clusters")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Some ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," resources: representing a deployment of a Kubewarden ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer"),". Your administrator's policies are loaded and evaluated by the Kubewarden ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Some ",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," resources: policies for a defined namespace")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"A deployment of a ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller"),": this controller monitors the ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," resources and interacts with the Kubewarden ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," components."))),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"The Kubernetes Custom Resource Definitions (CRD) defined by Kubewarden are described ",(0,r.kt)("a",{parentName:"p",href:"/operator-manual/CRDs"},"here"),".")),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("admonition",{title:"Prerequisites",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"The Helm chart depends on ",(0,r.kt)("inlineCode",{parentName:"p"},"cert-manager"),". Ensure you install ",(0,r.kt)("a",{parentName:"p",href:"https://cert-manager.io/docs/installation/"},(0,r.kt)("inlineCode",{parentName:"a"},"cert-manager"))," ",(0,r.kt)("em",{parentName:"p"},"before")," the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," chart."),(0,r.kt)("p",{parentName:"admonition"},"You install the latest version of ",(0,r.kt)("inlineCode",{parentName:"p"},"cert-manager")," by running the following commands:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl apply -f https://github.com/jetstack/cert-manager/releases/latest/download/cert-manager.yaml\n")),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl wait --for=condition=Available deployment --timeout=2m -n cert-manager --all\n"))),(0,r.kt)("admonition",{title:"Authentication",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Kubewarden policies can be retrieved from the GitHub container registry at ",(0,r.kt)("a",{parentName:"p",href:"https://ghcr.io."},"https://ghcr.io."),"\nYou need authentication to use the repository with the Kubewarden CLI, a ",(0,r.kt)("a",{parentName:"p",href:"https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"},"GitHub personal access token")," (PAT).\nTheir documentation guides you through creating one if you have not already done so.\nThen you authenticate with a command like:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-console"},"echo $PAT | docker login ghcr.io --username <my-gh-username> --password-stdin\n"))),(0,r.kt)("p",null,"Deploy the Kubewarden stack using ",(0,r.kt)("inlineCode",{parentName:"p"},"helm")," charts as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm repo add kubewarden https://charts.kubewarden.io\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm repo update kubewarden\n")),(0,r.kt)("p",null,"Install the following Helm charts inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden")," namespace in your Kubernetes cluster:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-crds"),", which will register the ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy"),",\n",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," Custom Resource Definitions.  As well as\nthe ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyReport")," Custom Resource Definitions used by the audit scanner")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller"),", which will install the Kubewarden controller and the\naudit scanner"),(0,r.kt)("admonition",{parentName:"li",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"If you want to disable the audit scanner component. Please check out the audit\nscanner installation ",(0,r.kt)("a",{parentName:"p",href:"../howtos/audit-scanner"},"docs page"),"."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults"),", which will create a ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," resource named ",(0,r.kt)("inlineCode",{parentName:"p"},"default"),". It can also install a set of\nrecommended policies to secure your cluster by enforcing some well known best practices."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm install --wait -n kubewarden --create-namespace kubewarden-crds kubewarden/kubewarden-crds\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm install --wait -n kubewarden kubewarden-defaults kubewarden/kubewarden-defaults\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Since ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kubewarden-controller/releases/tag/v0.4.0"},(0,r.kt)("inlineCode",{parentName:"a"},"v0.4.0")),", a ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," resource named ",(0,r.kt)("inlineCode",{parentName:"p"},"default")," will not be created using the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," chart.\nNow a Helm chart called ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults"),", installs\nthe default policy server."),(0,r.kt)("p",{parentName:"admonition"},"This means that if you are not using the latest version of the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," and are trying to upgrade or delete,\nyour default policy server will not be upgraded or deleted.\nSo, you might run into issues if you try to install the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults")," with some conflicting information, for example, the same policy server name.\nTo be able to take advantage of future upgrades in the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults")," Helm chart remove the\nexisting ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," resource created by the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," before installing the new chart.\nNow you can update your policy server using Helm upgrades without resource conflicts.\nWhen you remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer"),", all the policies bound to it will be removed as well.")),(0,r.kt)("p",null,"The default configuration values are sufficient for most deployments. All options are documented ",(0,r.kt)("a",{parentName:"p",href:"https://charts.kubewarden.io/#configuration"},"here"),"."),(0,r.kt)("h2",{id:"main-components"},"Main components"),(0,r.kt)("p",null,"Kubewarden has three main components which you will interact with:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The PolicyServer"),(0,r.kt)("li",{parentName:"ul"},"The ClusterAdmissionPolicy"),(0,r.kt)("li",{parentName:"ul"},"The AdmissionPolicy")),(0,r.kt)("h3",{id:"policyserver"},"PolicyServer"),(0,r.kt)("p",null,"A Kubewarden ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," is managed by the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," and multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServers")," can be deployed in the same Kubernetes cluster."),(0,r.kt)("p",null,"A ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," validates incoming requests by executing Kubewarden policies against them."),(0,r.kt)("p",null,"This is the default ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," configuration:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: policies.kubewarden.io/v1\nkind: PolicyServer\nmetadata:\n  name: reserved-instance-for-tenant-a\nspec:\n  image: ghcr.io/kubewarden/policy-server:v1.3.0\n  replicas: 2\n  serviceAccountName: ~\n  env:\n  - name: KUBEWARDEN_LOG_LEVEL\n    value: debug\n")),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Check the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/policy-server/pkgs/container/policy-server"},"latest released ",(0,r.kt)("inlineCode",{parentName:"a"},"PolicyServer")," version")," and change the tag to match.")),(0,r.kt)("p",null,"Overview of the attributes of the ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," resource:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Placeholder"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"Y"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"image")),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the container image")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"Y"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"replicas")),(0,r.kt)("td",{parentName:"tr",align:null},"The number of desired instances")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"serviceAccountName")),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the ",(0,r.kt)("inlineCode",{parentName:"td"},"ServiceAccount")," to use for the ",(0,r.kt)("inlineCode",{parentName:"td"},"PolicyServer")," deployment. If no value is provided, the default ",(0,r.kt)("inlineCode",{parentName:"td"},"ServiceAccount")," from the namespace, where the ",(0,r.kt)("inlineCode",{parentName:"td"},"kubewarden-controller")," is installed, will be used")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"env")),(0,r.kt)("td",{parentName:"tr",align:null},"The list of environment variables")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"annotations")),(0,r.kt)("td",{parentName:"tr",align:null},"The list of annotations")))),(0,r.kt)("p",null,"Changing any of these attributes causes a ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," deployment with the new configuration."),(0,r.kt)("h3",{id:"clusteradmissionpolicy"},"ClusterAdmissionPolicy"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," resource is the core of the Kubewarden stack. It defines how policies evaluate requests."),(0,r.kt)("p",null,"Enforcing policies is the most common operation which a Kubernetes administrator performs.\nYou can declare as many policies as you want, each will target one or more Kubernetes resources (i.e., ",(0,r.kt)("inlineCode",{parentName:"p"},"pods"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Custom Resource"),").\nYou will also specify the type of operations to be applied to targeted resources.\nThe operations available are ",(0,r.kt)("inlineCode",{parentName:"p"},"CREATE"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"UPDATE"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"DELETE")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"CONNECT"),"."),(0,r.kt)("p",null,"Default ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," configuration:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-capabilities\nspec:\n  policyServer: reserved-instance-for-tenant-a\n  module: registry://ghcr.io/kubewarden/policies/psp-capabilities:v0.1.9\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n    - UPDATE\n  mutating: true\n  settings:\n    allowed_capabilities:\n    - CHOWN\n    required_drop_capabilities:\n    - NET_ADMIN\n')),(0,r.kt)("p",null,"Overview of the attributes of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," resource:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Placeholder"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"policy-server")),(0,r.kt)("td",{parentName:"tr",align:null},"Identifies an existing ",(0,r.kt)("inlineCode",{parentName:"td"},"PolicyServer")," object. The policy will be served only by this ",(0,r.kt)("inlineCode",{parentName:"td"},"PolicyServer")," instance. A ",(0,r.kt)("inlineCode",{parentName:"td"},"ClusterAdmissionPolicy")," that doesn't have an explicit ",(0,r.kt)("inlineCode",{parentName:"td"},"PolicyServer"),", will be served by the one named ",(0,r.kt)("inlineCode",{parentName:"td"},"default"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"Y"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"module")),(0,r.kt)("td",{parentName:"tr",align:null},"The location of the Kubewarden policy. The following schemes are allowed:")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"- ",(0,r.kt)("inlineCode",{parentName:"td"},"registry"),": The policy is downloaded from an ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/opencontainers/artifacts"},"OCI artifacts")," compliant container registry. Example: ",(0,r.kt)("inlineCode",{parentName:"td"},"registry://<OCI registry/policy URL>"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"- ",(0,r.kt)("inlineCode",{parentName:"td"},"http"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"https"),": The policy is downloaded from a regular HTTP(s) server. Example: ",(0,r.kt)("inlineCode",{parentName:"td"},"https://<website/policy URL>"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"- ",(0,r.kt)("inlineCode",{parentName:"td"},"file"),": The policy is loaded from a file in the computer file system. Example: ",(0,r.kt)("inlineCode",{parentName:"td"},"file:///<policy WASM binary full path>"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"Y"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"resources")),(0,r.kt)("td",{parentName:"tr",align:null},"The Kubernetes resources evaluated by the policy")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"Y"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"operations")),(0,r.kt)("td",{parentName:"tr",align:null},"What operations for the previously given types should be forwarded to this admission policy by the API server for evaluation.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"Y"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"mutating")),(0,r.kt)("td",{parentName:"tr",align:null},"A boolean value that must be set to ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," for policies that can mutate incoming requests")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"settings")),(0,r.kt)("td",{parentName:"tr",align:null},"A free-form object that contains the policy configuration values")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"failurePolicy")),(0,r.kt)("td",{parentName:"tr",align:null},"The action to take if the request evaluated by a policy results in an error. The following options are allowed:")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"- ",(0,r.kt)("inlineCode",{parentName:"td"},"Ignore"),": an error calling the webhook is ignored and the API request is allowed to continue")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},"N"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"- ",(0,r.kt)("inlineCode",{parentName:"td"},"Fail"),": an error calling the webhook causes the admission to fail and the API request to be rejected")))),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"The  ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," resources are registered with a ",(0,r.kt)("inlineCode",{parentName:"p"},"*")," webhook ",(0,r.kt)("inlineCode",{parentName:"p"},"scope"),", which means that registered webhooks will forward all requests matching the given ",(0,r.kt)("inlineCode",{parentName:"p"},"resources")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"operations")," -- either namespaced or cluster-wide resources.")),(0,r.kt)("h3",{id:"admissionpolicy"},"AdmissionPolicy"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," is a namespace-wide resource.\nThe policy will process only the requests that are targeting the Namespace where the ",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," is defined.\nOther than that, there are no functional differences between the ",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," resources."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionPolicy")," requires Kubernetes 1.21.0 or above. This is because we are using the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubernetes.io/metadata.name")," label, which was introduced in Kubernetes 1.21.0")),(0,r.kt)("p",null,"The complete documentation of these Custom Resources can be found ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kubewarden-controller/blob/main/docs/crds/README.asciidoc"},"here")," or on ",(0,r.kt)("a",{parentName:"p",href:"https://doc.crds.dev/github.com/kubewarden/kubewarden-controller"},"docs.crds.dev"),"."),(0,r.kt)("h2",{id:"example-enforce-your-first-policy"},"Example: Enforce your first policy"),(0,r.kt)("p",null,"We will use the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/pod-privileged-policy"},(0,r.kt)("inlineCode",{parentName:"a"},"pod-privileged"))," policy.\nWe want to prevent the creation of privileged containers inside our Kubernetes cluster by enforcing this policy."),(0,r.kt)("p",null,"Let's define a ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," to do that:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},'kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: privileged-pods\nspec:\n  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.2.2\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n    - UPDATE\n  mutating: false\nEOF\n')),(0,r.kt)("p",null,"This produces the following output:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"clusteradmissionpolicy.policies.kubewarden.io/privileged-pods created\n")),(0,r.kt)("p",null,"When a ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," is defined, the status is set to ",(0,r.kt)("inlineCode",{parentName:"p"},"pending"),", and it will force a rollout of the targeted ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer"),".\nIn our example, it's the ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," named ",(0,r.kt)("inlineCode",{parentName:"p"},"default"),". You can monitor the rollout by running the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl get clusteradmissionpolicy.policies.kubewarden.io/privileged-pods\n")),(0,r.kt)("p",null,"You should see the following output:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"NAME              POLICY SERVER   MUTATING   STATUS\nprivileged-pods   default         false      pending\n")),(0,r.kt)("p",null,"Once the new policy is ready to be served, the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," will register a ",(0,r.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#validatingwebhookconfiguration-v1-admissionregistration-k8s-io"},"ValidatingWebhookConfiguration")," object."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," status will be set to ",(0,r.kt)("inlineCode",{parentName:"p"},"active")," once the Deployment is done for every ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," instance.\nShow ",(0,r.kt)("inlineCode",{parentName:"p"},"ValidatingWebhookConfiguration")," with the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l kubewarden\n")),(0,r.kt)("p",null,"You should see the following output:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"NAME                          WEBHOOKS   AGE\nclusterwide-privileged-pods   1          9s\n")),(0,r.kt)("p",null,"Once the ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," is active and the ",(0,r.kt)("inlineCode",{parentName:"p"},"ValidatingWebhookConfiguration")," is registered, you can test the policy."),(0,r.kt)("p",null,"First, let's create a Pod with a Container ",(0,r.kt)("em",{parentName:"p"},"not")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"privileged")," mode:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: unprivileged-pod\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\nEOF\n")),(0,r.kt)("p",null,"This will produce the following output:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"pod/unprivileged-pod created\n")),(0,r.kt)("p",null,"The Pod is successfully created."),(0,r.kt)("p",null,"Now, let's create a Pod with at least one Container ",(0,r.kt)("inlineCode",{parentName:"p"},"privileged")," flag:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: privileged-pod\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n      securityContext:\n          privileged: true\nEOF\n")),(0,r.kt)("p",null,"The creation of the Pod has been denied by the policy and you should see the following message:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},'Error from server: error when creating "STDIN": admission webhook "clusterwide-privileged-pods.kubewarden.admission" denied the request: Privileged container is not allowed\n')),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Both examples didn't define a ",(0,r.kt)("inlineCode",{parentName:"p"},"namespace"),", which means the ",(0,r.kt)("inlineCode",{parentName:"p"},"default")," namespace was the target.\nHowever, as you could see in the second example, the policy is still applied.\nAs stated above, this is due to the scope being cluster-wide and not targeting a specific namespace.")),(0,r.kt)("h2",{id:"uninstall"},"Uninstall"),(0,r.kt)("p",null,"You can remove the resources created by uninstalling the ",(0,r.kt)("inlineCode",{parentName:"p"},"helm")," charts as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm uninstall --namespace kubewarden kubewarden-defaults\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm uninstall --namespace kubewarden kubewarden-controller\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm uninstall --namespace kubewarden kubewarden-crds\n")),(0,r.kt)("p",null,"Once the ",(0,r.kt)("inlineCode",{parentName:"p"},"helm")," charts have been uninstalled, remove the Kubernetes namespace that was used to deploy the Kubewarden stack:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl delete namespace kubewarden\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Kubewarden contains a helm pre-delete hook that will remove all ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServers")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller"),".\nThen the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," will delete all resources, so it is important that ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," is running when helm uninstall is executed.")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ValidatingWebhookConfigurations")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"MutatingWebhookConfigurations")," created by kubewarden should be deleted, this can be checked with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},'kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},'kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io -l "kubewarden"\n')),(0,r.kt)("p",null,"If these resources are not automatically removed, remove them manually by using the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},'kubectl delete -l "kubewarden" validatingwebhookconfigurations.admissionregistration.k8s.io\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},'kubectl delete -l "kubewarden" mutatingwebhookconfigurations.admissionregistration.k8s.io\n')),(0,r.kt)("h2",{id:"wrapping-up"},"Wrapping up"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," is the core resource that a cluster operator has to manage. The ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," module automatically takes care of the configuration for the rest of the resources needed to run the policies."),(0,r.kt)("p",null,"Now, you are ready to deploy Kubewarden! Have a look at the policies on ",(0,r.kt)("a",{parentName:"p",href:"https://hub.kubewarden.io"},"hub.kubewarden.io"),", on ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/topics/kubewarden-policy"},"GitHub"),", or reuse existing Rego policies as shown in the ",(0,r.kt)("a",{parentName:"p",href:"/writing-policies/rego/intro-rego"},"following chapters"),"."))}u.isMDXComponent=!0}}]);