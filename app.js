/* YMF Spanish — app shell
   Pantallas: Home (#/), Level (#/level/A1), Explore (#/explore), Progress (#/progress)
   Visor de ejercicio: #/ex/<id>
   Progreso y favoritos se guardan en el teléfono (localStorage). */

const LEVELS = {
  A1: { name: 'Beginner',           color: 'var(--a1)', card: 'a1-mariachi', cardName: 'El Mariachi',    tilt: -2.5 },
  A2: { name: 'Elementary',         color: 'var(--a2)', card: 'a2-nopal',    cardName: 'El Nopal',       tilt: 2 },
  B1: { name: 'Intermediate',       color: 'var(--b1)', card: 'b1-catrina',  cardName: 'La Catrina',     tilt: 1.5 },
  B2: { name: 'Upper intermediate', color: 'var(--b2)', card: 'b2-aguila',   cardName: 'El Águila Real', tilt: -2 },
};
const CATS = {
  Grammar: 'Grammar', Tenses: 'Tenses', Vocabulary: 'Vocabulary',
  Pronouns: 'Pronouns', Reading: 'Reading', Culture: 'Culture', Test: 'Tests',
};
const LOGO = 'icons/icon-192.png';

/* ---------- icons ---------- */
const ICON = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18 9 12l6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 7l10 10M17 7 7 17"/></svg>',
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3.8 2.5 5.1 5.6.8-4 4 .9 5.6L12 16.6l-5 2.7.9-5.6-4-4 5.6-.8z"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4 8-9"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/></svg>',
  cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="4" y="7" width="13" height="13" rx="2.5"/><path d="M8 4h9.5A2.5 2.5 0 0 1 20 6.5V16"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.5 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.5-3.6-8.5S9.5 6.1 12 3.5z"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3.5 5 6v5.5c0 4.3 3 7.7 7 9 4-1.3 7-4.7 7-9V6z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="6.5" y="3" width="11" height="18" rx="2.5"/><path d="M11 17.5h2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9"/><path d="M4.5 4.5V9H9"/></svg>',
};

