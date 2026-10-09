// Open and close component groups in the "Component / version" selector.
(() => {
  const components = document.querySelector('.nav-panel-explore .components');
  if (!components) return;

  components.addEventListener('click', event => {
    const toggle = event.target.closest('.component-group-toggle');
    if (!toggle || !components.contains(toggle)) return;
    const group = toggle.closest('.component-group');
    const expanded = group.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', expanded);
  });
})();
