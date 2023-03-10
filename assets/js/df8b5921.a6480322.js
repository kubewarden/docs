"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[6973],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(a),m=r,k=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return a?n.createElement(k,l(l({ref:t},u),{},{components:a})):n.createElement(k,l({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7931:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(3117),r=(a(7294),a(3905));const i={sidebar_label:"Installation",title:""},l="Air gap installation",o={unversionedId:"operator-manual/airgap/install",id:"operator-manual/airgap/install",title:"",description:"This guide will show you how to install Kubewarden in air-gapped environments. In an air-gapped installation of Kubewarden,",source:"@site/docs/operator-manual/airgap/02-install.md",sourceDirName:"operator-manual/airgap",slug:"/operator-manual/airgap/install",permalink:"/operator-manual/airgap/install",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/operator-manual/airgap/02-install.md",tags:[],version:"current",lastUpdatedAt:1678467303,formattedLastUpdatedAt:"Mar 10, 2023",sidebarPosition:2,frontMatter:{sidebar_label:"Installation",title:""},sidebar:"docs",previous:{title:"Requirements",permalink:"/operator-manual/airgap/requirements"},next:{title:"Architecture",permalink:"/architecture"}},s={},p=[{value:"Save container images in your workstation",id:"save-container-images-in-your-workstation",level:2},{value:"Save policies in your workstation",id:"save-policies-in-your-workstation",level:2},{value:"Helm charts",id:"helm-charts",level:2},{value:"Populate private registry",id:"populate-private-registry",level:2},{value:"Install Kubewarden",id:"install-kubewarden",level:2}],u={toc:p};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"air-gap-installation"},"Air gap installation"),(0,r.kt)("p",null,"This guide will show you how to install Kubewarden in air-gapped environments. In an air-gapped installation of Kubewarden,\nyou will need a private OCI registry accessible by your Kubernetes cluster. Kubewarden Policies\nare WebAssembly modules; therefore, they can be stored inside an OCI-compliant registry as OCI artifacts.\nYou need to add Kubewarden's images and policies to this OCI registry. Let's see how to do that."),(0,r.kt)("h2",{id:"save-container-images-in-your-workstation"},"Save container images in your workstation"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Download ",(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-images.txt")," from the Kubewarden ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/helm-charts/releases/"},"release page"),". Alternatively, the ",(0,r.kt)("inlineCode",{parentName:"li"},"imagelist.txt")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"policylist.txt")," files are shipped inside the helm charts containing the used container images and policy wasm modules, respectively.",(0,r.kt)("admonition",{parentName:"li",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Optionally, you can verify the signatures of the ",(0,r.kt)("a",{parentName:"p",href:"../../security/verifying-kubewarden#helm-charts"},"helm charts")," and ",(0,r.kt)("a",{parentName:"p",href:"../../security/verifying-kubewarden#container-images"},"container images")))),(0,r.kt)("li",{parentName:"ol"},"Add ",(0,r.kt)("inlineCode",{parentName:"li"},"cert-manager")," if it is not available in your private registry. ")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"helm repo add jetstack https://charts.jetstack.io\nhelm repo update\nhelm pull jetstack/cert-manager\nhelm template ./cert-manager-<Version>.tgz | \\\n  awk '$1 ~ /image:/ {print $2}' | sed s/\\\"//g >> ./kubewarden-images.txt\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Download ",(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-save-images.sh")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-load-images.sh")," from the latest kwctl ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/kwctl/releases"},"release"),"."),(0,r.kt)("li",{parentName:"ol"},"Save Kubewarden container images into a .tar.gz file:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./kubewarden-save-images.sh \\\n  --image-list ./kubewarden-images.txt \\\n  --images kubewarden-images.tar.gz\n")),(0,r.kt)("p",null,"Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes.\nWhen the process completes, your current directory will output a tarball named ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-images.tar.gz"),". It will be present in the same directory where you executed the command."),(0,r.kt)("h2",{id:"save-policies-in-your-workstation"},"Save policies in your workstation"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Add all the policies you want to use in a ",(0,r.kt)("inlineCode",{parentName:"li"},"policies.txt")," file. A file with a list of the default policies can be found in the Kubewarden defaults ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/helm-charts/releases/"},"release page")),(0,r.kt)("li",{parentName:"ol"},"Download ",(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-save-policies.sh")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"kubewarden-load-policies.sh")," from the ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/kubewarden/kwctl/tree/main/scripts"},"kwctl repository")),(0,r.kt)("li",{parentName:"ol"},"Save policies into a .tar.gz file:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./kubewarden-save-policies.sh --policies-list policies.txt\n")),(0,r.kt)("p",null,"kwctl downloads all the policies and stores them as ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-policies.tar.gz")," archive."),(0,r.kt)("h2",{id:"helm-charts"},"Helm charts"),(0,r.kt)("p",null,"You need to download the following helm charts in your workstation:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"helm pull kubewarden/kubewarden-crds         \nhelm pull kubewarden/kubewarden-controller\nhelm pull kubewarden/kubewarden-defaults  \n")),(0,r.kt)("p",null,"Download ",(0,r.kt)("inlineCode",{parentName:"p"},"cert-manager")," if it is not installed in the air gap cluster."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"helm pull jetstack/cert-manager\n")),(0,r.kt)("h2",{id:"populate-private-registry"},"Populate private registry"),(0,r.kt)("p",null,"Move ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-policies.tar.gz"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-images.tar.gz"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-load-images.sh"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-load-policies.sh")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"policies.txt"),"\nto the air gap environment."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Load Kubewarden images into the private registry. Docker client must be authenticated against the local registry")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./kubewarden-load-images.sh \\\n  --image-list ./kubewarden-images.txt \\\n  --images kubewarden-images.tar.gz \\\n  --registry <REGISTRY.YOURDOMAIN.COM:PORT>\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Load Kubewarden policies into the private registry. Kwctl must be authenticated against the local registry (",(0,r.kt)("inlineCode",{parentName:"li"},"kwctl")," uses the same mechanism to authenticate as ",(0,r.kt)("inlineCode",{parentName:"li"},"docker"),", a ",(0,r.kt)("inlineCode",{parentName:"li"},"~/.docker/config.json")," file)  ")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./kubewarden-load-policies.sh \\\n  --policies-list policies.txt \\\n  --policies kubewarden-policies.tar.gz \\\n  --registry <REGISTRY.YOURDOMAIN.COM:PORT> \\\n  --sources-path sources.yml \n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"sources.yaml")," file is needed by kwctl to connect to registries that fall into these categories:"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Authentication is required"),(0,r.kt)("li",{parentName:"ul"},"Self signed certificate is being used"),(0,r.kt)("li",{parentName:"ul"},"No TLS termination is done")),(0,r.kt)("p",{parentName:"admonition"},"Please refer to ",(0,r.kt)("a",{parentName:"p",href:"/distributing-policies/custom-certificate-authorities"},"the section on custom certificate authorities")," in our documentation to learn more about configuring the ",(0,r.kt)("inlineCode",{parentName:"p"},"sources.yaml")," file")),(0,r.kt)("h2",{id:"install-kubewarden"},"Install Kubewarden"),(0,r.kt)("p",null,"Let's install Kubewarden now that we have everything we need in our private registry. The only difference with a normal\nKubewarden installation is that we need to change the registry in the container images and policies to our private registry."),(0,r.kt)("p",null,"Install ",(0,r.kt)("inlineCode",{parentName:"p"},"cert-manager")," if it is not already installed in the air gap cluster:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"helm install --create-namespace cert-manager ./cert-manager-<Version>.tgz \\\n    -n kubewarden \\\n    --set installCRDs=true \\\n    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-controller \\\n    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-webhook \\\n    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-cainjector \\\n    --set startupapicheck.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/jetstack/cert-manager-ctl\n")),(0,r.kt)("p",null,"Let's install the Kubewarden stack:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"helm install --wait -n kubewarden \\\n  kubewarden-crds kubewarden-crds.tgz\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"helm install --wait -n kubewarden \\\n  kubewarden-controller kubewarden-controller.tgz \\\n  --set common.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"helm install --wait -n kubewarden \\\n  kubewarden-defaults kubewarden-defaults.tgz \\\n  --set common.cattle.systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>\n")),(0,r.kt)("p",null,"Finally, we need to configure Policy Server to fetch policies from our private registry. See the ",(0,r.kt)("a",{parentName:"p",href:"../policy-servers/private-registry"},"using private registry")," section of the docs."),(0,r.kt)("p",null,"Now we can create Kubewarden policies in our cluster! Policies must be available in your private registry."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'kubectl apply -f - <<EOF                                                                                        \napiVersion: policies.kubewarden.io/v1      \nkind: ClusterAdmissionPolicy\nmetadata:\n  name: privileged-pods\nspec:\n  module: registry://<REGISTRY.YOURDOMAIN.COM:PORT>/kubewarden/policies/pod-privileged:v0.2.2\n  rules:\n  - apiGroups: [""]\n    apiVersions: ["v1"]\n    resources: ["pods"]\n    operations:\n    - CREATE\n  mutating: false\nEOF\n')),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer")," resources must use the image available in your private registry. For example:"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre"},"apiVersion: policies.kubewarden.io/v1\nkind: PolicyServer\nmetadata:\n  name: reserved-instance-for-tenant-a\nspec:\n  image: <REGISTRY.YOURDOMAIN.COM:PORT>/kubewarden/policy-server:v1.3.0\n  replicas: 2\n  serviceAccountName: sa\n"))))}c.isMDXComponent=!0}}]);