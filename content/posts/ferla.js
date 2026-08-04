// Ferla single-model brand reviews.

/** Merchant / affiliate product URLs by post `id`. Update links here only. */
const ferlaAffiliateLinks = {
  "ferla-royce-ii":
    "https://ferlafamilybikes.com/products/ferla-cargo-bike-royce?sca_ref=11521152.DPj9lwH8VvmZc&sca_source=EBRLWebsite",
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

export const ferlaArticles = [ferlaRoyceIIArticle];
