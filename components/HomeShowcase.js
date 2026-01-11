"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";

// Get card image for post cards.
function getCardImage(post) {
  return post?.cardImage ?? "/default-og.png";
}

/**
 * Animated Image Component with GSAP hover animation
 */
function AnimatedImage({ src, alt, sizes, className, priority, quality, loading }) {
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: -5,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(imageRef.current, {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current);
      gsap.to(imageRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={imageRef}
      className="absolute inset-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        quality={quality}
        loading={loading}
      />
    </div>
  );
}

/**
 * Format date string to "MON DD, YYYY / POST BY AUTHOR" format
 */
function formatDateAndAuthor(dateString, post) {
  const author = post?.author || post?.authorName || "";
  if (!dateString) return author ? `POST BY ${author.toUpperCase()}` : "";
  try {
    const date = new Date(dateString);
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateStr = `${month} ${day}, ${year}`;
    const authorStr = author ? ` / POST BY ${author.toUpperCase()}` : "";
    return `${dateStr}${authorStr}`;
  } catch {
    return author ? `POST BY ${author.toUpperCase()}` : "";
  }
}

/**
 * Today's highlight section with one large featured article and three smaller articles.
 */
export default function HomeShowcase({ highlight = null, sidebar = [] }) {
  const sidebarPosts = sidebar.slice(0, 3);

  if (!highlight && !sidebarPosts.length) {
    return null;
  }

  return (
    <section aria-labelledby="home-showcase" className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-12 text-[#0C1412] sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-16">
      <div className="mx-auto w-full max-w-7xl space-y-2">
        <header className="mb-6 sm:mb-8">
          <h2
            id="todays-highlight"
            className="font-inter text-3xl font-normal text-[#000000] sm:text-xl md:text-4xl tracking-[1.5em] leading-[2.5em]"
          >
            Today's highlight
          </h2>
        </header>
      
      <div className="grid w-full gap-4 md:grid-cols-2 md:gap-6">
        {/* Left Column: Today's Highlight */}
        <section className="space-y-2">
          {highlight ? (
          <article className="group flex h-full flex-col overflow-hidden transition-all duration-300">
            <Link
              href={`/${highlight.categorySlug}/${highlight.slug}`}
              className="flex h-full flex-col"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-[#0C1412]/5">
                <AnimatedImage
                  src={getCardImage(highlight)}
                  alt={highlight.title}
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                  priority
                  quality={75}
                />
                {/* Category and Sponsored Tags */}
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-3 sm:left-6 sm:top-6">
                  {highlight.category && (
                    <span className="rounded bg-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-wide text-black sm:px-4 sm:py-2 sm:text-[10px]">
                      {highlight.category}
                    </span>
                  )}
                  {highlight.sponsored && (
                    <span className="flex items-center gap-1.5 rounded-full bg-gray-800/90 px-3 py-1.5 text-[9px] font-medium text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-[10px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                      Sponsored
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 py-3 sm:py-4">
                <div className="text-xs font-medium uppercase text-[#0C1412]/60">
                  {formatDateAndAuthor(highlight.publishedAt, highlight)}
                </div>
                <h3 className="text-lg font-bold leading-tight text-[#000000] sm:text-base md:text-lg lg:text-xl xl:text-2xl group-hover:underline">
                  {highlight.title}
                </h3>
                {highlight.metaDescription ? (
                  <p className="text-base leading-normal text-black sm:text-base">
                    {highlight.metaDescription}
                  </p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#0C1412] transition-transform duration-300 group-hover:translate-x-1">
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
          ) : null}
        </section>

        {/* Right Column: Three Smaller Articles */}
        <aside className="flex flex-col space-y-4">
          {sidebarPosts.map((post, index) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-lg bg-white transition-all duration-300"
            >
              <Link
                href={`/${post.categorySlug}/${post.slug}`}
                className="flex h-full w-full flex-col md:flex-row md:items-stretch"
              >
                {/* Image Container - Vertical on mobile (aspect-video), horizontal on desktop (4:3) */}
                <div className="relative aspect-video overflow-hidden rounded-lg bg-[#0C1412]/5 md:aspect-[4/3] md:h-full md:w-auto md:flex-shrink-0">
                  <AnimatedImage
                    src={getCardImage(post)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (min-width: 768px) 213px, 160px"
                    className="object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={75}
                  />
                  {/* Category Tag - Top Left on Image */}
                  <div className="absolute left-4 top-4 flex flex-wrap items-center gap-3 sm:left-6 sm:top-6 md:left-1.5 md:top-1.5 md:gap-0">
                    {post.category && (
                      <span className="rounded bg-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-wide text-black sm:px-4 sm:py-2 sm:text-[10px]">
                        {post.category}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Content Section - Full width on mobile, narrower on desktop */}
                <div className="flex flex-1 flex-col gap-2 px-4 py-3 sm:py-4 md:min-w-0 md:justify-center md:gap-1.5 md:px-4">
                  <div className="text-xs font-medium uppercase text-[#0C1412]/60">
                    {formatDateAndAuthor(post.publishedAt, post)}
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-[#000000] sm:text-base md:text-lg lg:text-lg xl:text-xl group-hover:underline md:line-clamp-2">
                    {post.title}
                  </h3>
                  {post.metaDescription ? (
                    <p className="text-base leading-normal text-black sm:text-base md:line-clamp-2 md:leading-relaxed">
                      {post.metaDescription}
                    </p>
                  ) : null}
                </div>
              </Link>
            </article>
          ))}
        </aside>
      </div>
      </div>
    </section>
  );
}


