/**
 * WatterCraft V2 — Content Expansion Pack (UI)
 * Renders Wiki, Guides, Leaderboards, Bazaar, Auction, Dungeons
 * from window.WCX (content-data.js). Load AFTER main.js.
 * Self-injects its styles — style.css stays untouched.
 */
(function () {
"use strict";
var X = window.WCX;
if (!X) { console.error("[WatterCraft] content-data.js missing — load it before content.js"); return; }
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) {
return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
});
};
/* ---------------- inject styles (once) ---------------- */
if (!$("#cxStyle")) {
var st = document.createElement("style");
st.id = "cxStyle";
st.textContent = [
".cx-layout{display:grid;grid-template-columns:250px 1fr;gap:22px;align-items:start}",
".cx-side{position:sticky;top:calc(var(--nav-h) + 22px);padding:16px;max-height:calc(100vh - var(--nav-h) - 44px);overflow:auto}",
".cx-side h4{font-size:.7rem;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin:4px 6px 10px}",
".cx-link{display:flex;gap:10px;align-items:center;padding:8px 11px;border-radius:10px;color:var(--text-2);font-size:.88rem;border:1px solid transparent;transition:background .2s,color .2s}",
".cx-link:hover{color:var(--text);background:rgba(34,211,238,.06)}",
".cx-link.on{color:var(--cyan);background:rgba(34,211,238,.1);border-color:var(--line)}",
".cx-link .em{font-size:1.05rem;width:22px;text-align:center;flex-shrink:0}",
".cx-article{padding:28px}",
".cx-ico{font-size:2.4rem;line-height:1}",
".cx-title{font-size:clamp(1.3rem,3vw,1.7rem);margin:14px 0 6px;letter-spacing:.4px}",
".cx-sub{color:var(--text-2);font-size:.98rem}",
".cx-badge{display:inline-flex;align-items:center;gap:6px;font-size:.66rem;font-weight:800;letter-spacing:1.2px;padding:5px 11px;border-radius:30px;border:1px solid rgba(251,191,36,.35);color:#fbbf24;background:rgba(251,191,36,.07)}",
".cx-badge.green{border-color:rgba(74,222,128,.35);color:#4ade80;background:rgba(74,222,128,.07)}",
".cx-fields{display:grid;gap:10px;margin-top:22px}",
".cx-row{display:flex;gap:14px;justify-content:space-between;align-items:baseline;padding:11px 14px;border:1px solid var(--line);border-radius:10px;background:rgba(8,16,32,.5)}",
".cx-row b{color:var(--muted);font-weight:700;font-size:.72rem;letter-spacing:1px;text-transform:uppercase;flex-shrink:0}",
".cx-row span{color:var(--text-2);text-align:right;font-size:.9rem}",
".cx-soon{color:var(--amber)}",
".cx-prevnext{display:flex;gap:12px;margin-top:26px}",
".cx-prevnext a{flex:1}",
".cx-grid-guides{display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:16px}",
".cx-guide{padding:20px;display:flex;flex-direction:column;gap:7px;transition:transform .3s,border-color .3s;cursor:pointer}",
".cx-guide:hover{transform:translateY(-4px);border-color:var(--line-2)}",
".cx-guide .em{font-size:1.9rem}",
".cx-guide h3{font-size:1.02rem}",
".cx-guide .role{color:var(--muted);font-size:.82rem}",
".cx-guide .teach{color:var(--text-2);font-size:.88rem;flex:1}",
".cx-guide .meta{display:flex;gap:8px;flex-wrap:wrap;font-size:.7rem;font-weight:700;color:var(--muted);letter-spacing:.5px;margin-top:6px}",
".cx-search{width:100%;max-width:420px;margin:0 auto 26px;display:block}",
".cx-tabs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:16px}",
".cx-tab{padding:8px 17px;border-radius:30px;border:1px solid var(--line);background:var(--surface);color:var(--text-2);font-weight:700;font-size:.84rem;transition:all .2s}",
".cx-tab:hover{color:var(--text);border-color:var(--line-2)}",
".cx-tab.on{color:var(--cyan);border-color:var(--cyan);background:rgba(34,211,238,.1)}",
".cx-chip{padding:7px 14px;border-radius:30px;border:1px solid transparent;background:transparent;color:var(--text-2);font-weight:700;font-size:.8rem;transition:all .2s}",
".cx-chip:hover{color:var(--text)}",
".cx-chip.on{color:var(--cyan);border-color:var(--line-2);background:rgba(34,211,238,.08)}",
".cx-lb{display:grid;gap:8px;max-width:740px;margin:18px auto 0}",
".cx-lbrow{display:flex;align-items:center;gap:14px;padding:12px 16px;border:1px solid var(--line);border-radius:12px;background:rgba(8,16,32,.55)}",
".cx-rank{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-family:var(--font-display);font-weight:900;flex-shrink:0;background:var(--bg-3);border:1px solid var(--line-2);color:var(--text-2)}",
".cx-rank.r1{color:#fbbf24;border-color:rgba(251,191,36,.6);box-shadow:0 0 14px rgba(251,191,36,.35)}",
".cx-rank.r2{color:#cbd5e1;border-color:rgba(203,213,225,.45)}",
".cx-rank.r3{color:#fb923c;border-color:rgba(251,146,60,.5)}",
".cx-lbrow .nm{font-weight:700;font-size:.95rem}",
".cx-lbrow .sc{margin-left:auto;color:var(--text-2);font-weight:700;font-family:var(--font-display)}",
".cx-demo{display:flex;justify-content:center;margin-bottom:8px}",
".cx-quick{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:22px 0 8px}",
".cx-quick a{display:inline-flex;gap:8px;align-items:center;padding:9px 16px;border-radius:30px;border:1px solid var(--line);background:var(--surface);font-weight:700;font-size:.86rem;color:var(--text-2);transition:all .2s}",
".cx-quick a:hover{color:var(--cyan);border-color:var(--line-2);transform:translateY(-2px)}",
".cx-detail-head{display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap}",
".cx-avatar{width:74px;height:74px;border-radius:18px;display:grid;place-items:center;font-size:2.4rem;background:rgba(34,211,238,.08);border:1px solid var(--line-2);flex-shrink:0;box-shadow:0 0 24px rgba(34,211,238,.12)}",
"@media (max-width:900px){.cx-layout{grid-template-columns:1fr}.cx-side{position:static;max-height:none}}",
"@media (max-width:560px){.cx-lbrow{gap:10px}.cx-article{padding:20px}}"
].join("\n");
document.head.appendChild(st);
}
/* ---------------- shared header ---------------- */
function headHtml(kicker, title, sub) {
var t = esc(title).replace(/\^(.+?)\^/g, '<span class="grad">$1</span>');
return '<div class="section-head" style="margin-bottom:34px">' + (kicker ? '<span class="kicker">' + esc(kicker) + "</span>" : "") + '<h2 class="title">' + t + "</h2>" + (sub ? '<p class="sub">' + esc(sub) + "</p>" : "") + "</div>";
}
function setTitle(t) { document.title = t; }
/* ---------------- WIKI ---------------- */
function pageWiki() {
var list = X.wiki || [];
var part = (location.hash || "").split("/")[1] || (list[0] ? list[0].id : "");
var cur = null, i;
for (i = 0; i < list.length; i++) if (list[i].id === part) { cur = list[i]; break; }
if (!cur) cur = list[0];
var side = '<div class="glass cx-side"><h4>📚 Wiki Index</h4>' + list.map(function (a) {
return '<a class="cx-link' + (a.id === cur.id ? " on" : "") + '" href="#/wiki/' + esc(a.id) + '"><span class="em">' + esc(a.icon) + "</span>" + esc(a.title) + "</a>";
}).join("") + "</div>";
var fields = (cur.fields || []).map(function (f) {
return '<div class="cx-row"><b>' + esc(f[0]) + "</b><span" + (String(f[1]).indexOf("COMING SOON") !== -1 ? ' class="cx-soon"' : "") + ">" + esc(f[1]) + "</span></div>";
}).join("");
var idx = list.indexOf(cur);
var prev = idx > 0 ? list[idx - 1] : null;
var next = idx < list.length - 1 ? list[idx + 1] : null;
var pn = '<div class="cx-prevnext">' + (prev ? '<a class="btn btn-ghost btn-sm" href="#/wiki/' + esc(prev.id) + '">← ' + esc(prev.icon) + " " + esc(prev.title) + "</a>" : '<span style="flex:1"></span>') + (next ? '<a class="btn btn-primary btn-sm" href="#/wiki/' + esc(next.id) + '">' + esc(next.icon) + " " + esc(next.title) + " →</a>" : "") + "</div>";
setTitle(esc(cur.title) + " · Wiki · WatterCraft");
return '<div class="container"><section class="section" style="padding-top:0">' + headHtml("Wiki", "The WatterCraft ^Encyclopedia^", "Guides, systems and databases — everything about the network in one place.") +
'<div class="cx-layout">' + side +
'<article class="glass cx-article">' +
'<div class="cx-ico">' + esc(cur.icon) + '</div>' +
'<h2 class="cx-title">' + esc(cur.title) + "</h2>" +
'<p class="cx-sub">' + esc(cur.text) + "</p>" +
'<div class="cx-fields">' + fields + "</div>" +
pn + "</article></div></section></div>";
}
/* ---------------- GUIDES ---------------- */
function pageGuides() {
var list = X.guides || [];
var part = (location.hash || "").split("/")[1] || "";
var cur = null;
for (var i = 0; i < list.length; i++) if (list[i].id === part) { cur = list[i]; break; }
if (cur) {
setTitle("Guide · " + esc(cur.npc) + " · WatterCraft");
return '<div class="container"><section class="section" style="padding-top:0">' + headHtml("Guides", cur.icon + " " + esc(cur.npc) + " — ^" + esc(cur.title) + "^", "") +
'<div class="glass cx-article">' +
'<a class="btn btn-ghost btn-sm" href="#/guides" style="margin-bottom:20px">← All Guides</a>' +
'<div class="cx-detail-head"><div class="cx-avatar">' + esc(cur.icon) + '</div><div style="flex:1;min-width:220px"><h2 class="cx-title" style="margin:2px 0 4px">' + esc(cur.npc) + "</h2><p class=\"cx-sub\">" + esc(cur.title) + '</p><p class="role" style="color:var(--muted);font-size:.9rem;margin-top:4px">' + esc(cur.role) + "</p></div></div>" +
'<div class="cx-fields">' +
'<div class="cx-row"><b>Role</b><span>' + esc(cur.role) + "</span></div>" +
'<div class="cx-row"><b>Teaches</b><span>' + esc(cur.teaches) + "</span></div>" +
'<div class="cx-row"><b>Unlock</b><span class="cx-soon">' + esc(cur.unlock) + "</span></div>" +
'<div class="cx-row"><b>Reward</b><span class="cx-soon">' + esc(cur.reward) + "</span></div>" +
"</div></div></section></div>";
}
var grid = list.map(function (g) {
return '<a class="glass cx-guide card" href="#/guides/' + esc(g.id) + '"><span class="em">' + esc(g.icon) + '</span><h3>' + esc(g.npc) + "</h3><div class=\"role\">" + esc(g.title) + '</div><p class="teach">' + esc(g.teaches) + '</p><div class="meta"><span>🔓 ' + esc(g.unlock) + "</span><span>🎁 " + esc(g.reward) + "</span></div></a>";
}).join("");
setTitle("Guides · WatterCraft");
return '<div class="container"><section class="section" style="padding-top:0">' + headHtml("Guides", "Learn from the ^NPCs^", "20 community guides — from your first island to dungeon floors.") +
'<input class="field cx-search" id="cxGuideSearch" placeholder="🔎 Search a guide (Elias, Marcus, Bazaar Babu…)" />' +
'<div class="cx-grid-guides" id="cxGuideGrid">' + grid + "</div></section></div>";
}
/* ---------------- LEADERBOARDS ---------------- */
function pageLeaderboards() {
var LB = X.leaderboards || {};
var cats = LB.categories || [];
var periods = LB.periods || ["Global"];
var rows = LB.demoRows || [];
var table = rows.map(function (r) {
var rc = r.rank === 1 ? " r1" : r.rank === 2 ? " r2" : r.rank === 3 ? " r3" : "";
var medal = r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : esc(r.rank);
return '<div class="cx-lbrow"><span class="cx-rank' + rc + '">' + medal + '</span><span class="nm">' + esc(r.name) + '</span><span class="sc">' + esc(r.score) + "</span></div>";
}).join("");
setTitle("Leaderboards · WatterCraft");
return '<div class="container"><section class="section" style="padding-top:0">' + headHtml("Leaderboards", "Top of the ^Leaderboards^", LB.note || "") +
'<div class="cx-demo"><span class="cx-badge">⚠ DEMO DATA — live API COMING SOON</span></div>' +
'<div class="cx-tabs" id="cxPeriods">' + periods.map(function (p, i) { return '<button type="button" class="cx-tab' + (i === 0 ? " on" : "") + '">' + esc(p) + "</button>"; }).join("") + "</div>" +
'<div class="cx-tabs" id="cxCats">' + cats.map(function (c, i) { return '<button type="button" class="cx-chip' + (i === 0 ? " on" : "") + '" data-c="' + esc(c.id) + '"><span class="em">' + esc(c.icon) + "</span> " + esc(c.label) + "</button>"; }).join("") + "</div>" +
'<div class="cx-lb" id="cxLB">' + table + "</div></section></div>";
}
/* ---------------- route override (runs after main.js render) ---------------- */
var OWN = { wiki: pageWiki, guides: pageGuides, leaderboards: pageLeaderboards };
function cxKey() {
var h = (location.hash || "").replace(/^#\/?/, "").split("/")[0] || "home";
return OWN[h] ? h : null;
}
function cxRender() {
var k = cxKey();
if (!k) return;
var v = $("#view");
if (!v) return;
v.innerHTML = OWN[k]();
cxBind();
}
function cxBind() {
var s = $("#cxGuideSearch"), g = $("#cxGuideGrid");
if (s && g) s.addEventListener("input", function () {
var q = s.value.trim().toLowerCase();
$$(".cx-guide", g).forEach(function (c) { c.style.display = (!q || c.textContent.toLowerCase().indexOf(q) !== -1) ? "" : "none"; });
});
$$("#cxPeriods .cx-tab").forEach(function (b) { b.addEventListener("click", function () { $$("#cxPeriods .cx-tab").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); }); });
$$("#cxCats .cx-chip").forEach(function (b) { b.addEventListener("click", function () { $$("#cxCats .cx-chip").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); }); });
}
function cxBoot() {
  window.addEventListener("hashchange", cxRender);
  if (cxKey()) cxRender();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", cxBoot);
else cxBoot();
