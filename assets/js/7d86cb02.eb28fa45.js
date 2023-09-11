"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[8715],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=p(n),h=a,m=s["".concat(c,".").concat(h)]||s[h]||u[h]||o;return n?r.createElement(m,l(l({ref:t},d),{},{components:n})):r.createElement(m,l({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=h;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[s]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6444:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_label:"Rancher Fleet",title:""},l="Managing Kubewarden with Rancher Fleet",i={unversionedId:"operator-manual/Rancher-Fleet",id:"operator-manual/Rancher-Fleet",title:"",description:"The Kubewarden Helm charts, like other Helm charts, can be managed via [Rancher",source:"@site/docs/operator-manual/Rancher-Fleet.md",sourceDirName:"operator-manual",slug:"/operator-manual/Rancher-Fleet",permalink:"/operator-manual/Rancher-Fleet",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/operator-manual/Rancher-Fleet.md",tags:[],version:"current",lastUpdatedAt:1694442853,formattedLastUpdatedAt:"Sep 11, 2023",frontMatter:{sidebar_label:"Rancher Fleet",title:""},sidebar:"docs",previous:{title:"Monitor Mode",permalink:"/operator-manual/monitor-mode"},next:{title:"Policy evaluation timeout",permalink:"/operator-manual/policy-evaluation-timeout"}},c={},p=[{value:"Installing",id:"installing",level:3},{value:"Removing",id:"removing",level:3},{value:"Example",id:"example",level:3}],d={toc:p},s="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"managing-kubewarden-with-rancher-fleet"},"Managing Kubewarden with Rancher Fleet"),(0,a.kt)("p",null,"The Kubewarden Helm charts, like other Helm charts, can be managed via ",(0,a.kt)("a",{parentName:"p",href:"https://fleet.rancher.io/"},"Rancher\nFleet"),". Rancher Fleet uses Kubernetes CRDs to define\na GitOps approach for managing Kubernetes clusters. It does this by defining\nFleet Bundles."),(0,a.kt)("h3",{id:"installing"},"Installing"),(0,a.kt)("p",null,"The Kubewarden charts are normal charts, they have dependencies (such as\n",(0,a.kt)("inlineCode",{parentName:"p"},"cert-manager"),"), and depend transitively on each other (",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-crds")," <-\n",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," <- ",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults"),", see the ",(0,a.kt)("a",{parentName:"p",href:"https://docs.kubewarden.io/quick-start"},"Quickstart\ndocs"),")."),(0,a.kt)("p",null,"On Rancher Fleet, one can codify the chart dependencies using\n",(0,a.kt)("inlineCode",{parentName:"p"},"dependsOn")," in the ",(0,a.kt)("a",{parentName:"p",href:"https://fleet.rancher.io/gitrepo-structure#fleetyaml"},(0,a.kt)("em",{parentName:"a"},"fleet.yaml")," file"),"."),(0,a.kt)("p",null,"At the time of writing and by how Rancher Fleet works, one may see transient\nerrors until the charts are ready, such as:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"ErrApplied(1) [Cluster fleet-local/local: dependent bundle(s) are not ready:\n[kubewarden-example-helm-kubewarden-controller]]\n")),(0,a.kt)("p",null,"These errors don't signify a problem, and once each chart has finished\ndeploying, they will be gone."),(0,a.kt)("h3",{id:"removing"},"Removing"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"When blindly removing the GitRepo, all 3 Kubewarden charts get removed at once.\nThis means the ",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-crds")," chart gets removed."),(0,a.kt)("p",{parentName:"admonition"},"Kubewarden uses a pre-delete helm hook job in ",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," chart that\ndeletes the default policy-server. This pre-delete hook is needed because we\nneed to vacate the webhooks of the policies (this is true any Policy Engine)\nbefore deleting the PolicyServer. If not, the cluster will have webhooks for\npolicies that don't exist anymore, rejecting everything and being in a\nfailed state."),(0,a.kt)("p",{parentName:"admonition"},"Removing the GitRepo and hence the ",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-crds")," chart at the same time as\nthe ",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," chart will make the pre-delete hook job to fail, and\nthe removal to be incomplete, leaving leftovers in the cluster.")),(0,a.kt)("p",null,"Uninstalling CRDs automatically is normally not supported in any tooling, and\nRancher Fleet is no exception."),(0,a.kt)("p",null,"If you want to perform a correct removal, make sure to remove first the Bundle\nfor ",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-defaults")," from the cluster by commiting those changes to the\nrepo holding the Fleet configuration and waiting for it being applied. Then\n",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-controller")," in the same way, and last, ",(0,a.kt)("inlineCode",{parentName:"p"},"kubewarden-crds"),"."),(0,a.kt)("p",null,"Another option is to add 2 GitRepos, one for the CRDs only, and another for the\nrest of the Kubewarden charts. This way you can remove the Kubewarden charts\nfirst and the Kubewarden CRDs last."),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("p",null,"Have a look at ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/fleet-example"},"github.com/kubewarden/fleet-example"),"\nfor an example of Fleet Bundle definitions."))}u.isMDXComponent=!0}}]);