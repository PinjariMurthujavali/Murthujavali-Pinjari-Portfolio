/* ==========================================================================
   Murthu — FX layer
   · YouTube "subscribe + bell" welcome gate (honor system, remembered)
   · Particle engine (confetti, sparkles, emoji) on one canvas
   · "Bolt" — a cute robot that flies along as you scroll, naps when idle,
     reacts to each section and throws a party at the end
   · Automation lab: animated attendance pipeline + terminal (simulated)
   · Text-decode headings, tilt cards, magnetic buttons, cursor sparkles
   Edit CFG below to change the channel link or remove the Skip button.
   ========================================================================== */
(() => {
  'use strict';
  window.__fxReady = true; // tells the safety timer in index.html that this file loaded

  const CFG = {
    channel: 'https://www.youtube.com/@Syntaxsolver-u5m',
    gateKey: 'murthu-gate-v1',     // localStorage: set once the visitor completes the gate
    skipKey: 'murthu-gate-skip',   // sessionStorage: set when they press "Skip for now"
    allowSkip: true,               // false = hard gate (hides the Skip button)
    minAwayMs: 2500                // time spent on the YouTube tab before a step auto-confirms
  };

  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[(Math.random() * a.length) | 0];
  const safe = {
    set(k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) { /* private mode */ } }
  };

  /* ======================================================================
     1. Particle engine
     ====================================================================== */
  const canvas = document.createElement('canvas');
  canvas.className = 'fx-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  const PAL = ['#a99dff', '#ff8fb0', '#ffd27a', '#5eead4', '#ffffff'];
  const parts = [];
  const MAX = 450;
  let running = false, lastT = 0, dirty = false;
  const kick = () => { if (!running) { running = true; lastT = performance.now(); requestAnimationFrame(frame); } };

  function add(p) {
    if (reduce) return;
    if (parts.length >= MAX) parts.shift();
    parts.push(p); kick();
  }
  function confetti(x, y, n = 70, spread = 1.1, power = 1) {
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + rand(-spread, spread), s = rand(4, 13) * power, r = Math.random();
      add({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, g: .28, drag: .985, life: 1, decay: rand(.008, .016),
        size: rand(5, 10), rot: rand(0, 6.28), vr: rand(-.3, .3), type: r < .55 ? 'rect' : r < .82 ? 'star' : 'dot', color: pick(PAL) });
    }
  }
  function emojis(x, y, list, n = 8) {
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + rand(-1.3, 1.3), s = rand(5, 11);
      add({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, g: .22, drag: .985, life: 1, decay: rand(.007, .012),
        size: rand(16, 26), rot: 0, vr: 0, type: 'emoji', ch: pick(list), color: '#fff' });
    }
  }
  function sparkle(x, y, o = {}) {
    add({ x, y, vx: o.vx ?? rand(-.5, .5), vy: o.vy ?? rand(-.5, .5), g: o.g ?? .02, drag: .97, life: 1,
      decay: o.decay ?? .03, size: o.size ?? rand(2, 4), rot: 0, vr: 0, type: o.type || 'dot', color: o.color || pick(PAL) });
  }
  function burstAt(el, n = 36) {
    const r = el.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top + r.height / 2, n, 3.1, .6);
  }
  function star(s) {
    ctx.beginPath();
    ctx.moveTo(0, -s); ctx.quadraticCurveTo(s * .15, -s * .15, s, 0);
    ctx.quadraticCurveTo(s * .15, s * .15, 0, s); ctx.quadraticCurveTo(-s * .15, s * .15, -s, 0);
    ctx.quadraticCurveTo(-s * .15, -s * .15, 0, -s); ctx.fill();
  }
  function draw(p) {
    ctx.save();
    ctx.globalAlpha = clamp(p.life * 1.4, 0, 1);
    ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
    if (p.type === 'rect') ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .6);
    else if (p.type === 'star') star(p.size);
    else if (p.type === 'emoji') { ctx.font = p.size + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.ch, 0, 0); }
    else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, 6.283); ctx.fill(); }
    ctx.restore();
  }

  /* ======================================================================
     2. Bolt the robot (markup shared by the gate and the flying buddy)
     ====================================================================== */
  const bolts = [];
  const boltSVG = () => (
    '<svg class="bolt" viewBox="0 -8 120 156" focusable="false" aria-hidden="true">' +
      '<g class="bolt__float">' +
        '<g class="bolt__flame"><path d="M48 108 Q60 156 72 108 Z" fill="url(#fxFlame)"/></g>' +
        '<rect x="34" y="78" width="52" height="34" rx="16" fill="url(#fxBody)"/>' +
        '<circle class="bolt__chest" cx="60" cy="95" r="5" fill="#fff"/>' +
        '<g class="bolt__armL"><line x1="36" y1="92" x2="20" y2="102" stroke="#ffc2d4" stroke-width="8" stroke-linecap="round"/><circle cx="17" cy="104" r="8" fill="#ffc2d4"/></g>' +
        '<g class="bolt__armR"><line x1="84" y1="92" x2="100" y2="102" stroke="#ffc2d4" stroke-width="8" stroke-linecap="round"/><circle cx="103" cy="104" r="8" fill="#ffc2d4"/></g>' +
        '<line x1="60" y1="14" x2="60" y2="2" stroke="#a99dff" stroke-width="4" stroke-linecap="round"/>' +
        '<circle class="bolt__bulb" cx="60" cy="-1" r="6.5" fill="url(#fxBulb)"/>' +
        '<circle cx="12" cy="48" r="7" fill="#ff8fb0"/><circle cx="108" cy="48" r="7" fill="#ff8fb0"/>' +
        '<rect x="16" y="14" width="88" height="68" rx="30" fill="url(#fxBody)"/>' +
        '<rect x="26" y="26" width="68" height="40" rx="20" fill="#14183a"/>' +
        '<circle cx="34" cy="58" r="4" fill="#ff8fb0" opacity=".55"/><circle cx="86" cy="58" r="4" fill="#ff8fb0" opacity=".55"/>' +
        '<g class="bolt__eyes">' +
          '<g class="bolt__eye" transform="translate(46 46)"><ellipse rx="7.5" ry="9" fill="#5eead4"/><circle cx="-2" cy="-3" r="2.4" fill="#fff"/></g>' +
          '<g class="bolt__eye" transform="translate(74 46)"><ellipse rx="7.5" ry="9" fill="#5eead4"/><circle cx="-2" cy="-3" r="2.4" fill="#fff"/></g>' +
        '</g>' +
        '<g class="bolt__happy" fill="none" stroke="#5eead4" stroke-width="3.2" stroke-linecap="round"><path d="M38 50 q8 -13 16 0"/><path d="M66 50 q8 -13 16 0"/></g>' +
        '<g class="bolt__sleep" fill="none" stroke="#5eead4" stroke-width="3" stroke-linecap="round"><path d="M38 46 q8 6 16 0"/><path d="M66 46 q8 6 16 0"/></g>' +
        '<path d="M53 58 q7 6 14 0" fill="none" stroke="#5eead4" stroke-width="2.8" stroke-linecap="round"/>' +
        '<g class="bolt__zzz"><text x="92" y="12">z</text><text x="100" y="2">z</text><text x="106" y="-6">z</text></g>' +
      '</g></svg>'
  );
  function mountBolt(host) {
    host.innerHTML = boltSVG();
    const svg = host.firstChild;
    bolts.push(svg);
    return svg;
  }

  // Eyes follow the pointer
  if (fine && !reduce) {
    let raf = 0, mx = 0, my = 0;
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        bolts.forEach((s) => {
          const r = s.getBoundingClientRect();
          if (!r.width || r.right < 0 || r.left > innerWidth) return;
          const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height * .35);
          const len = Math.hypot(dx, dy) || 1, k = Math.min(len / 180, 1) * 3.2;
          s.style.setProperty('--px', (dx / len * k).toFixed(2));
          s.style.setProperty('--py', (dy / len * k).toFixed(2));
        });
      });
    }, { passive: true });
  }

  /* ======================================================================
     3. Flying buddy
     ====================================================================== */
  const B = { ready: false, x: 0, y: 0, tx: 0, ty: 0, rot: 0, f: 0, size: 64, docked: false, sleeping: false,
    partyUntil: 0, lastScroll: 0, idleT: 0, sleepT: 0, sayT: 0 };
  const LINES = {
    home: 'Hi! Keep scrolling, I’ll fly along 🚀', about: 'The story behind the code 📖', skills: 'Scanning skills… 🔍',
    experience: 'Career timeline loaded ⏳', work: 'My favourite part: case studies 💡', automation: 'Hit “Simulate a punch” ⚡',
    projects: 'So many things shipped 🛠️', videos: 'Psst… subscribed yet? 😉', certs: 'All verified on LinkedIn ✔',
    reviews: 'Say something nice 💬', contact: 'Almost there. Let’s talk! 📨'
  };
  const JOKES = ['Beep boop… you clicked me 🤖', 'I run on Python & chai ☕', '404: bug not found 🐛✨', 'Compiling happiness… done 💜', 'Fun fact: I never skip standup 🧑‍💻'];

  function say(text, ms = 2800) {
    if (!B.ready) return;
    B.bubble.textContent = text;
    B.bubble.classList.add('show');
    clearTimeout(B.sayT);
    B.sayT = setTimeout(() => B.bubble.classList.remove('show'), ms);
  }
  function targets() {
    if (!B.ready) return;
    const mobile = innerWidth < 700;
    B.size = mobile ? 52 : 64;
    const topPad = 84, botPad = mobile ? 150 : 96;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = clamp(scrollY / max, 0, 1);
    const track = Math.max(0, innerHeight - topPad - botPad - B.size);
    const dockY = innerHeight - botPad - B.size;
    const show = !root.classList.contains('gate-open') && scrollY > 160;
    B.tx = show ? innerWidth - B.size - (mobile ? 6 : Math.min(24, Math.max(8, (innerWidth - 1200) / 2 - B.size))) : innerWidth + 30;
    B.ty = B.docked ? dockY : topPad + p * track;
  }
  function stepBuddy(t, dt) {
    const k = 1 - Math.exp(-dt / 150), kx = 1 - Math.exp(-dt / 260);
    const py = B.y;
    B.y += (B.ty - B.y) * k; B.x += (B.tx - B.x) * kx;
    const vy = (B.y - py) / dt * 16;
    B.rot += (clamp(vy * 1.7, -26, 26) - B.rot) * .18;
    const mv = Math.abs(B.ty - B.y), partying = B.partyUntil > t;
    const f = clamp(mv / 90 + (partying ? .5 : 0), 0, 1.2);
    if (Math.abs(f - B.f) > .03) { B.f = f; B.el.style.setProperty('--flame', f.toFixed(2)); }
    const sway = mv > 2 ? Math.sin(t / 240) * 4 : 0;
    B.el.style.transform = 'translate3d(' + (B.x + sway).toFixed(1) + 'px,' + B.y.toFixed(1) + 'px,0)';
    B.tilt.style.transform = 'rotate(' + B.rot.toFixed(1) + 'deg)';
    if (Math.abs(vy) > 2.2 && Math.random() < .75 && B.x < W) {
      sparkle(B.x + B.size * .5 + rand(-4, 4), B.y + B.size * .92,
        { vx: rand(-.4, .4), vy: rand(.3, 1.2), g: .01, decay: rand(.03, .05), size: rand(2, 4.2),
          type: Math.random() < .4 ? 'star' : 'dot', color: pick(['#ffd27a', '#ff8fb0', '#5eead4']) });
    }
    return mv > .4 || Math.abs(B.tx - B.x) > .4 || Math.abs(B.rot) > .3 || partying || (t - B.lastScroll < 500);
  }
  function setSleep(on) {
    B.sleeping = on;
    B.svg.classList.toggle('is-sleep', on);
  }
  function party(big) {
    if (!B.ready || reduce) return;
    const now = performance.now();
    if (B.partyUntil > now) return;
    B.partyUntil = now + 2300;
    B.svg.classList.add('is-party');
    B.bot.classList.remove('spin'); void B.bot.offsetWidth; B.bot.classList.add('spin');
    say(big ? 'You made it! 🎉 Let’s build something' : pick(JOKES), 2800);
    const shoot = () => { const r = B.el.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, big ? 62 : 32, 2.3, .85); };
    shoot(); setTimeout(shoot, 380); if (big) { setTimeout(shoot, 760); const r = B.el.getBoundingClientRect(); emojis(r.left + r.width / 2, r.top + r.height / 2, ['🎉', '⚙️', '✨', '💜', '🤖'], 8); }
    kick();
    setTimeout(() => { B.svg.classList.remove('is-party'); B.bot.classList.remove('spin'); }, 2300);
  }

  function initBuddy() {
    if (reduce) return;
    B.el = document.createElement('div');
    B.el.className = 'buddy';
    B.el.setAttribute('aria-hidden', 'true');
    B.el.innerHTML = '<div class="buddy__bubble"></div><div class="buddy__bot"><div class="buddy__tilt"></div></div>';
    document.body.appendChild(B.el);
    B.bubble = $('.buddy__bubble', B.el); B.bot = $('.buddy__bot', B.el); B.tilt = $('.buddy__tilt', B.el);
    B.svg = mountBolt(B.tilt);
    B.ready = true;
    targets();
    B.y = B.ty; B.x = innerWidth + 30;
    B.el.style.transform = 'translate3d(' + B.x + 'px,' + B.y + 'px,0)';

    addEventListener('scroll', () => {
      B.lastScroll = performance.now();
      clearTimeout(B.idleT); clearTimeout(B.sleepT);
      if (B.docked) { B.docked = false; if (B.sleeping) { setSleep(false); say('Zoom! 🚀', 1500); } }
      B.idleT = setTimeout(() => {
        B.docked = true; targets(); kick();
        B.sleepT = setTimeout(() => { if (B.docked) setSleep(true); }, 2200);
      }, 5500);
      targets(); kick();
    }, { passive: true });
    addEventListener('resize', () => { targets(); kick(); }, { passive: true });
    B.bot.addEventListener('click', () => party(false));

    // react to sections
    if ('IntersectionObserver' in window) {
      let reachedEnd = false;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || root.classList.contains('gate-open')) return;
          const id = en.target.id;
          if (id === 'contact' && !reachedEnd) { reachedEnd = true; setTimeout(() => party(true), 500); return; }
          if (B.x < W - 10 && B.partyUntil < performance.now() && LINES[id]) say(LINES[id], 2600);
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(LINES).forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    }
    kick();
  }

  /* ======================================================================
     4. Main animation frame (buddy + particles share one loop)
     ====================================================================== */
  function frame(t) {
    const dt = Math.min(40, t - lastT || 16); lastT = t;
    let busy = false;
    if (B.ready) busy = stepBuddy(t, dt);
    if (parts.length) {
      ctx.clearRect(0, 0, W, H); dirty = true;
      const k = dt / 16;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += p.g * k; const d = Math.pow(p.drag, k); p.vx *= d; p.vy *= d;
        p.x += p.vx * k; p.y += p.vy * k; p.rot += p.vr * k; p.life -= p.decay * k;
        if (p.life <= 0 || p.y > H + 40) { parts.splice(i, 1); continue; }
        draw(p);
      }
      busy = true;
    } else if (dirty) { ctx.clearRect(0, 0, W, H); dirty = false; }
    if (busy) requestAnimationFrame(frame); else running = false;
  }
  addEventListener('resize', () => { resize(); kick(); }, { passive: true });

  /* ======================================================================
     5. Text "decode" effect for headings
     ====================================================================== */
  const GLYPHS = '01<>/{}[]#$%&*+=?';
  function decode(el, dur = 750) {
    if (reduce || !el || el.dataset.dec) return;
    el.dataset.dec = '1';
    const orig = el.textContent;
    const sr = document.createElement('span');
    sr.className = 'sr-only'; sr.textContent = orig;
    el.parentNode.insertBefore(sr, el);
    el.setAttribute('aria-hidden', 'true');
    const w = el.getBoundingClientRect().width;
    el.style.display = 'inline-block'; el.style.minWidth = w + 'px'; el.style.textAlign = 'left';
    const t0 = performance.now();
    (function step(t) {
      const p = clamp((t - t0) / dur, 0, 1), n = Math.floor(p * orig.length);
      let s = '';
      for (let i = 0; i < orig.length; i++) s += (i < n || orig[i] === ' ') ? orig[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = s;
      if (p < 1) requestAnimationFrame(step);
      else { el.textContent = orig; el.style.display = ''; el.style.minWidth = ''; el.style.textAlign = ''; }
    })(t0);
  }
  if ('IntersectionObserver' in window && !reduce) {
    const dio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        dio.unobserve(en.target);
        decode($('.grad', en.target));
      });
    }, { threshold: .7 });
    $$('.section__title').forEach((h) => dio.observe(h));
  }

  /* ======================================================================
     6. Pointer toys: cursor sparkles, magnetic buttons, card tilt
     ====================================================================== */
  if (fine && !reduce) {
    let lt = 0;
    addEventListener('pointermove', (e) => {
      const n = performance.now();
      if (n - lt < 55) return;
      lt = n;
      sparkle(e.clientX, e.clientY, { size: rand(1.8, 3.4), decay: .05, vx: rand(-.3, .3), vy: rand(.2, .7), g: .015, type: Math.random() < .3 ? 'star' : 'dot', color: pick(['#a99dff', '#ff8fb0', '#5eead4']) });
    }, { passive: true });

    $$('.cta .btn, .nav__hire, #revToggle, .gate__enter').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });

    const TILT = '.proj,.dcard,.skill-card,.cert';
    let cur = null;
    const reset = (el) => { el.style.transform = ''; setTimeout(() => el.classList.remove('tilt-live'), 220); };
    document.addEventListener('pointermove', (e) => {
      const el = e.target.closest && e.target.closest(TILT);
      if (cur && cur !== el) { reset(cur); cur = null; }
      if (!el) return;
      cur = el;
      el.classList.add('tilt-live');
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = 'perspective(900px) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg) translateY(-3px)';
    }, { passive: true });
    document.addEventListener('pointerleave', () => { if (cur) { reset(cur); cur = null; } });
  }

  /* ======================================================================
     7. Automation lab
     ====================================================================== */
  function initLab() {
    const flow = $('#flow'), logEl = $('#termLog');
    if (!flow || !logEl) return;
    const nodes = $$('.node', flow), links = $$('.link', flow);
    const runBtn = $('#labRun'), punchBtn = $('#labPunch'), bar = $('#tickBar');
    const mEls = { p: $('#mPunch'), r: $('#mRemark'), d: $('#mDed') };
    const m = { p: 0, r: 0, d: 0 };
    const RULES = [
      ['Late Entry', 'warn', '+14 min after grace period', true],
      ['Early Exit', 'warn', '−22 min before shift end', true],
      ['Missing Punch', 'warn', 'OUT punch not found', true],
      ['Weekly Off', 'info', 'no deduction', false],
      ['Holiday', 'info', 'paid holiday', false],
      ['Sandwich rule', 'warn', 'weekly off between absences', true],
      ['On time ✓', 'ok', 'inside grace period', false]
    ];
    const gap = reduce ? 160 : 760;
    const TICK_MS = 12000;           // 5 minutes, sped up x25
    let running = !reduce, visible = false, tickStart = performance.now(), batching = false;

    const stamp = () => new Date().toLocaleTimeString('en-GB');
    function line(cls, text) {
      const old = $('.ln--cursor', logEl); if (old) old.classList.remove('ln--cursor');
      const d = document.createElement('div');
      d.className = 'ln ln--cursor';
      const t = document.createElement('span'); t.className = 't-time'; t.textContent = '[' + stamp() + '] ';
      const s = document.createElement('span'); s.className = 't-' + cls; s.textContent = text;
      d.append(t, s); logEl.appendChild(d);
      while (logEl.children.length > 11) logEl.removeChild(logEl.firstChild);
    }
    const bump = (k) => {
      mEls[k].textContent = m[k].toLocaleString('en-IN');
      const box = mEls[k].parentNode; box.classList.remove('bump'); void box.offsetWidth; box.classList.add('bump');
    };
    function light(n, l) {
      const nd = nodes[n]; nd.classList.add('on'); setTimeout(() => nd.classList.remove('on'), 1050);
      if (l >= 0 && links[l]) { const lk = links[l]; lk.classList.remove('go'); void lk.offsetWidth; lk.classList.add('go'); setTimeout(() => lk.classList.remove('go'), 820); }
    }
    function punch() {
      const emp = 'EMP-' + String(1 + ((Math.random() * 75) | 0)).padStart(4, '0');
      const dir = Math.random() < .5 ? 'IN ' : 'OUT';
      const rule = pick(RULES);
      const steps = [
        () => { light(0, -1); line('info', 'punch · ' + emp + ' · ' + dir + ' · device → middleware'); },
        () => { light(1, 0); line('info', 'dedupe · sqlite lookup → new log ✓'); },
        () => { light(2, 1); line('ok', 'POST /api/resource/Employee Checkin → 200'); m.p++; bump('p'); },
        () => { light(3, 2); line(rule[1], 'rules · ' + rule[0] + ' · ' + rule[2]); m.r++; bump('r'); },
        () => {
          light(4, 3);
          line(rule[3] ? 'warn' : 'ok', rule[3] ? 'payroll · deduction queued → Salary Slip' : 'payroll · no deduction');
          if (rule[3]) { m.d++; bump('d'); }
          if (!reduce) { burstAt(nodes[4], 22); emojis(nodes[4].getBoundingClientRect().left + 40, nodes[4].getBoundingClientRect().top + 20, ['💸', '✅', '⚙️'], 3); }
        }
      ];
      steps.forEach((fn, i) => setTimeout(fn, i * gap));
    }
    function batch() {
      if (batching) return;
      batching = true;
      line('info', '⏱ scheduler tick · attendance run started');
      [0, 1, 2].forEach((i) => setTimeout(punch, i * (gap * 5 + 500)));
      setTimeout(() => { batching = false; }, 3 * (gap * 5 + 500));
    }

    runBtn.addEventListener('click', () => {
      running = !running;
      runBtn.setAttribute('aria-pressed', String(running));
      runBtn.innerHTML = running ? '<i class="fas fa-pause" aria-hidden="true"></i> <span>Auto-run on</span>' : '<i class="fas fa-play" aria-hidden="true"></i> <span>Auto-run off</span>';
      tickStart = performance.now();
    });
    punchBtn.addEventListener('click', () => {
      punch();
      if (!reduce) { const r = punchBtn.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top, 14, .9, .55); }
    });
    if (reduce) runBtn.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i> <span>Auto-run off</span>', runBtn.setAttribute('aria-pressed', 'false');

    // boot message
    line('info', 'attendance-engine v2 · boot ok');
    line('ok', 'zkteco device linked · frappe cloud reachable');

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((es) => {
        const was = visible; visible = es[0].isIntersecting;
        if (visible && !was) { tickStart = performance.now() - TICK_MS + 600; }
      }, { threshold: .25 }).observe(flow);
    } else visible = true;

    setInterval(() => {
      if (!running || !visible || document.hidden) { if (bar) bar.style.transform = 'scaleX(0)'; return; }
      const p = clamp((performance.now() - tickStart) / TICK_MS, 0, 1);
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
      if (p >= 1) { tickStart = performance.now(); batch(); }
    }, 100);
  }

  /* ======================================================================
     8. YouTube gate
     ====================================================================== */
  const gate = $('#gate');
  const INERT = ['#nav', '#main', '.footer', '.mbar', '#toTop', '.skip'];
  const setInert = (on) => INERT.forEach((s) => $$(s).forEach((el) => { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }));

  function startIntro() {
    root.classList.remove('fx-pre'); root.classList.add('fx-go');
    const n = $('.hero__title .grad');
    if (n) setTimeout(() => decode(n, 900), 380);
    targets();
  }

  function initGate() {
    setInert(true);
    mountBolt($('#gateBot'));
    const gateSvg = bolts[bolts.length - 1];
    gateSvg.classList.add('is-wave');
    const q = (id) => document.getElementById(id);
    const step = [null, q('step1'), q('step2')];
    const link = [null, q('gSub'), q('gBell')];
    const conf = [null, q('c1'), q('c2')];
    const msg = [null, q('s1msg'), q('s2msg')];
    const ok = [null, q('ok1'), q('ok2')];
    const enter = q('gEnter'), prog = q('gProg'), kicker = q('gKicker'), live = q('gLive'), skip = q('gSkip');
    const st = { 1: 'idle', 2: 'idle' };
    const MSG = {
      1: { idle: 'Opens YouTube in a new tab', waiting: 'Tap “Subscribe” there, then come back 👋', done: 'Subscribed. Thank you! 💜' },
      2: { idle: 'Unlocks after step 1', ready: 'Tap the 🔔 on the channel and choose “All”', waiting: 'Choose “All” on the bell, then come back 👋', done: 'Bell on. You’re awesome! 🔔' }
    };
    let pending = 0, awayAt = 0;
    if (!CFG.allowSkip) skip.hidden = true;

    function paint() {
      const d1 = st[1] === 'done', d2 = st[2] === 'done', n = (d1 ? 1 : 0) + (d2 ? 1 : 0);
      step[1].classList.toggle('is-done', d1); step[1].classList.toggle('is-active', !d1);
      step[2].classList.toggle('is-done', d2); step[2].classList.toggle('is-active', d1 && !d2);
      link[1].hidden = d1; ok[1].hidden = !d1; conf[1].hidden = st[1] !== 'waiting';
      link[2].hidden = d2; ok[2].hidden = !d2; conf[2].hidden = st[2] !== 'waiting';
      link[2].setAttribute('aria-disabled', d1 ? 'false' : 'true'); link[2].tabIndex = d1 ? 0 : -1;
      msg[1].textContent = MSG[1][st[1]];
      msg[2].textContent = d1 ? MSG[2][st[2] === 'idle' ? 'ready' : st[2]] : MSG[2].idle;
      prog.style.width = (n * 50) + '%';
      kicker.textContent = '⚡ Boot sequence · step ' + n + ' of 2';
      const ready = n === 2;
      enter.disabled = !ready; enter.classList.toggle('is-ready', ready);
      enter.innerHTML = ready ? '🚀 Enter the portfolio' : '🔒 Locked · ' + (2 - n) + (n === 1 ? ' step left' : ' steps left');
    }
    function done(n) {
      if (st[n] === 'done') return;
      st[n] = 'done'; pending = 0;
      live.textContent = n === 1 ? 'Step 1 complete. Step 2 unlocked.' : 'Step 2 complete. The portfolio is unlocked.';
      paint();
      burstAt(step[n], n === 2 ? 46 : 26);
      gateSvg.classList.add('is-party'); setTimeout(() => gateSvg.classList.remove('is-party'), 1300);
      if (n === 1) setTimeout(() => link[2].focus({ preventScroll: true }), 80); else setTimeout(() => enter.focus({ preventScroll: true }), 80);
    }
    [1, 2].forEach((n) => {
      link[n].addEventListener('click', (e) => {
        if (link[n].getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
        st[n] = 'waiting'; pending = n; awayAt = Date.now(); paint();
      });
      conf[n].addEventListener('click', () => done(n));
    });
    const back = () => { if (pending && document.visibilityState === 'visible' && Date.now() - awayAt > CFG.minAwayMs) done(pending); };
    document.addEventListener('visibilitychange', back);
    addEventListener('focus', back);

    function unlock(granted) {
      if (gate.classList.contains('is-leaving')) return;
      if (granted) safe.set(CFG.gateKey, '1'); else safe.set(CFG.skipKey, '1', true);
      if (granted) {
        q('gateTitle').innerHTML = 'Access granted ✅';
        gateSvg.classList.add('is-party');
        confetti(innerWidth / 2, innerHeight * .5, 130, 1.4, 1.15);
        emojis(innerWidth / 2, innerHeight * .5, ['🎉', '⚙️', '✨', '💜', '🤖', '🔔'], 12);
        setTimeout(() => confetti(innerWidth * .25, innerHeight * .7, 50, .8, .9), 220);
        setTimeout(() => confetti(innerWidth * .75, innerHeight * .7, 50, .8, .9), 380);
      }
      gate.classList.add('is-leaving');
      setTimeout(() => {
        root.classList.remove('gate-open'); gate.classList.remove('is-leaving');
        setInert(false);
        const main = $('#main'); main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true });
        startIntro();
      }, granted ? 900 : 650);
    }
    enter.addEventListener('click', () => { if (!enter.disabled) unlock(true); });
    skip.addEventListener('click', () => unlock(false));
    paint();
    setTimeout(() => link[1].focus({ preventScroll: true }), 120);
  }

  /* ======================================================================
     Boot
     ====================================================================== */
  initBuddy();
  initLab();
  if (gate && root.classList.contains('gate-open')) initGate(); else startIntro();
})();
