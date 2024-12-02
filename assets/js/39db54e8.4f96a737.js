"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[30617],{10203:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>d,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"writing-policies/rust/mutation-policy","title":"","description":"Mutating policies are similar to validating ones, but have also the ability to mutate an","source":"@site/versioned_docs/version-1.9/writing-policies/rust/05-mutation-policy.md","sourceDirName":"writing-policies/rust","slug":"/writing-policies/rust/mutation-policy","permalink":"/1.9/writing-policies/rust/mutation-policy","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.9/writing-policies/rust/05-mutation-policy.md","tags":[],"version":"1.9","lastUpdatedAt":1733126327000,"sidebarPosition":5,"frontMatter":{"sidebar_label":"Creating a new mutation policy","title":""},"sidebar":"docs","previous":{"title":"Writing Validation Logic","permalink":"/1.9/writing-policies/rust/write-validation-logic"},"next":{"title":"Logging","permalink":"/1.9/writing-policies/rust/logging"}}');var a=n(74848),s=n(28453);const o={sidebar_label:"Creating a new mutation policy",title:""},d="Creating a new mutation policy",r={},l=[{value:"Write the mutation code",id:"write-the-mutation-code",level:2},{value:"Update the unit tests",id:"update-the-unit-tests",level:2}];function c(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"creating-a-new-mutation-policy",children:"Creating a new mutation policy"})}),"\n",(0,a.jsx)(t.p,{children:"Mutating policies are similar to validating ones, but have also the ability to mutate an\nincoming object."}),"\n",(0,a.jsx)(t.p,{children:"They can:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Reject a request"}),"\n",(0,a.jsx)(t.li,{children:"Accept a request without doing any change to the incoming object"}),"\n",(0,a.jsx)(t.li,{children:"Mutate the incoming object as they like and accept the request"}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"Writing a Kubewarden mutation policies is extremely simple. We will use the validating\npolicy created inside of the previous steps and, with very few changes, turn it into a\nmutating one."}),"\n",(0,a.jsx)(t.p,{children:"Our policy will use the same validation logic defined before, but it will also add\nan annotation to all the Pods that have a valid name."}),"\n",(0,a.jsx)(t.p,{children:"Attempting to create a Pod like that:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n"})}),"\n",(0,a.jsx)(t.p,{children:"Will lead to the creation of this Pod:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-yaml",children:"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\n  annotations:\n    kubewarden.policy.demo/inspected: true\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n"})}),"\n",(0,a.jsx)(t.h2,{id:"write-the-mutation-code",children:"Write the mutation code"}),"\n",(0,a.jsxs)(t.p,{children:["The mutation code is done inside of the ",(0,a.jsx)(t.code,{children:"validate"})," function. The function should be changed\nto approve the request via the ",(0,a.jsx)(t.a,{href:"https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.mutate_request.html",children:(0,a.jsx)(t.code,{children:"mutate_request"})}),"\ninstead of the ",(0,a.jsx)(t.a,{href:"https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.accept_request.html",children:(0,a.jsx)(t.code,{children:"accept_request"})}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["This is how the ",(0,a.jsx)(t.code,{children:"validate"})," function has to look like:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-rust",children:'fn validate(payload: &[u8]) -> CallResult {\n    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;\n\n    match serde_json::from_value::<apicore::Pod>(validation_request.request.object) {\n        // NOTE 1\n        Ok(mut pod) => {\n            let pod_name = pod.metadata.name.clone().unwrap_or_default();\n            if validation_request\n                .settings\n                .invalid_names\n                .contains(&pod_name)\n            {\n                kubewarden::reject_request(\n                    Some(format!("pod name {:?} is not accepted", pod_name)),\n                    None,\n                )\n            } else {\n                // NOTE 2\n                let mut new_annotations = pod.metadata.annotations.clone().unwrap_or_default();\n                new_annotations.insert(\n                    String::from("kubewarden.policy.demo/inspected"),\n                    String::from("true"),\n                );\n                pod.metadata.annotations = Some(new_annotations);\n\n                // NOTE 3\n                let mutated_object = serde_json::to_value(pod)?;\n                kubewarden::mutate_request(mutated_object)\n            }\n        }\n        Err(_) => {\n            // We were forwarded a request we cannot unmarshal or\n            // understand, just accept it\n            kubewarden::accept_request()\n        }\n    }\n}\n'})}),"\n",(0,a.jsx)(t.p,{children:"Compared to the previous code, we made only three changes:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["We defined the ",(0,a.jsx)(t.code,{children:"pod"})," object as mutable, see the ",(0,a.jsx)(t.code,{children:"mut"})," keyword. This is\nneeded because we will extend its ",(0,a.jsx)(t.code,{children:"metadata.annotations"})," attribute"]}),"\n",(0,a.jsxs)(t.li,{children:["This is the actual code that takes the existing ",(0,a.jsx)(t.code,{children:"annotations"}),", adds the\nnew one, and finally puts the updated ",(0,a.jsx)(t.code,{children:"annotations"})," object back into the original\n",(0,a.jsx)(t.code,{children:"pod"})," instance"]}),"\n",(0,a.jsxs)(t.li,{children:["Serialize the ",(0,a.jsx)(t.code,{children:"pod"})," object into a generic ",(0,a.jsx)(t.code,{children:"serde_json::Value"})," and then return\na mutation response"]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"Having done these changes, it's time to run the unit tests again:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ cargo test\n   Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 4.53s\n     Running target/debug/deps/demo-24670dd6a538fd72\n\nrunning 5 tests\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest tests::reject_pod_with_invalid_name ... ok\ntest tests::accept_pod_with_valid_name ... FAILED\ntest tests::accept_request_with_non_pod_resource ... ok\n\nfailures:\n\n---- tests::accept_pod_with_valid_name stdout ----\nthread 'tests::accept_pod_with_valid_name' panicked at 'Something mutated with test case: Pod creation with valid name', src/lib.rs:74:9\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::accept_pod_with_valid_name\n\ntest result: FAILED. 4 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n"})}),"\n",(0,a.jsxs)(t.p,{children:["As you can see, the ",(0,a.jsx)(t.code,{children:"accept_pod_with_valid_name"})," fails because the response actually\ncontains a mutated object. It looks like our code is actually working!"]}),"\n",(0,a.jsx)(t.h2,{id:"update-the-unit-tests",children:"Update the unit tests"}),"\n",(0,a.jsxs)(t.p,{children:["Let's update the ",(0,a.jsx)(t.code,{children:"accept_pod_with_valid_name"})," to look like that:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-rust",children:'#[test]\nfn accept_pod_with_valid_name() -> Result<(), ()> {\n    let mut invalid_names = HashSet::new();\n    invalid_names.insert(String::from("bad_name1"));\n    let settings = Settings { invalid_names };\n\n    let request_file = "test_data/pod_creation.json";\n    let tc = Testcase {\n        name: String::from("Pod creation with valid name"),\n        fixture_file: String::from(request_file),\n        expected_validation_result: true,\n        settings,\n    };\n\n    let res = tc.eval(validate).unwrap();\n    // NOTE 1\n    assert!(\n        res.mutated_object.is_some(),\n        "Expected accepted object to be mutated",\n    );\n\n    // NOTE 2\n    let final_pod =\n        serde_json::from_str::<apicore::Pod>(res.mutated_object.unwrap().as_str()).unwrap();\n    let final_annotations = final_pod.metadata.annotations.unwrap();\n    assert_eq!(\n        final_annotations.get_key_value("kubewarden.policy.demo/inspected"),\n        Some((\n            &String::from("kubewarden.policy.demo/inspected"),\n            &String::from("true")\n        )),\n    );\n\n    Ok(())\n}\n'})}),"\n",(0,a.jsx)(t.p,{children:"Compared to the initial test, we made only two changes:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["Change the ",(0,a.jsx)(t.code,{children:"assert!"})," statement to ensure the request is still accepted,\nbut it also includes a mutated object"]}),"\n",(0,a.jsxs)(t.li,{children:["Created a ",(0,a.jsx)(t.code,{children:"Pod"})," instance starting from the mutated object that is part of\nthe response. Assert the mutated Pod object contains the right\n",(0,a.jsx)(t.code,{children:"metadata.annotations"}),"."]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:"We can run the tests again, this time all of them will pass:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ cargo test\n   Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 2.61s\n     Running target/debug/deps/demo-24670dd6a538fd72\n\nrunning 5 tests\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest tests::accept_request_with_non_pod_resource ... ok\ntest tests::reject_pod_with_invalid_name ... ok\ntest tests::accept_pod_with_valid_name ... ok\n\ntest result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n"})}),"\n",(0,a.jsx)(t.p,{children:"As you can see the creation of a mutation policy is pretty straightforward."})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>d});var i=n(96540);const a={},s=i.createContext(a);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);