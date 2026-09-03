/* ============================================================
   WATTERCRAFT OFFICIAL — LOGIC V2
   Video hero + Store checkout (UPI connect) + saare sections
   data.js (V2) se khud bhar jaate hain.
   ============================================================ */
(function () {
  "use strict";
  const D = window.WC;
  if (!D) { console.error("data.js (V2) missing!"); return; }

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ================= HERO: asli gameplay video ================= */
  const H = D.hero || {};
  const v = $("#heroVideo");
  if (v) {
    if (H.video) {
      const src = document.createElement("source");
      src.src = H.video; src.type = "video/mp4";
      v.appendChild(src);
      if (H.poster) v.poster = H.poster;
      v.addEventListener("canplay", () => v.classList.add("ready"), { once: true });
      v.addEventListener("error", () => { /* fallback gradient bg hi rahega */ }, true);
      v.load();
    } else if (H.poster) {
      v.style.background = `url('${H.poster}') center/cover no-repeat`;
      v.classList.add("ready");
    }
  }
  if ($("#heroBadge") && H.badge) $("#heroBadge").textContent = H.badge;

  /* ================= SERVER INFO ================= */
  const S = D.server || {};
  if (S.tagline && $("#heroTagline")) $("#heroTagline").textContent = S.tagline;
  if (S.ip && $("#ipText")) $("#ipText").textContent = S.ip;
  if (S.ip && $("#joinIp")) $("#joinIp").textContent = S.ip;
  if (S.port && $("#joinPort")) $("#joinPort").textContent = S.port;
  if (S.versions && $("#joinVersions")) $("#joinVersions").textContent = S.versions;
  if (S.discord) {
    if ($("#navDiscord")) $("#navDiscord").href = S.discord;
    if ($("#discordBtn")) $("#discordBtn").href = S.discord;
  }
  if (S.owner) {
    if ($("#staffOwner")) $("#staffOwner").textContent = S.owner;
    if ($("#footerOwner")) $("#footerOwner").textContent = S.owner;
  }
  const dc = D.discord || {};
  if (dc.title && $("#discordTitle")) $("#discordTitle").textContent = dc.title;
  if (dc.desc && $("#discordDesc")) $("#discordDesc").textContent = dc.desc;

  /* ================= STATS ================= */
  const statsRow = $("#statsRow");
  if (statsRow && D.stats) {
    statsRow.innerHTML = D.stats.map((s, i) =>
      `<div class="stat-item reveal">
         <div class="stat-value">${esc(s.value)}</div>
         <div class="stat-label">${esc(s.label)}</div>
       </div>`).join("");
  }

  /* ================= GAMEMODES ================= */
  const modesGrid = $("#modesGrid");
  if (modesGrid && D.gamemodes) {
    modesGrid.innerHTML = D.gamemodes.map((m, i) => `
      <article class="mode-card reveal" style="transition-delay:${i * 60}ms">
        <div class="mode-media">
          <img src="${esc(m.poster || "")}" alt="${esc(m.title)}" loading="lazy"
               onerror="this.style.display='none'">
        </div>
        <div class="mode-shade"></div>
        <div class="mode-icon">${esc(m.icon || "")}</div>
        ${m.tag ? `<span class="mode-tag">${esc(m.tag)}</span>` : ""}
        <div class="mode-body">
          <h3>${esc(m.title)}</h3>
          <p>${esc(m.desc)}</p>
        </div>
      </article>`).join("");
  }

  /* ================= STORE (UPI CONNECT) ================= */
  const ST = D.store || {};
  const API = ST.api || (S.storeUrl || "");

  const stepsEl = $("#storeSteps");
  if (stepsEl && ST.steps) {
    stepsEl.innerHTML = ST.steps.map((st, i) =>
      `<div class="store-step"><b>${i + 1}</b><span>${esc(st)}</span></div>`).join("");
  }
  if ($("#storeNote") && ST.note) $("#storeNote").textContent = ST.note;

  const grid = $("#storeGrid");
  if (grid && ST.packages) {
    grid.innerHTML = ST.packages.map((p, i) => `
      <div class="store-card ${p.featured ? "featured" : ""} reveal" style="--rc:${esc(p.color)};transition-delay:${i * 60}ms">
        ${p.tag ? `<span class="store-tag">${esc(p.tag)}</span>` : ""}
        <div class="store-icon">${esc(p.icon || "")}</div>
        <h3 style="color:${esc(p.color)}">${esc(p.name)}</h3>
        <div class="store-price">₹${esc(p.price)}<small> one-time</small></div>
        <ul>${(p.perks || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <button class="btn btn-primary buy-btn" onclick="buyNow('${esc(p.id)}')">Buy ${esc(p.name)}</button>
      </div>`).join("");
  }

  /* --- Store modal flow --- */
  let currentPkg = null;
  window.buyNow = function (id) {
    const p = (ST.packages || []).find((x) => x.id === id);
    if (!p) return;
    currentPkg = p;
    $("#modalPkgInfo").innerHTML =
      `<span>${esc(p.name)}</span><b>₹${esc(p.price)}</b>`;
    $("#modalStatus").textContent = "";
    $("#buyEmail").value = "";
    $("#storeModal").classList.add("open");
    setTimeout(() => $("#buyName").focus(), 100);
  };

  window.closeStoreModal = function () { $("#storeModal").classList.remove("open"); };

  window.startCheckout = async function () {
    const status = $("#modalStatus");
    const name = $("#buyName").value.trim();
    const email = $("#buyEmail").value.trim();
    if (!currentPkg) return;
    if (!name) { status.textContent = "⚠️ Apna Minecraft username daalo."; return; }
    if (!API) { status.textContent = "⚠️ Worker API URL data.js me set nahi hai."; return; }

    const btn = $("#modalConfirm");
    btn.disabled = true;
    status.textContent = "⏳ Payment link bana rahe hain...";

    try {
      const res = await fetch(API + "/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: currentPkg.id, player: name, email: email || undefined }),
      });
      const data = await res.json();
      if (data.ok && data.paymentUrl) {
        window.location.href = data.paymentUrl;   // Razorpay UPI page
      } else {
        status.textContent = "❌ Error: " + (data.error || "unknown") + ". Discord pe report karo.";
        btn.disabled = false;
      }
    } catch (e) {
      status.textContent = "❌ Network error — Worker URL check karo.";
      btn.disabled = false;
    }
  };

  /* ================= STAFF ================= */
  const roleColor = (r) => {
    const m = { "owner": "#fbbf24", "co-owner": "#fb923c", "admin": "#f87171",
                "sr.mod": "#4ade80", "mod": "#22d3ee", "helper": "#a78bfa", "trial": "#94a3b8" };
    const k = String(r || "").toLowerCase();
    return m[k] || "#22d3ee";
  };
  const avatarFor = (st) => {
    if (st.avatar) return `background-image:url('${esc(st.avatar)}')`;
    if (st.skin)  return `background-image:url('https://mc-heads.net/avatar/${encodeURIComponent(st.skin)}/160')`;
    return "";
  };
  const initials = (n) => String(n || "?").slice(0, 2).toUpperCase();

  const staffGrid = $("#staffGrid");
  if (staffGrid && D.staff) {
    staffGrid.innerHTML = D.staff.map((st, i) => {
      const bg = avatarFor(st);
      const color = roleColor(st.rank);
      return `
      <div class="staff-card reveal" style="transition-delay:${i * 50}ms">
        <div class="staff-avatar" style="${bg}">${bg ? "" : `<span class="initials">${esc(initials(st.name))}</span>`}</div>
        <h4>${esc(st.name)}</h4>
        <span class="staff-role" style="color:${color};border-color:${color}55;background:${color}14">${esc(st.rank)}</span>
        ${st.discord ? `<div class="staff-discord">Discord: ${esc(st.discord)}</div>` : ""}
      </div>`;
    }).join("");
  }

  /* ================= NEWS ================= */
  const newsList = $("#newsList");
  if (newsList && D.news) {
    newsList.innerHTML = D.news.map((n, i) => `
      <article class="news-item reveal" style="transition-delay:${i * 70}ms">
        <div class="news-meta">
          <span class="news-date">${esc(n.date)}</span>
          ${n.tag ? `<span class="news-tag">${esc(n.tag)}</span>` : ""}
        </div>
        <div class="news-body">
          <h4>${esc(n.title)}</h4>
          <p>${esc(n.text)}</p>
        </div>
      </article>`).join("");
  }

  /* ================= VOTE ================= */
  const voteRow = $("#voteRow");
  if (voteRow && D.vote) {
    voteRow.innerHTML = D.vote.map((v) =>
      `<a class="vote-btn" href="${esc(v.url)}" target="_blank" rel="noopener">⬆ Vote on ${esc(v.name)}</a>`).join("");
  }
  if ($("#voteRewards") && D.voteRewards) $("#voteRewards").textContent = D.voteRewards;

  /* ================= RULES ================= */
  const rulesList = $("#rulesList");
  if (rulesList && D.rules) {
    rulesList.innerHTML = D.rules.map((r) => `<li>${esc(r)}</li>`).join("");
  }

  /* ================= COPY IP ================= */
  window.copyIP = function () {
    const ip = (S.ip || "").trim();
    if (!ip) return;
    const done = () => {
      const c = $(".ip-copy");
      if (c) { const old = c.textContent; c.textContent = "Copied!"; setTimeout(() => (c.textContent = old), 1600); }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(ip).then(done).catch(() => fallback(ip, done));
    } else fallback(ip, done);
  };
  function fallback(ip, done) {
    const ta = document.createElement("textarea");
    ta.value = ip; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    document.body.removeChild(ta);
  }
  window.closeJoinModal = function () { $("#joinModal").classList.remove("open"); };

  /* ================= NAVBAR ================= */
  const nav = $("#navbar");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#hamburger");
  const links = $("#navLinks");
  if (burger && links) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      links.classList.toggle("open");
    });
    links.querySelectorAll("a,button").forEach((el) =>
      el.addEventListener("click", () => {
        burger.classList.remove("open"); links.classList.remove("open");
      }));
  }

  /* ================= REVEAL ON SCROLL ================= */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ================= FOOTER YEAR ================= */
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  console.log("WatterCraft V2 loaded ✔");
})();
