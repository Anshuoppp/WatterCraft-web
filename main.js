/**
* WatterCraft V2 — Site Engine
* Hash router · pixel icons · live status · store checkout · search · staff application
* Content comes from data.js. No fabricated live data.
*/
(function () {
"use strict";
var CFG = window.WC;
if (!CFG) { console.error("[WatterCraft] data.js missing."); return; }
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) {
return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
});
};
var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/* ---------------- Pixel icon engine ---------------- */
var PAL = { ".": "", W: "#e8eef8", S: "#94a3b8", D: "#0f172a", K: "#1e293b", C: "#22d3ee", B: "#3b82f6", E: "#38bdf8", G: "#4ade80", Y: "#fbbf24", A: "#f59e0b", O: "#fb923c", R: "#f87171", V: "#a78bfa", P: "#e879f9" };
function px(rows) {
var out = '<svg class="icon" viewBox="0 0 ' + (rows[0] ? rows[0].length : 12) + " " + rows.length + '" shape-rendering="crispEdges" aria-hidden="true">';
for (var y = 0; y < rows.length; y++) {
var line = rows[y];
for (var x = 0; x < line.length; x++) { var c = PAL[line[x]]; if (c) out += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + c + '"/>'; }
}
return out + "</svg>";
}
function vicon(b) { return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + b + "</svg>"; }
var M = {
block: ["KKKKKKKKKKKK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KKKKKKKKKKKK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KKKKKKKKKKKK"],
home: [".....CC.....","....CCCC....","...CCCCCC...","..CCCCCCCC..",".CCCCCCCCCC.","CCCCCCCCCCCC","KKKKKKKKKKKK","KSDDDDDDDDSK","KSDDDDDDDDSK","KSDDDDDDDDSK","KKKKKKKKKKKK"],
map: ["..KKKKKKKK..",".KSSSSSSSSK.","KSSSSSSSSSSK","KSSSCSSSCSSK","KSKKKKKKKKSK","KSSSSSSSSSSK","KSKKKKKKKKSK","KSSSSSSSSSSK","KSSCSSSCSSSK",".KKKKKKKKKK."],
book: ["..KKKKKKKK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KKKKKKKK.."],
crown: ["..C....C....","..CC..CC....","..CCC.CCC...","CCCCCCCCCCCC","YYYYYYYYYYYY","YWWWWWWWWWWY","KKKKKKKKKKKK"],
bell: ["....YYYY....","...YWWWWY...","..YWWWWWWY..","..YWWWWWWY..","..YWWWWWWY..","..YWWWWWWY..","..YWWWWWWY..","..YYYYYYYY..","..SSSSSSSS.."],
chest: ["KKKKKKKKKKKK","KYYYYYYYYYYK","KYYYYYYYYYYK","KYYYYYYYYYYK","KYYKYYYYKYYK","KYYKYYYYKYYK","KYYKYYYYKYYK","KYYKYYYYKYYK","KKKKKKKKKKKK"],
star: [".....YY.....","....YYYY....","....YYYY....","YYYYYYYYYYYY","..YYYYYYYY..","...YYYYYY...","..YYYYYYYY..",".YYY.YYYY.YY"],
person: [".....DD.....","....DWWWD...","...DWWWWWD..","...DWWWWWD..","....DWWWD...",".....DD.....","...DDDDDD...","..DWWWWWWDD.",".DWWWWWWWWWD",".DWWWWWWWWWD",".DDDDDDDDDDD"],
sword: [".......WW...","......SWW...",".....SWW....","....SWW.....","...SWW......","..SWW.......",".SWW........",".YWW........","..YW........","...YY.......","....Y......."],
pick: ["WW.........","SWW........","SWW........","SWW........","SSWWWWWWW..","..SSSSSSSSS"],
shield: ["..KKKKKKKK..",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWSWWWWWK.",".KWWWWWWWWK.","..KKKKKKKK.."],
gem: [".....CC.....","....CWWC....","...CWWWWC...","..CWWWWWWC..",".CWWWWWWWWC.","CWWWWWWWWC",".CWWWWWWWWC.","..CWWWWWWC..","...CWWWWC...","....CWWC....",".....CC....."],
coin: ["....YYYY....","...YWWWWY...","..YWWWWWWY..",".YWWWWWWWWY.",".YWWKWWKWWY.",".YWWWWWWWWY.",".YWWKWWKWWY.",".YWWWWWWWWY.","..YWWWWWWY..","...YWWWWY...","....YYYY...."],
skull: ["....SSSS....","..SSWWWWSS..",".SWWKKWWKWS.",".SWWKKWWKWS.",".SWWWWWWWWWS","..SSSSSSSS..","..SKSKKSKS..","..SKSSSSKS..","...SSSSSS..."],
paw: ["G....G...G..","GG..GGG.GG..",".GGGGGGGGG..","..GGGGGGG...","...GGGGG...."],
gear: ["....SSSS....","..SSWWWWSS..",".SWWWWWWWWS.","SWWWSSSSWWWS","SWWSWWWWSWWS","SWWSWSSWSWWS","SWWSWSSWSWWS","SWWSWWWWSWWS","SWWWSSSSWWWS",".SWWWWWWWWS.","..SSWWWWSS..","....SSSS...."],
xp: ["..YYYYYYYY..","..YWWWWWWY..","..YWWWWWWY..","..YYYYYYYY..","..GGGGGGGG..","..GWWWWWWG..","..GWWWWWWG..","..GGGGGGGG.."],
grass: ["GGGGGGGGGGGG","GYGGGGGYGGGG","GGGGGGGGGGGG","KKKKKKKKKKKK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KKKKKKKKKKKK"],
wheat: ["..Y...Y.....","..YY..YY....","..YY..YY....","...GGGG.....","...GGGG.....","..G.OG.G....","..G..G.G....","...G.G......"],
tree: ["....GGGG....","...GGGGGG...","...GGGGGG...","..GGGGGGGG..","..GGGGGGGG..","...GGGGGG...","....GGGG....","....BBBB....","....BBBB....","....BBBB...."],
portal: ["KKKKKKKKKKKK","KPPKPPPKKPPK","KPPKPKPKKPPK","KPPKKPPKPKPK","KPKPKPPKKPPK","KPPKKPKPKKPK","KKKKKKKKKKKK"],
eye: [".....RR.....","...RRRRRR...",".RWRRRRRRWR.",".RRRRRYYRRRR",".RRRRYYYYRRR",".RWRRRRRRWR.","..RWWRRRWWR.","...RRRRRR...",".....RR....."],
bug: ["....SSSS....","...SWWWWS...","..SWWWWWWS..","SSSSSSSSSSSS","SWWSWWWWSWWS","SSSSSSSSSSSS","SWWSWWWWSWWS","SSSSSSSSSSSS","..SWWWWWWS..","...SSSSSS...","..SS....SS..","..S......S.."]
};
M.island = M.grass; M.compass = M.star; M.help = M.book; M.gavel = M.chest; M.emerald = M.gem;
var V = {
search: vicon('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
copy: vicon('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
check: vicon('<path d="M20 6L9 17l-5-5"/>'),
close: vicon('<path d="M18 6L6 18M6 6l12 12"/>'),
play: vicon('<polygon points="6 3 22 12 6 21 6 3"/>'),
plus: vicon('<path d="M12 5v14M5 12h14"/>'),
ext: vicon('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/>'),
discord: vicon('<path d="M18 9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h1.5l2 2.5L10 21h4a4 4 0 0 0 4-4z"/>')
};
function icon(name) { return (M[name] && px(M[name])) || (V[name] && V[name]) || px(M.block); }
/* ---------------- helpers ---------------- */
var toastEl = $("#toast"), toastTimer = null;
function toast(msg, isErr) {
if (!toastEl) return;
toastEl.textContent = msg; toastEl.className = "toast show" + (isErr ? " err" : "");
clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.className = "toast"; }, 3200);
}
function copyText(txt, msg) {
function done() { toast(msg || "Copied!"); }
if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(done, function () { fb(txt); done(); }); }
else { fb(txt); done(); }
}
function fb(txt) {
var ta = document.createElement("textarea"); ta.value = txt; ta.style.cssText = "position:fixed;opacity:0;";
document.body.appendChild(ta); ta.select();
try { document.execCommand("copy"); } catch (e) {}
document.body.removeChild(ta);
}
window.copyIP = function () {
var S = CFG.server || {};
copyText((S.ip || "play.wattercraft.fun") + ":" + (S.port || 19132), "Server IP copied!");
};
function head(kicker, title, sub) {
var t = esc(title).replace(/\^(.+?)\^/g, '<span class="grad">$1</span>');
return '<div class="section-head" data-reveal>' + (kicker ? '<span class="kicker">' + esc(kicker) + "</span>" : "") + '<h2 class="title">' + t + "</h2>" + (sub ? '<p class="sub">' + esc(sub) + "</p>" : "") + "</div>";
}
function openModal(id) { var m = $("#" + id); if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; } }
function closeModal(id) { var m = $("#" + id); if (m) { m.classList.remove("open"); document.body.style.overflow = ""; } }
function closeAll() { $$(".modal.open").forEach(function (m) { m.classList.remove("open"); }); document.body.style.overflow = ""; }
/* ---------------- nav / footer ---------------- */
var NAV = CFG.nav || [];
function buildNav() {
var host = $("#navLinks"), draw = $("#drawerLinks");
if (!host) return;
host.innerHTML = NAV.map(function (n) { return '<a href="#/' + n.id + '" data-nav="' + n.id + '"' + (n.cta ? ' class="nav-cta"' : "") + ">" + icon(n.icon) + '<span class="lbl">' + esc(n.label) + "</span></a>"; }).join("");
if (draw) { draw.innerHTML = NAV.map(function (n) { return '<a href="#/' + n.id + '" data-nav="' + n.id + '">' + icon(n.icon) + esc(n.label) + "</a>"; }).join(""); }
}
function setNav(id) { $$("#navLinks a, #drawerLinks a").forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-nav") === id); }); }
function buildFooter() {
var F = CFG.footer || {}, box = $("#footerBox"), note = $("#footNote");
if (!box) return;
box.innerHTML = '<div class="foot-brand"><a class="logo" href="#/home"><span class="logo-mark">W</span><span class="logo-name">Watter<em>Craft</em></span></a><p class="foot-tag">' + esc((CFG.meta || {}).slogan || "") + '</p><p class="muted" style="font-size:.9rem">' + esc((CFG.meta || {}).description || "") + '</p></div><nav class="foot-links" aria-label="Footer">' + ((F.links || []).map(function (l) { return '<a href="' + esc(l.href) + '">' + esc(l.label) + "</a>"; }).join("")) + "</nav>";
if (note) note.textContent = (F.note || "") + " · play.wattercraft.fun:19132";
}
/* ---------------- live status ---------------- */
var pill = $("#serverStatus");
function setPill(state, txt) {
if (!pill) return;
pill.className = "status-pill " + state;
pill.innerHTML = '<span class="status-dot"></span><span class="txt">' + esc(txt) + "</span>";
}
function fetchStatus() {
if (!pill) return;
var S = CFG.server || {}, host = S.statusHost;
if (!host) { setPill("", "Unavailable"); return; }
var url = "https://api.mcsrvstat.us/bedrock/2/" + encodeURIComponent(host + ":" + (S.port || 19132));
var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
var opt = { method: "GET" }; if (ctrl) { opt.signal = ctrl.signal; setTimeout(function () { ctrl.abort(); }, 9000); }
fetch(url, opt).then(function (r) { return r.json(); }).then(function (d) {
if (d && d.online) {
var p = d.players && d.players.online != null ? d.players.online + " online" : "Online";
var ver = d.version && d.version.length ? d.version[0] : "";
setPill("online", p + (ver ? " · " + ver : ""));
} else setPill("offline", "Offline");
}).catch(function () { setPill("offline", "Unavailable"); });
}
/* ---------------- search ---------------- */
var SIDX = [];
function buildIndex() {
SIDX = [];
NAV.forEach(function (n) { SIDX.push({ t: n.label, s: "Page", h: "#/" + n.id, ic: n.icon }); });
(CFG.features || []).forEach(function (f) { SIDX.push({ t: f.title, s: "Feature", h: "#/home", ic: f.icon }); });
(CFG.worldAreas || []).forEach(function (w) { SIDX.push({ t: w.name, s: "World", h: "#/world", ic: w.icon }); });
((CFG.store || {}).categories || []).forEach(function (c) { (c.items || []).forEach(function (it) { SIDX.push({ t: it.name, s: "Store", h: "#/store", ic: c.icon }); }); });
((CFG.staff || {}).members || []).forEach(function (m) { SIDX.push({ t: m.name, s: "Staff", h: "#/staff", ic: "person" }); });
(CFG.rules || []).forEach(function (r) { SIDX.push({ t: r.title, s: "Rule", h: "#/rules", ic: r.icon }); });
}
function runSearch(q) {
q = q.trim().toLowerCase();
if (!q) return "";
var res = SIDX.filter(function (i) { return (i.t + " " + i.s).toLowerCase().indexOf(q) !== -1; }).slice(0, 9);
if (!res.length) return '<p class="muted center mt-2">No results</p>';
return res.map(function (i) { return '<a class="search-item" href="' + i.h + '">' + icon(i.ic) + "<span><span class=\\\"si-title\\\">" + esc(i.t) + '</span><span class="si-sub"> · ' + esc(i.s) + "</span></span></a>"; }).join("");
}
/* ---------------- pages ---------------- */
var view = $("#view");
function pageHome() {
var H = CFG.hero || {}, S = CFG.server || {}, META = CFG.meta || {};
var title = H.title && H.title.length ? H.title.map(function (t, i) { return '<span class="' + (i ? "l2" : "l1") + '">' + esc(t) + "</span>"; }).join("") : esc(META.name || "WatterCraft");
return '<section class="hero">' +
'<div class="hero-bg" data-bg="' + esc(H.background || "") + '"></div><div class="hero-veil"></div>' +
'<div class="hero-inner">' +
'<span class="hero-kicker">' + esc(H.kicker || "MINECRAFT BEDROCK · SKYBLOCK") + "</span>" +
'<h1 class="hero-title">' + title + "</h1>" +
'<p class="hero-tagline">' + esc(H.tagline || "BUILD. PROGRESS. CONQUER.") + "</p>" +
(H.sub ? '<p class="hero-sub">' + esc(H.sub) + "</p>" : "") +
'<div class="hero-actions"><button class="btn btn-primary" onclick="copyIP()">' + V.play + " " + esc((H.primary || {}).label || "PLAY NOW") + '</button><a class="btn btn-discord" href="#/discord">' + V.discord + " " + esc((H.secondary || {}).label || "JOIN DISCORD") + "</a></div>" +
'<div class="server-panel" data-reveal>' +
'<div class="cell"><div class="k">Server IP</div><div class="v"><span class="copy-ip" onclick="copyIP()">' + esc(S.ip || "play.wattercraft.fun") + V.copy + "</span></div></div>" +
'<div class="cell"><div class="k">Port</div><div class="v mono">' + esc(S.port || 19132) + "</div></div>" +
'<div class="cell"><div class="k">Platform</div><div class="v">' + esc(S.platform || "Bedrock Edition") + "</div></div>" +
'<div class="cell"><div class="k">Players</div><div class="v" id="livePlayers">Checking…</div></div>' +
"</div></div></section>" +
'<div class="container"><section class="section">' +
head("The Network", "One Server. ^Endless Systems.^", "Everything connects: islands, skills, collections, pets, minions and a full player economy.") +
'<div class="grid-features">' + (CFG.features || []).map(function (f) {
return '<article class="glass liquid shine feature-card card" data-reveal><div class="feature-icon">' + icon(f.icon) + "</div><h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p><span class=\\\"watermark\\\" style=\\\"color:var(--cyan)\\\">" + icon(f.icon) + "</span></article>";
}).join("") + "</div></section></div>";
}
function pageWorld() {
var areas = CFG.worldAreas || [];
var path = areas.map(function (a, i) { return '<div class="path-node">' + icon(a.icon) + esc(a.name) + "</div>" + (i < areas.length - 1 ? '<span class="path-arrow">›</span>' : ""); }).join("");
var cards = areas.map(function (a) {
var locked = a.unlock && a.unlock !== "Open";
return '<article class="glass area-card card" data-reveal><div class="area-head">' + icon(a.icon) + "<h3>" + esc(a.name) + '</h3><span class="area-tag' + (locked ? " locked" : "") + '">' + esc(a.unlock === "Open" ? "OPEN" : a.unlock) + "</span></div><p>" + esc(a.text) + '</p><div class="area-meta"><span><b>Watter Level</b>' + esc(a.level == null ? "COMING SOON" : "Level " + a.level) + "</span><span><b>Gear</b>" + esc(a.gear || "—") + "</span><span><b>Mobs</b>" + esc(a.mobs && a.mobs.length ? a.mobs.join(", ") : "—") + "</span><span><b>Resources</b>" + esc(a.resources && a.resources.length ? a.resources.join(", ") : "—") + "</span></div></article>";
}).join("");
var L = CFG.watterLevels || { steps: [] };
var lvls = (L.steps || []).map(function (s) { return '<div class="lvl-node' + (s.level === "∞" ? " end" : "") + '" data-reveal><div class="lvl-orb">' + esc(String(s.level)) + '</div><div class="lvl-label">' + esc(s.label) + '</div><div class="lvl-desc">' + esc(s.text) + "</div></div>"; }).join("");
return '<div class="container"><section class="section" style="padding-top:0">' + head("World", "Explore the ^World^", "Every area is a step in your progression.") + '<div class="world-path" data-reveal>' + path + '</div><div class="grid-areas">' + cards + "</div></section>" + '<section class="section">' + head("Progression", "Watter ^Levels^", L.note || "") + '<div class="levels-wrap" data-reveal><div class="levels-timeline">' + lvls + "</div></div></section></div>";
}
function pageStore() {
var ST = CFG.store || {};
var cats = (ST.categories || []).map(function (c) {
var items = (c.items || []).map(function (it) {
var price = it.price > 0 ? '<div class="pkg-meta"><span class="pkg-price">' + (ST.currency || "₹") + esc(it.price) + '</span>' + (it.usd ? '<span class="pkg-usd">' + esc(it.usd) + "</span>" : "") + (it.gems ? '<span class="pkg-chip">◆ ' + esc(it.gems) + " Gems</span>" : "") + (it.duration ? '<span class="pkg-dur">' + esc(it.duration) + "</span>" : "") + "</div>" : '<div class="pkg-meta"><span class="price-soon">Price — Coming Soon</span></div>';
var feat = it.features && it.features.length ? '<div class="perk-group"><h4>Features</h4><ul class="perk-list">' + it.features.map(function (p) { return "<li>" + V.check + esc(p) + "</li>"; }).join("") + "</ul></div>" : "";
var bonus = it.bonus && it.bonus.length ? '<div class="perk-group"><h4>Bonus</h4><ul class="perk-list">' + it.bonus.map(function (p) { return "<li>" + V.check + esc(p) + "</li>"; }).join("") + "</ul></div>" : "";
return '<article class="glass liquid pkg-card card" data-reveal><div class="pkg-top" style="border-top:3px solid ' + esc(it.color || "#22d3ee") + '">' + (it.badge ? '<span class="pkg-badge">' + esc(it.badge) + "</span>" : "") + '<div class="pkg-name" style="color:' + esc(it.color || "#fff") + '">' + esc(it.name) + "</div>" + price + '</div><div class="pkg-body">' + feat + bonus + '</div><div class="pkg-footer">' + (it.price > 0 ? '<button class="btn btn-primary btn-block" data-buy="' + esc(it.id) + '">Buy ' + esc(it.name) + "</button>" : '<button class="btn btn-ghost btn-block" disabled>Coming Soon</button>') + "</div></article>";
}).join("");
return '<section class="store-cat"><div class="store-cat-head">' + icon(c.icon) + "<h2>" + esc(c.name) + "</h2>" + (c.id === "gems" && ST.gemRate ? '<span class="gem-note">' + esc(ST.gemRate) + "</span>" : "") + '</div><div class="grid-store">' + items + "</div></section>";
}).join("");
return '<div class="container"><section class="section" style="padding-top:0">' + head("Store", "Support the ^Server^", ST.redeemNote || "") + cats + "</section></div>";
}
function pageStaff() {
var ST = CFG.staff || {}, by = {};
(ST.members || []).forEach(function (m) { (by[m.rank] = by[m.rank] || []).push(m); });
var groups = (ST.ranks || []).map(function (rk) {
var list = by[rk.id] || [];
var cards = list.map(function (m) {
return '<article class="glass staff-card card" data-reveal><div class="staff-avatar" style="color:' + esc(rk.color) + ';border-color:' + esc(rk.color) + '">' + esc(m.name.charAt(0).toUpperCase()) + '</div><div><div class="staff-name">' + esc(m.name) + '</div><div class="staff-role" style="color:' + esc(rk.color) + '">' + esc(rk.name) + "</div>" + (m.discord ? '<div class="staff-disc">' + esc(m.discord) + "</div>" : "") + "</div></article>";
}).join("");
if (!list.length) { cards = '<a class="staff-open" href="#/discord" data-reveal>' + V.plus + "Open Position</a>"; }
return '<div class="rank-group" data-reveal><div class="rank-head"><span class="rank-dot" style="background:' + esc(rk.color) + '"></span><h3>' + esc(rk.name) + '</h3><span class="rank-count">' + (list.length ? list.length + " member" + (list.length > 1 ? "s" : "") : "apply on Discord") + "</span></div><div class=\\\"grid-staff\\\">" + cards + "</div></div>";
}).join("");
return '<div class="container"><section class="section" style="padding-top:0">' + head("Team", "Meet the ^Staff^", ST.note || "") + groups + "</section></div>";
}
function pageVote() {
var V2 = CFG.vote || {};
return '<div class="container"><section class="section" style="padding-top:0"><div class="glass vote-hero" data-reveal><h2>' + esc(V2.title || "VOTE FOR WATTERCRAFT") + "</h2><p>" + esc(V2.text || "") + '</p><div class="grid-vote">' + (V2.sites || []).map(function (s) { return '<a class="glass vote-btn card" href="' + esc(s.url) + '" target="_blank" rel="noopener" data-reveal>' + icon("star") + "<span><span class=\\\"vb-name\\\">" + esc(s.name) + '</span><span class="vb-sub">' + esc(V2.rewardNote || "") + "</span></span><span class=\\\"go\\\">" + V.ext + "</span></a>"; }).join("") + "</div></div></section></div>";
}
function pageRules() {
return '<div class="container"><section class="section" style="padding-top:0">' + head("Rules", "Server ^Guidelines^", "Fair play keeps the network healthy.") + '<div class="grid-rules">' + (CFG.rules || []).map(function (r) { return '<article class="glass rule-card card" data-reveal>' + icon(r.icon) + "<div><h3>" + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div></article>"; }).join("") + "</div></section></div>";
}
function pageUpdates() {
var list = CFG.updates || [];
var inner = list.length ? '<div class="update-list">' + list.map(function (u) { return '<article class="glass update-card card" data-reveal><div class="update-top"><span class="update-tag">' + esc(u.tag || "Update") + '</span><span class="update-date">' + esc(u.date || "") + "</span></div><h3>" + esc(u.title) + "</h3><p>" + esc(u.summary || u.description || "") + "</p></article>"; }).join("") + "</div>" : '<div class="empty-state" data-reveal>' + icon("bell") + "<h3>No updates yet</h3><p>Changelog entries will appear here once published.</p></div>";
return '<div class="container"><section class="section" style="padding-top:0">' + head("Updates", "Latest ^News^", "") + inner + "</section></div>";
}
function pageSupport() {
var SU = CFG.support || {};
return '<div class="container"><section class="section" style="padding-top:0">' + head("Support", "How can we ^help?^", SU.text || "") + '<div class="grid-support">' + (SU.items || []).map(function (s) { return '<article class="glass support-card card" data-reveal>' + icon(s.icon) + "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></article>"; }).join("") + '</div><div class="center mt-3" data-reveal><a class="btn btn-discord" href="#/discord">' + V.discord + " Contact Support</a></div></section></div>";
}
function pageDiscord() {
var S = CFG.server || {}, url = S.discord || "#";
return '<div class="container"><section class="section" style="padding-top:0"><div class="glass vote-hero" data-reveal><div style="width:64px;height:64px;margin:0 auto 18px;border-radius:16px;display:grid;place-items:center;background:#5865f2;color:#fff">' + V.discord + '</div><h2>JOIN THE WATTERCRAFT COMMUNITY</h2><p>Giveaways, staff help, appeals, reports and community events — all in one place.</p><div class="hero-actions" style="justify-content:center"><a class="btn btn-discord" href="' + esc(url) + '" target="_blank" rel="noopener">' + V.discord + " Join Discord</a></div></div></section></div>";
}
function coming(name) {
return '<div class="container"><section class="section" style="padding-top:0">' + head(name, name + " — ^Coming Soon^", "This section is being built.") + '<div class="empty-state" data-reveal>' + icon("book") + "<p>Frontend-ready structure. Content arrives in the next update.</p></div></section></div>";
}
/* ---------------- buy modal ---------------- */
var lastPkg = null;
function findPkg(id) {
var cats = (CFG.store || {}).categories || [];
for (var i = 0; i < cats.length; i++) for (var j = 0; j < (cats[i].items || []).length; j++) if (cats[i].items[j].id === id) return cats[i].items[j];
return null;
}
function openBuy(id) {
var p = findPkg(id); if (!p) return;
lastPkg = p;
var ST = CFG.store || {}, box = $("#buyBox"); if (!box) return;
var price = p.price > 0 ? (ST.currency || "₹") + p.price + (p.usd ? ' <span style="font-size:.8rem;color:var(--muted)">' + esc(p.usd) + "</span>" : "") : "Coming Soon";
var gems = p.gems ? '<span class="pkg-chip">◆ ' + esc(p.gems) + " Gems</span>" : "";
var feat = (p.features || []).map(function (x) { return "<li>" + V.check + esc(x) + "</li>"; }).join("");
var bonus = (p.bonus || []).map(function (x) { return "<li>" + V.check + esc(x) + "</li>"; }).join("");
box.innerHTML = '<button class="modal-close" type="button" data-close-modal="buyModal" aria-label="Close">&times;</button><div class="buy-head" style="border-top:4px solid ' + esc(p.color || "#22d3ee") + '"><div class="buy-name" style="color:' + esc(p.color || "#fff") + '">' + esc(p.name) + '</div><div class="buy-price-row">' + price + " " + gems + "</div>" + (p.duration ? '<span class="pkg-dur" style="margin-top:6px;display:inline-block">' + esc(p.duration) + "</span>" : "") + '</div><div class="buy-body">' + (feat ? '<div class="perk-group mb-2"><h4>Features</h4><ul class="perk-list">' + feat + "</ul></div>" : "") + (bonus ? '<div class="perk-group mb-2"><h4>Bonus</h4><ul class="perk-list">' + bonus + "</ul></div>" : "") + '<div class="form-row"><label for="buyIg">Minecraft username (optional)</label><input class="field" id="buyIg" placeholder="Your in-game name" autocomplete="off"></div><div class="form-row"><label>Payment method</label><div class="methods">' + ["GPay", "PhonePe", "Paytm"].map(function (m, i) { return '<button type="button" class="method' + (i === 0 ? " sel" : "") + '" data-method="' + m + '">' + m + "</button>"; }).join("") + '</div></div>' + (p.price > 0 ? '<button class="btn btn-primary btn-block" id="payBtn">Pay via UPI</button>' : '<button class="btn btn-ghost btn-block" disabled>Price not set</button>') + '<p class="modal-note">' + esc(ST.redeemNote || "Redeem in-game with /redeem <code>.") + "</p></div>";
openModal("buyModal");
bindBuyEvents();
}
function bindBuyEvents() {
$$("#buyBox .method").forEach(function (b) { b.addEventListener("click", function () { $$("#buyBox .method").forEach(function (m) { m.classList.remove("sel"); }); b.classList.add("sel"); }); });
var pay = $("#payBtn");
if (pay) pay.addEventListener("click", function () {
var ST = CFG.store || {};
if (!ST.api) { closeModal("buyModal"); toast("Store payments not configured yet — join Discord to buy manually", true); return; }
var sel = $(".method.sel", $("#buyBox"));
var method = sel ? sel.getAttribute("data-method") : "UPI";
var ig = $("#buyIg") ? $("#buyIg").value.trim() : "";
fetch(ST.api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ packageId: lastPkg ? lastPkg.id : "", method: method, username: ig, amount: lastPkg ? lastPkg.price : 0 }) })
.then(function (r) { return r.json(); }).then(function (d) { closeModal("buyModal"); if (d && d.url) window.open(d.url, "_blank"); toast(d && d.message ? d.message : "Redirecting…"); })
.catch(function () { toast("Payment service unreachable.", true); });
});
}
/* ---------------- router ---------------- */
var ROUTES = {
home: pageHome, world: pageWorld, store: pageStore, staff: pageStaff, apply: pageApply, vote: pageVote,
rules: pageRules, updates: pageUpdates, support: pageSupport, discord: pageDiscord,
wiki: function () { return coming("Wiki"); }, guides: function () { return coming("Guides"); },
leaderboards: function () { return coming("Leaderboards"); }
};
function route() { var h = (location.hash || "").replace(/^#\/?/, "").split("/")[0] || "home"; return ROUTES[h] ? h : "home"; }
function render() {
var r = route();
view.innerHTML = (ROUTES[r] || pageHome)();
setNav(r);
document.title = ((CFG.meta || {}).title || "WatterCraft") + (r !== "home" ? " · " + r : "");
closeAll();
var d = $("#drawer"); if (d) d.classList.remove("open");
var b = $("#burger"); if (b) { b.classList.remove("open"); b.setAttribute("aria-expanded", "false"); }
window.scrollTo(0, 0);
afterRender();
}
function afterRender() {
loadBg(); bindView(); initReveal(); livePlayers();
}
function loadBg() {
var el = $(".hero-bg"); if (!el) return;
var url = el.getAttribute("data-bg");
if (!url) { el.style.background = "radial-gradient(1000px 600px at 75% 20%, rgba(34,211,238,.14), transparent 60%), radial-gradient(800px 500px at 10% 80%, rgba(37,99,235,.16), transparent 55%), var(--bg-2)"; return; }
var img = new Image();
img.onload = function () { el.style.backgroundImage = "url('" + url + "')"; };
img.onerror = function () { el.style.background = "radial-gradient(1000px 600px at 75% 20%, rgba(34,211,238,.14), transparent 60%), radial-gradient(800px 500px at 10% 80%, rgba(37,99,235,.16), transparent 55%), var(--bg-2)"; };
img.src = url;
}
function livePlayers() {
var cell = $("#livePlayers"); if (!cell) return;
var S = CFG.server || {};
if (!S.statusHost) { cell.textContent = "Unavailable"; return; }
fetch("https://api.mcsrvstat.us/bedrock/2/" + encodeURIComponent(S.statusHost + ":" + (S.port || 19132))).then(function (r) { return r.json(); }).then(function (d) {
cell.textContent = d && d.online && d.players && d.players.online != null ? d.players.online + " online" : "Offline";
}).catch(function () { cell.textContent = "Unavailable"; });
}
function bindView() {
$$("#view [data-buy]").forEach(function (b) { b.addEventListener("click", function () { openBuy(b.getAttribute("data-buy")); }); });
}
/* ---------------- reveal ---------------- */
var io = null;
function initReveal() {
if (reduceMotion || !("IntersectionObserver" in window)) { $$("[data-reveal]").forEach(function (el) { el.classList.add("in"); }); return; }
if (io) io.disconnect();
io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.1 });
$$("[data-reveal]").forEach(function (el) { io.observe(el); });
}
/* ---------------- particles ---------------- */
function particles() {
var f = $("#pixelField"); if (!f || reduceMotion) return;
var n = window.innerWidth < 720 ? 14 : 26;
for (var i = 0; i < n; i++) {
var s = document.createElement("i");
s.style.left = Math.random() * 100 + "%";
s.style.animationDuration = (Math.random() * 14 + 10) + "s";
s.style.animationDelay = -(Math.random() * 18) + "s";
f.appendChild(s);
}
}
/* ---------------- chrome ---------------- */
function bindChrome() {
var burger = $("#burger"), drawer = $("#drawer");
if (burger && drawer) burger.addEventListener("click", function () {
var open = drawer.classList.toggle("open");
burger.classList.toggle("open", open);
burger.setAttribute("aria-expanded", String(open));
});
$$("[data-close-drawer]").forEach(function (el) { el.addEventListener("click", function () { if (drawer) drawer.classList.remove("open"); if (burger) burger.classList.remove("open"); }); });
$$("[data-close-modal]").forEach(function (el) { el.addEventListener("click", function () { closeModal(el.getAttribute("data-close-modal")); }); });
window.addEventListener("keydown", function (e) {
if (e.key === "Escape") closeAll();
if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); openSearch(); }
});
var sOpen = $("#searchOpen");
if (sOpen) sOpen.addEventListener("click", openSearch);
var sIn = $("#searchInput"), sRes = $("#searchResults");
if (sIn) sIn.addEventListener("input", function () { sRes.innerHTML = runSearch(sIn.value); });
window.addEventListener("scroll", function () { var n = $("#topNav"); if (n) n.classList.toggle("scrolled", window.scrollY > 30); }, { passive: true });
window.addEventListener("hashchange", render);
}
function openSearch() {
openModal("searchModal");
setTimeout(function () { var i = $("#searchInput"); if (i) { i.value = ""; i.focus(); } var r = $("#searchResults"); if (r) r.innerHTML = ""; }, 60);
}
/* ---------------- staff application ---------------- */
function pageApply() {
var A = CFG.apply || {};
var api = A.api || "";
var posOpts = (A.positions || []).map(function (p) { return '<option value="' + esc(p) + '">' + esc(p) + "</option>"; }).join("");
var reqs = (A.requirements || []).map(function (r) { return '<li><span class="req-dot"></span>' + esc(r) + "</li>"; }).join("");
var steps = (A.process || []).map(function (s, i) { return '<div class="apply-step" data-reveal><span class="step-num">' + (i + 1) + '</span><div><h4>' + esc(s.step) + "</h4><p>" + esc(s.text) + "</p></div></div>"; }).join("");
var faqs = (A.faq || []).map(function (f) { return '<details class="faq"><summary>' + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("");
var dsc = A.discord || CFG.server.discord || "#";
function F(id, label, tag, extra, ph) {
if (tag === "select") return '<div class="field-group"><label for="' + id + '">' + label + '</label><select id="' + id + '" class="field" required><option value="">Select a position</option>' + posOpts + "</select></div>";
var attrs = (extra || "") + (ph ? ' placeholder="' + ph + '"' : "");
return '<div class="field-group"><label for="' + id + '">' + label + "</label><" + tag + ' id="' + id + '" class="field" ' + attrs + "></" + tag + "></div>";
}
return '<div class="container"><section class="section" style="padding-top:0">' +
head("Staff Application", "Join the ^WatterCraft^ Staff Team", "Help us build, moderate and grow the network. Every member starts somewhere — applications are reviewed by the team.") +
(api ? "" : '<div class="glass note-warn" data-reveal>Online applications are being set up. Until then, please apply through <a href="' + esc(dsc) + '" target="_blank" rel="noopener">Discord</a> — the team will guide you.</div>') +
'<div class="apply-grid">' +
'<div class="apply-col"><div class="glass apply-card" data-reveal><h3>Application Form</h3><p class="dim">All fields are required unless marked optional.</p>' +
'<form id="applyForm" onsubmit="applySubmit(event)">' +
'<input type="text" name="company" id="hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
'<div class="form-row">' + F("aMc", "Minecraft Username", "input", 'maxlength="16" required', "In-game name") + F("aDisc", "Discord Username", "input", 'maxlength="37" required', "@username or Name#0000") + "</div>" +
'<div class="form-row">' + F("aAge", "Age", "input", 'type="number" min="13" max="60" required') + F("aCountry", "Country", "input", "required") + "</div>" +
'<div class="form-row">' + F("aTz", "Timezone", "input", "required", "e.g. IST (UTC+5:30)") + F("aPos", "Position Applying For", "select") + "</div>" +
'<div class="form-row">' + F("aExp", "Previous Staff Experience", "textarea", 'rows="2" required', "or None") + F("aServ", "Previous Servers", "input", "required", "Server names, or None") + "</div>" +
'<div class="form-row">' + F("aWhy", "Why do you want to join WatterCraft Staff?", "textarea", 'rows="3" required') + F("aChoose", "Why should we choose you?", "textarea", 'rows="3" required') + "</div>" +
'<div class="form-row">' + F("aAvail", "Daily Availability", "input", "required", "e.g. 6 PM - 11 PM IST") + F("aHours", "Average Hours Per Day", "input", 'type="number" min="0" max="24" step="0.5" required') + "</div>" +
'<div class="form-row">' + F("aMod", "Moderation Experience", "textarea", 'rows="2" required', "or None") + F("aInfo", "Additional Information (optional)", "textarea", 'rows="2"') + "</div>" +
F("aPort", "Portfolio / Content Links (optional)", "input", "", "https://...") +
'<label class="agree"><input type="checkbox" id="aAgree" required /> <span>I agree to follow the staff rules and keep applicant information private.</span></label>' +
'<button class="btn btn-primary btn-block" type="submit" id="applyBtn">Submit Application</button>' +
'</form><div id="applyResult" aria-live="polite"></div></div></div>' +
'<div class="apply-col">' +
'<div class="glass apply-card" data-reveal><h3>Requirements</h3><ul class="req-list">' + reqs + '</ul><p class="dim">Final requirements are confirmed by the team. Questions? Ask on Discord.</p></div>' +
'<div class="glass apply-card" data-reveal><h3>Process</h3><div class="steps">' + steps + "</div></div>" +
'<div class="glass apply-card" data-reveal><h3>Track Your Application</h3><p class="dim">Enter the Application ID you received after submitting.</p>' +
'<div class="track-row"><input class="field" id="aTrackId" placeholder="WC-XXXXXX" maxlength="20" /><button class="btn" type="button" onclick="applyCheck(event)">Check</button></div>' +
'<div id="statusResult" aria-live="polite"></div></div>' +
'<div class="glass apply-card" data-reveal><h3>FAQ</h3>' + faqs + "</div>" +
"</div></div></section></div>";
}
window.applySubmit = function (ev) {
ev && ev.preventDefault();
var btn = document.getElementById("applyBtn");
var out = document.getElementById("applyResult");
if (!out) return;
if (document.getElementById("hp") && document.getElementById("hp").value) { out.innerHTML = '<div class="glass note-warn">Submission blocked.</div>'; return; }
function v(id) { var e = document.getElementById(id); return e ? e.value.trim() : ""; }
var mc = v("aMc"), age = v("aAge"), why = v("aWhy"), choose = v("aChoose");
var msg = "";
if (!/^[A-Za-z0-9_]{3,16}$/.test(mc)) msg = "Enter a valid Minecraft username (3-16 letters, numbers, underscores).";
else if (!(age >= 13 && age <= 60)) msg = "Age must be between 13 and 60.";
else if (!v("aDisc")) msg = "Discord username is required.";
else if (!v("aPos")) msg = "Select a position.";
else if (why.length < 20) msg = "Tell us more about why you want to join (min 20 characters).";
else if (choose.length < 20) msg = "Tell us more about why we should choose you (min 20 characters).";
else if (!(v("aHours") >= 0 && v("aHours") <= 24)) msg = "Hours per day must be between 0 and 24.";
else if (!document.getElementById("aAgree").checked) msg = "You must agree to the staff rules.";
if (msg) { out.innerHTML = '<div class="glass note-warn">' + esc(msg) + "</div>"; return; }
var A = (window.WC || {}).apply || {}, api = A.api || "";
if (!api) { out.innerHTML = '<div class="glass note-warn">Online applications are not open yet — please apply via <a href="' + esc(A.discord || "#") + '" target="_blank" rel="noopener">Discord</a>.</div>'; return; }
var payload = { mc: mc, discord: v("aDisc"), age: Number(age), country: v("aCountry"), tz: v("aTz"), position: v("aPos"), experience: v("aExp") || "None", servers: v("aServ") || "None", why: why, choose: choose, availability: v("aAvail"), hours: v("aHours"), moderation: v("aMod") || "None", additional: v("aInfo") || "-", portfolio: v("aPort") || "" };
var old = btn.innerHTML;
btn.disabled = true; btn.innerHTML = "Submitting…";
fetch(api, { method: "POST", body: JSON.stringify(payload), redirect: "follow" })
.then(function (r) { return r.json(); })
.then(function (res) {
if (res && res.ok) {
var f = document.getElementById("applyForm"); if (f) f.style.display = "none";
out.innerHTML = '<div class="glass success-box"><h3>Application Received</h3><p>Your Application ID is <strong>' + esc(res.id) + "</strong>.</p><p><span class=\\\"chip chip-pending\\\">PENDING</span> Submitted " + esc(String(res.submitted || "").slice(0, 10)) + '</p><p class="dim">Save this ID. Track your status on this page or ask on Discord.</p></div>';
} else { out.innerHTML = '<div class="glass note-warn">' + esc((res && res.error) || "Submission failed. Try again or contact staff on Discord.") + "</div>"; btn.disabled = false; btn.innerHTML = old; }
})
.catch(function () { out.innerHTML = '<div class="glass note-warn">Network error — could not submit. Try again or contact staff on Discord.</div>'; btn.disabled = false; btn.innerHTML = old; });
};
window.applyCheck = function (ev) {
ev && ev.preventDefault();
var idEl = document.getElementById("aTrackId"), out = document.getElementById("statusResult");
var id = idEl ? idEl.value.trim() : "";
var A = (window.WC || {}).apply || {}, api = A.api || "";
if (!id) { if (out) out.innerHTML = '<div class="glass note-warn">Enter your Application ID.</div>'; return; }
if (!api) { if (out) out.innerHTML = '<div class="glass note-warn">Status checking is not available yet.</div>'; return; }
if (out) out.innerHTML = '<p class="dim">Checking…</p>';
fetch(api + (api.indexOf("?") > -1 ? "&" : "?") + "action=status&id=" + encodeURIComponent(id))
.then(function (r) { return r.json(); })
.then(function (res) {
if (res && res.ok) {
var cls = { PENDING: "chip-pending", REVIEWING: "chip-reviewing", ACCEPTED: "chip-accepted", REJECTED: "chip-rejected" }[(res.status || "").toUpperCase()] || "";
out.innerHTML = '<div class="glass"><span class="chip ' + cls + '">' + esc((res.status || "").toUpperCase()) + '</span><span class="dim"> Submitted ' + esc(String(res.submitted || "").slice(0, 10)) + "</span></div>";
} else { out.innerHTML = '<div class="glass note-warn">' + esc((res && res.error) || "No application found for that ID.") + "</div>"; }
})
.catch(function () { if (out) out.innerHTML = '<div class="glass note-warn">Could not check status right now.</div>'; });
};
/* ---------------- boot ---------------- */
function boot() {
buildIndex();
buildNav();
buildFooter();
bindChrome();
particles();
fetchStatus();
setInterval(fetchStatus, 60000);
render();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
window.closeBuy = function () { closeModal("buyModal"); };
window.openSearch = openSearch;
})();
