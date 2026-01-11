"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Email capture form for the homepage.
export default function HomeNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  // Refs for button animations
  const submitButtonRef = useRef(null);
  const arrowIconRef = useRef(null);
  const youtubeLinkRef = useRef(null);
  const youtubeTopTextRef = useRef(null);
  const youtubeBottomTextRef = useRef(null);
  
  const isInitialMount = useRef(true);

  // GSAP animations for buttons
  useEffect(() => {
    const youtubeLink = youtubeLinkRef.current;
    const youtubeTopText = youtubeTopTextRef.current;
    const youtubeBottomText = youtubeBottomTextRef.current;

    if (!youtubeLink || !youtubeTopText || !youtubeBottomText) return;

    // Set initial state
    if (isInitialMount.current) {
      gsap.set(youtubeTopText, { y: 0, opacity: 1 });
      gsap.set(youtubeBottomText, { y: "-100%", opacity: 1 });
      isInitialMount.current = false;
    }

    let youtubeHoverTl = null;

    // YouTube link animations
    const handleYoutubeMouseEnter = () => {
      if (youtubeHoverTl) youtubeHoverTl.kill();
      youtubeHoverTl = gsap.timeline();
      youtubeHoverTl.to(youtubeTopText, {
        y: "-200%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      youtubeHoverTl.to(youtubeBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleYoutubeMouseLeave = () => {
      if (youtubeHoverTl) youtubeHoverTl.kill();
      youtubeHoverTl = gsap.timeline();
      youtubeHoverTl.to(youtubeBottomText, {
        y: "200%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      youtubeHoverTl.to(youtubeTopText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    const handleYoutubeClick = () => {
      if (youtubeHoverTl) youtubeHoverTl.kill();
      youtubeHoverTl = gsap.timeline();
      youtubeHoverTl.to(youtubeTopText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      youtubeHoverTl.to(youtubeBottomText, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }, "<0.1");
    };

    // Add event listeners
    youtubeLink.addEventListener("mouseenter", handleYoutubeMouseEnter);
    youtubeLink.addEventListener("mouseleave", handleYoutubeMouseLeave);
    youtubeLink.addEventListener("click", handleYoutubeClick);

    // Cleanup
    return () => {
      youtubeLink.removeEventListener("mouseenter", handleYoutubeMouseEnter);
      youtubeLink.removeEventListener("mouseleave", handleYoutubeMouseLeave);
      youtubeLink.removeEventListener("click", handleYoutubeClick);

      if (youtubeHoverTl) youtubeHoverTl.kill();
    };
  }, []);

  // GSAP animation for arrow icon rotation on hover
  useEffect(() => {
    const button = submitButtonRef.current;
    const arrowIcon = arrowIconRef.current;

    if (!button || !arrowIcon) return;

    let arrowHoverTl = null;

    const handleMouseEnter = () => {
      if (isSubmitting) return; // Don't animate if submitting
      if (arrowHoverTl) arrowHoverTl.kill();
      arrowHoverTl = gsap.to(arrowIcon, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (isSubmitting) return; // Don't animate if submitting
      if (arrowHoverTl) arrowHoverTl.kill();
      arrowHoverTl = gsap.to(arrowIcon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      if (arrowHoverTl) arrowHoverTl.kill();
    };
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formData = new FormData(e.target);
    const emailValue = formData.get('email')?.toString().trim() || '';
    
    try {
      const response = await fetch('/newsletter/subscribe', {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      });
      
      // Check if response was successful
      if (response.ok || response.redirected) {
        setSubmitStatus('success');
        setEmail(''); // Clear the form
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="newsletter-signup"
      className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-12 text-[#0C1412] sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl space-y-10">
        {/* Top subscription card */}
        <div className="rounded-xl bg-white p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 items-center lg:grid-cols-2 lg:items-center">
            {/* Left: Heading & copy */}
            <div className="space-y-4 max-w-lg mx-auto text-center lg:text-left lg:mx-0">
              <header>
                <h2
                  id="newsletter-signup"
                  className="font-inter text-2xl font-normal text-[#000000] sm:text-xl md:text-4xl tracking-[1.5em] leading-[1.5em]"
                >
                  Subscribe now to stay updated with top news!
                </h2>
              </header>
              <p className="mt-1 line-clamp-3 text-base leading-relaxed text-[#0C1412]/80 sm:text-base">
                Subscribe now to stay updated with all the top news, exclusive insights, and weekly highlights you won&apos;t want to miss.
              </p>
            </div>

            {/* Right: Form */}
            <div className="space-y-4 max-w-md mx-auto lg:max-w-sm lg:ml-auto lg:mx-0">
              {submitStatus === 'success' && (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-3 flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-base text-green-900 sm:text-base">
                    Successfully subscribed! Check your inbox (and spam folder) for confirmation.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-2xl bg-red-50 border border-red-200 p-3 flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-base text-red-900 sm:text-base">
                    Something went wrong. Please make sure you&apos;ve agreed to the terms and try again.
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="flex flex-row items-center gap-2 rounded-full bg-[#F5F5F5] p-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 text-base text-[#0C1412] placeholder:text-[#0C1412]/50 disabled:opacity-60 disabled:cursor-not-allowed bg-transparent border-0 focus:outline-none focus:ring-0 sm:px-6 sm:py-3"
                  />
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0C1412] text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden sm:h-12 sm:w-12"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <svg
                        ref={arrowIconRef}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M9 7h8v8"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="newsletter-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#0C1412]/30 bg-white accent-black checked:bg-white checked:border-black focus:ring-[#0C1412]"
                  />
                  <p className="text-xs leading-relaxed text-[#0C1412]/70 sm:text-sm">
                    By clicking the Subscribe button, you acknowledge that you have read and agree to our{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-[#0C1412] underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-[#0C1412] underline underline-offset-2"
                    >
                      Terms of Use
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* YouTube card */}
          <div className="flex flex-col justify-between rounded-3xl bg-white border border-[#0C1412]/10 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0C1412] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M21.8 8.001a2.749 2.749 0 00-1.935-1.948C18.25 5.6 12 5.6 12 5.6s-6.25 0-7.865.453A2.749 2.749 0 002.2 8.001C1.75 9.623 1.75 12 1.75 12s0 2.377.45 3.999a2.749 2.749 0 001.935 1.948C5.75 18.4 12 18.4 12 18.4s6.25 0 7.865-.453a2.749 2.749 0 001.935-1.948c.45-1.622.45-3.999.45-3.999s0-2.377-.45-3.999zM10.4 14.6V9.4L14.8 12l-4.4 2.6z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-[#0C1412]">
                  Subscribe us on
                </p>
                <p className="text-2xl font-semibold text-[#0C1412]">
                  YouTube
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                ref={youtubeLinkRef}
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-start rounded-md bg-[#0C1412] px-5 py-2.5 text-base font-normal text-white relative overflow-hidden"
              >
                <span className="block relative">
                  <span ref={youtubeTopTextRef} className="block">
                    @ebikereviewlab
                  </span>
                  <span ref={youtubeBottomTextRef} className="block absolute top-0 left-0 w-full">
                    @ebikereviewlab
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Image tiles */}
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-200">
            <img
              src="/images/categories/Electric Bikes.webp"
              alt="Curated ride gear on a table"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-200">
            <img
              src="/images/categories/Electric City Bikes.webp"
              alt="Hands holding a record"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-200">
            <img
              src="/images/categories/Electric Road Bikes.webp"
              alt="Street market overhead"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}