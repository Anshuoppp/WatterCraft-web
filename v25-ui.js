/* ============================================================
   WatterCraft V2.5 — UI Engine (Wiki · Guides · Leaderboards · Updates)
   PART 1 of 2 — paste this first, then paste PART 2 below it.
   Loads AFTER content.js → runs last → owns its routes.
   Self-injects styles. Never touches main.js / style.css.
   No fabricated data — locked/absent states are honest.
   ============================================================ */
(function () {
"use strict";
var D = window.WCV;
if (!D) { console.warn("[WatterCraft] v25 data missing — load v25-data files first."); return; }

var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};
var view = $("#view");

/* ---------- persistent guide progress (this device only) ---------- */
var LS_KEY = "wcv25";
function loadState() {
  try {
    var s = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    s.completed = s.completed || {}; s.inprogress = s.inprogress || {}; s.rewarded = !!s.rewarded;
    return s;
  } catch (e) { return { completed: {}, inprogress: {}, rewarded: false }; }
}
function saveState() { try { localStorage.setItem(LS_KEY, JSON.stringify(ST)); } catch (e) {} }
var ST = loadState();

var WIKI = D.wiki || [];
var GUIDES = D.guides || [];
var UPDATES = D.updates || [];
var FMETA = D.guidesMeta || {};
var FILTERS = D.updateFilters || [];

/* ---------- injected styles (prefixed, no style.css edits) ---------- */
if (!$("#wcv25css")) {
  var st = document.createElement("style");
  st.id = "wcv25css";
  st.textContent =
    "#wcToast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,16px);opacity:0;pointer-events:none;z-index:1200;" +
    "background:rgba(13,27,51,.92);border:1px solid rgba(34,211,238,.4);color:#e9f0fb;padding:11px 20px;border-radius:12px;" +
    "font-size:.9rem;box-shadow:0 14px 40px rgba(0,0,0,.5);transition:opacity .3s,transform .3s;backdrop-filter:blur(8px);}" +
    "#wcToast.show{opacity:1;transform:translate(-50%,0);}" +
    ".wc-layout{display:grid;grid-template-columns:250px 1fr;gap:20px;align-items:start;margin-top:26px;}" +
    ".wc-side{position:sticky;top:calc(var(--nav-h,70px) + 20px);padding:16px;max-height:calc(100vh - var(--nav-h,70px) - 40px);overflow:auto;border:1px solid var(--line);border-radius:14px;background:var(--surface-3);}" +
    ".wc-q{width:100%;background:rgba(4,10,20,.7);border:1px solid var(--line-2);color:var(--text);border-radius:9px;padding:9px 12px;font-size:.88rem;margin-bottom:12px;outline:none;}" +
    ".wc-q:focus{border-color:var(--cyan);}" +
    ".wc-grp{font-size:.66rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin:12px 4px 6px;font-weight:700;}" +
    ".wc-link{display:flex;gap:9px;align-items:center;padding:7px 10px;border-radius:9px;color:var(--text-2);font-size:.86rem;border:1px solid transparent;transition:background .2s,color .2s,border .2s;}" +
    ".wc-link:hover{color:var(--text);background:rgba(34,211,238,.07);}" +
    ".wc-link.on{color:var(--cyan);background:rgba(34,211,238,.12);border-color:var(--line);}" +
    ".wc-link .em{width:20px;text-align:center;flex-shrink:0;}" +
    ".wc-art{padding:28px;border:1px solid var(--line);border-radius:16px;background:var(--surface-3);position:relative;overflow:hidden;}" +
    ".wc-art-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;}" +
    ".wc-badge{display:inline-flex;padding:4px 11px;border-radius:30px;font-size:.66rem;font-weight:800;letter-spacing:1.4px;" +
    "color:#fbbf24;border:1px solid rgba(251,191,36,.35);background:rgba(251,191,36,.08);}" +
    ".wc-upd{font-size:.72rem;color:var(--muted);}" +
    ".wc-ico{font-size:2.6rem;line-height:1;margin-top:16px;}" +
    ".wc-title{font-size:clamp(1.25rem,2.6vw,1.6rem);margin:10px 0 4px;letter-spacing:.3px;}" +
    ".wc-desc{color:var(--cyan);font-size:.92rem;margin-bottom:10px;}" +
    ".wc-body p{color:var(--text-2);margin-bottom:12px;font-size:.96rem;}" +
    ".wc-facts{margin-top:18px;border:1px solid var(--line);border-radius:12px;overflow:hidden;}" +
    ".wc-fh{font-size:.68rem;letter-spacing:1.6px;text-transform:uppercase;color:var(--muted);font-weight:800;padding:12px 14px 6px;}" +
    ".wc-frow{display:flex;justify-content:space-between;gap:14px;padding:8px 14px;border-top:1px solid rgba(120,175,235,.08);}" +
    ".wc-frow b{color:var(--muted);font-weight:700;font-size:.72rem;letter-spacing:1px;text-transform:uppercase;flex-shrink:0;}" +
    ".wc-frow span{color:var(--text-2);text-align:right;font-size:.9rem;}" +
    ".wc-rellist{display:flex;flex-wrap:wrap;gap:8px;padding:4px 14px 14px;}" +
    ".wc-rel{font-size:.82rem;color:var(--cyan);border:1px solid rgba(34,211,238,.3);padding:4px 10px;border-radius:20px;transition:.2s;}" +
    ".wc-rel:hover{background:rgba(34,211,238,.1);}" +
    ".wc-nav{display:flex;justify-content:space-between;gap:12px;margin-top:22px;}" +
    ".wc-navbtn{flex:1;padding:12px 14px;border:1px solid var(--line);border-radius:12px;transition:.2s;}" +
    ".wc-navbtn:hover{border-color:var(--line-2);}" +
    ".wc-navbtn small{display:block;color:var(--muted);font-size:.7rem;letter-spacing:1px;text-transform:uppercase;}" +
    ".wc-navbtn b{font-size:.9rem;color:var(--text);}" +
    ".wc-navbtn:only-child{margin-left:auto;max-width:50%;}" +
    /* guides */
    ".wc-master{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid rgba(251,191,36,.3);border-radius:14px;margin-top:22px;background:linear-gradient(135deg,rgba(251,191,36,.08),rgba(34,211,238,.05));}" +
    ".wc-master span{font-size:1.6rem;}" +
    ".wc-master b{color:var(--amber);font-size:1rem;}" +
    ".wc-master p{color:var(--text-2);font-size:.84rem;}" +
    ".wc-progress{display:flex;align-items:center;gap:12px;margin:14px 0 22px;font-size:.82rem;color:var(--text-2);}" +
    ".wc-bar{flex:1;height:8px;border-radius:20px;background:rgba(120,175,235,.14);overflow:hidden;}" +
    ".wc-bar i{display:block;height:100%;border-radius:20px;background:linear-gradient(90deg,var(--cyan),var(--green));transition:width .6s;}" +
    ".wc-gridg{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px;}" +
    ".wc-g{opacity:0;animation:wcIn .5s ease forwards;padding:0;overflow:hidden;}" +
    ".wc-gtop{display:flex;align-items:center;gap:12px;padding:16px 16px 10px;}" +
    ".wc-gicon{font-size:1.9rem;line-height:1;}" +
    ".wc-gname{font-weight:800;font-size:1.05rem;letter-spacing:.2px;}" +
    ".wc-grole{font-size:.76rem;color:var(--muted);letter-spacing:1px;text-transform:uppercase;}" +
    ".wc-st{font-size:.62rem;font-weight:800;letter-spacing:1.2px;border:1px solid;border-radius:20px;padding:3px 9px;white-space:nowrap;margin-left:auto;}" +
    ".wc-gdesc{padding:0 16px;color:var(--text-2);font-size:.9rem;}" +
    ".wc-teach{padding:8px 16px 4px;list-style:none;}" +
    ".wc-teach li{color:var(--text-2);font-size:.86rem;padding:3px 0 3px 18px;position:relative;}" +
    ".wc-teach li::before{content:\"\u2713\";position:absolute;left:0;color:var(--cyan);font-size:.8rem;}" +
    ".wc-unlock{font-size:.78rem;color:var(--muted);padding:8px 16px 0;}" +
    ".wc-gfoot{padding:12px 16px 16px;}" +
    ".wc-cmp{font-size:.78rem;color:var(--green);font-weight:700;}" +
    "@keyframes wcIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}" +
    "@media(max-width:880px){.wc-layout{grid-template-columns:1fr}.wc-side{position:static;max-height:none}.wc-art{padding:20px}}";
  (document.head || document.documentElement).appendChild(st);
}

/* ---------- tiny toast (own element) ---------- */
function toast(msg) {
  var t = $("#wcToast");
  if (!t) { t = document.createElement("div"); t.id = "wcToast"; document.body.appendChild(t); }
  t.textContent = msg; t.className = "show";
  clearTimeout(t._tm);
  t._tm = setTimeout(function () { t.className = ""; }, 3400);
}

/* ---------- route helpers ---------- */
function segs() {
  var h = (location.hash || "").replace(/^#\/?/, "");
  return h ? h.split("/").map(decodeURIComponent) : [];
}
var OWNED = ["wiki", "guides", "leaderboards", "updates"];
function isOwned() { var s = segs(); return s.length && OWNED.indexOf(s[0]) > -1; }

function header(kicker, title, sub) {
  var t = String(title).replace(/\^(.+?)\^/g, '<span class="grad">$1</span>');
  return '<div class="section-head"><span class="kicker">' + esc(kicker) + '</span><h2 class="title">' + t + '</h2>' +
    (sub ? '<p class="sub">' + esc(sub) + '</p>' : "") + "</div>";
}

/* ============================================================
   WIKI — sidebar + article + search + prev/next
   ============================================================ */
function wikiSide(activeId) {
  var groups = {};
  WIKI.forEach(function (a) { (groups[a.cat] = groups[a.cat] || []).push(a); });
  var cats = ["Basics", "Progression", "Skills", "Content", "Economy", "Community"];
  var html = '<aside class="wc-side"><input class="wc-q" id="wcQ" placeholder="Search wiki…" aria-label="Search wiki">';
  cats.forEach(function (c) {
    if (!groups[c]) return;
    html += '<div class="wc-grp">' + esc(c) + "</div>";
    groups[c].forEach(function (a) {
      html += '<a class="wc-link' + (a.id === activeId ? " on" : "") + '" href="#/wiki/' + esc(a.id) + '">' +
        '<span class="em">' + a.icon + "</span>" + esc(a.title) + "</a>";
    });
  });
  return html + "</aside>";
}

function wikiArticle(id) {
  var a = null;
  WIKI.forEach(function (x) { if (x.id === id) a = x; });
  if (!a) a = WIKI[0];
  var idx = WIKI.indexOf(a);
  var prev = WIKI[idx - 1], next = WIKI[idx + 1];
  var facts = (a.facts || []).map(function (f) {
    return '<div class="wc-frow"><b>' + esc(f[0]) + "</b><span>" + esc(f[1]) + "</span></div>";
  }).join("");
  var body = (a.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  var rel = (a.related || []).map(function (r) {
    var t = "";
    WIKI.forEach(function (x) { if (x.id === r) t = x.title; });
    return t ? '<a class="wc-rel" href="#/wiki/' + esc(r) + '">' + esc(t) + "</a>" : "";
  }).join("");
  var nav =
    '<div class="wc-nav">' +
    (prev ? '<a class="wc-navbtn glass" href="#/wiki/' + esc(prev.id) + '"><small>‹ Previous</small><b>' + prev.icon + " " + esc(prev.title) + "</b></a>" : '<span></span>') +
    (next ? '<a class="wc-navbtn glass" href="#/wiki/' + esc(next.id) + '"><small>Next ›</small><b>' + next.icon + " " + esc(next.title) + "</b></a>" : "") +
    "</div>";
  return '<article class="wc-art">' +
    '<div class="wc-art-top"><span class="wc-badge">' + esc(a.cat) + "</span><span class=\"wc-upd\">Updated " + esc(D.updated || "Sep 2026") + "</span></div>" +
    '<div class="wc-ico">' + a.icon + "</div>" +
    '<h3 class="wc-title">' + esc(a.title) + "</h3>" +
    '<p class="wc-desc">' + esc(a.desc) + "</p>" +
    '<div class="wc-body">' + body + "</div>" +
    (facts ? '<div class="wc-facts"><div class="wc-fh">Key Facts</div>' + facts + "</div>" : "") +
    (rel ? '<div class="wc-relwrap"><div class="wc-fh">Related</div><div class="wc-rellist">' + rel + "</div></div>" : "") +
    nav + "</article>";
}

function renderWiki(id) {
  var active = id || (WIKI[0] && WIKI[0].id);
  view.innerHTML =
    '<div class="container"><section class="section" style="padding-top:0">' +
    header("Knowledge Base", "WatterCraft ^Wiki^", "30 categories — systems, items and knowledge, searchable and always growing.") +
    '<div class="wc-layout">' + wikiSide(active) + wikiArticle(active) + "</div>" +
    "</section></div>";
  var q = $("#wcQ");
  if (q) q.addEventListener("input", function () {
    var v = q.value.trim().toLowerCase();
    $$("#view .wc-link").forEach(function (l) {
      l.style.display = l.textContent.toLowerCase().indexOf(v) > -1 ? "" : "none";
    });
  });
}

/* ============================================================
   GUIDES — 20 NPC cards, unlock status, local progress
   ============================================================ */
function doneCount() {
  var n = 0;
  GUIDES.forEach(function (g) { if (ST.completed[g.id]) n++; });
  return n;
}
function pctDone() { return GUIDES.length ? Math.round(doneCount() / GUIDES.length * 100) : 0; }

function gStatus(g) {
  if (ST.completed[g.id]) return { k: "done", l: "COMPLETED", c: "#4ade80" };
  if (g.unlock && g.unlock.type === "open") return { k: "go", l: "AVAILABLE", c: "#22d3ee" };
  if (g.unlock && g.unlock.type === "after")
    return ST.completed[g.unlock.id]
      ? { k: "go", l: "AVAILABLE", c: "#22d3ee" }
      : { k: "lock", l: "LOCKED", c: "#6d7e99" };
  return { k: "lock", l: "LOCKED", c: "#6d7e99" };
}

function guideCard(g, i) {
  var sts = gStatus(g);
  var teaches = (g.teaches || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  var req = g.unlock && g.unlock.label ? '<div class="wc-unlock">🔒 ' + esc(g.unlock.label) + "</div>" : "";
  var act = "";
  if (sts.k === "done")
    act = '<span class="wc-cmp">✔ Complete' +
      (g.reward ? " · +₹" + g.reward.coins + " · +" + g.reward.xp + " XP" : "") + "</span>";
  else if (sts.k === "go")
    act = '<button class="btn btn-primary btn-block" data-guide="' + esc(g.id) + '">' +
      (ST.inprogress[g.id] ? "Complete Guide" : "Start Guide") + "</button>";
  else
    act = '<button class="btn btn-ghost btn-block" disabled>Locked</button>';
  return '<article class="glass wc-g card" style="animation-delay:' + (i * 0.035) + 's">' +
    '<div class="wc-gtop" style="border-top:3px solid ' + sts.c + '">' +
    '<span class="wc-gicon">' + g.icon + "</span>" +
    "<div><div class=\"wc-gname\">" + esc(g.name) + '</div><div class="wc-grole">' + esc(g.role) + "</div></div>" +
    '<span class="wc-st" style="color:' + sts.c + ';border-color:' + sts.c + '">' + sts.l + "</span></div>" +
    '<p class="wc-gdesc">' + esc(g.desc) + "</p>" +
    (teaches ? '<ul class="wc-teach">' + teaches + "</ul>" : "") +
    (sts.k === "lock" ? req : "") +
    '<div class="wc-gfoot">' + act + "</div></article>";
}

function renderGuides() {
  var master = FMETA.masterReward || {};
  var mInfo = master.coins ? "+₹" + master.coins + " Coins · +" + master.xp + " XP · " + esc(master.tag || "") : "";
  view.innerHTML =
    '<div class="container"><section class="section" style="padding-top:0">' +
    header("Hub Guides", "Meet the 20 ^Guides^", "Every NPC teaches one system. Finish them all to earn the " + esc(FMETA.masterTitle || "WatterCraft Scholar") + " achievement.") +
    '<div class="wc-master"><span>🏅</span><div><b>' + esc(FMETA.masterTitle || "WatterCraft Scholar") + "</b>" +
    "<p>" + mInfo + "</p></div>" + (ST.rewarded ? '<span class="wc-cmp">Claimed ✔</span>' : '<span class="wc-cmp" style="color:var(--amber)">' + doneCount() + " / 20</span>") + "</div>" +
    '<div class="wc-progress"><div class="wc-bar"><i style="width:' + pctDone() + '%"></i></div>' +
    "<span>" + doneCount() + " / " + GUIDES.length + " completed · progress saved on this device</span></div>" +
    '<div class="wc-gridg">' + GUIDES.map(guideCard).join("") + "</div>" +
    "</section></div>";
  $$("#view [data-guide]").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-guide");
      if (ST.completed[id]) return;
      if (!ST.inprogress[id]) { ST.inprogress[id] = true; }
      else {
        ST.completed[id] = true; delete ST.inprogress[id];
        if (!ST.rewarded) {
          var all = true;
          GUIDES.forEach(function (g) { if (!ST.completed[g.id]) all = false; });
          if (all) { ST.rewarded = true; toast("✦ GUIDE MASTER! " + (FMETA.masterTitle || "WatterCraft Scholar") + " unlocked"); }
        }
      }
      saveState(); renderGuides();
    });
  });
}

