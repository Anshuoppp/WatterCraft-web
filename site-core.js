/* WatterCraft V2.5 - Site Core: blank pages fix + hero animated text & quick options */
(function () {
"use strict";
var CFG = window.WC || {};
var D = window.WCV || {};
function $(s, r) { return (r || document).querySelector(s); }
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
var view = $("#view");
if (!document.getElementById("wcCoreCSS")) {
  var st = document.createElement("style");
  st.id = "wcCoreCSS";
  st.textContent = [
    "#wcCoreToast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,16px);opacity:0;pointer-events:none;z-index:1300;background:rgba(13,27,51,.94);border:1px solid rgba(34,211,238,.45);color:#e9f0fb;padding:10px 18px;border-radius:12px;font-size:.88rem;transition:opacity .25s,transform .25s}",
    "#wcCoreToast.show{opacity:1;transform:translate(-50%,0)}",
    ".wc-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;margin-top:16px}",
    ".wc-card{border:1px solid rgba(120,175,235,.18);background:rgba(10,16,30,.62);border-radius:14px;padding:18px}",
    ".wc-card h3{margin:8px 0 6px;font-size:1rem;color:#eaf3ff}",
    ".wc-card p{margin:0;font-size:.86rem;color:#a9bcd8;line-height:1.5}",
    ".wc-ic{font-size:1.35rem;line-height:1}",
    ".wc-badge{display:inline-block;font-size:.66rem;font-weight:800;letter-spacing:1.2px;padding:3px 10px;border-radius:999px;border:1px solid rgba(34,211,238,.45);color:#7dd3fc;text-transform:uppercase}",
    ".wc-levels{display:flex;gap:8px;margin-top:14px;overflow-x:auto;padding:18px 6px 8px}",
    ".wc-lv{flex:1;min-width:96px;text-align:center;position:relative}",
    ".wc-lv:not(:first-child)::before{content:'';position:absolute;top:22px;left:calc(-50% + 24px);width:calc(100% - 48px);height:2px;background:rgba(34,211,238,.35)}",
    ".wc-lv .dot{width:44px;height:44px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;border:2px solid rgba(34,211,238,.6);background:rgba(10,18,34,.85);color:#7dd3fc;box-shadow:0 0 18px rgba(34,211,238,.3);position:relative;z-index:1}",
    ".wc-lv.legend .dot{border-color:rgba(167,139,250,.75);color:#c4b5fd;box-shadow:0 0 18px rgba(167,139,250,.35)}",
    ".wc-lv .nm{margin-top:8px;font-weight:700;font-size:.88rem;color:#eaf3ff}",
    ".wc-lv .ds{font-size:.7rem;color:#93a6c4}",
    ".wc-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;margin-top:12px}",
    ".wc-item{border:1px solid rgba(120,175,235,.18);background:rgba(10,16,30,.62);border-radius:12px;padding:13px 15px;font-size:.88rem;color:#eaf3ff;display:flex;justify-content:space-between;gap:8px;align-items:center}",
    ".wc-item .pr{color:#fbbf24;font-weight:800;white-space:nowrap}",
    ".wc-cta{border:1px solid rgba(120,175,235,.25);background:linear-gradient(135deg,rgba(14,116,144,.22),rgba(10,16,30,.72));border-radius:16px;padding:28px 22px;text-align:center}",
    ".wc-cta h3{margin:0 0 8px;color:#eaf3ff;font-size:1.25rem}",
    ".wc-cta p{color:#a9bcd8;margin:0 auto 16px;max-width:520px}",
    ".wc-upds{display:grid;gap:12px;margin-top:14px}",
    ".wc-upd{display:flex;gap:14px;align-items:flex-start;border:1px solid rgba(120,175,235,.18);background:rgba(10,16,30,.62);border-radius:14px;padding:14px 16px}",
    ".wc-upd .ic{font-size:1.25rem;line-height:1}",
    ".wc-upd b{display:block;color:#eaf3ff}",
    ".wc-upd p{margin:4px 0 0;color:#a9bcd8;font-size:.86rem}",
    ".wc-upd small{color:#7d90ad}",
    "#wcHeroAnim{margin-top:26px;max-width:680px}",
    "#wcHeroAnim .wc-type{min-height:32px;font-size:1.02rem;font-weight:600;color:#bfe9ff;letter-spacing:.3px;text-shadow:0 0 16px rgba(34,211,238,.4)}",
    "#wcHeroAnim .cursor{display:inline-block;width:9px;margin-left:2px;color:#22d3ee;animation:wcBlink 1s steps(1) infinite}",
    "#wcHeroAnim .wc-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}",
    "#wcHeroAnim .wc-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;border:1px solid rgba(120,175,235,.28);background:rgba(10,18,34,.55);color:#eaf3ff;font-size:.88rem;font-weight:600;cursor:pointer;text-decoration:none;transition:transform .18s,border-color .18s,box-shadow .18s,background .18s}",
    "#wcHeroAnim .wc-chip:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.7);box-shadow:0 10px 26px rgba(34,211,238,.2);background:rgba(16,28,52,.8)}",
    "#wcHeroAnim .wc-chip.hot{border-color:rgba(34,211,238,.55);background:rgba(14,116,144,.3)}",
    "@keyframes wcBlink{0%,49%{opacity:1}50%,100%{opacity:0}}",
    "@media (max-width:720px){#wcHeroAnim .wc-type{font-size:.92rem;min-height:28px}#wcHeroAnim .wc-chip{padding:8px 13px;font-size:.8rem}}"
  ].join("");
  (document.head || document.documentElement).appendChild(st);
}
function seg() {
  var h = location.hash || "";
  h = h.replace(/^#\/?/, "");
  return h.split("/")[0].split("?")[0].toLowerCase();
}
var OWNED = { world: 1, store: 1, vote: 1, staff: 1, apply: 1, support: 1, discord: 1, rules: 1 };
var V25 = { wiki: 1, guides: 1, leaderboards: 1, updates: 1 };
function isHome() { var s = seg(); return s === "" || s === "home"; }
function toast(msg) {
  var t = $("#wcCoreToast");
  if (!t) { t = document.createElement("div"); t.id = "wcCoreToast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = "show";
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { t.className = ""; }, 2200);
}
window.wcCopy = function () {
  var S = CFG.server || {};
  var txt = (S.ip || "play.wattercraft.fun") + ":" + (S.port || 19132);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(function () { toast("Server IP copied!"); }, function () { toast(txt); });
  } else toast(txt);
};
function serverIP() {
  var S = CFG.server || {};
  return (S.ip || "play.wattercraft.fun") + ":" + (S.port || 19132);
}
var ICONMAP = { home: "\u{1F3E0}", map: "\u{1F5FA}", book: "\u{1F4D6}", crown: "\u{1F451}", bell: "\u{1F514}", chest: "\u{1F381}", star: "\u2B50", person: "\u{1F464}", sword: "\u2694", pick: "\u26CF", shield: "\u{1F6E1}", gem: "\u{1F48E}", coin: "\u{1FA99}", skull: "\u{1F480}", paw: "\u{1F43E}", gear: "\u2699", grass: "\u{1F331}", wheat: "\u{1F33E}", tree: "\u{1F333}", portal: "\u{1F300}", island: "\u{1F3DD}", compass: "\u{1F9ED}", help: "\u2753", block: "\u{1F9F1}" };
function emo(name) {
  var k = String(name == null ? "" : name).toLowerCase().trim();
  if (ICONMAP[k]) return ICONMAP[k];
  if (k && !/^[a-z0-9_ -]+$/i.test(k)) return esc(name);
  return "\u2728";
}
function headHTML(kicker, title, sub) {
  return '<div class="container"><section class="section"><div class="section-head">' +
    '<span class="kicker">' + esc(kicker) + '</span>' +
    '<h2 class="title">' + esc(title) + '</h2>' +
    (sub ? '<p class="sub">' + esc(sub) + '</p>' : '') +
    '</div>';
}
function tailHTML(route) {
  return '<span id="wcOwnedMark" data-route="' + route + '" style="display:none"></span></section></div>';
}
function card(icon, title, text, badge) {
  return '<div class="wc-card"><div class="wc-ic">' + icon + '</div>' +
    (badge ? '<div style="margin-top:8px"><span class="wc-badge">' + esc(badge) + '</span></div>' : '') +
    '<h3>' + esc(title) + '</h3>' + (text ? '<p>' + esc(text) + '</p>' : '') + '</div>';
}
function discordURL() {
  if (typeof CFG.discord === "string" && CFG.discord) return CFG.discord;
  if (CFG.meta && typeof CFG.meta.discord === "string" && CFG.meta.discord) return CFG.meta.discord;
  var nav = CFG.nav || [], fl = (CFG.footer || {}).links || [], i;
  for (i = 0; i < nav.length; i++) { if (nav[i] && nav[i].id === "discord" && nav[i].href) return nav[i].href; }
  for (i = 0; i < fl.length; i++) { if (fl[i] && (fl[i].label || "").toLowerCase().indexOf("discord") !== -1 && fl[i].href) return fl[i].href; }
  return "";
}
var LEVELS = [
  { n: "1", name: "Beginner", d: "Start your island journey." },
  { n: "5", name: "Explorer", d: "Unlock new areas and systems." },
  { n: "10", name: "Adventurer", d: "Advanced content opens." },
  { n: "15", name: "Expert", d: "Master-tier progression." },
  { n: "20", name: "Master", d: "Elite status unlocked." },
  { n: "&#8734;", name: "Legend", d: "Endless progression.", legend: true }
];
function pageWorld() {
  var areas = CFG.worldAreas || [];
  var lv = LEVELS.map(function (l) {
    return '<div class="wc-lv' + (l.legend ? " legend" : "") + '"><div class="dot">' + l.n + '</div><div class="nm">' + esc(l.name) + '</div><div class="ds">' + esc(l.d) + '</div></div>';
  }).join("");
  var cards = areas.length
    ? '<div class="wc-cards">' + areas.map(function (w) { return card(emo(w.icon), w.name || "Area", w.desc || w.text || w.description || ""); }).join("") + '</div>'
    : '<div class="wc-cards">' +
      card("\u{1F3DD}", "Spawn Hub", "The central WatterCraft hub with portals, NPCs and the server sign.") +
      card("\u{1F3D0}", "Player Islands", "Your SkyBlock island - expand, automate and show off your build.") +
      card("\u{1F6D2}", "Bazaar District", "Player-driven commodity trading at fair prices.") +
      '</div>';
  return headHTML("PROGRESSION", "World & Watter Levels", "Explore the hub and climb your Watter Level to unlock everything.") +
    '<div class="wc-levels">' + lv + '</div>' + cards + tailHTML("world");
}
function pageStore() {
  var cats = (CFG.store || {}).categories || [];
  if (!cats.length) {
    return headHTML("STORE", "Support WatterCraft", "Store packages are being set up and will appear here soon.") +
      '<div class="wc-cta"><h3>Store coming together</h3><p>Playing is and always will be free. Packages will be listed here once live.</p><button class="btn btn-primary" onclick="wcCopy()">COPY SERVER IP</button></div>' + tailHTML("store");
  }
  var html = headHTML("STORE", "WatterCraft Store", "Store purchases support server hosting and updates.");
  cats.forEach(function (c) {
    var items = (c.items || []).map(function (it) {
      var pr = (it.price == null || it.price === "") ? "" : '<span class="pr">' + esc(String(it.price)) + '</span>';
      return '<div class="wc-item"><span>' + (it.icon ? emo(it.icon) + " " : "") + esc(it.name || "") + '</span>' + pr + '</div>';
    }).join("");
    html += '<div style="margin-top:26px"><h3 style="color:#eaf3ff;margin:0 0 4px">' + emo(c.icon) + " " + esc(c.name || "Category") + '</h3><div class="wc-items">' + items + '</div></div>';
  });
  html += tailHTML("store");
  return html;
}
function pageStaff() {
  var mem = (CFG.staff || {}).members || [];
  var cards = mem.length
    ? mem.map(function (m) { return card(emo(m.icon) || "\u{1F464}", m.name || "Staff", m.role || m.rank || "", m.status || ""); }).join("")
    : card("\u{1F464}", "Staff Team", "The staff list will appear here soon.");
  return headHTML("TEAM", "Meet the Staff", "The people keeping WatterCraft running every day.") +
    '<div class="wc-cards">' + cards + '</div>' +
    '<div class="wc-cta" style="margin-top:24px"><h3>Want to join the team?</h3><p>Active, friendly and helpful? Applications are open.</p><a class="btn btn-primary" href="#/apply">APPLY FOR STAFF</a></div>' +
    tailHTML("staff");
}
function pageApply() {
  var A = CFG.apply || {};
  var reqs = A.requirements || A.rules || [];
  var list = reqs.length ? '<div class="wc-cards">' + reqs.map(function (r, i) {
    if (typeof r === "string") return card("\u2705", "Requirement " + (i + 1), r);
    return card(emo(r.icon), r.title || r.name || "Requirement", r.text || r.desc || r.description || "");
  }).join("") + '</div>' : "";
  var url = A.link || A.url || "";
  var btn = url
    ? '<a class="btn btn-primary" href="' + esc(url) + '" target="_blank" rel="noopener">OPEN APPLICATION</a>'
    : '<a class="btn btn-primary" href="#/discord">APPLY ON DISCORD</a>';
  return headHTML("CAREERS", "Staff Applications", A.title || "Apply to become part of the WatterCraft team.") +
    (A.text ? '<p class="sub" style="max-width:640px">' + esc(A.text) + '</p>' : "") + list +
    '<div class="wc-cta" style="margin-top:24px"><h3>Ready to apply?</h3><p>Fill the application and our team will review it. Please do not ask staff to check your application - wait for a response.</p>' + btn + '</div>' +
    tailHTML("apply");
}
function pageVote() {
  var links = CFG.vote || [];
  var list = links.length
    ? '<div class="wc-cards">' + links.map(function (v) {
        if (typeof v === "string") return '<div class="wc-card"><div class="wc-ic">\u2B50</div><h3>Vote Site</h3><p><a href="' + esc(v) + '" target="_blank" rel="noopener" style="color:#7dd3fc">Open vote link</a></p></div>';
        return '<div class="wc-card"><div class="wc-ic">' + emo(v.icon) + '</div><h3>' + esc(v.name || "Vote Site") + '</h3><p><a href="' + esc(v.url || v.href || "#") + '" target="_blank" rel="noopener" style="color:#7dd3fc">Open vote link</a></p></div>';
      }).join("") + '</div>'
    : '<div class="wc-cta"><h3>Voting rewards</h3><p>Vote links are being connected. Once live, voting will grant in-game rewards and this box will update automatically.</p><button class="btn btn-ghost" onclick="wcCopy()">COPY SERVER IP</button></div>';
  return headHTML("SUPPORT THE SERVER", "Vote for WatterCraft", "Free votes help new players find the server.") + list + tailHTML("vote");
}
function pageSupport() {
  var faq = CFG.faq || [];
  var fq = faq.length ? '<div class="wc-cards">' + faq.map(function (f) { return card("\u2753", f.q || f.title || "Question", f.a || f.text || f.answer || ""); }).join("") + '</div>' : "";
  return headHTML("HELP CENTER", "Support", "Stuck? Here is everything you need.") +
    '<div class="wc-cards">' +
    card("\u{1F3AE}", "How to join", "Open Minecraft Bedrock, add server " + serverIP() + " and press Play.") +
    card("\u{1F6D2}", "Store / purchase issue", "Join Discord and open a support ticket with your receipt.") +
    card("\u{1F465}", "Report a player or bug", "Open a ticket on Discord with screenshots or a clip.") +
    '</div>' + fq +
    '<div class="wc-cta" style="margin-top:24px"><h3>Need a human?</h3><p>Our team answers tickets on Discord every day.</p><a class="btn btn-discord" href="#/discord">JOIN DISCORD</a></div>' +
    tailHTML("support");
}
function pageDiscord() {
  var url = discordURL();
  var inner = url
    ? '<div class="wc-cta"><h3>WatterCraft Community</h3><p>Chat with players, get event announcements, giveaways and instant support.</p><a class="btn btn-discord" href="' + esc(url) + '" target="_blank" rel="noopener">JOIN DISCORD SERVER</a></div>'
    : '<div class="wc-cta"><h3>Invite link not configured</h3><p>Add your invite link to data.js (discord field) or the nav and this button will activate automatically.</p></div>';
  return headHTML("COMMUNITY", "Join our Discord", "Giveaways, updates, support tickets and the whole community.") + inner + tailHTML("discord");
}
function pageRules() {
  var rules = CFG.rules || [];
  var list = rules.length
    ? '<div class="wc-cards">' + rules.map(function (r, i) { return card(emo(r.icon), (i + 1) + ". " + (r.title || "Rule"), r.text || r.desc || r.description || ""); }).join("") + '</div>'
    : '<div class="wc-cta"><h3>Server Rules</h3><p>No cheating, no griefing, respect everyone. The full rule list will appear here soon.</p></div>';
  return headHTML("SERVER POLICY", "Server Rules", "Follow the rules to keep WatterCraft fun for everyone.") + list +
    '<div class="wc-cta" style="margin-top:24px"><h3>Punishment appeal</h3><p>Banned by mistake? Open an appeal ticket on Discord.</p><a class="btn btn-discord" href="#/discord">APPEAL ON DISCORD</a></div>' + tailHTML("rules");
}
function renderOwned() {
  if (!view) return;
  var s = seg();
  if (!OWNED[s]) return;
  var mark = $("#wcOwnedMark");
  if (mark && mark.getAttribute("data-route") === s && view.firstElementChild) return;
  var map = { world: pageWorld, store: pageStore, vote: pageVote, staff: pageStaff, apply: pageApply, support: pageSupport, discord: pageDiscord, rules: pageRules };
  view.innerHTML = map[s]();
  window.scrollTo(0, 0);
}
var PHRASES = [
  "Islands, skills, quests, pets, minions & dungeons - all in one server.",
  "Master skills and climb the Watter Levels.",
  "Trade like a pro on the Bazaar & Auction House.",
  "Raid Dungeons, slay bosses, loot legendary gear.",
  "Grow your island and top the Leaderboards.",
  "24/7 Bedrock SkyBlock - " + serverIP()
];
var OPTIONS = [
  { icon: "\u{1F4CB}", label: "Copy Server IP", onclick: "wcCopy()", hot: true },
  { icon: "\u{1F4AC}", label: "Join Discord", href: "#/discord", hot: true },
  { icon: "\u{1F6D2}", label: "Store", href: "#/store" },
  { icon: "\u2B50", label: "Vote", href: "#/vote" },
  { icon: "\u{1F4D6}", label: "Wiki", href: "#/wiki" },
  { icon: "\u{1F393}", label: "Guides", href: "#/guides" },
  { icon: "\u{1F4F0}", label: "Updates", href: "#/updates" }
];
function chipHTML(o) {
  if (o.href) return '<a class="wc-chip' + (o.hot ? " hot" : "") + '" href="' + o.href + '"><span>' + o.icon + '</span><span>' + o.label + '</span></a>';
  return '<button class="wc-chip' + (o.hot ? " hot" : "") + '" type="button" onclick="' + o.onclick + '"><span>' + o.icon + '</span><span>' + o.label + '</span></button>';
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
function injectHero() {
  if (!isHome() || !view) return;
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
var CATC = { fix: "#4ade80", new: "#22d3ee", announcement: "#a78bfa", maintenance: "#fbbf24", balance: "#fb923c", website: "#38bdf8", event: "#f472b6", important: "#f87171" };
function appendHomeSections() {
  if (!isHome() || !view) return;
  if (!document.getElementById("wcFeatHome") && !view.querySelector(".grid-features")) {
    var feats = CFG.features || [];
    if (feats.length) {
      var div = document.createElement("div");
      div.id = "wcFeatHome";
      div.className = "container";
      div.innerHTML = '<section class="section"><div class="section-head"><span class="kicker">THE NETWORK</span><h2 class="title">One Server. <span class="grad">Endless Systems.</span></h2><p class="sub">Everything connects: islands, skills, collections, pets, minions and a full player economy.</p></div><div class="wc-cards">' +
        feats.map(function (f) { return card(emo(f.icon), f.title || "", f.text || f.desc || ""); }).join("") + '</div></section>';
      view.appendChild(div);
    }
  }
  if (!document.getElementById("wcUpdHome") && !document.getElementById("wcHomeLatest")) {
    var ups = D.updates || [];
    if (ups.length) {
      var top = ups.slice(0, 3).map(function (u) {
        var col = CATC[String(u.cat || "").toLowerCase()] || "#22d3ee";
        return '<div class="wc-upd"><span class="ic">' + emo(u.icon) + '</span><span style="flex:1;min-width:0">' +
          '<small style="color:' + col + ';font-weight:800;letter-spacing:1px">' + esc(u.tag || u.cat || "UPDATE") + '</small>' +
          '<b>' + esc(u.title || "") + '</b>' +
          (u.summary ? '<p>' + esc(u.summary) + '</p>' : '') +
          (u.date ? '<small>' + esc(u.date) + '</small>' : '') + '</span></div>';
      }).join("");
      var div2 = document.createElement("div");
      div2.id = "wcUpdHome";
      div2.className = "container";
      div2.innerHTML = '<section class="section"><div class="section-head"><span class="kicker">NEWS</span><h2 class="title">Latest <span class="grad">Updates</span></h2></div><div class="wc-upds">' + top + '</div><div style="text-align:center;margin-top:14px"><a class="btn btn-ghost" href="#/updates">VIEW ALL UPDATES</a></div></section>';
      view.appendChild(div2);
    }
  }
}
function tick() {
  var s = seg();
  if (OWNED[s]) { renderOwned(); return; }
  if (V25[s]) return;
  if (isHome()) { injectHero(); appendHomeSections(); return; }
  if (view && !view.firstElementChild && !document.getElementById("wcOwnedMark")) {
    view.innerHTML = headHTML("OOPS", "Page not found", "That page does not exist. Use the menu above to navigate.") +
      '<div class="wc-cta" style="margin-bottom:40px"><h3>Lost in the void?</h3><p>The page you tried to open is not available.</p><a class="btn btn-primary" href="#/home">BACK TO HOME</a></div>' + tailHTML("404");
  }
}
window.addEventListener("hashchange", tick);
setInterval(tick, 700);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tick);
else tick();
})();
