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
      className="w-full"
    >
      <div className="space-y-10 sm:space-y-12">
        <header className="space-y-3 text-center sm:space-y-4">
          <h2
            id="field-moments"
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#3e3ce7] sm:text-sm"
          >
            Latest Informational Guides
          </h2>
          <p className="text-3xl font-bold leading-tight tracking-tight text-[#0C1412] sm:text-4xl md:text-5xl">
            Fresh Insights for Smarter E-Bike Decisions
          </p>
        </header>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {galleryPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/${post.categorySlug}/${post.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-[#0C1412]/10 bg-white shadow-lg transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-xl hover:shadow-[#3e3ce7]/10 hover:-translate-y-1"
              style={{ minHeight: "320px" }}
            >
              <Image
                src={getCardImage(post)}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={index < 2}
                loading={index < 2 ? undefined : "lazy"}
                quality={index < 2 ? 75 : 70}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1412]/90 via-[#0C1412]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 text-white sm:p-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  {post.category}
                </span>
                <p className="text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                  {post.title}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-transform duration-300 group-hover:translate-x-1">
                  Read Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


