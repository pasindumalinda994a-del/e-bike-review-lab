import Link from "next/link";
import Image from "next/image";

// Generic list of curated posts for sidebar usage.
export default function SidebarContent({ popular = [] }) {
  if (!popular.length) {
    return null;
  }

  const getCardImage = (post) => post?.cardImage ?? "/default-og.png";

  const renderList = (items) => (
    <ul className="space-y-4 sm:space-y-5">
      {items.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/${post.categorySlug}/${post.slug}`}
            className="group flex gap-3 rounded-xl border border-[#0C1412]/10 bg-white p-3 shadow-sm transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-md hover:shadow-[#3e3ce7]/10 hover:-translate-y-0.5 sm:gap-4 sm:rounded-2xl sm:p-4"
          >
            <div className="relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#0C1412]/5 sm:w-24">
              <Image
                src={getCardImage(post)}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="line-clamp-3 text-sm font-semibold leading-snug tracking-tight text-[#0C1412] transition-colors duration-300 group-hover:text-[#3e3ce7] sm:text-base">
                {post.title}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="space-y-6 self-start sm:space-y-8">
      <section aria-labelledby="popular-content" className="space-y-5 sm:space-y-6">
        <h3
          id="popular-content"
          className="text-xs font-semibold uppercase tracking-[0.4em] text-[#3e3ce7] sm:text-sm"
        >
          Popular Content
        </h3>
        {renderList(popular)}
      </section>
    </aside>
  );
}
