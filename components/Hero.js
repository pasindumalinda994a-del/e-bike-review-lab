"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/**
 * @typedef {Object} SlideContent
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [href]
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
 * Hero component with slider functionality.
 * Displays only: article title, description, and button.
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
    }));
  }, [description, image, images, slideContent, title]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Auto-rotate slides if multiple exist
    let autoRotate;
    if (slides.length > 1) {
      autoRotate = setInterval(() => {
        setActiveSlideIndex((prev) => (prev + 1) % slides.length);
      }, 7000);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      if (autoRotate) clearInterval(autoRotate);
    };
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

  const handlePrevious = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[activeSlideIndex] ?? slides[0];

  return (
    <section className="relative isolate flex h-screen w-screen overflow-hidden bg-[#0C1412] text-white">
      {/* Background Images - Slider */}
      {slides.map((slide, index) => {
        const isActive = index === activeSlideIndex;
        const isFirstSlide = index === 0;
        return (
          <div
            key={`${slide.src}-${index}`}
            className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateY(${scrollY * 0.3}px) scale(${
                isActive ? 1.12 : 1.05
              })`,
            }}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.title || "EBikeReviewLab hero slide"}
              fill
              priority={isFirstSlide}
              loading={isFirstSlide ? undefined : "lazy"}
              className="object-cover"
              sizes="100vw"
              quality={isFirstSlide ? 75 : 70}
              placeholder={isFirstSlide ? "blur" : undefined}
              blurDataURL={isFirstSlide ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=" : undefined}
            />
          </div>
        );
      })}

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#0F1412]/50 to-transparent"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] items-center justify-start px-4 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28 md:px-16 lg:px-24">
        <div className="max-w-3xl text-left">
          {/* Article Title - SEO optimized h1 */}
          {activeSlide.title && (
            <h1
              className={`text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-700 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              {activeSlide.title}
            </h1>
          )}

          {/* Article Description */}
          {activeSlide.description && (
            <p
              className={`mt-5 text-base leading-relaxed text-white/95 sm:mt-6 sm:text-lg md:text-xl lg:text-2xl transition-all duration-700 delay-300 font-light ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {activeSlide.description}
            </p>
          )}

          {/* CTA Button */}
          <Link
            href={activeSlide.href}
            className={`mt-8 inline-flex items-center justify-center rounded-full bg-[#3e3ce7] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3e3ce7]/30 transition-all duration-300 hover:bg-[#3e3ce7]/90 hover:shadow-xl hover:shadow-[#3e3ce7]/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 focus:ring-offset-[#0C1412] sm:mt-10 sm:px-8 sm:py-4 sm:text-base ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            aria-label={`Read more about ${activeSlide.title}`}
          >
            Explore this guide
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2.5 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Navigation Buttons - Only show if multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:border-[#3e3ce7] hover:bg-black/60 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 sm:left-6 sm:p-3.5 md:left-8 md:p-4"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:border-[#3e3ce7] hover:bg-black/60 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 sm:right-6 sm:p-3.5 md:right-8 md:p-4"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}


