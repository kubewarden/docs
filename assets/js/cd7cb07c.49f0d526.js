"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[21840],{10152:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"reference/spec/host-capabilities/container-registry","title":"Container registry capabilities","description":"Container registry capabilities.","source":"@site/docs/reference/spec/host-capabilities/03-container-registry.md","sourceDirName":"reference/spec/host-capabilities","slug":"/reference/spec/host-capabilities/container-registry","permalink":"/next/reference/spec/host-capabilities/container-registry","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/reference/spec/host-capabilities/03-container-registry.md","tags":[],"version":"current","lastUpdatedAt":1741013230000,"sidebarPosition":3,"frontMatter":{"sidebar_label":"Container registry capabilities","title":"Container registry capabilities","description":"Container registry capabilities.","keywords":["kubewarden","kubernetes","policy specification","registry capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","container-registry"]},"sidebar":"docs","previous":{"title":"Signature verifier policies","permalink":"/next/reference/spec/host-capabilities/signature-verifier-policies"},"next":{"title":"Network capabilities","permalink":"/next/reference/spec/host-capabilities/net"}}');var a=i(74848),c=i(28453);const s={sidebar_label:"Container registry capabilities",title:"Container registry capabilities",description:"Container registry capabilities.",keywords:["kubewarden","kubernetes","policy specification","registry capabilities"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["reference"],"doc-topic":["writing-policies","specification","host-capabilities","container-registry"]},o=void 0,r={},d=[{value:"Get OCI manifest digest",id:"get-oci-manifest-digest",level:2},{value:"Caching",id:"caching",level:3},{value:"Authentication",id:"authentication",level:3},{value:"Communication protocol",id:"communication-protocol",level:3},{value:"waPC function - <code>v1/manifest_digest</code> input",id:"wapc-function---v1manifest_digest-input",level:4},{value:"waPC function - <code>v1/manifest_digest</code> output",id:"wapc-function---v1manifest_digest-output",level:4},{value:"OCI manifest",id:"oci-manifest",level:2},{value:"Caching",id:"caching-1",level:3},{value:"Authentication",id:"authentication-1",level:3},{value:"Communication protocol",id:"communication-protocol-1",level:3},{value:"waPC function - <code>v1/oci_manifest</code> input",id:"wapc-function---v1oci_manifest-input",level:4},{value:"waPC function - <code>v1/oci_manifest</code> output",id:"wapc-function---v1oci_manifest-output",level:4},{value:"OCI manifest and config",id:"oci-manifest-and-config",level:2},{value:"Caching",id:"caching-2",level:3},{value:"Authentication",id:"authentication-2",level:3},{value:"Communication protocol",id:"communication-protocol-2",level:3},{value:"waPC function - <code>v1/oci_manifest_config</code> input",id:"wapc-function---v1oci_manifest_config-input",level:4},{value:"waPC function - <code>v1/oci_manifest_config</code> output",id:"wapc-function---v1oci_manifest_config-output",level:4}];function l(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i,{children:(0,a.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/spec/host-capabilities/container-registry"})}),"\n",(0,a.jsx)(n.p,{children:"Container registries can be used to distribute many types of OCI objects.\nFrom well-known container images to generic OCI Artifacts.\nOCI Artifacts are used to store objects such as Kubewarden policies,\nHelm charts, and more."}),"\n",(0,a.jsx)(n.p,{children:"These are the capabilities exposed by the Kubewarden host,\nto interact with container registries."}),"\n",(0,a.jsx)(n.h2,{id:"get-oci-manifest-digest",children:"Get OCI manifest digest"}),"\n",(0,a.jsxs)(n.p,{children:["This callback computes the digest of an OCI manifest. The digest can be used to\nidentify an object stored in an OCI registry. This is an immutable way, as\nopposed to ",(0,a.jsx)(n.code,{children:"tags"})," which are mutable."]}),"\n",(0,a.jsx)(n.h3,{id:"caching",children:"Caching"}),"\n",(0,a.jsx)(n.p,{children:"Computing the digest involves a series of network requests between the Kubewarden policy host and the remote registry.\nThese operations can be time expensive,\nso the results are cached for 1 minute."}),"\n",(0,a.jsx)(n.h3,{id:"authentication",children:"Authentication"}),"\n",(0,a.jsx)(n.p,{children:"Interactions with private registries require the Kubewarden policy host to authenticate against the remote registry."}),"\n",(0,a.jsx)(n.p,{children:"The policy host will use the same set of credentials used to fetch policies\nfrom the remote registry."}),"\n",(0,a.jsx)(n.h3,{id:"communication-protocol",children:"Communication protocol"}),"\n",(0,a.jsx)(n.p,{children:"This is the description of the waPC protocol used to expose this capability:"}),"\n",(0,a.jsxs)(n.h4,{id:"wapc-function---v1manifest_digest-input",children:["waPC function - ",(0,a.jsx)(n.code,{children:"v1/manifest_digest"})," input"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:"# OCI URI - JSON encoded string\nstring\n"})}),"\n",(0,a.jsxs)(n.h4,{id:"wapc-function---v1manifest_digest-output",children:["waPC function - ",(0,a.jsx)(n.code,{children:"v1/manifest_digest"})," output"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:'{\n  # digest of the OCI object\n  "digest": string\n}\n'})}),"\n",(0,a.jsxs)(n.p,{children:["For example, when requesting the manifest digest of the ",(0,a.jsx)(n.code,{children:"busybox:latest"})," image,\nthe payload would be:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Input payload: ",(0,a.jsx)(n.code,{children:'"busybox:latest"'})]}),"\n",(0,a.jsxs)(n.li,{children:["Output payload: ",(0,a.jsx)(n.code,{children:'{ "digest": "sha256:69e70a79f2d41ab5d637de98c1e0b055206ba40a8145e7bddb55ccc04e13cf8f"}'})]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"oci-manifest",children:"OCI manifest"}),"\n",(0,a.jsx)(n.p,{children:"This callback fetches the OCI objects manifest. When available, this\ninformation can be used to identify specific images manifests, for one or more\nplatforms. Or a single image manifest for the image."}),"\n",(0,a.jsx)(n.h3,{id:"caching-1",children:"Caching"}),"\n",(0,a.jsx)(n.p,{children:"Fetching this information involves network requests between the Kubewarden\npolicy host and the remote registry. These operations can be time expensive so\nthe results are cached for 1 minute."}),"\n",(0,a.jsx)(n.h3,{id:"authentication-1",children:"Authentication"}),"\n",(0,a.jsx)(n.p,{children:"Interactions with private registries require the Kubewarden policy host to\nauthenticate against the remote registry."}),"\n",(0,a.jsx)(n.p,{children:"The policy host uses the same set of credentials as that used to fetch policies\nfrom the remote registry."}),"\n",(0,a.jsx)(n.h3,{id:"communication-protocol-1",children:"Communication protocol"}),"\n",(0,a.jsx)(n.p,{children:"This is the description of the waPC protocol used to expose this capability:"}),"\n",(0,a.jsxs)(n.h4,{id:"wapc-function---v1oci_manifest-input",children:["waPC function - ",(0,a.jsx)(n.code,{children:"v1/oci_manifest"})," input"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:"# OCI URI - JSON encoded string\nstring\n"})}),"\n",(0,a.jsxs)(n.h4,{id:"wapc-function---v1oci_manifest-output",children:["waPC function - ",(0,a.jsx)(n.code,{children:"v1/oci_manifest"})," output"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:'{\n    "schemaVersion": 2,\n        "mediaType": "application/vnd.oci.image.index.v1+json",\n        "manifests": [\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:7d5e84b9314ba7058bfa209881919146ffc4a89c5ba14cfa8270a18c8d418c44",\n            "size": 1048,\n            "platform": {\n                "architecture": "amd64",\n                "os": "linux"\n            }\n        },\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:ae1e98105555f3983496c15c70dafc87639b77830953d6470694b47e0e063e25",\n            "size": 1048,\n            "platform": {\n                "architecture": "arm64",\n                "os": "linux"\n            }\n        },\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:e9fc0f86e26366abf29fd29e8c09d00df717f9038fd4298eaa39a0a2b4361fa4",\n            "size": 566,\n            "annotations": {\n                "vnd.docker.reference.digest": "sha256:7d5e84b9314ba7058bfa209881919146ffc4a89c5ba14cfa8270a18c8d418c44",\n                "vnd.docker.reference.type": "attestation-manifest"\n            },\n            "platform": {\n                "architecture": "unknown",\n                "os": "unknown"\n            }\n        },\n        {\n            "mediaType": "application/vnd.oci.image.manifest.v1+json",\n            "digest": "sha256:e8904ebb2841dc19ae458436eb01ddea3e8d6ea653c7d9476537f4029b1f45a2",\n            "size": 566,\n            "annotations": {\n                "vnd.docker.reference.digest": "sha256:ae1e98105555f3983496c15c70dafc87639b77830953d6470694b47e0e063e25",\n                "vnd.docker.reference.type": "attestation-manifest"\n            },\n            "platform": {\n                "architecture": "unknown",\n                "os": "unknown"\n            }\n        }\n    ]\n}\n\nOR\n\n{\n    "schemaVersion": 2,\n        "mediaType": "application/vnd.oci.image.manifest.v1+json",\n        "config": {\n            "mediaType": "application/vnd.oci.image.config.v1+json",\n            "digest": "sha256:61dc3269b9e8faeea32128560cdbd355e8c1dff31e32abc0223be039c5cc5e2d",\n            "size": 1775\n        },\n        "layers": [\n        {\n            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n            "digest": "sha256:67d998e418791ec2955ec99753eb55f03ca96538976e5ccebfec08eae20056b5",\n            "size": 57033795\n        },\n        {\n            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n            "digest": "sha256:be6185edcab66334dd5c7c2273fd6254100ece960e087541f3dba0616c440038",\n            "size": 188411978\n        },\n        {\n            "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n            "digest": "sha256:58a13f6770904193ca67beb50d424e69a39579e1581dbf8e02e1751f3b75f932",\n            "size": 70078992\n        }\n        ],\n        "annotations": {\n            "org.opencontainers.image.base.digest": "sha256:67a7c41ccd5dfcb08face86546f0d25c0740f0d0225e39fecb8bbae8b95b847a",\n            "org.opencontainers.image.base.name": "docker.io/library/debian:latest"\n        }\n}\n\n'})}),"\n",(0,a.jsxs)(n.p,{children:["For example, when requesting the manifest of the\n",(0,a.jsx)(n.code,{children:"ghcr.io/kubewarden/policy-server:v1.10.0"})," image,\nthe payload would be:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Input payload: ",(0,a.jsx)(n.code,{children:'"ghcr.io/kubewarden/policy-server:v1.10.0"'})]}),"\n",(0,a.jsxs)(n.li,{children:["Output payload: the body of the successful response obtained from the\nregistry.\nIt can be an ",(0,a.jsx)(n.a,{href:"https://github.com/opencontainers/image-spec/blob/main/image-index.md",children:"OCI index image"}),"\nor an ",(0,a.jsx)(n.a,{href:"https://github.com/opencontainers/image-spec/blob/main/manifest.md",children:"OCI image manifest"}),".\nThe details may change depending on the registry and image."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"oci-manifest-and-config",children:"OCI manifest and config"}),"\n",(0,a.jsx)(n.p,{children:"This callback fetches the OCI images manifest and its configuration. This\ninformation can be used to get the container image manifest and the\nconfiguration information used by the container runtime to run it."}),"\n",(0,a.jsx)(n.h3,{id:"caching-2",children:"Caching"}),"\n",(0,a.jsx)(n.p,{children:"Fetching this information involves network requests between the Kubewarden\npolicy host and the remote registry. These operations can be time expensive so\nthe results are cached for 1 minute."}),"\n",(0,a.jsx)(n.h3,{id:"authentication-2",children:"Authentication"}),"\n",(0,a.jsx)(n.p,{children:"Interactions with private registries require the Kubewarden policy host to\nauthenticate against the remote registry."}),"\n",(0,a.jsx)(n.p,{children:"The policy host uses the same set of credentials as that used to fetch policies\nfrom the remote registry."}),"\n",(0,a.jsx)(n.h3,{id:"communication-protocol-2",children:"Communication protocol"}),"\n",(0,a.jsx)(n.p,{children:"This is the description of the waPC protocol used to expose this capability:"}),"\n",(0,a.jsxs)(n.h4,{id:"wapc-function---v1oci_manifest_config-input",children:["waPC function - ",(0,a.jsx)(n.code,{children:"v1/oci_manifest_config"})," input"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:"# OCI URI - JSON encoded string\nstring\n"})}),"\n",(0,a.jsxs)(n.h4,{id:"wapc-function---v1oci_manifest_config-output",children:["waPC function - ",(0,a.jsx)(n.code,{children:"v1/oci_manifest_config"})," output"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-hcl",children:'{\n  "manifest": {\n    "schemaVersion": 2,\n    "mediaType": "application/vnd.oci.image.manifest.v1+json",\n    "config": {\n      "mediaType": "application/vnd.oci.image.config.v1+json",\n      "digest": "sha256:bc3511804cb29da6333f0187a333eba13a43a3a0a1737e9b50227a5cf057af74",\n      "size": 1592\n    },\n    "layers": [\n      {\n        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n        "digest": "sha256:294efa324e89a020b06df261f77903fb9f46fdee79c54e4f6589f786f6c31bec",\n        "size": 428\n      },\n      {\n        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n        "digest": "sha256:f0936413f7d0757b41777a624e5be83da28789d0c4b8b3f46853ca9c3bb6300f",\n        "size": 422\n      },\n      {\n        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n        "digest": "sha256:cd2adfe5e808335e0c30eff616a9852a94cfbf8ecd455d1b893e1c858ddc3aeb",\n        "size": 22357278\n      },\n      {\n        "mediaType": "application/vnd.oci.image.layer.v1.tar+gzip",\n        "digest": "sha256:6c7ec51ccec3d4438c94e697258085ddf825c1e711df4d923b1794794196cf06",\n        "size": 37415\n      }\n    ]\n  },\n  "digest": "sha256:6ebc3e17a9804a8d385fee819554ad95a05072d022c5bd2dd27556a5752d47f5",\n  "config": {\n    "created": "2024-06-05T13:48:01.671482413Z",\n    "architecture": "amd64",\n    "os": "linux",\n    "config": {\n      "User": "65533:65533",\n      "ExposedPorts": {\n        "3000/tcp": {}\n      },\n      "Env": [\n        "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"\n      ],\n      "Entrypoint": [\n        "/policy-server"\n      ],\n      "WorkingDir": "/"\n    },\n    "rootfs": {\n      "type": "layers",\n      "diff_ids": [\n        "sha256:79f61adc25589b7b467a6becca5756f3b722ab7f9d0c18c205e89c08fdc8d45d",\n        "sha256:2a5e7791442784b3614921dcb51afdbe94ae9bfd3752e22e5eb81ce731f5bfbf",\n        "sha256:0d893e5416389fd105bc81d3694a5d5dbffc41237291df0aaa4efbc26632e91c",\n        "sha256:018ce7bd6fd46306e129aca44c1c103675dbe29e3aa842a0b7fb01507e8d02d2"\n      ]\n    },\n    "history": [\n      {\n        "created": "2024-06-05T13:48:00.432722149Z",\n        "created_by": "COPY /etc/passwd /etc/passwd # buildkit",\n        "comment": "buildkit.dockerfile.v0"\n      },\n      {\n        "created": "2024-06-05T13:48:00.469118621Z",\n        "created_by": "COPY /etc/group /etc/group # buildkit",\n        "comment": "buildkit.dockerfile.v0"\n      },\n      {\n        "created": "2024-06-05T13:48:01.653480931Z",\n        "created_by": "COPY --chmod=0755 policy-server-x86_64 /policy-server # buildkit",\n        "comment": "buildkit.dockerfile.v0"\n      },\n      {\n        "created": "2024-06-05T13:48:01.671482413Z",\n        "created_by": "ADD Cargo.lock /Cargo.lock # buildkit",\n        "comment": "buildkit.dockerfile.v0"\n      },\n      {\n        "created": "2024-06-05T13:48:01.671482413Z",\n        "created_by": "USER 65533:65533",\n        "comment": "buildkit.dockerfile.v0",\n        "empty_layer": true\n      },\n      {\n        "created": "2024-06-05T13:48:01.671482413Z",\n        "created_by": "EXPOSE map[3000/tcp:{}]",\n        "comment": "buildkit.dockerfile.v0",\n        "empty_layer": true\n      },\n      {\n        "created": "2024-06-05T13:48:01.671482413Z",\n        "created_by": "ENTRYPOINT [\\"/policy-server\\"]",\n        "comment": "buildkit.dockerfile.v0",\n        "empty_layer": true\n      }\n    ]\n  }\n}\n'})}),"\n",(0,a.jsxs)(n.p,{children:["For example, when requesting the image manifest and configuration of the\n",(0,a.jsx)(n.code,{children:"ghcr.io/kubewarden/policy-server:v1.13.0"})," image, the payload would be:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Input payload: ",(0,a.jsx)(n.code,{children:'"ghcr.io/kubewarden/policy-server:v1.13.0"'})]}),"\n",(0,a.jsxs)(n.li,{children:["Output payload: the body of the successful response obtained from the\nregistry. It will contain the ",(0,a.jsx)(n.a,{href:"https://github.com/opencontainers/image-spec/blob/main/manifest.md",children:"OCI image\nmanifest"}),"\n, image digest and the ",(0,a.jsx)(n.a,{href:"https://github.com/opencontainers/image-spec/blob/main/config.md",children:"OCI image\nconfiguration"}),"."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>o});var t=i(96540);const a={},c=t.createContext(a);function s(e){const n=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(c.Provider,{value:n},e.children)}}}]);