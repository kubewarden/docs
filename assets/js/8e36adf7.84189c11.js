"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[7958],{4645:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var r=t(85893),a=t(11151);const o={sidebar_label:"Rancher Fleet",title:""},i="Managing Kubewarden with Rancher Fleet",l={id:"operator-manual/Rancher-Fleet",title:"",description:"The Kubewarden Helm charts, like other Helm charts, can be managed via [Rancher",source:"@site/versioned_docs/version-1.7/operator-manual/Rancher-Fleet.md",sourceDirName:"operator-manual",slug:"/operator-manual/Rancher-Fleet",permalink:"/1.7/operator-manual/Rancher-Fleet",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/operator-manual/Rancher-Fleet.md",tags:[],version:"1.7",lastUpdatedAt:1727179539e3,frontMatter:{sidebar_label:"Rancher Fleet",title:""},sidebar:"docs",previous:{title:"Monitor Mode",permalink:"/1.7/operator-manual/monitor-mode"},next:{title:"Policy evaluation timeout",permalink:"/1.7/operator-manual/policy-evaluation-timeout"}},s={},d=[{value:"Installing",id:"installing",level:3},{value:"Removing",id:"removing",level:3},{value:"Example",id:"example",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"managing-kubewarden-with-rancher-fleet",children:"Managing Kubewarden with Rancher Fleet"})}),"\n",(0,r.jsxs)(n.p,{children:["The Kubewarden Helm charts, like other Helm charts, can be managed via ",(0,r.jsx)(n.a,{href:"https://fleet.rancher.io/",children:"Rancher\nFleet"}),". Rancher Fleet uses Kubernetes CRDs to define\na GitOps approach for managing Kubernetes clusters. It does this by defining\nFleet Bundles."]}),"\n",(0,r.jsx)(n.h3,{id:"installing",children:"Installing"}),"\n",(0,r.jsxs)(n.p,{children:["The Kubewarden charts are normal charts, they have dependencies (such as\n",(0,r.jsx)(n.code,{children:"cert-manager"}),"), and depend transitively on each other (",(0,r.jsx)(n.code,{children:"kubewarden-crds"})," \u2190\n",(0,r.jsx)(n.code,{children:"kubewarden-controller"})," \u2190 ",(0,r.jsx)(n.code,{children:"kubewarden-defaults"}),", see the ",(0,r.jsx)(n.a,{href:"https://docs.kubewarden.io/quick-start",children:"Quickstart\ndocs"}),")."]}),"\n",(0,r.jsxs)(n.p,{children:["On Rancher Fleet, one can codify the chart dependencies using\n",(0,r.jsx)(n.code,{children:"dependsOn"})," in the ",(0,r.jsxs)(n.a,{href:"https://fleet.rancher.io/gitrepo-structure#fleetyaml",children:[(0,r.jsx)(n.em,{children:"fleet.yaml"})," file"]}),"."]}),"\n",(0,r.jsx)(n.p,{children:"At the time of writing and by how Rancher Fleet works, one may see transient\nerrors until the charts are ready, such as:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ErrApplied(1) [Cluster fleet-local/local: dependent bundle(s) are not ready:\n[kubewarden-example-helm-kubewarden-controller]]\n"})}),"\n",(0,r.jsx)(n.p,{children:"These errors don't signify a problem, and once each chart has finished\ndeploying, they will be gone."}),"\n",(0,r.jsx)(n.h3,{id:"removing",children:"Removing"}),"\n",(0,r.jsxs)(n.admonition,{type:"caution",children:[(0,r.jsxs)(n.p,{children:["When blindly removing the GitRepo, all 3 Kubewarden charts get removed at once.\nThis means the ",(0,r.jsx)(n.code,{children:"kubewarden-crds"})," chart gets removed."]}),(0,r.jsxs)(n.p,{children:["Kubewarden uses a pre-delete helm hook job in ",(0,r.jsx)(n.code,{children:"kubewarden-controller"})," chart that\ndeletes the default policy-server. This pre-delete hook is needed because we\nneed to vacate the webhooks of the policies (this is true any Policy Engine)\nbefore deleting the PolicyServer. If not, the cluster will have webhooks for\npolicies that don't exist anymore, rejecting everything and being in a\nfailed state."]}),(0,r.jsxs)(n.p,{children:["Removing the GitRepo and hence the ",(0,r.jsx)(n.code,{children:"kubewarden-crds"})," chart at the same time as\nthe ",(0,r.jsx)(n.code,{children:"kubewarden-controller"})," chart will make the pre-delete hook job to fail, and\nthe removal to be incomplete, leaving leftovers in the cluster."]})]}),"\n",(0,r.jsx)(n.p,{children:"Uninstalling CRDs automatically is normally not supported in any tooling, and\nRancher Fleet is no exception."}),"\n",(0,r.jsxs)(n.p,{children:["If you want to perform a correct removal, make sure to remove first the Bundle\nfor ",(0,r.jsx)(n.code,{children:"kubewarden-defaults"})," from the cluster by commiting those changes to the\nrepo holding the Fleet configuration and waiting for it being applied. Then\n",(0,r.jsx)(n.code,{children:"kubewarden-controller"})," in the same way, and last, ",(0,r.jsx)(n.code,{children:"kubewarden-crds"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Another option is to add 2 GitRepos, one for the CRDs only, and another for the\nrest of the Kubewarden charts. This way you can remove the Kubewarden charts\nfirst and the Kubewarden CRDs last."}),"\n",(0,r.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,r.jsxs)(n.p,{children:["Have a look at ",(0,r.jsx)(n.a,{href:"https://github.com/kubewarden/fleet-example",children:"github.com/kubewarden/fleet-example"}),"\nfor an example of Fleet Bundle definitions."]})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>i});var r=t(67294);const a={},o=r.createContext(a);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);