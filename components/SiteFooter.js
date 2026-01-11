"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { categories } from "@/content/categories";

// Global footer with navigation, resources, and contact details.
export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const featuredCategories = categories.slice(0, 8);

  // Refs for button animations
  const newsletterLinkRef = useRef(null);
  const newsletterTopTextRef = useRef(null);
  const newsletterBottomTextRef = useRef(null);
  const isInitialMount = useRef(true);

  // GSAP animations for newsletter button
  useEffect(() => {
    const newsletterLink = newsletterLinkRef.current;
    const newsletterTopText = newsletterTopTextRef.current;
    const newsletterBottomText = newsletterBottomTextRef.current;

    if (!newsletterLink || !newsletterTopText || !newsletterBottomText) return;

    // Set initial state
    if (isInitialMount.current) {
      gsap.set(newsletterTopText, { y: 0, opacity: 1 });
      gsap.set(newsletterBottomText, { y: "-100%", opacity: 1 });
      isInitialMount.current = false;
    }

    let newsletterHoverTl = null;

    // Newsletter link animations
    const handleNewsletterMouseEnter = () => {
      if (newsletterHoverTl) newsletterHoverTl.kill();
      newsletterHoverTl = gsap.timeline();
      newsletterHoverTl.to(newsletterTopText, {
        y: "-200%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      newsletterHoverTl.to(newsletterBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleNewsletterMouseLeave = () => {
      if (newsletterHoverTl) newsletterHoverTl.kill();
      newsletterHoverTl = gsap.timeline();
      newsletterHoverTl.to(newsletterBottomText, {
        y: "200%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      newsletterHoverTl.to(newsletterTopText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleNewsletterClick = () => {
      if (newsletterHoverTl) newsletterHoverTl.kill();
      newsletterHoverTl = gsap.timeline();
      newsletterHoverTl.to(newsletterTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      newsletterHoverTl.to(newsletterBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    // Add event listeners
    newsletterLink.addEventListener("mouseenter", handleNewsletterMouseEnter);
    newsletterLink.addEventListener("mouseleave", handleNewsletterMouseLeave);
    newsletterLink.addEventListener("click", handleNewsletterClick);

    // Cleanup
    return () => {
      newsletterLink.removeEventListener("mouseenter", handleNewsletterMouseEnter);
      newsletterLink.removeEventListener("mouseleave", handleNewsletterMouseLeave);
      newsletterLink.removeEventListener("click", handleNewsletterClick);

      if (newsletterHoverTl) newsletterHoverTl.kill();
    };
  }, []);

  return (
    <footer className=" bg-white ">
      {/* Top section */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12 md:flex-row md:items-start md:justify-between md:px-12 lg:px-16">
        {/* Brand + description + CTA */}
        <div className="max-w-xl space-y-5 md:max-w-2xl">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/EBRLLogo.png"
              alt="EBikeReviewLab"
              width={190}
              height={60}
              className="h-12 w-auto sm:h-14 md:h-16"
            />
          </Link>
          <p className="text-sm leading-relaxed text-black sm:text-base">
            EBikeReviewLab is a participant in various affiliate partner programs
            with e-bike manufacturers and retailers, including Aventon, Ride1Up,
            Rad Power Bikes, Blix, and others. These affiliate programs are designed
            to provide a means for sites to earn advertising fees by advertising and
            linking to partner websites. When you make a purchase through our affiliate
            links, we may earn a commission at no additional cost to you. These
            commissions help fund our product testing and editorial coverage.
          </p>
          <Link
            ref={newsletterLinkRef}
            href="/newsletter"
            className="inline-flex items-center justify-start rounded-md bg-[#0C1412] px-5 py-2.5 text-base font-normal text-white relative overflow-hidden transition hover:bg-black"
          >
            <span className="block relative">
              <span ref={newsletterTopTextRef} className="block">
                Get the Insider Brief
              </span>
              <span ref={newsletterBottomTextRef} className="block absolute top-0 left-0 w-full">
                Get the Insider Brief
              </span>
            </span>
          </Link>
        </div>
        {/* Link columns */}
        <div className="flex w-full flex-col gap-8 text-sm text-black sm:flex-row sm:justify-end md:w-auto md:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-black sm:text-sm">
              Explore
            </p>
            <ul className="mt-3 space-y-2.5 sm:mt-4">
              {featuredCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="transition-colors "
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-black sm:text-sm">
              Company
            </p>
            <ul className="mt-3 space-y-2.5 sm:mt-4 text-black">
              <li>
                <Link
                  href="/about"
                  className="transition-colors "
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors 0"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-neutral-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-neutral-900"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-neutral-500 sm:flex-row sm:px-6 sm:py-6 sm:text-sm md:px-12 lg:px-16">
          <p className="order-2 text-center sm:order-1 sm:text-left">
            © {currentYear} EBikeReviewLab. All rights reserved.
          </p>
          <p className="order-1 text-[10px] text-neutral-400 sm:order-2 sm:text-xs">
            Curated with care to keep riders informed and ready for the next
            charge.
          </p>
        </div>
      </div>
    </footer>
  );
}
