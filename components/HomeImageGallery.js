"use client";

import Image from "next/image";
import Link from "next/link";

import { informationalArticles } from "@/content/posts/informational";

// Get card image for gallery cards.
function getCardImage(post) {
  return post?.cardImage ?? "/default-og.png";
}

// Scrollable image gallery highlighting informational stories.
export default function HomeImageGallery({ posts = [] }) {
  const informationalPosts = posts.filter(
    (post) => post?.contentType === "information"
  );

  const sourcePosts = informationalPosts.length
    ? informationalPosts
    : informationalArticles;

  const galleryPosts = [...sourcePosts]
    .sort((a, b) => {
      const aDate = new Date(a?.updatedAt ?? a?.publishedAt ?? 0).getTime();
      const bDate = new Date(b?.updatedAt ?? b?.publishedAt ?? 0).getTime();
      return bDate - aDate;
    })
    .slice(0, 4);

  if (!galleryPosts.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="field-moments"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-16"
    >
      <div className="space-y-6 sm:space-y-8">
        <header className="space-y-2 text-center sm:space-y-3">
          <h2
            id="field-moments"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3e3ce7] sm:text-sm sm:tracking-[0.4em]"
          >
            Latest Informational Guides
          </h2>
          <p className="text-2xl font-bold tracking-tight text-[#0C1412] sm:text-3xl">
            Fresh Insights for Smarter E-Bike Decisions
          </p>
        </header>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {galleryPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/${post.categorySlug}/${post.slug}`}
              className="relative overflow-hidden rounded-3xl border border-[#3e3ce7]/15 bg-white/5 shadow-lg shadow-[rgba(12,20,18,0.35)]"
              style={{ minHeight: "260px" }}
            >
              <Image
                src={getCardImage(post)}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 hover:scale-105"
                priority={index < 2}
                loading={index < 2 ? undefined : "lazy"}
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1412]/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  {post.category}
                </span>
                <p className="text-lg font-semibold tracking-tight">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


