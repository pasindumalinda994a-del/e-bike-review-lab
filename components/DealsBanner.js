"use client";

import AnimatedButton from "@/components/AnimatedButton";
import BannerImageCarousel from "@/components/deals/BannerImageCarousel";
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
    activeIndex,
    isFading,
    prefersReducedMotion,
    bannerImages,
    activeImageIndex,
    handleDismiss,
    handleSelectDeal,
    handleSelectImage,
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

  const hasBannerImages = bannerImages.length > 0;

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
        <div className="grid grid-cols-1 items-center gap-3 py-2.5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 md:py-3">
          <div
            className={`min-w-0 md:max-w-xs lg:max-w-sm transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Link
              href={currentDeal.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1412]"
            >
              <p className="text-sm font-semibold leading-snug text-white group-hover:text-[#a5a4ff] sm:text-base">
                {currentDeal.headline}
              </p>
              {currentDeal.teaser ? (
                <p className="mt-0.5 text-xs font-medium text-emerald-300">
                  {currentDeal.teaser}
                </p>
              ) : null}
            </Link>
          </div>

          {hasBannerImages ? (
            <div className="flex justify-center px-0 md:px-2">
              <BannerImageCarousel
                images={bannerImages}
                href={currentDeal.href}
                activeIndex={activeImageIndex}
                onSelect={handleSelectImage}
                className="w-full min-w-[280px] max-w-[500px] sm:min-w-[340px] lg:max-w-[540px]"
              />
            </div>
          ) : (
            <div className="hidden md:block" aria-hidden="true" />
          )}

          <div
            className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-end transition-opacity duration-300 ${
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
              <ArrowRight
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
            </AnimatedButton>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss deals banner"
              className="shrink-0 rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
