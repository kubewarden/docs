import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10.9.6/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#83e1be',
    edgeLabelBackground: '#ffefe9',
  },
  themeCSS: `
    .policy > polygon.label-container { fill: #ffefe9; }
    .cluster.container > rect { fill: #eafaf8; }
    .edgeLabel rect,
    .edgeLabel .labelBkg {
      fill: #ffefe9 !important;
      opacity: 1 !important;
      stroke: #4b5563 !important;
      stroke-width: 1px !important;
      vector-effect: non-scaling-stroke;
      transform-box: fill-box;
      transform-origin: center;
      transform: scale(1.08, 1.18);
    }
  `,
  flowchart: {
    htmlLabels: false,
  },
});