import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getAdminSession } from "@/lib/admin";
import AdminBar from "@/components/AdminBar";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const admin = getAdminSession();

  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <b style={{ color: "#fff" }}>GeoScore</b>{" "}
            {t.footer.brandLine.replace("GeoScore ", "")}
          </div>
          <div>{t.footer.copyright}</div>
        </div>
        <div className="foot-links">
          <Link href={`/${locale}/privacy`}>{t.footer.links.privacy}</Link>
          <Link href={`/${locale}/terms`}>{t.footer.links.terms}</Link>
          <Link href={`/${locale}/refund`}>{t.footer.links.refund}</Link>
          <AdminBar
            locale={locale}
            loggedIn={!!admin}
            t={{
              adminLogin: t.footer.adminLogin,
              dashboard: t.footer.dashboard,
              logout: t.footer.logout,
              modal: t.admin,
            }}
          />
        </div>
      </div>
    </footer>
  );
}
