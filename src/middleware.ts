import { NextRequest, NextResponse } from "next/server";
import { locales, localeFromAcceptLanguage } from "@/lib/i18n";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already has a locale prefix → let it through.
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Redirect the root (and any unprefixed path) to the browser-preferred locale.
  const locale = localeFromAcceptLanguage(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Match the bare root plus everything except Next internals, API routes and
  // files with an extension (assets).
  matcher: ["/", "/((?!_next|api|.*\\..*).*)"],
};
