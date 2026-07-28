import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import LegalDoc from "@/components/LegalDoc";

export default function TermsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale);
  const d = t.legal.terms;
  return (
    <LegalDoc
      locale={locale}
      updated={t.legal.updated}
      backHome={t.legal.backHome}
      title={d.title}
      intro={d.intro}
      sections={d.sections}
    />
  );
}
