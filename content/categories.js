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
    heroImage: "/images/categories/Electric Bikes.webp",
    description:
      "Hands-on electric bike reviews covering commuters, folders, cargo rigs, and all-terrain builds to help you choose the perfect ride.",
  },
  {
    slug: "electric-mountain-bikes",
    name: "Electric Mountain Bikes",
    heroImage: "/images/categories/Electric Mountain Bikes.webp",
    description:
      "Hands-on electric bike reviews covering commuters, folders, cargo rigs, and all-terrain builds to help you choose the perfect ride.",
  },
  {
    slug: "electric-folding-bikes",
    name: "Electric Folding Bikes",
    heroImage: "/images/categories/Electric Folding Bikes.webp",
    description:
      "Hands-on electric bike reviews covering commuters, folders, cargo rigs, and all-terrain builds to help you choose the perfect ride.",
  },
  {
    slug: "electric-road-bikes",
    name: "Electric Road Bikes",
    heroImage: "/images/categories/Electric Road Bikes.webp",
    description:
      "Comprehensive reviews of electric road bikes for performance riders, commuters, and cycling enthusiasts seeking lightweight e-road bike options.",
  },
  {
    slug: "electric-cargo-bikes",
    name: "Electric Cargo Bikes",
    heroImage: "/images/categories/Electric Cargo Bikes.webp",
    description:
      "In-depth reviews of electric cargo bikes for families, businesses, and anyone looking to replace car trips with a powerful hauler.",
  },
  {
    slug: "electric-city-bikes",
    name: "Electric City Bikes",
    heroImage: "/images/categories/Electric City Bikes.webp",
    description:
      "Comprehensive reviews of electric city bikes for urban commuters, daily riders, and anyone seeking the perfect e-bike for navigating city streets.",
  },
  {
    slug: "electric-commuter-bikes",
    name: "Electric Commuter Bikes",
    heroImage: "/images/categories/Electric City Bikes.webp",
    description:
      "Field-tested electric commuter e-bike reviews focused on daily rides: torque sensors, racks and fenders, theft protection, and real-world range for 10–30 mile round trips.",
  },
  {
    slug: "electric-fat-bikes",
    name: "Electric Fat Bikes",
    heroImage: "/images/categories/Electric Fat Bikes.webp",
    description:
      "In-depth reviews of electric fat bikes for all-terrain adventures, winter riding, and off-road enthusiasts seeking maximum traction and capability.",
  },
  {
    slug: "electric-cruiser-bikes",
    name: "Electric Cruiser Bikes",
    heroImage: "/images/categories/Electric Cruiser Bikes.webp",
    description:
      "Comprehensive reviews of electric cruiser bikes for beach rides, leisure cycling, and comfortable commuting with relaxed, upright riding positions.",
  },
  {
    slug: "electric-hybrid-bikes",
    name: "Electric Hybrid Bikes",
    heroImage: "/images/categories/Electric Hybrid Bikes.webp",
    description:
      "Expert reviews of electric hybrid bikes combining road bike efficiency with mountain bike versatility for commuting, fitness, and adventure riding.",
  },
  {
    slug: "retrospec",
    name: "Retrospec",
    heroImage: "/images/categories/Retrospec.png",
    description:
      "In-depth Retrospec e-bike reviews: beach cruisers, commuters, and value-focused builds tested for real-world range, comfort, and reliability.",
  },
  {
    slug: "velotric",
    name: "Velotric",
    heroImage: "/images/electric-bikes/velotric-discover-3.webp",
    description:
      "In-depth Velotric e-bike reviews: commuters and all-rounders tested for real-world range, motor performance, and everyday usability.",
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
