# Money Article Content Structure

This document defines the complete content structure for "money" articles (commercial/affiliate posts). Use this structure as a template when creating new money articles to ensure consistency.

## Article Object Schema

```javascript
{
  // ============================================
  // REQUIRED FIELDS - Basic Article Information
  // ============================================
  
  categorySlug: "string",           // URL-friendly category identifier (e.g., "electric-bikes")
  category: "string",                // Display name for category (e.g., "Electric Bikes")
  contentType: "money",              // Always "money" for these articles
  slug: "string",                    // URL-friendly article slug (e.g., "best-electric-bikes-2025")
  
  // ============================================
  // SEO & METADATA
  // ============================================
  
  title: "string",                  // Page title (55-60 characters recommended)
  seoTitle: "string",                // SEO title (should differ from h1, 55-60 chars)
  h1: "string",                      // Main headline (can be longer, more descriptive)
  metaDescription: "string",         // Meta description (~155 characters, question format improves CTR)
  
  // ============================================
  // IMAGES
  // ============================================
  
  heroImage: "string",               // Path to hero image (e.g., "/images/products/hero1.jpg")
  cardImage: "string",               // Path to card/thumbnail image
  articleHeroImage: "string",        // Path to article hero image (defaults to "/default-og.png" if not provided)
  heroImageAlt: "string",            // Alt text for hero image (defaults to title or h1)
  
  // ============================================
  // INTRODUCTION CONTENT
  // ============================================
  
  // Option 1: Single introduction string (legacy support)
  introduction: "string",            // Single paragraph introduction
  
  // Option 2: Multiple introduction paragraphs (preferred)
  introductionParagraphs: [          // Array of introduction paragraphs
    "First paragraph explaining the topic and context...",
    "Second paragraph about your research/testing process...",
    "Third paragraph setting expectations..."
  ],
  
  // Optional: Secondary introduction content
  secondaryIntroduction: "string" | [  // Single string or array of paragraphs
    "Additional context paragraph...",
    "Another supporting paragraph..."
  ],
  
  // ============================================
  // READING TIME & PUBLICATION INFO
  // ============================================
  
  estimatedReadingTime: "number",    // Estimated reading time in minutes (e.g., 15)
  publishedAt: "string",             // ISO date string (e.g., "2025-01-15T00:00:00Z")
  updatedAt: "string",               // ISO date string for last update (optional)
  
  // ============================================
  // PRODUCTS SECTION
  // ============================================
  
  topProductsHeading: "string",      // Heading for products section (defaults to "Detailed Product Reviews")
  topProductsIntro: "string",       // Optional intro text before products (shown in "What to Expect" section)
  productCtaLabel: "string",        // CTA button text (defaults to "Check Price on Amazon")
  
  products: [                        // Array of product objects (minimum 3-5 recommended)
    {
      id: "string",                  // Unique identifier (e.g., "aventon-level-3")
      rank: "number",                // Ranking number (1, 2, 3, etc.)
      name: "string",                // Full product name with badge (e.g., "Aventon Level 3 - Best Overall Electric Bike")
      badge: "string",               // Price badge (e.g., "Around $2,199" or "Starting at $999")
      imageUrl: "string",            // Path to product image (e.g., "/images/1.png")
      description: "string",         // 2-3 sentence product description
      
      keyFeatures: [                 // Array of key feature strings
        "500W rear hub motor (peaks at 859W)",
        "720Wh battery delivering 38+ miles of range",
        "ACU (Aventon Control Unit) with 4G connectivity"
      ],
      
      performanceNotes: [            // Array of detailed performance paragraphs
        "First paragraph about performance and testing...",
        "Second paragraph with specific observations..."
      ],
      
      whoItsBestFor: "string",       // 1-2 sentences describing target audience
      
      pros: [                        // Array of positive points
        "Outstanding range for the battery size",
        "Smart connectivity features without added cost"
      ],
      
      cons: [                        // Array of negative points
        "Slightly less powerful than some competitors",
        "68 pounds makes it tough to carry upstairs"
      ],
      
      affiliateLink: "string"        // Affiliate URL (e.g., "https://example.com/product")
    }
    // ... more products
  ],
  
  // ============================================
  // COMPARISON TABLE
  // ============================================
  
  comparisonTable: [                // Array of comparison row objects
    {
      model: "string",               // Product model name
      affiliateLink: "string",       // Optional affiliate link (if provided, price becomes clickable)
      price: "string",               // Price display (e.g., "$2,199")
      motor: "string",               // Motor specification (e.g., "500W")
      battery: "string",             // Battery specification (e.g., "720Wh")
      range: "string",               // Range specification (e.g., "38+ mi")
      weight: "string",              // Weight specification (e.g., "68 lbs")
      bestFor: "string",             // Best use case (e.g., "Overall Best")
      // Note: Additional columns can be added (e.g., "capacity", "topSpeed", etc.)
      // The table will automatically adapt to the columns provided
    }
    // ... more comparison rows (should match products array)
  ],
  
  // ============================================
  // BUYER'S GUIDE SECTION
  // ============================================
  
  // Option 1: Structured sections (preferred for detailed guides)
  buyersGuideTitle: "string",        // Main buyer's guide title (defaults to "Buyer's Guide")
  buyersGuideSections: [             // Array of guide section objects
    {
      title: "string",               // Section heading (e.g., "Understanding E-Bike Classes")
      paragraphs: [                  // Array of paragraph strings
        "First paragraph explaining the topic...",
        "Second paragraph with additional context..."
      ],
      bullets: [                     // Optional array of bullet points
        "Class 1: Pedal-assist only, up to 20 mph...",
        "Class 2: Throttle and pedal-assist, both limited to 20 mph...",
        "Class 3: Pedal-assist up to 28 mph..."
      ]
    }
    // ... more guide sections
  ],
  
  // Option 2: Simple buyer's guide (fallback if buyersGuideSections not provided)
  buyersGuide: "string" | {         // String or object (handled by BuyersGuide component)
    // Structure depends on BuyersGuide component implementation
  },
  
  // ============================================
  // RELATED CONTENT
  // ============================================
  
  relatedGuides: [                   // Optional array of related article links
    {
      title: "string",               // Article title
      url: "string"                  // Article URL (e.g., "/electric-bikes/guide-slug")
    }
    // ... more related guides
  ]
}
```

