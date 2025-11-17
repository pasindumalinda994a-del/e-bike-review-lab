"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { categories } from '@/content/categories';

// Build header navigation links straight from the categories list.
const REVIEW_LINKS = categories.map((category) => ({
  href: `/${category.slug}`,
  label: category.name,
}));

// Curated learning resources anchored to our cornerstone articles.
const LEARN_LINKS = [
  {
    href: "/electric-bikes/best-electric-bikes-2025",
    label: "Best Electric Bikes 2025",
  },
  {
    href: "/electric-mountain-bikes/best-electric-mountain-bikes-2025",
    label: "Best Electric Mountain Bikes 2025",
  },
  {
    href: "/electric-folding-bikes/best-electric-folding-bikes-2025",
    label: "Best Electric Folding Bikes 2025",
  },
  {
    href: "/electric-road-bikes/best-electric-road-bikes-2025",
    label: "Best Electric Road Bikes 2025",
  },
  {
    href: "/electric-cargo-bikes/best-electric-cargo-bikes-2025",
    label: "Best Electric Cargo Bikes 2025",
  },
];

// Top navigation with logo, dynamic category links, and a CTA button.
export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-[#0C1412] text-white shadow-[0_10px_30px_rgba(12,20,18,0.35)]">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center gap-3 z-50">
          <Image
            src="/EbikeLogo.png"
            alt="EBikeReviewLab"
            width={200}
            height={60}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden h-full items-stretch gap-2 text-sm font-semibold tracking-wide md:flex">
          <div className="group relative flex h-full items-center">
            <button
              type="button"
              className="flex h-full items-center gap-2 px-3 transition hover:bg-[#3e3ce7] hover:shadow-[inset_0_-2px_0_0_#ffffff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
              aria-haspopup="true"
            >
              Reviews
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="pointer-events-none absolute left-0 top-full z-30 hidden min-w-[220px] translate-y-px flex-col overflow-hidden rounded-b-md border border-white/10 bg-[#0C1412] shadow-xl shadow-[rgba(0,0,0,0.35)] transition group-hover:pointer-events-auto group-hover:flex group-focus-within:pointer-events-auto group-focus-within:flex">
              {REVIEW_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm text-white transition hover:bg-[#3e3ce7] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative flex h-full items-center">
            <button
              type="button"
              className="flex h-full items-center gap-2 px-3 transition hover:bg-[#3e3ce7] hover:shadow-[inset_0_-2px_0_0_#ffffff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e3ce7]"
              aria-haspopup="true"
            >
              Learn
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="pointer-events-none absolute left-0 top-full z-30 hidden min-w-[240px] translate-y-px flex-col overflow-hidden rounded-b-md border border-white/10 bg-[#0C1412] shadow-xl shadow-[rgba(0,0,0,0.35)] transition group-hover:pointer-events-auto group-hover:flex group-focus-within:pointer-events-auto group-focus-within:flex">
              {LEARN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm text-white transition hover:bg-[#3e3ce7] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/about"
            className="flex h-full items-center px-3 transition hover:bg-[#3e3ce7] hover:shadow-[inset_0_-2px_0_0_#ffffff]"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="flex h-full items-center px-3 transition hover:bg-[#3e3ce7] hover:shadow-[inset_0_-2px_0_0_#ffffff]"
          >
            Contact Us
          </Link>
        </nav>
        
        {/* Desktop CTA */}
        <Link
          href="/newsletter"
          className="hidden items-center justify-center rounded-xl bg-[#3e3ce7] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90 md:inline-flex md:px-6 md:py-3 md:text-sm"
        >
          Newsletter Sign Up
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] md:hidden z-50"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto bg-[#0C1412] md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-6 space-y-4">
            {/* Mobile Reviews Dropdown */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3e3ce7]"
              >
                Reviews
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isReviewsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isReviewsOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-white/10 pl-4">
                  {REVIEW_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm text-white/90 transition-colors hover:bg-[#3e3ce7] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Learn Dropdown */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsLearnOpen(!isLearnOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3e3ce7]"
              >
                Learn
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isLearnOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isLearnOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-white/10 pl-4">
                  {LEARN_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm text-white/90 transition-colors hover:bg-[#3e3ce7] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Links */}
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3e3ce7]"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#3e3ce7]"
            >
              Contact Us
            </Link>
            <Link
              href="/newsletter"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 block w-full rounded-xl bg-[#3e3ce7] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90"
            >
              Newsletter Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

