"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[8501],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>d});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(a),d=r,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return a?n.createElement(h,s(s({ref:t},c),{},{components:a})):n.createElement(h,s({ref:t},c))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=a[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},3555:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=a(3117),r=(a(7294),a(3905));const o={sidebar_label:"Metrics Quickstart",title:""},s="Metrics",i={unversionedId:"operator-manual/telemetry/metrics/quickstart",id:"operator-manual/telemetry/metrics/quickstart",title:"",description:"This section describes how to enable metrics reporting on the Policy Server.",source:"@site/docs/operator-manual/telemetry/metrics/01-quickstart.md",sourceDirName:"operator-manual/telemetry/metrics",slug:"/operator-manual/telemetry/metrics/quickstart",permalink:"/operator-manual/telemetry/metrics/quickstart",draft:!1,editUrl:"https://github.com/kubewarden/docs/edit/main/docs/operator-manual/telemetry/metrics/01-quickstart.md",tags:[],version:"current",lastUpdatedAt:1673368170,formattedLastUpdatedAt:"Jan 10, 2023",sidebarPosition:1,frontMatter:{sidebar_label:"Metrics Quickstart",title:""},sidebar:"docs",previous:{title:"Open Telemetry Quickstart",permalink:"/operator-manual/telemetry/opentelemetry/quickstart"},next:{title:"Tracing Quickstart",permalink:"/operator-manual/telemetry/tracing/quickstart"}},l={},p=[{value:"Install Prometheus",id:"install-prometheus",level:2},{value:"Install Kubewarden",id:"install-kubewarden",level:2},{value:"Accessing Prometheus",id:"accessing-prometheus",level:2},{value:"Accessing Grafana",id:"accessing-grafana",level:2},{value:"Using Kubewarden Grafana dashboard",id:"using-kubewarden-grafana-dashboard",level:3}],c={toc:p};function u(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"metrics"},"Metrics"),(0,r.kt)("p",null,"This section describes how to enable metrics reporting on the Policy Server."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Before continuing, make sure you completed the previous\n",(0,r.kt)("a",{parentName:"p",href:"/operator-manual/telemetry/opentelemetry/quickstart#install-opentelemetry"},"OpenTelemetry")," section of this book. It\nis required for this section to work correctly.")),(0,r.kt)("p",null,"We are going to use ",(0,r.kt)("a",{parentName:"p",href:"https://prometheus.io/"},"Prometheus")," to scrape metrics exposed by the Policy\nServer."),(0,r.kt)("h2",{id:"install-prometheus"},"Install Prometheus"),(0,r.kt)("p",null,"We will use the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/prometheus-operator/prometheus-operator"},"Prometheus Operator"),",\nthat allows us to intuitively define Prometheus' Targets."),(0,r.kt)("p",null,"There are many ways to install and set up Prometheus. For ease of deployment, we will use the\nPrometheus community Helm chart."),(0,r.kt)("p",null,"Let's add the helm repository from the Prometheus Community:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm repo add prometheus-community https://prometheus-community.github.io/helm-charts\n")),(0,r.kt)("p",null,"Now, let's install the\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack"},(0,r.kt)("inlineCode",{parentName:"a"},"kube-prometheus-stack")),"\nchart. This chart contains a collection of Kubernetes manifests, Grafana dashboards, and Prometheus\nrules."),(0,r.kt)("p",null,"Let's create a ",(0,r.kt)("inlineCode",{parentName:"p"},"kube-prometheus-stack-values.yaml")," file to configure the ",(0,r.kt)("inlineCode",{parentName:"p"},"kube-prometheus-stack"),"\nHelm chart values with the following contents:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"prometheus:\n  additionalServiceMonitors:\n    - name: kubewarden\n      selector:\n        matchLabels:\n          app: kubewarden-policy-server-default\n      namespaceSelector:\n        matchNames:\n          - kubewarden\n      endpoints:\n        - port: metrics\n          interval: 10s\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"prometheus-operator")," deployed as part of this Helm chart defines the concept of ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#servicemonitor"},"Service\nMonitors"),",\nused to declaratively define which services should be monitored by Prometheus."),(0,r.kt)("p",null,"In our case, we are adding a Service monitor targeting the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden")," namespace, for services that\nmatch labels ",(0,r.kt)("inlineCode",{parentName:"p"},"app=kubewarden-policy-server-default"),". This way, the Prometheus Operator is able to\ninspect which Kubernetes Endpoints are tied to services matching this conditions. The operator will\nthen take care of generating a valid configuration file for Prometheus, and reloading it\nautomatically after updating its configuration file."),(0,r.kt)("p",null,"Install the Prometheus stack Helm Chart (version ",(0,r.kt)("inlineCode",{parentName:"p"},"40.5.0")," at time of writing):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm install --wait --create-namespace \\\n  --namespace prometheus \\\n  --values kube-prometheus-stack-values.yaml \\\n  prometheus prometheus-community/kube-prometheus-stack\n")),(0,r.kt)("h2",{id:"install-kubewarden"},"Install Kubewarden"),(0,r.kt)("p",null,"We can now install Kubewarden in the recommended way with Helm charts."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"cert-manager is a requirement of Kubewarden, and OpenTelemetry is required for this\nfeature, but we've already installed them in a previous section of this book.")),(0,r.kt)("p",null,"As a first step, we have to add the Helm repository that contains Kubewarden:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm repo add kubewarden https://charts.kubewarden.io\n")),(0,r.kt)("p",null,"Then we have to install the Custom Resource Definitions (CRDs) defined by\nKubewarden:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm install --wait \\\n  --namespace kubewarden --create-namespace \\\n  kubewarden-crds kubewarden/kubewarden-crds\n")),(0,r.kt)("p",null,"Now we can deploy the rest of the Kubewarden stack. The official helm\nchart will create a PolicyServer named ",(0,r.kt)("inlineCode",{parentName:"p"},"default"),"."),(0,r.kt)("p",null,"Let's configure the values of the Helm Chart so that we have metrics enabled\nin Kubewarden. Write the ",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden-values.yaml")," file with the following contents:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"telemetry:\n  enabled: True\n  metrics:\n    port: 8080\n")),(0,r.kt)("p",null,"Now, let's install the helm charts:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"helm install --wait \\\n  --namespace kubewarden \\\n  --values kubewarden-values.yaml \\\n  kubewarden-controller kubewarden/kubewarden-controller\n\nhelm install --wait \\\n  --namespace kubewarden \\\n  --create-namespace \\\n  kubewarden-defaults kubewarden/kubewarden-defaults \\\n  --set recommendedPolicies.enabled=True \\\n  --set recommendedPolicies.defaultPolicyMode=monitor \\\n  --set policyServer.telemetry.enabled=True\n")),(0,r.kt)("p",null,"This leads to the creation of the ",(0,r.kt)("inlineCode",{parentName:"p"},"default")," instance of ",(0,r.kt)("inlineCode",{parentName:"p"},"PolicyServer"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl get policyservers.policies.kubewarden.io\nNAME      AGE\ndefault   3m7s\n")),(0,r.kt)("p",null,"By default, this policy server will have metrics enabled."),(0,r.kt)("h2",{id:"accessing-prometheus"},"Accessing Prometheus"),(0,r.kt)("p",null,"Prometheus exposes a very simple UI that we can use to inspect metrics exposed by different\ncomponents within our Kubernetes cluster."),(0,r.kt)("p",null,"We can forward the Prometheus port so we can easily access it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-operated 9090\n")),(0,r.kt)("p",null,"Now, we can visit prometheus through port ",(0,r.kt)("inlineCode",{parentName:"p"},"9090")," and perform a query, for example:\n",(0,r.kt)("inlineCode",{parentName:"p"},"kubewarden_policy_evaluations_total"),". We will see that the number of evaluations will grow over\ntime as we produce more requests that go through the policy."),(0,r.kt)("h2",{id:"accessing-grafana"},"Accessing Grafana"),(0,r.kt)("p",null,"We can forward the Grafana service so we can easily access it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"kubectl port-forward -n prometheus --address 0.0.0.0 svc/prometheus-grafana 8080:80\n")),(0,r.kt)("p",null,"You can now login with the default username ",(0,r.kt)("inlineCode",{parentName:"p"},"admin")," and password ",(0,r.kt)("inlineCode",{parentName:"p"},"prom-operator"),"."),(0,r.kt)("h3",{id:"using-kubewarden-grafana-dashboard"},"Using Kubewarden Grafana dashboard"),(0,r.kt)("p",null,"The Kubewarden developers made available a Grafana dashboard with some basic metrics\nthat give an overview about how Kubewarden behaves inside of cluster. This dashboard\nis available in the Kubewarden repository in a ",(0,r.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/kubewarden/policy-server/main/kubewarden-dashboard.json"},"JSON file"),"\nor in the ",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/grafana/dashboards/15314"},"Grafana website"),". "),(0,r.kt)("p",null,"To import the dashboard into your environment, you can download the JSON file\nfrom the Grafana website or from the repository:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"curl https://raw.githubusercontent.com/kubewarden/policy-server/main/kubewarden-dashboard.json\n")),(0,r.kt)("p",null,"Once you have the file in your machine you should access the Grafana dashboard and\n",(0,r.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/dashboards/export-import/#import-dashboard"},"import it"),".\nVisit ",(0,r.kt)("inlineCode",{parentName:"p"},"/dashboard/import")," in the Grafana dashboard and follow these steps:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Copy the JSON file contents and paste them into the ",(0,r.kt)("inlineCode",{parentName:"li"},"Import via panel json")," box in the Grafana UI"),(0,r.kt)("li",{parentName:"ol"},"Click the ",(0,r.kt)("inlineCode",{parentName:"li"},"Load")," button"),(0,r.kt)("li",{parentName:"ol"},"Choosing ",(0,r.kt)("inlineCode",{parentName:"li"},"Prometheus")," as the source"),(0,r.kt)("li",{parentName:"ol"},"Click the ",(0,r.kt)("inlineCode",{parentName:"li"},"Import")," button")),(0,r.kt)("p",null,"Another option is import it directly from the Grafana.com website. For this:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Copy the dashboard ID from the ",(0,r.kt)("a",{parentName:"li",href:"https://grafana.com/grafana/dashboards/15314"},"dashboard page"),", "),(0,r.kt)("li",{parentName:"ol"},"Paste it in the ",(0,r.kt)("inlineCode",{parentName:"li"},"Import via grafana.com")," field"),(0,r.kt)("li",{parentName:"ol"},"Click the ",(0,r.kt)("inlineCode",{parentName:"li"},"load")," button."),(0,r.kt)("li",{parentName:"ol"},"After importing the dashboard, define the Prometheus data source to use and finish\nthe import process. ")),(0,r.kt)("p",null,"You should be able to see the dashboard similar to this:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Dashboard 1",src:a(619).Z,width:"1915",height:"709"}),"\n",(0,r.kt)("img",{alt:"Dashboard 2",src:a(8793).Z,width:"1907",height:"949"}),"\n",(0,r.kt)("img",{alt:"Dashboard 3",src:a(5903).Z,width:"1948",height:"696"}),"\n",(0,r.kt)("img",{alt:"Dashboard 4",src:a(5082).Z,width:"1903",height:"943"})),(0,r.kt)("p",null,"The Grafana dashboard has panes showing the state of all\nthe policies managed by Kubewarden. Plus it has policy-specific panels."),(0,r.kt)("p",null,"Policy detailed metrics can be obtained by changing the value of the ",(0,r.kt)("inlineCode",{parentName:"p"},"policy_name"),"\nvariable to match the name of the desired policy."))}u.isMDXComponent=!0},619:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/grafana_dashboard_1-8a188ecd24d7a863db4206818994da6f.png"},8793:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/grafana_dashboard_2-92f2648a385b4d32d7fad3f3d916bf51.png"},5903:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/grafana_dashboard_3-ac5d2921a8599fc4b0c204fe8d196f87.png"},5082:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/grafana_dashboard_4-a99c566a2d6dcd35d940b622b5f86137.png"}}]);