/* ==========================================================================
   Reviews & feedback  —  Firebase Cloud Firestore (collection: "reviews")
   · Seed testimonials always render instantly (even offline / if Firebase is blocked)
   · Live reviews stream in with onSnapshot
   · Visitors can leave feedback, edit their own, and mark reviews "Helpful"
   · Admin delete: click the "What people say" heading 5 times, then enter the password
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyBteB0YTx8TvI_WnJY97kfhthvB3e8C6fE",
  authDomain: "portfolio-4cde5.firebaseapp.com",
  projectId: "portfolio-4cde5",
  storageBucket: "portfolio-4cde5.firebasestorage.app",
  messagingSenderId: "364217370442",
  appId: "1:364217370442:web:bb7850714bf96e1f4163b3",
  measurementId: "G-J2JYC707ET"
};

const D = window.PORTFOLIO || { seedReviews: [], contact: {} };
const UI = window.__ui || { toast() {}, confetti() {}, esc: (s) => String(s) };
const $ = (s) => document.querySelector(s);
const esc = UI.esc;

const LIKES_KEY = 'murthu_portfolio_review_likes';
const MINE_KEY = 'murthu_portfolio_my_review_ids';
const LAST_KEY = 'murthu_portfolio_review_last';
// SHA-256 of the admin password (plaintext is never stored). Same hash as before, so the existing password keeps working.
const ADMIN_HASH = 'edb72af94b74b663d6f9a1921aebb33ba23b4034ba369ebd379f2e9c3f8fb9ef';

const grid = $('#reviewsGrid');
const form = $('#revForm');
const statusEl = $('#revStatus');
const submitBtn = $('#revSubmit');
const SUBMIT_HTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Submit feedback';
const UPDATE_HTML = '<i class="fas fa-pen" aria-hidden="true"></i> Update feedback';

let fb = null;            // firebase handles once loaded
let live = [];            // reviews from Firestore
let stars = 0;
let editingId = null;
let isAdmin = false;
try { isAdmin = sessionStorage.getItem('murthu_admin') === '1'; } catch (e) { /* ignore */ }

/* ---------- tiny storage helpers ---------- */
const read = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch (e) { return fallback; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } };
const myIds = () => read(MINE_KEY, []);
const likes = () => read(LIKES_KEY, {});

/* ---------- rendering ---------- */
const clean = (r) => ({
  id: r.id,
  seed: !!r.seed,
  name: String(r.name || 'Anonymous').slice(0, 60),
  role: String(r.role || '').slice(0, 80),
  review: String(r.review || '').slice(0, 800),
  rating: Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5))),
  createdAt: r.createdAt || null
});

function dateLabel(ts) {
  if (!ts) return 'Just now';
  const d = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
  return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
}
const starsHTML = (n) => Array.from({ length: 5 }, (_, i) => '<i class="fas fa-star' + (i < n ? '' : ' off') + '"></i>').join('');

function cardHTML(r) {
  const liked = !!likes()[r.id];
  const mine = !r.seed && myIds().includes(r.id) && !isAdmin;
  const sub = [r.role, r.seed ? '' : dateLabel(r.createdAt)].filter(Boolean).join(' · ');
  return '<article class="tile review spot" data-id="' + esc(r.id) + '">' +
    '<div class="stars" role="img" aria-label="' + r.rating + ' out of 5 stars">' + starsHTML(r.rating) + (r.seed ? '' : '<span class="new-badge">NEW</span>') + '</div>' +
    '<blockquote>' + esc(r.review) + '</blockquote>' +
    '<footer><span class="avatar" aria-hidden="true">' + esc(r.name.trim().charAt(0).toUpperCase() || '?') + '</span>' +
    '<div><span class="who">' + esc(r.name) + '</span><span class="sub">' + esc(sub) + '</span></div>' +
    '<div class="review__actions">' +
      '<button class="mini' + (liked ? ' liked' : '') + '" type="button" data-act="like" aria-pressed="' + liked + '"><i class="fas fa-thumbs-up" aria-hidden="true"></i> Helpful</button>' +
      (mine ? '<button class="mini" type="button" data-act="edit"><i class="fas fa-pen" aria-hidden="true"></i> Edit</button>' : '') +
      (isAdmin && !r.seed ? '<button class="mini mini--del" type="button" data-act="del" aria-label="Delete this review"><i class="fas fa-trash" aria-hidden="true"></i></button>' : '') +
    '</div></footer></article>';
}

