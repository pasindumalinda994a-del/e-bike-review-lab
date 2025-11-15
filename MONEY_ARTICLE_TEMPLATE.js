// Template for creating new money articles
// Copy this structure and fill in the content for your new article

export const newMoneyArticle = {
  // ============================================
  // REQUIRED FIELDS
  // ============================================
  categorySlug: "your-category-slug",        // e.g., "electric-bikes"
  category: "Your Category Name",             // e.g., "Electric Bikes"
  contentType: "money",                       // Always "money"
  slug: "your-article-slug",                 // e.g., "best-electric-bikes-2025"
  
  // ============================================
  // SEO & METADATA
  // ============================================
  title: "Your SEO Title (55-60 chars)",     // Page title
  seoTitle: "Your SEO Title (55-60 chars)",  // Should differ from h1
  h1: "Your Main Headline (can be longer)",  // Main headline
  metaDescription: "Your meta description (~155 chars, question format improves CTR)",
  
  // ============================================
  // IMAGES
  // ============================================
  heroImage: "/images/products/hero1.jpg",
  cardImage: "/images/products/card1.jpg",
  articleHeroImage: "/images/products/article-hero.jpg",
  heroImageAlt: "Alt text for hero image",
  
  // ============================================
  // INTRODUCTION
  // ============================================
  introductionParagraphs: [
    "First paragraph: Set context, mention industry trends/data, explain why this matters.",
    "Second paragraph: Describe your research/testing methodology, establish credibility.",
    "Third paragraph: Set expectations about what readers will learn."
  ],
  
  // Optional secondary introduction
  secondaryIntroduction: [
    "Additional context paragraph if needed..."
  ],
  
  // ============================================
  // PUBLICATION INFO
  // ============================================
  estimatedReadingTime: 15,                  // Minutes
  publishedAt: "2025-01-15T00:00:00Z",       // ISO date string
  
  // ============================================
  // PRODUCTS SECTION
  // ============================================
  topProductsHeading: "Top 10 Best Products", // Defaults to "Detailed Product Reviews"
  topProductsIntro: "Optional intro text explaining what to expect in the products section.",
  productCtaLabel: "Check Price on Amazon",   // Defaults to "Check Price on Amazon"
  
  products: [
    {
      id: "product-1-id",
      rank: 1,
      name: "Product Name - Best Overall",
      badge: "Around $999",
      imageUrl: "/images/products/product1.jpg",
      description: "2-3 sentence description explaining why this product ranks where it does.",
      keyFeatures: [
        "Feature 1: Description",
        "Feature 2: Description",
        "Feature 3: Description",
        "Feature 4: Description"
      ],
      performanceNotes: [
        "First paragraph: Detailed performance observations from testing.",
        "Second paragraph: Specific observations and real-world usage notes."
      ],
      whoItsBestFor: "1-2 sentences describing the ideal user for this product.",
      pros: [
        "Specific, measurable benefit 1",
        "Specific, measurable benefit 2",
        "Specific, measurable benefit 3"
      ],
      cons: [
        "Honest drawback 1",
        "Honest drawback 2"
      ],
      affiliateLink: "https://example.com/product-1"
    },
    {
      id: "product-2-id",
      rank: 2,
      name: "Product Name - Best Value",
      badge: "Starting at $799",
      imageUrl: "/images/products/product2.jpg",
      description: "2-3 sentence description.",
      keyFeatures: [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ],
      performanceNotes: [
        "Performance paragraph 1",
        "Performance paragraph 2"
      ],
      whoItsBestFor: "Target audience description.",
      pros: [
        "Pro 1",
        "Pro 2",
        "Pro 3"
      ],
      cons: [
        "Con 1",
        "Con 2"
      ],
      affiliateLink: "https://example.com/product-2"
    }
    // Add more products (minimum 3-5 recommended)
  ],
  
  // ============================================
  // COMPARISON TABLE
  // ============================================
  // Note: Should match products array, one row per product
  comparisonTable: [
    {
      model: "Product 1 Name",
      affiliateLink: "https://example.com/product-1", // Optional, makes price clickable
      price: "$999",
      motor: "500W",              // Adjust columns based on product type
      battery: "720Wh",
      range: "38+ mi",
      weight: "68 lbs",
      bestFor: "Overall Best"
    },
    {
      model: "Product 2 Name",
      affiliateLink: "https://example.com/product-2",
      price: "$799",
      motor: "750W",
      battery: "600Wh",
      range: "35+ mi",
      weight: "65 lbs",
      bestFor: "Best Value"
    }
    // Add more rows matching products
  ],
  
  // ============================================
  // BUYER'S GUIDE
  // ============================================
  buyersGuideTitle: "Complete Buyer's Guide", // Defaults to "Buyer's Guide"
  
  buyersGuideSections: [
    {
      title: "Understanding Key Concepts",
      paragraphs: [
        "First paragraph: Explain the fundamental concepts readers need to understand.",
        "Second paragraph: Provide context and additional explanation."
      ],
      bullets: [
        "Quick fact or tip 1",
        "Quick fact or tip 2",
        "Quick fact or tip 3"
      ]
    },
    {
      title: "Key Features to Consider",
      paragraphs: [
        "Paragraph explaining what to look for and why it matters."
      ],
      bullets: [
        "Feature 1: Explanation of what this means and why it matters",
        "Feature 2: How to evaluate this feature",
        "Feature 3: What to look for based on your needs"
      ]
    },
    {
      title: "Making Your Decision",
      paragraphs: [
        "Paragraph helping readers make an informed decision.",
        "Additional context and practical advice."
      ],
      bullets: [
        "Decision factor 1",
        "Decision factor 2",
        "Decision factor 3"
      ]
    }
    // Add 3-5 sections covering different aspects
  ],
  
  // ============================================
  // RELATED CONTENT
  // ============================================
  relatedGuides: [
    {
      title: "Related Article Title 1",
      url: "/category/related-article-slug-1"
    },
    {
      title: "Related Article Title 2",
      url: "/category/related-article-slug-2"
    }
    // Add 3-5 related articles
  ]
};

// ============================================
// QUICK REFERENCE CHECKLIST
// ============================================
/*
REQUIRED FIELDS:
✓ categorySlug
✓ category
✓ contentType: "money"
✓ slug
✓ title
✓ seoTitle
✓ h1
✓ metaDescription
✓ products (at least 1)
✓ comparisonTable (at least 1 row)

RECOMMENDED FIELDS:
✓ introductionParagraphs (or introduction)
✓ articleHeroImage
✓ topProductsHeading
✓ buyersGuideSections (or buyersGuide)
✓ estimatedReadingTime
✓ publishedAt

OPTIONAL FIELDS:
- topProductsIntro
- secondaryIntroduction
- relatedGuides
- heroImageAlt
- productCtaLabel
- buyersGuideTitle
- updatedAt

PRODUCT REQUIREMENTS (each product must have):
✓ id
✓ rank
✓ name
✓ badge
✓ imageUrl
✓ description
✓ keyFeatures (array)
✓ performanceNotes (array)
✓ whoItsBestFor
✓ pros (array)
✓ cons (array)
✓ affiliateLink

COMPARISON TABLE REQUIREMENTS (each row must have):
✓ model
✓ price
✓ At least 3-4 specification columns
✓ bestFor
- affiliateLink (optional)

BUYER'S GUIDE SECTIONS (each section should have):
✓ title
✓ paragraphs (array)
- bullets (array, optional)
*/

