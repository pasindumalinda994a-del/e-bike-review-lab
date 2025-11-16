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
      className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20 lg:px-16"
    >
      <div className="space-y-12 p-8 text-center">
        <header className="space-y-3 text-center">
          <h2
            id="top-categories"
            className="text-sm font-semibold uppercase tracking-[0.4em] text-[#3e3ce7]"
          >
            Top Categories
          </h2>
          <p className="text-3xl font-bold tracking-tight text-[#0C1412]">
            E-Bike Guides Built Around Real Riding Styles
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categoryCards.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col items-center justify-between gap-4"
              >
                <span className="flex h-20 w-20 items-center justify-center">
                  <Icon
                    strokeWidth={1.75}
                    className="h-12 w-12"
                    style={{ color: ICON_COLOR }}
                  />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#0C1412] transition group-hover:text-[#3e3ce7]">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 bg-[#3e3ce7]/10 px-8 py-12 shadow-lg shadow-[rgba(12,20,18,0.35)]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)] md:items-center">
          <div className="space-y-4 text-left">
            <p className="text-3xl font-bold uppercase tracking-[0.2em] text-[#0C1412]">
              Welcome to EBikeReviewLab
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-semibold text-[#0C1412] underline decoration-[#3e3ce7]/60 decoration-2 underline-offset-4 transition hover:text-[#3e3ce7]"
            >
              Learn more about us →
            </Link>
          </div>
          <div className="space-y-4 text-left text-[#0C1412]/90">
            <p className="text-base leading-relaxed">
              We help you find the best electric bikes through comprehensive testing, unbiased reviews, and up-to-date industry insights. Our mission is to guide you toward confident purchase decisions with detailed guides and real-world testing.
            </p>
            <p className="text-sm text-[#0C1412]/70 italic">
              Years of industry experience. Always current. Your trusted e-bike guide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

