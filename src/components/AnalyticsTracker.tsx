"use client";

import { useEffect } from "react";
import { track } from "@/lib/session";

export default function AnalyticsTracker({ locale }: { locale: string }) {
  useEffect(() => {
    track("page_view", locale);
  }, [locale]);
  return null;
}
