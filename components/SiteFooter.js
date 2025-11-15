import Image from "next/image";
import Link from "next/link";
import { categories } from "@/content/categories";

// Global footer with navigation, resources, and contact details.
export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const featuredCategories = categories.slice(0, 8);

  return (
    <footer className="border-t border-white/10 bg-[#0C1412] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/EbikeLogo.png"
              alt="EBikeReviewLab"
              width={220}
              height={70}
              className="h-24 w-auto"
            />
          </Link>
          <p className="mt-6 text-xl font-semibold text-white">
            Stay ahead of the ride.
          </p>
          <p className="mt-3 text-sm text-[#E8F1EE]">
            Weekly roundups of range tests, firmware updates, and real-world ride
            data so you can choose the e-bike that fits your commute, cargo
            needs, or trail ambitions.
          </p>
          <Link
            href="/newsletter"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#3e3ce7] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3e3ce7]/90"
          >
            Get the Insider Brief
          </Link>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#E8F1EE]/80">
            Explore
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[#E8F1EE]">
            {featuredCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="transition hover:text-[#3e3ce7]"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#E8F1EE]/80">
            Company
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[#E8F1EE]">
            <li>
              <Link href="/about" className="transition hover:text-[#3e3ce7]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-[#3e3ce7]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-[#3e3ce7]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-[#3e3ce7]">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-[#E8F1EE]/70 md:flex-row md:px-8">
          <p>© {currentYear} EBikeReviewLab. All rights reserved.</p>
          <p className="text-xs text-[#E8F1EE]/60">
            Curated with care to keep riders informed and ready for the next
            charge.
          </p>
        </div>
      </div>
    </footer>
  );
}
