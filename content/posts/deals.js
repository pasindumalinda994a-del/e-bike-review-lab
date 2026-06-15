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

const AVANTLINK_BASE =
  "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f";

function velotricDealLink(productPath) {
  const url = encodeURIComponent(`https://www.velotricbike.com/products/${productPath}`);
  return `${AVANTLINK_BASE}&url=${url}&ctc=EBRLWebsite`;
}

const velotricDealLinks = {
  "velotric-t1-st-plus": velotricDealLink("velotric-t1-st-plus"),
  "velotric-fold-1": velotricDealLink("velotric-fold-1"),
  "velotric-discover-2": velotricDealLink("velotric-discover-2"),
  "velotric-summit-1": velotricDealLink("velotric-summit-1"),
  "velotric-nomad-2": velotricDealLink("velotric-nomad-2"),
  "velotric-fold-1-plus": velotricDealLink("velotric-fold-1-plus"),
  "velotric-breeze-1": velotricDealLink("velotric-breeze-1"),
  "velotric-discover-3": velotricDealLink("velotric-discover-3-commuter-ebike"),
};

export const dealArticles = [
  {
    categorySlug: "deals",
    category: "Deals",
    contentType: "deal",
    slug: "electric-bike-deals",

    title: "Velotric Prime Day 2026: Best Electric Bike Deals Worth Grabbing",
    seoTitle: "Electric Bike Deals 2026: Save Up to $862 on Velotric",
    h1: "The Best Electric Bike Deals from Velotric's Prime Day Sale",
    metaDescription:
      "Velotric's Prime Day 2026 sale runs June 17-28. Save up to $862 on e-bikes with free accessories bundled in. Here are the deals worth your attention.",

    heroImage: "/images/deals/velotric-prime-day-hero.webp",
    cardImage: "/images/deals/velotric-prime-day-card.webp",
    articleHeroImage: "/images/deals/velotric-prime-day-article-hero.webp",
    heroImageAlt: "Velotric electric bikes on Prime Day 2026 sale with savings up to $862",

    introductionParagraphs: [
      "Velotric doesn't run sales constantly, which is part of why their Prime Day event is worth paying attention to. From June 17th through June 28th, they're cutting prices on most of their lineup and throwing in free accessories on top. Some of these bundles are legitimately good. Others are more modest. I went through every deal to sort out which ones make sense and which you can probably wait on.",
      "I've been tracking Velotric's pricing for a while, and a few of these discounts are the steepest I've seen on these models. The T1 ST Plus bundle in particular stands out. That said, not every deal here is a slam dunk, so I'll be straight with you about the ones that are less exciting. The sale runs through June 28th, so you've got a little over a week.",
    ],

    estimatedReadingTime: 5,
    publishedAt: "2026-06-15T00:00:00Z",
    dealEndsAt: "2026-06-28T23:59:59-04:00",
    countdownHeadline: "Prime Day Sale Ends June 28",
    countdownSubline: "Prices and stock may change before the end date",
    productCtaLabel: "Check Deal",
    dealsTableTitle: "All Velotric Electric Bike Deals at a Glance",

    deals: [
      {
        id: "velotric-t1-st-plus",
        name: "Velotric T1 ST Plus",
        imageUrl: "/images/deals/velotric-t1-st-plus.webp",
        badge: "Best Overall Deal",
        description:
          "This is the standout deal of the sale. You're getting $300 off the bike itself, plus a free modular rear rack, fender pack, and a range extender battery bundled in. The range extender alone typically runs well over $400. If you've been sitting on the fence about a commuter e-bike that can handle longer trips, this configuration makes a lot of sense at $1,349.",
        affiliateLink: velotricDealLinks["velotric-t1-st-plus"],
        dealPrice: "$1,349",
        originalPrice: "$1,649",
        offer: "$300 Off + Free Rear Rack, Fender Pack & Range Extender Battery",
        totalSavings: "$862",
        dealType: "price-cut",
        limitedStock: true,
        pros: [
          "Range extender battery is a significant free add-on, not a cheap accessory",
          "Step-through frame makes it genuinely easier to mount, especially useful for shorter riders or those with mobility concerns",
          "Biggest total savings bundle in this sale by a wide margin",
        ],
        cons: [
          "At $1,349, it's still a real commitment. If you're new to e-bikes, you might want to try a cheaper model first",
          "Limited stock flagged, so this specific bundle could sell out before the June 28 end date",
        ],
        reviewLink: "/electric-bikes/velotric-t1-st-plus-review",
      },
      {
        id: "velotric-fold-1",
        name: "Velotric Fold 1",
        imageUrl: "/images/deals/velotric-fold-1.webp",
        badge: "Save $500",
        description:
          "The Fold 1 drops from $1,499 down to $999, which puts it under the $1,000 mark. That's a big deal for a folding e-bike from a brand with a solid reputation. You also get a free half twist throttle set thrown in. If you're looking for the best folding electric bike you can get under $1,000, this is probably it right now.",
        affiliateLink: velotricDealLinks["velotric-fold-1"],
        dealPrice: "$999",
        originalPrice: "$1,499",
        offer: "$500 Off + Free Half Twist Throttle Set",
        totalSavings: "$548",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Breaking the $1,000 barrier on a quality folding e-bike is genuinely rare",
          "Throttle set is a useful add-on for riders who want more control options",
          "Fold 1 is a well-reviewed commuter that packs down small for transit or apartment storage",
        ],
        cons: [
          "Folding bikes trade some ride comfort for portability. If you're not commuting on transit or storing it in a small space, a regular e-bike might suit you better",
          "$548 in total savings assumes the throttle set price is accurate, which I can't independently verify",
        ],
        reviewLink: "/electric-bikes/velotric-fold-1-review",
      },
      {
        id: "velotric-discover-2",
        name: "Velotric Discover 2",
        imageUrl: "/images/deals/velotric-discover-2.webp",
        badge: "Save $300",
        description:
          "The Discover 2 comes down $300 to $1,699, no accessories bundled here. It's a clean price cut on one of Velotric's more versatile city bikes. Worth noting: this is one of the few deals in this sale that's straightforward. No free extras to account for, just a lower price.",
        affiliateLink: velotricDealLinks["velotric-discover-2"],
        dealPrice: "$1,699",
        originalPrice: "$1,999",
        offer: "$300 Off",
        totalSavings: "$300",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Simple deal with no complicated bundle math to work through",
          "$300 off a $1,999 bike is a real discount, not a rounding error",
          "Discover series is popular for urban commuting and recreational riding",
        ],
        cons: [
          "No free accessories makes this less flashy than some other deals in the sale",
          "If you want a rack or fender, you'd be buying those separately",
        ],
        reviewLink: "/electric-bikes/velotric-discover-2-review",
      },
      {
        id: "velotric-summit-1",
        name: "Velotric Summit 1",
        imageUrl: "/images/deals/velotric-summit-1.webp",
        badge: "Save $360",
        description:
          "The Summit 1 is Velotric's trail-ready option. During this sale, it's $200 off at $1,799, plus a free rear rack and fender. If you've been thinking about an electric mountain bike without going full suspension, the Summit 1 is one of the more capable options in this price range.",
        affiliateLink: velotricDealLinks["velotric-summit-1"],
        dealPrice: "$1,799",
        originalPrice: "$1,999",
        offer: "$200 Off + Free Rear Rack & Fender",
        totalSavings: "$360",
        dealType: "price-cut",
        limitedStock: true,
        pros: [
          "Built for off-road, not just bikepath riding",
          "Rack and fender bundle adds practical utility if you're also using it for commuting",
          "Solid total savings once you count the accessories",
        ],
        cons: [
          "At $1,799, you're in range of some entry-level full suspension options from other brands",
          "Limited stock noted, so don't sit on this one if you're interested",
        ],
        reviewLink: "/electric-bikes/velotric-summit-1-review",
      },
      {
        id: "velotric-nomad-2",
        name: "Velotric Nomad 2",
        imageUrl: "/images/deals/velotric-nomad-2.webp",
        badge: "Save $275",
        description:
          "The Nomad 2 is Velotric's fat tire offering, built for riders who want something that handles loose terrain, sand, or snow. It's $200 off at $1,799, with a free rear rack pannier bag included. If fat tire e-bikes are your thing, this is a reasonable deal.",
        affiliateLink: velotricDealLinks["velotric-nomad-2"],
        dealPrice: "$1,799",
        originalPrice: "$1,999",
        offer: "$200 Off + Free Rear Rack Pannier Bag",
        totalSavings: "$275",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Fat tires genuinely open up terrain options that regular e-bikes can't handle",
          "Pannier bag is practical for grocery runs or commuting with gear",
          "Strong reputation in the fat tire ebike category",
        ],
        cons: [
          "Fat tire bikes are heavier and less efficient on pavement. If you're mostly riding roads, it's not the right tool",
          "$275 in savings is modest compared to some other deals in this sale",
        ],
        reviewLink: "/electric-bikes/velotric-nomad-2-review",
      },
      {
        id: "velotric-fold-1-plus",
        name: "Velotric Fold 1 Plus",
        imageUrl: "/images/deals/velotric-fold-1-plus.webp",
        badge: "Save $175",
        description:
          "The Fold 1 Plus is $100 off at $1,399, with a free rear rack pannier bag. Honestly, this one is the weakest deal in the folding category given that the base Fold 1 is dropping to $999. Unless you specifically need what the Plus adds over the standard model, the Fold 1 is the better buy this week.",
        affiliateLink: velotricDealLinks["velotric-fold-1-plus"],
        dealPrice: "$1,399",
        originalPrice: "$1,499",
        offer: "$100 Off + Free Rear Rack Pannier Bag",
        totalSavings: "$175",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Pannier bag is a useful everyday add-on for commuters",
          "If you need the specific upgrades the Plus version offers, you're still getting $175 back effectively",
        ],
        cons: [
          "Hard to justify at $1,399 when the standard Fold 1 is $999 this week",
          "Smallest percentage discount among the bikes in this sale",
        ],
      },
      {
        id: "velotric-breeze-1",
        name: "Velotric Breeze 1",
        imageUrl: "/images/deals/velotric-breeze-1.webp",
        badge: "Save $250",
        description:
          "The Breeze 1 is $100 off at $1,699, plus a free rear rack and fender. This is Velotric's step-through cruiser, good for riders who prioritize comfort over speed. The accessories are practical, but the cash discount is small. Still, if the Breeze 1 is specifically on your list, the free rack and fender is worth having.",
        affiliateLink: velotricDealLinks["velotric-breeze-1"],
        dealPrice: "$1,699",
        originalPrice: "$1,799",
        offer: "$100 Off + Free Rear Rack & Fender",
        totalSavings: "$250",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Step-through design is one of the most practical features for everyday riders",
          "Free rack and fender is immediately useful for most riders",
          "Comfortable cruiser geometry for casual or recreational riding",
        ],
        cons: [
          "$100 cash discount on a $1,799 bike is under 6%. The accessories carry most of the value here",
          "If you don't need the accessories, this deal is less compelling",
        ],
      },
      {
        id: "velotric-discover-3",
        name: "Velotric Discover 3",
        imageUrl: "/images/deals/velotric-discover-3.webp",
        badge: "Free Accessories Bundle",
        description:
          "No price cut on the Discover 3. It stays at $1,999 MSRP, but Velotric is bundling in a free rack top bag, phone mount, and a gift box. That's useful for commuters, but if you were hoping for a price drop on the Discover 3, this isn't it. The accessories are nice, not essential.",
        affiliateLink: velotricDealLinks["velotric-discover-3"],
        dealPrice: "$1,999",
        originalPrice: "$1,999",
        offer: "Free Rack Top Bag, Phone Mount & Gift Box",
        totalSavings: "$279",
        dealType: "bonus-only",
        limitedStock: false,
        pros: [
          "Phone mount is one of those things you'd buy anyway",
          "Rack top bag is a practical add-on for commuters",
          "Discover 3 is an upgrade over the Discover 2 if you want newer components",
        ],
        cons: [
          "No actual price discount. You're paying full MSRP",
          "If you can wait, there's a decent chance you'd see a real price cut on a future sale",
        ],
      },
    ],

    internalLinksTitle: "More Electric Bike Deals and Guides Worth Checking Out",
    internalLinks: [
      {
        text: "Best electric bikes under $1,000",
        url: "/deals/best-electric-bikes-under-1000",
        description:
          "A roundup of the best affordable e-bikes available right now, with honest takes on which ones are actually worth it",
      },
      {
        text: "Best folding electric bikes",
        url: "/deals/best-folding-electric-bike-deals",
        description: "If portability is the priority, here are the folding e-bikes that hold up in real use",
      },
      {
        text: "Best commuter e-bike deals",
        url: "/deals/best-commuter-ebike-deals",
        description: "Deals focused specifically on bikes built for the daily ride to work",
      },
      {
        text: "Best fat tire electric bike deals",
        url: "/deals/best-fat-tire-electric-bike-deals",
        description: "Fat tire options for riders who go off pavement regularly",
      },
    ],
  },
];
