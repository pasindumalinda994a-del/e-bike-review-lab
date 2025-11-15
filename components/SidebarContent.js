import Link from "next/link";
import Image from "next/image";

// Generic list of curated posts for sidebar usage.
export default function SidebarContent({ popular = [] }) {
  if (!popular.length) {
    return null;
  }

  const getCardImage = (post) => post?.cardImage ?? "/default-og.png";

  const renderList = (items) => (
    <ul className="space-y-4">
      {items.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/${post.categorySlug}/${post.slug}`}
            className="group flex gap-3 rounded-2xl border border-[#3e3ce7]/15 bg-white/90 p-3 shadow-sm shadow-[rgba(12,20,18,0.08)] transition hover:border-[#3e3ce7]/30 hover:shadow-[0_12px_25px_rgba(12,20,18,0.18)]"
          >
            <div className="relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#0C1412]/5">
              <Image
                src={getCardImage(post)}
                alt={post.title}
                fill
                sizes="80px"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <span className="line-clamp-3 text-sm font-semibold leading-snug text-[#0C1412] transition group-hover:text-[#3e3ce7]">
                {post.title}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="space-y-6 self-start">
      <section aria-labelledby="popular-content" className="space-y-4">
        <h3
          id="popular-content"
          className="text-sm font-semibold uppercase tracking-[0.4em] text-[#0C1412]/70"
        >
          Popular Content
        </h3>
        {renderList(popular)}
      </section>
    </aside>
  );
}
