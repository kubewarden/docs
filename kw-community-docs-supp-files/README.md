# Community documentation UI

The local and remote community playbooks load this directory through Antora's
`ui.supplemental_files`. Both playbooks load the base UI bundle from the `main`
branch of `rancher/product-docs-ui` with `snapshot: true`.

## Design

- `css/theme.css` contains the light and dark palettes, font declarations, and
  layout dimensions. Its palette roles match `kubewarden.io/assets/sass/_theme.scss`.
- `css/site-extra.css` styles Antora's layout and AsciiDoc elements.
- `css/search.css` styles the Lunr search results.
- `css/landing.css` styles the hero, component cards, and community section.
  The `page-role: kw-landing` attribute enables this presentation and removes
  the article title and pagination. The page supplies its own heading.
- `js/theme.js` applies the saved or system theme before the community CSS loads.
  It uses the website's `kubewarden-theme` storage key. Each origin stores its own
  preference. Storage failures do not prevent theme changes.
- `js/mermaid-init.js` renders diagrams again when the theme changes.
- `js/community-ui.js` adds navigation accessibility and scrollable table wrappers.

Keep new colors in the palette.
Use color roles in component styles.
Check light and dark themes, narrow screens, keyboard navigation, and print output.

## Product documentation boundary

Keep community presentation in this directory and the community playbooks.
Do not require these styles or scripts from reusable pages or shared partials.
The product repositories' remote playbooks use the SUSE DSC UI and its own
supplemental files. They do not select this directory.

## Preview

Run `make community-local`.
Then run `make preview`.
After UI edits, rebuild the site.
Then refresh the browser.
Check component/version navigation, search, copy buttons,
tabs, tables, diagrams, and prerelease notices in both themes.

Run the theme preference checks with:

```sh
node --test tests/*.test.cjs
```

## Component maturity

`helpers/component-maturity.js` contains the community maturity map and its lookup.
The toolbar checks the current component and Antora version for an exact override.
If no override exists, it uses the component default.
Components without a configured status have no pill.
The landing cards use the defaults, which describe current component maturity.
These defaults require manual synchronization with the main website.

Version overrides use the `version` value from `antora.yml`, such as `0.13`.
They do not use display labels such as `0.13-dev` or URL aliases such as `latest`.
Prerelease documentation keeps its separate warning.

For example, a future graduation could use this entry:

```js
'sbom-scanner': {
  default: 'stable',
  versions: { '0.11': 'beta', '0.12': 'beta', '0.13': 'beta' },
},
```

This example is hypothetical, not a record of release maturity.
Network Enforcer 0.2 has an explicit Experimental override.
Other versions use their component defaults unless an override exists.
Before you change a default, check the maturity of each existing documentation version.
Add explicit overrides for versions that must retain their previous status.
Then change the default.
Use `stable`, `beta`, or `experimental` as status values.

The community article template fills the landing page's `data-component-maturity`
placeholders at build time. The generated HTML includes the labels without browser scripts.
Keep the map in this UI directory so product documentation can manage maturity separately.

## Fonts and logos

The SUSE variable WOFF2 fonts come from the
[SUSE v2.001 release](https://github.com/SUSE/suse-font/releases/tag/v2.001):

| Local file | Archive path |
| --- | --- |
| `fonts/suse-v2.001-normal.woff2` | `suse-font-v2.001/fonts/webfonts/SUSE[wght].woff2` |
| `fonts/suse-v2.001-italic.woff2` | `suse-font-v2.001/fonts/webfonts/SUSE-Italic[wght].woff2` |

Both files are unmodified and use SIL Open Font License 1.1, included in
`fonts/SUSE-OFL.txt`. They match the files in the website repository.
The dark logo changes only the wordmark fill of `img/logo-kubewarden.svg`, from
`#344845` to `#F3F1F5`, as on the website.

The four `img/component-*.svg` icons match the website's Lucide component icons.
They use the ISC license in `img/LUCIDE-LICENSE.txt`.

The community footer matches the website's branding, social links, and legal text.
The `currentyear` helper supplies the copyright year at build time.
The social marks in `img/footer-social.svg` come from Simple Icons (CC0 1.0), as on the website.
The Rancher and CNCF logo variants are copies of the website assets.
Pages with `page-role: kw-landing` show large logos above the footer.
Other pages show compact logos inside the footer, with the same light and dark variants.
