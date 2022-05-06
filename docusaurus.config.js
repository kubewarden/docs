/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title:
    "Kubernetes Dynamic Admission at your fingertips",
  tagline: "",
  url: "https://kubewarden.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "kubewarden", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  themeConfig: {
    colorMode: {
      // "light" | "dark"
      defaultMode: "light",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,
    },
    navbar: {
      title: "",
      logo: {
        alt: "logo",
        src: "img/icon-kubewarden.svg",
      },
      items: [
        {
          type: "doc",
          docId: "introduction",
          position: "right",
          label: "Docs",
          className: "navbar__docs",
        },
        {
          href: "https://github.com/kubewarden/",
          label: "GitHub",
          position: "right",
          className: "navbar__github btn btn-secondary icon-github",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} SUSE Rancher. All Rights Reserved.`,
    },
  },
  customFields: {
    title: "Kubewarden",
    description:
      "Kubernetes Dynamic Admission at your fingertips",
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          /* other docs plugin options */
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          editUrl: "https://github.com/kubewarden/docs/edit/main/",
        },
        blog: false, // Optional: disable the blog plugin
        // ...
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ], 
};
