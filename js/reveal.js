const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const OBSERVER_OPTIONS = {
  // Trigger slightly before the bottom edge so the animation is seen, not missed
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1,
};

function revealOnIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    // Each element animates once, so stop watching it
    observer.unobserve(entry.target);
  });
}

export function initReveal() {
  // Content is visible by default; we only opt into the hidden state when
  // the animation can actually run, so nothing is ever stuck invisible.
  if (!('IntersectionObserver' in window) || reducedMotionQuery.matches) return;

  document.documentElement.classList.add('has-reveal');

  const observer = new IntersectionObserver(revealOnIntersect, OBSERVER_OPTIONS);
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
