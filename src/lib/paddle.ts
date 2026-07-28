const PADDLE_API_BASE =
  process.env.PADDLE_ENV === "production"
    ? "https://api.paddle.com"
    : "https://sandbox-api.paddle.com";

export interface VerifiedTransaction {
  id: string;
  status: string;
  email: string | null;
}

/**
 * Verify a Paddle transaction server-side. Returns the transaction if it is in a
 * paid/completed state, otherwise null. Throws only on missing configuration.
 */
export async function verifyPaddleTransaction(
  transactionId: string,
): Promise<VerifiedTransaction | null> {
  const apiKey = process.env.PADDLE_API_KEY;
  if (!apiKey) throw new Error("PADDLE_API_KEY is not set");

  const res = await fetch(
    `${PADDLE_API_BASE}/transactions/${encodeURIComponent(transactionId)}?include=customer`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(
      `[paddle] transaction verify failed: HTTP ${res.status} (env=${
        process.env.PADDLE_ENV
      }) ${detail.slice(0, 300)}`,
    );
    return null;
  }

  const body = (await res.json()) as {
    data?: {
      id?: string;
      status?: string;
      customer?: { email?: string };
      details?: { totals?: unknown };
      billing_details?: unknown;
    };
  };

  const data = body.data;
  if (!data?.id || !data.status) return null;

  // Paddle marks a successful transaction as "completed" (also "paid" in some flows).
  const paidStatuses = new Set(["completed", "paid", "billed"]);
  if (!paidStatuses.has(data.status)) return null;

  return {
    id: data.id,
    status: data.status,
    email: data.customer?.email ?? null,
  };
}

export function isPaddleConfigured(): boolean {
  return Boolean(process.env.PADDLE_API_KEY) && !process.env.PADDLE_API_KEY?.startsWith("replace_me");
}
