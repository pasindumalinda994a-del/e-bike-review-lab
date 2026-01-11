"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Format date string to "MON DD, YYYY" format (matching Hero.js pattern)
 */
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch {
    return dateString;
  }
};

/**
 * Featured Posts Carousel Component
 * Displays 5 featured posts in a carousel format with pagination dots
 * Matches the style from Hero.js but adapted for sidebar
 */
export default function FeaturedPostsCarousel({ posts = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!posts || posts.length === 0) {
    return null;
  }

  // Get card image for post (following CategoryGrid pattern)
  const getCardImage = (post) => {
    return post?.cardImage ?? post?.heroImage ?? "/default-og.png";
  };

  // Get current post to display
  const currentPost = posts[currentSlide];

  // Format date and author similar to Hero.js
  const formatDateAndAuthor = (post) => {
    if (!post) return "";
    const dateStr = post.publishedAt ? formatDate(post.publishedAt) : "";
    const author = post.author || post.authorName || "";
    const authorStr = author ? ` / ${author.toUpperCase()}` : "";
    return dateStr ? `${dateStr}${authorStr}` : authorStr || "";
  };

  if (!currentPost) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {/* Featured Post Card */}
      <article className="mb-4 overflow-hidden rounded-lg bg-white">
        <Link
          href={`/${currentPost.categorySlug}/${currentPost.slug}`}
          className="block"
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={getCardImage(currentPost)}
              alt={currentPost.title || currentPost.h1 || "Featured post"}
              fill
              sizes="(min-width: 1024px) 300px, 100vw"
              className="object-cover transition-transform hover:scale-105"
              quality={75}
            />

            {/* Category Tag */}
            {currentPost.category && (
              <div className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wide text-black">
                  {currentPost.category}
                </span>
              </div>
            )}

            {/* Sponsored Tag */}
            {currentPost.sponsored && (
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-[#3e3ce7] px-2.5 py-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <span className="text-[10px] font-semibold text-white">
                  Sponsored
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="pt-4">
            {/* Date and Author */}
            {formatDateAndAuthor(currentPost) && (
              <div className="mb-2 text-xs font-medium text-gray-600">
                {formatDateAndAuthor(currentPost)}
              </div>
            )}

            {/* Title */}
            {(currentPost.title || currentPost.h1) && (
              <h4 className="text-base font-bold leading-tight text-black line-clamp-2">
                {currentPost.title || currentPost.h1}
              </h4>
            )}
          </div>
        </Link>
      </article>

      {/* Pagination Dots */}
      {posts.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-gray-800"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
