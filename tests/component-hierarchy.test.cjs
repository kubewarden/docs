const assert = require('node:assert/strict');
const test = require('node:test');
const { join } = require('node:path');
const { loadConfig, validateConfig, buildTree } = require('../kw-community-docs-supp-files/helpers/componenthierarchy');

const component = (name, title) => ({ name, title, url: `/${name}/`, versions: [] });
// Antora passes site.components as an object keyed by component name.
const components = {
  kubewarden: component('kubewarden', 'Kubewarden'),
  'admission-controller': component('admission-controller', 'Admission Controller'),
  'sbom-scanner': component('sbom-scanner', 'SBOM Scanner'),
  shared: component('shared', 'Shared'),
};
const config = validateConfig({
  component_hierarchy: [{
    component: 'kubewarden',
    expanded: false,
    include_versions: false,
    children: [
      { component: 'admission-controller', expanded: false, include_versions: true },
      { component: 'sbom-scanner', expanded: false, include_versions: true, title: 'SBOM' },
    ],
  }],
  hidden_components: ['shared'],
});

test('the repository configuration loads and names every live component', () => {
  const repoConfig = loadConfig(join(__dirname, '..', 'component-hierarchy.yml'));
  const names = [];
  const walk = nodes => nodes.forEach(node => { names.push(node.component); walk(node.children || []); });
  walk(repoConfig.nodes);
  for (const name of ['kubewarden', 'admission-controller', 'sbom-scanner', 'runtime-enforcer', 'network-enforcer']) {
    assert.ok(names.includes(name), `${name} is missing from component-hierarchy.yml`);
  }
  assert.deepEqual(repoConfig.hidden, ['shared']);
});

test('builds a tree from the object form of site.components', () => {
  const [root] = buildTree(components, undefined, config);
  assert.equal(root.title, 'Kubewarden');
  assert.equal(root.includeVersions, false);
  assert.deepEqual(root.children.map(child => child.title), ['Admission Controller', 'SBOM']);
});

test('the group that contains the current component opens', () => {
  const [closed] = buildTree(components, components.kubewarden, config);
  assert.equal(closed.isCurrent, true);
  assert.equal(closed.expanded, false);
  const [open] = buildTree(components, components['sbom-scanner'], config);
  assert.equal(open.containsCurrent, true);
  assert.equal(open.expanded, true);
  assert.equal(open.children[1].isCurrent, true);
});

test('unlisted components show at the top level, hidden ones do not', () => {
  const tree = buildTree({ ...components, extra: component('extra', 'Extra') }, undefined, config);
  assert.deepEqual(tree.map(node => node.name), ['kubewarden', 'extra']);
});

test('invalid configuration fails with a clear message', () => {
  assert.throws(() => validateConfig({ component_hierarchy: [{ component: 'kubewarden', include_versions: false }] }), /expanded must be true or false/);
  assert.throws(() => validateConfig({ component_hierarchy: [
    { component: 'a', expanded: true, include_versions: true },
    { component: 'a', expanded: true, include_versions: true },
  ] }), /appears more than once/);
  assert.throws(() => buildTree(components, undefined, validateConfig({
    component_hierarchy: [{ component: 'missing', expanded: true, include_versions: true }],
  })), /no Antora component named missing/);
});
