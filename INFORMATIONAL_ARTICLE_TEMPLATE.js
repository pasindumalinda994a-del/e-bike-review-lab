// Template for creating new informational articles
// Copy this structure and fill in the content for your new article

export const newInformationalArticle = {
  // ============================================
  // REQUIRED FIELDS
  // ============================================
  id: "your-article-id-slug-here",
  slug: "your-article-id-slug-here",
  categorySlug: "your-category-slug",
  category: "Your Category Name",
  contentType: "information", // Always "information"
  
  // ============================================
  // SEO & METADATA
  // ============================================
  title: "Your Full Article Title Here (Include Year if Relevant)",
  h1: "Your Full Article Title Here (Usually Same as Title)",
  metaDescription: "SEO meta description (150-160 characters). Include main keyword and value proposition.",
  
  // ============================================
  // IMAGES
  // ============================================
  heroImage: "/default-og.png", // Replace with your article's hero image path
  cardImage: "/default-og.png", // Replace with your article's card image path
  articleHeroImage: "/default-og.png", // Replace with your article's hero image path
  heroImageAlt: "Descriptive alt text for the hero image",
  
  // ============================================
  // INTRODUCTION SECTION
  // ============================================
  introductionHeading: "Introduction: Your Engaging Question or Statement",
  introductionHook: "Your compelling opening paragraph here. Create a relatable scenario, ask a thought-provoking question, or make a bold statement that hooks the reader immediately.",
  snippetAnswer: "Your direct answer to the main question in 2-3 sentences. Include key benefits, costs, or decision factors. This is what readers see first.",
  roadmap: "Explain what the reader will learn in this guide. Set expectations for the content structure and what they'll gain from reading.",
  
  // ============================================
  // PUBLICATION INFO
  // ============================================
  estimatedReadingTime: 12, // Minutes (calculate based on word count: 200-250 words per minute)
  publishedAt: "2025-01-15T09:00:00.000Z", // ISO date string
  updatedAt: "2025-01-15T09:00:00.000Z", // ISO date string (optional)
  
  // ============================================
  // CORE CONTENT SECTIONS
  // ============================================
  coreHeading: "Your Main Core Section Heading (e.g., 'The Core Truth: Weighing the Pros and Cons')",
  
  coreSections: [
    {
      title: "The Pros: Why [Topic] Is Changing the Game",
      paragraphs: [
        "Optional introductory paragraph for this section. Sets context before the bullets."
      ],
      bullets: [
        {
          text: "First detailed bullet point. Can be multiple sentences. Should be comprehensive and informative with specific details, numbers, or examples. Include concrete benefits and real-world impact."
        },
        {
          text: "Second bullet point with detailed information. Make it specific and actionable."
        },
        {
          text: "Third bullet point. Continue adding 4-8 bullets per section."
        }
        // Add 4-8 bullets total for this section
      ]
    },
    {
      title: "The Cons: What You Need to Know",
      bullets: [
        {
          text: "First drawback or consideration. Be honest and transparent. Include specific details about limitations or challenges."
        },
        {
          text: "Second consideration. Help readers make informed decisions."
        },
        {
          text: "Third consideration. Continue adding 4-8 bullets."
        }
        // Add 4-8 bullets total for this section
      ]
    },
    {
      title: "You Should Get [X] If...",
      paragraphs: [
        "Optional opening paragraph explaining what green flags to look for."
      ],
      bullets: [
        {
          text: "First scenario or condition where this makes sense. Be specific about the situation or use case."
        },
        {
          text: "Second scenario. Help readers self-identify if this is right for them."
        },
        {
          text: "Third scenario. Continue adding 5-7 bullets."
        }
        // Add 5-7 bullets total for this section
      ]
    },
    {
      title: "You Probably Shouldn't Get [X] If...",
      paragraphs: [
        "Optional opening paragraph about red flags to watch for."
      ],
      bullets: [
        {
          text: "First red flag or limitation. Be clear about when this might not be a good fit."
        },
        {
          text: "Second red flag. Help readers avoid bad decisions."
        },
        {
          text: "Third red flag. Continue adding 5-7 bullets."
        }
        // Add 5-7 bullets total for this section
      ]
    },
    {
      title: "How to Choose the Right [X] for You",
      paragraphs: [
        "Optional opening paragraph about decision factors."
      ],
      bullets: [
        {
          text: "First decision factor or consideration. Make it actionable and practical."
        },
        {
          text: "Second decision factor. Help readers evaluate their options."
        },
        {
          text: "Third decision factor. Continue adding 5-7 factors."
        }
        // Add 5-7 bullets total for this section
      ]
    },
    {
      title: "The Bottom Line: Making Your Decision",
      paragraphs: [
        "Summary paragraph that ties everything together. Provide a clear conclusion or recommendation. This should be 1-3 paragraphs that synthesize the key points."
      ]
      // This section typically doesn't have bullets, just paragraphs
    },
    {
      title: "Your Next Steps",
      paragraphs: [
        "Closing paragraph that encourages action and provides direction."
      ],
      bullets: [
        {
          text: "First actionable step or recommendation. Be specific about what readers should do."
        },
        {
          text: "Second actionable step."
        },
        {
          text: "Third actionable step. Include 4-6 action items total."
        }
        // Add 4-6 bullets total for this section
      ]
    }
  ],
  
  // ============================================
  // FAQ SECTION
  // ============================================
  contextHeading: "Answering Your Other Questions",
  contextFAQs: [
    {
      question: "First frequently asked question?",
      answer: "Comprehensive answer to the question. Should be detailed (3-5 sentences) and address the question thoroughly. Include specific details, numbers, examples, and actionable information."
    },
    {
      question: "Second frequently asked question?",
      answer: "Detailed answer covering all aspects of this question. Be thorough and anticipate follow-up questions."
    },
    {
      question: "Third frequently asked question?",
      answer: "Another comprehensive answer. Include 5-7 FAQs total."
    },
    {
      question: "Fourth frequently asked question?",
      answer: "Answer here."
    },
    {
      question: "Fifth frequently asked question?",
      answer: "Answer here."
    }
    // Add 5-7 FAQs total
  ],
  
  // ============================================
  // KEY TAKEAWAYS
  // ============================================
  takeawayHeading: "Key Criteria for Your Decision",
  takeawayBullets: [
    {
      text: "First key takeaway point. Should be actionable or decision-oriented. Summarize key decision criteria."
    },
    {
      text: "Second key takeaway point. Help readers make informed choices."
    },
    {
      text: "Third key takeaway point. Include 3-5 takeaways total."
    }
    // Add 3-5 takeaways total
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
✓ id
✓ slug
✓ categorySlug
✓ category
✓ contentType: "information"
✓ title
✓ h1
✓ metaDescription
✓ coreSections (at least 1 section)

RECOMMENDED FIELDS:
✓ introductionHeading
✓ introductionHook
✓ snippetAnswer
✓ roadmap
✓ coreHeading
✓ contextFAQs (5-7 FAQs)
✓ takeawayHeading
✓ takeawayBullets (3-5 takeaways)
✓ estimatedReadingTime
✓ publishedAt
✓ articleHeroImage
✓ heroImageAlt

OPTIONAL FIELDS:
- subheadline / subtitle
- introductionParagraphs
- secondaryIntroduction
- relatedGuides
- updatedAt
- whatIsItHeading
- whatIsItDefinition
- types
- whyConsider
- pulloutQuotes
- didYouKnow
- comparisonTable

CORE SECTIONS REQUIREMENTS (each section should have):
✓ title (required)
- paragraphs (array, optional)
- bullets (array, typically required for most sections)

RECOMMENDED CORE SECTION TITLES:
1. "The Pros: Why [Topic] Is Changing the Game"
2. "The Cons: What You Need to Know"
3. "You Should Get [X] If..."
4. "You Probably Shouldn't Get [X] If..."
5. "How to Choose the Right [X] for You"
6. "The Bottom Line: Making Your Decision"
7. "Your Next Steps"

FAQ REQUIREMENTS (each FAQ must have):
✓ question
✓ answer (3-5 sentences, comprehensive)

TAKEAWAY REQUIREMENTS (each takeaway must have):
✓ text (actionable or decision-oriented)

CONTENT GUIDELINES:
- Use detailed bullets (multiple sentences with specifics)
- Include numbers, statistics, and examples
- Be honest about cons
- Answer FAQs thoroughly (3-5 sentences)
- Make takeaways actionable
- Follow recommended section patterns
*/