/* ---------- storage (falla en silencio si el navegador lo bloquea) ---------- */
const store = {
  get(k, def) { try { const v = localStorage.getItem('ymf.' + k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set(k, v) { try { localStorage.setItem('ymf.' + k, JSON.stringify(v)); } catch {} },
};
const state = {
  done: store.get('done', {}),
  favs: store.get('favs', {}),
  last: store.get('last', null),
  opened: store.get('opened', {}),
  filters: { level: 'ALL', cat: 'ALL', q: '' },
};
const save = () => { store.set('done', state.done); store.set('favs', state.favs); store.set('last', state.last); store.set('opened', state.opened); };

const byId = id => EXERCISES.find(e => e.id === id);
const inLevel = code => EXERCISES.filter(e => e.level === code);
const doneCount = list => list.filter(e => state.done[e.id]).length;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/* ---------- UI helpers ---------- */
const $ = s => document.querySelector(s);
const app = $('#app');

function toast(html) {
  const t = $('#toast');
  t.innerHTML = html;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 1800);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días.';
  if (h < 19) return 'Buenas tardes.';
  return 'Buenas noches.';
}

function brandbar() {
  return `<div class="brandbar">
    <img src="${LOGO}" alt="">
    <b>YMF Spanish</b>
    <span class="spacer"></span>
    ${navigator.onLine ? '' : '<span class="status">Offline</span>'}
  </div>`;
}

/* Una rayita por ejercicio del nivel; las completadas se encienden. */
function ticks(list) {
  const d = doneCount(list);
  return `<div class="ticks" aria-hidden="true">${list.map((_, i) => `<i class="${i < d ? 'on' : ''}"></i>`).join('')}</div>`;
}

function levelRows() {
  return `<div class="group">${Object.entries(LEVELS).map(([code, L]) => {
    const list = inLevel(code);
    const d = doneCount(list);
    return `<a class="row lvl press" href="#/level/${code}" style="--c:${L.color}" aria-label="${code} ${L.name}, ${d} of ${list.length} done">
      <div class="top"><span class="code">${code}</span><span class="label">${L.name}</span><span class="count">${d} of ${list.length}</span></div>
      ${ticks(list)}
    </a>`;
  }).join('')}</div>`;
}

/* ---------- Lotería: cada nivel es una carta, cada ejercicio un frijolito ---------- */
// Posiciones fijas (pero "al azar") de los frijolitos sobre cada carta
function beanSpots(code, n) {
  let seed = [...code].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7) >>> 0;
  const rnd = () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const spots = [];
  for (let i = 0; i < n; i++) {
    let best = null, bestGap = -1;
    for (let k = 0; k < 14; k++) {            // busca un lugar que no encime a los demás
      const x = 14 + rnd() * 72, y = 17 + rnd() * 60;
      const gap = Math.min(99, ...spots.map(p => Math.hypot((p.x - x) * 0.66, p.y - y)));
      if (gap > bestGap) { best = { x, y }; bestGap = gap; }
    }
    best.r = Math.round(rnd() * 160 - 80);
    spots.push(best);
  }
  return spots;
}

// Cuántos frijolitos ya vio el alumno, para animar solo los nuevos
const seenBeans = store.get('seenBeans', {});

function loteriaCard(code) {
  const L = LEVELS[code];
  const list = inLevel(code);
  const d = doneCount(list);
  const full = d === list.length;
  const seen = Math.min(seenBeans[code] ?? d, d);
  const beans = beanSpots(code, d).map((p, i) => {
    const fresh = i >= seen;
    return `<i class="${fresh ? 'fresh' : ''}" style="left:${p.x.toFixed(1)}%;top:${p.y.toFixed(1)}%;--br:${p.r}deg${fresh ? `;--delay:${(i - seen) * 110 + 250}ms` : ''}"></i>`;
  }).join('');
  const stampFresh = full && (seenBeans[code] ?? 0) < list.length;
  seenBeans[code] = d;
  return `<a class="lcard press" href="#/level/${code}" style="--c:${L.color};--tilt:${L.tilt}deg" aria-label="${code} ${L.name}, ${L.cardName} card, ${d} of ${list.length} done${full ? ', complete' : ''}">
    <span class="lcard-paper">
      <img src="img/loteria/${L.card}.webp" alt="" width="600" height="900" decoding="async">
      <span class="beans" aria-hidden="true">${beans}</span>
      ${full ? `<span class="stamp${stampFresh ? ' fresh' : ''}" aria-hidden="true">¡Lotería!</span>` : ''}
    </span>
    <span class="lcard-cap">
      <span class="bar" aria-hidden="true"><i style="width:${(d / list.length * 100).toFixed(1)}%"></i></span>
      <span class="ct">${full ? '¡Lotería!' : `${d} of ${list.length}`}</span>
    </span>
  </a>`;
}

function loteria() {
  const html = `<div class="loteria">${Object.keys(LEVELS).map(loteriaCard).join('')}</div>`;
  store.set('seenBeans', seenBeans);
  return html;
}

function exRow(e, { showCat = true } = {}) {
  const c = LEVELS[e.level].color;
  const isDone = !!state.done[e.id];
  const meta = [];
  if (showCat) meta.push(`<span>${CATS[e.cat] || e.cat}</span>`);
  if (!e.local) meta.push('<span class="net">Needs internet</span>');
  return `<button class="row press" style="--c:${c}" data-open="${e.id}">
    <span class="mark ${isDone ? 'done' : ''}" aria-label="${isDone ? 'Done' : e.level}">${isDone ? ICON.check : e.level}</span>
    <span class="body">
      <span class="name">${esc(e.name)}</span>
      ${meta.length ? `<span class="meta">${meta.join('')}</span>` : ''}
    </span>
    ${state.favs[e.id] ? `<span class="fav" aria-label="Favorite">${ICON.star}</span>` : ''}
  </button>`;
}

/* ---------- install prompt ---------- */
let deferredPrompt = null;
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; route(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; toast('Installed'); route(); });
const canInstall = () => !isStandalone() && (deferredPrompt || isIOS());

