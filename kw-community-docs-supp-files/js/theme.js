// Loaded in the head, before the community styles, to avoid a theme flash.
(() => {
  const key = 'kubewarden-theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  const readPreference = () => {
    try {
      const stored = localStorage.getItem(key);
      preference = stored === 'light' || stored === 'dark' ? stored : null;
    } catch (_) { /* Retain the in-memory choice when storage is unavailable. */ }
  };
  const apply = () => {
    const theme = preference || (system.matches ? 'dark' : 'light');
    const changed = document.documentElement.dataset.theme !== theme;
    document.documentElement.dataset.theme = theme;
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.hidden = false;
      button.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
      button.setAttribute('aria-label', button.title);
    }
    if (changed) window.dispatchEvent(new CustomEvent('kubewarden-theme-change'));
  };
  readPreference();
  apply();
  system.addEventListener('change', apply);
  window.addEventListener('pageshow', () => { readPreference(); apply(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) { readPreference(); apply(); }
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch (_) { /* Use the choice for this page. */ }
      apply();
    });
  });
})();
