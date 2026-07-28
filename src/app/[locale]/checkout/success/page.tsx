import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import CheckoutSuccess from "@/components/CheckoutSuccess";

export const dynamic = "force-dynamic";

export default function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { _ptxn?: string; ptxn?: string; transaction_id?: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale).checkout;
  // Paddle appends the transaction id to successUrl; accept known variants.
  const txn = searchParams._ptxn ?? searchParams.ptxn ?? searchParams.transaction_id ?? null;
  return <CheckoutSuccess txn={txn} locale={locale} t={t} />;
}