/* ============================================================
   PART 2 — Leaderboards · Updates · Home Latest · Boot
   ============================================================ */

/* ---------- extra styles ---------- */
if (!$("#wcv25css2")) {
  var st2 = document.createElement("style");
  st2.id = "wcv25css2";
  st2.textContent =
    ".wc-lead{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid rgba(248,113,113,.35);border-radius:14px;" +
    "background:rgba(248,113,113,.06);margin:20px 0;color:var(--text-2);font-size:.9rem;}" +
    ".wc-lead span{font-size:1.5rem;}" +
    ".wc-lead b{color:#f87171;}" +
    ".wc-tabs{display:inline-flex;gap:6px;padding:5px;border:1px solid var(--line);border-radius:12px;margin:18px 0 4px;background:var(--surface-3);}" +
    ".wc-tabs button{padding:7px 16px;border-radius:8px;font-size:.78rem;font-weight:700;letter-spacing:1px;color:var(--muted);transition:.2s;}" +
    ".wc-tabs button.on{color:var(--cyan);background:rgba(34,211,238,.12);}" +
    ".wc-lbgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:16px;}" +
    ".wc-lbcard{padding:16px;border:1px solid var(--line);border-radius:14px;background:var(--surface-3);}" +
    ".wc-lbhead{display:flex;align-items:center;gap:10px;}" +
    ".wc-lbhead .ic{font-size:1.5rem;}" +
    ".wc-lbhead b{font-size:.95rem;letter-spacing:.3px;}" +
    ".wc-lbhead small{display:block;color:var(--muted);font-size:.72rem;letter-spacing:1px;text-transform:uppercase;}" +
    ".wc-api{display:inline-flex;align-items:center;gap:6px;font-size:.62rem;font-weight:800;letter-spacing:1.2px;padding:4px 9px;" +
    "border-radius:20px;color:#fbbf24;border:1px solid rgba(251,191,36,.35);background:rgba(251,191,36,.07);margin-left:auto;}" +
    ".wc-api::before{content:\"\";width:6px;height:6px;border-radius:50%;background:#fbbf24;}" +
    ".wc-lbempty{color:var(--muted);font-size:.84rem;margin-top:12px;line-height:1.5;}" +
    ".wc-lbrow{display:grid;grid-template-columns:34px 1fr 90px;gap:10px;padding:9px 12px;border:1px dashed rgba(120,175,235,.16);" +
    "border-radius:10px;margin-top:8px;color:var(--muted);font-size:.8rem;}" +
    /* updates */
    ".wc-tools{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:18px 0 6px;}" +
    ".wc-filters{display:flex;gap:6px;flex-wrap:wrap;}" +
    ".wc-filters button{padding:6px 12px;border-radius:20px;font-size:.74rem;font-weight:700;color:var(--text-2);" +
    "border:1px solid var(--line);transition:.2s;}" +
    ".wc-filters button:hover{color:var(--text);border-color:var(--line-2);}" +
    ".wc-filters button.on{color:var(--cyan);border-color:rgba(34,211,238,.5);background:rgba(34,211,238,.1);}" +
    ".wc-usearch{flex:1;min-width:180px;background:rgba(4,10,20,.7);border:1px solid var(--line-2);color:var(--text);" +
    "border-radius:9px;padding:9px 12px;font-size:.86rem;outline:none;}" +
    ".wc-usearch:focus{border-color:var(--cyan);}" +
    ".wc-tl{position:relative;margin-top:22px;padding-left:26px;}" +
    ".wc-tl::before{content:\"\";position:absolute;left:8px;top:4px;bottom:4px;width:2px;" +
    "background:linear-gradient(180deg,var(--cyan),transparent);opacity:.4;}" +
    ".wc-ts{position:relative;margin:22px 0 8px;font-size:.7rem;font-weight:800;letter-spacing:2px;color:var(--cyan);}" +
    ".wc-ts::before{content:\"\";position:absolute;left:-26px;top:2px;width:12px;height:12px;border-radius:50%;" +
    "background:var(--cyan);box-shadow:0 0 12px rgba(34,211,238,.8);}" +
    ".wc-u{background:var(--surface-3);border:1px solid var(--line);border-radius:14px;margin:10px 0;overflow:hidden;transition:border .2s;}" +
    ".wc-u:hover{border-color:var(--line-2);}" +
    ".wc-u summary{list-style:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;}" +
    ".wc-u summary::-webkit-details-marker{display:none;}" +
    ".wc-utag{font-size:.62rem;font-weight:800;letter-spacing:1.2px;padding:4px 9px;border-radius:20px;white-space:nowrap;}" +
    ".wc-ut{flex:1;min-width:150px;}" +
    ".wc-ut b{display:block;font-size:.95rem;color:var(--text);}" +
    ".wc-ut small{color:var(--muted);font-size:.76rem;}" +
    ".wc-ust{font-size:.66rem;font-weight:800;padding:4px 10px;border-radius:20px;letter-spacing:1px;}" +
    ".wc-arrow{color:var(--muted);transition:transform .2s;}" +
    ".wc-u[open] .wc-arrow{transform:rotate(90deg);}" +
    ".wc-ubody{padding:4px 16px 16px;border-top:1px solid rgba(120,175,235,.1);margin:0 0 0;}" +
    ".wc-ubody p{color:var(--text-2);font-size:.9rem;margin-top:12px;}" +
    ".wc-umeta{display:flex;gap:16px;flex-wrap:wrap;margin-top:12px;font-size:.76rem;color:var(--muted);}" +
    ".wc-umeta b{color:var(--text-2);font-weight:700;}" +
    ".wc-empty{padding:34px 20px;text-align:center;color:var(--muted);border:1px dashed var(--line);border-radius:14px;margin-top:18px;}" +
    ".wc-empty .ic{font-size:2rem;margin-bottom:8px;}" +
    /* home latest */
    ".wc-homeupd{margin-top:8px;}" +
    ".wc-hu{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;border:1px solid var(--line);border-radius:14px;" +
    "background:var(--surface-3);transition:.25s;}" +
    ".wc-hu:hover{border-color:var(--line-2);transform:translateY(-2px);}" +
    ".wc-hu .ic{font-size:1.6rem;line-height:1;}" +
    ".wc-hu b{display:block;font-size:.96rem;color:var(--text);}" +
    ".wc-hu p{color:var(--muted);font-size:.84rem;margin-top:3px;}" +
    ".wc-hu small{color:var(--cyan);font-size:.76rem;}" +
    "@media(max-width:720px){.wc-lbgrid{grid-template-columns:1fr}.wc-lbrow{grid-template-columns:28px 1fr 70px}}";
  (document.head || document.documentElement).appendChild(st2);
}

