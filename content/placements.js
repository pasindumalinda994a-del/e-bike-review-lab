/**
 * Content Placements Configuration
 * 
 * Controls which posts appear in specific locations across the site.
 * Use "category-slug/post-slug" format for post identifiers.
 * 
 * Structure:
 * - home: Homepage placements (hero, showcase, gallery)
 * - categories: Category page sidebar selections
 * - posts: Individual post sidebar overrides
 */

export const placements = {
  // ============================================================
  // HOMEPAGE PLACEMENTS
  // ============================================================
  home: {
    // Hero carousel slides (featured posts)
    hero: [
      "electric-bikes/best-electric-bikes",
      "electric-bikes/is-it-worth-getting-electric-bike",
   
    ],

    // Main content area under hero
    showcase: {
      // Four cards in the main grid
      latest: [
        "electric-bikes/best-electric-bikes",
        "electric-bikes/is-it-worth-getting-electric-bike",
       
      ],

      // Sidebar items next to the grid
      sidebar: [
        "electric-bikes/best-electric-bikes",
        "electric-bikes/is-it-worth-getting-electric-bike",
      ]
    },

    // Image gallery section further down the homepage
    gallery: [
      "electric-bikes/is-it-worth-getting-electric-bike",
 
    ],
  },

  // ============================================================
  // CATEGORY PAGE SIDEBAR SELECTIONS
  // ============================================================
  categories: {
    "electric-bikes": {
      sidebar: [
        "electric-bikes/best-electric-bikes",
        "electric-bikes/is-it-worth-getting-an-electric-bikes",
   
      ],
    },
    "electric-mountain-bikes": {
      sidebar: [
     
      ],
    },
   
  },

  // ============================================================
  // INDIVIDUAL POST SIDEBAR OVERRIDES
  // ============================================================
  posts: {
    "electric-bikes/best-electric-bikes": {
      sidebar: [
        "electric-bikes/best-electric-bikes",
        "electric-bikes/is-it-worth-getting-electric-bike",

      ],
    },
    "electric-mountain-bikes/best-electric-mountain-bikes": {
      sidebar: [

      ],
    },
    "electric-bikes/is-it-worth-getting-electric-bike": {
      sidebar: [
        "electric-bikes/best-electric-bikes",
        "electric-bikes/is-it-worth-getting-electric-bike",

      ],
    },
  },
};

/**
 * Helper Functions
 */

/**
 * Get homepage placements
 * @returns {Object} Homepage placement configuration
 */
export function getHomePlacements() {
  return placements.home ?? {};
}

/**
 * Get category sidebar placements
 * @param {string} categorySlug - Category slug
 * @returns {string[]} Array of post identifiers for sidebar
 */
export function getCategorySidebar(categorySlug) {
  if (!categorySlug) return [];
  const categoryConfig = placements.categories?.[categorySlug];
  return categoryConfig?.sidebar ?? [];
}

/**
 * Get post-specific sidebar placements
 * @param {string} postKey - Post key in format "category-slug/post-slug"
 * @returns {string[]} Array of post identifiers for sidebar
 */
export function getPostSidebar(postKey) {
  if (!postKey) return [];
  const postConfig = placements.posts?.[postKey.toLowerCase()];
  return postConfig?.sidebar ?? [];
}

/**
 * Get all placement keys for a specific post
 * @param {string} categorySlug - Category slug
 * @param {string} postSlug - Post slug
 * @returns {Object} All placements for the post
 */
export function getPostPlacements(categorySlug, postSlug) {
  const postKey = `${categorySlug}/${postSlug}`.toLowerCase();
  const postConfig = placements.posts?.[postKey] ?? {};
  const categoryConfig = placements.categories?.[categorySlug] ?? {};

  return {
    sidebar: postConfig.sidebar ?? categoryConfig.sidebar ?? [],
    related: postConfig.related ?? [],
    popular: postConfig.popular ?? [],
  };
}

/**
 * Check if a post is featured in homepage hero
 * @param {string} categorySlug - Category slug
 * @param {string} postSlug - Post slug
 * @returns {boolean} True if post is in hero
 */
export function isHeroPost(categorySlug, postSlug) {
  const postKey = `${categorySlug}/${postSlug}`.toLowerCase();
  const heroPosts = placements.home?.hero ?? [];
  return heroPosts.some((key) => key.toLowerCase() === postKey);
}

/**
 * Get all unique post keys from all placements
 * @returns {Set<string>} Set of all post keys used in placements
 */
export function getAllPlacementKeys() {
  const keys = new Set();

  // Homepage placements
  const home = placements.home ?? {};
  [...(home.hero ?? []), ...(home.gallery ?? [])].forEach((key) => keys.add(key.toLowerCase()));
  const showcase = home.showcase ?? {};
  [...(showcase.latest ?? []), ...(showcase.sidebar ?? [])].forEach((key) => keys.add(key.toLowerCase()));

  // Category sidebars
  Object.values(placements.categories ?? {}).forEach((config) => {
    (config.sidebar ?? []).forEach((key) => keys.add(key.toLowerCase()));
  });

  // Post sidebars
  Object.values(placements.posts ?? {}).forEach((config) => {
    (config.sidebar ?? []).forEach((key) => keys.add(key.toLowerCase()));
    (config.related ?? []).forEach((key) => keys.add(key.toLowerCase()));
    (config.popular ?? []).forEach((key) => keys.add(key.toLowerCase()));
  });

  return keys;
}
