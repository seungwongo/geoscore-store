import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import CheckoutSuccess from "@/components/CheckoutSuccess";

export const dynamic = "force-dynamic";

export default function CheckoutSuccessPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale).checkout;
  return <CheckoutSuccess locale={locale} t={t} />;
}
