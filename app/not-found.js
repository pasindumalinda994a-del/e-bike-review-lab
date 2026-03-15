import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Page Not Found",
  description: `The page you're looking for doesn't exist. Explore ${SITE_NAME} for the latest electric bike reviews and buying guides.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Page not found
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
        This page doesn&apos;t exist or may have moved. Head back to the home
        page for the latest e-bike reviews and guides.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Go to home
      </Link>
    </main>
  );
}
