const assert = require('node:assert/strict');
const test = require('node:test');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const Handlebars = require('handlebars');
const helper = require('../kw-community-docs-supp-files/helpers/component-maturity');
const { lookup, renderLanding } = helper;

// Hypothetical graduation: these are test values, not historical claims.
const metadata = {
  'sbom-scanner': {
    default: 'stable',
    versions: { '0.12': 'beta', '0.13': 'experimental' },
  },
};

test('exact version overrides preserve historical maturity after graduation', () => {
  assert.deepEqual(lookup('sbom-scanner', '0.12', metadata), { status: 'beta', label: 'Beta' });
  assert.equal(lookup('sbom-scanner', '0.14', metadata).label, 'Stable');
  assert.equal(lookup('sbom-scanner', undefined, metadata).label, 'Stable');
});

test('prerelease lookup uses the Antora version, not its display label', () => {
  const page = { component: { name: 'sbom-scanner' }, version: '0.13', displayVersion: '0.13-dev' };
  assert.equal(lookup(page.component.name, page.version, metadata).label, 'Experimental');
  // A URL alias or display label is not an exact version override.
  assert.equal(lookup('sbom-scanner', '0.13-dev', metadata).label, 'Stable');
});

test('unknown components and invalid statuses do not produce badges', () => {
  for (const component of [undefined, 'kubewarden', 'shared', 'toString', '__proto__']) {
    assert.equal(lookup(component), undefined);
  }
  assert.equal(lookup('example', '1.0', { example: { default: 'invalid' } }), undefined);
});

test('landing badges use defaults while article badges can use overrides', () => {
  const html = '<h3>SBOM Scanner</h3><div data-component-maturity="sbom-scanner"></div>';
  const rendered = renderLanding(html, metadata);
  assert.equal(renderLanding(Buffer.from(html), metadata), rendered);
  assert.match(rendered, /Component maturity: Stable/);
  assert.match(rendered, /stability-stable/);
  assert.ok(rendered.startsWith('<h3>SBOM Scanner</h3>'));
  assert.equal(lookup('sbom-scanner', '0.12', metadata).label, 'Beta');
  assert.equal(renderLanding('<div data-component-maturity="unknown"></div>'), '');
  assert.equal(renderLanding('<p>Beta</p>'), '<p>Beta</p>');
});

test('Handlebars helper uses current defaults for documented components', () => {
  assert.equal(helper('sbom-scanner', { hash: { version: '0.12' } }).label, 'Beta');
  assert.equal(helper('admission-controller', { hash: { version: '1.37' } }).label, 'Stable');
  assert.match(helper('<div data-component-maturity="network-enforcer"></div>', { hash: { landing: true } }), /Experimental/);
});

test('toolbar template passes the page version and omits unconfigured components', () => {
  const handlebars = Handlebars.create();
  handlebars.registerHelper('component-maturity', (component, { hash }) => lookup(component, hash.version, metadata));
  const template = handlebars.compile(readFileSync(join(__dirname,
    '../kw-community-docs-supp-files/partials/component-maturity.hbs'), 'utf8'));
  const page = { component: { name: 'sbom-scanner' }, version: '0.13', displayVersion: '0.13-dev' };
  assert.match(template({ page }), /Component maturity: Experimental/);
  assert.match(template({ page: { ...page, version: '0.12', url: '/sbom-scanner/latest/en/introduction.html' } }), /Component maturity: Beta/);
  assert.equal(template({ page: {} }).trim(), '');
});
