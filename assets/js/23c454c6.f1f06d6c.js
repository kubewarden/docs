"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[4202],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),h=r,m=d["".concat(l,".").concat(h)]||d[h]||p[h]||i;return n?a.createElement(m,o(o({ref:t},u),{},{components:n})):a.createElement(m,o({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},2224:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_label:"What's it?",title:"Audit Scanner"},o="Audit Scanner",s={unversionedId:"explanations/audit-scanner/audit-scanner",id:"explanations/audit-scanner/audit-scanner",title:"Audit Scanner",description:"The Audit Scanner feature is available starting from Kubewarden 1.7.0 release",source:"@site/docs/explanations/audit-scanner/audit-scanner.md",sourceDirName:"explanations/audit-scanner",slug:"/explanations/audit-scanner/",permalink:"/explanations/audit-scanner/",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/explanations/audit-scanner/audit-scanner.md",tags:[],version:"current",lastUpdatedAt:1695646327,formattedLastUpdatedAt:"Sep 25, 2023",frontMatter:{sidebar_label:"What's it?",title:"Audit Scanner"},sidebar:"docs",previous:{title:"Context aware policies",permalink:"/explanations/context-aware-policies"},next:{title:"Limitations",permalink:"/explanations/audit-scanner/limitations"}},l={},c=[{value:"Enable audit scanner",id:"enable-audit-scanner",level:2},{value:"Policies",id:"policies",level:2},{value:"Permissions and ServiceAccounts",id:"permissions-and-serviceaccounts",level:2}],u={toc:c},d="wrapper";function p(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"audit-scanner"},"Audit Scanner"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"The Audit Scanner feature is available starting from Kubewarden 1.7.0 release")),(0,r.kt)("p",null,"A component, called ",(0,r.kt)("inlineCode",{parentName:"p"},"audit-scanner"),", constantly checks the\nresources declared in the cluster, flagging the ones that do not adhere with\nthe deployed Kubewarden policies."),(0,r.kt)("p",null,"Policies evolve over time: new ones are deployed and the existing ones can be\nupdated, both in terms of version and configuration settings. This can lead to\nsituations where resources already inside of the cluster are no longer\ncompliant. The audit scanner feature provides Kubernetes administrators with a\ntool to consistently verify the compliance state of their clusters."),(0,r.kt)("p",null,"To illustrate the usage of the audit scanner in Kubewarden, let's consider the\nfollowing scenario."),(0,r.kt)("p",null,"Assume Bob is deploying a Wordpress Pod inside of the cluster. He's new to\nKubernetes, hence he makes a mistake and deploys this Pod running as a\nprivileged container. Since there's no policy preventing that, the Pod is\nsuccessfully created inside of the cluster."),(0,r.kt)("p",null,"Some days later, Alice, the Kubernetes administrator, enforces a Kubewarden\npolicy that prohibits the creation of privileged containers. The Pod deployed\nby Bob keeps running inside of the cluster."),(0,r.kt)("p",null,"However, thanks to the report generated by the audit scanner, Alice can\nquickly identify all the workloads that are violating her policies; including\nthe Wordpress Pod created by Bob."),(0,r.kt)("p",null,"To make that happens, audit scanner get all resources that should be audited,\nbuild a fake admission request with the resource's data and send it to the\npolicy server in a different endpoint exclusively used to audit requests.\nHowever, for the policy evaluating the request, there is no differences from a\nreal or an audit request. The data received are the same. Furthermore, this\npolicy server endpoint is instrumented to collect data of the evaluation as\nthe one used to validate request from the control plane. Therefore, users can\nuse their monitoring tools analyze this data as well."),(0,r.kt)("h2",{id:"enable-audit-scanner"},"Enable audit scanner"),(0,r.kt)("p",null,"As stated before, the audit scanner feature can be enabled starting from the\nKubewarden 1.7.0 release."),(0,r.kt)("p",null,"Detailed installation instructions can be found\n",(0,r.kt)("a",{parentName:"p",href:"../howtos/audit-scanner"},"here"),"."),(0,r.kt)("h2",{id:"policies"},"Policies"),(0,r.kt)("p",null,"By default, every policy is evaluated by the audit scanner. Operators that want\nto skip a policy evaluation in the Audit scanner should set the\n",(0,r.kt)("inlineCode",{parentName:"p"},"spec.backgroundAudit")," field to ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," inside of the policy definition.\nFurthermore, policies in Kubewarden now support two optional annotations:\n",(0,r.kt)("inlineCode",{parentName:"p"},"io.kubewarden.policy.severity")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"io.kubewarden.policy.category"),":"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"io.kubewarden.policy.severity")," annotation allows you to specify the\nseverity level of the policy violation, such as ",(0,r.kt)("inlineCode",{parentName:"li"},"critical"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"high"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"medium"),",\n",(0,r.kt)("inlineCode",{parentName:"li"},"low")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"info"),"."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("inlineCode",{parentName:"li"},"io.kubewarden.policy.category")," annotation allows you to categorize the\npolicy based on a specific domain or purpose, such as ",(0,r.kt)("inlineCode",{parentName:"li"},"PSP"),", ",(0,r.kt)("inlineCode",{parentName:"li"},"compliance"),", or\n",(0,r.kt)("inlineCode",{parentName:"li"},"performance"),".")),(0,r.kt)("p",null,"See the policy authors ",(0,r.kt)("a",{parentName:"p",href:"/writing-policies/"},"docs")," for more info."),(0,r.kt)("h2",{id:"permissions-and-serviceaccounts"},"Permissions and ServiceAccounts"),(0,r.kt)("p",null,"The audit scanner in Kubernetes requires specific RBAC configurations to be\nable to scan Kubernetes resources and save the results. A correct default Service\nAccount with those permissions is created during the installation. But the user\ncan provide their own ServiceAccount to fine tune access to resources."),(0,r.kt)("p",null,"The default audit scanner ",(0,r.kt)("inlineCode",{parentName:"p"},"ServiceAccount")," is bound to the ",(0,r.kt)("inlineCode",{parentName:"p"},"view")," ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterRole"),"\nprovided by Kubernetes. This ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterRole")," allows read-only access to a wide\nrange of Kubernetes resources within a namespace. You can find more details\nabout this role in the ",(0,r.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles"},"Kubernetes\ndocumentation"),"."),(0,r.kt)("p",null,"In addition, the audit scanner is also bound to a ",(0,r.kt)("inlineCode",{parentName:"p"},"ClusterRole")," that grants\nread access to Kubewarden resource types and read-write access to the\n",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyReport")," ",(0,r.kt)("a",{parentName:"p",href:"/explanations/audit-scanner/policy-reports"},"CRDs"),". These permissions enable the scanner\nto fetch resources for conducting audit evaluations and create policy reports\nbased on the evaluation results."))}p.isMDXComponent=!0}}]);