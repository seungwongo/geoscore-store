"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

const PADDLE_JS = "https://cdn.paddle.com/paddle/v2/paddle.js";

let loadPromise: Promise<any> | null = null;

function clientToken(): string {
  return process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "";
}

export function priceId(): string {
  return process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || "";
}

export function isConfigured(): boolean {
  const token = clientToken();
  const price = priceId();
  return (
    !!token &&
    !token.includes("replace_me") &&
    !!price &&
    !price.includes("replace_me")
  );
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Paddle) return resolve();
    const existing = document.querySelector(`script[src="${PADDLE_JS}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = PADDLE_JS;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Where to send the browser once the current checkout completes.
let pendingSuccessUrl: string | null = null;

async function ensurePaddle(): Promise<any> {
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    await loadScript();
    const Paddle = (window as any).Paddle;
    const token = clientToken();
    // Sandbox client tokens are prefixed with "test_".
    Paddle.Environment.set(token.startsWith("test_") ? "sandbox" : "production");
    Paddle.Initialize({
      token,
      // Drive the on-screen transition ourselves instead of relying only on
      // Paddle's successUrl redirect (which can be inconsistent for overlays).
      eventCallback: (event: any) => {
        // On completion, send the buyer to the success page, which polls for the
        // download record by session id (no reliance on Paddle's txn param).
        if (event?.name === "checkout.completed" && pendingSuccessUrl) {
          window.location.assign(pendingSuccessUrl);
        }
      },
    });
    return Paddle;
  })();
  return loadPromise;
}

/**
 * Open the Paddle overlay checkout. On successful payment we redirect the
 * browser to `successUrl?_ptxn=<transaction_id>` from the checkout.completed
 * event (with Paddle's own successUrl redirect as a backup). `locale` is passed
 * as custom data so the webhook can localize the fulfillment email.
 */
export async function openCheckout(params: {
  email: string;
  successUrl: string;
  locale: string;
  sessionId?: string;
}): Promise<void> {
  const Paddle = await ensurePaddle();
  pendingSuccessUrl = params.successUrl;
  Paddle.Checkout.open({
    items: [{ priceId: priceId(), quantity: 1 }],
    customer: { email: params.email },
    // Carried into the transaction so the webhook can attribute the purchase
    // to the browser session (funnel analytics) and localize the email.
    customData: { locale: params.locale, sessionId: params.sessionId ?? "" },
    settings: {
      displayMode: "overlay",
      theme: "light",
      allowLogout: false,
      successUrl: params.successUrl,
    },
  });
}
