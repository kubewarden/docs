"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[27206],{76167:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"howtos/security-hardening/webhook-mtls","title":"Secure webhooks with mutual TLS with k3s","description":"Harden the webhook configuration.","source":"@site/versioned_docs/version-1.23/howtos/security-hardening/webhook-mtls.md","sourceDirName":"howtos/security-hardening","slug":"/howtos/security-hardening/webhook-mtls","permalink":"/howtos/security-hardening/webhook-mtls","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.23/howtos/security-hardening/webhook-mtls.md","tags":[],"version":"1.23","lastUpdatedAt":1743431197000,"frontMatter":{"sidebar_label":"Enable mTLS with k3s","title":"Secure webhooks with mutual TLS with k3s","description":"Harden the webhook configuration.","keywords":["kubewarden","kubernetes","security"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","security"]},"sidebar":"docs","previous":{"title":"Secure supply chain","permalink":"/howtos/security-hardening/secure-supply-chain"},"next":{"title":"Requirements","permalink":"/howtos/airgap/requirements"}}');var s=t(74848),r=t(28453);const o={sidebar_label:"Enable mTLS with k3s",title:"Secure webhooks with mutual TLS with k3s",description:"Harden the webhook configuration.",keywords:["kubewarden","kubernetes","security"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["operator-manual","security"]},a=void 0,c={},l=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Create a root CA and the client certificate",id:"create-a-root-ca-and-the-client-certificate",level:3},{value:"Create the Kubernetes configuration file",id:"create-the-kubernetes-configuration-file",level:3},{value:"Create a k3s configuration file",id:"create-a-k3s-configuration-file",level:3},{value:"Install k3s",id:"install-k3s",level:2},{value:"Install the Kubewarden stack",id:"install-the-kubewarden-stack",level:2},{value:"Prerequisites",id:"prerequisites-1",level:3},{value:"Install the Kubewarden stack",id:"install-the-kubewarden-stack-1",level:3}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components},{Head:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t,{children:(0,s.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/security-hardening/webhook-mtls"})}),"\n",(0,s.jsxs)(n.p,{children:["This guide shows you how to enable mutual TLS (mTLS) for all the webhooks used by the Kubewarden\nstack when using ",(0,s.jsx)(n.a,{href:"https://k3s.io/",children:"k3s"})," as your Kubernetes distribution."]}),"\n",(0,s.jsxs)(n.p,{children:["For more information on how to harden the webhooks, see the ",(0,s.jsx)(n.a,{href:"../../reference/security-hardening/webhooks-hardening",children:"reference\npage"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsx)(n.p,{children:"Before installing k3s, you need to create a certificate authority (CA) and a client certificate to use to secure the communication between the Kubewarden webhooks and the Kubernetes API server."}),"\n",(0,s.jsxs)(n.p,{children:["As a first step, create the ",(0,s.jsx)(n.code,{children:"/etc/rancher/k3s/admission/certs"})," directory:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"sudo mkdir -p /etc/rancher/k3s/admission/certs\n"})}),"\n",(0,s.jsx)(n.h3,{id:"create-a-root-ca-and-the-client-certificate",children:"Create a root CA and the client certificate"}),"\n",(0,s.jsxs)(n.p,{children:["As ",(0,s.jsx)(n.code,{children:"root"})," user, change directory to the ",(0,s.jsx)(n.code,{children:"/etc/rancher/k3s/admission/certs"})," directory and\ncreate all needed certificates:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:'export FQDN=mtls.kubewarden.io\n\n# Create openssl config file\ncat > openssl.cnf <<EOL\n[ req ]\ndefault_keyfile     = rootCA.key\ndistinguished_name  = req_distinguished_name\nx509_extensions     = v3_ca\nstring_mask         = utf8only\n\n[ req_distinguished_name ]\ncountryName         = Country Name (2 letter code)\ncountryName_default = US\nstateOrProvinceName = State or Province Name (full name)\nlocalityName        = Locality Name (eg, city)\norganizationName    = Organization Name (eg, company)\ncommonName          = Common Name (eg, your domain or your CA name)\n\n[ v3_ca ]\nsubjectKeyIdentifier = hash\nauthorityKeyIdentifier = keyid:always,issuer\nbasicConstraints = critical, CA:true, pathlen:1\nkeyUsage = critical, keyCertSign, cRLSign\nEOL\n\n# Create CA\nopenssl req -nodes -batch -x509 -sha256 -days 3650 -newkey rsa:4096 -keyout rootCA.key -out rootCA.crt \\\n  -config openssl.cnf\n\n# Create CSR\nopenssl req -nodes -batch -newkey rsa:4096 -keyout client.key -out client.csr \\\n    -addext "subjectAltName = DNS:$FQDN"  -config openssl.cnf\n\n# Create CRT\nopenssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in client.csr -out client.crt -days 3650 -CAcreateserial \\\n    -extfile <(echo "subjectAltName=DNS:$FQDN")\n\n# Print CRT\nopenssl x509 -text -noout -in client.crt\n'})}),"\n",(0,s.jsx)(n.p,{children:"The following files should have been created:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"client.crt"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"client.csr"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"client.key"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"rootCA.crt"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"rootCA.key"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"rootCA.srl"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"create-the-kubernetes-configuration-file",children:"Create the Kubernetes configuration file"}),"\n",(0,s.jsxs)(n.p,{children:["Create the ",(0,s.jsx)(n.code,{children:"/etc/rancher/k3s/admission/admission.yaml"})," file with the following content:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'# /etc/rancher/k3s/admission/admission.yaml\napiVersion: apiserver.config.k8s.io/v1\nkind: AdmissionConfiguration\nplugins:\n  - name: ValidatingAdmissionWebhook\n    configuration:\n      apiVersion: apiserver.config.k8s.io/v1\n      kind: WebhookAdmissionConfiguration\n      kubeConfigFile: "/etc/rancher/k3s/admission/kubeconfig"\n  - name: MutatingAdmissionWebhook\n    configuration:\n      apiVersion: apiserver.config.k8s.io/v1\n      kind: WebhookAdmissionConfiguration\n      kubeConfigFile: "/etc/rancher/k3s/admission/kubeconfig"\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Finally, create a ",(0,s.jsx)(n.code,{children:"kubeconfig"})," file at ",(0,s.jsx)(n.code,{children:"/etc/rancher/k3s/admission/kubeconfig"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'# /etc/rancher/admission/kubeconfig\napiVersion: v1\nkind: Config\nusers:\n  - name: "*.kubewarden.svc" # namespace where the kubewarden stack is deployed\n    user:\n      client-certificate: /etc/rancher/k3s/admission/certs/client.crt\n      client-key: /etc/rancher/k3s/admission/certs/client.key\n'})}),"\n",(0,s.jsx)(n.h3,{id:"create-a-k3s-configuration-file",children:"Create a k3s configuration file"}),"\n",(0,s.jsxs)(n.p,{children:["Create a k3s configuration file at ",(0,s.jsx)(n.code,{children:"/etc/rancher/k3s/config.yaml"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"# /etc/rancher/k3s/config.yaml\nkube-apiserver-arg:\n  - admission-control-config-file=/etc/rancher/k3s/admission/admission.yaml\n"})}),"\n",(0,s.jsx)(n.h2,{id:"install-k3s",children:"Install k3s"}),"\n",(0,s.jsx)(n.p,{children:"Install k3s using the following command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"curl -sfL https://get.k3s.io | sh -\n"})}),"\n",(0,s.jsx)(n.p,{children:"Wait for the installation to complete."}),"\n",(0,s.jsx)(n.h2,{id:"install-the-kubewarden-stack",children:"Install the Kubewarden stack"}),"\n",(0,s.jsx)(n.h3,{id:"prerequisites-1",children:"Prerequisites"}),"\n",(0,s.jsx)(n.p,{children:"The certificate of the root CA, that issued the Kubernetes client certificate, must be made available to\nthe Kubewarden stack."}),"\n",(0,s.jsxs)(n.p,{children:["The root CA is available at ",(0,s.jsx)(n.code,{children:"/etc/rancher/k3s/admission/certs/rootCA.crt"})," on the Kubernetes node. Its content\nhas to be put into a ",(0,s.jsx)(n.code,{children:"ConfigMap"})," under the ",(0,s.jsx)(n.code,{children:"kubewarden"})," namespace. The contents of the ",(0,s.jsx)(n.code,{children:"rootCA.crt"})," file\nmust be stored in a key named ",(0,s.jsx)(n.code,{children:"client-ca.crt"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["First, create the ",(0,s.jsx)(n.code,{children:"kubewarden"})," namespace:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl create namespace kubewarden\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Then create the ",(0,s.jsx)(n.code,{children:"ConfigMap"})," in it. The following command, run on the Kubernetes node,\ndoes that:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"kubectl create configmap -n kubewarden api-server-mtls \\\n    --from-file=client-ca.crt=/etc/rancher/k3s/admission/certs/rootCA.crt\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The resulting ",(0,s.jsx)(n.code,{children:"ConfigMap"})," is named ",(0,s.jsx)(n.code,{children:"api-server-mtls"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"install-the-kubewarden-stack-1",children:"Install the Kubewarden stack"}),"\n",(0,s.jsxs)(n.p,{children:["Install the Kubewarden stack as described in the ",(0,s.jsx)(n.a,{href:"/quick-start",children:"quickstart guide"}),".\nFollow all the steps, but when installing the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"})," Helm chart, make sure to\nenable the following values:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"mTLS.enable"}),": must be set to ",(0,s.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"mTLS.configMapName"}),": must be set to name of the ",(0,s.jsx)(n.code,{children:"ConfigMap"})," that was previously created."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Given the ",(0,s.jsx)(n.code,{children:"ConfigMap"})," was named ",(0,s.jsx)(n.code,{children:"api-server-mtls"}),", the Helm command to install the ",(0,s.jsx)(n.code,{children:"kubewarden-controller"}),"\nis:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-console",children:"helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller \\\n    --set mTLS.enable=true \\\n    --set mTLS.configMapName=api-server-mtls\n"})}),"\n",(0,s.jsx)(n.p,{children:"Once this command finishes, the Kubewarden stack is installed and its webhooks are secured with mTLS."})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var i=t(96540);const s={},r=i.createContext(s);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);