"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[34379],{96585:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"writing-policies/spec/validating-policies","title":"","description":"The Kubewarden policy server receives","source":"@site/versioned_docs/version-1.8/writing-policies/spec/03-validating-policies.md","sourceDirName":"writing-policies/spec","slug":"/writing-policies/spec/validating-policies","permalink":"/1.8/writing-policies/spec/validating-policies","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/writing-policies/spec/03-validating-policies.md","tags":[],"version":"1.8","lastUpdatedAt":1734605373000,"sidebarPosition":3,"frontMatter":{"sidebar_label":"Validating Policies","title":""},"sidebar":"docs","previous":{"title":"Policy Settings","permalink":"/1.8/writing-policies/spec/settings"},"next":{"title":"Mutating Policies","permalink":"/1.8/writing-policies/spec/mutating-policies"}}');var s=i(74848),o=i(28453);const r={sidebar_label:"Validating Policies",title:""},a="Validating policies",c={},d=[{value:"The <code>ValidationRequest</code> object",id:"the-validationrequest-object",level:2},{value:"A concrete example",id:"a-concrete-example",level:3},{value:"The <code>ValidationResponse</code> object",id:"the-validationresponse-object",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"validating-policies",children:"Validating policies"})}),"\n",(0,s.jsxs)(n.p,{children:["The Kubewarden policy server receives\n",(0,s.jsx)(n.a,{href:"https://godoc.org/k8s.io/api/admission/v1#AdmissionReview",children:(0,s.jsx)(n.code,{children:"AdmissionReview"})}),"\nobjects from the Kubernetes API server. It then forwards the value of\nits ",(0,s.jsx)(n.code,{children:"request"})," attribute (of type\n",(0,s.jsx)(n.a,{href:"https://godoc.org/k8s.io/api/admission/v1#AdmissionRequest",children:(0,s.jsx)(n.code,{children:"AdmissionRequest"})}),"\nkey to the policy to be evaluated."]}),"\n",(0,s.jsxs)(n.p,{children:["The policy has to evaluate the ",(0,s.jsx)(n.code,{children:"request"})," and state whether it should be\naccepted or not. When the request is rejected, the policy might provide the\nexplanation message and a specific error code that is going to be shown to the end user."]}),"\n",(0,s.jsxs)(n.p,{children:["By convention of the ",(0,s.jsx)(n.code,{children:"policy-server"})," project, the guest has to expose\na function named ",(0,s.jsx)(n.code,{children:"validate"}),", exposed through the waPC guest SDK, so\nthat the ",(0,s.jsx)(n.code,{children:"policy-server"})," (waPC host) can invoke it."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"validate"})," function receives a ",(0,s.jsx)(n.code,{children:"ValidationRequest"})," object serialized as JSON and\nreturns a ",(0,s.jsx)(n.code,{children:"ValidationResponse"})," object serialized as JSON."]}),"\n",(0,s.jsxs)(n.h2,{id:"the-validationrequest-object",children:["The ",(0,s.jsx)(n.code,{children:"ValidationRequest"})," object"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ValidationRequest"})," is a simple JSON object that is received by the\n",(0,s.jsx)(n.code,{children:"validate"})," function. It looks like this:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'{\n  "request": <AdmissionReview.request data>,\n  "settings": {\n    # your policy configuration\n  }\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"settings"})," key points to a free-form JSON document that can hold the policy\nspecific settings. The previous chapter focused on policies and settings."]}),"\n",(0,s.jsx)(n.h3,{id:"a-concrete-example",children:"A concrete example"}),"\n",(0,s.jsxs)(n.p,{children:["Given the following Kubernetes ",(0,s.jsx)(n.code,{children:"AdmissionReview"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'{\n  "apiVersion": "admission.k8s.io/v1",\n  "kind": "AdmissionReview",\n  "request": {\n    # Random uid uniquely identifying this admission call\n    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",\n\n    # Fully-qualified group/version/kind of the incoming object\n    "kind": {"group":"autoscaling","version":"v1","kind":"Scale"},\n    # Fully-qualified group/version/kind of the resource being modified\n    "resource": {"group":"apps","version":"v1","resource":"deployments"},\n    # subresource, if the request is to a subresource\n    "subResource": "scale",\n\n    # Fully-qualified group/version/kind of the incoming object in the original request to the API server.\n    # This only differs from `kind` if the webhook specified `matchPolicy: Equivalent` and the\n    # original request to the API server was converted to a version the webhook registered for.\n    "requestKind": {"group":"autoscaling","version":"v1","kind":"Scale"},\n    # Fully-qualified group/version/kind of the resource being modified in the original request to the API server.\n    # This only differs from `resource` if the webhook specified `matchPolicy: Equivalent` and the\n    # original request to the API server was converted to a version the webhook registered for.\n    "requestResource": {"group":"apps","version":"v1","resource":"deployments"},\n    # subresource, if the request is to a subresource\n    # This only differs from `subResource` if the webhook specified `matchPolicy: Equivalent` and the\n    # original request to the API server was converted to a version the webhook registered for.\n    "requestSubResource": "scale",\n\n    # Name of the resource being modified\n    "name": "my-deployment",\n    # Namespace of the resource being modified, if the resource is namespaced (or is a Namespace object)\n    "namespace": "my-namespace",\n\n    # operation can be CREATE, UPDATE, DELETE, or CONNECT\n    "operation": "UPDATE",\n\n    "userInfo": {\n      # Username of the authenticated user making the request to the API server\n      "username": "admin",\n      # UID of the authenticated user making the request to the API server\n      "uid": "014fbff9a07c",\n      # Group memberships of the authenticated user making the request to the API server\n      "groups": ["system:authenticated","my-admin-group"],\n      # Arbitrary extra info associated with the user making the request to the API server.\n      # This is populated by the API server authentication layer and should be included\n      # if any SubjectAccessReview checks are performed by the webhook.\n      "extra": {\n        "some-key":["some-value1", "some-value2"]\n      }\n    },\n\n    # object is the new object being admitted.\n    # It is null for DELETE operations.\n    "object": {"apiVersion":"autoscaling/v1","kind":"Scale",...},\n    # oldObject is the existing object.\n    # It is null for CREATE and CONNECT operations.\n    "oldObject": {"apiVersion":"autoscaling/v1","kind":"Scale",...},\n    # options contains the options for the operation being admitted, like meta.k8s.io/v1 CreateOptions, UpdateOptions, or DeleteOptions.\n    # It is null for CONNECT operations.\n    "options": {"apiVersion":"meta.k8s.io/v1","kind":"UpdateOptions",...},\n\n    # dryRun indicates the API request is running in dry run mode and will not be persisted.\n    # Webhooks with side effects should avoid actuating those side effects when dryRun is true.\n    # See http://k8s.io/docs/reference/using-api/api-concepts/#make-a-dry-run-request for more details.\n    "dryRun": false\n  }\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ValidationRequest"})," object would look like that:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'{\n  "request": {\n    # Random uid uniquely identifying this admission call\n    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",\n\n    # Fully-qualified group/version/kind of the incoming object\n    "kind": {"group":"autoscaling","version":"v1","kind":"Scale"},\n    # Fully-qualified group/version/kind of the resource being modified\n    "resource": {"group":"apps","version":"v1","resource":"deployments"},\n    # subresource, if the request is to a subresource\n    "subResource": "scale",\n\n    # Fully-qualified group/version/kind of the incoming object in the original request to the API server.\n    # This only differs from `kind` if the webhook specified `matchPolicy: Equivalent` and the\n    # original request to the API server was converted to a version the webhook registered for.\n    "requestKind": {"group":"autoscaling","version":"v1","kind":"Scale"},\n    # Fully-qualified group/version/kind of the resource being modified in the original request to the API server.\n    # This only differs from `resource` if the webhook specified `matchPolicy: Equivalent` and the\n    # original request to the API server was converted to a version the webhook registered for.\n    "requestResource": {"group":"apps","version":"v1","resource":"deployments"},\n    # subresource, if the request is to a subresource\n    # This only differs from `subResource` if the webhook specified `matchPolicy: Equivalent` and the\n    # original request to the API server was converted to a version the webhook registered for.\n    "requestSubResource": "scale",\n\n    # Name of the resource being modified\n    "name": "my-deployment",\n    # Namespace of the resource being modified, if the resource is namespaced (or is a Namespace object)\n    "namespace": "my-namespace",\n\n    # operation can be CREATE, UPDATE, DELETE, or CONNECT\n    "operation": "UPDATE",\n\n    "userInfo": {\n      # Username of the authenticated user making the request to the API server\n      "username": "admin",\n      # UID of the authenticated user making the request to the API server\n      "uid": "014fbff9a07c",\n      # Group memberships of the authenticated user making the request to the API server\n      "groups": ["system:authenticated","my-admin-group"],\n      # Arbitrary extra info associated with the user making the request to the API server.\n      # This is populated by the API server authentication layer and should be included\n      # if any SubjectAccessReview checks are performed by the webhook.\n      "extra": {\n        "some-key":["some-value1", "some-value2"]\n      }\n    },\n\n    # object is the new object being admitted.\n    # It is null for DELETE operations.\n    "object": {"apiVersion":"autoscaling/v1","kind":"Scale",...},\n    # oldObject is the existing object.\n    # It is null for CREATE and CONNECT operations.\n    "oldObject": {"apiVersion":"autoscaling/v1","kind":"Scale",...},\n    # options contains the options for the operation being admitted, like meta.k8s.io/v1 CreateOptions, UpdateOptions, or DeleteOptions.\n    # It is null for CONNECT operations.\n    "options": {"apiVersion":"meta.k8s.io/v1","kind":"UpdateOptions",...},\n\n    # dryRun indicates the API request is running in dry run mode and will not be persisted.\n    # Webhooks with side effects should avoid actuating those side effects when dryRun is true.\n    # See http://k8s.io/docs/reference/using-api/api-concepts/#make-a-dry-run-request for more details.\n    "dryRun": false\n  },\n  "settings": {\n    # policy settings\n  }\n}\n'})}),"\n",(0,s.jsxs)(n.h2,{id:"the-validationresponse-object",children:["The ",(0,s.jsx)(n.code,{children:"ValidationResponse"})," object"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"validate"})," function returns the outcome of its validation using a ",(0,s.jsx)(n.code,{children:"ValidationResponse"}),"\nobject."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"ValidationResponse"})," is structured in the following way:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'{\n  # mandatory\n  "accepted": <boolean>,\n\n  # optional, ignored if accepted - recommended for rejections\n  "message": <string>,\n\n  # optional, ignored if accepted\n  "code": <integer>,\n\n  # optional, used by mutation policies\n  "mutated_object": <string>\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"message"})," and ",(0,s.jsx)(n.code,{children:"code"})," attributes can be specified when the request\nis not accepted. ",(0,s.jsx)(n.code,{children:"message"})," is a free form textual error. ",(0,s.jsx)(n.code,{children:"code"}),"\nrepresents an HTTP error code."]}),"\n",(0,s.jsxs)(n.p,{children:["If the request is accepted, ",(0,s.jsx)(n.code,{children:"message"})," and ",(0,s.jsx)(n.code,{children:"code"}),"\nvalues will be ignored by the Kubernetes API server if they are\npresent."]}),"\n",(0,s.jsxs)(n.p,{children:["If ",(0,s.jsx)(n.code,{children:"message"})," or ",(0,s.jsx)(n.code,{children:"code"})," are provided, and the request is not\naccepted, the Kubernetes API server will forward this information as\npart of the body of the error returned to the Kubernetes API server\nclient that issued the rejected request."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"mutated_object"})," is an optional field used only by mutating policies.\nThis is going to be covered inside of the next chapter."]}),"\n",(0,s.jsx)(n.h1,{id:"recap",children:"Recap"}),"\n",(0,s.jsx)(n.p,{children:"These are the functions a validating policy must implement:"})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>a});var t=i(96540);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);