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
      className="w-full"
    >
      <div className="space-y-10 text-center sm:space-y-12">
        <header className="space-y-3 text-center sm:space-y-4">
          <h2
            id="top-categories"
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#3e3ce7] sm:text-sm"
          >
            Top Categories
          </h2>
          <p className="text-3xl font-bold leading-tight tracking-tight text-[#0C1412] sm:text-4xl md:text-5xl">
            E-Bike Guides Built Around Real Riding Styles
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {categoryCards.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-[#0C1412]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#3e3ce7]/30 hover:shadow-lg hover:shadow-[#3e3ce7]/10 hover:-translate-y-1 sm:gap-5 sm:p-8"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#3e3ce7]/10 transition-all duration-300 group-hover:bg-[#3e3ce7]/20 group-hover:scale-110 sm:h-20 sm:w-20">
                  <Icon
                    strokeWidth={2}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                    style={{ color: ICON_COLOR }}
                  />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#0C1412] transition-colors duration-300 group-hover:text-[#3e3ce7] sm:text-sm">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

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
    </section>
  );
}

