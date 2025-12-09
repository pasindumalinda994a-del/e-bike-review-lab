# Money Page Content Structure Template
## For AI Blog Writing Prompts

Use this structure to generate consistent money page articles. Replace all placeholders with actual content.

---

## 1. REQUIRED FIELDS (Basic Article Identification)

```
categorySlug: "[category-slug]"           // e.g., "electric-bikes"
category: "[Category Name]"              // e.g., "Electric Bikes"
contentType: "money"                      // Always "money" for money pages
slug: "[main-keyword-only]"              // Main keyword only, no domain repetition
```

**SEO Requirements:**
- `slug` must contain ONLY the main primary keyword
- Must NOT repeat words already in domain
- Must NOT include multiple variations
- Must NOT be long or stuffed
- Example: `slug: "best-electric-bikes"` ✅
- Bad: `slug: "best-electric-bikes-cheap-budget-high-speed"` ❌

---

## 2. SEO & METADATA (The 3 Kings - 70% of Ranking Power)

```
title: "[Full Article Title]"
seoTitle: "[SEO Title - Under 60 chars]"                    // King 2: Main keyword at beginning
h1: "[H1 Heading - Different from SEO Title]"                // King 3: Keyword variation, different from seoTitle
metaDescription: "[Meta Description - Under 155 chars]"     // Include main keyword, natural writing
```

**SEO Requirements:**
- **SEO Title (King 2):**
  - Main keyword at the very beginning
  - Natural writing (not keyword stuffing)
  - One or two keyword variations
  - Title modifier (e.g., "2025", "Top Picks", "Ultimate Guide", "Reviewed")
  - Under 60 characters

- **H1 (King 3):**
  - Should be DIFFERENT from SEO title
  - Should include variation of main keyword
  - Only ONE per page
  - Can include secondary keywords
  - Must not repeat exact words too many times

- **Meta Description:**
  - Under 155 characters
  - Include main keyword (will be bolded)
  - Optionally start with a question
  - Natural and compelling

---

## 3. IMAGES (All Image Paths and Alt Text)

```
heroImage: "/images/[folder]/[hero-image].webp"              // Used in listings
cardImage: "/images/[folder]/[card-image].webp"              // Used in cards
articleHeroImage: "/images/[folder]/[article-hero].webp"      // Main article hero
heroImageAlt: "[Descriptive alt text for hero image]"
buyersGuideImage: "/images/[folder]/[buyers-guide].webp"      // Buyer's guide section image
buyersGuideImageAlt: "[Alt text for buyer's guide image]"
```

---

## 4. INTRODUCTION (Opening Paragraphs)

```
introductionParagraphs: [
  "[Paragraph 1: 100-200 words, natural keyword usage, engaging hook]",
  "[Paragraph 2: 100-200 words, builds on hook, establishes authority]",
  "[Paragraph 3: 100-200 words, sets expectations, previews content]"
],
secondaryIntroduction: []  // Optional: Additional intro paragraphs
```

**Content Guidelines:**
- Each paragraph: 100-200 words
- Natural keyword usage (no stuffing)
- Engaging, conversational tone
- Establishes expertise/authority
- Sets expectations for the article

---

## 5. PUBLICATION INFO

```
estimatedReadingTime: [number],           // Minutes (e.g., 18)
publishedAt: "YYYY-MM-DDTHH:mm:ssZ"       // ISO date string (e.g., "2025-01-15T00:00:00Z")
```

---

## 6. PRODUCTS SECTION (7-10 Products Recommended for SEO)

