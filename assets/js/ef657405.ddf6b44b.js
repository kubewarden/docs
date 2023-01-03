"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[6452],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=a.createContext({}),l=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=l(e.components);return a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=l(t),m=i,h=d["".concat(p,".").concat(m)]||d[m]||u[m]||r;return t?a.createElement(h,s(s({ref:n},c),{},{components:t})):a.createElement(h,s({ref:n},c))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,s=new Array(r);s[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var l=2;l<r;l++)s[l]=t[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8079:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>l});var a=t(3117),i=(t(7294),t(3905));const r={sidebar_label:"PSP Migration",title:""},s="PSP Migration",o={unversionedId:"tasksDir/psp-migration",id:"tasksDir/psp-migration",title:"",description:"With the removal of PodSecurityPolicy",source:"@site/docs/tasksDir/psp-migration.md",sourceDirName:"tasksDir",slug:"/tasksDir/psp-migration",permalink:"/tasksDir/psp-migration",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/tasksDir/psp-migration.md",tags:[],version:"current",lastUpdatedAt:1672743188,formattedLastUpdatedAt:"Jan 3, 2023",frontMatter:{sidebar_label:"PSP Migration",title:""},sidebar:"docs",previous:{title:"Mutating Policies",permalink:"/tasksDir/mutating-policies"},next:{title:"Using Pod Security Admission with Kubewarden",permalink:"/tasksDir/pod-security-admission-with-kubewarden"}},p={},l=[{value:"Mapping Kuberwarden policies to PSP fields",id:"mapping-kuberwarden-policies-to-psp-fields",level:2},{value:"PSP migration script",id:"psp-migration-script",level:2}],c={toc:l};function u(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"psp-migration"},"PSP Migration"),(0,i.kt)("p",null,"With the removal of ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/"},"PodSecurityPolicy"),"\nin Kubernetes v1.25, you can leverage Kubewarden for admission control on your Kubernetes clusters.\nContrasting with the PSPs, Kubewarden has separate policies to achieve the same goal. Therefore, each Kubewarden policy could be likened to a different\nconfiguration within the spec of a PSP. A mapping of the PSP configuration fields to their respective policies can be found below\nin the ",(0,i.kt)("a",{parentName:"p",href:"#mapping-kuberwarden-policies-to-psp-fields"},"mapping table"),". Therefore, the operators have more granular control\nof the configuration they want to apply in their clusters. If they want to apply part of the PSP security checks it\nis not necessary to define the configurations related to the other fields."),(0,i.kt)("p",null,"Once you have the Kubewarden instance running, it's time to deploy some policies to replace the ",(0,i.kt)("inlineCode",{parentName:"p"},"PodSecurityPolicy")," object. Start by listing\nthe PSPs in use. For the sake of this example, the following enforcements have been considered:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a PSP disabling privileged escalation"),(0,i.kt)("li",{parentName:"ul"},"privileged containers"),(0,i.kt)("li",{parentName:"ul"},"blocking pods running as root"),(0,i.kt)("li",{parentName:"ul"},"forcing a particular user group"),(0,i.kt)("li",{parentName:"ul"},"blocking host namespaces"),(0,i.kt)("li",{parentName:"ul"},"allowing pod to use the port 443 only")),(0,i.kt)("p",null,"The yaml definition of the aforementioned PSP would look like the below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},"apiVersion: policy/v1beta1\nkind: PodSecurityPolicy\nmetadata:\n  name: restricted\nspec:\n  allowPrivilegeEscalation: false\n  runAsUser:\n    rule: MustRunAsNonRoot\n  supplementalGroups:\n    rule: MustRunAs\n    ranges:\n      - min: 1000\n        max: 65535\n  privileged: false\n  hostNetwork: false\n  hostIPC: false\n  hostPID: false\n  hostPorts:\n    - min: 443\n      max: 443\n")),(0,i.kt)("p",null,"Let's create Kubewarden policies to achieve the same goal. One thing that you need to know about Kubewarden policies is that every rule will be enforced by a separate policy. In our example, individual policies will be required for the enforcement of user and group configuration, host namespaces,  privileged escalation, and for the privileged container configuration."),(0,i.kt)("p",null,"Let's start with blocking container escalation. For that you can deploy a policy as shown below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-allowprivilegeescalation\nspec:\n  module: registry://ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v0.1.11\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    default_allow_privilege_escalation: false\nEOF\n')),(0,i.kt)("p",null,"If you notice, we have specified ",(0,i.kt)("inlineCode",{parentName:"p"},"default_allow_privilege_escalation")," to assume a value ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),". Once this policy starts running, it will restrict pods trying to run with more privileges than the parent container by default."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    securityContext:\n      allowPrivilegeEscalation: true\n  - name: sidecar\n    image: sidecar\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-allowprivilegeescalation.kubewarden.admission" denied the request: one of the containers has privilege escalation enabled\n')),(0,i.kt)("p",null,"Now, to enforce the user and groups configuration, you can use the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp policy")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-usergroup\nspec:\n  module: registry://ghcr.io/kubewarden/policies/user-group-psp:v0.2.0\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: true\n  settings:\n    run_as_user:\n      rule: MustRunAsNonRoot\n    supplemental_groups:\n      rule: MustRunAs\n      ranges:\n        - min: 1000\n          max: 65535\nEOF\n')),(0,i.kt)("p",null,"Notice the policy is configured as ",(0,i.kt)("inlineCode",{parentName:"p"},"mutation: true"),". This is required because the policy will add ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"supplementalGroups")," when the user does not define them."),(0,i.kt)("p",null,"So, now users cannot deploy pods running as root:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    securityContext:\n      runAsNonRoot: false\n      runAsUser: 0\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-usergroup-fb836.kubewarden.admission" denied the request: RunAsNonRoot should be set to true\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    securityContext:\n      runAsNonRoot: true\n      runAsUser: 0\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-usergroup-fb836.kubewarden.admission" denied the request: Invalid user ID: cannot run container with root ID (0)\n')),(0,i.kt)("p",null,"Also, the example below also demonstrates the addition of a ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"Supplemental group"),", despite it not being defined by us."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\nEOF\npod/nginx created\n$ kubectl get pods -o json nginx | jq ".spec.securityContext"\n{\n  "supplementalGroups": [\n    10000\n  ]\n}\n\n')),(0,i.kt)("p",null,"To replace the PSP configuration that blocks privileged containers, it's necessary to deploy the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/pod-privileged-policy"},"pod-privileged policy"),". This policy does not require any settings. Once running, it will block privileged pods."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-privileged\nspec:\n  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.10\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings: null\nEOF\n')),(0,i.kt)("p",null,"To test the policy, we can try running a pod with privileged configuration enabled:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n    securityContext:\n      privileged: true\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-privileged.kubewarden.admission" denied the request: User \'system:admin\' cannot schedule privileged containers\n')),(0,i.kt)("p",null,"To complete the PSP migration exercise, it's necessary to disable host namespace sharing.\nTo do that, we shall be using the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},(0,i.kt)("inlineCode",{parentName:"a"},"host-namespace-psp")," policy"),".\nIt allows the cluster administrator to block IPC, PID, and network namespaces individually and set the ports\nthat the pods can be exposed on the host IP."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1alpha2\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-hostnamespaces\nspec:\n  module: registry://ghcr.io/kubewarden/policies/host-namespaces-psp:v0.1.2\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allow_host_ipc: false\n    allow_host_pid: false\n    allow_host_ports:\n      - min: 443\n        max: 443\n    allow_host_network: false\nEOF\n')),(0,i.kt)("p",null,"Again, let's validate the policy. The pod should not be able to share host namespaces:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  hostIPC: true\n  hostNetwork: false\n  hostPID: false\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\n\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has IPC enabled, but this is not allowed\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  hostIPC: false\n  hostNetwork: true\n  hostPID: false\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has host network enabled, but this is not allowed\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  hostIPC: false\n  hostNetwork: false\n  hostPID: true\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod has host PID enabled, but this is not allowed\n')),(0,i.kt)("p",null,"The pod should be only able to expose the port 443 and should throw an error when other port numbers are configured against the hostPort section."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx\nspec:\n  containers:\n  - name: nginx\n    image: nginx\n    imagePullPolicy: IfNotPresent\n    ports:\n      - containerPort: 80\n        hostPort: 80\n  - name: sleeping-sidecar\n    image: alpine\n    command: ["sleep", "1h"]\nEOF\nError from server: error when creating "STDIN": admission webhook "clusterwide-psp-hostnamespaces.kubewarden.admission" denied the request: Pod is using unallowed host ports in containers\n')),(0,i.kt)("h2",{id:"mapping-kuberwarden-policies-to-psp-fields"},"Mapping Kuberwarden policies to PSP fields"),(0,i.kt)("p",null,"The following table show which Kubewarden policy can be used to replace each PSP configuration"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"PSP field"),(0,i.kt)("th",{parentName:"tr",align:null},"Kubewarden equivalent policy"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#privileged"},"privileged")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/pod-privileged-policy"},"pod-privileged-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostPID")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostIPC")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostNetwork")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-polic"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#host-namespaces"},"hostPorts")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/host-namespaces-psp-policy"},"host-namespaces-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"volumes")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/volumes-psp-policy"},"volumes-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"allowedHostPaths")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/hostpaths-psp-policy"},"hostpaths-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"readOnlyRootFilesystem")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/readonly-root-filesystem-psp-policy"},"readonly-root-filesystem-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#volumes-and-file-systems"},"fsgroup")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allowed-fsgroups-psp-policy"},"allowed-fsgroups-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#flexvolume-drivers"},"allowedFlexVolumes")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/flexvolume-drivers-psp-policy"},"flexvolume-drivers-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"runAsUser")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"runAsGroup")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#users-and-groups"},"supplementalGroups")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/user-group-psp-policy"},"user-group-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation"},"allowPrivilegeEscalation")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allow-privilege-escalation-psp-policy"},"allow-privilege-escalation-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#privilege-escalation"},"defaultAllowPrivilegeEscalation")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allow-privilege-escalation-psp-policy"},"allow-privilege-escalation-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities"},"allowedCapabilities")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/capabilities-psp-policy"},"capabilities-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities"},"defaultAddCapabilities")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/capabilities-psp-policy"},"capabilities-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#capabilities"},"requiredDropCapabilities")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/capabilities-psp-policy"},"capabilities-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#selinux"},"seLinux")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/selinux-psp-policy"},"selinux-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#allowedprocmounttypes"},"allowedProcMountTypes")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/allowed-proc-mount-types-psp-policy"},"allowed-proc-mount-types-psp-policy"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"apparmor")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/apparmor-psp-policy"},"apparmor-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"seccomp")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/seccomp-psp-policy"},"seccomp-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"forbiddenSysctls")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/sysctl-psp-policy"},"sysctl-psp-policy "))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://kubernetes.io/docs/concepts/security/pod-security-policy/#apparmor"},"allowedUnsafeSysctls")),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"https://github.com/kubewarden/sysctl-psp-policy"},"sysctl-psp-policy "))))),(0,i.kt)("h2",{id:"psp-migration-script"},"PSP migration script"),(0,i.kt)("p",null,"The Kubewarden team has written a script that leverages the migration tool written\nby ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/appvia/psp-migration"},"AppVia"),", to migrate PSP\nautomatically. The tool is capable of reading PSPs YAML and generate the equivalent\npolicies in many different policy engines. Therefore, our simple script will migrate\nyour PSPs to the equivalent Kuberwarden policies."),(0,i.kt)("p",null,"The script is available in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/utils/blob/main/scripts/psp-to-kubewarden"},"utils repository"),"\nin the Kubewarden GitHub organization. It's quite simple. It will download the\nmigration tool in the working directory and run it over all your PSPs printing\nthe equivalent Kuberwarden policies definition in the standard output. Therefore,\nusers can redirect the content to a file or to ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl")," directly."),(0,i.kt)("p",null,"The script will migrate the PSPs defined in ",(0,i.kt)("inlineCode",{parentName:"p"},"kubectl")," default context.\nThe Kubewarden policies will be printed to stdout. Thus, the users can\napply it directly or save it for further inspection.  Let's take a look at an example:"),(0,i.kt)("p",null,"In a cluster with the PSP blocking access to host namespaces, blocking privileged containers, not allowing privilege escalation, dropping all containers capabilities, listing the allowed volume types, defining the allowed user and groups to be used, controling the supplemental group applied to volumes and forcing containers to run in a read-only root filesystem:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: policy/v1beta1\nkind: PodSecurityPolicy\nmetadata:\n  name: restricted\nspec:\n  hostNetwork: false\n  hostIPC: false\n  hostPID: false\n  hostPorts:\n    - min: 80\n      max: 8080\n  privileged: false\n  # Required to prevent escalations to root.\n  allowPrivilegeEscalation: false\n  requiredDropCapabilities:\n    - ALL\n  # Allow core volume types.\n  volumes:\n    - 'configMap'\n    - 'emptyDir'\n    - 'projected'\n    - 'secret'\n    - 'downwardAPI'\n    # Assume that ephemeral CSI drivers & persistentVolumes set up by the cluster admin are safe to use.\n    - 'csi'\n    - 'persistentVolumeClaim'\n    - 'ephemeral'\n  runAsUser:\n    # Require the container to run without root privileges.\n    rule: 'MustRunAsNonRoot'\n  seLinux:\n    # This policy assumes the nodes are using AppArmor rather than SELinux.\n    rule: 'RunAsAny'\n  supplementalGroups:\n    rule: 'MustRunAs'\n    ranges:\n      # Forbid adding the root group.\n      - min: 1\n        max: 65535\n  fsGroup:\n    rule: 'MustRunAs'\n    ranges:\n      # Forbid adding the root group.\n      - min: 1\n        max: 65535\n  readOnlyRootFilesystem: true\n\n")),(0,i.kt)("p",null,"The equivalent Kubewarden policies can be applied directly to a cluster with\nKubewarden installed using the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},"$ ./psp-to-kubewarden | kubectl apply -f -\nWarning: policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+, unavailable in v1.25+\nWarning: policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+, unavailable in v1.25+\nclusteradmissionpolicy.policies.kubewarden.io/psp-privileged-82bf2 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-readonlyrootfilesystem-b4a55 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-hostnamespaces-a25a2 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-volumes-cee05 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-capabilities-34d8e created\nclusteradmissionpolicy.policies.kubewarden.io/psp-usergroup-878b0 created\nclusteradmissionpolicy.policies.kubewarden.io/psp-fsgroup-3b08e created\nclusteradmissionpolicy.policies.kubewarden.io/psp-defaultallowprivilegeescalation-b7e87 created\n")),(0,i.kt)("p",null,"If users want to inspect the policies before applying, it's possible to redirect\nthe content to a file or review it directly in the console"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-console"},'$ ./psp-to-kubewarden > policies.yaml\n$ cat policies.yaml\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-privileged-82bf2\nspec:\n  module: registry://ghcr.io/kubewarden/policies/pod-privileged:v0.1.10\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings: null\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-readonlyrootfilesystem-b4a55\nspec:\n  module: registry://ghcr.io/kubewarden/policies/readonly-root-filesystem-psp:v0.1.3\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings: null\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-hostnamespaces-a25a2\nspec:\n  module: registry://ghcr.io/kubewarden/policies/host-namespaces-psp:v0.1.2\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allow_host_ipc: false\n    allow_host_pid: false\n    allow_host_ports:\n      - max: 8080\n        min: 80\n    allow_host_network: false\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-volumes-cee05\nspec:\n  module: registry://ghcr.io/kubewarden/policies/volumes-psp:v0.1.6\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allowedTypes:\n      - configMap\n      - emptyDir\n      - projected\n      - secret\n      - downwardAPI\n      - csi\n      - persistentVolumeClaim\n      - ephemeral\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-capabilities-34d8e\nspec:\n  module: registry://ghcr.io/kubewarden/policies/capabilities-psp:v0.1.9\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    allowed_capabilities: []\n    required_drop_capabilities:\n      - ALL\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-usergroup-878b0\nspec:\n  module: registry://ghcr.io/kubewarden/policies/user-group-psp:v0.2.0\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    run_as_user:\n      rule: MustRunAsNonRoot\n    supplemental_groups:\n      ranges:\n        - max: 65535\n          min: 1\n      rule: MustRunAs\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-fsgroup-3b08e\nspec:\n  module: registry://ghcr.io/kubewarden/policies/allowed-fsgroups-psp:v0.1.4\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    ranges:\n      - max: 65535\n        min: 1\n    rule: MustRunAs\n\n---\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  name: psp-defaultallowprivilegeescalation-b7e87\nspec:\n  module: >-\n    registry://ghcr.io/kubewarden/policies/allow-privilege-escalation-psp:v0.1.11\n  rules:\n    - apiGroups:\n        - ""\n      apiVersions:\n        - v1\n      resources:\n        - pods\n      operations:\n        - CREATE\n        - UPDATE\n  mutating: false\n  settings:\n    default_allow_privilege_escalation: false\n\n')),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The policy names are generated by the PSP migration tool.\nYou may want to change the name to something more meaningful.")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This script works only in Linux x86_64 machines.")))}u.isMDXComponent=!0}}]);