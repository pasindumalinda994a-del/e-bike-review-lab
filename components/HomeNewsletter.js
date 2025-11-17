"use client";

import Link from "next/link";

// Email capture form for the homepage.
export default function HomeNewsletter() {
  return (
    <section
      aria-labelledby="newsletter-signup"
      className="mx-auto w-full max-w-5xl px-4 pb-12 text-center sm:px-6 sm:pb-20 md:px-0"
    >
      <div className="space-y-4 rounded-2xl border border-[#3e3ce7]/20 bg-white shadow-xl shadow-[rgba(12,20,18,0.35)] sm:space-y-6 sm:rounded-3xl">
        <div className="border-b border-[#3e3ce7]/15 px-4 py-6 sm:px-8 sm:py-8 md:px-12">
          <h2
            id="newsletter-signup"
            className="text-xl font-bold tracking-tight text-[#0C1412] sm:text-2xl md:text-3xl"
          >
            Join the EBikeReviewLab Insider Brief
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#0C1412]/75 sm:mt-4 sm:text-base">
            Weekly ride logs, firmware notes, launch alerts, and upgrade ideas to
            help you dial in the perfect commuter, cargo hauler, or trail rig.
            No fluff—just actionable testing insights.
          </p>
        </div>
        <div className="space-y-4 px-4 pb-8 sm:space-y-6 sm:px-6 sm:pb-10 md:px-12">
          <form
            action="/newsletter/subscribe"
            method="post"
            className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@outdoorhq.com"
              className="flex-1 rounded-full border border-[#3e3ce7]/30 bg-white px-4 py-2.5 text-sm text-[#0C1412] shadow-sm shadow-[rgba(12,20,18,0.35)] placeholder:text-[#0C1412]/40 focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/30 sm:px-5 sm:py-3"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#3e3ce7] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90 sm:px-6 sm:py-3 sm:text-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[10px] leading-relaxed text-[#0C1412]/60 sm:text-xs">
            By subscribing, you agree to our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#3e3ce7] underline transition hover:opacity-80"
            >
              privacy policy
            </Link>{" "}
            and confirm you're 18 or older. You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}


