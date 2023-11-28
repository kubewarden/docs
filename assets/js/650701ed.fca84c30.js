"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[5195],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),g=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=g(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=g(n),d=i,m=c["".concat(s,".").concat(d)]||c[d]||p[d]||o;return n?r.createElement(m,a(a({ref:t},u),{},{components:n})):r.createElement(m,a({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,a[1]=l;for(var g=2;g<o;g++)a[g]=n[g];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},86974:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>g});var r=n(87462),i=(n(67294),n(3905));const o={sidebar_label:"Logging",title:"Logging",description:"How to use logging functionality when writing a Kubewarden policy in Rust.",keywords:["Kubewarden","kubernetes","logging"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","logging"],"doc-persona":["kubewarden-developer","kubewarden-developer-rust"]},a=void 0,l={unversionedId:"writing-policies/rust/logging",id:"writing-policies/rust/logging",title:"Logging",description:"How to use logging functionality when writing a Kubewarden policy in Rust.",source:"@site/docs/writing-policies/rust/06-logging.md",sourceDirName:"writing-policies/rust",slug:"/writing-policies/rust/logging",permalink:"/next/writing-policies/rust/logging",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/rust/06-logging.md",tags:[],version:"current",lastUpdatedAt:1701171224,formattedLastUpdatedAt:"Nov 28, 2023",sidebarPosition:6,frontMatter:{sidebar_label:"Logging",title:"Logging",description:"How to use logging functionality when writing a Kubewarden policy in Rust.",keywords:["Kubewarden","kubernetes","logging"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","logging"],"doc-persona":["kubewarden-developer","kubewarden-developer-rust"]},sidebar:"docs",previous:{title:"Creating a new mutation policy",permalink:"/next/writing-policies/rust/mutation-policy"},next:{title:"Building and distributing policies",permalink:"/next/writing-policies/rust/build-and-distribute"}},s={},g=[{value:"Initialize logger",id:"initialize-logger",level:2},{value:"Consuming the logger",id:"consuming-the-logger",level:2}],u={toc:g},c="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"You can have your policy perform logging.\nThe ",(0,i.kt)("inlineCode",{parentName:"p"},"policy-server")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," forwards those log entries with the appropriate information."),(0,i.kt)("p",null,"The logging library chosen for the Rust SDK is\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/slog-rs/slog"},(0,i.kt)("inlineCode",{parentName:"a"},"slog")),".\nIt's a popular, well known crate and integrates cleanly with Kubewarden."),(0,i.kt)("h2",{id:"initialize-logger"},"Initialize logger"),(0,i.kt)("p",null,"The project recommends you create a global sink you can log to, from where needed in your policy.\nFor this, use the ",(0,i.kt)("inlineCode",{parentName:"p"},"lazy_static")," crate:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-rust"},'use slog::{o, Logger};\n\nlazy_static! {\n    static ref LOG_DRAIN: Logger = Logger::root(\n        logging::KubewardenDrain::new(),\n        o!("policy" => "sample-policy")\n    );\n}\n')),(0,i.kt)("h2",{id:"consuming-the-logger"},"Consuming the logger"),(0,i.kt)("p",null,"Now, from within the ",(0,i.kt)("inlineCode",{parentName:"p"},"validate"),", or ",(0,i.kt)("inlineCode",{parentName:"p"},"validate_settings")," functions,\nyou can log using the macros exported by ",(0,i.kt)("inlineCode",{parentName:"p"},"slog")," that match each supported logging level:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-rust"},'use slog::{info, o, warn, Logger};\n\nfn validate(payload: &[u8]) -> CallResult {\n    // ...\n    info!(LOG_DRAIN, "starting validation");\n    // ...\n    warn!(\n        LOG_DRAIN, "structured log";\n        "some_resource_name" => &some_resource_name\n    );\n    // ...\n}\n')),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"slog")," library sends all logs to the drain initialized in the global variable.\nThis synchronizes to the policy evaluator executing the policy.\nThis is either ",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," or the ",(0,i.kt)("inlineCode",{parentName:"p"},"policy-server"),".\nThen the policy evaluator logs this information,\nadding further known contextual information,\nsuch as the Kubernetes request ",(0,i.kt)("inlineCode",{parentName:"p"},"uid"),"."),(0,i.kt)("p",null,"More information about the\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.rs/slog/2.7.0/slog/macro.log.html"},"logging macros"),"\noffered by slog are in its\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.rs/slog/2.7.0/slog/index.html"},"documentation"),"."))}p.isMDXComponent=!0}}]);