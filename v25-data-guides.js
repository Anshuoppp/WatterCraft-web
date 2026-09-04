/* ============================================================
   WatterCraft V2.5 — Guide NPC Data (20 Guides + unlock rules)
   Elias is open. Chain guides unlock after Elias.
   Level/quest/coin unlocks are verified client-side where the
   data exists — otherwise they stay LOCKED with their
   requirement shown (no fake progress).
   ============================================================ */
window.WCV = window.WCV || {};

window.WCV.guidesMeta = {
  total: 20,
  masterTitle: "WatterCraft Scholar",
  masterReward: {
    coins: 2000,
    xp: 1000,
    tag: "Scholar Cosmetic Tag"
  }
};

window.WCV.guides = [
  /* ---------- BEGINNERS ---------- */
  {
    id: "elias",
    icon: "📖", name: "Elias", role: "Main Beginner Guide",
    desc: "The first NPC every player meets. He claims your island and teaches the basics of SkyBlock life.",
    teaches: ["Claiming your starter island", "Opening the starter chest", "Placing your first minion", "How Watter Levels work"],
    unlock: { type: "open", label: "Start immediately" },
    reward: { coins: 100, xp: 50 },
    related: ["getting-started", "islands"]
  },
  {
    id: "sharma-ji",
    icon: "💡", name: "Sharma Ji Ka Beta", role: "Beginner Tips",
    desc: "The neighbourhood expert with real-world tips for surviving your first days on the island.",
    teaches: ["Smart early-game priorities", "Saving coins the right way", "Island layout tips", "Avoiding common noob mistakes"],
    unlock: { type: "after", id: "elias", label: "Complete Elias first" },
    reward: { coins: 150, xp: 75 },
    related: ["getting-started", "coins"]
  },

  /* ---------- SKILL GUIDES (unlock after Elias) ---------- */
  {
    id: "marcus",
    icon: "⛏️", name: "Marcus", role: "Mining Guide",
    desc: "The veteran miner who knows every ore vein on the server.",
    teaches: ["Best mining routes", "Deep mine unlock order", "Which ores to bank for collections", "Mining skill XP tricks"],
    unlock: { type: "after", id: "elias", label: "Complete Elias first" },
    reward: { coins: 200, xp: 100 },
    related: ["mining", "collections"]
  },
  {
    id: "maya",
    icon: "🌾", name: "Maya", role: "Farming Guide",
    desc: "She turns empty dirt into a food empire and will teach you the same.",
    teaches: ["Crop priority list", "Efficient farm layouts", "Feeding your minions", "Farming collection unlocks"],
    unlock: { type: "after", id: "elias", label: "Complete Elias first" },
    reward: { coins: 200, xp: 100 },
    related: ["farming", "minions"]
  },
  {
    id: "leon",
    icon: "⚔️", name: "Leon", role: "Combat Guide",
    desc: "A frontline fighter who knows every mob and boss on the Hub.",
    teaches: ["Starting combat gear", "Mob drop value", "Boss fight basics", "When to attempt the Nether"],
    unlock: { type: "after", id: "elias", label: "Complete Elias first" },
    reward: { coins: 200, xp: 100 },
    related: ["combat", "custom-bosses"]
  },

  /* ---------- CRAFTING / SKILLS ---------- */
  {
    id: "ethan",
    icon: "🛠️", name: "Ethan", role: "Crafting Guide",
    desc: "The workshop master. If it can be crafted, Ethan knows the recipe.",
    teaches: ["Custom WatterCraft recipes", "Crafting table setups", "Recipe unlocks via collections", "Tool tier crafting"],
    unlock: { type: "level", value: 2, label: "Watter Level 2" },
    reward: { coins: 250, xp: 150 },
    related: ["crafting", "collections"]
  },
  {
    id: "aria",
    icon: "✨", name: "Aria", role: "Skills Guide",
    desc: "She studies the six skills and knows how to level them fastest.",
    teaches: ["Skill XP balancing", "Fastest skill routes", "Skill milestone rewards", "Planning your progression"],
    unlock: { type: "level", value: 3, label: "Watter Level 3" },
    reward: { coins: 250, xp: 150 },
    related: ["skills", "watter-levels"]
  },
  {
    id: "daniel",
    icon: "📜", name: "Daniel", role: "Quest Guide",
    desc: "The quest board keeper. He rewards players who finish objectives.",
    teaches: ["Accepting daily quests", "Quest progress tracking", "Quest reward value", "Milestone quest chains"],
    unlock: { type: "quests", value: 2, label: "Complete 2 Beginner Quests" },
    reward: { coins: 300, xp: 150 },
    related: ["quests"]
  },
  {
    id: "oliver",
    icon: "📚", name: "Oliver", role: "Collection Guide",
    desc: "A hoarder with a system — he knows every collection milestone.",
    teaches: ["Which collections to fill first", "Collection reward recipes", "Banking resources correctly", "Collection minion links"],
    unlock: { type: "collection", value: 1, label: "Unlock 1 Collection" },
    reward: { coins: 300, xp: 150 },
    related: ["collections", "minions"]
  },

  /* ---------- ECONOMY / GEAR ---------- */
  {
    id: "motu-seth",
    icon: "💰", name: "Motu Seth", role: "Economy Guide",
    desc: "WatterCraft's money man. He can smell profit from across the Hub.",
    teaches: ["Earning your first 500 Coins", "Bazaar flipping basics", "Avoiding money sinks", "When to spend vs save"],
    unlock: { type: "coins", value: 500, label: "Earn 500 Coins total" },
    reward: { coins: 400, xp: 200 },
    related: ["economy", "coins", "bazaar"]
  },
  {
    id: "ryan",
    icon: "🛡️", name: "Ryan", role: "Armor Guide",
    desc: "The tank of the Hub. He tests every armor set so you don't have to.",
    teaches: ["Armor set bonuses", "Defense vs health balance", "Best early armor", "Reforge direction for armor"],
    unlock: { type: "armor", label: "Obtain any armor piece" },
    reward: { coins: 350, xp: 200 },
    related: ["armor", "reforges"]
  },
  {
    id: "luna",
    icon: "🗡️", name: "Luna", role: "Weapon Guide",
    desc: "A blade collector who rates every sword, bow and axe on the server.",
    teaches: ["Weapon rarity tiers", "Damage stat basics", "Sword vs bow situations", "First dungeon weapon goals"],
    unlock: { type: "weapon", label: "Obtain any valid weapon" },
    reward: { coins: 350, xp: 200 },
    related: ["weapons", "combat"]
  },
  {
    id: "noah",
    icon: "🔮", name: "Noah", role: "Enchanting Guide",
    desc: "The enchanter. He sees the perfect enchantment for every item.",
    teaches: ["Enchanting table basics", "XP to enchantment costs", "Best early enchantments", "Enchant order strategy"],
    unlock: { type: "level", value: 5, label: "Watter Level 5" },
    reward: { coins: 400, xp: 250 },
    related: ["enchanting", "weapons", "armor"]
  },
  {
    id: "raju-mistri",
    icon: "🧱", name: "Raju Mistri", role: "Building Guide",
    desc: "The Hub's favourite builder. Ask him anything about layouts and aesthetics.",
    teaches: ["Island block palettes", "Minion placement layouts", "Compact farm designs", "Building for future upgrades"],
    unlock: { type: "level", value: 5, label: "Watter Level 5" },
    reward: { coins: 400, xp: 250 },
    related: ["islands", "farming"]
  },

  /* ---------- ADVANCED ---------- */
  {
    id: "victor",
    icon: "⚒️", name: "Victor", role: "Reforge Guide",
    desc: "The anvil keeper. He reforges gear until the stats are perfect.",
    teaches: ["Reforge cost basics", "Stat direction per item", "Rarity and reforge power", "When reforging beats buying"],
    unlock: { type: "level", value: 7, label: "Watter Level 7" },
    reward: { coins: 500, xp: 300 },
    related: ["reforges", "rarities"]
  },
  {
    id: "arthur",
    icon: "🤖", name: "Arthur", role: "Minion Guide",
    desc: "The automation genius. His island runs itself while he sleeps.",
    teaches: ["Minion tier upgrades", "Fuel efficiency", "Storage management", "Best minions per stage"],
    unlock: { type: "level", value: 8, label: "Watter Level 8" },
    reward: { coins: 600, xp: 350 },
    related: ["minions", "islands"]
  },
  {
    id: "sophie",
    icon: "🐾", name: "Sophie", role: "Pet Guide",
    desc: "She has raised every pet on WatterCraft — including the dragon.",
    teaches: ["Pet leveling", "Pet bonuses per type", "Best pet for your stage", "Pet upgrade path"],
    unlock: { type: "level", value: 10, label: "Watter Level 10" },
    reward: { coins: 600, xp: 350 },
    related: ["pets"]
  },
  {
    id: "bazaar-babu",
    icon: "🏪", name: "Bazaar Babu", role: "Bazaar Guide",
    desc: "The market trader. He watches order books all day, every day.",
    teaches: ["Buy vs sell orders", "Reading the market spread", "Flip strategies", "Market risk warnings"],
    unlock: { type: "level", value: 10, label: "Watter Level 10" },
    reward: { coins: 700, xp: 400 },
    related: ["bazaar", "economy"]
  },
  {
    id: "auction-uncle",
    icon: "🔨", name: "Auction Uncle", role: "Auction Guide",
    desc: "The auctioneer. He knows the true value of rare loot.",
    teaches: ["Listing auctions correctly", "Bidding strategy", "Auction pricing", "Selling boss drops"],
    unlock: { type: "level", value: 12, label: "Watter Level 12" },
    reward: { coins: 800, xp: 450 },
    related: ["auction-house", "economy"]
  },
  {
    id: "dungeon-don",
    icon: "🏰", name: "Dungeon Don", role: "Dungeon Guide",
    desc: "The final guide. He holds the keys to the Dungeon floors.",
    teaches: ["Dungeon class roles", "Floor progression order", "Teamwork essentials", "End-game gear goals"],
    unlock: { type: "level", value: 15, label: "Watter Level 15" },
    reward: { coins: 1000, xp: 600 },
    related: ["dungeons", "custom-bosses"]
  }
];
