import { notFound } from "next/navigation";
import {
  getAllBlogPosts,
  getPostByCategoryAndSlug,
} from "@/lib/mock-data";
import MoneyArticle from "@/components/articles/MoneyArticle";
import DealArticle from "@/components/articles/DealArticle";
import InformationalMdxArticle from "@/components/articles/InformationalMdxArticle";
import ProductArticle from "@/components/articles/ProductArticle";
import BrandArticle from "@/components/articles/BrandArticle";
import JsonLdSchema from "@/components/JsonLdSchema";
import HomeNewsletter from "@/components/HomeNewsletter";
import { buildArticleMetadata, buildArticleSchemas, buildArticleSeo } from "@/lib/seo-helpers";
import { loadMdxInformationalSource } from "@/lib/mdx-informational";

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

  let articleContent;
  if (post.contentType === "information") {
    if (!post.mdxSource) {
      notFound();
    }
    const mdxBody = loadMdxInformationalSource(post.mdxFile);
    if (!mdxBody) {
      notFound();
    }
    articleContent = (
      <InformationalMdxArticle
        post={normalizedPost}
        publishedDate={publishedDate}
        source={mdxBody}
        heroImage={post.articleHeroImage}
      />
    );
  } else if (post.contentType === "product") {
    articleContent = (
      <ProductArticle post={post} publishedDate={publishedDate} />
    );
  } else if (post.contentType === "brand") {
    articleContent = (
      <BrandArticle post={post} publishedDate={publishedDate} />
    );
  } else if (post.contentType === "deal") {
    articleContent = <DealArticle post={post} publishedDate={publishedDate} />;
  } else {
    // Default to money article layout for roundup/commercial posts
    articleContent = <MoneyArticle post={post} publishedDate={publishedDate} />;
  }

  return (
    <main>
      <JsonLdSchema data={articleSchema} />
      {articleContent}
      <HomeNewsletter />
    </main>
  );
}
