/* Project detail dialog. Opens from any [data-detail="<index>"] button. */
(() => {
  'use strict';
  const D = window.PORTFOLIO || {};
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ST = { completed: '✅ Completed', ongoing: '🚧 In progress', experimental: '🧪 Experimental', academic: '🎓 Academic' };
  const dlg = document.createElement('dialog');
  dlg.className = 'pmodal';
  dlg.setAttribute('aria-labelledby', 'pmTitle');
  document.body.appendChild(dlg);
  let opener = null;

  function open(i, from) {
    const p = (D.projects || [])[i];
    if (!p) return;
    opener = from;
    const status = p.status || (p.cat === 'python' || p.cat === 'java' ? 'academic' : 'completed');
    const sec = (h, b) => '<section><h4>' + h + '</h4>' + b + '</section>';
    const links = (p.links || []).map((l) => l.t === 'private'
      ? '<span class="plink plink--private"><i class="' + (l.icon || 'fas fa-lock') + '" aria-hidden="true"></i> ' + esc(l.l) + '</span>'
      : '<a class="plink' + (l.t === 'demo' ? ' plink--demo' : '') + '" href="' + l.href + '" target="_blank" rel="noopener noreferrer">' + esc(l.l) + '</a>').join('');
    dlg.innerHTML =
      '<div class="pmodal__in">' +
      '<button class="pmodal__x" type="button" aria-label="Close details"><span aria-hidden="true">✕</span></button>' +
      '<p class="pmodal__meta"><span class="status status--' + ({ completed: 'ok', ongoing: 'now', experimental: 'exp', academic: 'acad' }[status]) + '">' + ST[status] + '</span> <span class="badge">' + esc(p.badge) + '</span></p>' +
      '<h3 id="pmTitle">' + esc(p.title) + '</h3>' +
      sec('Overview', '<p>' + esc(p.desc) + '</p>') +
      (p.problem ? sec('Business problem', '<p>' + esc(p.problem) + '</p>') : '') +
      sec('My contribution', '<p>' + esc(p.contrib || p.role || 'Part of the development work on this project.') + (p.result ? ' <strong>' + esc(p.result) + '.</strong>' : '') + '</p>') +
      (p.features ? sec('Key features', '<ul>' + p.features.map((f) => '<li>' + esc(f) + '</li>').join('') + '</ul>') : '') +
      sec('Technologies', '<div class="tags">' + p.tech.map((t) => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>') +
      (links ? '<div class="proj__links">' + links + '</div>' : '') +
      '</div>';
    dlg.showModal();
    if (window.__fx && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const r = dlg.getBoundingClientRect();
      window.__fx.confetti(r.left + r.width / 2, r.top + 30, 26, 1.6, .7);
    }
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('[data-detail]');
    if (b) { open(+b.dataset.detail, b); return; }
    if (e.target.closest && e.target.closest('.pmodal__x')) dlg.close();
    else if (e.target === dlg) dlg.close();
  });
  dlg.addEventListener('close', () => { if (opener && opener.focus) opener.focus({ preventScroll: true }); });
})();
