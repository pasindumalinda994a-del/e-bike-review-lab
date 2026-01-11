# Money Article Heading Hierarchy

## Complete Heading Structure

This document outlines the complete heading hierarchy for the Money Article (`MoneyArticle.js`) and all its related components.

---

## Level 1 (H1) - Main Page Title

**Location**: `components/articles/MoneyArticle.js` (line 65)
- **Source**: `post.h1` from `content/posts/money.js`
- **Count**: **1 per page** (SEO requirement - only one H1 allowed)
- **Rendering**: Always rendered if `post.h1` exists
- **Example**: "The 10 Best E-Bikes I've Tested for Every Rider and Budget"

---

## Level 2 (H2) - Major Section Headings

### 1. Top Products Intro Heading
- **Location**: `components/articles/MoneyArticle.js` (line 119)
- **Source**: `post.topProductsIntroHeading`
- **Conditional**: Only renders if `post.topProductsIntro` exists
- **ID**: `id="top-products-intro"`
- **Example**: "How I Tested These Bikes"

### 2. Comparison Table Title
- **Location**: `components/ComparisonTable.js` (line 125)
- **Source**: `comparison.title` from `post.comparisonTable`
- **Conditional**: Only renders if comparison table data exists (`comparison.title` and `comparison.ctaLabel` and comparison data array)
- **ID**: `id="comparison-table"`
- **Example**: "Quick Comparison: Top Electric Bikes"

### 3. Detailed Product Reviews Section Heading
- **Location**: `components/DetailedProductReviews.js` (line 521)
- **Source**: `post.topProductsHeading` (passed as `heading` prop)
- **Conditional**: Only renders if `post.topProductsHeading` and `post.productCtaLabel` exist
- **ID**: `id="detailed-reviews"`
- **Example**: "The 10 Best Electric Bikes I've Actually Tested"

### 4. Individual Product Review Titles (Multiple H2s)
- **Location**: `components/DetailedProductReviews.js` (line 358)
- **Source**: `product.name` (product name part 1, before " - ")
- **Count**: **One H2 per product** in the `products` array (typically 7-10 products)
- **Rendering**: Each product review card has its own H2 heading
- **Structure**: Includes rank prefix (e.g., "1. ") if `product.rank` exists
- **Note**: This creates multiple H2s on the page, which is acceptable for sectioning
- **Example**: "Aventon Level 3" (with rank prefix: "1. Aventon Level 3")

### 5. Buyer's Guide Title
- **Location**: `components/articles/MoneyArticle.js` (line 151) OR `components/BuyersGuide.js` (line 28)
- **Source**: `post.buyersGuideTitle`
- **Conditional**: 
  - Renders in `MoneyArticle.js` if `hasBuyersGuideSections` is true (when `buyersGuideSections` array exists)
  - OR renders via `BuyersGuide.js` if `post.buyersGuide` exists (fallback for unstructured content)
- **ID**: `id="buyers-guide-heading"` (in MoneyArticle.js) or `id="buyers-guide"` (in BuyersGuide.js)
- **Example**: "Complete Buyer's Guide: Everything You Need Before Buying"

### 6. FAQ Section Title
- **Location**: `components/articles/MoneyArticle.js` (line 223)
- **Source**: `post.faqTitle`
- **Conditional**: Only renders if FAQ array exists (`post.faq` is array with items) and `post.faqTitle` exists
- **ID**: `id="faq-heading"`
- **Example**: "Your Electric Bike Questions Answered"
- **Note**: FAQ questions use `<summary>` elements (not headings) for accessibility

### 7. Internal Links Section Title
- **Location**: `components/articles/MoneyArticle.js` (line 288)
- **Source**: `post.internalLinksTitle`
- **Conditional**: Only renders if `post.internalLinks` is array with items and `post.internalLinksTitle` exists
- **ID**: `id="related-content"`
- **Example**: "Related Articles"

---

## Level 3 (H3) - Subsection Headings

### 1. Buyer's Guide Section Headings (Multiple H3s)
- **Location**: `components/articles/MoneyArticle.js` (line 185)
- **Source**: `section.title` from `post.buyersGuideSections[]` array
- **Count**: **One H3 per section** in the `buyersGuideSections` array (typically 3-8 sections)
- **Rendering**: Each buyer's guide section has its own H3 heading
- **Parent**: Buyer's Guide Section (H2)
- **Example**: "Understanding E-Bike Motors: What Actually Matters"

### 2. Within Individual Product Reviews (Multiple H3s per product)

Each product review card (`ProductReviewCard`) contains the following H3 headings:

