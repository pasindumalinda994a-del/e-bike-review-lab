"use client";

import AnimatedButton from "@/components/AnimatedButton";
import {
  BannerCountdown,
  RotationDots,
  useDealsBanner,
} from "@/components/deals/useDealsBanner";
import { DEALS_BANNER_STORAGE_KEY } from "@/lib/active-deals";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

export default function DealsBanner({ activeDeals = [] }) {
  const {
    shouldRender,
    liveDeals,
    currentDeal,
    headlineText,
    activeIndex,
    isFading,
    prefersReducedMotion,
    handleDismiss,
    handleSelectDeal,
    handlePauseEnter,
    handlePauseLeave,
    handlePauseBlur,
  } = useDealsBanner({
    activeDeals,
    storageKey: DEALS_BANNER_STORAGE_KEY,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <section
      role="region"
      aria-label="Active deals promotion"
      className="relative z-[60] border-b border-[#3e3ce7]/30 bg-gradient-to-r from-[#0C1412] to-[#1a1a2e] text-white"
      onMouseEnter={handlePauseEnter}
      onMouseLeave={handlePauseLeave}
      onFocusCapture={handlePauseEnter}
      onBlurCapture={handlePauseBlur}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-2 py-2.5 md:flex-row md:items-center md:gap-3 md:py-2">
          <div className="flex min-w-0 items-start gap-2 md:flex-1 md:items-center">
            <span className="mt-0.5 shrink-0 rounded-sm bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black md:mt-0">
              Limited Time
            </span>

            <div
              className={`min-w-0 flex-1 transition-opacity duration-300 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              <Link
                href={currentDeal.href}
                className="block truncate text-sm font-semibold leading-snug hover:text-[#a5a4ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1412]"
              >
                {headlineText}
              </Link>
              <p className="mt-0.5 hidden truncate text-xs text-white/70 sm:block">
                {currentDeal.subline}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss deals banner"
              className="ml-1 shrink-0 rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] md:hidden"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div
            className={`flex flex-wrap items-center gap-2 sm:gap-3 md:shrink-0 transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <BannerCountdown
              endAt={currentDeal.dealEndsAt}
              prefersReducedMotion={prefersReducedMotion}
            />

            <RotationDots
              count={liveDeals.length}
              activeIndex={activeIndex}
              onSelect={handleSelectDeal}
            />

            <AnimatedButton
              href={currentDeal.href}
              className="shrink-0 bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-1.5 text-xs text-white shadow-sm transition-all hover:brightness-110 sm:px-4 sm:py-2 sm:text-sm"
            >
              View Deal
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </AnimatedButton>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss deals banner"
              className="hidden shrink-0 rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] md:inline-flex"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
