"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[2461],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>y});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=l(n),y=i,f=d["".concat(c,".").concat(y)]||d[y]||u[y]||o;return n?r.createElement(f,s(s({ref:t},p),{},{components:n})):r.createElement(f,s({ref:t},p))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=d;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var l=2;l<o;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},402:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var r=n(3117),i=(n(7294),n(3905));const o={sidebar_label:"Testing Policies",title:""},s="Testing Policies",a={unversionedId:"testing-policies/intro",id:"testing-policies/intro",title:"",description:"This section covers the topic of testing Kubewarden Policies. There are two possible",source:"@site/docs/testing-policies/01-intro.md",sourceDirName:"testing-policies",slug:"/testing-policies/intro",permalink:"/testing-policies/intro",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/testing-policies/01-intro.md",tags:[],version:"current",lastUpdatedAt:1671477327,formattedLastUpdatedAt:"Dec 19, 2022",sidebarPosition:1,frontMatter:{sidebar_label:"Testing Policies",title:""},sidebar:"docs",previous:{title:"Secure Supply Chain",permalink:"/distributing-policies/secure-supply-chain"},next:{title:"Policy Authors",permalink:"/testing-policies/policy-authors"}},c={},l=[],p={toc:l};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"testing-policies"},"Testing Policies"),(0,i.kt)("p",null,"This section covers the topic of testing Kubewarden Policies. There are two possible\npersonas interested in testing policies:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"As a policy author: you're writing a Kubewarden Policy and you want to ensure\nyour code behaves the way you expect."),(0,i.kt)("li",{parentName:"ul"},"As an end user: you found a Kubewarden Policy and you want to tune/test the policy\nsettings before deploying it, maybe you want to keep testing these settings\ninside of your CI/CD pipelines,...")),(0,i.kt)("p",null,"The next sections of the documentation will show how Kubewarden policies can\nbe tested by these two personas."))}u.isMDXComponent=!0}}]);