/**
 * Deal Articles
 *
 * Lightweight deal roundups — intro, deal cards (H2 + pros/cons), internal links.
 * Rendered by DealArticle.js (contentType: "deal").
 *
 * Post-level fields:
 * - dealEndsAt: ISO 8601 end datetime (shows page countdown when set)
 * - countdownHeadline, countdownSubline: optional countdown copy overrides
 *
 * Deal object fields:
 * - id, name, badge, dealPrice, originalPrice, description, imageUrl, affiliateLink, pros, cons
 * - offer, totalSavings, limitedStock, dealType ("price-cut" | "bonus-only")
 * - reviewLink: optional path to full product review (auto-resolved from id when omitted)
 */

export const dealArticles = [
  {
    // --- Post metadata ---
    categorySlug: "deals",
    category: "Deals",
    contentType: "deal",
    slug: "electric-bike-deals",

    // --- SEO & headings ---
    title: "Velotric Prime Day 2026: Best Electric Bike Deals Running Right Now",
    seoTitle: "Best Electric Bike Deals: Save Up to $862 This Prime Day",
    h1: "The Best Electric Bike Deals Worth Grabbing This Prime Day",
    metaDescription:
      "Velotric's Prime Day 2026 sale runs June 17–28. Save up to $862 on e-bikes including the Fold 1 at $500 off, Summit 1, T1 ST Plus, and more.",

    // --- Images ---
    heroImage: "/images/deals/hero1.webp",
    cardImage: "/images/deals/card1.webp",
    articleHeroImage: "/images/deals/article-hero.webp",
    heroImageAlt:
      "Velotric electric bikes on display during Prime Day 2026 sale event with discounts up to $862",

    // --- Intro ---
    introductionParagraphs: [
      "Velotric doesn't do a ton of sitewide sales throughout the year, so when their Prime Day event kicks off, it's worth paying attention. Starting June 17th and running through June 28th, 2026, they've stacked price cuts with free accessory bundles across most of their lineup. Some of these deals are genuinely strong. A few are more modest. I'll walk you through which ones are actually worth grabbing and which you can take your time on.",
      "I went through all 14 models in this sale and ranked them by real value, not just the biggest discount number. The Fold 1 stands out immediately at $500 off, but the T1 ST Plus bundle might actually be the smarter buy depending on what you need. If you've been sitting on a decision about a Velotric e-bike, now's a reasonable window. Prices below reflect the sale through June 28th.",
    ],

    // --- Post settings ---
    estimatedReadingTime: 6,
    publishedAt: "2026-06-15T00:00:00Z",
    dealEndsAt: "2026-06-28T23:59:59-04:00",
    countdownHeadline: "Prime Day Phase 1 Sale Ends June 28",
    countdownSubline: "Prices revert after June 28th. Accessory bundles available while supplies last.",
    productCtaLabel: "Check Deal",
    dealsTableTitle: "All Velotric Electric Bike Deals at a Glance",

    // --- Deal cards ---
    deals: [
      {
        id: "velotric-fold-1",
        name: "Velotric Fold 1",
        imageUrl: "/images/deals/velotric-fold-1.webp",
        badge: "Save $500 — Biggest Price Cut",
        description:
          "This is the standout deal in the sale. The Fold 1 drops from $1,499 to $999, and you get a free Half Twist Throttle Set on top of that. At under $1,000 for a folding e-bike from a brand that gets consistently solid reviews, this is one of the better folding electric bike deals you'll see this year. Worth flagging: it's a folding bike, so it's not built for heavy off-road use, but for commuting or tossing in a trunk, it punches well at this price.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$999",
        originalPrice: "$1,499",
        offer: "$500 off + Free Velotric Half Twist Throttle Set",
        totalSavings: "$548",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Biggest raw price cut in the entire sale at $500 off",
          "Sub-$1,000 entry point is rare for a quality folding e-bike",
          "Free throttle set adds genuine utility, not just a tote bag",
        ],
        cons: [
          "Folding frame design means some ride quality trade-offs compared to full-size e-bikes",
          "No limited stock flag from Velotric, but popular models in sales like this do move fast",
        ],
        reviewLink: "/deals/velotric-fold-1-review",
      },
      {
        id: "velotric-t1-st-plus",
        name: "Velotric T1 ST Plus",
        imageUrl: "/images/deals/velotric-t1-st-plus.webp",
        badge: "Best Bundle Value",
        description:
          "The T1 ST Plus is $300 off at $1,349, and the accessories bundled in are actually useful ones: a modular rear rack, fender pack, and a range extender battery. That last piece is what pushes the total savings to $862. A range extender alone typically runs several hundred dollars, so if you're planning longer rides and were going to buy one anyway, you're essentially getting the bike at a steep discount. This is the deal I'd point most buyers toward.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,349",
        originalPrice: "$1,649",
        offer: "$300 off + Free Rear Rack, Fender Pack & Range Extender Battery",
        totalSavings: "$862",
        dealType: "price-cut",
        limitedStock: true,
        pros: [
          "Range extender battery alone makes this bundle genuinely valuable",
          "Practical accessories (rack, fender) rather than novelty freebies",
          "$862 in total savings is the highest figure in this entire sale",
        ],
        cons: [
          "Limited stock confirmed by Velotric, so this one could sell out before June 28th",
          "At $1,349 it's still a real spend, even after the discount",
        ],
        reviewLink: "/deals/velotric-t1-st-plus-review",
      },
      {
        id: "velotric-discover-2",
        name: "Velotric Discover 2",
        imageUrl: "/images/brand/velotric/Velotric Discover 2.webp",
        badge: "Save $300 — No-Fuss Price Drop",
        description:
          "The Discover 2 is a straight $300 price cut, no accessory bundle attached. It goes from $1,999 to $1,699. Honestly, sometimes that's easier to evaluate because there's no math to do on freebie value. If you've been looking at the Discover 2 specifically, this is a clean 15% off. Not the splashiest deal in the sale, but it's real money back on a solid commuter e-bike.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,699",
        originalPrice: "$1,999",
        offer: "$300 off",
        totalSavings: "$300",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Straightforward price drop with no bundle math to figure out",
          "15% off is meaningful on a $2,000 purchase",
        ],
        cons: [
          "No accessory bundle means you're just getting the price cut, nothing extra",
          "Other models in the sale offer more compelling total value packages",
        ],
        reviewLink: "/deals/velotric-discover-2-review",
      },
      {
        id: "velotric-summit-1",
        name: "Velotric Summit 1",
        imageUrl: "/images/deals/velotric-summit-1.webp",
        badge: "Best Electric Mountain Bike Deal",
        description:
          "The Summit 1 drops $200 to $1,799 and comes with a free rear rack and fender. Total savings land at $360 when you factor in the accessories. If you've been hunting for an electric mountain bike deal, this is one of the better options in the sale. The Summit line is built for trail riding, so this isn't a commuter dressed up in off-road clothes. Just be aware that limited stock is confirmed on this one.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,799",
        originalPrice: "$1,999",
        offer: "$200 off + Free Rear Rack & Fender",
        totalSavings: "$360",
        dealType: "price-cut",
        limitedStock: true,
        pros: [
          "Legitimate electric mountain bike at a meaningful discount",
          "Rack and fender bundle are actually useful for trail and commute crossover riders",
          "$360 in savings is solid on a purpose-built e-MTB",
        ],
        cons: [
          "Limited stock confirmed, so don't sit on this one too long",
          "At $1,799 it's still a big purchase, and the $200 off is 10% rather than the headline-grabbing cuts elsewhere",
        ],
        reviewLink: "/deals/velotric-summit-1-review",
      },
      {
        id: "velotric-nomad-2",
        name: "Velotric Nomad 2",
        imageUrl: "/images/deals/velotric-nomad-2.webp",
        badge: "Save $275 with Pannier Bag",
        description:
          "The Nomad 2 goes from $1,999 to $1,799 with a free pannier bag added in. If you're shopping for a fat tire e-bike, the Nomad 2 is Velotric's main offering in that category. The pannier bag is a practical freebie for riders who actually carry cargo. Total savings of $275 is a reasonable deal, though not the most dramatic cut in this sale.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,799",
        originalPrice: "$1,999",
        offer: "$200 off + Free Rear Rack Pannier Bag",
        totalSavings: "$275",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Solid option if you specifically want a fat tire e-bike from Velotric",
          "Pannier bag is useful for commuters and weekend riders who carry gear",
        ],
        cons: [
          "10% off is a moderate discount, not a dramatic price event",
          "The Nomad 2X is a step up in specs and sits at a similar discount, worth comparing",
        ],
        reviewLink: "/deals/velotric-nomad-2-review",
      },
      {
        id: "velotric-nomad-2x",
        name: "Velotric Nomad 2X",
        imageUrl: "/images/brand/velotric/Velotric Nomad 2X Ebike.webp",
        badge: "Upgraded Fat Tire Option",
        description:
          "The Nomad 2X is the step-up version of the Nomad 2, and it's on the same deal structure: $200 off with a free pannier bag. MTC pricing lands at $2,299 (down from $2,499), and non-MTC sits at $2,199 (down from $2,399). If you're choosing between the Nomad 2 and 2X, the extra $400 to $500 gets you upgraded components. Whether that's worth it depends on your use case, but the deal structure is identical across both.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$2,199",
        originalPrice: "$2,399",
        offer: "$200 off + Free Rear Rack Pannier Bag",
        totalSavings: "$275",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Same deal percentage as the Nomad 2 but on a more capable bike",
          "Good time to stretch budget if you were already considering the 2X",
        ],
        cons: [
          "At $2,199+ it's the pricier end of this sale without a proportionally larger discount",
          "MTC vs. non-MTC pricing difference can be confusing; check Velotric's site for which applies to your order",
        ],
        reviewLink: "/deals/velotric-nomad-2x-review",
      },
      {
        id: "velotric-breeze-1",
        name: "Velotric Breeze 1",
        imageUrl: "/images/deals/velotric-breeze-1.webp",
        badge: "Step-Through Commuter Deal",
        description:
          "The Breeze 1 is $100 off at $1,699 with a free rear rack and fender. It's one of Velotric's step-through commuter designs, which makes it a popular pick for seniors and riders who want easy on/off. Honest take: $100 off on a $1,799 bike is a modest deal percentage-wise, and the accessories add about $150 in value, so total savings of $250 is respectable. It's not the headline deal, but if the Breeze is the bike you want, this is a fine window to buy.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,699",
        originalPrice: "$1,799",
        offer: "$100 off + Free Rear Rack & Fender",
        totalSavings: "$250",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Step-through frame design makes it genuinely accessible for a wide range of riders",
          "Rack and fender bundle adds practical value for daily commuters",
        ],
        cons: [
          "$100 off is only about 5.5% on the original price, so the accessories carry most of the value here",
          "Not a deal that warrants urgency if you're on the fence about the Breeze specifically",
        ],
        reviewLink: "/deals/velotric-breeze-1-review",
      },
      {
        id: "velotric-fold-1-plus",
        name: "Velotric Fold 1 Plus",
        imageUrl: "/images/brand/velotric/Velotric Fold 1 Plus Ebike.webp",
        badge: "Upgraded Folder with Bag",
        description:
          "The Fold 1 Plus is $100 off at $1,399 with a free pannier bag. It's the higher-spec version of the Fold 1, and with the Fold 1 sitting at $500 off right now, you'd want to think through whether the Plus's improvements justify the $400 gap. If you know you want the upgraded components, fine. But if you're flexible, the base Fold 1 is the stronger deal this cycle.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,399",
        originalPrice: "$1,499",
        offer: "$100 off + Free Rear Rack Pannier Bag",
        totalSavings: "$175",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Step-up specs over the base Fold 1 for buyers who want that",
          "Pannier bag is useful for commuters carrying daily gear",
        ],
        cons: [
          "Hard to recommend over the base Fold 1 which is $400 cheaper with a bigger price cut right now",
          "$100 off is a small percentage on a $1,499 bike",
        ],
        reviewLink: "/deals/velotric-fold-1-plus-review",
      },
      {
        id: "velotric-discover-3",
        name: "Velotric Discover 3",
        imageUrl: "/images/deals/velotric-discover-3.webp",
        badge: "Bonus Bundle, No Price Cut",
        description:
          "The Discover 3 stays at its full MSRP of $1,999 but comes with a free rack top bag, phone mount, and gift box. Worth being upfront: this is a bonus-only deal with no actual price reduction. The accessories have real utility, especially the phone mount for navigation, but you're paying full price for the bike itself. If you've already decided on the Discover 3 and been waiting for a reason to pull the trigger, this is that reason. If you're price-sensitive, the Discover 2 at $300 off is the more direct comparison.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,999",
        originalPrice: "$1,999",
        offer: "Free Rack Top Bag, Phone Mount & Velotric Gift Box",
        totalSavings: "$279",
        dealType: "bonus-only",
        limitedStock: false,
        pros: [
          "Phone mount is genuinely useful for everyday riding and navigation",
          "If you planned to buy accessories separately, bundling them in saves real money",
        ],
        cons: [
          "No price cut on the bike itself, which is a meaningful distinction from other deals in this sale",
          "Harder to justify over the Discover 2 at $1,699 for most buyers",
        ],
        reviewLink: "/deals/velotric-discover-3-review",
      },
      {
        id: "velotric-discover-max",
        name: "Velotric Discover Max",
        imageUrl: "/images/deals/velotric-discover-max.webp",
        badge: "Top-Tier Commuter, Bonus-Only Deal",
        description:
          "The Discover Max is Velotric's premium commuter at $2,499, and like the Discover 3, it's a bonus-only deal this Prime Day. You get a free rack top bag, phone mount, and gift box. If you're already in the market for the Max specifically, the bundle is a nice add. But if you're comparing against the Discover 2 at $300 off, the Max costs $800 more and doesn't have a price reduction. The specs justify that difference for some buyers, but it's worth thinking through.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$2,499",
        originalPrice: "$2,499",
        offer: "Free Rack Top Bag, Phone Mount & Velotric Gift Box",
        totalSavings: "$279",
        dealType: "bonus-only",
        limitedStock: false,
        pros: [
          "The Max is Velotric's flagship commuter if you want top-end specs",
          "Free accessories add day-one utility without waiting for your own order",
        ],
        cons: [
          "No price reduction on a $2,499 bike is hard to call a Prime Day deal in the traditional sense",
          "Tough comparison against the Discover 2's straight $300 price cut for buyers who don't need flagship specs",
        ],
        reviewLink: "/deals/velotric-discover-max-review",
      },
      {
        id: "velotric-summit-2",
        name: "Velotric Summit 2",
        imageUrl: "/images/deals/velotric-summit-2.webp",
        badge: "Trail-Ready, Free Rack Bundle",
        description:
          "The Summit 2 stays at $2,099 but picks up a free modular rear rack and gift box, totaling $219 in extras. Again, no price drop here. The Summit 2 is the upgraded mountain e-bike in the lineup, and if that's what you're after, the rack is actually a useful freebie for carrying gear on trails or commutes. But compared to the Summit 1 with a real price cut and rack bundle, you'll want to weigh whether the Summit 2's spec bump is worth the extra spend.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$2,099",
        originalPrice: "$2,099",
        offer: "Free Modular Rear Rack & Velotric Gift Box",
        totalSavings: "$219",
        dealType: "bonus-only",
        limitedStock: false,
        pros: [
          "Modular rear rack is a genuinely useful accessory for the Summit 2's use case",
          "Best-in-lineup mountain e-bike if specs are the priority",
        ],
        cons: [
          "Full MSRP with accessory bundle rather than a price reduction",
          "Summit 1 at $1,799 with a real discount offers better value for most off-road riders",
        ],
        reviewLink: "/deals/velotric-summit-2-review",
      },
      {
        id: "velotric-tempo",
        name: "Velotric Tempo",
        imageUrl: "/images/deals/velotric-tempo.webp",
        badge: "Budget-Friendly Entry Point",
        description:
          "The Tempo sits at $1,499 with no price cut, just a free rear rack and gift box. At $219 in accessories, it's not nothing, but the Tempo is already one of Velotric's more affordable models and this sale doesn't reduce the price at all. If budget is the priority and you want the lowest entry point into the Velotric lineup, the Fold 1 at $999 is a stronger conversation. The Tempo is for buyers who specifically want a non-folding design at this price tier.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,499",
        originalPrice: "$1,499",
        offer: "Free Velotric Tempo Rear Rack & Velotric Gift Box",
        totalSavings: "$219",
        dealType: "bonus-only",
        limitedStock: false,
        pros: [
          "Rear rack included out the gate, no need to buy separately",
          "One of the more affordable non-folding options in the Velotric range",
        ],
        cons: [
          "No price reduction in a Prime Day sale is a bit underwhelming",
          "The Fold 1 at $999 is $500 cheaper right now and makes the Tempo hard to recommend to budget shoppers",
        ],
        reviewLink: "/deals/velotric-tempo-review",
      },
      {
        id: "velotric-gomad",
        name: "Velotric GoMad",
        imageUrl: "/images/deals/velotric-gomad.webp",
        badge: "Cargo E-Bike with Free Front Rack",
        description:
          "The GoMad is Velotric's cargo-focused model at $1,999, and this sale adds a free front rack and gift box. The front rack is specific and meaningful for cargo use, so if that's your use case, it's a useful bundle. No price reduction though, same as several others in the lower-priority tier here. If you're specifically shopping for the best cargo e-bike in your budget, the free rack makes this slightly more of a deal.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$1,999",
        originalPrice: "$1,999",
        offer: "Free Velotric Front Rack & Velotric Gift Box",
        totalSavings: "$219",
        dealType: "bonus-only",
        limitedStock: false,
        pros: [
          "Front rack is purpose-specific and actually suits the GoMad's cargo orientation",
          "If you're in the market for a cargo e-bike, this adds immediate value",
        ],
        cons: [
          "Full MSRP with no price cut during a Prime Day sale is easy to overlook",
          "At $1,999 with just accessories, it's harder to recommend over models with real discounts unless the GoMad is specifically what you need",
        ],
        reviewLink: "/deals/velotric-gomad-review",
      },
      {
        id: "velotric-triker",
        name: "Velotric Triker",
        imageUrl: "/images/deals/velotric-triker.webp",
        badge: "Electric Trike, $100 Off",
        description:
          "The Triker is Velotric's three-wheeled option at $2,499 full price, dropping to $2,399 with a $100 discount and free gift box. If you're in the market for an electric trike, there aren't a ton of brand-name options, and the Triker is one of the more reputable ones. The $100 off is modest, but electric trikes rarely go on sale at all. Total savings of $239 with the gift box factored in. Worth a look if this specific category is what you need.",
        affiliateLink: "https://www.velotricbike.com/",
        dealPrice: "$2,399",
        originalPrice: "$2,499",
        offer: "$100 off + Free Velotric Gift Box",
        totalSavings: "$239",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Electric trikes don't go on sale often, so any price reduction is notable",
          "Velotric is a credible brand in a category with a lot of lesser-known options",
        ],
        cons: [
          "$100 off a $2,499 bike is a 4% discount, so it's more symbolic than substantial",
          "Niche product that only makes sense for a specific type of buyer",
        ],
        reviewLink: "/deals/velotric-triker-review",
      },
    ],

    // --- Footer internal links ---
    internalLinksTitle: "More Deals and Guides Worth Checking Out",
    internalLinks: [
      {
        text: "Best folding electric bikes we've tested",
        url: "/deals/best-folding-electric-bike",
        description:
          "A full breakdown of the top folding e-bikes, ranked by portability, range, and value.",
      },
      {
        text: "Best electric bike deals running this week",
        url: "/deals/electric-bike-deals",
        description:
          "Updated weekly with the best e-bike discounts and limited-time offers from top brands.",
      },
      {
        text: "Best fat tire electric bikes for off-road riding",
        url: "/deals/best-fat-tire-electric-bike",
        description:
          "Our picks for the best fat tire e-bikes, from casual trail riders to serious off-road use.",
      },
      {
        text: "Best commuter e-bikes under $2,000",
        url: "/deals/best-commuter-ebike",
        description:
          "The commuter e-bikes that balance range, comfort, and price for daily riding.",
      },
      {
        text: "How much does an electric bike actually cost?",
        url: "/deals/electric-bike-cost",
        description:
          "A straightforward breakdown of e-bike pricing across categories and what you're really paying for.",
      },
    ],
  },
];
