"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[1430],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,h=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return n?r.createElement(h,a(a({ref:t},u),{},{components:n})):r.createElement(h,a({ref:t},u))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7366:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const o={sidebar_label:"Kubernetes Capabilities",title:""},a="Kubernetes Capabilities",s={unversionedId:"writing-policies/spec/host-capabilities/kubernetes",id:"writing-policies/spec/host-capabilities/kubernetes",title:"",description:"Kubewarden context aware policies requires access to resources from the Kubernetes",source:"@site/docs/writing-policies/spec/host-capabilities/06-kubernetes.md",sourceDirName:"writing-policies/spec/host-capabilities",slug:"/writing-policies/spec/host-capabilities/kubernetes",permalink:"/next/writing-policies/spec/host-capabilities/kubernetes",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/spec/host-capabilities/06-kubernetes.md",tags:[],version:"current",lastUpdatedAt:1699005473,formattedLastUpdatedAt:"Nov 3, 2023",sidebarPosition:6,frontMatter:{sidebar_label:"Kubernetes Capabilities",title:""},sidebar:"docs",previous:{title:"Cryptographic Capabilities",permalink:"/next/writing-policies/spec/host-capabilities/crypto"},next:{title:"OCI registry support",permalink:"/next/distributing-policies/oci-registries-support"}},l={},c=[{value:"waPC protocol contract",id:"wapc-protocol-contract",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"kubernetes-capabilities"},"Kubernetes Capabilities"),(0,i.kt)("p",null,"Kubewarden context aware policies requires access to resources from the Kubernetes\ncluster where they are running on. For that, the Kubewarden SDKs expose functions\nthat use the waPC communication protocol to talk with the host system asking for\ndata about the cluster."),(0,i.kt)("h2",{id:"wapc-protocol-contract"},"waPC protocol contract"),(0,i.kt)("p",null,"Under the hood, the SDKs rely on these functions exposed by\nthe policy host environment:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"list_resources_by_namespace")," : given a resource type and a namespace, list all the resources of that type that are defined inside of it. This cannot be used to list cluster-wide resources, like ",(0,i.kt)("inlineCode",{parentName:"li"},"Namespace"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"list_resources_all"),": given a resource type, list all the resources of that type that are defined inside the whole cluster. This can be used to list cluster-wide resources, like ",(0,i.kt)("inlineCode",{parentName:"li"},"Namespace"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"get_resource"),":  find the exact resource identified by a the given resource type, given name and an optional namespace identifier.")),(0,i.kt)("p",null,"This guest-host intercommunication is performed using the regular waPC\nhost calling mechanism, and so any guest implementing the waPC\nintercommunication mechanism is able to request this information from\nthe host."),(0,i.kt)("p",null,"waPC has the following function arguments when performing a call from\nthe guest to the host:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Binding"),(0,i.kt)("li",{parentName:"ul"},"Namespace"),(0,i.kt)("li",{parentName:"ul"},"Operation"),(0,i.kt)("li",{parentName:"ul"},"Payload")),(0,i.kt)("p",null,"By contract, or convention, policies can retrieve the Kubernetes\ncluster information by calling the host in the following ways:"),(0,i.kt)("table",null,(0,i.kt)("tr",null,(0,i.kt)("th",null,"Binding"),(0,i.kt)("th",null,"Namespace"),(0,i.kt)("th",null,"Operation"),(0,i.kt)("th",null,"Input payload"),(0,i.kt)("th",null,"Output payload (JSON format)")),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"kubewarden")),(0,i.kt)("td",null,(0,i.kt)("code",null,"kubernetes")),(0,i.kt)("td",null,(0,i.kt)("code",null,"list_resources_all")),(0,i.kt)("td",null,(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-hcl"},'{\n    # API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n    "api_version": string,\n    # Resource kind\n    "kind": string,\n    # Label selector to filter the resources\n    "label_selector": string,\n    # Field selector to filter the resources\n    "field_selector": string\n}\n'))),(0,i.kt)("td",null,(0,i.kt)("p",null,"Return a Kubernetes ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds"},(0,i.kt)("inlineCode",{parentName:"a"},"List")),", which is a collection of Kubernetes objects of the same type."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"Use this API function to fetch cluster-wide resources (e.g. namespaces)")))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"kubewarden")),(0,i.kt)("td",null,(0,i.kt)("code",null,"kubernetes")),(0,i.kt)("td",null,(0,i.kt)("code",null,"list_resources_by_namespace")),(0,i.kt)("td",null,(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-hcl"},'{\n    # API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n    "api_version": string,\n    # Resource kind\n    "kind": string,\n    # Namespace where the requested resource lives in\n    "namespace": string,\n    # Label selector to filter the resources\n    "label_selector": string,\n    # Field selector to filter the resources\n    "field_selector": string\n}\n'))),(0,i.kt)("td",null,(0,i.kt)("p",null,"Return a Kubernetes ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds"},(0,i.kt)("inlineCode",{parentName:"a"},"List")),", which is a collection of Kubernetes objects of the same type."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"This API function returns an error when used to fetch cluster-wide resources (e.g. namespaces).\nPlease use the ",(0,i.kt)("inlineCode",{parentName:"p"},"list_resources_all")," when dealing with cluster-wide resources.")))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"kubewarden")),(0,i.kt)("td",null,(0,i.kt)("code",null,"kubernetes")),(0,i.kt)("td",null,(0,i.kt)("code",null,"get_resource")),(0,i.kt)("td",null,(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-hcl"},'{\n    # API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n    "api_version": string,\n    # Singular PascalCase name of the resource\n    "kind": string,\n    # Namespace scoping the search\n    "namespace": string,\n    # The name of the resource\n    "name": string,\n    # Disable caching of results obtained from Kubernetes API Server\n    "disable_cache": bool\n}\n'))),(0,i.kt)("td",null,"Result of ",(0,i.kt)("code",null,"GET /apis/$api_version/namespaces/$namespace/$kind/$name ")))))}d.isMDXComponent=!0}}]);