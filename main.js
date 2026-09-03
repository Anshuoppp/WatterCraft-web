/* ============================================================
   WATTERCRAFT OFFICIAL — LOGIC + 3D WATER ANIMATION
   ============================================================ */
(function () {
  "use strict";
  const D = window.WC;                 // data.js se data
  if (!D) { console.error("data.js missing!"); return; }

  /* ---------- Helpers ---------- */
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* small CSS fixes (anchor offset + hero fallback) */
  const st = document.createElement("style");
  st.textContent = "section{scroll-margin-top:80px}" +
    ".hero{background:radial-gradient(1200px 600px at 70% -10%,#123a6b,#050d1a 60%)}" +
    ".staff-avatar{background-size:cover;background-position:center}";
  document.head.appendChild(st);

  /* ---------- Server info fill ---------- */
  const S = D.server;
  if ($("#heroTagline"))  $("#heroTagline").textContent  = S.tagline;
  if ($("#ipText"))       $("#ipText").textContent       = S.ip;
  if ($("#joinIp"))       $("#joinIp").textContent       = S.ip;
  if ($("#joinPort"))     $("#joinPort").textContent     = S.port;
  if ($("#joinVersions")) $("#joinVersions").textContent = S.versions;

  /* ---------- Store ---------- */
  if (D.store) {
    const btn = $("#storeBtn");
    if (btn) { btn.href = D.store.url; if (!D.store.enabled) btn.textContent = "⏳ Store Coming Soon"; }
    const note = $("#storeNote");
    if (note && D.store.note) note.textContent = D.store.note;
  }

  /* ---------- Rank / Gem cards ---------- */
  const rankIco = (n) => (/king/i.test(n) ? "👑" : /mvp/i.test(n) ? "💎" : /vip/i.test(n) ? "🟢" : "⭐");

  if ($("#gemsGrid") && D.gems) {
    $("#gemsGrid").innerHTML = D.gems.map((g, i) => `
      <div class="gem-card reveal">
        <div class="gem-ico">💎</div><h4>${esc(g.name)}</h4>
        <div class="gem-price">₹${esc(g.price)}</div>
        <button class="btn btn-primary btn-sm buy-btn" style="margin-top:12px;width:100%" onclick="window.open('${esc(D.store.url)}','_blank')">Buy Now</button>
      </div>`).join("");
  }

  if ($("#ranksGrid") && D.ranks) {
    $("#ranksGrid").innerHTML = D.ranks.map((r, i) => `
      <div class="rank-card reveal" style="--rc:${esc(r.color)}">
        <div class="rank-ico">${rankIco(r.name)}</div>
        <h3>${esc(r.name)}</h3>
        <div class="rank-price">₹${esc(r.price)}</div>
        <ul class="perks">${r.perks.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <button class="btn btn-primary buy-btn" onclick="window.open('${esc(D.store.url)}','_blank')">Buy ${esc(r.name)}</button>
      </div>`).join("");
  }

  /* ---------- Staff ---------- */
  const roleColor = (r) => {
    const m = { "owner": "#fbbf24", "co-owner": "#fb923c", "admin": "#f87171",
                "sr.mod": "#4ade80", "mod": "#22d3ee", "helper": "#818cf8" };
    for (const k in m) if (r.toLowerCase().includes(k)) return m[k];
    return "#22d3ee";
  };

  if ($("#staffGrid") && D.staff) {
    $("#staffGrid").innerHTML = D.staff.map((m, i) => {
      const c = roleColor(m.rank);
      const letter = esc((m.name || "?").charAt(0).toUpperCase());
      const avatarStyle = m.skin
        ? `style="background-image:url('${esc(m.skin)}');color:transparent"`
        : `style="--rc:${c}"`;
      return `
      <div class="staff-card reveal" style="--rc:${c}">
        <div class="staff-avatar" ${avatarStyle}>${m.skin ? "" : letter}</div>
        <h4>${esc(m.name)}</h4>
        <span class="staff-role">${esc(m.rank)}</span>
        <div class="staff-disc">💬 ${esc(m.discord || "—")}</div>
      </div>`;
    }).join("");
  }

  /* ---------- News ---------- */
  if ($("#newsList") && D.news) {
    $("#newsList").innerHTML = D.news.map((n, i) => `
      <div class="news-item reveal">
        <div class="news-meta"><span class="news-tag">${esc(n.tag || "UPDATE")}</span>
        <span class="news-date">📅 ${esc(n.date)}</span></div>
        <h4>${esc(n.title)}</h4><p>${esc(n.text)}</p>
      </div>`).join("");
  }

  /* ---------- Vote ---------- */
  if ($("#voteBtns") && S.vote && S.vote.length) {
    $("#voteBtns").innerHTML = S.vote.map((v, i) =>
      `<a class="vote-btn reveal" href="${esc(v.url)}" target="_blank" rel="noopener">🗳️ ${esc(v.name)}</a>`).join("");
  }

  /* ---------- Rules ---------- */
  if ($("#rulesList") && D.rules) {
    $("#rulesList").innerHTML = D.rules.map((r, i) => `<li>${esc(r)}</li>`).join("");
  }

  /* ---------- Discord ---------- */
  const dBtn = $("#discordBtn");
  if (dBtn && S.discord) dBtn.href = S.discord;
  const dh = $("#discordHeading"), dt = $("#discordText");
  if (D.discordInfo) {
    if (dh && D.discordInfo.heading) dh.textContent = D.discordInfo.heading;
    if (dt && D.discordInfo.text) dt.textContent = D.discordInfo.text;
  }

  /* ---------- Copy IP + Modal ---------- */
  window.copyIP = function () {
    const ip = S.ip;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ip).then(() => showModal());
    } else {
      const ta = document.createElement("textarea");
      ta.value = ip; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove(); showModal();
    }
  };
  function showModal() {
    const m = $("#ipModal");
    const mi = $("#modalIp"); if (mi) mi.textContent = S.ip;
    if (m) m.classList.add("active");
  }
  window.closeModal = function () { const m = $("#ipModal"); if (m) m.classList.remove("active"); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---------- Navbar ---------- */
  const nav = $("#navbar"), links = $("#navLinks"), burger = $("#hamburger");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
  });
  if (burger && links) {
    burger.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  }

  /* ---------- Scroll Reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ============================================================
     3D WATER + FLOATING ISLAND (Three.js)
     ============================================================ */
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = $("#hero3d");
  const hasWebGL = (() => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; } })();

  if (canvas && hasWebGL && !reduced && window.THREE) {
    try {
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0a1628, 18, 60);

      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
      camera.position.set(0, 6, 18);
      camera.lookAt(0, 1, 0);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /* lights */
      scene.add(new THREE.HemisphereLight(0x88ccff, 0x0a1a33, 0.9));
      const sun = new THREE.DirectionalLight(0xfff5d0, 1.2); sun.position.set(10, 20, 8); scene.add(sun);

      /* moon / sun glow */
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xbfdbfe, fog: false })
      );
      glow.position.set(-18, 14, -24); scene.add(glow);

      /* ---- floating minecraft-style island ---- */
      const island = new THREE.Group();
      const mat = (c) => new THREE.MeshLambertMaterial({ color: c });
      const box = (w, h, d, c, x, y, z) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));
        m.position.set(x, y, z); island.add(m); return m;
      };
      /* grass top + dirt core (stepped like a skyblock island) */
      box(6, 1, 6, 0x7bd65a, 0, 0.5, 0);
      box(5, 1.4, 5, 0x8a5a2b, 0, -0.7, 0);
      box(4, 1.6, 4, 0x6b4423, 0, -2, 0);
      box(3, 1.6, 3, 0x8a5a2b, 0, -3.4, 0);
      box(1.5, 1.8, 1.5, 0x5c3a1e, 0, -5, 0);
      /* tree */
      box(0.8, 2.2, 0.8, 0x6b4423, 1.6, 1.6, 1);
      box(1.8, 1.8, 1.8, 0x2f9e44, 1.6, 3.2, 1);
      box(0.8, 0.8, 0.8, 0x2f9e44, 1.6, 4.2, 1);
      /* crystal */
      const gem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.8),
        new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x0891b2, emissiveIntensity: 0.9 })
      );
      gem.position.set(-2, 2.4, -1.5); island.add(gem);
      scene.add(island);

      /* ---- water plane ---- */
      const geo = new THREE.PlaneGeometry(90, 90, 70, 70);
      geo.rotateX(-Math.PI / 2);
      const water = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
        color: 0x0e5a8a, transparent: true, opacity: 0.82,
        shininess: 90, specular: 0x66ccff
      }));
      water.position.y = -7.2; scene.add(water);

      /* particles (bubbles) */
      const parts = new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({ color: 0x88ddff, size: 0.08, transparent: true, opacity: 0.6 })
      );
      const pos = [];
      for (let i = 0; i < 350; i++) pos.push((Math.random() - 0.5) * 60, Math.random() * 18 - 6, (Math.random() - 0.5) * 60);
      parts.geometry.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      scene.add(parts);

      /* ---- animate ---- */
      let t = 0, mx = 0, my = 0;
      window.addEventListener("mousemove", (e) => {
        mx = (e.clientX / innerWidth - 0.5) * 2;
        my = (e.clientY / innerHeight - 0.5) * 2;
      }, { passive: true });

      const tick = () => {
        t += 0.016;
        /* waves */
        const p = water.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          const x = p.getX(i), z = p.getZ(i);
          p.setY(i, Math.sin(x * 0.28 + t * 1.4) * 0.55 + Math.cos(z * 0.33 + t * 1.1) * 0.55);
        }
        p.needsUpdate = true;
        water.geometry.computeVertexNormals();

        island.position.y = Math.sin(t * 0.8) * 0.35;
        island.rotation.y = t * 0.1;
        gem.rotation.y = t * 1.5;
        gem.position.y = 2.4 + Math.sin(t * 2) * 0.25;

        camera.position.x += (mx * 1.6 - camera.position.x) * 0.02;
        camera.position.y += (6 - my * 0.8 - camera.position.y) * 0.02;
        camera.lookAt(0, 1, 0);

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
      };

      const resize = () => {
        const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", resize);
      resize();
      tick();
    } catch (err) {
      console.warn("3D disabled:", err);
    }
  } else if (canvas) {
    canvas.style.display = "none";   /* hero gradient fallback already in CSS */
  }
})();
                 
