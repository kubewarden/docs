"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[48321],{82300:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"tutorials/publish-policy-to-artifact-hub","title":"Publish policies to Artifact Hub","description":"A brief introduction to publishing Kubewarden policies on Artifact Hub.","source":"@site/versioned_docs/version-1.23/tutorials/publish-policy-to-artifact-hub.md","sourceDirName":"tutorials","slug":"/tutorials/publish-policy-to-artifact-hub","permalink":"/tutorials/publish-policy-to-artifact-hub","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.23/tutorials/publish-policy-to-artifact-hub.md","tags":[],"version":"1.23","lastUpdatedAt":1744181680000,"sidebarPosition":40,"frontMatter":{"sidebar_label":"Publish to Artifact Hub","sidebar_position":40,"title":"Publish policies to Artifact Hub","description":"A brief introduction to publishing Kubewarden policies on Artifact Hub.","keywords":["kubewarden","kubernetes","publishing policies","artifact hub"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-policy-developer","kubewarden-distributor","kubewarden-integrator"],"doc-type":["tutorial"],"doc-topic":["distributing-policies","publish-policy-to-artifacthub"]},"sidebar":"docs","previous":{"title":"Verifying Kubewarden","permalink":"/tutorials/verifying-kubewarden"},"next":{"title":"Mutating policies","permalink":"/explanations/mutating-policies"}}');var n=i(74848),r=i(28453);const s={sidebar_label:"Publish to Artifact Hub",sidebar_position:40,title:"Publish policies to Artifact Hub",description:"A brief introduction to publishing Kubewarden policies on Artifact Hub.",keywords:["kubewarden","kubernetes","publishing policies","artifact hub"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-policy-developer","kubewarden-distributor","kubewarden-integrator"],"doc-type":["tutorial"],"doc-topic":["distributing-policies","publish-policy-to-artifacthub"]},a=void 0,c={},l=[{value:"Prepare your Git repository",id:"prepare-your-git-repository",level:2},{value:"Publishing Steps",id:"publishing-steps",level:2},{value:"Keeping Artifact Hub in Sync",id:"keeping-artifact-hub-in-sync",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",li:"li",p:"p",ul:"ul",...(0,r.R)(),...e.components},{Head:i}=t;return i||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{children:(0,n.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/tutorials/publish-policy-to-artifact-hub"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://artifacthub.io/",children:"Artifact Hub"})," is a website where users can find,\ninstall, and publish packages and configurations for ",(0,n.jsx)(t.a,{href:"https://cncf.io",children:"CNCF"})," projects."]}),"\n",(0,n.jsx)(t.p,{children:"Kubewarden policies can be published on Artifact Hub and made\ndiscoverable to the wide audience of CNCF users."}),"\n",(0,n.jsxs)(t.admonition,{type:"note",children:[(0,n.jsx)(t.p,{children:"Artifact Hub is a content aggregation platform and doesn't actually host the\nartifacts that are published on it."}),(0,n.jsxs)(t.p,{children:["Artifact Hub requires you to physically host container image repositories on a container\nregistry or a web server.\nRefer to the ",(0,n.jsx)(t.a,{href:"../explanations/distributing-policies",children:"distributing policies"})," section for more information on how to\nhost your policies."]})]}),"\n",(0,n.jsx)(t.p,{children:"This document focuses on the steps required to make a Kubewarden policy\ndiscoverable on Artifact Hub."}),"\n",(0,n.jsx)(t.h2,{id:"prepare-your-git-repository",children:"Prepare your Git repository"}),"\n",(0,n.jsx)(t.p,{children:"Artifact Hub crawls Git repositories looking for special metadata files."}),"\n",(0,n.jsxs)(t.p,{children:["There are different kind of layouts the Git repository can have. They\nare all documented in depth in the ",(0,n.jsx)(t.a,{href:"https://artifacthub.io/docs/topics/repositories/#kubewarden-policies-repositories",children:"official Artifact Hub documentation"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Artifact Hub is flexible and allows you to organize your code in these ways:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Have a Git repository dedicated to Artifact Hub: this repository will not contain\nany policy source code. It will be a collection of the YAML files required by\nArtifact Hub."}),"\n",(0,n.jsx)(t.li,{children:"Add a Artifact Hub directory in the Git repository holding the source\nof your policy. This is an iteration of the previous approach, focusing on just one policy,\nthat which is defined in the Git repository.\nThis approach allows keeping multiple versions of the policy published on Artifact Hub."}),"\n",(0,n.jsxs)(t.li,{children:["Add the ",(0,n.jsx)(t.code,{children:"artifacthub-pkg.yml"})," and the ",(0,n.jsx)(t.code,{children:"artifacthub-repo.yml"})," files to the root\nof the Git repository that holds the policy source code. This approach is the\nsimplest one. The only limitation is that only the latest version of the policy\nwill be visible on Artifact Hub."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["The last approach is used in our official policy templates. The\nGit repository that is scaffolded includes the ",(0,n.jsx)(t.code,{children:"artifacthub-repo.yml"})," file,\nand our GitHub Actions generate and push the ",(0,n.jsx)(t.code,{children:"artifacthub-pkg.yml"})," to an\n",(0,n.jsx)(t.code,{children:"artifacthub"})," branch for Artifact Hub to consume."]}),"\n",(0,n.jsx)(t.h2,{id:"publishing-steps",children:"Publishing Steps"}),"\n",(0,n.jsxs)(t.p,{children:["Before publishing a policy to Artifact Hub, you must create an account ",(0,n.jsx)(t.a,{href:"https://artifacthub.io/",children:"there"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Before publishing the policy, ensure your Git repository has the proper layout,\nwith a well formatted ",(0,n.jsx)(t.code,{children:"metadata.yml"})," with the obligatory annotations."]}),"\n",(0,n.jsxs)(t.p,{children:["If you want to do this manually, you can create the ",(0,n.jsx)(t.code,{children:"artifacthub-pkg.yml"})," file\nby doing a ",(0,n.jsx)(t.code,{children:"kwctl scaffold artifacthub"})," (with version ",(0,n.jsx)(t.code,{children:">= 1.23"}),"). This command\ntakes the ",(0,n.jsx)(t.code,{children:"metadata.yml"})," in the current path and outputs an\n",(0,n.jsx)(t.code,{children:"artifacthub-pkg.yml"}),". The ",(0,n.jsx)(t.code,{children:"artifacthub-pkg.yml"})," contains fields such as\n",(0,n.jsx)(t.code,{children:"version: "}),", ",(0,n.jsx)(t.code,{children:"createdAt: "}),", that need to match specific format, and be\nup-to-date. The format of the ",(0,n.jsx)(t.code,{children:"artifacthub-pkg.yml"})," is described\n",(0,n.jsx)(t.a,{href:"https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-pkg.yml",children:"here"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["If you use our GitHub Actions >= ",(0,n.jsx)(t.code,{children:"v4.0.0"}),", the release workflow can be\nconfigured with the input ",(0,n.jsx)(t.code,{children:"artifacthub: true"}),". If so configured, after a\nsuccessful release (after the policy has been successfully built, signed and\npushed), our GitHub Actions have a last job that generates the\n",(0,n.jsx)(t.code,{children:"artifacthub-pkg.yml"})," for you then commits, and pushes the changes to the\n",(0,n.jsx)(t.code,{children:"artifacthub"})," branch. The canonical files are always the ones in the ",(0,n.jsx)(t.code,{children:"main"}),"\nbranch. For the behaviour of previous releases of our GitHub Actions, see the\ndocs versions pre 1.23."]}),"\n",(0,n.jsx)(t.p,{children:"Finally, ensure your policy is published inside of a container registry or on a\nweb server."}),"\n",(0,n.jsx)(t.admonition,{type:"note",children:(0,n.jsxs)(t.p,{children:["Right now the contents of the ",(0,n.jsx)(t.code,{children:"artifacthub-repo.yml"})," file are not relevant."]})}),"\n",(0,n.jsxs)(t.p,{children:["Once everything is in place, log into Artifact Hub and go to your\n",(0,n.jsx)(t.a,{href:"https://artifacthub.io/control-panel/repositories?page=1",children:"control plane"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Decide whether you want to publish the policy as a user or under an Artifact Hub\norganization you belong to. This is done by choosing the correct ",(0,n.jsx)(t.em,{children:'"control panel context"'}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Then press the ",(0,n.jsx)(t.em,{children:'"Add"'})," button and fill the form:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Choose ",(0,n.jsx)(t.em,{children:'"Kubewarden policies"'})," as kind."]}),"\n",(0,n.jsxs)(t.li,{children:["Enter a ",(0,n.jsx)(t.em,{children:'"Name"'})," and ",(0,n.jsx)(t.em,{children:'"Display name"'})," of your choice."]}),"\n",(0,n.jsx)(t.li,{children:"Enter the URL to your Git repository."}),"\n",(0,n.jsxs)(t.li,{children:["Enter ",(0,n.jsx)(t.code,{children:"artifacthub"})," as the branch to track."]}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Finally, press the ",(0,n.jsx)(t.em,{children:'"Add"'})," button. This will bring you back to the ",(0,n.jsx)(t.em,{children:'"Repositories"'}),"\npage, where you will see your freshly created repository."]}),"\n",(0,n.jsxs)(t.p,{children:["Each repository has several information fields. Find the ",(0,n.jsx)(t.em,{children:'"ID"'})," property of the\nrepository you just created and copy it."]}),"\n",(0,n.jsxs)(t.p,{children:["Go back to your Git repository and edit the ",(0,n.jsx)(t.code,{children:"artifacthub-repo.yml"}),". Ensure the\n",(0,n.jsx)(t.code,{children:"repositoryID"})," key found inside of the document has the value you just copied from the\nArtifact Hub web page."]}),"\n",(0,n.jsxs)(t.admonition,{type:"tip",children:[(0,n.jsxs)(t.p,{children:["The format of the ",(0,n.jsx)(t.code,{children:"artifacthub-repo.yml"})," file is defined\n",(0,n.jsx)(t.a,{href:"https://github.com/artifacthub/hub/blob/master/docs/metadata/artifacthub-repo.yml",children:"here"}),"."]}),(0,n.jsx)(t.p,{children:"Now it's a good time to do some further customizations to this file."})]}),"\n",(0,n.jsxs)(t.p,{children:["Once you are done with the changes, commit the updated ",(0,n.jsx)(t.code,{children:"artifacthub-repo.yml"}),"\nfile and push it. During the next scan, Artifact Hub will find this file and\nit will add the\n",(0,n.jsxs)(t.a,{href:"https://artifacthub.io/docs/topics/repositories/#verified-publisher",children:[(0,n.jsx)(t.em,{children:'"Verified Publisher"'})," badge"]}),"\nto you Artifact Hub repository."]}),"\n",(0,n.jsx)(t.h2,{id:"keeping-artifact-hub-in-sync",children:"Keeping Artifact Hub in Sync"}),"\n",(0,n.jsxs)(t.p,{children:["Do not forget to update the contents of the ",(0,n.jsx)(t.code,{children:"metadata.yml"})," file\nevery time you release a new version of your policy. For example,\nyou must update the ",(0,n.jsx)(t.code,{children:"io.kubewarden.policy.version"})," field (which usually matches\nthe policy OCI tag), and any other annotation you wish to change."]}),"\n",(0,n.jsx)(t.admonition,{type:"note",children:(0,n.jsxs)(t.p,{children:["The contents of the ",(0,n.jsx)(t.code,{children:"artifacthub-repo.yml"})," file do not need to be changed."]})})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,t,i)=>{i.d(t,{R:()=>s,x:()=>a});var o=i(96540);const n={},r=o.createContext(n);function s(e){const t=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),o.createElement(r.Provider,{value:t},e.children)}}}]);