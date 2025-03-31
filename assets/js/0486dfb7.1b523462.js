"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[71290],{77883:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>u,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"tasksDir/mutating-policies","title":"Mutating policies","description":"Explains mutating policies in the context of Kubewarden","source":"@site/versioned_docs/version-1.8/tasksDir/mutating-policies.md","sourceDirName":"tasksDir","slug":"/tasksDir/mutating-policies","permalink":"/1.8/tasksDir/mutating-policies","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/tasksDir/mutating-policies.md","tags":[],"version":"1.8","lastUpdatedAt":1743431197000,"frontMatter":{"sidebar_label":"Mutating policies","title":"Mutating policies","description":"Explains mutating policies in the context of Kubewarden","keywords":["kubewarden policy mutating kubernetes clusteradmissionpolicy admissionpolicy"]},"sidebar":"docs","previous":{"title":"Verifying Kubewarden","permalink":"/1.8/security/verifying-kubewarden"},"next":{"title":"Distributing policies","permalink":"/1.8/distributing-policies"}}');var t=s(74848),r=s(28453);const o={sidebar_label:"Mutating policies",title:"Mutating policies",description:"Explains mutating policies in the context of Kubewarden",keywords:["kubewarden policy mutating kubernetes clusteradmissionpolicy admissionpolicy"]},a=void 0,u={},c=[];function l(e){const n={a:"a",code:"code",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["A mutating policy will rebuild the requests with\ndefined values that comply with the policy definition.\nIf you want to allow the behavior of mutating requests,\nset the ",(0,t.jsx)(n.code,{children:"ClusterAdmissionPolicy.mutating"})," field to ",(0,t.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["However, if you set the ",(0,t.jsx)(n.code,{children:"ClusterAdmissionPolicy.mutating"})," field to ",(0,t.jsx)(n.code,{children:"false"}),",\nthe mutated requests will be rejected.\nFor example, create the following ",(0,t.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," with the ",(0,t.jsx)(n.code,{children:"mutating"})," field set to ",(0,t.jsx)(n.code,{children:"true"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# Command\nkubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-user-group\nspec:\n  module: "registry://ghcr.io/kubewarden/policies/user-group-psp:v0.1.5"\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n    - UPDATE\n  mutating: true\n  settings:\n    run_as_user:\n      rule: "MustRunAs"\n      ranges:\n        - min: 1000\n          max: 2000\n        - min: 3000\n          max: 4000\n    run_as_group:\n      rule: "RunAsAny"\n    supplemental_groups:\n      rule: "RunAsAny" \nEOF\n\n# Output\nclusteradmissionpolicy.policies.kubewarden.io/psp-user-group created\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.a,{href:"https://github.com/kubewarden/user-group-psp-policy",children:(0,t.jsx)(n.code,{children:"psp-user-group"})})," policy is used to control users and groups in containers and can mutate the requests.\nIn the example above, the ",(0,t.jsx)(n.code,{children:"runAsUser"})," field is set and it will be added to the container ",(0,t.jsx)(n.code,{children:"securityContext"})," section."]}),"\n",(0,t.jsxs)(n.p,{children:["As the ",(0,t.jsx)(n.code,{children:"mutating"})," field is set to ",(0,t.jsx)(n.code,{children:"true"}),", the following request will be applied successfully:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Command\nkubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: pause-user-group\nspec:\n  containers:\n    - name: pause\n      image: registry.k8s.io/pause\nEOF\n\n# Output\npod/pause-user-group created\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Once the request is applied, you can see the results of the container's ",(0,t.jsx)(n.code,{children:"securityContext"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Command\nkubectl get pods pause-user-group -o jsonpath='{ .spec.containers[].securityContext }'\n\n# Output\n{\"runAsUser\":1000}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Now, modify the ",(0,t.jsx)(n.code,{children:"ClusterAdmissionPolicy"})," by setting the field ",(0,t.jsx)(n.code,{children:"mutating"})," to ",(0,t.jsx)(n.code,{children:"false"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# Command\nkubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-user-group\nspec:\n  module: "registry://ghcr.io/kubewarden/policies/user-group-psp:v0.1.5"\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n    - UPDATE\n  mutating: false\n  settings:\n    run_as_user:\n      rule: "MustRunAs"\n      ranges:\n        - min: 1000\n          max: 2000\n        - min: 3000\n          max: 4000\n    run_as_group:\n      rule: "RunAsAny"\n    supplemental_groups:\n      rule: "RunAsAny" \nEOF\n\n# Output\nclusteradmissionpolicy.policies.kubewarden.io/psp-user-group configured\n'})}),"\n",(0,t.jsxs)(n.p,{children:["As the ",(0,t.jsx)(n.code,{children:"mutating"})," field is set to ",(0,t.jsx)(n.code,{children:"false"}),", the following request will fail:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# Command\nkubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: pause-user-group\nspec:\n  containers:\n    - name: pause\n      image: registry.k8s.io/pause\nEOF\n\n# Output\nError from server: error when creating ".\\\\pause-user-group.yaml": admission webhook "psp-user-group.kubewarden.admission" denied the request: Request rejected by policy psp-user-group. The policy attempted to mutate the request, but it is currently configured to not allow mutations.\n'})}),"\n",(0,t.jsx)(n.p,{children:"In conclusion, you can see Kubewarden replicates the same behavior as the deprecated Kubernetes Pod Security Polices (PSP)."})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var i=s(96540);const t={},r=i.createContext(t);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);