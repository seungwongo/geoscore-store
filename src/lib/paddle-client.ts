"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

const PADDLE_JS = "https://cdn.paddle.com/paddle/v2/paddle.js";

let loadPromise: Promise<any> | null = null;
let currentResolve: ((transactionId: string) => void) | null = null;
let currentReject: ((reason?: unknown) => void) | null = null;

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
      eventCallback: (event: any) => {
        if (event?.name === "checkout.completed") {
          const txn = event?.data?.transaction_id || event?.data?.id;
          if (txn && currentResolve) {
            currentResolve(txn);
            currentResolve = null;
            currentReject = null;
          }
        }
      },
    });
    return Paddle;
  })();
  return loadPromise;
}

/**
 * Open the Paddle overlay checkout for the given email and resolve with the
 * transaction id once payment completes.
 */
export async function openCheckout(email: string): Promise<string> {
  const Paddle = await ensurePaddle();
  return new Promise<string>((resolve, reject) => {
    currentResolve = resolve;
    currentReject = reject;
    Paddle.Checkout.open({
      items: [{ priceId: priceId(), quantity: 1 }],
      customer: { email },
      settings: {
        displayMode: "overlay",
        theme: "light",
        allowLogout: false,
      },
    });
  });
}
