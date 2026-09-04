/* ============================================================
   WatterCraft V2.5 — Updates / News Data
   Newest first. Categories: FIX NEW ANNOUNCEMENT IMPORTANT
   MAINTENANCE BALANCE WEBSITE EVENT.
   Also mirrors into window.WC.updates so the existing Updates
   route shows real entries immediately.
   ============================================================ */
window.WCV = window.WCV || {};

window.WCV.updateFilters = [
  { id: "all", label: "All" },
  { id: "fix", label: "Fixes" },
  { id: "new", label: "New" },
  { id: "announcement", label: "Announcements" },
  { id: "maintenance", label: "Maintenance" },
  { id: "balance", label: "Balance" },
  { id: "website", label: "Website" },
  { id: "event", label: "Events" }
];

window.WCV.updates = [
  {
    id: "update-005", num: "#005",
    icon: "🌐", cat: "website", tag: "WEBSITE",
    title: "Website V2.5 — Galaxy & Wiki Launch",
    date: "2026-09-04", author: "Anshhu07",
    status: "Live", statusColor: "#4ade80",
    summary: "New galaxy background, full 30-category Wiki, 20 guide NPCs and an Updates timeline are now live.",
    body: [
      "The website has been upgraded to V2.5: a cinematic WatterCraft galaxy background, a complete Wiki with 30 categories, the 20 Hub guide NPCs with unlock tracking, and a brand-new Updates timeline.",
      "Leaderboards are API-ready and will connect to live network data as soon as the backend is deployed — no fake rankings are ever shown."
    ],
    affected: ["Website"],
    tags: ["Website", "Wiki", "Guides"]
  },
  {
    id: "update-004", num: "#004",
    icon: "✨", cat: "new", tag: "NEW",
    title: "Store Ranks: NOBLE, RICH & SUPREME",
    date: "2026-09-03", author: "Team WatterCraft",
    status: "Live", statusColor: "#4ade80",
    summary: "Three paid 30-day ranks with gems, PlayerVaults, kits and chat tags are now available in the store.",
    body: [
      "NOBLE (₹70 / 700 Gems), RICH (₹150 / 1,500 Gems) and SUPREME (₹200 / 2,000 Gems) are now live for 30 days each. Every rank includes its own kit, PlayerVaults and chat tag.",
      "Ranks are delivered in-game with a unique code — use /redeem <code> to claim. Gems are added instantly at 1 ₹ = 10 Gems."
    ],
    affected: ["Store", "In-game ranks"],
    tags: ["Store", "Ranks", "Gems"]
  },
  {
    id: "update-003", num: "#003",
    icon: "🔧", cat: "fix", tag: "FIX",
    title: "Shop Price Bug Fixed",
    date: "2026-09-03", author: "Team WatterCraft",
    status: "Fixed", statusColor: "#4ade80",
    summary: "Several incorrect shop buy and sell prices have been corrected to match the intended economy.",
    body: [
      "A number of shop items were showing incorrect buy and sell prices. All reported entries have been audited and corrected.",
      "If you spot an item priced outside the normal range, report it in Discord — bug reporters earn rewards."
    ],
    affected: ["Shops", "Economy"],
    tags: ["Fix", "Economy"]
  },
  {
    id: "update-002", num: "#002",
    icon: "📢", cat: "announcement", tag: "ANNOUNCEMENT",
    title: "UPI Store is Live",
    date: "2026-08-30", author: "Anshhu07",
    status: "Live", statusColor: "#4ade80",
    summary: "Pay via GPay, PhonePe or Paytm — ranks and gems are delivered in-game instantly.",
    body: [
      "The WatterCraft store now supports UPI payments through GPay, PhonePe and Paytm. After payment you receive a unique code.",
      "Redeem your code in-game with /redeem to get your rank or gems instantly. Store support is available on Discord."
    ],
    affected: ["Store"],
    tags: ["Store", "UPI"]
  },
  {
    id: "update-001", num: "#001",
    icon: "🎉", cat: "event", tag: "EVENT",
    title: "Season 2 — New Boss Island",
    date: "2026-08-22", author: "Team WatterCraft",
    status: "Ongoing", statusColor: "#fbbf24",
    summary: "A new custom boss arena with legendary sword drops, plus Skyblock Nights events every Friday.",
    body: [
      "Season 2 introduced a new custom boss island with unique mechanics and exclusive legendary sword drops.",
      "Skyblock Nights runs every Friday with double minion speed and scheduled drop parties. Join the Discord for event times."
    ],
    affected: ["World", "Events"],
    tags: ["Event", "Bosses"]
  }
];

/* Mirror into WC so the existing Updates page works immediately */
try {
  window.WC = window.WC || {};
  window.WC.updates = (window.WCV.updates || []).map(function (u) {
    return {
      tag: u.tag,
      date: u.date.split("-").reverse().join(" "),
      title: u.title,
      summary: u.summary,
      icon: u.icon
    };
  });
} catch (e) {}
