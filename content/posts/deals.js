/**
 * Deal Articles
 *
 * Lightweight deal roundups — intro, deal cards (H2 + pros/cons), internal links.
 * Rendered by DealArticle.js (contentType: "deal").
 *
 * Post-level fields:
 * - dealEndsAt: ISO 8601 end datetime (shows page countdown when set)
 * - countdownHeadline, countdownSubline: optional countdown copy overrides
 * - bannerImages: optional array of { src, alt } for top deal bar carousel
 * - sidebarImages: optional array of { src, alt } for sidebar deal card carousel
 *
 * Deal object fields:
 * - id, name, badge, dealPrice, originalPrice, description, imageUrl, affiliateLink, pros, cons
 * - offer, totalSavings, limitedStock, dealType ("price-cut" | "bonus-only")
 * - reviewLink: optional path to full product review (auto-resolved from id when omitted)
 * - keyDetails: optional array of { value, label } headline specs (weight, speed, motor, range, battery)
 */

/** Velotric affiliate product URLs for deal article. Update links here only. */
const velotricDealAffiliateLinks = {
  "velotric-fold-1":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-fold-1%3F_pos%3D2%26_sid%3Da3957cbbb%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_fold_1_ebike&ctc=EBRL%20Website",
  "velotric-t1-st-plus":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-t1st-ebike%3F_pos%3D1%26_sid%3D860f21be0%26_ss%3Dr&ctc=EBRL%20Website",
  "velotric-discover-2":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-discover-2%3F_pos%3D1%26_sid%3D91a96370a%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_discover_2_ebike&ctc=EBRL%20Website",
  "velotric-summit-1":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-summit-1%3F_pos%3D1%26_sid%3Dca79de9a0%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_summit_1_ebike&ctc=EBRL%20Website",
  "velotric-nomad-2":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-nomad-2%3F_pos%3D1%26_sid%3D0ee371709%26_ss%3Dr&ctc=EBRL%20Website",
  "velotric-nomad-2x":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-nomad-2x%3F_pos%3D1%26_sid%3D6de00d525%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_nomad_2x_full_suspension_fat_tire_ebike&ctc=EBRL%20Website",
  "velotric-breeze-1":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-breeze-1%3F_pos%3D1%26_sid%3Dd09bf21bc%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_breeze_1_cruiser_ebike&ctc=EBRL%20Website",
  "velotric-fold-1-plus":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-fold-1-plus%3F_pos%3D1%26_sid%3Ddcb05a98c%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_fold_1_plus_ebike&ctc=EBRL%20Website",
  "velotric-discover-3":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-discover-3-commuter-ebike%3F_pos%3D1%26_sid%3D097301faa%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_discover_3_ebike&ctc=EBRL%20Website",
  "velotric-discover-max":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-discover-m-mid-drive-ebike%3F_pos%3D4%26_sid%3D87f286046%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_discover_m_ebike&ctc=EBRL%20Website",
  "velotric-summit-2":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-summit-2-hybrid-ebike%3F_pos%3D1%26_sid%3Dab004f11e%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_summit_2_ebike&ctc=EBRL%20Website",
  "velotric-tempo":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-tempo-city-ebike%3F_pos%3D1%26_sid%3De51bf1bbf%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_tempo_ebike&ctc=EBRL%20Website",
  "velotric-gomad":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-gomad-utility-ebike%3F_pos%3D1%26_sid%3D05252b656%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_gomad_ebike&ctc=EBRL%20Website",
  "velotric-triker":
    "https://www.avantlink.com/click.php?tool_type=cl&merchant_id=357cd2d0-110e-47d6-a7fb-9292be27d1ed&website_id=87d746cd-978c-4397-9493-b0a997177a2f&url=https%3A%2F%2Fwww.velotricbike.com%2Fproducts%2Fvelotric-triker%3F_pos%3D1%26_sid%3D546b10807%26_ss%3Dr%26page_source%3Dproduct_selection_ShopProductsGrid%257Cvelotric_triker_electric_tricycle&ctc=EBRL%20Website",
};