/* ============================================================
   LEADERBOARDS — API-ready, honest empty states
   ============================================================ */
var LB_SECTIONS = [
  { icon: "⭐", name: "Watter Level", sub: "Top players" },
  { icon: "⛏️", name: "Mining", sub: "Skill leaderboard" },
  { icon: "🌾", name: "Farming", sub: "Skill leaderboard" },
  { icon: "⚔️", name: "Combat", sub: "Skill leaderboard" },
  { icon: "🪓", name: "Foraging", sub: "Skill leaderboard" },
  { icon: "🎣", name: "Fishing", sub: "Skill leaderboard" },
  { icon: "🔮", name: "Enchanting", sub: "Skill leaderboard" },
  { icon: "💰", name: "Richest Players", sub: "Coins & Gems" },
  { icon: "🧺", name: "Collections", sub: "Highest progress" },
  { icon: "📜", name: "Quests", sub: "Most completed" },
  { icon: "🏰", name: "Dungeons", sub: "Floor progress & XP" },
  { icon: "👹", name: "Combat Kills", sub: "Mobs & bosses" },
  { icon: "🏆", name: "Achievements", sub: "Most earned" },
  { icon: "🤖", name: "Minions", sub: "Progression" }
];

function renderLeaderboards() {
  var cards = LB_SECTIONS.map(function (lb, i) {
    return '<article class="wc-lbcard" style="animation:wcIn .5s ease both;animation-delay:' + (i * 0.03) + 's">' +
      '<div class="wc-lbhead"><span class="ic">' + lb.icon + "</span>" +
      "<div><b>" + esc(lb.name) + '</b><small>' + esc(lb.sub) + "</small></div>" +
      '<span class="wc-api">Awaiting API</span></div>' +
      '<div class="wc-lbempty">No rankings shown — live data connects when the network API is live. Nothing here is fabricated.</div>' +
      '<div class="wc-lbrow"><span>#</span><span>Player</span><span>Value</span></div>' +
      "</article>";
  }).join("");
  view.innerHTML =
    '<div class="container"><section class="section" style="padding-top:0">' +
    header("Leaderboards", "Top of the ^World^", "Global network rankings across every system.") +
    '<div class="wc-tabs"><button class="on" data-p="GLOBAL">GLOBAL</button><button data-p="WEEKLY">WEEKLY</button><button data-p="MONTHLY">MONTHLY</button></div>' +
    '<div class="wc-lead"><span>📡</span><div><b>Live data unavailable</b><br>Rankings will appear here automatically once the network API is connected. Placeholder or fake players are never shown.</div></div>' +
    '<div class="wc-lbgrid">' + cards + "</div>" +
    "</section></div>";
  $$("#view .wc-tabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#view .wc-tabs button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
    });
  });
}

