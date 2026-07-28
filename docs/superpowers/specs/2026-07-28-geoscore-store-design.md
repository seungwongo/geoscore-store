# GeoScore Store — Design Spec

**Date:** 2026-07-28
**Status:** Approved

## Purpose

Recreate `landing.html` as a Next.js (App Router, TypeScript) marketing + commerce site
for the **GeoScore** Chrome extension. Visitors (no login required) can buy the extension
via **Paddle**, and after a successful payment receive a download page and an email with the
extension zip attached. Unpaid users must not be able to reach the download.

## Non-Goals

- No user accounts, no login, no database.
- No subscription (one-time purchase only).
- No analytics / telemetry (matches GeoScore's privacy stance).

## Architecture Overview

- Single Next.js App Router project, deployable to Vercel.
- Payment verification is done **server-side against the Paddle API** (client `checkout.completed`
  event supplies `transaction_id`; webhook is an optional backup, not required in dev).
- Download access control is **stateless via an HMAC-signed token** — no DB.
- The extension zip lives at `secure/geo-score-0.1.0.zip` (a **non-public** folder, never under
  `public/`). It is served only by an API route after token verification.

## Internationalization (i18n)

- Path-based locale segment: `/[locale]` where `locale ∈ {ko, en}`.
- **Middleware** on `/` reads `Accept-Language`; Korean → redirect `/ko`, otherwise `/en`.
- Lightweight dictionary approach (no i18n dependency): `messages/ko.ts`, `messages/en.ts`.
- All surfaces localized: landing page, legal pages, purchase modal, download page, emails.
- Korean copy is taken verbatim from `landing.html`; English is a faithful translation.

## Pages

| Route | Description |
|-------|-------------|
| `/[locale]` | Full landing page recreation (nav, why, features, rubric, sample report, how-to, privacy, CTA, footer). Plus **Purchase** CTA/section ($19 one-time) and **Install guide** section. Footer gains Privacy / Terms / Refund links. |
| `/[locale]/privacy` | Privacy policy (detailed template body). |
| `/[locale]/terms` | Terms of service (detailed template body). |
| `/[locale]/refund` | Refund policy (detailed template body). |
| `/[locale]/download?token=...` | Shows download button only when token is valid; otherwise a "purchase required" block. |

## Purchase → Payment → Download Flow

1. Buy button → **email input modal** (required, format validated).
2. Open Paddle.js overlay checkout (prefill email, `NEXT_PUBLIC_PADDLE_PRICE_ID`).
3. `checkout.completed` event → obtain `transaction_id` → frontend `POST /api/verify`.
4. Server `/api/verify`:
   - Verify with Paddle API that the transaction is `completed`/paid.
   - On success: send **customer email** (sleek HTML template, zip attached + download link);
     send **NOTIFY_EMAIL** purchase notification; generate signed token; return it.
   - If SMTP fails, still return the token (customer must not be blocked); log the failure and
     include it in the notification path where possible.
5. Frontend transitions to `/[locale]/download?token=...`.
6. Download button → `GET /api/download?token=...` → server verifies token → streams
   `secure/geo-score-0.1.0.zip`.

### Signed Token

- Payload: `base64url(JSON{ email, txn, exp })`.
- Signature: HMAC-SHA256 over the payload using `DOWNLOAD_TOKEN_SECRET`.
- Token string: `payload.signature`.
- Validity: 30 days; reusable within the window (so the email link keeps working).
- Forgery-resistant → unpaid users cannot construct a valid token → download is gated.

## Email

- **Nodemailer + Gmail SMTP** using existing env: `SMTP_HOST`, `SMTP_PORT`, `GOOGLE_MAIL`,
  `GOOGLE_PASSWORD`.
- **Customer email:** responsive, brand-colored (#2563eb) HTML template — thank-you, download
  button, 3-step install summary, zip attachment. Localized (ko/en).
- **Notification email:** to `NOTIFY_EMAIL` — purchase fact (customer email, transaction id,
  timestamp).

## Environment Variables

Existing: `SMTP_HOST`, `SMTP_PORT`, `GOOGLE_MAIL`, `GOOGLE_PASSWORD`, `NOTIFY_EMAIL`,
`NEXT_PUBLIC_APP_URL`.

Added (placeholders in `.env.local`, and documented in `.env.example`):

- `PADDLE_ENV=sandbox`
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`
- `NEXT_PUBLIC_PADDLE_PRICE_ID`
- `PADDLE_API_KEY`
- `DOWNLOAD_TOKEN_SECRET`

## Error Handling

- Email format, Paddle verification failure, SMTP failure each produce a user-facing message +
  server log.
- Payment succeeded but email failed → token still issued; failure logged.
- Missing/expired/invalid download token → blocked with a "purchase required" page.

## Security Notes

- Zip is never in `public/`; served only through the token-guarded API route.
- Paddle secret API key is server-only (never `NEXT_PUBLIC_`).
- `DOWNLOAD_TOKEN_SECRET` server-only.

## File/Module Layout (planned)

```
secure/geo-score-0.1.0.zip           # moved from repo root; server-only asset
messages/ko.ts, messages/en.ts       # dictionaries
middleware.ts                        # locale redirect
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx            # landing (componentized sections)
src/app/[locale]/(legal)/privacy|terms|refund/page.tsx
src/app/[locale]/download/page.tsx
src/app/api/verify/route.ts
src/app/api/download/route.ts
src/lib/paddle.ts                    # server-side Paddle API verification
src/lib/token.ts                     # HMAC sign/verify
src/lib/email.ts                     # nodemailer + templates
src/components/...                   # landing sections, PurchaseModal, etc.
```
