import { notFound } from "next/navigation";
import {
  getAllBlogPosts,
  getPostByCategoryAndSlug,
  getPostsByCategory,
  getPostPlacements,
} from "@/lib/mock-data";
import MoneyArticle from "@/components/articles/MoneyArticle";
import InformationalArticle from "@/components/articles/InformationalArticle";
import SidebarContent from "@/components/SidebarContent";
import JsonLdSchema from "@/components/JsonLdSchema";
import HomeNewsletter from "@/components/HomeNewsletter";
import { buildArticleMetadata, buildArticleSchemas, buildArticleSeo } from "@/lib/seo-helpers";

export const dynamic = "force-static";
export const dynamicParams = false;

// Pre-generate every article path so we can statically render pages.
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    category: post.categorySlug,
    slug: post.slug,
  }));
}

// Create SEO metadata (title, description, OG/Twitter tags) per article.
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const post = await getPostByCategoryAndSlug(category, slug);

  if (!post) {
    return {
      title: "Content Not Found",
      description:
        "The article you are looking for could not be found. Explore more affiliate insights on our site.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildArticleMetadata(post);
}

// Render an individual article and related sidebar content.
export default async function CategoryPostPage({ params }) {
  const { category, slug } = await params;
  const post = await getPostByCategoryAndSlug(category, slug);

  if (!post) {
    notFound();
  }

  const seo = buildArticleSeo(post);
  const normalizedPost = {
    ...post,
    h1: seo.h1,
    seoTitle: seo.seoTitle,
    metaDescription: seo.metaDescription,
  };
  const publishedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const articleSchema = buildArticleSchemas(post, { seo });

  const categoryPosts = await getPostsByCategory(category);
  const relatedPosts = categoryPosts.filter((item) => item.slug !== slug);
  const postPlacements = await getPostPlacements(category, slug);
  // No mapping needed - components use cardImage directly

  const dedupeBySlug = (items) => {
    const seen = new Set();
    return items.filter((item) => {
      if (!item?.slug) {
        return false;
      }
      if (seen.has(item.slug)) {
        return false;
      }
      seen.add(item.slug);
      return true;
    });
  };

  const fallbackSidebarCandidates = dedupeBySlug([
    ...postPlacements.related,
    ...relatedPosts,
  ]);

  const sidebarSource = postPlacements.sidebar.length
    ? postPlacements.sidebar
    : fallbackSidebarCandidates;

  const sidebarPopular = dedupeBySlug(sidebarSource).slice(0, 6);

  let articleContent;
  if (post.contentType === "information") {
    const supportingProducts = post.products?.slice(0, 3) ?? [];
    articleContent = (
      <InformationalArticle
        post={post}
        publishedDate={publishedDate}
        heroImage={post.articleHeroImage}
        supportingProducts={supportingProducts}
      />
    );
  } else {
    articleContent = <MoneyArticle post={post} publishedDate={publishedDate} />;
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 text-[#0C1412] sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16">
        <JsonLdSchema data={articleSchema} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="space-y-8 sm:space-y-12">{articleContent}</div>
          <SidebarContent popular={sidebarPopular} />
        </div>
      </div>
      <HomeNewsletter />
    </>
  );
}