/* ============================================================
   UPDATES — filters + search + vertical timeline
   ============================================================ */
var UPD_FILTER = "all";
var UPD_Q = "";

function uDate(dstr) {
  var p = String(dstr).split("-");
  var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (+p[2] || "") + " " + m[(+p[1]) - 1] + " " + p[0];
}
function uBucket(dstr) {
  var now = new Date(); now.setHours(0, 0, 0, 0);
  var d = new Date(dstr + "T00:00:00");
  var diff = Math.round((now - d) / 86400000);
  if (diff === 0) return "TODAY";
  if (diff === 1) return "YESTERDAY";
  if (diff < 7) return "THIS WEEK";
  return "OLDER";
}
var CAT_COLORS = {
  fix: ["#f87171", "rgba(248,113,113,.12)"],
  new: ["#4ade80", "rgba(74,222,128,.12)"],
  announcement: ["#38bdf8", "rgba(56,189,248,.12)"],
  maintenance: ["#fb923c", "rgba(251,146,60,.12)"],
  balance: ["#fbbf24", "rgba(251,191,36,.12)"],
  website: ["#a78bfa", "rgba(167,139,250,.12)"],
  event: ["#e879f9", "rgba(232,121,249,.12)"]
};

function updateCard(u) {
  var col = (CAT_COLORS[u.cat] || CAT_COLORS.announcement);
  var body = (u.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  var aff = (u.affected || []).join(", ");
  return '<details class="wc-u">' +
    "<summary>" +
    '<span class="wc-utag" style="color:' + col[0] + ";background:" + col[1] + '">' + u.icon + " " + esc(u.tag || u.cat) + "</span>" +
    '<span class="wc-ut"><b>' + esc(u.num || u.id) + " — " + esc(u.title) + "</b>" +
    "<small>" + uDate(u.date) + " · " + esc(u.author || "") + "</small></span>" +
    '<span class="wc-ust" style="color:' + esc(u.statusColor || "#4ade80") + ";background:rgba(120,175,235,.08)">' + esc(u.status || "") + "</span>" +
    '<span class="wc-arrow">›</span></summary>' +
    '<div class="wc-ubody">' + body +
    (aff ? '<div class="wc-umeta"><span><b>Affected:</b> ' + esc(aff) + "</span></div>" : "") +
    '<div class="wc-umeta"><span><b>Author:</b> ' + esc(u.author || "") + "</span>" +
    "<span><b>Date:</b> " + uDate(u.date) + "</span></div>" +
    "</div></details>";
}

function renderUpdates() {
  var list = UPDATES.filter(function (u) {
    var okC = UPD_FILTER === "all" || u.cat === UPD_FILTER;
    var q = UPD_Q.trim().toLowerCase();
    var okQ = !q || (u.title + " " + (u.summary || "") + " " + (u.tags || []).join(" ")).toLowerCase().indexOf(q) > -1;
    return okC && okQ;
  });
  var chips = FILTERS.map(function (f) {
    return '<button data-f="' + esc(f.id) + '" class="' + (UPD_FILTER === f.id ? "on" : "") + '">' + esc(f.label) + "</button>";
  }).join("");
  var inner = "";
  if (!list.length) {
    inner = '<div class="wc-empty"><div class="ic">📭</div>No updates match your filter or search.</div>';
  } else {
    var order = ["TODAY", "YESTERDAY", "THIS WEEK", "OLDER"];
    order.forEach(function (bk) {
      var inBucket = list.filter(function (u) { return uBucket(u.date) === bk; });
      if (!inBucket.length) return;
      inner += '<div class="wc-ts">' + bk + "</div>" + inBucket.map(updateCard).join("");
    });
  }
  view.innerHTML =
    '<div class="container"><section class="section" style="padding-top:0">' +
    header("Updates", "Server ^News^", "Fixes, features, events and announcements — newest first.") +
    '<div class="wc-tools"><div class="wc-filters">' + chips + "</div>" +
    '<input class="wc-usearch" id="wcUSearch" placeholder="Search updates…" aria-label="Search updates"></div>' +
    '<div class="wc-tl">' + inner + "</div>" +
    "</section></div>";
  $$("#view .wc-filters button").forEach(function (b) {
    b.addEventListener("click", function () {
      UPD_FILTER = b.getAttribute("data-f");
      renderUpdates();
    });
  });
  var s = $("#wcUSearch");
  if (s) s.addEventListener("input", function () { UPD_Q = s.value; renderUpdates(); });
}

/* ============================================================
   HOME — compact "Latest Updates" section
   ============================================================ */
function renderHomeLatest() {
if (!$("#wcHomeLatest") && view && UPDATES.length) {
var top = UPDATES.slice(0, 3).map(function (u) {
var col = (CAT_COLORS[u.cat] || CAT_COLORS.announcement);
return '<a class="wc-hu" href="#/updates" style="animation:wcIn .5s ease both">' +
'<span class="ic">' + u.icon + '</span>' +
'<span><span style="color:' + col[0] + ';font-size:.66rem;font-weight:800;letter-spacing:1.2px">' + esc(u.tag) + '</span>' +
'<b>' + esc(u.title) + '</b><p>' + esc(u.summary || '') + '</p>' +
'<small>' + uDate(u.date) + ' - Read more</small></span></a>';
}).join('');
view.insertAdjacentHTML('beforeend',
'<div class="container" id="wcHomeLatest"><section class="section">' +
header('News', 'Latest ^Updates^', 'Fresh from the server.') +
'<div style="display:grid;gap:14px">' + top +
'<div style="text-align:center;margin-top:10px"><a class="btn btn-ghost" href="#/updates">VIEW ALL UPDATES -</a></div>' +
'</div></section></div>');
}
}


/* ============================================================
   ROUTING — runs last, so it wins on every navigation
   ============================================================ */
function renderOwned() {
  var s = segs();
  if (!s.length) return false;
  if (s[0] === "wiki") { renderWiki(s[1]); return true; }
  if (s[0] === "guides") { renderGuides(); return true; }
  if (s[0] === "leaderboards") { renderLeaderboards(); return true; }
  if (s[0] === "updates") { renderUpdates(); return true; }
  return false;
}
function onNav() {
  var s = segs();
  if (!s.length || s[0] === "home") renderHomeLatest();
  else renderOwned();
}
function boot() {
  window.addEventListener("hashchange", onNav);
  onNav(); /* initial paint — main.js & content.js already rendered first */
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();

})();