## Content Structure Order (Visual Layout)

The article renders in this order:

1. **Header Section** (Dark gradient background)
   - Category badge
   - Published date
   - Reading time
   - H1 headline
   - Introduction paragraphs (in styled box)

2. **Hero Image** (16:9 aspect ratio)
   - Full-width image with rounded corners

3. **Top Products Intro** (Optional - "What to Expect" section)
   - Light background box with intro text

4. **Comparison Table** (Always shown)
   - Side-by-side comparison of all products
   - Key specifications in columns

5. **Detailed Product Reviews** (Always shown)
   - Individual product cards with:
     - Rank badge
     - Product image
     - Name and price badge
     - Description
     - Key features list
     - Performance notes
     - Who it's best for
     - Pros and cons
     - CTA button with affiliate link

6. **Buyer's Guide Section** (Dark gradient background matching header)
   - Section title
   - Multiple guide sections with:
     - Section heading
     - Paragraphs
     - Bullet points (optional)

7. **Related Guides** (Optional)
   - Links to related articles in the same category

## Field Requirements Summary

### Required Fields (Must Have)
- `categorySlug`
- `category`
- `contentType: "money"`
- `slug`
- `title`
- `seoTitle`
- `h1`
- `metaDescription`
- `products` (array with at least 1 product)
- `comparisonTable` (array with at least 1 row)

### Recommended Fields (Should Have)
- `introductionParagraphs` (or `introduction`)
- `articleHeroImage`
- `topProductsHeading`
- `buyersGuideSections` (or `buyersGuide`)
- `estimatedReadingTime`
- `publishedAt`

### Optional Fields (Nice to Have)
- `topProductsIntro`
- `secondaryIntroduction`
- `relatedGuides`
- `heroImageAlt`
- `productCtaLabel`
- `buyersGuideTitle`
- `updatedAt`

## Product Object Requirements

Each product in the `products` array must have:
- `id` (unique identifier)
- `rank` (number, typically 1, 2, 3, etc.)
- `name` (full product name)
- `badge` (price display)
- `imageUrl` (path to image)
- `description` (2-3 sentences)
- `keyFeatures` (array of strings)
- `performanceNotes` (array of paragraphs)
- `whoItsBestFor` (target audience description)
- `pros` (array of positive points)
- `cons` (array of negative points)
- `affiliateLink` (URL)

