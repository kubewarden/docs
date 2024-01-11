"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[3295],{95467:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var n=t(85893),a=t(11151);const s={sidebar_label:"Quickstart",title:""},r="Rancher UI Extension",l={id:"operator-manual/ui-extension/install",title:"",description:"This section describes how to install the Kubewarden UI as an extension of Rancher Manager.",source:"@site/versioned_docs/version-1.7/operator-manual/ui-extension/install.md",sourceDirName:"operator-manual/ui-extension",slug:"/operator-manual/ui-extension/install",permalink:"/1.7/operator-manual/ui-extension/install",draft:!1,unlisted:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.7/operator-manual/ui-extension/install.md",tags:[],version:"1.7",lastUpdatedAt:1704970011,formattedLastUpdatedAt:"Jan 11, 2024",frontMatter:{sidebar_label:"Quickstart",title:""},sidebar:"docs",previous:{title:"Verification Config",permalink:"/1.7/operator-manual/verification-config"},next:{title:"Monitoring",permalink:"/1.7/operator-manual/ui-extension/metrics"}},o={},c=[{value:"Install Kubewarden UI Extension",id:"install-kubewarden-ui-extension",level:2},{value:"Install Kubewarden",id:"install-kubewarden",level:3},{value:"Post-Installation",id:"post-installation",level:2},{value:"Enabling the default Policy Server and policies",id:"enabling-the-default-policy-server-and-policies",level:3},{value:"Creating Policies",id:"creating-policies",level:3},{value:"Additional Features",id:"additional-features",level:3}];function d(e){const i={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",strong:"strong",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h1,{id:"rancher-ui-extension",children:"Rancher UI Extension"}),"\n",(0,n.jsxs)(i.p,{children:["This section describes how to install the Kubewarden UI as an extension of ",(0,n.jsx)(i.a,{href:"https://github.com/rancher/rancher",children:"Rancher Manager"}),"."]}),"\n",(0,n.jsx)(i.admonition,{type:"caution",children:(0,n.jsxs)(i.p,{children:["This requires a running instance of Rancher Manager ",(0,n.jsx)(i.code,{children:"v2.7.0"})," or greater."]})}),"\n",(0,n.jsx)(i.h2,{id:"install-kubewarden-ui-extension",children:"Install Kubewarden UI Extension"}),"\n",(0,n.jsx)(i.p,{children:"The Kubewarden UI is installed as a global extension, however, the Kubewarden controller will be installed through the Rancher UI as a cluster scoped resource."}),"\n",(0,n.jsx)(i.p,{children:'Within the Extensions page, click on the "Enable" button and select the option to add the Rancher Extensions Repository, once enabled the "Kubewarden" extension item will appear automatically. Click on this item to install the extension. Once installed, you will then be able to install Kubewarden into your desired Cluster.'}),"\n",(0,n.jsx)(i.h3,{id:"install-kubewarden",children:"Install Kubewarden"}),"\n",(0,n.jsx)(i.p,{children:"Within your cluster a new menu item will appear in the side-menu for Kubewarden, this dashboard page will guide you through the installation process by completing some prerequisites."}),"\n",(0,n.jsx)(i.admonition,{type:"note",children:(0,n.jsx)(i.p,{children:'During the "App Install" step of the installation wizard, the "Install Kubewarden" button may remain grayed out. If this is the case, just refresh the page and navigate back to this step.'})}),"\n",(0,n.jsx)(i.h2,{id:"post-installation",children:"Post-Installation"}),"\n",(0,n.jsx)(i.p,{children:"After the installation is complete the dashboard page and side menu will contain new items, namely Policy Servers, Cluster Admission Policies, and Admission Policies. From here you can create Policy Servers and Policies to control behavior within your cluster."}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.em,{children:(0,n.jsx)(i.strong,{children:"Dashboard view"})}),"\n",(0,n.jsx)(i.img,{alt:"UI Dashboard",src:t(50515).Z+"",width:"1296",height:"872"})]}),"\n",(0,n.jsx)(i.h3,{id:"enabling-the-default-policy-server-and-policies",children:"Enabling the default Policy Server and policies"}),"\n",(0,n.jsxs)(i.p,{children:['Within the dashboard page you can follow the "Install Chart" button to install the ',(0,n.jsx)(i.a,{href:"https://github.com/kubewarden/helm-charts/tree/main/charts/kubewarden-defaults",children:(0,n.jsx)(i.code,{children:"kubewarden-defaults"})})," Helm chart, which includes the default Policy Server and a few currated policies."]}),"\n",(0,n.jsx)(i.p,{children:"After installing the chart you can view the default Policy Server details with the related policies in a sortable table."}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.em,{children:(0,n.jsx)(i.strong,{children:"Policy Server detail view"})}),"\n",(0,n.jsx)(i.img,{alt:"UI PolicyServer Detail",src:t(69614).Z+"",width:"1297",height:"872"})]}),"\n",(0,n.jsx)(i.h3,{id:"creating-policies",children:"Creating Policies"}),"\n",(0,n.jsx)(i.p,{children:'When creating policies you will initially be given a "Custom Policy" option from the Policy Grid. Provide the required information for your policy\'s Name, Module, and Rules.'}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.em,{children:(0,n.jsx)(i.strong,{children:"Creating a custom policy"})}),"\n",(0,n.jsx)(i.img,{alt:"UI Policy Whitelist",src:t(68170).Z+"",width:"1064",height:"621"})]}),"\n",(0,n.jsxs)(i.p,{children:["If you wish to leverage policies from ",(0,n.jsx)(i.a,{href:"https://artifacthub.io/packages/search?kind=13",children:"ArtifactHub"})," you will need to add ",(0,n.jsx)(i.code,{children:"artifacthub.io"})," to the ",(0,n.jsx)(i.code,{children:"management.cattle.io.settings/whitelist-domain"}),' setting. This allows your Rancher instance to retieve package information from ArtifactHub. Use the "Add ArtifactHub To Whitelist" button to automatically add the domain, the Policy Grid will refresh with the fetched policies.']}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.em,{children:(0,n.jsx)(i.strong,{children:"ArtifactHub whitelist banner"})}),"\n",(0,n.jsx)(i.img,{alt:"UI Policy Whitelist",src:t(20329).Z+"",width:"1064",height:"547"})]}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.em,{children:(0,n.jsx)(i.strong,{children:"Policy Grid"})}),"\n",(0,n.jsx)(i.img,{alt:"UI Policy Create",src:t(75379).Z+"",width:"1044",height:"770"})]}),"\n",(0,n.jsx)(i.h3,{id:"additional-features",children:"Additional Features"}),"\n",(0,n.jsxs)(i.p,{children:["For installing additional features, follow the instructions in these docs to include ",(0,n.jsx)(i.a,{href:"/1.7/operator-manual/ui-extension/metrics",children:"Metrics"})," or ",(0,n.jsx)(i.a,{href:"/1.7/operator-manual/ui-extension/tracing",children:"Tracing"}),"."]})]})}function h(e={}){const{wrapper:i}={...(0,a.a)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},50515:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t.p+"assets/images/ui_dashboard-489129d9a23bc2ee68a6599f2b718efc.png"},75379:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t.p+"assets/images/ui_policy_create-101744e29dec0f22f4aab58f9fe17eb4.png"},68170:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t.p+"assets/images/ui_policy_custom-8317c1b00a8abce560225581cfb2756f.png"},20329:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t.p+"assets/images/ui_policy_whitelist-66c6307489b7636e59bbbc5348d29d35.png"},69614:(e,i,t)=>{t.d(i,{Z:()=>n});const n=t.p+"assets/images/ui_policyserver_detail-c8fed6f264fd351f7ca84a0041239bd6.png"},11151:(e,i,t)=>{t.d(i,{Z:()=>l,a:()=>r});var n=t(67294);const a={},s=n.createContext(a);function r(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(s.Provider,{value:i},e.children)}}}]);