function installBanner() {
  if (!canInstall() || store.get('hideInstall', false)) return '';
  return `<div class="install">
    <p><b>Install the app</b>Practice from your home screen, even offline.</p>
    <button class="btn btn-primary press" data-install>Install</button>
    <button class="icon-btn press" data-hide-install aria-label="Dismiss">${ICON.x}</button>
  </div>`;
}
async function doInstall() {
  if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; route(); }
  else openSheet();
}
/* ---------- subscribe (Google Form, opcional) ---------- */
// Convierte el "enlace prellenado" del Google Form en la dirección de envío.
const SUB = (() => {
  try {
    const u = new URL(SUBSCRIBE_FORM_LINK);
    const field = [...u.searchParams.keys()].find(k => /^entry\.\d+$/.test(k));
    if (!field || !/docs\.google\.com\/forms/.test(u.href)) return null;
    return { action: u.origin + u.pathname.replace(/\/viewform$/, '/formResponse'), field };
  } catch { return null; }
})();
const isSubscribed = () => store.get('subscribed', false);
const canSubscribe = () => !!SUB && !isSubscribed();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function sendEmail(email) {
  const body = new URLSearchParams({ [SUB.field]: email });
  // Google Forms no responde a otros sitios (no-cors): si no hay error de red, llegó.
  await fetch(SUB.action, { method: 'POST', mode: 'no-cors', body });
}
async function flushPendingEmail() {
  const pending = store.get('pendingEmail', null);
  if (!pending || !SUB || !navigator.onLine) return;
  try { await sendEmail(pending); store.set('pendingEmail', null); } catch {}
}

function subscribeNudge() {
  if (!canSubscribe() || store.get('hideSubNudge', false)) return '';
  if (doneCount(EXERCISES) < 3) return '';
  return `<div class="nudge">
    <button class="nudge-main press" data-subscribe>
      <span class="icon-tile">${ICON.mail}</span>
      <span class="body"><b>Get new exercises first</b><span>Subscriber-only material, by email.</span></span>
    </button>
    <button class="icon-btn press" data-hide-sub aria-label="Dismiss">${ICON.x}</button>
  </div>`;
}

function openSubSheet() {
  const sh = $('#sub-sheet');
  sh.classList.remove('success');
  $('#sub-error').textContent = '';
  $('#sub-email').removeAttribute('aria-invalid');
  $('#sub-btn').disabled = false;
  $('#sub-btn').textContent = 'Subscribe';
  sh.classList.add('open');
  setTimeout(() => $('#sub-email').focus({ preventScroll: true }), 380);
}
function closeSubSheet() { $('#sub-sheet').classList.remove('open'); }

$('#sub-form').addEventListener('submit', async e => {
  e.preventDefault();
  const input = $('#sub-email');
  const email = input.value.trim();
  if (!EMAIL_RE.test(email)) {
    input.setAttribute('aria-invalid', 'true');
    $('#sub-error').textContent = email ? 'Check your email address. It looks incomplete.' : 'Enter your email address.';
    input.focus();
    return;
  }
  input.removeAttribute('aria-invalid');
  $('#sub-error').textContent = '';
  const btn = $('#sub-btn');
  btn.disabled = true; btn.textContent = 'Subscribing…';
  let text = "We'll write when there's something new.";
  if (navigator.onLine) {
    try { await sendEmail(email); }
    catch { store.set('pendingEmail', email); text = "You're offline right now. We'll send it as soon as you connect."; }
  } else {
    store.set('pendingEmail', email);
    text = "You're offline right now. We'll send it as soon as you connect.";
  }
  store.set('subscribed', true);
  $('#sub-done-text').textContent = text;
  $('#sub-sheet').classList.add('success');
  input.value = '';
});
$('#sub-close').onclick = () => { closeSubSheet(); route(); };
$('#sub-sheet').onclick = e => { if (e.target.id === 'sub-sheet') { closeSubSheet(); if (isSubscribed()) route(); } };

function openSheet() { $('#ios-sheet').classList.add('open'); }
function closeSheet() { $('#ios-sheet').classList.remove('open'); }

/* ---------- screens ---------- */
function Home() {
  const total = EXERCISES.length, d = doneCount(EXERCISES);
  const last = state.last && byId(state.last);
  const lede = d === 0
    ? 'Pick a level and start practicing.'
    : `<strong>${d} of ${total}</strong> exercises done. ¡Échale ganas!`;

  const tools = TOOLS.map((t, i) => `<button class="row press" data-tool="${t.id}">
      <span class="icon-tile">${i === 0 ? ICON.bolt : ICON.cards}</span>
      <span class="body"><span class="name">${esc(t.name)}</span><span class="desc">${esc(t.desc)}</span></span>
    </button>`).join('');

  return `${brandbar()}
    <h1 class="greeting">${greeting()}</h1>
    <p class="lede">${lede}</p>
    ${last ? `<button class="resume press" data-open="${last.id}">
      <span class="body"><small>Continue where you left off</small><span class="title">${esc(last.name)}</span></span>
      <span class="play" aria-hidden="true">${ICON.play}</span>
    </button>` : ''}
    ${installBanner()}
    <h2 class="h2">Levels<span>Tap a card</span></h2>
    ${loteria()}
    ${subscribeNudge()}
    <h2 class="h2">Free tools</h2>
    <div class="group">${tools}</div>`;
}

