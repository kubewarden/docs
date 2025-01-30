"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[60814],{93354:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"tutorials/writing-policies/rego/gatekeeper/build-and-run","title":"Build and run a Gatekeeper policy","description":"Building and running a Gatekeeper policy written in Rego.","source":"@site/versioned_docs/version-1.13/tutorials/writing-policies/rego/gatekeeper/03-build-and-run.md","sourceDirName":"tutorials/writing-policies/rego/gatekeeper","slug":"/tutorials/writing-policies/rego/gatekeeper/build-and-run","permalink":"/1.13/tutorials/writing-policies/rego/gatekeeper/build-and-run","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.13/tutorials/writing-policies/rego/gatekeeper/03-build-and-run.md","tags":[],"version":"1.13","lastUpdatedAt":1738242412000,"sidebarPosition":3,"frontMatter":{"sidebar_label":"Build and run","title":"Build and run a Gatekeeper policy","description":"Building and running a Gatekeeper policy written in Rego.","keywords":["kubewarden","kubernetes","gatekeeper policy","rego"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","gatekeeper","build-and-run"]},"sidebar":"docs","previous":{"title":"Create a New Policy","permalink":"/1.13/tutorials/writing-policies/rego/gatekeeper/create-policy"},"next":{"title":"Distribute","permalink":"/1.13/tutorials/writing-policies/rego/gatekeeper/distribute"}}');var t=i(74848),o=i(28453);const l={sidebar_label:"Build and run",title:"Build and run a Gatekeeper policy",description:"Building and running a Gatekeeper policy written in Rego.",keywords:["kubewarden","kubernetes","gatekeeper policy","rego"],"doc-persona":["kubewarden-policy-developer"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rego","gatekeeper","build-and-run"]},s=void 0,c={},d=[{value:"Build",id:"build",level:2},{value:"Run",id:"run",level:2}];function a(e){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rego/gatekeeper/build-and-run"})}),"\n",(0,t.jsx)(n.p,{children:"You can build and run the policy in exactly the same way as a Rego policy targeting Open Policy Agent.\nThe structure of your project is:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:".\n\u251c\u2500\u2500 data\n\u2502\xa0\xa0 \u251c\u2500\u2500 default-ns.json\n\u2502\xa0\xa0 \u2514\u2500\u2500 other-ns.json\n\u2514\u2500\u2500 policy.rego\n\n1 directory, 3 files\n"})}),"\n",(0,t.jsx)(n.h2,{id:"build",children:"Build"}),"\n",(0,t.jsxs)(n.p,{children:["Build the policy by running the ",(0,t.jsx)(n.code,{children:"opa"})," command:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"$ opa build -t wasm -e policy/violation policy.rego\n"})}),"\n",(0,t.jsx)(n.p,{children:"This builds the rego policy, with:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"target"}),": ",(0,t.jsx)(n.code,{children:"wasm"}),". We want to build the policy for the ",(0,t.jsx)(n.code,{children:"wasm"})," target."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"entrypoint"}),": ",(0,t.jsx)(n.code,{children:"policy/violation"}),". The entry point is the ",(0,t.jsx)(n.code,{children:"violation"}),"\nrule inside the ",(0,t.jsx)(n.code,{children:"policy"})," package."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"policy.rego"}),": build and include the ",(0,t.jsx)(n.code,{children:"policy.rego"})," file."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The earlier command generates a ",(0,t.jsx)(n.code,{children:"bundle.tar.gz"})," file.\nYou can extract the Wasm module from it:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"$ tar -xf bundle.tar.gz /policy.wasm\n"})}),"\n",(0,t.jsx)(n.p,{children:"The project tree looks like the following:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:".\n\u251c\u2500\u2500 bundle.tar.gz\n\u251c\u2500\u2500 data\n\u2502\xa0\xa0 \u251c\u2500\u2500 default-ns.json\n\u2502\xa0\xa0 \u2514\u2500\u2500 other-ns.json\n\u251c\u2500\u2500 policy.rego\n\u2514\u2500\u2500 policy.wasm\n\n1 directory, 5 files\n"})}),"\n",(0,t.jsx)(n.p,{children:"You can now execute your policy."}),"\n",(0,t.jsx)(n.h2,{id:"run",children:"Run"}),"\n",(0,t.jsxs)(n.p,{children:["Use ",(0,t.jsx)(n.code,{children:"kwctl"})," to run your policy as follows:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'$ kwctl run -e gatekeeper --request-path data/other-ns.json policy.wasm | jq\n{\n  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n  "allowed": true\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This is your resource created in the namespace called ",(0,t.jsx)(n.code,{children:"other"}),", it's accepted, as expected."]}),"\n",(0,t.jsx)(n.p,{children:"Now you can run a request that is rejected by the policy:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:'$ kwctl run -e gatekeeper --request-path data/default-ns.json policy.wasm | jq\n{\n  "uid": "1299d386-525b-4032-98ae-1949f69f9cfc",\n  "allowed": false,\n  "status": {\n    "message": "it is forbidden to use the default namespace"\n  }\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"You can see your Gatekeeper policy rejected this resource."})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>s});var r=i(96540);const t={},o=r.createContext(t);function l(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);