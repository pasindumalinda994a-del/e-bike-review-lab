"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CountdownUnit from "@/components/CountdownUnit";
import { formatCountdown, getCountdownParts } from "@/lib/deal-countdown";

export default function DealCountdown({
  endAt,
  headline = "Deal ends soon",
  subline = "Grab these prices before the promotion closes",
}) {
  const [parts, setParts] = useState(null);
  const [compactLabel, setCompactLabel] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const tick = () => {
      const nextParts = getCountdownParts(endAt);
      const nextLabel = formatCountdown(endAt);

      if (!nextParts || !nextLabel) {
        setIsExpired(true);
        setParts(null);
        setCompactLabel("");
        return;
      }

      setIsExpired(false);
      setParts(nextParts);
      setCompactLabel(prefersReducedMotion ? "Ends soon" : nextLabel);
    };

    tick();
    const intervalMs = prefersReducedMotion ? 60000 : 1000;
    const intervalId = window.setInterval(tick, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [endAt, prefersReducedMotion]);

  if (isExpired || !parts) {
    return null;
  }

  const pad = (value) => String(value).padStart(2, "0");
  const units = [
    parts.days > 0 ? { value: pad(parts.days), label: "Days" } : null,
    { value: pad(parts.hours), label: "Hours" },
    { value: pad(parts.minutes), label: "Min" },
    { value: pad(parts.seconds), label: "Sec" },
  ].filter(Boolean);

  return (
    <section
      className="overflow-hidden rounded-xl bg-gradient-to-r from-[#0C1412] to-[#1a1a2e] p-4 shadow-lg sm:p-5"
      aria-label="Deal countdown"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <Image
            src="/icons/gift.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
            className="mt-0.5 h-6 w-6 shrink-0 brightness-0 invert sm:mt-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white sm:text-base">
              {headline}
            </p>
            {subline ? (
              <p className="mt-1 text-xs leading-snug text-white/75 sm:text-sm">
                {subline}
              </p>
            ) : null}
            <p className="mt-2 text-xs font-bold tabular-nums text-white sm:hidden">
              Ends in {compactLabel}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            Ends in
          </span>
          <div className="flex items-center gap-1.5">
            {units.map((unit) => (
              <CountdownUnit
                key={unit.label}
                value={unit.value}
                label={unit.label}
                valueClassName="text-white"
                labelClassName="text-white/70"
                containerClassName="border border-white/20 bg-white/15"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
