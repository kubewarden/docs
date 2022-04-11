/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title:
    "The open source hyperconverged infrastructure (HCI) solution for a cloud native world",
  tagline: "",
  url: "https://kubewarden.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "harvester", // Usually your GitHub org/user name.
  projectName: "kubewarden.io", // Usually your repo name.
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
          href: "https://github.com/harvester/harvester",
          label: "GitHub",
          position: "right",
          className: "navbar__github btn btn-secondary icon-github",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} kubewarden.io`,
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
        },
        blog: false, // Optional: disable the blog plugin
        // ...
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'Policy-Hub',
        path: './hub',
        showReadingTime: true,
        // Please change this to your repo.
        editUrl:
          "https://hub.kubewarden.io/",
        blogTitle: 'Policy Hub',
        routeBasePath: 'hub',
        include: ['**/*.{md,mdx}'],
        postsPerPage: 10,
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'Helm-Charts',
        path: './charts',
        showReadingTime: true,
        // Please change this to your repo.
        editUrl:
          "https://charts.kubewarden.io/",
        blogTitle: 'Helm Charts',
        routeBasePath: 'hub',
        include: ['**/*.{md,mdx}'],
        postsPerPage: 10,
      },
    ],
  ], 
};
