/* ============================================================
   WatterCraft V2.5 — Galaxy Background Engine
   Full-page hub background + lightweight starfield + rare
   shooting stars. Self-contained: injects its own DOM + CSS.
   Respects prefers-reduced-motion. Never blocks the UI.
   ============================================================ */
(function () {
  "use strict";
  try {
    var CONF = {
      /* First image that loads wins. Order = preference.
         Upload hub-night.png & hub-day.png into assets/. */
      images: [
        "assets/hub-night.png", "assets/hub-night.jpg",
        "assets/hub-day.png",  "assets/hub-day.jpg",
        "assets/lobby.png",    "assets/lobby.jpg"
      ],
      overlay: "linear-gradient(rgba(4,7,15,.42), rgba(4,7,15,.78) 75%, rgba(2,4,10,.92))",
      desktopStars: 150,
      mobileStars: 50,
      shootMin: 5000,
      shootMax: 12000
    };
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var mobile = window.innerWidth < 720;
    var body = document.body;

    /* ---------- background photo layer ---------- */
    var bg = document.createElement("div");
    bg.id = "wcBg";
    bg.setAttribute("aria-hidden", "true");
    body.appendChild(bg);

    /* ---------- styles (scoped ids, pointer-events none) ---------- */
    var style = document.createElement("style");
    style.textContent =
      "#wcBg{position:fixed;inset:0;z-index:-2;pointer-events:none;background-position:center;" +
      "background-size:cover;background-repeat:no-repeat;}" +
      "#wcBg::after{content:\"\";position:absolute;inset:0;background:" + CONF.overlay + ";}" +
      "#wcStars{position:fixed;inset:0;z-index:-1;pointer-events:none;display:block;}";
    (document.head || document.documentElement).appendChild(style);

    /* old floating pixel field would clash over the photo — hide it */
    var pf = document.getElementById("pixelField");
    if (pf) pf.style.display = "none";

    /* ---------- load first available image ---------- */
    (function pick(i) {
      if (i >= CONF.images.length) {           /* graceful fallback */
        bg.style.background =
          "radial-gradient(1000px 620px at 80% -5%, rgba(34,211,238,.09), transparent 60%)," +
          "radial-gradient(900px 700px at -8% 35%, rgba(37,99,235,.14), transparent 55%), #04070f";
        return;
      }
      var img = new Image();
      img.onload = function () {
        bg.style.backgroundImage = "url('" + CONF.images[i] + "')";
      };
      img.onerror = function () { pick(i + 1); };
      img.src = CONF.images[i];
    })(0);

    /* ---------- star canvas ---------- */
    var cv = document.createElement("canvas");
    cv.id = "wcStars";
    cv.setAttribute("aria-hidden", "true");
    body.appendChild(cv);
    var ctx = cv.getContext("2d");
    if (!ctx) return;

    var W = 0, H = 0, stars = [], shoot = null, raf = 0, lastT = 0, nextShoot = 0;
    var tints = ["255,255,255", "214,240,255", "255,240,214", "190,230,255"];

    function build() {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(mobile ? CONF.mobileStars : CONF.desktopStars, Math.round(W * H / 9000));
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() < 0.85 ? Math.random() * 0.9 + 0.4 : Math.random() * 1.4 + 0.9,
          a: Math.random() * 0.5 + 0.4,
          ph: Math.random() * Math.PI * 2,
          sp: Math.random() * 1.6 + 0.5,
          vx: (Math.random() - 0.5) * 0.05,
          vy: Math.random() * 0.035 + 0.012,
          c: tints[(Math.random() * tints.length) | 0]
        });
      }
    }

    function drawStatic() {           /* reduced motion: single frame */
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.globalAlpha = s.a;
        ctx.fillStyle = "rgb(" + s.c + ")";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function spawnShoot(t) {
      var x = Math.random() * W * 0.7 + W * 0.15;
      var y = Math.random() * H * 0.3;
      var vx = -(Math.random() * 1.2 + 2.4);
      shoot = { x: x, y: y, vx: vx, vy: Math.abs(vx) * 0.42, age: 0, max: 70 };
      nextShoot = t + CONF.shootMin + Math.random() * (CONF.shootMax - CONF.shootMin);
    }

    function frame(t) {
      raf = requestAnimationFrame(frame);
      var dt = t - (lastT || t); lastT = t; if (dt > 100) dt = 100;
      ctx.clearRect(0, 0, W, H);
      var i, s;

      for (i = 0; i < stars.length; i++) {          /* slow drift + twinkle */
        s = stars[i];
        s.x += s.vx * dt * 0.06;
        s.y += s.vy * dt * 0.06;
        if (s.y > H + 2) { s.y = -2; s.x = Math.random() * W; }
        if (s.x > W + 2) s.x = -2; else if (s.x < -2) s.x = W + 2;
        var tw = 0.55 + 0.45 * Math.sin(t * 0.001 * s.sp + s.ph);
        ctx.globalAlpha = s.a * tw;
        ctx.fillStyle = "rgb(" + s.c + ")";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (t > nextShoot && !shoot) spawnShoot(t);    /* rare shooting star */
      if (shoot) {
        shoot.age++;
        shoot.x += shoot.vx * 0.9;
        shoot.y += shoot.vy * 0.9;
        var fade = shoot.age > shoot.max - 24 ? (shoot.max - shoot.age) / 24 : 1;
        if (fade <= 0 || shoot.x < -60 || shoot.y > H + 60) { shoot = null; }
        else {
          var L = 64, gx = shoot.x - shoot.vx * L, gy = shoot.y - shoot.vy * L;
          var grad = ctx.createLinearGradient(gx, gy, shoot.x, shoot.y);
          grad.addColorStop(0, "rgba(255,255,255,0)");
          grad.addColorStop(1, "rgba(255,255,255," + (0.85 * fade) + ")");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(shoot.x, shoot.y); ctx.stroke();
        }
      }
    }

    function start() {
      if (reduce) { drawStatic(); return; }
      cancelAnimationFrame(raf);
      nextShoot = performance.now() + CONF.shootMin + Math.random() * (CONF.shootMax - CONF.shootMin);
      lastT = 0;
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", function () {
      build();
      if (reduce) drawStatic();
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) start();
    });

    build();
    start();
  } catch (e) {
    console.warn("[WatterCraft] Galaxy background disabled:", e);
  }
})();
