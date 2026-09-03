/* ============================================================
   WATTERCRAFT OFFICIAL — WEBSITE DATA
   Yeh file hai aapka control panel. Bina koi coding ke yahan
   edit karo: staff add karo, rank price badlo, news likho.
   ============================================================ */

const WC = {
  /* ---------- SERVER INFO ---------- */
  server: {
    name: "WatterCraft",
    tagline: "India's Most Advanced Bedrock Skyblock Server",
    ip: "play.wattercraft.fun",
    port: "19132",
    versions: "1.20.1 – 1.26.30 (Bedrock)",
    owner: "Anshhu07",
    ownerDiscord: "Anshhu07",        // apna discord id yahan
    discord: "https://discord.gg/YOURDISCORD",   // ⚠️ apna link lagao
    vote: [                          // ⚠️ apne vote links lagao
      { name: "MCPE Planets", url: "https://example.com/vote1" },
      { name: "MCPE Servers", url: "https://example.com/vote2" }
    ]
  },

  /* ---------- STORE (Tebex) ---------- */
  store: {
    enabled: true,
    url: "https://store.wattercraft.fun",   // ⚠️ Tebex store banao to ye link lagao
    note: "Pay via UPI (GPay, PhonePe, Paytm) — rank & gems AUTO deliver hote hain server me"
  },

  /* ---------- STAFF TEAM — yahan add karo ----------
     rank options: Owner / Co-Owner / Admin / Sr.Mod / Mod / Helper
     New staff add karna: neeche copy karke array me paste karo */
  staff: [
    { name: "Anshhu07",     rank: "Owner",    discord: "Anshhu07",   skin: "" },
    { name: "YOUR_ADMIN",   rank: "Admin",    discord: "discord_id", skin: "" },
    { name: "YOUR_MOD",     rank: "Mod",      discord: "discord_id", skin: "" },
    { name: "YOUR_HELPER",  rank: "Helper",   discord: "discord_id", skin: "" }
    // Extra staff copy karo:
    // { name: "PlayerName", rank: "Mod", discord: "id", skin: "" },
  ],

  /* ---------- RANKS (Store) — price ₹ me ----------
     ⚠️ Ye SAMPLE hai — apne asli ranks aur price yahan lagao */
  ranks: [
    { name: "VIP",      price: 99,   color: "#55ff55",
      perks: ["3 Island Slots", "/fly (Skyblock)", "VIP Chat Color", "2x Vote Rewards"] },
    { name: "MVP",      price: 199,  color: "#55ffff",
      perks: ["5 Island Slots", "/fly + /nick", "MVP Chat Prefix", "3x Vote Rewards", "Private Island Boost"] },
    { name: "SKY KING", price: 399,  color: "#ffaa00",
      perks: ["Unlimited Islands", "All Commands Unlocked", "4x Vote Rewards", "Exclusive Sky King Island", "Early Access Features"] }
  ],

  /* ---------- GEMS (Store) ---------- */
  gems: [
    { name: "100 Gems",      price: 20  },
    { name: "550 Gems",      price: 99  },
    { name: "1200 Gems",     price: 199 },
    { name: "3000 Gems",     price: 449 }
  ],

  /* ---------- NEWS / UPDATES ---------- */
  news: [
    {
      title: "WatterCraft Skyblock Launched! 🎉",
      date: "2025-01-15",
      tag: "NEW",
      text: "Welcome to WatterCraft! Custom islands, working economy aur daily rewards ke saath skyblock ka naya experience."
    },
    {
      title: "UPI Store is now LIVE",
      date: "2025-01-20",
      tag: "STORE",
      text: "Ab aap GPay/PhonePe/Paytm se ranks aur gems kharid sakte ho — instant delivery!"
    }
    // Nayi news:
    // { title: "...", date: "2025-01-30", tag: "UPDATE", text: "..." },
  ],

  /* ---------- RULES ---------- */
  rules: [
    "No hacking, cheating, or using unfair mods.",
    "No disrespecting players or staff members.",
    "No inappropriate language in chat.",
    "No scamming, stealing, or island raiding without consent.",
    "Always listen to staff — they are here to help you.",
    "No spam, advertisements, or begging for ranks."
  ],

  /* ---------- DISCORD FEATURES ---------- */
  discordInfo: {
    heading: "Join Our Community",
    text: "24/7 support, events, giveaways aur sabse pehle updates — sab Discord pe."
  }
};

/* Website ko data file mil gayi — ab ise mat todna */
if (typeof window !== "undefined") { window.WC = WC; }
