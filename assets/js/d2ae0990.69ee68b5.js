"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[79637],{89425:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>t,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"tutorials/writing-policies/rego/open-policy-agent/build-and-run","title":"Build and run a OPA policy for Kubewarden","description":"Build and run a OPA policy for Kubewarden.","source":"@site/versioned_docs/version-1.20/tutorials/writing-policies/rego/open-policy-agent/03-build-and-run.md","sourceDirName":"tutorials/writing-policies/rego/open-policy-agent","slug":"/tutorials/writing-policies/rego/open-policy-agent/build-and-run","permalink":"/1.20/tutorials/writing-policies/rego/open-policy-agent/build-and-run","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.20/tutorials/writing-policies/rego/open-policy-agent/03-build-and-run.md","tags":[],"version":"1.20","lastUpdatedAt":1738677855000,"sidebarPosition":3,"frontMatter":{"sidebar_label":"Build and run","title":"Build and run a OPA policy for Kubewarden","description":"Build and run a OPA policy for Kubewarden.","keywords":["kubewarden","kubernetes","build and run","open policy agent","opa","rego"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","open-policy-agent","build-and-run"]},"sidebar":"docs","previous":{"title":"Creating a new policy","permalink":"/1.20/tutorials/writing-policies/rego/open-policy-agent/create-policy"},"next":{"title":"Distribute","permalink":"/1.20/tutorials/writing-policies/rego/open-policy-agent/distribute"}}');var r=i(74848),l=i(28453);const t={sidebar_label:"Build and run",title:"Build and run a OPA policy for Kubewarden",description:"Build and run a OPA policy for Kubewarden.",keywords:["kubewarden","kubernetes","build and run","open policy agent","opa","rego"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","open-policy-agent","build-and-run"]},s=void 0,c={},d=[{value:"Build",id:"build",level:2},{value:"Run",id:"run",level:2}];function a(e){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i,{children:(0,r.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rego/open-policy-agent/build-and-run"})}),"\n",(0,r.jsx)(n.p,{children:"In the previous section you wrote your Rego policy.\nThe structure looks like:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-console",children:".\n\u251c\u2500\u2500 data\n\u2502\xa0\xa0 \u251c\u2500\u2500 default-ns.json\n\u2502\xa0\xa0 \u2514\u2500\u2500 other-ns.json\n\u251c\u2500\u2500 policy.rego\n\u2514\u2500\u2500 request.rego\n\n1 directory, 4 files\n"})}),"\n",(0,r.jsx)(n.h2,{id:"build",children:"Build"}),"\n",(0,r.jsx)(n.p,{children:"To build:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-console",children:"$ opa build -t wasm -e policy/main policy.rego request.rego\n"})}),"\n",(0,r.jsx)(n.p,{children:"This builds the rego policy, with:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"target"}),": ",(0,r.jsx)(n.code,{children:"wasm"}),".\nYou want to build the policy for the ",(0,r.jsx)(n.code,{children:"wasm"})," target."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"entrypoint"}),": ",(0,r.jsx)(n.code,{children:"policy/main"}),".\nThe entry point is the ",(0,r.jsx)(n.code,{children:"main"})," rule inside the ",(0,r.jsx)(n.code,{children:"policy"})," package."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"policy.rego"}),":\nBuild and include the ",(0,r.jsx)(n.code,{children:"policy.rego"})," file."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"request.rego"}),":\nBuild and include the ",(0,r.jsx)(n.code,{children:"request.rego"})," file."]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["After the build completes, ",(0,r.jsx)(n.code,{children:"opa build"})," has generated a ",(0,r.jsx)(n.code,{children:"bundle.tar.gz"})," file.\nYou can extract it:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-console",children:"$ tar -xf bundle.tar.gz /policy.wasm\n"})}),"\n",(0,r.jsx)(n.p,{children:"Now the tree looks like the following:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-console",children:".\n\u251c\u2500\u2500 bundle.tar.gz\n\u251c\u2500\u2500 data\n\u2502\xa0\xa0 \u251c\u2500\u2500 default-ns.json\n\u2502\xa0\xa0 \u2514\u2500\u2500 other-ns.json\n\u251c\u2500\u2500 policy.rego\n\u251c\u2500\u2500 policy.wasm\n\u2514\u2500\u2500 request.rego\n\n1 directory, 6 file\n"})}),"\n",(0,r.jsxs)(n.p,{children:["You have your ",(0,r.jsx)(n.code,{children:"policy.wasm"})," file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-console",children:"$ file policy.wasm\npolicy.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)\n"})}),"\n",(0,r.jsx)(n.p,{children:"Now you run it."}),"\n",(0,r.jsx)(n.h2,{id:"run",children:"Run"}),"\n",(0,r.jsxs)(n.p,{children:["Use ",(0,r.jsx)(n.code,{children:"kwctl"})," to run the policy:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-console",children:'$ kwctl run -e opa --request-path data/other-ns.json policy.wasm | jq\n{\n  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n  "allowed": true\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["This request is accepted by the policy,\nsince this is the request pointing to the ",(0,r.jsx)(n.code,{children:"other"})," namespace."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"execution-mode"}),": ",(0,r.jsx)(n.code,{children:"opa"}),".\nRego policies can be targeting Open Policy Agent or Gatekeeper.\nYou must tell ",(0,r.jsx)(n.code,{children:"kwctl"})," what kind of policy you're running."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"request-path"}),":\nThe location of the recorded request that ",(0,r.jsx)(n.code,{children:"kwctl"})," sends the policy to for evaluation."]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Now try to evaluate the request that creates the pod inside the ",(0,r.jsx)(n.code,{children:"default"})," namespace:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-console",children:'$ kwctl run -e opa --request-path data/default-ns.json policy.wasm | jq\n{\n  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n  "allowed": false,\n  "status": {\n    "message": "it is forbidden to use the default namespace"\n  }\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"The policy is rejecting the request,\ngiving a reason back to the API server that's returned to the user or API consumer."})]})}function u(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>s});var o=i(96540);const r={},l=o.createContext(r);function t(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);