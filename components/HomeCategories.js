"use client";

import Link from "next/link";
import {
  BatteryCharging,
  Bike,
  Gauge,
  Map,
  Plug,
  Shield,
} from "lucide-react";
import { categories } from "@/content/categories";

const ICON_COLOR = "#3e3ce7";
const ICONS = [Bike, BatteryCharging, Gauge, Map, Plug, Shield];

// Icon-based grid to quickly jump into the main categories.
export default function HomeCategories() {
  const categoryCards = categories.map((category, index) => {
    const Icon = ICONS[index % ICONS.length];
    return {
      label: category.name,
      href: `/${category.slug}`,
      Icon,
    };
  });

  return (
    <section
      aria-labelledby="top-categories"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:py-20 lg:px-16"
    >
      <div className="space-y-8 p-4 text-center sm:space-y-12 sm:p-8">
        <header className="space-y-2 text-center sm:space-y-3">
          <h2
            id="top-categories"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3e3ce7] sm:text-sm sm:tracking-[0.4em]"
          >
            Top Categories
          </h2>
          <p className="text-2xl font-bold tracking-tight text-[#0C1412] sm:text-3xl">
            E-Bike Guides Built Around Real Riding Styles
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {categoryCards.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col items-center justify-between gap-3 sm:gap-4"
              >
                <span className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
                  <Icon
                    strokeWidth={1.75}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                    style={{ color: ICON_COLOR }}
                  />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#0C1412] transition group-hover:text-[#3e3ce7] sm:text-sm">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-[#3e3ce7]/10 px-4 py-8 shadow-lg shadow-[rgba(12,20,18,0.35)] sm:mt-12 sm:px-8 sm:py-12">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] md:items-center md:gap-10">
          <div className="space-y-3 text-left sm:space-y-4">
            <p className="text-xl font-bold uppercase tracking-[0.15em] text-[#0C1412] sm:text-2xl md:text-3xl md:tracking-[0.2em]">
              Welcome to EBikeReviewLab
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-xs font-semibold text-[#0C1412] underline decoration-[#3e3ce7]/60 decoration-2 underline-offset-4 transition hover:text-[#3e3ce7] sm:text-sm"
            >
              Learn more about us →
            </Link>
          </div>
          <div className="space-y-3 text-left text-[#0C1412]/90 sm:space-y-4">
            <p className="text-sm leading-relaxed sm:text-base">
              We help you find the best electric bikes through comprehensive testing, unbiased reviews, and up-to-date industry insights. Our mission is to guide you toward confident purchase decisions with detailed guides and real-world testing.
            </p>
            <p className="text-xs text-[#0C1412]/70 italic sm:text-sm">
              Years of industry experience. Always current. Your trusted e-bike guide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

