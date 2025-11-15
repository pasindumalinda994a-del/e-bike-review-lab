# Informational Article Content Structure

This document defines the complete content structure for "informational" articles (evergreen/educational posts that support money articles). Use this structure as a template when creating new informational articles to ensure consistency.

## Article Object Schema

```javascript
{
  // ============================================
  // REQUIRED FIELDS - Basic Article Information
  // ============================================
  
  id: "string",                      // Unique identifier (usually same as slug)
  slug: "string",                    // URL-friendly article slug (e.g., "is-it-worth-getting-an-electric-bike-2025")
  categorySlug: "string",            // URL-friendly category identifier (e.g., "electric-bikes")
  category: "string",                // Display name for category (e.g., "Electric Bikes")
  contentType: "information",        // Always "information" for these articles
  
  // ============================================
  // SEO & METADATA
  // ============================================
  
  title: "string",                   // Page title (include year if relevant)
  h1: "string",                      // Main headline (usually same as title)
  metaDescription: "string",         // Meta description (150-160 characters)
  
  // ============================================
  // IMAGES
  // ============================================
  
  heroImage: "string",                // Path to hero image (e.g., "/images/products/hero6.jpg")
  cardImage: "string",                // Path to card/thumbnail image
  articleHeroImage: "string",         // Path to article hero image
  heroImageAlt: "string",             // Alt text for hero image
  
  // ============================================
  // INTRODUCTION SECTION
  // ============================================
  
  introductionHeading: "string",      // Introduction section heading (e.g., "Introduction: Should You Join the E-Bike Revolution?")
  introductionHook: "string",          // Compelling opening paragraph - create a relatable scenario, ask a thought-provoking question, or make a bold statement
  snippetAnswer: "string",            // Direct answer to the main question in 2-3 sentences. Include key benefits, costs, or decision factors. This is what readers see first.
  roadmap: "string",                  // Explain what the reader will learn in this guide. Set expectations for the content structure.
  
  // Optional: Alternative introduction formats
  introduction: "string",            // Single paragraph introduction (alternative to introductionHook)
  introductionParagraphs: [          // Array of introduction paragraphs (alternative format)
    "First paragraph...",
    "Second paragraph..."
  ],
  secondaryIntroduction: "string" | [  // Additional introduction content
    "Additional context..."
  ],
  
  // ============================================
  // READING TIME & PUBLICATION INFO
  // ============================================
  
  estimatedReadingTime: "number",     // Estimated reading time in minutes (e.g., 12)
  publishedAt: "string",              // ISO date string (e.g., "2025-11-12T09:00:00.000Z")
  updatedAt: "string",                // ISO date string for last update (optional)
  
  // ============================================
  // CORE CONTENT SECTIONS
  // ============================================
  
  coreHeading: "string",              // Main heading for core sections (e.g., "The Core Truth: Weighing the Pros and Cons")
  
  coreSections: [                     // Array of core section objects (typically 5-7 sections)
    {
      title: "string",                // Section heading (e.g., "The Pros: Why E-Bikes Are Changing the Game")
      paragraphs: [                   // Optional array of paragraph strings (sets context before bullets)
        "Optional introductory paragraph for this section..."
      ],
      bullets: [                      // Array of bullet point objects
        {
          text: "string"              // Detailed bullet point text (can be multiple sentences with specific details, numbers, or examples)
        }
        // ... more bullets (typically 4-8 per section)
      ]
    }
    // ... more sections
  ],
  
  // Common core section patterns:
  // 1. "The Pros: Why X Is Changing the Game" - Benefits/advantages
  // 2. "The Cons: What You Need to Know" - Drawbacks/considerations
  // 3. "You Should Get X If..." - Green flags/ideal scenarios
  // 4. "You Probably Shouldn't Get X If..." - Red flags/limitations
  // 5. "How to Choose the Right X for You" - Decision factors
  // 6. "The Bottom Line: Making Your Decision" - Summary/conclusion
  // 7. "Your Next Steps" - Action items
  
  // ============================================
  // FAQ SECTION
  // ============================================
  
  contextHeading: "string",           // FAQ section heading (e.g., "Answering Your Other Electric Bike Questions")
  contextFAQs: [                      // Array of FAQ objects (typically 5-7 FAQs)
    {
      question: "string",              // FAQ question
      answer: "string"                // Comprehensive answer (3-5 sentences, detailed and thorough)
    }
    // ... more FAQs
  ],
  
  // ============================================
  // KEY TAKEAWAYS
  // ============================================
  
  takeawayHeading: "string",          // Takeaways section heading (e.g., "Key Criteria for Your E-Bike Decision")
  takeawayBullets: [                  // Array of takeaway objects (typically 3-5 takeaways)
    {
      text: "string"                  // Key takeaway point (should be actionable or decision-oriented)
    }
    // ... more takeaways
  ],
  
  // ============================================
  // RELATED CONTENT
  // ============================================
  
  relatedGuides: [                    // Optional array of related article links
    {
      title: "string",               // Article title
      url: "string"                   // Article URL (e.g., "/electric-bikes/guide-slug")
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
   - Subheadline (optional)

2. **Opening/Hook Section**
   - Introduction paragraphs (if provided)
   - Hook quote (styled blockquote)
   - "What You'll Learn" box (roadmap)

3. **Hero Image** (4:3 aspect ratio)
   - Full-width image with rounded corners

4. **Top Products Intro** (Optional - only if `topProductsIntro` is provided)
   - Light background box with intro text

5. **What Is It / How It Works Section** (Optional)
   - Definition card
   - Types & variants card
   - Why consider it section

6. **Advantages/Benefits Section**
   - Grid of benefit cards (green theme)
   - Extracted from coreSections with "pros", "benefits", or "advantages" in title

7. **Drawbacks/Considerations Section**
   - Grid of drawback cards (amber theme)
   - Extracted from coreSections with "cons", "drawbacks", or "considerations" in title

8. **How to Decide/Choose Section**
   - Numbered checklist items
   - Self-audit questions (optional)

9. **Final Verdict/Summary Section** (Dark gradient background)
   - Summary paragraphs
   - Verdict text in styled box
   - Extracted from coreSections with "bottom line", "verdict", or "summary" in title

10. **Call to Action/Next Steps Section**
    - Action items grid
    - Invite text (optional)
    - Further reading resources (optional)
    - Extracted from coreSections with "next steps" or "call to action" in title

11. **Optional Extras Section**
    - Pullout quotes (optional)
    - "Did You Know?" facts (optional)
    - Comparison table (optional)

12. **Supporting Products** (Optional - if `supportingProducts` prop provided)
    - Grid of featured products

13. **FAQ Section** (If `contextFAQs` provided)
    - Expandable FAQ items
    - Questions and detailed answers

## Field Requirements Summary

### Required Fields (Must Have)
- `id`
- `slug`
- `categorySlug`
- `category`
- `contentType: "information"`
- `title`
- `h1`
- `metaDescription`
- `coreSections` (array with at least 1 section)

### Recommended Fields (Should Have)
- `introductionHeading`
- `introductionHook`
- `snippetAnswer`
- `roadmap`
- `coreHeading`
- `contextFAQs` (array with 5-7 FAQs)
- `takeawayHeading`
- `takeawayBullets` (array with 3-5 takeaways)
- `estimatedReadingTime`
- `publishedAt`
- `articleHeroImage`
- `heroImageAlt`

### Optional Fields (Nice to Have)
- `subheadline` / `subtitle`
- `introductionParagraphs`
- `secondaryIntroduction`
- `relatedGuides`
- `updatedAt`
- `whatIsItHeading`
- `whatIsItDefinition`
- `types`
- `whyConsider`
- `pulloutQuotes`
- `didYouKnow`
- `comparisonTable`

## Core Sections Structure

Each section in `coreSections` should have:

```javascript
{
  title: "string",        // Section heading (required)
  paragraphs: [           // Optional array of context paragraphs
    "Paragraph 1...",
    "Paragraph 2..."
  ],
  bullets: [              // Array of bullet objects (required for most sections)
    {
      text: "Detailed bullet point text. Can be multiple sentences with specific details, numbers, examples, or actionable advice."
    }
  ]
}
```

### Recommended Core Section Titles

1. **"The Pros: Why [Topic] Is Changing the Game"** - Benefits and advantages
2. **"The Cons: What You Need to Know"** - Drawbacks and considerations
3. **"You Should Get [X] If..."** - Ideal scenarios and green flags
4. **"You Probably Shouldn't Get [X] If..."** - Red flags and limitations
5. **"How to Choose the Right [X] for You"** - Decision factors and checklist
6. **"The Bottom Line: Making Your Decision"** - Summary and conclusion
7. **"Your Next Steps"** - Action items and next steps

## FAQ Structure

Each FAQ in `contextFAQs` should have:

```javascript
{
  question: "string",     // Clear, specific question
  answer: "string"        // Comprehensive answer (3-5 sentences, detailed and thorough)
}
```

### FAQ Best Practices

- **5-7 FAQs** per article
- Address common concerns and objections
- Include specific numbers, examples, and actionable information
- Cover edge cases and special scenarios
- Answer questions that naturally arise from the main content

## Takeaway Bullets Structure

Each takeaway in `takeawayBullets` should have:

```javascript
{
  text: "string"          // Actionable or decision-oriented takeaway point
}
```

### Takeaway Best Practices

- **3-5 takeaways** per article
- Should be actionable or decision-oriented
- Summarize key decision criteria
- Help readers make informed choices
- Be concise but meaningful

## Content Writing Guidelines

### Introduction Section

**introductionHeading**: 
- Create an engaging question or statement
- Examples: "Introduction: Should You Join the E-Bike Revolution?", "Introduction: Is [X] Right for You?"

**introductionHook**:
- Create a relatable scenario, ask a thought-provoking question, or make a bold statement
- Hook the reader immediately
- Paint a picture they can relate to

**snippetAnswer**:
- Direct answer to the main question in 2-3 sentences
- Include key benefits, costs, or decision factors
- This is what readers see first (like a featured snippet)

**roadmap**:
- Explain what the reader will learn
- Set expectations for content structure
- Build anticipation for the value they'll receive

### Core Sections

**Pros/Benefits Section**:
- Focus on specific, measurable benefits
- Include numbers, statistics, and real-world examples
- Explain why these benefits matter
- 4-8 detailed bullets recommended

**Cons/Considerations Section**:
- Be honest and transparent
- Address real drawbacks
- Help readers make informed decisions
- 4-8 detailed bullets recommended

**"You Should Get X If..." Section**:
- List specific scenarios where it makes sense
- Include conditions, use cases, and situations
- Help readers self-identify
- 5-7 bullets recommended

**"You Probably Shouldn't Get X If..." Section**:
- List red flags and limitations
- Help readers avoid bad decisions
- Be clear about when it's not a good fit
- 5-7 bullets recommended

**"How to Choose" Section**:
- Provide decision factors and checklist items
- Make it actionable and practical
- Help readers evaluate options
- 5-7 bullets recommended

**"Bottom Line" Section**:
- Summarize key points
- Provide clear conclusion or recommendation
- Tie everything together
- 1-3 paragraphs recommended

**"Next Steps" Section**:
- Provide actionable next steps
- Include specific actions readers can take
- Encourage engagement
- 4-6 action items recommended

### FAQ Answers

- **3-5 sentences** per answer
- Be comprehensive and thorough
- Include specific details, numbers, examples
- Address the question completely
- Anticipate follow-up questions

### Takeaway Bullets

- **Actionable or decision-oriented**
- Summarize key criteria
- Help readers make informed choices
- Be concise but meaningful
- Focus on what matters most

## Example Article Structure

```javascript
{
  id: "is-it-worth-getting-an-electric-bike-2025",
  slug: "is-it-worth-getting-an-electric-bike-2025",
  categorySlug: "electric-bikes",
  category: "Electric Bikes",
  contentType: "information",
  heroImage: "/images/products/hero6.jpg",
  cardImage: "/images/products/hero6.jpg",
  articleHeroImage: "/images/products/hero6.jpg",
  heroImageAlt: "Commuter riding an electric bike through city traffic",
  title: "Is It Worth Getting an Electric Bike? (A Complete 2025 Buyer's Guide)",
  h1: "Is It Worth Getting an Electric Bike? (A Complete 2025 Buyer's Guide)",
  introductionHeading: "Introduction: Should You Join the E-Bike Revolution?",
  introductionHook: "Picture this: You're cruising past a line of cars stuck in rush hour traffic...",
  snippetAnswer: "Yes, for most people, an electric bike is absolutely worth it. While the upfront cost ranges from $1,500 to $3,000...",
  roadmap: "In this guide, I'll walk you through everything you need to know: the real pros and cons...",
  metaDescription: "Wondering if an e-bike is worth it in 2025? Explore real-world costs, pros, cons, buyer profiles, and decision frameworks...",
  coreHeading: "The Core Truth: Weighing the Pros and Cons of Electric Bikes",
  coreSections: [
    {
      title: "The Pros: Why E-Bikes Are Changing the Game",
      paragraphs: ["Let's be honest about what you're getting into..."],
      bullets: [
        { text: "Massive cost savings over time: The average e-bike costs only around $200 per year..." },
        { text: "Beat traffic and save time: E-bikes let you zip through congested city streets..." }
        // ... more bullets
      ]
    },
    {
      title: "The Cons: What You Need to Know Before Buying",
      bullets: [
        { text: "High upfront cost: Depending on brand, features, and specifications..." },
        { text: "Battery considerations: Most e-bikes travel 20 to 50 miles per charge..." }
        // ... more bullets
      ]
    },
    {
      title: "You Should Get an E-Bike If...",
      paragraphs: ["These green flags signal that an e-bike will add real value..."],
      bullets: [
        { text: "You commute 5 to 15 miles to work. This is the sweet spot..." },
        { text: "You live in a congested urban or suburban area..." }
        // ... more bullets
      ]
    },
    {
      title: "You Probably Shouldn't Get an E-Bike If...",
      paragraphs: ["Watch for these red flags before you swipe your card."],
      bullets: [
        { text: "You have a very long commute (25-plus miles one way)..." },
        { text: "You live in an area with no bike infrastructure..." }
        // ... more bullets
      ]
    },
    {
      title: "How to Choose the Right Electric Bike for You",
      paragraphs: ["Ready to take the plunge? Work through these checkpoints..."],
      bullets: [
        { text: "Determine your primary use case. Urban commuting favors step-through frames..." },
        { text: "Set your budget. Under $1,500 means entry-level options..." }
        // ... more bullets
      ]
    },
    {
      title: "The Bottom Line: Making Your Decision",
      paragraphs: [
        "For most people—especially urban and suburban commuters within 15 miles of work—the answer is a resounding yes...",
        "Beyond the numbers, consider quality of life..."
      ]
    },
    {
      title: "Your Next Steps",
      paragraphs: ["Now that you understand what makes e-bikes worth it..."],
      bullets: [
        { text: "Calculate your potential savings honestly..." },
        { text: "Research local bike shops and schedule test rides..." }
        // ... more bullets
      ]
    }
  ],
  contextHeading: "Answering Your Other Electric Bike Questions",
  contextFAQs: [
    {
      question: "How long do electric bikes last?",
      answer: "With proper care, a quality e-bike frame can last 10 or more years. The battery is the main wear item..."
    },
    {
      question: "Are electric bikes good for exercise?",
      answer: "Absolutely. Electric bikes provide a low-impact workout with adjustable assistance..."
    }
    // ... more FAQs
  ],
  takeawayHeading: "Key Criteria for Your E-Bike Decision",
  takeawayBullets: [
    {
      text: "Say yes to an e-bike if your commute sits between 5 and 15 miles, you crave congestion-busting convenience..."
    },
    {
      text: "Skip the purchase (for now) if you face 25-mile one-way rides, unsafe roads without bike lanes..."
    },
    {
      text: "Remember that the best e-bike isn't the one with the most features or lowest price—it's the one you're most excited to ride..."
    }
  ],
  relatedGuides: [],
  publishedAt: "2025-11-12T09:00:00.000Z",
  updatedAt: "2025-11-12T09:00:00.000Z",
  estimatedReadingTime: 12
}
```

## Notes for AI Content Generation

When generating informational articles:

1. **Maintain consistency** - Use the same structure for all articles
2. **Fill all required fields** - Don't skip required fields
3. **Use detailed bullets** - Each bullet should be comprehensive (multiple sentences with specifics)
4. **Include numbers and examples** - Make content concrete and actionable
5. **Be honest about cons** - Build trust with balanced information
6. **Answer FAQs thoroughly** - 3-5 sentences per answer, be comprehensive
7. **Make takeaways actionable** - Help readers make decisions
8. **Link internally** - Use relatedGuides to connect related content
9. **Optimize for SEO** - But prioritize user experience and helpfulness
10. **Follow the section patterns** - Use recommended section titles for consistency

This structure ensures all informational articles have a consistent format while allowing flexibility for different topics and content needs. The component automatically extracts sections based on title patterns, so using consistent naming helps ensure proper rendering.

