/* YMF Spanish — app shell
   Pantallas: Home (#/), Level (#/level/A1), Explore (#/explore), Progress (#/progress)
   Visor de ejercicio: #/ex/<id>
   Progreso y favoritos se guardan en el teléfono (localStorage). */

const LEVELS = {
  A1: { name: 'Beginner',   color: 'var(--a1)' },
  A2: { name: 'Basic',      color: 'var(--a2)' },
  B1: { name: 'Intermediate', color: 'var(--b1)' },
  B2: { name: 'Upper Int.', color: 'var(--b2)' },
};
const CATS = {
  Grammar: '📚 Grammar', Tenses: '✍️ Tenses', Vocabulary: '🗣️ Vocabulary',
  Pronouns: '🔤 Pronouns', Reading: '📖 Reading', Culture: '🇲🇽 Culture', Test: '🧪 Test',
};
const LOGO = 'icons/icon-192.png';

/* ---------- storage (falla en silencio si el navegador lo bloquea) ---------- */
const store = {
  get(k, def) { try { const v = localStorage.getItem('ymf.' + k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set(k, v) { try { localStorage.setItem('ymf.' + k, JSON.stringify(v)); } catch {} },
};
let state = {
  done: store.get('done', {}),        // { id: timestamp }
  favs: store.get('favs', {}),        // { id: true }
  last: store.get('last', null),      // id
  opened: store.get('opened', {}),    // { id: count }
  filters: { level: 'ALL', cat: 'ALL', q: '' },
};
const save = () => { store.set('done', state.done); store.set('favs', state.favs); store.set('last', state.last); store.set('opened', state.opened); };

const byId = id => EXERCISES.find(e => e.id === id);
const doneCount = list => list.filter(e => state.done[e.id]).length;
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/* ---------- UI helpers ---------- */
const $ = s => document.querySelector(s);
const app = $('#app');
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1800);
}
function topbar(extra = '') {
  return `<div class="topbar">
    <img src="${LOGO}" alt="YMF">
    <div><div class="t1">YMF Spanish</div><div class="t2">Your Mexican Friend</div></div>
    <div class="spacer"></div>
    ${navigator.onLine ? '' : '<span class="pill off">Offline</span>'}
    ${extra}
  </div>`;
}
function exRow(e) {
  const c = LEVELS[e.level].color;
  const isDone = !!state.done[e.id];
  return `<button class="ex ${isDone ? 'done' : ''}" style="--c:${c}" data-open="${e.id}">
    <div class="dot">${isDone ? '✓' : e.level}</div>
    <div class="info">
      <div class="nm">${esc(e.name)}</div>
      <div class="sub">
        <span>${CATS[e.cat] || e.cat}</span>
        ${e.local ? '<span class="tag-off">● Offline</span>' : '<span class="tag-on">○ Online</span>'}
        ${state.favs[e.id] ? '<span class="star">★</span>' : ''}
      </div>
    </div>
  </button>`;
}

/* ---------- install prompt ---------- */
let deferredPrompt = null;
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; route(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; toast('Installed! 🎉'); route(); });
function installBanner() {
  if (isStandalone() || store.get('hideInstall', false)) return '';
  if (!deferredPrompt && !isIOS()) return '';
  return `<div class="install">
    <div style="font-size:24px">📲</div>
    <div class="tx"><b>Install the app</b>Practice from your home screen, even offline.</div>
    <button class="go" data-install>Install</button>
    <button class="x" data-hide-install aria-label="Dismiss">✕</button>
  </div>`;
}
async function doInstall() {
  if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; route(); }
  else $('#ios-sheet').classList.add('open');
}

/* ---------- screens ---------- */
function Home() {
  const total = EXERCISES.length, d = doneCount(EXERCISES), p = pct(d, total);
  const last = state.last && byId(state.last);
  const levels = Object.entries(LEVELS).map(([code, L]) => {
    const list = EXERCISES.filter(e => e.level === code);
    const dd = doneCount(list);
    return `<a class="level-card" href="#/level/${code}" style="--c:${L.color}">
      <div class="code">${code}</div><div class="name">${L.name}</div>
      <div class="meta">${dd}/${list.length} done</div>
      <div class="bar"><i style="width:${pct(dd, list.length)}%"></i></div>
    </a>`;
  }).join('');
  const tools = TOOLS.map(t => `<button class="tool" data-tool="${t.id}">
      <div class="ic">${t.icon}</div><div style="text-align:left"><div class="nm">${esc(t.name)}</div><div class="ds">${esc(t.desc)}</div></div>
    </button>`).join('');
  return `${topbar()}
    <div class="hero">
      <div class="ring" style="--p:${p}"><span>${p}%</span></div>
      <div><h2>¡Hola! Ready to practice?</h2><p>${d} of ${total} exercises done. ¡Échale ganas!</p></div>
    </div>
    ${last ? `<button class="continue" data-open="${last.id}" style="width:100%;text-align:left">
      <div><div class="lbl">Continue</div><div class="nm">${esc(last.name)}</div></div><div class="go">→</div></button>` : ''}
    ${installBanner()}
    <div class="section-title">Choose your level</div>
    <div class="levels">${levels}</div>
    <div class="section-title">Free tools</div>
    <div class="tools">${tools}</div>`;
}