function Level(code) {
  const L = LEVELS[code];
  if (!L) return Home();
  const list = inLevel(code);
  const cats = [...new Set(list.map(e => e.cat))];
  const d = doneCount(list);
  return `<a href="#/" class="back press">${ICON.back}Home</a>
    <div class="lvl-hero" style="--c:${L.color};--tilt:${L.tilt}deg">
      <img class="lvl-card" src="img/loteria/${L.card}.webp" alt="${L.cardName} Lotería card" width="600" height="900">
      <div class="lvl-text">
        <h1 class="page-title"><span style="color:var(--c)">${code}</span> ${L.name}</h1>
        <p class="page-sub">${d === list.length ? '¡Lotería! Every exercise done.' : `${d} of ${plural(list.length, 'exercise', 'exercises')} done`}</p>
      </div>
    </div>
    <div style="--c:${L.color}">${ticks(list)}</div>
    ${cats.map(c => {
      const items = list.filter(e => e.cat === c);
      return `<h2 class="h2">${CATS[c] || c}<span>${items.length}</span></h2>
        <div class="group">${items.map(e => exRow(e, { showCat: false })).join('')}</div>`;
    }).join('')}`;
}

function filteredExercises() {
  const f = state.filters, q = norm(f.q.trim());
  return EXERCISES.filter(e =>
    (f.level === 'ALL' || e.level === f.level) &&
    (f.cat === 'ALL' || e.cat === f.cat) &&
    (!q || norm(`${e.name} ${e.cat} ${e.level}`).includes(q)));
}

function resultsHTML() {
  const list = filteredExercises();
  if (!list.length) {
    const f = state.filters;
    return `<div class="empty">
      <b>No exercises match${f.q ? ` “${esc(f.q)}”` : ''}</b>
      Try another word, or clear the filters.
      <div><button class="btn btn-quiet press" data-clear>Clear filters</button></div>
    </div>`;
  }
  return `<p class="results">${plural(list.length, 'exercise', 'exercises')}</p>
    <div class="group">${list.map(e => exRow(e)).join('')}</div>`;
}

function Explore() {
  const f = state.filters;
  const chip = (type, val, label, color) =>
    `<button class="chip press" aria-pressed="${f[type] === val}" data-f="${type}" data-v="${val}"${color ? ` style="--c:${color}"` : ''}>${color ? '<span class="dot"></span>' : ''}${label}</button>`;
  return `${brandbar()}
    <h1 class="page-title">Explore</h1>
    <label class="search">
      ${ICON.search}
      <input id="q" type="search" placeholder="Search ser, subjuntivo, vocabulario…" value="${esc(f.q)}" autocomplete="off" enterkeyhint="search" aria-label="Search exercises">
      ${f.q ? `<button class="icon-btn clear press" data-clear-q aria-label="Clear search">${ICON.x}</button>` : ''}
    </label>
    <div class="chips" role="group" aria-label="Level">${chip('level', 'ALL', 'All levels')}${Object.entries(LEVELS).map(([k, L]) => chip('level', k, k, L.color)).join('')}</div>
    <div class="chips" role="group" aria-label="Topic">${chip('cat', 'ALL', 'All topics')}${Object.entries(CATS).map(([k, v]) => chip('cat', k, v)).join('')}</div>
    <div id="results">${resultsHTML()}</div>`;
}

