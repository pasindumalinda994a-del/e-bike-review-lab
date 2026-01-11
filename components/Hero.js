"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * @typedef {Object} SlideContent
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [href]
 * @property {string} [date]
 * @property {string} [author]
 * @property {string} [category]
 * @property {boolean} [sponsored]
 */

/**
 * @typedef {Object} HeroProps
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [image]
 * @property {string[]} [images]
 * @property {SlideContent[]} [slideContent]
 */

/**
 * Format date string to "MON DD, YYYY" format
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
 * Hero component with 3-column grid layout.
 * Top row: 3 smaller article cards
 * Bottom row: 1 large featured article card spanning all columns
 * Maintains SEO optimization with proper h1 and semantic HTML.
 *
 * @param {HeroProps} props
 */
export default function Hero({
  title,
  description,
  image,
  images,
  slideContent = [],
}) {
  // Build slides from images and content
  const slides = useMemo(() => {
    const imageSources = images?.length ? images : image ? [image] : [];
    
    return imageSources.map((src, index) => ({
      src,
      title: slideContent[index]?.title ?? title ?? "",
      description: slideContent[index]?.description ?? description ?? "",
      href: slideContent[index]?.href ?? "#",
      date: slideContent[index]?.date ?? "",
      author: slideContent[index]?.author ?? "",
      category: slideContent[index]?.category ?? "",
      sponsored: slideContent[index]?.sponsored ?? false,
    }));
  }, [description, image, images, slideContent, title]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardImageRefs = useRef([]);
  const featuredContentRef = useRef(null);
  const featuredParagraphRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Setup GSAP hover animations for card images
  useEffect(() => {
    const imageContainers = cardImageRefs.current;
    const cleanupFunctions = [];
    
    imageContainers.forEach((containerRef, index) => {
      if (!containerRef) return;

      const cardElement = containerRef.closest('a');
      if (!cardElement) return;

      const imgElement = containerRef.querySelector('img');
      if (!imgElement) return;

      // Set transform origin to center for smooth rotation
      gsap.set(imgElement, { transformOrigin: "center center" });

      const handleMouseEnter = () => {
        gsap.to(imgElement, {
          scale: 1.05,
          rotation: 5,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imgElement, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        cardElement.removeEventListener("mouseenter", handleMouseEnter);
        cardElement.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [slides]);

  if (!slides.length) {
    return null;
  }

  // Get top 3 cards for the grid
  const topCards = slides.slice(0, 3);
  // Get featured card (first slide)
  const featuredCard = slides[0];

  // Setup GSAP animation for featured card content overlay
  useEffect(() => {
    const contentElement = featuredContentRef.current;
    const paragraphElement = featuredParagraphRef.current;
    const cardLink = contentElement?.closest('a');

    if (!contentElement || !cardLink) return;

    // Check if mobile view (below md breakpoint: 768px)
    const isMobile = () => window.innerWidth < 768;

    // Wait for next frame to ensure elements are rendered
    const setupAnimation = () => {
      // On mobile, don't hide the description - keep it visible
      if (isMobile()) {
        gsap.set(contentElement, { y: 0 });
        if (paragraphElement) {
          gsap.set(paragraphElement, {
            opacity: 1,
            y: 0,
          });
        }
        return;
      }

      // Desktop: Calculate how much to move down (enough to hide paragraph)
      let translateYValue = 100; // Default fallback
      
      if (paragraphElement && paragraphElement.offsetHeight > 0) {
        translateYValue = paragraphElement.offsetHeight + 30; // Extra padding for smooth hide
      } else if (paragraphElement) {
        // If paragraph exists but height is 0, wait a bit and retry
        setTimeout(() => {
          if (paragraphElement.offsetHeight > 0) {
            translateYValue = paragraphElement.offsetHeight + 30;
            gsap.set(contentElement, { y: translateYValue });
          }
        }, 100);
      }

      // Set initial state: content moved down, paragraph hidden (desktop only)
      gsap.set(contentElement, {
        y: translateYValue,
      });
      
      if (paragraphElement) {
        gsap.set(paragraphElement, {
          opacity: 0,
          y: 10,
        });
      }
    };

    // Setup after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(setupAnimation, 50);

    // Animate on hover (desktop only)
    const handleMouseEnter = () => {
      if (isMobile()) return; // Skip animation on mobile

      gsap.to(contentElement, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      if (paragraphElement) {
        gsap.to(paragraphElement, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2, // Slight delay for smoother effect
        });
      }
    };

    // Animate back on mouse leave (desktop only)
    const handleMouseLeave = () => {
      if (isMobile()) return; // Skip animation on mobile

      // Recalculate in case window was resized
      let translateYValue = 100;
      if (paragraphElement && paragraphElement.offsetHeight > 0) {
        translateYValue = paragraphElement.offsetHeight + 30;
      }

      gsap.to(contentElement, {
        y: translateYValue,
        duration: 0.6,
        ease: "power2.in",
      });

      if (paragraphElement) {
        gsap.to(paragraphElement, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    };

    cardLink.addEventListener("mouseenter", handleMouseEnter);
    cardLink.addEventListener("mouseleave", handleMouseLeave);

    // Handle window resize to update animation state
    const handleResize = () => {
      if (isMobile()) {
        // On mobile, ensure description is visible
        gsap.set(contentElement, { y: 0 });
        if (paragraphElement) {
          gsap.set(paragraphElement, { opacity: 1, y: 0 });
        }
      } else {
        // On desktop, apply the hiding animation
        setupAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      cardLink.removeEventListener("mouseenter", handleMouseEnter);
      cardLink.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [slides]);

  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col px-4 pt-2 pb-12 text-[#0C1412] sm:px-6 sm:pt-4 sm:pb-16 md:px-12 md:pt-6 md:pb-20 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Mobile: Single Card with Dots | Desktop: 3-Column Grid Layout */}
        <div className="relative">
          {/* Mobile View: Show only active card */}
          <div className="md:hidden">
            {topCards.map((card, index) => (
              <Link
                key={`top-card-mobile-${index}`}
                href={card.href}
                className={`grid grid-cols-[2.5fr_6.5fr] gap-3 transition-opacity duration-300 ease-in-out ${
                  index === activeCardIndex
                    ? isLoaded
                      ? "opacity-100"
                      : "opacity-0"
                    : "hidden"
                }`}
              >
                {/* Card Image with Rounded Corners - Left Side */}
                <div 
                  ref={(el) => {
                    if (el && index === activeCardIndex) {
                      cardImageRefs.current[index] = el;
                    }
                  }}
                  className="relative aspect-[13/9] w-full overflow-hidden rounded-md bg-gray-200"
                >
                  <Image
                    src={card.src}
                    alt={card.title || "Article image"}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    className="object-cover"
                    sizes="50vw"
                    quality={75}
                  />
                </div>

                {/* Card Content - Right Side */}
                <div className="flex flex-1 flex-col justify-center">
                  {/* Date and Author - Light Grey with Slash Separator - Top */}
                  {(card.date || card.author) && (
                    <div className="mb-2 text-[12px] font-medium uppercase tracking-wide text-gray-600">
                      {card.date && formatDate(card.date)}
                      {card.date && card.author && " / "}
                      {card.author && <span className="text-gray-500">{card.author}</span>}
                    </div>
                  )}

                  {/* Title - Bold Black, Truncated */}
                  {card.title && (
                    <h2 className="line-clamp-3 text-lg font-bold leading-tight text-black sm:text-xl md:text-lg hover:underline">
                      {card.title}
                    </h2>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop View: Show all 3 cards in grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-1 lg:gap-2">
            {topCards.map((card, index) => (
              <Link
                key={`top-card-desktop-${index}`}
                href={card.href}
                className={`relative grid grid-cols-[4fr_5fr] gap-4 md:pr-6 lg:pr-8 ${
                  index < topCards.length - 1 ? "md:border-r-2 md:border-gray-400" : ""
                } ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Image with Rounded Corners - Left Side */}
                <div 
                  ref={(el) => {
                    if (el) {
                      cardImageRefs.current[index] = el;
                    }
                  }}
                  className="relative aspect-[13/9] w-full overflow-hidden rounded-md bg-gray-200"
                >
                  <Image
                    src={card.src}
                    alt={card.title || "Article image"}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                    quality={75}
                  />
                </div>

                {/* Card Content - Right Side */}
                <div className="flex flex-1 flex-col justify-center">
                  {/* Date and Author - Light Grey with Slash Separator - Top */}
                  {(card.date || card.author) && (
                    <div className="mb-2 text-[12px] font-medium uppercase tracking-wide text-gray-600">
                      {card.date && formatDate(card.date)}
                      {card.date && card.author && " / "}
                      {card.author && <span className="text-gray-500">{card.author}</span>}
                    </div>
                  )}

                  {/* Title - Bold Black, Truncated */}
                  {card.title && (
                    <h2 className="line-clamp-3 text-base font-bold leading-tight text-black sm:text-lg md:text-lg hover:underline">
                      {card.title}
                    </h2>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Dot Navigation - Only visible on mobile */}
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            {topCards.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCardIndex(index);
                }}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeCardIndex
                    ? "bg-black scale-125"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Row: Large Featured Article Card - Spans All Columns */}
        <div
          className={`mt-4 md:mt-5 lg:mt-6 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <Link
            href={featuredCard.href}
            className="group relative block overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
          >
            {/* Featured Card Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200 md:aspect-[22/9]">
              <Image
                src={featuredCard.src}
                alt={featuredCard.title || "Featured article image"}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100vw"
                quality={75}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Category and Sponsored Tags */}
              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-3 sm:left-6 sm:top-6">
                {featuredCard.category && (
                  <span className="rounded bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-black sm:px-4 sm:py-2 sm:text-[10px] md:text-[11px]">
                    {featuredCard.category}
                  </span>
                )}
                {featuredCard.sponsored && (
                  <span className="flex items-center gap-1.5 rounded-full bg-gray-800/90 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-[10px] md:text-[11px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 sm:h-3.5 sm:w-3.5"
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

              {/* Featured Card Content Overlay */}
              <div 
                ref={featuredContentRef}
                className="absolute bottom-0 left-0 inline-block pl-4 pt-6 pr-6 pb-6 text-white sm:pl-6 sm:pt-8 sm:pr-8 sm:pb-8 md:pt-10 md:pr-10 md:pb-10 lg:pt-12 lg:pr-12 lg:pb-12 max-w-[75%] sm:max-w-[65%] md:max-w-[55%] lg:max-w-[50%]"
              >
                {/* Date and Author */}
                <div className="mb-1 flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-wide text-white/90 sm:mb-2">
                  {featuredCard.date && (
                    <span>{formatDate(featuredCard.date)}</span>
                  )}
                  {featuredCard.author && (
                    <>
                      {featuredCard.date && <span className="text-white/60">•</span>}
                      <span>{featuredCard.author}</span>
                    </>
                  )}
                </div>

                {/* Featured Title - SEO optimized h1 */}
                {featuredCard.title && (
                  <h1 className="text-lg font-bold leading-tight text-white sm:text-xl md:text-lg lg:text-xl xl:text-2xl">
                    {featuredCard.title}
                  </h1>
                )}

                {/* Featured Description */}
                {featuredCard.description && (
                  <p 
                    ref={featuredParagraphRef}
                    className="mt-1.5 line-clamp-3 text-base leading-relaxed text-white/95 sm:mt-2 sm:text-base md:text-base lg:line-clamp-3"
                  >
                    {featuredCard.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}


