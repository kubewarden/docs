"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[96019],{69389:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"tutorials/writing-policies/rust/mutation-policy","title":"Creating a new mutation policy","description":"Creating a new mutation policy using Rust","source":"@site/versioned_docs/version-1.20/tutorials/writing-policies/rust/05-mutation-policy.md","sourceDirName":"tutorials/writing-policies/rust","slug":"/tutorials/writing-policies/rust/mutation-policy","permalink":"/1.20/tutorials/writing-policies/rust/mutation-policy","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.20/tutorials/writing-policies/rust/05-mutation-policy.md","tags":[],"version":"1.20","lastUpdatedAt":1741088150000,"sidebarPosition":5,"frontMatter":{"sidebar_label":"Creating a new mutation policy","title":"Creating a new mutation policy","description":"Creating a new mutation policy using Rust","keywords":["kubewarden","kubernetes","creating a new mutation policy","mutation policy","rust"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","new-mutation-policy"],"doc-persona":["kubewarden-policy-developer"]},"sidebar":"docs","previous":{"title":"Writing validation logic","permalink":"/1.20/tutorials/writing-policies/rust/write-validation-logic"},"next":{"title":"Logging","permalink":"/1.20/tutorials/writing-policies/rust/logging"}}');var s=n(74848),a=n(28453);const o={sidebar_label:"Creating a new mutation policy",title:"Creating a new mutation policy",description:"Creating a new mutation policy using Rust",keywords:["kubewarden","kubernetes","creating a new mutation policy","mutation policy","rust"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","new-mutation-policy"],"doc-persona":["kubewarden-policy-developer"]},r=void 0,d={},c=[{value:"Write the mutation code",id:"write-the-mutation-code",level:2},{value:"Update the unit tests",id:"update-the-unit-tests",level:2}];function l(e){const t={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components},{Head:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rust/mutation-policy"})}),"\n",(0,s.jsx)(t.p,{children:"Mutating policies are similar to validating ones,\nbut also have the ability to mutate an incoming object."}),"\n",(0,s.jsx)(t.p,{children:"They can:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Reject a request"}),"\n",(0,s.jsx)(t.li,{children:"Accept a request without changing the incoming object"}),"\n",(0,s.jsx)(t.li,{children:"Mutate the incoming object as they need to and accept the request"}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Writing a Kubewarden mutation policy is uncomplicated.\nYou'll use the validating policy created in the previous sections,\nand with a few changes,\nturn it into a mutating one."}),"\n",(0,s.jsx)(t.p,{children:"Your policy uses the same validation logic defined before,\nbut it also adds an annotation to all the Pods that have a valid name."}),"\n",(0,s.jsx)(t.p,{children:"Attempting to create a Pod like this:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n"})}),"\n",(0,s.jsx)(t.p,{children:"Leads to the creation of this Pod:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\n  annotations:\n    kubewarden.policy.demo/inspected: true\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n"})}),"\n",(0,s.jsx)(t.h2,{id:"write-the-mutation-code",children:"Write the mutation code"}),"\n",(0,s.jsxs)(t.p,{children:["The mutation code is in the ",(0,s.jsx)(t.code,{children:"validate"})," function.\nYou should change this function to approve the request using\n",(0,s.jsx)(t.a,{href:"https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.mutate_request.html",children:(0,s.jsx)(t.code,{children:"mutate_request"})}),"\ninstead of\n",(0,s.jsx)(t.a,{href:"https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.accept_request.html",children:(0,s.jsx)(t.code,{children:"accept_request"})}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["This is how the ",(0,s.jsx)(t.code,{children:"validate"})," function in ",(0,s.jsx)(t.code,{children:"lib.rs"})," should look:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",metastring:"showLineNumbers",children:'fn validate(payload: &[u8]) -> CallResult {\n    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;\n\n    info!(LOG_DRAIN, "starting validation");\n    if validation_request.request.kind.kind != apicore::Pod::KIND {\n        warn!(LOG_DRAIN, "Policy validates Pods only. Accepting resource"; "kind" => &validation_request.request.kind.kind);\n        return kubewarden::accept_request();\n    }\n\n    match serde_json::from_value::<apicore::Pod>(validation_request.request.object) {\n        // NOTE 1\n        Ok(mut pod) => {\n            let pod_name = pod.metadata.name.clone().unwrap_or_default();\n            if validation_request\n                .settings\n                .invalid_names\n                .contains(&pod_name)\n            {\n                kubewarden::reject_request(\n                    Some(format!("pod name {:?} is not accepted", pod_name)),\n                    None,\n                    None,\n                    None,\n                )\n            } else {\n                // NOTE 2\n                let mut new_annotations = pod.metadata.annotations.clone().unwrap_or_default();\n                new_annotations.insert(\n                    String::from("kubewarden.policy.demo/inspected"),\n                    String::from("true"),\n                );\n                pod.metadata.annotations = Some(new_annotations);\n\n                // NOTE 3\n                let mutated_object = serde_json::to_value(pod)?;\n                kubewarden::mutate_request(mutated_object)\n            }\n        }\n        Err(_) => {\n            // We were forwarded a request we cannot unmarshal or\n            // understand, just accept it\n            kubewarden::accept_request()\n        }\n    }\n}\n'})}),"\n",(0,s.jsx)(t.p,{children:"Compared to the previous code, you have made three changes:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["We defined the ",(0,s.jsx)(t.code,{children:"pod"})," object as mutable, see the ",(0,s.jsx)(t.code,{children:"mut"})," keyword. This is needed because we will extend its ",(0,s.jsx)(t.code,{children:"metadata.annotations"})," attribute. "]}),"\n",(0,s.jsxs)(t.li,{children:["This is the code that takes the existing ",(0,s.jsx)(t.code,{children:"annotations"}),",\nadds the new one, and finally puts the updated ",(0,s.jsx)(t.code,{children:"annotations"})," object back into the original ",(0,s.jsx)(t.code,{children:"pod"})," instance."]}),"\n",(0,s.jsxs)(t.li,{children:["Serialize the ",(0,s.jsx)(t.code,{children:"pod"})," object into a generic ",(0,s.jsx)(t.code,{children:"serde_json::Value"})," and then return a mutation response."]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Having done these changes, it's time to run unit tests again:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-console",children:'$ cargo test\n   Compiling demo-a v0.1.0 (/home/jhk/projects/suse/tmp/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 0.95s\n     Running unittests src/lib.rs (target/debug/deps/demo_a-634b88b0dcb6e707)\n\nrunning 5 tests\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest tests::accept_request_with_non_pod_resource ... ok\ntest tests::reject_pod_with_invalid_name ... ok\ntest tests::accept_pod_with_valid_name ... FAILED\n\nfailures:\n\n---- tests::accept_pod_with_valid_name stdout ----\n{"column":5,"file":"src/lib.rs","level":"info","line":34,"message":"starting validation","policy":"sample-policy"}\nthread \'tests::accept_pod_with_valid_name\' panicked at src/lib.rs:98:9:\nSomething mutated with test case: Pod creation with valid name\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::accept_pod_with_valid_name\n\ntest result: FAILED. 4 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n'})}),"\n",(0,s.jsxs)(t.p,{children:["As you can see, the ",(0,s.jsx)(t.code,{children:"accept_pod_with_valid_name"})," fails because the response contains a mutated object.\nIt looks like our code is working."]}),"\n",(0,s.jsx)(t.h2,{id:"update-the-unit-tests",children:"Update the unit tests"}),"\n",(0,s.jsxs)(t.p,{children:["You can update the ",(0,s.jsx)(t.code,{children:"accept_pod_with_valid_name"})," in ",(0,s.jsx)(t.code,{children:"lib.rs"})," to look like this:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:'#[test]\nfn accept_pod_with_valid_name() -> Result<(), ()> {\n    let mut invalid_names = HashSet::new();\n    invalid_names.insert(String::from("bad_name1"));\n    let settings = Settings { invalid_names };\n\n    let request_file = "test_data/pod_creation.json";\n    let tc = Testcase {\n        name: String::from("Pod creation with valid name"),\n        fixture_file: String::from(request_file),\n        expected_validation_result: true,\n        settings,\n    };\n\n    let res = tc.eval(validate).unwrap();\n    // NOTE 1\n    assert!(\n        res.mutated_object.is_some(),\n        "Expected accepted object to be mutated",\n    );\n\n    // NOTE 2\n    let final_pod =\n        serde_json::from_value::<apicore::Pod>(res.mutated_object.unwrap()).unwrap();\n    let final_annotations = final_pod.metadata.annotations.unwrap();\n    assert_eq!(\n        final_annotations.get_key_value("kubewarden.policy.demo/inspected"),\n        Some((\n            &String::from("kubewarden.policy.demo/inspected"),\n            &String::from("true")\n        )),\n    );\n\n    Ok(())\n}\n'})}),"\n",(0,s.jsx)(t.p,{children:"Compared to the first test, there are two changes:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["Change the ",(0,s.jsx)(t.code,{children:"assert!"})," statement so that the request is still accepted, but it also includes a mutated object"]}),"\n",(0,s.jsxs)(t.li,{children:["Created a ",(0,s.jsx)(t.code,{children:"Pod"})," instance starting from the mutated object that's part of the response.\nAssert the mutated Pod object has the right ",(0,s.jsx)(t.code,{children:"metadata.annotations"}),"."]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Run the tests again, this time all shall pass:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"$ cargo test\n   Compiling demo-a v0.1.0 (/home/jhk/projects/suse/tmp/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 1.25s\n     Running unittests src/lib.rs (target/debug/deps/demo_a-634b88b0dcb6e707)\n\nrunning 5 tests\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\ntest tests::accept_request_with_non_pod_resource ... ok\ntest tests::reject_pod_with_invalid_name ... ok\ntest tests::accept_pod_with_valid_name ... ok\n\ntest result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n"})}),"\n",(0,s.jsx)(t.p,{children:"As you can see, the creation of a mutation policy is straightforward."})]})}function u(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var i=n(96540);const s={},a=i.createContext(s);function o(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);