function Progress() {
  const total = EXERCISES.length, d = doneCount(EXERCISES);
  const favs = EXERCISES.filter(e => state.favs[e.id]);
  const link = (href, icon, label, ext = true) =>
    `<a class="row link-row press" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span class="icon-tile">${icon}</span><span class="body"><span class="name">${label}</span></span></a>`;
  return `${brandbar()}
    <h1 class="page-title">Progress</h1>
    <p class="page-sub">${d} of ${total} exercises done, saved on this phone.</p>
    <h2 class="h2">By level</h2>
    ${levelRows()}
    <h2 class="h2">Favorites${favs.length ? `<span>${favs.length}</span>` : ''}</h2>
    ${favs.length
      ? `<div class="group">${favs.map(e => exRow(e)).join('')}</div>`
      : '<div class="group"><p class="empty" style="padding:20px">Tap the star inside any exercise to keep it here.</p></div>'}
    <h2 class="h2">Your Mexican Friend</h2>
    <div class="group">
      ${canInstall() ? `<button class="row link-row press" data-install><span class="icon-tile">${ICON.phone}</span><span class="body"><span class="name">Install the app</span></span></button>` : ''}
      ${canSubscribe() ? `<button class="row link-row press" data-subscribe><span class="icon-tile">${ICON.mail}</span><span class="body"><span class="name">Get new exercises by email</span></span></button>` : ''}
      ${link('https://www.yourmexicanfriend.com', ICON.globe, 'yourmexicanfriend.com')}
      ${link('https://open.spotify.com/show/5ewwW6KywrSh0JXZxALOg6', ICON.mic, 'Listen to the podcast')}
      ${link('mailto:urmexicanfriend@gmail.com', ICON.mail, 'Write to us', false)}
      ${link('privacy.html', ICON.shield, 'Privacy policy', false)}
      <button class="row link-row danger press" data-reset><span class="icon-tile">${ICON.reset}</span><span class="body"><span class="name">Reset progress</span></span></button>
    </div>`;
}

/* ---------- exercise viewer ---------- */
let currentEx = null;
let closeTimer = null;

function openViewer(id) {
  const e = byId(id) || TOOLS.find(t => t.id === id);
  if (!e) { location.hash = '#/'; return; }
  clearTimeout(closeTimer);
  currentEx = e;
  const isTool = !e.level;
  $('#v-title').textContent = e.name;
  $('#v-sub').textContent = isTool ? 'Free tool, needs internet' : `${e.level} ${LEVELS[e.level].name}, ${(CATS[e.cat] || e.cat).toLowerCase()}`;
  $('#v-done').hidden = isTool;
  $('#v-fav').hidden = isTool;
  syncViewerButtons();

  const frame = $('#v-frame');
  if (!e.local && !navigator.onLine) {
    frame.innerHTML = `<div class="vmsg"><div><b>This one needs internet</b>Connect to open it. Every other exercise works offline.</div></div>`;
  } else {
    frame.innerHTML = `<div class="vmsg"><div class="spinner" role="progressbar" aria-label="Loading"></div></div><iframe title="${esc(e.name)}" allow="autoplay; microphone" src="${e.local || e.url}"></iframe>`;
    const ifr = frame.querySelector('iframe');
    ifr.addEventListener('load', () => { ifr.classList.add('ready'); frame.querySelector('.vmsg')?.remove(); }, { once: true });
  }
  if (!isTool) {
    state.last = e.id;
    state.opened[e.id] = (state.opened[e.id] || 0) + 1;
    save();
  }
  document.body.classList.add('viewing');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => $('#viewer').classList.add('open'));
}

function closeViewer() {
  const v = $('#viewer');
  if (!v.classList.contains('open')) return;
  v.classList.remove('open');
  document.body.classList.remove('viewing');
  document.body.style.overflow = '';
  currentEx = null;
  try { speechSynthesis.cancel(); } catch {}
  // Vacía el iframe cuando termina de bajar el panel
  closeTimer = setTimeout(() => { $('#v-frame').innerHTML = ''; if (pendingReload) location.reload(); }, 440);
}

function syncViewerButtons() {
  if (!currentEx) return;
  const d = !!state.done[currentEx.id];
  const b = $('#v-done');
  b.setAttribute('aria-pressed', d);
  b.querySelector('span').textContent = d ? 'Done' : 'Mark done';
  const f = !!state.favs[currentEx.id];
  $('#v-fav').setAttribute('aria-pressed', f);
  $('#v-fav').setAttribute('aria-label', f ? 'Remove from favorites' : 'Save to favorites');
}

