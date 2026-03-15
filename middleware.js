import { NextResponse } from "next/server";
import {
  validArticlePaths,
  validCategorySlugs,
  validStaticSegments,
} from "@/lib/valid-paths";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Let Next.js internals and static assets through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 1) {
    const segment = segments[0].toLowerCase();
    const allowed =
      validCategorySlugs.has(segment) || validStaticSegments.has(segment);
    if (allowed) return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  if (segments.length === 2) {
    const key = `${segments[0].toLowerCase()}/${segments[1].toLowerCase()}`;
    const isArticle = validArticlePaths.has(key);
    const isNewsletterRoute = segments[0].toLowerCase() === "newsletter";
    const isContactSubmit = segments[0].toLowerCase() === "contact";
    if (isArticle || isNewsletterRoute || isContactSubmit) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url), 301);
  }

  // Any other path (e.g. /a/b/c) redirect to home
  return NextResponse.redirect(new URL("/", request.url), 301);
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except _next/static, _next/image, and favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
