import Link from "next/link";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import { supabaseAdmin, DOWNLOADS_TABLE } from "@/lib/supabase";
import DownloadVerify from "@/components/DownloadVerify";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** True only when the id maps to an existing, non-expired download record. */
async function isValidLink(id: string | undefined): Promise<boolean> {
  if (!id || !UUID_RE.test(id)) return false;
  try {
    const { data, error } = await supabaseAdmin()
      .from(DOWNLOADS_TABLE)
      .select("expires_at")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return false;
    return new Date(data.expires_at as string).getTime() >= Date.now();
  } catch {
    return false;
  }
}

export default async function DownloadPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { id?: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale).download;
  const valid = await isValidLink(searchParams.id);

  if (!valid) {
    return (
      <main className="dl">
        <span className="badge-ok blocked-badge">{t.blockedEyebrow}</span>
        <h1>{t.blockedTitle}</h1>
        <p>{t.blockedDesc}</p>
        <p style={{ marginTop: 28 }}>
          <Link className="btn" href={`/${locale}#buy`}>
            {t.blockedCta}
          </Link>
        </p>
      </main>
    );
  }

  return <DownloadVerify id={searchParams.id!} locale={locale} t={t} />;
}
