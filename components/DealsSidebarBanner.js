"use client";

import AnimatedButton from "@/components/AnimatedButton";
import SidebarImageCarousel from "@/components/deals/SidebarImageCarousel";
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
    activeIndex,
    isFading,
    prefersReducedMotion,
    carouselImages,
    activeImageIndex,
    handleDismiss,
    handleSelectDeal,
    handleSelectImage,
    handlePauseEnter,
    handlePauseLeave,
    handlePauseBlur,
  } = useDealsBanner({
    activeDeals,
    storageKey: DEALS_SIDEBAR_STORAGE_KEY,
    imageKey: "sidebar",
  });

  if (!shouldRender) {
    return null;
  }

  const hasImages = carouselImages.length > 0;

  return (
    <section
      role="region"
      aria-label="Active deals promotion"
      className="overflow-hidden rounded-lg border border-[#3e3ce7]/30 bg-gradient-to-br from-[#0C1412] to-[#1a1a2e] text-white shadow-sm"
      onMouseEnter={handlePauseEnter}
      onMouseLeave={handlePauseLeave}
      onFocusCapture={handlePauseEnter}
      onBlurCapture={handlePauseBlur}
    >
      {hasImages ? (
        <div className="relative p-3 pb-0">
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss deals banner"
            className="absolute right-2 top-2 z-10 rounded-md bg-black/40 p-1 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <SidebarImageCarousel
            images={carouselImages}
            href={currentDeal.href}
            activeIndex={activeImageIndex}
            onSelect={handleSelectImage}
          />
        </div>
      ) : null}

      <div className="space-y-3 p-4 pt-3">
        {!hasImages ? (
          <div className="flex items-start justify-end">
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss deals banner"
              className="shrink-0 rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <div
          className={`transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Link
            href={currentDeal.href}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1412]"
          >
            <p className="text-sm font-semibold leading-snug text-white group-hover:text-[#a5a4ff]">
              {currentDeal.headline}
            </p>
            {currentDeal.teaser ? (
              <p className="mt-1 text-xs font-medium text-emerald-300">
                {currentDeal.teaser}
              </p>
            ) : null}
          </Link>
        </div>

        <div
          className={`space-y-3 transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <BannerCountdown
            endAt={currentDeal.dealEndsAt}
            prefersReducedMotion={prefersReducedMotion}
            layout="stacked"
            centered
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
      </div>
    </section>
  );
}
