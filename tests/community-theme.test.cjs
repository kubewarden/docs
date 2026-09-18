const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = readFileSync(join(__dirname, '../kw-community-docs-supp-files/js/theme.js'), 'utf8');

function browser({ stored = null, dark = false, blocked = false } = {}) {
  const listeners = new Map();
  const target = name => ({ addEventListener(event, handler) { listeners.set(`${name}:${event}`, handler); } });
  const attributes = new Map();
  const button = { ...target('button'), hidden: true, setAttribute(name, value) { attributes.set(name, value); } };
  const system = { ...target('system'), matches: dark };
  let ready = false;
  let value = stored;
  const changes = [];
  const document = { ...target('document'), documentElement: { dataset: {} }, getElementById() { return ready ? button : null; } };
  vm.runInNewContext(source, {
    document,
    window: { ...target('window'), dispatchEvent(event) { changes.push(event.type); } },
    CustomEvent: class { constructor(type) { this.type = type; } },
    matchMedia: () => system,
    localStorage: {
      getItem() { if (blocked) throw Error('Storage blocked'); return value; },
      setItem(_, next) { if (blocked) throw Error('Storage blocked'); value = next; },
    },
  });
  const emit = (name, event, data = {}) => listeners.get(`${name}:${event}`)?.(data);
  return {
    button, attributes, changes,
    theme: () => document.documentElement.dataset.theme,
    stored: () => value,
    ready() { ready = true; emit('document', 'DOMContentLoaded'); },
    click() { emit('button', 'click'); },
    system(dark) { system.matches = dark; emit('system', 'change'); },
    external(next, key = 'kubewarden-theme') { value = next; emit('window', 'storage', { key }); },
    restore(next) { value = next; emit('window', 'pageshow'); },
  };
}

test('applies the system theme before the header exists and updates its accessible label', () => {
  const page = browser({ dark: true });
  assert.equal(page.theme(), 'dark');
  page.ready();
  assert.equal(page.button.hidden, false);
  assert.equal(page.attributes.get('aria-label'), 'Switch to light theme');
  page.system(false);
  assert.equal(page.theme(), 'light');
  assert.equal(page.button.title, 'Switch to dark theme');
  assert.deepEqual(page.changes, ['kubewarden-theme-change', 'kubewarden-theme-change']);
});

test('persists an explicit choice and ignores later system changes', () => {
  const page = browser({ stored: 'light', dark: true });
  page.ready();
  page.click();
  assert.equal(page.stored(), 'dark');
  page.system(false);
  assert.equal(page.theme(), 'dark');
  assert.equal(browser({ stored: page.stored() }).theme(), 'dark');
});

test('supports invalid values and unavailable storage', () => {
  assert.equal(browser({ stored: 'invalid', dark: true }).theme(), 'dark');
  const page = browser({ blocked: true, dark: true });
  page.ready();
  page.click();
  page.restore(null);
  page.system(true);
  assert.equal(page.theme(), 'light');
});

test('synchronizes tabs, cleared storage, and pages restored from the back/forward cache', () => {
  const page = browser({ stored: 'light', dark: true });
  page.ready();
  page.external('dark');
  assert.equal(page.theme(), 'dark');
  page.external('light', 'unrelated');
  assert.equal(page.theme(), 'dark');
  page.external(null, null);
  page.system(false);
  assert.equal(page.theme(), 'light');
  page.restore('dark');
  assert.equal(page.theme(), 'dark');
});
