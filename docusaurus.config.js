/** @type {import('@docusaurus/types').DocusaurusConfig} */

import dsVariableProcessor from "./js-lib/docusaurus-variables.js";
import substituteCurrentVersion from "./js-lib/current-version.js";

module.exports = {
  title: "Kubewarden",
  tagline: "Kubernetes Dynamic Admission at your fingertips",
  url: "https://docs.kubewarden.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "kubewarden", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  trailingSlash: false,
  markdown: {
    mermaid: true,
    preprocessor: ({ filePath, fileContent }) => {
      // Process variables
      fileContent = dsVariableProcessor(fileContent);
      fileContent = substituteCurrentVersion(fileContent, filePath);
      return fileContent;
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "D1IWU8P361",

      // Public API key: it is safe to commit it
      apiKey: "99387ef7038005749504e6845a694feb",

      indexName: "kubewarden",

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: "search",
    },
    prism: {
      // Enable extra languages when doing syntax highlighting
      additionalLanguages: ["hcl", "rust", "rego", "bash"],
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: "light",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,
    },
    navbar: {
      title: "Kubewarden",
      logo: {
        alt: "The Kubewarden Project logo",
        src: "img/icon-kubewarden.svg",
      },
      items: [
        {
          type: "docsVersionDropdown",
          position: "left",
          dropdownActiveClassDisabled: true,
        },
        {
          type: "search",
          position: "left",
        },
        {
          href: "https://github.com/kubewarden/",
          label: "GitHub",
          position: "right",
        },
        {
          type: "dropdown",
          label: "Community",
          position: "right",
          items: [
            {
              label: "Slack",
              href: "https://kubernetes.slack.com/archives/kubewarden",
            },
            {
              label: "Bluesky",
              href: "https://bsky.app/profile/kubewarden.io",
            },
            {
              label: "Mastodon",
              href: "https://hachyderm.io/@kubewarden",
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Kubewarden is a <a target="_blank" href="https://cncf.io">CNCF</a> project,
      originally created by <a target="_blank" href="https://rancher.com">SUSE Rancher</a>.</br>Copyright © ${new Date().getFullYear()} Kubewarden project authors. All rights reserved.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          /* other docs plugin options */
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
          editUrl: "https://github.com/kubewarden/docs/edit/main/",
          versions: {
            current: {
              label: "Next 🚧",
            },
          },
        },
        blog: false, // Optional: disable the blog plugin
        // ...
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
        gtag: {
          trackingID: "G-PSW07XK7TM", // Google Analytics tracking ID for CNCF
          anonymizeIP: true,
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"],
        redirects: [
          {
            from: ["/explanations/opa-comparison"],
            to: "/explanations/comparisons/opa-comparison",
          },
        ],
      },
    ],
  ],
};
