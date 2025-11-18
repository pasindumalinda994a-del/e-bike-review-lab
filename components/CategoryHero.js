"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Animated hero used at the top of every category page.
export default function CategoryHero({ categoryName, image }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative isolate flex h-[60vh] min-h-[400px] w-screen overflow-hidden bg-[#0C1412] text-white sm:h-[70vh] sm:min-h-[520px] md:h-[80vh]">
      {image && (
        <div
          className="absolute inset-0 transition-transform duration-[50ms] will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(1.12)`,
          }}
          aria-hidden
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={75}
          />
        </div>
      )}

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#0F1412]/50 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 md:px-10 lg:px-16">
        <h1
          className={`max-w-4xl text-center text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-700 delay-200 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {categoryName}
        </h1>
      </div>

      <div
        className={`absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center text-[10px] font-medium uppercase tracking-[0.3em] text-white/70 transition-all duration-700 delay-500 sm:bottom-10 sm:text-xs sm:tracking-[0.4em] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span>Scroll to view guides</span>
        <div className="mt-2 flex flex-col items-center sm:mt-3">
          <span className="h-6 w-px bg-white/40 sm:h-8" />
          <svg
            className="mt-2 h-3 w-3 animate-bounce sm:mt-3 sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}


