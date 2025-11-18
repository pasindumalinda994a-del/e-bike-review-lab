"use client";

import Link from "next/link";

// Email capture form for the homepage.
export default function HomeNewsletter() {
  return (
    <section
      aria-labelledby="newsletter-signup"
      className="w-full"
    >
      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-[#0C1412]/10 bg-gradient-to-br from-white to-[#3e3ce7]/5 p-8 shadow-xl sm:space-y-10 sm:p-12 md:p-16">
        <div className="space-y-4 text-center">
          <h2
            id="newsletter-signup"
            className="text-3xl font-bold leading-tight tracking-tight text-[#0C1412] sm:text-4xl md:text-5xl"
          >
            Join the EBikeReviewLab Insider Brief
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#0C1412]/80 sm:text-lg">
            Weekly ride logs, firmware notes, launch alerts, and upgrade ideas to
            help you dial in the perfect commuter, cargo hauler, or trail rig.
            No fluff—just actionable testing insights.
          </p>
        </div>
        <div className="space-y-5">
          <form
            action="/newsletter/subscribe"
            method="post"
            className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-[#0C1412]/20 bg-white px-6 py-4 text-base text-[#0C1412] placeholder:text-[#0C1412]/50 shadow-sm transition-all duration-300 focus:border-[#3e3ce7] focus:outline-none focus:ring-2 focus:ring-[#3e3ce7]/20 focus:shadow-md sm:px-7 sm:py-4"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#3e3ce7] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#3e3ce7]/30 transition-all duration-300 hover:bg-[#3e3ce7]/90 hover:shadow-xl hover:shadow-[#3e3ce7]/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3e3ce7] focus:ring-offset-2 sm:px-10"
            >
              Subscribe
            </button>
          </form>
          <p className="text-center text-xs leading-relaxed text-[#0C1412]/60 sm:text-sm">
            By subscribing, you agree to our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#3e3ce7] underline decoration-2 underline-offset-2 transition-colors duration-300 hover:text-[#3e3ce7]/80"
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


