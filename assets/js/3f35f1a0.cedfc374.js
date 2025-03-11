"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[58464],{44088:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"writing-policies/rust/raw-policies","title":"Raw policies","description":"Kubewarden support for raw policies using Rust.","source":"@site/versioned_docs/version-1.10/writing-policies/rust/08-raw-policies.md","sourceDirName":"writing-policies/rust","slug":"/writing-policies/rust/raw-policies","permalink":"/1.10/writing-policies/rust/raw-policies","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.10/writing-policies/rust/08-raw-policies.md","tags":[],"version":"1.10","lastUpdatedAt":1741689762000,"sidebarPosition":8,"frontMatter":{"sidebar_label":"Raw policies","title":"Raw policies","description":"Kubewarden support for raw policies using Rust.","keywords":["kubewarden","kubernetes","raw policies","rust"],"doc-persona":["kubewarden-developer","kubewarden-integrator"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rust","raw-policies"]},"sidebar":"docs","previous":{"title":"Building and distributing policies","permalink":"/1.10/writing-policies/rust/build-and-distribute"},"next":{"title":"Writing policies in Go","permalink":"/1.10/writing-policies/go/intro-go"}}');var s=n(74848),r=n(28453);const a={sidebar_label:"Raw policies",title:"Raw policies",description:"Kubewarden support for raw policies using Rust.",keywords:["kubewarden","kubernetes","raw policies","rust"],"doc-persona":["kubewarden-developer","kubewarden-integrator"],"doc-type":["tutorial"],"doc-topic":["writing-policies","rust","raw-policies"]},o="Writing raw policies",l={},c=[{value:"Examples",id:"examples",level:2},{value:"Validation",id:"validation",level:3},{value:"Mutation",id:"mutation",level:3}];function u(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"writing-raw-policies",children:"Writing raw policies"})}),"\n",(0,s.jsxs)(t.p,{children:["Raw policies are policies that can evaluate arbitrary JSON documents.\nFor more information about raw policies, please refer to the ",(0,s.jsx)(t.a,{href:"/1.10/howtos/raw-policies",children:"raw policies"})," page."]}),"\n",(0,s.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(t.p,{children:["The following examples should look familiar if you completed the ",(0,s.jsx)(t.a,{href:"/1.10/writing-policies/rust/mutation-policy",children:"validation"})," page of this tutorial."]}),"\n",(0,s.jsx)(t.admonition,{type:"note",children:(0,s.jsxs)(t.p,{children:["Remember to mark the policy as ",(0,s.jsx)(t.code,{children:"raw"})," by using the ",(0,s.jsx)(t.code,{children:"policyType"})," field in the ",(0,s.jsx)(t.code,{children:"metadata.yml"})," configuration.\nPlease refer to the ",(0,s.jsx)(t.a,{href:"/1.10/writing-policies/metadata",children:"metadata"})," specification for more information."]})}),"\n",(0,s.jsx)(t.h3,{id:"validation",children:"Validation"}),"\n",(0,s.jsx)(t.p,{children:"Let's write a policy that accepts a request in the following format:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "request": {\n    "user": "alice",\n    "action": "delete",\n    "resource": "products"\n  }\n}\n'})}),"\n",(0,s.jsx)(t.p,{children:"and validates that:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"user"})," is in the list of valid users"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"action"})," is in the list of valid actions"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"resource"})," is in the list of valid resources"]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["Start by scaffolding the policy by using the ",(0,s.jsx)(t.a,{href:"https://github.com/kubewarden/rust-policy-template",children:"rust policy template"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["First, we define the types that represent the payload of the request.\nWe will declare a custom ",(0,s.jsx)(t.code,{children:"RawValidationRequest"})," type that contains the ",(0,s.jsx)(t.code,{children:"Request"})," and the ",(0,s.jsx)(t.code,{children:"Settings"}),",\ninstead of using the ",(0,s.jsx)(t.code,{children:"ValidationRequest"})," type that is provided by the SDK:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:"/// RawValidationRequest represents the request that is sent to the validate function by the Policy Server.\n#[derive(Deserialize)]\npub(crate) struct RawValidationRequest {\n    pub(crate) request: Request,\n    pub(crate) settings: Settings,\n}\n\n#[derive(Serialize, Deserialize)]\n/// Request represents the payload of the request.\npub(crate) struct Request {\n    pub(crate) user: String,\n    pub(crate) resource: String,\n    pub(crate) action: String,\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Then we need to define the ",(0,s.jsx)(t.code,{children:"Settings"})," type and implement the ",(0,s.jsx)(t.code,{children:"Validatable"})," trait:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:'/// Settings represents the settings of the policy.\n#[derive(Serialize, Deserialize, Default, Debug)]\n#[serde(default, rename_all = "camelCase")]\npub(crate) struct Settings {\n    pub(crate) valid_users: Vec<String>,\n    pub(crate) valid_actions: Vec<String>,\n    pub(crate) valid_resources: Vec<String>,\n}\n\nimpl kubewarden::settings::Validatable for Settings {\n    fn validate(&self) -> Result<(), String> {\n        info!(LOG_DRAIN, "starting settings validation");\n\n        if self.valid_users.is_empty() {\n            return Err("validUsers cannot be empty".to_string());\n        }\n\n        if self.valid_actions.is_empty() {\n            return Err("validActions cannot be empty".to_string());\n        }\n\n        if self.valid_resources.is_empty() {\n            return Err("validResources cannot be empty".to_string());\n        }\n\n        Ok(())\n    }\n}\n'})}),"\n",(0,s.jsxs)(t.p,{children:["Finally, we define the ",(0,s.jsx)(t.code,{children:"validate"})," function:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:'fn validate(payload: &[u8]) -> CallResult {\n    let validation_request: RawValidationRequest =\n        if let Ok(validation_request) = serde_json::from_slice(payload) {\n            validation_request\n        } else {\n            return kubewarden::reject_request(\n                Some("cannot unmarshal request".to_string()),\n                None,\n                None,\n                None,\n            );\n        };\n\n    info!(LOG_DRAIN, "starting validation");\n\n    let request = validation_request.request;\n    let settings = validation_request.settings;\n\n    if settings.valid_users.contains(&request.user)\n        && settings.valid_actions.contains(&request.action)\n        && settings.valid_resources.contains(&request.resource)\n    {\n        info!(LOG_DRAIN, "accepting resource");\n        kubewarden::accept_request()\n    } else {\n        kubewarden::reject_request(\n            Some("this request is not accepted".to_string()),\n            None,\n            None,\n            None,\n        )\n    }\n}\n'})}),"\n",(0,s.jsx)(t.h3,{id:"mutation",children:"Mutation"}),"\n",(0,s.jsxs)(t.p,{children:["Let's modify the previous example to mutate the request instead of rejecting it.\nIn this case, the settings will contain the ",(0,s.jsx)(t.code,{children:"defaultUser"}),", ",(0,s.jsx)(t.code,{children:"defaultAction"})," and ",(0,s.jsx)(t.code,{children:"defaultRequest"})," that will be used to mutate the request if the user, the action or the resource is not valid."]}),"\n",(0,s.jsxs)(t.p,{children:["We need to update the ",(0,s.jsx)(t.code,{children:"Settings"})," type with the new fields:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:'/// Settings represents the settings of the policy.\n#[derive(Serialize, Deserialize, Default, Debug)]\n#[serde(default, rename_all = "camelCase")]\npub(crate) struct Settings {\n    pub(crate) valid_users: Vec<String>,\n    pub(crate) valid_actions: Vec<String>,\n    pub(crate) valid_resources: Vec<String>,\n    pub(crate) default_user: String,\n    pub(crate) default_action: String,\n    pub(crate) default_resource: String,\n}\n\nimpl kubewarden::settings::Validatable for Settings {\n    fn validate(&self) -> Result<(), String> {\n        info!(LOG_DRAIN, "starting settings validation");\n\n        if self.valid_users.is_empty() {\n            return Err("validUsers cannot be empty".to_string());\n        }\n\n        if self.valid_actions.is_empty() {\n            return Err("validActions cannot be empty".to_string());\n        }\n\n        if self.valid_resources.is_empty() {\n            return Err("validResources cannot be empty".to_string());\n        }\n\n        if self.default_user.is_empty() {\n            return Err("defaultUser cannot be empty".to_string());\n        }\n\n        if self.default_action.is_empty() {\n            return Err("defaultAction cannot be empty".to_string());\n        }\n\n        if self.default_resource.is_empty() {\n            return Err("defaultResource cannot be empty".to_string());\n        }\n\n        Ok(())\n    }\n}\n'})}),"\n",(0,s.jsxs)(t.p,{children:["and the ",(0,s.jsx)(t.code,{children:"validate"})," function to introduce the mutation:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-rust",children:'fn validate(payload: &[u8]) -> CallResult {\n    let validation_request: RawValidationRequest =\n        if let Ok(validation_request) = serde_json::from_slice(payload) {\n            validation_request\n        } else {\n            return kubewarden::reject_request(\n                Some("cannot unmarshal request".to_string()),\n                None,\n                None,\n                None,\n            );\n        };\n\n    info!(LOG_DRAIN, "starting validation");\n\n    let request = validation_request.request;\n    let settings = validation_request.settings;\n\n    if settings.valid_users.contains(&request.user)\n        && settings.valid_actions.contains(&request.action)\n        && settings.valid_resources.contains(&request.resource)\n    {\n        info!(LOG_DRAIN, "accepting request");\n        return kubewarden::accept_request();\n    }\n\n    info!(LOG_DRAIN, "mutating request");\n    let mut request = request;\n\n    if !settings.valid_users.contains(&request.user) {\n        request.user = settings.default_user;\n    }\n\n    if !settings.valid_actions.contains(&request.action) {\n        request.action = settings.default_action;\n    }\n\n    if !settings.valid_resources.contains(&request.resource) {\n        request.resource = settings.default_resource;\n    }\n\n    let mutated_request = serde_json::to_value(request)?;\n    kubewarden::mutate_request(mutated_request)\n}\n'})})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>o});var i=n(96540);const s={},r=i.createContext(s);function a(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);