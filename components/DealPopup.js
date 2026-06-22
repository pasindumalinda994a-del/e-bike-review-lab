"use client";

import AnimatedButton from "@/components/AnimatedButton";
import SidebarImageCarousel from "@/components/deals/SidebarImageCarousel";
import {
  BannerCountdown,
} from "@/components/deals/useDealsBanner";
import { useDealPopup } from "@/components/deals/useDealPopup";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SHOW_DELAY_MS = 400;

export default function DealPopup({ activeDeals = [] }) {
  const {
    shouldRender,
    currentDeal,
    isFading,
    prefersReducedMotion,
    carouselImages,
    activeImageIndex,
    handleDismiss,
    handleSelectImage,
    handlePauseEnter,
    handlePauseLeave,
    handlePauseBlur,
  } = useDealPopup(activeDeals);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!shouldRender) {
      setIsReady(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsReady(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [shouldRender]);

  useEffect(() => {
    if (!isReady) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReady, handleDismiss]);

  if (!shouldRender || !isReady) {
    return null;
  }

  const hasImages = carouselImages.length > 0;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close deal popup"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Special deal offer"
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-xl border border-[#3e3ce7]/30 bg-gradient-to-br from-[#0C1412] to-[#1a1a2e] text-white shadow-2xl"
        onMouseEnter={handlePauseEnter}
        onMouseLeave={handlePauseLeave}
        onFocusCapture={handlePauseEnter}
        onBlurCapture={handlePauseBlur}
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close deal popup"
          className="absolute right-3 top-3 z-20 rounded-md bg-black/40 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {hasImages ? (
          <div className="p-3 pb-0">
            <SidebarImageCarousel
              images={carouselImages}
              href={currentDeal.href}
              activeIndex={activeImageIndex}
              onSelect={handleSelectImage}
              onLinkClick={handleDismiss}
            />
          </div>
        ) : null}

        <div className="space-y-4 p-4 pt-3 text-center">
          <div
            className={`transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Link
              href={currentDeal.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C1412]"
            >
              <p className="text-base font-semibold leading-snug text-white group-hover:text-[#a5a4ff]">
                {currentDeal.headline}
              </p>
              {currentDeal.teaser ? (
                <p className="mt-1 text-sm font-medium text-emerald-300">
                  {currentDeal.teaser}
                </p>
              ) : null}
            </Link>
          </div>

          <div
            className={`space-y-4 transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <BannerCountdown
              endAt={currentDeal.dealEndsAt}
              prefersReducedMotion={prefersReducedMotion}
              layout="stacked"
              centered
            />

            <AnimatedButton
              href={currentDeal.href}
              onClick={handleDismiss}
              className="w-full justify-center bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm text-white shadow-sm transition-all hover:brightness-110"
            >
              View Deal
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </AnimatedButton>

            <button
              type="button"
              onClick={handleDismiss}
              className="mx-auto block text-xs text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