function Level(code) {
  const L = LEVELS[code]; if (!L) return Home();
  const list = EXERCISES.filter(e => e.level === code);
  const cats = [...new Set(list.map(e => e.cat))];
  const groups = cats.map(c => `<div class="section-title">${CATS[c] || c}</div>
    <div class="list" style="margin-top:0">${list.filter(e => e.cat === c).map(exRow).join('')}</div>`).join('');
  const dd = doneCount(list);
  return `<a href="#/" class="pill" style="display:inline-block;margin-bottom:14px">← Home</a>
    <div class="page-title" style="color:${L.color}">${code} · ${L.name}</div>
    <div class="page-sub">${list.length} exercises · ${dd} done</div>
    <div class="bar" style="--c:${L.color}"><i style="width:${pct(dd, list.length)}%"></i></div>
    ${groups}`;
}

function Explore() {
  const f = state.filters;
  const q = norm(f.q.trim());
  const list = EXERCISES.filter(e =>
    (f.level === 'ALL' || e.level === f.level) &&
    (f.cat === 'ALL' || e.cat === f.cat) &&
    (!q || norm(e.name + ' ' + e.cat + ' ' + e.level).includes(q)));
  const chip = (type, val, label) => `<button class="chip ${f[type] === val ? 'on' : ''}" data-f="${type}" data-v="${val}">${label}</button>`;
  return `${topbar()}
    <div class="page-title">Explore</div>
    <div class="page-sub">All ${EXERCISES.length} YMF exercises</div>
    <label class="search"><span>🔍</span><input id="q" type="search" placeholder="subjuntivo, vocabulary, ser…" value="${esc(f.q)}" autocomplete="off"></label>
    <div class="chips">${chip('level', 'ALL', 'All levels')}${Object.keys(LEVELS).map(l => chip('level', l, l)).join('')}</div>
    <div class="chips" style="margin-top:8px">${chip('cat', 'ALL', 'All topics')}${Object.entries(CATS).map(([k, v]) => chip('cat', k, v)).join('')}</div>
    <div class="list" id="results">${list.length ? list.map(exRow).join('') : '<div class="empty">No exercises found 😕</div>'}</div>`;
}

function Progress() {
  const total = EXERCISES.length, d = doneCount(EXERCISES);
  const favs = EXERCISES.filter(e => state.favs[e.id]);
  const rows = Object.entries(LEVELS).map(([code, L]) => {
    const list = EXERCISES.filter(e => e.level === code), dd = doneCount(list);
    return `<div class="lvl-row" style="--c:${L.color}"><div class="top">${code} · ${L.name}<span>${dd}/${list.length}</span></div>
      <div class="bar"><i style="width:${pct(dd, list.length)}%"></i></div></div>`;
  }).join('');
  return `${topbar()}
    <div class="page-title">Your progress</div>
    <div class="page-sub">Saved on this device</div>
    <div class="section-title">Overview</div>
    <div class="stats">
      <div class="stat"><b>${d}</b><span>Done</span></div>
      <div class="stat"><b>${pct(d, total)}%</b><span>Complete</span></div>
      <div class="stat"><b>${favs.length}</b><span>Favorites</span></div>
    </div>
    <div class="section-title">By level</div>${rows}
    <div class="section-title">★ Favorites</div>
    <div class="list" style="margin-top:0">${favs.length ? favs.map(exRow).join('') : '<div class="empty" style="padding:16px">Tap ☆ inside an exercise to save it here.</div>'}</div>
    <div class="section-title">More from YMF</div>
    <div class="links">
      ${isStandalone() ? '' : '<button class="btn primary" data-install>📲 Install the app</button>'}
      <a class="btn" href="https://www.yourmexicanfriend.com" target="_blank" rel="noopener">🌐 yourmexicanfriend.com</a>
      <a class="btn" href="https://open.spotify.com/show/5ewwW6KywrSh0JXZxALOg6" target="_blank" rel="noopener">🎧 YMF Podcast</a>
      <a class="btn" href="mailto:urmexicanfriend@gmail.com">✉️ Contact us</a>
      <button class="btn ghost" data-reset>Reset progress</button>
    </div>`;
}

