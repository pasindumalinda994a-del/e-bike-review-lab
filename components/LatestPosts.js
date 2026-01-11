/* eslint-disable react/prop-types */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";

// Get card image for post cards.
function getCardImage(post) {
  return post?.cardImage ?? post?.heroImage ?? "/default-og.png";
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
 * Reused pattern from other home components for visual consistency.
 */
function formatDateAndAuthor(dateString, post) {
  const author = post?.author || post?.authorName || "";
  if (!dateString) return author ? `POST BY ${author.toUpperCase()}` : "";
  try {
    const date = new Date(dateString);
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
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
 * LatestPosts
 *
 * Highly customizable 3‑column latest posts grid.
 * The component is intentionally class‑driven so you can easily
 * override spacing, typography, colors, and layout from the parent.
 *
 * @param {Object} props
 * @param {Array<Object>} props.posts - Array of post objects.
 * @param {string} [props.heading='Latest posts'] - Section heading text.
 * @param {number} [props.maxPosts=6] - Maximum number of posts to render.
 * @param {string} [props.containerClassName] - Extra classes for the outer container.
 * @param {string} [props.gridClassName] - Extra classes for the grid wrapper.
 * @param {string} [props.cardClassName] - Extra classes applied to each card.
 */
export default function LatestPosts({
  posts = [],
  heading = "Latest posts",
  maxPosts = 6,
  containerClassName = "",
  gridClassName = "",
  cardClassName = "",
}) {
  const items = Array.isArray(posts) ? posts.slice(0, maxPosts) : [];

  if (!items.length) return null;

  return (
    <section
      aria-labelledby="latest-posts-heading"
      className={`mx-auto flex w-full max-w-[1440px] flex-col px-4 py-12 text-[#0C1412] sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-16 ${containerClassName}`}
    >
      <div className="mx-auto w-full max-w-7xl">
      <header className="mb-6 sm:mb-8">
        <h2
          id="latest-posts-heading"
          className="font-inter text-2xl font-normal text-[#000000] sm:text-xl md:text-4xl tracking-[1.5em] leading-[2.5em]"
        >
          {heading}
        </h2>
      </header>

      {/* 3‑column responsive grid */}
      <div
        className={`grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 ${gridClassName}`}
      >
        {items.map((post, index) => {
          const href =
            post?.href ??
            (post?.categorySlug && post?.slug
              ? `/${post.categorySlug}/${post.slug}`
              : "#");

          const description =
            post?.metaDescription ?? post?.introduction ?? post?.excerpt ?? "";

          return (
            <article
              key={post?.slug ?? post?.id ?? index}
              className={`group flex h-full flex-col overflow-hidden rounded-lg bg-white ${cardClassName}`}
            >
              <Link href={href} className="flex h-full flex-col">
                {/* Image: 16:9 ratio with fully rounded corners */}
                <div className="relative w-full overflow-hidden rounded-xl bg-[#0C1412]/5">
                  <div className="relative aspect-video w-full">
                    <AnimatedImage
                      src={getCardImage(post)}
                      alt={post?.title ?? "Latest post"}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      priority={index < 3}
                      quality={70}
                    />
                  </div>

                  {/* Category pill – white background, black text, rounded corners */}
                  {post?.category ? (
                    <div className="pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4">
                      <span className="rounded bg-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-wide text-black sm:px-4 sm:py-2 sm:text-[10px]">
                        {post.category}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-2 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#0C1412]/55 sm:text-xs">
                    {formatDateAndAuthor(post?.publishedAt, post)}
                  </p>

                  <h3 className="line-clamp-2 text-lg font-bold leading-tight text-[#000000] sm:text-base md:text-lg lg:text-lg xl:text-xl group-hover:underline">
                    {post?.title}
                  </h3>

                  {description ? (
                    <p className="mt-1 line-clamp-3 text-base leading-normal text-black sm:text-base">
                      {description}
                    </p>
                  ) : null}

                 
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}


