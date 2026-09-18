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
node --test tests/community-theme.test.cjs
```

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
