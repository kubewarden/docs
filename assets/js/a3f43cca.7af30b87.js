"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[40891],{3916:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"reference/security-hardening/webhooks-hardening","title":"Harderning the Kubewarden webhooks","description":"Limit access to Kubewarden webhooks.","source":"@site/docs/reference/security-hardening/webhooks-hardening.md","sourceDirName":"reference/security-hardening","slug":"/reference/security-hardening/webhooks-hardening","permalink":"/next/reference/security-hardening/webhooks-hardening","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/reference/security-hardening/webhooks-hardening.md","tags":[],"version":"current","lastUpdatedAt":1742201480000,"frontMatter":{"sidebar_label":"Webhooks","title":"Harderning the Kubewarden webhooks","description":"Limit access to Kubewarden webhooks.","keywords":["kubewarden","kubernetes","security"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["reference"],"doc-topic":["reference","security"]},"sidebar":"docs","previous":{"title":"OCI registry support","permalink":"/next/reference/oci-registries-support"},"next":{"title":"Threat Model","permalink":"/next/reference/threat-model"}}');var t=r(74848),s=r(28453);const i={sidebar_label:"Webhooks",title:"Harderning the Kubewarden webhooks",description:"Limit access to Kubewarden webhooks.",keywords:["kubewarden","kubernetes","security"],"doc-persona":["kubewarden-operator","kubewarden-integrator"],"doc-type":["reference"],"doc-topic":["reference","security"]},a=void 0,c={},l=[{value:"Block External Traffic Using Network Policies",id:"block-external-traffic-using-network-policies",level:2},{value:"Calico",id:"calico",level:3},{value:"Cilium",id:"cilium",level:3},{value:"Require the Kubernetes API Server to Authenticate to the Webhook",id:"require-the-kubernetes-api-server-to-authenticate-to-the-webhook",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components},{Head:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/reference/security-hardening/webhooks-hardening"})}),"\n",(0,t.jsxs)(n.p,{children:["The Kubewarden stack uses various webhooks to enforce policies in a Kubernetes cluster. Each ",(0,t.jsx)(n.code,{children:"PolicyServer"})," instance exposes a webhook\nthat the Kubernetes API server calls to validate and mutate resources. Moreover, the ",(0,t.jsx)(n.code,{children:"kubewarden-controller"})," exposes webhooks to validate and mutate\nthe custom resources provided by the Kubewarden project."]}),"\n",(0,t.jsx)(n.p,{children:"To decrease their attack surface, you should limit access to these webhooks to the only valid callers they have:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"the Kubernetes API server"}),"\n",(0,t.jsxs)(n.li,{children:["the ",(0,t.jsx)(n.a,{href:"../../explanations/audit-scanner/",children:"audit scanner"})," component.\nYou can do this using network policies and authentication independently, or together, to harden the webhooks against attacks."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"block-external-traffic-using-network-policies",children:"Block External Traffic Using Network Policies"}),"\n",(0,t.jsx)(n.p,{children:"Webhooks are only expected to accept requests from the Kubernetes API server and the audit scanner component. By default, however, webhooks can accept traffic from any source.\nIf you are using a CNI that supports Network Policies, you can create a policy that blocks traffic that doesn't originate from the API server."}),"\n",(0,t.jsxs)(n.p,{children:["The built-in NetworkPolicy resource in Kubernetes can't block or admit traffic from the cluster hosts, and the ",(0,t.jsx)(n.code,{children:"kube-apiserver"})," process is always running on the host network.\nTherefore, you must use the advanced network policy resources from the CNI in use. Examples for Calico and Cilium follow. Consult the documentation for your CNI for more details."]}),"\n",(0,t.jsx)(n.h3,{id:"calico",children:"Calico"}),"\n",(0,t.jsxs)(n.p,{children:["Use the NetworkPolicy resource in the ",(0,t.jsx)(n.code,{children:"crd.projectcalico.org/v1"})," API group, define a network policy like the following one:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: crd.projectcalico.org/v1\nkind: NetworkPolicy\nmetadata:\n  name: allow-k8s-and-audit-scanner\n  namespace: kubewarden # namespace where the kubewarden stack is deployed\nspec:\n  selector: \'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}\'\n  types:\n    - Ingress\n  ingress:\n    # this allows the Kubernetes API server to reach the kubewarden controller and\n    # all the policy server instances\n    - action: Allow\n      protocol: TCP\n      source:\n        nets:\n        # CIDR of the control plane host. May list more than 1 if the hosts are in different subnets.\n        - 192.168.42.0/24\n      destination:\n        selector: \'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}\'\n    # this allows all the workloads defined inside of the kubewarden namespace\n    # (including audit-scanner) to reach the kubewarden controller and all the\n    # policy server instances\n    - action: Allow\n      protocol: TCP\n      source:\n        # namespace where the kubewarden stack is deployed\n        namespaceSelector: \'kubernetes.io/metadata.name == "kubewarden"\' # namespace where the kubewarden stack is deployed\n      destination:\n        selector: \'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}\'\n'})}),"\n",(0,t.jsxs)(n.admonition,{type:"warning",children:[(0,t.jsx)(n.p,{children:"This network policy uses label selectors that have been introduced in Kubewarden 1.23.0. If you are using an older version,\nyou must update the labels in the policy to match the ones used in your deployment."}),(0,t.jsx)(n.p,{children:"More specifically, the"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'selector: \'app.kubernetes.io/component in {"kubewarden-controller", "policy-server"}\'\n'})}),(0,t.jsx)(n.p,{children:"selectors should be written as:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"selector: 'app.kubernetes.io/name == \"kubewarden-controller\" || has(kubewarden/policy-server)'\n"})})]}),"\n",(0,t.jsx)(n.h3,{id:"cilium",children:"Cilium"}),"\n",(0,t.jsxs)(n.p,{children:["Use the CiliumNetworkPolicy resource in the ",(0,t.jsx)(n.code,{children:"cilium.io/v2"})," API group to define a network policy like the following one:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: "cilium.io/v2"\nkind: CiliumNetworkPolicy\nmetadata:\n  name: allow-k8s-and-audit-scanner\n  namespace: kubewarden # namespace where the kubewarden stack is deployed\nspec:\n  endpointSelector:\n    matchExpressions:\n      - key: app.kubernetes.io/component\n        operator: In\n        values:\n          - policy-server\n          - controller\n  ingress:\n    # this allows the Kubernetes API server to reach the kubewarden controller and\n    # all the policy server instances\n    - fromEntities:\n      - host\n      - remote-node\n    # this allows all the workloads defined inside of the kubewarden namespace\n    # (including audit-scanner) to reach the kubewarden controller and all the\n    # policy server instances\n    - fromEndpoints:\n        - matchLabels:\n            # namespace where the kubewarden stack is deployed\n            k8s:io.kubernetes.pod.namespace: kubewarden\n'})}),"\n",(0,t.jsxs)(n.admonition,{type:"warning",children:[(0,t.jsx)(n.p,{children:"This network policy uses label selectors that have been introduced in Kubewarden 1.23.0. If you are using an older version,\nyou must update the labels in the policy to match the ones used in your deployment."}),(0,t.jsx)(n.p,{children:"More specifically, the"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"matchExpressions:\n  - key: app.kubernetes.io/component\n    operator: In\n    values:\n      - policy-server\n      - controller\n"})}),(0,t.jsx)(n.p,{children:"expression should be written as:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"endpointSelector:\nmatchExpressions:\n  - key: app.kubernetes.io/name\n    operator: In\n    values:\n      - kubewarden-controller\n  - key: kubewarden/policy-server\n    operator: Exists\n"})})]}),"\n",(0,t.jsx)(n.h2,{id:"require-the-kubernetes-api-server-to-authenticate-to-the-webhook",children:"Require the Kubernetes API Server to Authenticate to the Webhook"}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.p,{children:["See ",(0,t.jsx)(n.a,{href:"../../howtos/security-hardening/webhook-mtls/",children:"this how-to"})," for a step-by-step guide on\nconfiguring the Kubernetes API server of k3s to authenticate to the webhook."]})}),"\n",(0,t.jsx)(n.p,{children:"The webhooks exposed by the Kubewarden stack should only accept requests from the Kubernetes API server or\nfrom the audit scanner component.\nBy default, these webhooks don't require clients to authenticate to it. They will accept any request."}),"\n",(0,t.jsxs)(n.p,{children:["You can configure the webhooks to require credentials so that only the API server and the audit scanner processes\ncan access them.\nSee the ",(0,t.jsx)(n.a,{href:"https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#authenticate-apiservers",children:"Kubernetes documentation"})," for more information."]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Configure the API server to present a client certificate to the webhook, pointing to an ",(0,t.jsx)(n.code,{children:"AdmissionConfiguration"}),"\nfile to configure the ",(0,t.jsx)(n.code,{children:"ValidatingAdmissionWebhook"})," and ",(0,t.jsx)(n.code,{children:"MutatingAdmissionWebhook"})," plugins:"]}),"\n",(0,t.jsxs)(n.p,{children:["Create a file named ",(0,t.jsx)(n.code,{children:"admission.yaml"})," with the following contents:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: apiserver.config.k8s.io/v1\nkind: AdmissionConfiguration\nplugins:\n- name: ValidatingAdmissionWebhook\n  configuration:\n    apiVersion: apiserver.config.k8s.io/v1\n    kind: WebhookAdmissionConfiguration\n    kubeConfigFile: "/etc/k8s/admission/kubeconfig"\n- name: MutatingAdmissionWebhook\n  configuration:\n    apiVersion: apiserver.config.k8s.io/v1\n    kind: WebhookAdmissionConfiguration\n    kubeConfigFile: "/etc/k8s/admission/kubeconfig"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This is the same configuration file used to configure other plugins, such as ",(0,t.jsx)(n.code,{children:"PodSecurity"}),".\nIf your distribution or setup uses additional admission plugins, you should also configure those."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Create the ",(0,t.jsx)(n.code,{children:"kubeconfig"})," file the admission plugins refer to. Kubewarden only supports client certificate authentication, so generate a TLS key pair,\nand set the kubeconfig to use either client-certificate and client-key or client-certificate-data and client-key-data."]}),"\n",(0,t.jsx)(n.p,{children:"For example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# /etc/k8s/admission/kubeconfig\napiVersion: v1\nkind: Config\nusers:\n- name: '*.kubewarden.svc'\n  user:\n    client-certificate: /path/to/client/cert\n    client-key: /path/to/client/key\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Start the ",(0,t.jsx)(n.code,{children:"kube-apiserver"})," binary with the flag ",(0,t.jsx)(n.code,{children:"--admission-control-config-file"})," pointing to your ",(0,t.jsx)(n.code,{children:"AdmissionConfiguration"})," file.\nThe way to do this varies by distribution, and it isn't supported universally, such as in hosted Kubernetes providers.\nConsult the documentation for your Kubernetes distribution."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"The certificate of the root CA that issued the API server client certificate must be made available to\nthe Kubewarden stack."}),"\n",(0,t.jsxs)(n.p,{children:["Its content has to be put into a ",(0,t.jsx)(n.code,{children:"ConfigMap"})," under the ",(0,t.jsx)(n.code,{children:"kubewarden"})," namespace using a key named ",(0,t.jsx)(n.code,{children:"client-ca.crt"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Assuming the root CA is available at ",(0,t.jsx)(n.code,{children:"/etc/k8s/admission/certs/rootCA.crt"}),", create the ",(0,t.jsx)(n.code,{children:"ConfigMap"}),"\nwith the following command:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"kubectl create configmap -n kubewarden api-server-mtls \\\n    --from-file=client-ca.crt=/etc/k8s/admission/certs/rootCA.crt\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Finally, when installing the ",(0,t.jsx)(n.code,{children:"kubewarden-controller"})," Helm chart,\nmake sure to enable the following values:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"mTLS.enable"}),": must be set to ",(0,t.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"mTLS.configMapName"}),": must be set to name of the ",(0,t.jsx)(n.code,{children:"ConfigMap"})," that was previously created."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Given the ",(0,t.jsx)(n.code,{children:"ConfigMap"})," was named ",(0,t.jsx)(n.code,{children:"api-server-mtls"}),", the Helm command to install the ",(0,t.jsx)(n.code,{children:"kubewarden-controller"})," is:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"helm install --wait -n kubewarden kubewarden-controller kubewarden/kubewarden-controller \\\n    --set mTLS.enable=true \\\n    --set mTLS.configMapName=api-server-mtls\n"})}),"\n",(0,t.jsx)(n.p,{children:"The Kubewarden controller creates a client certificate for use by the audit scanner component.\nThe certificate is automatically rotated, by the controller, when needed."}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>a});var o=r(96540);const t={},s=o.createContext(t);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);