```
topProductsHeading: "[H2 Heading for Products Section]"
topProductsIntro: "[Intro paragraph before products - explains selection criteria]"
topProductsIntroLabel: "[Badge label above intro heading]"    // e.g., "What to Expect"
topProductsIntroHeading: "[H2 heading for intro section]"    // e.g., "Product Overview"
productCtaLabel: "[CTA button label]"                        // e.g., "Check Price"

products: [
  {
    // Product 1
    id: "[product-id]",                    // Used for anchor links (e.g., "aventon-level-3")
    rank: 1,                                // Displayed as "1. " before product name
    name: "[Product Name - Descriptive Subtitle]",  // Format: "Name - Subtitle"
    // Part before " - " becomes H2, part after becomes visual badge
    
    avgRating: [number],                    // e.g., 4.7 (for star rating display)
    badge: "[Price or rating text]",       // e.g., "Around $1,899"
    imageUrl: "/images/[folder]/[product-image].webp",
    
    description: "[2-3 sentences, appears first in product card, engaging overview]",
    
    keyFeatures: [
      "Motor: [specification]",
      "Battery: [specification]",
      "Range: [specification]",
      "Weight: [specification]",
      "Best For: [target audience/use case]"
    ],
    // Format: "Label: Value" (case-insensitive matching)
    
    performanceRatings: [
      { category: "[Category Name]", rating: [0-10], weight: [percentage] },
      { category: "[Category Name]", rating: [0-10], weight: [percentage] },
      { category: "[Category Name]", rating: [0-10], weight: [percentage] },
      { category: "[Category Name]", rating: [0-10], weight: [percentage] },
      { category: "[Category Name]", rating: [0-10], weight: [percentage] }
    ],
    // Rating scale: 0-10, weight is percentage for weighted average
    // Common categories: "Ride Quality", "Range", "Hills", "Interface", "Assembly"
    
    performanceNotes: [
      "[Paragraph 1: Detailed performance analysis, real-world testing insights]",
      "[Paragraph 2: Additional performance details, specific use cases]"
    ],
    // Each item becomes a paragraph in H3 "Performance Notes" section
    
    whoItsBestFor: "[Single paragraph or string describing target audience]",
    // Becomes H3 "Who It's Best For" section
    
    pros: [
      "[Bullet point 1: Specific advantage]",
      "[Bullet point 2: Specific advantage]",
      "[Bullet point 3: Specific advantage]",
      "[Bullet point 4: Specific advantage]"
    ],
    // Becomes H3 "Pros" section with bullet list
    
    cons: [
      "[Bullet point 1: Specific disadvantage]",
      "[Bullet point 2: Specific disadvantage]",
      "[Bullet point 3: Specific disadvantage]"
    ],
    // Becomes H3 "Cons" section with bullet list
    
    affiliateLink: "[affiliate URL]",      // Required
    reviewLink: null                        // Optional: Link to full review article
  },
  
  {
    // Product 2 (repeat structure for 7-10 products total)
    id: "[product-id-2]",
    rank: 2,
    name: "[Product Name 2 - Descriptive Subtitle]",
    // ... (same structure as Product 1)
  }
  
  // Continue for 7-10 products total
]
```

**SEO Requirements:**
- **7-10 products recommended** for optimal SEO
- Each product becomes an **H2 heading** (product name)
- **H3 subsections** under each product:
  - Performance Ratings (optional)
  - Key Features
  - Performance Notes
  - Who It's Best For
  - Pros
  - Cons

---

## 7. COMPARISON TABLE (Quick Comparison of All Products)

```
comparisonTable: {
  title: "[H2 Heading for Comparison Table]",              // Required
  description: "[Optional description text]",               // Optional
  ctaLabel: "[Button label text]",                        // Required (e.g., "Check Price")
  noRatingText: "[Text when rating missing]",             // Optional (e.g., "No rating")
  
  data: [
    {
      model: "[Product Model Name]",                      // e.g., "Aventon Level 3"
      price: "[Display Price]",                           // e.g., "$1,899"
      avgRating: [number],                                // Optional (can pull from products array)
      affiliateLink: "[affiliate URL]"
    },
    {
      model: "[Product Model Name 2]",
      price: "[Display Price 2]",
      avgRating: [number],
      affiliateLink: "[affiliate URL 2]"
    }
    // Include all products from products array
  ]
}
```

**Display Format:**
- Table shows: Model, Price, Reviews (star ratings), View Product (button)
- One row per product

---

## 8. BUYER'S GUIDE (Educational Content Sections)

```
buyersGuideTitle: "[H2 Heading for Buyer's Guide]",      // Required
buyersGuideLabel: "[Badge label above heading]",          // Optional (e.g., "Buyer's Guide")
buyersGuideImage: "/images/[folder]/[buyers-guide].webp", // Optional
buyersGuideImageAlt: "[Alt text for buyer's guide image]", // Optional

buyersGuideSections: [
  {
    title: "[H3 Section Heading]",                        // e.g., "Understanding E-Bike Classes"
    paragraphs: [
      "[Paragraph 1: 100-200 words, educational content]",
      "[Paragraph 2: 100-200 words, continues education]"
    ],
    bullets: [
      "[Bullet point 1: Key takeaway]",
      "[Bullet point 2: Key takeaway]",
      "[Bullet point 3: Key takeaway]",
      "[Bullet point 4: Key takeaway]"
    ]
  },
  {
    title: "[H3 Section Heading 2]",
    paragraphs: [
      "[Paragraph 1]",
      "[Paragraph 2]"
    ],
    bullets: [
      "[Bullet point 1]",
      "[Bullet point 2]",
      "[Bullet point 3]"
    ]
  }
  // Continue for 4-6 sections total
]
```

**Content Guidelines:**
- Each section: 2-3 paragraphs + 3-5 bullet points
- Educational, helpful content (not sales-focused)
- Natural keyword usage
- Addresses common buyer questions/concerns

**Heading Structure:**
- H2: Buyer's Guide Title
- H3: Each section title

---

## 9. FAQ SECTION (Frequently Asked Questions)

```
faqTitle: "[H2 Heading for FAQ Section]",                // Optional (defaults to "Frequently Asked Questions")
faqLabel: "[Badge label above heading]",                  // Optional (e.g., "FAQ")

faq: [
  {
    question: "[Question 1 - Natural, conversational]",
    answer: [
      "[Answer paragraph 1]",
      "[Answer paragraph 2]"                              // Optional: Can be array or single string
    ]
  },
  {
    question: "[Question 2]",
    answer: [
      "[Answer paragraph 1]",
      "[Answer paragraph 2]"
    ]
  }
  // Continue for 5-8 FAQs total
]
```

