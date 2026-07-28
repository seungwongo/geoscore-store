import type { Metadata } from "next";
import "../globals.css";
import { getDictionary, isLocale, locales, defaultLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const t = getDictionary(params.locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
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
      <body>{children}</body>
    </html>
  );
}
