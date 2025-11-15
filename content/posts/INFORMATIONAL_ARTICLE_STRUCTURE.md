# Informational Article Content Structure Template

This document defines the exact structure required for all informational articles in the `informational.js` file. Use this as a reference when creating new articles.

## Complete Article Object Structure

```javascript
{
  // ============================================
  // BASIC METADATA & IDENTIFIERS
  // ============================================
  id: "unique-article-id-slug-format",
  slug: "unique-article-id-slug-format", // Usually same as id
  categorySlug: "category-slug", // e.g., "electric-bikes"
  category: "Category Name", // Display name, e.g., "Electric Bikes"
  contentType: "information", // Always "information" for this type

  // ============================================
  // IMAGE ASSETS
  // ============================================
  heroImage: "/images/products/hero6.jpg", // Main hero image path
  cardImage: "/images/products/hero6.jpg", // Card/thumbnail image path
  articleHeroImage: "/images/products/hero6.jpg", // Article header image path
  heroImageAlt: "Descriptive alt text for accessibility", // SEO and accessibility

  // ============================================
  // TITLE & HEADINGS
  // ============================================
  title: "Full Article Title (SEO Optimized with Year if Applicable)",
  h1: "Full Article Title (Usually same as title)", // Main page heading

  // ============================================
  // INTRODUCTION SECTION
  // ============================================
  introductionHeading: "Introduction: Engaging Question or Statement",
  introductionHook: "Compelling opening paragraph that hooks the reader with a scenario, question, or bold statement. Should be engaging and relatable.",
  snippetAnswer: "Direct answer to the main question in 2-3 sentences. This is the quick answer readers see first. Include key benefits, costs, or decision factors.",
  roadmap: "Paragraph explaining what the reader will learn in this guide. Sets expectations for the content structure.",

  // ============================================
  // SEO METADATA
  // ============================================
  metaDescription: "SEO meta description (150-160 characters). Should include main keyword and value proposition.",

  // ============================================
  // CORE CONTENT SECTION
  // ============================================
  coreHeading: "Main Core Section Heading (e.g., 'The Core Truth: Weighing Pros and Cons')",
  coreSections: [
    // Array of section objects. Each section can have:
    {
      title: "Section Title (e.g., 'The Pros: Why X Is Changing the Game')",
      paragraphs: [
        // Optional: Array of paragraph strings for introductory text
        "Opening paragraph for this section (optional but recommended)",
      ],
      bullets: [
        // Array of bullet point objects
        {
          text: "Full bullet point text. Can be multiple sentences. Should be detailed and informative.",
        },
        // Add more bullets as needed
      ],
    },
    // Add more sections as needed. Common patterns:
    // - Pros section
    // - Cons section
    // - "You Should Get X If..." section
    // - "You Probably Shouldn't Get X If..." section
    // - "How to Choose..." section
    // - "The Bottom Line" section
    // - "Your Next Steps" section
  ],

  // ============================================
  // FAQ SECTION
  // ============================================
  contextHeading: "FAQ Section Heading (e.g., 'Answering Your Other X Questions')",
  contextFAQs: [
    {
      question: "Frequently asked question in natural language",
      answer: "Comprehensive answer to the question. Can be multiple sentences. Should be detailed and helpful.",
    },
    // Add 5-7 FAQs covering common questions
  ],

  // ============================================
  // KEY TAKEAWAYS SECTION
  // ============================================
  takeawayHeading: "Takeaways Section Heading (e.g., 'Key Criteria for Your Decision')",
  takeawayBullets: [
    {
      text: "Key takeaway point. Should be actionable or decision-oriented.",
    },
    // Typically 3-5 key takeaways
  ],

  // ============================================
  // RELATED CONTENT
  // ============================================
  relatedGuides: [], // Array of related article IDs (can be empty initially)

  // ============================================
  // PUBLICATION METADATA
  // ============================================
  publishedAt: "2025-11-12T09:00:00.000Z", // ISO 8601 date string
  updatedAt: "2025-11-12T09:00:00.000Z", // ISO 8601 date string (usually same as publishedAt initially)
  estimatedReadingTime: 12, // Estimated reading time in minutes
}
```

## Field Requirements & Guidelines

### Required Fields (All Must Be Present)
- `id`, `slug`, `categorySlug`, `category`, `contentType`
- `heroImage`, `cardImage`, `articleHeroImage`, `heroImageAlt`
- `title`, `h1`
- `introductionHeading`, `introductionHook`, `snippetAnswer`, `roadmap`
- `metaDescription`
- `coreHeading`, `coreSections` (at least one section)
- `contextHeading`, `contextFAQs` (at least 3-5 FAQs)
- `takeawayHeading`, `takeawayBullets` (at least 2-3 bullets)
- `relatedGuides` (can be empty array)
- `publishedAt`, `updatedAt`, `estimatedReadingTime`

### Content Guidelines

#### Introduction Section
- **introductionHook**: Should be 2-4 sentences, engaging, and create a relatable scenario
- **snippetAnswer**: Direct answer in 2-3 sentences with key facts/numbers
- **roadmap**: 1-2 sentences explaining what the guide covers

#### Core Sections
- Each section should have a clear `title`
- `paragraphs` array is optional but recommended for section introductions
- `bullets` array should contain 4-8 detailed bullet points per section
- Bullet points should be comprehensive (can be 2-4 sentences each)
- Common section patterns:
  1. Pros/Benefits section
  2. Cons/Drawbacks section
  3. "You Should Get X If..." (target audience)
  4. "You Probably Shouldn't Get X If..." (non-target audience)
  5. "How to Choose..." (decision guide)
  6. "The Bottom Line" (summary/conclusion)
  7. "Your Next Steps" (action items)

#### FAQ Section
- Include 5-7 relevant FAQs
- Questions should be natural and common
- Answers should be comprehensive (3-5 sentences typically)
- Cover practical concerns, costs, legality, usage, maintenance, etc.

#### Takeaways
- 3-5 actionable or decision-oriented points
- Should summarize key decision criteria or next steps

### Data Types
- **Strings**: All text fields
- **Arrays**: `coreSections`, `contextFAQs`, `takeawayBullets`, `relatedGuides`
- **Numbers**: `estimatedReadingTime`
- **Dates**: ISO 8601 format strings for `publishedAt` and `updatedAt`

### Example Section Structure Variations

```javascript
// Section with both paragraphs and bullets
{
  title: "Section Title",
  paragraphs: ["Intro paragraph"],
  bullets: [{ text: "Bullet point" }]
}

// Section with only bullets (paragraphs optional)
{
  title: "Section Title",
  bullets: [{ text: "Bullet point" }]
}

// Section with only paragraphs (no bullets)
{
  title: "Section Title",
  paragraphs: ["Paragraph 1", "Paragraph 2"]
}
```

## Usage Instructions for AI

When creating a new informational article:

1. **Copy the structure** from an existing article or use this template
2. **Fill in all required fields** with topic-specific content
3. **Maintain consistent formatting** - use same style, tone, and depth
4. **Ensure coreSections** has 5-7 sections covering pros, cons, target audience, decision guide, conclusion, and next steps
5. **Include 5-7 FAQs** covering common questions
6. **Add 3-5 takeaways** that are actionable
7. **Set dates** to current date in ISO 8601 format
8. **Calculate reading time** based on word count (approximately 200-250 words per minute)

## Notes
- All text should be engaging, informative, and SEO-friendly
- Use specific numbers, statistics, and examples when possible
- Maintain a conversational but authoritative tone
- Each article should be comprehensive (typically 2000-4000 words total)

