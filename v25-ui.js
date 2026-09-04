/* ============================================================
WatterCraft V2.5 - UI Engine (Wiki, Guides, Leaderboards, Updates)
CLEAN BUILD v3 - paste Part 1, then Part 2, then Part 3.
============================================================ */
(function () {
"use strict";
var D = window.WCV;
if (!D) { console.warn("[WatterCraft] v25 data files missing"); return; }
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function esc(s) {
return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
});
}
var view = $("#view");
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
var CSS_A = [
"#wcToast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,16px);opacity:0;pointer-events:none;z-index:1200;background:rgba(13,27,51,.92);border:1px solid rgba(34,211,238,.4);color:#e9f0fb;padding:11px 20px;border-radius:12px;font-size:.9rem;box-shadow:0 14px 40px rgba(0,0,0,.5);transition:opacity .3s,transform .3s;}",
"#wcToast.show{opacity:1;transform:translate(-50%,0);}",
".wc-layout{display:grid;grid-template-columns:250px 1fr;gap:20px;align-items:start;margin-top:26px;}",
".wc-side{position:sticky;top:90px;padding:16px;max-height:calc(100vh - 110px);overflow:auto;border:1px solid rgba(120,175,235,.18);border-radius:14px;background:rgba(10,16,30,.6);}",
".wc-q{width:100%;background:rgba(4,10,20,.7);border:1px solid rgba(120,175,235,.25);color:#e9f0fb;border-radius:9px;padding:9px 12px;font-size:.88rem;margin-bottom:12px;outline:none;}",
".wc-grp{font-size:.66rem;letter-spacing:2px;text-transform:uppercase;color:#7c8aa5;margin:12px 4px 6px;font-weight:700;}",
".wc-link{display:flex;gap:9px;align-items:center;padding:7px 10px;border-radius:9px;color:#b7c2d4;font-size:.86rem;border:1px solid transparent;text-decoration:none;transition:background .2s,color .2s;}",
".wc-link:hover{color:#fff;background:rgba(34,211,238,.07);}",
".wc-link.on{color:#22d3ee;background:rgba(34,211,238,.12);}",
".wc-link .em{width:22px;text-align:center;}",
".wc-art{padding:26px;border:1px solid rgba(120,175,235,.18);border-radius:16px;background:rgba(10,16,30,.6);}",
".wc-art-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;}",
".wc-badge{padding:4px 11px;border-radius:30px;font-size:.66rem;font-weight:800;letter-spacing:1.4px;color:#fbbf24;border:1px solid rgba(251,191,36,.35);background:rgba(251,191,36,.08);}",
".wc-upd{font-size:.72rem;color:#7c8aa5;}",
".wc-ico{font-size:2.4rem;line-height:1;margin-top:14px;}",
".wc-title{font-size:1.45rem;margin:8px 0 4px;color:#fff;}",
".wc-desc{color:#22d3ee;font-size:.92rem;margin-bottom:10px;}",
".wc-body p{color:#b7c2d4;margin-bottom:12px;font-size:.96rem;}",
".wc-facts{margin-top:16px;border:1px solid rgba(120,175,235,.18);border-radius:12px;overflow:hidden;}",
".wc-fh{font-size:.68rem;letter-spacing:1.6px;text-transform:uppercase;color:#7c8aa5;font-weight:800;padding:12px 14px 6px;}",
".wc-frow{display:flex;justify-content:space-between;gap:14px;padding:8px 14px;border-top:1px solid rgba(120,175,235,.08);}",
".wc-frow b{color:#7c8aa5;font-weight:700;font-size:.72rem;text-transform:uppercase;}",
".wc-frow span{color:#e9f0fb;text-align:right;font-size:.9rem;}",
".wc-rellist{display:flex;flex-wrap:wrap;gap:8px;padding:4px 14px 14px;}",
".wc-rel{font-size:.82rem;color:#22d3ee;border:1px solid rgba(34,211,238,.3);padding:4px 10px;border-radius:20px;text-decoration:none;}",
".wc-nav{display:flex;justify-content:space-between;gap:12px;margin-top:22px;}",
".wc-navbtn{flex:1;padding:12px 14px;border:1px solid rgba(120,175,235,.2);border-radius:12px;text-decoration:none;background:rgba(10,16,30,.4);}",
".wc-navbtn small{display:block;color:#7c8aa5;font-size:.7rem;letter-spacing:1px;text-transform:uppercase;}",
".wc-navbtn b{font-size:.9rem;color:#e9f0fb;}",
".wc-master{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid rgba(251,191,36,.3);border-radius:14px;margin-top:22px;background:linear-gradient(135deg,rgba(251,191,36,.08),rgba(34,211,238,.05));}",
".wc-master span{font-size:1.6rem;}",
".wc-master b{color:#fbbf24;font-size:1rem;}",
".wc-master p{color:#b7c2d4;font-size:.84rem;}",
".wc-progress{display:flex;align-items:center;gap:12px;margin:14px 0 22px;font-size:.82rem;color:#b7c2d4;}",
".wc-bar{flex:1;height:8px;border-radius:20px;background:rgba(120,175,235,.14);overflow:hidden;}",
".wc-bar i{display:block;height:100%;border-radius:20px;background:linear-gradient(90deg,#22d3ee,#4ade80);transition:width .6s;}",
".wc-gridg{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px;}",
".wc-g{opacity:0;animation:wcIn .5s ease forwards;}",
".wc-gtop{display:flex;align-items:center;gap:12px;padding:16px 16px 10px;}",
".wc-gicon{font-size:1.8rem;line-height:1;}",
".wc-gname{font-weight:800;font-size:1.05rem;color:#e9f0fb;}",
".wc-grole{font-size:.76rem;color:#7c8aa5;letter-spacing:1px;text-transform:uppercase;}",
".wc-st{font-size:.62rem;font-weight:800;letter-spacing:1.2px;border:1px solid;border-radius:20px;padding:3px 9px;white-space:nowrap;margin-left:auto;}",
".wc-gdesc{padding:0 16px;color:#b7c2d4;font-size:.9rem;}",
".wc-teach{padding:8px 16px 4px;list-style:none;}",
".wc-teach li{color:#b7c2d4;font-size:.86rem;padding:3px 0 3px 20px;position:relative;}",
".wc-teach li:before{content:'\u2713';position:absolute;left:2px;color:#22d3ee;font-size:.8rem;}",
".wc-unlock{font-size:.78rem;color:#7c8aa5;padding:8px 16px 0;}",
".wc-gfoot{padding:12px 16px 16px;}",
".wc-cmp{font-size:.78rem;color:#4ade80;font-weight:700;}"
];
/* PART 1 END - now paste PART 2 directly below */
/* ============================================================
PART 2 - remaining styles + wiki + guides
============================================================ */
var CSS_B = [
".wc-lead{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid rgba(248,113,113,.35);border-radius:14px;margin:20px 0;color:#b7c2d4;font-size:.9rem;}",
".wc-lead span{font-size:1.5rem;}",
".wc-lead b{color:#f87171;}",
".wc-tabs{display:inline-flex;gap:6px;padding:5px;border:1px solid rgba(120,175,235,.2);border-radius:12px;margin:18px 0 4px;background:rgba(10,16,30,.6);}",
".wc-tabs button{padding:7px 16px;border-radius:8px;font-size:.78rem;font-weight:700;letter-spacing:1px;color:#7c8aa5;background:none;border:none;cursor:pointer;}",
".wc-tabs button.on{color:#22d3ee;background:rgba(34,211,238,.12);}",
".wc-lbgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:16px;}",
".wc-lbcard{padding:16px;border:1px solid rgba(120,175,235,.18);border-radius:14px;background:rgba(10,16,30,.6);}",
".wc-lbhead{display:flex;align-items:center;gap:10px;}",
".wc-lbhead .ic{font-size:1.4rem;}",
".wc-lbhead b{font-size:.95rem;color:#e9f0fb;}",
".wc-lbhead small{display:block;color:#7c8aa5;font-size:.72rem;letter-spacing:1px;text-transform:uppercase;}",
".wc-api{margin-left:auto;font-size:.6rem;font-weight:800;letter-spacing:1px;padding:4px 9px;border-radius:20px;color:#fbbf24;border:1px solid rgba(251,191,36,.35);background:rgba(251,191,36,.07);}",
".wc-lbempty{color:#7c8aa5;font-size:.84rem;margin-top:12px;line-height:1.5;}",
".wc-lbrow{display:grid;grid-template-columns:34px 1fr 90px;gap:10px;padding:9px 12px;border:1px dashed rgba(120,175,235,.16);border-radius:10px;margin-top:8px;color:#7c8aa5;font-size:.8rem;}",
".wc-tools{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:18px 0 6px;}",
".wc-filters{display:flex;gap:6px;flex-wrap:wrap;}",
".wc-filters button{padding:6px 12px;border-radius:20px;font-size:.74rem;font-weight:700;color:#b7c2d4;border:1px solid rgba(120,175,235,.2);background:none;cursor:pointer;}",
".wc-filters button.on{color:#22d3ee;border-color:rgba(34,211,238,.5);background:rgba(34,211,238,.1);}",
".wc-usearch{flex:1;min-width:180px;background:rgba(4,10,20,.7);border:1px solid rgba(120,175,235,.25);color:#e9f0fb;border-radius:9px;padding:9px 12px;font-size:.86rem;outline:none;}",
".wc-tl{position:relative;margin-top:22px;padding-left:26px;}",
".wc-tl:before{content:'';position:absolute;left:8px;top:4px;bottom:4px;width:2px;background:linear-gradient(180deg,#22d3ee,transparent);opacity:.4;}",
".wc-ts{position:relative;margin:22px 0 8px;font-size:.7rem;font-weight:800;letter-spacing:2px;color:#22d3ee;}",
".wc-u{background:rgba(10,16,30,.6);border:1px solid rgba(120,175,235,.18);border-radius:14px;margin:10px 0;overflow:hidden;}",
".wc-u summary{list-style:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;}",
".wc-u summary::-webkit-details-marker{display:none;}",
".wc-utag{font-size:.62rem;font-weight:800;letter-spacing:1.2px;padding:4px 9px;border-radius:20px;white-space:nowrap;}",
".wc-ut{flex:1;min-width:150px;}",
".wc-ut b{display:block;font-size:.95rem;color:#e9f0fb;}",
".wc-ut small{color:#7c8aa5;font-size:.76rem;}",
".wc-ust{font-size:.66rem;font-weight:800;padding:4px 10px;border-radius:20px;letter-spacing:1px;}",
".wc-arrow{color:#7c8aa5;transition:transform .2s;}",
".wc-u[open] .wc-arrow{transform:rotate(90deg);}",
".wc-ubody{padding:4px 16px 16px;border-top:1px solid rgba(120,175,235,.1);}",
".wc-ubody p{color:#b7c2d4;font-size:.9rem;margin-top:12px;}",
".wc-umeta{display:flex;gap:16px;flex-wrap:wrap;margin-top:12px;font-size:.76rem;color:#7c8aa5;}",
".wc-umeta b{color:#e9f0fb;font-weight:700;}",
".wc-empty{padding:34px 20px;text-align:center;color:#7c8aa5;border:1px dashed rgba(120,175,235,.2);border-radius:14px;margin-top:18px;}",
".wc-hu{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;border:1px solid rgba(120,175,235,.18);border-radius:14px;background:rgba(10,16,30,.6);text-decoration:none;transition:border-color .25s,transform .25s;}",
".wc-hu:hover{border-color:rgba(120,175,235,.4);transform:translateY(-2px);}",
".wc-hu .ic{font-size:1.5rem;line-height:1;}",
".wc-hu b{display:block;font-size:.96rem;color:#e9f0fb;}",
".wc-hu p{color:#7c8aa5;font-size:.84rem;margin-top:3px;}",
".wc-hu small{color:#22d3ee;font-size:.76rem;}",
"@keyframes wcIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}",
"@media(max-width:880px){.wc-layout{grid-template-columns:1fr}.wc-side{position:static;max-height:none}.wc-art{padding:18px}}",
"@media(max-width:720px){.wc-lbgrid{grid-template-columns:1fr}}"
];
if (!$("#wcv25css")) {
var st = document.createElement("style");
st.id = "wcv25css";
st.textContent = CSS_A.join("") + CSS_B.join("");
(document.head || document.documentElement).appendChild(st);
}
function toast(msg) {
var t = $("#wcToast");
if (!t) { t = document.createElement("div"); t.id = "wcToast"; document.body.appendChild(t); }
t.textContent = msg; t.className = "show";
clearTimeout(t._tm);
t._tm = setTimeout(function () { t.className = ""; }, 3400);
}
function segs() {
var h = (location.hash || "").replace(/^#\/?/, "");
return h ? h.split("/").map(decodeURIComponent) : [];
}
function header(k, t, sub) {
var tt = String(t).replace(/\^(.+?)\^/g, '<span class="grad">$1</span>');
return '<div class="section-head"><span class="kicker">' + esc(k) + '</span><h2 class="title">' + tt + '</h2>' + (sub ? '<p class="sub">' + esc(sub) + '</p>' : '') + '</div>';
}
function wikiSide(activeId) {
var groups = {};
WIKI.forEach(function (a) { (groups[a.cat] = groups[a.cat] || []).push(a); });
var cats = ["Basics", "Progression", "Skills", "Content", "Economy", "Community"];
var html = '<aside class="wc-side"><input class="wc-q" id="wcQ" placeholder="Search wiki..." aria-label="Search wiki">';
cats.forEach(function (c) {
if (!groups[c]) return;
html += '<div class="wc-grp">' + esc(c) + '</div>';
groups[c].forEach(function (a) {
html += '<a class="wc-link' + (a.id === activeId ? ' on' : '') + '" href="#/wiki/' + esc(a.id) + '"><span class="em">' + a.icon + '</span>' + esc(a.title) + '</a>';
});
});
return html + '</aside>';
}
function wikiArticle(id) {
var a = null;
WIKI.forEach(function (x) { if (x.id === id) a = x; });
if (!a) a = WIKI[0];
if (!a) return '<article class="wc-art"><h3 class="wc-title">Wiki content coming soon</h3></article>';
var idx = WIKI.indexOf(a);
var prev = WIKI[idx - 1], next = WIKI[idx + 1];
var facts = (a.facts || []).map(function (f) {
return '<div class="wc-frow"><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></div>';
}).join("");
var body = (a.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("");
var rel = (a.related || []).map(function (r) {
var t = "";
WIKI.forEach(function (x) { if (x.id === r) t = x.title; });
return t ? '<a class="wc-rel" href="#/wiki/' + esc(r) + '">' + esc(t) + '</a>' : "";
}).join("");
var nav = '<div class="wc-nav">' +
(prev ? '<a class="wc-navbtn" href="#/wiki/' + esc(prev.id) + '"><small>Prev</small><b>' + prev.icon + ' ' + esc(prev.title) + '</b></a>' : '<span></span>') +
(next ? '<a class="wc-navbtn" href="#/wiki/' + esc(next.id) + '"><small>Next</small><b>' + next.icon + ' ' + esc(next.title) + '</b></a>' : '') +
'</div>';
return '<article class="wc-art">' +
'<div class="wc-art-top"><span class="wc-badge">' + esc(a.cat) + '</span><span class="wc-upd">Updated ' + esc(D.updated || "Sep 2026") + '</span></div>' +
'<div class="wc-ico">' + a.icon + '</div>' +
'<h3 class="wc-title">' + esc(a.title) + '</h3>' +
'<p class="wc-desc">' + esc(a.desc) + '</p>' +
'<div class="wc-body">' + body + '</div>' +
(facts ? '<div class="wc-facts"><div class="wc-fh">Key Facts</div>' + facts + '</div>' : '') +
(rel ? '<div class="wc-facts" style="margin-top:12px"><div class="wc-fh">Related</div><div class="wc-rellist">' + rel + '</div></div>' : '') +
nav + '</article>';
}
function renderWiki(id) {
var active = id || (WIKI[0] && WIKI[0].id);
view.innerHTML = '<div class="container"><section class="section" style="padding-top:0">' +
header("Knowledge Base", "WatterCraft ^Wiki^", "Systems, items and knowledge - searchable and always growing.") +
'<div class="wc-layout">' + wikiSide(active) + wikiArticle(active) + '</div></section></div>';
var q = $("#wcQ");
if (q) q.addEventListener("input", function () {
var v = q.value.trim().toLowerCase();
$$("#view .wc-link").forEach(function (l) {
l.style.display = l.textContent.toLowerCase().indexOf(v) > -1 ? "" : "none";
});
});
}
/* PART 2 END - now paste PART 3 directly below */
/* ============================================================
PART 3 - guides + leaderboards + updates + home + boot
============================================================ */
function doneCount() {
var n = 0;
GUIDES.forEach(function (g) { if (ST.completed[g.id]) n++; });
return n;
}
function pctDone() {
return GUIDES.length ? Math.round((doneCount() / GUIDES.length) * 100) : 0;
}
function gStatus(g) {
if (ST.completed[g.id]) return { k: "done", l: "COMPLETED", c: "#4ade80" };
if (g.unlock && g.unlock.type === "open") return { k: "go", l: "AVAILABLE", c: "#22d3ee" };
if (g.unlock && g.unlock.type === "after") {
return ST.completed[g.unlock.id]
? { k: "go", l: "AVAILABLE", c: "#22d3ee" }
: { k: "lock", l: "LOCKED", c: "#6d7e99" };
}
return { k: "lock", l: "LOCKED", c: "#6d7e99" };
}
function guideCard(g, i) {
var sts = gStatus(g);
var teaches = (g.teaches || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
var req = (g.unlock && g.unlock.label && sts.k === "lock") ? '<div class="wc-unlock">Lock: ' + esc(g.unlock.label) + '</div>' : "";
var act = "";
if (sts.k === "done") {
act = '<span class="wc-cmp">Complete' + (g.reward ? ' + ' + g.reward.coins + ' Coins + ' + g.reward.xp + ' XP' : '') + '</span>';
} else if (sts.k === "go") {
act = '<button class="btn btn-primary btn-block" data-guide="' + esc(g.id) + '">' + (ST.inprogress[g.id] ? "Complete Guide" : "Start Guide") + '</button>';
} else {
act = '<button class="btn btn-ghost btn-block" disabled>Locked</button>';
}
return '<article class="glass wc-g card" style="animation-delay:' + (i * 0.035) + 's">' +
'<div class="wc-gtop" style="border-top:3px solid ' + sts.c + '">' +
'<span class="wc-gicon">' + g.icon + '</span>' +
'<div><div class="wc-gname">' + esc(g.name) + '</div><div class="wc-grole">' + esc(g.role) + '</div></div>' +
'<span class="wc-st" style="color:' + sts.c + ';border-color:' + sts.c + '">' + sts.l + '</span></div>' +
'<p class="wc-gdesc">' + esc(g.desc) + '</p>' +
(teaches ? '<ul class="wc-teach">' + teaches + '</ul>' : "") + req +
'<div class="wc-gfoot">' + act + '</div></article>';
}
function renderGuides() {
var m = FMETA.masterReward || {};
var mInfo = m.coins ? ('+' + m.coins + ' Coins, +' + m.xp + ' XP, ' + esc(m.tag || "")) : "";
view.innerHTML = '<div class="container"><section class="section" style="padding-top:0">' +
header("Hub Guides", "Meet the 20 ^Guides^", "Every NPC teaches one system. Finish all to earn the " + esc(FMETA.masterTitle || "WatterCraft Scholar") + " achievement.") +
'<div class="wc-master"><span>🏅</span><div><b>' + esc(FMETA.masterTitle || "WatterCraft Scholar") + '</b><p>' + mInfo + '</p></div><span class="wc-cmp" style="margin-left:auto">' + doneCount() + ' / 20</span></div>' +
'<div class="wc-progress"><div class="wc-bar"><i style="width:' + pctDone() + '%"></i></div><span>' + doneCount() + ' / ' + GUIDES.length + ' completed - saved on this device</span></div>' +
'<div class="wc-gridg">' + GUIDES.map(guideCard).join("") + '</div></section></div>';
$$("#view [data-guide]").forEach(function (b) {
b.addEventListener("click", function () {
var id = b.getAttribute("data-guide");
if (ST.completed[id]) return;
if (!ST.inprogress[id]) {
ST.inprogress[id] = true;
} else {
ST.completed[id] = true;
delete ST.inprogress[id];
if (!ST.rewarded) {
var all = true;
GUIDES.forEach(function (g) { if (!ST.completed[g.id]) all = false; });
if (all) { ST.rewarded = true; toast("GUIDE MASTER! " + (FMETA.masterTitle || "WatterCraft Scholar")); }
}
}
saveState();
renderGuides();
});
});
}
var LB_SECTIONS = [
{ icon: "⭐", name: "Watter Level", sub: "Top players" },
{ icon: "⛏️", name: "Mining", sub: "Skill leaderboard" },
{ icon: "🌾", name: "Farming", sub: "Skill leaderboard" },
{ icon: "⚔️", name: "Combat", sub: "Skill leaderboard" },
{ icon: "🪓", name: "Foraging", sub: "Skill leaderboard" },
{ icon: "🎣", name: "Fishing", sub: "Skill leaderboard" },
{ icon: "🔮", name: "Enchanting", sub: "Skill leaderboard" },
{ icon: "💰", name: "Richest Players", sub: "Coins and Gems" },
{ icon: "🧺", name: "Collections", sub: "Highest progress" },
{ icon: "📜", name: "Quests", sub: "Most completed" },
{ icon: "🏰", name: "Dungeons", sub: "Floor progress" },
{ icon: "👹", name: "Combat Kills", sub: "Mobs and bosses" },
{ icon: "🏆", name: "Achievements", sub: "Most earned" },
{ icon: "🤖", name: "Minions", sub: "Progression" }
];
function renderLeaderboards() {
var cards = LB_SECTIONS.map(function (lb, i) {
return '<article class="wc-lbcard" style="animation:wcIn .5s ease both;animation-delay:' + (i * 0.03) + 's">' +
'<div class="wc-lbhead"><span class="ic">' + lb.icon + '</span><div><b>' + esc(lb.name) + '</b><small>' + esc(lb.sub) + '</small></div><span class="wc-api">Awaiting API</span></div>' +
'<div class="wc-lbempty">No rankings shown - live data connects when the network API is live. Nothing here is fabricated.</div>' +
'<div class="wc-lbrow"><span>#</span><span>Player</span><span>Value</span></div></article>';
}).join("");
view.innerHTML = '<div class="container"><section class="section" style="padding-top:0">' +
header("Leaderboards", "Top of the ^World^", "Global network rankings across every system.") +
'<div class="wc-tabs"><button class="on" data-p="GLOBAL">GLOBAL</button><button data-p="WEEKLY">WEEKLY</button><button data-p="MONTHLY">MONTHLY</button></div>' +
'<div class="wc-lead"><span>📡</span><div><b>Live data unavailable</b><br>Rankings appear automatically once the network API is connected. Fake players are never shown.</div></div>' +
'<div class="wc-lbgrid">' + cards + '</div></section></div>';
$$("#view .wc-tabs button").forEach(function (b) {
b.addEventListener("click", function () {
$$("#view .wc-tabs button").forEach(function (x) { x.classList.remove("on"); });
b.classList.add("on");
});
});
}
var UPD_FILTER = "all";
var UPD_Q = "";
var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function uDate(d) {
var p = String(d).split("-");
return (+p[2] || "") + " " + MONTHS[(+p[1]) - 1] + " " + p[0];
}
function uBucket(d) {
var now = new Date();
now.setHours(0, 0, 0, 0);
var dt = new Date(d + "T00:00:00");
var diff = Math.round((now - dt) / 86400000);
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
var col = CAT_COLORS[u.cat] || CAT_COLORS.announcement;
var body = (u.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
var aff = (u.affected || []).join(", ");
return '<details class="wc-u"><summary>' +
'<span class="wc-utag" style="color:' + col[0] + ';background:' + col[1] + '">' + u.icon + ' ' + esc(u.tag || u.cat) + '</span>' +
'<span class="wc-ut"><b>' + esc(u.num || u.id) + ' - ' + esc(u.title) + '</b><small>' + uDate(u.date) + ' - ' + esc(u.author || "") + '</small></span>' +
'<span class="wc-ust" style="color:' + esc(u.statusColor || "#4ade80") + '">' + esc(u.status || "") + '</span>' +
'<span class="wc-arrow">›</span></summary>' +
'<div class="wc-ubody">' + body +
(aff ? '<div class="wc-umeta"><span><b>Affected:</b> ' + esc(aff) + '</span></div>' : "") +
'<div class="wc-umeta"><span><b>Author:</b> ' + esc(u.author || "") + '</span><span><b>Date:</b> ' + uDate(u.date) + '</span></div>' +
'</div></details>';
}
function renderUpdates() {
var list = UPDATES.filter(function (u) {
var okC = UPD_FILTER === "all" || u.cat === UPD_FILTER;
var q = UPD_Q.trim().toLowerCase();
var okQ = !q || (u.title + " " + (u.summary || "") + " " + (u.tags || []).join(" ")).toLowerCase().indexOf(q) > -1;
return okC && okQ;
});
var chips = FILTERS.map(function (f) {
return '<button data-f="' + esc(f.id) + '" class="' + (UPD_FILTER === f.id ? "on" : "") + '">' + esc(f.label) + '</button>';
}).join("");
var inner = "";
if (!list.length) {
inner = '<div class="wc-empty">No updates match your filter or search.</div>';
} else {
["TODAY", "YESTERDAY", "THIS WEEK", "OLDER"].forEach(function (bk) {
var inB = list.filter(function (u) { return uBucket(u.date) === bk; });
if (inB.length) inner += '<div class="wc-ts">' + bk + '</div>' + inB.map(updateCard).join("");
});
}
view.innerHTML = '<div class="container"><section class="section" style="padding-top:0">' +
header("Updates", "Server ^News^", "Fixes, features, events and announcements - newest first.") +
'<div class="wc-tools"><div class="wc-filters">' + chips + '</div><input class="wc-usearch" id="wcUSearch" placeholder="Search updates..." aria-label="Search updates"></div>' +
'<div class="wc-tl">' + inner + '</div></section></div>';
$$("#view .wc-filters button").forEach(function (b) {
b.addEventListener("click", function () { UPD_FILTER = b.getAttribute("data-f"); renderUpdates(); });
});
var s = $("#wcUSearch");
if (s) s.addEventListener("input", function () { UPD_Q = s.value; renderUpdates(); });
}
function renderHomeLatest() {
if (!$("#wcHomeLatest") && view && UPDATES.length) {
var top = UPDATES.slice(0, 3).map(function (u) {
var col = CAT_COLORS[u.cat] || CAT_COLORS.announcement;
return '<a class="wc-hu" href="#/updates"><span class="ic">' + u.icon + '</span><span>' +
'<span style="color:' + col[0] + ';font-size:.66rem;font-weight:800;letter-spacing:1.2px">' + esc(u.tag) + '</span>' +
'<b>' + esc(u.title) + '</b><p>' + esc(u.summary || "") + '</p>' +
'<small>' + uDate(u.date) + ' - Read more</small></span></a>';
}).join("");
view.insertAdjacentHTML("beforeend",
'<div class="container" id="wcHomeLatest"><section class="section">' +
header("News", "Latest ^Updates^", "Fresh from the server.") +
'<div style="display:grid;gap:14px">' + top +
'<div style="text-align:center;margin-top:10px"><a class="btn btn-ghost" href="#/updates">VIEW ALL UPDATES</a></div>' +
'</div></section></div>');
}
}
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
onNav();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
})();
