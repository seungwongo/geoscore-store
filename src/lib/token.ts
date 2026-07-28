import crypto from "crypto";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export interface DownloadTokenPayload {
  email: string;
  txn: string;
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

/** Create a signed, tamper-proof download token valid for 30 days. */
export function createDownloadToken(email: string, txn: string): string {
  const payload: DownloadTokenPayload = {
    email,
    txn,
    exp: Date.now() + THIRTY_DAYS_MS,
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
