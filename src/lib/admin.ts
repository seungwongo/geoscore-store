import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "gs_admin";
const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

interface AdminPayload {
  email: string;
  exp: number;
}

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.DOWNLOAD_TOKEN_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET / DOWNLOAD_TOKEN_SECRET is not set");
  return s;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payloadB64: string): string {
  return b64url(crypto.createHmac("sha256", secret()).update(payloadB64).digest());
}

export function signAdminSession(email: string): string {
  const payload: AdminPayload = { email, exp: Date.now() + TTL_MS };
  const b64 = b64url(JSON.stringify(payload));
  return `${b64}.${sign(b64)}`;
}

export function verifyAdminSession(value: string | undefined | null): { email: string } | null {
  if (!value) return null;
  const parts = value.split(".");
  if (parts.length !== 2) return null;
  const [b64, sig] = parts;
  const expected = sign(b64);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(b64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"),
    ) as AdminPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    if (!payload.email) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

/** Read the current admin session from cookies (server components / routes). */
export function getAdminSession(): { email: string } | null {
  return verifyAdminSession(cookies().get(ADMIN_COOKIE)?.value);
}

export const ADMIN_COOKIE_MAX_AGE = TTL_MS / 1000;
