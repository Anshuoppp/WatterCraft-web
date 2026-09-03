/* ============================================================
   WATTERCRAFT OFFICIAL — DATA V3 (Cinematic Edition)
   Aapka control panel — yahan edit karo, code chhodo.
   Store package IDs worker.js se match karo: vip, mvp,
   gems_500, gems_1000
   ============================================================ */

const WC = {

  /* ---------- BRAND / LOGO ---------- */
  brand: {
    name: "WatterCraft",
    logo: "assets/logo.png",      // ⚠️ WATTERCRAFT 3D logo upload karo
    mark: "assets/mark.png",      // white "w" (loader/favicon)
    accent: "#22d3ee",            // cyan
    accent2: "#fb923c"            // orange — aapke logo ki bar se
  },

  /* ---------- PRELOADER ---------- */
  preloader: {
    text: "LOADING WATTERCRAFT",
    sub: "Survive. Build. Dominate the Skies."
  },

  /* ---------- HERO (CINEMATIC) ---------- */
  hero: {
    bg: "assets/lobby.png",       // ⚠️ lobby screenshot
    islandImg: "assets/island.jpg", // ⚠️ island screenshot (floating layer)
    taglines: [
      "Survive. Build. Dominate the Skies.",
      "Hypixel-Style Skyblock on Bedrock.",
      "Custom Bosses • Minions • Real Economy."
    ],
    ipNote: "Tap to copy the IP"
  },

  /* ---------- SCROLLING TICKER ---------- */
  marquee: [
    "SKYBLOCK", "CUSTOM BOSSES", "MINION SYSTEM",
    "DEEP MINING", "UPI STORE", "24/7 UPTIME",
    "BEDROCK 1.20+", "MADE IN INDIA"
  ],

  /* ---------- SERVER INFO ---------- */
  server: {
    name: "WatterCraft",
    ip: "play.wattercraft.fun",
    port: "19132",
    versions: "Bedrock 1.20+",
    region: "India",
    status: "online",
    owner: "Anshhu07",
    ownerDiscord: "Anshhu07",
    discord: "https://discord.gg/WATTERCRAFT",  // ⚠️ apna link
    storeApi: "https://wc-store.YOURUSER.workers.dev" // ⚠️ worker URL
  },

  /* ---------- ANIMATED STATS ---------- */
  stats: [
    { value: 5200, suffix: "+", label: "Discord Members" },
    { value: 2400, suffix: "+", label: "Registered Players" },
    { value: 24,   suffix: "/7", label: "Server Uptime" },
    { value: 150,  suffix: "+", label: "Custom Islands" }
  ],

  /* ---------- FEATURED WORLD (big cinematic banner) ----------
     Aapki island screenshot yahan full-screen parallax banegi */
  featured: {
    img: "assets/island.jpg",
    kicker: "THE WORLD OF WATTERCRAFT",
    title: "One Island. Infinite Possibilities.",
    desc: "Hypixel-style floating islands, private worlds, minions jo aapke liye kaam karte hain, aur sky-high custom builds — sab ek sath.",
    points: ["Private Island System", "Minion Automation", "Custom Enchants & Swords"]
  },

  /* ---------- GAMEMODES / SHOWCASE ----------
     img: screenshot ho to use hota hai, warna animated gradient */
  gamemodes: [
    {
      id: "island", icon: "🏝",
      title: "Island Survival",
      tag: "SKYBLOCK",
      desc: "Apni floating island banao, expand karo aur economy me top par jao.",
      img: "assets/island.jpg"
    },
    {
      id: "minions", icon: "⚙",
      title: "Minion System",
      tag: "AUTOMATION",
      desc: "Minions lagao jo khud collect karein — aap so jao, farm chalti rahe.",
      img: ""
    },
    {
      id: "boss", icon: "⚔",
      title: "Custom Boss Fights",
      tag: "PVE",
      desc: "Custom bosses ko solo ya squad me fight karo — legendary drops aur unique swords.",
      img: ""
    },
    {
      id: "mining", icon: "⛏",
      title: "Deep Mining",
      tag: "PROGRESSION",
      desc: "Private mines me deep jao, rare ores aur custom tools craft karo.",
      img: ""
    }
  ],

  /* ---------- FEATURES (mini cards) ---------- */
  features: [
    { icon: "🛡", title: "Anti-Cheat", desc: "Fair play — lag-free aur cheat-free experience." },
    { icon: "💰", title: "Real Economy", desc: "Player shops, auctions aur earn-to-rank system." },
    { icon: "🎉", title: "Weekly Events", desc: "Skywars nights, build contests, drop parties." },
    { icon: "⚡", title: "Low Ping India", desc: "Delhi/Mumbai hosts — 10-20ms for Indian players." }
  ],

  /* ---------- STORE (UPI) ---------- */
  store: {
    api: "https://wc-store.YOURUSER.workers.dev", // ⚠️ worker
    note: "Pay via UPI (GPay • PhonePe • Paytm) → unique code → /redeem in-game",
    packages: [
      { id: "vip",      name: "VIP",      price: 99,  color: "#4ade80", tag: "POPULAR",
        perks: ["3 Island Slots", "/fly on island", "VIP Chat Prefix", "2x Vote Rewards"] },
      { id: "mvp",      name: "MVP",      price: 199, color: "#22d3ee", tag: "BEST VALUE",
        perks: ["5 Island Slots", "/fly + /nick", "MVP Prefix + Kits", "3x Vote Rewards", "Private Warp"] },
      { id: "gems_500", name: "500 Gems", price: 49,  color: "#c084fc", tag: "",
        perks: ["500 Gems — Shop, Crates, Upgrades me use karo"] },
      { id: "gems_1000",name: "1000 Gems",price: 89,  color: "#fbbf24", tag: "20% BONUS",
        perks: ["1000 Gems + 200 Bonus Gems"] }
    ]
  },

  /* ---------- STAFF ----------
     skin empty = mc-heads avatar automatic */
  staff: [
    { name: "Anshhu07",  rank: "Owner",   discord: "Anshhu07" },
    { name: "STAFF_1",   rank: "Admin",   discord: "" },
    { name: "STAFF_2",   rank: "Sr.Mod",  discord: "" },
    { name: "STAFF_3",   rank: "Mod",     discord: "" },
    { name: "STAFF_4",   rank: "Helper",  discord: "" },
    { name: "STAFF_5",   rank: "Helper",  discord: "" }
  ],

  /* ---------- NEWS ---------- */
  news: [
    { date: "SEP 2026", tag: "UPDATE", title: "Season 2 — New Boss Island",
      desc: "Naya custom boss arena + legendary sword drops live ho gaye." },
    { date: "SEP 2026", tag: "STORE", title: "UPI Store is LIVE",
      desc: "Ab GPay/PhonePe/Paytm se ranks aur gems — instant in-game delivery." },
    { date: "AUG 2026", tag: "EVENT", title: "Skyblock Nights",
      desc: "Har Friday drop party + double minion speed weekend." }
  ],

  /* ---------- VOTE ---------- */
  vote: [
    { name: "MCPE Planets", url: "https://example.com/vote1" },   // ⚠️ links
    { name: "MCPE Servers", url: "https://example.com/vote2" }
  ],

  /* ---------- RULES ---------- */
  rules: [
    "No hacking, x-ray ya unfair mods — instant ban.",
    "Scam ya real-money trade server ke bahar — ban.",
    "Respect staff aur players. Toxicity allowed nahi.",
    "Griefing ya island raids — punishment.",
    "Bug/exploit use karna ban hai — report karo aur reward pao.",
    "Duplicating items ya currency — permanent ban."
  ],

  /* ---------- DISCORD CTA ---------- */
  discord: {
    title: "Join 5,000+ Players on Discord",
    desc: "Giveaways, staff help, ban appeals, aur community events — sab yahan."
  }
};

/* Don't edit below */
if (typeof window !== "undefined") { window.WC = WC; }
