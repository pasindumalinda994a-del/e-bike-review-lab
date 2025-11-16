"use client";

import { useEffect, useState } from "react";

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
    <section className="relative isolate flex h-[70vh] min-h-[520px] w-screen overflow-hidden bg-[#0C1412] text-white md:h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[50ms] will-change-transform"
        style={{
          backgroundImage: image ? `url("${encodeURI(image)}")` : undefined,
          transform: `translateY(${scrollY * 0.2}px) scale(1.06)`,
        }}
        aria-hidden
      />

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

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 pb-20 pt-28 sm:px-10 md:px-16">
        <h1
          className={`max-w-3xl text-center text-4xl font-bold leading-[1.05] tracking-tight text-white transition-all duration-700 delay-200 sm:text-5xl md:text-6xl lg:text-7xl ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {categoryName}
        </h1>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center text-xs font-medium uppercase tracking-[0.4em] text-white/60 transition-all duration-700 delay-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span>Scroll to view guides</span>
        <div className="mt-3 flex flex-col items-center">
          <span className="h-8 w-px bg-white/30" />
          <svg
            className="mt-3 h-4 w-4 animate-bounce"
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


