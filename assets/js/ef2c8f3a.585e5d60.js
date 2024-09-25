"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[34623],{71712:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>g,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=t(85893),i=t(11151);const r={sidebar_label:"Defining policy settings",sidebar_position:24,title:"Defining policy settings",description:"Defining policy setting for a Kubewarden policy written in Go.",keywords:["kubewarden","kubernetes","defining policy settings","Go"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","go","defining-policy-settings"],"doc-persona":["kubewarden-policy-developer"]},o=void 0,a={id:"tutorials/writing-policies/go/policy-settings",title:"Defining policy settings",description:"Defining policy setting for a Kubewarden policy written in Go.",source:"@site/versioned_docs/version-1.16/tutorials/writing-policies/go/03-policy-settings.md",sourceDirName:"tutorials/writing-policies/go",slug:"/tutorials/writing-policies/go/policy-settings",permalink:"/tutorials/writing-policies/go/policy-settings",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.16/tutorials/writing-policies/go/03-policy-settings.md",tags:[],version:"1.16",lastUpdatedAt:1727266537e3,sidebarPosition:24,frontMatter:{sidebar_label:"Defining policy settings",sidebar_position:24,title:"Defining policy settings",description:"Defining policy setting for a Kubewarden policy written in Go.",keywords:["kubewarden","kubernetes","defining policy settings","Go"],"doc-type":["tutorial"],"doc-topic":["kubewarden","writing-policies","go","defining-policy-settings"],"doc-persona":["kubewarden-policy-developer"]},sidebar:"docs",previous:{title:"New validation policy",permalink:"/tutorials/writing-policies/go/scaffold"},next:{title:"Validation logic",permalink:"/tutorials/writing-policies/go/validation"}},d={},l=[{value:"Building <code>Settings</code> instances",id:"building-settings-instances",level:2},{value:"Implementing <code>Settings</code> validation",id:"implementing-settings-validation",level:2},{value:"Testing the settings code",id:"testing-the-settings-code",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/writing-policies/go/policy-settings"})}),"\n",(0,s.jsx)(n.p,{children:"Firstly, you need to define the structure that holds the policy settings."}),"\n",(0,s.jsxs)(n.p,{children:["You do this by modifying the code in the ",(0,s.jsx)(n.code,{children:"settings.go"})," file (from your local version of the Go policy template).\nYou need to add two extra lines to the ",(0,s.jsx)(n.code,{children:"import"})," section,\nchange the ",(0,s.jsx)(n.code,{children:"Settings"})," structure,\nand add the ",(0,s.jsx)(n.code,{children:"RegularExpression"})," structure."]}),"\n",(0,s.jsx)(n.p,{children:"It should match the following code:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'import (\n    "encoding/json"\n    "fmt"\n    "regexp"\n\n    mapset "github.com/deckarep/golang-set/v2"\n    kubewarden "github.com/kubewarden/policy-sdk-go"\n    kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"\n)\n\ntype Settings struct {\n    DeniedLabels      mapset.Set[string]            `json:"denied_labels"`\n    ConstrainedLabels map[string]*RegularExpression `json:"constrained_labels"`\n}\n\ntype RegularExpression struct {\n    *regexp.Regexp\n}\n'})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"DeniedNames"})," is no longer required in the ",(0,s.jsx)(n.code,{children:"Settings"})," structure defined in ",(0,s.jsx)(n.code,{children:"settings.go"}),"."]}),(0,s.jsxs)(n.p,{children:["As ",(0,s.jsx)(n.code,{children:"DeniedNames"})," is no longer defined, you should also delete the function ",(0,s.jsx)(n.code,{children:"IsNameDefined"})," in ",(0,s.jsx)(n.code,{children:"settings.go"}),".\nYou should also remove the function that references it in ",(0,s.jsx)(n.code,{children:"settings_test.go"}),", ",(0,s.jsx)(n.code,{children:"TestIsNameDenied"}),"."]})]}),"\n",(0,s.jsxs)(n.p,{children:["You're using the ",(0,s.jsx)(n.code,{children:"regexp"})," package to handle regular expression objects and the\n",(0,s.jsx)(n.a,{href:"https://github.com/deckarep/golang-set",children:(0,s.jsx)(n.code,{children:"mapset.Set"})})," type to store\nthe list of denied labels."]}),"\n",(0,s.jsxs)(n.p,{children:["Since ",(0,s.jsx)(n.code,{children:"regexp.Regexp"})," doesn't handle deserialization,\nyou need to define custom functions to handle marshaling and unmarshalling of regular expressions:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:"// UnmarshalText satisfies the encoding.TextMarshaler interface,\n// also used by json.Unmarshal.\nfunc (r *RegularExpression) UnmarshalText(text []byte) error {\n    nativeRegExp, err := regexp.Compile(string(text))\n    if err != nil {\n        return err\n    }\n    r.Regexp = nativeRegExp\n    return nil\n}\n\n// MarshalText satisfies the encoding.TextMarshaler interface,\n// also used by json.Marshal.\nfunc (r *RegularExpression) MarshalText() ([]byte, error) {\n    if r.Regexp != nil {\n        return []byte(r.Regexp.String()), nil\n    }\n\n    return nil, nil\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Also, you need the ",(0,s.jsx)(n.code,{children:"UnmarshalJSON"})," method to handle the deserialization of the ",(0,s.jsx)(n.code,{children:"Settings"})," struct:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'func (s *Settings) UnmarshalJSON(data []byte) error {\n    rawSettings := struct {\n        DeniedLabels      []string          `json:"denied_labels"`\n        ConstrainedLabels map[string]*RegularExpression `json:"constrained_labels"`\n    }{}\n\n    err := json.Unmarshal(data, &rawSettings)\n    if err != nil {\n        return err\n    }\n\n    s.DeniedLabels = mapset.NewThreadUnsafeSet[string](rawSettings.DeniedLabels...)\n    s.ConstrainedLabels = rawSettings.ConstrainedLabels\n\n    return nil\n}\n'})}),"\n",(0,s.jsxs)(n.h2,{id:"building-settings-instances",children:["Building ",(0,s.jsx)(n.code,{children:"Settings"})," instances"]}),"\n",(0,s.jsx)(n.p,{children:"A Kubewarden policy exposes two different functions that receive the policy settings as input:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"validate"}),": Use this function when Kubernetes object requires validation by the policy.\nThe settings are part of a\n",(0,s.jsx)(n.a,{href:"https://pkg.go.dev/github.com/kubewarden/policy-sdk-go@v0.2.1/protocol#ValidationRequest",children:(0,s.jsx)(n.code,{children:"ValidationRequest"})}),"\nobject."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"validate_settings"}),": Call this function when the policy is first loaded by Kubewarden.\nThe function receives the policy settings as input and checks validity."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["You need to create a helper function that creates a ",(0,s.jsx)(n.code,{children:"Settings"})," object starting from the JSON payload:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:"func NewSettingsFromValidationReq(validationReq *kubewarden_protocol.ValidationRequest) (Settings, error) {\n    settings := Settings{}\n    err := json.Unmarshal(validationReq.Settings, &settings)\n    if err != nil {\n        return Settings{}, err\n    }\n\n    return settings, nil\n}\n"})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsxs)(n.p,{children:["All the ",(0,s.jsx)(n.code,{children:"mapset.Set"})," objects are created using the\n",(0,s.jsx)(n.a,{href:"https://pkg.go.dev/github.com/deckarep/golang-set?utm_source=godoc#NewThreadUnsafeSet",children:"thread-unsafe variant"}),".\nThe WebAssembly code executes in a single thread, hence there are no concurrency issues."]}),(0,s.jsxs)(n.p,{children:["The WebAssembly standard doesn't cover threads yet.\nSee ",(0,s.jsx)(n.a,{href:"https://github.com/WebAssembly/threads",children:"the official proposal"})," for more details."]})]}),"\n",(0,s.jsxs)(n.h2,{id:"implementing-settings-validation",children:["Implementing ",(0,s.jsx)(n.code,{children:"Settings"})," validation"]}),"\n",(0,s.jsx)(n.p,{children:"All Kubewarden policies have to implement settings validation."}),"\n",(0,s.jsxs)(n.p,{children:["You do this by adding a ",(0,s.jsx)(n.code,{children:"Valid"})," method to the ",(0,s.jsx)(n.code,{children:"Settings"})," instances:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'func (s *Settings) Valid() (bool, error) {\n    constrainedLabels := mapset.NewThreadUnsafeSet[string]()\n\n    for label := range s.ConstrainedLabels {\n        constrainedLabels.Add(label)\n    }\n\n    constrainedAndDenied := constrainedLabels.Intersect(s.DeniedLabels)\n    if constrainedAndDenied.Cardinality() != 0 {\n        return false,\n            fmt.Errorf("These labels cannot be constrained and denied at the same time: %v", constrainedAndDenied)\n    }\n\n    return true, nil\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"Valid"}),' method ensures no "denied" label is also part of the "constrained" map.\nUsage of the ',(0,s.jsx)(n.code,{children:"Intersect"})," method provided by ",(0,s.jsx)(n.code,{children:"mapset.Set"})," simplifies the check."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"Valid"})," method invocation is on an already instantiated ",(0,s.jsx)(n.code,{children:"Setting"})," object.\nThis means the validation of the regular expression provided by the user already took place in of the ",(0,s.jsx)(n.code,{children:"Settings"})," unmarshaller."]})}),"\n",(0,s.jsxs)(n.p,{children:["Finally, you need the ",(0,s.jsx)(n.code,{children:"validateSettings"})," function,\nprovided by the scaffolding,\nto change to look like this:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'func validateSettings(payload []byte) ([]byte, error) {\n    settings := Settings{}\n    err := json.Unmarshal(payload, &settings)\n    if err != nil {\n        return kubewarden.RejectSettings(\n            kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))\n    }\n\n    valid, err := settings.Valid()\n    if valid {\n        return kubewarden.AcceptSettings()\n    }\n\n    return kubewarden.RejectSettings(\n        kubewarden.Message(fmt.Sprintf("Provided settings are not valid: %v", err)))\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["You can see the function takes advantage of the helper functions provided by\n",(0,s.jsx)(n.a,{href:"https://github.com/kubewarden/policy-sdk-go",children:"Kubewarden's SDK"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"testing-the-settings-code",children:"Testing the settings code"}),"\n",(0,s.jsxs)(n.p,{children:["It's important to have good test coverage of the code you write.\nThe code you are using, from the scaffolding, comes with a series of unit tests defined in the ",(0,s.jsx)(n.code,{children:"settings_test.go"})," file."]}),"\n",(0,s.jsxs)(n.p,{children:["You have to change the contents of this file to reflect the new behavior of the ",(0,s.jsx)(n.code,{children:"Settings"})," class."]}),"\n",(0,s.jsx)(n.p,{children:"Include the Go packages you are using:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'import (\n    "testing"\n\n    "encoding/json"\n\n    kubewarden_protocol "github.com/kubewarden/policy-sdk-go/protocol"\n)\n'})}),"\n",(0,s.jsxs)(n.p,{children:["You can start by writing a unit test that ensures you can assign a ",(0,s.jsx)(n.code,{children:"Settings"}),"\ninstance from a ",(0,s.jsx)(n.code,{children:"ValidationRequest"})," object:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'func TestParseValidSettings(t *testing.T) {\n    settingsJSON := []byte(`\n        {\n            "denied_labels": [ "foo", "bar" ],\n            "constrained_labels": {\n                    "cost-center": "cc-\\\\d+"\n            }\n        }`)\n\n    settings := Settings{}\n    err := json.Unmarshal(settingsJSON, &settings)\n    if err != nil {\n        t.Errorf("Unexpected error %+v", err)\n    }\n\n    expected_denied_labels := []string{"foo", "bar"}\n    for _, exp := range expected_denied_labels {\n        if !settings.DeniedLabels.Contains(exp) {\n            t.Errorf("Missing value %s", exp)\n        }\n    }\n\n    re, found := settings.ConstrainedLabels["cost-center"]\n    if !found {\n        t.Error("Didn\'t find the expected constrained label")\n    }\n\n    expected_regexp := `cc-\\d+`\n    if re.String() != expected_regexp {\n        t.Errorf("Expected regexp to be %v - got %v instead",\n            expected_regexp, re.String())\n    }\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Next, you need a test that checks a ",(0,s.jsx)(n.code,{children:"Settings"})," instance isn't generated when the user provides a broken regular expression:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'func TestParseSettingsWithInvalidRegexp(t *testing.T) {\n    settingsJSON := []byte(`\n        {\n            "denied_labels": [ "foo", "bar" ],\n            "constrained_labels": {\n                    "cost-center": "cc-[a+"\n            }\n        }`)\n\n    err := json.Unmarshal(settingsJSON, &Settings{})\n    if err == nil {\n        t.Errorf("Didn\'t get expected error")\n    }\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Now, you can define a test that checks the behavior of the\n",(0,s.jsx)(n.code,{children:"validate_settings"})," entry point."]}),"\n",(0,s.jsxs)(n.p,{children:["You look at the ",(0,s.jsx)(n.code,{children:"SettingsValidationResponse"})," object returned by your ",(0,s.jsx)(n.code,{children:"validateSettings"})," function:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'func TestDetectValidSettings(t *testing.T) {\n    settingsJSON := []byte(`\n    {\n        "denied_labels": [ "foo", "bar" ],\n        "constrained_labels": {\n            "cost-center": "cc-\\\\d+"\n        }\n    }`)\n\n    responsePayload, err := validateSettings(settingsJSON)\n    if err != nil {\n        t.Errorf("Unexpected error %+v", err)\n    }\n\n    var response kubewarden_protocol.SettingsValidationResponse\n    if err := json.Unmarshal(responsePayload, &response); err != nil {\n        t.Errorf("Unexpected error: %+v", err)\n    }\n\n    if !response.Valid {\n        t.Errorf("Expected settings to be valid: %s", *response.Message)\n    }\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Finally, you write two more tests to check the ",(0,s.jsx)(n.code,{children:"validateSettings"})," function rejects invalid settings with the right messages:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'func TestDetectNotValidSettingsDueToBrokenRegexp(t *testing.T) {\n    settingsJSON := []byte(`\n    {\n        "denied_labels": [ "foo", "bar" ],\n        "constrained_labels": {\n            "cost-center": "cc-[a+"\n        }\n    }\n    `)\n\n    responsePayload, err := validateSettings(settingsJSON)\n    if err != nil {\n        t.Errorf("Unexpected error %+v", err)\n    }\n\n    var response kubewarden_protocol.SettingsValidationResponse\n    if err := json.Unmarshal(responsePayload, &response); err != nil {\n        t.Errorf("Unexpected error: %+v", err)\n    }\n\n    if response.Valid {\n        t.Error("Expected settings to not be valid")\n    }\n\n    if *response.Message != "Provided settings are not valid: error parsing regexp: missing closing ]: `[a+`" {\n        t.Errorf("Unexpected validation error message: %s", *response.Message)\n    }\n}\n\nfunc TestDetectNotValidSettingsDueToConflictingLabels(t *testing.T) {\n    settingsJSON := []byte(`\n    {\n        "denied_labels": [ "foo", "bar", "cost-center" ],\n        "constrained_labels": {\n            "cost-center": ".*"\n        }\n    }`)\n    responsePayload, err := validateSettings(settingsJSON)\n    if err != nil {\n        t.Errorf("Unexpected error %+v", err)\n    }\n\n    var response kubewarden_protocol.SettingsValidationResponse\n    if err := json.Unmarshal(responsePayload, &response); err != nil {\n        t.Errorf("Unexpected error: %+v", err)\n    }\n\n    if response.Valid {\n        t.Error("Expected settings to not be valid")\n    }\n\n    if *response.Message != "Provided settings are not valid: These labels cannot be constrained and denied at the same time: Set{cost-center}" {\n        t.Errorf("Unexpected validation error message: %s", *response.Message)\n    }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Now you can run the tests that you have defined so far by using the following command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"go test -v settings.go settings_test.go\n"})}),"\n",(0,s.jsx)(n.p,{children:"All the tests will pass with the following output:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"=== RUN   TestParseValidSettings\n--- PASS: TestParseValidSettings (0.00s)\n=== RUN   TestParseSettingsWithInvalidRegexp\n--- PASS: TestParseSettingsWithInvalidRegexp (0.00s)\n=== RUN   TestDetectValidSettings\n--- PASS: TestDetectValidSettings (0.00s)\n=== RUN   TestDetectNotValidSettingsDueToBrokenRegexp\n--- PASS: TestDetectNotValidSettingsDueToBrokenRegexp (0.00s)\n=== RUN   TestDetectNotValidSettingsDueToConflictingLabels\n--- PASS: TestDetectNotValidSettingsDueToConflictingLabels (0.00s)\nPASS\nok      command-line-arguments    0.002s\n"})}),"\n",(0,s.jsx)(n.p,{children:"You can now implement the actual validation code in the next section."})]})}function g(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var s=t(67294);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);