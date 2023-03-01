"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[524],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=i.createContext({}),p=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return i.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(n),h=r,m=d["".concat(l,".").concat(h)]||d[h]||c[h]||a;return n?i.createElement(m,o(o({ref:t},u),{},{components:n})):i.createElement(m,o({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<a;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8121:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var i=n(3117),r=(n(7294),n(3905));const a={sidebar_label:"Policy Authors",title:""},o="While creating a policy",s={unversionedId:"testing-policies/policy-authors",id:"testing-policies/policy-authors",title:"",description:"Kubewarden Policies are regular programs compiled as WebAssembly. As with any kind",source:"@site/docs/testing-policies/02-policy-authors.md",sourceDirName:"testing-policies",slug:"/testing-policies/policy-authors",permalink:"/testing-policies/policy-authors",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/testing-policies/02-policy-authors.md",tags:[],version:"current",lastUpdatedAt:1677682285,formattedLastUpdatedAt:"Mar 1, 2023",sidebarPosition:2,frontMatter:{sidebar_label:"Policy Authors",title:""},sidebar:"docs",previous:{title:"Distributing Policies",permalink:"/distributing-policies"},next:{title:"Cluster Operators",permalink:"/testing-policies/cluster-operators"}},l={},p=[{value:"End-to-end tests",id:"end-to-end-tests",level:2}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"while-creating-a-policy"},"While creating a policy"),(0,r.kt)("p",null,"Kubewarden Policies are regular programs compiled as WebAssembly. As with any kind\nof program, it's important to have good test coverage."),(0,r.kt)("p",null,"Policy authors can leverage the testing frameworks and tools of their language\nof choice to verify the behaviour of their policies."),(0,r.kt)("p",null,"As an example, you can take a look at these Kubewarden policies:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/psp-apparmor"},"psp-apparmor"),": this\nis a Kubewarden Policy written using ",(0,r.kt)("a",{parentName:"li",href:"/writing-policies/rust/intro-rust"},"Rust"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/ingress-policy"},"ingress-policy"),": this is\na Kubewarden Policy written using ",(0,r.kt)("a",{parentName:"li",href:"/writing-policies/go/intro-go"},"Go"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/pod-privileged-policy"},"pod-privileged-policy"),": this\nis a Kubewarden Policy written using ",(0,r.kt)("a",{parentName:"li",href:"https://www.assemblyscript.org/"},"AssemblyScript"),".")),(0,r.kt)("p",null,"All these policies have integrated test suites built using the regular testing libraries\nof Rust, Go and AssemblyScript."),(0,r.kt)("p",null,"Finally, all these projects rely on GitHub Actions to implement their CI pipelines."),(0,r.kt)("h2",{id:"end-to-end-tests"},"End-to-end tests"),(0,r.kt)("p",null,"As a policy author you can also write tests that are executed against the actual\nWebAssembly binary containing your policy. This can be done without having\nto deploy a Kubernetes cluster by using these tools:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/bats-core/bats-core"},"bats"),": used to write the\ntests and automate their execution."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/kwctl"},"kwctl"),": Kubewarden go-to CLI\ntool that helps you with policy related operations such as pull,\ninspect, annotate, push and run.")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"kwctl run")," usage is quite simple, we just have to invoke it with the\nfollowing data as input:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"WebAssembly binary file reference of the policy to be run. The\nKubewarden policy can be loaded from the local filesystem\n(",(0,r.kt)("inlineCode",{parentName:"li"},"file://"),"), an HTTP(s) server (",(0,r.kt)("inlineCode",{parentName:"li"},"https://"),") or an OCI registry\n(",(0,r.kt)("inlineCode",{parentName:"li"},"registry://"),")."),(0,r.kt)("li",{parentName:"ol"},"The admission request object to be evaluated.  This is provided via\nthe ",(0,r.kt)("inlineCode",{parentName:"li"},"--request-path")," argument. The request can be provided through\n",(0,r.kt)("inlineCode",{parentName:"li"},"stdin")," by setting ",(0,r.kt)("inlineCode",{parentName:"li"},"--request-path")," to ",(0,r.kt)("inlineCode",{parentName:"li"},"-"),"."),(0,r.kt)("li",{parentName:"ol"},"The policy settings to be used at evaluation time, they can be\nprovided as an inline JSON via ",(0,r.kt)("inlineCode",{parentName:"li"},"--settings-json")," flag, or a JSON or\nYAML file loaded from the filesystem via ",(0,r.kt)("inlineCode",{parentName:"li"},"--settings-path"),".")),(0,r.kt)("p",null,"Once the policy evaluation is done, ",(0,r.kt)("inlineCode",{parentName:"p"},"kwctl")," prints the\n",(0,r.kt)("inlineCode",{parentName:"p"},"ValidationResponse")," object to the standard output."),(0,r.kt)("p",null,"For example, this is how ",(0,r.kt)("inlineCode",{parentName:"p"},"kwctl")," can be used to test the WebAssembly\nbinary of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ingress-policy")," linked above:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'$ curl https://raw.githubusercontent.com/kubewarden/ingress-policy/v0.1.8/test_data/ingress-wildcard.json 2> /dev/null | \\\n    kwctl run \\\n        --settings-json \'{"allowPorts": [80], "denyPorts": [3000]}\' \\\n        --request-path - \\\n        registry://ghcr.io/kubewarden/policies/ingress:v0.1.8 | jq\n')),(0,r.kt)("p",null,"Using ",(0,r.kt)("inlineCode",{parentName:"p"},"bats")," we can can write a test that runs this command and looks for the\nexpected outputs:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'@test "all is good" {\n  run kwctl run \\\n    --request-path test_data/ingress-wildcard.json \\\n    --settings-json \'{"allowPorts": [80], "denyPorts": [3000]}\' \\\n    ingress-policy.wasm\n\n  # this prints the output when one the checks below fails\n  echo "output = ${output}"\n\n  # settings validation passed\n  [[ "$output" == *"valid: true"* ]]\n\n  # request accepted\n  [[ "$output" == *"allowed: true"* ]]\n}\n')),(0,r.kt)("p",null,"We can copy the snippet from above inside of a file called ",(0,r.kt)("inlineCode",{parentName:"p"},"e2e.bats"),",\nand then invoke ",(0,r.kt)("inlineCode",{parentName:"p"},"bats")," in this way:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ bats e2e.bats\n \u2713 all is good\n\n1 tests, 0 failures\n")),(0,r.kt)("p",null,"Checkout ",(0,r.kt)("a",{parentName:"p",href:"/writing-policies/go/e2e-tests"},"this section"),"\nof the documentation to learn more about writing end-to-end\ntests of your policies."))}c.isMDXComponent=!0}}]);