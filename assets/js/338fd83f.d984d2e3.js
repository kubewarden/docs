"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[5088],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>k});var a=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=a.createContext({}),l=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=l(e.components);return a.createElement(p.Provider,{value:n},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=l(t),m=i,k=c["".concat(p,".").concat(m)]||c[m]||d[m]||r;return t?a.createElement(k,s(s({ref:n},u),{},{components:t})):a.createElement(k,s({ref:n},u))}));function k(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,s=new Array(r);s[0]=m;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[c]="string"==typeof e?e:i,s[1]=o;for(var l=2;l<r;l++)s[l]=t[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},62674:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var a=t(87462),i=(t(67294),t(3905));const r={sidebar_label:"PSP migration",title:"PodSecurityPolicy migration",description:"Discusses PSP migration to Kubewarden policies after Kubernetes v1.25.",keywords:["kubewarden","kubernetes","appvia","psp","podsecuritypolicy"]},s=void 0,o={unversionedId:"tasksDir/psp-migration",id:"version-1.7/tasksDir/psp-migration",title:"PodSecurityPolicy migration",description:"Discusses PSP migration to Kubewarden policies after Kubernetes v1.25.",source:"@site/versioned_docs/version-1.7/tasksDir/psp-migration.md",sourceDirName:"tasksDir",slug:"/tasksDir/psp-migration",permalink:"/1.7/tasksDir/psp-migration",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/tasksDir/psp-migration.md",tags:[],version:"1.7",lastUpdatedAt:1700231811,formattedLastUpdatedAt:"Nov 17, 2023",frontMatter:{sidebar_label:"PSP migration",title:"PodSecurityPolicy migration",description:"Discusses PSP migration to Kubewarden policies after Kubernetes v1.25.",keywords:["kubewarden","kubernetes","appvia","psp","podsecuritypolicy"]},sidebar:"docs",previous:{title:"Policy Reports",permalink:"/1.7/explanations/audit-scanner/policy-reports"},next:{title:"Pod Security Admission with KW",permalink:"/1.7/tasksDir/pod-security-admission-with-kubewarden"}},p={},l=[{value:"Kubewarden replacements for PSP",id:"kubewarden-replacements-for-psp",level:2},{value:"Blocking container privilege escalation",id:"blocking-container-privilege-escalation",level:3},{value:"User and group configuration",id:"user-and-group-configuration",level:3},{value:"Privileged container configuration",id:"privileged-container-configuration",level:3},{value:"Host namespace configuration",id:"host-namespace-configuration",level:3},{value:"Mapping Kuberwarden policies to PSP fields",id:"mapping-kuberwarden-policies-to-psp-fields",level:2},{value:"PSP migration script",id:"psp-migration-script",level:2}],u={toc:l},c="wrapper";function d(e){let{components:n,...t}=e;return(0,i.kt)(c,(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"For Kubernetes \u2265 v1.25.\n",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/"},"PodSecurityPolicy"),"\n(PSP) is removed. Now you can use Kubewarden for admission control on your\nKubernetes clusters."),(0,i.kt)("p",null,"Kubewarden has separate policies to achieve the same goal as a monolithic PSP\nconfiguration. Each Kubewarden policy definition functions as a different\nconfiguration section in the specification of a PSP. The mapping of PSP\nconfiguration fields to their respective Kubewarden policies is in the ",(0,i.kt)("a",{parentName:"p",href:"#mapping-kuberwarden-policies-to-psp-fields"},"mapping\ntable")," below."),(0,i.kt)("p",null,"With Kubewarden, operators have granular control of policy configuration in\ntheir clusters."),(0,i.kt)("p",null,"With a Kubewarden instance, you can deploy policies to replace the\n",(0,i.kt)("inlineCode",{parentName:"p"},"PodSecurityPolicy")," object. We consider these rules in this example:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a PSP disabling privileged escalation"),(0,i.kt)("li",{parentName:"ul"},"privileged containers"),(0,i.kt)("li",{parentName:"ul"},"blocking pods running as root"),(0,i.kt)("li",{parentName:"ul"},"forcing a particular user group"),(0,i.kt)("li",{parentName:"ul"},"blocking host namespaces"),(0,i.kt)("li",{parentName:"ul"},"allowing a pod to use only port 443")),(0,i.kt)("p",null,"The YAML definition of this PSP is:"),(0,i.kt)("details",null,(0,i.kt)("summary",null,"PSP YAML definition"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: policy/v1beta1\nkind: PodSecurityPolicy\nmetadata:\n  name: restricted\nspec:\n  allowPrivilegeEscalation: false\n  runAsUser:\n    rule: MustRunAsNonRoot\n  supplementalGroups:\n    rule: MustRunAs\n    ranges:\n      - min: 1000\n        max: 65535\n  privileged: false\n  hostNetwork: false\n  hostIPC: false\n  hostPID: false\n  hostPorts:\n    - min: 443\n      max: 443\n"))),(0,i.kt)("h2",{id:"kubewarden-replacements-for-psp"},"Kubewarden replacements for PSP"),(0,i.kt)("p",null,"Now we will create Kubewarden policies to achieve the same goal.\nYou enforce each rule with a separate Kubewarden policy.\nSo, in this example, you need a separate policy for the enforcement of each of:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"privileged escalation"),(0,i.kt)("li",{parentName:"ul"},"user and group configuration"),(0,i.kt)("li",{parentName:"ul"},"host namespaces"),(0,i.kt)("li",{parentName:"ul"},"privileged container configuration.")),(0,i.kt)("h3",{id:"blocking-container-privilege-escalation"},"Blocking container privilege escalation"),(0,i.kt)("p",null,"You can deploy a policy as shown below:"),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("code",null,"kubectl")," command for policy deployment"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-allow-privilege-escalation\nspec:\n  module: ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v0.2.6\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    default_allow_privilege_escalation: false\nEOF\n'))),(0,i.kt)("p",null,"In that command, we have specified ",(0,i.kt)("inlineCode",{parentName:"p"},"default_allow_privilege_escalation")," to be\n",(0,i.kt)("inlineCode",{parentName:"p"},"false"),". This policy restricts pods that try to run with more privileges than\nthe parent container."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Output from ",(0,i.kt)("code",null,"kubectl")," that attempts to raise privilege"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    securityContext:\n      allowPrivilegeEscalation: true\n  - name: sidecar\n    image: sidecar\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-allow-privilege-escalation.kubewarden.admission" denied the request: one of the containers has privilege escalation enabled\n'))),(0,i.kt)("h3",{id:"user-and-group-configuration"},"User and group configuration"),(0,i.kt)("p",null,"Now, to enforce the user and group configuration, you can use the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp policy")),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("code",null,"kubectl")," command to use ",(0,i.kt)("code",null,"user-group-psp-policy")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-user-group\nspec:\n  module: ghcr.io/kubewarden/policies/user-group-psp:v0.4.9\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: true\n  settings:\n    run_as_user:\n      rule: MustRunAsNonRoot\n    supplemental_groups:\n      rule: MustRunAs\n      ranges:\n        - min: 1000\n          max: 65535\nEOF\n'))),(0,i.kt)("p",null,"You should configure the policy with ",(0,i.kt)("inlineCode",{parentName:"p"},"mutation: true"),". It's required because\nthe policy will add\n",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"supplementalGroups"),"\nwhen the user does not define them."),(0,i.kt)("p",null,"So, now users cannot deploy pods running as root:"),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example output where ",(0,i.kt)("code",null,"runAsNonRoot: false")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    securityContext:\n      runAsNonRoot: false\n      runAsUser: 0\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-user-group-fb836.kubewarden.admission" denied the request: RunAsNonRoot should be set to true\n'))),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example output where ",(0,i.kt)("code",null,"runAsUser: 0")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    securityContext:\n      runAsNonRoot: true\n      runAsUser: 0\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-user-group-fb836.kubewarden.admission" denied the request: Invalid user ID: cannot run container with root ID (0)\n'))),(0,i.kt)("p",null,"This example below shows the addition of a ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"supplemental\ngroup"),",\ndespite it not being defined by us."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Example addition of a supplemental group"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\nEOF\npod/nginx created\n$ kubectl get pods -o json nginx | jq ".spec.securityContext"\n{\n  "supplementalGroups": [\n    10000\n  ]\n}\n\n'))),(0,i.kt)("h3",{id:"privileged-container-configuration"},"Privileged container configuration"),(0,i.kt)("p",null,"You need to replace the older PSP configuration that blocks privileged\ncontainers. It's necessary to deploy the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/pod-privileged-policy"},"pod-privileged\npolicy"),". This policy does\nnot need any settings. Once running, it will block privileged pods."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Applying the ",(0,i.kt)("code",null,"pod-privileged-policy")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-privileged\nspec:\n  module: ghcr.io/kubewarden/policies/pod-privileged:v0.2.7\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings: null\nEOF\n'))),(0,i.kt)("p",null,"To test the policy, we can try running a pod with privileged configuration enabled:"),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Pod run with privileged configuration enabled"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n    securityContext:\n      privileged: true\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-privileged.kubewarden.admission" denied the request: Privileged container is not allowed\n'))),(0,i.kt)("h3",{id:"host-namespace-configuration"},"Host namespace configuration"),(0,i.kt)("p",null,"To finish the PSP migration exercise, you need to disable host namespace\nsharing. For that, we shall be using the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},(0,i.kt)("inlineCode",{parentName:"a"},"host-namespace-psp"),"\npolicy"),". It allows\nthe cluster administrator to block IPC, PID, and network namespaces\nindividually. It also sets the ports that the pods can be open on, on the host\nIP."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Disabling namespace sharing and setting ports"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-hostnamespaces\nspec:\n  module: ghcr.io/kubewarden/policies/host-namespaces-psp:v0.1.6\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allow_host_ipc: false\n    allow_host_pid: false\n    allow_host_ports:\n      - min: 443\n        max: 443\n    allow_host_network: false\nEOF\n'))),(0,i.kt)("p",null,"We can validate the policy.\nThe pod should not be able to share host namespaces:"),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Blocking namespace example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  hostIPC: true\n  hostNetwork: false\n  hostPID: false\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\n\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has IPC enabled, but this is not allowed\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  hostIPC: false\n  hostNetwork: true\n  hostPID: false\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has host network enabled, but this is not allowed\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  hostIPC: false\n  hostNetwork: false\n  hostPID: true\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has host PID enabled, but this is not allowed\n'))),(0,i.kt)("p",null,"In this last example, the pod should only be able to expose port 443.\nIf other ports are configured in ",(0,i.kt)("inlineCode",{parentName:"p"},"hostPorts")," then an error should happen."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Attempting to use port 80 in ",(0,i.kt)("code",null,"hostPorts")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n    ports:\n      - containerPort: 80\n        hostPort: 80\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod is using unallowed host ports in containers\n'))),(0,i.kt)("h2",{id:"mapping-kuberwarden-policies-to-psp-fields"},"Mapping Kuberwarden policies to PSP fields"),(0,i.kt)("p",null,"This table maps PSP configuration fields to corresponding Kubewarden policies."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"PSP field"),(0,i.kt)("th",{parentName:"tr",align:null},"Kubewarden equivalent policy"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#privileged"},"privileged")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/pod-privileged-policy"},"pod-privileged-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostPID")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostIPC")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostNetwork")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-polic"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostPorts")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"volumes")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/volumes-psp-policy"},"volumes-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"allowedHostPaths")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/hostpaths-psp-policy"},"hostpaths-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"readOnlyRootFilesystem")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/readonly-root-filesystem-psp-policy"},"readonly-root-filesystem-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"fsgroup")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allowed-fsgroups-psp-policy"},"allowed-fsgroups-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#flexvolume-drivers"},"allowedFlexVolumes")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/flexvolume-drivers-psp-policy"},"flexvolume-drivers-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"runAsUser")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"runAsGroup")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"supplementalGroups")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation"},"allowPrivilegeEscalation")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allow-privilege-escalation-psp-policy"},"allow-privilege-escalation-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation"},"defaultAllowPrivilegeEscalation")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allow-privilege-escalation-psp-policy"},"allow-privilege-escalation-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities"},"allowedCapabilities")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/capabilities-psp-policy"},"capabilities-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities"},"defaultAddCapabilities")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/capabilities-psp-policy"},"capabilities-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities"},"requiredDropCapabilities")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/capabilities-psp-policy"},"capabilities-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#selinux"},"seLinux")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/selinux-psp-policy"},"selinux-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#allowedprocmounttypes"},"allowedProcMountTypes")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allowed-proc-mount-types-psp-policy"},"allowed-proc-mount-types-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"apparmor")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/apparmor-psp-policy"},"apparmor-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"seccomp")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/seccomp-psp-policy"},"seccomp-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"forbiddenSysctls")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/sysctl-psp-policy"},"sysctl-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"allowedUnsafeSysctls")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/sysctl-psp-policy"},"sysctl-psp-policy "))))),(0,i.kt)("h2",{id:"psp-migration-script"},"PSP migration script"),(0,i.kt)("p",null,"The Kubewarden team has developed a script for PSP migration. It uses the\nmigration tool from ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/appvia/psp-migration"},"AppVia"),". The\nAppVia tool reads a PSP YAML configuration. It then generates the corresponding\npolicies. It does this for Kubewarden and other policy engines."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"The AppVia migration tool is out of control of the Kuberwarden maintainers.\nThis means that it's possible it generates out-of-date Kubewarden policies. Use\nwith caution. We need a pull request for AppVia for which work is ongoing.\nContact us for more information if you need to.")),(0,i.kt)("p",null,"The script is available in the Kubewarden\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/utils/blob/main/scripts/psp-to-kubewarden"},"utils"),"\nrepository. It downloads the AppVia migration tool into the working directory\nto use. It processes the PSPs defined in the ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl")," default context. Then it\nprints the Kuberwarden policies definitions on the standard output. Users can\nredirect the content to a file or to ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl")," directly."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This script only works in Linux x86_64 machines. ")),(0,i.kt)("p",null,"Let's take a look at an example. In a cluster with the PSP:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"blocking access to host namespaces"),(0,i.kt)("li",{parentName:"ul"},"blocking privileged containers"),(0,i.kt)("li",{parentName:"ul"},"not allowing privilege escalation"),(0,i.kt)("li",{parentName:"ul"},"dropping container capabilities"),(0,i.kt)("li",{parentName:"ul"},"listing the allowed volume types"),(0,i.kt)("li",{parentName:"ul"},"defining the allowed users and groups to be used"),(0,i.kt)("li",{parentName:"ul"},"controlling the supplemental group applied to volumes"),(0,i.kt)("li",{parentName:"ul"},"forcing containers to run in a read-only root filesystem")),(0,i.kt)("p",null,"The following YAML could be used."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"The PSP configuration"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: policy/v1beta1\nkind: PodSecurityPolicy\nmetadata:\n  name: restricted\nspec:\n  hostNetwork: false\n  hostIPC: false\n  hostPID: false\n  hostPorts:\n    - min: 80\n      max: 8080\n  privileged: false\n  # Required to prevent escalations to root.\n  allowPrivilegeEscalation: false\n  requiredDropCapabilities:\n    - ALL\n  # Allow core volume types.\n  volumes:\n    - "configMap"\n    - "emptyDir"\n    - "projected"\n    - "secret"\n    - "downwardAPI"\n    # Assume that ephemeral CSI drivers & persistentVolumes set up by the cluster admin are safe to use.\n    - "csi"\n    - "persistentVolumeClaim"\n    - "ephemeral"\n  runAsUser:\n    # Require the container to run without root privileges.\n    rule: "MustRunAsNonRoot"\n  seLinux:\n    # This policy assumes the nodes are using AppArmor rather than SELinux.\n    rule: "RunAsAny"\n  supplementalGroups:\n    rule: "MustRunAs"\n    ranges:\n      # Forbid adding the root group.\n      - min: 1\n        max: 65535\n  fsGroup:\n    rule: "MustRunAs"\n    ranges:\n      # Forbid adding the root group.\n      - min: 1\n        max: 65535\n  readOnlyRootFilesystem: true\n'))),(0,i.kt)("p",null,"Kubewarden policies can be applied directly to a cluster using the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"$ ./psp-to-kubewarden | kubectl apply -f -\nWarning: policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+, unavailable in v1.25+\nWarning: policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+, unavailable in v1.25+\nclusteradmissionpolicy.policies.kubewarden.io/psp-privileged-82bf2 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-readonlyrootfilesystem-b4a55 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-hostnamespaces-a25a2 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-volumes-cee05 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-capabilities-34d8e created\nclusteradmissionpolicy.policies.kubewarden.io/psp-usergroup-878b0 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-fsgroup-3b08e created\nclusteradmissionpolicy.policies.kubewarden.io/psp-defaultallowprivilegeescalation-b7e87 created\n")),(0,i.kt)("p",null,"If users want to inspect the policies before applying, it's possible to redirect the content to a file or review it directly in the console"),(0,i.kt)("p",null,"To store the generated policies and view them:"),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("code",null,"$ ./psp-to-kubewarden > policies.yaml && cat policies.yaml")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'$ ./psp-to-kubewarden > policies.yaml\n$ cat policies.yaml\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-privileged-eebb9\nspec:\n  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.2.7\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings: null\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-readonlyrootfilesystem-34d7c\nspec:\n  module: registry://ghcr.io/kubewarden/policies/readonly-root-filesystem-psp:v0.1.6\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings: null\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-hostnamespaces-41314\nspec:\n  module: registry://ghcr.io/kubewarden/policies/host-namespaces-psp:v0.1.6\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allow_host_ipc: false\n    allow_host_pid: false\n    allow_host_ports:\n      - max: 8080\n        min: 80\n    allow_host_network: false\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-volumes-2fd34\nspec:\n  module: registry://ghcr.io/kubewarden/policies/volumes-psp:v0.1.11\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allowedTypes:\n      - configMap\n      - emptyDir\n      - projected\n      - secret\n      - downwardAPI\n      - csi\n      - persistentVolumeClaim\n      - ephemeral\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-capabilities-340fe\nspec:\n  module: registry://ghcr.io/kubewarden/policies/capabilities-psp:v0.1.13\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allowed_capabilities: []\n    required_drop_capabilities:\n      - ALL\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-usergroup-19f7a\nspec:\n  module: registry://ghcr.io/kubewarden/policies/user-group-psp:v0.4.9\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    run_as_user:\n      rule: MustRunAsNonRoot\n    supplemental_groups:\n      ranges:\n        - max: 65535\n          min: 1\n      rule: MustRunAs\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-fsgroup-52337\nspec:\n  module: registry://ghcr.io/kubewarden/policies/allowed-fsgroups-psp:v0.1.10\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    ranges:\n      - max: 65535\n        min: 1\n    rule: MustRunAs\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-defaultallowprivilegeescalation-6f11b\nspec:\n  module: registry://ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v0.2.6\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    default_allow_privilege_escalation: false\n\n'))),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The policy names are generated by the PSP migration tool.\nYou may want to change the name to something more meaningful.")))}d.isMDXComponent=!0}}]);