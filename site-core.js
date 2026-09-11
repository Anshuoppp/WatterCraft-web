/* WatterCraft V2.5 - Site Core v4 (reveal fix + hero anim, SAFE) */
(function () {
"use strict";
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function esc(s) {
return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
});
}
if (!document.getElementById("wcCoreCSS")) {
var st = document.createElement("style");
st.id = "wcCoreCSS";
st.textContent = [
"#wcHeroAnim{margin-top:26px;max-width:680px;animation:wcFadeUp .7s ease both}",
"#wcHeroAnim .wc-type{min-height:32px;font-size:1.02rem;font-weight:600;color:#bfe9ff;text-shadow:0 0 16px rgba(34,211,238,.4)}",
"#wcHeroAnim .cursor{display:inline-block;width:9px;margin-left:2px;color:#22d3ee;animation:wcBlink 1s steps(1) infinite}",
"#wcHeroAnim .wc-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}",
"#wcHeroAnim .wc-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;border:1px solid rgba(120,175,235,.28);background:rgba(10,18,34,.55);color:#eaf3ff;font-size:.88rem;font-weight:600;cursor:pointer;text-decoration:none;transition:transform .18s,border-color .18s,box-shadow .18s}",
"#wcHeroAnim .wc-chip:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.7);box-shadow:0 10px 26px rgba(34,211,238,.2)}",
"#wcHeroAnim .wc-chip.hot{border-color:rgba(34,211,238,.55);background:rgba(14,116,144,.3)}",
"@keyframes wcBlink{0%,49%{opacity:1}50%,100%{opacity:0}}",
"@keyframes wcFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}",
"[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}",
"html.js [data-reveal]{opacity:1!important;transform:none!important}",
"html.js [data-reveal].in{opacity:1!important;transform:none!important}"
].join("");
(document.head || document.documentElement).appendChild(st);
}
function seg() {
var h = (location.hash || "").replace(/^#\/?/, "");
return h.split("/")[0].split("?")[0].toLowerCase();
}
function isHome() { var s = seg(); return s === "" || s === "home"; }
/* ---------- force-reveal: content hamesha visible ---------- */
function nudgeReveal() {
$$("#view [data-reveal]").forEach(function (el) {
if (!el.classList.contains("in")) el.classList.add("in");
});
}
/* ---------- hero: typewriter + quick chips ---------- */
var PHRASES = [
"Islands, skills, quests, pets, minions & dungeons - all in one server.",
"Master skills and climb the Watter Levels.",
"Trade like a pro on the Bazaar & Auction House.",
"Raid Dungeons, slay bosses, loot legendary gear.",
"Grow your island and top the Leaderboards.",
"24/7 Bedrock SkyBlock - play.wattercraft.fun"
];
var OPTIONS = [
{ icon: "\u{1F4CB}", label: "Copy Server IP", onclick: "copyIP()", hot: true },
{ icon: "\u{1F4AC}", label: "Join Discord", href: "#/discord", hot: true },
{ icon: "\u{1F6D2}", label: "Store", href: "#/store" },
{ icon: "\u2B50", label: "Vote", href: "#/vote" },
{ icon: "\u{1F4D6}", label: "Wiki", href: "#/wiki" },
{ icon: "\u{1F393}", label: "Guides", href: "#/guides" },
{ icon: "\u{1F4F0}", label: "Updates", href: "#/updates" }
];
function chipHTML(o) {
if (o.href) return '<a class="wc-chip' + (o.hot ? " hot" : "") + '" href="' + o.href + '"><span>' + o.icon + '</span><span>' + esc(o.label) + '</span></a>';
return '<button class="wc-chip' + (o.hot ? " hot" : "") + '" type="button" onclick="' + o.onclick + '"><span>' + o.icon + '</span><span>' + esc(o.label) + '</span></button>';
}
var twTimer = null;
function startTypewriter(el) {
if (twTimer) { clearTimeout(twTimer); twTimer = null; }
var pi = 0, ci = 0, mode = "type";
function step() {
if (!document.body.contains(el)) { twTimer = null; return; }
var p = PHRASES[pi], wait = 42;
if (mode === "type") { ci++; if (ci >= p.length) { mode = "hold"; wait = 2000; } }
else if (mode === "hold") { mode = "erase"; wait = 30; }
else { ci -= 2; wait = 24; if (ci <= 0) { ci = 0; mode = "type"; pi = (pi + 1) % PHRASES.length; wait = 380; } }
el.innerHTML = p.slice(0, Math.max(0, ci)) + '<span class="cursor">|</span>';
twTimer = setTimeout(step, wait);
}
step();
}
function injectHero() {
if (document.getElementById("wcHeroAnim")) return;
var inner = document.querySelector(".hero-inner");
if (!inner) return;
var anchor = inner.querySelector(".hero-actions");
if (!anchor) return;
var box = document.createElement("div");
box.id = "wcHeroAnim";
box.innerHTML = '<div class="wc-type" id="wcTypeLine"><span class="cursor">|</span></div><div class="wc-chips">' + OPTIONS.map(chipHTML).join("") + '</div>';
if (anchor.nextSibling) inner.insertBefore(box, anchor.nextSibling);
else inner.appendChild(box);
startTypewriter(document.getElementById("wcTypeLine"));
}
/* ---------- emergency fallback: ONLY if a page rendered completely empty ---------- */
function headHTML(kicker, title, sub) {
return '<div class="container"><section class="section"><div class="section-head">' +
'<span class="kicker">' + esc(kicker) + '</span><h2 class="title">' + esc(title) + '</h2>' +
(sub ? '<p class="sub">' + esc(sub) + '</p>' : '') + '</div>';
}
var FALLBACK = {
world: { k: "PROGRESSION", t: "World & Watter Levels", s: "Explore the hub and climb your Watter Level to unlock everything." },
store: { k: "STORE", t: "WatterCraft Store", s: "The store engine did not load. Refresh the page - packages and Buy buttons come from the main engine." },
staff: { k: "TEAM", t: "Meet the Staff", s: "The staff page did not load. Refresh the page to see the full team list." },
apply: { k: "CAREERS", t: "Staff Applications", s: "The application page did not load. Refresh the page - when applications are open the form appears here." },
vote: { k: "SUPPORT", t: "Vote for WatterCraft", s: "Votes help new players find the server. Vote links load with the main engine." },
support: { k: "HELP CENTER", t: "Support", s: "Stuck? Join Discord and open a support ticket." },
discord: { k: "COMMUNITY", t: "Join our Discord", s: "Giveaways, updates and instant support live on Discord." },
rules: { k: "SERVER POLICY", t: "Server Rules", s: "No cheating, no griefing, respect everyone. Full list loads with the main engine." }
};
function tick() {
nudgeReveal();
var view = $("#view");
if (!view) return;
if (isHome()) { injectHero(); return; }
var s = seg();
if (s === "wiki" || s === "guides" || s === "leaderboards" || s === "updates") return;
if (String(view.innerHTML).trim() !== "") return;
var f = FALLBACK[s];
var html;
if (f) {
html = headHTML(f.k, f.t, f.s) +
'<div class="wc-cta" style="border:1px solid rgba(120,175,235,.25);border-radius:16px;padding:26px 22px;text-align:center;margin-top:20px"><h3 style="color:#eaf3ff;margin:0 0 8px">Page failed to load</h3><p style="color:#a9bcd8;margin:0 0 14px">' + esc(f.s) + '</p><button class="btn btn-ghost" onclick="location.reload()">REFRESH PAGE</button> <a class="btn btn-primary" href="#/home">BACK TO HOME</a></div></section></div>';
} else {
html = headHTML("OOPS", "Page not found", "That page does not exist.") +
'<div class="wc-cta" style="border:1px solid rgba(120,175,235,.25);border-radius:16px;padding:26px 22px;text-align:center;margin-top:20px;margin-bottom:40px"><h3 style="color:#eaf3ff;margin:0 0 8px">Lost in the void?</h3><p style="color:#a9bcd8;margin:0 0 14px">The page you tried to open is not available.</p><a class="btn btn-primary" href="#/home">BACK TO HOME</a></div></section></div>';
}
view.innerHTML = html;
window.scrollTo(0, 0);
}
window.addEventListener("hashchange", tick);
setInterval(tick, 900);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tick);
else tick();
})();
