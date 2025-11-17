"use client";

import Image from "next/image";
import Link from "next/link";

// Get card image for category cards.
function getCardImage(post) {
  return post?.cardImage ?? "/default-og.png";
}

// Two-column card grid used on category landing pages.
export default function CategoryGrid({ posts = [] }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section aria-label="Category guides" className="py-8 sm:py-12">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-4 sm:p-5"
          >
            <Link
              href={`/${post.categorySlug}/${post.slug}`}
              className="group flex flex-col gap-4 text-left sm:flex-row sm:items-start"
            >
              <div className="relative w-full overflow-hidden rounded-2xl border border-[#3e3ce7]/15 bg-white aspect-[4/3] shadow-sm sm:max-w-[5rem] lg:max-w-[9rem] sm:mx-0">
                <Image
                  src={getCardImage(post)}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 144px, (min-width: 768px) 20vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <div className="space-y-2 sm:space-y-3 sm:flex-1">
                <h2 className="text-base font-bold tracking-tight text-[#0C1412] sm:text-lg">
                  {post.title}
                </h2>
                <p className="text-xs leading-relaxed text-[#0C1412]/75 sm:text-sm">
                  {post.metaDescription}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#3e3ce7] transition group-hover:translate-x-1 sm:text-sm">
                  Read More →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

