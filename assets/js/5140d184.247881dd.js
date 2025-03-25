"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[51276],{16574:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>s,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"howtos/application-collection/verify-images","title":"Verify Rancher Application Collection images","description":"Verify Rancher Application Collection images with Kubewarden.","source":"@site/versioned_docs/version-1.17/howtos/application-collection/01-verify-images.md","sourceDirName":"howtos/application-collection","slug":"/howtos/application-collection/verify-images","permalink":"/1.17/howtos/application-collection/verify-images","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.17/howtos/application-collection/01-verify-images.md","tags":[],"version":"1.17","lastUpdatedAt":1742923074000,"sidebarPosition":1,"frontMatter":{"sidebar_label":"Verify Images","title":"Verify Rancher Application Collection images","description":"Verify Rancher Application Collection images with Kubewarden.","keywords":["rancher","application collection","appco","signature","verification","verify"],"doc-type":["howto"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-topic":["operator-manual","rancher","installation"]},"sidebar":"docs","previous":{"title":"Tracing","permalink":"/1.17/howtos/ui-extension/tracing"},"next":{"title":"Open Telemetry","permalink":"/1.17/howtos/telemetry/opentelemetry-qs"}}');var o=i(74848),r=i(28453);const a={sidebar_label:"Verify Images",title:"Verify Rancher Application Collection images",description:"Verify Rancher Application Collection images with Kubewarden.",keywords:["rancher","application collection","appco","signature","verification","verify"],"doc-type":["howto"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-topic":["operator-manual","rancher","installation"]},c=void 0,s={},l=[{value:"Authenticating to Rancher Application Collection",id:"authenticating-to-rancher-application-collection",level:2},{value:"Create Secret for the PolicyServer so they can pull from Rancher Application Collection",id:"create-secret-for-the-policyserver-so-they-can-pull-from-rancher-application-collection",level:2},{value:"Configure PolicyServers to use the new Secret",id:"configure-policyservers-to-use-the-new-secret",level:2},{value:"Apply the policy",id:"apply-the-policy",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components},{Head:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{children:(0,o.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/application-collection/verify-images"})}),"\n",(0,o.jsxs)(n.p,{children:["This section describes how to verify applications and images from the ",(0,o.jsx)(n.a,{href:"https://apps.rancher.io/",children:"Rancher\nApplication Collection"})," with Kubewarden."]}),"\n",(0,o.jsxs)(n.p,{children:["It does so by deploying the ",(0,o.jsx)(n.a,{href:"https://artifacthub.io/packages/kubewarden/verify-image-signatures/verify-image-signatures",children:"Verify Image\nSignatures"}),"\npolicy and configuring the PolicyServers so they can pull the signature layers\nof the images from Application Collection."]}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsx)(n.p,{children:"You need an access token or service account authentication to Application Collection."})}),"\n",(0,o.jsx)(n.h2,{id:"authenticating-to-rancher-application-collection",children:"Authenticating to Rancher Application Collection"}),"\n",(0,o.jsxs)(n.p,{children:["Following the ",(0,o.jsx)(n.a,{href:"https://docs.apps.rancher.io/get-started/authentication/",children:"Application Collection\ndocs"}),", create a an\naccess token and set up the cluster so it can pull from the Application\nCollection registry, with a Docker Config Secret such as this one:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"$ kubectl create secret docker-registry application-collection \\\n  --docker-server=dp.apps.rancher.io \\\n  --docker-username=<mymail> \\\n  --docker-password=<mytoken>\n"})}),"\n",(0,o.jsx)(n.h2,{id:"create-secret-for-the-policyserver-so-they-can-pull-from-rancher-application-collection",children:"Create Secret for the PolicyServer so they can pull from Rancher Application Collection"}),"\n",(0,o.jsx)(n.p,{children:"The PolicyServer we are using needs to be configured so it can pull the image\nlayers that contain the signatures."}),"\n",(0,o.jsxs)(n.p,{children:["Following the ",(0,o.jsx)(n.a,{href:"../policy-servers/private-registry",children:"private registries how-to"}),"\nfor Policy Servers, create a Docker Config Secret ",(0,o.jsx)(n.strong,{children:"in the same namespace of\nthe PolicyServer"}),". Do this by instantiating a Secret with\nthe same contents as the previous ",(0,o.jsx)(n.code,{children:"application-collection"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["For PolicyServer ",(0,o.jsx)(n.code,{children:"default"}),", installed with the ",(0,o.jsx)(n.code,{children:"kubewarden-defaults"})," Helm chart\nunder the ",(0,o.jsx)(n.code,{children:"kubewarden"})," namespace, it would be:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"$ kubectl create secret docker-registry application-collection-kw -n kubewarden \\\n  --docker-server=dp.apps.rancher.io \\\n  --docker-username=<mymail> \\\n  --docker-password=<mytoken>\n"})}),"\n",(0,o.jsx)(n.h2,{id:"configure-policyservers-to-use-the-new-secret",children:"Configure PolicyServers to use the new Secret"}),"\n",(0,o.jsxs)(n.p,{children:["If using the PolicyServer ",(0,o.jsx)(n.code,{children:"default"})," from the ",(0,o.jsx)(n.code,{children:"kubewarden-defaults"})," Helm chart,\nconfigure it with the imagePullSecret ",(0,o.jsx)(n.code,{children:"application-collection-kw"})," in the same\nnamespace by setting the following values for the chart:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"$ helm upgrade -i --wait --namespace kubewarden \\\n  --create-namespace kubewarden-defaults kubewarden/kubewarden-defaults \\\n  --reuse-values \\\n  --set policyServer.imagePullSecret=application-collection-kw\n"})}),"\n",(0,o.jsxs)(n.p,{children:["If you are using other PolicyServers, set their\n",(0,o.jsx)(n.a,{href:"../../reference/CRDs#policyserverspec",children:(0,o.jsx)(n.code,{children:"spec.imagePullSecret"})}),".\nRemember, the Secret must be in the same namespace as the PolicyServer."]}),"\n",(0,o.jsx)(n.h2,{id:"apply-the-policy",children:"Apply the policy"}),"\n",(0,o.jsxs)(n.p,{children:["Let's apply a ClusterAdmissionPolicy making use of ",(0,o.jsx)(n.a,{href:"https://artifacthub.io/packages/kubewarden/verify-image-signatures/verify-image-signatures",children:"Verify Image\nSignatures"}),"\npolicy. This policy will check all container images from\n",(0,o.jsx)(n.code,{children:"dp.apps.rancher.io/containers/*"}),". The policy supports OCI registries and\nartifacts."]}),"\n",(0,o.jsxs)(n.p,{children:["We configure the policy settings with the ",(0,o.jsx)(n.a,{href:"https://docs.apps.rancher.io/howto-guides/verify-signatures/",children:"public\nkey"})," from\nApplication Collection (at the time of writing) in the ",(0,o.jsx)(n.code,{children:"pubKeys"})," array."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:'$ kubectl apply -f - <<EOF\napiVersion: policies.kubewarden.io/v1\nkind: ClusterAdmissionPolicy\nmetadata:\n  annotations:\n    artifacthub/pkg: verify-image-signatures/verify-image-signatures/0.2.9\n  name: check-appcollection-signatures\nspec:\n  backgroundAudit: true\n  mode: protect\n  module: ghcr.io/kubewarden/policies/verify-image-signatures:v0.2.9\n  mutating: true\n  policyServer: default\n  # On first policy call, the policy-server downloads the image layers to\n  # verify the signatures. Later on it\'s cached. It may be useful to increase\n  # this timeout:\n  timeoutSeconds: 30 # default 10 seconds.\n  rules:\n    - apiGroups: [""]\n      apiVersions: ["v1"]\n      resources: ["pods"]\n      operations: ["CREATE", "UPDATE"]\n    - apiGroups: [""]\n      apiVersions: ["v1"]\n      resources: ["replicationcontrollers"]\n      operations: ["CREATE", "UPDATE"]\n    - apiGroups: ["apps"]\n      apiVersions: ["v1"]\n      resources: ["deployments", "replicasets", "statefulsets", "daemonsets"]\n      operations: ["CREATE", "UPDATE"]\n    - apiGroups: ["batch"]\n      apiVersions: ["v1"]\n      resources: ["jobs", "cronjobs"]\n      operations: ["CREATE", "UPDATE"]\n  settings:\n    modifyImagesWithDigest: true\n    rule: PublicKey\n    signatures:\n      - image: dp.apps.rancher.io/containers/*\n        pubKeys:\n          # Note: this array constitutes an AND in validation, not an OR.\n          - |-\n            -----BEGIN PUBLIC KEY-----\n            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA02FtEt5gBywiyxbmkVsb\n            CujcBg5lur0kpEbfDk10gCcs9shVEqEO3ZsOXHursgoaDAWqdPtsYhsgczGeJz9w\n            Aw+r6BuRV8YOkE37A8s/7IOQUW0tlqtnt11OKhIiZ9+e5l3ed2H1ymKQO3dgreSy\n            rShqYdA3hrItswyp41ApF6zhjSPlR6lAmq3X4wMYLAPptmzfxigTnR4hxB5UNPhs\n            i2qA4vLrUM/i+NohECuLr1EAymvupH26HLEdM+eZnlQn+WbhIP5Grc4ba7XrBv7K\n            kywgTC7CxkiJZR0mUcUD2wTX/Je8Ewj6oPSalx09e2jtzvmU5Kr9XUyMF7Zsj5CA\n            IwIDAQAB\n            -----END PUBLIC KEY-----\nEOF\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ kubectl apply -f mypolicy.yml\n$ kubectl get admissionpolicies -n default # wait for status active\n"})}),"\n",(0,o.jsx)(n.p,{children:"To test it, deploy a Pod with a signed image from Application Collection:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'$ kubectl run nginx --image [dp.apps.rancher.io/containers/nginx:1.24.0](http://dp.apps.rancher.io/containers/nginx:1.24.0) --overrides=\'{"spec": {"imagePullSecrets":[{"name": "application-collection"}]}}\'\npod/nginx created\n'})}),"\n",(0,o.jsx)(n.p,{children:"You can inspect the logs of your policy-server Pod to see that the verification\ntook place."})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>c});var t=i(96540);const o={},r=t.createContext(o);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);