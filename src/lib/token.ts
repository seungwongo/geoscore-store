import crypto from "crypto";

const FIFTEEN_MIN_MS = 15 * 60 * 1000;

export interface DownloadTokenPayload {
  email: string;
  txn: string; // carries the download record id
  exp: number; // epoch ms
}

function secret(): string {
  const s = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!s) throw new Error("DOWNLOAD_TOKEN_SECRET is not set");
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

/**
 * Create a signed, tamper-proof, short-lived download grant. Issued only after
 * the buyer's email has been verified against the Supabase record; used solely
 * to authorize the actual file stream (default 15 min).
 */
export function createDownloadToken(
  email: string,
  txn: string,
  ttlMs: number = FIFTEEN_MIN_MS,
): string {
  const payload: DownloadTokenPayload = {
    email,
    txn,
    exp: Date.now() + ttlMs,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

/** Verify a token's signature and expiry. Returns the payload or null. */
export function verifyDownloadToken(token: string | null | undefined): DownloadTokenPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;

  const expected = sign(payloadB64);
  // constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const json = Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
      "utf8",
    );
    const payload = JSON.parse(json) as DownloadTokenPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    if (!payload.email || !payload.txn) return null;
    return payload;
  } catch {
    return null;
  }
}
