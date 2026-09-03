/**
 * WatterCraft — Visual Enhancements Pack
 * Animated Minecraft pixel icons everywhere, liquid-glass cards,
 * scroll progress bar and back-to-top. Fully additive, no dependencies.
 * Tip: add data-mc-icon="skull" (diamond|emerald|sword|pickaxe|shield|
 * skull|heart|chest|book|person|lightning|star|goldIngot|crown)
 * to any element to give it a specific icon.
 */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- tiny pixel-art renderer ---------------- */
  function px(def) {
    var rows = def.g, cols = rows[0].length, pal = def.p, r = "";
    for (var y = 0; y < rows.length; y++) {
      var line = rows[y];
      for (var x = 0; x < line.length; x++) {
        var c = line[x];
        if (c === "." || !pal[c]) continue;
        r += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + pal[c] + '"/>';
      }
    }
    return '<svg class="mc-svg" viewBox="0 0 ' + cols + " " + rows.length +
      '" aria-hidden="true" focusable="false">' + r + "</svg>";
  }

  function gem(tl, tr, bl, br) {
    return '<svg class="mc-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M12 2 L3 9 L12 10 Z" fill="' + tl + '"/>' +
      '<path d="M12 2 L12 10 L21 9 Z" fill="' + tr + '"/>' +
      '<path d="M3 9 L12 10 L12 22 Z" fill="' + bl + '"/>' +
      '<path d="M12 10 L21 9 L12 22 Z" fill="' + br + '"/></svg>';
  }

  /* ---------------- icon library ---------------- */
  var I = {};
  I.diamond = gem("#cffafe", "#22d3ee", "#0891b2", "#155e75");
  I.emerald = gem("#d1fae5", "#34d399", "#059669", "#064e3b");

  I.sword = px({ g: [
    ".....ss.....",
    ".....as.....",
    ".....as.....",
    ".....as.....",
    ".....as.....",
    ".....as.....",
    "....SSSS....",
    ".....nn.....",
    ".....nn.....",
    ".....nn.....",
    ".....ww....."
  ], p: { a: "#e2e8f0", s: "#94a3b8", S: "#334155", n: "#b45309", w: "#78350f" } });

  I.pickaxe = px({ g: [
    "...hhhhhh...",
    "..HHHHHHHH..",
    "..H......H..",
    ".....n......",
    "....w.......",
    "...n........",
    "..w.........",
    ".n..........",
    "w..........."
  ], p: { h: "#cbd5e1", H: "#64748b", n: "#b45309", w: "#78350f" } });

  I.shield = px({ g: [
    "....cccc....",
    "..cccccccc..",
    ".cccccccccc.",
    ".ccccwwcccc.",
    ".ccccwwcccc.",
    ".ccccwwcccc.",
    "..cccwwccc..",
    "...cccccc...",
    "....cccc....",
    ".....cc....."
  ], p: { c: "#7dd3fc", w: "#ffffff" } });

  I.skull = px({ g: [
    "....bbbb....",
    "..bbbbbbbb..",
    ".bbbbbbbbbb.",
    ".bbkkbbbkkb.",
    ".bbkkbbbkkb.",
    ".bbbbbbbbbb.",
    ".bbbbbbbbbb.",
    "..bbbbbbbb..",
    "...bbbbbb...",
    "....bbbb...."
  ], p: { b: "#e2e8f0", k: "#0f172a" } });

  I.heart = px({ g: [
    "..rr....rr..",
    "rrrrrrrrrrrr",
    "rrrrrrrrrrrr",
    "rrrrrrrrrrrr",
    ".rrrrrrrrrr.",
    "..rrrrrrrr..",
    "...rrrrrr...",
    "....rrrr....",
    ".....rr....."
  ], p: { r: "#ef4444" } });

  I.chest = px({ g: [
    ".wwwwwwwwww.",
    "wwwwwwwwwwww",
    "wwwwwwwwwwww",
    "wwwwwwwwwwww",
    "wwwwwyywwwww",
    "wWWWWWWWWWWw",
    "wWwwwwwwwwWw",
    "wWwwwwwwwwWw",
    "wWwwwwwwwwWw",
    "wWWWWWWWWWWw",
    ".WWWWWWWWWW."
  ], p: { w: "#b45309", W: "#78350f", y: "#fbbf24" } });

  I.book = px({ g: [
    ".vvvvvvvvvv.",
    "vvvvvvvvvvvv",
    "vvvvyyyyvvvv",
    "vvvvvvvvvvvv",
    "vvvvvvvvvvvv",
    ".vvvvvvvvvv.",
    "..vvvvvvvv.."
  ], p: { v: "#7c3aed", y: "#fbbf24" } });

  I.person = px({ g: [
    "..dddddddd..",
    ".dddddddddd.",
    ".dkkkkkkkkd.",
    ".kkkkkkkkkk.",
    ".kkekkkkekk.",
    ".kkkkkkkkkk.",
    ".kkkkkkkkkk.",
    "..kkkkkkkk..",
    "...kkkkkk..."
  ], p: { d: "#4a2c17", k: "#d99e6a", e: "#0f172a" } });

  I.lightning = px({ g: [
    "......y.....",
    ".....yy.....",
    ".....yy.....",
    "....yyy.....",
    "....yyy.....",
    "...yyyy.....",
    "...yyy......",
    "..yyy.......",
    "..yy........",
    ".yy........."
  ], p: { y: "#facc15" } });

  I.star = px({ g: [
    "......w......",
    "......w......",
    "......w......",
    "......w......",
    "...wwwwwww...",
    "......w......",
    "......w......",
    "......w......",
    "......w......"
  ], p: { w: "#e0f2fe" } });

  I.goldIngot = px({ g: [
    "..yyyyyyyy..",
    ".yggggggggy.",
    "ygggGGGGgggy",
    "ygggGGGGgggy",
    ".yGGGGGGGGy.",
    "..GGGGGGGG.."
  ], p: { y: "#fef3c7", g: "#fbbf24", G: "#d97706" } });

  I.crown = px({ g: [
    ".yy..yy..yy.",
    ".yyyyyyyyyy.",
    "..GGGGGGGG.."
  ], p: { y: "#fbbf24", G: "#d97706" } });

  var GLOW = {
    diamond: "rgba(34,211,238,.6)",
    emerald: "rgba(52,211,153,.6)",
    goldIngot: "rgba(251,191,36,.55)",
    crown: "rgba(251,191,36,.6)",
    sword: "rgba(148,163,184,.5)",
    pickaxe: "rgba(148,163,184,.5)",
    shield: "rgba(125,211,252,.55)",
    skull: "rgba(226,232,240,.4)",
    heart: "rgba(248,113,113,.55)",
    chest: "rgba(180,83,9,.5)",
    book: "rgba(167,139,250,.55)",
    person: "rgba(217,158,106,.5)",
    lightning: "rgba(250,204,21,.55)",
    star: "rgba(224,242,254,.5)"
  };

  /* ---------------- helpers ---------------- */
  var $q = function (s) { return document.querySelector(s); };
  var $a = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  function ic(name, size, glowOverride) {
    var g = glowOverride || GLOW[name] || "transparent";
    return '<span class="mc-ic" style="width:' + (size || 16) + "px;height:" + (size || 16) +
      'px;filter:drop-shadow(0 0 5px ' + g + ')">' + (I[name] || I.diamond) + "</span>";
  }

  function wm(name) {
    return '<span class="mc-wm" style="filter:drop-shadow(0 0 14px ' + (GLOW[name] || "transparent") + ')">' +
      (I[name] || I.diamond) + "</span>";
  }

  function addIcon(el, name, size, glowOverride) {
    if (!el || el.getAttribute("data-mc")) return;
    el.setAttribute("data-mc", "1");
    el.insertAdjacentHTML("afterbegin", ic(name, size, glowOverride));
  }

  function addWatermark(el, name) {
    if (!el || el.getAttribute("data-mcwm")) return;
    el.setAttribute("data-mcwm", name);
    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.insertAdjacentHTML("beforeend", wm(name));
  }

  /* ---------------- content resolvers ---------------- */
  function modeName(el) {
    var t = (el.textContent || "").toLowerCase();
    if (t.indexOf("boss") > -1) return "skull";
    if (t.indexOf("min") > -1) return "chest";
    if (t.indexOf("mine") > -1 || t.indexOf("ore") > -1) return "pickaxe";
    if (t.indexOf("island") > -1 || t.indexOf("skyblock") > -1) return "diamond";
    return "sword";
  }
  function featureName(el) {
    var t = (el.textContent || "").toLowerCase();
    if (t.indexOf("cheat") > -1 || t.indexOf("anti") > -1 || t.indexOf("guard") > -1) return "shield";
    if (t.indexOf("economy") > -1 || t.indexOf("shop") > -1 || t.indexOf("coin") > -1) return "goldIngot";
    if (t.indexOf("event") > -1 || t.indexOf("giveaway") > -1 || t.indexOf("weekly") > -1) return "star";
    if (t.indexOf("ping") > -1 || t.indexOf("india") > -1 || t.indexOf("low") > -1) return "lightning";
    return "diamond";
  }
  function pkgName(el) {
    var t = (el.textContent || "").toLowerCase();
    if (t.indexOf("vip") > -1) return "crown";
    if (t.indexOf("mvp") > -1) return "crown";
    if (t.indexOf("gem") > -1) return "diamond";
    return "emerald";
  }
  function newsName(el) {
    var t = (el.textContent || "").toLowerCase();
    if (t.indexOf("store") > -1 || t.indexOf("upi") > -1 || t.indexOf("buy") > -1) return "emerald";
    if (t.indexOf("event") > -1 || t.indexOf("drop") > -1 || t.indexOf("giveaway") > -1) return "star";
    return "book";
  }
  function statName(el) {
    var t = (el.textContent || "").toLowerCase();
    if (t.indexOf("player") > -1 || t.indexOf("member") > -1) return "person";
    if (t.indexOf("discord") > -1) return "heart";
    if (t.indexOf("island") > -1) return "diamond";
    return "star";
  }

  var NAV_ICONS = {
    "#world": "diamond", "#modes": "sword", "#store": "emerald",
    "#team": "person", "#news": "book", "#vote": "goldIngot",
    "#rules": "shield", "#discord": "star"
  };
  var KICKER_ICONS = {
    home: "diamond", world: "diamond", stats: "star", modes: "sword",
    features: "shield", store: "emerald", team: "person", news: "book",
    vote: "goldIngot", rules: "shield", discord: "heart"
  };

  /* ---------------- injected styles ---------------- */
  function injectCss() {
    if ($q("#wc-enhance")) return;
    var css = document.createElement("style");
    css.id = "wc-enhance";
    css.textContent = [
      ".mc-ic{display:inline-block;line-height:0;vertical-align:-3px;margin-right:6px;flex:0 0 auto}",
      ".mc-ic .mc-svg{width:100%;height:100%;display:block;image-rendering:pixelated}",
      ".mc-ic.pulse .mc-svg{animation:mcPulse 2.4s ease-in-out infinite}",
      ".mc-wm{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;opacity:.10;z-index:0}",
      ".mc-wm .mc-svg{width:84px;height:84px;display:block;image-rendering:pixelated;animation:mcFloat 6s ease-in-out infinite}",
      "@keyframes mcFloat{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-8px) rotate(6deg)}}",
      "@keyframes mcPulse{0%,100%{filter:drop-shadow(0 0 2px rgba(52,211,153,.5))}50%{filter:drop-shadow(0 0 10px rgba(52,211,153,.95))}}",
      ".mc-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:10000;background:linear-gradient(90deg,#22d3ee,#2563eb,#fb923c);transform-origin:0 50%;transform:scaleX(0);box-shadow:0 0 12px rgba(34,211,238,.7);pointer-events:none}",
      ".mc-top{position:fixed;right:18px;bottom:18px;z-index:9000;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:rgba(10,20,40,.75);border:1px solid rgba(34,211,238,.5);color:#22d3ee;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;visibility:hidden;transform:translateY(12px);transition:.3s;cursor:pointer}",
      ".mc-top.show{opacity:1;visibility:visible;transform:none}",
      ".mc-top:hover{background:rgba(34,211,238,.16)}",
      ".mc-top svg{width:20px;height:20px}",
      "@property --mcang{syntax:'<angle>';initial-value:0deg;inherits:false}",
      ".glass-liq{position:relative;isolation:isolate}",
      ".glass-liq::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:conic-gradient(from var(--mcang,0deg),rgba(34,211,238,0) 0 62%,rgba(34,211,238,.85) 78%,rgba(255,255,255,.95) 87%,rgba(34,211,238,.85) 96%,rgba(34,211,238,0) 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:3;animation:mcRing 8s linear infinite;animation-delay:var(--mcd,-2s)}",
      ".glass-liq::after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(115deg,transparent 32%,rgba(255,255,255,.07) 44%,rgba(255,255,255,.18) 50%,rgba(255,255,255,.07) 56%,transparent 68%);transform:translateX(-130%);pointer-events:none;z-index:2;animation:mcSheen 7.5s ease-in-out infinite;animation-delay:var(--shd,0s)}",
      ".glass-liq:hover::before{animation-duration:2.6s}",
      ".glass-liq:hover::after{animation-duration:2s}",
      "@keyframes mcRing{to{--mcang:360deg}}",
      "@keyframes mcSheen{0%{transform:translateX(-130%)}45%{transform:translateX(130%)}100%{transform:translateX(130%)}}"
    ].join("");
    document.head.appendChild(css);
  }

  /* ---------------- chrome (progress + back to top) ---------------- */
  function buildChrome() {
    if ($q("#mcProgress")) return;
    var p = document.createElement("div");
    p.id = "mcProgress";
    p.className = "mc-progress";
    var t = document.createElement("button");
    t.id = "mcTop";
    t.className = "mc-top";
    t.setAttribute("aria-label", "Back to top");
    t.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 4 L19 11 H15 V20 H9 V11 H5 Z" fill="currentColor"/></svg>';
    document.body.appendChild(p);
    document.body.appendChild(t);
    t.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
    var onScroll = function () {
      var st = document.documentElement.scrollTop || document.body.scrollTop || 0;
      var h = (document.documentElement.scrollHeight - document.documentElement.clientHeight) || 1;
      p.style.transform = "scaleX(" + Math.min(1, st / h) + ")";
      t.classList.toggle("show", st > 520);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- main pass (idempotent) ---------------- */
  function apply() {
    if (reduceMotion) return;

    /* explicit data-mc-icon hooks */
    $a("[data-mc-icon]").forEach(function (el) {
      addIcon(el, el.getAttribute("data-mc-icon"));
    });

    /* navbar */
    $a("#navLinks a").forEach(function (a) {
      var name = NAV_ICONS[a.getAttribute("href")];
      if (name) addIcon(a, name, 15);
    });

    /* section kickers */
    $a(".section-head").forEach(function (head) {
      var sec = head.closest("section[id]");
      var kick = head.querySelector(".kicker");
      if (!kick || !sec) return;
      var id = sec.id;
      addIcon(kick, KICKER_ICONS[id] || "diamond", 14);
    });

    /* buy / pay buttons */
    $a(".btn").forEach(function (b) {
      var t = (b.textContent || "").toLowerCase();
      if (t.indexOf("discord") > -1) return;
      if (/buy|pay|purchase|get now|₹/.test(t)) {
        if (b.getAttribute("data-mc")) return;
        b.setAttribute("data-mc", "1");
        b.insertAdjacentHTML("afterbegin", ic("emerald", 15).replace('class="mc-ic"', 'class="mc-ic pulse"'));
      }
    });

    /* rules */
    var ruleEls = {};
    $a(".rules-list li, .rule").forEach(function (el) {
      if (ruleEls[el]) return;
      ruleEls[el] = 1;
      addIcon(el, "shield", 15, "rgba(248,113,113,.55)");
    });

    /* watermark icons inside cards */
    var wmRules = [
      { sel: ".mode-card", fn: modeName },
      { sel: ".package-card, .pkg-card", fn: pkgName },
      { sel: ".member-card, .staff-card, .team-card", fn: function () { return "person"; } },
      { sel: ".feature", fn: featureName },
      { sel: ".news-row, .news-item", fn: newsName },
      { sel: ".stat", fn: statName },
      { sel: ".discord-card", fn: function () { return "heart"; } }
    ];
    wmRules.forEach(function (rule) {
      $a(rule.sel).forEach(function (el) {
        addWatermark(el, rule.fn(el));
      });
    });

    /* liquid glass */
    $a(".mode-card, .package-card, .pkg-card, .member-card, .staff-card, .feature, .stat, .news-row, .discord-card").forEach(function (el) {
      if (el.classList.contains("glass-liq")) return;
      el.classList.add("glass-liq");
      el.style.setProperty("--shd", (Math.random() * 5).toFixed(1) + "s");
      el.style.setProperty("--mcd", (Math.random() * 6).toFixed(1) + "s");
    });
  }

  /* ---------------- boot ---------------- */
  injectCss();
  buildChrome();
  apply();

  /* catch cards that render later (after loader) */
  var booted = false;
  function bootLater() {
    if (booted) return;
    booted = true;
    apply();
  }
  setTimeout(bootLater, 600);
  setTimeout(bootLater, 1800);
  setTimeout(bootLater, 4200);

  if (window.MutationObserver) {
    var timer = null;
    var obs = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(bootLater, 150);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }
})();
