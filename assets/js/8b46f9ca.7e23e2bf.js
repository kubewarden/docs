"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[7166],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=i.createContext({}),c=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=c(e.components);return i.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,g=d["".concat(p,".").concat(m)]||d[m]||u[m]||a;return n?i.createElement(g,o(o({ref:t},s),{},{components:n})):i.createElement(g,o({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<a;c++)o[c]=n[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1546:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var i=n(3117),r=(n(7294),n(3905));const a={sidebar_label:"Create a New Policy",title:""},o="Create a new policy",l={unversionedId:"writing-policies/rego/gatekeeper/create-policy",id:"writing-policies/rego/gatekeeper/create-policy",title:"",description:"Let's implement the same policy that [we wrote with Open Policy",source:"@site/docs/writing-policies/rego/gatekeeper/02-create-policy.md",sourceDirName:"writing-policies/rego/gatekeeper",slug:"/writing-policies/rego/gatekeeper/create-policy",permalink:"/writing-policies/rego/gatekeeper/create-policy",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/rego/gatekeeper/02-create-policy.md",tags:[],version:"current",lastUpdatedAt:1678467303,formattedLastUpdatedAt:"Mar 10, 2023",sidebarPosition:2,frontMatter:{sidebar_label:"Create a New Policy",title:""},sidebar:"docs",previous:{title:"Introduction",permalink:"/writing-policies/rego/gatekeeper/intro"},next:{title:"Build and Run",permalink:"/writing-policies/rego/gatekeeper/build-and-run"}},p={},c=[{value:"Requirements",id:"requirements",level:2},{value:"The policy",id:"the-policy",level:2}],s={toc:c};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,i.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"create-a-new-policy"},"Create a new policy"),(0,r.kt)("p",null,"Let's implement the same policy that ",(0,r.kt)("a",{parentName:"p",href:"/writing-policies/rego/open-policy-agent/create-policy"},"we wrote with Open Policy\nAgent"),": a policy that\nrejects a resource if it's targeting the ",(0,r.kt)("inlineCode",{parentName:"p"},"default")," namespace."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"We also provide a GitHub repository template\nthat you can use to quickly port an existing policy."),(0,r.kt)("p",{parentName:"admonition"},"Check it out: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/gatekeeper-policy-template"},"kubewarden/gatekeeper-policy-template"))),(0,r.kt)("h2",{id:"requirements"},"Requirements"),(0,r.kt)("p",null,"As in the previous section, we will require the following tools:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"opa")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"kwctl"))),(0,r.kt)("h2",{id:"the-policy"},"The policy"),(0,r.kt)("p",null,"Gatekeeper policies must return none or more violation objects. If no\nviolations are reported, the request will be accepted. If one, or more\nviolations are reported, the request will be rejected."),(0,r.kt)("p",null,"We create a new folder, named ",(0,r.kt)("inlineCode",{parentName:"p"},"rego-policy"),". Inside of it, we create a\n",(0,r.kt)("inlineCode",{parentName:"p"},"policy.rego")," file with contents:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rego"},'package policy\n\nviolation[{"msg": msg}] {\n        input.review.object.metadata.namespace == "default"\n        msg := "it is forbidden to use the default namespace"\n}\n')),(0,r.kt)("p",null,"In this case, our entrypoint is ",(0,r.kt)("inlineCode",{parentName:"p"},"policy/violation"),", and because of how\nRego works, the policy can have the following outcomes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"return 1 violation: the object being reviewed is targeting the\ndefault namespace.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"return 0 violations: the object being reviewed is compliant with the\npolicy."))),(0,r.kt)("p",null,"Take a moment to compare this policy with the one we wrote in the Open\nPolicy Agent section. That one had to build the whole\n",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionReview")," response, and the inputs were slightly\ndifferent. In the Gatekeeper mode, the ",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionRequest")," object is\nprovided at the ",(0,r.kt)("inlineCode",{parentName:"p"},"input.review")," attribute. All attributes of the\n",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionRequest")," are readable along with ",(0,r.kt)("inlineCode",{parentName:"p"},"object"),"."),(0,r.kt)("p",null,"Now, let's create the requests that we are going to evaluate in the\nnext section."),(0,r.kt)("p",null,"Let us first create a ",(0,r.kt)("inlineCode",{parentName:"p"},"default-ns.json")," file with the following\ncontents inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"data")," directory:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "request": {\n    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n    "operation": "CREATE",\n    "object": {\n      "kind": "Pod",\n      "apiVersion": "v1",\n      "metadata": {\n        "name": "nginx",\n        "namespace": "default",\n        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"\n      }\n    }\n  }\n}\n')),(0,r.kt)("p",null,"Now, let's create another ",(0,r.kt)("inlineCode",{parentName:"p"},"AdmissionReview")," object that this time is\ntargeting a namespace different than the ",(0,r.kt)("inlineCode",{parentName:"p"},"default")," one. Let us name\nthis file ",(0,r.kt)("inlineCode",{parentName:"p"},"other-ns.json"),". It has the following contents:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "request": {\n    "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n    "operation": "CREATE",\n    "object": {\n      "kind": "Pod",\n      "apiVersion": "v1",\n      "metadata": {\n        "name": "nginx",\n        "namespace": "other",\n        "uid": "04dc7a5e-e1f1-4e34-8d65-2c9337a43e64"\n      }\n    }\n  }\n}\n')),(0,r.kt)("p",null,"As you can see, this simulates another pod creation request, this time\nunder a namespace called ",(0,r.kt)("inlineCode",{parentName:"p"},"other"),"."))}u.isMDXComponent=!0}}]);