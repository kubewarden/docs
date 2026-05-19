// If the component is the top-level KW intro then fully expand the left ToC
(() => {
  var navPanel = document.querySelector('.nav-panel-menu[data-component-name="kubewarden"]');
  if (!navPanel) return;

  var navMenuToggle = navPanel.querySelector('.nav-menu-toggle');
  var itemToggles = navPanel.querySelectorAll('.nav-item > .nav-item-toggle');

  itemToggles.forEach((toggle) => {
    toggle.parentElement.classList.add('is-active');
  });

  if (navMenuToggle) {
    navMenuToggle.classList.add('is-active');
  }
})();