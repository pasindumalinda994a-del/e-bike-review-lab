import CategoryGrid from '@/components/CategoryGrid';
import CategoryHero from '@/components/CategoryHero';
import HomeNewsletter from '@/components/HomeNewsletter';
import JsonLdSchema from '@/components/JsonLdSchema';
import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getPostsByCategory,
  getCategoryMeta,
} from '@/lib/mock-data';
import { buildCategoryMetadata, buildCategorySchemas, buildCategorySeo } from '@/lib/seo-helpers';

export const dynamic = 'force-static';
export const dynamicParams = false;

// Build list of category slugs so pages are generated at build time.
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category: category.slug }));
}

// Produce metadata (title/description/canonical) for each category route.
export async function generateMetadata({ params }) {
  const { category } = await params;
  const categoryMeta = await getCategoryMeta(category);
  const posts = await getPostsByCategory(category);

  if (!posts.length) {
    return {
      title: 'Category Not Found',
      description:
        'The category you are looking for could not be found. Explore more electric bike reviews across our site.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildCategoryMetadata({ categorySlug: category, categoryMeta, posts });
}

// Main category landing page rendering the hero, grid, and sidebar.
export default async function CategoryPage({ params }) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const categoryMeta = await getCategoryMeta(category);
  const seo = buildCategorySeo({ categorySlug: category, categoryMeta, posts });

  if (!posts.length) {
    notFound();
  }

  const categorySchemas = buildCategorySchemas(
    { categorySlug: category, categoryMeta, posts },
    { seo },
  );

  return (
    <main>
      <JsonLdSchema data={categorySchemas} />
      <CategoryHero
        categoryName={seo.heroHeading}
        image={seo.heroImage}
        description={categoryMeta?.description}
      />

      <CategoryGrid posts={posts} />

      <HomeNewsletter />
    </main>
  );
}
