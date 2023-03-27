"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[4899],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,y=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?i.createElement(y,r(r({ref:t},p),{},{components:n})):i.createElement(y,r({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var c=2;c<o;c++)r[c]=n[c];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1212:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var i=n(3117),a=(n(7294),n(3905));const o={},r="Distributing Policies",l={unversionedId:"distributing-policies",id:"distributing-policies",title:"Distributing Policies",description:"Kubewarden policies are Wasm binaries that are evaluated by the",source:"@site/docs/distributing-policies.md",sourceDirName:".",slug:"/distributing-policies",permalink:"/distributing-policies",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/distributing-policies.md",tags:[],version:"current",lastUpdatedAt:1679907349,formattedLastUpdatedAt:"Mar 27, 2023",frontMatter:{},sidebar:"docs",previous:{title:"Mutating Policies",permalink:"/tasksDir/mutating-policies"},next:{title:"Policy Authors",permalink:"/testing-policies/policy-authors"}},s={},c=[{value:"Annotating the policy",id:"annotating-the-policy",level:2},{value:"Pushing the policy",id:"pushing-the-policy",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"distributing-policies"},"Distributing Policies"),(0,a.kt)("p",null,"Kubewarden policies are Wasm binaries that are evaluated by the\nKubewarden Policy Server."),(0,a.kt)("p",null,"The Kubewarden policy server can load policies from these\nsources:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Local filesystem"),(0,a.kt)("li",{parentName:"ul"},"HTTP(s) server"),(0,a.kt)("li",{parentName:"ul"},"OCI compliant registry like ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/distribution/distribution"},"Distribution"),"\nand other container registries (GitHub container registry, Azure Container\nRegistry, Amazon ECR, Google Container Registry, ...)")),(0,a.kt)("p",null,"We think distributing Kubewarden policies via a regular OCI compliant\nregistry is the best choice. Container registries are basically a\nmandatory requirement for any Kubernetes cluster. Having a single\nplace to store, and secure, all the artifacts required by a cluster\ncan be really handy."),(0,a.kt)("h1",{id:"pushing-policies-to-an-oci-compliant-registry"},"Pushing policies to an OCI compliant registry"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/opencontainers/artifacts"},"OCI Artifacts"),"\nspecification allows to store any kind of binary blob inside of a\nregular OCI compliant container registry."),(0,a.kt)("p",null,"The target OCI compliant registry ",(0,a.kt)("strong",{parentName:"p"},"must support artifacts")," in order\nto successfully push a Kubewarden Policy to it."),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kwctl"},(0,a.kt)("inlineCode",{parentName:"a"},"kwctl"))," command line tool\ncan be used to push a Kubewarden Policy to an OCI compliant registry."),(0,a.kt)("h2",{id:"annotating-the-policy"},"Annotating the policy"),(0,a.kt)("p",null,"Annotating a policy is done by the ",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl")," CLI tool as well. The\nprocess of annotating a Kubewarden policy is done by adding\nWebAssembly custom sections to the policy binary. This means that the\npolicy metadata travels with the policy itself."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl annotate")," command needs two main inputs:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The Kubewarden policy to be annotated, in the form of a local file\nin the filesystem.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The annotations file, a file containing a YAML with the policy\nmetadata. This file is located somewhere in your filesystem, usually\nin the root project of your policy."))),(0,a.kt)("p",null,"An example follows; we save this file as ",(0,a.kt)("inlineCode",{parentName:"p"},"metadata.yml")," in the current\ndirectory:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'rules:\n- apiGroups: ["*"]\n  apiVersions: ["*"]\n  resources: ["*"]\n  operations: ["*"]\nmutating: false\nannotations:\n  io.kubewarden.policy.title: palindromify\n  io.kubewarden.policy.description: Allows you to reject palindrome names in resources and namespace names, or to only accept palindrome names\n  io.kubewarden.policy.author: Name Surname <name.surname@example.com>\n  io.kubewarden.policy.url: https://github.com/<org>/palindromify\n  io.kubewarden.policy.source: https://github.com/<org>/palindromify\n  io.kubewarden.policy.license: Apache-2.0\n  io.kubewarden.policy.usage: |\n    This is markdown text and as such allows you to define a free form usage text.\n\n    This policy allows you to reject requests if:\n    - The name of the resource is a palindrome name.\n    - The namespace name where this resource is created has a palindrome name.\n\n    This policy accepts the following settings:\n\n    - `invert_behavior`: bool that inverts the policy behavior. If enabled, only palindrome names will be accepted.\n')),(0,a.kt)("p",null,"Now, let's annotate the policy:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ kwctl annotate policy.wasm \\\n    --metadata-path metadata.yml \\\n    --output-path annotated-policy.wasm\n")),(0,a.kt)("p",null,"This process performs some optimizations on the policy, so it's not\nuncommon to end up with a smaller annotated policy than the original\none. This depends a lot on the toolchain that was used to produce the\nunannotated WebAssembly object."),(0,a.kt)("p",null,"You can check with ",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl inspect")," that everything looks correct:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ kwctl inspect annotated-policy.wasm\n# here you will see a colored output of the metadata you provided on the `metadata.yml` file. This information is now read from the WebAssembly custom sections\n")),(0,a.kt)("h2",{id:"pushing-the-policy"},"Pushing the policy"),(0,a.kt)("p",null,"Pushing an annotated policy can be done in this way:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"$ kwctl push annotated-policy.wasm \\\n              <oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1\n")),(0,a.kt)("p",null,"It is discouraged to push unannotated policies. This is why by default\n",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl push")," will reject to push such a policy to an OCI registry. If\nyou really want to push an unannotated policy you can use the\n",(0,a.kt)("inlineCode",{parentName:"p"},"--force")," flag of ",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl push"),"."),(0,a.kt)("p",null,"The policy can then be referenced from the Kubewarden Policy Server or\n",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl")," as\n",(0,a.kt)("inlineCode",{parentName:"p"},"registry://<oci-registry>/kubewarden-policies/palindromify-policy:v0.0.1"),"."))}u.isMDXComponent=!0}}]);