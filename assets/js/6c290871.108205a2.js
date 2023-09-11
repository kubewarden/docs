"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[2048],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>_});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=d(n),m=i,_=c["".concat(l,".").concat(m)]||c[m]||p[m]||o;return n?a.createElement(_,r(r({ref:t},u),{},{components:n})):a.createElement(_,r({ref:t},u))}));function _(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:i,r[1]=s;for(var d=2;d<o;d++)r[d]=n[d];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8998:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const o={sidebar_label:"Creating a new mutation policy",title:""},r="Creating a new mutation policy",s={unversionedId:"writing-policies/rust/mutation-policy",id:"writing-policies/rust/mutation-policy",title:"",description:"Mutating policies are similar to validating ones, but have also the ability to mutate an",source:"@site/docs/writing-policies/rust/05-mutation-policy.md",sourceDirName:"writing-policies/rust",slug:"/writing-policies/rust/mutation-policy",permalink:"/writing-policies/rust/mutation-policy",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/rust/05-mutation-policy.md",tags:[],version:"current",lastUpdatedAt:1694442853,formattedLastUpdatedAt:"Sep 11, 2023",sidebarPosition:5,frontMatter:{sidebar_label:"Creating a new mutation policy",title:""},sidebar:"docs",previous:{title:"Writing Validation Logic",permalink:"/writing-policies/rust/write-validation-logic"},next:{title:"Logging",permalink:"/writing-policies/rust/logging"}},l={},d=[{value:"Write the mutation code",id:"write-the-mutation-code",level:2},{value:"Update the unit tests",id:"update-the-unit-tests",level:2}],u={toc:d},c="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"creating-a-new-mutation-policy"},"Creating a new mutation policy"),(0,i.kt)("p",null,"Mutating policies are similar to validating ones, but have also the ability to mutate an\nincoming object."),(0,i.kt)("p",null,"They can:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Reject a request"),(0,i.kt)("li",{parentName:"ul"},"Accept a request without doing any change to the incoming object"),(0,i.kt)("li",{parentName:"ul"},"Mutate the incoming object as they like and accept the request")),(0,i.kt)("p",null,"Writing a Kubewarden mutation policies is extremely simple. We will use the validating\npolicy created inside of the previous steps and, with very few changes, turn it into a\nmutating one."),(0,i.kt)("p",null,"Our policy will use the same validation logic defined before, but it will also add\nan annotation to all the Pods that have a valid name."),(0,i.kt)("p",null,"Attempting to create a Pod like that:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n")),(0,i.kt)("p",null,"Will lead to the creation of this Pod:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\n  annotations:\n    kubewarden.policy.demo/inspected: true\nspec:\n  containers:\n    - name: nginx\n      image: nginx:latest\n")),(0,i.kt)("h2",{id:"write-the-mutation-code"},"Write the mutation code"),(0,i.kt)("p",null,"The mutation code is done inside of the ",(0,i.kt)("inlineCode",{parentName:"p"},"validate")," function. The function should be changed\nto approve the request via the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.mutate_request.html"},(0,i.kt)("inlineCode",{parentName:"a"},"mutate_request")),"\ninstead of the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.rs/kubewarden-policy-sdk/0.1.0/kubewarden_policy_sdk/fn.accept_request.html"},(0,i.kt)("inlineCode",{parentName:"a"},"accept_request")),"."),(0,i.kt)("p",null,"This is how the ",(0,i.kt)("inlineCode",{parentName:"p"},"validate")," function has to look like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-rust"},'fn validate(payload: &[u8]) -> CallResult {\n    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;\n\n    match serde_json::from_value::<apicore::Pod>(validation_request.request.object) {\n        // NOTE 1\n        Ok(mut pod) => {\n            let pod_name = pod.metadata.name.clone().unwrap_or_default();\n            if validation_request\n                .settings\n                .invalid_names\n                .contains(&pod_name)\n            {\n                kubewarden::reject_request(\n                    Some(format!("pod name {:?} is not accepted", pod_name)),\n                    None,\n                )\n            } else {\n                // NOTE 2\n                let mut new_annotations = pod.metadata.annotations.clone().unwrap_or_default();\n                new_annotations.insert(\n                    String::from("kubewarden.policy.demo/inspected"),\n                    String::from("true"),\n                );\n                pod.metadata.annotations = Some(new_annotations);\n\n                // NOTE 3\n                let mutated_object = serde_json::to_value(pod)?;\n                kubewarden::mutate_request(mutated_object)\n            }\n        }\n        Err(_) => {\n            // We were forwarded a request we cannot unmarshal or\n            // understand, just accept it\n            kubewarden::accept_request()\n        }\n    }\n}\n')),(0,i.kt)("p",null,"Compared to the previous code, we made only three changes:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"We defined the ",(0,i.kt)("inlineCode",{parentName:"li"},"pod")," object as mutable, see the ",(0,i.kt)("inlineCode",{parentName:"li"},"mut")," keyword. This is\nneeded because we will extend its ",(0,i.kt)("inlineCode",{parentName:"li"},"metadata.annotations")," attribute"),(0,i.kt)("li",{parentName:"ol"},"This is the actual code that takes the existing ",(0,i.kt)("inlineCode",{parentName:"li"},"annotations"),", adds the\nnew one, and finally puts the updated ",(0,i.kt)("inlineCode",{parentName:"li"},"annotations")," object back into the original\n",(0,i.kt)("inlineCode",{parentName:"li"},"pod")," instance"),(0,i.kt)("li",{parentName:"ol"},"Serialize the ",(0,i.kt)("inlineCode",{parentName:"li"},"pod")," object into a generic ",(0,i.kt)("inlineCode",{parentName:"li"},"serde_json::Value")," and then return\na mutation response")),(0,i.kt)("p",null,"Having done these changes, it's time to run the unit tests again:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ cargo test\n   Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 4.53s\n     Running target/debug/deps/demo-24670dd6a538fd72\n\nrunning 5 tests\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest tests::reject_pod_with_invalid_name ... ok\ntest tests::accept_pod_with_valid_name ... FAILED\ntest tests::accept_request_with_non_pod_resource ... ok\n\nfailures:\n\n---- tests::accept_pod_with_valid_name stdout ----\nthread 'tests::accept_pod_with_valid_name' panicked at 'Something mutated with test case: Pod creation with valid name', src/lib.rs:74:9\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n\n\nfailures:\n    tests::accept_pod_with_valid_name\n\ntest result: FAILED. 4 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n")),(0,i.kt)("p",null,"As you can see, the ",(0,i.kt)("inlineCode",{parentName:"p"},"accept_pod_with_valid_name")," fails because the response actually\ncontains a mutated object. It looks like our code is actually working!"),(0,i.kt)("h2",{id:"update-the-unit-tests"},"Update the unit tests"),(0,i.kt)("p",null,"Let's update the ",(0,i.kt)("inlineCode",{parentName:"p"},"accept_pod_with_valid_name")," to look like that:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-rust"},'#[test]\nfn accept_pod_with_valid_name() -> Result<(), ()> {\n    let mut invalid_names = HashSet::new();\n    invalid_names.insert(String::from("bad_name1"));\n    let settings = Settings { invalid_names };\n\n    let request_file = "test_data/pod_creation.json";\n    let tc = Testcase {\n        name: String::from("Pod creation with valid name"),\n        fixture_file: String::from(request_file),\n        expected_validation_result: true,\n        settings,\n    };\n\n    let res = tc.eval(validate).unwrap();\n    // NOTE 1\n    assert!(\n        res.mutated_object.is_some(),\n        "Expected accepted object to be mutated",\n    );\n\n    // NOTE 2\n    let final_pod =\n        serde_json::from_str::<apicore::Pod>(res.mutated_object.unwrap().as_str()).unwrap();\n    let final_annotations = final_pod.metadata.annotations.unwrap();\n    assert_eq!(\n        final_annotations.get_key_value("kubewarden.policy.demo/inspected"),\n        Some((\n            &String::from("kubewarden.policy.demo/inspected"),\n            &String::from("true")\n        )),\n    );\n\n    Ok(())\n}\n')),(0,i.kt)("p",null,"Compared to the initial test, we made only two changes:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Change the ",(0,i.kt)("inlineCode",{parentName:"li"},"assert!")," statement to ensure the request is still accepted,\nbut it also includes a mutated object"),(0,i.kt)("li",{parentName:"ol"},"Created a ",(0,i.kt)("inlineCode",{parentName:"li"},"Pod")," instance starting from the mutated object that is part of\nthe response. Assert the mutated Pod object contains the right\n",(0,i.kt)("inlineCode",{parentName:"li"},"metadata.annotations"),".")),(0,i.kt)("p",null,"We can run the tests again, this time all of them will pass:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ cargo test\n   Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 2.61s\n     Running target/debug/deps/demo-24670dd6a538fd72\n\nrunning 5 tests\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest tests::accept_request_with_non_pod_resource ... ok\ntest tests::reject_pod_with_invalid_name ... ok\ntest tests::accept_pod_with_valid_name ... ok\n\ntest result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n")),(0,i.kt)("p",null,"As you can see the creation of a mutation policy is pretty straightforward."))}p.isMDXComponent=!0}}]);