function render() {
  if (!grid) return;
  const all = (D.seedReviews || []).map((r) => clean({ ...r, seed: true })).concat(live.slice(0, 30).map(clean));
  grid.innerHTML = all.map(cardHTML).join('');

  const avg = all.reduce((s, r) => s + r.rating, 0) / (all.length || 1);
  const sum = $('#revSummary');
  if (sum && all.length) {
    sum.hidden = false;
    $('#revAvg').textContent = avg.toFixed(1);
    $('#revAvgStars').innerHTML = starsHTML(Math.round(avg));
    $('#revCount').textContent = all.length + (all.length === 1 ? ' review' : ' reviews');
  }
}

/* ---------- card actions (delegated) ---------- */
if (grid) grid.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const id = btn.closest('[data-id]').dataset.id;
  const act = btn.dataset.act;

  if (act === 'like') {
    const l = likes();
    if (l[id]) delete l[id]; else l[id] = 1;
    write(LIKES_KEY, l);
    btn.classList.toggle('liked', !!l[id]);
    btn.setAttribute('aria-pressed', String(!!l[id]));
  } else if (act === 'edit') {
    const r = live.find((x) => x.id === id);
    if (!r) return setStatus('Could not find that review. Please refresh and try again.', 'err');
    editingId = id;
    $('#rvName').value = r.name || '';
    $('#rvRole').value = r.role || '';
    $('#rvMsg').value = r.review || '';
    setStars(clean(r).rating);
    submitBtn.innerHTML = UPDATE_HTML;
    openForm(true);
  } else if (act === 'del') {
    if (!isAdmin || !fb) return;
    if (!confirm('Delete this review permanently for everyone?')) return;
    try { await fb.deleteDoc(fb.doc(fb.db, 'reviews', id)); UI.toast('Review deleted'); }
    catch (err) { console.error(err); UI.toast('Could not delete. Check your Firestore rules.'); }
  }
});

/* ---------- form: open / close / stars ---------- */
const toggleBtn = $('#revToggle');
function setStatus(msg, kind) { if (statusEl) { statusEl.textContent = msg; statusEl.className = 'status' + (kind ? ' ' + kind : ''); } }
function openForm(open) {
  form.classList.toggle('is-open', open);
  toggleBtn.setAttribute('aria-expanded', String(open));
  toggleBtn.innerHTML = open
    ? '<i class="fas fa-chevron-up" aria-hidden="true"></i> Close form'
    : '<i class="fas fa-pen-nib" aria-hidden="true"></i> Leave feedback';
  if (open) { form.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => $('#rvName').focus({ preventScroll: true }), 250); }
  else { editingId = null; submitBtn.innerHTML = SUBMIT_HTML; setStatus('', ''); }
}
if (toggleBtn && form) {
  toggleBtn.addEventListener('click', () => openForm(!form.classList.contains('is-open')));
  $('#revCancel').addEventListener('click', () => { form.reset(); setStars(0); openForm(false); toggleBtn.focus(); });
}

