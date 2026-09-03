/**
 * WatterCraft V2 — Site Engine
 * Hash router · pixel icons · live status · store checkout · search
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
  var hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  if (hasGSAP) { try { window.gsap.registerPlugin(window.ScrollTrigger); document.documentElement.classList.add("gsap"); } catch (e) {} }

  /* ============================================================
     PIXEL ICON ENGINE (Minecraft-style)
     ============================================================ */
  var PAL = {
    ".": "", W: "#e8eef8", S: "#94a3b8", D: "#0f172a", K: "#1e293b",
    C: "#22d3ee", B: "#3b82f6", E: "#38bdf8", G: "#4ade80", Y: "#fbbf24",
    A: "#f59e0b", O: "#fb923c", R: "#f87171", V: "#a78bfa", P: "#e879f9"
  };
  function px(rows) {
    var out = '<svg class="icon" viewBox="0 0 ' + (rows[0] ? rows[0].length : 12) + " " + rows.length + '" shape-rendering="crispEdges" aria-hidden="true">';
    for (var y = 0; y < rows.length; y++) {
      var line = rows[y];
      for (var x = 0; x < line.length; x++) {
        var c = PAL[line[x]];
        if (c) out += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + c + '"/>';
      }
    }
    return out + "</svg>";
  }
  function vicon(body) {
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  }

  var M = {
    block: ["KKKKKKKKKKKK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KKKKKKKKKKKK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KKKKKKKKKKKK"],
    home: [".....CC.....","....CCCC....","...CCCCCC...","..CCCCCCCC..",".CCCCCCCCCC.","CCCCCCCCCCCC","KKKKKKKKKKKK","KSDDDDDDDDSK","KSDDDDDDDDSK","KSDDDDDDDDSK","KKKKKKKKKKKK"],
    map: ["..KKKKKKKK..",".KSSSSSSSSK.","KSSSSSSSSSSK","KSSSCSSSCSSK","KSKKKKKKKKSK","KSSSSSSSSSSK","KSSSCSSSCSSK","KSKKKKKKKKSK","KSSSSSSSSSSK","KSSCSSSCSSSK",".KKKKKKKKKK."],
    book: ["..KKKKKKKK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KWWWWWWK..","..KKKKKKKK.."],
    crown: ["..C....C....","..CC..CC....","..CCC..CC...","..CCC.CCC...","CCCCCCCCCCCC","YYYYYYYYYYYY","YWWWWWWWWWWY","KKKKKKKKKKKK"],
    bell: ["....YYYY....","...YWWWWY...","..YWWWWWWY..","..YWWWWWWY..","..YWWWWWWY..","..YWWWWWWY..","..YWWWWWWY..","..YYYYYYYY..","...SSSSSS...","..SSSSSSSS.."],
    chest: ["KKKKKKKKKKKK","KYYYYYYYYYYK","KYYYYYYYYYYK","KYYYYYYYYYYK","KYYKYYYYKYYK","KYYKYYYYKYYK","KYYKYYYYKYYK","KYYKYYYYKYYK","KYYKYYYYKYYK","KKKKKKKKKKKK"],
    star: [".....YY.....","....YYYY....","....YYYY....","YYYYYYYYYYYY","..YYYYYYYY..","...YYYYYY...","..YYYYYYYY..",".YYY.YYYY.YY"],
    person: [".....DD.....","....DWWWD...","...DWWWWWD..","...DWWWWWD..","....DWWWD...",".....DD.....","...DDDDDD...","..DWWWWWWDD.",".DWWWWWWWWWD",".DWWWWWWWWWD",".DDDDDDDDDDD"],
    sword: [".......WW...","......SWW...",".....SWW....","....SWW.....","...SWW......","..SWW.......",".SWW........",".YWW........","..YW........","...YY.......","....Y......."],
    pick: ["WW.........","SWW........","SWW........","SWW........","SSWWWWWWW..","..SSSSSSSSS","...........","..........."],
    shield: ["..KKKKKKKK..",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWWWWWWWK.",".KWWSWWWWWK.",".KWWWWWWWWK.","..KKKKKKKK.."],
    gem: [".....CC.....","....CWWC....","...CWWWWC...","..CWWWWWWC..",".CWWWWWWWWC.","CWWWWWWWWWWC",".CWWWWWWWWC.","..CWWWWWWC..","...CWWWWC...","....CWWC....",".....CC....."],
    coin: ["....YYYY....","...YWWWWY...","..YWWWWWWY..",".YWWWWWWWWY.",".YWWKWWKWWY.",".YWWWWWWWWY.",".YWWKWWKWWY.",".YWWWWWWWWY.","..YWWWWWWY..","...YWWWWY...","....YYYY...."],
    skull: ["....SSSS....","..SSWWWWSS..",".SWWKKWWKWS.",".SWWKKWWKWS.",".SWWWWWWWWWS","..SSSSSSSS..","..SKSKKSKS..","..SKSSSSKS..","...SSSSSS..."],
    paw: ["G....G...G..","GG..GGG.GG..",".GGGGGGGGG..","..GGGGGGG...","...GGGGG...."],
    cog: ["....SSSS....","..SSWWWWSS..",".SWWWWWWWWS.","SWWWSSSSWWWS","SWWSWWWWSWWS","SWWSWSSWSWWS","SWWSWSSWSWWS","SWWSWWWWSWWS","SWWWSSSSWWWS",".SWWWWWWWWS.","..SSWWWWSS..","....SSSS...."],
    xp: ["..YYYYYYYY..","..YWWWWWWY..","..YWWWWWWY..","..YWWWWWWY..","..YYYYYYYY..","..GGGGGGGG..","..GWWWWWWG..","..GWWWWWWG..","..GWWWWWWG..","..GGGGGGGG.."],
    grass: ["GGGGGGGGGGGG","GYGGGGGYGGGG","GGGGGGGGGGGG","KKKKKKKKKKKK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KKKKKKKKKKKK"],
    wheat: ["..Y...Y.....","..YY..YY....","..YY..YY....","..Y...Y.....","...GGGG....","...GGGG....","..G.OG.G....","..G..G.G....","...G.G......"],
    tree: ["....GGGG....","...GGGGGG...","...GGGGGG...","..GGGGGGGG..","..GGGGGGGG..","...GGGGGG...","....GGGG....","....BBBB....","....BBBB....","....BBBB....","....BBBB...."],
    portal: ["KKKKKKKKKKKK","KPPKPPPKKPPK","KPPKPKPKKPPK","KPPKKPPKPKPK","KPKPKPPKKPPK","KPPKKPKPKKPK","KPPKPPPKPPKK","KKKKKKKKKKKK"],
    eye: [".....RR.....","...RRRRRR...","..RWWRRRWWR..",".RWRRRRRRRWR.",".RRRRRYYRRRR.",".RRRRYYYYRRR.",".RWRRRRRRRWR.","..RWWRRRWWR..","...RRRRRR...",".....RR....."],
    bug: ["....SSSS....","...SWWWWS...","..SWWWWWWS..","SSSSSSSSSSSS","SWWSWWWWSWWS","SSSSSSSSSSSS","SWWSWWWWSWWS","SSSSSSSSSSSS","..SWWWWWWS..","...SSSSSS...","..SS....SS..","..S......S.."]
  };
  M.island = M.grass;
  M.compass = M.star;
  M.help = M.book;
  M.gavel = M.chest;
  M.emerald = M.gem;

  var V = {
    search: vicon('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
    copy: vicon('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    check: vicon('<path d="M20 6L9 17l-5-5"/>'),
    close: vicon('<path d="M18 6L6 18M6 6l12 12"/>'),
    play: vicon('<polygon points="6 3 22 12 6 21 6 3"/>'),
    plus: vicon('<path d="M12 5v14M5 12h14"/>'),
    chevR: vicon('<path d="M9 18l6-6-6-6"/>'),
    ext: vicon('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/>'),
    discord: vicon('<path d="M18 9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h1.5l2 2.5L10 21h4a4 4 0 0 0 4-4z"/>'),
    gearUi: vicon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>')
  };
  function icon(name, cls) {
    var svg = (M[name] && px(M[name])) || (V[name] && V[name]) || px(M.block);
    if (cls) { svg = svg.replace("<svg", '<svg class="' + cls + '"'); }
    return svg;
  }

  /* ============================================================
     HELPERS
     ============================================================ */
  var toastEl = $("#toast"), toastTimer = null;
  function toast(msg, isErr) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.className = "toast show" + (isErr ? " err" : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.className = "toast"; }, 3200);
  }
  function copyText(txt, okMsg) {
    var done = function () { toast(okMsg || "Copied to clipboard"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt); done(); });
    } else { fallbackCopy(txt); done(); }
  }
  function fallbackCopy(txt) {
    var ta = document.createElement("textarea");
    ta.value = txt; ta.style.cssText = "position:fixed;opacity:0;";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
  function sectionHead(kicker, title, sub) {
    var t = esc(title);
    t = t.replace(/\^(.+?)\^/g, '<span class="grad">$1</span>');
    return '<div class="section-head" data-reveal>' +
      (kicker ? '<span class="kicker">' + esc(kicker) + "</span>" : "") +
      '<h2 class="title">' + t + "</h2>" +
      (sub ? '<p class="sub">' + esc(sub) + "</p>" : "") + "</div>";
  }
  function openModal(id) { var m = $("#" + id); if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; } }
  function closeModal(id) { var m = $("#" + id); if (m) { m.classList.remove("open"); document.body.style.overflow = ""; } }
  function closeAllModals() { $$(".modal.open").forEach(function (m) { m.classList.remove("open"); }); document.body.style.overflow = ""; }

  /* ============================================================
     NAV + DRAWER + FOOTER
     ============================================================ */
  var NAV = CFG.nav || [];
  function buildNav() {
    var host = $("#navLinks"), draw = $("#drawerLinks");
    if (!host || !NAV.length) return;
    var items = NAV.map(function (n) {
      return '<a href="#/' + n.id + '" data-nav="' + n.id + '"' + (n.cta ? ' class="nav-cta"' : "") + ">" +
        icon(n.icon, "icon") + '<span class="lbl">' + esc(n.label) + "</span></a>";
    }).join("");
    host.innerHTML = items;
    if (draw) {
      var dItems = NAV.map(function (n) {
        return '<a href="#/' + n.id + '" data-nav="' + n.id + '">' + icon(n.icon, "icon") + esc(n.label) + "</a>";
      }).join("");
      draw.innerHTML = dItems + '<a class="btn btn-primary btn-block mt-2" href="#/store">Open Store</a>';
    }
  }
  function setActiveNav(id) {
    $$("#navLinks a, #drawerLinks a").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-nav") === id);
    });
  }
  function buildFooter() {
    var F = CFG.footer || {}, box = $("#footerBox"), note = $("#footNote");
    if (!box) return;
    var links = (F.links || []).map(function (l) { return '<a href="' + esc(l.href) + '">' + esc(l.label) + "</a>"; }).join("");
    box.innerHTML =
      '<div class="foot-brand">' +
        '<a class="logo" href="#/home"><span class="logo-mark">W</span><span class="logo-name">Watter<em>Craft</em></span></a>' +
        '<p class="foot-tag">' + esc((CFG.meta || {}).slogan || "BUILD. PROGRESS. CONQUER.") + "</p>" +
        '<p class="muted" style="font-size:.9rem;max-width:420px;">' + esc((CFG.meta || {}).description || "") + "</p>" +
      "</div>" +
      '<nav class="foot-links" aria-label="Footer">' + links + "</nav>";
    if (note) note.textContent = (F.note || "") + " · play.wattercraft.fun:19132";
  }

  /* ============================================================
     LIVE SERVER STATUS (mcsrvstat — never fabricated)
     ============================================================ */
  var pill = $("#serverStatus");
  function setPill(state, txt) {
    if (!pill) return;
    pill.className = "status-pill " + state;
    pill.innerHTML = '<span class="status-dot"></span><span class="txt">' + esc(txt) + "</span>";
  }
  function fetchStatus() {
    if (!pill) { return; }
    var S = CFG.server || {}, host = S.statusHost, port = S.port || 19132;
    if (!host) { setPill("", "Status unavailable"); return; }
    setPill("", "Checking…");
    var url = "https://api.mcsrvstat.us/bedrock/2/" + encodeURIComponent(host + ":" + port);
    var ctrl = (typeof AbortController !== "undefined") ? new AbortController() : null;
    var opt = { method: "GET" };
    if (ctrl) { opt.signal = ctrl.signal; setTimeout(function () { ctrl.abort(); }, 8000); }
    fetch(url, opt).then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.online) {
        var p = (d.players && d.players.online != null) ? d.players.online + " online" : "Online";
        var ver = (d.version && d.version.length) ? d.version[0] : "";
        setPill("online", p + (ver ? " · " + ver : ""));
      } else { setPill("offline", "Offline"); }
    }).catch(function () { setPill("offline", "Unavailable"); });
  }
  window.copyIP = function () {
    var S = CFG.server || {};
    copyText((S.ip || "play.wattercraft.fun") + (S.port ? ":" + S.port : ""), "Server IP copied!");
  };

  /* ============================================================
     SEARCH
     ============================================================ */
  function buildIndex() {
    var idx = [];
    NAV.forEach(function (n) { idx.push({ t: n.label, s: "Page", h: "#/" + n.id, ic: n.icon }); });
    (CFG.features || []).forEach(function (f) { idx.push({ t: f.title, s: "Feature", h: "#/home", ic: f.icon }); });
    (CFG.worldAreas || []).forEach(function (w) { idx.push({ t: w.name, s: "World", h: "#/world", ic: w.icon }); });
    (CFG.store && CFG.store.categories || []).forEach(function (c) {
      (c.items || []).forEach(function (it) { idx.push({ t: it.name, s: "Store · " + c.name, h: "#/store", ic: c.icon }); });
    });
    (CFG.staff && CFG.staff.members || []).forEach(function (m) { idx.push({ t: m.name, s: "Staff", h: "#/staff", ic: "person" }); });
    (CFG.rules || []).forEach(function (r) { idx.push({ t: r.title, s: "Rule", h: "#/rules", ic: r.icon }); });
    return idx;
  }
  var SEARCH_IDX = buildIndex();
  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) return "";
    var res = SEARCH_IDX.filter(function (i) { return (i.t + " " + i.s).toLowerCase().indexOf(q) !== -1; }).slice(0, 9);
    if (!res.length) return '<p class="muted center mt-2">No results</p>';
    return res.map(function (i) {
      return '<a class="search-item" href="' + i.h + '">' + icon(i.ic, "icon") +
        '<span><span class="si-title">' + esc(i.t) + '</span><span class="si-sub"> · ' + esc(i.s) + "</span></span></a>";
    }).join("");
  }

  /* ============================================================
     VIEW RENDERERS
     ============================================================ */
  var view = $("#view");

  function pageHome() {
    var H = CFG.hero || {}, S = CFG.server || {}, META = CFG.meta || {};
    var bg = H.background ? ' style="background-image:url(\'' + esc(H.background) + "')" : "";
    var title = (H.title && H.title.length) ? H.title.map(function (t, i) {
      return '<span class="' + (i ? "l2" : "l1") + '">' + esc(t) + "</span>";
    }).join("") : esc(META.name || "WatterCraft");
    return "" +
    '<section class="hero" id="homeHero">' +
      '<div class="hero-bg" data-bg="' + esc(H.background || "") + '"></div>' +
      '<div class="hero-veil"></div>' +
      '<div class="hero-inner">' +
        '<span class="hero-kicker">' + esc(H.kicker || "BEDROCK SKYBLOCK") + "</span>" +
        '<h1 class="hero-title">' + title + "</h1>" +
        '<p class="hero-tagline">' + esc(H.tagline || "BUILD. PROGRESS. CONQUER.") + "</p>" +
        (H.sub ? '<p class="hero-sub">' + esc(H.sub) + "</p>" : "") +
        '<div class="hero-actions">' +
          '<button class="btn btn-primary" onclick="copyIP()">' + V.play + " " + esc((H.primary && H.primary.label) || "PLAY NOW") + "</button>" +
          '<a class="btn btn-discord" href="#/discord">' + V.discord + " " + esc((H.secondary && H.secondary.label) || "JOIN DISCORD") + "</a>" +
        "</div>" +
        '<div class="server-panel" data-reveal>' +
          '<div class="cell"><div class="k">Server IP</div><div class="v"><span class="copy-ip" onclick="copyIP()">' + esc(S.ip || "play.wattercraft.fun") + V.copy + "</span></div></div>" +
          '<div class="cell"><div class="k">Port</div><div class="v mono">' + esc(S.port || 19132) + "</div></div>" +
          '<div class="cell"><div class="k">Platform</div><div class="v">' + esc(S.platform || "Bedrock") + "</div></div>" +
          '<div class="cell"><div class="k">Players</div><div class="v" id="livePlayers">Loading…</div></div>" +
        "</div>" +
      "</div>" +
    "</section>" +
    '<div class="container">' +
      '<section class="section" id="features">' +
        sectionHead("The Network", "One Server. ^Endless Systems.^", "Everything connects: islands, skills, collections, pets, minions and a full player economy.") +
        '<div class="grid-features" data-stagger>' +
          (CFG.features || []).map(function (f) {
            return '<article class="glass liquid shine feature-card card" data-reveal>' +
              '<div class="feature-icon">' + icon(f.icon) + "</div>" +
              "<h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p>" +
              '<span class="watermark" style="color:var(--cyan)">' + icon(f.icon) + "</span></article>";
          }).join("") +
        "</div>" +
      "</section>" +
    "</div>";
  }

  function pageWorld() {
    var areas = CFG.worldAreas || [];
    var path = areas.map(function (a, i) {
      return '<div class="path-node">' + icon(a.icon) + esc(a.name) + "</div>" +
        (i < areas.length - 1 ? '<span class="path-arrow">›</span>' : "");
    }).join("");
    var cards = areas.map(function (a) {
      var locked = a.unlock && a.unlock !== "Open" && String(a.unlock).indexOf("COMING") !== -1;
      return '<article class="glass area-card card" data-reveal>' +
        '<div class="area-head">' + icon(a.icon) +
          "<h3>" + esc(a.name) + "</h3>" +
          '<span class="area-tag' + (locked ? " locked" : "") + '">' + esc(a.unlock === "Open" ? "OPEN" : a.unlock) + "</span></div>" +
        "<p>" + esc(a.text) + "</p>" +
        '<div class="area-meta">' +
          '<span><b>Watter Level</b>' + esc(a.level == null ? "COMING SOON" : "Level " + a.level) + "</span>" +
          '<span><b>Gear</b>' + esc(a.gear || "—") + "</span>" +
          '<span><b>Mobs</b>' + esc((a.mobs && a.mobs.length ? a.mobs.join(", ") : "—")) + "</span>" +
          '<span><b>Resources</b>' + esc((a.resources && a.resources.length ? a.resources.join(", ") : "—")) + "</span>" +
        "</div></article>";
    }).join("");
    var L = CFG.watterLevels || { steps: [] };
    var lvls = (L.steps || []).map(function (s) {
      return '<div class="lvl-node' + (s.level === "∞" ? " end" : "") + '" data-reveal>' +
        '<div class="lvl-orb">' + esc(String(s.level)) + "</div>" +
        '<div class="lvl-label">' + esc(s.label) + "</div>" +
        '<div class="lvl-desc">' + esc(s.text) + "</div></div>";
    }).join("");
    return '<div class="container">' +
      '<section class="section" style="padding-top:0">' +
        sectionHead("World", "Explore the ^World^", "Every area is a step in your progression. Requirements are shown when officially set.") +
        '<div class="world-path" data-reveal>' + path + "</div>" +
        '<div class="grid-areas">' + cards + "</div>" +
      "</section>" +
      '<section class="section">' +
        sectionHead("Progression", "Watter ^Levels^", (L.note || "")) +
        '<div class="levels-wrap" data-reveal><div class="levels-timeline">' + lvls + "</div></div>" +
      "</section></div>";
  }

  function pageStore() {
    var ST = CFG.store || {};
    var cats = (ST.categories || []).map(function (c) {
      var items = (c.items || []).map(function (it) {
        var price = it.price > 0
          ? '<div class="pkg-meta"><span class="pkg-price">' + (ST.currency || "₹") + esc(it.price) + '</span>' +
            (it.usd ? '<span class="pkg-usd">' + esc(it.usd) + "</span>" : "") +
            (it.gems ? '<span class="pkg-chip">◆ ' + esc(it.gems) + " Gems</span>" : "") +
            (it.duration ? '<span class="pkg-dur">' + esc(it.duration) + "</span>" : "") + "</div>"
          : '<div class="pkg-meta"><span class="price-soon">Price — Coming Soon</span></div>';
        var feat = (it.features && it.features.length)
          ? '<div class="perk-group"><h4>Features</h4><ul class="perk-list">' +
            it.features.map(function (p) { return "<li>" + V.check + esc(p) + "</li>"; }).join("") + "</ul></div>" : "";
        var bonus = (it.bonus && it.bonus.length)
          ? '<div class="perk-group"><h4>Bonus</h4><ul class="perk-list">' +
            it.bonus.map(function (p) { return "<li>" + V.check + esc(p) + "</li>"; }).join("") + "</ul></div>" : "";
        var badge = it.badge ? '<span class="pkg-badge">' + esc(it.badge) + "</span>" : "";
        return '<article class="glass liquid pkg-card card" data-reveal>' +
          '<div class="pkg-top" style="border-top:3px solid ' + esc(it.color || "#22d3ee") + '">' +
            badge +
            '<div class="pkg-name" style="color:' + esc(it.color || "#fff") + '">' + esc(it.name) + "</div>" +
            price +
          "</div>" +
          '<div class="pkg-body">' + feat + bonus + "</div>" +
          '<div class="pkg-footer">' +
            (it.price > 0
              ? '<button class="btn btn-primary btn-block" data-buy="' + esc(it.id) + '">Buy ' + esc(it.name) + "</button>"
              : '<button class="btn btn-ghost btn-block" disabled>Coming Soon</button>') +
          "</div></article>";
      }).join("");
      return '<section class="store-cat"><div class="store-cat-head">' + icon(c.icon) +
        "<h2>" + esc(c.name) + "</h2>" +
        (c.id === "gems" && ST.gemRate ? '<span class="gem-note">' + esc(ST.gemRate) + "</span>" : "") + "</div>" +
        '<div class="grid-store">' + items + "</div></section>";
    }).join("");
    return '<div class="container">' +
      '<section class="section" style="padding-top:0">' +
        sectionHead("Store", "Support the ^Server^", ST.redeemNote || "") +
        cats +
        '<p class="muted center mt-3" style="font-size:.85rem">' +
          esc(ST.redeemNote ? "Payments are verified before delivery. Never claim success without confirmation." : "") + "</p>" +
      "</section></div>";
  }

  function pageStaff() {
    var ST = CFG.staff || {};
    var byRank = {};
    (ST.members || []).forEach(function (m) { (byRank[m.rank] = byRank[m.rank] || []).push(m); });
    var groups = (ST.ranks || []).map(function (rk) {
      var list = byRank[rk.id] || [];
      var cards = list.map(function (m) {
        return '<article class="glass staff-card card" data-reveal>' +
          '<div class="staff-avatar" style="color:' + esc(rk.color) + ";border-color:" + esc(rk.color) + "55" + '">' + esc(m.name.charAt(0).toUpperCase()) + "</div>" +
          '<div><div class="staff-name">' + esc(m.name) + '</div>' +
          '<div class="staff-role" style="color:' + esc(rk.color) + '">' + esc(rk.name) + "</div>" +
          (m.discord ? '<div class="staff-disc">' + esc(m.discord) + "</div>" : "") + "</div></article>";
      }).join("");
      if (!list.length) {
        cards = '<a class="staff-open" href="#/discord" data-reveal>' + V.plus + "Open Position</a>";
      }
      return '<div class="rank-group" data-reveal>' +
        '<div class="rank-head"><span class="rank-dot" style="background:' + esc(rk.color) + ";color:" + esc(rk.color) + '"></span>' +
        "<h3>" + esc(rk.name) + "</h3>" +
        '<span class="rank-count">' + (list.length ? list.length + " member" + (list.length > 1 ? "s" : "") : "apply on Discord") + "</span></div>" +
        '<div class="grid-staff">' + cards + "</div></div>";
    }).join("");
    return '<div class="container"><section class="section" style="padding-top:0">' +
      sectionHead("Team", "Meet the ^Staff^", ST.note || "") +
      groups + "</section></div>";
  }

  function pageVote() {
    var V2 = CFG.vote || {};
    var sites = (V2.sites || []).map(function (s) {
      return '<a class="glass vote-btn card" href="' + esc(s.url) + '" target="_blank" rel="noopener" data-reveal>' +
        icon("star") + '<span><span class="vb-name">' + esc(s.name) + '</span><span class="vb-sub">' + esc(V2.rewardNote || "Vote on this site") + "</span></span>" +
        '<span class="go">' + V.ext + "</span></a>";
    }).join("");
    return '<div class="container"><section class="section" style="padding-top:0">' +
      '<div class="glass vote-hero" data-reveal>' +
        "<h2>" + esc(V2.title || "VOTE FOR WATTERCRAFT") + "</h2>" +
        "<p>" + esc(V2.text || "") + "</p>" +
        '<div class="grid-vote">' + sites + "</div>" +
      "</div></section></div>";
  }

  function pageRules() {
    var cards = (CFG.rules || []).map(function (r) {
      return '<article class="glass rule-card card" data-reveal>' + icon(r.icon) +
        "<div><h3>" + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div></article>";
    }).join("");
    return '<div class="container"><section class="section" style="padding-top:0">' +
      sectionHead("Rules", "Server ^Guidelines^", "Fair play keeps the network healthy. Punishment appeals are handled privately on Discord.") +
      '<div class="grid-rules">' + cards + "</div></section></div>";
  }

  function pageUpdates() {
    var list = CFG.updates || [];
    var inner;
    if (!list.length) {
      inner = '<div class="empty-state" data-reveal>' + icon("bell") +
        "<h3>No updates yet</h3><p>Changelog entries will appear here once published.</p></div>";
    } else {
      inner = '<div class="update-list">' + list.map(function (u) {
        return '<article class="glass update-card card" data-reveal>' +
          '<div class="update-top"><span class="update-tag">' + esc(u.tag || "Update") + "</span>" +
          '<span class="update-date">' + esc(u.date || "") + "</span></div>" +
          "<h3>" + esc(u.title) + "</h3><p>" + esc(u.summary || u.description || "") + "</p></article>";
      }).join("") + "</div>";
    }
    return '<div class="container"><section class="section" style="padding-top:0">' +
      sectionHead("Updates", "Latest ^News^", "") + inner + "</section></div>";
  }

  function pageSupport() {
    var SU = CFG.support || {};
    var cards = (SU.items || []).map(function (s) {
      return '<article class="glass support-card card" data-reveal>' + icon(s.icon) +
        "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></article>";
    }).join("");
    return '<div class="container"><section class="section" style="padding-top:0">' +
      sectionHead("Support", "How can we ^help?^", SU.text || "") +
      '<div class="grid-support">' + cards + "</div>" +
      '<div class="center mt-3" data-reveal><a class="btn btn-discord" href="#/discord">' + V.discord + " Contact Support on Discord</a></div>" +
      "</section></div>";
  }

  function pageDiscord() {
    var S = CFG.server || {};
    var url = S.discord || "#/discord";
    return '<div class="container"><section class="section" style="padding-top:0">' +
      '<div class="glass vote-hero" data-reveal>' +
        '<div style="width:64px;height:64px;margin:0 auto 18px;border-radius:16px;display:grid;place-items:center;background:#5865f2;color:#fff">' +
          '<svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.2a18 18 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5A20.4 20.4 0 0 0 .2 18.1a19.9 19.9 0 0 0 6 3l1.3-2a13 13 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12 0l.5.4a13 13 0 0 1-2 1l1.3 2a19.9 19.9 0 0 0 6-3A20.4 20.4 0 0 0 24.2 7.4a19.6 19.6 0 0 0-3.9-3zM8.7 15.3c-1 0-1.9-.9-1.9-2s.8-2 1.9-2 2 .9 1.9 2-.9 2-1.9 2zm6.6 0c-1 0-1.9-.9-1.9-2s.8-2 1.9-2 2 .9 1.9 2-.9 2-1.9 2z"/></svg></div>' +
        "<h2>JOIN THE WATTERCRAFT COMMUNITY</h2>" +
        "<p>Giveaways, staff help, appeals, reports and community events — all in one place.</p>" +
        '<div class="hero-actions" style="justify-content:center">' +
          '<a class="btn btn-discord" href="' + esc(url) + '" target="_blank" rel="noopener">' + V.discord + " Join Discord</a></div>" +
      "</div></section></div>";
  }

  function pageComingSoon(name) {
    return '<div class="container"><section class="section" style="padding-top:0">' +
      sectionHead(esc(name), esc(name) + " — ^Coming Soon^", "This section is being built. Content will be added here next.") +
      '<div class="empty-state" data-reveal>' + icon("book") +
        "<p>Frontend-ready structure. Content arrives in the next update.</p></div>" +
      "</section></div>";
  }

  /* ============================================================
     BUY MODAL (store)
     ============================================================ */
  var lastPkg = null;
  function findPkg(id) {
    var cats = (CFG.store && CFG.store.categories) || [];
    for (var i = 0; i < cats.length; i++) {
      var c = cats[i];
      for (var j = 0; j < (c.items || []).length; j++) {
        if (c.items[j].id === id) { return { cat: c, pkg: c.items[j] }; }
      }
    }
    return null;
  }
  function openBuy(id) {
    var found = findPkg(id);
    if (!found) return;
    lastPkg = found.pkg;
    var p = found.pkg, ST = CFG.store || {}, box = $("#buyBox");
    if (!box) return;
    var price = p.price > 0 ? (ST.currency || "₹") + p.price + (p.usd ? ' <span style="font-size:.8rem;color:var(--muted)">' + esc(p.usd) + "</span>" : "") : "Coming Soon";
    var gems = p.gems ? '<span class="pkg-chip">◆ ' + esc(p.gems) + " Gems</span>" : "";
    var perks = (p.features || []).map(function (x) { return "<li>" + V.check + esc(x) + "</li>"; }).join("");
    var bonus = (p.bonus || []).map(function (x) { return "<li>" + V.check + esc(x) + "</li>"; }).join("");
    box.innerHTML =
      '<button class="modal-close" type="button" data-close-modal="buyModal" aria-label="Close">&times;</button>' +
      '<div class="buy-head" style="border-top:4px solid ' + esc(p.color || "#22d3ee") + '">' +
        '<div class="buy-name" id="buyTitle" style="color:' + esc(p.color || "#fff") + '">' + esc(p.name) + "</div>" +
        '<div class="buy-price-row" style="font-size:1.5rem;font-weight:800;font-family:var(--font-display)">' + price + " " + gems + "</div>" +
        (p.duration ? '<span class="pkg-dur" style="margin-top:6px;display:inline-block">' + esc(p.duration) + "</span>" : "") +
      "</div>" +
      '<div class="buy-body">' +
        (perks ? '<div class="perk-group mb-2"><h4>Features</h4><ul class="perk-list">' + perks + "</ul></div>" : "") +
        (bonus ? '<div class="perk-group mb-2"><h4>Bonus</h4><ul class="perk-list">' + bonus + "</ul></div>" : "") +
        '<div class="form-row"><label for="buyIg">Minecraft username (optional)</label>' +
        '<input class="field" id="buyIg" placeholder="Your in-game name" autocomplete="off" /></div>' +
        '<div class="form-row"><label>Payment method</label><div class="methods">' +
          ["GPay", "PhonePe", "Paytm"].map(function (m, i) {
            return '<button type="button" class="method' + (i === 0 ? " sel" : "") + '" data-method="' + m + '">' + m + "</button>";
          }).join("") +
        "</div></div>" +
        (p.price > 0
          ? '<button class="btn btn-primary btn-block" id="payBtn">Pay via UPI</button>'
          : '<button class="btn btn-ghost btn-block" disabled>Price not set</button>') +
        '<p class="modal-note">' + esc(ST.redeemNote || "After purchase you receive a unique code. Redeem in-game with /redeem <code>.") + "</p>" +
      "</div>";
    openModal("buyModal");
  }
  function bindBuyEvents() {
    $$("#buyBox [data-method]").forEach(function (b) {
      b.addEventListener("click", function () {
        $$("#buyBox .method").forEach(function (m) { m.classList.remove("sel"); });
        b.classList.add("sel");
      });
    });
    var pay = $("#payBtn");
    if (pay) {
      pay.addEventListener("click", function () {
        var ST = CFG.store || {};
        if (!ST.api) {
          closeModal("buyModal");
          toast("Store payments not configured yet — join Discord to buy manually", true);
          return;
        }
        var method = ($("#buyBox .method.sel") || {}).getAttribute ? $("#buyBox .method.sel").getAttribute("data-method") : "UPI";
        var ig = ($("#buyIg") || {}).value ? $("#buyIg").value.trim() : "";
        var payload = { packageId: lastPkg && lastPkg.id, method: method, username: ig, amount: lastPkg && lastPkg.price };
        fetch(ST.api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            closeModal("buyModal");
            if (d && d.url) { window.open(d.url, "_blank"); }
            toast(d && d.message ? d.message : "Redirecting to payment…");
          })
          .catch(function () { toast("Payment service unreachable. Try again.", true); });
      });
    }
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  var ROUTES = {
    home: pageHome, world: pageWorld, store: pageStore, staff: pageStaff,
    vote: pageVote, rules: pageRules, updates: pageUpdates,
    support: pageSupport, discord: pageDiscord,
    wiki: function () { return pageComingSoon("Wiki"); },
    guides: function () { return pageComingSoon("Guides"); },
    leaderboards: function () { return pageComingSoon("Leaderboards"); }
  };
  function currentRoute() {
    var h = location.hash.replace(/^#\/?/, "").split("/")[0] || "home";
    return ROUTES[h] ? h : "home";
  }
  function render() {
    var route = currentRoute();
    var fn = ROUTES[route] || pageHome;
    view.innerHTML = fn();
    setActiveNav(route);
    document.title = ((CFG.meta || {}).title || "WatterCraft") + (route !== "home" ? " · " + route : "");
    closeAllModals();
    var d = $("#drawer"); if (d) d.classList.remove("open");
    var b = $("#burger"); if (b) { b.classList.remove("open"); b.setAttribute("aria-expanded", "false"); }
    window.scrollTo(0, 0);
    afterRender();
  }
  function afterRender() {
    loadHeroBg();
    bindViewEvents();
    initReveal();
    refreshLivePlayers();
  }
  function loadHeroBg() {
    var el = $("#homeHero .hero-bg");
    if (!el) return;
    var url = el.getAttribute("data-bg");
    if (!url) { el.style.background = "radial-gradient(1000px 600px at 75% 20%, rgba(34,211,238,.12), transparent 60%), radial-gradient(800px 500px at 10% 80%, rgba(37,99,235,.14), transparent 55%), var(--bg-2)"; return; }
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = "url('" + url + "')"; };
    img.onerror = function () { el.style.background = "radial-gradient(1000px 600px at 75% 20%, rgba(34,211,238,.12), transparent 60%), radial-gradient(800px 500px at 10% 80%, rgba(37,99,235,.14), transparent 55%), var(--bg-2)"; };
    img.src = url;
  }
  function refreshLivePlayers() {
    var cell = $("#livePlayers");
    if (!cell) return;
    var S = CFG.server || {};
    if (!S.statusHost) { cell.textContent = "Unavailable"; return; }
    var url = "https://api.mcsrvstat.us/bedrock/2/" + encodeURIComponent(S.statusHost + ":" + (S.port || 19132));
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      cell.textContent = (d && d.online && d.players && d.players.online != null) ? d.players.online + " online" : "Offline";
    }).catch(function () { cell.textContent = "Unavailable"; });
  }
  function bindViewEvents() {
    $$("#view [data-buy]").forEach(function (b) {
      b.addEventListener("click", function () { openBuy(b.getAttribute("data-buy")); });
    });
    $$("#view a[href^='#/']").forEach(function (a) {
      a.addEventListener("click", function () {
        var d = $("#drawer"); if (d) d.classList.remove("open");
        var bg = $("#burger"); if (bg) { bg.classList.remove("open"); bg.setAttribute("aria-expanded", "false"); }
      });
    });
    bindBuyEvents();
  }

  /* ============================================================
     REVEAL ANIMATIONS (IntersectionObserver / GSAP)
     ============================================================ */
  var io = null;
  function initReveal() {
    if (reduceMotion) { $$("[data-reveal],[data-stagger]").forEach(function (el) { el.classList.add("in"); }); return; }
    if (hasGSAP && window.gsap && window.ScrollTrigger) {
      try {
        window.gsap.utils.toArray("[data-reveal]").forEach(function (el) {
          window.gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        });
        return;
      } catch (e) {}
    }
    if (!("IntersectionObserver" in window)) { $$("[data-reveal]").forEach(function (el) { el.classList.add("in"); }); return; }
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$("[data-reveal], [data-stagger]").forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     PARTICLE BACKGROUND
     ============================================================ */
  function spawnParticles() {
    var field = $("#pixelField");
    if (!field || reduceMotion) return;
    var n = window.innerWidth < 720 ? 16 : 30;
    for (var i = 0; i < n; i++) {
      var s = document.createElement("i");
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDuration = (Math.random() * 14 + 10) + "s";
      s.style.animationDelay = -(Math.random() * 18) + "s";
      s.style.opacity = "0";
      field.appendChild(s);
    }
  }

  /* ============================================================
     NAV / DRAWER / MODAL / SEARCH BINDINGS
     ============================================================ */
  function bindChrome() {
    var burger = $("#burger"), drawer = $("#drawer");
    if (burger && drawer) {
      burger.addEventListener("click", function () {
        var open = drawer.classList.toggle("open");
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", String(open));
        drawer.setAttribute("aria-hidden", String(!open));
      });
      $$("[data-close-drawer]").forEach(function (el) {
        el.addEventListener("click", function () { drawer.classList.remove("open"); burger.classList.remove("open"); });
      });
    }
    $$("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", function () { closeModal(el.getAttribute("data-close-modal")); });
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllModals();
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); openSearch(); }
    });
    var sOpen = $("#searchOpen");
    if (sOpen) sOpen.addEventListener("click", openSearch);
    var sInput = $("#searchInput"), sRes = $("#searchResults");
    if (sInput) {
      sInput.addEventListener("input", function () { if (sRes) sRes.innerHTML = runSearch(sInput.value); });
      sInput.addEventListener("keydown", function (e) { if (e.key === "Enter" && sRes) { var f = $(".search-item", sRes); if (f) f.click(); } });
    }
    document.addEventListener("click", function (e) {
      var r = e.target.closest ? e.target.closest(".search-item") : null;
      if (r) { closeModal("searchModal"); setTimeout(function () { if (sInput) sInput.value = ""; if (sRes) sRes.innerHTML = ""; }, 120); }
    });
    window.addEventListener("scroll", function () {
      var nav = $("#topNav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
    }, { passive: true });
    window.addEventListener("hashchange", render);
  }
  function openSearch() {
    openModal("searchModal");
    setTimeout(function () { var i = $("#searchInput"); if (i) { i.value = ""; i.focus(); } var r = $("#searchResults"); if (r) r.innerHTML = ""; }, 60);
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    buildNav();
    buildFooter();
    bindChrome();
    spawnParticles();
    fetchStatus();
    setInterval(fetchStatus, 60000);
    render();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }

  window.closeBuy = function () { closeModal("buyModal"); };
  window.openSearch = openSearch;
})();
