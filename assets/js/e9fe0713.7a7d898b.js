"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[6042],{3905:(e,t,i)=>{i.d(t,{Zo:()=>u,kt:()=>f});var a=i(7294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t){if(null==e)return{};var i,a,n=function(e,t){if(null==e)return{};var i,a,n={},r=Object.keys(e);for(a=0;a<r.length;a++)i=r[a],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)i=r[a],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var p=a.createContext({}),s=function(e){var t=a.useContext(p),i=t;return e&&(i="function"==typeof e?e(t):o(o({},t),e)),i},u=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var i=e.components,n=e.mdxType,r=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(i),d=n,f=c["".concat(p,".").concat(d)]||c[d]||h[d]||r;return i?a.createElement(f,o(o({ref:t},u),{},{components:i})):a.createElement(f,o({ref:t},u))}));function f(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=i.length,o=new Array(r);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:n,o[1]=l;for(var s=2;s<r;s++)o[s]=i[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,i)}d.displayName="MDXCreateElement"},3836:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var a=i(7462),n=(i(7294),i(3905));const r={sidebar_label:"Publish to Artifact Hub",title:""},o="Publish Policies to Artifact Hub",l={unversionedId:"distributing-policies/publish-policy-to-artifact-hub",id:"distributing-policies/publish-policy-to-artifact-hub",title:"",description:"Artifact Hub is a website where users can find,",source:"@site/docs/distributing-policies/publish-policy-to-artifact-hub.md",sourceDirName:"distributing-policies",slug:"/distributing-policies/publish-policy-to-artifact-hub",permalink:"/distributing-policies/publish-policy-to-artifact-hub",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/distributing-policies/publish-policy-to-artifact-hub.md",tags:[],version:"current",lastUpdatedAt:1697189955,formattedLastUpdatedAt:"Oct 13, 2023",frontMatter:{sidebar_label:"Publish to Artifact Hub",title:""},sidebar:"docs",previous:{title:"Cluster operators",permalink:"/testing-policies/cluster-operators"},next:{title:"Verifying Kubewarden",permalink:"/security/verifying-kubewarden"}},p={},s=[{value:"Prepare your Git repository",id:"prepare-your-git-repository",level:2},{value:"Publishing Steps",id:"publishing-steps",level:2},{value:"Keeping Artifact Hub in Sync",id:"keeping-artifact-hub-in-sync",level:2}],u={toc:s},c="wrapper";function h(e){let{components:t,...i}=e;return(0,n.kt)(c,(0,a.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"publish-policies-to-artifact-hub"},"Publish Policies to Artifact Hub"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://artifacthub.io/"},"Artifact Hub")," is a website where users can find,\ninstall, and publish packages and configurations for ",(0,n.kt)("a",{parentName:"p",href:"https://cncf.io"},"CNCF")," projects."),(0,n.kt)("p",null,"Kubewarden policies can be published on Artifact Hub and made\ndiscoverable to the wide audience of CNCF users."),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},"Artifact Hub is a content aggregation platform and doesn't actually host the\nartifacts that are published on it."),(0,n.kt)("p",{parentName:"admonition"},"Artifact Hub requires you to physically host container image repositories on a container\nregistry or a web server.\nRefer to the ",(0,n.kt)("em",{parentName:"p"},'"',(0,n.kt)("a",{parentName:"em",href:"../distributing-policies"},"distributing policies"),'"')," section for more information on how to\nhost your policies.")),(0,n.kt)("p",null,"This document focuses on the steps required to make a Kubewarden policy\ndiscoverable on Artifact Hub."),(0,n.kt)("h2",{id:"prepare-your-git-repository"},"Prepare your Git repository"),(0,n.kt)("p",null,"Artifact Hub crawls Git repositories looking for special metadata files."),(0,n.kt)("p",null,"There are different kind of layouts the Git repository can have. They\nare all documented in depth in the ",(0,n.kt)("a",{parentName:"p",href:"https://artifacthub.io/docs/topics/repositories/#kubewarden-policies-repositories"},"official Artifact Hub documentation"),"."),(0,n.kt)("p",null,"Artifact Hub is pretty flexible and allows you to organize your code in these ways:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Have a Git repository dedicated to Artifact Hub: this repository will not contain\nany policy source code. It will be a collection of the YAML files required by\nArtifact Hub."),(0,n.kt)("li",{parentName:"ul"},"Add a Artifact Hub directory inside of the Git repository that holds the source\nof your policy. This is an iteration of the previous approach, the only difference\nis that it focuses just on one policy: the one defined inside of the Git repository.\nThis approach allows to keep multiple versions of the policy published on Artifact Hub."),(0,n.kt)("li",{parentName:"ul"},"Add the ",(0,n.kt)("inlineCode",{parentName:"li"},"artifacthub-pkg.yml")," and the ",(0,n.kt)("inlineCode",{parentName:"li"},"artifacthub-repo.yml")," files to the root\nof the Git repository that holds the policy source code. This approach is the\nsimplest one. The only limitation is that only the latest version of the policy\nwill be visible on Artifact Hub.")),(0,n.kt)("p",null,"The last approach is what we used inside of our official policy templates.\nThe Git repository that is scaffolded includes the ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-pkg.yml"),"\nand ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-repo.yml")," files."),(0,n.kt)("h2",{id:"publishing-steps"},"Publishing Steps"),(0,n.kt)("p",null,"Before publishing a policy to Artifact Hub, you must create an account on\nthe ",(0,n.kt)("a",{parentName:"p",href:"https://artifacthub.io/"},"website"),"."),(0,n.kt)("p",null,"Before publishing the policy, ensure your Git repository has the proper layout.\nThe ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-pkg.yml")," contains fields such as ",(0,n.kt)("inlineCode",{parentName:"p"},"version: "),", ",(0,n.kt)("inlineCode",{parentName:"p"},"createdAt: "),",\nthat need to match specific format, and be up-to-date. The format of the\n",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-pkg.yml")," is described\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-pkg.yml"},"here"),"."),(0,n.kt)("p",null,"If you created the policy using one of our templates, then you have a ",(0,n.kt)("inlineCode",{parentName:"p"},"make\nartifacthub-pkg.yml")," target. Execute that target to generate the\n",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-pkg.yml")," file programmatically from ",(0,n.kt)("inlineCode",{parentName:"p"},"metadata.yml")," and other\ninputs. This target gets called as part as a normal build of a policy, so\nyour task is to commit the resulting changes to ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-pkg.yml"),"."),(0,n.kt)("p",null,"The policy templates make use of our GitHub Actions at\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/github-actions"},"github.com/kubewarden/github-actions"),":"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"If you are using our GitHub Actions >= ",(0,n.kt)("inlineCode",{parentName:"li"},"v3.1.0"),", the workflows provide by\ndefault automated checking of the ",(0,n.kt)("inlineCode",{parentName:"li"},"artifacthub-pkg.yml")," file."),(0,n.kt)("li",{parentName:"ul"},"After a successful release, that is, after the policy has been successfully\nbuilt, signed, and pushed, our GitHub Actions have a last job that pushes the\nfiles needed by Artifact Hub to an orphan ",(0,n.kt)("inlineCode",{parentName:"li"},"artifacthub")," branch. The canonical\nfiles are always the ones in the ",(0,n.kt)("inlineCode",{parentName:"li"},"main")," branch, and the GHA job overwrites the\nones in ",(0,n.kt)("inlineCode",{parentName:"li"},"artifacthub")," branch every time.")),(0,n.kt)("p",null,"Finally, ensure your policy is published inside of a container registry or on a\nweb server."),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},"Right now the contents of the ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-repo.yml")," file are not relevant.")),(0,n.kt)("p",null,"Once everything is in place, log into Artifact Hub and go to your\n",(0,n.kt)("a",{parentName:"p",href:"https://artifacthub.io/control-panel/repositories?page=1"},"control plane"),"."),(0,n.kt)("p",null,"Decide whether you want to publish the policy as a user or under an Artifact Hub\norganization you belong to. This is done by choosing the correct ",(0,n.kt)("em",{parentName:"p"},'"control panel context"'),"."),(0,n.kt)("p",null,"Then press the ",(0,n.kt)("em",{parentName:"p"},'"Add"')," button and fill the form:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Choose ",(0,n.kt)("em",{parentName:"li"},'"Kubewarden policies"')," as kind."),(0,n.kt)("li",{parentName:"ul"},"Enter a ",(0,n.kt)("em",{parentName:"li"},'"Name"')," and ",(0,n.kt)("em",{parentName:"li"},'"Display name"')," of your choice."),(0,n.kt)("li",{parentName:"ul"},"Enter the URL to your Git repository."),(0,n.kt)("li",{parentName:"ul"},"Enter ",(0,n.kt)("inlineCode",{parentName:"li"},"artifacthub")," as the branch to track.")),(0,n.kt)("p",null,"Finally, press the ",(0,n.kt)("em",{parentName:"p"},'"Add"')," button. This will bring you back to the ",(0,n.kt)("em",{parentName:"p"},'"Repositories"'),"\npage, where you will see your freshly created repository."),(0,n.kt)("p",null,"Each repository has several information fields. Find the ",(0,n.kt)("em",{parentName:"p"},'"ID"')," property of the\nrepository you just created and copy it."),(0,n.kt)("p",null,"Go back to your Git repository and edit the ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-repo.yml"),". Ensure the\n",(0,n.kt)("inlineCode",{parentName:"p"},"repositoryID")," key found inside of the document has the value you just copied from the\nArtifact Hub web page."),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"The format of the ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-repo.yml")," file is defined\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-repo.yml"},"here"),"."),(0,n.kt)("p",{parentName:"admonition"},"Now it's a good time to do some further customizations to this file.")),(0,n.kt)("p",null,"Once you are done with the changes, commit the updated ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-repo.yml"),"\nfile and push it. During the next scan, Artifact Hub will find this file and\nit will add the\n",(0,n.kt)("a",{parentName:"p",href:"https://artifacthub.io/docs/topics/repositories/#verified-publisher"},(0,n.kt)("em",{parentName:"a"},'"Verified Publisher"')," badge"),"\nto you Artifact Hub repository."),(0,n.kt)("h2",{id:"keeping-artifact-hub-in-sync"},"Keeping Artifact Hub in Sync"),(0,n.kt)("p",null,"Do not forget to update the contents of the ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-pkg.yml")," file\nevery time you release a new version of your policy."),(0,n.kt)("admonition",{type:"note"},(0,n.kt)("p",{parentName:"admonition"},"The contents of the ",(0,n.kt)("inlineCode",{parentName:"p"},"artifacthub-repo.yml")," file do not need to be changed.")))}h.isMDXComponent=!0}}]);