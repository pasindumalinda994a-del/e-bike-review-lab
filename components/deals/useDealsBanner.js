"use client";

import CountdownUnit from "@/components/CountdownUnit";
import { getBannerDismissKey } from "@/lib/active-deals";
import { formatCountdown, getCountdownParts } from "@/lib/deal-countdown";
import { useCallback, useEffect, useMemo, useState } from "react";

export const ROTATION_MS = 8000;
export const IMAGE_ROTATION_MS = 6000;

function pad(value) {
  return String(value).padStart(2, "0");
}

function buildCountdownUnits(parts) {
  if (!parts) return [];

  return [
    parts.days > 0 ? { value: pad(parts.days), label: "Days" } : null,
    { value: pad(parts.hours), label: "Hours" },
    { value: pad(parts.minutes), label: "Min" },
    { value: pad(parts.seconds), label: "Sec" },
  ].filter(Boolean);
}

export function BannerCountdown({
  endAt,
  prefersReducedMotion,
  layout = "responsive",
  centered = false,
}) {
  const [parts, setParts] = useState(null);
  const [compactLabel, setCompactLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      const nextParts = getCountdownParts(endAt);
      const nextLabel = formatCountdown(endAt);

      if (!nextParts || !nextLabel) {
        setParts(null);
        setCompactLabel("");
        return;
      }

      setParts(nextParts);
      setCompactLabel(prefersReducedMotion ? "Ends soon" : nextLabel);
    };

    tick();
    const intervalMs = prefersReducedMotion ? 60000 : 1000;
    const intervalId = window.setInterval(tick, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [endAt, prefersReducedMotion]);

  if (!parts) return null;

  const units = buildCountdownUnits(parts);

  if (layout === "stacked") {
    return (
      <div
        className={`flex flex-col gap-2 ${centered ? "items-center text-center" : ""}`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
          Ends in
        </span>
        <div
          className={`flex flex-wrap items-center gap-1 ${centered ? "justify-center" : ""}`}
        >
          {units.map((unit) => (
            <CountdownUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              size="compact"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="text-xs font-semibold tabular-nums text-rose-300 md:hidden">
        Ends in {compactLabel}
      </p>
      <div className="hidden items-center gap-1.5 md:flex">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
          Ends in
        </span>
        <div className="flex items-center gap-1">
          {units.map((unit) => (
            <CountdownUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              size="compact"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function RotationDots({ count, activeIndex, onSelect }) {
  if (count <= 1) return null;

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label="Deal rotation indicators"
    >
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Show deal ${index + 1} of ${count}`}
          aria-current={index === activeIndex ? "true" : undefined}
          onClick={() => onSelect(index)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            index === activeIndex
              ? "w-4 bg-[#3e3ce7]"
              : "w-1.5 bg-white/30 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}

function filterCarouselImages(images = []) {
  return images.filter((image) => image?.src && image?.alt);
}

export function useDealsBanner({
  activeDeals = [],
  storageKey,
  imageKey = "banner",
}) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [liveDeals, setLiveDeals] = useState(activeDeals);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dismissKey = useMemo(
    () => getBannerDismissKey(activeDeals),
    [activeDeals],
  );

  useEffect(() => {
    setMounted(true);

    try {
      const dismissed = localStorage.getItem(storageKey);
      setIsVisible(dismissed !== dismissKey);
    } catch {
      setIsVisible(true);
    }
  }, [dismissKey, storageKey]);

  useEffect(() => {
    setLiveDeals(activeDeals);
    setActiveIndex(0);
    setActiveImageIndex(0);
  }, [activeDeals]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const pruneExpiredDeals = useCallback(() => {
    setLiveDeals((current) => {
      const next = current.filter((deal) => getCountdownParts(deal.dealEndsAt));
      if (next.length === 0) {
        setIsVisible(false);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!mounted || !isVisible) return undefined;

    const intervalMs = prefersReducedMotion ? 60000 : 1000;
    const intervalId = window.setInterval(pruneExpiredDeals, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [mounted, isVisible, prefersReducedMotion, pruneExpiredDeals]);

  useEffect(() => {
    if (
      !mounted ||
      !isVisible ||
      liveDeals.length <= 1 ||
      isPaused ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setIsFading(true);
      window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % liveDeals.length);
        setIsFading(false);
      }, 300);
    }, ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [
    mounted,
    isVisible,
    liveDeals.length,
    isPaused,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (activeIndex >= liveDeals.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, liveDeals.length]);

  const currentDeal = liveDeals[activeIndex];

  const bannerImages = useMemo(
    () => filterCarouselImages(currentDeal?.bannerImages),
    [currentDeal],
  );

  const sidebarImages = useMemo(
    () => filterCarouselImages(currentDeal?.sidebarImages),
    [currentDeal],
  );

  const popupImages = useMemo(
    () => filterCarouselImages(currentDeal?.popupImages),
    [currentDeal],
  );

  const carouselImages =
    imageKey === "popup"
      ? popupImages.length > 0
        ? popupImages
        : sidebarImages
      : imageKey === "sidebar"
        ? sidebarImages
        : bannerImages;

  useEffect(() => {
    setActiveImageIndex(0);
  }, [currentDeal?.slug, imageKey]);

  useEffect(() => {
    if (
      !mounted ||
      !isVisible ||
      carouselImages.length <= 1 ||
      isPaused ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % carouselImages.length);
    }, IMAGE_ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [
    mounted,
    isVisible,
    carouselImages.length,
    isPaused,
    prefersReducedMotion,
    currentDeal?.slug,
    imageKey,
  ]);

  useEffect(() => {
    if (
      activeImageIndex >= carouselImages.length &&
      carouselImages.length > 0
    ) {
      setActiveImageIndex(0);
    }
  }, [activeImageIndex, carouselImages.length]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(storageKey, dismissKey);
    } catch {
      // Ignore storage failures; banner still hides for this session.
    }
  };

  const handleSelectDeal = (index) => {
    if (index === activeIndex) return;
    setIsFading(true);
    window.setTimeout(() => {
      setActiveIndex(index);
      setIsFading(false);
    }, 300);
  };

  const handleSelectImage = (index) => {
    if (index === activeImageIndex) return;
    setActiveImageIndex(index);
  };

  const handlePauseEnter = () => setIsPaused(true);
  const handlePauseLeave = () => setIsPaused(false);
  const handlePauseBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  const headlineText = currentDeal?.teaser
    ? `${currentDeal.headline} — ${currentDeal.teaser}`
    : currentDeal?.headline;

  const shouldRender =
    mounted &&
    isVisible &&
    liveDeals.length > 0 &&
    currentDeal &&
    getCountdownParts(currentDeal.dealEndsAt);

  return {
    shouldRender,
    liveDeals,
    currentDeal,
    headlineText,
    activeIndex,
    isFading,
    prefersReducedMotion,
    bannerImages,
    sidebarImages,
    carouselImages,
    activeImageIndex,
    handleDismiss,
    handleSelectDeal,
    handleSelectImage,
    handlePauseEnter,
    handlePauseLeave,
    handlePauseBlur,
  };
}
