import { NextRequest, NextResponse } from "next/server";
import { localeFromAcceptLanguage, isLocale } from "@/lib/i18n";

// Known page paths (relative to a locale prefix). "" is the landing page.
const KNOWN_PAGES = new Set([
  "",
  "privacy",
  "terms",
  "refund",
  "download",
  "admin",
  "checkout/success",
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean); // "/en/privacy" -> ["en","privacy"]
  const first = segments[0];
  const hasLocale = isLocale(first);

  const locale = hasLocale
    ? first
    : localeFromAcceptLanguage(req.headers.get("accept-language"));

  // The page path without the locale prefix, e.g. "privacy" or "" for home.
  const innerPath = (hasLocale ? segments.slice(1) : segments).join("/");
  // "articles" and "articles/<slug>" are all valid (dynamic detail pages).
  const known = KNOWN_PAGES.has(innerPath) || innerPath === "articles" || innerPath.startsWith("articles/");

  // Correctly locale-prefixed and a real page → let it through.
  if (hasLocale && known) return NextResponse.next();

  const url = req.nextUrl.clone();
  if (known) {
    // Unprefixed but valid page (e.g. "/privacy") → add the locale prefix.
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  } else {
    // Unknown path (e.g. "/jp", "/en/nope") → send to the locale home.
    url.pathname = `/${locale}`;
    url.search = "";
  }
  return NextResponse.redirect(url);
}

export const config = {
  // Match the bare root plus everything except Next internals, API routes and
  // files with an extension (assets).
  matcher: ["/", "/((?!_next|api|.*\\..*).*)"],
};
