"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[7116],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,k=d["".concat(s,".").concat(m)]||d[m]||c[m]||l;return n?a.createElement(k,r(r({ref:t},u),{},{components:n})):a.createElement(k,r({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var p=2;p<l;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8502:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(3117),i=(n(7294),n(3905));const l={sidebar_label:"Common Tasks",title:""},r="Common Tasks",o={unversionedId:"tasks",id:"tasks",title:"",description:"This page lists a set of tasks that can be performed after you install Kubewarden in your Kubernetes cluster.",source:"@site/docs/tasks.md",sourceDirName:".",slug:"/tasks",permalink:"/tasks",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/tasks.md",tags:[],version:"current",lastUpdatedAt:1677682285,formattedLastUpdatedAt:"Mar 1, 2023",frontMatter:{sidebar_label:"Common Tasks",title:""},sidebar:"docs",previous:{title:"Quick Start",permalink:"/quick-start"},next:{title:"Writing Policies",permalink:"/writing-policies/"}},s={},p=[{value:"Test Policies",id:"test-policies",level:2},{value:"Kubewarden Policy Hub",id:"kubewarden-policy-hub",level:3},{value:"<code>kwctl</code> CLI tool",id:"kwctl-cli-tool",level:3},{value:"Use cases",id:"use-cases",level:4},{value:"Installation",id:"installation",level:4},{value:"Usage",id:"usage",level:4},{value:"Enforce Policies",id:"enforce-policies",level:2},{value:"Next steps",id:"next-steps",level:2},{value:"Write Policies",id:"write-policies",level:3},{value:"Distribute Policies",id:"distribute-policies",level:3}],u={toc:p};function c(e){let{components:t,...l}=e;return(0,i.kt)("wrapper",(0,a.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"common-tasks"},"Common Tasks"),(0,i.kt)("p",null,"This page lists a set of tasks that can be performed after you ",(0,i.kt)("a",{parentName:"p",href:"/quick-start#install"},"install Kubewarden")," in your Kubernetes cluster."),(0,i.kt)("p",null,"Each task can be done separately; however, if you're not familiar with Kubewarden, or Kubernetes policies in general, we recommend that you follow the tasks below in sequential order."),(0,i.kt)("h2",{id:"test-policies"},"Test Policies"),(0,i.kt)("p",null,"Kubewarden has two main tools to help you find policies and test them locally:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://hub.kubewarden.io/"},"Kubewarden Policy Hub")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/kwctl"},(0,i.kt)("inlineCode",{parentName:"a"},"kwctl"))," CLI tool")),(0,i.kt)("h3",{id:"kubewarden-policy-hub"},"Kubewarden Policy Hub"),(0,i.kt)("p",null,"The Kubewarden Policy Hub hosts policies contributed by the community. For example, you can find substitutes to the ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future/"},"deprecated Kubernetes Pod Security Policies"),", created by the Kubewarden developers. "),(0,i.kt)("p",null,"As shown in the picture below, once you find the policy to be tested, you can copy the registry path",(0,i.kt)("sup",null,"1")," or download",(0,i.kt)("sup",null,"2")," the ",(0,i.kt)("inlineCode",{parentName:"p"},"Wasm")," binary containing the policy and additional metadata:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Kubewarden Policy Hub",src:n(4108).Z,width:"1180",height:"472"})),(0,i.kt)("p",null,"Once you have the policy ",(0,i.kt)("inlineCode",{parentName:"p"},"Wasm")," binary or the registry path, you can test it with ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl"),"."),(0,i.kt)("h3",{id:"kwctl-cli-tool"},(0,i.kt)("inlineCode",{parentName:"h3"},"kwctl")," CLI tool"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," is a Command Line Interface (CLI) tool that will allow both the policy authors and the cluster administrators to test policies before they are applied to the Kubernetes cluster."),(0,i.kt)("p",null,"The user experience (UX) of this tool is intended to be easy and intuitive like the ",(0,i.kt)("inlineCode",{parentName:"p"},"docker")," CLI tool. "),(0,i.kt)("h4",{id:"use-cases"},"Use cases"),(0,i.kt)("p",null,"Depending on your role, ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," will help you in the following non-exhaustive scenarios:"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"As a policy author")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"End-to-end testing of your policy"),": Test your policy against crafted Kubernetes requests and ensure your policy behaves as you expect. You can even test context-aware policies that require access to a running cluster."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Embed metadata in your Wasm module"),": the binary contains annotations of the permissions it needs to be executed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Publish policies to OCI registries"),": The binary is a fully compliant OCI object and can be stored in OCI registries.")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"As a cluster administrator")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Inspect remote policies"),": Given a policy in an OCI registry or in an HTTP server, show all static information about the policy."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Dry-run of a policy in your cluster"),": Test the policy against crafted Kubernetes requests and ensure the policy behaves as you expect given the input data you provide. You can even test context-aware policies that require access to a running cluster, also in a dry-run mode."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Generate initial ",(0,i.kt)("inlineCode",{parentName:"em"},"ClusterAdmissionPolicy")," scaffolding for your policy"),": Generate a ",(0,i.kt)("inlineCode",{parentName:"li"},"YAML")," file with all the required settings, which can be applied to your Kubernetes cluster using ",(0,i.kt)("inlineCode",{parentName:"li"},"kubectl"),".")),(0,i.kt)("h4",{id:"installation"},"Installation"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," binaries for the stable releases are directly available from the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kwctl/releases"},"GitHub repository"),"."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"NOTE"),": If you want to build ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," from the development branch, you need to install ",(0,i.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/tools/install"},"Rust"),". And for building ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl"),", please refer to the ",(0,i.kt)("inlineCode",{parentName:"p"},"Build kwctl from source")," section in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kwctl"},"GitHub repo"),".")),(0,i.kt)("h4",{id:"usage"},"Usage"),(0,i.kt)("p",null,"As stated above, ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," will allow you to perform an end-to-end testing of the policies."),(0,i.kt)("p",null,"You can list all the ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," options and subcommands by running the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ kwctl --help\nkwctl 0.2.5\nKubewarden Developers <kubewarden@suse.de>\nTool to manage Kubewarden policies\n\nUSAGE:\n    kwctl [OPTIONS] <SUBCOMMAND>\n\nOPTIONS:\n    -h, --help       Print help information\n    -v               Increase verbosity\n    -V, --version    Print version information\n\nSUBCOMMANDS:\n    annotate       Add Kubewarden metadata to a WebAssembly module\n    completions    Generate shell completions\n    digest         Fetch the digest of its OCI manifest\n    help           Print this message or the help of the given subcommand(s)\n    inspect        Inspect Kubewarden policy\n    policies       Lists all downloaded policies\n    pull           Pulls a Kubewarden policy from a given URI\n    push           Pushes a Kubewarden policy to an OCI registry\n    rm             Removes a Kubewarden policy from the store\n    run            Runs a Kubewarden policy from a given URI\n    scaffold       Scaffold a Kubernetes resource or configuration file\n    verify         Verify a Kubewarden policy from a given URI using Sigstore\n")),(0,i.kt)("p",null,"Here are a few examples of the commands you should run, depending on the task you want to perform:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("em",{parentName:"p"},"List the policies"),": lists all the policies stored in the local ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," registry"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Command: ",(0,i.kt)("inlineCode",{parentName:"li"},"kwctl policies")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("em",{parentName:"p"},"Obtain the policy"),": download and store the policy inside the local ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," store"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Command: ",(0,i.kt)("inlineCode",{parentName:"li"},"kwctl pull <policy URI>")),(0,i.kt)("li",{parentName:"ul"},"Example:")),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ kwctl pull registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9\n\n$ kwctl policies\n+--------------------------------------------------------------+----------+---------------+--------------+----------+\n| Policy                                                       | Mutating | Context aware | SHA-256      | Size     |\n+--------------------------------------------------------------+----------+---------------+--------------+----------+\n| registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 | no       | no            | 59e34f482b40 | 21.86 kB |\n+--------------------------------------------------------------+----------+---------------+--------------+----------+\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("em",{parentName:"p"},"Understand how the policy works"),": inspect the policy metadata"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Command: ",(0,i.kt)("inlineCode",{parentName:"li"},"kwctl inspect <policy URI>")),(0,i.kt)("li",{parentName:"ul"},"Example:")),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'  $ kwctl inspect registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9\n  Details\n  title:              pod-privileged\n  description:        Limit the ability to create privileged containers\n  author:             Flavio Castelli\n  url:                https://github.com/kubewarden/pod-privileged-policy\n  source:             https://github.com/kubewarden/pod-privileged-policy\n  license:            Apache-2.0\n  mutating:           false\n  context aware:      false\n  execution mode:     kubewarden-wapc\n  protocol version:   1\n  \n  Annotations\n  io.kubewarden.kwctl 0.1.9\n  \n  Rules\n  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  ---\n  - apiGroups:\n      - ""\n    apiVersions:\n      - v1\n    resources:\n      - pods\n    operations:\n      - CREATE\n  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  \n  Usage\n  This policy doesn\'t have a configuration. Once enforced, it will reject\n  the creation of Pods that have at least a privileged container defined.\n'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("em",{parentName:"p"},"Evaluate the policy"),": Assess the policy and, if available, find the right configuration values to match your requirements."),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"NOTE: Familiarity with ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/reference/"},"Kubernetes REST APIs")," is a prerequisite.")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Command: ",(0,i.kt)("inlineCode",{parentName:"p"},'kwctl run -r <"Kubernetes Admission request" file path> -s <"JSON document" file path> <policy URI>'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Scenario 1:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Request to be evaluated: Create a pod with no 'privileged' container")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Example:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kwctl run registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 -r unprivileged-pod-request.json\n{"uid":"C6E115F4-A789-49F8-B0C9-7F84C5961FDE","allowed":true,"status":{"message":""}}\n')),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Equivalent command with the policy binary downloaded:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'`$ kwctl run file://$PWD/pod-privileged-policy.wasm -r unprivileged-pod-request.json\n{"uid":"C6E115F4-A789-49F8-B0C9-7F84C5961FDE","allowed":true,"status":{"message":""}}\n'))))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Result: The policy allows the request")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Scenario 2:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Request to be evaluated: Create a pod with at least one 'privileged' container")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Command: "),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"kwctl run registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9 -r privileged-pod-request.json\n")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Equivalent command with the policy binary downloaded: ",(0,i.kt)("inlineCode",{parentName:"li"},"kwctl run file://$PWD/pod-privileged-policy.wasm -r privileged-pod-request.json")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Output:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{"uid":"8EE6AF8C-C8C8-45B0-9A86-CB52A70EC50D","allowed":false,"status":{"message":"User \'kubernetes-admin\' cannot schedule privileged containers"}}\n'))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Result: The policy denies the request"))),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"NOTE"),": If you want to see a more complex example, you can read the Kubewarden blog post ",(0,i.kt)("a",{parentName:"p",href:"https://www.kubewarden.io/blog/2021/06/kwctl-intro-for-kubernetes-administrators/"},"Introducing ",(0,i.kt)("inlineCode",{parentName:"a"},"kwctl")," to Kubernetes Administrators"),".")))))),(0,i.kt)("h2",{id:"enforce-policies"},"Enforce Policies"),(0,i.kt)("p",null,"As described in the ",(0,i.kt)("a",{parentName:"p",href:"/quick-start#example-enforce-your-first-policy"},"Quick Start"),", you can enforce a policy by defining a ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," and then deploy it to your cluster using ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," will help to generate a ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," from the policy you want to enforce. "),(0,i.kt)("p",null,"After you have generated the ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," and applied it to your Kubernetes cluster, you can follow the steps described in the ",(0,i.kt)("a",{parentName:"p",href:"/quick-start#example-enforce-your-first-policy"},"Quick Start")," below:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Generate the ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," from the policy ",(0,i.kt)("inlineCode",{parentName:"p"},"manifest")," and save it to a file"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Command: ",(0,i.kt)("inlineCode",{parentName:"li"},'kwctl scaffold manifest -t ClusterAdmissionPolicy <policy URI> > <"policy name".yaml>')),(0,i.kt)("li",{parentName:"ul"},"Example:")),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kwctl scaffold manifest -t ClusterAdmissionPolicy registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9\n---\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: privileged-pods\nspec:\n  module: "registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.9"\n  settings: {}\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n  mutating: false\n')),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"TIP: By default, the ",(0,i.kt)("inlineCode",{parentName:"p"},"name")," value is set to ",(0,i.kt)("inlineCode",{parentName:"p"},"generated-policy"),". You might want to edit it before you deploy the ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy"),". "),(0,i.kt)("p",{parentName:"blockquote"},"NOTE: To avoid confusion, the value above has been set to ",(0,i.kt)("inlineCode",{parentName:"p"},"privileged-pods"),"."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Deploy the ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," to your Kubernetes cluster"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Command: ",(0,i.kt)("inlineCode",{parentName:"li"},'kubectl apply -f <"policy name".yaml>')),(0,i.kt)("li",{parentName:"ul"},"Example:")),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ kubectl apply -f pod-privileged-policy.yaml\nclusteradmissionpolicy.policies.kubewarden.io/privileged-pods created\n")))),(0,i.kt)("p",null,"Once the ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterAdmissionPolicy")," is deployed, the requests sent to your Kubernetes cluster will be evaluated by the policy if they're within the policy scope."),(0,i.kt)("h2",{id:"next-steps"},"Next steps"),(0,i.kt)("h3",{id:"write-policies"},"Write Policies"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"/writing-policies/"},"Writing Policies")," section explains how to write policies in different languages and how to export them into Webassembly so that they can be interpreted by Kubewarden."),(0,i.kt)("h3",{id:"distribute-policies"},"Distribute Policies"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"/distributing-policies/"},"Distributing Policies")," section explains how to publish policies to ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/opencontainers/distribution-spec/blob/main/spec.md"},"OCI registries"),"."))}c.isMDXComponent=!0},4108:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/tasks-policy-hub-3d2f57bde0556276448ea3644ec86756.png"}}]);