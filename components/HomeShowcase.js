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
      className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 md:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] md:px-12"
    >
      <section aria-labelledby="home-showcase-grid" className="space-y-6 ">
        <div className="flex items-start justify-between gap-4">
          <h3
            id="latest-content"
            className="text-sm font-semibold uppercase tracking-[0.4em] text-[#0C1412]/70"
          >
            Latest Content
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {primaryGridPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden "
            >
              <Link
                href={`/${post.categorySlug}/${post.slug}`}
                className="flex h-full flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#3e3ce7]/15 bg-white/10">
                  <Image
                    src={getCardImage(post)}
                    alt={post.title}
                    fill
                    sizes="240px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3e3ce7]">
                    {post.category}
                  </span>
                  <h3 className="text-base font-semibold leading-tight text-[#0C1412] transition group-hover:text-[#3e3ce7]">
                    {post.title}
                  </h3>
                  {post.metaDescription ? (
                    <p className="text-sm text-[#0C1412]/70 line-clamp-3">
                      {post.metaDescription}
                    </p>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#3e3ce7]">
                    Read More →
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