$('#v-back').onclick = () => (history.length > 1 ? history.back() : (location.hash = '#/'));
$('#v-done').onclick = () => {
  const id = currentEx.id;
  if (state.done[id]) delete state.done[id];
  else { state.done[id] = Date.now(); toast('¡Bien hecho! Marked as done'); }
  save(); syncViewerButtons();
};
$('#v-fav').onclick = () => {
  const id = currentEx.id;
  if (state.favs[id]) { delete state.favs[id]; toast('Removed from favorites'); }
  else { state.favs[id] = true; toast('Saved to favorites'); }
  save(); syncViewerButtons();
};

/* ---------- router ---------- */
let lastPage = '';
const TABS = ['home', 'explore', 'progress'];

function moveTabPill(tab) {
  const i = Math.max(0, TABS.indexOf(tab));
  $('#tab-pill').style.transform = `translateX(${i * 100}%)`;
  document.querySelectorAll('nav.tabs a').forEach(a => {
    if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function route() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [, page, arg] = h.split('/');
  if (page === 'ex') { openViewer(decodeURIComponent(arg)); return; }
  closeViewer();

  let html, tab = 'home';
  if (page === 'level') html = Level(arg);
  else if (page === 'explore') { html = Explore(); tab = 'explore'; }
  else if (page === 'progress') { html = Progress(); tab = 'progress'; }
  else html = Home();

  app.innerHTML = html;
  moveTabPill(tab);
  if (h !== lastPage) window.scrollTo(0, 0);
  lastPage = h;
}
window.addEventListener('hashchange', route);

/* ---------- delegated events ---------- */
app.addEventListener('click', e => {
  const t = e.target.closest('[data-open],[data-tool],[data-f],[data-install],[data-hide-install],[data-reset],[data-clear],[data-clear-q],[data-subscribe],[data-hide-sub]');
  if (!t) return;
  if (t.dataset.open) location.hash = '#/ex/' + encodeURIComponent(t.dataset.open);
  else if (t.dataset.tool) location.hash = '#/ex/' + t.dataset.tool;
  else if (t.dataset.f) { state.filters[t.dataset.f] = t.dataset.v; route(); }
  else if ('install' in t.dataset) doInstall();
  else if ('hideInstall' in t.dataset) { store.set('hideInstall', true); route(); }
  else if ('subscribe' in t.dataset) openSubSheet();
  else if ('hideSub' in t.dataset) { store.set('hideSubNudge', true); route(); }
  else if ('clear' in t.dataset) { state.filters = { level: 'ALL', cat: 'ALL', q: '' }; route(); }
  else if ('clearQ' in t.dataset) { state.filters.q = ''; route(); $('#q').focus(); }
  else if ('reset' in t.dataset) {
    if (confirm('Reset all progress and favorites on this phone?')) {
      state.done = {}; state.favs = {}; state.last = null; state.opened = {};
      save(); route(); toast('Progress reset');
    }
  }
});

// Buscar sin redibujar toda la pantalla (no se pierde el foco ni el teclado)
app.addEventListener('input', e => {
  if (e.target.id !== 'q') return;
  const had = !!state.filters.q;
  state.filters.q = e.target.value;
  $('#results').innerHTML = resultsHTML();
  if (had !== !!state.filters.q) {
    const label = e.target.closest('.search');
    const btn = label.querySelector('.clear');
    if (state.filters.q && !btn) label.insertAdjacentHTML('beforeend', `<button class="icon-btn clear press" data-clear-q aria-label="Clear search">${ICON.x}</button>`);
    if (!state.filters.q && btn) btn.remove();
  }
});

$('#ios-close').onclick = closeSheet;
$('#ios-sheet').onclick = e => { if (e.target.id === 'ios-sheet') closeSheet(); };
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if ($('#sub-sheet').classList.contains('open')) closeSubSheet();
  else if ($('#ios-sheet').classList.contains('open')) closeSheet();
  else if (currentEx) $('#v-back').click();
});
window.addEventListener('online', () => { flushPendingEmail(); route(); });
window.addEventListener('offline', route);

route();
flushPendingEmail();

/* ---------- service worker (modo offline) ---------- */
// Cuando llega una versión nueva, la app se recarga sola una vez.
// Si el alumno está a mitad de un ejercicio, espera a que lo cierre.
let pendingReload = false;
function reloadForUpdate() {
  if (currentEx) { pendingReload = true; return; }
  location.reload();
}
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    reloading = true;
    reloadForUpdate();
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' })
      .then(reg => reg.update())
      .catch(() => {});
  });
}
