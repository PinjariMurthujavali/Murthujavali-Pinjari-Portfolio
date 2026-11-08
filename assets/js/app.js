/* ==========================================================================
   Murthu — Portfolio UI
   Theme · nav · reveal · counters · typed roles · Lucky mascot · spotlight ·
   skills/projects/certs rendering · lite YouTube · quick-jump palette ·
   contact form (Web3Forms) · confetti
   ========================================================================== */
(() => {
  'use strict';

  const D = window.PORTFOLIO || { projects: [], skills: [], certs: [], roles: [], luckyLines: [], contact: {} };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Toast + confetti (shared with reviews.js) ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3800);
  }

  function confetti() {
    if (reduceMotion) return;
    const c = document.createElement('canvas');
    c.className = 'confetti';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = (c.width = innerWidth * dpr), H = (c.height = innerHeight * dpr);
    const colors = ['#a99dff', '#ff8fb0', '#ffd27a', '#5eead4', '#ffffff'];
    const parts = Array.from({ length: 90 }, () => ({
      x: W / 2 + (Math.random() - .5) * W * .3, y: H * .62,
      vx: (Math.random() - .5) * 16 * dpr, vy: (-Math.random() * 15 - 7) * dpr,
      s: (Math.random() * 7 + 4) * dpr, r: Math.random() * 6.28, vr: (Math.random() - .5) * .4,
      c: colors[(Math.random() * colors.length) | 0], life: 1
    }));
    let frames = 0;
    (function tick() {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.vy += .42 * dpr; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= .009;
        ctx.save(); ctx.globalAlpha = Math.max(p.life, 0); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); ctx.restore();
      });
      if (++frames < 130) requestAnimationFrame(tick); else c.remove();
    })();
  }
  window.__ui = { toast, confetti, esc };

  /* ---------- Theme ---------- */
  const themeBtn = $('#themeToggle');
  const metaTheme = $('#metaTheme');
  function applyTheme(t, persist) {
    root.setAttribute('data-theme', t);
    if (metaTheme) metaTheme.setAttribute('content', t === 'light' ? '#faf8ff' : '#0b0f1f');
    if (themeBtn) {
      themeBtn.innerHTML = t === 'light'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
      themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
    if (persist) store.set('murthu-theme-v2', t);
  }
  const toggleTheme = () => applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
  applyTheme(root.getAttribute('data-theme') || 'dark', false);
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const onScheme = (e) => { if (!store.get('murthu-theme-v2')) applyTheme(e.matches ? 'light' : 'dark', false); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme);

  /* ---------- Mobile navigation ---------- */
  const burger = $('#burger'), navLinks = $('#navLinks');
  function setMenu(open) {
    if (!burger || !navLinks) return;
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) {
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', navLinks).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (innerWidth >= 1024) setMenu(false); });
  }

  /* ---------- Scroll: progress, nav state, back-to-top, timeline fill ---------- */
  const nav = $('#nav'), progress = $('#progress'), toTop = $('#toTop'), timeline = $('#timeline');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')';
      if (nav) nav.classList.toggle('is-scrolled', y > 12);
      if (toTop) toTop.classList.toggle('show', y > 700);
      if (timeline) {
        const r = timeline.getBoundingClientRect();
        timeline.style.setProperty('--p', clamp((innerHeight * .62 - r.top) / r.height, 0, 1).toFixed(3));
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Active nav link ---------- */
  if ('IntersectionObserver' in window && navLinks) {
    const map = new Map($$('a[href^="#"]', navLinks).map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        map.forEach((a, id) => {
          const on = id === en.target.id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  let revealIO = null;
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealIO.unobserve(en.target); } });
    }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });
  }
  function reveal(el) {
    if (!el.classList.contains('rv')) el.classList.add('rv');
    if (revealIO) revealIO.observe(el); else el.classList.add('in');
  }
  $$('.rv').forEach((el) => (revealIO ? revealIO.observe(el) : el.classList.add('in')));

  /* ---------- Animated counters ---------- */
  const counters = $$('[data-count]');
  function runCounter(el) {
    const end = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = end + suffix; return; }
    const t0 = performance.now(), dur = 1300;
    (function step(t) {
      const p = clamp((t - t0) / dur, 0, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    counters.forEach((el) => { el.textContent = '0' + (el.dataset.suffix || ''); });
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
    }, { threshold: .6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Typed role rotator ---------- */
  const typed = $('#typed');
  if (typed && D.roles.length && !reduceMotion) {
    let ri = 0, ci = D.roles[0].length, deleting = true;
    const tick = () => {
      const word = D.roles[ri];
      if (!deleting) { ci++; typed.textContent = word.slice(0, ci); if (ci === word.length) { deleting = true; return setTimeout(tick, 1800); } return setTimeout(tick, 55); }
      ci--; typed.textContent = word.slice(0, ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % D.roles.length; return setTimeout(tick, 320); }
      setTimeout(tick, 28);
    };
    typed.textContent = D.roles[0];
    setTimeout(tick, 2200);
  }

  /* ---------- Marquee ---------- */
  const marquee = $('#marquee');
  if (marquee) {
    const words = ['Frappe', 'ERPNext', 'Python', 'Frappe Cloud', 'REST APIs', 'Custom DocTypes', 'Django', 'MariaDB', 'Razorpay', 'Tally', 'Biometric Sync', 'Team Leadership'];
    const set = words.map((w) => '<span>' + w + '</span>').join('');
    marquee.innerHTML = set + set;
  }

  /* ---------- Lucky mascot ---------- */
  const lucky = $('#lucky'), bubble = $('#luckyBubble');
  if (lucky && bubble) {
    const h = new Date().getHours();
    const hello = h < 5 ? 'Burning the midnight oil? 🌙' : h < 12 ? 'Good morning! ☀️' : h < 17 ? 'Good afternoon! 👋' : h < 21 ? 'Good evening! 🌆' : 'Working late? 🌙';
    const lines = [hello + " I'm Lucky, Murthu's sidekick."].concat(D.luckyLines.slice(1));
    let li = 0;
    bubble.setAttribute('aria-live', 'off');
    bubble.textContent = lines[0];
    const say = (announce) => {
      li = (li + 1) % lines.length;
      bubble.setAttribute('aria-live', announce ? 'polite' : 'off');
      bubble.textContent = lines[li];
    };
    const wave = () => {
      lucky.classList.remove('is-waving', 'is-happy');
      void lucky.getBoundingClientRect();
      lucky.classList.add('is-waving', 'is-happy');
      setTimeout(() => lucky.classList.remove('is-waving', 'is-happy'), 1000);
      say(true);
    };
    lucky.addEventListener('click', wave);
    lucky.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wave(); } });
    if (!reduceMotion) setInterval(() => { if (!document.hidden) say(false); }, 8000);

    if (finePointer && !reduceMotion) {
      let raf = 0, mx = 0, my = 0;
      window.addEventListener('pointermove', (e) => {
        mx = e.clientX; my = e.clientY;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = lucky.getBoundingClientRect();
          const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height * .45);
          const len = Math.hypot(dx, dy) || 1, k = Math.min(len / 160, 1) * 4.5;
          lucky.style.setProperty('--px', (dx / len * k).toFixed(2));
          lucky.style.setProperty('--py', (dy / len * k).toFixed(2));
        });
      }, { passive: true });
    }
  }

  /* ---------- Spotlight hover on tiles ---------- */
  if (finePointer) {
    let sraf = 0, se = null;
    document.addEventListener('pointermove', (e) => {
      const t = e.target.closest && e.target.closest('.spot');
      if (!t) return;
      se = { t, x: e.clientX, y: e.clientY };
      if (sraf) return;
      sraf = requestAnimationFrame(() => {
        sraf = 0;
        const r = se.t.getBoundingClientRect();
        se.t.style.setProperty('--mx', (se.x - r.left) + 'px');
        se.t.style.setProperty('--my', (se.y - r.top) + 'px');
      });
    }, { passive: true });
  }

  /* ---------- Skills ---------- */
  const LVL = ['', 'Working knowledge', 'Production experience', 'Core expertise'];
  const skillsGrid = $('#skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = D.skills.map((g, gi) => (
      '<article class="tile skill-card spot rv" style="--i:' + (gi % 3) + '">' +
        '<h3><span class="emoji" aria-hidden="true">' + g.emoji + '</span>' + esc(g.title) + '</h3>' +
        '<ul class="skill-list">' + g.items.map((s) => (
          '<li class="skill"><span class="skill__name"><i class="' + s[0] + '" aria-hidden="true"></i>' + esc(s[1]) + '</span>' +
          '<span class="lvl" role="img" aria-label="' + LVL[s[2]] + '">' + [1, 2, 3].map((n) => '<i class="' + (n <= s[2] ? 'on' : '') + '"></i>').join('') + '</span></li>'
        )).join('') + '</ul></article>'
    )).join('');
    $$('.rv', skillsGrid).forEach(reveal);
  }

  /* ---------- Certifications ---------- */
  const certGrid = $('#certGrid');
  if (certGrid) {
    certGrid.innerHTML = D.certs.map((c, i) => (
      '<a class="tile cert spot rv" style="--i:' + (i % 3) + '" href="' + D.certsUrl + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(c[1] + ', ' + c[2] + ', ' + c[3] + '. Opens LinkedIn') + '">' +
        '<span class="ico"><i class="' + c[0] + '" aria-hidden="true"></i></span>' +
        '<div><h3>' + esc(c[1]) + '</h3><p>' + esc(c[2]) + '</p></div><span class="yr">' + c[3] + '</span></a>'
    )).join('');
    $$('.rv', certGrid).forEach(reveal);
  }

  /* ---------- Projects ---------- */
  const projGrid = $('#projGrid'), moreWrap = $('#projMoreWrap'), moreBtn = $('#projMore');
  let pFilter = 'all', showAll = false;
  const isExtra = (p) => !['erp', 'ai', 'mobile'].includes(p.cat);
  const STATUS = { completed: ['✅ Completed', 'ok'], ongoing: ['🚧 In progress', 'now'], experimental: ['🧪 Experimental', 'exp'], academic: ['🎓 Academic', 'acad'] };
  const statusOf = (p) => p.status || (p.cat === 'python' || p.cat === 'java' ? 'academic' : 'completed');

  function projCard(p, i) {
    const vis = p.img
      ? '<img src="' + p.img + '" alt="' + esc(p.alt || p.title) + '" loading="lazy" width="600" height="336">'
      : '<i class="' + p.icon + '" aria-hidden="true"></i>';
    const badges = '<span class="badge">' + esc(p.badge) + '</span>' +
      (p.feat ? '<span class="badge badge--feat">⭐ Featured</span>' : '') +
      (p.extraBadge ? '<span class="badge badge--feat">' + esc(p.extraBadge) + '</span>' : '');
    const st = STATUS[statusOf(p)];
    const stBadge = '<span class="status status--' + st[1] + '">' + st[0] + '</span>';
    const meta = p.role ? '<p class="proj__meta"><b>Role:</b> ' + esc(p.role) + (p.result ? ' &nbsp;·&nbsp; <b>Result:</b> ' + esc(p.result) : '') + '</p>' : '';
    const links = (p.links || []).map((l) => {
      if (l.t === 'private') return '<span class="plink plink--private"><i class="' + (l.icon || 'fas fa-lock') + '" aria-hidden="true"></i> ' + esc(l.l) + '</span>';
      const demo = l.t === 'demo';
      return '<a class="plink' + (demo ? ' plink--demo' : '') + '" href="' + l.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(l.l + ': ' + p.title) + '"><i class="' + (demo ? 'fas fa-arrow-up-right-from-square' : 'fab fa-github') + '" aria-hidden="true"></i> ' + esc(l.l) + '</a>';
    }).join('');
    return '<article class="tile proj spot' + (p.feat ? ' proj--feat' : '') + ' rv" style="--i:' + (i % 3) + '">' +
      '<div class="proj__vis">' + vis + '<div class="proj__badges">' + badges + '</div></div>' +
      '<div class="proj__body"><div class="proj__status">' + stBadge + '</div><h3 class="proj__title">' + esc(p.title) + '</h3><p class="proj__desc">' + esc(p.desc) + '</p>' + meta +
      '<div class="tags">' + p.tech.map((t) => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>' +
      '<div class="proj__links"><button class="plink plink--detail" type="button" data-detail="' + D.projects.indexOf(p) + '" aria-label="View details: ' + esc(p.title) + '"><i class="fas fa-expand" aria-hidden="true"></i> Details</button>' + links + '</div></div></article>';
  }

  function renderProjects() {
    if (!projGrid) return;
    const list = D.projects.filter((p) => pFilter === 'all' || p.cat === pFilter);
    const hiddenCount = pFilter === 'all' && !showAll ? list.filter(isExtra).length : 0;
    const visible = hiddenCount ? list.filter((p) => !isExtra(p)) : list;
    projGrid.innerHTML = visible.map(projCard).join('');
    $$('.rv', projGrid).forEach(reveal);
    if (moreWrap) moreWrap.hidden = pFilter !== 'all';
    if (moreBtn && pFilter === 'all') {
      const extras = D.projects.filter(isExtra).length;
      moreBtn.textContent = showAll ? 'Show fewer projects' : 'Show ' + extras + ' more projects (web demos & academic)';
      moreBtn.setAttribute('aria-expanded', String(showAll));
    }
  }
  $$('.filter').forEach((b) => b.addEventListener('click', () => {
    pFilter = b.dataset.filter;
    $$('.filter').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    renderProjects();
  }));
  if (moreBtn) moreBtn.addEventListener('click', () => { showAll = !showAll; renderProjects(); });
  renderProjects();

  /* ---------- Lite YouTube embeds ---------- */
  $$('.yt[data-yt]').forEach((btn) => btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + btn.dataset.yt + '?autoplay=1&rel=0';
    f.title = btn.dataset.title || 'YouTube video';
    f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    const wrap = document.createElement('div');
    wrap.className = 'yt';
    wrap.appendChild(f);
    btn.replaceWith(wrap);
    f.focus();
  }));

  /* ---------- Quick-jump command palette ---------- */
  const palette = $('#palette'), pInput = $('#paletteInput'), pList = $('#paletteList');
  const waUrl = 'https://wa.me/' + (D.contact.whatsapp || '919100850087') + '?text=' + encodeURIComponent('Hi Murthu! I saw your portfolio and want to connect.');
  const items = [
    { i: 'fa-house', l: 'Home', k: 'top intro hero', go: '#home' },
    { i: 'fa-user', l: 'About', k: 'who bio story', go: '#about' },
    { i: 'fa-layer-group', l: 'Skills', k: 'tech stack frappe python', go: '#skills' },
    { i: 'fa-briefcase', l: 'Experience', k: 'work history timeline job', go: '#experience' },
    { i: 'fa-lightbulb', l: 'Case studies', k: 'bcrm attendance results', go: '#work' },
    { i: 'fa-robot', l: 'Automation lab', k: 'robot ai automation demo pipeline', go: '#automation' },
    { i: 'fa-diagram-project', l: 'Projects', k: 'portfolio work apps', go: '#projects' },
    { i: 'fa-circle-play', l: 'YouTube videos', k: 'syntax solver tutorials', go: '#videos' },
    { i: 'fa-certificate', l: 'Certifications', k: 'credentials certificates', go: '#certs' },
    { i: 'fa-star', l: 'Reviews & feedback', k: 'testimonials rating', go: '#reviews' },
    { i: 'fa-envelope', l: 'Contact', k: 'message email hire', go: '#contact' },
    { i: 'fa-circle-half-stroke', l: 'Toggle dark / light theme', k: 'theme mode color', run: toggleTheme, tag: 'action' },
    { i: 'fa-file-arrow-down', l: 'Download resume (PDF)', k: 'cv resume pdf', href: 'Murthujavali_Pinjari_ERPNext_Frappe.pdf', tag: 'action', dl: true },
    { i: 'fa-whatsapp fab', l: 'Message on WhatsApp', k: 'chat hire', href: waUrl, tag: 'link', ext: true },
    { i: 'fa-linkedin fab', l: 'Open LinkedIn', k: 'profile network', href: D.contact.linkedin, tag: 'link', ext: true },
    { i: 'fa-github fab', l: 'Open GitHub', k: 'code repos', href: D.contact.github, tag: 'link', ext: true }
  ];
  let shown = [], sel = 0;

  function paintPalette() {
    if (!pList) return;
    if (!shown.length) { pList.innerHTML = '<div class="palette__empty">No matches. Try “skills” or “contact”.</div>'; pInput.removeAttribute('aria-activedescendant'); return; }
    pList.innerHTML = shown.map((it, n) => (
      '<button class="palette__item" role="option" type="button" id="pi' + n + '" data-n="' + n + '" aria-selected="' + (n === sel) + '">' +
      '<i class="' + (it.i.includes('fab') ? it.i : 'fas ' + it.i) + '" aria-hidden="true"></i><span>' + esc(it.l) + '</span>' + (it.tag ? '<small>' + it.tag + '</small>' : '') + '</button>'
    )).join('');
    pInput.setAttribute('aria-activedescendant', 'pi' + sel);
    const cur = $('#pi' + sel, pList);
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  function filterPalette() {
    const q = pInput.value.trim().toLowerCase();
    shown = items.filter((it) => !q || (it.l + ' ' + it.k).toLowerCase().includes(q));
    sel = 0;
    paintPalette();
  }
  function choose(n) {
    const it = shown[n];
    if (!it) return;
    palette.close();
    if (it.go) { const t = document.querySelector(it.go); if (t) t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
    else if (it.run) it.run();
    else if (it.href) {
      const a = document.createElement('a');
      a.href = it.href;
      if (it.ext) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      if (it.dl) a.download = '';
      document.body.appendChild(a); a.click(); a.remove();
    }
  }
  function openPalette() {
    if (!palette || palette.open) return;
    if (typeof palette.showModal !== 'function') { const c = document.querySelector('#contact'); if (c) c.scrollIntoView(); return; }
    pInput.value = '';
    filterPalette();
    palette.showModal();
    pInput.focus();
  }
  if (palette) {
    const openBtn = $('#openPalette');
    if (openBtn) openBtn.addEventListener('click', openPalette);
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.open ? palette.close() : openPalette(); }
    });
    pInput.addEventListener('input', filterPalette);
    pInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(shown.length, 1); paintPalette(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + shown.length) % Math.max(shown.length, 1); paintPalette(); }
      else if (e.key === 'Enter') { e.preventDefault(); choose(sel); }
    });
    pList.addEventListener('click', (e) => { const b = e.target.closest('[data-n]'); if (b) choose(Number(b.dataset.n)); });
    palette.addEventListener('click', (e) => { if (e.target === palette) palette.close(); });
  }

  /* ---------- Contact form ---------- */
  const form = $('#contactForm'), cStatus = $('#cStatus'), cSend = $('#cSend'), cWa = $('#cWa');
  const setStatus = (msg, kind) => { if (!cStatus) return; cStatus.textContent = msg; cStatus.className = 'status' + (kind ? ' ' + kind : ''); };
  const val = (id) => ($('#' + id) ? $('#' + id).value.trim() : '');

  function validate() {
    const bad = [];
    const name = val('cName'), email = val('cEmail'), msg = val('cMsg');
    $$('#contactForm .input, #contactForm .textarea').forEach((el) => el.removeAttribute('aria-invalid'));
    if (!name) bad.push('cName');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) bad.push('cEmail');
    if (msg.length < 5) bad.push('cMsg');
    bad.forEach((id) => $('#' + id).setAttribute('aria-invalid', 'true'));
    if (bad.length) {
      setStatus('Please fill your name, a valid email and a short message.', 'err');
      $('#' + bad[0]).focus();
      return false;
    }
    return true;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate()) return;
      if (form.elements.botcheck && form.elements.botcheck.checked) { form.reset(); return; } // bot: pretend success
      const name = val('cName'), email = val('cEmail'), company = val('cCompany'), message = val('cMsg');
      cSend.disabled = true;
      const original = cSend.innerHTML;
      cSend.innerHTML = '<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i> Sending…';
      setStatus('', '');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: D.contact.web3formsKey, botcheck: '',
            subject: 'Portfolio contact from ' + name + (company ? ' — ' + company : ''),
            from_name: name, name, email, replyto: email,
            message: 'Name: ' + name + '\nEmail: ' + email + '\nCompany: ' + (company || 'Not mentioned') + '\n\nMessage:\n' + message
          })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Submit failed');
        form.reset();
        setStatus('Message sent. I will reply soon!', 'ok');
        toast('Thanks ' + name.split(' ')[0] + '! Your message is on its way ✨');
        confetti();
      } catch (err) {
        console.error('Contact form error:', err);
        setStatus('Could not send right now. Please use WhatsApp or email instead.', 'err');
      } finally {
        cSend.disabled = false;
        cSend.innerHTML = original;
      }
    });
  }
  if (cWa) cWa.addEventListener('click', () => {
    const name = val('cName'), email = val('cEmail'), company = val('cCompany'), message = val('cMsg');
    let t = '👋 Hi Murthu! I saw your portfolio and want to connect.';
    if (name || email || company || message) {
      t += '\n';
      if (name) t += '\n*Name:* ' + name;
      if (email) t += '\n*Email:* ' + email;
      if (company) t += '\n*Company:* ' + company;
      if (message) t += '\n\n*Message:*\n' + message;
    }
    window.open('https://wa.me/' + D.contact.whatsapp + '?text=' + encodeURIComponent(t), '_blank', 'noopener');
  });

  /* ---------- Footer year ---------- */
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
