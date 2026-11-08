/* Shared behaviour for the supporting pages (theme toggle, year, reveal, certificates). */
(() => {
  'use strict';
  const root = document.documentElement, D = window.PORTFOLIO || { certs: [] };
  const btn = document.getElementById('themeToggle');
  const paint = () => { if (btn) btn.textContent = root.getAttribute('data-theme') === 'light' ? '🌙' : '☀️'; };
  paint();
  if (btn) btn.addEventListener('click', () => {
    const n = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', n); try { localStorage.setItem('murthu-theme-v2', n); } catch (e) {} paint();
  });
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  const cg = document.getElementById('certGrid');
  if (cg) cg.innerHTML = D.certs.map((c) => '<li class="tile cert"><i class="' + c[0] + '" aria-hidden="true"></i><div><strong>' + c[1] + '</strong><small>' + c[2] + ' · ' + c[3] + '</small></div></li>').join('');
  const rv = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { rv.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
  rv.forEach((e) => io.observe(e));
})();
