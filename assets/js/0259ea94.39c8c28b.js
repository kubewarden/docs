"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[434],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var i=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,i,a=function(e,t){if(null==e)return{};var r,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)r=o[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=i.createContext({}),p=function(e){var t=i.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):n(n({},t),e)),r},l=function(e){var t=p(e.components);return i.createElement(c.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(r),m=a,d=u["".concat(c,".").concat(m)]||u[m]||h[m]||o;return r?i.createElement(d,n(n({ref:t},l),{},{components:r})):i.createElement(d,n({ref:t},l))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,n=new Array(o);n[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:a,n[1]=s;for(var p=2;p<o;p++)n[p]=r[p];return i.createElement.apply(null,n)}return i.createElement.apply(null,r)}m.displayName="MDXCreateElement"},457:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>n,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var i=r(7462),a=(r(7294),r(3905));const o={sidebar_label:"OCI registry support",title:"OCI registry support",description:"OCI registry support"},n=void 0,s={unversionedId:"distributing-policies/oci-registries-support",id:"version-1.8/distributing-policies/oci-registries-support",title:"OCI registry support",description:"OCI registry support",source:"@site/versioned_docs/version-1.8/distributing-policies/oci-registries-support.md",sourceDirName:"distributing-policies",slug:"/distributing-policies/oci-registries-support",permalink:"/distributing-policies/oci-registries-support",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.8/distributing-policies/oci-registries-support.md",tags:[],version:"1.8",lastUpdatedAt:1699005473,formattedLastUpdatedAt:"Nov 3, 2023",frontMatter:{sidebar_label:"OCI registry support",title:"OCI registry support",description:"OCI registry support"},sidebar:"docs",previous:{title:"Kubernetes Capabilities",permalink:"/writing-policies/spec/host-capabilities/kubernetes"},next:{title:"Threat Model",permalink:"/security/threat-model"}},c={},p=[{value:"Projects implementing OCI registries",id:"projects-implementing-oci-registries",level:2},{value:"Hosted OCI registries",id:"hosted-oci-registries",level:2},{value:"Tools that work with OCI registries",id:"tools-that-work-with-oci-registries",level:2},{value:"Known issues",id:"known-issues",level:2},{value:"Docker Hub",id:"docker-hub",level:3},{value:"JFrog",id:"jfrog",level:3}],l={toc:p},u="wrapper";function h(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,i.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Kubewarden policies are distributed as\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/opencontainers/artifacts"},"OCI Artifacts"),"\nusing regular Open Container Initiative (OCI) registries."),(0,a.kt)("p",null,"Policies are stored alongside container images.\nThey don't require extra setup or maintenance\nother than that needed for regular container images."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"You can add a registry that works with Kubewarden or\ncorrect any registry inaccuracies with a pull request against\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/docs/edit/main/docs/distributing-policies/oci-registries-support.md"},"this document"),"\nto fix it.")),(0,a.kt)("h2",{id:"projects-implementing-oci-registries"},"Projects implementing OCI registries"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://goharbor.io/"},"Harbor"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/distribution/distribution"},"Distribution")," (",(0,a.kt)("a",{parentName:"li",href:"https://github.com/distribution/distribution/releases/tag/v2.7.0"},">= 2.7.0"),")."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://access.redhat.com/products/red-hat-quay/"},"Quay"),": Supported, but ",(0,a.kt)("a",{parentName:"li",href:"https://access.redhat.com/documentation/en-us/red_hat_quay/3/html/use_red_hat_quay/oci-intro#other-oci-artifacts-with-quay"},"disabled by default in v3.6"),".")),(0,a.kt)("h2",{id:"hosted-oci-registries"},"Hosted OCI registries"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/container-registry/"},"GitHub Container Registry"),". See ",(0,a.kt)("a",{parentName:"li",href:"https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry"},"here"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://quay.io"},"Quay.io"),". See projects list above."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://aws.amazon.com/ecr/"},"Amazon ECR"),": See ",(0,a.kt)("a",{parentName:"li",href:"https://aws.amazon.com/blogs/containers/oci-artifact-support-in-amazon-ecr/"},"here"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://cloud.google.com/artifact-registry"},"Google Artifact Registry"),". See ",(0,a.kt)("a",{parentName:"li",href:"https://cloud.google.com/anthos-config-management/docs/how-to/sync-oci-artifacts-from-artifact-registry"},"here"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://azure.microsoft.com/en-us/products/container-registry/"},"Azure Container Registry"),". See ",(0,a.kt)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/azure/container-registry/container-registry-oci-artifacts"},"here"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://bundle.bar"},"Bundle Bar"),". See ",(0,a.kt)("a",{parentName:"li",href:"https://bundle.bar/docs/#open-container-initiative-oci"},"here"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://hub.docker.com/"},"Docker Hub"),". See ",(0,a.kt)("a",{parentName:"li",href:"https://docs.docker.com/docker-hub/oci-artifacts/"},"here"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://cloud.ibm.com/docs/Registry"},"IBM Cloud Container Registry"),". See ",(0,a.kt)("a",{parentName:"li",href:"https://cloud.ibm.com/docs/Registry?topic=Registry-registry_helm_charts"},"here"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://jfrog.com/artifactory/"},"JFrog Artifactory"),". See ",(0,a.kt)("a",{parentName:"li",href:"https://jfrog.com/help/r/jfrog-artifactory-documentation/docker-registry"},"here"),".")),(0,a.kt)("h2",{id:"tools-that-work-with-oci-registries"},"Tools that work with OCI registries"),(0,a.kt)("p",null,"We recommend:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/kwctl"},"Kwctl")," (our cli tool)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/containers/skopeo"},"Skopeo")," (",(0,a.kt)("a",{parentName:"li",href:"https://github.com/containers/skopeo/pull/1705"},">= 1.9.0"),")."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/google/go-containerregistry/blob/main/cmd/crane/README.md"},"Crane"),".")),(0,a.kt)("h2",{id:"known-issues"},"Known issues"),(0,a.kt)("h3",{id:"docker-hub"},"Docker Hub"),(0,a.kt)("p",null,"Currently, Docker Hub doesn't support OCI artifacts so can't be used to store Kubewarden policies.\nDocker Inc. has announced that Docker Hub will support OCI artifacts in the\n",(0,a.kt)("a",{parentName:"p",href:"https://www.docker.com/blog/announcing-docker-hub-oci-artifacts-support/"},"future"),"."),(0,a.kt)("h3",{id:"jfrog"},"JFrog"),(0,a.kt)("p",null,"Although JFrog supports OCI artifacts,\nit's only partially possible to push to it, when following their specification.\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/kubewarden/kwctl/issues/59"},"Read more here"),"."))}h.isMDXComponent=!0}}]);