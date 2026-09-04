/* ============================================================
   WatterCraft V2.5 — Wiki Content Data (30 categories)
   Data-driven: renderers read window.WCV.wiki. No fake stats.
   Values not officially provided are marked COMING SOON.
   ============================================================ */
window.WCV = window.WCV || {};
window.WCV.version = "2.5-wiki";
window.WCV.updated = "Sep 2026";

window.WCV.wiki = [

/* ---------- BASICS ---------- */
{
  id: "getting-started",
  icon: "🚀", cat: "Basics", title: "Getting Started",
  desc: "New to WatterCraft? Join play.wattercraft.fun:19132 on Minecraft Bedrock and start your SkyBlock journey.",
  body: [
    "Join on Minecraft Bedrock Edition (1.20+) at play.wattercraft.fun, port 19132. Spawn in the Hub — the central world built around the WatterCraft mountain — then walk to Elias the guide NPC to claim your starter island.",
    "Complete the Elias tutorial chain first: it teaches you island claiming, the starter chest, your first minion and how Watter Levels work. Everything after that — skills, quests, collections, the Bazaar and Dungeons — builds on these basics."
  ],
  facts: [["IP", "play.wattercraft.fun:19132"], ["Platform", "Bedrock Edition"], ["First Step", "Talk to Elias in the Hub"], ["Difficulty", "Beginner"]],
  related: ["watter-levels", "guides", "islands"]
},
{
  id: "guides",
  icon: "🧑‍🏫", cat: "Basics", title: "NPC Guides",
  desc: "Twenty NPC guides teach every system in WatterCraft, from your first island to the deepest Dungeon floor.",
  body: [
    "Guides are NPCs placed across the Hub. Each one explains one system: Elias covers the basics, Marcus teaches Mining, Maya teaches Farming, Leon teaches Combat, and Dungeon Don unlocks end-game Dungeon knowledge.",
    "Guides unlock as you progress — some need a Watter Level, others need quests, coins or gear. Completing a guide rewards XP and, when all twenty are done, the WatterCraft Scholar achievement."
  ],
  facts: [["Count", "20 NPCs"], ["First", "Elias (open)"], ["Reward", "WatterCraft Scholar"], ["Unlocks", "Progression-based"]],
  related: ["getting-started", "achievements", "watter-levels"]
},
{
  id: "islands",
  icon: "🏝️", cat: "Basics", title: "Islands",
  desc: "Your private floating SkyBlock island is home base for farming, minions, building and your Watter progression.",
  body: [
    "Every player gets a private island floating in the sky. Use it to place minions, farm crops, build your base and store resources. Island size and slots grow as you rank up.",
    "Expansion is tied to progression: Watter Levels and rank packages can increase island slots. Your island persists between sessions, and minions keep working while you are offline."
  ],
  facts: [["Type", "Private SkyBlock island"], ["Slots", "Rank-dependent"], ["Minions", "Work while offline"], ["Protection", "Griefing is punishable"]],
  related: ["minions", "watter-levels", "getting-started"]
},

/* ---------- PROGRESSION ---------- */
{
  id: "watter-levels",
  icon: "⭐", cat: "Progression", title: "Watter Levels",
  desc: "Your overall progression score. Every action grants Watter XP and higher levels unlock areas and systems.",
  body: [
    "Your Watter Level represents your total progress on WatterCraft. Mining, farming, combat, quests and collections all feed Watter XP into one master level.",
    "Higher Watter Levels unlock new regions of the world (Mines, Farm, Nether, Dungeons), island upgrades and advanced systems. It is the single number that shows how far you have come."
  ],
  facts: [["Path", "Level 1 → 5 → 10 → 15 → 20 → ∞"], ["XP Source", "All actions & systems"], ["Unlocks", "Areas & upgrades"], ["Exact curves", "COMING SOON"]],
  related: ["getting-started", "skills", "world"]
},
{
  id: "skills",
  icon: "📈", cat: "Progression", title: "Skills",
  desc: "Six specialised skills track your expertise: Mining, Farming, Combat, Foraging, Fishing and Enchanting.",
  body: [
    "Each skill levels up independently as you perform that activity. Mining stone and ores raises Mining; growing crops raises Farming; fighting mobs raises Combat.",
    "Skill levels improve what you can do — better yields, stronger tools and access to tiered rewards. Your skill XP bars fill as you play, and level milestones unlock perks."
  ],
  facts: [["Skills", "Mining · Farming · Combat · Foraging · Fishing · Enchanting"], ["XP", "Action-based"], ["Rewards", "Per-level"], ["Max level", "COMING SOON"]],
  related: ["mining", "farming", "combat", "enchanting"]
},
{
  id: "quests",
  icon: "📜", cat: "Progression", title: "Quests",
  desc: "Daily and milestone quests give clear objectives, progress tracking and rewards.",
  body: [
    "Quests give you a goal and a reward. A typical quest might be 'Mine 20 Stone' — track your progress live and collect when it completes.",
    "Beginner quests unlock Daniel the guide, and finishing quests feeds your Watter XP. Daily quests reset on a schedule, so check back often."
  ],
  facts: [["Types", "Daily & Milestone"], ["Example", "Mine 20 Stone"], ["Tracking", "Live progress"], ["Rewards", "Coins & XP"]],
  related: ["collections", "watter-levels", "guides"]
},
{
  id: "collections",
  icon: "🧺", cat: "Progression", title: "Collections",
  desc: "Gather resources to fill collections. Each level unlocks recipes, perks and minion tiers.",
  body: [
    "Collections reward you for gathering large amounts of specific resources — stone, wood, crops, ores and mob drops each have their own collection.",
    "Reaching collection milestones unlocks new recipes and perks. Collections are one of the main sources of new items, so always bank your extra resources."
  ],
  facts: [["Examples", "Stone · Wood · Crops · Ores · Mob drops"], ["Unlocks", "Recipes & perks"], ["Progress", "Persistent"], ["Reward tiers", "COMING SOON"]],
  related: ["quests", "crafting", "minions"]
},
{
  id: "achievements",
  icon: "🏆", cat: "Progression", title: "Achievements",
  desc: "Milestone achievements track your biggest WatterCraft moments.",
  body: [
    "Achievements celebrate milestones: first island, first minion, first Dungeon clear, mastering every guide and more. Each one is tracked on your profile.",
    "Some achievements give one-time rewards like coins, gems or cosmetic tags. Completing the full Guide system grants the WatterCraft Scholar achievement."
  ],
  facts: [["Tracking", "Profile-based"], ["Special", "WatterCraft Scholar"], ["Rewards", "One-time"], ["Full list", "COMING SOON"]],
  related: ["guides", "watter-levels", "player-profiles"]
},
{
  id: "reforges",
  icon: "⚒️", cat: "Progression", title: "Reforges",
  desc: "Reforge your gear at the Anvil NPC to change its stats and adapt it to your playstyle.",
  body: [
    "Reforging modifies the bonus a piece of gear gives. A sword can be reforged toward pure damage, while armor can lean into defense or health.",
    "Reforges cost coins or materials and scale with your gear's rarity — legendary items gain stronger reforges than common ones. Victor the NPC teaches the full system."
  ],
  facts: [["NPC", "Victor"], ["Unlock", "Watter Level 7"], ["Cost", "Coins / materials"], ["Stat table", "COMING SOON"]],
  related: ["weapons", "armor", "rarities"]
},

/* ---------- SKILLS ---------- */
{
  id: "mining",
  icon: "⛏️", cat: "Skills", title: "Mining",
  desc: "Mine stone and ores to raise your Mining skill and earn resources, ores and coins.",
  body: [
    "Mining is the backbone of the WatterCraft economy. Break stone, coal, iron, gold, diamond and deeper ores to raise your Mining skill and feed your Collections.",
    "Deeper mines hold rarer ores and require a higher Mining skill or Watter Level. Marcus the NPC is the Mining guide and teaches efficient mining routes."
  ],
  facts: [["Guide", "Marcus"], ["Yield", "Skill-based"], ["Deeper mines", "Level-gated"], ["Ore list", "COMING SOON"]],
  related: ["skills", "collections", "watter-levels"]
},
{
  id: "farming",
  icon: "🌾", cat: "Skills", title: "Farming",
  desc: "Grow crops, breed animals and level Farming to feed the economy and your minions.",
  body: [
    "Farming turns your island into a food and material factory. Wheat, carrots, potatoes, sugar cane and more grow on your island's farm plots.",
    "Higher Farming levels give better yields, and collections unlock new seed and crop types. Maya the NPC teaches everything from tilling to automation."
  ],
  facts: [["Guide", "Maya"], ["Crops", "Multiple types"], ["Yield", "Skill-based"], ["Automation", "Minions later"]],
  related: ["skills", "minions", "collections"]
},
{
  id: "combat",
  icon: "⚔️", cat: "Skills", title: "Combat",
  desc: "Fight mobs and custom bosses to raise Combat and earn weapons, drops and Dungeon access.",
  body: [
    "Combat covers every fight: Hub mobs, custom bosses and Dungeon runs. Kill mobs for drops and Combat XP, and take on bosses for legendary gear.",
    "Combat areas around the world scale in difficulty. Leon the NPC is the Combat guide, and Dungeon Don handles the advanced end-game content."
  ],
  facts: [["Guide", "Leon"], ["Content", "Mobs · Bosses · Dungeons"], ["Drops", "Gear & items"], ["Bosses", "Custom"]],
  related: ["skills", "custom-bosses", "dungeons"]
},
{
  id: "foraging",
  icon: "🪓", cat: "Skills", title: "Foraging",
  desc: "Chop trees and gather wood to level Foraging, the fuel behind crafting and building.",
  body: [
    "Foraging is all about wood and the wilds. Chop oak, spruce, birch and jungle trees to gather logs for crafting, building and your collections.",
    "The Forest area is built for foraging, with respawning trees and rarer wood deeper in. A higher Foraging level speeds up chopping and unlocks better axes."
  ],
  facts: [["Area", "Forest"], ["Resource", "Wood & wild drops"], ["Use", "Crafting & building"], ["Unlocks", "Better axes"]],
  related: ["skills", "crafting", "world"]
},
{
  id: "fishing",
  icon: "🎣", cat: "Skills", title: "Fishing",
  desc: "Cast a line into WatterCraft waters for fish, treasure and rare finds.",
  body: [
    "Fishing gives you a calm way to earn resources: raw fish for food, and occasionally treasure items from the water.",
    "Your Fishing level affects what you can catch. It also pairs with collections that reward you for catching many of each fish."
  ],
  facts: [["Output", "Fish & treasure"], ["Levels", "Better catches"], ["Location", "Islands & Hub ponds"], ["Loot table", "COMING SOON"]],
  related: ["skills", "collections"]
},
{
  id: "enchanting",
  icon: "🔮", cat: "Skills", title: "Enchanting",
  desc: "Apply enchantments to gear at the Enchanting Table to multiply your power.",
  body: [
    "Enchanting lets you add powerful modifiers to weapons, armor and tools. The Enchanting Table converts XP and materials into enchantments.",
    "Noah the NPC teaches which enchantments fit each item type. Better gear rarity supports stronger enchantment combinations."
  ],
  facts: [["Guide", "Noah"], ["Cost", "XP & materials"], ["Gear", "Weapons · Armor · Tools"], ["Table", "COMING SOON"]],
  related: ["skills", "weapons", "armor", "crafting"]
},
{
  id: "crafting",
  icon: "🛠️", cat: "Skills", title: "Crafting & Recipes",
  desc: "Turn raw resources into tools, blocks and gear through WatterCraft recipes.",
  body: [
    "Crafting combines resources into useful items. Basic recipes follow classic Minecraft, while WatterCraft adds custom recipes for unique weapons, tools and blocks.",
    "Collections unlock many recipes, so gather broadly. Ethan the NPC is the crafting guide for the full custom recipe list."
  ],
  facts: [["Guide", "Ethan"], ["Source", "Collections"], ["Custom", "WatterCraft items"], ["Recipe list", "COMING SOON"]],
  related: ["collections", "enchanting", "foraging"]
},

/* ---------- CONTENT ---------- */
{
  id: "items",
  icon: "🎒", cat: "Content", title: "Items",
  desc: "Everything you can hold: resources, consumables, special items and more.",
  body: [
    "Items in WatterCraft fall into categories: weapons, armor, tools, resources, consumables and special items. Most are obtained by gathering, crafting, buying at the Bazaar or looting bosses.",
    "Each item has a rarity, description and — for gear — stats and abilities. Full item stats and recipes are data-driven and will be published in the item database."
  ],
  facts: [["Types", "Weapons · Armor · Tools · Resources · Consumables · Special"], ["Rarity", "Common → Divine"], ["Database", "COMING SOON"]],
  related: ["rarities", "weapons", "armor", "bazaar"]
},
{
  id: "weapons",
  icon: "🗡️", cat: "Content", title: "Weapons",
  desc: "Swords, bows, axes and dungeon weapons — the tools of combat.",
  body: [
    "Weapons are your combat gear. Swords cover most fights, bows give ranged options, and dungeon weapons carry special effects for end-game content.",
    "Damage, abilities and rarity vary by weapon. Luna the NPC is the weapon guide and can point you to the strongest drops and reforges."
  ],
  facts: [["Guide", "Luna"], ["Categories", "Swords · Bows · Axes · Special"], ["Source", "Drops · Crafting · Bazaar"], ["Stats", "COMING SOON"]],
  related: ["items", "combat", "reforges", "rarities"]
},
{
  id: "armor",
  icon: "🛡️", cat: "Content", title: "Armor",
  desc: "Armor sets protect you from mobs and bosses. Mix sets, rarities and reforges to survive.",
  body: [
    "Armor gives Health and Defense to keep you alive in harder content. Complete sets can grant set bonuses, so match pieces carefully.",
    "Ryan the NPC is the armor guide. Reforging armor lets you push it toward defense, health or hybrid builds."
  ],
  facts: [["Guide", "Ryan"], ["Stats", "Health · Defense"], ["Sets", "Bonus per set"], ["Source", "Drops · Crafting"]],
  related: ["items", "reforges", "rarities"]
},
{
  id: "pets",
  icon: "🐾", cat: "Content", title: "Pets",
  desc: "Companion pets follow you, level up, and grant passive bonuses.",
  body: [
    "Pets are companions with their own level and bonuses. Wolf, Pig, Chicken and rarer pets like the Ender Dragon each boost different playstyles.",
    "Sophie the NPC is the pet guide. Pets level up as you play and can be upgraded to increase their perks."
  ],
  facts: [["Guide", "Sophie"], ["Examples", "Wolf · Pig · Chicken · Ender Dragon"], ["Role", "Passive bonuses"], ["Levels", "Grow with play"]],
  related: ["items", "combat", "rarities"]
},
{
  id: "minions",
  icon: "🤖", cat: "Content", title: "Minions",
  desc: "Automated helpers that gather resources for you — even while you are offline.",
  body: [
    "Minions are the heart of SkyBlock automation. Place a minion on your island and it collects its resource on a timer, storing output in its own chest.",
    "Higher minion tiers gather faster and hold more. Arthur the NPC is the minion guide and explains upgrades, fuel and storage."
  ],
  facts: [["Guide", "Arthur"], ["Work", "While offline"], ["Upgrades", "Tier system"], ["Fuel", "Speeds production"]],
  related: ["islands", "collections", "farming"]
},
{
  id: "mobs",
  icon: "👹", cat: "Content", title: "Mobs",
  desc: "Hostile and friendly mobs across the world drop loot, XP and collection items.",
  body: [
    "Mobs populate WatterCraft's combat areas, from the overworld Hub outskirts to the Nether and Dungeon floors. Kill them for Combat XP and drops.",
    "Rarer mobs drop rarer loot. Custom mobs — including custom bosses — are unique WatterCraft content with their own mechanics and rewards."
  ],
  facts: [["Locations", "Combat areas · Nether · Dungeons"], ["Drops", "Loot & XP"], ["Custom", "WatterCraft mobs"], ["Bestiary", "COMING SOON"]],
  related: ["combat", "custom-bosses", "dungeons"]
},
{
  id: "custom-bosses",
  icon: "👑", cat: "Content", title: "Custom Bosses",
  desc: "Hand-built boss fights with unique mechanics, legendary drops and custom swords.",
  body: [
    "WatterCraft bosses are custom-built fights — not vanilla mobs. Each has its own arena, attack patterns and phases, and drops exclusive legendary gear.",
    "Bosses scale from early-game challenges to end-game raids. Coordinate with friends, learn the mechanics and claim the unique drops."
  ],
  facts: [["Type", "Custom PvE fights"], ["Drops", "Legendary gear & swords"], ["Arena", "Dedicated boss island"], ["Scaling", "Beginner → end-game"]],
  related: ["combat", "dungeons", "weapons", "rarities"]
},
{
  id: "dungeons",
  icon: "🏰", cat: "Content", title: "Dungeons",
  desc: "Team-based dungeon floors with classes, difficulty and exclusive rewards.",
  body: [
    "Dungeons are WatterCraft's end-game PvE. Form a party, pick a class, and clear floors of increasing difficulty for exclusive gear and Dungeon XP.",
    "Each floor demands teamwork and better gear than the last. Dungeon Don the NPC is the gateway to this content and tracks your floor progression."
  ],
  facts: [["Type", "Multiplayer PvE"], ["Classes", "Role-based"], ["Progression", "Floor by floor"], ["Floors", "COMING SOON"]],
  related: ["custom-bosses", "combat", "guides", "watter-levels"]
},
{
  id: "rarities",
  icon: "🌈", cat: "Content", title: "Rarities",
  desc: "Every item has a rarity — Common to Divine — that shapes its stats, glow and value.",
  body: [
    "Rarity tells you how strong and valuable an item is. The ladder runs Common, Uncommon, Rare, Epic, Legendary, Mythic and Divine.",
    "Higher rarities carry stronger base stats, better reforge potential and a distinctive border and glow so you can spot treasure at a glance."
  ],
  facts: [["Order", "Common → Uncommon → Rare → Epic → Legendary → Mythic → Divine"], ["Effect", "Stats · Reforge · Value"], ["Visual", "Border & glow"], ["Drop rates", "COMING SOON"]],
  related: ["items", "weapons", "armor", "reforges"]
},

/* ---------- ECONOMY ---------- */
{
  id: "economy",
  icon: "💰", cat: "Economy", title: "Economy Overview",
  desc: "Coins, Gems, the Bazaar and the Auction House form WatterCraft's player economy.",
  body: [
    "WatterCraft runs a full player-driven economy. Earn Coins by selling, questing and flipping the Bazaar; spend them on gear, materials and progression.",
    "Gems are the premium currency, used for exclusive items and cosmetics. Motu Seth the NPC is the economy guide who teaches the smart way to earn."
  ],
  facts: [["Currencies", "Coins · Gems"], ["Markets", "Bazaar · Auction House"], ["Guide", "Motu Seth"], ["Rules", "No real-money trading"]],
  related: ["coins", "gems", "bazaar", "auction-house"]
},
{
  id: "coins",
  icon: "🪙", cat: "Economy", title: "Coins",
  desc: "The main currency — earned from selling, quests and the Bazaar; spent everywhere.",
  body: [
    "Coins are WatterCraft's everyday currency. Sell resources, complete quests and play the Bazaar to grow your balance.",
    "You spend Coins at shops, the Bazaar, reforges and island upgrades. Earning a total of 500 Coins unlocks Motu Seth's economy guide."
  ],
  facts: [["Use", "Shops · Bazaar · Upgrades"], ["Earning", "Selling · Quests · Trading"], ["Unlock", "Motu Seth at 500 Coins"], ["Sinks", "COMING SOON"]],
  related: ["economy", "bazaar", "quests"]
},
{
  id: "gems",
  icon: "💎", cat: "Economy", title: "Gems",
  desc: "The premium currency for exclusive gear, cosmetics and special items.",
  body: [
    "Gems are WatterCraft's premium currency. You can earn small amounts through play, and larger amounts through the store.",
    "Gems buy exclusive cosmetics, special items and convenience perks. Store gems are delivered in-game instantly after purchase."
  ],
  facts: [["Use", "Exclusive items & cosmetics"], ["Earning", "Play & store"], ["Store", "Instant delivery"], ["Rate", "1 ₹ = 10 Gems"]],
  related: ["economy", "store", "items"]
},
{
  id: "bazaar",
  icon: "🏪", cat: "Economy", title: "Bazaar",
  desc: "A living market of buy and sell orders — set your price and let the market work.",
  body: [
    "The Bazaar is where players trade in bulk. Place a sell order to list items at your price, or a buy order to purchase instantly when someone matches it.",
    "Market prices move with supply and demand, so smart traders watch the spread. Bazaar Babu the NPC teaches order strategy and market risk."
  ],
  facts: [["Guide", "Bazaar Babu"], ["Orders", "Buy & Sell"], ["Prices", "Player-driven"], ["Live prices", "COMING SOON"]],
  related: ["economy", "coins", "auction-house"]
},
{
  id: "auction-house",
  icon: "🔨", cat: "Economy", title: "Auction House",
  desc: "Bid on rare items or auction your own loot to the highest bidder.",
  body: [
    "The Auction House is where high-value items change hands. List your loot with a starting price, or bid on other players' auctions before time runs out.",
    "Auction Uncle the NPC explains pricing, bidding and market value. Auctions are the best place to sell rare boss drops at their true value."
  ],
  facts: [["Guide", "Auction Uncle"], ["Type", "Player auctions"], ["Best for", "Rare & boss loot"], ["Fees", "COMING SOON"]],
  related: ["economy", "bazaar", "coins"]
},

/* ---------- COMMUNITY ---------- */
{
  id: "player-profiles",
  icon: "🧍", cat: "Community", title: "Player Profiles",
  desc: "Your public profile shows Watter Level, skills, coins, collections and achievements.",
  body: [
    "Every player has a public profile tracked by the network. It shows your Minecraft username, Watter Level, skill breakdown, coins, collections and achievements.",
    "Profiles power the Leaderboards. When the live API connects, profiles and leaderboards will pull real network data."
  ],
  facts: [["Shows", "Level · Skills · Coins · Collections"], ["Powers", "Leaderboards"], ["Live API", "Coming when backend is ready"]],
  related: ["achievements", "watter-levels", "leaderboards"]
},
{
  id: "server-rules",
  icon: "📏", cat: "Community", title: "Server Rules",
  desc: "The rules that keep WatterCraft fair, friendly and fun for everyone.",
  body: [
    "No hacking, X-ray or unfair modifications — instant ban. No scamming or real-money trading outside approved systems. Respect staff and players; toxicity is not tolerated.",
    "Griefing, raiding and exploiting bugs are all punishable, and duplication results in a permanent ban. Report issues to staff and earn rewards for finding real bugs."
  ],
  facts: [["Cheating", "Instant ban"], ["Scamming", "Punishable"], ["Griefing", "Punishable"], ["Duplication", "Permanent ban"]],
  related: ["faq", "support", "staff"]
},
{
  id: "faq",
  icon: "❓", cat: "Community", title: "FAQ",
  desc: "Quick answers to the most common questions about joining and playing WatterCraft.",
  body: [
    "Q: How do I join? A: Minecraft Bedrock, play.wattercraft.fun, port 19132. Q: Is it free? A: Yes — ranks and gems are optional store purchases.",
    "Q: Where do I claim a rank I bought? A: Use /redeem with your unique code in-game. Q: Where do I report a player? A: Join the Discord or use the Support page."
  ],
  facts: [["IP", "play.wattercraft.fun:19132"], ["Redeem", "/redeem <code>"], ["Support", "Discord + Support page"], ["More", "Ask in Discord"]],
  related: ["server-rules", "support", "getting-started"]
}
];
