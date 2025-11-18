import Image from "next/image";
import Link from "next/link";
import { categories } from "@/content/categories";

// Global footer with navigation, resources, and contact details.
export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const featuredCategories = categories.slice(0, 8);

  return (
    <footer className="border-t border-white/10 bg-[#0C1412] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-4 md:gap-12 md:px-12 md:py-20 lg:px-16">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/EbikeLogo.png"
              alt="EBikeReviewLab"
              width={180}
              height={57}
              className="h-16 w-auto sm:h-20"
            />
          </Link>
          <p className="mt-4 text-xs italic leading-relaxed text-[#E8F1EE]/80 sm:mt-6 sm:text-sm">
            EBikeReviewLab is a participant in various affiliate partner programs
            with e-bike manufacturers and retailers, including Aventon, Ride1Up,
            Rad Power Bikes, Blix, and others. These affiliate programs are designed
            to provide a means for sites to earn advertising fees by advertising and
            linking to partner websites. When you make a purchase through our affiliate
            links, we may earn a commission at no additional cost to you. These
            commissions help fund our product testing and editorial coverage.
          </p>
          <Link
            href="/newsletter"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[#3e3ce7] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3e3ce7]/30 transition-all duration-300 hover:bg-[#3e3ce7]/90 hover:shadow-xl hover:shadow-[#3e3ce7]/40 hover:scale-105 sm:mt-6 sm:px-7 sm:py-3.5 sm:text-base"
          >
            Get the Insider Brief
          </Link>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#E8F1EE]/80 sm:text-sm">
            Explore
          </p>
          <ul className="mt-3 space-y-2.5 text-xs text-[#E8F1EE] sm:mt-4 sm:space-y-3 sm:text-sm">
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
          <p className="text-xs font-semibold uppercase tracking-wide text-[#E8F1EE]/80 sm:text-sm">
            Company
          </p>
          <ul className="mt-3 space-y-2.5 text-xs text-[#E8F1EE] sm:mt-4 sm:space-y-3 sm:text-sm">
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-[#E8F1EE]/70 sm:px-6 sm:py-8 sm:text-sm md:flex-row md:gap-6 md:px-12 lg:px-16">
          <p>© {currentYear} EBikeReviewLab. All rights reserved.</p>
          <p className="text-center text-[10px] text-[#E8F1EE]/60 sm:text-xs">
            Curated with care to keep riders informed and ready for the next
            charge.
          </p>
        </div>
      </div>
    </footer>
  );
}
