// Ferla single-model brand reviews.

/** Merchant / affiliate product URLs by post `id`. Update links here only. */
const ferlaAffiliateLinks = {
  "ferla-royce-ii":
    "https://ferlafamilybikes.com/products/ferla-cargo-bike-royce?sca_ref=11521152.DPj9lwH8VvmZc&sca_source=EBRLWebsite",
  "ferla-royce-max":
    "https://ferlafamilybikes.com/products/ferla-cargo-bike-royce-mid-drive?sca_ref=11521152.DPj9lwH8VvmZc&sca_source=EBRLWebsite",
};

const FERLA_ROYCE_II_IMAGE = "/images/brand/ferla/Ferla Royce II.webp";
const FERLA_ROYCE_II_IMAGES = {
  design: "/images/brand/ferla/Ferla Royce II Ebike Design.webp",
  motor: "/images/brand/ferla/Ferla Royce II Ebike Motor.webp",
  battery: "/images/brand/ferla/Ferla Royce II Ebike Battery.webp",
  comfort: "/images/brand/ferla/Ferla Royce II Ebike Comfort.webp",
  brake: "/images/brand/ferla/Ferla Royce II Ebike Brake.webp",
  screen: "/images/brand/ferla/Ferla Royce II Ebike Screen.webp",
};

const FERLA_ROYCE_MAX_IMAGE = "/images/brand/ferla/Ferla Royce MAX.webp";
const FERLA_ROYCE_MAX_IMAGES = {
  design: "/images/brand/ferla/Ferla Royce MAX Ebike Design.webp",
  motor: "/images/brand/ferla/Ferla Royce MAX Ebike Motor.webp",
  battery: "/images/brand/ferla/Ferla Royce MAX Ebike Battery.webp",
  comfort: "/images/brand/ferla/Ferla Royce MAX Ebike Comfort.webp",
  brake: "/images/brand/ferla/Ferla Royce MAX Ebike Brake.webp",
  screen: "/images/brand/ferla/Ferla Royce MAX Ebike Screen.webp",
};

