"use client";

import AnimatedButton from "@/components/AnimatedButton";
import {
  BannerCountdown,
  RotationDots,
  useDealsBanner,
} from "@/components/deals/useDealsBanner";
import { DEALS_SIDEBAR_STORAGE_KEY } from "@/lib/active-deals";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

export default function DealsSidebarBanner({ activeDeals = [] }) {
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
    storageKey: DEALS_SIDEBAR_STORAGE_KEY,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <section
      role="region"
      aria-label="Active deals promotion"
      className="rounded-lg border border-[#3e3ce7]/30 bg-gradient-to-r from-[#0C1412] to-[#1a1a2e] p-5 text-white"
      onMouseEnter={handlePauseEnter}
      onMouseLeave={handlePauseLeave}
      onFocusCapture={handlePauseEnter}
      onBlurCapture={handlePauseBlur}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="shrink-0 rounded-sm bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black">
          Limited Time
        </span>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss deals banner"
          className="shrink-0 rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div
        className={`space-y-4 transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div>
          <Link
            href={currentDeal.href}
            className="block text-sm font-semibold leading-snug hover:text-[#a5a4ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1412]"
          >
            {headlineText}
          </Link>
          <p className="mt-1.5 text-xs leading-relaxed text-white/70">
            {currentDeal.subline}
          </p>
        </div>

        <BannerCountdown
          endAt={currentDeal.dealEndsAt}
          prefersReducedMotion={prefersReducedMotion}
          layout="stacked"
        />

        <RotationDots
          count={liveDeals.length}
          activeIndex={activeIndex}
          onSelect={handleSelectDeal}
        />

        <AnimatedButton
          href={currentDeal.href}
          className="w-full justify-center bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm text-white shadow-sm transition-all hover:brightness-110"
        >
          View Deal
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </AnimatedButton>
      </div>
    </section>
  );
}
