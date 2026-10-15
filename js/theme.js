// Shared with js/theme-init.js, which applies the saved theme before first paint
const STORAGE_KEY = 'pulse-theme';
const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Not persisting is acceptable: the toggle still works for this visit
  }
}

function applyTheme(theme, toggle) {
  document.documentElement.dataset.theme = theme;
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
}

export function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  // Sync the button with the theme theme-init.js already chose
  applyTheme(document.documentElement.dataset.theme, toggle);

  toggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, toggle);
    storeTheme(nextTheme);
  });

  // Follow OS theme changes only until the user has made an explicit choice
  darkSchemeQuery.addEventListener('change', (event) => {
    if (getStoredTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light', toggle);
  });
}