## Comparison Table Requirements

Each row in `comparisonTable` should include:
- `model` (product name)
- `price` (price display)
- At least 3-4 specification columns (e.g., `motor`, `battery`, `range`, `weight`)
- `bestFor` (use case)
- `affiliateLink` (optional, makes price clickable)

Common specification columns:
- `motor` - Motor power/type
- `battery` - Battery capacity
- `range` - Estimated range
- `weight` - Product weight
- `capacity` - Weight capacity (for cargo bikes)
- `topSpeed` - Maximum speed
- `bestFor` - Best use case

## Buyer's Guide Best Practices

When creating `buyersGuideSections`:

1. **Start with fundamentals** - Explain basic concepts first
2. **Use clear section titles** - Make it easy to scan
3. **Mix paragraphs and bullets** - Paragraphs for context, bullets for quick facts
4. **Cover decision criteria** - Help readers make informed choices
5. **Include practical advice** - Real-world tips and considerations
6. **Address common questions** - Anticipate reader concerns

Example section structure:
```javascript
{
  title: "Understanding Key Specifications",
  paragraphs: [
    "Before diving into specific products, it's important to understand what these numbers mean...",
    "Here's what to look for based on your needs..."
  ],
  bullets: [
    "Spec 1: Explanation of what this means...",
    "Spec 2: Why this matters...",
    "Spec 3: How to evaluate this..."
  ]
}
```

## Content Writing Guidelines

### Introduction Paragraphs
- **First paragraph**: Set context, mention industry trends/data, explain why this matters
- **Second paragraph**: Describe your research/testing methodology, establish credibility
- **Third paragraph**: Set expectations about what readers will learn

### Product Descriptions
- **Description**: 2-3 sentences summarizing why this product ranks where it does
- **Performance Notes**: 2-3 detailed paragraphs with specific observations from testing
- **Who It's Best For**: 1-2 sentences identifying the ideal user

### Pros and Cons
- **Pros**: 3-5 specific, measurable benefits
- **Cons**: 2-4 honest drawbacks (builds trust)

### Buyer's Guide Sections
- **Paragraphs**: Provide context and explanation
- **Bullets**: Quick-reference facts and tips
- **Aim for 3-5 sections** covering different aspects of the buying decision

## Example Article Structure

```javascript
{
  categorySlug: "electric-bikes",
  category: "Electric Bikes",
  contentType: "money",
  slug: "best-electric-bikes-2025",
  title: "Best Electric Bikes: Top 10 E-Bikes for 2025",
  seoTitle: "Best Electric Bikes: Top 10 E-Bikes for 2025",
  h1: "Best Electric Bikes: Top 10 E-Bikes for 2025",
  metaDescription: "Discover the best electric bikes for 2025. Compare top e-bikes including Aventon Level 3, Lectric XP4, and Segway Xafari. Expert reviews, buying guide, and honest recommendations.",
  articleHeroImage: "/images/products/hero1.jpg",
  introductionParagraphs: [
    "Electric bikes aren't just trendy anymore—they're genuinely reshaping how Americans move...",
    "After testing dozens of models and logging hundreds of miles..."
  ],
  topProductsHeading: "Top 10 Best Electric Bikes",
  topProductsIntro: "We've tested and compared the leading electric bikes on the market...",
  estimatedReadingTime: 15,
  publishedAt: "2025-01-15T00:00:00Z",
  products: [ /* ... */ ],
  comparisonTable: [ /* ... */ ],
  buyersGuideTitle: "Complete Buyer's Guide to Electric Bikes",
  buyersGuideSections: [ /* ... */ ],
  relatedGuides: [ /* ... */ ]
}
```

## Notes for AI Content Generation

When generating money articles:

1. **Maintain consistency** - Use the same structure for all articles
2. **Fill all required fields** - Don't skip required fields
3. **Match products to comparison table** - Ensure products array and comparisonTable align
4. **Use realistic data** - Research actual product specifications
5. **Write naturally** - Avoid keyword stuffing, focus on helpful content
6. **Include honest cons** - Build trust with balanced reviews
7. **Link internally** - Use relatedGuides to connect related content
8. **Optimize for SEO** - But prioritize user experience

This structure ensures all money articles have a consistent format while allowing flexibility for different product categories and content needs.

