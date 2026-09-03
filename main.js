/**
 * WatterCraft — Site Engine (V4)
 * Renders all content from data.js, drives animations and the store checkout.
 * GSAP + ScrollTrigger are optional enhancements; the site degrades gracefully.
 */
(function () {
  "use strict";

  const CFG = window.WC;
  if (!CFG) {
    console.error("[WatterCraft] data.js is missing or failed to load.");
    return;
  }

  /* ------------------------------------------------------------------ */
  /* Helpers                                                            */
  /* ------------------------------------------------------------------ */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  if (hasGSAP) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    // Neutralise CSS reveal states; GSAP controls them from here on.
    const reset = document.createElement("style");
    reset.textContent =
      "html.gsap [data-reveal]{opacity:1!important;transform:none!important;transition:none!important}";
    document.documentElement.classList.add("gsap");
    document.head.appendChild(reset);
  }

  /* Small helper styles (fallbacks + toast) */
  const extraCss = document.createElement("style");
  extraCss.textContent =
    ".hero-logo-fallback{font-family:'Orbitron',sans-serif;font-weight:900;" +
    "font-size:clamp(2.6rem,9vw,5.4rem);background:linear-gradient(90deg,#22d3ee,#2563eb);" +
    "-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;" +
    "filter:drop-shadow(0 0 40px rgba(34,211,238,.45))}" +
    ".store-help a{color:#22d3ee;text-decoration:underline}";
  document.head.appendChild(extraCss);

  /* ------------------------------------------------------------------ */
  /* Preloader                                                          */
  /* ------------------------------------------------------------------ */
  const loader = $("#loader");
  const loaderFill = $("#loaderFill");
  const loaderStatus = $("#loaderStatus");

  let pct = 0;
  let loaderDone = false;

  function finishLoader() {
    if (loaderDone) return;
    loaderDone = true;
    if (loader) loader.classList.add("is-done");
    document.body.style.overflow = "";
    startHeroSequence();
  }

  // Safety net: the loader can never trap the page.
  setTimeout(finishLoader, 3000);

  const progress = setInterval(function () {
    pct = Math.min(100, pct + Math.random() * 15 + 6);
    if (loaderFill) loaderFill.style.width = pct + "%";
    if (pct >= 100) {
      clearInterval(progress);
      setTimeout(finishLoader, 260);
    }
  }, 110);

  /* ------------------------------------------------------------------ */
  /* Backgrounds & imagery                                              */
  /* ------------------------------------------------------------------ */
  function applyBackground(el, url) {
    if (!el || !url) return;
    const probe = new Image();
    probe.onload = function () {
      el.style.backgroundImage = 'url("' + url + '")';
      el.classList.add("is-live");
    };
    probe.onerror = function () {
      el.style.background = "linear-gradient(165deg,#0c2a50 0%,#050b18 60%)";
    };
    probe.src = url;
  }

  applyBackground($("#heroBg"), CFG.hero && CFG.hero.background);
  applyBackground($("#showcaseBg"), CFG.showcase && CFG.showcase.image);

  // Hero logo with graceful text fallback.
  const heroLogo = $("#heroLogo");
  const heroLogoWrap = $("#heroLogoWrap");
  if (heroLogo) {
    heroLogo.onerror = function () {
      if (heroLogoWrap) {
        heroLogoWrap.innerHTML = '<h1 class="hero-logo-fallback">Watter<em>Craft</em></h1>';
      }
    };
  }

  // Remove a broken preloader mark icon.
  const markImg = $(".loader-mark img");
  if (markImg) markImg.onerror = function () { markImg.remove(); };

  // Hide the island frame if its image is missing.
  const islandImg = $("#heroIsland");
  if (islandImg) {
    islandImg.onerror = function () {
      const frame = $("#heroFrame");
      if (frame) frame.style.display = "none";
    };
  }

  /* ------------------------------------------------------------------ */
  /* Static text bindings                                               */
  /* ------------------------------------------------------------------ */
  const server = CFG.server || {};
  const heroCfg = CFG.hero || {};

  if ($("#heroKicker") && heroCfg.kicker) $("#heroKicker").textContent = heroCfg.kicker;

  const ipTargets = ["#ipText", "#joinIp"];
  ipTargets.forEach(function (sel) {
    const el = $(sel);
    if (el && server.ip) el.textContent = server.ip;
  });
  if ($("#joinPort") && server.port) $("#joinPort").textContent = server.port;
  if ($("#joinVersions") && server.platform) $("#joinVersions").textContent = server.platform;
  if ($("#year")) $("#year").textContent = new Date().getFullYear();
  if ($("#ownerName")) $("#ownerName").textContent = server.owner || "";
  if ($("#teamOwner")) $("#teamOwner").textContent = server.owner || "";

  const footerIp = $(".footer-ip");
  if (footerIp && server.ip) footerIp.textContent = server.ip + " : " + (server.port || "");

  if ($("#discordBtn") && server.discord) $("#discordBtn").href = server.discord;
  const discord = CFG.discord || {};
  if ($("#discordTitle") && discord.title) $("#discordTitle").textContent = discord.title;
  if ($("#discordDesc") && discord.description) $("#discordDesc").textContent = discord.description;
  if ($("#discordBtn") && discord.cta) $("#discordBtn").textContent = discord.cta;

  /* ------------------------------------------------------------------ */
  /* Live player count (Bedrock via mcsrvstat)                          */
  /* ------------------------------------------------------------------ */
  function initPlayerCount() {
    const pill = $("#playersOnline");
    const countEl = $("#playersCount");
    if (!pill || !countEl || !server.statusHost) return;

    const endpoint =
      "https://api.mcsrvstat.us/bedrock/2/" +
      encodeURIComponent(server.statusHost) +
      ":" + (server.port || 19132);

    function refresh() {
      fetch(endpoint)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.online && typeof data.players !== "undefined" && data.players !== null) {
            countEl.textContent = data.players.online || 0;
            pill.hidden = false;
          } else {
            pill.hidden = true;
          }
        })
        .catch(function () { pill.hidden = true; });
    }

    refresh();
    setInterval(refresh, 60000);
  }
  initPlayerCount();

  /* ------------------------------------------------------------------ */
  /* Ticker (seamless loop)                                             */
  /* ------------------------------------------------------------------ */
  const track = $("#tickerTrack");
  if (track && CFG.ticker && CFG.ticker.length) {
    const seq = CFG.ticker.map(function (t) { return '<span class="tick">' + esc(t) + "</span>"; }).join("");
    track.innerHTML = seq + seq;
  }

  /* ------------------------------------------------------------------ */
  /* Counters                                                           */
  /* ------------------------------------------------------------------ */
  function runCounter(el, end, suffix, duration) {
    const start = performance.now();
    function frame(now) {
      const k = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * eased).toLocaleString("en-IN") + (suffix || "");
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function observeCounters() {
    const values = $$("[data-count]");
    if (!values.length) return;

    if (hasGSAP && !reduceMotion) {
      values.forEach(function (el) {
        window.gsap.to({ v: 0 }, {
          v: parseFloat(el.dataset.count),
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].v).toLocaleString("en-IN") + (el.dataset.suffix || "");
          }
        });
      });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          runCounter(en.target, parseFloat(en.target.dataset.count), en.target.dataset.suffix || "", 1500);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    values.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Stats                                                              */
  /* ------------------------------------------------------------------ */
  const statsRow = $("#statsRow");
  if (statsRow && CFG.stats) {
    statsRow.innerHTML = CFG.stats.map(function (s, i) {
      return (
        '<div class="stat" data-reveal="zoom" style="--rd:' + (i * 90) + 'ms">' +
        '<div class="stat-value" data-count="' + s.value + '" data-suffix="' + esc(s.suffix || "") + '">0</div>' +
        '<div class="stat-label">' + esc(s.label) + "</div></div>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Showcase                                                           */
  /* ------------------------------------------------------------------ */
  const showcase = CFG.showcase || {};
  if ($("#showcaseKicker") && showcase.kicker) $("#showcaseKicker").textContent = showcase.kicker;
  if ($("#showcaseTitle") && showcase.title) $("#showcaseTitle").textContent = showcase.title;
  if ($("#showcaseDesc") && showcase.description) $("#showcaseDesc").textContent = showcase.description;
  const showcasePoints = $("#showcasePoints");
  if (showcasePoints && showcase.points) {
    showcasePoints.innerHTML = showcase.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
  }
  const showcaseCta = $(".showcase-card .btn");
  if (showcaseCta && showcase.cta) showcaseCta.textContent = showcase.cta;

  /* ------------------------------------------------------------------ */
  /* Gamemodes                                                          */
  /* ------------------------------------------------------------------ */
  const modesGrid = $("#modesGrid");
  if (modesGrid && CFG.gameModes) {
    modesGrid.innerHTML = CFG.gameModes.map(function (m, i) {
      const media = m.image
        ? '<div class="mode-media"><img src="' + esc(m.image) + '" alt="' + esc(m.name) + '" loading="lazy"></div>'
        : '<div class="mode-media"><span class="mode-icon">⚔</span></div>';
      return (
        '<article class="mode-card" data-reveal style="--rd:' + (i * 90) + 'ms">' +
        media +
        '<div class="mode-body">' +
        '<span class="mode-tag">' + esc(m.tag || "MODE") + "</span>" +
        '<h3 class="mode-name">' + esc(m.name) + "</h3>" +
        '<p class="mode-desc">' + esc(m.desc) + "</p>" +
        "</div></article>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Features                                                           */
  /* ------------------------------------------------------------------ */
  const featuresGrid = $("#featuresGrid");
  if (featuresGrid && CFG.features) {
    featuresGrid.innerHTML = CFG.features.map(function (f, i) {
      return (
        '<div class="feature" data-reveal style="--rd:' + (i * 90) + 'ms">' +
        '<span class="feature-icon">◆</span>' +
        '<h3 class="feature-title">' + esc(f.title) + "</h3>" +
        '<p class="feature-desc">' + esc(f.desc) + "</p></div>"
      );
    }).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Store                                                              */
  /* ------------------------------------------------------------------ */
  const store = CFG.store || {};
  const storeApi = store.api || "";
  const currency = store.currency || "₹";
  const storeReady = !!storeApi;

  const storeGrid = $("#storeGrid");
  if (storeGrid && store.packages) {
    storeGrid.innerHTML = store.packages.map(function (p, i) {
      return (
        '<div class="package-card" style="--c:' + esc(p.color || "#22d3ee") + '" data-reveal style="--rd:' + (i * 90) + 'ms">' +
        (p.badge ? '<span class="package-badge">' + esc(p.badge) + "</span>" : "") +
        '<div class="package-icon">◆</div>' +
        '<h3 class="package-name">' + esc(p.name) + "</h3>" +
        '<div class="package-price">' + esc(currency) + esc(p.price) + "</div>" +
        '<ul class="package-perks">' + p.perks.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul>" +
        '<button class="package-buy" type="button" data-buy="' + esc(p.id) + '">Buy Now</button>' +
        "</div>"
      );
    }).join("");

    storeGrid.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-buy]");
      if (!btn) return;
      const pkg = store.packages.find(function (p) { return p.id === btn.dataset.buy; });
      if (pkg) openBuyModal(pkg);
    });
  }

  if ($("#storeNote") && store.paymentNote) $("#storeNote").textContent = store.paymentNote;
  const storeHelp = $("#storeHelp");
  if (storeHelp && !storeReady) {
    const a = document.createElement("a");
    a.href = server.discord || "#discord";
    a.textContent = " Payment gateway is being connected — ask in Discord.";
    storeHelp.appendChild(a);
  }

  /* Checkout */
  function openModal(id) {
    const m = $("#" + id);
    if (!m) return;
    m.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(id) {
    const m = $("#" + id);
    if (!m) return;
    m.classList.remove("is-open");
    if (!$$(".modal.is-open").length) document.body.style.overflow = "";
  }

  function openBuyModal(pkg) {
    const box = $("#buyBox");
    if (!box) return;
    box.innerHTML =
      '<button class="modal-close" type="button" onclick="closeBuy()" aria-label="Close">×</button>' +
      '<div class="buy-summary">' +
      '<span class="bs-icon">◆</span>' +
      "<div><div class='bs-name'>" + esc(pkg.name) + "</div>" +
      "<div class='bs-price'>" + esc(currency) + esc(pkg.price) + " · UPI</div></div></div>" +
      '<ul class="package-perks" style="text-align:left;margin:16px auto 0;max-width:280px">' +
      pkg.perks.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul>" +
      '<label class="form-label" for="buyUser">Minecraft Username</label>' +
      '<input class="field" id="buyUser" placeholder="Your in-game name" autocomplete="off" />' +
      '<p class="upi-note">Pay with <strong>GPay · PhonePe · Paytm</strong>. Your unique code appears here after payment.</p>' +
      '<button class="btn btn-primary btn-block" type="button" id="payBtn">Pay ' + esc(currency) + esc(pkg.price) + " via UPI</button>" +
      '<div class="status" id="payStatus" hidden></div>';

    openModal("buyModal");

    const input = $("#buyUser");
    if (input) {
      input.focus();
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") startPayment(pkg); });
    }
    const payBtn = $("#payBtn");
    if (payBtn) payBtn.addEventListener("click", function () { startPayment(pkg); });
  }

  function setStatus(type, text) {
    const el = $("#payStatus");
    if (!el) return;
    el.hidden = false;
    el.className = "status status--" + type;
    el.innerHTML = text;
  }

  function startPayment(pkg) {
    const input = $("#buyUser");
    const user = input ? input.value.trim() : "";

    if (user.length < 3) {
      setStatus("error", "Enter a valid Minecraft username (3+ characters).");
      return;
    }
    if (!storeReady) {
      setStatus("error", "The store is not connected yet. Ask in Discord and try again soon.");
      return;
    }

    const payBtn = $("#payBtn");
    if (payBtn) payBtn.disabled = true;
    setStatus("loading", "Creating your secure payment link…");

    fetch(storeApi + "/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ package: pkg.id, player: user, platform: "bedrock" })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.url) {
          setStatus("loading", "Payment window opened — complete the payment, your code will appear here.");
          window.open(data.url, "_blank");
          pollOrder(data.order);
        } else if (data && data.error) {
          setStatus("error", esc(data.error));
        } else {
          setStatus("error", "Unexpected response from the store service.");
        }
        if (payBtn) setTimeout(function () { payBtn.disabled = false; }, 2000);
      })
      .catch(function () {
        setStatus("error", "Network error — please try again.");
        if (payBtn) payBtn.disabled = false;
      });
  }

  function pollOrder(order) {
    if (!order) return;
    const box = $("#buyBox");
    let attempts = 0;
    const timer = setInterval(function () {
      attempts += 1;
      if (attempts > 40) {
        clearInterval(timer);
        setStatus("error", "Timed out. If payment succeeded, contact staff on Discord for your code.");
        return;
      }
      fetch(storeApi + "/api/status?order=" + encodeURIComponent(order))
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.paid && d.code) {
            clearInterval(timer);
            const status = $("#payStatus");
            if (status) status.hidden = true;
            box.insertAdjacentHTML("beforeend",
              '<div class="code-reveal">' +
              '<div class="code-label">Payment confirmed — your code</div>' +
              '<div class="code-value">' + esc(d.code) + "</div>" +
              '<button class="btn" type="button" id="copyCode">Copy Code</button>' +
              '<p style="font-size:.8rem;color:#9fceb4;margin-top:12px">Redeem in-game with <code class="mono">/redeem ' + esc(d.code) + "</code></p>" +
              "</div>");
            const copyBtn = $("#copyCode");
            if (copyBtn) copyBtn.addEventListener("click", function () { copyText(d.code); });
          } else if (d && d.error) {
            clearInterval(timer);
            setStatus("error", esc(d.error));
          }
        })
        .catch(function () { /* not paid yet — keep polling */ });
    }, 3000);
  }

  /* ------------------------------------------------------------------ */
  /* Team + Apply card                                                  */
  /* ------------------------------------------------------------------ */
  const roleColors = {
    owner: "#fbbf24",
    "co-owner": "#fb923c",
    admin: "#f87171",
    "sr.mod": "#4ade80",
    mod: "#22d3ee",
    helper: "#a78bfa"
  };

  function roleColor(role) {
    return roleColors[String(role || "").toLowerCase()] || "#22d3ee";
  }
  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255);
  }

  const teamGrid = $("#teamGrid");
  if (teamGrid) {
    const members = CFG.team || [];
    let html = members.map(function (m, i) {
      const c = roleColor(m.role);
      const avatar = "https://mc-heads.net/avatar/" + encodeURIComponent(m.name) + "/128";
      return (
        '<div class="member-card" style="--c:' + c + '" data-reveal style="--rd:' + (i * 70) + 'ms">' +
        '<img class="member-avatar" src="' + avatar + '" alt="' + esc(m.name) + '" loading="lazy" ' +
        "onerror=\"this.onerror=null;this.src='https://mc-heads.net/avatar/Steve/128'\" />" +
        '<div class="member-name">' + esc(m.name) + "</div>" +
        '<span class="member-role" style="color:' + c + ";background:rgba(" + hexToRgb(c) + ",.12);border:1px solid rgba(" + hexToRgb(c) + ",.4)\">" +
        esc(m.role) + "</span></div>"
      );
    }).join("");

    // Show an application card while the team has open slots.
    if (members.length < 6) {
      html +=
        '<a class="member-card apply-card" href="' + esc(server.discord || "#") + '" data-reveal style="--rd:' + (members.length * 70) + 'ms">' +
        '<span class="feature-icon">＋</span>' +
        "<p>Join the team — staff applications are open on Discord.</p>" +
        "</a>";
    }
    teamGrid.innerHTML = html;
  }

  /* ------------------------------------------------------------------ */
  /* News / Vote / Rules                                                */
  /* ------------------------------------------------------------------ */
  const newsList = $("#newsList");
  if (newsList && CFG.news) {
    newsList.innerHTML = CFG.news.map(function (n, i) {
      return (
        '<article class="news-row" data-reveal style="--rd:' + (i * 80) + 'ms">' +
        '<div class="news-date">' + esc(n.date) + "</div>" +
        '<div class="news-body">' +
        '<span class="news-tag">' + esc(n.tag || "UPDATE") + "</span>" +
        '<h3 class="news-title">' + esc(n.title) + "</h3>" +
        '<p class="news-desc">' + esc(n.desc) + "</p>" +
        "</div></article>"
      );
    }).join("");
  }

  const voteList = $("#voteList");
  if (voteList && CFG.voteSites) {
    voteList.innerHTML = CFG.voteSites.map(function (v, i) {
      return (
        '<a class="vote-link" href="' + esc(v.url) + '" target="_blank" rel="noopener" data-reveal style="--rd:' + (i * 90) + 'ms">' +
        "<span>" + esc(v.name) + "</span><span class='arr'>→</span></a>"
      );
    }).join("");
  }

  const rulesList = $("#rulesList");
  if (rulesList && CFG.rules) {
    rulesList.innerHTML = CFG.rules.map(function (r, i) {
      return '<li class="rule" data-reveal style="--rd:' + (i * 60) + 'ms"><p>' + esc(r) + "</p></li>";
    }).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Reveal system                                                      */
  /* ------------------------------------------------------------------ */
  function revealTransform(kind) {
    if (kind === "left") return { x: -46 };
    if (kind === "right") return { x: 46 };
    if (kind === "zoom") return { scale: 0.92 };
    return { y: 30 };
  }

  function initReveals() {
    const targets = $$("[data-reveal]");
    if (!targets.length) return;

    if (hasGSAP && !reduceMotion) {
      targets.forEach(function (el) {
        const delay = parseFloat(el.style.getPropertyValue("--rd")) / 1000 || 0;
        const from = revealTransform(el.dataset.reveal);
        window.gsap.fromTo(el,
          Object.assign({ opacity: 0 }, from),
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 0.9,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true }
          });
      });

      // Parallax on the showcase backdrop.
      const showcaseBg = $("#showcaseBg");
      if (showcaseBg) {
        window.gsap.to(showcaseBg, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: "#world", start: "top bottom", end: "bottom top", scrub: true }
        });
      }
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.16 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Hero particles (lightweight pixel field)                           */
  /* ------------------------------------------------------------------ */
  function initParticles() {
    const canvas = $("#heroCanvas");
    if (!canvas || !canvas.getContext || reduceMotion) return;
    const ctx = canvas.getContext("2d");

    let width, height, particles = [], running = true;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      const count = Math.min(56, Math.max(20, Math.floor(width / 22)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.5 + Math.random() * 3,
          vy: 0.15 + Math.random() * 0.4,
          vx: (Math.random() - 0.5) * 0.15,
          alpha: 0.05 + Math.random() * 0.22,
          color: Math.random() > 0.55 ? "255,255,255" : "34,211,238",
          glow: Math.random() > 0.82
        });
      }
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach(function (p) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin((p.y + p.x) / 70) * 0.1;
        if (p.y < -8) { p.y = height + 8; p.x = Math.random() * width; }
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "rgba(" + p.color + ",1)";
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.glow) {
          ctx.globalAlpha = p.alpha * 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + p.color + ",0.5)";
          ctx.fill();
        }
      });
      requestAnimationFrame(frame);
    }

    resize();
    frame();
    window.addEventListener("resize", resize);
  }

  /* ------------------------------------------------------------------ */
  /* Typewriter                                                         */
  /* ------------------------------------------------------------------ */
  function initTypewriter() {
    const el = $("#heroType");
    const lines = heroCfg.taglines || [];
    if (!el || !lines.length) return;

    let line = 0;
    let pos = 0;
    let deleting = false;

    function step() {
      const text = lines[line];
      el.textContent = text.slice(0, pos);
      let wait = deleting ? 32 : 60;
      if (!deleting && pos === text.length) {
        wait = 1800;
        deleting = true;
      } else if (deleting && pos === 0) {
        deleting = false;
        line = (line + 1) % lines.length;
        wait = 380;
      }
      pos += deleting ? -1 : 1;
      setTimeout(step, wait);
    }
    step();
  }

  /* ------------------------------------------------------------------ */
  /* Hero logo tilt (fine pointers only)                                */
  /* ------------------------------------------------------------------ */
  function initHeroTilt() {
    if (!heroLogoWrap || !window.matchMedia("(pointer:fine)").matches || reduceMotion) return;
    const hero = $(".hero");
    if (!hero) return;
    let targetX = 0, targetY = 0, curX = 0, curY = 0, ticking = false;

    hero.addEventListener("mousemove", function (e) {
      const r = hero.getBoundingClientRect();
      targetX = ((e.clientX - r.left) / r.width - 0.5) * 9;
      targetY = ((e.clientY - r.top) / r.height - 0.5) * -9;
      if (!ticking) {
        ticking = true;
        (function loop() {
          curX += (targetX - curX) * 0.08;
          curY += (targetY - curY) * 0.08;
          heroLogoWrap.style.transform =
            "rotateY(" + curX.toFixed(2) + "deg) rotateX(" + curY.toFixed(2) + "deg)";
          if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
            requestAnimationFrame(loop);
          } else {
            ticking = false;
          }
        })();
      }
    });
    hero.addEventListener("mouseleave", function () { targetX = 0; targetY = 0; });
  }

  /* ------------------------------------------------------------------ */
  /* Navigation                                                         */
  /* ------------------------------------------------------------------ */
  function initNav() {
    const nav = $("#nav");
    const burger = $("#burger");
    const links = $("#navLinks");

    window.addEventListener("scroll", function () {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 30);
    }, { passive: true });

    if (burger && links) {
      burger.addEventListener("click", function () {
        const open = links.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(open));
      });
      $$("a", links).forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Modals, copy & globals                                             */
  /* ------------------------------------------------------------------ */
  function toast(message) {
    let node = $(".toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "toast";
      document.body.appendChild(node);
    }
    node.textContent = message;
    requestAnimationFrame(function () { node.classList.add("is-show"); });
    clearTimeout(node._t);
    node._t = setTimeout(function () { node.classList.remove("is-show"); }, 2000);
  }

  function legacyCopy(text, done) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); done(); } catch (err) {}
    area.remove();
  }

  function copyText(text, message) {
    const done = function () { toast(message || "Copied to clipboard."); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text, done); });
    } else {
      legacyCopy(text, done);
    }
  }

  function openJoin() { openModal("joinModal"); }
  function closeJoin() { closeModal("joinModal"); }
  function closeBuy() { closeModal("buyModal"); }
  function copyIP() {
    copyText(server.ip || "play.wattercraft.fun", "Server IP copied. Paste it in Minecraft!");
    openJoin();
  }

  $$(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) {
      if (e.target === m) m.classList.remove("is-open");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      $$(".modal.is-open").forEach(function (m) { m.classList.remove("is-open"); });
      document.body.style.overflow = "";
    }
  });

  // Exposed for inline handlers in index.html.
  window.copyIP = copyIP;
  window.openJoin = openJoin;
  window.closeJoin = closeJoin;
  window.closeBuy = closeBuy;

  /* ------------------------------------------------------------------ */
  /* Boot                                                               */
  /* ------------------------------------------------------------------ */
  function startHeroSequence() {
    initTypewriter();
    initHeroTilt();
  }

  initNav();
  initParticles();
  observeCounters();
  initReveals();
})();
