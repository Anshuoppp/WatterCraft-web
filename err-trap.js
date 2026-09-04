/* WatterCraft — on-page error + motion diagnostic (remove after fix) */
(function () {
  function log(txt) {
    var d = document.createElement("div");
    d.style.cssText = "position:fixed;left:8px;bottom:8px;z-index:999999;background:#111827;border:1px solid #f87171;color:#fecaca;font:11px/1.4 monospace;padding:8px 10px;border-radius:8px;max-width:92vw;white-space:pre-wrap;box-shadow:0 8px 30px rgba(0,0,0,.5)";
    d.textContent = txt;
    document.body.appendChild(d);
  }
  window.addEventListener("error", function (e) {
    log("JS ERROR: " + (e.message || "unknown") + "  @  " + ((e.filename || "").split("/").pop() || "") + ":" + (e.lineno || "?"));
  });
  window.addEventListener("DOMContentLoaded", function () {
    var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    log("reduced-motion: " + (rm ? "YES — isliye stars static hain" : "NO — stars move karne chahiye"));
  });
})();
