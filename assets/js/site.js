(function () {
  /** Single source of truth for symposium line shown in the top bar on every page. */
  const RCP_SYM = {
    topbarDetails: 'June 5, 2026 · Rutgers–New Brunswick · Hosted by Chemistry',
  };

  document.querySelectorAll('[data-rcp-symposium-topbar]').forEach((el) => {
    el.textContent = RCP_SYM.topbarDetails;
  });
})();

(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) link.classList.add('active');
  });
})();

(function () {
  const countTarget = document.querySelector('[data-member-group-count]');
  if (!countTarget) return;

  fetch('members.html')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load members page');
      return response.text();
    })
    .then((html) => {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const count = parsed.querySelectorAll('.member-card.card').length;
      if (count > 0) countTarget.textContent = String(count);
    })
    .catch(() => {
      // Keep fallback value in markup if fetch fails.
    });
})();
