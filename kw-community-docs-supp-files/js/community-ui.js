// Keep the bundle's navigation behavior and expose its state to keyboard users.
(() => {
  const watchState = (element, button) => {
    if (!element || !button) return;
    const update = () => button.setAttribute('aria-expanded', element.classList.contains('is-active'));
    update();
    new MutationObserver(update).observe(element, { attributes: true, attributeFilter: ['class'] });
  };
  const explore = document.querySelector('.nav-panel-explore');
  watchState(explore, explore?.querySelector('.context'));
  const drawer = document.querySelector('.nav-container');
  const navToggle = document.querySelector('.nav-toggle');
  watchState(drawer, navToggle);
  document.querySelectorAll('.nav-item-toggle').forEach(button => watchState(button.parentElement, button));
  const menuToggle = document.querySelector('.nav-menu-toggle');
  if (menuToggle) {
    const updateMenuAction = () => {
      const action = menuToggle.classList.contains('is-active') ? 'Collapse' : 'Expand';
      const label = `${action} all navigation sections`;
      menuToggle.setAttribute('aria-label', label);
      menuToggle.title = label;
    };
    updateMenuAction();
    new MutationObserver(updateMenuAction).observe(menuToggle, { attributes: true, attributeFilter: ['class'] });
  }
  document.querySelector('.is-current-page > .nav-link')?.setAttribute('aria-current', 'page');
  document.querySelector('.skip-link')?.addEventListener('click', () => {
    document.getElementById('main-content')?.focus({ preventScroll: true });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const burger = document.querySelector('.navbar-burger.is-active');
    if (burger) { burger.click(); burger.focus(); }
    if (drawer?.classList.contains('is-active')) { navToggle.click(); navToggle.focus(); }
    if (explore?.classList.contains('is-active') && document.querySelector('.nav-panel-menu')) {
      const context = explore.querySelector('.context');
      context.click();
      context.focus();
    }
  });

  // Contain wide reference tables without making the whole article scroll.
  document.querySelectorAll('.doc table.tableblock').forEach(table => {
    if (table.parentElement.classList.contains('tablecontainer')) return;
    const container = document.createElement('div');
    container.className = 'tablecontainer';
    container.tabIndex = 0;
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', table.caption?.textContent || 'Scrollable table');
    table.before(container);
    container.append(table);
  });
})();
