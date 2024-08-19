"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[73927],{33918:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>d});var i=n(85893),s=n(11151);const a={sidebar_label:"Defining Policy Settings",title:""},l="Defining policy settings",r={id:"writing-policies/rust/define-policy-settings",title:"",description:"As a first step we will define the structure that holds the policy settings.",source:"@site/versioned_docs/version-1.9/writing-policies/rust/03-define-policy-settings.md",sourceDirName:"writing-policies/rust",slug:"/writing-policies/rust/define-policy-settings",permalink:"/1.9/writing-policies/rust/define-policy-settings",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.9/writing-policies/rust/03-define-policy-settings.md",tags:[],version:"1.9",lastUpdatedAt:1724077046e3,sidebarPosition:3,frontMatter:{sidebar_label:"Defining Policy Settings",title:""},sidebar:"docs",previous:{title:"Creating a new validation policy",permalink:"/1.9/writing-policies/rust/create-policy"},next:{title:"Writing Validation Logic",permalink:"/1.9/writing-policies/rust/write-validation-logic"}},o={},d=[{value:"Add unit tests",id:"add-unit-tests",level:2}];function c(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"defining-policy-settings",children:"Defining policy settings"})}),"\n",(0,i.jsx)(t.p,{children:"As a first step we will define the structure that holds the policy settings."}),"\n",(0,i.jsxs)(t.p,{children:["Open the ",(0,i.jsx)(t.code,{children:"src/settings.rs"})," file and change the definition of the ",(0,i.jsx)(t.code,{children:"Settings"}),"\nstruct to look like that:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-rust",children:"use std::collections::HashSet;\n\n#[derive(Deserialize, Default, Debug, Serialize)]\n#[serde(default)]\npub(crate) struct Settings {\n    pub invalid_names: HashSet<String>,\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"This will automatically put the list of invalid names inside of\na Set collection."}),"\n",(0,i.jsx)(t.p,{children:"Next we will write a settings validation function: we want to ensure\nthe policy is always run with at least one invalid name."}),"\n",(0,i.jsxs)(t.p,{children:["This can be done by changing the implementation of the ",(0,i.jsx)(t.code,{children:"Validatable"})," trait."]}),"\n",(0,i.jsxs)(t.p,{children:["Change the scaffolded implementation defined inside of ",(0,i.jsx)(t.code,{children:"src/settings.rs"}),"\nto look like that:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-rust",children:'impl kubewarden::settings::Validatable for Settings {\n    fn validate(&self) -> Result<(), String> {\n        if self.invalid_names.is_empty() {\n            Err(String::from("No invalid name specified. Specify at least one invalid name to match"))\n        } else {\n            Ok(())\n        }\n    }\n}\n'})}),"\n",(0,i.jsx)(t.h2,{id:"add-unit-tests",children:"Add unit tests"}),"\n",(0,i.jsxs)(t.p,{children:["Now we can write a unit test to ensure the settings validation is actually working.\nThis can be done in the ",(0,i.jsx)(t.a,{href:"https://doc.rust-lang.org/stable/book/ch11-00-testing.html",children:"usual Rust way"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["There are already some default tests at the bottom of the ",(0,i.jsx)(t.code,{children:"src/settings.rs"}),"\nfile. Replace the automatically generated code to look like that:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-rust",children:'#[cfg(test)]\nmod tests {\n    use super::*;\n\n    use kubewarden_policy_sdk::settings::Validatable;\n\n    #[test]\n    fn accept_settings_with_a_list_of_invalid_names() -> Result<(), ()> {\n        let mut invalid_names = HashSet::new();\n        invalid_names.insert(String::from("bad_name1"));\n        invalid_names.insert(String::from("bad_name2"));\n\n        let settings = Settings { invalid_names };\n\n        assert!(settings.validate().is_ok());\n        Ok(())\n    }\n\n    #[test]\n    fn reject_settings_without_a_list_of_invalid_names() -> Result<(), ()> {\n        let invalid_names = HashSet::<String>::new();\n        let settings = Settings { invalid_names };\n\n        assert!(settings.validate().is_err());\n        Ok(())\n    }\n}\n'})}),"\n",(0,i.jsx)(t.p,{children:"We can now run the unit tests by doing:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-shell",children:"cargo test\n"})}),"\n",(0,i.jsx)(t.p,{children:"This will produce an output similar to the following one:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-shell",children:"  Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 4.19s\n     Running target/debug/deps/demo-24670dd6a538fd72\n\nrunning 2 tests\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n"})})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>r,a:()=>l});var i=n(67294);const s={},a=i.createContext(s);function l(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);