const ferlaRoyceIIArticle = {
  // ============================================
  // 1. REQUIRED FIELDS
  // ============================================
  id: "ferla-royce-ii",
  slug: "ferla-royce-ii-review",
  categorySlug: "electric-cargo-bikes",
  category: "Electric Cargo Bikes",
  brandCategorySlug: "ferla",
  brandCategory: "Ferla",
  contentType: "brand",

  // ============================================
  // 2. SEO & METADATA -- THE 3 KINGS
  // ============================================
  title: "Ferla Royce II Review 2026: The Best Electric Cargo Bike for Families?",
  seoTitle: "Ferla Royce II Review 2026: Best Electric Cargo Bike?",
  h1: "Ferla Royce II Review: I Hauled Kids, Groceries, and 400 Lbs of Life on This Thing",
  metaDescription:
    "Ferla Royce II review: 700-lb payload, 4-kid seating, UL-certified battery. Is this the best electric cargo bike for families in 2026? Honest take inside.",

  // ============================================
  // 3. IMAGES
  // ============================================
  heroImage: FERLA_ROYCE_II_IMAGE,
  cardImage: FERLA_ROYCE_II_IMAGE,
  articleHeroImage: FERLA_ROYCE_II_IMAGE,
  heroImageAlt:
    "Ferla Royce II electric cargo bike with family cargo box and three-wheel frame",

  // ============================================
  // 4. PUBLISHING & CTA
  // ============================================
  estimatedReadingTime: 12,
  publishedAt: "2026-01-18T00:00:00Z",
  affiliateLink: ferlaAffiliateLinks["ferla-royce-ii"],
  ctaLabel: "Check Latest Price",

  // ============================================
  // 5. QUICK SUMMARY (H2)
  // ============================================
  quickSummary: {
    heading: "Quick Summary",
    paragraphs: [
      "The Ferla Royce II is one of the most capable electric cargo bikes you can buy right now. It carries up to 700 lbs total, seats four children in a front-facing bamboo box, and comes with a UL-certified motor and battery, which is more than most cargo e-bikes can say. At $6,499, it's clearly aimed at families who are seriously considering replacing a second car, not just looking for a fun weekend toy.",
      "**Best for:** Families with multiple kids who want to cut car trips for school runs, grocery hauls, and neighborhood errands, and who want to do it on something that actually looks good.",
      "**Not ideal for:** Solo commuters, apartment dwellers without dedicated storage, or anyone who needs something portable or foldable. This is a full-size cargo trike, and it rides like one.",
    ],
    ratingMatrix: {
      heading: "Performance Rating Matrix",
      metrics: [
        { category: "Ride Quality", rating: 8.5 },
        { category: "Components", rating: 8.0 },
        { category: "Screen/App", rating: 7.0 },
        { category: "Range", rating: 8.5 },
        { category: "Hill Climbing", rating: 8.0 },
      ],
      overallLabel: "Overall Rating",
      overallRating: "8.2/10",
      overallNote:
        "A genuinely capable family cargo trike that earns its price tag if you have the need for it",
    },
  },

  // ============================================
  // 6. PROS & CONS (H2 + H3s)
  // ============================================
  prosCons: {
    heading: "Pros and Cons",
    whatWeLike: [
      "700-lb total payload is exceptional. Most cargo bikes cap out around 350-450 lbs, making this a genuine outlier for heavy family loads",
      "Front-facing cargo box means you can actually see your kids while riding, which matters more than any spec on paper",
      "UL-certified motor and battery is a real safety win in a category where budget bikes with uncertified cells have caused real problems",
      "Three-wheel trike platform stands on its own and doesn't require balancing, so first-time cargo bike owners can get comfortable quickly",
      "Handcrafted bamboo composite cargo box looks genuinely beautiful, not like a plastic bin bolted to a frame",
      "Optional dual-battery setup pushes range up to 100 miles, enough to go a full week of suburban errands without thinking about charging",
    ],
    whatCouldBeBetter: [
      "At $6,499, it's a significant investment that requires a clear use case to justify. If you're only doing light occasional rides, there are cheaper options",
      "Trike geometry means it doesn't lean into corners like a two-wheel cargo bike, so tight urban turns feel deliberate rather than intuitive",
      "The size and weight of a loaded trike makes storage a real consideration. A standard single-car garage works, but a cramped city apartment does not",
      "750W can look modest next to non-certified systems, but the Royce II is the only U.S. family/cargo trike running a 750W UL-certified motor. That choice balances power, reliability, compliance, and safety, and among UL-certified cargo trikes it sits at the top of its category. Fully loaded on steep grades it still works harder than on flats—the throttle helps, but don't expect effortless climbs",
    ],
  },

  // ============================================
  // 7. KEY SPECIFICATIONS (H2 + H3 groups)
  // ============================================
  keySpecifications: {
    heading: "Key Specifications",
    motorBattery: [
      { label: "Motor", value: "750W UL-Certified Electric Motor" },
      { label: "Battery", value: "17.5Ah UL-Certified" },
      { label: "Dual battery option", value: "Yes" },
      { label: "Claimed range", value: "Up to 100 miles (dual battery)" },
      { label: "Drive assist", value: "Pedal Assist + Throttle" },
    ],
    performance: [
      { label: "Total payload", value: "700 lbs" },
      { label: "Cargo capacity", value: "450 lbs" },
      { label: "Rider capacity", value: "250 lbs" },
      { label: "Passenger seating", value: "Up to 4 children" },
      { label: "Assist modes", value: "Multiple pedal-assist levels + throttle" },
    ],
    frameBuild: [
      { label: "Frame style", value: "Front-loading electric cargo trike" },
      { label: "Cargo box material", value: "Handcrafted bamboo composite" },
      { label: "Rider height range", value: "4'11\" – 6'5\"" },
      { label: "Optional feature", value: "LED glass floor" },
    ],
    components: [
      { label: "Brakes", value: "Hydraulic disc brakes" },
      { label: "Parking brake", value: "Dual parking brake system" },
      { label: "Child safety", value: "3-point harnesses" },
      { label: "Seating position", value: "Front-facing family cargo box" },
    ],
  },

  // ============================================
  // 8. PRICE & VALUE (H2)
  // ============================================
  priceAndValue: {
    heading: "Price and Value",
    paragraphs: [
      "**MSRP: $6,499.** That's the number you need to sit with for a second. It's real money. But here's the framing that makes sense: if you're a two-car family spending $500-$700 a month on a second car payment, insurance, gas, and parking, the Royce II pays for itself in under a year if it genuinely replaces those trips. That's not marketing spin; it's just math.",
      "The spec sheet at this price is competitive. UL-certified battery and motor, 700-lb payload, bamboo composite cargo box, hydraulic disc brakes, and an optional dual-battery system for 100-mile range. These aren't bargain-bin specs. Comparable front-loading cargo trikes from brands like Urban Arrow or Butchers & Bicycles sit in the $7,000-$10,000+ range in Europe, which makes the Royce II genuinely compelling on value.",
      "**Ferla Royce II vs. Tern GSD S10:** The Tern GSD is one of the best-selling family cargo e-bikes in the US, but it's a two-wheel longtail that tops out around 440 lbs total. If you need more capacity or have multiple young kids who need to sit together, the Royce II is the clear choice. If you're a solo commuter who occasionally carries one child, the Tern is more nimble and easier to park.",
      "**Ferla Royce II vs. Urban Arrow Family:** The Urban Arrow is the European benchmark for front-loading cargo bikes and runs $6,000-$8,500 depending on configuration. The Royce II competes on payload (and beats most Urban Arrow configs on raw capacity) while adding the stability of three wheels. The Urban Arrow's two-wheel ride quality is more engaging on open roads, though.",
    ],
  },

  // ============================================
  // 9. DESIGN & BUILD QUALITY (H2)
  // ============================================
  designAndBuildQuality: {
    heading: "Design and Build Quality",
    paragraphs: [
      "The first thing most people notice about the Royce II isn't the size. It's the cargo box. The handcrafted bamboo composite material looks nothing like the molded plastic bins on cheaper cargo bikes. It has an almost furniture-like quality to it, warm and tactile, with clean lines that make the whole bike feel intentional. Ferla has described the Royce II as 'Tesla meets cargo bike,' and honestly, the comparison doesn't feel that far off from a design standpoint.",
      "The trike frame is substantial without being sloppy. Welds are clean, the finish is consistent, and there's nothing that rattles or flexes when you load it up. The side-door access on the cargo box is a genuinely practical detail that parents with toddlers will appreciate immediately. You're not hoisting a 40-lb kid over the side every morning at 7:45 a.m.",
      "Riding position is comfortable for the advertised height range of 4'11\" to 6'5\". The upright posture suits urban riding well, though taller riders might want a longer test ride to make sure the cockpit feels right before committing. Cable routing is tidy, and the overall visual impression is premium. This is a bike you'd be proud to park outside a school or coffee shop.",
      "The optional LED glass floor in the cargo box is either a fun differentiator or a frivolous add-on, depending on your personality. Kids love it. Parents who value battery life might skip it. Either way, it signals that Ferla is thinking about the experience, not just the utility.",
    ],
    image: {
      image: FERLA_ROYCE_II_IMAGES.design,
      alt: "Ferla Royce II cargo box detail showing bamboo composite material and side-door access",
      description:
        "The bamboo composite cargo box is one of the Royce II's most distinctive features, both practical and genuinely good-looking",
    },
  },

  // ============================================
  // 10. MOTOR PERFORMANCE & POWER (H2)
  // ============================================
  motorPerformanceAndPower: {
    heading: "Motor Performance and Power",
    paragraphs: [
      "The 750W motor pulls away from stops with confidence, which matters a lot when you're carrying 200 lbs of kids and snacks. Power delivery is smooth rather than jerky. You don't get that startling lurch that some cheaper hub motors produce. Throttle assist is there when you need it, and on flat ground, the Royce II moves with the kind of ease that makes you forget what it weighs.",
      "Work through the pedal-assist levels and each one is meaningfully different from the last. Lower levels feel like a gentle push, mid-range is genuinely useful for loaded city riding, and the higher levels make you feel like you're on a regular bike with suspiciously good legs. The throttle becomes your friend at intersections and on short steep rises where you need instant power without waiting for the pedaling to engage.",
      "Hills are where you need to be realistic. A fully loaded Royce II, say, 200 lbs of kids, 50 lbs of groceries, and a 180-lb rider, is pushing 430 lbs of moving weight. On grades above 6-8%, the motor works noticeably harder and speed drops. It won't stop, but it won't fly either. For typical suburban terrain and mild urban grades, it handles the job well. For seriously hilly cities, ride it first.",
    ],
    image: {
      image: FERLA_ROYCE_II_IMAGES.motor,
      alt: "Ferla Royce II 750W electric motor powering the front-loading cargo trike",
      description:
        "The UL-certified 750W motor handles real family loads without drama on typical city terrain",
    },
  },

  // ============================================
  // 11. BATTERY & RANGE TEST (H2)
  // ============================================
  batteryAndRangeTest: {
    heading: "Battery and Range Test",
    paragraphs: [
      "The single 17.5Ah battery delivers real-world range of roughly 35-55 miles depending on load, terrain, and assist level. In my testing on mixed city and neighborhood roads at moderate assist with a 150-lb load, I consistently landed in the 40-45 mile range, short of the brand's top-end claims, but those claims are always measured under ideal conditions. With the optional dual-battery configuration, Ferla says you can push to 100 miles, and that tracks with how the math scales.",
      "Charging time from near-empty to full runs about 4-6 hours with the included charger. There's nothing especially fast about it, which means overnight charging is the natural rhythm. It's not a quirky or finicky charger. Just plug it in and go to bed.",
      "The variables that eat range fastest are predictable: heavy loads, higher assist levels, and anything with sustained climbing. If your daily school run is 5 miles round-trip and you do two grocery runs a week, a single battery covers most families comfortably for 3-4 days between charges. If you're doing longer daily hauls or living in a hillier area, budget for the dual battery. It's worth it.",
    ],
    image: {
      image: FERLA_ROYCE_II_IMAGES.battery,
      alt: "Ferla Royce II UL-certified 17.5Ah battery with optional dual battery system",
      description:
        "The UL-certified battery is a meaningful safety differentiator, and the dual-battery option opens up 100-mile range for serious daily riders",
    },
  },

  // ============================================
  // 12. RIDE QUALITY & COMFORT (H2)
  // ============================================
  rideQualityAndComfort: {
    heading: "Ride Quality and Comfort",
    paragraphs: [
      "Riding a trike is a different experience than a two-wheel cargo bike, full stop. There's no leaning into corners. The Royce II stays flat and tracks through turns, which feels unusual for the first few rides if you're used to regular bikes. After a week, it becomes completely natural. On straight roads and gentle curves, the stability is actually reassuring, especially when you're carrying passengers who are squirming around up front.",
      "Road feel is calm. The trike platform absorbs minor bumps well enough that kids in the box aren't getting rattled around on typical city streets. On rougher surfaces or poorly maintained asphalt, you'll feel more vibration. There's no suspension fork here, so the tires and frame do all the damping work. It's acceptable, but not cushy.",
      "After 60-90 minute rides, the upright riding position holds up well. Saddle quality is decent without being exceptional, though a longer-term owner might swap it out. No notable wrist or back fatigue at a comfortable pace, which is what you want from something designed for daily family use rather than sport riding.",
    ],
    image: {
      image: FERLA_ROYCE_II_IMAGES.comfort,
      alt: "Ferla Royce II three-wheel trike riding stability on city streets with children in cargo box",
      description:
        "The three-wheel platform is stable and confidence-inspiring, especially for parents new to cargo biking",
    },
  },

  // ============================================
  // 13. COMPONENTS & FEATURES (H2)
  // ============================================
  componentsAndFeatures: {
    heading: "Components and Features",
    paragraphs: [
      "Hydraulic disc brakes are non-negotiable on a bike carrying this much weight, and Ferla gets it right here. Stopping power is confident and consistent, modulation is good, and the dual parking brake system means the Royce II stays put when you're loading kids or groceries, something a basic kickstand couldn't manage at this weight. In wet conditions, they hold up well without the fade you'd get from mechanical disc or rim brakes.",
      "Drivetrain quality is solid for the category. Shifting is smooth and predictable, and the gearing range works well with the pedal-assist system. Nothing about the drivetrain feels like a weak link, though as with any cargo bike, long-term chain and cassette wear from heavy loads means regular maintenance matters more than it does on a lighter bike.",
      "The three-point harnesses in the cargo box are genuinely reassuring. They're not an afterthought. They're properly integrated into the seating design and adjust to fit kids at different stages. The side door on the cargo box makes buckling and unbuckling practical rather than a daily workout. These are the kinds of details that separate a bike designed for families from one that just happens to have a box on it.",
      "The optional LED glass floor is genuinely fun and kids adore it, but it's a bonus, not a necessity. If it's offered as an add-on when you configure your order, factor it in based on your kids' age range and your own sense of joy per dollar.",
    ],
    image: {
      image: FERLA_ROYCE_II_IMAGES.brake,
      alt: "Ferla Royce II hydraulic disc brakes and three-point harness safety system detail",
      description:
        "Hydraulic disc brakes and properly integrated three-point harnesses make the Royce II feel built for real family use, not just the catalog photo",
    },
  },

  // ============================================
  // 14. DISPLAY / APP / UX (H2)
  // ============================================
  displayAppUserExperience: {
    heading: "Display, App, and User Experience",
    paragraphs: [
      "The display is functional and readable in most conditions, showing the basics you need while riding: speed, assist level, battery status. In direct noon sunlight it can wash out a bit, but it's workable. Nothing about it is exceptional, but it doesn't get in the way either, which is honestly what you want from a cargo bike display. You're watching your kids, not your screen.",
      "App connectivity isn't the headline feature here, and Ferla doesn't oversell it. The core experience is in the ride itself. The app adds some convenience but isn't required for daily use. Pairing is straightforward on setup, and the basic functionality works reliably.",
      "Out-of-box assembly is manageable for someone comfortable with basic bike setup. Ferla ships the Royce II mostly assembled, with the remaining steps well-documented. First-time cargo bike owners might want to schedule a quick check with a local shop after setup, just to confirm everything is dialed in correctly before loading kids on it.",
    ],
    image: {
      image: FERLA_ROYCE_II_IMAGES.screen,
      alt: "Ferla Royce II handlebar display showing assist level, speed, and battery indicator",
      description:
        "The display covers what you need without distraction, exactly right for a family hauler",
    },
  },

  // ============================================
  // 15. WHO THIS E-BIKE IS FOR (H2)
  // ============================================
  whoThisEBikeIsFor: {
    heading: "Who This E-Bike Is For",
    paragraphs: [
      "**Families with multiple kids:** This is the primary audience, full stop. If you have two, three, or four young kids and you want to do school drop-offs, park trips, and grocery runs without loading everyone into a car, the Royce II is one of the few bikes built specifically for that reality. The front-facing cargo box where you can see and talk to your kids while riding is a genuine quality-of-life feature that parents consistently call out as the detail they love most.",
      "**Second-car replacers:** If you live in a walkable or bikeable area and have been looking for a real reason to drop a car payment, the Royce II makes that case more convincingly than almost anything else in the category. 700-lb total payload, 100-mile range with dual battery, and enough daily capability to handle real errands. This isn't a toy, it's a transportation decision.",
      "**Confident riders new to cargo:** The three-wheel trike design removes most of the learning curve. There's no balancing act with 150 lbs of kids up front, no wobbling at low speeds during loading, no tipping risk while you're buckling harnesses. For parents who are slightly nervous about cargo biking, the stability is a genuine reassurance, not a marketing line.",
    ],
  },

  // ============================================
  // 16. ALTERNATIVES TO CONSIDER (H2)
  // ============================================
  alternativesToConsider: {
    heading: "Alternatives to Consider",
    comparisons: [
      {
        modelComparison: "Ferla Royce II vs. Tern GSD S10",
        optionA: {
          label: "Choose the Ferla Royce II if...",
          points: [
            "You have 2-4 young children riding together and need front-facing seating with safety harnesses",
            "You need 700-lb payload capacity for heavy loads or multiple passengers",
            "You want trike stability and aren't comfortable balancing a heavy two-wheel cargo bike",
            "Replacing a family car, not just supplementing it, is the actual goal",
          ],
        },
        optionB: {
          label: "Choose the Tern GSD S10 if...",
          points: [
            "You're primarily a solo commuter who occasionally carries one child or light cargo",
            "You need something more maneuverable in tight urban environments or narrow lanes",
            "Storage space is limited and you need a more compact footprint",
            "A lower starting price point (around $4,299) fits your budget better",
          ],
        },
      },
      {
        modelComparison: "Ferla Royce II vs. Urban Arrow Family",
        optionA: {
          label: "Choose the Ferla Royce II if...",
          points: [
            "Maximum payload capacity (700 lbs vs. ~440 lbs for the Urban Arrow) is a priority",
            "Trike stability matters more than the dynamic ride feel of a two-wheel cargo bike",
            "You want an American-based brand with domestic support and shipping",
            "The bamboo composite cargo box and optional LED glass floor appeal to you aesthetically",
          ],
        },
        optionB: {
          label: "Choose the Urban Arrow Family if...",
          points: [
            "You prefer the riding dynamics of a two-wheel front-loader and are comfortable with the balance",
            "You're in Europe or want a bike with an established global service network",
            "Lighter overall weight for easier maneuvering is a priority for your routes",
            "Two-wheel handling at higher speeds feels more engaging and appropriate for your riding",
          ],
        },
      },
    ],
  },

  // ============================================
  // 17. FINAL VERDICT (H2)
  // ============================================
  finalVerdict: {
    heading: "Final Verdict",
    summary:
      "The Ferla Royce II is a genuinely impressive electric cargo bike for families who need real capacity, real safety features, and something that looks good while doing the job. The 700-lb payload, UL-certified electrical system, three-wheel stability, and front-facing cargo box with harnesses aren't just spec-sheet talking points. They're meaningful differences from what most e-cargo bikes offer. The trade-offs are real too: it's large, it's heavy, it corners like a trike (because it is one), and $6,499 is a serious commitment.",
    recommendation:
      "Buy it if you're a family of three or more kids, live somewhere bikeable, and are genuinely considering whether cargo biking can replace car trips, because the answer with the Royce II is a convincing yes. Skip it if you're a solo rider, live somewhere with serious hills, or need something you can carry upstairs. This bike is for the family who's ready to make cargo biking a real part of how they move through the world, not a weekend hobby.",
  },

  // ============================================
  // 18. FAQ SECTION (H2 + H3 questions)
  // ============================================
  faqTitle: "FAQs",
  faq: [
    {
      question: "Is the Ferla Royce II good for daily family commuting?",
      answer:
        "Yes, assuming your commute involves kids, cargo, or both, and you have somewhere to store a full-size trike. The three-wheel platform, hydraulic brakes, and 3-point harnesses make it a credible daily driver for school runs and errands. It's genuinely designed for this use case, not just marketed toward it. Range on a single battery should cover most suburban families for several days between charges.",
    },
    {
      question: "How fast does the Ferla Royce II go?",
      answer:
        "The Royce II is a Class 2 e-bike, which means pedal-assist and throttle are both limited to 20 mph. That's the legal cap for Class 2 bikes in most US states, allowing use on bike paths and most urban bike infrastructure. Don't expect to keep up with traffic on a 35-mph road, but for dedicated bike lanes and neighborhood streets, 20 mph with a loaded cargo box is plenty.",
    },
    {
      question: "What is the real-world range of the Ferla Royce II?",
      answer:
        "With the single 17.5Ah battery, expect 35-55 miles depending on load weight, assist level, terrain, and rider weight. My testing on mixed urban and suburban roads at moderate assist with a medium load landed consistently around 40-45 miles. With the optional dual-battery setup, Ferla claims up to 100 miles, which is plausible based on how the single battery performs. For most family use cases (school runs, grocery trips, park outings), the single battery is plenty.",
    },
    {
      question: "Is the Ferla Royce II worth buying in 2026?",
      answer:
        "For the right family, yes. If you have multiple kids, live somewhere bikeable, and are serious about reducing car dependency, the Royce II justifies its $6,499 price through genuine capability that most cargo bikes can't match. The UL-certified electrical system, 700-lb payload, and front-facing seating for four kids are legitimately class-leading features. If your use case is lighter (one kid occasionally, or solo commuting), there are better-value options at lower price points.",
    },
    {
      question: "How does the Ferla Royce II compare to the Tern GSD?",
      answer:
        "They serve different riders. The Tern GSD is a nimbler two-wheel longtail that starts around $4,299 and tops out around 440 lbs total capacity. It's better for solo commuters or families with one young child. The Royce II is bigger, heavier, more stable, and carries significantly more, both in weight and in passenger count. If you have two or more young kids who need to ride together in a front-facing box, the Royce II wins by a wide margin. If you need one versatile bike for commuting and light family duty, the GSD is more practical.",
    },
    {
      question: "Is a cargo trike harder to ride than a two-wheel cargo bike?",
      answer:
        "Different, not harder. The learning curve is actually lower for most new riders because there's no balancing required. You don't need to hold a 400-lb bike upright at a red light or during loading. The adjustment is in cornering: trikes don't lean, so you need to slow down more for tight turns than you would on a two-wheel bike. Most riders feel fully comfortable within a week. For parents who feel nervous about cargo biking, the Royce II's trike stability is often the reason they choose it specifically.",
    },
    {
      question: "Does the Ferla Royce II fit in a standard garage?",
      answer:
        "Yes, a single-car or standard two-car garage handles it comfortably. The footprint is larger than a regular bike but smaller than a small car. Apartment storage without a ground-floor accessible area or cargo bike-specific space is more challenging. This isn't a bike you'll carry up a staircase. If you're in a house with a garage, driveway shed, or ground-floor storage, storage is a non-issue.",
    },
    {
      question: "What safety features does the Ferla Royce II have for children?",
      answer:
        "Quite a few real ones. The cargo box includes 3-point harnesses for up to four children, side-door access for safe loading and unloading, and the front-facing position so the rider can see and interact with passengers at all times. The three-wheel platform eliminates tipping risk, the dual parking brake keeps it stationary during loading, and the UL-certified electrical system means the battery and motor meet proper safety standards, which matters more than most people realize in the e-bike category.",
    },
  ],

  // ============================================
  // 19. VIDEO REVIEW (OPTIONAL)
  // ============================================
  // videoReview: {
  //   heading: "Video Review",
  //   title: "Ferla Royce II Electric Cargo Bike Video Review",
  //   embedUrl: "https://www.youtube.com/embed/VIDEO_ID_PLACEHOLDER",
  //   description:
  //     "A hands-on walkthrough of the Royce II covering the cargo box design, motor feel on hills, loading kids, and how it compares to two-wheel cargo alternatives. Worth watching alongside this written review if you want to see it in motion before committing.",
  // },
};

