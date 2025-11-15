/**
 * Category Configuration
 * 
 * Defines all content categories available on the site.
 * Each category includes metadata for navigation, SEO, and display purposes.
 */

export const categories = [
  {
    slug: "electric-bikes",
    name: "Electric Bikes",
    heroImage: "/images/products/hero1.jpg",
    description:
      "Hands-on electric bike reviews covering commuters, folders, cargo rigs, and all-terrain builds to help you choose the perfect ride.",
  },
  {
    slug: "electric-mountain-bikes",
    name: "Electric Mountain Bikes",
    heroImage: "/images/products/hero2.jpg",
    description:
      "In-depth electric mountain bike reviews focused on mid-drive power, suspension travel, and trail-tested durability for every kind of terrain.",
  },
  {
    slug: "electric-folding-bikes",
    name: "Electric Folding Bikes",
    heroImage: "/images/products/hero3.jpg",
    description:
      "Compact electric folding bike reviews that balance portability, range, and ride quality for commuters, RV travelers, and space-conscious riders.",
  },
  {
    slug: "electric-road-bikes",
    name: "Electric Road Bikes",
    heroImage: "/images/products/hero2.jpg",
    description:
      "Lightweight electric road bike reviews focused on endurance range, stealthy assists, and premium performance for long pavements rides.",
  },
  {
    slug: "electric-cargo-bikes",
    name: "Electric Cargo Bikes",
    heroImage: "/images/products/hero5.jpg",
    description:
      "Electric cargo bike reviews covering longtails, front-loaders, and compact haulers built to replace car trips with pedal-assist utility.",
  },
  {
    slug: "electric-city-bikes",
    name: "Electric City Bikes",
    heroImage: "/images/products/hero1.jpg",
    description:
      "Electric city bike reviews spotlighting lightweight commuters, step-through frames, and tech-savvy urban rides built to navigate packed streets.",
  },
  {
    slug: "electric-fat-bikes",
    name: "Electric Fat Bikes",
    heroImage: "/images/products/hero4.jpg",
    description:
      "Electric fat bike reviews covering snow-ready monsters, folding fatties, and full-suspension beasts built to float over sand, snow, and singletrack.",
  },
];

/**
 * Helper Functions
 */

/**
 * Get a category by its slug
 * @param {string} slug - Category slug
 * @returns {Object|null} Category object or null if not found
 */
export function getCategoryBySlug(slug) {
  if (!slug) return null;
  return categories.find((cat) => cat.slug === slug) ?? null;
}

/**
 * Get all category slugs as an array
 * @returns {string[]} Array of category slugs
 */
export function getAllCategorySlugs() {
  return categories.map((cat) => cat.slug);
}

/**
 * Check if a category exists
 * @param {string} slug - Category slug to check
 * @returns {boolean} True if category exists
 */
export function categoryExists(slug) {
  return categories.some((cat) => cat.slug === slug);
}

/**
 * Get categories as a map for quick lookups
 * @returns {Map<string, Object>} Map of slug to category object
 */
export function getCategoriesMap() {
  return new Map(categories.map((cat) => [cat.slug, cat]));
}
