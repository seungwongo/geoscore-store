import { ko } from "@/../messages/ko";
import { en } from "@/../messages/en";

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof ko;

const dictionaries: Record<Locale, Dictionary> = { ko, en };

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string | undefined): Dictionary {
  return isLocale(locale) ? dictionaries[locale] : dictionaries[defaultLocale];
}

/** Pick ko for Korean browsers, en for everything else. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("ko") ? "ko" : "en";
}
