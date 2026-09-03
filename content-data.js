/**
 * WatterCraft V2 — Content Expansion Pack (data)
 * Wiki articles, NPC Guides, Leaderboards, Bazaar, Auction, Dungeons.
 * All numbers not officially provided are marked COMING SOON.
 * Load BEFORE content.js, AFTER data.js & main.js.
 */
window.WCX = {
version: "2.3-content",

/* ============ WIKI ============ */
wiki: [
{ id: "getting-started", icon: "🚀", title: "Getting Started",
  text: "New to WatterCraft? Join at play.wattercraft.fun:19132 on Minecraft Bedrock. Spawn in the Hub, claim your starter island, complete the tutorial NPC chain (Elias) and begin your SkyBlock journey — build, progress, conquer.",
  fields: [["Difficulty", "Beginner"], ["Unlock", "Open"], ["Reward", "Starter Island"]] },
{ id: "watter-levels", icon: "⭐", title: "Watter Levels",
  text: "Your Watter Level is your overall progression score. Every action — mining, farming, combat, quests — grants Watter XP. Higher levels unlock areas, island upgrades and advanced systems.",
  fields: [["Stages", "1 → 5 → 10 → 15 → 20 → ∞"], ["XP gain", "Action based"], ["Unlocks", "COMING SOON"]] },
{ id: "skills", icon: "📈", title: "Skills",
  text: "Six skills track your expertise: Mining, Farming, Combat, Foraging, Fishing and Enchanting. Each has its own XP bar, level and rewards.",
  fields: [["Skills", "Mining · Farming · Combat · Foraging · Fishing · Enchanting"], ["Rewards", "COMING SOON"], ["Max level", "COMING SOON"]] },
{ id: "collections", icon: "🧺", title: "Collections",
  text: "Gather resources to fill collections. Each collection level unlocks recipes, perks and in some cases new minion tiers.",
  fields: [["Examples", "Stone, Wood, Crops, Ores, Mob drops"], ["Recipes", "COMING SOON"]] },
{ id: "quests", icon: "📜", title: "Quests",
  text: "Daily and milestone quests give objectives like 'Mine 20 Stone' with progress tracking, difficulty and clear rewards.",
  fields: [["Type", "Daily · Milestone · Event"], ["Tracking", "In-game quest log"], ["Rewards", "COMING SOON"]] },
{ id: "items", icon: "🗡️", title: "Items Database",
  text: "A growing catalogue of WatterCraft custom items — weapons, armor, tools, resources, consumables and special items.",
  fields: [["Categories", "Weapons · Armor · Tools · Resources · Consumables · Special"], ["Stats", "COMING SOON"], ["Rarity", "Common → Divine"]] },
{ id: "weapons", icon: "⚔️", title: "Weapons",
  text: "Swords, bows, axes and dungeon weapons with custom damage, abilities and rarity borders. Unique swords drop from custom bosses.",
  fields: [["Types", "Sword · Bow · Axe · Dungeon"], ["Damage", "COMING SOON"], ["Abilities", "COMING SOON"]] },
{ id: "armor", icon: "🛡️", title: "Armor",
  text: "Armor sets and pieces with health, defense and set bonuses. Higher rarity = stronger stats and glow.",
  fields: [["Slots", "Helmet · Chest · Legs · Boots"], ["Defense", "COMING SOON"], ["Set bonus", "COMING SOON"]] },
{ id: "tools", icon: "⛏️", title: "Tools",
  text: "Custom pickaxes, axes and more with enchants and reforges for faster gathering.",
  fields: [["Types", "Pickaxe · Axe · Shovel · Rod"], ["Enchants", "COMING SOON"]] },
{ id: "enchantments", icon: "✨", title: "Enchantments",
  text: "Apply enchantments to gear for combat and gathering bonuses. Obtained through enchanting, books and special drops.",
  fields: [["Method", "Enchanting Table · Books · Drops"], ["List", "COMING SOON"]] },
{ id: "reforges", icon: "🔨", title: "Reforges",
  text: "Reforge items at NPC Victor to reroll stats and rarity bonuses for your playstyle.",
  fields: [["NPC", "Victor"], ["Cost", "COMING SOON"], ["Rarity shift", "COMING SOON"]] },
{ id: "pets", icon: "🐾", title: "Pets",
  text: "Level pets that grant passive abilities. Wolves, pigs, chickens, cats and rare end-game pets.",
  fields: [["Examples", "Wolf · Pig · Chicken · Cat · Ender Dragon"], ["Abilities", "COMING SOON"]] },
{ id: "minions", icon: "🤖", title: "Minions",
  text: "Automated helpers that collect resources while you play. Each minion has a tier, resource, production time and storage.",
  fields: [["Beginner", "Starter Minion"], ["Tiers", "COMING SOON"], ["Fuel", "COMING SOON"]] },
{ id: "mobs", icon: "👹", title: "Mobs",
  text: "Custom hostile mobs and bosses across the world. Bosses drop legendary swords and unique loot.",
  fields: [["Bosses", "COMING SOON"], ["Drops", "COMING SOON"]] },
{ id: "economy", icon: "💰", title: "Economy",
  text: "Two currencies: Coins (earned in-game) and Gems (store currency, 10 gems per rupee). Spend at shops, bazaar and auction house.",
  fields: [["Coins", "In-game earnings"], ["Gems", "Store · 1 ₹ = 10 Gems"]] },
{ id: "bazaar", icon: "🛒", title: "Bazaar",
  text: "A player marketplace with buy orders and sell orders. Place an order at your price and it fills when the market matches. Prices move with supply and demand.",
  fields: [["Buy Orders", "Instant or waiting"], ["Sell Orders", "Instant or waiting"], ["Live prices", "COMING SOON"]] },
{ id: "auction-house", icon: "🏷️", title: "Auction House",
  text: "List items for the community to bid on. Set a starting price, watch bids rise, or buy instantly at the buy-it-now price.",
  fields: [["Actions", "List · Bid · Buy Now"], ["Fee", "COMING SOON"]] },
{ id: "dungeons", icon: "🏰", title: "Dungeons",
  text: "Multi-floor PvE content for squads. Coordinate classes, survive increasing difficulty and claim exclusive rewards.",
  fields: [["Floors", "COMING SOON"], ["Classes", "COMING SOON"], ["Requires", "Teamwork"]] },
{ id: "islands", icon: "🏝️", title: "Islands",
  text: "Private floating islands are your home base. Expand your island, automate with minions and climb the island value leaderboard.",
  fields: [["Island Value", "Counts blocks, minions, upgrades"], ["Expansion", "COMING SOON"]] },
{ id: "achievements", icon: "🏅", title: "Achievements",
  text: "Milestone achievements across every system. Complete them for rewards and bragging rights.",
  fields: [["Categories", "Progression · Collection · Combat · Social"], ["Rewards", "COMING SOON"]] }
],

/* ============ 20 NPC GUIDES ============ */
guides: [
{ id: "elias", npc: "Elias", title: "Main Beginner Guide", role: "Your first NPC in the Hub.",
  teaches: "Claiming your island, the starter quest chain and the basics of SkyBlock survival.", icon: "🧑‍🏫", unlock: "Open", reward: "Starter Island" },
{ id: "sharma-ji", npc: "Sharma Ji Ka Beta", title: "Beginner Tips", role: "Wisdom for new players.",
  teaches: "Early-game money, island layout tips and mistakes to avoid.", icon: "🤓", unlock: "Open", reward: "COMING SOON" },
{ id: "marcus", npc: "Marcus", title: "Mining Guide", role: "Master of the mines.",
  teaches: "Mine progression, ores, deep mining and custom tools.", icon: "⛏️", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "maya", npc: "Maya", title: "Farming Guide", role: "Grows the island economy.",
  teaches: "Crops, animal pens, farming collections and automated farms.", icon: "🌾", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "leon", npc: "Leon", title: "Combat Guide", role: "Trains every fighter.",
  teaches: "Combat areas, custom bosses and weapon loadouts.", icon: "⚔️", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "ethan", npc: "Ethan", title: "Crafting Guide", role: "Builder of everything.",
  teaches: "Custom recipes, crafting tables and item crafting chains.", icon: "🪚", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "aria", npc: "Aria", title: "Skills Guide", role: "Levels every skill.",
  teaches: "How each of the six skills levels up and what to focus first.", icon: "📈", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "daniel", npc: "Daniel", title: "Quest Guide", role: "Gives daily quests.",
  teaches: "Quest types, progress tracking and efficient quest routing.", icon: "📜", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "oliver", npc: "Oliver", title: "Collection Guide", role: "Catalogues the world.",
  teaches: "Collection rewards, recipes and which resources to gather.", icon: "🧺", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "motu-seth", npc: "Motu Seth", title: "Economy Guide", role: "Runs the money.",
  teaches: "Coins, gems, island value and how wealth compounds.", icon: "💰", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "ryan", npc: "Ryan", title: "Armor Guide", role: "Armors every player.",
  teaches: "Armor sets, defense stats and when to upgrade.", icon: "🛡️", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "luna", npc: "Luna", title: "Weapon Guide", role: "Sharpens every blade.",
  teaches: "Weapon tiers, rarity and where legendary swords drop.", icon: "🗡️", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "noah", npc: "Noah", title: "Enchanting Guide", role: "Writes the books.",
  teaches: "Enchanting table, books and best enchant combos.", icon: "✨", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "raju-mistri", npc: "Raju Mistri", title: "Building Guide", role: "Designs every island.",
  teaches: "Island layouts, aesthetics and efficient expansion.", icon: "🧱", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "arthur", npc: "Arthur", title: "Minion Guide", role: "Automates everything.",
  teaches: "Minion tiers, fuel, storage and the starter minion.", icon: "🤖", unlock: "COMING SOON", reward: "Starter Minion" },
{ id: "victor", npc: "Victor", title: "Reforge Guide", role: "Forces better stats.",
  teaches: "Reforges, rarity rerolls and when to reforge.", icon: "🔨", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "sophie", npc: "Sophie", title: "Pet Guide", role: "Raises every pet.",
  teaches: "Pet leveling, abilities and which pet fits your playstyle.", icon: "🐾", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "bazaar-babu", npc: "Bazaar Babu", title: "Bazaar Guide", role: "Makes the market.",
  teaches: "Buy orders, sell orders and flipping items for profit.", icon: "🛒", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "auction-uncle", npc: "Auction Uncle", title: "Auction Guide", role: "Sells the rare stuff.",
  teaches: "Listing, bidding and the buy-it-now system.", icon: "🏷️", unlock: "COMING SOON", reward: "COMING SOON" },
{ id: "dungeon-don", npc: "Dungeon Don", title: "Dungeon Guide", role: "Runs the floors.",
  teaches: "Dungeon floors, classes, teamwork and end-game loot.", icon: "🏰", unlock: "COMING SOON", reward: "COMING SOON" }
],

/* ============ LEADERBOARDS (DEMO until live API) ============ */
leaderboards: {
note: "Live data will appear once the in-game API is connected. Shown below is demo structure.",
periods: ["Global", "Weekly", "Monthly"],
categories: [
{ id: "overall", label: "Overall", icon: "🏆" },
{ id: "level", label: "Watter Level", icon: "⭐" },
{ id: "island", label: "Island Value", icon: "🏝️" },
{ id: "coins", label: "Coins", icon: "💰" },
{ id: "mining", label: "Mining", icon: "⛏️" },
{ id: "farming", label: "Farming", icon: "🌾" },
{ id: "combat", label: "Combat", icon: "⚔️" },
{ id: "collections", label: "Collections", icon: "🧺" },
{ id: "dungeons", label: "Dungeons", icon: "🏰" },
{ id: "achievements", label: "Achievements", icon: "🏅" }
],
demoRows: [
{ rank: 1, name: "DEMO — connect API", score: "—" },
{ rank: 2, name: "DEMO — connect API", score: "—" },
{ rank: 3, name: "DEMO — connect API", score: "—" }
]
},

/* ============ ECONOMY PAGES ============ */
bazaar: {
title: "Bazaar",
note: "Buy orders and sell orders power the WatterCraft market. Prices move with real supply and demand.",
actions: ["Place Buy Order", "Place Sell Order", "Instant Buy", "Instant Sell"],
live: "Live prices — COMING SOON (in-game API)"
},
auction: {
title: "Auction House",
note: "List items for bids or buy instantly. Rare drops from bosses and dungeons often appear here.",
actions: ["List Item", "Place Bid", "Buy Now"],
fee: "Listing fee — COMING SOON"
},
dungeons: {
title: "Dungeons",
note: "Multi-floor PvE built for squads. Coordinate, survive, and earn exclusive rewards.",
floors: [{ floor: 1, name: "COMING SOON", req: "COMING SOON", reward: "COMING SOON" }],
classes: ["COMING SOON"]
},

/* ============ HOME QUICK LINKS (emoji chips) ============ */
quickLinks: [
{ id: "wiki", label: "Wiki", icon: "📚" },
{ id: "guides", label: "Guides", icon: "🧑‍🏫" },
{ id: "leaderboards", label: "Leaderboards", icon: "🏆" },
{ id: "store", label: "Store", icon: "🛍️" },
{ id: "vote", label: "Vote", icon: "🗳️" },
{ id: "apply", label: "Apply", icon: "✍️" }
]
};
