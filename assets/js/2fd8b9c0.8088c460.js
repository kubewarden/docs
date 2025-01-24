"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[56309],{37281:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"tutorials/writing-policies/CEL/context-aware","title":"Context-aware CEL policies","description":"Example: context-aware CEL policy","source":"@site/docs/tutorials/writing-policies/CEL/03-context-aware.md","sourceDirName":"tutorials/writing-policies/CEL","slug":"/tutorials/writing-policies/CEL/context-aware","permalink":"/next/tutorials/writing-policies/CEL/context-aware","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/tutorials/writing-policies/CEL/03-context-aware.md","tags":[],"version":"current","lastUpdatedAt":1737725846000,"sidebarPosition":3,"frontMatter":{"sidebar_label":"Context-aware policies","title":"Context-aware CEL policies","description":"Example: context-aware CEL policy","keywords":["kubewarden","kubernetes","writing policies","context-aware","context","aware","ingress"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","cel","context-aware","context","awaree","ingress"],"doc-persona":["kubewarden-policy-developer","kubewarden-operator"]},"sidebar":"docs","previous":{"title":"Reusing VAPs","permalink":"/next/tutorials/writing-policies/CEL/reusing-vap"},"next":{"title":"Sigstore host capabilities","permalink":"/next/tutorials/writing-policies/CEL/example-sigstore"}}');var t=s(74848),r=s(28453);const a={sidebar_label:"Context-aware policies",title:"Context-aware CEL policies",description:"Example: context-aware CEL policy",keywords:["kubewarden","kubernetes","writing policies","context-aware","context","aware","ingress"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","cel","context-aware","context","awaree","ingress"],"doc-persona":["kubewarden-policy-developer","kubewarden-operator"]},o=void 0,c={},l=[{value:"Example: Unique Ingress",id:"example-unique-ingress",level:2},{value:"Deploying the policy",id:"deploying-the-policy",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.R)(),...e.components},{Head:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/cel/context-aware-policies"})}),"\n",(0,t.jsxs)(n.p,{children:["Kubewarden's ",(0,t.jsx)(n.code,{children:"cel-policy"})," supports the ",(0,t.jsx)(n.a,{href:"../../../reference/spec/context-aware-policies",children:"context\nawareness"})," feature. The\npolicy has the capability to read cluster information and take decisions based\non other existing resources besides the resource that triggered the policy\nevaluation via admission request."]}),"\n",(0,t.jsxs)(n.p,{children:["To achieve this, we can use the ",(0,t.jsx)(n.a,{href:"https://github.com/kubewarden/cel-policy?tab=readme-ov-file#host-capabilities",children:"Kubewarden's CEL extension\nlibraries for host capabilities"}),"\nincluded in the policy."]}),"\n",(0,t.jsx)(n.h2,{id:"example-unique-ingress",children:"Example: Unique Ingress"}),"\n",(0,t.jsx)(n.p,{children:"Let's write a policy that, upon creation or update of Ingresses, checks that\nIngress is unique, so hosts have at most one Ingress rule."}),"\n",(0,t.jsxs)(n.p,{children:["For that, we declare that the policy is context-aware. We also declare the fine-grained\npermissions we need to read other Ingress resources. This is achieved with\n",(0,t.jsx)(n.code,{children:"spec.contextAwareResources"})," (1). We can get a starting point as usual by using ",(0,t.jsx)(n.code,{children:"kwctl"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ kwctl scaffold manifest -t ClusterAdmissionPolicy \\\n  registry://ghcr.io/kubewarden/policies/cel-policy:v1.0.0` \\\n  --allow-context-aware\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which then we can edit to be relevant to our Ingress resources:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="./cel-policy-ingress.yaml" {16}',children:'apiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: "unique-ingress"\n  annotations:\n    io.kubewarden.policy.category: Best practices\n    io.kubewarden.policy.severity: low\nspec:\n  module: ghcr.io/kubewarden/policies/cel-policy:v1.0.0\n  failurePolicy: Fail\n  rules:\n    - apiGroups: ["networking.k8s.io"]\n      apiVersions: ["v1"]\n      resources: ["ingresses"]\n      operations: ["CREATE", "UPDATE"]\n  contextAwareResources: # (1)\n    - apiVersion: networking.k8s.io/v1\n      kind: Ingress\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Now, we need to write the CEL code that will fetch the existing Ingresses in\nthe cluster. For that, we use the ",(0,t.jsx)(n.a,{href:"https://github.com/kubewarden/cel-policy?tab=readme-ov-file#host-capabilities",children:"Kubewarden CEL extension\nlibrary"}),".\nParticularly, the ",(0,t.jsx)(n.code,{children:"kw.k8s"})," host capabilities, which allows us to query the\ncluster for GroupVersionKinds. You can see the available docs for the CEL\nfunctions\n",(0,t.jsx)(n.a,{href:"https://pkg.go.dev/github.com/kubewarden/cel-policy/internal/cel/library",children:"here"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"The library uses a builder pattern just as the upstream Kubernetes CEL\nextensions; calling a CEL function method returns a CEL object which on its own\nhas specific function methods. This simplifies being certain of the scope and\nreturns of our CEL code."}),"\n",(0,t.jsxs)(n.p,{children:["In this case, we will use ",(0,t.jsx)(n.code,{children:'kw.k8s.apiVersion("v1").kind("Ingress")'}),"; here we\ncall the ",(0,t.jsx)(n.code,{children:"apiVersion()"})," function of the ",(0,t.jsx)(n.code,{children:"kw.k8s"})," library, which returns us a\n",(0,t.jsx)(n.code,{children:"<ClientBuilder>"})," object. This object has the ",(0,t.jsx)(n.code,{children:"<ClientBuilder>.kind()"})," method,\nthat returns a list of all resources, in an array called ",(0,t.jsx)(n.code,{children:"items"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"With that, we save the list of Ingresses in the cluster in a variable:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'variables:\n  - name: knownIngresses\n    expression: kw.k8s.apiVersion("networking.k8s.io/v1").kind("Ingress").list().items\n'})}),"\n",(0,t.jsx)(n.p,{children:"Then, we build a list of hosts from those Ingresses. Note that there can be\nseveral hosts per Ingress, so this expression holds an array of arrays (which\nis a current limitation of the CEL language):"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"variables:\n  - name: knownHosts\n    expression: |\n      variables.knownIngresses.map(i, i.spec.rules.map(r, r.host))\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Yet, this doesn't take care of UPDATE operations correctly; for that, we need\nto remove the current object and extract the hosts from the remaining Ingresses.\nWe can do that with a ",(0,t.jsx)(n.code,{children:"filter()"})," on the current object at ",(0,t.jsx)(n.code,{children:"object"}),".\nWith this, UPDATE operations are correctly checked. This also means that the\npolicy will correctly report results to the Audit Scanner, too. It will look\nlike this:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"variables:\n  - name: knownHosts\n    expression: |\n      variables.knownIngresses\n      .filter(i, (i.metadata.name != object.metadata.name) && (i.metadata.namespace != object.metadata.namespace))\n      .map(i, i.spec.rules.map(r, r.host))\n"})}),"\n",(0,t.jsx)(n.p,{children:"We also need a list of hosts in the current Ingress request to compare against:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"variables:\n  - name: desiredHosts\n    expression: |\n      object.spec.rules.map(r, r.host)\n"})}),"\n",(0,t.jsx)(n.p,{children:"With those 2 variables, we can do a set intersection between the known hosts and\nthe desired hosts, and if there's any, we reject:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'validations:\n  - expression: |\n      !variables.knownHost.exists_one(hosts, sets.intersects(hosts, variables.desiredHosts))\n    message: "Cannot reuse a host across multiple ingresses"\n'})}),"\n",(0,t.jsx)(n.p,{children:"Putting it all together, the policy looks as follows:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="./cel-policy-ingress.yaml"',children:'apiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: "unique-ingress"\n  annotations:\n    io.kubewarden.policy.category: Best practices\n    io.kubewarden.policy.severity: low\nspec:\n  module: ghcr.io/kubewarden/policies/cel-policy:v1.0.0\n  failurePolicy: Fail\n  rules:\n    - apiGroups: ["networking.k8s.io"]\n      apiVersions: ["v1"]\n      resources: ["ingresses"]\n      operations: ["CREATE", "UPDATE"]\n  contextAwareResources:\n    - apiVersion: networking.k8s.io/v1\n      kind: Ingress\n  settings:\n    variables:\n      - name: knownIngresses\n        expression: |\n          kw.k8s.apiVersion("networking.k8s.io/v1").kind("Ingress").list().items\n      - name: knownHosts\n        expression: |\n          variables.knownIngresses\n          .filter(i, (i.metadata.name != object.metadata.name) && (i.metadata.namespace != object.metadata.namespace))\n          .map(i, i.spec.rules.map(r, r.host))\n      - name: desiredHosts\n        expression: |\n          object.spec.rules.map(r, r.host)\n    validations:\n      - expression: |\n          !variables.knownHosts.exists_one(hosts, sets.intersects(hosts, variables.desiredHosts))\n        message: "Cannot reuse a host across multiple ingresses"\n'})}),"\n",(0,t.jsx)(n.h2,{id:"deploying-the-policy",children:"Deploying the policy"}),"\n",(0,t.jsx)(n.p,{children:"As normal, we can deploy our policy by instantiating its manifest:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ kubectl apply -f ./cel-policy-example.yaml\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now we can test it by instantiating Ingresses. The first one will succeed as\nthere's no other targetting that host:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:'$ kubectl apply -f - <<EOF\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: ingress-host-foobar-1\nspec:\n  rules:\n  - host: "foo.bar.com"\n    http:\n      paths:\n      - pathType: Prefix\n        path: "/bar"\n        backend:\n          service:\n            name: service1\n            port:\n              number: 80\nEOF\n'})}),"\n",(0,t.jsx)(n.p,{children:"But the second one will result in a rejection:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:'$ kubectl apply -f - <<EOF\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: ingress-host-foobar-2\nspec:\n  rules:\n  - host: "foo.bar.com"\n    http:\n      paths:\n      - pathType: Prefix\n        path: "/foo"\n        backend:\n          service:\n            name: service2\n            port:\n              number: 80\nEOF\nError from server: error when creating "STDIN":\n  admission webhook "clusterwide-unique-ingress.kubewarden.admission" denied the request:\n  Cannot reuse a host across multiple ingresses\n'})})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>o});var i=s(96540);const t={},r=i.createContext(t);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);