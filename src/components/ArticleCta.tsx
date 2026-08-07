import PurchaseButton from "@/components/PurchaseButton";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function ArticleCta({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.articles.cta;
  return (
    <aside className="article-cta">
      <div className="article-cta-mark">◔</div>
      <h3>{c.heading}</h3>
      <p>{c.sub}</p>
      <PurchaseButton locale={locale} label={c.button} className="btn" modal={t.modal} />
    </aside>
  );
}
