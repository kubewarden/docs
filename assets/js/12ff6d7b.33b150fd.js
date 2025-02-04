"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[70715],{61435:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"reference/spec/host-capabilities/kubernetes","title":"Kubernetes capabilities","description":"Kubernetes capabilities.","source":"@site/versioned_docs/version-1.11/reference/spec/host-capabilities/06-kubernetes.md","sourceDirName":"reference/spec/host-capabilities","slug":"/reference/spec/host-capabilities/kubernetes","permalink":"/1.11/reference/spec/host-capabilities/kubernetes","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.11/reference/spec/host-capabilities/06-kubernetes.md","tags":[],"version":"1.11","lastUpdatedAt":1738677855000,"sidebarPosition":6,"frontMatter":{"sidebar_label":"Kubernetes capabilities","title":"Kubernetes capabilities","description":"Kubernetes capabilities.","keywords":["kubewarden","kubernetes","policy specification","kubernetes capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","kubernetes-capabilities"]},"sidebar":"docs","previous":{"title":"Cryptographic capabilities","permalink":"/1.11/reference/spec/host-capabilities/crypto"},"next":{"title":"OCI registry support","permalink":"/1.11/reference/oci-registries-support"}}');var r=s(74848),i=s(28453);const c={sidebar_label:"Kubernetes capabilities",title:"Kubernetes capabilities",description:"Kubernetes capabilities.",keywords:["kubewarden","kubernetes","policy specification","kubernetes capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","kubernetes-capabilities"]},o=void 0,a={},l=[{value:"waPC protocol contract",id:"wapc-protocol-contract",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components},{Head:s}=t;return s||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s,{children:(0,r.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/spec/host-capabilities/kubernetes"})}),"\n",(0,r.jsx)(t.p,{children:"Kubewarden context aware policies require access to resources from the Kubernetes cluster where they are running.\nFor that, the Kubewarden SDKs expose functions that use the waPC communication protocol to talk with the host system asking for data about the cluster."}),"\n",(0,r.jsx)(t.h2,{id:"wapc-protocol-contract",children:"waPC protocol contract"}),"\n",(0,r.jsx)(t.p,{children:"Internally, the SDKs rely on these functions exposed by the policy host environment:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"list_resources_by_namespace"})," : Given a resource type and a namespace, list all the resources of that type that are defined in it.\nThis cannot be used to list cluster-wide resources, like ",(0,r.jsx)(t.code,{children:"Namespace"}),"."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"list_resources_all"}),": Given a resource type, list all the resources of that type that are defined inside the whole cluster.\nThis can be used to list cluster-wide resources, like ",(0,r.jsx)(t.code,{children:"Namespace"}),"."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"get_resource"}),": Find the exact resource identified by the given resource type, given name and an optional namespace identifier."]}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"This guest-host communication is performed using the standard waPC host calling mechanism.\nAny guest implementing the waPC intercommunication mechanism is able to request this information from the host."}),"\n",(0,r.jsx)(t.p,{children:"waPC has the following function arguments when performing a call from the guest to the host:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Binding"}),"\n",(0,r.jsx)(t.li,{children:"Namespace"}),"\n",(0,r.jsx)(t.li,{children:"Operation"}),"\n",(0,r.jsx)(t.li,{children:"Payload"}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"By contract, or by convention,\npolicies can retrieve the Kubernetes cluster information by calling the host in the following ways:"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Binding"}),(0,r.jsx)("th",{children:"Namespace"}),(0,r.jsx)("th",{children:"Operation"}),(0,r.jsx)("th",{children:"Input payload"}),(0,r.jsx)("th",{children:"Output payload (JSON format)"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"kubewarden"})}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"kubernetes"})}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"list_resources_all"})}),(0,r.jsx)("td",{children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-hcl",children:'{\n\t# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n\t"api_version": string,\n\t# Resource kind\n\t"kind": string,\n\t# Label selector to filter the resources\n\t"label_selector": string,\n\t# Field selector to filter the resources\n\t"field_selector": string\n}\n'})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(t.p,{children:["Return a Kubernetes\n",(0,r.jsx)(t.a,{href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds",children:(0,r.jsx)(t.code,{children:"List"})}),",\nwhich is a collection of Kubernetes objects of the same type."]}),(0,r.jsx)(t.admonition,{type:"info",children:(0,r.jsx)(t.p,{children:"Use this API function to fetch cluster-wide resources (e.g. namespaces)"})})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"kubewarden"})}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"kubernetes"})}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"list_resources_by_namespace"})}),(0,r.jsx)("td",{children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-hcl",children:'{\n\t# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n\t"api_version": string,\n\t# Resource kind\n\t"kind": string,\n\t# Namespace where the requested resource lives in\n\t"namespace": string,\n\t# Label selector to filter the resources\n\t"label_selector": string,\n\t# Field selector to filter the resources\n\t"field_selector": string\n}\n'})})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(t.p,{children:["Return a Kubernetes ",(0,r.jsx)(t.a,{href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds",children:(0,r.jsx)(t.code,{children:"List"})}),", which is a collection of Kubernetes objects of the same type."]}),(0,r.jsx)(t.admonition,{type:"caution",children:(0,r.jsxs)(t.p,{children:["This API function returns an error when used to fetch cluster-wide resources\n(for example, namespaces).\nUse the ",(0,r.jsx)(t.code,{children:"list_resources_all"})," when dealing with cluster-wide resources."]})})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"kubewarden"})}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"kubernetes"})}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"get_resource"})}),(0,r.jsx)("td",{children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-hcl",children:'{\n\t# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n\t"api_version": string,\n\t# Singular PascalCase name of the resource\n\t"kind": string,\n\t# Namespace scoping the search\n\t"namespace": string,\n\t# The name of the resource\n\t"name": string,\n\t# Disable caching of results obtained from Kubernetes API Server\n\t"disable_cache": bool\n}\n'})})}),(0,r.jsxs)("td",{children:["Result of ",(0,r.jsx)("code",{children:"GET /apis/$api_version/namespaces/$namespace/$kind/$name "})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>c,x:()=>o});var n=s(96540);const r={},i=n.createContext(r);function c(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);