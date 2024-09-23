"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[37262],{31025:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=t(85893),s=t(11151);const r={sidebar_label:"Raw policies",sidebar_position:100,title:"Writing raw policies",description:"Writing raw Kubewarden policies using Go.",keywords:["kubewarden","kubernetes","writing policies","raw","go"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","golang","raw-policies"],"doc-persona":["kubewarden-developer"]},a=void 0,o={id:"tutorials/writing-policies/go/raw-policies",title:"Writing raw policies",description:"Writing raw Kubewarden policies using Go.",source:"@site/versioned_docs/version-1.12/tutorials/writing-policies/go/10-raw-policies.md",sourceDirName:"tutorials/writing-policies/go",slug:"/tutorials/writing-policies/go/raw-policies",permalink:"/1.12/tutorials/writing-policies/go/raw-policies",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.12/tutorials/writing-policies/go/10-raw-policies.md",tags:[],version:"1.12",lastUpdatedAt:1727095216e3,sidebarPosition:100,frontMatter:{sidebar_label:"Raw policies",sidebar_position:100,title:"Writing raw policies",description:"Writing raw Kubewarden policies using Go.",keywords:["kubewarden","kubernetes","writing policies","raw","go"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","golang","raw-policies"],"doc-persona":["kubewarden-developer"]},sidebar:"docs",previous:{title:"Validation using JSON queries",permalink:"/1.12/tutorials/writing-policies/go/validation-with-queries"},next:{title:"Rego",permalink:"/1.12/tutorials/writing-policies/rego/intro-rego"}},l={},c=[{value:"Examples",id:"examples",level:2},{value:"Validation",id:"validation",level:3},{value:"Mutation",id:"mutation",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components},{Details:t,Head:r}=n;return t||h("Details",!0),r||h("Head",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r,{children:(0,i.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/go/raw-policies"})}),"\n",(0,i.jsxs)(n.p,{children:["Raw policies are policies that can evaluate arbitrary JSON documents.\nFor more information about raw policies, please refer to the ",(0,i.jsx)(n.a,{href:"/1.12/howtos/raw-policies",children:"raw policies"})," page."]}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,i.jsxs)(n.p,{children:["The following examples should look familiar if you completed the ",(0,i.jsx)(n.a,{href:"/1.12/tutorials/writing-policies/go/validation",children:"validation"})," section of this tutorial."]}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsxs)(n.p,{children:["Remember to mark the policy as ",(0,i.jsx)(n.code,{children:"raw"})," by using the ",(0,i.jsx)(n.code,{children:"policyType"})," field in the ",(0,i.jsx)(n.code,{children:"metadata.yml"})," configuration.\nPlease refer to the ",(0,i.jsx)(n.a,{href:"/1.12/tutorials/writing-policies/metadata",children:"metadata"})," specification for more information."]}),(0,i.jsxs)(t,{children:[(0,i.jsxs)("summary",{children:[(0,i.jsx)(n.code,{children:"metadata.yml"})," with ",(0,i.jsx)(n.code,{children:"policyType: raw"})]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-console",children:'rules:\n- apiGroups: [""]\n  apiVersions: ["v1"]\n  resources: ["pods"]\n  operations: ["CREATE"]\nmutating: false\ncontextAware: false\nexecutionMode: kubewarden-wapc\n// highlight-next-line\npolicyType: raw\n# Consider the policy for the background audit scans. Default is true. Note the\n# intrinsic limitations of the background audit feature on docs.kubewarden.io;\n# If your policy hits any limitations, set to false for the audit feature to\n# skip this policy and not generate false positives.\nbackgroundAudit: true\nannotations:\n  # artifacthub specific:\n  io.artifacthub.displayName: Policy Name\n  io.artifacthub.resources: Pod\n  io.artifacthub.keywords: pod, cool policy, kubewarden\n  io.kubewarden.policy.ociUrl: ghcr.io/yourorg/policies/policy-name # must match release workflow oci-target\n  # kubewarden specific:\n  io.kubewarden.policy.title: policy-name\n  io.kubewarden.policy.description: Short description\n  io.kubewarden.policy.author: "Author name <author-email@example.com>"\n  io.kubewarden.policy.url: https://github.com/yourorg/policy-name\n  io.kubewarden.policy.source: https://github.com/yourorg/policy-name\n  io.kubewarden.policy.license: Apache-2.0\n  # The next two annotations are used in the policy report generated by the\n  # Audit scanner. Severity indicates policy check result criticality and\n  # Category indicates policy category. See more here at docs.kubewarden.io\n  io.kubewarden.policy.severity: medium # one of info, low, medium, high, critical. See docs.\n  io.kubewarden.policy.category: Resource validation\n'})})]})]}),"\n",(0,i.jsx)(n.h3,{id:"validation",children:"Validation"}),"\n",(0,i.jsx)(n.p,{children:"You want to write a policy that accepts a request in the following format:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "request": {\n    "user": "alice",\n    "action": "delete",\n    "resource": "products"\n  }\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"and validates that:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"user"})," is in the list of valid users"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"action"})," is in the list of valid actions"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"resource"})," is in the list of valid resources"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Start by scaffolding the policy by using the\n",(0,i.jsx)(n.a,{href:"https://github.com/kubewarden/go-policy-template",children:"go policy template"}),".\nMake sure everything is in place with a ",(0,i.jsx)(n.code,{children:"make"}),", ",(0,i.jsx)(n.code,{children:"make test"})," and ",(0,i.jsx)(n.code,{children:"make e2e-tests"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Firstly, define the types representing the payload of the request."}),"\n",(0,i.jsxs)(n.p,{children:["You need to declare a custom ",(0,i.jsx)(n.code,{children:"RawValidationRequest"})," type (create a file ",(0,i.jsx)(n.code,{children:"request.go"}),"),\ncontaining the ",(0,i.jsx)(n.code,{children:"RawValidationRequest"})," and the ",(0,i.jsx)(n.code,{children:"Settings"})," structures,\ninstead of using the ",(0,i.jsx)(n.code,{children:"ValidationRequest"})," type provided by the SDK:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'// RawValidationRequest represents the request that is sent to the validate function by the Policy Server.\ntype RawValidationRequest struct {\n    Request Request `json:"request"`\n    // Raw policies can have settings.\n    Settings Settings `json:"settings"`\n}\n\n// Request represents the payload of the request.\ntype Request struct {\n    User     string `json:"user"`\n    Action   string `json:"action"`\n    Resource string `json:"resource"`\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Then you need to define the ",(0,i.jsx)(n.code,{children:"Settings"})," type and the ",(0,i.jsx)(n.code,{children:"Valid"})," and ",(0,i.jsx)(n.code,{children:"validateSettings"})," functions in ",(0,i.jsx)(n.code,{children:"settings.go"}),":"]}),"\n",(0,i.jsxs)(t,{children:[(0,i.jsxs)("summary",{children:["The ",(0,i.jsx)(n.code,{children:"Settings"})," structure and the ",(0,i.jsx)(n.code,{children:"Valid"})," and ",(0,i.jsx)(n.code,{children:"validateSettings"})," functions in ",(0,i.jsx)(n.code,{children:"settings.go"}),"."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'// Settings represents the settings of the policy.\ntype Settings struct {\n\tValidUsers     []string `json:"validUsers"`\n\tValidActions   []string `json:"validActions"`\n\tValidResources []string `json:"validResources"`\n}\n\n// Valid returns true if the settings are valid.\nfunc (s *Settings) Valid() (bool, error) {\n    if len(s.ValidUsers) == 0 {\n        return false, fmt.Errorf("validUsers cannot be empty")\n    }\n\n    if len(s.ValidActions) == 0 {\n        return false, fmt.Errorf("validActions cannot be empty")\n    }\n\n    if len(s.ValidResources) == 0 {\n        return false, fmt.Errorf("validResources cannot be empty")\n    }\n\n    return true, nil\n}\n\n// validateSettings validates the settings.\nfunc validateSettings(payload []byte) ([]byte, error) {\n    logger.Info("validating settings")\n\n    settings := Settings{}\n    err := json.Unmarshal(payload, &settings)\n    if err != nil {\n        return kubewarden.RejectSettings(kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))\n    }\n\n    valid, err := settings.Valid()\n    if err != nil {\n        return kubewarden.RejectSettings(kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))\n    }\n    if valid {\n        return kubewarden.AcceptSettings()\n    }\n\n    logger.Warn("rejecting settings")\n    return kubewarden.RejectSettings(kubewarden.Message("Provided settings are not valid"))\n}\n'})})]}),"\n",(0,i.jsxs)(n.p,{children:["Finally, you replace the ",(0,i.jsx)(n.code,{children:"validate"})," function (in ",(0,i.jsx)(n.code,{children:"validate.go"}),"):"]}),"\n",(0,i.jsxs)(t,{children:[(0,i.jsxs)("summary",{children:["The ",(0,i.jsx)(n.code,{children:"validate"})," function in ",(0,i.jsx)(n.code,{children:"validate.go"}),"."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'func validate(payload []byte) ([]byte, error) {\n    // Unmarshal the payload into a RawValidationRequest instance\n    validationRequest := RawValidationRequest{}\n    err := json.Unmarshal(payload, &validationRequest)\n    if err != nil {\n        // If the payload is not valid, reject the request\n        return kubewarden.RejectRequest(\n            kubewarden.Message(err.Error()),\n            kubewarden.Code(400))\n    }\n\n    request := validationRequest.Request\n    settings := validationRequest.Settings\n\n    // Validate the payload\n    if slices.Contains(settings.ValidUsers, request.User) &&\n        slices.Contains(settings.ValidActions, request.Action) &&\n        slices.Contains(settings.ValidResources, request.Resource) {\n        return kubewarden.AcceptRequest()\n    }\n\n    return kubewarden.RejectRequest(\n        kubewarden.Message("The request cannot be accepted."),\n        kubewarden.Code(400))\n}\n'})})]}),"\n",(0,i.jsxs)(n.p,{children:["You can set up a test in ",(0,i.jsx)(n.code,{children:"e2e.bats"}),":"]}),"\n",(0,i.jsxs)(t,{children:[(0,i.jsx)("summary",{children:(0,i.jsx)(n.code,{children:"e2e.bats"})}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'#!/usr/bin/env bats\n\n@test "accept" {\n  run kwctl run annotated-policy.wasm -r test_data/request.json -s test_data/settings.json\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  # request allowed\n  [ "$status" -eq 0 ]\n  [ $(expr "$output" : \'.*allowed.*true\') -ne 0 ]\n}\n'})})]}),"\n",(0,i.jsxs)(n.p,{children:["Then the outputs of ",(0,i.jsx)(n.code,{children:"make"}),", ",(0,i.jsx)(n.code,{children:"make test"})," and ",(0,i.jsx)(n.code,{children:"make e2e"})," are:"]}),"\n",(0,i.jsxs)(t,{children:[(0,i.jsx)("summary",{children:"Outputs"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-console",children:'make && make test && make e2e-tests\ndocker run \\\n\t--rm \\\n\t-e GOFLAGS="-buildvcs=false" \\\n\t-v /home/jhk/projects/suse/tmp/fab-goraw:/src \\\n\t-w /src tinygo/tinygo:0.30.0 \\\n\ttinygo build -o policy.wasm -target=wasi -no-debug .\ngo test -v\n=== RUN   TestAcceptValidSettings\n--- PASS: TestAcceptValidSettings (0.00s)\n=== RUN   TestRejectSettingsWithEmptyValidUsers\n--- PASS: TestRejectSettingsWithEmptyValidUsers (0.00s)\n=== RUN   TestRejectSettingsWithEmptyValidActions\n--- PASS: TestRejectSettingsWithEmptyValidActions (0.00s)\n=== RUN   TestRejectSettingsWithEmptyValidResources\n--- PASS: TestRejectSettingsWithEmptyValidResources (0.00s)\n=== RUN   TestValidateRequestAccept\n--- PASS: TestValidateRequestAccept (0.00s)\n=== RUN   TestValidateRequestReject\n--- PASS: TestValidateRequestReject (0.00s)\nPASS\nok  \tgithub.com/kubewarden/go-policy-template\t0.002s\nkwctl annotate -m metadata.yml -u README.md -o annotated-policy.wasm policy.wasm\nbats e2e.bats\ne2e.bats\n \u2713 accept\n\n1 test, 0 failures\n'})})]}),"\n",(0,i.jsx)(n.h3,{id:"mutation",children:"Mutation"}),"\n",(0,i.jsxs)(n.p,{children:["You need to change the earlier example to mutate the request instead of rejecting it.\nThe settings should contain the ",(0,i.jsx)(n.code,{children:"defaultUser"}),", ",(0,i.jsx)(n.code,{children:"defaultAction"})," and ",(0,i.jsx)(n.code,{children:"defaultRequest"}),"\nto use to mutate the request if the user, the action or the resource isn't valid."]}),"\n",(0,i.jsxs)(n.p,{children:["You need to update the ",(0,i.jsx)(n.code,{children:"Settings"})," type with the new fields:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'// Settings defines the settings of the policy.\ntype Settings struct {\n    ValidUsers      []string `json:"validUsers"`\n    ValidActions    []string `json:"validActions"`\n    ValidResources  []string `json:"validResources"`\n    DefaultUser     string   `json:"defaultUser"`\n    DefaultAction   string   `json:"defaultAction"`\n    DefaultResource string   `json:"defaultResource"`\n}\n\n// Valid returns true if the settings are valid.\nfunc (s *Settings) Valid() (bool, error) {\n    if len(s.ValidUsers) == 0 {\n        return false, fmt.Errorf("validUsers cannot be empty")\n    }\n\n    if len(s.ValidActions) == 0 {\n        return false, fmt.Errorf("validActions cannot be empty")\n    }\n\n    if len(s.ValidResources) == 0 {\n        return false, fmt.Errorf("validResources cannot be empty")\n    }\n\n    if s.DefaultUser == "" {\n        return false, fmt.Errorf("defaultUser cannot be empty")\n    }\n\n    if s.DefaultAction == "" {\n        return false, fmt.Errorf("defaultUser cannot be empty")\n    }\n\n    if s.DefaultResource == "" {\n        return false, fmt.Errorf("defaultResource cannot be empty")\n    }\n\n    return true, nil\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Also, the ",(0,i.jsx)(n.code,{children:"validate"})," function to introduce the mutation:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'func validate(payload []byte) ([]byte, error) {\n    // Unmarshal the payload into a RawValidationRequest instance\n    validationRequest := RawValidationRequest{}\n    err := json.Unmarshal(payload, &validationRequest)\n    if err != nil {\n        // If the payload is not valid, reject the request\n        return kubewarden.RejectRequest(\n            kubewarden.Message(err.Error()),\n            kubewarden.Code(400))\n    }\n\n    request := validationRequest.Request\n    settings := validationRequest.Settings\n\n    logger.Info("validating request")\n\n    // Accept the request without mutating it if it is valid\n    if slices.Contains(settings.ValidUsers, request.User) &&\n        slices.Contains(settings.ValidActions, request.Action) &&\n        slices.Contains(settings.ValidResources, request.Resource) {\n        return kubewarden.AcceptRequest()\n    }\n\n    logger.Info("mutating request")\n\n    // Mutate the request if it is not valid\n    if !slices.Contains(settings.ValidUsers, request.User) {\n        request.User = settings.DefaultUser\n    }\n\n    if !slices.Contains(settings.ValidActions, request.Action) {\n        request.Action = settings.DefaultAction\n    }\n\n    if !slices.Contains(settings.ValidResources, request.Resource) {\n        request.Resource = settings.DefaultResource\n    }\n\n    return kubewarden.MutateRequest(request)\n}\n'})})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}function h(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},11151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>a});var i=t(67294);const s={},r=i.createContext(s);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);