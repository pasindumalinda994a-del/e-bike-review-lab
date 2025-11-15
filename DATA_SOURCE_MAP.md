# Data Source Map: Where Each Title/Heading Comes From

## Overview
Your site displays titles and headings from **multiple data sources**, not just `money.js`. Here's where each piece comes from:

---

## 1. "Best Electric Bike Reviews & Buying Guides 2025"
**Source:** `lib/seo-helpers.js` (line 390-391)
```javascript
const focusKeyword = `Best Electric Bike Reviews`;
const heroHeading = `${focusKeyword} & Buying Guides ${currentYear}`;
```
**Used in:** Homepage (`app/page.js`)

---

## 2. "Independent Electric Bike Reviews & Buying Guides"
**Source:** `lib/seo.js` (line 3)
```javascript
export const SITE_TAGLINE = 'Independent Electric Bike Reviews & Buying Guides';
```
**Used in:** Site-wide tagline (header, footer, metadata)

---

## 3. "Is It Worth Getting an Electric Bike? (A Complete 2025 Buyer's Guide)"
**Source:** `content/posts/informational.js` (lines 14-15)
```javascript
title: "Is It Worth Getting an Electric Bike? (A Complete 2025 Buyer's Guide)",
h1: "Is It Worth Getting an Electric Bike? (A Complete 2025 Buyer's Guide)",
```
**Used in:** Informational article page (NOT from `money.js`)

---

## 4. "Wondering if an e-bike is worth it in 2025? Explore real-world costs, pros, cons, buyer profiles, and decision frameworks in this complete electric bike guide."
**Source:** `content/posts/informational.js` (line 24)
```javascript
metaDescription: "Wondering if an e-bike is worth it in 2025? Explore real-world costs, pros, cons, buyer profiles, and decision frameworks in this complete electric bike guide.",
```
**Used in:** Meta description for the informational article

---

## Data Flow Summary

```
┌─────────────────────────────────────────────────────────┐
│                    DATA SOURCES                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. money.js                                            │
│     └─> Product review articles (contentType: "money")  │
│                                                          │
│  2. informational.js                                     │
│     └─> Guide articles (contentType: "information")    │
│         • "Is It Worth Getting an Electric Bike?"        │
│                                                          │
│  3. lib/seo.js                                          │
│     └─> Site-wide constants                             │
│         • SITE_TAGLINE                                  │
│         • SITE_NAME                                     │
│         • DEFAULT_DESCRIPTION                           │
│                                                          │
│  4. lib/seo-helpers.js                                  │
│     └─> Dynamic SEO generation                          │
│         • buildHomeSeo() → Homepage title               │
│         • buildArticleSeo() → Article titles            │
│                                                          │
└─────────────────────────────────────────────────────────┘
         │
         │ Combined in content/posts/index.js
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│              USED BY PAGES                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  • app/page.js → Homepage                               │
│  • app/[category]/[slug]/page.js → Article pages       │
│  • components/Hero.js → Hero section                    │
│  • components/articles/MoneyArticle.js → Money posts   │
│  • components/articles/InformationalArticle.js → Info   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## How to Update Each Title

### Homepage Title
**File:** `lib/seo-helpers.js`
**Function:** `buildHomeSeo()` (line 388-439)
```javascript
const focusKeyword = `Best Electric Bike Reviews`; // ← Change this
```

### Site Tagline
**File:** `lib/seo.js`
```javascript
export const SITE_TAGLINE = 'Independent Electric Bike Reviews & Buying Guides'; // ← Change this
```

### "Is It Worth Getting..." Article
**File:** `content/posts/informational.js`
**Lines:** 14-15, 24
```javascript
title: "Is It Worth Getting an Electric Bike? (A Complete 2025 Buyer's Guide)", // ← Change this
h1: "Is It Worth Getting an Electric Bike? (A Complete 2025 Buyer's Guide)", // ← Change this
metaDescription: "Wondering if an e-bike is worth it in 2025?..." // ← Change this
```

### Money Article Titles
**File:** `content/posts/money.js`
Each article object has:
- `title` - Article title
- `h1` - Main heading
- `seoTitle` - SEO title
- `metaDescription` - Meta description

---

## Key Takeaway

**`money.js` only contains product review articles.** The titles you're seeing come from:
- ✅ `money.js` - Product reviews
- ✅ `informational.js` - Guide articles (like "Is It Worth Getting...")
- ✅ `lib/seo-helpers.js` - Homepage title generation
- ✅ `lib/seo.js` - Site-wide tagline

All articles are combined in `content/posts/index.js` and used throughout the app.

