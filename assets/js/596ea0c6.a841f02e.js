"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[98322],{82223:(e,n,l)=>{l.d(n,{A:()=>i});l(96540);var s=l(18215);const t={tabItem:"tabItem_Ymn6"};var r=l(74848);function i(e){let{children:n,hidden:l,className:i}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,s.A)(t.tabItem,i),hidden:l,children:n})}},72206:(e,n,l)=>{l.d(n,{A:()=>v});var s=l(96540),t=l(18215),r=l(80052),i=l(56347),a=l(35793),o=l(99025),c=l(4430),d=l(44148);function u(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:l}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:l,attributes:s,default:t}}=e;return{value:n,label:l,attributes:s,default:t}}))}(l);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,l])}function x(e){let{value:n,tabValues:l}=e;return l.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:l}=e;const t=(0,i.W6)(),r=function(e){let{queryString:n=!1,groupId:l}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!l)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return l??null}({queryString:n,groupId:l});return[(0,o.aZ)(r),(0,s.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(t.location.search);n.set(r,e),t.replace({...t.location,search:n.toString()})}),[r,t])]}function w(e){const{defaultValue:n,queryString:l=!1,groupId:t}=e,r=h(e),[i,o]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:l}=e;if(0===l.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!x({value:n,tabValues:l}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${l.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=l.find((e=>e.default))??l[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:r}))),[c,u]=p({queryString:l,groupId:t}),[w,m]=function(e){let{groupId:n}=e;const l=function(e){return e?`docusaurus.tab.${e}`:null}(n),[t,r]=(0,d.Dv)(l);return[t,(0,s.useCallback)((e=>{l&&r.set(e)}),[l,r])]}({groupId:t}),f=(()=>{const e=c??w;return x({value:e,tabValues:r})?e:null})();(0,a.A)((()=>{f&&o(f)}),[f]);return{selectedValue:i,selectValue:(0,s.useCallback)((e=>{if(!x({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),m(e)}),[u,m,r]),tabValues:r}}var m=l(75251);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=l(74848);function b(e){let{className:n,block:l,selectedValue:s,selectValue:i,tabValues:a}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),d=e=>{const n=e.currentTarget,l=o.indexOf(n),t=a[l].value;t!==s&&(c(n),i(t))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const l=o.indexOf(e.currentTarget)+1;n=o[l]??o[0];break}case"ArrowLeft":{const l=o.indexOf(e.currentTarget)-1;n=o[l]??o[o.length-1];break}}n?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,t.A)("tabs",{"tabs--block":l},n),children:a.map((e=>{let{value:n,label:l,attributes:r}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>{o.push(e)},onKeyDown:u,onClick:d,...r,className:(0,t.A)("tabs__item",f.tabItem,r?.className,{"tabs__item--active":s===n}),children:l??n},n)}))})}function g(e){let{lazy:n,children:l,selectedValue:r}=e;const i=(Array.isArray(l)?l:[l]).filter(Boolean);if(n){const e=i.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:(0,t.A)("margin-top--md",e.props.className)}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:i.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function k(e){const n=w(e);return(0,j.jsxs)("div",{className:(0,t.A)("tabs-container",f.tabList),children:[(0,j.jsx)(b,{...n,...e}),(0,j.jsx)(g,{...n,...e})]})}function v(e){const n=(0,m.A)();return(0,j.jsx)(k,{...e,children:u(e.children)},String(n))}},15218:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>x,frontMatter:()=>o,metadata:()=>s,toc:()=>u});const s=JSON.parse('{"id":"howtos/install-kwctl","title":"Installing kwctl","description":"Installing kwctl","source":"@site/docs/howtos/install-kwctl.md","sourceDirName":"howtos","slug":"/howtos/install-kwctl","permalink":"/next/howtos/install-kwctl","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/docs/howtos/install-kwctl.md","tags":[],"version":"current","lastUpdatedAt":1743431197000,"sidebarPosition":15,"frontMatter":{"sidebar_label":"Install kwctl","sidebar_position":15,"title":"Installing kwctl","description":"Installing kwctl","keywords":["kubewarden","kubernetes","install kwctl","install","kwctl"],"doc-persona":["kubewarden-all"],"doc-type":["howto"],"doc-topic":["install-kwctl"]},"sidebar":"docs","previous":{"title":"Common tasks","permalink":"/next/howtos/tasks"},"next":{"title":"Production deployments","permalink":"/next/howtos/production-deployments"}}');var t=l(74848),r=l(28453),i=l(72206),a=l(82223);const o={sidebar_label:"Install kwctl",sidebar_position:15,title:"Installing kwctl",description:"Installing kwctl",keywords:["kubewarden","kubernetes","install kwctl","install","kwctl"],"doc-persona":["kubewarden-all"],"doc-type":["howto"],"doc-topic":["install-kwctl"]},c="Installing kwctl (Kubewarden CLI)",d={},u=[{value:"Install for Linux",id:"install-for-linux",level:2},{value:"Using Homebrew",id:"using-homebrew",level:3},{value:"Using AUR (Arch User Repository)",id:"using-aur-arch-user-repository",level:3},{value:"Using an AUR Helper (yay)",id:"using-an-aur-helper-yay",level:4},{value:"Using makepkg",id:"using-makepkg",level:4},{value:"Verify the installation",id:"verify-the-installation",level:4},{value:"Manual installation",id:"manual-installation",level:3},{value:"Install for Apple",id:"install-for-apple",level:2},{value:"Using Homebrew",id:"using-homebrew-1",level:3},{value:"Manual installation",id:"manual-installation-1",level:3},{value:"Install for Windows",id:"install-for-windows",level:2},{value:"Install shell completions",id:"install-shell-completions",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components},{Head:l}=n;return l||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/install-kwctl"})}),"\n","\n",(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"installing-kwctl-kubewarden-cli",children:"Installing kwctl (Kubewarden CLI)"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"kwctl"})," is the command-line interface (CLI) tool for Kubewarden. Below are installation instructions for some operating systems."]}),"\n",(0,t.jsxs)(i.A,{defaultValue:"linux",values:[{label:"Linux",value:"linux"},{label:"macOS",value:"mac"},{label:"Windows",value:"windows"}],children:[(0,t.jsxs)(a.A,{value:"linux",children:[(0,t.jsx)(n.h2,{id:"install-for-linux",children:"Install for Linux"}),(0,t.jsx)(n.h3,{id:"using-homebrew",children:"Using Homebrew"}),(0,t.jsx)(n.p,{children:"If you use the Homebrew package manager on Linux, then:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brew install kwctl\n"})}),(0,t.jsx)(n.p,{children:"Verify Installation:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kwctl --version\n"})}),(0,t.jsx)(n.h3,{id:"using-aur-arch-user-repository",children:"Using AUR (Arch User Repository)"}),(0,t.jsx)(n.p,{children:"If you're using Arch Linux, or an Arch-based distribution, you can install kwctl from the AUR."}),(0,t.jsx)(n.h4,{id:"using-an-aur-helper-yay",children:"Using an AUR Helper (yay)"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yay -S kwctl\n"})}),(0,t.jsx)(n.h4,{id:"using-makepkg",children:"Using makepkg"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Clone the AUR package\r\ngit clone https://aur.archlinux.org/kwctl.git\r\ncd kwctl\r\n\r\n# Build and install the package\r\nmakepkg -si\n"})}),(0,t.jsx)(n.h4,{id:"verify-the-installation",children:"Verify the installation"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kwctl --version\n"})}),(0,t.jsx)(n.h3,{id:"manual-installation",children:"Manual installation"}),(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Download the latest release of ",(0,t.jsx)(n.code,{children:"kwctl"})," for Linux:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-linux-x86_64.zip\n"})}),"\n",(0,t.jsx)(n.p,{children:"For ARM64 systems (e.g., Raspberry Pi), use:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-linux-aarch64.zip\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Extract the files from the downloaded ",(0,t.jsx)(n.code,{children:".zip"})," file:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"unzip kwctl-linux-x86_64.zip\n"})}),"\n",(0,t.jsx)(n.p,{children:"This extracts the following files:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-linux-x86_64"}),": The ",(0,t.jsx)(n.code,{children:"kwctl"})," binary"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-linux-x86_64.sig"}),": A signature file for verifying the binary"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-linux-x86_64.pem"}),": A certificate file for verifying the signature"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Move the binary to a directory in your PATH, rename to ",(0,t.jsx)(n.code,{children:"kwctl"})," and make executable."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Verify the installation:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kwctl --version\n"})}),"\n"]}),"\n"]})]}),(0,t.jsxs)(a.A,{value:"mac",children:[(0,t.jsx)(n.h2,{id:"install-for-apple",children:"Install for Apple"}),(0,t.jsx)(n.h3,{id:"using-homebrew-1",children:"Using Homebrew"}),(0,t.jsxs)(n.p,{children:["Install ",(0,t.jsx)(n.code,{children:"kwctl"}),":"]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"brew install kwctl\n"})}),(0,t.jsx)(n.p,{children:"Verify installation:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kwctl --version\n"})}),(0,t.jsx)(n.h3,{id:"manual-installation-1",children:"Manual installation"}),(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Download the latest release of ",(0,t.jsx)(n.code,{children:"kwctl"})," for macOS:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["For ",(0,t.jsx)(n.strong,{children:"Apple Silicon (ARM64)"})," systems, use:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-darwin-aarch64.zip\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["For ",(0,t.jsx)(n.strong,{children:"Intel (x86_64)"})," systems, use:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-darwin-x86_64.zip\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Extract the files from the downloaded ",(0,t.jsx)(n.code,{children:".zip"})," file:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"unzip kwctl-darwin-x86_64.zip\n"})}),"\n","This extracts the following files:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-darwin-x86_64"}),": The ",(0,t.jsx)(n.code,{children:"kwctl"})," binary"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-darwin-x86_64.sig"}),": A signature file for verifying the binary"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-darwin-x86_64.pem"}),": A certificate file for verifying the signature"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Move the binary to a directory in your PATH, rename to ",(0,t.jsx)(n.code,{children:"kwctl"})," and make executable."]}),"\n",(0,t.jsxs)(n.li,{children:["Verify the Installation\r\nCheck the ",(0,t.jsx)(n.code,{children:"kwctl"})," installation:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kwctl --version\n"})}),"\n"]}),"\n"]})]}),(0,t.jsxs)(a.A,{value:"windows",children:[(0,t.jsx)(n.h2,{id:"install-for-windows",children:"Install for Windows"}),(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Download ",(0,t.jsx)(n.code,{children:"kwctl"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Open your browser and go to the ",(0,t.jsx)(n.a,{href:"https://github.com/kubewarden/kwctl/releases/latest",children:"Kubewarden releases page"})]}),"\n",(0,t.jsxs)(n.li,{children:["Download the ",(0,t.jsx)(n.code,{children:"kwctl-windows-x86_64.zip"})," file."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Extract the files from the downloaded zip file. It will contain:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-windows-x86_64.exe"}),": the ",(0,t.jsx)(n.code,{children:"kwctl"})," binary."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-windows-x86_64.sig"}),": a signature file for verifying the binary."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"kwctl-windows-x86_64.pem"}),": a certificate file for verifying the signature."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Rename the binary file from ",(0,t.jsx)(n.code,{children:"kwctl-windows-x86_64.exe"})," to ",(0,t.jsx)(n.code,{children:"kwctl.exe"})," for easier use."]}),"\n",(0,t.jsxs)(n.li,{children:["Move the binary to a location covered by your ",(0,t.jsx)(n.code,{children:"PATH"})," environment variable."]}),"\n",(0,t.jsxs)(n.li,{children:["Verify the installation. Open a new command prompt or PowerShell window and check the ",(0,t.jsx)(n.code,{children:"kwctl"})," installation:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-cmd",children:"kwctl --version\n"})}),"\n"]}),"\n"]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"install-shell-completions",children:"Install shell completions"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"kwctl"})," CLI has the ",(0,t.jsx)(n.code,{children:"--shell"})," option to generate shell completion commands for your shell. You can use the output from this command to integrate completions into your shell."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"kwctl completions --shell [bash|elvish|fish|powershell|zsh]\n"})})]})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},28453:(e,n,l)=>{l.d(n,{R:()=>i,x:()=>a});var s=l(96540);const t={},r=s.createContext(t);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);