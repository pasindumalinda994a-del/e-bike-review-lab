"use client";

import AnimatedButton from "@/components/AnimatedButton";
import CountdownUnit from "@/components/CountdownUnit";
import {
  DEALS_BANNER_STORAGE_KEY,
  getBannerDismissKey,
} from "@/lib/active-deals";
import { formatCountdown, getCountdownParts } from "@/lib/deal-countdown";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const ROTATION_MS = 8000;

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

function BannerCountdown({ endAt, prefersReducedMotion }) {
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

function RotationDots({ count, activeIndex, onSelect }) {
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

export default function DealsBanner({ activeDeals = [] }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [liveDeals, setLiveDeals] = useState(activeDeals);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dismissKey = useMemo(
    () => getBannerDismissKey(activeDeals),
    [activeDeals],
  );

  useEffect(() => {
    setMounted(true);

    try {
      const dismissed = localStorage.getItem(DEALS_BANNER_STORAGE_KEY);
      setIsVisible(dismissed !== dismissKey);
    } catch {
      setIsVisible(true);
    }
  }, [dismissKey]);

  useEffect(() => {
    setLiveDeals(activeDeals);
    setActiveIndex(0);
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

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(DEALS_BANNER_STORAGE_KEY, dismissKey);
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

  if (!mounted || !isVisible || liveDeals.length === 0) {
    return null;
  }

  const currentDeal = liveDeals[activeIndex];
  if (!currentDeal || !getCountdownParts(currentDeal.dealEndsAt)) {
    return null;
  }

  const headlineText = currentDeal.teaser
    ? `${currentDeal.headline} — ${currentDeal.teaser}`
    : currentDeal.headline;

  return (
    <section
      role="region"
      aria-label="Active deals promotion"
      className="relative z-[60] border-b border-[#3e3ce7]/30 bg-gradient-to-r from-[#0C1412] to-[#1a1a2e] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-2 py-2.5 md:flex-row md:items-center md:gap-3 md:py-2">
          <div className="flex min-w-0 items-start gap-2 md:flex-1 md:items-center">
            <span className="mt-0.5 shrink-0 rounded-full bg-[#3e3ce7]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#a5a4ff] md:mt-0">
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
