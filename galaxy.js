/* WatterCraft V2.5 - Galaxy BG + Day/Night Hub (clean build) */
(function () {
"use strict";
var ANIMATE = true; /* stars hamesha move karenge */

/* remove old layers if any */
var old = document.getElementById("wcBg");
if (old && old.parentNode) old.parentNode.removeChild(old);
old = document.getElementById("wcStars");
if (old && old.parentNode) old.parentNode.removeChild(old);

/* day/night by visitor local time: 6AM-6PM day, else night */
var h = new Date().getHours();
var day = h >= 6 && h < 18;
var want = day
  ? ["assets/hub-day.png", "assets/hub-day.jpg"]
  : ["assets/hub-night.png", "assets/hub-night.jpg"];

var bg = document.createElement("div");
bg.id = "wcBg";
bg.setAttribute("aria-hidden", "true");
document.body.appendChild(bg);

var css = document.createElement("style");
css.textContent =
"#wcBg{position:fixed;inset:0;z-index:-2;pointer-events:none;background:#04070f center/cover no-repeat}" +
"#wcBg::after{content:'';position:absolute;inset:0;background:linear-gradient(rgba(4,7,15,.42),rgba(4,7,15,.78) 75%,rgba(2,4,10,.92))}" +
"#wcStars{position:fixed;inset:0;z-index:-1;pointer-events:none}";
(document.head || document.documentElement).appendChild(css);

var pf = document.getElementById("pixelField");
if (pf) pf.style.display = "none";

/* try images in order until one loads */
var idx = 0;
function tryImage() {
  if (idx >= want.length) {
    bg.style.background = "radial-gradient(1000px 620px at 80% -5%, rgba(34,211,238,.09), transparent 60%), radial-gradient(900px 700px at -8% 35%, rgba(37,99,235,.14), transparent 55%), #04070f";
    return;
  }
  var im = new Image();
  im.onload = function () { bg.style.backgroundImage = "url('" + want[idx] + "')"; };
  im.onerror = function () { idx++; tryImage(); };
  im.src = want[idx];
}
tryImage();

/* star canvas */
var cv = document.createElement("canvas");
cv.id = "wcStars";
cv.setAttribute("aria-hidden", "true");
document.body.appendChild(cv);
var ctx = cv.getContext("2d");
var W = 0, H = 0, stars = [], shoot = null, raf = 0, lastT = 0, nextShoot = 0;

function resize() {
  W = cv.width = window.innerWidth;
  H = cv.height = window.innerHeight;
  var n = W < 720 ? 55 : 150;
  stars = [];
  for (var i = 0; i < n; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.3 + 0.3, a: Math.random() * 0.55 + 0.2,
      s: Math.random() * 0.12 + 0.02, tw: Math.random() * 6.28 });
  }
}

function spawnShoot() {
  shoot = { x: W * 0.3 + Math.random() * W * 0.6, y: Math.random() * H * 0.3,
    vx: -(2 + Math.random() * 2.5), vy: 0.8 + Math.random() * 1, age: 0 };
}

function frame(t) {
  raf = requestAnimationFrame(frame);
  if (!lastT) lastT = t;
  var dt = (t - lastT) / 1000;
  lastT = t;
  ctx.clearRect(0, 0, W, H);
  var i, st;
  for (i = 0; i < stars.length; i++) {
    st = stars[i];
    st.x -= st.s;
    st.y += st.s * 0.15;
    st.tw += dt * 1.6;
    if (st.x < -3) { st.x = W + 3; st.y = Math.random() * H; }
    if (st.y > H + 3) { st.y = -3; }
    var al = st.a * (0.55 + 0.45 * Math.sin(st.tw));
    if (al < 0) al = 0;
    if (al > 1) al = 1;
    ctx.globalAlpha = al;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, 6.283);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (t > nextShoot) {
    nextShoot = t + 5000 + Math.random() * 8000;
    if (!shoot) spawnShoot();
  }
  if (shoot) {
    shoot.x += shoot.vx;
    shoot.y += shoot.vy;
    shoot.age++;
    var fade = shoot.age > 70 ? (90 - shoot.age) / 20 : 1;
    if (fade <= 0 || shoot.x < -80 || shoot.y > H + 80) { shoot = null; }
    else {
      var L = 60, gx = shoot.x - shoot.vx * L, gy = shoot.y - shoot.vy * L;
      var g = ctx.createLinearGradient(gx, gy, shoot.x, shoot.y);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(1, "rgba(255,255,255," + (0.8 * fade) + ")");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(shoot.x, shoot.y);
      ctx.stroke();
    }
  }
}

window.addEventListener("resize", resize);
document.addEventListener("visibilitychange", function () {
  if (document.hidden) cancelAnimationFrame(raf);
  else if (ANIMATE) { lastT = 0; raf = requestAnimationFrame(frame); }
});

resize();
if (ANIMATE) raf = requestAnimationFrame(frame);
})();