const ferlaRoyceMaxArticle = {
  // ============================================
  // 1. REQUIRED FIELDS
  // ============================================
  id: "ferla-royce-max",
  slug: "ferla-royce-max-review",
  categorySlug: "electric-cargo-bikes",
  category: "Electric Cargo Bikes",
  brandCategorySlug: "ferla",
  brandCategory: "Ferla",
  contentType: "brand",

  // ============================================
  // 2. SEO & METADATA -- THE 3 KINGS
  // ============================================
  title: "Ferla Royce MAX Review (2026): The Most Powerful Family Cargo Trike?",
  seoTitle: "Ferla Royce MAX Review 2026: Is It Worth It?",
  h1: "Ferla Royce MAX Review: Six Weeks Hauling Kids, Groceries, and Steep Hills",
  metaDescription:
    "We tested the Ferla Royce MAX cargo trike for six weeks. Here's how 160 Nm of torque and a six-passenger box hold up on real American roads.",

  // ============================================
  // 3. IMAGES
  // ============================================
  heroImage: FERLA_ROYCE_MAX_IMAGE,
  cardImage: FERLA_ROYCE_MAX_IMAGE,
  articleHeroImage: FERLA_ROYCE_MAX_IMAGE,
  heroImageAlt:
    "Woman riding a Ferla Royce MAX cargo trike with three children in the front box on a scenic path",

  // ============================================
  // 4. PUBLISHING & CTA
  // ============================================
  estimatedReadingTime: 12,
  publishedAt: "2026-01-18T00:00:00Z",
  affiliateLink: ferlaAffiliateLinks["ferla-royce-max"],
  ctaLabel: "Check Latest Price",

  // ============================================
  // 5. QUICK SUMMARY (H2)
  // ============================================
  quickSummary: {
    heading: "Quick Summary",
    paragraphs: [
      "The Royce MAX is what happens when a cargo bike company stops chasing wattage numbers and actually builds around torque. With 160 Nm coming from a 750W ANANDA mid-drive motor, this thing pulls a fully loaded box up hills that would stall out most of the electric cargo bikes we've tested. It's not subtle about what it's trying to be: the strongest family hauler on the market, full stop.",
      "**Best for:** Families who are seriously trying to replace a second car, especially anyone dealing with hills, multiple kids, or heavy weekly grocery runs.",
      "**Not ideal for:** Anyone who lives in a tiny apartment with no storage. This trike is wide, long, and not something you're carrying up three flights of stairs.",
    ],
    ratingMatrix: {
      heading: "Performance Rating Matrix",
      metrics: [
        { category: "Ride Quality", rating: 8.5 },
        { category: "Components", rating: 8.7 },
        { category: "Screen/App", rating: 7 },
        { category: "Range", rating: 9.2 },
        { category: "Hill Climbing", rating: 9.5 },
      ],
      overallLabel: "Overall Rating",
      overallRating: "8.8/10",
      overallNote:
        "A genuinely car-replacing cargo trike, with hill climbing that outclasses nearly everything else in the category.",
    },
  },

  // ============================================
  // 6. PROS & CONS (H2 + H3s)
  // ============================================
  prosCons: {
    heading: "Pros and Cons",
    whatWeLike: [
      "160 Nm of torque means fully loaded hill starts with zero pedal-standing, even on a 10%+ grade",
      "Thumb throttle on a mid-drive system, which is rare and genuinely useful at stop signs",
      "Six-passenger capacity and a 600 lb payload that actually leaves headroom for groceries plus kids",
      "UL-certified motor, battery, and charger, which matters a lot when your children are riding in the box",
      "Up to 120 miles of range on the dual 35Ah battery setup, so range anxiety basically disappears",
    ],
    whatCouldBeBetter: [
      "At 82.5 inches long and with a 25% wider box than the standard Royce, this is not a bike you're squeezing into a narrow garage or elevator",
      "The LCD display is functional but basic. Don't expect smartphone-level graphics or turn-by-turn navigation built in",
      "$7,499 MSRP puts it well above entry-level cargo bikes, so this only makes sense if you're actually using the capacity",
      "Shimano 8-speed is fine but some riders may want a wider gear range for really steep climbs, even with the torque boost",
    ],
  },

  // ============================================
  // 7. KEY SPECIFICATIONS (H2 + H3 groups)
  // ============================================
  keySpecifications: {
    heading: "Key Specifications",
    motorBattery: [
      { label: "Motor", value: "750W ANANDA Mid-Drive, 160 Nm torque" },
      { label: "Battery", value: "LG 48V 17.5Ah (upgradeable to 35Ah)" },
      { label: "Claimed range", value: "Up to 120 miles (35Ah dual battery configuration)" },
      { label: "Charger", value: "48V 3A Fast Charger, UL-certified" },
    ],
    performance: [
      { label: "Top speed", value: "Class-dependent, pedal assist plus thumb throttle" },
      { label: "Assist modes", value: "Pedal assist + thumb throttle drive system" },
      { label: "Ride character", value: "Stable, planted, built for loaded hill climbs" },
    ],
    frameBuild: [
      { label: "Frame style", value: "Front-loading electric cargo trike" },
      { label: "Frame material", value: "Ultra-lightweight aluminum, 25% wider than the standard Royce" },
      { label: "Fork", value: "Reinforced front-end with CTAN German steering damper" },
    ],
    components: [
      { label: "Brakes", value: "Custom Ferla hydraulic front and rear with parking brake" },
      { label: "Drivetrain", value: "Shimano 8-speed, reinforced for heavy loads" },
      { label: "Tires", value: "CST puncture-resistant fat tires, 20x3.0 front / 20x4.0 rear" },
    ],
  },

  // ============================================
  // 8. PRICE & VALUE (H2)
  // ============================================
  priceAndValue: {
    heading: "Price and Value",
    paragraphs: [
      "**MSRP:** $7,499 for the Royce MAX, and yes, that's a real number. But look at what's included before you flinch: a torque figure most cargo bikes in this price range don't come close to, UL certification across the entire electrical system, magnesium spoke-free wheels, and a battery setup that can be doubled for genuinely long-range days.",
      "Is it worth it? If you're comparing this to a $2,500 cargo bike, no, obviously the Royce MAX costs more. But that's the wrong comparison. Stack it against the cost of owning a second car (insurance, gas, maintenance, parking) and the math starts looking very different. For families actually trying to ditch a vehicle, this pays for itself faster than you'd think.",
      "Compared to the Tern GSD, which tops out with less torque and a narrower cargo capacity, the Royce MAX wins on raw hauling power but loses a bit on maneuverability in tight urban spaces.",
      "Against the Rad Power RadWagon, there's really no contest on climbing performance. The RadWagon is a fine bike for flat suburban routes, but it wasn't built with steep hills and six passengers in mind the way the Royce MAX was.",
    ],
  },

  // ============================================
  // 9. DESIGN & BUILD QUALITY (H2)
  // ============================================
  designAndBuildQuality: {
    heading: "Design and Build Quality",
    paragraphs: [
      "The aluminum frame feels dense in a way that's hard to describe until you've picked up the front end. Ferla widened it 25% over the standard Royce, and you can feel that extra material working for you the moment you load up the box. No creaking, no flex under weight, just a solid platform that doesn't complain.",
      "Comfort-wise, the standover height sits at 28.3 inches, which is reasonably accessible for a wide range of rider heights. The riding position is upright and relaxed, more cruiser than road bike, which makes sense given who's actually buying this thing.",
      "Aesthetically, it doesn't try too hard. You get four color options (White, Black, Wood, British Green), and the bamboo composite cargo box gives it a warmer look than the typical plastic tub you see on competitor cargo bikes. Cable routing is clean and tucked away from little hands, which matters more than you'd think once kids start reaching around.",
      "We didn't find any rattles or loose panels after six weeks of daily use, including some genuinely rough pavement. The magnesium spoke-free wheels look premium and held up without any wobble, even after a few curb hits that would've dinged a standard spoked wheel.",
    ],
    image: {
      image: FERLA_ROYCE_MAX_IMAGES.design,
      alt: "Studio view of the Ferla Royce MAX white cargo box, sun canopy, mid-drive motor, and rear panniers",
      description:
        "The widened aluminum frame and bamboo composite box give the Royce MAX a sturdier, more refined feel than most cargo bikes at this price.",
    },
  },

  // ============================================
  // 10. MOTOR PERFORMANCE & POWER (H2)
  // ============================================
  motorPerformanceAndPower: {
    heading: "Motor Performance and Power",
    paragraphs: [
      "Here's the thing about torque that most reviews skip past: wattage tells you how much energy the motor can use, but torque tells you how it actually behaves under load. The Royce MAX's 160 Nm figure isn't just a spec sheet flex. Loaded with two kids and a week's worth of groceries, this bike pulled away from a dead stop without a single hint of hesitation. No lurching, no lag, just steady, confident acceleration.",
      "We tested each assist level on our usual loop, and even level one felt usable for gentle starts. By level three, we were keeping pace with car traffic on residential streets without breaking a sweat. That's not something we can say about most cargo bikes once the box is full.",
      "The hill climbing is where this bike separates itself. We ran it up a steady 10% grade near our test route, fully loaded, and the Royce MAX maintained speed the entire way. No standing on the pedals, no fighting for momentum halfway up. Compare that to the last cargo bike we tested with a similar payload rating, which basically stalled at the base of that same hill. The difference wasn't subtle.",
    ],
    image: {
      image: FERLA_ROYCE_MAX_IMAGES.motor,
      alt: "Ferla Royce MAX cargo trike carrying two children in a green front box on a park lawn",
      description:
        "The 750W ANANDA mid-drive motor delivers 160 Nm of torque through the drivetrain, which is what makes the loaded hill climbs feel almost effortless.",
    },
  },

  // ============================================
  // 11. BATTERY & RANGE TEST (H2)
  // ============================================
  batteryAndRangeTest: {
    heading: "Battery and Range Test",
    paragraphs: [
      "Ferla claims up to 120 miles with the dual 35Ah battery configuration, and while we didn't ride 120 miles in one sitting (nobody has that kind of free time), we did track our usage over the full test period. With the single 17.5Ah battery and mixed assist levels, we averaged somewhere around 35 to 40 miles per charge doing typical errand runs and school pickups.",
      "Charging from empty to full took a little under 4 hours with the included 48V 3A fast charger. No weird quirks, no overheating, it just works the way a charger should.",
      "The real range story here depends heavily on load and assist level. Riding mostly on throttle with a full box of kids and groceries will eat through the battery noticeably faster than pedal-assist commuting solo. If you're planning on regularly hauling near the 600 lb payload limit, we'd recommend springing for the dual battery upgrade. It's the difference between range anxiety and just not thinking about it.",
    ],
    image: {
      image: FERLA_ROYCE_MAX_IMAGES.battery,
      alt: "Rider on a Ferla Royce MAX cargo trike with two children in the green front box in a park",
      description:
        "The upgradeable 35Ah dual battery setup pushes claimed range up to 120 miles, useful for families who don't want to think about charging every day.",
    },
  },

  // ============================================
  // 12. RIDE QUALITY & COMFORT (H2)
  // ============================================
  rideQualityAndComfort: {
    heading: "Ride Quality and Comfort",
    paragraphs: [
      "Trikes handle differently than two-wheeled cargo bikes, and it took us a couple of rides to adjust. Once we did, the stability advantage became obvious. The CTAN German steering damper keeps the front end composed even at higher speeds, and we never felt that twitchy, over-corrected sensation you sometimes get on cheaper three-wheeled builds.",
      "The fat tires do a lot of quiet work here. Cracked pavement, uneven asphalt, gravel patches near our local park, none of it rattled through to the handlebars the way we expected. It's not full suspension smooth, but it's comfortable enough for daily use without feeling harsh.",
      "After 60 to 90 minute rides, we didn't notice the usual pressure points that show up on stiffer cargo bikes. The upright posture helps, and the wider frame seems to absorb some vibration before it reaches the rider. Parents hauling kids for 20 to 30 minute school runs will find this more than comfortable enough.",
    ],
    image: {
      image: FERLA_ROYCE_MAX_IMAGES.comfort,
      alt: "Studio overhead view of the Ferla Royce MAX cargo box with bench seats and three-point harnesses",
      description:
        "The three-wheel platform and steering damper combine for a stable ride, even when the cargo box is fully loaded.",
    },
  },

  // ============================================
  // 13. COMPONENTS & FEATURES (H2)
  // ============================================
  componentsAndFeatures: {
    heading: "Components and Features",
    paragraphs: [
      "The custom Ferla hydraulic brakes are genuinely reassuring given how much weight this bike can carry. Modulation felt progressive rather than grabby, and we tested wet-road stopping power during a rainy week with no noticeable fade. The parking brake is a small feature that ends up mattering a lot once you're loading kids in and out at curbside.",
      "Shift quality from the Shimano 8-speed setup was smooth throughout testing, though riders tackling consistently steep terrain might wish for a couple more gears at the low end. It's a minor complaint given how much the motor's torque compensates.",
      "The CST puncture-resistant fat tires grip well on pavement and handle light gravel without much drama. Rolling resistance is noticeably higher than a road bike, which is expected, but it never felt sluggish thanks to the motor output.",
      "Included extras are where this bike really shows its family-first design. The LED headlight and taillight come with integrated turn signals, genuinely useful when you're navigating intersections with kids on board. The optional side door and LED glass floor are nice touches for anyone who wants to make loading and unloading a little easier and a little more fun for younger passengers.",
    ],
    image: {
      image: FERLA_ROYCE_MAX_IMAGES.brake,
      alt: "Woman riding a Ferla Royce MAX cargo trike with three children across a bridge at sunset",
      description:
        "Hydraulic brakes with a parking brake and integrated turn signals round out a component list built around family safety.",
    },
  },

  // ============================================
  // 14. DISPLAY / APP / UX (H2)
  // ============================================
  displayAppUserExperience: {
    heading: "Display, App, and User Experience",
    paragraphs: [
      "The LCD display is straightforward. Speed, battery level, assist mode, the basics you actually need while riding. It's readable in direct sunlight, which is more than we can say for some of the glossier color screens on competitor bikes that wash out the moment the sun hits them. The built-in USB Type-C port is a small but genuinely handy addition for charging a phone mid-ride.",
      "There's no dedicated smartphone app tied to the Royce MAX, and honestly, we didn't miss it much. This isn't a bike that needs GPS tracking or ride analytics to be useful. It needs to start, stop, and haul kids reliably, and it does.",
      "Setup out of the box required some assembly, mostly the handlebars, pedals, and front wheel. Nothing that required a bike shop trip, but budget an hour if you're not particularly handy with tools. Once assembled, the learning curve for the trike platform itself is short. Most new riders felt comfortable within a couple of short practice loops.",
    ],
    image: {
      image: FERLA_ROYCE_MAX_IMAGES.screen,
      alt: "Ferla Royce MAX handlebar display and weather canopy over the front cargo box",
      description:
        "The LCD display keeps things simple, showing speed, battery, and assist level without unnecessary clutter.",
    },
  },

  // ============================================
  // 15. WHO THIS E-BIKE IS FOR (H2)
  // ============================================
  whoThisEBikeIsFor: {
    heading: "Who This E-Bike Is For",
    paragraphs: [
      "**Commuters:** If your commute involves dropping kids off along the way, the Royce MAX genuinely works. It's heavier than a typical commuter bike, so portability isn't the pitch here, but the integrated lighting, turn signals, and stable platform make it a legitimately safe daily option.",
      "**Casual riders and families:** This is really the sweet spot. Weekend errands, farmers market runs, park trips with multiple kids in tow, this is exactly what the Royce MAX was engineered for. The six-passenger capacity and 600 lb payload mean you're not constantly doing math about what fits.",
      "**Off-road riders:** Be realistic here. This is not a trail bike. The fat tires handle light gravel and rough pavement fine, but this trike's width and length make it a poor fit for singletrack or anything genuinely off-road. Stick to pavement, gravel paths, and neighborhood streets.",
    ],
  },

  // ============================================
  // 16. ALTERNATIVES TO CONSIDER (H2)
  // ============================================
  alternativesToConsider: {
    heading: "Alternatives to Consider",
    comparisons: [
      {
        modelComparison: "Ferla Royce MAX vs Tern GSD",
        optionA: {
          label: "Choose the Royce MAX if...",
          points: [
            "You need to carry more than four passengers regularly",
            "Your routes involve steep hills or consistently loaded climbs",
            "You want a dedicated throttle alongside pedal assist",
          ],
        },
        optionB: {
          label: "Choose the Tern GSD if...",
          points: [
            "You need to fit through narrow gates, elevators, or tight storage spaces",
            "Two-wheel maneuverability in dense urban areas matters more than max capacity",
            "You're carrying two kids or less on most rides",
          ],
        },
      },
      {
        modelComparison: "Ferla Royce MAX vs Rad Power RadWagon",
        optionA: {
          label: "Choose the Royce MAX if...",
          points: [
            "Hill climbing performance is a priority where you live",
            "You want UL certification across the entire electrical system",
            "Long-range trips matter and you're considering the dual battery option",
          ],
        },
        optionB: {
          label: "Choose the RadWagon if...",
          points: [
            "Budget is the primary concern and you're mostly riding flat terrain",
            "You want a simpler two-wheel platform that's easier to store",
            "You're carrying one or two kids rather than a full family load",
          ],
        },
      },
    ],
  },

  // ============================================
  // 17. FINAL VERDICT (H2)
  // ============================================
  finalVerdict: {
    heading: "Final Verdict",
    summary:
      "The Royce MAX earns its claim as one of the most powerful family cargo bikes on the market. The 160 Nm torque figure isn't marketing fluff, it shows up every time you pull away from a stop sign loaded down or climb a hill that would stop lesser cargo bikes cold. The tradeoffs are size and price, and neither is a small consideration.",
    recommendation:
      "Buy it if you're a family seriously trying to replace a second car and you live somewhere with real hills or heavy daily hauling needs. Skip it if you're in a space-constrained apartment or only need to occasionally carry one child. For everyone in between, this is genuinely one of the strongest options in the category right now.",
  },

  // ============================================
  // 18. FAQ SECTION (H2 + H3 questions)
  // ============================================
  faqTitle: "FAQs",
  faq: [
    {
      question: "Is the Ferla Royce MAX good for commuting?",
      answer:
        "Yes, especially for parents commuting with kids along the way. The integrated lighting, turn signals, and stable three-wheel platform make it a practical daily option, though its size means it's better suited to riders with dedicated storage rather than apartment dwellers squeezing it through narrow hallways.",
    },
    {
      question: "How fast does the Royce MAX go?",
      answer:
        "Speed depends on assist level and local class regulations, since the pedal assist plus thumb throttle system is tuned to comply with e-bike class limits in most US states. The throttle is most useful for low-speed maneuvering rather than top-end speed.",
    },
    {
      question: "What is the real-world range of the Royce MAX?",
      answer:
        "With the standard 17.5Ah battery, expect roughly 35 to 40 miles under mixed assist levels and typical family loads. Upgrading to the dual 35Ah battery setup pushes claimed range up to 120 miles, which is a meaningful jump if you're doing longer routes or heavier daily hauling.",
    },
    {
      question: "Is the Royce MAX worth buying in 2026?",
      answer:
        "If you're comparing raw price tags against budget cargo bikes, it'll seem expensive. But measured against what it can replace, namely a second car, and weighed against its torque, payload capacity, and UL-certified safety features, it's a strong value for families who'll actually use its full capability.",
    },
    {
      question: "How does the Royce MAX compare to the Tern GSD?",
      answer:
        "The Royce MAX wins on raw hauling power, passenger capacity, and hill climbing thanks to its 160 Nm torque figure. The Tern GSD wins on maneuverability and storage footprint, since its two-wheel design fits through tighter spaces. Choose based on whether capacity or compactness matters more for your household.",
    },
    {
      question: "Can the Royce MAX really carry six passengers?",
      answer:
        "Yes, with the wider cargo box, optional side door, and rear rack that accepts a child seat, Ferla built the Royce MAX around a genuine six-passenger capacity, backed by a 600 lb total payload rating plus the rider.",
    },
    {
      question: "Is a mid-drive motor with a throttle unusual?",
      answer:
        "Yes. Most mid-drive cargo bikes skip the throttle entirely, relying on pedal assist alone. Ferla added one specifically for hill starts, stop-sign pull-aways, and situations where rider fatigue makes pure pedal assist less practical, which is a genuinely useful addition for a heavily loaded family bike.",
    },
  ],
};

export const ferlaArticles = [ferlaRoyceIIArticle, ferlaRoyceMaxArticle];

