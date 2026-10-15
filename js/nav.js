// Must match the desktop nav breakpoint in css/styles.css
const desktopQuery = window.matchMedia('(min-width: 900px)');

function isMenuOpen(toggle) {
  return toggle.getAttribute('aria-expanded') === 'true';
}

function setMenuOpen(toggle, menu, isOpen) {
  // aria-expanded is the single source of truth: CSS also reads it to animate the icon
  toggle.setAttribute('aria-expanded', String(isOpen));
  menu.classList.toggle('nav__menu--open', isOpen);
}

export function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById(toggle?.getAttribute('aria-controls'));
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle, menu, !isMenuOpen(toggle));
  });

  // One delegated listener instead of one per link
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(toggle, menu, false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isMenuOpen(toggle)) return;
    setMenuOpen(toggle, menu, false);
    // Return focus so keyboard users aren't left on a now-hidden link
    toggle.focus();
  });

  // Reset when resizing to desktop so the mobile state can't get stuck open
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(toggle, menu, false);
  });
}
