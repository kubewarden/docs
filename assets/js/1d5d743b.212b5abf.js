"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[42403],{38460:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>r,contentTitle:()=>c,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var t=n(85893),a=n(11151);const s={sidebar_label:"Container registry capabilities",title:"Container registry capabilities",description:"Container registry capabilities.",keywords:["kubewarden","kubernetes","policy specification","registry capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","container-registry"]},c=void 0,o={id:"reference/spec/host-capabilities/container-registry",title:"Container registry capabilities",description:"Container registry capabilities.",source:"@site/versioned_docs/version-1.12/reference/spec/host-capabilities/03-container-registry.md",sourceDirName:"reference/spec/host-capabilities",slug:"/reference/spec/host-capabilities/container-registry",permalink:"/1.12/reference/spec/host-capabilities/container-registry",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.12/reference/spec/host-capabilities/03-container-registry.md",tags:[],version:"1.12",lastUpdatedAt:1729259144e3,sidebarPosition:3,frontMatter:{sidebar_label:"Container registry capabilities",title:"Container registry capabilities",description:"Container registry capabilities.",keywords:["kubewarden","kubernetes","policy specification","registry capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","container-registry"]},sidebar:"docs",previous:{title:"Signature verifier policies",permalink:"/1.12/reference/spec/host-capabilities/signature-verifier-policies"},next:{title:"Network capabilities",permalink:"/1.12/reference/spec/host-capabilities/net"}},r={},d=[{value:"Get OCI manifest digest",id:"get-oci-manifest-digest",level:2},{value:"Caching",id:"caching",level:3},{value:"Authentication",id:"authentication",level:3},{value:"Communication protocol",id:"communication-protocol",level:3},{value:"waPC function - <code>v1/manifest_digest</code> input",id:"wapc-function---v1manifest_digest-input",level:4},{value:"waPC finction - <code>v1/manifest_digest</code> output",id:"wapc-finction---v1manifest_digest-output",level:4},{value:"OCI manifest",id:"oci-manifest",level:2},{value:"Caching",id:"caching-1",level:3},{value:"Authentication",id:"authentication-1",level:3},{value:"Communication protocol",id:"communication-protocol-1",level:3},{value:"waPC function - <code>v1/oci_manifest</code> input",id:"wapc-function---v1oci_manifest-input",level:4},{value:"waPC function - <code>v1/oci_manifest</code> output",id:"wapc-function---v1oci_manifest-output",level:4}];function l(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components},{Head:n}=i;return n||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/spec/host-capabilities/container-registry"})}),"\n",(0,t.jsx)(i.p,{children:"Container registries can be used to distribute many types of OCI objects.\nFrom well-known container images to generic OCI Artifacts.\nOCI Artifacts are used to store objects such as Kubewarden policies,\nHelm charts, and more."}),"\n",(0,t.jsx)(i.p,{children:"These are the capabilities exposed by the Kubewarden host,\nto interact with container registries."}),"\n",(0,t.jsx)(i.h2,{id:"get-oci-manifest-digest",children:"Get OCI manifest digest"}),"\n",(0,t.jsxs)(i.p,{children:["This function computes the digest of an OCI manifest.\nThe digest can be used to identify an object stored in an OCI registry.\nThis is an immutable way, as opposed to ",(0,t.jsx)(i.code,{children:"tags"})," which are mutable."]}),"\n",(0,t.jsx)(i.h3,{id:"caching",children:"Caching"}),"\n",(0,t.jsx)(i.p,{children:"Computing the digest involves a series of network requests between the Kubewarden policy host and the remote registry.\nThese operations can be time expensive,\nso the results are cached for 1 minute."}),"\n",(0,t.jsx)(i.h3,{id:"authentication",children:"Authentication"}),"\n",(0,t.jsx)(i.p,{children:"Interactions with private registries require the Kubewarden policy host to authenticate against the remote registry."}),"\n",(0,t.jsx)(i.p,{children:"The policy host will use the same set of credentials used to fetch policies\nfrom the remote registry."}),"\n",(0,t.jsx)(i.h3,{id:"communication-protocol",children:"Communication protocol"}),"\n",(0,t.jsx)(i.p,{children:"This is the description of the waPC protocol used to expose this capability:"}),"\n",(0,t.jsxs)(i.h4,{id:"wapc-function---v1manifest_digest-input",children:["waPC function - ",(0,t.jsx)(i.code,{children:"v1/manifest_digest"})," input"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-hcl",children:"# OCI URI - JSON encoded string\nstring\n"})}),"\n",(0,t.jsxs)(i.h4,{id:"wapc-finction---v1manifest_digest-output",children:["waPC finction - ",(0,t.jsx)(i.code,{children:"v1/manifest_digest"})," output"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-hcl",children:'{\n  # digest of the OCI object\n  "digest": string\n}\n'})}),"\n",(0,t.jsxs)(i.p,{children:["For example, when requesting the manifest digest of the ",(0,t.jsx)(i.code,{children:"busybox:latest"})," image,\nthe payload would be:"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Input payload: ",(0,t.jsx)(i.code,{children:'"busybox:latest"'})]}),"\n",(0,t.jsxs)(i.li,{children:["Output payload: ",(0,t.jsx)(i.code,{children:'{ "digest": "sha256:69e70a79f2d41ab5d637de98c1e0b055206ba40a8145e7bddb55ccc04e13cf8f"}'})]}),"\n"]}),"\n",(0,t.jsx)(i.h2,{id:"oci-manifest",children:"OCI manifest"}),"\n",(0,t.jsx)(i.p,{children:"This function fetches the OCI objects manifest.\nWhen available, this information can be used to identify specific images manifests,\nfor one or more platforms.\nOr a single image manifest for the image."}),"\n",(0,t.jsx)(i.h3,{id:"caching-1",children:"Caching"}),"\n",(0,t.jsx)(i.p,{children:"Computing the digest involves a series of network requests between the\nKubewarden policy host and the remote registry.\nThese operations can be time expensive so the results are cached for 1 minute."}),"\n",(0,t.jsx)(i.h3,{id:"authentication-1",children:"Authentication"}),"\n",(0,t.jsx)(i.p,{children:"Interactions with private registries require the Kubewarden policy host to\nauthenticate against the remote registry."}),"\n",(0,t.jsx)(i.p,{children:"The policy host uses the same set of credentials as that used to fetch policies\nfrom the remote registry."}),"\n",(0,t.jsx)(i.h3,{id:"communication-protocol-1",children:"Communication protocol"}),"\n",(0,t.jsx)(i.p,{children:"This is the description of the waPC protocol used to expose this capability:"}),"\n",(0,t.jsxs)(i.h4,{id:"wapc-function---v1oci_manifest-input",children:["waPC function - ",(0,t.jsx)(i.code,{children:"v1/oci_manifest"})," input"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-hcl",children:"# OCI URI - JSON encoded string\nstring\n"})}),"\n",(0,t.jsxs)(i.h4,{id:"wapc-function---v1oci_manifest-output",children:["waPC function - ",(0,t.jsx)(i.code,{children:"v1/oci_manifest"})," output"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-hcl",children:'{\n    "schemaVersion": 2,\n        "mediaType": "application/vnd.oci.image.index.v1+json",\n        "manifests": [\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:7d5e84b9314ba7058bfa209881919146ffc4a89c5ba14cfa8270a18c8d418c44",\n            "size": 1048,\n            "platform": {\n                "architecture": "amd64",\n                "os": "linux"\n            }\n        },\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:ae1e98105555f3983496c15c70dafc87639b77830953d6470694b47e0e063e25",\n            "size": 1048,\n            "platform": {\n                "architecture": "arm64",\n                "os": "linux"\n            }\n        },\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:e9fc0f86e26366abf29fd29e8c09d00df717f9038fd4298eaa39a0a2b4361fa4",\n            "size": 566,\n            "annotations": {\n                "vnd.docker.reference.digest": "sha256:7d5e84b9314ba7058bfa209881919146ffc4a89c5ba14cfa8270a18c8d418c44",\n                "vnd.docker.reference.type": "attestation-manifest"\n            },\n            "platform": {\n                "architecture": "unknown",\n                "os": "unknown"\n            }\n        },\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:e8904ebb2841dc19ae458436eb01ddea3e8d6ea653c7d9476537f4029b1f45a2",\n            "size": 566,\n            "annotations": {\n                "vnd.docker.reference.digest": "sha256:ae1e98105555f3983496c15c70dafc87639b77830953d6470694b47e0e063e25",\n                "vnd.docker.reference.type": "attestation-manifest"\n            },\n            "platform": {\n                "architecture": "unknown",\n                "os": "unknown"\n            }\n        }\n    ]\n}\n\nOR\n\n{\n    "schemaVersion": 2,\n        "mediaType": "application/vnd.oci.image.manifest.v1+json",\n        "config": {\n            "mediaType": "application/vnd.oci.image.config.v1+json",\n            "digest": "sha256:61dc3269b9e8faeea32128560cdbd355e8c1dff31e32abc0223be039c5cc5e2d",\n            "size": 1775\n        },\n        "layers": [\n        {\n            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n            "digest": "sha256:67d998e418791ec2955ec99753eb55f03ca96538976e5ccebfec08eae20056b5",\n            "size": 57033795\n        },\n        {\n            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n            "digest": "sha256:be6185edcab66334dd5c7c2273fd6254100ece960e087541f3dba0616c440038",\n            "size": 188411978\n        },\n        {\n            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n            "digest": "sha256:58a13f6770904193ca67beb50d424e69a39579e1581dbf8e02e1751f3b75f932",\n            "size": 70078992\n        }\n        ],\n        "annotations": {\n            "org.opencontainers.image.base.digest": "sha256:67a7c41ccd5dfcb08face86546f0d25c0740f0d0225e39fecb8bbae8b95b847a",\n            "org.opencontainers.image.base.name": "docker.io/library/debian:latest"\n        }\n}\n\n'})}),"\n",(0,t.jsxs)(i.p,{children:["For example, when requesting the manifest digest of the\n",(0,t.jsx)(i.code,{children:"ghcr.io/kubewarden/policy-server:v1.10.0"})," image,\nthe payload would be:"]}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["Input payload: ",(0,t.jsx)(i.code,{children:'"ghcr.io/kubewarden/policy-server:v1.10.0"'})]}),"\n",(0,t.jsxs)(i.li,{children:["Output payload: the body of the successful response obtained from the\nregistry.\nIt can be an ",(0,t.jsx)(i.a,{href:"https://github.com/opencontainers/image-spec/blob/main/image-index.md",children:"OCI index image"}),"\nor an ",(0,t.jsx)(i.a,{href:"https://github.com/opencontainers/image-spec/blob/main/manifest.md",children:"OCI image manifest"}),".\nThe details may change depending on the registry and image."]}),"\n"]})]})}function p(e={}){const{wrapper:i}={...(0,a.a)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},11151:(e,i,n)=>{n.d(i,{Z:()=>o,a:()=>c});var t=n(67294);const a={},s=t.createContext(a);function c(e){const i=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:c(e.components),t.createElement(s.Provider,{value:i},e.children)}}}]);