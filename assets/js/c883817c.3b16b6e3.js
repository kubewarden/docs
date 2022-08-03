"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[5120],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return n?i.createElement(f,r(r({ref:t},c),{},{components:n})):i.createElement(f,r({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var s=2;s<o;s++)r[s]=n[s];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7834:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return u}});var i=n(3117),a=n(102),o=(n(7294),n(3905)),r=["components"],l={sidebar_label:"Create a New Policy",title:""},p="Create a new policy",s={unversionedId:"writing-policies/rego/open-policy-agent/create-policy",id:"writing-policies/rego/open-policy-agent/create-policy",title:"",description:"Let's create a sample policy that will help us go through some",source:"@site/docs/writing-policies/rego/open-policy-agent/02-create-policy.md",sourceDirName:"writing-policies/rego/open-policy-agent",slug:"/writing-policies/rego/open-policy-agent/create-policy",permalink:"/writing-policies/rego/open-policy-agent/create-policy",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/rego/open-policy-agent/02-create-policy.md",tags:[],version:"current",lastUpdatedAt:1659523996,formattedLastUpdatedAt:"Aug 3, 2022",sidebarPosition:2,frontMatter:{sidebar_label:"Create a New Policy",title:""},sidebar:"docs",previous:{title:"Introduction",permalink:"/writing-policies/rego/open-policy-agent/intro"},next:{title:"Build and Run",permalink:"/writing-policies/rego/open-policy-agent/build-and-run"}},c={},u=[{value:"Requirements",id:"requirements",level:2},{value:"The policy",id:"the-policy",level:2}],d={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"create-a-new-policy"},"Create a new policy"),(0,o.kt)("p",null,"Let's create a sample policy that will help us go through some\nimportant concepts. Let's start!"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"We also provide a GitHub repository template\nthat you can use to quickly port an existing policy."),(0,o.kt)("p",{parentName:"admonition"},"Check it out: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/opa-policy-template"},"kubewarden/opa-policy-template"))),(0,o.kt)("h2",{id:"requirements"},"Requirements"),(0,o.kt)("p",null,"We will write, compile and execute the policy on this section. You\nneed some tools in order to complete this tutorial:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/open-policy-agent/opa/releases"},(0,o.kt)("inlineCode",{parentName:"a"},"opa")),": we\nwill use the ",(0,o.kt)("inlineCode",{parentName:"p"},"opa")," CLI to build our policy to a ",(0,o.kt)("inlineCode",{parentName:"p"},"wasm")," target.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kwctl/releases"},(0,o.kt)("inlineCode",{parentName:"a"},"kwctl")),": we will use\n",(0,o.kt)("inlineCode",{parentName:"p"},"kwctl")," to execute our built policy."))),(0,o.kt)("h2",{id:"the-policy"},"The policy"),(0,o.kt)("p",null,"We are going to create a policy that evaluates any kind of namespaced\nresource. Its goal is to forbid the creation of any resource if the\ntarget namespace is ",(0,o.kt)("inlineCode",{parentName:"p"},"default"),". Otherwise, the request will be\naccepted. Let's start by creating a folder called ",(0,o.kt)("inlineCode",{parentName:"p"},"opa-policy"),"."),(0,o.kt)("p",null,"We are going to create a folder named ",(0,o.kt)("inlineCode",{parentName:"p"},"data")," inside of the\n",(0,o.kt)("inlineCode",{parentName:"p"},"opa-policy")," folder. This folder will contain the recorded\n",(0,o.kt)("inlineCode",{parentName:"p"},"AdmissionReview")," objects from the Kubernetes API server. I reduced\nthem greatly for the sake of simplicity for the exercise, so we can\nfocus on the bits that matter."),(0,o.kt)("p",null,"Let us first create a ",(0,o.kt)("inlineCode",{parentName:"p"},"default-ns.json")," file with the following\ncontents inside the ",(0,o.kt)("inlineCode",{parentName:"p"},"data")," directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "request": {\n    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n    "operation": "CREATE",\n    "object": {\n      "kind": "Pod",\n      "apiVersion": "v1",\n      "metadata": {\n        "name": "nginx",\n        "namespace": "default",\n        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"\n      }\n    }\n  }\n}\n')),(0,o.kt)("p",null,"This simulates a pod operation creation inside the ",(0,o.kt)("inlineCode",{parentName:"p"},"default"),"\nnamespace. Now, let's create another request example in\n",(0,o.kt)("inlineCode",{parentName:"p"},"other-ns.json")," inside the ",(0,o.kt)("inlineCode",{parentName:"p"},"data")," directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "request": {\n    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n    "operation": "CREATE",\n    "object": {\n      "kind": "Pod",\n      "apiVersion": "v1",\n      "metadata": {\n        "name": "nginx",\n        "namespace": "other",\n        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"\n      }\n    }\n  }\n}\n')),(0,o.kt)("p",null,"As you can see, this simulates another pod creation request, this time\nunder a namespace called ",(0,o.kt)("inlineCode",{parentName:"p"},"other"),"."),(0,o.kt)("p",null,"Let's go back to our ",(0,o.kt)("inlineCode",{parentName:"p"},"opa-policy")," folder and start writing our Rego policy."),(0,o.kt)("p",null,"Inside this folder, we create a file named ",(0,o.kt)("inlineCode",{parentName:"p"},"request.rego")," inside the\n",(0,o.kt)("inlineCode",{parentName:"p"},"opa-policy")," folder. The name can be anything, but we'll use that one\nfor this exercise. As the name suggests, this is a Rego file that has\nsome utility code regarding the request/response itself: in\nparticular, it allows us to simplify our policy code itself and reuse\nthis common bit across different policies if desired. The contents\nare:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rego"},'package policy\n\nimport data.kubernetes.admission\n\nmain = {\n    "apiVersion": "admission.k8s.io/v1",\n    "kind": "AdmissionReview",\n    "response": response,\n}\n\nresponse = {\n    "uid": input.request.uid,\n    "allowed": false,\n    "status": {"message": reason},\n} {\n    reason = concat(", ", admission.deny)\n    reason != ""\n} else = {\n    "uid": input.request.uid,\n    "allowed": true,\n} {\n    true\n}\n')),(0,o.kt)("p",null,"We will not go too deep into the Rego code itself. You can learn about\nit in ",(0,o.kt)("a",{parentName:"p",href:"https://www.openpolicyagent.org/docs/latest/policy-language/"},"its\nwebsite"),"."),(0,o.kt)("p",null,"Suffice to say that in this case, it will return either ",(0,o.kt)("inlineCode",{parentName:"p"},"allowed:\ntrue")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"allowed: false")," depending on whether other package\n(",(0,o.kt)("inlineCode",{parentName:"p"},"data.kubernetes.admission"),") has any ",(0,o.kt)("inlineCode",{parentName:"p"},"deny")," statement that evaluates\nto ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,o.kt)("p",null,"If any ",(0,o.kt)("inlineCode",{parentName:"p"},"data.kubernetes.admission.deny")," evaluates to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", the\n",(0,o.kt)("inlineCode",{parentName:"p"},"response")," here will evaluate to the first block. Otherwise, it will\nevaluate to the second block -- leading to acceptance, because no\n",(0,o.kt)("inlineCode",{parentName:"p"},"deny")," block evaluated to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", this means we are accepting the\nrequest."),(0,o.kt)("p",null,"Now, this is just the shell of the policy, the utility. Now, we create\nanother file, called, for example ",(0,o.kt)("inlineCode",{parentName:"p"},"policy.rego")," inside our\n",(0,o.kt)("inlineCode",{parentName:"p"},"opa-policy")," folder with the following contents:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rego"},'package kubernetes.admission\n\ndeny[msg] {\n    input.request.object.metadata.namespace == "default"\n    msg := "it is forbidden to use the default namespace"\n}\n')),(0,o.kt)("p",null,"This is our policy. The important part. ",(0,o.kt)("inlineCode",{parentName:"p"},"deny")," will evaluate to true\nif all statements within it evaluate to true. In this case, is only\none statement: checking if the namespace is ",(0,o.kt)("inlineCode",{parentName:"p"},"default"),"."),(0,o.kt)("p",null,"By Open Policy Agent design, ",(0,o.kt)("inlineCode",{parentName:"p"},"input")," contains the queriable object\nwith the ",(0,o.kt)("inlineCode",{parentName:"p"},"AdmissionReview")," object, so we can inspect it quite easily."),(0,o.kt)("p",null,"If everything went well, our tree should look like the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},".\n\u251c\u2500\u2500 data\n\u2502\xa0\xa0 \u251c\u2500\u2500 default-ns.json\n\u2502\xa0\xa0 \u2514\u2500\u2500 other-ns.json\n\u251c\u2500\u2500 policy.rego\n\u2514\u2500\u2500 request.rego\n\n1 directory, 4 files\n")))}m.isMDXComponent=!0}}]);