#### a. Key Features
- **Location**: `components/DetailedProductReviews.js` (line 443)
- **Source**: Hardcoded "Key Features"
- **Rendering**: Always rendered (unless no `keyFeatures` data exists, in which case the section doesn't render)
- **Parent**: Individual Product Review (H2)

#### b. Performance Notes (Conditional)
- **Location**: `components/DetailedProductReviews.js` (line 450)
- **Source**: Hardcoded "Performance Notes"
- **Conditional**: Only renders if `product.performanceNotes` exists (array or single value)
- **Parent**: Individual Product Review (H2)

#### c. Who It's Best For (Conditional)
- **Location**: `components/DetailedProductReviews.js` (line 467)
- **Source**: Hardcoded "Who It's Best For"
- **Conditional**: Only renders if `product.whoItsBestFor` exists
- **Parent**: Individual Product Review (H2)

#### d. Pros
- **Location**: `components/DetailedProductReviews.js` (line 477)
- **Source**: Hardcoded "Pros"
- **Rendering**: Always rendered (the `ProsConsSection` component handles empty state)
- **Parent**: Individual Product Review (H2)

#### e. Cons
- **Location**: `components/DetailedProductReviews.js` (line 481)
- **Source**: Hardcoded "Cons"
- **Rendering**: Always rendered (the `ProsConsSection` component handles empty state)
- **Parent**: Individual Product Review (H2)

### 3. Performance Ratings (Sidebar - within product review)
- **Location**: `components/DetailedProductReviews.js` (line 109)
- **Source**: Hardcoded "Performance Ratings"
- **Rendering**: Only renders if `product.performanceRatings` exists (array with items)
- **Parent**: Individual Product Review (H2)
- **Context**: Within the `ReviewChart` component in the sidebar (not part of main content hierarchy, but technically an H3)
- **Note**: This is within a sidebar component and not part of the main article content flow

---

## Summary Statistics

### Total Headings Per Article (Typical)

- **H1**: **1** (always)
- **H2**: **13-20+** (depending on content)
  - 1 Top Products Intro (conditional)
  - 1 Comparison Table (conditional)
  - 1 Detailed Reviews Section
  - **7-10** Product Review Titles (one per product)
  - 1 Buyer's Guide (conditional)
  - 1 FAQ Section (conditional)
  - 1 Internal Links (conditional)

- **H3**: **40-80+** (depending on content)
  - **3-8** Buyer's Guide subsections
  - **35-50** per product review (5 H3s × 7-10 products):
    - Key Features (1 per product)
    - Performance Notes (1 per product, conditional)
    - Who It's Best For (1 per product, conditional)
    - Pros (1 per product)
    - Cons (1 per product)
  - **7-10** Performance Ratings (in sidebar, conditional)

---

## Heading Hierarchy Flow

```
H1: Main Article Title
  └── H2: Top Products Intro (conditional)
  └── H2: Comparison Table Title (conditional)
  └── H2: Detailed Product Reviews Section
      └── H2: Product 1 Review Title
          └── H3: Key Features
          └── H3: Performance Notes (conditional)
          └── H3: Who It's Best For (conditional)
          └── H3: Pros
          └── H3: Cons
          └── H3: Performance Ratings (sidebar, conditional)
      └── H2: Product 2 Review Title
          └── [Same H3 structure]
      └── ... (7-10 products total)
  └── H2: Buyer's Guide Title (conditional)
      └── H3: Buyer's Guide Section 1
      └── H3: Buyer's Guide Section 2
      └── ... (3-8 sections total)
  └── H2: FAQ Section Title (conditional)
      └── [FAQ questions use <summary> elements, not headings]
  └── H2: Internal Links Section Title (conditional)
```

---

## SEO Considerations

✅ **Correct Hierarchy**: H1 → H2 → H3 (no skipped levels)
✅ **Single H1**: Only one H1 per page (SEO best practice)
✅ **Logical Structure**: Headings follow content flow and semantic meaning
✅ **Multiple H2s**: Many H2s are acceptable for long-form content and proper sectioning
✅ **Product Reviews**: Each product review uses H2, which is correct for sectioning multiple products
✅ **Accessibility**: All headings have appropriate IDs for anchor links and ARIA labels

⚠️ **Notes**:
- Multiple H2s are used intentionally for proper content sectioning (products, buyer's guide sections)
- Product review H2s create multiple sections, which is semantically correct for a roundup article
- FAQ questions use `<summary>` elements (not headings) for better accessibility with `<details>` elements

---

## Component File Reference

| Component | File Path | Primary Heading Level |
|-----------|-----------|----------------------|
| MoneyArticle | `components/articles/MoneyArticle.js` | H1, H2 (main sections) |
| ComparisonTable | `components/ComparisonTable.js` | H2 |
| DetailedProductReviews | `components/DetailedProductReviews.js` | H2 (section + products), H3 (subsections) |
| BuyersGuide | `components/BuyersGuide.js` | H2 (fallback only) |
| ProductReviewCard | `components/DetailedProductReviews.js` (internal) | H2 (product title), H3 (sections) |
| ReviewChart | `components/DetailedProductReviews.js` (internal) | H3 (sidebar) |

---

## Data Source

All heading text comes from `content/posts/money.js`:
- `h1` → Main article title (H1)
- `topProductsIntroHeading` → Top products intro (H2)
- `comparisonTable.title` → Comparison table (H2)
- `topProductsHeading` → Detailed reviews section (H2)
- `products[].name` → Individual product titles (H2)
- `buyersGuideTitle` → Buyer's guide section (H2)
- `buyersGuideSections[].title` → Buyer's guide subsections (H3)
- `faqTitle` → FAQ section (H2)
- `internalLinksTitle` → Internal links section (H2)

Product review H3s (Key Features, Performance Notes, etc.) are hardcoded in `DetailedProductReviews.js` component.
