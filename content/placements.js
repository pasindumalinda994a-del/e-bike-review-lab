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
      "electric-fat-bikes/retrospec-valen-rev-3-review",
      "electric-bikes/best-electric-bikes",
      "electric-mountain-bikes/best-electric-mountain-bikes",
      "electric-bikes/is-it-worth-getting-electric-bike",
      "electric-folding-bikes/best-electric-folding-bikes",
      "electric-road-bikes/best-electric-road-bikes",
      "electric-cargo-bikes/best-electric-cargo-bikes",
      "electric-city-bikes/best-electric-city-bikes",
      "electric-fat-bikes/best-electric-fat-bikes",
      "electric-cruiser-bikes/best-electric-cruiser-bikes",
      "electric-hybrid-bikes/best-electric-hybrid-bikes",
    ],

    // Main content area under hero - Today's highlight section
    showcase: {
      // Featured highlight article (large card on left)
      highlight: "electric-bikes/best-electric-bikes",

      // Three smaller articles in right sidebar
      sidebar: [
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-fat-bikes/retrospec-valen-rev-3-review",
        "electric-city-bikes/retrospec-beaumont-rev-plus-step-through-review",
      ]
    },

    // Image gallery section further down the homepage
    gallery: [
      "electric-bikes/best-electric-bikes",
      "electric-mountain-bikes/best-electric-mountain-bikes",
      "electric-folding-bikes/best-electric-folding-bikes",
      "electric-road-bikes/best-electric-road-bikes",
      "electric-cargo-bikes/best-electric-cargo-bikes",
      "electric-city-bikes/best-electric-city-bikes",
      "electric-fat-bikes/best-electric-fat-bikes",
      "electric-cruiser-bikes/best-electric-cruiser-bikes",
      "electric-hybrid-bikes/best-electric-hybrid-bikes",
    ],

    // Latest posts grid (explicit order; replaces default first-N from all money posts)
    latestPosts: [
      "electric-fat-bikes/retrospec-valen-rev-3-review",
      "electric-fat-bikes/retrospec-koa-rev-2-step-through-review",
      "electric-city-bikes/retrospec-beaumont-rev-plus-step-through-review",
      "electric-cruiser-bikes/retrospec-chatham-rev-plus-2-review",
    ],
  },

  // ============================================================
  // CATEGORY PAGE SIDEBAR SELECTIONS
  // ============================================================
  categories: {
    "electric-bikes": {
      sidebar: [
        "electric-bikes/best-electric-bikes",
        "electric-bikes/is-it-worth-getting-electric-bike",
      ],
    },
    "electric-mountain-bikes": {
      sidebar: [
        "electric-mountain-bikes/best-electric-mountain-bikes",
      ],
    },
    "electric-folding-bikes": {
      sidebar: [
        "electric-folding-bikes/best-electric-folding-bikes",
      ],
    },
    "electric-road-bikes": {
      sidebar: [
        "electric-road-bikes/best-electric-road-bikes",
      ],
    },
    "electric-cargo-bikes": {
      sidebar: [
        "electric-cargo-bikes/best-electric-cargo-bikes",
      ],
    },
    "electric-city-bikes": {
      sidebar: [
        "electric-city-bikes/best-electric-city-bikes",
      ],
    },
    "electric-fat-bikes": {
      sidebar: [
        "electric-fat-bikes/best-electric-fat-bikes",
      ],
    },
    "electric-cruiser-bikes": {
      sidebar: [
        "electric-cruiser-bikes/best-electric-cruiser-bikes",
      ],
    },
    "electric-hybrid-bikes": {
      sidebar: [
        "electric-hybrid-bikes/best-electric-hybrid-bikes",
      ],
    },
    retrospec: {
      sidebar: [
        "electric-cruiser-bikes/retrospec-chatham-rev-plus-2-review",
        "electric-bikes/best-electric-bikes",
        "electric-cruiser-bikes/best-electric-cruiser-bikes",
      ],
    },
  },

  // ============================================================
  // SIDEBAR FEATURED POSTS
  // ============================================================
  sidebar: {
    // Featured posts displayed in sidebar across all pages
    featuredPosts: [
      "electric-bikes/best-electric-bikes",
      "electric-mountain-bikes/best-electric-mountain-bikes",
      "electric-folding-bikes/best-electric-folding-bikes",
      "electric-road-bikes/best-electric-road-bikes",
      "electric-cargo-bikes/best-electric-cargo-bikes",
    ],
  },

  // ============================================================
  // INDIVIDUAL POST SIDEBAR OVERRIDES
  // ============================================================
  posts: {
    "electric-bikes/best-electric-bikes": {
      sidebar: [
        "electric-bikes/best-electric-bikes",
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-bikes/is-it-worth-getting-electric-bike",
      ],
    },
    "electric-mountain-bikes/best-electric-mountain-bikes": {
      sidebar: [
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-bikes/best-electric-bikes",
      ],
    },
    "electric-bikes/is-it-worth-getting-electric-bike": {
      sidebar: [
        "electric-bikes/best-electric-bikes",
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-bikes/is-it-worth-getting-electric-bike",
      ],
    },
    "electric-folding-bikes/best-electric-folding-bikes": {
      sidebar: [
        "electric-folding-bikes/best-electric-folding-bikes",
        "electric-bikes/best-electric-bikes",
        "electric-mountain-bikes/best-electric-mountain-bikes",
      ],
    },
    "electric-road-bikes/best-electric-road-bikes": {
      sidebar: [
        "electric-road-bikes/best-electric-road-bikes",
        "electric-bikes/best-electric-bikes",
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-folding-bikes/best-electric-folding-bikes",
      ],
    },
    "electric-cargo-bikes/best-electric-cargo-bikes": {
      sidebar: [
        "electric-cargo-bikes/best-electric-cargo-bikes",
        "electric-bikes/best-electric-bikes",
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-folding-bikes/best-electric-folding-bikes",
      ],
    },
    "electric-city-bikes/best-electric-city-bikes": {
      sidebar: [
        "electric-city-bikes/best-electric-city-bikes",
        "electric-bikes/best-electric-bikes",
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-folding-bikes/best-electric-folding-bikes",
      ],
    },
    "electric-fat-bikes/best-electric-fat-bikes": {
      sidebar: [
        "electric-fat-bikes/best-electric-fat-bikes",
        "electric-mountain-bikes/best-electric-mountain-bikes",
        "electric-bikes/best-electric-bikes",
        "electric-folding-bikes/best-electric-folding-bikes",
      ],
    },
    "electric-cruiser-bikes/best-electric-cruiser-bikes": {
      sidebar: [
        "electric-cruiser-bikes/best-electric-cruiser-bikes",
        "electric-bikes/best-electric-bikes",
        "electric-city-bikes/best-electric-city-bikes",
        "electric-folding-bikes/best-electric-folding-bikes",
      ],
    },
    "electric-hybrid-bikes/best-electric-hybrid-bikes": {
      sidebar: [
        "electric-hybrid-bikes/best-electric-hybrid-bikes",
        "electric-bikes/best-electric-bikes",
        "electric-city-bikes/best-electric-city-bikes",
        "electric-road-bikes/best-electric-road-bikes",
      ],
    },
    "electric-cruiser-bikes/retrospec-chatham-rev-plus-2-review": {
      sidebar: [
        "electric-cruiser-bikes/retrospec-chatham-rev-plus-2-review",
        "electric-bikes/best-electric-bikes",
        "electric-cruiser-bikes/best-electric-cruiser-bikes",
        "electric-city-bikes/best-electric-city-bikes",
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
 * Get sidebar featured posts
 * @returns {string[]} Array of post identifiers for sidebar featured posts
 */
export function getSidebarFeaturedPosts() {
  return placements.sidebar?.featuredPosts ?? [];
}

/**
 * Get all unique post keys from all placements
 * @returns {Set<string>} Set of all post keys used in placements
 */
export function getAllPlacementKeys() {
  const keys = new Set();

  // Homepage placements
  const home = placements.home ?? {};
  [...(home.hero ?? []), ...(home.gallery ?? []), ...(home.latestPosts ?? [])].forEach((key) =>
    keys.add(key.toLowerCase()),
  );
  const showcase = home.showcase ?? {};
  if (showcase.highlight) keys.add(showcase.highlight.toLowerCase());
  [...(showcase.sidebar ?? [])].forEach((key) => keys.add(key.toLowerCase()));

  // Sidebar featured posts
  [...(placements.sidebar?.featuredPosts ?? [])].forEach((key) => keys.add(key.toLowerCase()));

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
