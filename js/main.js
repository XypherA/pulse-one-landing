// Entry point. Module scripts are deferred by default, so the DOM is
// already parsed here and no DOMContentLoaded listener is needed.
import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initReveal } from './reveal.js';
import { initNewsletterForm } from './form.js';

initTheme();
initNav();
initReveal();
initNewsletterForm();
