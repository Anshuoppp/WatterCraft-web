/**
 * WatterCraft — Website Configuration
 * All site content lives here. Edit values, not markup.
 * Store package IDs must match the Cloudflare Worker (PACKAGES).
 */
window.WC = {
  meta: {
    name: "WatterCraft",
    logo: "assets/logo.png",
    mark: "assets/mark.png",
    description:
      "WatterCraft — India's most advanced Bedrock Skyblock server. Custom bosses, minions, deep mining and a UPI store with instant in-game delivery.",
  },

  server: {
    name: "WatterCraft",
    ip: "play.wattercraft.fun",
    port: 19132,
    platform: "Bedrock Edition",
    region: "India",
    owner: "Anshhu07",
    ownerDiscord: "Anshhu07",
    discord: "https://discord.gg/WATTERCRAFT", // TODO: replace with your invite
    /* Used by the live player-count widget. Set to null to disable. */
    statusHost: "play.wattercraft.fun",
  },

  hero: {
    background: "assets/lobby.png", // cinematic background
    islandFrame: "assets/island.jpg", // floating preview frame
    kicker: "BEDROCK SKYBLOCK · 24/7 · INDIA",
    taglines: [
      "Survive. Build. Dominate the Skies.",
      "Hypixel-style Skyblock on Bedrock.",
      "Custom Bosses · Minions · Real Economy.",
    ],
  },

  ticker: [
    "Skyblock",
    "Custom Bosses",
    "Minion System",
    "Deep Mining",
    "UPI Store",
    "24/7 Uptime",
    "Bedrock 1.20+",
    "Made in India",
  ],

  stats: [
    { value: 5200, suffix: "+", label: "Discord Members" },
    { value: 2400, suffix: "+", label: "Registered Players" },
    { value: 24, suffix: "/7", label: "Server Uptime" },
    { value: 150, suffix: "+", label: "Custom Islands" },
  ],

  showcase: {
    image: "assets/island.jpg",
    kicker: "THE WORLD OF WATTERCRAFT",
    title: "One Island. Infinite Possibilities.",
    description:
      "Private floating islands, minions that work while you sleep, custom enchantments and a player-driven economy — all on a Hypixel-style map built for Bedrock.",
    points: [
      "Private Island System",
      "Minion Automation",
      "Custom Enchants & Swords",
    ],
    cta: "Start Your Island",
  },

  gameModes: [
    {
      name: "Island Survival",
      tag: "SKYBLOCK",
      description:
        "Build your floating island, expand your territory and climb the economic ladder.",
      image: "assets/island.jpg",
    },
    {
      name: "Minion System",
      tag: "AUTOMATION",
      description:
        "Deploy minions that gather resources around the clock while you focus on progression.",
      image: "",
    },
    {
      name: "Custom Boss Fights",
      tag: "PVE",
      description:
        "Take on custom bosses solo or with your squad for legendary drops and unique swords.",
      image: "",
    },
    {
      name: "Deep Mining",
      tag: "PROGRESSION",
      description:
        "Descend into private mines, extract rare ores and forge custom tools.",
      image: "",
    },
  ],

  features: [
    { title: "Anti-Cheat", description: "A lag-free, cheat-free experience backed by active moderation." },
    { title: "Real Economy", description: "Player shops, auctions and an earn-to-rank progression system." },
    { title: "Weekly Events", description: "Skywars nights, build contests and scheduled drop parties." },
    { title: "Low Ping India", description: "India-optimised hosting for stable 10–20 ms connections." },
  ],

  store: {
    /* Cloudflare Worker URL. Until deployed, Buy buttons show a setup notice. */
    api: "",
    currency: "₹",
    paymentNote: "Pay via UPI — GPay, PhonePe or Paytm. Your unique code is delivered instantly.",
    packages: [
      {
        id: "vip",
        name: "VIP",
        price: 99,
        color: "#4ade80",
        badge: "POPULAR",
        perks: [
          "3 Island Slots",
          "Island /fly Access",
          "VIP Chat Prefix",
          "2x Vote Rewards",
        ],
      },
      {
        id: "mvp",
        name: "MVP",
        price: 199,
        color: "#22d3ee",
        badge: "BEST VALUE",
        perks: [
          "5 Island Slots",
          "/fly + /nick",
          "MVP Prefix & Kits",
          "3x Vote Rewards",
          "Private Warp",
        ],
      },
      {
        id: "gems_500",
        name: "500 Gems",
        price: 49,
        color: "#c084fc",
        badge: "",
        perks: ["500 Gems for shops, crates and upgrades."],
      },
      {
        id: "gems_1000",
        name: "1000 Gems",
        price: 89,
        color: "#fbbf24",
        badge: "BONUS",
        perks: ["1000 Gems + 200 bonus gems."],
      },
    ],
  },

  team: [
    { name: "Anshhu07", role: "Owner", discord: "Anshhu07" },
    /* Add members below. Avatars render automatically from Minecraft skins. */
    // { name: "ExamplePlayer", role: "Admin", discord: "" },
  ],

  news: [
    {
      date: "SEP 2026",
      tag: "UPDATE",
      title: "Season 2 — New Boss Island",
      description:
        "A new custom boss arena and legendary sword drops are now live on the network.",
    },
    {
      date: "SEP 2026",
      tag: "STORE",
      title: "UPI Store is Live",
      description:
        "Purchase ranks and gems with GPay, PhonePe or Paytm — delivered in-game instantly.",
    },
    {
      date: "AUG 2026",
      tag: "EVENT",
      title: "Skyblock Nights",
      description:
        "Double minion speed weekends and scheduled drop parties every Friday.",
    },
  ],

  voteSites: [
    { name: "MCPE Planets", url: "https://example.com/vote1" }, // TODO: replace links
    { name: "MCPE Servers", url: "https://example.com/vote2" },
  ],

  rules: [
    "No hacking, X-ray or unfair modifications — instant ban.",
    "No scamming or real-money trading outside approved systems.",
    "Respect staff and players. Toxicity is not tolerated.",
    "Griefing or raiding another player's island is punishable.",
    "Exploiting bugs is prohibited — report them and earn a reward.",
    "Duplicating items or currency results in a permanent ban.",
  ],

  discord: {
    title: "Join 5,000+ Players on Discord",
    description:
      "Giveaways, staff support, ban appeals and community events — all in one place.",
    cta: "Join the Discord",
  },
};
