import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10.9.6/dist/mermaid.esm.min.mjs';

const diagrams = [...document.querySelectorAll('.mermaid')].map(element => ({ element, source: element.textContent }));
let pending = Promise.resolve();
function render() {
  // Serialize renders so rapid theme changes cannot mix Mermaid configurations.
  pending = pending.then(async () => {
    const style = getComputedStyle(document.documentElement);
    const color = name => style.getPropertyValue(name).trim();
    const dark = document.documentElement.dataset.theme === 'dark';
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        darkMode: dark,
        fontFamily: 'SUSE, system-ui, sans-serif',
        primaryColor: color('--surface-tint'),
        primaryTextColor: color('--text'),
        primaryBorderColor: color('--accent-color'),
        secondaryColor: color('--surface-muted'),
        tertiaryColor: color('--surface'),
        lineColor: color('--text-muted'),
        textColor: color('--text'),
        mainBkg: color('--surface-tint'),
        nodeBorder: color('--accent-color'),
        clusterBkg: color('--surface-muted'),
        clusterBorder: color('--border-strong'),
        edgeLabelBackground: color('--surface'),
      },
      themeCSS: `.policy > polygon.label-container { fill: ${color('--surface-tint')}; }
        .cluster.container > rect { fill: ${color('--surface-muted')}; }`,
      flowchart: { htmlLabels: false },
    });
    for (const { element, source } of diagrams) {
      element.removeAttribute('data-processed');
      element.textContent = source;
    }
    await mermaid.run({ nodes: diagrams.map(({ element }) => element) });
  }).catch(error => console.error('Could not render documentation diagram', error));
}
if (diagrams.length) {
  render();
  window.addEventListener('kubewarden-theme-change', render);
}
