/* ============================================================
   WATTERCRAFT OFFICIAL — LOGIC V3 (Cinematic Engine)
   Loader • Typewriter • Particles • Counters • Tilt
   Parallax • Reveal • Store Checkout (UPI)
   ============================================================ */
(function () {
  "use strict";
  const D = window.WC;
  if (!D) { console.error("data.js (V3) missing!"); return; }

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* small extra styles (fallbacks + toast) */
  const extra = document.createElement("style");
  extra.textContent =
    ".hero-fallback{font-family:'Orbitron',sans-serif;font-weight:900;" +
    "font-size:clamp(2.4rem,8vw,5rem);margin:0;text-shadow:0 0 40px rgba(34,211,238,.5)}" +
    ".hero-fallback em{font-style:normal;background:linear-gradient(90deg,#22d3ee,#2563eb);" +
    "-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}" +
    ".toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(80px);" +
    "z-index:500;background:rgba(6,16,32,.95);border:1px solid rgba(74,222,128,.5);color:#d7ffe8;" +
    "padding:12px 22px;border-radius:12px;font-weight:700;letter-spacing:.5px;transition:.4s;" +
    "box-shadow:0 10px 40px rgba(0,0,0,.5)}.toast.show{transform:translateX(-50%) translateY(0)}" +
    ".store-help a{color:#22d3ee;text-decoration:underline}";
  document.head.appendChild(extra);

  /* ================= 1. PRELOADER ================= */
  const loader = $("#loader"), fill = $("#loaderFill");
  let pct = 0, loaderDone = false;
  const pre = D.preloader || {};
  if ($("#loaderText")) $("#loaderText").textContent = pre.text || "LOADING WATTERCRAFT";
  if ($("#loaderSub")) $("#loaderSub").textContent = pre.sub || "";

  const tick = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 16 + 6);
    if (fill) fill.style.width = pct + "%";
    if (pct >= 100) {
      clearInterval(tick);
      setTimeout(() => { loader.classList.add("done"); loaderDone = true; startHero(); }, 350);
    }
  }, 120);
  setTimeout(() => { if (!loaderDone && pct < 100) pct = 100; }, 6000); // safety

  let heroStarted = false;
  function startHero() {
    if (heroStarted) return; heroStarted = true;
    typewriter();
    buildHeroParallax();
  }

  /* ================= 2. HERO BACKGROUND (lobby, ken burns) ================= */
  const heroBg = $("#heroBg");
  const H = D.hero || {};
  function setBg(el, url) {
    if (!el) return;
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = "url('" + url + "')"; el.classList.add("ken"); };
    img.onerror = () => { el.style.backgroundImage = "radial-gradient(120% 90% at 60% 10%, #0d2c55 0%, #050d1f 55%, #030812 100%)"; };
    img.src = url;
  }
  if (H.bg) setBg(heroBg, H.bg);
  if (H.bg && !heroBg.style.backgroundImage) heroBg.style.backgroundImage = "linear-gradient(160deg,#0a2547,#030812)";

  /* logo */
  const logoImg = $("#heroLogoImg");
  const wrap = $("#heroLogoWrap");
  const B = D.brand || {};
  if (B.logo && logoImg) {
    logoImg.onerror = () => {
      if (wrap) wrap.innerHTML = '<h1 class="hero-fallback">Watter<em>Craft</em></h1>';
    };
  }
  if (B.mark) {
    const mk = document.querySelector(".loader-mark img");
    if (mk) mk.onerror = () => { mk.remove(); };
  }

  /* floating island frame */
  const frameImg = $("#heroFrameImg");
  if (frameImg && H.islandImg) {
    frameImg.onerror = () => { const f = $("#heroFrame"); if (f) f.style.display = "none"; };
  }

  /* ================= 3. PARTICLES (floating blocks) ================= */
  const canvas = $("#heroCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let W, Hh, parts = [], raf;
    function size() {
      W = canvas.width = canvas.offsetWidth;
      Hh = canvas.height = canvas.offsetHeight;
      const n = Math.min(70, Math.floor(W / 16));
      parts = [];
      for (let i = 0; i < n; i++) parts.push({
        x: Math.random() * W, y: Math.random() * Hh,
        s: 1.5 + Math.random() * 3,
        vy: .15 + Math.random() * .45,
        vx: (Math.random() - .5) * .2,
        a: .05 + Math.random() * .25,
        c: Math.random() > .6 ? "255,255,255" : "34,211,238",
        p: Math.random() > .82
      });
    }
    function draw() {
      ctx.clearRect(0, 0, W, Hh);
      for (const pt of parts) {
        pt.y -= pt.vy; pt.x += pt.vx + Math.sin((pt.y + pt.x) / 60) * .12;
        if (pt.y < -10) { pt.y = Hh + 10; pt.x = Math.random() * W; }
        if (pt.x < -10) pt.x = W + 10; if (pt.x > W + 10) pt.x = -10;
        ctx.globalAlpha = pt.a;
        ctx.fillStyle = "rgba(" + pt.c + ",1)";
        ctx.fillRect(pt.x, pt.y, pt.s, pt.s);
        if (pt.p) {
          ctx.globalAlpha = pt.a * .5;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.s * 3.4, 0, 6.283); ctx.fillStyle = "rgba(" + pt.c + ",.5)"; ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }
    size(); draw();
    window.addEventListener("resize", () => { cancelAnimationFrame(raf); size(); draw(); });
  }

  /* ================= 4. TYPEWRITER ================= */
  const typeEl = $("#heroType");
  function typewriter() {
    if (!typeEl || !H.taglines || !H.taglines.length) return;
    const lines = H.taglines;
    let li = 0, ci = 0, del = false;
    (function step() {
      const line = lines[li];
      typeEl.textContent = line.slice(0, ci);
      let wait = del ? 34 : 58;
      if (!del && ci === line.length) { wait = 1700; del = true; }
      else if (del && ci === 0) { del = false; li = (li + 1) % lines.length; wait = 350; }
      ci += del ? -1 : 1;
      setTimeout(step, wait);
    })();
  }

  /* ================= 5. SERVER INFO ================= */
  const S = D.server || {};
  if (S.ip) { const ips = $$("#ipText, #joinIp, .footer-ip"); ips.forEach((e) => e && (e.textContent = S.ip)); }
  if (S.port && $("#joinPort")) $("#joinPort").textContent = S.port;
  if (S.versions && $("#joinVersions")) $("#joinVersions").textContent = S.versions;
  if (S.discord) {
    if ($("#navDiscord")) $("#navDiscord").href = S.discord;
    if ($("#discordBtn")) $("#discordBtn").href = S.discord;
  }
  if (S.owner) { if ($("#staffOwner")) $("#staffOwner").textContent = S.owner; if ($("#footerOwner")) $("#footerOwner").textContent = S.owner; }
  if ($("#footerYear")) $("#footerYear").textContent = new Date().getFullYear();

  /* ================= 6. MARQUEE TICKER ================= */
  const track = $("#tickerTrack");
  if (track && D.marquee && D.marquee.length) {
    const seq = D.marquee.map((m) => '<span class="tick">' + esc(m) + "</span>").join("");
    track.innerHTML = seq + seq; // duplicate for seamless -50% loop
  }

  /* ================= 7. ANIMATED COUNTERS ================= */
  function animateCount(el, end, suffix, dur) {
    const t0 = performance.now();
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      const ease = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * ease).toLocaleString("en-IN") + (suffix || "");
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  const statsRow = $("#statsRow");
  if (statsRow && D.stats) {
    statsRow.innerHTML = D.stats.map((s, i) =>
      '<div class="stat-item reveal" data-dir="zoom" style="transition-delay:' + (i * 90) + 'ms">' +
      '<div class="stat-value" data-count="' + s.value + '" data-suffix="' + esc(s.suffix || "") + '">0</div>' +
      '<div class="stat-label">' + esc(s.label) + "</div></div>").join("");
  }

  /* ================= 8. FEATURED WORLD (parallax) ================= */
  const fBg = $("#featuredBg"), F = D.featured || {};
  if (fBg && F.img) setBg(fBg, F.img);
  else if (fBg) fBg.style.background = "linear-gradient(160deg,#0b2a52,#030812)";
  if (F.kicker && $("#featuredKicker")) $("#featuredKicker").textContent = F.kicker;
  if (F.title && $("#featuredTitle")) $("#featuredTitle").textContent = F.title;
  if (F.desc && $("#featuredDesc")) $("#featuredDesc").textContent = F.desc;
  if ($("#featuredPoints") && F.points) {
    $("#featuredPoints").innerHTML = F.points.map((p) => "<li>" + esc(p) + "</li>").join("");
  }

  /* ================= 9. GAMEMODES ================= */
  const modesGrid = $("#modesGrid");
  if (modesGrid && D.gamemodes) {
    modesGrid.innerHTML = D.gamemodes.map((m, i) => {
      const media = m.img
        ? '<div class="mode-media"><img src="' + esc(m.img) + '" alt="' + esc(m.title) + '" loading="lazy"></div>'
        : '<div class="mode-media art"><div class="mode-art">' + (m.icon || "🎮") + "</div></div>";
      return '<article class="mode-card reveal" style="transition-delay:' + (i * 80) + 'ms">' +
        media + '<span class="mode-tag">' + esc(m.tag || "MODE") + "</span>" +
        '<div class="mode-body"><h3 class="mode-title">' + esc(m.title) + "</h3>" +
        '<p class="mode-desc">' + esc(m.desc) + "</p></div></article>";
    }).join("");
  }

  /* ================= 10. FEATURES ================= */
  const featGrid = $("#featuresGrid");
  if (featGrid && D.features) {
    featGrid.innerHTML = D.features.map((f, i) =>
      '<div class="feature-card reveal" style="transition-delay:' + (i * 80) + 'ms">' +
      '<span class="feature-ico">' + (f.icon || "✨") + "</span>" +
      '<h3 class="feature-title">' + esc(f.title) + "</h3>" +
      '<p class="feature-desc">' + esc(f.desc) + "</p></div>").join("");
  }

  /* ================= 11. STORE ================= */
  const storeGrid = $("#storeGrid");
  const storeApi = (D.store && D.store.api) || "";
  const storeReady = storeApi && storeApi.indexOf("YOURUSER") === -1;

  function openBuy(pkg) {
    const box = $("#buyBox");
    if (!box) return;
    box.innerHTML =
      '<button class="modal-x" onclick="closeBuy()">✕</button>' +
      '<div class="buy-summary reveal in"><span class="pkg-ico">' + (pkg.icon || "🎁") + "</span>" +
      '<div><div class="bs-name">' + esc(pkg.name) + "</div>" +
      '<div class="bs-price">₹' + esc(pkg.price) + " &nbsp;UPI</div></div></div>" +
      "<ul class='pkg-perks' style='margin-top:14px'>" + pkg.perks.map((p) => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
      "<label for='buyUser'>Your Minecraft Username</label>" +
      '<input class="field" id="buyUser" placeholder="e.g. Anshhu07" autocomplete="off" />' +
      '<p class="upi-note">Pay via <b>GPay • PhonePe • Paytm</b> — payment ke baad unique code milega</p>' +
      '<button class="btn btn-primary btn-block" id="payBtn">💳 Pay ₹' + esc(pkg.price) + " via UPI</button>" +
      '<div id="payMsg" class="loading-msg" style="display:none"></div>';
    openModal("buyModal");
    const payBtn = $("#payBtn"), msg = $("#payMsg");
    payBtn.addEventListener("click", () => pay(pkg));
    const input = $("#buyUser");
    input.focus();
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") pay(pkg); });
  }

  async function pay(pkg) {
    const user = ($("#buyUser") || {}).value || "";
    const msg = $("#payMsg");
    if (user.trim().length < 3) {
      if (msg) { msg.style.display = "block"; msg.className = "err-msg"; msg.textContent = "⚠️ Sahi Minecraft username daalo (min 3 letters)."; }
      return;
    }
    if (!storeReady) {
      if (msg) { msg.style.display = "block"; msg.className = "err-msg";
        msg.innerHTML = "⚠️ Store engine abhi connected nahi hai. Cloudflare Worker deploy karke data.js me store.api update karo — steps ke liye mujhse pucho."; }
      return;
    }
    if (msg) { msg.style.display = "block"; msg.className = "loading-msg"; msg.textContent = "⏳ Razorpay payment link ban raha hai..."; }
    const payBtn = $("#payBtn"); if (payBtn) payBtn.disabled = true;
    try {
      const res = await fetch(storeApi + "/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: pkg.id, player: user.trim(), platform: "bedrock" })
      });
      const data = await res.json();
      if (data && data.url) {
        if (msg) msg.textContent = "✅ Payment page khul raha hai... pay karo, phir yahi code milega.";
        window.open(data.url, "_blank");
        pollCode(data.order);
      } else if (data && data.error) {
        if (msg) { msg.className = "err-msg"; msg.textContent = "⚠️ " + data.error; }
      } else {
        if (msg) { msg.className = "err-msg"; msg.textContent = "⚠️ Worker se galat response aaya — order check karo."; }
      }
    } catch (e) {
      if (msg) { msg.className = "err-msg"; msg.textContent = "⚠️ Network error — Worker URL sahi hai? (" + esc(storeApi) + ")"; }
    }
    if (payBtn) setTimeout(() => { payBtn.disabled = false; }, 2500);
  }

  function pollCode(order) {
    const box = $("#buyBox"), msg = $("#payMsg");
    let tries = 0;
    const iv = setInterval(async () => {
      tries++;
      if (tries > 40) { clearInterval(iv); if (msg) { msg.className = "err-msg"; msg.textContent = "⏰ Timeout — payment hua to /redeem wala code Discord pe maango ya dobara buy karo."; } return; }
      try {
        const res = await fetch(storeApi + "/api/status?order=" + encodeURIComponent(order));
        const d = await res.json();
        if (d && d.paid && d.code) {
          clearInterval(iv);
          if (msg) msg.style.display = "none";
          box.insertAdjacentHTML("beforeend",
            '<div class="code-result"><div class="code-label">✅ PAYMENT CONFIRMED — YOUR CODE</div>' +
            '<div class="code-val">' + esc(d.code) + "</div>" +
            '<button class="btn btn-sm" id="copyCode" style="background:linear-gradient(135deg,#4ade80,#16a34a);color:#042">📋 Copy Code</button>' +
            '<p style="font-size:.8rem;color:#9fceb4;margin-top:10px">Game me likho: <b class="mono">/redeem ' + esc(d.code) + "</b></p></div>");
          const cc = $("#copyCode");
          if (cc) cc.onclick = () => copyText(d.code);
        } else if (d && d.error) {
          clearInterval(iv);
          if (msg) { msg.className = "err-msg"; msg.textContent = "⚠️ " + d.error; }
        }
        // not paid yet → continue polling
      } catch (e) { /* retry */ }
    }, 3000);
  }

  if (storeGrid && D.store && D.store.packages) {
    storeGrid.innerHTML = D.store.packages.map((p, i) =>
      '<div class="pkg-card reveal" style="--c:' + esc(p.color || "#22d3ee") + ";transition-delay:" + (i * 90) + 'ms">' +
      (p.tag ? '<span class="pkg-tag">' + esc(p.tag) + "</span>" : "") +
      '<div class="pkg-ico">' + (p.icon || "🎁") + "</div>" +
      '<div class="pkg-name">' + esc(p.name) + "</div>" +
      '<div class="pkg-price">₹' + esc(p.price) + "</div>" +
      '<ul class="pkg-perks">' + p.perks.map((k) => "<li>" + esc(k) + "</li>").join("") + "</ul>" +
      '<button class="btn buy-btn" data-buy="' + esc(p.id) + '">Buy Now</button></div>').join("");
    storeGrid.addEventListener("click", (e) => {
      const b = e.target.closest("[data-buy]");
      if (!b) return;
      const pkg = D.store.packages.find((p) => p.id === b.dataset.buy);
      if (pkg) openBuy(pkg);
    });
  }
  const note = $("#storeNote");
  if (note && D.store && D.store.note) note.textContent = D.store.note;
  const help = $(".store-help");
  if (help && !storeReady) help.innerHTML = help.innerHTML + ' <a href="#discord">→ Worker/API setup help chahiye?</a>';

  /* ================= 12. STAFF ================= */
  const staffGrid = $("#staffGrid");
  const roleColor = {
    "owner": "#fbbf24", "co-owner": "#fb923c", "admin": "#f87171",
    "sr.mod": "#4ade80", "mod": "#22d3ee", "helper": "#a78bfa"
  };
  function hexToRgb(h) {
    const n = parseInt(h.slice(1), 16);
    return (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255);
  }
  if (staffGrid && D.staff) {
    staffGrid.innerHTML = D.staff.map((m, i) => {
      const key = m.rank.toLowerCase();
      const c = roleColor[key] || "#22d3ee";
      const avatar = "https://mc-heads.net/avatar/" + encodeURIComponent(m.name) + "/128";
      return '<div class="staff-card reveal" style="--c:' + c + ";transition-delay:" + (i * 70) + 'ms">' +
        '<img class="staff-avatar" src="' + avatar + '" alt="' + esc(m.name) + '" loading="lazy" ' +
        'onerror="this.onerror=null;this.src=\'https://mc-heads.net/avatar/Steve/128\'" />' +
        '<div class="staff-name">' + esc(m.name) + "</div>" +
        '<div class="staff-role" style="color:' + c + ";background:rgba(" + hexToRgb(c) + ",.12);border:1px solid rgba(" + hexToRgb(c) + ",.4)\">" +
        esc(m.rank) + "</div></div>";
    }).join("");
  }

  /* ================= 13. NEWS / VOTE / RULES ================= */
  const newsList = $("#newsList");
  if (newsList && D.news) {
    newsList.innerHTML = D.news.map((n, i) =>
      '<div class="news-item reveal" style="transition-delay:' + (i * 80) + 'ms">' +
      '<div class="news-date">' + esc(n.date) + "</div>" +
      '<div class="news-body"><span class="news-tag">' + esc(n.tag || "UPDATE") + "</span>" +
      '<div class="news-title">' + esc(n.title) + "</div>" +
      '<p class="news-desc">' + esc(n.desc) + "</p></div></div>").join("");
  }
  const voteList = $("#voteList");
  if (voteList && D.vote) {
    voteList.innerHTML = D.vote.map((v, i) =>
      '<a class="vote-btn reveal" href="' + esc(v.url) + '" target="_blank" rel="noopener" style="transition-delay:' + (i * 90) + 'ms">' +
      '<span>⭐ ' + esc(v.name) + "</span><span class='vote-arr'>→</span></a>").join("");
  }
  const rulesList = $("#rulesList");
  if (rulesList && D.rules) {
    rulesList.innerHTML = D.rules.map((r, i) =>
      '<div class="rule-item reveal" style="transition-delay:' + (i * 60) + 'ms">' +
      '<span class="rule-num">' + (i + 1) + "</span><p>" + esc(r) + "</p></div>").join("");
  }
  const dsc = D.discord || {};
  if (dsc.title && $("#discordTitle")) $("#discordTitle").textContent = dsc.title;
  if (dsc.desc && $("#discordDesc")) $("#discordDesc").textContent = dsc.desc;

  /* ================= 14. NAVBAR ================= */
  const nav = $("#navbar");
  window.addEventListener("scroll", () => nav && nav.classList.toggle("scrolled", window.scrollY > 30));
  const ham = $("#hamburger"), navLinks = $("#navLinks");
  if (ham) ham.addEventListener("click", () => { ham.classList.toggle("open"); navLinks.classList.toggle("open"); });
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { ham.classList.remove("open"); navLinks.classList.remove("open"); }));

  /* ================= 15. SCROLL REVEAL ================= */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        if (en.target.querySelector("[data-count]")) {
          const v = en.target.querySelector("[data-count]");
          animateCount(v, parseFloat(v.dataset.count), v.dataset.suffix || "", 1400);
        }
        revealObs.unobserve(en.target);
      }
    });
  }, { threshold: .14 });
  $$(".reveal").forEach((el) => revealObs.observe(el));

  /* ================= 16. FEATURED PARALLAX ================= */
  const featSec = $(".featured");
  let pTick = false;
  function parallax() {
    if (!featSec || !fBg) return;
    const r = featSec.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const mid = (r.top + r.bottom) / 2 - window.innerHeight / 2;
    fBg.style.transform = "translateY(" + (mid * -0.12).toFixed(1) + "px)";
  }
  window.addEventListener("scroll", () => {
    if (!pTick) { pTick = true; requestAnimationFrame(() => { parallax(); pTick = false; }); }
  }, { passive: true });
  parallax();

  /* ================= 17. HERO LOGO MOUSE TILT ================= */
  const hero = $(".hero");
  let tx = 0, ty = 0, cx = 0, cy = 0, tRaf = false;
  if (hero && wrap && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - .5) * 10;   // -5..5 deg
      ty = ((e.clientY - r.top) / r.height - .5) * -10;
      if (!tRaf) { tRaf = true; (function loop() { cx += (tx - cx) * .08; cy += (ty - cy) * .08; wrap.style.transform = "rotateY(" + cx + "deg) rotateX(" + cy + "deg)"; if (Math.abs(tx - cx) > .05 || Math.abs(ty - cy) > .05) requestAnimationFrame(loop); else tRaf = false; })(); }
    });
    hero.addEventListener("mouseleave", () => { tx = 0; ty = 0; });
  }

  /* ================= 18. MODALS + COPY ================= */
  function openModal(id) { const m = $("#" + id); if (m) { m.classList.add("show"); document.body.style.overflow = "hidden"; } }
  function closeModal(id) { const m = $("#" + id); if (m) { m.classList.remove("show"); if (!$$(".modal.show").length) document.body.style.overflow = ""; } }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $$(".modal.show").forEach((m) => m.classList.remove("show")); });

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 1800);
  }
  function copyText(txt, msg) {
    const done = () => toast(msg || "✅ Copied!");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done).catch(() => fallbackCopy(txt, done));
    else fallbackCopy(txt, done);
  }
  function fallbackCopy(txt, done) {
    const ta = document.createElement("textarea");
    ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    ta.remove();
  }
  function copyIP() { copyText(S.ip || "play.wattercraft.fun", "IP copied — ab Minecraft me paste karo!"); openJoin(); }
  function openJoin() { openModal("joinModal"); }
  function closeJoin() { closeModal("joinModal"); }
  function closeBuy() { closeModal("buyModal"); }

  /* expose globals for inline onclick */
  window.copyIP = copyIP; window.openJoin = openJoin;
  window.closeJoin = closeJoin; window.closeBuy = closeBuy;
})();
