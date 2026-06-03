import Link from "next/link";
import Image from "next/image";
import { categories } from "../content/categories";
import { brandArticles } from "../content/posts/brand-articles";
import { getSidebarFeaturedPosts } from "../lib/mock-data";
import FeaturedPostsCarousel from "./FeaturedPostsCarousel";

// About sidebar card component matching the design
export default async function SidebarContent() {
  // Get featured posts from placements
  const featuredPosts = await getSidebarFeaturedPosts();
  const brandPageSlugs = brandArticles.map(
    (article) => article.brandCategorySlug ?? article.categorySlug,
  );
  const brandCategorySlugs = new Set(
    brandPageSlugs,
  );
  const uniqueBrandItems = Array.from(
    new Map(
      brandArticles.map((article) => [
        article.brandCategorySlug ?? article.categorySlug,
        article,
      ]),
    ).values(),
  );
  const categoryImageBySlug = new Map(
    categories.map((category) => [category.slug, category.heroImage])
  );
  const categoryOnlyItems = categories.filter(
    (category) => !brandCategorySlugs.has(category.slug)
  );

  return (
    <aside className="flex flex-col self-start space-y-6">
      <div className="rounded-lg bg-white p-6">
        {/* ABOUT Heading */}
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-700">
          ABOUT
        </h3>

        {/* Logo and Brand Name */}
        <div className="mb-6">
          {/* Logo */}
          <div className="relative h-12 w-auto">
            <Image
              src="/EBRLLogo.png"
              alt="EBikeReviewLab Logo"
              width={150}
              height={48}
              className="object-contain h-auto w-auto max-h-12"
              priority
            />
          </div>
        </div>

        {/* Description Text */}
        <p className="mb-6 text-sm leading-relaxed text-black">
          EBikeReviewLab is a dedicated electric bike review website created to help riders find the best e-bikes for commuting, city riding, fitness, and everyday use. We provide clear, reliable information that helps people make confident buying decisions in a fast-growing and competitive e-bike market.
        </p>

        
      </div>

      {/* Featured Posts Section */}
      <div className="rounded-lg bg-white p-6">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-700">
          FEATURED POSTS
        </h3>

        {/* Featured Posts Carousel */}
        {featuredPosts.length > 0 ? (
          <FeaturedPostsCarousel posts={featuredPosts} />
        ) : null}
      </div>

      {/* Explore Topics Section */}
      <div className="rounded-lg bg-white p-8">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-700">
          REVIEWS BY BRAND
        </h3>

        <div className="mb-8 space-y-3">
          {uniqueBrandItems.map((article) => (
            <Link
              key={article.slug}
              href={`/${article.brandCategorySlug ?? article.categorySlug}`}
              className="group flex items-center gap-3 rounded-lg"
            >
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={
                    categoryImageBySlug.get(
                      article.brandCategorySlug ?? article.categorySlug,
                    ) ??
                    "/images/categories/Electric Bikes.webp"
                  }
                  alt={article.brandCategory ?? article.category}
                  fill
                  sizes="48px"
                  className="object-cover transition-transform group-hover:scale-105"
                  quality={75}
                />
              </div>
              <span className="text-sm text-black transition-colors group-hover:text-gray-600">
                {article.brandCategory ?? article.category}
              </span>
            </Link>
          ))}
        </div>

        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-700">
          REVIEWS BY CATEGORIES
        </h3>

        {/* Topics List */}
        <div className="space-y-5">
          {categoryOnlyItems.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group flex gap-3"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={category.heroImage}
                  alt={category.name}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform group-hover:scale-105"
                  quality={75}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-light text-black mb-1">
                  {category.name}
                </h4>
                <p className="text-base text-gray-600 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
