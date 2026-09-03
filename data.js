/* ============================================================
   WATTERCRAFT OFFICIAL — DATA v2 (Aapka Control Panel)
   Coding ki zaroorat nahi — bas yahan edit karo.
   ⚠️ Store package ke ID worker.js (PACKAGES) se match hone
   chahiye: vip, mvp, gems_500, gems_1000
   ============================================================ */

const WC = {
  /* ================= SERVER INFO ================= */
  server: {
    name: "WatterCraft",
    tagline: "Survive. Build. Dominate the Skies.",
    ip: "play.wattercraft.fun",
    port: "19132",
    versions: "Bedrock 1.20+",
    region: "🇮🇳 India",
    status: "online",
    owner: "Anshhu07",
    ownerDiscord: "Anshhu07",                    // ⚠️ apna discord id
    discord: "https://discord.gg/WATTERCRAFT",   // ⚠️ APNA DISCORD LINK LAGAO
    storeUrl: "https://wc-store.YOURUSER.workers.dev",  // ⚠️ Worker URL (checkout API)
  },

  /* ================= HERO =================
     assets/hero.mp4 (video) + assets/hero.jpg (poster)
     Video nahi hai → sirf poster image kaam karegi */
  hero: {
    video: "assets/hero.mp4",
    poster: "assets/hero.jpg",
    badge: "BEDROCK SKYBLOCK  •  24/7  •  INDIA",
  },

  /* ================= STATS BAR ================= */
  stats: [
    { value: "5,000+", label: "Discord Members" },
    { value: "2,000+", label: "Registered Players" },
    { value: "24/7",   label: "Uptime" },
    { value: "1.20+",  label: "Supported Versions" },
  ],

  /* ================= GAMEMODES / SHOWCASE =================
     Images yahan daalo: assets/modes/<name>.jpg
     (Aapke server ke asli screenshots/clips best lagte hain) */
  gamemodes: [
    {
      id: "island",
      icon: "🏝️",
      tag: "SKYBLOCK",
      title: "Island Survival",
      desc: "Apni floating island banao, bado aur survival me sabse upar jao. Hypixel-style map pe pure Skyblock experience.",
      poster: "assets/modes/island.jpg",
      video: "assets/modes/island.mp4",          // optional
    },
    {
      id: "minions",
      icon: "🤖",
      tag: "AUTOMATION",
      title: "Minion System",
      desc: "Minions lagaao jo khud resources collect karein — aap soye raho, farm chalti rahe.",
      poster: "assets/modes/minions.jpg",
      video: "",
    },
    {
      id: "boss",
      icon: "⚔️",
      tag: "PVE",
      title: "Custom Boss Fights",
      desc: "Hamare custom bosses ko solo ya squad ke saath fight karo — legendary drops aur unique swords kaate.",
      poster: "assets/modes/boss.jpg",
      video: "assets/modes/boss.mp4",            // optional
    },
    {
      id: "mining",
      icon: "⛏️",
      tag: "PROGRESSION",
      title: "Deep Mining & Ores",
      desc: "Private mines me deep jao, rare ores nikalo, custom swords aur tools craft karo.",
      poster: "assets/modes/mining.jpg",
      video: "",
    },
  ],

  /* ================= STORE (UPI — connect system) =================
     🔴 Package IDs worker.js ke PACKAGES se MATCH hone chahiye:
        vip, mvp, gems_500, gems_1000
     Naya package add karna → dono files me same id daalo */
  store: {
    enabled: true,
    api: "https://wc-store.YOURUSER.workers.dev",  // ⚠️ checkout API (server.api.storeUrl bhi update karo)
    note: "UPI se pay karo (GPay, PhonePe, Paytm) → unique code milega → in-game /redeem karo. Delivery automatic!",
    steps: [
      "Buy dabao → UPI se payment karo",
      "Unique code milega (WC-XXXX-XXXX)",
      "In-game /redeem <code> type karo",
      "Rank/Gems turant grant! ✅",
    ],
    packages: [
      {
        id: "vip",
        name: "VIP",
        type: "rank",
        price: 99,
        icon: "🟢",
        color: "#55ff55",
        tag: "",
        featured: false,
        perks: [
          "2 Extra Island Slots",
          "/fly (Skyblock)",
          "VIP Chat Color",
          "2x Vote Rewards",
          "Special VIP Tag",
        ],
      },
      {
        id: "mvp",
        name: "MVP",
        type: "rank",
        price: 199,
        icon: "💎",
        color: "#55ffff",
        tag: "MOST POPULAR",
        featured: true,
        perks: [
          "5 Extra Island Slots",
          "/fly + /nick",
          "MVP Chat Color",
          "3x Vote Rewards",
          "Weekly Mystery Crate",
          "MVP Tag + Glow",
        ],
      },
      {
        id: "gems_500",
        name: "500 Gems",
        type: "gems",
        price: 49,
        icon: "💠",
        color: "#38bdf8",
        tag: "",
        featured: false,
        perks: [
          "500 Gems balance",
          "Shop me kharidne layak",
          "Instant in-game delivery",
        ],
      },
      {
        id: "gems_1000",
        name: "1000 Gems",
        type: "gems",
        price: 89,
        icon: "💠",
        color: "#38bdf8",
        tag: "BEST VALUE",
        featured: false,
        perks: [
          "1000 Gems balance",
          "500 Gems se 2x zyada",
          "Instant in-game delivery",
        ],
      },
    ],
  },

  /* ================= STAFF TEAM =================
     New staff add: array me copy-paste karo
     skin = Minecraft username (avatar auto banega)
     avatar = (optional) koi bhi image URL */
  staff: [
    { name: "Anshhu07",  rank: "Owner",    discord: "Anshhu07",  skin: "", avatar: "" },
    { name: "STAFF_1",   rank: "Co-Owner", discord: "id",        skin: "", avatar: "" },
    { name: "STAFF_2",   rank: "Admin",    discord: "id",        skin: "", avatar: "" },
    { name: "STAFF_3",   rank: "Sr.Mod",   discord: "id",        skin: "", avatar: "" },
    { name: "STAFF_4",   rank: "Mod",      discord: "id",        skin: "", avatar: "" },
    { name: "STAFF_5",   rank: "Helper",   discord: "id",        skin: "", avatar: "" },
    // Copy karke aur add karo:
    // { name: "PlayerName", rank: "Mod", discord: "id", skin: "", avatar: "" },
  ],

  /* ================= NEWS / UPDATES ================= */
  news: [
    {
      date: "03 Sept 2026",
      tag: "UPDATE",
      title: "WatterCraft Website v2 Launch!",
      text: "Naya professional website live — UPI store, boss fights showcase aur naya design. Store ab open hai!",
    },
    {
      date: "02 Sept 2026",
      tag: "BOSS",
      title: "New Custom Boss Added",
      text: "Hypixel map pe naya custom boss spawn hua hai — legendary sword drop karne ka chance. Squad ke saath try karo!",
    },
    {
      date: "01 Sept 2026",
      tag: "EVENT",
      title: "Skyblock Season Event",
      text: "Is weekend double XP + rare minion drops. Discord pe join karo details ke liye.",
    },
    // Naya update add karna:
    // { date: "DD Month YYYY", tag: "UPDATE", title: "...", text: "..." },
  ],

  /* ================= VOTE ================= */
  vote: [
    { name: "MCPE Planets",  url: "https://example.com/vote1" },  // ⚠️ apne links
    { name: "MCPE Servers",  url: "https://example.com/vote2" },  // ⚠️ apne links
  ],
  voteRewards: "Vote karo → 2x rewards + vote crates (VIP/MVP me 3x!)",

  /* ================= RULES ================= */
  rules: [
    "Hacking, X-Ray aur cheats = PERMANENT BAN — koi warning nahi",
    "Scamming ya dupe exploit = ban + items confiscate",
    "Respect staff aur players — toxicity tolerate nahi hogi",
    "Alt accounts se ban bypass karna = main account bhi ban",
    "Bug milne pe report karo (Discord), exploit mat karo",
    "Advertising doosre servers ki = ban",
  ],

  /* ================= DISCORD ================= */
  discord: {
    title: "WatterCraft Community",
    desc: "5,000+ members ka family — updates, events, giveaways, support aur staff help sab yahan milega.",
  },
};

/* Don't edit below */
if (typeof window !== "undefined") { window.WC = WC; }
