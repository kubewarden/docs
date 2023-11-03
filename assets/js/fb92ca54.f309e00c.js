"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[7482],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,h=u["".concat(s,".").concat(d)]||u[d]||g[d]||r;return n?i.createElement(h,a(a({ref:t},c),{},{components:n})):i.createElement(h,a({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var p=2;p<r;p++)a[p]=n[p];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1859:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>g,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=n(7462),o=(n(7294),n(3905));const r={sidebar_label:"Introduction to Rego",title:""},a="Rego",l={unversionedId:"writing-policies/rego/intro-rego",id:"version-1.8/writing-policies/rego/intro-rego",title:"",description:"Rego support has been introduced starting from these releases:",source:"@site/versioned_docs/version-1.8/writing-policies/rego/01-intro-rego.md",sourceDirName:"writing-policies/rego",slug:"/writing-policies/rego/intro-rego",permalink:"/writing-policies/rego/intro-rego",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/writing-policies/rego/01-intro-rego.md",tags:[],version:"1.8",lastUpdatedAt:1699005473,formattedLastUpdatedAt:"Nov 3, 2023",sidebarPosition:1,frontMatter:{sidebar_label:"Introduction to Rego",title:""},sidebar:"docs",previous:{title:"Validate doing JSON queries",permalink:"/writing-policies/go/validation-with-queries"},next:{title:"Builtin Support",permalink:"/writing-policies/rego/builtin-support"}},s={},p=[{value:"One language. Two frameworks",id:"one-language-two-frameworks",level:2},{value:"Open Policy Agent",id:"open-policy-agent",level:3},{value:"Gatekeeper",id:"gatekeeper",level:3},{value:"Looking at the differences",id:"looking-at-the-differences",level:2},{value:"Entry point",id:"entry-point",level:2},{value:"Current limitations",id:"current-limitations",level:2},{value:"Context-aware policies",id:"context-aware-policies",level:3},{value:"Mutating policies",id:"mutating-policies",level:3}],c={toc:p},u="wrapper";function g(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"rego"},"Rego"),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Rego support has been introduced starting from these releases:"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"kwctl: v0.2.0"),(0,o.kt)("li",{parentName:"ul"},"policy-server: v0.2.0"))),(0,o.kt)("p",null,"The Rego language is a tailor made language designed to embrace\npolicies as\ncode. ",(0,o.kt)("a",{parentName:"p",href:"https://www.openpolicyagent.org/docs/latest/policy-language/"},"Rego"),"\nis a language inspired by Datalog."),(0,o.kt)("p",null,"There are two ways of writing Rego policies as of today in order to\nimplement policies as code in Kubernetes: Open Policy Agent and\nGatekeeper."),(0,o.kt)("p",null,"While the next couple of sections detail how the two frameworks are different\neven though the same language is used, if you're more interested in the Kubewarden\nimplementation you may directly visit the framework-specific documentation we have linked below."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/writing-policies/rego/open-policy-agent/intro"},"Open Policy Agent")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/writing-policies/rego/gatekeeper/intro"},"Gatekeeper"))),(0,o.kt)("h2",{id:"one-language-two-frameworks"},"One language. Two frameworks"),(0,o.kt)("h3",{id:"open-policy-agent"},"Open Policy Agent"),(0,o.kt)("p",null,"Open Policy Agent is a project that allows you to implement policies\nas code in any project. You can rely on Open Policy Agent for any\npolicy based check that you might require in your own application,\nthat will in turn execute the required Rego policies."),(0,o.kt)("p",null,"In this context, writing policies for Kubernetes is just another way\nof exercising Open Policy Agent. By using Kubernetes admission\nwebhooks, it's possible to evaluate requests using Open Policy Agent,\nthat will in turn execute the policies written in Rego."),(0,o.kt)("p",null,"Open Policy Agent has some optional integration with Kubernetes\nthrough its ",(0,o.kt)("inlineCode",{parentName:"p"},"kube-mgmt")," sidecar. When deployed on top of Kubernetes\nand next to the Open Policy Agent server evaluating the Rego policies,\nit is able to replicate the configured Kubernetes resources into Rego\n-- so those Kubernetes resources are visible to all policies. It also\nlets you define policies inside Kubernetes' ConfigMap objects. You can\nread more about it on ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/open-policy-agent/kube-mgmt"},"its project\npage"),"."),(0,o.kt)("h3",{id:"gatekeeper"},"Gatekeeper"),(0,o.kt)("p",null,"Gatekeeper is very different from Open Policy Agent in this regard. It\nis focused exclusively to be used in Kubernetes, and takes advantage\nof that as much as it can, making some Kubernetes workflows easier\nthan Open Policy Agent in many cases."),(0,o.kt)("h2",{id:"looking-at-the-differences"},"Looking at the differences"),(0,o.kt)("p",null,"Both Open Policy Agent and Gatekeeper policies use Rego to describe\ntheir policies as code. However, this is only one part of the\npuzzle. Each solution has differences when it comes to writing real\npolicies in Rego, and we are going to look at those differences in the\nnext sections."),(0,o.kt)("h2",{id:"entry-point"},"Entry point"),(0,o.kt)("p",null,"The entry point is the name of a rule within a package, and is the\nrule to be invoked by the runtime when the policy is instantiated."),(0,o.kt)("h2",{id:"current-limitations"},"Current limitations"),(0,o.kt)("h3",{id:"context-aware-policies"},"Context-aware policies"),(0,o.kt)("p",null,"Context-aware policies are policies that don't evaluate the input\nrequest in isolation. They take other factors into account in order to\ntake a decision. For example, a policy that evaluates namespaced\nresources and uses an annotation on the parent namespace to configure\nsomething on the policy. Another example would be a policy that\nevaluates ",(0,o.kt)("inlineCode",{parentName:"p"},"Ingress")," resources, but that in order to take a decision\nhas the list of the already existing ",(0,o.kt)("inlineCode",{parentName:"p"},"Ingress")," resources."),(0,o.kt)("p",null,"The concept of context-aware policies can also extend to custom\nresources, so your policy might want to evaluate a request based on\ncurrently persisted custom resources as well."),(0,o.kt)("p",null,"Both Open Policy Agent and Gatekeeper support context-aware\npolicies. Right now Kubewarden implements this functionality only for\npolicies written with the Kubewarden SDK. We have plans to fill this\ngap, to allow Rego policies to be context-aware policies too."),(0,o.kt)("h3",{id:"mutating-policies"},"Mutating policies"),(0,o.kt)("p",null,"Gatekeeper has support for mutating policies, but Kubewarden has not\nyet implemented mutating policies with Gatekeeper compatibility. You\ncan use policies that use the Kubewarden SDK to write mutating\npolicies, but at the time of writing, you cannot run Gatekeeper\nmutating policies in Kubewarden yet."))}g.isMDXComponent=!0}}]);