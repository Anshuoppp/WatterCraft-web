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
