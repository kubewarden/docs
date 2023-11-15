"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[1529],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),o=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):d(d({},t),e)),n},c=function(e){var t=o(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=o(n),u=a,k=m["".concat(l,".").concat(u)]||m[u]||s[u]||i;return n?r.createElement(k,d(d({ref:t},c),{},{components:n})):r.createElement(k,d({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,d=new Array(i);d[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[m]="string"==typeof e?e:a,d[1]=p;for(var o=2;o<i;o++)d[o]=n[o];return r.createElement.apply(null,d)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},61325:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>s,frontMatter:()=>i,metadata:()=>p,toc:()=>o});var r=n(87462),a=(n(67294),n(3905));const i={sidebar_label:"Dependency matrix",title:"Dependency matrix",description:"Dependency matrix of Kubewarden.",keywords:["dependency","dependencies","CRD","charts","matrix"]},d=void 0,p={unversionedId:"operator-manual/dependency-matrix",id:"operator-manual/dependency-matrix",title:"Dependency matrix",description:"Dependency matrix of Kubewarden.",source:"@site/docs/operator-manual/dependency-matrix.md",sourceDirName:"operator-manual",slug:"/operator-manual/dependency-matrix",permalink:"/next/operator-manual/dependency-matrix",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/operator-manual/dependency-matrix.md",tags:[],version:"current",lastUpdatedAt:1700061578,formattedLastUpdatedAt:"Nov 15, 2023",frontMatter:{sidebar_label:"Dependency matrix",title:"Dependency matrix",description:"Dependency matrix of Kubewarden.",keywords:["dependency","dependencies","CRD","charts","matrix"]},sidebar:"docs",previous:{title:"Upgrade path",permalink:"/next/operator-manual/upgrade-path"},next:{title:"Metrics Reference Documentation",permalink:"/next/operator-manual/telemetry/metrics/reference"}},l={},o=[{value:"Opentelemetry, metrics and tracing dependencies",id:"opentelemetry-metrics-and-tracing-dependencies",level:3}],c={toc:o},m="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This page lists the dependencies of Kubewarden, with their relevant\nversion constraints. Versions outside of the provided ranges may work but are\nnot tested."),(0,a.kt)("h3",{id:"opentelemetry-metrics-and-tracing-dependencies"},"Opentelemetry, metrics and tracing dependencies"),(0,a.kt)("p",null,"At the time of writing, the ",(0,a.kt)("a",{parentName:"p",href:"https://opentelemetry.io"},"Opentelemetry")," stack\nkeeps improving. Still, is not yet stable, and unannounced\nbackwards-incompatible changes still happen. Kubewarden devs do their best to\ntrack Opentelemetry stack changes and adjust to them. Kubewarden is tested against a known working\nrange of Opentelemetry, metrics and tracing stack."),(0,a.kt)("h1",{id:"hard-dependencies"},"Hard dependencies"),(0,a.kt)("p",null,"Needed for Kubewarden deployments."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Chart dependency"),(0,a.kt)("th",{parentName:"tr",align:"center"},"Helm chart ",(0,a.kt)("inlineCode",{parentName:"th"},"appVersion")),(0,a.kt)("th",{parentName:"tr",align:"center"},"Helm chart ",(0,a.kt)("inlineCode",{parentName:"th"},"version")),(0,a.kt)("th",{parentName:"tr",align:"center"},"Comments"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"jetstack/cert-manager")," chart"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},">= 1.13 < 2")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Example: ",(0,a.kt)("inlineCode",{parentName:"td"},"v1.13.2")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Plans to make optional")))),(0,a.kt)("h1",{id:"optional-dependencies"},"Optional dependencies"),(0,a.kt)("p",null,"Needed for specific features."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Chart dependency"),(0,a.kt)("th",{parentName:"tr",align:"center"},"Helm chart ",(0,a.kt)("inlineCode",{parentName:"th"},"appVersion")),(0,a.kt)("th",{parentName:"tr",align:"center"},"Helm chart ",(0,a.kt)("inlineCode",{parentName:"th"},"version")),(0,a.kt)("th",{parentName:"tr",align:"center"},"Feature"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"open-telemetry/opentelemetry-operator")," chart"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},">= 0.85")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Example: ",(0,a.kt)("inlineCode",{parentName:"td"},"0.39.2")),(0,a.kt)("td",{parentName:"tr",align:"center"},"OTLM")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"prometheus-community/kube-prometheus-stack")," chart"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},">= v0.69")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Example: ",(0,a.kt)("inlineCode",{parentName:"td"},"51.5.3")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Metrics")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"jaegertracing/jaeger-operator")," chart"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},">= 1.49 < 2")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Example: ",(0,a.kt)("inlineCode",{parentName:"td"},"2.49.0")),(0,a.kt)("td",{parentName:"tr",align:"center"},"Tracing")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"kyverno/policy-reporter")," chart"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},">= 2 < 3")),(0,a.kt)("td",{parentName:"tr",align:"center"},"In ",(0,a.kt)("inlineCode",{parentName:"td"},"kubewarden-controller")," chart as subchart"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Policy Reports UI")))),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"CRD dependency"),(0,a.kt)("th",{parentName:"tr",align:"center"},"Version"),(0,a.kt)("th",{parentName:"tr",align:"center"},"Helm chart ",(0,a.kt)("inlineCode",{parentName:"th"},"version")),(0,a.kt)("th",{parentName:"tr",align:"center"},"Feature"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"policyreports.wgpolicyk8s.io")," CRDs"),(0,a.kt)("td",{parentName:"tr",align:"center"},(0,a.kt)("inlineCode",{parentName:"td"},"v1alpha1")),(0,a.kt)("td",{parentName:"tr",align:"center"},"In ",(0,a.kt)("inlineCode",{parentName:"td"},"kubewarden-defaults")," chart or manually installed"),(0,a.kt)("td",{parentName:"tr",align:"center"},"Audit Scanner")))),(0,a.kt)("h1",{id:"rancher"},"Rancher"),(0,a.kt)("p",null,"For downstream consumers such as Rancher, Kubewarden is tested against the\nmonitoring and tracing Helm charts provided in the Rancher charts repository."))}s.isMDXComponent=!0}}]);