/* ---------- exercise viewer ---------- */
let currentEx = null;
function openViewer(id) {
  const e = byId(id) || TOOLS.find(t => t.id === id);
  if (!e) { location.hash = '#/'; return; }
  currentEx = e;
  const isTool = !e.level;
  $('#v-title').textContent = e.name;
  $('#v-sub').textContent = isTool ? 'Free tool · online' : `${e.level} · ${e.cat}${e.local ? '' : ' · online'}`;
  $('#v-done').style.display = isTool ? 'none' : '';
  $('#v-fav').style.display = isTool ? 'none' : '';
  syncViewerButtons();

  const frame = $('#v-frame');
  const src = e.local || e.url;
  if (!e.local && !navigator.onLine) {
    frame.innerHTML = `<div class="vmsg"><div><b>You're offline</b>This exercise needs internet.<br>Exercises marked ● Offline work anywhere.</div></div>`;
  } else {
    frame.innerHTML = `<div class="vmsg"><div><div class="loader"></div>Loading…</div></div><iframe title="${esc(e.name)}" allow="autoplay; microphone" src="${src}"></iframe>`;
    const ifr = frame.querySelector('iframe');
    ifr.style.opacity = 0;
    ifr.addEventListener('load', () => { ifr.style.opacity = 1; frame.querySelector('.vmsg')?.remove(); }, { once: true });
  }
  if (!isTool) {
    state.last = e.id;
    state.opened[e.id] = (state.opened[e.id] || 0) + 1;
    save();
  }
  $('#viewer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeViewer() {
  $('#viewer').classList.remove('open');
  $('#v-frame').innerHTML = '';
  document.body.style.overflow = '';
  currentEx = null;
  try { speechSynthesis.cancel(); } catch {}
}
function syncViewerButtons() {
  if (!currentEx) return;
  const d = !!state.done[currentEx.id];
  const b = $('#v-done'); b.classList.toggle('on', d); b.textContent = d ? '✓ Done' : 'Mark done';
  $('#v-fav').classList.toggle('on', !!state.favs[currentEx.id]);
  $('#v-fav svg').setAttribute('fill', state.favs[currentEx.id] ? 'currentColor' : 'none');
}
$('#v-back').onclick = () => history.length > 1 ? history.back() : (location.hash = '#/');
$('#v-done').onclick = () => {
  const id = currentEx.id;
  if (state.done[id]) delete state.done[id]; else { state.done[id] = Date.now(); toast('¡Bien hecho! ✓'); }
  save(); syncViewerButtons();
};
$('#v-fav').onclick = () => {
  const id = currentEx.id;
  if (state.favs[id]) delete state.favs[id]; else { state.favs[id] = true; toast('Saved to favorites ★'); }
  save(); syncViewerButtons();
};

/* ---------- router ---------- */
let lastPage = '';
function route() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [, page, arg] = h.split('/');
  if (page === 'ex') { openViewer(decodeURIComponent(arg)); return; }
  if ($('#viewer').classList.contains('open')) closeViewer();

  let html, tab = page || 'home';
  if (page === 'level') { html = Level(arg); tab = 'home'; }
  else if (page === 'explore') html = Explore();
  else if (page === 'progress') html = Progress();
  else { html = Home(); tab = 'home'; }

  const pageKey = h;
  app.innerHTML = html;
  document.querySelectorAll('nav.tabs a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
  if (pageKey !== lastPage) window.scrollTo(0, 0);
  lastPage = pageKey;
}
window.addEventListener('hashchange', route);

/* ---------- delegated events ---------- */
app.addEventListener('click', e => {
  const t = e.target.closest('[data-open],[data-tool],[data-f],[data-install],[data-hide-install],[data-reset]');
  if (!t) return;
  if (t.dataset.open) location.hash = '#/ex/' + encodeURIComponent(t.dataset.open);
  else if (t.dataset.tool) location.hash = '#/ex/' + t.dataset.tool;
  else if (t.dataset.f) {
    state.filters[t.dataset.f] = t.dataset.v; route();
  }
  else if ('install' in t.dataset) doInstall();
  else if ('hideInstall' in t.dataset) { store.set('hideInstall', true); route(); }
  else if ('reset' in t.dataset) {
    if (confirm('Reset all progress and favorites on this device?')) {
      state.done = {}; state.favs = {}; state.last = null; state.opened = {}; save(); route(); toast('Progress reset');
    }
  }
});
app.addEventListener('input', e => {
  if (e.target.id !== 'q') return;
  state.filters.q = e.target.value;
  const pos = e.target.selectionStart;
  route();
  const q = $('#q'); q.focus(); q.setSelectionRange(pos, pos);
});
$('#ios-close').onclick = () => $('#ios-sheet').classList.remove('open');
$('#ios-sheet').onclick = e => { if (e.target.id === 'ios-sheet') e.target.classList.remove('open'); };
window.addEventListener('online', route);
window.addEventListener('offline', route);

route();

/* ---------- service worker (modo offline) ---------- */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
