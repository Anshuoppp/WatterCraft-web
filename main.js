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
return res.map(function (i) { return '<a class="search-item" href="' + i.h + '">' + icon(i.ic) + '<span><span class="si-title">' + esc(i.t) + '</span><span class="si-sub"> · ' + esc(i.s) + "</span></span></a>"; }).join("");
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
return '<article class="glass liquid shine feature-card card" data-reveal><div class="feature-icon">' + icon(f.icon) + "</div><h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p><span class=\"watermark\" style=\"color:var(--cyan)\">" + icon(f.icon) + "</span></article>";
}).join("") + "</div></section></div>";
}
