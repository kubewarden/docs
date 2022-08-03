"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[6570],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return d}});var i=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=i.createContext({}),u=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=u(e.components);return i.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},g=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),g=u(t),d=r,f=g["".concat(l,".").concat(d)]||g[d]||c[d]||a;return t?i.createElement(f,s(s({ref:n},p),{},{components:t})):i.createElement(f,s({ref:n},p))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,s=new Array(a);s[0]=g;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var u=2;u<a;u++)s[u]=t[u];return i.createElement.apply(null,s)}return i.createElement.apply(null,t)}g.displayName="MDXCreateElement"},3104:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return c}});var i=t(3117),r=t(102),a=(t(7294),t(3905)),s=["components"],o={sidebar_label:"Signature Verifier Policies",title:""},l="Signature verifier policies",u={unversionedId:"writing-policies/spec/host-capabilities/signature-verifier-policies",id:"writing-policies/spec/host-capabilities/signature-verifier-policies",title:"",description:"Kubewarden implements support for the Sigstore",source:"@site/docs/writing-policies/spec/host-capabilities/02-signature-verifier-policies.md",sourceDirName:"writing-policies/spec/host-capabilities",slug:"/writing-policies/spec/host-capabilities/signature-verifier-policies",permalink:"/writing-policies/spec/host-capabilities/signature-verifier-policies",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/spec/host-capabilities/02-signature-verifier-policies.md",tags:[],version:"current",lastUpdatedAt:1659523996,formattedLastUpdatedAt:"Aug 3, 2022",sidebarPosition:2,frontMatter:{sidebar_label:"Signature Verifier Policies",title:""},sidebar:"docs",previous:{title:"Host Capabilities Specification",permalink:"/writing-policies/spec/host-capabilities/intro-host-capabilities"},next:{title:"Container Registry Capabilities",permalink:"/writing-policies/spec/host-capabilities/container-registry"}},p={},c=[{value:"A concrete example",id:"a-concrete-example",level:2}],g={toc:c};function d(e){var n=e.components,t=(0,r.Z)(e,s);return(0,a.kt)("wrapper",(0,i.Z)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"signature-verifier-policies"},"Signature verifier policies"),(0,a.kt)("p",null,"Kubewarden implements support for the ",(0,a.kt)("a",{parentName:"p",href:"https://www.sigstore.dev/"},"Sigstore"),"\nproject. This allows to implement a Secure Supply Chain for your cluster."),(0,a.kt)("p",null,"Part of that is to ensure that all container images running in the cluster are\nsigned and verified, proving that they come from their stated authors, and\nhaven't been tampered with. For further reading, do check out the docs on\n",(0,a.kt)("a",{parentName:"p",href:"/distributing-policies/secure-supply-chain"},"how we implement a Secure Supply Chain for the policies themselves"),")."),(0,a.kt)("p",null,"Sigstore signatures are stored inside of container registries, next to the OCI\nobject being signed; be it a container image or a more generic OCI artifact,\nlike a Kubewarden policy. Given an object to be signed, all its signatures are\ngoing to be stored as layers of a special OCI object created by sigstore.\nPolicies that want to check Sigstore signatures of containers need then to check\nthose layers, and would need to pull the signature layers to see the\nsignatures themselves."),(0,a.kt)("p",null,"Obtaining and operating with those OCI layers needs to happen outside of the\nWebAssembly guest (the policy). Hence this is done by the WebAssembly runtime:\nKubewarden's ",(0,a.kt)("inlineCode",{parentName:"p"},"policy-server")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl"),"."),(0,a.kt)("p",null,"The different language SDKs for Kubewarden policies take care of all that, and\nprovide functions for verification of container image, Kubewarden policies, Helm\ncharts and generally speaking any kind of OCI artifact. This ensures a safe and\ntested codepath for verification. In addition, pulling data from a registry and\ncryptographically verifying signatures can be time and computationally\nexpensive, so the WebAssembly runtime (PolicyServer, ",(0,a.kt)("inlineCode",{parentName:"p"},"kwctl"),") ensures both\nsignature pulls and verification computations are cached. The cached entries\nare automatically expired after 60 seconds to prevent stale data from being\nserved."),(0,a.kt)("p",null,"The SDKs provide functions similar to the following:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"verify_pub_keys_image(\n    image_url: string,\n    vector_of_pub_keys: vector<string>,\n    vector_of_sigstore_annotations: Vector<(key, value: string)>\n    )\n    returns (is_trusted: bool, digest_of_verified_image: string)\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"verify_keyless_exact_match(\n    image_url: string,\n    vector_of_tuples_issuer_and_subject: vector<(issuer, subject: string)>,\n    vector_of_sigstore_annotations: vector<(key, value: string)>\n    )\n    returns (is_trusted: bool, digest_of_verified_image: string)\n")))),(0,a.kt)("p",null,"Both functions verify that the image is signed and satisfy the passed\nconstraints."),(0,a.kt)("p",null,"Note well: on success, the functions return the digest of the verified image. It\nis now on the policy to ensure that containers are instantiated from that\ndigest, and not from tag that may or may not match that checksum digest (and\ntherefore be compromised)."),(0,a.kt)("h2",{id:"a-concrete-example"},"A concrete example"),(0,a.kt)("p",null,"The Kubewarden team ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/verify-image-signatures"},"provides a verifier policy"),"\nthat enforces Sigstore signatures for all containers, built on Rust and with the\nRust SDK. The policy ensures that the containers are signed, and optionally,\nmutates the requests appending the exact verified checksum to the tag of the\nimage. Check its docs for specifics."),(0,a.kt)("p",null,"This policy may cover all your needs, but in case you would prefer a different\nUX, of course you can build on top of it or any of the other SDKs."),(0,a.kt)("h1",{id:"wapc-protocol-contract"},"WaPC protocol contract"),(0,a.kt)("p",null,"In case you are implementing your own language SDK, these are the functions a\npolicy that verifies signatures can use:"),(0,a.kt)("table",null,(0,a.kt)("tr",null,(0,a.kt)("td",null," WaPC function name ")," ",(0,a.kt)("td",null," Input payload ")," ",(0,a.kt)("td",null," Output payload ")),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"v2/verify"))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  type: "SigstorePubKeyVerify",\n\n  // **mandatory**: image URI to verify\n  "image": string,\n  "pub_keys": [\n    // PEM-encoded public keys\n    string\n    ],\n  // optional:\n  "annotations": [\n      // signature annotations\n      {\n        "key": string,\n        "value": string\n      },\n    ]\n}\n'))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n   // true if image verified\n   "is_trusted": boolean,\n   // digest of verified image\n   "digest": string\n}\n')))),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"v2/verify"))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  type: "SigstoreKeylessVerify",\n\n  // mandatory: image URI to verify\n  "image": string,\n  "keyless": [\n    // list of (issuer, subject) tuples\n    {\n      // OIDC issuer\n      "issuer": string,\n      // signature subject (mail, CI URL, ...)\n      "subject": string\n    }\n  ],\n  // optional:\n  "annotations": [\n    // signature annotations\n    {\n      "key": string,\n      "value": string\n    },\n  ]\n}\n'))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n   // true if image verified\n   "is_trusted": boolean,\n   // digest of verified image\n   "digest": string\n}\n')))),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"v2/verify"))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  type: "SigstoreKeylessPrefixVerify",\n\n  // mandatory: image URI to verify\n  "image": string,\n  "keyless_prefix": [\n    // list of (issuer, url_prefix) tuples\n    {\n      // OIDC issuer\n      "issuer": string,\n      // URL Prefix of subject (CI URL, ...)\n      "url_prefix": string\n    }\n  ],\n  // optional:\n  "annotations": [\n    // signature annotations\n    {\n      "key": string,\n      "value": string\n    },\n  ]\n}\n'))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n   // true if image verified\n   "is_trusted": boolean,\n   // digest of verified image\n   "digest": string\n}\n')))),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"v2/verify"))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  type: "SigstoreGithubActionsVerify",\n\n  // mandatory: image URI to verify\n  "image": string,\n  // GitHub owner\n  "owner": string,\n  // optional:\n  // GitHub repository \n  "repo": string\n  "annotations": [\n    // signature annotations\n    {\n      "key": string,\n      "value": string\n    },\n  ]\n}\n'))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n   // true if image verified\n   "is_trusted": boolean,\n   // digest of verified image\n   "digest": string\n}\n'))))),(0,a.kt)("p",null,"Marked for deprecation:"),(0,a.kt)("table",null,(0,a.kt)("tr",null,(0,a.kt)("td",null," WaPC function name ")," ",(0,a.kt)("td",null," Input payload ")," ",(0,a.kt)("td",null," Output payload ")),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"v1/verify"))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  // **mandatory**: image URI to verify\n  "image": string,\n  "pub_keys": [\n    // PEM-encoded public keys\n    string\n    ],\n  // optional:\n  "annotations": [\n      // signature annotations\n      {\n        "key": string,\n        "value": string\n      },\n    ]\n}\n'))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n   // true if image verified\n   "is_trusted": boolean,\n   // digest of verified image\n   "digest": string\n}\n')))),(0,a.kt)("tr",null,(0,a.kt)("td",null,(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"v1/verify"))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  // mandatory: image URI to verify\n  "image": string,\n  "keyless": [\n    // list of (issuer, subject) tuples\n    {\n      // OIDC issuer\n      "issuer": string,\n      // signature subject (mail, CI URL, ...)\n      "subject": string\n    }\n  ],\n  // optional:\n  "annotations": [\n    // signature annotations\n    {\n      "key": string,\n      "value": string\n    },\n  ]\n}\n'))),(0,a.kt)("td",null,(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n   // true if image verified\n   "is_trusted": boolean,\n   // digest of verified image\n   "digest": string\n}\n'))))))}d.isMDXComponent=!0}}]);