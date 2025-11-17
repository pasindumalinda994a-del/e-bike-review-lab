import Link from "next/link";
import Image from "next/image";

// Generic list of curated posts for sidebar usage.
export default function SidebarContent({ popular = [] }) {
  if (!popular.length) {
    return null;
  }

  const getCardImage = (post) => post?.cardImage ?? "/default-og.png";

  const renderList = (items) => (
    <ul className="space-y-3 sm:space-y-4">
      {items.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/${post.categorySlug}/${post.slug}`}
            className="group flex gap-2.5 rounded-xl border border-[#3e3ce7]/15 bg-white/90 p-2.5 shadow-sm shadow-[rgba(12,20,18,0.08)] transition hover:border-[#3e3ce7]/30 hover:shadow-[0_12px_25px_rgba(12,20,18,0.18)] sm:gap-3 sm:rounded-2xl sm:p-3"
          >
            <div className="relative aspect-[4/3] w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#0C1412]/5 sm:w-20">
              <Image
                src={getCardImage(post)}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <span className="line-clamp-3 text-xs font-semibold leading-snug text-[#0C1412] transition group-hover:text-[#3e3ce7] sm:text-sm">
                {post.title}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="space-y-4 self-start sm:space-y-6">
      <section aria-labelledby="popular-content" className="space-y-3 sm:space-y-4">
        <h3
          id="popular-content"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0C1412]/70 sm:text-sm sm:tracking-[0.4em]"
        >
          Popular Content
        </h3>
        {renderList(popular)}
      </section>
    </aside>
  );
}