**Content Guidelines:**
- 5-8 FAQs recommended
- Questions should be natural, conversational
- Answers should be comprehensive but concise
- Include main keyword naturally in answers
- Address common user concerns

---

## 10. INTERNAL LINKS (Related Articles in Same Cluster)

```
internalLinksTitle: "[H2 Heading for Internal Links]",   // Optional

internalLinks: [
  {
    text: "[Link Text - Natural anchor text variation]",
    url: "/[category-slug]/[article-slug]",
    description: "[Optional description text]"
  },
  {
    text: "[Link Text 2]",
    url: "/[category-slug]/[article-slug-2]",
    description: "[Optional description]"
  }
  // Add 2-5 internal links to related articles
]
```

**SEO Requirements:**
- **Only link inside your own cluster** (same category)
- **Do NOT link to unrelated articles**
- Use **natural anchor text variations** (not exact match keywords)
- Links should be **helpful and relevant** to the reader

---

## COMPLETE STRUCTURE SUMMARY

```
{
  // 1. REQUIRED FIELDS
  categorySlug, category, contentType, slug
  
  // 2. SEO & METADATA (The 3 Kings)
  title, seoTitle, h1, metaDescription
  
  // 3. IMAGES
  heroImage, cardImage, articleHeroImage, heroImageAlt,
  buyersGuideImage, buyersGuideImageAlt
  
  // 4. INTRODUCTION
  introductionParagraphs, secondaryIntroduction
  
  // 5. PUBLICATION INFO
  estimatedReadingTime, publishedAt
  
  // 6. PRODUCTS SECTION
  topProductsHeading, topProductsIntro, topProductsIntroLabel,
  topProductsIntroHeading, productCtaLabel, products (7-10 items)
  
  // 7. COMPARISON TABLE
  comparisonTable
  
  // 8. BUYER'S GUIDE
  buyersGuideTitle, buyersGuideLabel, buyersGuideImage,
  buyersGuideImageAlt, buyersGuideSections (4-6 sections)
  
  // 9. FAQ SECTION
  faqTitle, faqLabel, faq (5-8 items)
  
  // 10. INTERNAL LINKS
  internalLinksTitle, internalLinks (2-5 items)
}
```

---

## HEADING HIERARCHY (SEO Critical)

```
H1: Main Article Title (1 per page) ✅
  └─ H2: Top Products Intro (optional)
  └─ H2: Comparison Table
  └─ H2: Detailed Product Reviews
      ├─ H2: Product Name 1
      │   ├─ H3: Performance Ratings (optional)
      │   ├─ H3: Key Features
      │   ├─ H3: Performance Notes
      │   ├─ H3: Who It's Best For
      │   ├─ H3: Pros
      │   └─ H3: Cons
      ├─ H2: Product Name 2
      │   └─ (same H3 structure)
      └─ ... (7-10 products)
  └─ H2: Buyer's Guide
      ├─ H3: Section Title 1
      ├─ H3: Section Title 2
      └─ ... (4-6 sections)
  └─ H2: FAQ Section
  └─ H2: Internal Links Section
```

---

## AI PROMPT TEMPLATE

Use this structure when creating AI prompts:

```
Create a money page article about [TOPIC] with the following structure:

1. SEO & METADATA:
   - Main keyword: [KEYWORD]
   - SEO Title: [Main keyword at beginning] + [modifier] (under 60 chars)
   - H1: [Different from SEO title, keyword variation]
   - Meta Description: [Under 155 chars, includes keyword]

2. INTRODUCTION:
   - 3 paragraphs (100-200 words each)
   - Engaging hook, establishes authority
   - Natural keyword usage

3. PRODUCTS (7-10 products):
   For each product:
   - Name: [Product Name - Descriptive Subtitle]
   - Description: [2-3 sentences]
   - Key Features: [Motor, Battery, Range, Weight, Best For]
   - Performance Ratings: [5 categories, 0-10 scale]
   - Performance Notes: [2 detailed paragraphs]
   - Who It's Best For: [1 paragraph]
   - Pros: [4-5 bullet points]
   - Cons: [2-3 bullet points]

4. COMPARISON TABLE:
   - All products with model, price, rating, affiliate link

5. BUYER'S GUIDE (4-6 sections):
   Each section:
   - H3 Title
   - 2-3 paragraphs (educational content)
   - 3-5 bullet points

6. FAQ (5-8 questions):
   - Natural questions
   - Comprehensive answers

7. INTERNAL LINKS (2-5 links):
   - Related articles in same cluster
   - Natural anchor text
```

---

## NOTES FOR AI CONTENT GENERATION

1. **Tone**: Conversational, expert, helpful (not salesy)
2. **Keyword Usage**: Natural, never stuffed
3. **Word Counts**: Follow specified ranges
4. **SEO Compliance**: Follow all heading hierarchy rules
5. **Internal Links**: Only same cluster/category
6. **Product Count**: 7-10 products minimum for SEO
7. **Content Quality**: Real insights, not generic fluff

