"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[96532],{48072:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"tutorials/writing-policies/go/e2e-tests","title":"End-to-end testing","description":"A tutorial introduction to end-to-end testing for writing Kubewarden policies in the Go language.","source":"@site/versioned_docs/version-1.18/tutorials/writing-policies/go/05-e2e-tests.md","sourceDirName":"tutorials/writing-policies/go","slug":"/tutorials/writing-policies/go/e2e-tests","permalink":"/1.18/tutorials/writing-policies/go/e2e-tests","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.18/tutorials/writing-policies/go/05-e2e-tests.md","tags":[],"version":"1.18","lastUpdatedAt":1741013230000,"sidebarPosition":40,"frontMatter":{"sidebar_label":"End-to-end testing","sidebar_position":40,"title":"End-to-end testing","description":"A tutorial introduction to end-to-end testing for writing Kubewarden policies in the Go language.","keywords":["kubewarden","kubernetes","writing policies","end-to-end testing","golang","go"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","golang","end-to-end-testing"],"doc-persona":["kubewarden-policy-developer"]},"sidebar":"docs","previous":{"title":"Validation logic","permalink":"/1.18/tutorials/writing-policies/go/validation"},"next":{"title":"Logging","permalink":"/1.18/tutorials/writing-policies/go/logging"}}');var o=n(74848),i=n(28453);const a={sidebar_label:"End-to-end testing",sidebar_position:40,title:"End-to-end testing",description:"A tutorial introduction to end-to-end testing for writing Kubewarden policies in the Go language.",keywords:["kubewarden","kubernetes","writing policies","end-to-end testing","golang","go"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","golang","end-to-end-testing"],"doc-persona":["kubewarden-policy-developer"]},r=void 0,l={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Writing tests",id:"writing-tests",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components},{Head:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{children:(0,o.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/go/e2e-tests"})}),"\n",(0,o.jsx)(t.p,{children:"So far, you have tested the policy using a set of Go unit tests.\nThis section shows how you can write end-to-end tests running against the actual WebAssembly binary produced by TinyGo."}),"\n",(0,o.jsx)(t.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,o.jsx)(t.p,{children:"Recall, you need these tools on your development machine:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"Docker, or another container engine: Used to build the WebAssembly policy.\nYou'll use the compiler shipped within the official TinyGo container image."}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://github.com/bats-core/bats-core",children:"bats"}),":\nUsed to write the tests and automate their execution."]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://github.com/kubewarden/kwctl/releases",children:"kwctl"}),":\nCLI tool provided by Kubewarden to run its policies outside of Kubernetes, among other actions.\nIt's covered in ",(0,o.jsx)(t.a,{href:"/1.18/tutorials/testing-policies/",children:"this section"})," of the documentation."]}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"writing-tests",children:"Writing tests"}),"\n",(0,o.jsxs)(t.p,{children:["You'll be using\n",(0,o.jsx)(t.a,{href:"https://github.com/bats-core/bats-core",children:"bats"}),"\nto write and automate your tests.\nEach test has the following steps:"]}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["Run the policy using ",(0,o.jsx)(t.code,{children:"kwctl"}),"."]}),"\n",(0,o.jsxs)(t.li,{children:["Perform assertions against the output produced by the ",(0,o.jsx)(t.code,{children:"kwctl"}),"."]}),"\n"]}),"\n",(0,o.jsxs)(t.p,{children:["All the end-to-end tests go in a file called ",(0,o.jsx)(t.code,{children:"e2e.bats"}),".\nThe project scaffolding project already includes an example ",(0,o.jsx)(t.code,{children:"e2e.bats"}),".\nYou need to change its contents to reflect how your policy behaves.\nYou can remove the contents from the scaffolding file and replace them with the contents below as you work through this tutorial."]}),"\n",(0,o.jsx)(t.p,{children:"For the end-to-end tests, you use the same test fixtures files you used in the Go unit tests."}),"\n",(0,o.jsx)(t.p,{children:"The first test ensures request approval when there are no settings provided:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'@test "accept when no settings are provided" {\n  run kwctl run -r test_data/pod.json policy.wasm\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  # request is accepted\n  [ $(expr "$output" : \'.*"allowed":true.*\') -ne 0 ]\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"You execute the end-to-end tests by using this command:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-console",children:"make e2e-tests\n"})}),"\n",(0,o.jsx)(t.p,{children:"This produces the following output:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-console",children:"bats e2e.bats\n \u2713 accept when no settings are provided\n\n1 test, 0 failures\n"})}),"\n",(0,o.jsx)(t.p,{children:"You should write a test ensuring request approval when respecting a user-defined constraint:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'@test "accept because label is satisfying a constraint" {\n  run kwctl run annotated-policy.wasm \\\n    -r test_data/pod.json \\\n    --settings-json \'{"constrained_labels": {"cc-center": "\\\\d+"}}\'\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  [ "$status" -eq 0 ]\n  [ $(expr "$output" : \'.*allowed.*true\') -ne 0 ]\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"Next, you can write a test checking request acceptance when none of the labels is on the deny list:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'@test "accept labels are not on deny list" {\n  run kwctl run \\\n    -r test_data/pod.json \\\n    --settings-json \'{"denied_labels": ["foo", "bar"]}\' \\\n    policy.wasm\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  [ $(expr "$output" : \'.*"allowed":true.*\') -ne 0 ]\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"You can improve the test coverage by adding a test that rejects a request because one of the labels is on the deny list:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'@test "reject because label is on deny list" {\n  run kwctl run annotated-policy.wasm \\\n    -r test_data/pod.json \\\n    --settings-json \'{"denied_labels": ["foo", "owner"]}\'\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  [ "$status" -eq 0 ]\n  [ $(expr "$output" : \'.*allowed.*false\') -ne 0 ]\n  [ $(expr "$output" : ".*Label owner is on the deny list.*") -ne 0 ]\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"The following test ensures a request rejection when one of its labels doesn't\nsatisfy the constraint provided by the user."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'@test "reject because label is not satisfying a constraint" {\n  run kwctl run annotated-policy.wasm \\\n    -r test_data/pod.json \\\n    --settings-json \'{"constrained_labels": {"cc-center": "team-\\\\d+"}}\'\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  [ "$status" -eq 0 ]\n  [ $(expr "$output" : \'.*allowed.*false\') -ne 0 ]\n  [ $(expr "$output" : ".*The value of cc-center doesn\'t pass user-defined constraint.*") -ne 0 ]\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"Now you can make sure the validation fails if one of the constrained labels is\nnot found:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'@test "reject because constrained label is missing" {\n  run kwctl run annotated-policy.wasm \\\n    -r test_data/pod.json \\\n    --settings-json \'{"constrained_labels": {"organization": "\\\\d+"}}\'\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  [ "$status" -eq 0 ]\n  [ $(expr "$output" : \'.*allowed.*false\') -ne 0 ]\n  [ $(expr "$output" : ".*Constrained label organization not found inside of Pod.*") -ne 0 ]\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"You want to check settings validation is working correctly.\nYou can do this with the following tests:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'@test "fail settings validation because of conflicting labels" {\n  run kwctl run \\\n    -r test_data/pod.json \\\n    --settings-json \'{"denied_labels": ["foo", "cc-center"], "constrained_labels": {"cc-center": "^cc-\\\\d+$"}}\' \\\n    policy.wasm\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  # settings validation failed\n  [ $(expr "$output" : ".*Provided settings are not valid: These labels cannot be constrained and denied at the same time: Set{cc-center}.*") -ne 0 ]\n}\n\n@test "fail settings validation because of invalid constraint" {\n  run kwctl run \\\n    -r test_data/pod.json \\\n    --settings-json \'{"constrained_labels": {"cc-center": "^cc-[12$"}}\' \\\n    policy.wasm\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  # settings validation failed\n  [ $(expr "$output" : ".*Provided settings are not valid: error parsing regexp.*") -ne 0 ]\n}\n'})}),"\n",(0,o.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,o.jsx)(t.p,{children:"The eight end-to-end tests now give a good level of coverage, you can run them all:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"$ make e2e-tests\nbats e2e.bats\ne2e.bats\n \u2713 accept when no settings are provided\n \u2713 accept because label is satisfying a constraint\n \u2713 accept labels are not on deny list\n \u2713 reject because label is on deny list\n \u2713 reject because label is not satisfying a constraint\n \u2713 reject because constrained label is missing\n \u2713 fail settings validation because of conflicting labels\n \u2713 fail settings validation because of invalid constraint\n\n8 tests, 0 failures\n"})})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var s=n(96540);const o={},i=s.createContext(o);function a(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);