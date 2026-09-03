/**
 * WatterCraft — Site Content & Configuration (V2.1)
 * Content is separated from presentation. Edit values here.
 *
 * Honesty policy (Zero Fake Data):
 *  - No fabricated player counts, prices, leaderboard positions or stats.
 *  - Anything not officially provided renders as COMING SOON.
 *  - Live server status comes from an external API, never hardcoded.
 */
window.WC = {
  meta: {
    name: "WatterCraft",
    logo: "assets/logo.png",
    mark: "assets/mark.png",
    title: "WatterCraft | Minecraft Bedrock SkyBlock",
    description:
      "WatterCraft is a Minecraft Bedrock SkyBlock server featuring islands, skills, quests, collections, pets, minions, Bazaar, Auction House, Dungeons and more.",
    slogan: "BUILD. PROGRESS. CONQUER.",
    owner: "Anshhu07"
  },

  server: {
    name: "WatterCraft",
    platform: "Bedrock Edition",
    ip: "play.wattercraft.fun",
    port: 19132,
    region: "India",
    statusHost: "play.wattercraft.fun",
    discord: "https://discord.gg/fb3snfD9v7"
  },

  hero: {
    background: "assets/lobby.png",
    kicker: "MINECRAFT BEDROCK · SKYBLOCK · 24/7",
    title: ["WATTER", "CRAFT"],
    tagline: "BUILD. PROGRESS. CONQUER.",
    sub: "A next-generation Minecraft Bedrock SkyBlock experience. Islands, skills, quests, collections, pets, minions, Bazaar, Auction House and Dungeons.",
    primary: { label: "PLAY NOW", action: "copyIP" },
    secondary: { label: "JOIN DISCORD", action: "discord" }
  },

  nav: [
    { id: "home", label: "Home", icon: "home" },
    { id: "world", label: "World", icon: "map" },
    { id: "wiki", label: "Wiki", icon: "book" },
    { id: "guides", label: "Guides", icon: "compass" },
    { id: "leaderboards", label: "Leaderboards", icon: "crown" },
    { id: "updates", label: "Updates", icon: "bell" },
    { id: "store", label: "Store", icon: "chest" },
    { id: "vote", label: "Vote", icon: "star" },
    { id: "staff", label: "Staff", icon: "person" },
    { id: "support", label: "Support", icon: "help" },
    { id: "discord", label: "Discord", icon: "discord", cta: true }
  ],

  features: [
    { key: "skyblock", title: "SkyBlock Islands", icon: "island",
      text: "Private floating islands, island upgrades and a full progression ladder." },
    { key: "skills", title: "Skills", icon: "xp",
      text: "Mining, Farming, Combat, Foraging, Fishing and Enchanting with XP bars." },
    { key: "quests", title: "Quests", icon: "book",
      text: "Daily and milestone quests with clear objectives and rewards." },
    { key: "collections", title: "Collections", icon: "chest",
      text: "Gather resources to unlock recipes, perks and collection rewards." },
    { key: "pets", title: "Pets", icon: "paw",
      text: "Level pets that grant abilities as they grow with you." },
    { key: "minions", title: "Minions", icon: "gear",
      text: "Automated helpers that collect resources while you play." },
    { key: "economy", title: "Economy", icon: "coin",
      text: "Coins and Gems power a player-driven market." },
    { key: "bazaar", title: "Bazaar", icon: "emerald",
      text: "Buy and sell orders with a live-style marketplace interface." },
    { key: "auction", title: "Auction House", icon: "gavel",
      text: "List items, place bids and trade with the community." },
    { key: "dungeons", title: "Dungeons", icon: "skull",
      text: "Multi-floor PvE content built for squads and coordinated play." },
    { key: "mining", title: "Mining", icon: "pickaxe",
      text: "Deep mines, rare ores and custom tools." },
    { key: "combat", title: "Combat", icon: "sword",
      text: "Custom bosses, weapons, armor and reforges." }
  ],

  worldAreas: [
    { id: "hub", name: "Hub", icon: "home",
      text: "The social heart of the network. Spawn, shops and community areas.",
      level: 0, mobs: [], resources: ["Community"], gear: "—", unlock: "Open" },
    { id: "mines", name: "Mines", icon: "pickaxe",
      text: "Public and private mines for every stage of progression.",
      level: null, mobs: [], resources: ["Ores", "Stone"], gear: "COMING SOON", unlock: "COMING SOON" },
    { id: "farm", name: "Farm", icon: "wheat",
      text: "Crop fields, animal pens and farming collections.",
      level: null, mobs: [], resources: ["Crops", "Animals"], gear: "COMING SOON", unlock: "COMING SOON" },
    { id: "forest", name: "Forest", icon: "tree",
      text: "Foraging grounds with custom trees and wood types.",
      level: null, mobs: [], resources: ["Wood"], gear: "COMING SOON", unlock: "COMING SOON" },
    { id: "combat", name: "Combat Zones", icon: "sword",
      text: "Hostile arenas and custom boss encounters.",
      level: null, mobs: ["COMING SOON"], resources: ["Drops"], gear: "COMING SOON", unlock: "COMING SOON" },
    { id: "nether", name: "Nether", icon: "nether",
      text: "High-risk high-reward nether progression.",
      level: null, mobs: ["COMING SOON"], resources: ["Nether items"], gear: "COMING SOON", unlock: "COMING SOON" },
    { id: "end", name: "The End", icon: "ender",
      text: "End-game island challenges and elite rewards.",
      level: null, mobs: ["COMING SOON"], resources: ["End items"], gear: "COMING SOON", unlock: "COMING SOON" },
    { id: "dungeons", name: "Dungeons", icon: "skull",
      text: "Floor-based PvE dungeons for squads.",
      level: null, mobs: ["COMING SOON"], resources: ["Dungeon loot"], gear: "COMING SOON", unlock: "COMING SOON" }
  ],

  watterLevels: {
    note: "Your Watter Level reflects overall progression. Higher levels unlock areas, systems, island upgrades and advanced gameplay.",
    steps: [
      { level: 1, label: "Beginner", text: "Start your island journey." },
      { level: 5, label: "Explorer", text: "COMING SOON" },
      { level: 10, label: "Adventurer", text: "COMING SOON" },
      { level: 15, label: "Expert", text: "COMING SOON" },
      { level: 20, label: "Master", text: "COMING SOON" },
      { level: "∞", label: "Legend", text: "Endless progression." }
    ]
  },

  staff: {
    note: "Reach out on Discord for applications.",
    ranks: [
      { id: "founder", name: "Founder", color: "#fbbf24" },
      { id: "og", name: "OG", color: "#fb923c" },
      { id: "manager", name: "Manager", color: "#c084fc" },
      { id: "headadmin", name: "Head Admin", color: "#f87171" },
      { id: "admin", name: "Admin", color: "#4ade80" },
      { id: "helper", name: "Helper", color: "#38bdf8" },
      { id: "trial", name: "Trial Helper", color: "#94a3b8" }
    ],
    members: [
      { name: "Anshhu07", rank: "founder", discord: "@gamerzone67s" },
      { name: "Jacklord", rank: "og", discord: "@_jacklord_" },
      { name: "Zx Dark", rank: "og", discord: "@zxdark94" },
      { name: "darkknight", rank: "og", discord: "@darkknight2272" },
      { name: "Ashish", rank: "headadmin", discord: "@aloneff10" },
      { name: "Abhingya", rank: "headadmin", discord: "@abhigyan0018" },
      { name: "Prasit", rank: "headadmin", discord: "@prasitjain22231" },
      { name: "Akshat", rank: "admin", discord: "@akshat_sinha" },
      { name: "Ak Gourav", rank: "admin", discord: "@akgaurav" },
      { name: "Harsh", rank: "admin", discord: "@sgmaarsh" }
    ]
  },

  store: {
    api: "",
    currency: "₹",
    gemRate: "1 ₹ = 10 Gems",
    redeemNote: "After purchase you receive a unique code. Redeem in-game with /redeem <code>.",
    categories: [
      {
        id: "ranks", name: "Ranks", icon: "crown",
        items: [
          {
            id: "noble", name: "NOBLE", price: 70, usd: "$0.74", gems: 700,
            duration: "30 DAYS", color: "#38bdf8", badge: "",
            features: ["Change Weather In Island", "Use Nick in Settings", "Use Hide in Settings", "Access /fly", "Access /emojis"],
            bonus: ["PlayerVaults 1-4", "MEMBER KIT", "NOBLE KIT", "Chat", "Tag: NOBLE"]
          },
          {
            id: "rich", name: "RICH", price: 150, usd: "$1.57", gems: 1500,
            duration: "30 DAYS", color: "#2dd4bf", badge: "POPULAR",
            features: ["All Noble Permissions", "Change Nick in Settings", "Use Perks in Settings", "Use Size in Settings"],
            bonus: ["PlayerVaults 1-8", "MEMBER KIT", "NOBLE KIT", "RICH KIT", "Tag: RICH"]
          },
          {
            id: "supreme", name: "SUPREME", price: 200, usd: "$2.09", gems: 2000,
            duration: "30 DAYS", color: "#fbbf24", badge: "TOP TIER",
            features: ["All Rich Permissions", "Access /pets", "Get Bank Loan"],
            bonus: ["PlayerVaults 1-13", "MEMBER KIT", "NOBLE KIT", "RICH KIT", "SUPREME KIT", "Tag: SUPREME"]
          }
        ]
      },
      {
        id: "gems", name: "Gems", icon: "gem",
        items: [
          { id: "gems_100", name: "100 Gems", price: 10, usd: "$0.11", gems: 100, color: "#c084fc", badge: "", note: "10 gems per rupee", features: ["100 Gems for shops, crates and upgrades."], bonus: [] },
          { id: "gems_500", name: "500 Gems", price: 50, usd: "$0.53", gems: 500, color: "#c084fc", badge: "", note: "10 gems per rupee", features: ["500 Gems for shops, crates and upgrades."], bonus: [] },
          { id: "gems_1000", name: "1000 Gems", price: 100, usd: "$1.05", gems: 1000, color: "#fbbf24", badge: "BONUS", note: "10 gems per rupee", features: ["1000 Gems for shops, crates and upgrades."], bonus: [] }
        ]
      }
    ]
  },

  vote: {
    title: "VOTE FOR WATTERCRAFT",
    text: "Voting keeps the server growing. Each vote supports the network.",
    rewardNote: "Vote rewards are delivered in-game.",
    sites: [
      { name: "MinecraftPocket-Servers", url: "https://minecraftpocket-servers.com/server/133855/" }
    ]
  },

  rules: [
    { icon: "sword", title: "Cheating", text: "No hacking, X-ray or unfair modifications. Instant ban." },
    { icon: "gem", title: "Duplication", text: "Duplicating items or currency results in a permanent ban." },
    { icon: "bug", title: "Exploiting", text: "Exploiting bugs is prohibited — report them and earn a reward." },
    { icon: "coin", title: "Scamming", text: "No scamming or real-money trading outside approved systems." },
    { icon: "person", title: "Respect", text: "Respect staff and players. Toxicity is not tolerated." },
    { icon: "map", title: "Griefing", text: "Griefing or raiding another player's island is punishable." },
    { icon: "bell", title: "Advertising", text: "Advertising other servers or services is not allowed." },
    { icon: "shield", title: "Punishments", text: "Punishment appeals and reports are handled privately on Discord." }
  ],

  updates: [],

  support: {
    text: "Need help? Reports, appeals and support are handled on our Discord server.",
    items: [
      { icon: "bug", title: "Bug Report", text: "Report bugs in-game or on Discord." },
      { icon: "shield", title: "Player Report", text: "Report players privately to staff." },
      { icon: "book", title: "Appeal", text: "Appeal punishments via Discord." },
      { icon: "chest", title: "Store Support", text: "Store issues: contact staff on Discord." },
      { icon: "help", title: "FAQ", text: "Getting started guide lives in the Wiki." }
    ]
  },

  footer: {
    tagline: "BUILD. PROGRESS. CONQUER.",
    note: "Not affiliated with Mojang or Microsoft. WatterCraft is an independent Bedrock network.",
    links: [
      { label: "Wiki", href: "#/wiki" },
      { label: "Guides", href: "#/guides" },
      { label: "Leaderboards", href: "#/leaderboards" },
      { label: "Store", href: "#/store" },
      { label: "Vote", href: "#/vote" },
      { label: "Staff", href: "#/staff" },
      { label: "Rules", href: "#/rules" },
      { label: "Updates", href: "#/updates" },
      { label: "Support", href: "#/support" }
    ]
  }
};
