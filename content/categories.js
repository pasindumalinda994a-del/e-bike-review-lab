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
    heroImage: "/images/categories/electric-bikes.webp",
    description:
      "Hands-on electric bike reviews covering commuters, folders, cargo rigs, and all-terrain builds to help you choose the perfect ride.",
  },
  {
    slug: "electric-mountain-bikes",
    name: "Electric Mountain Bikes",
    heroImage: "/images/categories/electric-mountain-bikes.webp",
    description:
      "Hands-on electric bike reviews covering commuters, folders, cargo rigs, and all-terrain builds to help you choose the perfect ride.",
  },
  {
    slug: "electric-folding-bikes",
    name: "Electric Folding Bikes",
    heroImage: "/images/categories/electric-folding-bikes.webp",
    description:
      "Hands-on electric bike reviews covering commuters, folders, cargo rigs, and all-terrain builds to help you choose the perfect ride.",
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