const starRow = $('#starRow');
const STAR_TEXT = ['Tap a star', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent!'];
let starBtns = [];
if (starRow) {
  starRow.innerHTML = [1, 2, 3, 4, 5].map((n) => '<button class="star-btn" type="button" role="radio" aria-checked="false" aria-label="' + n + (n === 1 ? ' star' : ' stars') + '" data-n="' + n + '"><i class="fas fa-star" aria-hidden="true"></i></button>').join('');
  starBtns = Array.from(starRow.querySelectorAll('.star-btn'));
  starRow.addEventListener('click', (e) => { const b = e.target.closest('.star-btn'); if (b) setStars(Number(b.dataset.n)); });
  starRow.addEventListener('keydown', (e) => {
    const k = e.key;
    if (!['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'].includes(k)) return;
    e.preventDefault();
    const n = Math.min(5, Math.max(1, (stars || 0) + (k === 'ArrowRight' || k === 'ArrowUp' ? 1 : -1)));
    setStars(n);
    starBtns[n - 1].focus();
  });
  starBtns.forEach((b, i) => {
    b.addEventListener('pointerenter', () => paintStars(i + 1));
    b.addEventListener('pointerleave', () => paintStars(stars));
  });
}
function paintStars(n) { starBtns.forEach((b, i) => b.classList.toggle('on', i < n)); }
function setStars(n) {
  stars = n;
  paintStars(n);
  starBtns.forEach((b, i) => { b.setAttribute('aria-checked', String(i === n - 1)); b.tabIndex = (n ? i === n - 1 : i === 0) ? 0 : -1; });
  const t = $('#starText'); if (t) t.textContent = STAR_TEXT[n] || STAR_TEXT[0];
}
setStars(0);

/* ---------- submit ---------- */
if (form) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('#rvName').value.trim(), role = $('#rvRole').value.trim(), review = $('#rvMsg').value.trim();
  if (!name) { setStatus('Please enter your name.', 'err'); return $('#rvName').focus(); }
  if (!stars) { setStatus('Please choose a star rating.', 'err'); return starBtns[0] && starBtns[0].focus(); }
  if (review.length < 5) { setStatus('Please write a short review (at least a few words).', 'err'); return $('#rvMsg').focus(); }
  if (!fb) { setStatus('Still connecting to the feedback service. Please try again in a moment, or message me on WhatsApp.', 'err'); return; }

  const wasEditing = !!editingId;
  if (!wasEditing && Date.now() - Number(localStorage.getItem(LAST_KEY) || 0) < 30000) { setStatus('Please wait a few seconds before sending another review.', 'err'); return; }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i> Submitting…';
  try {
    if (wasEditing) {
      await fb.updateDoc(fb.doc(fb.db, 'reviews', editingId), { name, role, review, rating: stars });
    } else {
      const ref = await fb.addDoc(fb.collection(fb.db, 'reviews'), { name, role, review, rating: stars, createdAt: fb.serverTimestamp() });
      write(MINE_KEY, myIds().concat(ref.id));
      try { localStorage.setItem(LAST_KEY, String(Date.now())); } catch (err) { /* ignore */ }
      // Heads-up email to Murthu (best effort, never blocks the UI)
      fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: D.contact.web3formsKey, botcheck: '', subject: '⭐ New portfolio review from ' + name, from_name: name,
          message: 'New review on the portfolio:\n\nName: ' + name + '\nRole/Company: ' + (role || 'Not mentioned') + '\nRating: ' + stars + '/5\n\nReview:\n' + review })
      }).catch(() => {});
    }
    form.reset(); setStars(0); editingId = null;
    setStatus(wasEditing ? 'Your review has been updated.' : 'Thank you! Your feedback is now live.', 'ok');
    UI.toast(wasEditing ? 'Feedback updated ✅' : 'Thank you for the feedback 💜');
    if (!wasEditing) UI.confetti();
    setTimeout(() => openForm(false), 1600);
  } catch (err) {
    console.error('Review save failed:', err);
    setStatus('Could not save your feedback. Please check your connection and try again.', 'err');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = editingId ? UPDATE_HTML : SUBMIT_HTML;
  }
});

/* ---------- admin unlock (5 quick clicks on the heading) ---------- */
const title = $('#reviewsTitle');
if (title) {
  let clicks = 0, timer;
  title.addEventListener('click', async () => {
    if (isAdmin) return;
    clicks++; clearTimeout(timer); timer = setTimeout(() => { clicks = 0; }, 1500);
    if (clicks < 5) return;
    clicks = 0;
    const pass = prompt('Admin password:');
    if (pass === null) return;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pass));
    const hex = Array.from(new Uint8Array(buf)).map((x) => x.toString(16).padStart(2, '0')).join('');
    if (hex === ADMIN_HASH) {
      isAdmin = true;
      try { sessionStorage.setItem('murthu_admin', '1'); } catch (e) { /* ignore */ }
      UI.toast('Admin mode on: delete buttons are visible to you only');
      render();
    } else { alert('Wrong password.'); }
  });
}

/* ---------- boot: seeds first, then Firebase (never blocks the page) ---------- */
render();
(async () => {
  try {
    const [appMod, fs] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js')
    ]);
    const app = appMod.initializeApp(firebaseConfig);
    const db = fs.getFirestore(app);
    fb = { db, collection: fs.collection, addDoc: fs.addDoc, doc: fs.doc, updateDoc: fs.updateDoc, deleteDoc: fs.deleteDoc, serverTimestamp: fs.serverTimestamp };
    const q = fs.query(fs.collection(db, 'reviews'), fs.orderBy('createdAt', 'desc'));
    fs.onSnapshot(q, (snap) => { live = snap.docs.map((d) => ({ id: d.id, ...d.data() })); render(); },
      (err) => console.error('Reviews listener error:', err));
  } catch (err) {
    console.error('Firebase unavailable, showing featured reviews only:', err);
  }
})();
