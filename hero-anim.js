/* WatterCraft V2.5 - Hero animated text + quick options (standalone, safe) */
(function () {
"use strict";
var PHRASES = [
"Islands, skills, quests, pets, minions & dungeons - all in one server.",
"Master 8 skills and climb the Watter Levels.",
"Trade like a pro on the Bazaar & Auction House.",
"Raid Dungeons, slay custom bosses, loot legendary gear.",
"Grow your island and top the Leaderboards.",
"24/7 Bedrock SkyBlock - play.wattercraft.fun"
];
var OPTIONS = [
{ icon: "📋", label: "Copy Server IP", onclick: "copyIP()", hot: true },
{ icon: "💬", label: "Join Discord", href: "#/discord", hot: true },
{ icon: "🛒", label: "Store", href: "#/store" },
{ icon: "⭐", label: "Vote", href: "#/vote" },
{ icon: "📖", label: "Wiki", href: "#/wiki" },
{ icon: "🎓", label: "Guides", href: "#/guides" },
{ icon: "📰", label: "Updates", href: "#/updates" }
];
var CSS = [
"#wcHeroAnim{margin-top:26px;max-width:680px;animation:wcFadeUp .7s ease both}",
"#wcHeroAnim .wc-type{min-height:32px;font-size:1.02rem;font-weight:600;color:#bfe9ff;letter-spacing:.3px;text-shadow:0 0 16px rgba(34,211,238,.4)}",
"#wcHeroAnim .wc-type .cursor{display:inline-block;width:9px;margin-left:2px;color:#22d3ee;animation:wcBlink 1s steps(1) infinite}",
"#wcHeroAnim .wc-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}",
"#wcHeroAnim .wc-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;border:1px solid rgba(120,175,235,.28);background:rgba(10,18,34,.55);color:#eaf3ff;font-size:.88rem;font-weight:600;cursor:pointer;text-decoration:none;transition:transform .18s,border-color .18s,box-shadow .18s,background .18s}",
"#wcHeroAnim .wc-chip:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.7);box-shadow:0 10px 26px rgba(34,211,238,.2);background:rgba(16,28,52,.8)}",
"#wcHeroAnim .wc-chip.hot{border-color:rgba(34,211,238,.55);background:rgba(14,116,144,.3)}",
"#wcHeroAnim .wc-chip .i{font-size:1rem;line-height:1}",
"@keyframes wcBlink{0%,49%{opacity:1}50%,100%{opacity:0}}",
"@keyframes wcFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}",
"@media (max-width:720px){#wcHeroAnim .wc-type{font-size:.92rem;min-height:28px}#wcHeroAnim .wc-chip{padding:8px 13px;font-size:.8rem}}"
].join("");
if (!document.getElementById("wcHeroAnimCSS")) {
var st = document.createElement("style");
st.id = "wcHeroAnimCSS";
st.textContent = CSS;
(document.head || document.documentElement).appendChild(st);
}
function isHome() {
var h = location.hash || "";
return h === "" || h === "#/" || h === "#/home";
}
function chipHTML(o) {
if (o.href) {
return '<a class="wc-chip' + (o.hot ? " hot" : "") + '" href="' + o.href + '"><span class="i">' + o.icon + "</span><span>" + o.label + "</span></a>";
}
return '<button class="wc-chip' + (o.hot ? " hot" : "") + '" type="button" onclick="' + o.onclick + '"><span class="i">' + o.icon + "</span><span>" + o.label + "</span></button>";
}
var twTimer = null;
function startTypewriter(el) {
if (twTimer) { clearTimeout(twTimer); twTimer = null; }
var pi = 0, ci = 0, mode = "type";
function step() {
if (!document.body.contains(el)) return;
var p = PHRASES[pi];
var wait = 42;
if (mode === "type") {
ci++;
if (ci >= p.length) { mode = "hold"; wait = 2000; }
} else if (mode === "hold") {
mode = "erase"; wait = 30;
} else {
ci -= 2;
wait = 24;
if (ci <= 0) { ci = 0; mode = "type"; pi = (pi + 1) % PHRASES.length; wait = 380; }
}
el.innerHTML = p.slice(0, Math.max(0, ci)) + '<span class="cursor">|</span>';
twTimer = setTimeout(step, wait);
}
step();
}
function inject() {
if (!isHome()) return;
if (document.getElementById("wcHeroAnim")) return;
var inner = document.querySelector(".hero-inner");
if (!inner) return;
var anchor = inner.querySelector(".hero-actions");
if (!anchor) return;
var box = document.createElement("div");
box.id = "wcHeroAnim";
box.innerHTML = '<div class="wc-type" id="wcTypeLine"><span class="cursor">|</span></div>' +
'<div class="wc-chips">' + OPTIONS.map(chipHTML).join("") + "</div>";
if (anchor.nextSibling) inner.insertBefore(box, anchor.nextSibling);
else inner.appendChild(box);
startTypewriter(document.getElementById("wcTypeLine"));
}
setInterval(inject, 700);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject);
else inject();
})();
