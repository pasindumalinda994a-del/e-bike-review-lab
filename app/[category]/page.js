import CategoryGrid from '@/components/CategoryGrid';
import CategoryHero from '@/components/CategoryHero';
import HomeNewsletter from '@/components/HomeNewsletter';
import JsonLdSchema from '@/components/JsonLdSchema';
import SidebarContent from '@/components/SidebarContent';
import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getPostsByCategory,
  getCategoryMeta,
  getCategoryPlacements,
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
  const categoryPlacements = await getCategoryPlacements(category);
  const seo = buildCategorySeo({ categorySlug: category, categoryMeta, posts });

  if (!posts.length) {
    notFound();
  }

  const categorySchemas = buildCategorySchemas(
    { categorySlug: category, categoryMeta, posts },
    { seo },
  );

  const sidebarSource = categoryPlacements.sidebar.length
    ? categoryPlacements.sidebar
    : posts.slice(0, 4);
  const sidebarPopular = sidebarSource;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-12 text-[#0C1412] sm:gap-12 sm:px-6 sm:pb-16 md:gap-16 md:px-12">
      <JsonLdSchema data={categorySchemas} />
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
        <CategoryHero
          categoryName={seo.heroHeading}
          image={seo.heroImage}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.1fr)] lg:gap-12">
        <CategoryGrid posts={posts} />
        <SidebarContent popular={sidebarPopular} />
      </div>

      <HomeNewsletter />
    </main>
  );
}


