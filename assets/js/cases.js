/* Deep-dive case studies, rendered from window.PORTFOLIO.cases.
   Used on the homepage (#caseList) and on case-studies.html. */
(() => {
  'use strict';
  const D = window.PORTFOLIO || {};
  const host = document.getElementById('caseList');
  if (!host || !Array.isArray(D.cases)) return;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ST = { completed: '✅ Completed', ongoing: '🚧 In progress', experimental: '🧪 Experimental', academic: '🎓 Academic' };
  const blk = (n, label, body, cls) =>
    '<section class="cs__blk' + (cls ? ' ' + cls : '') + '"><h4><span class="cs__n">' + n + '</span>' + label + '</h4>' + body + '</section>';
  const list = (a) => '<ul>' + a.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>';

  host.innerHTML = D.cases.map((c, i) => {
    const arch = '<ol class="arch" aria-label="Architecture flow">' + c.arch.map((s, k) =>
      '<li style="--k:' + k + '"><span>' + esc(s) + '</span></li>').join('') + '</ol>';
    return '<details class="tile cs spot rv"' + (i === 0 ? ' open' : '') + '>' +
      '<summary><span class="cs__idx">0' + (i + 1) + '</span><span class="cs__ttl"><strong>' + esc(c.title) + '</strong><small>' + esc(c.tag) + '</small></span>' +
      '<span class="status status--' + (c.status === 'ongoing' ? 'now' : 'ok') + '">' + ST[c.status] + '</span><span class="cs__chev" aria-hidden="true">⌄</span></summary>' +
      '<div class="cs__body">' +
        '<div class="cs__arch"><h4><span class="cs__n">4</span>Technical architecture</h4>' + arch + '</div>' +
        '<div class="cs__grid">' +
          blk(1, 'Project overview', '<p>' + esc(c.overview) + '</p>') +
          blk(2, 'Business problem', '<p>' + esc(c.problem) + '</p>') +
          blk(3, 'Existing challenges', '<p>' + esc(c.challenges) + '</p>') +
          blk(5, 'Technologies used', '<div class="tags">' + c.tech.map((x) => '<span class="tag">' + esc(x) + '</span>').join('') + '</div>') +
          blk(6, 'Development approach', '<p>' + esc(c.approach) + '</p>') +
          blk(7, 'My contribution', '<p>' + esc(c.contrib) + '</p>') +
          blk(8, 'Implementation details', list(c.impl), 'cs__wide') +
          blk(9, 'Key features', '<div class="tags">' + c.features.map((x) => '<span class="tag hi">' + esc(x) + '</span>').join('') + '</div>') +
          blk(10, 'Results / business impact', '<p><strong>' + esc(c.impact) + '</strong></p>', 'cs__impact') +
        '</div></div></details>';
  }).join('');

  // Re-use the page's reveal-on-scroll if app.js already set it up
  host.querySelectorAll('.rv').forEach((el) => {
    if (!('IntersectionObserver' in window)) return el.classList.add('in');
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.disconnect(); } }), { threshold: .08 });
    io.observe(el);
  });
})();
