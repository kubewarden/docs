'use strict'

// Builds the component tree for partials/nav-explore.hbs from
// component-hierarchy.yml in the playbook directory.
// Antora loads helpers as virtual modules at <playbook dir>/ui-helpers/<name>.js,
// so __dirname/.. is the playbook directory and require() finds its node_modules.
const fs = require('node:fs')
const path = require('node:path')

const DEFAULT_CONFIG_PATH = path.join(__dirname, '..', 'component-hierarchy.yml')

function loadConfig (configPath = DEFAULT_CONFIG_PATH) {
  const yaml = require('js-yaml')
  return validateConfig(yaml.load(fs.readFileSync(configPath, 'utf8')), configPath)
}

function validateConfig (config, source = 'component hierarchy') {
  const fail = (message) => { throw new Error(`${source}: ${message}`) }
  if (!config || !Array.isArray(config.component_hierarchy)) fail('component_hierarchy must be a list')
  const hidden = config.hidden_components ?? []
  if (!Array.isArray(hidden)) fail('hidden_components must be a list')
  const seen = new Set()
  const check = (node, where) => {
    if (!node || typeof node.component !== 'string') fail(`${where}: component must be a string`)
    if (seen.has(node.component)) fail(`${where}: ${node.component} appears more than once`)
    seen.add(node.component)
    for (const key of ['expanded', 'include_versions']) {
      if (typeof node[key] !== 'boolean') fail(`${where} (${node.component}): ${key} must be true or false`)
    }
    if (node.title != null && typeof node.title !== 'string') fail(`${where} (${node.component}): title must be a string`)
    if (node.children != null && !Array.isArray(node.children)) fail(`${where} (${node.component}): children must be a list`)
    ;(node.children || []).forEach((child, i) => check(child, `${where}.children[${i}]`))
  }
  config.component_hierarchy.forEach((node, i) => check(node, `component_hierarchy[${i}]`))
  return { nodes: config.component_hierarchy, hidden }
}

// Antora passes site.components to templates as an object keyed by name.
function buildTree (components, currentComponent, config) {
  const componentList = Array.isArray(components) ? components : Object.values(components || {})
  const byName = new Map(componentList.map((component) => [component.name, component]))
  const used = new Set(config.hidden)

  const resolve = (node) => {
    const component = byName.get(node.component)
    if (!component) throw new Error(`component hierarchy: no Antora component named ${node.component}`)
    used.add(node.component)
    const children = (node.children || []).map(resolve)
    const isCurrent = component === currentComponent
    const containsCurrent = children.some((child) => child.isCurrent || child.containsCurrent)
    return {
      component,
      name: component.name,
      title: node.title || component.title,
      includeVersions: node.include_versions,
      expanded: children.length > 0 && (node.expanded || containsCurrent),
      isCurrent,
      containsCurrent,
      children,
    }
  }

  const tree = config.nodes.map(resolve)
  // Never drop a component because the YAML file does not mention it yet.
  for (const component of componentList) {
    if (used.has(component.name)) continue
    tree.push({
      component,
      name: component.name,
      title: component.title,
      includeVersions: true,
      expanded: false,
      isCurrent: component === currentComponent,
      containsCurrent: false,
      children: [],
    })
  }
  return tree
}

let cachedConfig

module.exports = (components, currentComponent) => {
  cachedConfig ??= loadConfig()
  // Handlebars passes its options object last; ignore it when no page component is given.
  if (currentComponent && currentComponent.hash) currentComponent = undefined
  return buildTree(components, currentComponent, cachedConfig)
}

module.exports.loadConfig = loadConfig
module.exports.validateConfig = validateConfig
module.exports.buildTree = buildTree
