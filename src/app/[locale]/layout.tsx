import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { getDictionary, isLocale, locales, defaultLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// OG / Twitter copy is intentionally English for all locales.
const OG_TITLE = "GeoScore — Will AI cite your page?";
const OG_DESC =
  "A GEO diagnostic Chrome extension that scores, in one click, whether your page is worth citing by ChatGPT, Perplexity and Gemini — and suggests the sentences to fix.";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(params.locale);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(appUrl),
    title: t.meta.title,
    description: t.meta.description,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      siteName: "GeoScore",
      title: OG_TITLE,
      description: OG_DESC,
      url: "/",
      images: [{ url: "/geoscore-store.png", width: 1376, height: 768, alt: "GeoScore" }],
    },
    twitter: {
      card: "summary_large_image",
      title: OG_TITLE,
      description: OG_DESC,
      images: ["/geoscore-store.png"],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const lang = isLocale(params.locale) ? params.locale : defaultLocale;
  return (
    <html lang={lang}>
      <body>
        {children}
        <Script
          src="https://www.sourced.chat/widget.js"
          strategy="afterInteractive"
          data-key="2c45c42770a4d0e81965ca55b22a95ae"
        />
      </body>
    </html>
  );
}
