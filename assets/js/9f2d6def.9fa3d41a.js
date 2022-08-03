"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[2973],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return g}});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},s=Object.keys(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=i.createContext({}),u=function(e){var t=i.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return i.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),g=r,f=p["".concat(o,".").concat(g)]||p[g]||d[g]||s;return n?i.createElement(f,a(a({ref:t},c),{},{components:n})):i.createElement(f,a({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,a=new Array(s);a[0]=p;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var u=2;u<s;u++)a[u]=n[u];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3893:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return o},default:function(){return g},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return d}});var i=n(3117),r=n(102),s=(n(7294),n(3905)),a=["components"],l={sidebar_label:"Defining Policy Settings",title:""},o="Defining policy settings",u={unversionedId:"writing-policies/rust/define-policy-settings",id:"writing-policies/rust/define-policy-settings",title:"",description:"As a first step we will define the structure that holds the policy settings.",source:"@site/docs/writing-policies/rust/03-define-policy-settings.md",sourceDirName:"writing-policies/rust",slug:"/writing-policies/rust/define-policy-settings",permalink:"/writing-policies/rust/define-policy-settings",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/writing-policies/rust/03-define-policy-settings.md",tags:[],version:"current",lastUpdatedAt:1659523996,formattedLastUpdatedAt:"Aug 3, 2022",sidebarPosition:3,frontMatter:{sidebar_label:"Defining Policy Settings",title:""},sidebar:"docs",previous:{title:"Creating a new validation policy",permalink:"/writing-policies/rust/create-policy"},next:{title:"Writing Validation Logic",permalink:"/writing-policies/rust/write-validation-logic"}},c={},d=[{value:"Add unit tests",id:"add-unit-tests",level:2}],p={toc:d};function g(e){var t=e.components,n=(0,r.Z)(e,a);return(0,s.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"defining-policy-settings"},"Defining policy settings"),(0,s.kt)("p",null,"As a first step we will define the structure that holds the policy settings."),(0,s.kt)("p",null,"Open the ",(0,s.kt)("inlineCode",{parentName:"p"},"src/settings.rs")," file and change the definition of the ",(0,s.kt)("inlineCode",{parentName:"p"},"Settings"),"\nstruct to look like that:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},"use std::collections::HashSet;\n\n#[derive(Deserialize, Default, Debug, Serialize)]\n#[serde(default)]\npub(crate) struct Settings {\n    pub invalid_names: HashSet<String>,\n}\n")),(0,s.kt)("p",null,"This will automatically put the list of invalid names inside of\na Set collection."),(0,s.kt)("p",null,"Next we will write a settings validation function: we want to ensure\nthe policy is always run with at least one invalid name."),(0,s.kt)("p",null,"This can be done by changing the implementation of the ",(0,s.kt)("inlineCode",{parentName:"p"},"Validatable")," trait."),(0,s.kt)("p",null,"Change the scaffolded implementation defined inside of ",(0,s.kt)("inlineCode",{parentName:"p"},"src/settings.rs"),"\nto look like that:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'impl kubewarden::settings::Validatable for Settings {\n    fn validate(&self) -> Result<(), String> {\n        if self.invalid_names.is_empty() {\n            Err(String::from("No invalid name specified. Specify at least one invalid name to match"))\n        } else {\n            Ok(())\n        }\n    }\n}\n')),(0,s.kt)("h2",{id:"add-unit-tests"},"Add unit tests"),(0,s.kt)("p",null,"Now we can write a unit test to ensure the settings validation is actually working.\nThis can be done in the ",(0,s.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/stable/book/ch11-00-testing.html"},"usual Rust way"),"."),(0,s.kt)("p",null,"There are already some default tests at the bottom of the ",(0,s.kt)("inlineCode",{parentName:"p"},"src/settings.rs"),"\nfile. Replace the automatically generated code to look like that:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'#[cfg(test)]\nmod tests {\n    use super::*;\n\n    use kubewarden_policy_sdk::settings::Validatable;\n\n    #[test]\n    fn accept_settings_with_a_list_of_invalid_names() -> Result<(), ()> {\n        let mut invalid_names = HashSet::new();\n        invalid_names.insert(String::from("bad_name1"));\n        invalid_names.insert(String::from("bad_name2"));\n\n        let settings = Settings { invalid_names };\n\n        assert!(settings.validate().is_ok());\n        Ok(())\n    }\n\n    #[test]\n    fn reject_settings_without_a_list_of_invalid_names() -> Result<(), ()> {\n        let invalid_names = HashSet::<String>::new();\n        let settings = Settings { invalid_names };\n\n        assert!(settings.validate().is_err());\n        Ok(())\n    }\n}\n')),(0,s.kt)("p",null,"We can now run the unit tests by doing:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"cargo test\n")),(0,s.kt)("p",null,"This will produce an output similar to the following one:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"  Compiling demo v0.1.0 (/home/flavio/hacking/kubernetes/kubewarden/demo)\n    Finished test [unoptimized + debuginfo] target(s) in 4.19s\n     Running target/debug/deps/demo-24670dd6a538fd72\n\nrunning 2 tests\ntest settings::tests::accept_settings_with_a_list_of_invalid_names ... ok\ntest settings::tests::reject_settings_without_a_list_of_invalid_names ... ok\n\ntest result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s\n")))}g.isMDXComponent=!0}}]);