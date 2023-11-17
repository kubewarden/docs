"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[802],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>h});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||o;return n?a.createElement(h,i(i({ref:t},s),{},{components:n})):a.createElement(h,i({ref:t},s))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[u]="string"==typeof e?e:r,i[1]=p;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},78460:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>p,toc:()=>d});var a=n(87462),r=(n(67294),n(3905));const o={sidebar_label:"Upgrade path",title:"Upgrade path",description:"Upgrade path for the Kubewarden stack.",keywords:["upgrade path","support"]},i="Kubewarden stack versioning",p={unversionedId:"operator-manual/upgrade-path",id:"operator-manual/upgrade-path",title:"Upgrade path",description:"Upgrade path for the Kubewarden stack.",source:"@site/docs/operator-manual/upgrade-path.md",sourceDirName:"operator-manual",slug:"/operator-manual/upgrade-path",permalink:"/next/operator-manual/upgrade-path",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/operator-manual/upgrade-path.md",tags:[],version:"current",lastUpdatedAt:1700231811,formattedLastUpdatedAt:"Nov 17, 2023",frontMatter:{sidebar_label:"Upgrade path",title:"Upgrade path",description:"Upgrade path for the Kubewarden stack.",keywords:["upgrade path","support"]},sidebar:"docs",previous:{title:"Threat Model",permalink:"/next/security/threat-model"},next:{title:"Dependency matrix",permalink:"/next/operator-manual/dependency-matrix"}},l={},d=[{value:"Stack version compatibility among components",id:"stack-version-compatibility-among-components",level:2},{value:"Helm chart versions",id:"helm-chart-versions",level:2},{value:"Upgrade paths",id:"upgrade-paths",level:2},{value:"Upgrade order",id:"upgrade-order",level:2}],s={toc:d},u="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"kubewarden-stack-versioning"},"Kubewarden stack versioning"),(0,r.kt)("p",null,"The Kubewarden project uses ",(0,r.kt)("a",{parentName:"p",href:"https://semver.org/"},"Semantic versioning"),'\nto define the "stack" version of all its components: the version follows the\n',(0,r.kt)("inlineCode",{parentName:"p"},"MAJOR.MINOR.PATCH")," pattern. The supported version is only the latest release."),(0,r.kt)("p",null,'The Kubewarden components that follow the rules for the "stack" version are:'),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-crds")," chart, in their appVersion field."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-controller")," chart, in their appVersion field."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-defaults")," chart, in their appVersion field."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"policy-server")," image tag for manually deployed ones. The resource for the\ndefault one is already managed by the ",(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-defaults")," chart."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"kwctl")," binary.")),(0,r.kt)("h2",{id:"stack-version-compatibility-among-components"},"Stack version compatibility among components"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-crds")," chart, ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," chart, ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults"),"\nchart, any manually deployed ",(0,r.kt)("inlineCode",{parentName:"p"},"policy-server")," image, and ",(0,r.kt)("inlineCode",{parentName:"p"},"kwctl")," should run the\nsame ",(0,r.kt)("inlineCode",{parentName:"p"},"MAJOR"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"MINOR"),". The ",(0,r.kt)("inlineCode",{parentName:"p"},"PATCH")," version can increase independently though."),(0,r.kt)("p",null,"Therefore, if the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," version running is ",(0,r.kt)("inlineCode",{parentName:"p"},"1.1.x"),", the\n",(0,r.kt)("inlineCode",{parentName:"p"},"policy-server"),"s and ",(0,r.kt)("inlineCode",{parentName:"p"},"kwctl")," version in use should be ",(0,r.kt)("inlineCode",{parentName:"p"},"1.1.x")," as well."),(0,r.kt)("h2",{id:"helm-chart-versions"},"Helm chart versions"),(0,r.kt)("p",null,"Helm charts define the ",(0,r.kt)("inlineCode",{parentName:"p"},"version")," field and the ",(0,r.kt)("inlineCode",{parentName:"p"},"appVersion")," field. The ",(0,r.kt)("inlineCode",{parentName:"p"},"appVersion"),' field informs\nof the Kubewarden "stack" version as talked before. The ',(0,r.kt)("inlineCode",{parentName:"p"},"version")," field also\nfollows ",(0,r.kt)("a",{parentName:"p",href:"https://semver.org/"},"Semantic versioning")," and informs of\nbackwards-compatible changes in the chart templates and ",(0,r.kt)("inlineCode",{parentName:"p"},"values.yaml"),"."),(0,r.kt)("h2",{id:"upgrade-paths"},"Upgrade paths"),(0,r.kt)("p",null,"When upgrading components, it is allowed to upgrade multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"PATCH")," stack versions\nin a single operation. However, the upgrade of multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"MAJOR")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"MINOR")," stack versions\nin a single upgrade is ",(0,r.kt)("strong",{parentName:"p"},"not")," supported."),(0,r.kt)("figure",null,(0,r.kt)("mermaid",{value:'%%{init: "theme": "neutral"}%%\nflowchart LR;\n  1.0.0(1.0.0)--\x3e1.0.1(1.0.1);\n  1.0.1--\x3e1.0.2(1.0.2);\n  1.0.2--\x3e1.1.0(1.1.0);\n  1.1.0--\x3e1.1.2(1.1.2);\n  1.1.0--\x3e1.1.1;\n  1.1.1--\x3e1.1.2;\n  1.1.2--\x3e|Not recommended|1.2.0(1.2.0);\n  1.0.2--\x3e|Not supported|1.2.0(1.2.0);\n  1.1.2--\x3e1.2.1(1.2.1);\n  1.2.0--\x3e1.2.1;\n  linkStyle 6 color:brown,stroke-width:2px,stroke-dasharray: 3 5\n  linkStyle 7 color:red,stroke-width:2px,stroke-dasharray: 3 5'}),(0,r.kt)("figcaption",null,"Upgrade path suppport graph")),(0,r.kt)("p",null,"For example, the user is allowed to upgrade components from version ",(0,r.kt)("inlineCode",{parentName:"p"},"1.1.10")," to\n",(0,r.kt)("inlineCode",{parentName:"p"},"1.1.50")," in a single upgrade. But the upgrade from ",(0,r.kt)("inlineCode",{parentName:"p"},"1.1.10")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"1.5.0")," is not supported.\nIn these cases, the user must upgrade individually to each ",(0,r.kt)("inlineCode",{parentName:"p"},"MAJOR"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"MINOR")," version\nbetween the two versions. Therefore, it's necessary to upgrade ",(0,r.kt)("inlineCode",{parentName:"p"},"1.1.10")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"1.2.0"),"\nthen ",(0,r.kt)("inlineCode",{parentName:"p"},"1.3.0")," then ",(0,r.kt)("inlineCode",{parentName:"p"},"1.4.0")," and finally to ",(0,r.kt)("inlineCode",{parentName:"p"},"1.5.0"),". Users that want to upgrade one\n",(0,r.kt)("inlineCode",{parentName:"p"},"MAJOR")," version to another, also need to follow all the ",(0,r.kt)("inlineCode",{parentName:"p"},"MINOR")," updates between the\ntwo ",(0,r.kt)("inlineCode",{parentName:"p"},"MAJOR")," versions."),(0,r.kt)("h2",{id:"upgrade-order"},"Upgrade order"),(0,r.kt)("p",null,"Kuberwarden users should upgrade the stack starting with the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-crds"),"\nchart, then the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," chart. After that, upgrade the\n",(0,r.kt)("inlineCode",{parentName:"p"},"policy-server")," (via ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults")," chart or bumping the images of\ncustom ones) and ",(0,r.kt)("inlineCode",{parentName:"p"},"kwctl"),"."),(0,r.kt)("h1",{id:"downgrades"},"Downgrades"),(0,r.kt)("p",null,"Downgrades are ",(0,r.kt)("strong",{parentName:"p"},"not")," supported, and haven't been tested. Nevertheless,\nthere's a reasonable expectation that they should work."),(0,r.kt)("h1",{id:"sdks-policies"},"SDKs, policies"),(0,r.kt)("p",null,"Policy SDKs for the different languages, and policies maintained by the\nKubewarden team follow their own semantic versioning and are supported on their\nlatest release. There is no need for an upgrade path for them, just a bump to\nthe latest release."),(0,r.kt)("p",null,"Changes to the Kubewarden stack may mean that policies and SDKs receive updates\nto make use of the latest Kubewarden features. Care is taken to perform these updates\nin a backwards-compatible manner."),(0,r.kt)("p",null,"For example, a Kubewarden minor version adding support for Audit Scanner\n(",(0,r.kt)("inlineCode",{parentName:"p"},"v1.7.0"),") means that policies gained a new ",(0,r.kt)("inlineCode",{parentName:"p"},"spec.backgroundAudit")," field,\noptional, backwards-compatible and set to ",(0,r.kt)("inlineCode",{parentName:"p"},"true")," by default."))}c.isMDXComponent=!0}}]);