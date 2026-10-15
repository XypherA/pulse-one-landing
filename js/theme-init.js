// Loaded as a classic, render-blocking script (not a module) so the theme is
// set before the first paint. Without this, dark-mode users would see a white flash.
// The storage key must match the one in js/theme.js.
(() => {
  const STORAGE_KEY = 'pulse-theme';
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked (e.g. strict privacy settings); fall back to the system theme
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isValidTheme = savedTheme === 'light' || savedTheme === 'dark';
  const systemTheme = prefersDark ? 'dark' : 'light';

  document.documentElement.dataset.theme = isValidTheme ? savedTheme : systemTheme;
})();
