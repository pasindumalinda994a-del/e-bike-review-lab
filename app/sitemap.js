import { MetadataRoute } from 'next';
import { getAllBlogPosts, getAllCategories } from '@/lib/mock-data';
import { SITE_URL } from '@/lib/seo';

const STATIC_ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

/**
 * Compile sitemap entries for static pages, categories, and individual posts.
 * @returns {Promise<MetadataRoute.Sitemap>}
 */
export default async function sitemap() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
  ]);

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/${post.categorySlug}/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const categoryEntries = categories.map((category) => {
    const latestPost = posts.find(
      (post) => post.categorySlug === category.slug,
    );

    return {
      url: `${SITE_URL}/${category.slug}`,
      lastModified:
        latestPost?.updatedAt ??
        latestPost?.publishedAt ??
        new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const now = new Date().toISOString();
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...categoryEntries, ...postEntries];
}
