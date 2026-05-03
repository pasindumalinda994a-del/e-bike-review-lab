"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, X, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { categories } from '@/content/categories';
import { brandArticles } from '@/content/posts/brand';
import AnimatedButton from '@/components/AnimatedButton';

const brandPageSlugs = brandArticles.map(
  (article) => article.brandCategorySlug ?? article.categorySlug,
);
const brandCategorySlugs = new Set(brandPageSlugs);

// Build Reviews > Brand links to brand category pages.
const BRAND_REVIEW_LINKS = Array.from(
  new Map(
    brandArticles.map((article) => [
      article.brandCategorySlug ?? article.categorySlug,
      {
        href: `/${article.brandCategorySlug ?? article.categorySlug}`,
        label: article.brandCategory ?? article.category,
      },
    ]),
  ).values(),
);

// Build Reviews > Categories links from category pages.
const CATEGORY_REVIEW_LINKS = categories
  .filter((category) => !brandCategorySlugs.has(category.slug))
  .map((category) => ({
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

function DropdownAnimatedLink({ href, label }) {
  return (
    <Link
      href={href}
      className="group/dropdown-link block w-full overflow-hidden rounded-sm py-1.5 text-sm font-semibold leading-5 text-black"
    >
      <span className="relative block pr-2">
        <span className="block transition-transform duration-200 ease-out group-hover/dropdown-link:-translate-y-[130%]">
          {label}
        </span>
        <span className="absolute left-0 top-0 block w-full translate-y-[130%] transition-transform duration-200 ease-out group-hover/dropdown-link:translate-y-0">
          {label}
        </span>
      </span>
    </Link>
  );
}

// Top navigation with logo, dynamic category links, and a CTA button.
export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  
  // Refs for nav elements
  const reviewsButtonRef = useRef(null);
  const reviewsTopTextRef = useRef(null);
  const reviewsBottomTextRef = useRef(null);
  
  const learnButtonRef = useRef(null);
  const learnTopTextRef = useRef(null);
  const learnBottomTextRef = useRef(null);
  
  const aboutLinkRef = useRef(null);
  const aboutTopTextRef = useRef(null);
  const aboutBottomTextRef = useRef(null);
  
  const contactLinkRef = useRef(null);
  const contactTopTextRef = useRef(null);
  const contactBottomTextRef = useRef(null);
  
  const isInitialMount = useRef(true);

  // Close mobile menu when clicking outside
  useEffect(() => {
    // Only run on client side after hydration
    if (typeof window === 'undefined') return;
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // GSAP animations for nav links
  useEffect(() => {
    const reviewsButton = reviewsButtonRef.current;
    const reviewsTopText = reviewsTopTextRef.current;
    const reviewsBottomText = reviewsBottomTextRef.current;
    
    const learnButton = learnButtonRef.current;
    const learnTopText = learnTopTextRef.current;
    const learnBottomText = learnBottomTextRef.current;
    
    const aboutLink = aboutLinkRef.current;
    const aboutTopText = aboutTopTextRef.current;
    const aboutBottomText = aboutBottomTextRef.current;
    
    const contactLink = contactLinkRef.current;
    const contactTopText = contactTopTextRef.current;
    const contactBottomText = contactBottomTextRef.current;

    if (!reviewsButton || !reviewsTopText || !reviewsBottomText ||
        !learnButton || !learnTopText || !learnBottomText ||
        !aboutLink || !aboutTopText || !aboutBottomText ||
        !contactLink || !contactTopText || !contactBottomText) return;

    // Set initial state
    if (isInitialMount.current) {
      gsap.set([reviewsTopText, learnTopText, aboutTopText, contactTopText], { y: 0, opacity: 1 });
      gsap.set([reviewsBottomText, learnBottomText, aboutBottomText, contactBottomText], { y: "-100%", opacity: 1 });
      isInitialMount.current = false;
    }

    let reviewsHoverTl = null;
    let learnHoverTl = null;
    let aboutHoverTl = null;
    let contactHoverTl = null;

    // Reviews button animations
    const handleReviewsMouseEnter = () => {
      if (reviewsHoverTl) reviewsHoverTl.kill();
      reviewsHoverTl = gsap.timeline();
      reviewsHoverTl.to(reviewsTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      reviewsHoverTl.to(reviewsBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleReviewsMouseLeave = () => {
      if (reviewsHoverTl) reviewsHoverTl.kill();
      reviewsHoverTl = gsap.timeline();
      reviewsHoverTl.to(reviewsBottomText, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      reviewsHoverTl.to(reviewsTopText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleReviewsClick = () => {
      if (reviewsHoverTl) reviewsHoverTl.kill();
      reviewsHoverTl = gsap.timeline();
      reviewsHoverTl.to(reviewsTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      reviewsHoverTl.to(reviewsBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    // Learn button animations
    const handleLearnMouseEnter = () => {
      if (learnHoverTl) learnHoverTl.kill();
      learnHoverTl = gsap.timeline();
      learnHoverTl.to(learnTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      learnHoverTl.to(learnBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleLearnMouseLeave = () => {
      if (learnHoverTl) learnHoverTl.kill();
      learnHoverTl = gsap.timeline();
      learnHoverTl.to(learnBottomText, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      learnHoverTl.to(learnTopText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleLearnClick = () => {
      if (learnHoverTl) learnHoverTl.kill();
      learnHoverTl = gsap.timeline();
      learnHoverTl.to(learnTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      learnHoverTl.to(learnBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    // About link animations
    const handleAboutMouseEnter = () => {
      if (aboutHoverTl) aboutHoverTl.kill();
      aboutHoverTl = gsap.timeline();
      aboutHoverTl.to(aboutTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      aboutHoverTl.to(aboutBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleAboutMouseLeave = () => {
      if (aboutHoverTl) aboutHoverTl.kill();
      aboutHoverTl = gsap.timeline();
      aboutHoverTl.to(aboutBottomText, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      aboutHoverTl.to(aboutTopText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleAboutClick = () => {
      if (aboutHoverTl) aboutHoverTl.kill();
      aboutHoverTl = gsap.timeline();
      aboutHoverTl.to(aboutTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      aboutHoverTl.to(aboutBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    // Contact link animations
    const handleContactMouseEnter = () => {
      if (contactHoverTl) contactHoverTl.kill();
      contactHoverTl = gsap.timeline();
      contactHoverTl.to(contactTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      contactHoverTl.to(contactBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleContactMouseLeave = () => {
      if (contactHoverTl) contactHoverTl.kill();
      contactHoverTl = gsap.timeline();
      contactHoverTl.to(contactBottomText, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      contactHoverTl.to(contactTopText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleContactClick = () => {
      if (contactHoverTl) contactHoverTl.kill();
      contactHoverTl = gsap.timeline();
      contactHoverTl.to(contactTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      contactHoverTl.to(contactBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    // Add event listeners
    reviewsButton.addEventListener("mouseenter", handleReviewsMouseEnter);
    reviewsButton.addEventListener("mouseleave", handleReviewsMouseLeave);
    reviewsButton.addEventListener("click", handleReviewsClick);

    learnButton.addEventListener("mouseenter", handleLearnMouseEnter);
    learnButton.addEventListener("mouseleave", handleLearnMouseLeave);
    learnButton.addEventListener("click", handleLearnClick);

    aboutLink.addEventListener("mouseenter", handleAboutMouseEnter);
    aboutLink.addEventListener("mouseleave", handleAboutMouseLeave);
    aboutLink.addEventListener("click", handleAboutClick);

    contactLink.addEventListener("mouseenter", handleContactMouseEnter);
    contactLink.addEventListener("mouseleave", handleContactMouseLeave);
    contactLink.addEventListener("click", handleContactClick);

    // Cleanup
    return () => {
      reviewsButton.removeEventListener("mouseenter", handleReviewsMouseEnter);
      reviewsButton.removeEventListener("mouseleave", handleReviewsMouseLeave);
      reviewsButton.removeEventListener("click", handleReviewsClick);

      learnButton.removeEventListener("mouseenter", handleLearnMouseEnter);
      learnButton.removeEventListener("mouseleave", handleLearnMouseLeave);
      learnButton.removeEventListener("click", handleLearnClick);

      aboutLink.removeEventListener("mouseenter", handleAboutMouseEnter);
      aboutLink.removeEventListener("mouseleave", handleAboutMouseLeave);
      aboutLink.removeEventListener("click", handleAboutClick);

      contactLink.removeEventListener("mouseenter", handleContactMouseEnter);
      contactLink.removeEventListener("mouseleave", handleContactMouseLeave);
      contactLink.removeEventListener("click", handleContactClick);

      if (reviewsHoverTl) reviewsHoverTl.kill();
      if (learnHoverTl) learnHoverTl.kill();
      if (aboutHoverTl) aboutHoverTl.kill();
      if (contactHoverTl) contactHoverTl.kill();
    };
  }, []);

  return (
    <header className="z-50 py-2">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="bg-[#f5f5f5] hover:bg-white rounded-lg flex items-center justify-between px-3 md:px-6 py-3">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50">
              <Image
                src="/EBRLLogo.png"
                alt="EBRL"
                width={120}
                height={40}
                priority
                className="h-auto w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
            <div className="group relative flex items-center">
              <button
                ref={reviewsButtonRef}
                type="button"
                className="text-black text-sm font-semibold focus:outline-none px-3 relative inline-flex items-center overflow-hidden"
                aria-haspopup="true"
              >
                <span className="block relative">
                  <span ref={reviewsTopTextRef} className="block">
                    Reviews
                  </span>
                  <span ref={reviewsBottomTextRef} className="block absolute top-0 left-0 w-full">
                    Reviews
                  </span>
                </span>
              </button>
              <div className="pointer-events-none invisible absolute left-0 top-full z-30 flex min-w-[520px] translate-y-5 overflow-hidden rounded-lg bg-white opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-7 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-7 group-focus-within:opacity-100">
                <div className="min-w-[260px] space-y-0.5 border-r border-neutral-100 px-4 py-4">
                  <div className="pb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Categories
                  </div>
                  {CATEGORY_REVIEW_LINKS.map((link) => (
                    <DropdownAnimatedLink key={link.href} href={link.href} label={link.label} />
                  ))}
                </div>
                <div className="min-w-[220px] space-y-0.5 px-4 py-4">
                  <div className="pb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Brand
                  </div>
                  {BRAND_REVIEW_LINKS.map((link) => (
                    <DropdownAnimatedLink key={link.href} href={link.href} label={link.label} />
                  ))}
                </div>
              </div>
            </div>

            <div className="group relative flex items-center">
              <button
                ref={learnButtonRef}
                type="button"
                className="text-black text-sm font-semibold focus:outline-none px-3 relative inline-flex items-center overflow-hidden"
                aria-haspopup="true"
              >
                <span className="block relative">
                  <span ref={learnTopTextRef} className="block">
                    Learn
                  </span>
                  <span ref={learnBottomTextRef} className="block absolute top-0 left-0 w-full">
                    Learn
                  </span>
                </span>
              </button>
              <div className="pointer-events-none absolute left-0 top-full z-30 hidden min-w-[240px] translate-y-7 flex-col overflow-hidden rounded-lg bg-white shadow-xl transition group-hover:pointer-events-auto group-hover:flex group-focus-within:pointer-events-auto group-focus-within:flex">
                {LEARN_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-sm text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              ref={aboutLinkRef}
              href="/about"
              className="text-black text-sm font-semibold px-3 relative inline-flex items-center overflow-hidden"
            >
              <span className="block relative">
                <span ref={aboutTopTextRef} className="block">
                  About Us
                </span>
                <span ref={aboutBottomTextRef} className="block absolute top-0 left-0 w-full">
                  About Us
                </span>
              </span>
            </Link>
            <Link
              ref={contactLinkRef}
              href="/contact"
              className="text-black text-sm font-semibold px-3 relative inline-flex items-center overflow-hidden"
            >
              <span className="block relative">
                <span ref={contactTopTextRef} className="block">
                  Contact Us
                </span>
                <span ref={contactBottomTextRef} className="block absolute top-0 left-0 w-full">
                  Contact Us
                </span>
              </span>
            </Link>
            </nav>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <AnimatedButton
              href="/contact"
              className="items-center gap-2"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-black focus:outline-none md:hidden z-50"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 8h20M2 16h20"
                />
              </svg>
            )}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed left-0 right-0 top-[88px] z-40 h-auto max-h-[calc(100vh-88px)] overflow-y-auto bg-[#f5f5f5] md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-6 space-y-4">
            {/* Mobile Reviews Dropdown */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-black"
              >
                Reviews
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isReviewsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isReviewsOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                  <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Brand
                  </p>
                  {BRAND_REVIEW_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm font-semibold text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <p className="mt-2 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Categories
                  </p>
                  {CATEGORY_REVIEW_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm font-semibold text-black"
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
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-black"
              >
                Learn
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isLearnOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isLearnOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                  {LEARN_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm font-semibold text-black"
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
              className="block rounded-lg px-4 py-3 text-base font-semibold text-black"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-semibold text-black"
            >
              Contact Us
            </Link>
            <AnimatedButton
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 items-center justify-start gap-2 px-6 py-3"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </nav>
        </div>
      )}
    </header>
  );
}

