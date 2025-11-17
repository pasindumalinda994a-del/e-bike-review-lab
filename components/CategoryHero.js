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
            transform: `translateY(${scrollY * 0.2}px) scale(1.06)`,
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
            quality={85}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/50" />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 md:px-10 lg:px-16">
        <h1
          className={`max-w-3xl text-center text-2xl font-bold leading-[1.05] tracking-tight text-white transition-all duration-700 delay-200 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {categoryName}
        </h1>
      </div>

      <div
        className={`absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center text-[10px] font-medium uppercase tracking-[0.3em] text-white/60 transition-all duration-700 delay-500 sm:bottom-10 sm:text-xs sm:tracking-[0.4em] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span>Scroll to view guides</span>
        <div className="mt-2 flex flex-col items-center sm:mt-3">
          <span className="h-6 w-px bg-white/30 sm:h-8" />
          <svg
            className="mt-2 h-3 w-3 animate-bounce sm:mt-3 sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}


