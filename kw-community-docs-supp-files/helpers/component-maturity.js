'use strict'

// Community maturity metadata. Version keys must match antora.yml's version,
// not display labels such as "0.13-dev". Preserve historical statuses here
// before changing a default when a component graduates.
// Keep this helper self-contained: Antora loads UI helpers as virtual modules.
const components = {
  'admission-controller': { default: 'stable', versions: {} },
  'sbom-scanner': { default: 'beta', versions: {} },
  'runtime-enforcer': { default: 'beta', versions: {} },
  'network-enforcer': { default: 'experimental', versions: {} },
}

const labels = { stable: 'Stable', beta: 'Beta', experimental: 'Experimental' }

function lookup (component, version, metadata = components) {
  if (!Object.hasOwn(metadata, component)) return undefined
  const entry = metadata[component]
  const status = version != null && Object.hasOwn(entry.versions || {}, version)
    ? entry.versions[version]
    : entry.default
  if (!Object.hasOwn(labels, status)) return undefined
  return { status, label: labels[status] }
}

// Fill only explicit landing-page placeholders, before the HTML is published.
// No browser request or script is needed to display maturity information.
function renderLanding (contents, metadata = components) {
  return String(contents).replace(/<div data-component-maturity="([a-z0-9-]+)"><\/div>/g, (_, component) => {
    const maturity = lookup(component, undefined, metadata)
    if (!maturity) return ''
    return `<div class="component-stability"><span class="stability-pill stability-${maturity.status}" ` +
      `aria-label="Component maturity: ${maturity.label}">${maturity.label}</span></div>`
  })
}

module.exports = (componentOrContents, { hash = {} } = {}) => hash.landing
  ? renderLanding(componentOrContents)
  : lookup(componentOrContents, hash.version)

module.exports.lookup = lookup
module.exports.renderLanding = renderLanding
