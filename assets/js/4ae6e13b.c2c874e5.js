"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[50586],{25494:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"reference/spec/host-capabilities/kubernetes","title":"Kubernetes capabilities","description":"Kubernetes capabilities.","source":"@site/docs/reference/spec/host-capabilities/06-kubernetes.md","sourceDirName":"reference/spec/host-capabilities","slug":"/reference/spec/host-capabilities/kubernetes","permalink":"/next/reference/spec/host-capabilities/kubernetes","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/reference/spec/host-capabilities/06-kubernetes.md","tags":[],"version":"current","lastUpdatedAt":1737550787000,"sidebarPosition":6,"frontMatter":{"sidebar_label":"Kubernetes capabilities","title":"Kubernetes capabilities","description":"Kubernetes capabilities.","keywords":["kubewarden","kubernetes","policy specification","kubernetes capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","kubernetes-capabilities"]},"sidebar":"docs","previous":{"title":"Cryptographic capabilities","permalink":"/next/reference/spec/host-capabilities/crypto"},"next":{"title":"OCI registry support","permalink":"/next/reference/oci-registries-support"}}');var i=n(74848),r=n(28453);const o={sidebar_label:"Kubernetes capabilities",title:"Kubernetes capabilities",description:"Kubernetes capabilities.",keywords:["kubewarden","kubernetes","policy specification","kubernetes capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","kubernetes-capabilities"]},c=void 0,a={},l=[{value:"waPC protocol contract",id:"wapc-protocol-contract",level:2},{value:"Operation - <code>list_resources_all</code>",id:"operation---list_resources_all",level:3},{value:"Input",id:"input",level:4},{value:"Output",id:"output",level:4},{value:"Operation - <code>list_resources_by_namespace</code>",id:"operation---list_resources_by_namespace",level:3},{value:"Input",id:"input-1",level:4},{value:"Output",id:"output-1",level:4},{value:"Operation - <code>get_resource</code>",id:"operation---get_resource",level:3},{value:"Input",id:"input-2",level:4},{value:"Output",id:"output-2",level:4}];function u(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components},{Head:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n,{children:(0,i.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/spec/host-capabilities/kubernetes"})}),"\n",(0,i.jsx)(t.p,{children:"Kubewarden context aware policies require access to resources from the Kubernetes cluster where they are running.\nFor that, the Kubewarden SDKs expose functions that use the waPC communication protocol to talk with the host system asking for data about the cluster."}),"\n",(0,i.jsx)(t.h2,{id:"wapc-protocol-contract",children:"waPC protocol contract"}),"\n",(0,i.jsx)(t.p,{children:"Internally, the SDKs rely on these functions exposed by the policy host environment:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"list_resources_by_namespace"})," : Given a resource type and a namespace, list all the resources of that type that are defined in it.\nThis cannot be used to list cluster-wide resources, like ",(0,i.jsx)(t.code,{children:"Namespace"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"list_resources_all"}),": Given a resource type, list all the resources of that type that are defined inside the whole cluster.\nThis can be used to list cluster-wide resources, like ",(0,i.jsx)(t.code,{children:"Namespace"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"get_resource"}),": Find the exact resource identified by the given resource type, given name and an optional namespace identifier."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"This guest-host communication is performed using the standard waPC host calling mechanism.\nAny guest implementing the waPC intercommunication mechanism is able to request this information from the host."}),"\n",(0,i.jsx)(t.p,{children:"waPC has the following function arguments when performing a call from the guest to the host:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Binding - ",(0,i.jsx)(t.code,{children:"kubewarden"})]}),"\n",(0,i.jsxs)(t.li,{children:["Namespace - ",(0,i.jsx)(t.code,{children:"kubernetes"})]}),"\n",(0,i.jsxs)(t.li,{children:["Operation - ",(0,i.jsx)(t.code,{children:"list_resources_all"}),", ",(0,i.jsx)(t.code,{children:"list_resources_by_namespace"}),", or ",(0,i.jsx)(t.code,{children:"get_resource"})]}),"\n",(0,i.jsx)(t.li,{children:"Payload - input payload - see below"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"and returns:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Payload - output payload - see below"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"By contract, or by convention,\npolicies can retrieve the Kubernetes cluster information by calling the host in the following ways:"}),"\n",(0,i.jsxs)(t.h3,{id:"operation---list_resources_all",children:["Operation - ",(0,i.jsx)(t.code,{children:"list_resources_all"})]}),"\n",(0,i.jsx)(t.h4,{id:"input",children:"Input"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-hcl",children:'{\n\t# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n\t"api_version": string,\n\t# Resource kind\n\t"kind": string,\n\t# Label selector to filter the resources\n\t"label_selector": string,\n\t# Field selector to filter the resources\n\t"field_selector": string\n}\n'})}),"\n",(0,i.jsx)(t.h4,{id:"output",children:"Output"}),"\n",(0,i.jsxs)(t.p,{children:["Return a Kubernetes\n",(0,i.jsx)(t.a,{href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds",children:(0,i.jsx)(t.code,{children:"List"})}),",\nwhich is a collection of Kubernetes objects of the same type."]}),"\n",(0,i.jsx)(t.admonition,{type:"info",children:(0,i.jsx)(t.p,{children:"Use this API function to fetch cluster-wide resources (e.g. namespaces)"})}),"\n",(0,i.jsxs)(t.h3,{id:"operation---list_resources_by_namespace",children:["Operation - ",(0,i.jsx)(t.code,{children:"list_resources_by_namespace"})]}),"\n",(0,i.jsx)(t.h4,{id:"input-1",children:"Input"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-hcl",children:'{\n\t# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n\t"api_version": string,\n\t# Resource kind\n\t"kind": string,\n\t# Namespace where the requested resource lives in\n\t"namespace": string,\n\t# Label selector to filter the resources\n\t"label_selector": string,\n\t# Field selector to filter the resources\n\t"field_selector": string\n}\n'})}),"\n",(0,i.jsx)(t.h4,{id:"output-1",children:"Output"}),"\n",(0,i.jsxs)(t.p,{children:["Return a Kubernetes ",(0,i.jsx)(t.a,{href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#types-kinds",children:(0,i.jsx)(t.code,{children:"List"})}),", which is a collection of Kubernetes objects of the same type."]}),"\n",(0,i.jsx)(t.admonition,{type:"caution",children:(0,i.jsxs)(t.p,{children:["This API function returns an error when used to fetch cluster-wide resources\n(for example, namespaces).\nUse the ",(0,i.jsx)(t.code,{children:"list_resources_all"})," when dealing with cluster-wide resources."]})}),"\n",(0,i.jsxs)(t.h3,{id:"operation---get_resource",children:["Operation - ",(0,i.jsx)(t.code,{children:"get_resource"})]}),"\n",(0,i.jsx)(t.h4,{id:"input-2",children:"Input"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-hcl",children:'{\n\t# API Group version. Use `v1` for the `core` group and `groupName/groupVersion` for all other groups\n\t"api_version": string,\n\t# Singular PascalCase name of the resource\n\t"kind": string,\n\t# Namespace scoping the search\n\t"namespace": string,\n\t# The name of the resource\n\t"name": string,\n\t# Disable caching of results obtained from Kubernetes API Server\n\t"disable_cache": bool\n}\n'})}),"\n",(0,i.jsx)(t.h4,{id:"output-2",children:"Output"}),"\n",(0,i.jsxs)(t.p,{children:["Result of ",(0,i.jsx)(t.code,{children:"GET /apis/$api_version/namespaces/$namespace/$kind/$name"})]})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>c});var s=n(96540);const i={},r=s.createContext(i);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);