"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[4307],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var g=r.createContext({}),u=function(e){var t=r.useContext(g),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(g.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,g=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),s=u(n),d=o,m=s["".concat(g,".").concat(d)]||s[d]||p[d]||i;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=s;var l={};for(var g in t)hasOwnProperty.call(t,g)&&(l[g]=t[g]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},1232:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return g},default:function(){return d},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return p}});var r=n(3117),o=n(102),i=(n(7294),n(3905)),a=["components"],l={sidebar_label:"Logging",title:""},g="Logging",u={unversionedId:"writing-policies/go/logging",id:"writing-policies/go/logging",title:"",description:"The Go SDK integrates with the onelog project almost out",source:"@site/docs/writing-policies/go/06-logging.md",sourceDirName:"writing-policies/go",slug:"/writing-policies/go/logging",permalink:"/writing-policies/go/logging",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/go/06-logging.md",tags:[],version:"current",lastUpdatedAt:1659523996,formattedLastUpdatedAt:"Aug 3, 2022",sidebarPosition:6,frontMatter:{sidebar_label:"Logging",title:""},sidebar:"docs",previous:{title:"End-to-end testing",permalink:"/writing-policies/go/e2e-tests"},next:{title:"GitHub Action Integration",permalink:"/writing-policies/go/automate"}},c={},p=[{value:"Initialize logger",id:"initialize-logger",level:2},{value:"Consuming the logger",id:"consuming-the-logger",level:2}],s={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"logging"},"Logging"),(0,i.kt)("p",null,"The Go SDK integrates with the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/francoispqt/onelog"},(0,i.kt)("inlineCode",{parentName:"a"},"onelog"))," project almost out\nof the box. The reasons why this library has been chosen are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"It works with WebAssembly binaries. Other popular logging solutions cannot even be built to\nWebAssembly.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"It provides ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/francoispqt/onelog#benchmarks"},"good performance"),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"It supports structured logging."))),(0,i.kt)("h2",{id:"initialize-logger"},"Initialize logger"),(0,i.kt)("p",null,"You first have to initialize a logger structure. By performing this initialization in a global\nvariable, you can easily log from the two main policy entry points: ",(0,i.kt)("inlineCode",{parentName:"p"},"validate")," and\n",(0,i.kt)("inlineCode",{parentName:"p"},"validate_settings"),". Let's initialize this structure in our main package:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},"var (\n    logWriter = kubewarden.KubewardenLogWriter{}\n    logger    = onelog.New(\n        &logWriter,\n        onelog.ALL, // shortcut for onelog.DEBUG|onelog.INFO|onelog.WARN|onelog.ERROR|onelog.FATAL\n    )\n)\n")),(0,i.kt)("h2",{id:"consuming-the-logger"},"Consuming the logger"),(0,i.kt)("p",null,"Now, we can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"logger")," object to log from wherever we need in our policy:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'func validate(payload []byte) ([]byte, error) {\n    // ...\n    logger.Info("validating request")\n    // ...\n}\n')),(0,i.kt)("p",null,"Let's add some structured logging:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'func validate(payload []byte) ([]byte, error) {\n    // ...\n    logger.WarnWithFields("logging something important", func(e onelog.Entry) {\n        e.String("one_field", "a value")\n        e.String("another_field", "another value")\n    })\n    // ...\n}\n')),(0,i.kt)("p",null,"You can refer to the ",(0,i.kt)("a",{parentName:"p",href:"https://pkg.go.dev/github.com/francoispqt/onelog?utm_source=godoc"},(0,i.kt)("inlineCode",{parentName:"a"},"onelog"),"\ndocumentation")," for more\ninformation."),(0,i.kt)("p",null,"The logging produced by the policy will be sent to the policy evaluator (",(0,i.kt)("inlineCode",{parentName:"p"},"kwctl")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"policy-server"),"\nfor example), and they will log on behalf of the policy using mechanisms that are easily pluggable\nto other components that enable distributed tracing, such as Jaeger."))}d.isMDXComponent=!0}}]);