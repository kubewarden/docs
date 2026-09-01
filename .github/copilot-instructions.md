# Kubewarden Docs — Copilot Instructions

## Build and preview

```bash
# Install dependencies
npm ci

# Build site locally (uses local filesystem sources)
make community-local

# Serve the built site
make preview

# Clean build artifacts
make clean

# Full local rebuild from scratch
make clean environment community-local
```

The build output lands in `build/site/`. Logs are written to `tmp/build.log`.

## Architecture

This is an [Antora](https://antora.org) multi-component documentation site written in AsciiDoc.

**Antora components** (each has an `antora.yml` defining its name and version):

| Component | Directory pattern | Notes |
|---|---|---|
| `kubewarden` | `docs/kw/version-*` | Site landing / umbrella component |
| `admission-controller` | `docs/admission-controller/version-*` | Main product docs, versioned `version-X.Y` |
| `sbom-scanner` | `docs/sbom-scanner/v*` | SBOM scanner docs, versioned `vX.Y.Z` |
| `shared` | `shared/` | Shared partials and variables; no pages |

**Playbooks**:
- `kw-local-community-playbook.yml` — uses `url: ./` (local filesystem); use this for development.
- `kw-remote-community-playbook.yml` — fetches from GitHub `main` branch; used by CI and Netlify.

**`product-docs-common/`** is a git submodule providing shared Antora extensions and `global-attributes.yml` (SUSE product names used across all product docs repos).

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

`partials/variables.adoc` pulls in the shared `kubewarden-variables` partial from `shared/` and resolves product name attributes for community vs. enterprise builds.

### Never hardcode product names in content

Use AsciiDoc attributes instead:

- `{product-name}` — resolves to community or enterprise name depending on build
- `{project-name}` — short project name
- `{short-product-name}`, `{product-abbrev}`

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

### Version management

- **`admission-controller`** versions: directories named `version-X.Y`
- **`sbom-scanner`** versions: directories named `vX.Y.Z`
- Prerelease (dev) versions have `prerelease: -dev` in `antora.yml`
- The current latest release has `display: 'X.Y-latest'` in `antora.yml`; the previous latest loses the `display:` line

Use the release script to create a new version:
```bash
./scripts/make-new-release.sh admission-controller <current-latest> <current-prerelease> <new-prerelease> [yyyy-mm-dd|-n]
./scripts/make-new-release.sh sbom-scanner <current-latest> <current-prerelease> <new-prerelease>
```

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
