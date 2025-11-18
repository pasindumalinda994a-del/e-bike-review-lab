"use client";

import Image from "next/image";
import Link from "next/link";
import SidebarContent from "./SidebarContent";

// Get card image for post cards.
function getCardImage(post) {
  return post?.cardImage ?? "/default-og.png";
}

/**
 * Grid of latest posts for the homepage with an optional popular sidebar.
 */
export default function HomeShowcase({ latest = [], sidebarPopular = [] }) {
  const primaryGridPosts = latest.slice(0, 4);

  if (!primaryGridPosts.length && !sidebarPopular.length) {
    return null;
  }

  const sidebarItems = (sidebarPopular.length ? sidebarPopular : latest).slice(
    0,
    6,
  );

  return (
    <section
      aria-labelledby="home-showcase-grid"
      className="grid w-full gap-12 md:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] md:gap-16"
    >
      <section aria-labelledby="home-showcase-grid" className="space-y-8">
        <div className="flex items-start justify-between gap-4">
          <h3
            id="latest-content"
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#3e3ce7] sm:text-sm"
          >
            Latest Content
          </h3>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {primaryGridPosts.map((post, index) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0C1412]/10 bg-white shadow-sm transition-all duration-300 hover:border-[#3e3ce7]/20 hover:shadow-xl hover:shadow-[#3e3ce7]/5"
            >
              <Link
                href={`/${post.categorySlug}/${post.slug}`}
                className="flex h-full flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0C1412]/5">
                  <Image
                    src={getCardImage(post)}
                    alt={post.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 2}
                    loading={index < 2 ? undefined : "lazy"}
                    quality={index < 2 ? 75 : 70}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3e3ce7]">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold leading-tight tracking-tight text-[#0C1412] transition-colors duration-300 group-hover:text-[#3e3ce7] sm:text-xl">
                    {post.title}
                  </h3>
                  {post.metaDescription ? (
                    <p className="text-sm leading-relaxed text-[#0C1412]/70 line-clamp-3 sm:text-base">
                      {post.metaDescription}
                    </p>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#3e3ce7] transition-transform duration-300 group-hover:translate-x-1">
                    Read More
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
            </article>
          ))}
        </div>
      </section>

      <SidebarContent popular={sidebarItems} />
    </section>
  );
}


