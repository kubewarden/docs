"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[14647],{25120:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"tutorials/writing-policies/rust/define-policy-settings","title":"Defining policy settings","description":"Defining policy settings for a Kubewarden policy developed using Rust","source":"@site/versioned_docs/version-1.14/tutorials/writing-policies/rust/03-define-policy-settings.md","sourceDirName":"tutorials/writing-policies/rust","slug":"/tutorials/writing-policies/rust/define-policy-settings","permalink":"/1.14/tutorials/writing-policies/rust/define-policy-settings","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.14/tutorials/writing-policies/rust/03-define-policy-settings.md","tags":[],"version":"1.14","lastUpdatedAt":1737637540000,"sidebarPosition":3,"frontMatter":{"sidebar_label":"Defining policy settings","title":"Defining policy settings","description":"Defining policy settings for a Kubewarden policy developed using Rust","keywords":["kubewarden","kubernetes","writing policies","policy settings","rust"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","policy-settings"],"doc-persona":["kubewarden-developer"]},"sidebar":"docs","previous":{"title":"Creating a policy","permalink":"/1.14/tutorials/writing-policies/rust/create-policy"},"next":{"title":"Writing validation logic","permalink":"/1.14/tutorials/writing-policies/rust/write-validation-logic"}}');var s=i(74848),o=i(28453);const r={sidebar_label:"Defining policy settings",title:"Defining policy settings",description:"Defining policy settings for a Kubewarden policy developed using Rust",keywords:["kubewarden","kubernetes","writing policies","policy settings","rust"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","rust","policy-settings"],"doc-persona":["kubewarden-developer"]},a=void 0,l={},d=[{value:"The policy settings structure",id:"the-policy-settings-structure",level:2},{value:"The settings validation function",id:"the-settings-validation-function",level:2},{value:"Add unit tests",id:"add-unit-tests",level:2}];function c(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components},{Head:i}=t;return i||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/rust/define-policy-settings"})}),"\n",(0,s.jsx)(t.h2,{id:"the-policy-settings-structure",children:"The policy settings structure"}),"\n",(0,s.jsx)(t.p,{children:"Firstly, define the structure that holds the policy settings."}),"\n",(0,s.jsxs)(t.p,{children:["Open the ",(0,s.jsx)(t.code,{children:"demo/src/settings.rs"})," file and change the definition of the ",(0,s.jsx)(t.code,{children:"Settings"}),"\n",(0,s.jsx)(t.code,{children:"struct"})," to look like:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:"pub(crate) struct Settings {\n    pub invalid_names: HashSet<String>,\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"This automatically puts the list of invalid names in a Set collection."}),"\n",(0,s.jsx)(t.h2,{id:"the-settings-validation-function",children:"The settings validation function"}),"\n",(0,s.jsx)(t.p,{children:"Next, write a settings validation function to make sure the policy is always run with at least one invalid name."}),"\n",(0,s.jsxs)(t.p,{children:["You do this by changing the implementation of the ",(0,s.jsx)(t.code,{children:"Validatable"})," trait."]}),"\n",(0,s.jsxs)(t.p,{children:["Change the scaffolding implementation defined in ",(0,s.jsx)(t.code,{children:"src/settings.rs"})," to look like:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:'impl kubewarden::settings::Validatable for Settings {\n    fn validate(&self) -> Result<(), String> {\n        if self.invalid_names.is_empty() {\n            Err(String::from("No invalid name specified. Specify at least one invalid name to match"))\n        } else {\n            Ok(())\n        }\n    }\n}\n'})}),"\n",(0,s.jsx)(t.h2,{id:"add-unit-tests",children:"Add unit tests"}),"\n",(0,s.jsxs)(t.p,{children:["Now you can write a unit test to make sure the settings validation is working.\nYou can do this in the ",(0,s.jsx)(t.a,{href:"https://doc.rust-lang.org/stable/book/ch11-00-testing.html",children:"usual Rust way"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["There are already a few default tests at the bottom of the ",(0,s.jsx)(t.code,{children:"src/settings.rs"}),"\nfile. Replace the automatically generated code to look like this:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:'#[cfg(test)]\nmod tests {\n    use super::*;\n\n    use kubewarden_policy_sdk::settings::Validatable;\n\n    #[test]\n    fn accept_settings_with_a_list_of_invalid_names() -> Result<(), ()> {\n        let mut invalid_names = HashSet::new();\n        invalid_names.insert(String::from("bad_name1"));\n        invalid_names.insert(String::from("bad_name2"));\n\n        let settings = Settings { invalid_names };\n\n        assert!(settings.validate().is_ok());\n        Ok(())\n    }\n\n    #[test]\n    fn reject_settings_without_a_list_of_invalid_names() -> Result<(), ()> {\n        let invalid_names = HashSet::<String>::new();\n        let settings = Settings { invalid_names };\n\n        assert!(settings.validate().is_err());\n        Ok(())\n    }\n}\n'})}),"\n",(0,s.jsx)(t.p,{children:"You can now run the unit tests by doing:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-console",children:"cargo test\n"})}),"\n",(0,s.jsx)(t.p,{children:"This produces an output similar to the following:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-console",children:"   Compiling demo v0.1.0 (/home/jhk/projects/suse/tmp/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 0.59s\n     Running unittests src/lib.rs (target/debug/deps/demo-bea8e11b21717093)\n\nrunning 5 tests\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\ntest tests::reject_pod_with_invalid_name ... ok\ntest tests::accept_request_with_non_pod_resource ... ok\ntest tests::accept_pod_with_valid_name ... ok\n\ntest result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n"})})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>r,x:()=>a});var n=i(96540);const s={},o=n.createContext(s);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);