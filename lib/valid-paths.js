/**
 * Valid route paths for middleware. Used to 301 redirect invalid/404 URLs to home.
 * Kept in sync with app routes: static pages, category slugs, and category/slug articles.
 */
import { allPosts } from "@/content/posts";
import { categories } from "@/content/categories";

const validArticlePaths = new Set(
  allPosts.map((p) => `${p.categorySlug}/${p.slug}`.toLowerCase())
);

const validCategorySlugs = new Set([
  ...categories.map((c) => c.slug),
  ...allPosts.map((p) => p.categorySlug),
]);

const validStaticSegments = new Set([
  "about",
  "contact",
  "privacy",
  "terms",
  "newsletter",
]);

export { validArticlePaths, validCategorySlugs, validStaticSegments };
