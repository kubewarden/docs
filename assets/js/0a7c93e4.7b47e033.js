"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[5607],{3905:(e,t,i)=>{i.d(t,{Zo:()=>c,kt:()=>f});var r=i(7294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)i=o[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)i=o[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):a(a({},t),e)),i},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var i=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(i),d=n,f=u["".concat(s,".").concat(d)]||u[d]||m[d]||o;return i?r.createElement(f,a(a({ref:t},c),{},{components:i})):r.createElement(f,a({ref:t},c))}));function f(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=i.length,a=new Array(o);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:n,a[1]=l;for(var p=2;p<o;p++)a[p]=i[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,i)}d.displayName="MDXCreateElement"},211:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=i(7462),n=(i(7294),i(3905));const o={sidebar_label:"Swift",title:""},a="Swift",l={unversionedId:"writing-policies/swift",id:"version-1.7/writing-policies/swift",title:"",description:"As stated on the official website:",source:"@site/versioned_docs/version-1.7/writing-policies/swift.md",sourceDirName:"writing-policies",slug:"/writing-policies/swift",permalink:"/1.7/writing-policies/swift",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/writing-policies/swift.md",tags:[],version:"1.7",lastUpdatedAt:1699005473,formattedLastUpdatedAt:"Nov 3, 2023",frontMatter:{sidebar_label:"Swift",title:""},sidebar:"docs",previous:{title:"C#",permalink:"/1.7/writing-policies/dotnet"},next:{title:"TypeScript",permalink:"/1.7/writing-policies/typescript"}},s={},p=[{value:"Current State",id:"current-state",level:2},{value:"More examples",id:"more-examples",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...i}=e;return(0,n.kt)(u,(0,r.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"swift"},"Swift"),(0,n.kt)("p",null,"As stated on the ",(0,n.kt)("a",{parentName:"p",href:"https://swift.org/"},"official website"),":"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"Swift is a general-purpose programming language built using a modern approach\nto safety, performance, and software design patterns.")),(0,n.kt)("p",null,"The swift compiler doesn't yet have WebAssembly support, however the\n",(0,n.kt)("a",{parentName:"p",href:"https://swiftwasm.org/"},"Swiftwasm")," provides a patched compiler with this\ncapability."),(0,n.kt)("p",null,"The Swiftwasm team is also working to upstream all these changes into the\nSwift project. In the meantime the toolchain provided by the Swiftwasm project\ncan be used to build Kubewarden policies."),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},"You don't need an Apple system to write or run Swift code. Everything\ncan be done also on a Linux machine or on Windows (by using Docker for Windows).")),(0,n.kt)("h2",{id:"current-state"},"Current State"),(0,n.kt)("p",null,"Policy authors can leverage the following resources:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/policy-sdk-swift"},"Kubewarden Swift SDK"),": this\nprovides a set of ",(0,n.kt)("inlineCode",{parentName:"li"},"struct")," and functions that simplify the process of\nwriting policies."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/swift-policy-template"},"Kubewarden Swift template project"),":\nuse this template to quickly scaffold a Swift-based policy. The template comes\nwith a working policy and a set of GitHub Actions to automate its lifecycle.")),(0,n.kt)("p",null,"No severe limitations have been found inside of Swift, only\nsome minor glitches:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"It's critical to perform some post-build optimizations before using the\npolicy ",(0,n.kt)("em",{parentName:"li"},'"in production"'),":",(0,n.kt)("ol",{parentName:"li"},(0,n.kt)("li",{parentName:"ol"},"Strip the Wasm module via ",(0,n.kt)("inlineCode",{parentName:"li"},"wasm-strip")," to reduce its size"),(0,n.kt)("li",{parentName:"ol"},"Optimize the Wasm module via ",(0,n.kt)("inlineCode",{parentName:"li"},"wasm-opt"))))),(0,n.kt)("p",null,"The GitHub Action provided by the template repository already takes care of that."),(0,n.kt)("h2",{id:"more-examples"},"More examples"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/pod-runtime-class-policy"},"This GitHub repository"),"\ncontains a Kubewarden Policy written in Swift."))}m.isMDXComponent=!0}}]);