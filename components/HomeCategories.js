"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { categories } from "@/content/categories";

// Icon-based grid to quickly jump into the main categories.
export default function HomeCategories() {
  const scopeRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  const cardRefs = useRef([]);
  const bgRefs = useRef([]);
  const thumbRefs = useRef([]);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);
  const contentRefs = useRef([]);
  const exploreRefs = useRef([]);
  const timelinesRef = useRef([]);

  const setCardRef = useCallback((idx) => {
    return (el) => {
      cardRefs.current[idx] = el;
    };
  }, []);

  const setBgRef = useCallback((idx) => {
    return (el) => {
      bgRefs.current[idx] = el;
    };
  }, []);

  const setThumbRef = useCallback((idx) => {
    return (el) => {
      thumbRefs.current[idx] = el;
    };
  }, []);

  const setTitleRef = useCallback((idx) => {
    return (el) => {
      titleRefs.current[idx] = el;
    };
  }, []);

  const setDescRef = useCallback((idx) => {
    return (el) => {
      descRefs.current[idx] = el;
    };
  }, []);

  const setContentRef = useCallback((idx) => {
    return (el) => {
      contentRefs.current[idx] = el;
    };
  }, []);

  const setExploreRef = useCallback((idx) => {
    return (el) => {
      exploreRefs.current[idx] = el;
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mq.matches;
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      timelinesRef.current = cardRefs.current.map((card, i) => {
        const bg = bgRefs.current[i];
        const thumb = thumbRefs.current[i];
        const title = titleRefs.current[i];
        const desc = descRefs.current[i];
        const content = contentRefs.current[i];
        const explore = exploreRefs.current[i];
        if (!card || !bg || !thumb || !title || !desc || !content || !explore)
          return null;

        const isMobile = window.innerWidth < 640;
        gsap.set(card, { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" });
        gsap.set(bg, { autoAlpha: 0, scale: 1.08 });
        gsap.set(thumb, { y: 0, scale: 1, transformOrigin: "50% 50%" });
        gsap.set(title, { color: "#0C1412" });
        gsap.set(desc, { color: "rgba(12, 20, 18, 0.70)" });
        gsap.set(content, { y: 0 });
        gsap.set(explore, { autoAlpha: isMobile ? 1 : 0, y: isMobile ? 0 : 18 });

        const tl = gsap
          .timeline({
            paused: true,
            defaults: { ease: "power3.out" },
          })
          // Background image “appears from the card background”
          .to(
            bg,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.35,
            },
            0
          )
          // Text turns white on hover for contrast
          .to(
            title,
            {
              color: "#ffffff",
              duration: 0.18,
              ease: "power2.out",
            },
            0
          )
          .to(
            desc,
            {
              color: "rgba(255, 255, 255, 0.85)",
              duration: 0.2,
              ease: "power2.out",
            },
            0.02
          )
          // Keep the text stack visually centered after the thumbnail lifts
          .to(
            content,
            {
              y: -28,
              duration: 0.22,
            },
            0
          )
          // CTA slides up from the bottom of the content area
          .to(
            explore,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.22,
              ease: "power3.out",
            },
            0.06
          )
          // White card container subtly lifts + shadow
          .to(
            card,
            {
              y: -6,
              boxShadow: "0 18px 40px rgba(12, 20, 18, 0.16)",
              duration: 0.22,
            },
            0
          )
          // Thumbnail “moves to top immediately” (transform = no reflow, so it leaves the block visually)
          .to(
            thumb,
            {
              y: -150,
              scale: 1.05,
              duration: 0.5,
              ease: "power3.out",
            },
            0
          );

        return tl;
      });
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = useCallback((idx) => {
    if (prefersReducedMotionRef.current) return;
    const tl = timelinesRef.current[idx];
    if (!tl) return;
    tl.timeScale(1).play();
  }, []);

  const handleLeave = useCallback((idx) => {
    if (prefersReducedMotionRef.current) return;
    const tl = timelinesRef.current[idx];
    if (!tl) return;
    tl.timeScale(1.1).reverse();
  }, []);

  return (
    <section
      aria-labelledby="top-categories"
      ref={scopeRef}
      className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-12 text-[#0C1412] sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-16 bg-[#F5F5F5]"
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 sm:space-y-12">
        <header className="mb-6 sm:mb-8">
          <h2
            id="top-categories"
            className="font-inter text-2xl font-normal text-[#000000] sm:text-xl md:text-4xl tracking-[1.5em] leading-[2.5em]"
          >
            Top Categories
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 justify-items-center">
          {categories.map((category, idx) => {
            const href = `/${category.slug}`;
            return (
              <li key={href} className="w-full">
                <Link
                  href={href}
                  ref={setCardRef(idx)}
                  onMouseEnter={() => handleEnter(idx)}
                  onMouseLeave={() => handleLeave(idx)}
                  onFocus={() => handleEnter(idx)}
                  onBlur={() => handleLeave(idx)}
                  className="group relative isolate flex aspect-[16/9] sm:aspect-[6/5] flex-col rounded-lg bg-white p-4 sm:p-6 justify-center items-center text-center overflow-hidden"
                >
                  {/* Background image layer (reveals on hover via GSAP) */}
                  {category.heroImage && (
                    <div
                      ref={setBgRef(idx)}
                      className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
                      aria-hidden="true"
                    >
                      <Image
                        src={category.heroImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      {/* Dark overlay so text can go white on hover */}
                      <div className="absolute inset-0 bg-black/55" />
                    </div>
                  )}

                  <div
                    ref={setContentRef(idx)}
                    className="relative z-10 flex w-full flex-col items-center gap-3 text-center"
                  >
                    <div className="flex w-full justify-center">
                      <div
                        ref={setThumbRef(idx)}
                        className="inline-block relative aspect-square w-20 sm:w-20 rounded-xl bg-[#0C1412]/5 p-2 overflow-hidden will-change-transform"
                      >
                        {category.heroImage && (
                          <Image
                            src={category.heroImage}
                            alt={category.name}
                            fill
                            className="object-cover rounded-xl"
                            sizes="(max-width: 640px) 80px, 80px"
                          />
                        )}
                      </div>
                    </div>
                    <h3
                      ref={setTitleRef(idx)}
                      className="text-lg font-bold leading-tight tracking-tight text-[#0C1412] sm:text-xl"
                    >
                      {category.name}
                    </h3>
                    <p
                      ref={setDescRef(idx)}
                      className="text-base leading-normal text-[#0C1412]/70 line-clamp-2 sm:text-base"
                    >
                      {category.description}
                    </p>
                    <span
                      ref={setExploreRef(idx)}
                      className="mt-2 inline-flex items-center justify-center gap-2 text-base font-semibold text-[#0C1412] sm:text-sm sm:text-white underline-offset-4 decoration-[#0C1412] sm:decoration-white hover:underline"
                    >
                      Explore category
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
              </li>
            );
          })}
        </ul>
      </div>

      {/* <div className="mx-auto max-w-7xl">
        <div className="mt-16 rounded-3xl border border-[#0C1412]/10 bg-gradient-to-br from-[#3e3ce7]/5 to-[#3e3ce7]/10 px-6 py-10 shadow-lg sm:mt-20 sm:px-10 sm:py-14 md:px-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] md:items-center md:gap-12">
          <div className="space-y-4 text-left sm:space-y-5">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#0C1412] sm:text-3xl md:text-4xl">
              Welcome to EBikeReviewLab
            </h3>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3e3ce7] transition-colors duration-300 hover:text-[#3e3ce7]/80 sm:text-base"
            >
              Learn more about us
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
            </Link>
          </div>
          <div className="space-y-4 text-left sm:space-y-5">
            <p className="text-base leading-relaxed text-[#0C1412]/90 sm:text-lg">
              We help you find the best electric bikes through comprehensive testing, unbiased reviews, and up-to-date industry insights. Our mission is to guide you toward confident purchase decisions with detailed guides and real-world testing.
            </p>
            <p className="text-sm italic text-[#0C1412]/70 sm:text-base">
              Years of industry experience. Always current. Your trusted e-bike guide.
            </p>
          </div>
        </div>
      </div>
      </div> */}
    </section>
  );
}

