/* ============================================================
   WATTERCRAFT STORE — Cloudflare Worker (FREE)
   UPI Payment → Unique Code → In-game /redeem
   ============================================================ */

// ⚠️ YAHAN EDIT KARO: apne products aur prices (₹ me).
// Ye server-side hai — player price change nahi kar sakta.
const PACKAGES = {
  vip:       { name: "VIP Rank",    price: 99,  reward: { type: "rank", id: "VIP" } },
  mvp:       { name: "MVP Rank",    price: 199, reward: { type: "rank", id: "MVP" } },
  gems_500:  { name: "500 Gems",    price: 49,  reward: { type: "gems", id: "GEMS", amount: 500 } },
  gems_1000: { name: "1000 Gems",   price: 89,  reward: { type: "gems", id: "GEMS", amount: 1000 } },
};

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 0/O/1/I nahi (confusion avoid)
const SITE_ORIGIN = "https://anshuopp.github.io";       // apni website origin

function genCode() {
  const rnd = new Uint8Array(4);
  crypto.getRandomValues(rnd);
  let s = "";
  for (const b of rnd) s += CODE_CHARS[b % CODE_CHARS.length];
  return "WC-" + s.slice(0, 4) + "-" + s.slice(4);
}

async function razorpay(env, path, body) {
  const auth = btoa(env.RAZORPAY_KEY_ID + ":" + env.RAZORPAY_KEY_SECRET);
  const res = await fetch("https://api.razorpay.com/v1/" + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Basic " + auth },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": SITE_ORIGIN,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

    // 1) Player ne "Buy" dabaya → UPI payment link banao
    if (url.pathname === "/api/checkout" && request.method === "POST") {
      const body = await request.json();
      const pkg = PACKAGES[body.packageId];
      if (!pkg) return json({ ok: false, error: "invalid_package" }, 400);

      const orderId = "ORD" + Date.now() + Math.floor(Math.random() * 999);
      const customer = { name: body.player || "WatterCraft Player" };
      if (body.email) customer.email = body.email;
      if (body.phone) customer.contact = body.phone;

      const link = await razorpay(env, "payment_links", {
        amount: pkg.price * 100,             // ₹ → paise
        currency: "INR",
        accept_partial: false,
        description: pkg.name + " — WatterCraft Official",
        callback_url: url.origin + "/api/complete?order_id=" + orderId,
        callback_method: "get",
        customer,
        notify: { sms: false, email: false },
        notes: { package_id: body.packageId, order_id: orderId },
      });

      if (!link.id) return json({ ok: false, error: "razorpay_error" }, 502);
      await env.STORE.put("order:" + orderId, JSON.stringify({ packageId: body.packageId, status: "pending", createdAt: Date.now() }));
      await env.STORE.put("plink:" + link.id, orderId);
      return json({ ok: true, orderId, paymentUrl: link.short_url });
    }

    // 2) Razorpay webhook → payment confirm → unique code banao
    if (url.pathname === "/api/webhook/razorpay" && request.method === "POST") {
      const raw = await request.text();
      const sig = request.headers.get("x-razorpay-signature") || "";
      const expected = await hmac(env.RAZORPAY_WEBHOOK_SECRET, raw);
      if (sig !== expected) return json({ ok: false, error: "bad_signature" }, 401);

      const ev = JSON.parse(raw);
      if (ev.event === "payment_link.paid") {
        const linkId = ev.payload.payment_link.entity.id;
        const orderId = await env.STORE.get("plink:" + linkId);
        if (orderId) {
          const order = JSON.parse(await env.STORE.get("order:" + orderId));
          if (order && order.status === "pending") {
            const code = genCode();
            order.status = "paid";
            order.code = code;
            await env.STORE.put("order:" + orderId, JSON.stringify(order));
            await env.STORE.put("code:" + code, JSON.stringify({ packageId: order.packageId, status: "active", orderId }));
          }
        }
      }
      return json({ ok: true });
    }

    // 3) Payment ke baad player ko code dikhao
    if (url.pathname === "/api/complete") {
      const order = JSON.parse((await env.STORE.get("order:" + url.searchParams.get("order_id"))) || "null");
      const pkg = order ? PACKAGES[order.packageId] : null;
      const ok = order && order.status === "paid" && pkg;
      const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WatterCraft — Payment</title></head>
      <body style="font-family:system-ui;background:#050d1a;color:#e2e8f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
      <div style="max-width:430px;text-align:center;padding:30px;border:1px solid rgba(56,189,248,.3);border-radius:16px;background:#0a1628">
      ${ok ? `
        <h2 style="color:#22d3ee">✅ Payment Successful!</h2>
        <p style="color:#94a3b8">${pkg.name}</p>
        <div style="font-size:1.5rem;letter-spacing:2px;background:#050d1a;padding:16px;border-radius:10px;border:1px dashed #22d3ee;margin:16px 0"><b>${order.code}</b></div>
        <p>Game me jaake ye type karo:</p>
        <code style="display:inline-block;background:#050d1a;padding:10px 16px;border-radius:8px;color:#4ade80;margin:8px 0">/redeem ${order.code}</code>
        <p style="color:#94a3b8;font-size:.85rem">Reward automatic grant hoga. Ye code sirf 1 baar use hoga.</p>`
        : `<h2 style="color:#22d3ee">⏳ Payment Pending</h2><p>Pay karne ke baad ye page refresh karo. Problem ho to Discord pe screenshot bhejo.</p>`}
      </div></body></html>`;
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // 4) Aapka PocketMine plugin ise call karega (/redeem code)
    if (url.pathname === "/api/redeem" && request.method === "POST") {
      const body = await request.json();
      const key = "code:" + (body.code || "").trim().toUpperCase();
      const rec = JSON.parse((await env.STORE.get(key)) || "null");
      if (!rec) return json({ ok: false, error: "invalid_code" });
      if (rec.status === "used") return json({ ok: false, error: "already_used" });
      rec.status = "used";
      rec.player = body.player;
      rec.uuid = body.uuid;
      rec.redeemedAt = Date.now();
      await env.STORE.put(key, JSON.stringify(rec));
      return json({ ok: true, reward: PACKAGES[rec.packageId].reward });
    }

    return json({ ok: false, error: "not_found" }, 404);
  },
};

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
