# AGENTS.md — Kubewarden Docs

## Build and preview

```bash
# Install dependencies
npm ci

# Build site locally (uses local filesystem sources)
make community-local

# Serve the built site
make preview

# Rebuild on file change and live-reload the browser (http://127.0.0.1:8080)
make dev

# Clean build artifacts
make clean

# Full local rebuild from scratch
make clean environment community-local
```

Build output lands in `build/site/`. Logs are written to `tmp/build.log`.

`make dev` runs a full Antora build (all components and versions, ~20-25s)
on every change under `docs/`, `shared/`, or `kw-community-docs-supp-files/`,
then live-reloads the browser. Antora has no incremental build mode, so
there is no way to rebuild a single page faster; the whole site is
regenerated every time because navigation, cross-references, and version
selectors depend on the full content set. Stop it with Ctrl-C.

## Architecture

This is an [Antora](https://antora.org) multi-component documentation site written in AsciiDoc.

**Antora components** (each has an `antora.yml` defining its name and version):

| Component | Directory pattern | Notes |
|---|---|---|
| `kubewarden` | `docs/kw/version-*` | Site landing / umbrella component |
| `admission-controller` | `docs/admission-controller/version-*` | Main product docs, versioned `version-X.Y` |
| `sbom-scanner` | `docs/sbom-scanner/v*` | SBOM scanner docs, versioned `version-X.Y` |
| `runtime-enforcer` | `docs/runtime-enforcer/version-*` | Runtime enforcer docs, versioned `version-X.Y` |
| `network-enforcer` | `docs/network-enforcer/version-*` | Network enforcer docs, versioned `version-X.Y` |
| `shared` | `shared/` | Shared partials and variables; no pages |

**Playbooks**:
- `kw-local-community-playbook.yml` — uses `url: ./` (local filesystem); use this for development.
- `kw-remote-community-playbook.yml` — fetches from GitHub `main` branch; used by CI and Netlify.

**`docs-common/`** is a git submodule (the `rancher/product-docs-common` repository) providing shared Antora extensions and `global-attributes.yml` (SUSE product names used across all product docs repos).

Each component version directory contains:
```
antora.yml
modules/en/
  nav.adoc
  pages/          # .adoc content files
  partials/       # included fragments, especially variables.adoc
  images/
```

## Key conventions

### Every page must begin with the variables partial

```asciidoc
include::partial$variables.adoc[]
= Page Title
:revdate: YYYY-MM-DD
```

`partials/variables.adoc` pulls in the component wrapper from `shared/` and
the build specific values for the version. See "Community and product
builds".

### Community and product builds

The same page source builds two sites: the community site from this
repository, and the SUSE product site from the product repository. Both
repositories have the same structure. The playbook sets the `build-type`
attribute to `community` or `product`. Do not set `build-type` anywhere else.

This repository holds shared content and community content only. Keep
references to the product to a minimum.

#### Product names

Do not hardcode a product name. Use the name attributes:

| Component | Full name | Short name | Abbreviation |
|---|---|---|---|
| `admission-controller` | `{admc-name}` | `{admc-short-name}` | `{admc-abbrev}` |
| `sbom-scanner` | `{sboms-name}` | `{sboms-short-name}` | `{sboms-abbrev}` |
| `runtime-enforcer` | `{rte-name}` | `{rte-short-name}` | `{rte-abbrev}` |
| `network-enforcer` | `{ne-name}` | `{ne-short-name}` | `{ne-abbrev}` |

- Use the full name for the first mention on a page and in `:description:`.
  Use the short name after that.
- Keep literal names in commands, Helm release names, namespaces, labels,
  and generated reference partials.
- These attributes give the name of the current build. If a page must name
  the community project in every build, use the community form, for example
  `{admc-community-name}`.
- Older versions use `{product-name}`, `{project-name}`, and
  `{short-product-name}` from the legacy shared partials. Do not use them in
  new content.

#### Where attribute values go

| Scope | Same in every build | Different per build |
|---|---|---|
| All components | `shared/modules/en/partials/globals.adoc` | `shared/modules/en/partials/community-specific/globals.adoc` |
| All versions of one component | `shared/modules/en/partials/<key>-variables.adoc` | `shared/modules/en/partials/community-specific/<key>-variables.adoc` |
| One component version | `partials/variables.adoc` | `partials/community-specific/variables.adoc` |

The component keys are `admc`, `ne`, `rte`, `sboms`, and `kw`. The product
repository has the same files with `product-specific/` in place of
`community-specific/`.

The files include each other in this order: global, then component, then
version. A later definition overrides an earlier one.

- A version's `partials/variables.adoc` includes its component wrapper,
  `<key>-variables.adoc`, then `{build-type}-specific/variables.adoc`.
- The wrapper includes `globals.adoc`, then
  `{build-type}-specific/<key>-variables.adoc`.
- `globals.adoc` ends with `include::{build-type}-specific/globals.adoc[]`.

`globals.adoc` defines the community name of each component, for example
`{admc-community-name}`. Both builds use these names. `community-specific/globals.adoc`
only selects them, for example `:admc-name: {admc-community-name}`. The
product names are not in this repository. The product repository defines and
selects them in its `product-specific/globals.adoc`. To add a component, add
its community names to `globals.adoc` and its selection lines to
`community-specific/globals.adoc`.

Every version includes the `shared` files from `latest@shared`. A change in
`shared` changes every published version. Put a value there only if it is
true for all published versions. Otherwise, put it in the version.

#### Build specific content

- A whole page that exists in only one build goes in
  `pages/{build-type}-specific/`. Its URL contains the directory name.
- A passage that exists in only one build goes in a partial,
  `partials/{build-type}-specific/<name>.adoc`, that the shared page
  includes with `include::partial${build-type}-specific/<name>.adoc[]`. If a
  build has no text for the passage, its partial holds only a comment.
- If the two builds differ only in a value, such as a URL, use an attribute
  instead of a partial. For example, the contribution guide uses
  `{docs-repo-url}`.
- Nav entries that exist in only one build go in a nav fragment,
  `partials/{build-type}-specific/nav-<section>.adoc`. The `nav.adoc`
  includes the fragment with a tag:

  ```asciidoc
  ** Migrations
  include::partial${build-type}-specific/nav-migrations.adoc[tag=nav]
  ```

  The fragment puts its entries between `// tag::nav[]` and
  `// end::nav[]`. If a build has no entries, the fragment holds only the
  two tag lines.

Use a tag for every partial that you include inside a list. `vlp.js` from
`docs-common` adds an attribute line to the top of every included file.
Inside a list, that line becomes part of the list item text. A blank line
before the include does not help, because it ends the list.

#### Rules

- Do not use `ifeval::["{build-type}" == ...]`. Some older versions and
  pages, and the legacy `kubewarden-variables-*.adoc` partials, still use
  it. Replace it when you edit that content.
- Do not set name attributes in `antora.yml`. Antora gives `antora.yml` and
  playbook attributes priority over values that a page sets, and does not
  warn.
- The playbooks set `attribute-missing: warn`. A reference to an undefined
  attribute causes a `WARN (asciidoctor): skipping reference to missing
  attribute` line in `tmp/build.log`.

#### Sync to the product repository

The product repository copies everything from this repository except the
`community-specific/` directories. It adds its own `product-specific/`
files. Keep `globals.adoc` and the component wrappers the same in both
repositories. A script and a GitHub Action will automate the sync.

### Required page-level attributes

All pages should carry:
```asciidoc
:revdate: YYYY-MM-DD
:page-revdate: {revdate}
:description: <SEO description>
:doc-persona: ["kubewarden-all"]   # or specific persona(s)
:doc-topic: ["..."]
:doc-type: ["explanation"|"howto"|"tutorial"|"reference"]
```

### Cross-component Antora xrefs

Use full Antora xref syntax when linking across components or versions:

```asciidoc
xref:latest@admission-controller:en:introduction.adoc[Link text]
xref:dev@sbom-scanner:en:introduction.adoc[Link text]
```

Within the same component and version, shorter forms are fine:
```asciidoc
xref:howtos/policy-management.adoc[]
```

### Always use explicit anchors for link targets

Every heading, block or other element that a link points to must have an
explicit ID. Do not rely on Asciidoctor's auto-generated IDs. They change
when the heading text changes, which breaks downstream translations.

When you add an ID to an existing heading, use its current auto-generated
value (for example `_policy_management`), so that existing links keep working.

Always use `xref:` syntax for links to anchors. Do not use `<<>>`.
(Generated reference partials are exempt. See "Generated reference documentation".)

```asciidoc
xref:howtos/policy-management.adoc#_policy_management[Link text] for a different
document,

or

xref:#_policy_management[Link text] in the same document
```

with the heading defined as:

```asciidoc
[#_policy_management]
== Policy Management
```

### Version management

- **`admission-controller`** versions: directories named `version-X.Y`
- **`sbom-scanner`** versions: directories named `version-X.Y`
- **`runtime-enforcer`** versions: directories named `version-X.Y`
- **`network-enforcer`** versions: directories named `version-X.Y`
- Prerelease (dev) versions have `prerelease: -dev` in `antora.yml`
- The current latest release has `display: 'X.Y-latest'` in `antora.yml`; the previous latest loses the `display:` line
- The landing page in `docs/kw/` links each component with `latest@` xrefs. When you promote a version, check that those xrefs use the page paths of the newly promoted layout. A page alias keeps an old path working through a redirect, but the link should point at the page directly.

Each component must always have **exactly one** version directory with `prerelease:` and **exactly one** with a `-latest` display marker. These are not conventions, the automation depends on them:

- The promotion target in `updatecli/updatecli.d/antora.yaml` fails the scheduled job when either count is wrong.
- The reference documentation manifests read the dev version from the directory marked `prerelease:` to decide where generated partials are written.

Never remove `prerelease:` from a version directory by hand without adding `display: 'X.Y-latest'` to it and removing that line from the previous latest. Doing so stalls the automatic version bump. Use the release script instead, which handles both edits.

The component repository defines the version number. The `prerelease:` directory is a placeholder for the next release, and its number is a guess made by the previous promotion. When a release appears, the promotion renames that directory to the published version. The placeholder number carries no meaning until that rename happens, so a placeholder whose number differs from the next release is normal.

Use the release script to create a new version:
```bash
./scripts/make-new-release.sh admission-controller <current-latest> <current-prerelease> <new-prerelease> [yyyy-mm-dd|-n]
./scripts/make-new-release.sh sbom-scanner <current-latest> <current-prerelease> <new-prerelease>
./scripts/make-new-release.sh runtime-enforcer <current-latest> <current-prerelease> <new-prerelease>
./scripts/make-new-release.sh network-enforcer <current-latest> <current-prerelease> <new-prerelease>
```

### Generated reference documentation

Some partials are copies of files that upstream repositories generate. Do not edit them by hand. A scheduled updatecli job (`.github/workflows/update-ref-docs.yml`) copies them and opens a pull request. The values files under `updatecli/values.d/` hold the source and destination paths.

| Component | Upstream file | Partial |
|---|---|---|
| `admission-controller` | `adm-controller/docs/crds/CRD-docs-for-docs-repo.adoc` | `partials/crd-reference.adoc` |
| `admission-controller` | `adm-controller/crates/kwctl/cli-docs.adoc` | `partials/kwctl-cli-reference.adoc` |
| `admission-controller` | `adm-controller/crates/policy-server/cli-docs.adoc` | `partials/policy-server-cli-reference.adoc` |
| `sbom-scanner` | `sbomscanner/docs/crds/CRD-docs-for-docs-repo.adoc` | `partials/crd-reference.adoc` |
| `runtime-enforcer` | `runtime-enforcer/docs/crds/CRD-docs-for-docs-repo.adoc` | `partials/crd-reference.adoc` |
| `runtime-enforcer` | `runtime-enforcer/docs/kubectl-plugin/cli-docs.adoc` | `partials/kubectl-plugin-cli-reference.adoc` |
| `network-enforcer` | `network-enforcer/docs/crds/CRD-docs-for-docs-repo.adoc` | `partials/crd-reference.adoc` |

The partials land in the current dev version only. An hourly updatecli job (`.github/workflows/updatecli.yml`) watches upstream releases. When a new release appears, the job promotes the dev version and points the values files at the next dev version.

### Release version attributes

Each component's dev version defines two AsciiDoc attributes in `partials/community-specific/variables.adoc`:

```asciidoc
:release-tag: v1.38.2
:chart-version: 6.1.0
```

Use `{release-tag}` for the upstream release tag (image tags, cosign certificate identities) and `{chart-version}` for the published Helm chart version. Inside a `[source]` block, add `subs="+attributes"` or the attribute is printed literally.

Do not bump these by hand. The hourly updatecli job runs `updatecli/updatecli.d/update-release-attributes.yaml` for each component. It reads the latest GitHub release of the component repository and the latest `<chart name>-X.Y.Z` release of `kubewarden/helm-charts`, and rewrites the two attributes in the dev version. The chart name per component is `chartName` in `updatecli/values.d/`.

### Mermaid diagrams

The local extension `extensions/mermaid-block.js` processes `[mermaid]`
blocks. It writes the diagram source into the page. The browser draws the
diagram with `kw-community-docs-supp-files/js/mermaid-init.js`, which loads
mermaid from a CDN and applies the site theme.

To use attributes such as `{sboms-short-name}` in a diagram, add
`subs="attributes"`:

```asciidoc
[mermaid,subs="attributes"]
....
graph LR
    accTitle: {sboms-short-name} architecture
....
```

Do not use `subs="+attributes"`. The normal substitutions escape `>`, and
this breaks mermaid arrows. An attribute value that contains `"` or `]`
breaks the diagram syntax.

### Spell checking

`typos` checks `.adoc` files in `docs/` and `shared/`. Configuration is in `typos.toml`. Add intentional exceptions to `[default.extend-words]` or `[default.extend-identifiers]`, or use an inline `# adn:ignore` comment to suppress a specific line.

Run locally with:
```bash
typos .
```

### CI checks

- **Spell check**: `typos` via `crate-ci/typos` GitHub Action
- **Shell scripts**: `shellcheck scripts/*.sh`
- **Build validation**: `make community-local` on every PR

### ASD-STE100

When you write or edit .adoc content, use the simple-english skill in pragmatic mode.
