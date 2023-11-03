"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[6609],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>k});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var d=n.createContext({}),p=function(e){var t=n.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(d.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,d=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),s=p(r),m=a,k=s["".concat(d,".").concat(m)]||s[m]||u[m]||o;return r?n.createElement(k,l(l({ref:t},c),{},{components:r})):n.createElement(k,l({ref:t},c))}));function k(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=m;var i={};for(var d in t)hasOwnProperty.call(t,d)&&(i[d]=t[d]);i.originalType=e,i[s]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3968:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_label:"Metrics Reference Documentation",title:""},l="Metrics Reference",i={unversionedId:"operator-manual/telemetry/metrics/reference",id:"version-1.8/operator-manual/telemetry/metrics/reference",title:"",description:"Kubewarden exposes some relevant metrics that enhance visibility of the platform, and allows cluster",source:"@site/versioned_docs/version-1.8/operator-manual/telemetry/metrics/02-reference.md",sourceDirName:"operator-manual/telemetry/metrics",slug:"/operator-manual/telemetry/metrics/reference",permalink:"/operator-manual/telemetry/metrics/reference",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/operator-manual/telemetry/metrics/02-reference.md",tags:[],version:"1.8",lastUpdatedAt:1699005473,formattedLastUpdatedAt:"Nov 3, 2023",sidebarPosition:2,frontMatter:{sidebar_label:"Metrics Reference Documentation",title:""},sidebar:"docs",previous:{title:"Threat Model",permalink:"/security/threat-model"},next:{title:"Custom Resources Definitions (CRDs)",permalink:"/operator-manual/CRDs"}},d={},p=[{value:"Policy Server",id:"policy-server",level:2},{value:"Metrics",id:"metrics",level:3},{value:"<code>kubewarden_policy_evaluations_total</code>",id:"kubewarden_policy_evaluations_total",level:4},{value:"Baggage",id:"baggage",level:5}],c={toc:p},s="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(s,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"metrics-reference"},"Metrics Reference"),(0,a.kt)("p",null,"Kubewarden exposes some relevant metrics that enhance visibility of the platform, and allows cluster\nadministrators and policy developers to identify patterns and potential issues."),(0,a.kt)("h2",{id:"policy-server"},"Policy Server"),(0,a.kt)("p",null,"The Policy Server is the component that initializes and runs policies. Upon receiving requests from\nthe Kubernetes API server, it will forward the request to the policy, and return the response\nprovided by the policy to the Kubernetes API server."),(0,a.kt)("h3",{id:"metrics"},"Metrics"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Baggage are key-value attributes added to the metric. They are used to enrich the metric\nwith additional information.")),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null}))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"kubewarden_policy_evaluations_total")),(0,a.kt)("td",{parentName:"tr",align:null},"Counter"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("a",{parentName:"td",href:"#kubewarden_policy_evaluations_total"},"Baggage"))))),(0,a.kt)("h4",{id:"kubewarden_policy_evaluations_total"},(0,a.kt)("inlineCode",{parentName:"h4"},"kubewarden_policy_evaluations_total")),(0,a.kt)("h5",{id:"baggage"},"Baggage"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Label"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"policy_name")),(0,a.kt)("td",{parentName:"tr",align:null},"Name of the policy")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"resource_name")),(0,a.kt)("td",{parentName:"tr",align:null},"Name of the evaluated resource")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"resource_kind")),(0,a.kt)("td",{parentName:"tr",align:null},"Kind of the evaluated resource")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"resource_namespace")),(0,a.kt)("td",{parentName:"tr",align:null},"Namespace of the evaluated resource. Not present if the resource is cluster scoped.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"resource_request_operation")),(0,a.kt)("td",{parentName:"tr",align:null},"Operation type: ",(0,a.kt)("inlineCode",{parentName:"td"},"CREATE"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"UPDATE"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"DELETE"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"PATCH"),", ",(0,a.kt)("inlineCode",{parentName:"td"},"WATCH"),"...")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"accepted")),(0,a.kt)("td",{parentName:"tr",align:null},"Whether the request was accepted or not")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"mutated")),(0,a.kt)("td",{parentName:"tr",align:null},"Whether the request was mutated or not")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"error_code")),(0,a.kt)("td",{parentName:"tr",align:null},"Error code returned by the policy in case of rejection, if any. Not present if the policy didn't provide one.")))))}u.isMDXComponent=!0}}]);