// Intentionally simple: catches typos like a missing "@" or domain.
// Real validation (does the inbox exist?) can only happen on a server.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getEmailError(email) {
  if (!email) return 'Please enter your email address.';
  if (!EMAIL_PATTERN.test(email)) return 'Please enter a valid email, like you@example.com.';
  return '';
}

function setStatus(input, message, text, type) {
  input.setAttribute('aria-invalid', String(type === 'error'));
  // textContent (not innerHTML) so user input can never be rendered as markup
  message.textContent = text;
  message.classList.toggle('newsletter__message--error', type === 'error');
  message.classList.toggle('newsletter__message--success', type === 'success');
}

export function initNewsletterForm() {
  const form = document.querySelector('.newsletter__form');
  if (!form) return;

  const input = form.elements.email;
  const message = form.querySelector('.newsletter__message');

  form.addEventListener('submit', (event) => {
    // No backend: this is a front-end demo, so we never actually submit
    event.preventDefault();

    const email = input.value.trim();
    const error = getEmailError(email);

    if (error) {
      setStatus(input, message, error, 'error');
      input.focus();
      return;
    }

    setStatus(input, message, `Thanks! We'll email ${email} when Pulse One launches.`, 'success');
    form.reset();
  });

  // Clear the error as soon as the user starts fixing it
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') setStatus(input, message, '', 'idle');
  });
}
