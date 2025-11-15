import { categories } from "@/content/categories";
import { placements } from "@/content/placements";
import { allPosts } from "@/content/posts";

// Make a deep copy so we never accidentally change the source data.
const clone = (value) => JSON.parse(JSON.stringify(value));

const posts = allPosts;

const categoryConfigMap = new Map(
  categories.map((category) => [category.slug, category]),
);

// Allow placements to accept a single string or an array.
const ensureArray = (value) => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

// Build a consistent key like "category/post-slug".
const createPostKey = (categorySlug, slug) =>
  `${categorySlug}/${slug}`.toLowerCase();

const allPostsByKey = new Map(
  posts.map((post) => [createPostKey(post.categorySlug, post.slug), post]),
);

// Accept either "slug" or "category/slug" references.
const findPostByIdentifier = (identifier) => {
  if (!identifier) {
    return null;
  }

  if (typeof identifier !== "string") {
    return null;
  }

  const normalized = identifier.toLowerCase();

  if (normalized.includes("/")) {
    const direct = allPostsByKey.get(normalized);
    return direct ?? null;
  }

  return posts.find((post) => post.slug.toLowerCase() === normalized) ?? null;
};

const resolvePosts = (identifiers) =>
  ensureArray(identifiers)
    .map((identifier) => findPostByIdentifier(identifier))
    .filter(Boolean)
    .map((post) => clone(post));

// Return a small data object describing the category.
const ensureCategorySummary = (categorySlug) => {
  if (!categorySlug) {
    return null;
  }

  const configured = categoryConfigMap.get(categorySlug);
  const categoryPosts = posts.filter((post) => post.categorySlug === categorySlug);

  if (!configured && !categoryPosts.length) {
    return null;
  }

  const firstPost = categoryPosts[0] ?? null;

  return {
    slug: categorySlug,
    name: configured?.name ?? firstPost?.category ?? categorySlug,
    heroImage:
      configured?.heroImage ??
      firstPost?.heroImage ??
      firstPost?.products?.[0]?.imageUrl ??
      firstPost?.products?.[1]?.imageUrl ??
      "/default-og.png",
    description: configured?.description ?? firstPost?.metaDescription ?? "",
    totalPosts: categoryPosts.length,
  };
};

export async function getAllBlogPosts() {
  return clone(posts);
}

// Fetch a post when we already know the category and slug.
export async function getPostByCategoryAndSlug(categorySlug, slug) {
  const post = posts.find(
    (item) => item.categorySlug === categorySlug && item.slug === slug,
  );
  return post ? clone(post) : null;
}

// Grab every post for a category page.
export async function getPostsByCategory(categorySlug) {
  const categoryPosts = posts
    .filter((item) => item.categorySlug === categorySlug)
    .sort((a, b) => {
      const getTimestamp = (post) => {
        if (post?.updatedAt) return new Date(post.updatedAt).getTime();
        if (post?.publishedAt) return new Date(post.publishedAt).getTime();
        return 0;
      };
      return getTimestamp(b) - getTimestamp(a);
    });
  return clone(categoryPosts);
}

export async function getAllCategories() {
  const categorySlugs = new Set(posts.map((post) => post.categorySlug));
  categories.forEach((category) => categorySlugs.add(category.slug));

  const summaries = Array.from(categorySlugs)
    .map((slug) => ensureCategorySummary(slug))
    .filter(Boolean);

  return clone(summaries);
}

// Convenience helper for metadata + hero usage on category pages.
export async function getCategoryMeta(categorySlug) {
  const summary = ensureCategorySummary(categorySlug);
  return summary ? clone(summary) : null;
}

// Resolve every configured placement on the home page.
export async function getHomePlacements() {
  const home = placements.home ?? {};

  const heroPosts = resolvePosts(home.hero);

  const showcaseConfig = home.showcase ?? {};
  const showcaseLatest = resolvePosts(showcaseConfig.latest);
  const showcaseSidebar = resolvePosts(
    showcaseConfig.sidebar,
  );

  const galleryPosts = resolvePosts(home.gallery);

  return {
    // Posts for the hero slider.
    hero: heroPosts,
    showcase: {
      // Grid area under the hero.
      latest: showcaseLatest,
      // Sidebar items next to the grid.
      sidebar: showcaseSidebar,
    },
    // Image gallery section further down the page.
    gallery: galleryPosts,
  };
}

// Resolve sidebar selections for a category page.
export async function getCategoryPlacements(categorySlug) {
  const categoryConfig = placements.categories?.[categorySlug] ?? {};

  const sidebarPosts = resolvePosts(
    categoryConfig.sidebar,
  );

  return {
    sidebar: sidebarPosts,
  };
}

// Resolve sidebar and related picks for an individual post.
export async function getPostPlacements(categorySlug, slug) {
  const key = createPostKey(categorySlug, slug);
  const postConfig =
    placements.posts?.[key] ?? placements.posts?.[slug.toLowerCase()] ?? {};
  const categoryConfig = placements.categories?.[categorySlug] ?? {};

  const sidebarPosts = resolvePosts(
    postConfig.sidebar ??
      postConfig.popular ??
      postConfig.related ??
      categoryConfig.sidebar,
  );

  const relatedPosts = resolvePosts(
    postConfig.related ?? categoryConfig.sidebar,
  ).filter((post) => post.slug !== slug);

  return {
    sidebar: sidebarPosts,
    related: relatedPosts,
  };
}