export const dealArticles = [
  {
    // --- Post metadata ---
    categorySlug: "deals",
    category: "Deals",
    contentType: "deal",
    slug: "electric-bike-deals",

    // --- SEO & headings ---
    title: "Velotric 4th of July Sale: Best Electric Bike Deals This Week",
    seoTitle: "Electric Bike Deals: Save Up to $812 This 4th of July",
    h1: "The Best Electric Bike Deals from Velotric's 4th of July Sale",
    metaDescription:
      "Velotric's 4th of July sale runs June 29–July 5. Save up to $812 on e-bikes including the Fold 1 ($500 off) and T1 ST Plus bundle deal.",

    // --- Images ---
    heroImage: "/images/deal/Velotric Prime Day Deal.webp",
    cardImage: "/images/deal/Velotric Prime Day Deal.webp",
    articleHeroImage: "/images/deal/Velotric Prime Day Deal.webp",
    heroImageAlt:
      "Velotric electric bikes on sale for 4th of July with savings up to $812",
    bannerImages: [
      {
        src: "/images/deal/392x72.webp",
        alt: "Velotric 4th of July — Discover 2 save up to $300 off",
      },
      {
        src: "/images/deal/392x72-1.webp",
        alt: "Velotric 4th of July — $200 off e-bike plus free accessory bundle",
      },
      {
        src: "/images/deal/392x72-2.webp",
        alt: "Velotric 4th of July — $100 off e-bike plus free bag worth $74.99",
      },
    ],

    sidebarImages: [
      {
        src: "/images/deal/250x250.webp",
        alt: "Velotric 4th of July — Discover 2 save up to $300 off",
      },
      {
        src: "/images/deal/250x250-1.webp",
        alt: "Velotric 4th of July — $200 off e-bike plus free accessory bundle",
      },
      {
        src: "/images/deal/250x250-2.webp",
        alt: "Velotric 4th of July — $100 off e-bike plus free bag worth $74.99",
      },
    ],

    // --- Intro ---
    introductionParagraphs: [
      "Velotric is running a proper 4th of July sale this year — not just slapping a flag graphic on the homepage and calling it a day. The deals run from June 29 through July 5, 2026, and a few of them are genuinely worth paying attention to. I've been watching e-bike prices for a while, and a $500 price cut on the Fold 1 and a stacked bundle deal on the T1 ST Plus are both well above average for what this brand typically offers.",
      "I pulled together the full lineup below, ranked by actual value rather than just the biggest headline discount. Some of these deals are strong. A couple are more modest. I'll be straight with you about which is which so you can figure out whether to hit buy before July 5 or keep your money in your pocket a little longer.",
    ],

    // --- Post settings ---
    estimatedReadingTime: 6,
    publishedAt: "2026-06-15T00:00:00Z",
    updatedAt: "2026-06-29T00:00:00Z",
    dealEndsAt: "2026-07-05T23:59:59-04:00",
    countdownHeadline: "4th of July Sale Ends July 5",
    countdownSubline: "Prices revert at midnight on July 5 — some models have limited stock",
    productCtaLabel: "Check Deal",
    dealsTableTitle: "All Velotric Electric Bike Deals at a Glance",

    // --- Deal cards ---
    deals: [
      {
        id: "velotric-t1-st-plus",
        name: "Velotric T1 ST Plus",
        imageUrl: "/images/deal/Velotric T1 ST Plus.webp",
        badge: "Best Bundle Value",
        description:
          "This is the standout deal of the sale if you're looking for a lightweight city e-bike. You're getting $250 off the label price, but the real kicker is the bundle: a Modular Rear Rack, Fender Pack, and Range Extender Battery thrown in on top. That range extender alone retails for a few hundred dollars, which is why the total savings figure lands at $812. Worth mentioning that the MSRP is $1,399 — so you're paying $1,149 at checkout for what amounts to a fully kitted-out commuter setup.",
        affiliateLink: velotricDealAffiliateLinks["velotric-t1-st-plus"],
        dealPrice: "$1,149",
        originalPrice: "$1,649",
        offer: "$250 Off + Free Rear Rack, Fender Pack & Range Extender Battery",
        totalSavings: "$812",
        dealType: "price-cut",
        limitedStock: true,
        pros: [
          "Range Extender Battery included — that's a substantial accessory that most brands charge separately for",
          "T1 ST Plus is Velotric's ultralight city e-bike, which means it's easy to carry up stairs or throw in a car",
          "Getting the rack and fenders bundled in makes this a complete commuter setup right out of the box",
        ],
        cons: [
          "The label price of $1,649 appears to be inflated above MSRP ($1,399), so the raw $250 cash discount is more modest than the $812 headline suggests — the bundle value is real, but it's worth knowing the distinction",
          "Limited stock flagged, which is fair given how good this bundle is",
        ],
        keyDetails: [
          { value: "39 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "350W/40Nm", label: "Motor" },
          { value: "70 Miles", label: "Range" },
          { value: "352.8 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-fold-1",
        name: "Velotric Fold 1",
        imageUrl: "/images/deal/Velotric Fold 1.webp",
        badge: "Save $500",
        description:
          "A flat $500 off the Fold 1 brings it from $1,499 down to $999. For a folding e-bike from a brand with solid build quality, $999 is a genuinely competitive price. If you've been on the fence about going folding — for apartment storage, transit commutes, or tossing it in the trunk — this is a reasonable moment to pull the trigger. No accessories bundled here, just a clean price cut.",
        affiliateLink: velotricDealAffiliateLinks["velotric-fold-1"],
        dealPrice: "$999",
        originalPrice: "$1,499",
        offer: "$500 Off Ebike",
        totalSavings: "$500",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Sub-$1,000 price on a Velotric folding bike is the lowest I've seen this model go",
          "Folds down for easy storage — ideal if you're in an apartment or doing multi-modal commutes",
          "Clean, no-fuss discount — $500 off is the actual savings, no bundle math required",
        ],
        cons: [
          "No accessories included, unlike some of the other sale bikes — you'd need to budget separately for a rack or bag if you want those",
          "The Fold 1 is an older model in the lineup; the Fold 1 Plus is the current version, though it's priced higher even on sale",
        ],
        keyDetails: [
          { value: "63 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/70Nm", label: "Motor" },
          { value: "55 Miles", label: "Range" },
          { value: "608 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-discover-2",
        name: "Velotric Discover 2",
        imageUrl: "/images/deal/Velotric Discover 2.webp",
        badge: "Save $300",
        description:
          "$300 off the Discover 2 brings it to $1,699. This is Velotric's comfort commuter line, and the Discover series is probably their most popular category. If you want something you can ride every day without overthinking it, the Discover 2 is a solid middle-ground option — not as budget-focused as the Fold 1 deal above, but a meaningful discount on a bike a lot of people would actually want.",
        affiliateLink: velotricDealAffiliateLinks["velotric-discover-2"],
        dealPrice: "$1,699",
        originalPrice: "$1,999",
        offer: "$300 Off Ebike",
        totalSavings: "$300",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Discover series is Velotric's bread and butter — proven design with a lot of real-world riders behind it",
          "$300 cash discount is straightforward, no bundle complexity",
          "Good fit for everyday commuting or leisure riding if you want comfort over speed",
        ],
        cons: [
          "No accessories included at this price point — comparable to what a few other deals in this sale offer with add-ons",
          "The Discover 3 (current model) actually comes with free accessories in this sale, which might make more sense if budget allows",
        ],
        keyDetails: [
          { value: "61 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/75Nm", label: "Motor" },
          { value: "75 Miles", label: "Range" },
          { value: "705.6 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-nomad-2",
        name: "Velotric Nomad 2",
        imageUrl: "/images/deal/Velotric Nomad 2.webp",
        badge: "Save $275 with Bag",
        description:
          "The Nomad 2 drops $200 to $1,799, and you get a Rear Rack Pannier Bag thrown in. The Nomad is Velotric's fat tire series — built for rougher terrain, all-weather riding, and riders who want something more rugged than a commuter bike. The pannier bag is a practical bonus if you're using this for longer rides or errands, not just a decorative freebie.",
        affiliateLink: velotricDealAffiliateLinks["velotric-nomad-2"],
        dealPrice: "$1,799",
        originalPrice: "$1,999",
        offer: "$200 Off + Free Rear Rack Pannier Bag",
        totalSavings: "$275",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Fat tire design handles gravel, light trails, and wet roads better than a standard commuter",
          "Pannier bag is genuinely useful for grocery runs or commuting with gear",
          "Solid deal if you want a more capable bike than the basic Discover lineup",
        ],
        cons: [
          "At $1,799, it's still a significant buy — the $200 price cut is real but not dramatic at this price level",
          "Fat tire bikes are heavier, so carrying it up stairs or lifting it onto transit is more of a workout",
        ],
        keyDetails: [
          { value: "75 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/90Nm", label: "Motor" },
          { value: "65 Miles", label: "Range" },
          { value: "705.6 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-nomad-2x",
        name: "Velotric Nomad 2X",
        imageUrl: "/images/deal/Velotric Nomad 2X.webp",
        badge: "Save $275 — Top Spec Fat Tire",
        description:
          "Same deal structure as the Nomad 2 — $200 off plus a free pannier bag — but the Nomad 2X is the upgraded version with full air suspension. MTC pricing starts at $2,299, non-MTC at $2,199. If you're serious about off-road riding or want the most capable fat tire option in this sale, this is it. The suspension upgrade over the standard Nomad 2 is the main reason to go here.",
        affiliateLink: velotricDealAffiliateLinks["velotric-nomad-2x"],
        dealPrice: "From $2,199",
        originalPrice: "From $2,399",
        offer: "$200 Off + Free Rear Rack Pannier Bag",
        totalSavings: "$275",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Full air suspension makes a real difference on rougher terrain compared to the standard Nomad 2",
          "Same pannier bag bonus as the Nomad 2, but on a higher-spec platform",
          "If you're going to spend this kind of money on a fat tire bike, the X is the version worth having",
        ],
        cons: [
          "The MTC vs non-MTC pricing adds a layer of complexity — confirm which version you're looking at before checkout",
          "At $2,200+, this is a serious investment — make sure fat tire and suspension are features you'll actually use",
        ],
        keyDetails: [
          { value: "80 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/105Nm", label: "Motor" },
          { value: "75 Miles", label: "Range" },
          { value: "801.6 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-summit-1",
        name: "Velotric Summit 1",
        imageUrl: "/images/deal/Velotric Summit 1.webp",
        badge: "Save $200",
        description:
          "$200 off the Summit 1 puts it at $1,799. This is Velotric's hybrid e-bike for mixed terrain — somewhere between a road commuter and a light trail bike. No accessories included, just the price cut. Decent deal if the Summit 1 is the bike you wanted anyway.",
        affiliateLink: velotricDealAffiliateLinks["velotric-summit-1"],
        dealPrice: "$1,799",
        originalPrice: "$1,999",
        offer: "$200 Off Ebike",
        totalSavings: "$200",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Hybrid geometry works for both commuting and light trail riding, more versatile than a pure commuter",
          "Straightforward $200 discount, no fine print",
        ],
        cons: [
          "$200 off a $2,000 bike is on the smaller side — 10% isn't the most dramatic sale in this lineup",
          "No accessories bundled, while several other models in this sale include practical add-ons at similar price points",
        ],
        keyDetails: [
          { value: "62 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/90Nm", label: "Motor" },
          { value: "70 Miles", label: "Range" },
          { value: "705.6 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-breeze-1",
        name: "Velotric Breeze 1",
        imageUrl: "/images/deal/Velotric Breeze 1.webp",
        badge: "Save $250 with Rack & Fender",
        description:
          "$100 off plus a free Rear Rack and Fender set brings the Breeze 1 to $1,699. The Breeze 1 is Velotric's lightweight option in the cruiser category — if you're looking for something easy to handle and comfortable for around-town riding, this is a reasonable pick. The rack and fender bundle is actually pretty useful rather than just decorative.",
        affiliateLink: velotricDealAffiliateLinks["velotric-breeze-1"],
        dealPrice: "$1,699",
        originalPrice: "$1,799",
        offer: "$100 Off + Free Rear Rack & Fender",
        totalSavings: "$250",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Rack and fender included — practical accessories you'd likely want to add anyway",
          "Lightweight build makes it more approachable for new riders or anyone who doesn't want to wrestle with a heavy bike",
        ],
        cons: [
          "Only $100 off the list price — the $250 total savings figure includes the accessory value, so the cash discount is modest",
          "At $1,699, it's competing with some better deals in this same sale like the Discover 2 and Fold 1",
        ],
        keyDetails: [
          { value: "48 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/65Nm", label: "Motor" },
          { value: "70 Miles", label: "Range" },
          { value: "627 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-discover-3",
        name: "Velotric Discover 3",
        imageUrl: "/images/deal/Velotric Discover 3.webp",
        badge: "Free Rack Top Bag & Phone Mount",
        description:
          "The Discover 3 is Velotric's current flagship commuter and it's not getting a price cut in this sale — but you do get a free Rack Top Bag and Phone Mount (worth $140). If the Discover 3 is the bike you want, this is as good as it typically gets outside of a major sale event. No price reduction to talk about, so it comes down to whether those accessories seal the deal for you.",
        affiliateLink: velotricDealAffiliateLinks["velotric-discover-3"],
        dealPrice: "$1,999",
        originalPrice: "$1,999",
        offer: "Free Rack Top Bag & Phone Mount",
        totalSavings: "$140",
        dealType: "bonus-only",
        limitedStock: false,
        pros: [
          "Discover 3 is the current top commuter in Velotric's lineup — 80-mile range, 750W motor, 28 mph",
          "Phone mount is a practical add-on that most riders end up buying anyway",
        ],
        cons: [
          "No actual price cut — $1,999 is still full retail. The savings are accessory value only",
          "If you can wait, it's worth watching whether a bigger discount appears during Black Friday or a future sale",
        ],
        keyDetails: [
          { value: "61 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/75Nm", label: "Motor" },
          { value: "80 Miles", label: "Range" },
          { value: "730 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-fold-1-plus",
        name: "Velotric Fold 1 Plus",
        imageUrl: "/images/deal/Velotric Fold 1 Plus.webp",
        badge: "Save $100",
        description:
          "$100 off brings the Fold 1 Plus to $1,399. This is the updated version of the Fold 1 with improvements to the folding mechanism and overall build. If you want the current generation folding bike rather than the older Fold 1, this is the way to go — though the Fold 1's $500 discount makes it hard to ignore if budget is the priority.",
        affiliateLink: velotricDealAffiliateLinks["velotric-fold-1-plus"],
        dealPrice: "$1,399",
        originalPrice: "$1,499",
        offer: "$100 Off Ebike",
        totalSavings: "$100",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Newer, improved version of the folding platform compared to the Fold 1",
          "Still under $1,500 with the discount",
        ],
        cons: [
          "Only $100 off — the Fold 1 at $999 is a much bigger deal if you don't specifically need the Plus version",
          "No accessories included at this price",
        ],
        keyDetails: [
          { value: "63 Lbs", label: "Bike Weight" },
          { value: "28 MPH", label: "Top Speed" },
          { value: "750W/75Nm", label: "Motor" },
          { value: "68 Miles", label: "Range" },
          { value: "608 Wh", label: "Battery" },
        ],
      },
      {
        id: "velotric-triker",
        name: "Velotric Triker",
        imageUrl: "/images/deal/Velotric Triker.webp",
        badge: "Save $239 with Gift Box",
        description:
          "$100 off plus a free Velotric Gift Box brings the Triker to $2,399 with $239 in total savings. The Triker is Velotric's electric tricycle — three wheels, step-through frame, built for stability. It's designed for riders who want the confidence of a trike rather than a two-wheeler, whether that's due to balance concerns, a disability, or just preference. The gift box is a nice touch but secondary to what this bike actually is.",
        affiliateLink: velotricDealAffiliateLinks["velotric-triker"],
        dealPrice: "$2,399",
        originalPrice: "$2,499",
        offer: "$100 Off + Free Velotric Gift Box",
        totalSavings: "$239",
        dealType: "price-cut",
        limitedStock: false,
        pros: [
          "Three-wheel stability is a genuine differentiator — no balancing needed, great for seniors or riders with mobility concerns",
          "Step-through frame makes getting on and off easy",
        ],
        cons: [
          "Only $100 off a $2,499 bike — a 4% discount isn't much to get excited about on its own",
          "Trikes are significantly wider and heavier than two-wheelers, which matters for storage and transport",
        ],
        keyDetails: [
          { value: "85.8 Lbs", label: "Bike Weight" },
          { value: "20 MPH", label: "Top Speed" },
          { value: "750W/90Nm", label: "Motor" },
          { value: "60 Miles", label: "Range" },
          { value: "804 Wh", label: "Battery" },
        ],
      },
    ],

    // --- Footer internal links ---
    internalLinksTitle: "More Deals and Guides Worth Checking Out",
    internalLinks: [
      {
        text: "Best folding electric bikes right now",
        url: "/electric-bikes/best-electric-folding-bikes",
        description:
          "A full breakdown of the top folding e-bikes across brands and budgets",
      },
      {
        text: "Best electric bike deals this month",
        url: "/deals/electric-bike-deals",
        description:
          "Updated weekly — the e-bike deals actually worth your time",
      },
      {
        text: "Best fat tire electric bikes",
        url: "/electric-bikes/best-electric-fat-bikes",
        description:
          "If the Nomad 2 or 2X caught your eye, here's how it compares to the competition",
      },
      {
        text: "Best commuter e-bikes for 2026",
        url: "/electric-bikes/best-electric-commuter-bikes",
        description:
          "A practical guide to picking an e-bike for daily rides and transit commutes",
      },
    ],
  },
];
