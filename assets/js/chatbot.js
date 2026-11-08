/* ==========================================================================
   Murthu's floating assistant ("Bolt AI")
   · Runs fully in the browser: no API key, no server, nothing is sent anywhere.
   · Answers from window.PORTFOLIO (data.js) plus the FACTS block below.
   · Understands English and Telugu-English ("Tenglish").
   Edit FACTS / INTENTS to change what it knows. Anything it cannot answer is
   routed to WhatsApp or email instead of guessed.
   ========================================================================== */
(() => {
  'use strict';
  if (window.__botLoaded) return; window.__botLoaded = true;
  const D = window.PORTFOLIO || { projects: [], skills: [], certs: [], cases: [], contact: {} };
  const C = D.contact || {};
  const FACTS = {
    name: 'Murthujavali Pinjari (Murthu)',
    email: 'luckymurthu@gmail.com',
    phone: '+91 91008 50087',
    wa: 'https://wa.me/' + (C.whatsapp || '919100850087'),
    resume: 'Murthujavali_Pinjari_ERPNext_Frappe.pdf'
  };
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pick = (a) => a[(Math.random() * a.length) | 0];
  const LVL = { 3: 'core expertise', 2: 'production experience', 1: 'working knowledge' };
  const fx = () => window.__fx || null;

  /* ---------- tiny markdown: **bold**, [text](url), line breaks ---------- */
  const md = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|tel:[^)\s]+|[A-Za-z0-9_./#-]+\.pdf)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n/g, '<br>');

  /* ---------- language ---------- */
  const TE = new Set('gurinchi gurinchii cheppu chepu cheppandi enti ela evaru evaru nuvvu meeru mee naku kavali undi unda ledu emi emaina ante broo bro ra chey chesav chesaru ekkada ela eppudu anni vachu telusu telsa cheyali cheyyi'.split(' '));
  const isTe = (q) => q.split(/\s+/).some((w) => TE.has(w));

  /* ---------- knowledge ---------- */
  const names = (cat) => D.projects.filter((p) => p.cat === cat).map((p) => p.title);
  const skillSummary = () => D.skills.map((g) => '**' + g.title + ':** ' + g.items.slice(0, 5).map((i) => i[1]).join(', ')).join('\n');
  const core = () => D.skills.flatMap((g) => g.items.filter((i) => i[2] === 3).map((i) => i[1])).join(', ');

  const INTENTS = [
    { id: 'greet', k: 'hi hello hey namaste hai hii yo sup', a: () => pick(['Hey! 👋 I\'m Bolt, Murthu\'s portfolio assistant. Ask me about his skills, projects, experience, or how to reach him.', 'Namaste! 🙏 Ask me anything about Murthu or this portfolio.']), t: () => 'Namaste! 🙏 Nenu Bolt, Murthu portfolio assistant ni. Skills, projects, experience, contact, em adigina cheptha.' },
    { id: 'who', k: 'who murthu murthujavali pinjari about yourself introduce intro evaru gurinchi profile summary', a: () => '**' + FACTS.name + '** is a Senior Python & Frappe/ERPNext Developer and Team Lead at **Brilliant Technologies, Hyderabad**. He designs and ships enterprise ERP systems on the Frappe stack: CRM, HR attendance automation with biometric integration, a Hospital Management System on Frappe Cloud, and payment/accounting integrations. He also runs the **Syntax Solver** YouTube channel.', t: () => '**' + FACTS.name + '** Brilliant Technologies (Hyderabad) lo Senior Python & Frappe/ERPNext Developer and Team Lead. Frappe stack lo enterprise ERP systems design chesi ship chestadu: BCRM CRM, HR attendance automation (biometric tho), Hospital Management System, payment & Tally integrations. Syntax Solver YouTube channel kuda run chestadu.', go: [['About', '#about'], ['Experience', '#experience']] },
    { id: 'role', k: 'role job company work working current brilliant technologies designation position lead team mentor mentoring', a: () => 'Currently **Senior Python & Frappe/ERPNext Developer · Team Lead** at Brilliant Technologies (2025 to present). He leads development, reviews code, handles releases on Frappe Cloud and mentors the developers working alongside him (a 4-person engineering team).', t: () => 'Ippudu **Senior Python & Frappe/ERPNext Developer · Team Lead**, Brilliant Technologies lo (2025 nunchi). Development lead chestadu, code reviews, Frappe Cloud releases, 4 mandi team ni mentor chestadu.', go: [['Experience', '#experience']] },
    { id: 'exp', k: 'experience history career timeline worked before internship intern vsplash durga eduskills years', a: () => '**Experience**\n• 2025 to now: Senior Python & Frappe/ERPNext Developer · Team Lead, Brilliant Technologies\n• Feb to May 2025: WordPress Integrator, Vsplash Techlabs\n• 2024: Python Full Stack Intern, Durga Software Solutions\n• 2024: Full Stack Web Development Intern, Eduskills Academy\n• 2022 to 2024: Intern Student Coordinator, Eduskills Academy\n• 2023: Smart India Hackathon, 2nd Prize', t: () => '**Experience**\n• 2025 nunchi: Senior Python & Frappe/ERPNext Developer · Team Lead, Brilliant Technologies\n• Feb-May 2025: WordPress Integrator, Vsplash Techlabs\n• 2024: Python Full Stack Intern, Durga Software Solutions\n• 2024: Full Stack Web Dev Intern, Eduskills Academy\n• 2022-2024: Intern Student Coordinator, Eduskills\n• 2023: Smart India Hackathon 2nd Prize', go: [['See timeline', '#experience']] },
    { id: 'edu', k: 'education study college degree btech b.tech cgpa graduated qualification santhiram intermediate ssc school', a: () => '**Education**\n• B.Tech, Electronics & Communication Engineering, Santhiram Engineering College, 2024, CGPA 8.0/10\n• Intermediate (MPC), KNR Memorial Junior College, 2020, 74%\n• SSC, Sri Raja Rajeswari High School, 2018, 85%', t: () => '**Education**\n• B.Tech ECE, Santhiram Engineering College, 2024, CGPA 8.0/10\n• Intermediate (MPC), KNR Memorial Junior College, 2020, 74%\n• SSC, Sri Raja Rajeswari High School, 2018, 85%', go: [['About', '#about']] },
    { id: 'award', k: 'award achievement hackathon sih smart india prize won winner', a: () => '🥈 **Smart India Hackathon 2023: 2nd Prize** at the national level, a Government of India initiative.', t: () => '🥈 **Smart India Hackathon 2023: 2nd Prize**, national level lo (Government of India initiative).', go: [['Experience', '#experience']], party: true },
    { id: 'skills', k: 'skills skill tech stack technologies technology expert expertise know languages tools strong best', a: () => 'Core expertise: **' + core() + '**.\n\n' + skillSummary() + '\n\nLevels on the site are honest labels (core, production, working), not made-up percentages. Ask "do you know Flutter?" for a specific one.', t: () => 'Core expertise: **' + core() + '**.\n\n' + skillSummary() + '\n\nSite lo fake percentages levu, honest levels matrame. "Flutter telusa?" ani adugu.', go: [['Skills', '#skills']] },
    { id: 'projects', k: 'projects project portfolio built apps work done list showcase', a: () => 'Murthu\'s work, grouped:\n**ERPNext / Frappe:** ' + names('erp').slice(0, 6).join('; ') + '…\n**AI:** ' + names('ai').join('; ') + '\n**Mobile & IoT:** ' + names('mobile').join('; ') + '\n\nTap Details on any card for the problem, contribution and features. Ask about one by name, like "tell me about BCRM".', t: () => 'Projects:\n**ERPNext / Frappe:** ' + names('erp').slice(0, 6).join('; ') + '…\n**AI:** ' + names('ai').join('; ') + '\n**Mobile & IoT:** ' + names('mobile').join('; ') + '\n\nOka project peru cheppu, details istha (ex: "BCRM gurinchi").', go: [['Projects', '#projects'], ['Case studies', '#work']] },
    { id: 'cases', k: 'case study studies deep dive architecture', a: () => 'There are 5 deep-dive case studies: **' + D.cases.map((c) => c.title).join('**, **') + '**. Each follows the same 10 points: overview, problem, challenges, architecture, tech, approach, contribution, implementation, features, impact.', t: () => '5 case studies unnayi: **' + D.cases.map((c) => c.title).join('**, **') + '**. Prathidi 10 points tho untundi.', go: [['Case studies', '#work'], ['Full page', 'case-studies.html']] },
    { id: 'auto', k: 'automation lab demo pipeline simulate punch robot attendance engine', a: () => 'The **Automation lab** is a simulation of the attendance pipeline Murthu built: device punch → middleware → ERPNext → rules → salary slip. Press "Simulate a punch" and watch it travel. The real system: 7 rule types, a 5-minute scheduler, about 75 employees and 39,000+ logs synced.', t: () => '**Automation lab** ante Murthu build chesina attendance pipeline simulation: device punch → middleware → ERPNext → rules → salary slip. "Simulate a punch" nokku. Real system lo 7 rule types, 5-min scheduler, 75 employees, 39,000+ logs.', go: [['Open lab', '#automation']] },
    { id: 'certs', k: 'certificate certificates certification certifications certified course courses', a: () => 'Certifications on LinkedIn include ' + D.certs.slice(0, 6).map((c) => '**' + c[1] + '** (' + c[2] + ', ' + c[3] + ')').join('; ') + ' and more.', t: () => 'Certifications: ' + D.certs.slice(0, 6).map((c) => '**' + c[1] + '** (' + c[2] + ')').join('; ') + ' inka unnayi.', go: [['Certifications', '#certs']] },
    { id: 'contact', k: 'contact reach connect talk call phone number email mail message hire hiring recruit interview collaborate', a: () => 'Fastest: **WhatsApp** [' + FACTS.phone + '](' + FACTS.wa + ')\nEmail: [' + FACTS.email + '](mailto:' + FACTS.email + ')\n[LinkedIn](' + C.linkedin + ') · [GitHub](' + C.github + ') · [YouTube](' + C.youtube + ')', t: () => 'Fastest: **WhatsApp** [' + FACTS.phone + '](' + FACTS.wa + ')\nEmail: [' + FACTS.email + '](mailto:' + FACTS.email + ')\n[LinkedIn](' + C.linkedin + ') · [GitHub](' + C.github + ') · [YouTube](' + C.youtube + ')', go: [['Contact form', '#contact']], party: true },
    { id: 'avail', k: 'available availability open remote onsite hybrid relocate opportunity opportunities hire joining notice', a: () => 'Murthu is open to **on-site, remote and hybrid** roles, in India and internationally. For notice period, salary or timing, message him directly on [WhatsApp](' + FACTS.wa + ') instead of guessing here.', t: () => '**On-site, remote, hybrid** anni ki open, India & international. Notice period / salary laanti vishayalu [WhatsApp](' + FACTS.wa + ') lo direct ga adugu.' },
    { id: 'where', k: 'where location live based city hyderabad hometown nandyal andhra', a: () => 'Murthu works in **Hyderabad** (Brilliant Technologies). His hometown is Nandyal District, Andhra Pradesh 🇮🇳.', t: () => 'Hyderabad lo work chestadu. Hometown: Nandyal District, Andhra Pradesh 🇮🇳.' },
    { id: 'resume', k: 'resume cv download pdf', a: () => 'Here you go: [Download resume](' + FACTS.resume + ') 📄', t: () => 'Idigo: [Resume download](' + FACTS.resume + ') 📄', party: true },
    { id: 'yt', k: 'youtube channel syntax solver subscribe videos teach teaching tutorial', a: () => 'Murthu runs **Syntax Solver**, a YouTube channel teaching coding fundamentals: [youtube.com/@Syntaxsolver-u5m](' + C.youtube + '). Subscribe and tap the 🔔!', t: () => '**Syntax Solver** YouTube channel run chestadu, coding fundamentals nerputadu: [youtube.com/@Syntaxsolver-u5m](' + C.youtube + '). Subscribe chesi 🔔 nokku!', go: [['Videos', '#videos']] },
    { id: 'frappe', k: 'frappe erpnext erp doctype custom app hrms healthcare bench cloud', a: () => 'Frappe/ERPNext is Murthu\'s specialty: custom DocTypes, server and client scripts, workflows, role permissions, REST integrations, dashboards and Frappe Cloud deployments, across HRMS, CRM, Healthcare and Manufacturing.', t: () => 'Frappe/ERPNext Murthu specialty: custom DocTypes, server/client scripts, workflows, permissions, REST integrations, dashboards, Frappe Cloud deployments. HRMS, CRM, Healthcare, Manufacturing anni lo.', go: [['Frappe projects', '#projects']] },
    { id: 'site', k: 'site website portfolio built made how technology theme robot bolt gate popup animation design', a: () => 'This portfolio is hand-built HTML, CSS and vanilla JavaScript on GitHub Pages: no framework. It has a dark/light theme, a command palette (Ctrl+K), a robot (Bolt) that flies as you scroll, a live automation lab and this assistant.', t: () => 'Ee portfolio hand-built HTML, CSS, vanilla JS, GitHub Pages meeda. Dark/light theme, Ctrl+K palette, scroll ayyetappudu ne tho ave Bolt robot, automation lab, ee assistant unnayi.' },
    { id: 'thanks', k: 'thanks thank thx super awesome great nice cool superb wow excellent', a: () => pick(['Happy to help! 💜', 'Anytime! Anything else?', 'You got it! 🚀']), t: () => pick(['Thanks bro! 💜', 'Super! Inka emaina adugu 🚀']), party: true },
    { id: 'joke', k: 'joke funny laugh fun', a: () => pick(['Why do Python devs wear glasses? Because they can\'t C#. 😄', 'A SQL query walks into a bar, sees two tables and asks: "Can I join you?" 🍻']), t: () => 'Python devs glasses enduku pettukuntaru? Endukante C# chudalem! 😄' },
    { id: 'bye', k: 'bye goodbye later cya', a: () => 'Bye! Thanks for visiting 👋', t: () => 'Bye! Visit chesinanduku thanks 👋' }
  ];

  const STOP = new Set('the a an is are of to for in on and or with me my you your do does did can could tell about what whats how who please give show any some i it this that'.split(' '));
  const tok = (s) => s.toLowerCase().replace(/[^a-z0-9.+# ]/g, ' ').split(/\s+/).filter(Boolean);

  function findProject(words) {
    let best = null, score = 0;
    D.projects.forEach((p, i) => {
      const hay = tok(p.title + ' ' + p.tech.join(' ') + ' ' + (p.badge || ''));
      const hs = new Set(hay);
      let s = 0;
      words.forEach((w) => { if (STOP.has(w) || w.length < 3) return; if (hs.has(w)) s += 2; else if (hay.some((h) => h.startsWith(w) && w.length > 3)) s += 1; });
      if (s > score) { score = s; best = i; }
    });
    return score >= 2 ? best : null;
  }
  function findSkill(words) {
    const hits = [];
    D.skills.forEach((g) => g.items.forEach((it) => {
      const n = tok(it[1]);
      if (words.some((w) => w.length > 2 && !STOP.has(w) && (n.includes(w) || (w.length > 3 && n.some((x) => x.startsWith(w)))))) hits.push([it[1], it[2], g.title]);
    }));
    return hits;
  }
  const pAnswer = (p, te) => {
    const st = { completed: 'Completed', ongoing: 'In progress', experimental: 'Experimental', academic: 'Academic' }[p.status || (p.cat === 'python' || p.cat === 'java' ? 'academic' : 'completed')];
    return '**' + p.title + '** (' + st + ')\n' + p.desc + (p.problem ? '\n**Problem:** ' + p.problem : '') + (p.contrib || p.role ? '\n**My role:** ' + (p.contrib || p.role) : '') + '\n**Tech:** ' + p.tech.join(', ');
  };

  function answer(raw) {
    const q = raw.trim(), words = tok(q), te = isTe(q.toLowerCase());
    if (!words.length) return { a: 'Type a question and I\'ll look it up 🙂' };
    // 1) a named project
    const pi = findProject(words);
    const asksProject = pi !== null && !/^(projects?|portfolio)$/.test(words.join(' '));
    // 2) a "do you know X" style skill question
    const sk = findSkill(words);
    const asksSkill = sk.length && /know|use|used|experience|skill|telusa|telsa|vachaa|expert|work|worked|familiar|can|knows/.test(q.toLowerCase());
    if (asksSkill) {
      const lines = sk.slice(0, 4).map((s) => '• **' + s[0] + '**: ' + LVL[s[1]] + ' (' + s[2] + ')').join('\n');
      const used = asksProject ? '\n\nUsed in: **' + D.projects[pi].title + '**' : '';
      return { a: (te ? 'Avunu, site lo unnayi:\n' : 'Yes, listed on the site:\n') + lines + used, detail: asksProject ? pi : null, go: [['Skills', '#skills']] };
    }
    if (asksProject) return { a: pAnswer(D.projects[pi], te), detail: pi, go: [['All projects', '#projects']] };
    // 3) intents by keyword score
    let best = null, score = 0;
    INTENTS.forEach((it) => {
      const ks = it.k.split(' ');
      let s = 0;
      words.forEach((w) => { if (ks.includes(w)) s += w.length > 3 ? 2 : 1; });
      if (s > score) { score = s; best = it; }
    });
    if (best && score >= 1) return { a: (te && best.t ? best.t : best.a)(), go: best.go, party: best.party };
    if (sk.length) return { a: 'Listed on the site: ' + sk.slice(0, 4).map((s) => '**' + s[0] + '** (' + LVL[s[1]] + ')').join(', '), go: [['Skills', '#skills']] };
    return { a: (te ? 'Idi naaku teliyadu, kani Murthu ne direct ga adugu 👇' : 'I don\'t have that one, and I\'d rather not guess. Murthu can answer it directly:') + '\n[WhatsApp](' + FACTS.wa + ') · [Email](mailto:' + FACTS.email + ')\n\nTry: skills, projects, experience, education, resume or contact.', chips: true };
  }

  /* ---------- UI ---------- */
  const BOT_SVG = '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect x="10" y="14" width="44" height="36" rx="16" fill="url(#fxBody)"/><rect x="16" y="21" width="32" height="20" rx="10" fill="#14183a"/><ellipse class="be" cx="26" cy="31" rx="4" ry="5" fill="#5eead4"/><ellipse class="be" cx="38" cy="31" rx="4" ry="5" fill="#5eead4"/><path d="M28 38q4 3 8 0" fill="none" stroke="#5eead4" stroke-width="2" stroke-linecap="round"/><line x1="32" y1="14" x2="32" y2="7" stroke="#a99dff" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="5" r="3.6" fill="#ffd27a"/><circle cx="8" cy="32" r="4" fill="#ff8fb0"/><circle cx="56" cy="32" r="4" fill="#ff8fb0"/></svg>';
  const el = document.createElement('div');
  el.className = 'bot';
  el.innerHTML =
    '<button class="bot__fab" type="button" aria-label="Open chat: ask about Murthu" aria-expanded="false" aria-controls="botPanel">' +
      '<span class="bot__ring" aria-hidden="true"></span><span class="bot__ring bot__ring--2" aria-hidden="true"></span>' +
      '<span class="bot__face">' + BOT_SVG + '</span><span class="bot__dot" aria-hidden="true"></span></button>' +
    '<div class="bot__nudge" id="botNudge" role="status"></div>' +
    '<section class="bot__panel" id="botPanel" role="dialog" aria-label="Chat with Bolt, Murthu\'s assistant" hidden>' +
      '<header class="bot__head"><span class="bot__av">' + BOT_SVG + '</span><div><strong>Bolt AI</strong><small><i></i> Ask about Murthu &amp; this portfolio</small></div>' +
      '<button class="bot__x" type="button" aria-label="Close chat"><span aria-hidden="true">✕</span></button></header>' +
      '<div class="bot__log" id="botLog" role="log" aria-live="polite" aria-label="Conversation"></div>' +
      '<div class="bot__chips" id="botChips"></div>' +
      '<form class="bot__form" id="botForm" autocomplete="off"><label class="sr-only" for="botIn">Your question</label>' +
      '<input id="botIn" type="text" maxlength="200" placeholder="Ask anything… (English / Telugu-English)" enterkeyhint="send">' +
      '<button type="submit" aria-label="Send"><span aria-hidden="true">➤</span></button></form>' +
      '<p class="bot__foot">Answers come from this site\'s own content. No data leaves your browser.</p>' +
    '</section>';
  document.body.appendChild(el);
  const $ = (s) => el.querySelector(s);
  const fab = $('.bot__fab'), panel = $('#botPanel'), log = $('#botLog'), form = $('#botForm'), input = $('#botIn'), chips = $('#botChips'), nudge = $('#botNudge');
  const QUICK = ['Who is Murthu?', 'Skills', 'Projects', 'Experience', 'Education', 'Resume', 'Contact', 'Is he open to hire?'];
  let opened = false, busy = false, nudged = false;

  function scrollLog() { log.scrollTop = log.scrollHeight; }
  function addMsg(html, who) {
    const m = document.createElement('div');
    m.className = 'msg msg--' + who;
    m.innerHTML = html;
    log.appendChild(m); scrollLog();
    return m;
  }
  function renderChips(list) {
    chips.innerHTML = '';
    list.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = c;
      b.addEventListener('click', () => ask(c));
      chips.appendChild(b);
    });
  }
  function goTo(href) {
    const id = href.charAt(0) === '#' ? href.slice(1) : null;
    if (!id) { location.href = href; return; }
    const t = document.getElementById(id);
    if (!t) { location.href = 'index.html' + href; return; }
    if (innerWidth < 700) close();
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  function celebrate(small) {
    const f = fx(); if (!f || reduce) return;
    const r = (small ? panel : fab).getBoundingClientRect();
    f.confetti(r.left + r.width / 2, small ? r.top + 60 : r.top, small ? 30 : 46, 1.5, .8);
    if (!small) f.emojis(r.left + r.width / 2, r.top, ['💬', '✨', '🤖', '💜'], 6);
  }
  function respond(res) {
    busy = true;
    const typing = addMsg('<span class="typing"><i></i><i></i><i></i></span>', 'bot');
    const delay = reduce ? 0 : Math.min(900, 380 + res.a.length * 2);
    setTimeout(() => {
      typing.innerHTML = md(res.a);
      if (res.detail != null || res.go) {
        const row = document.createElement('div'); row.className = 'msg__go';
        if (res.detail != null) {
          const b = document.createElement('button'); b.type = 'button'; b.innerHTML = '⤢ Open details';
          b.dataset.detail = res.detail; row.appendChild(b);
        }
        (res.go || []).forEach((g) => {
          const b = document.createElement('button'); b.type = 'button'; b.textContent = g[0] + ' →';
          b.addEventListener('click', () => goTo(g[1])); row.appendChild(b);
        });
        typing.appendChild(row);
      }
      if (res.chips) renderChips(QUICK.slice(0, 5));
      if (res.party) celebrate(true);
      busy = false; scrollLog();
    }, delay);
  }
  function ask(text) {
    if (busy || !text.trim()) return;
    addMsg(esc(text), 'me');
    input.value = '';
    respond(answer(text));
  }
  function open() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); el.classList.add('is-open');
    nudge.classList.remove('show');
    if (!opened) {
      opened = true;
      addMsg(md('Hey! 👋 I\'m **Bolt**, Murthu\'s assistant. Ask me anything about his **skills, projects, experience, education** or how to **contact** him. Telugu-English works too: "Murthu gurinchi cheppu".'), 'bot');
      renderChips(QUICK);
    }
    celebrate(false);
    setTimeout(() => input.focus({ preventScroll: true }), 120);
  }
  function close() {
    panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); el.classList.remove('is-open');
    fab.focus({ preventScroll: true });
  }
  fab.addEventListener('click', () => (panel.hidden ? open() : close()));
  $('.bot__x').addEventListener('click', close);
  form.addEventListener('submit', (e) => { e.preventDefault(); ask(input.value); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  // open project details straight from the chat
  log.addEventListener('click', (e) => { const b = e.target.closest('[data-detail]'); if (b && innerWidth < 700) close(); });

  // friendly nudge once the visitor has settled in
  function showNudge() {
    if (nudged || opened || root.classList.contains('gate-open')) return;
    nudged = true;
    nudge.textContent = 'Ask me anything about Murthu 💬';
    nudge.classList.add('show');
    setTimeout(() => nudge.classList.remove('show'), 6500);
  }
  setTimeout(() => { if (root.classList.contains('gate-open')) { const iv = setInterval(() => { if (!root.classList.contains('gate-open')) { clearInterval(iv); setTimeout(showNudge, 4000); } }, 500); } else showNudge(); }, 7000);
})();
